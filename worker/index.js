// Blue Ocean Luxury: enquiry router.
// POST /api/contact receives every site form and emails it to the inboxes mapped to its form_id.
// All other requests are served from static assets (see wrangler.jsonc).

// form_id prefix -> inbox keys. Keys resolve to Worker secrets (LEAD_INBOX_<KEY>), never hard-coded here.
const ROUTES = {
  general: { label: 'General enquiry', inboxes: ['ROHAN', 'BEN'] },
  residential: { label: 'Residential viewing request', inboxes: ['ROHAN', 'BEN'] },
  commercial: { label: 'Commercial enquiry', inboxes: ['ROHAN', 'BEN'] },
};

const MAX_BODY_BYTES = 32 * 1024;
const MIN_FILL_MS = 2500;
const FIELD_LIMITS = { name: 120, email: 160, phone: 40, message: 5000 };
const DEFAULT_LIMIT = 500;
const HONEYPOTS = ['_honey', '_gotcha', 'website'];
// FormSubmit control fields and client plumbing: never shown in the lead email.
const HIDDEN_FIELDS = new Set([
  '_autoresponse', '_captcha', '_cc', '_subject', '_template', '_next', '_submission_time',
  '_elapsed_ms', '_mode', 'form_id', 'submission_id', ...HONEYPOTS,
]);
const ATTRIBUTION_FIELDS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'landing_page'];

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env, url, ctx);
    if (url.pathname.startsWith('/api/')) return json({ success: false, error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env, url, ctx) {
  if (request.method !== 'POST') {
    return json({ success: false, error: 'Method not allowed' }, 405, { Allow: 'POST' });
  }

  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== url.host) {
    return json({ success: false, error: 'Cross-site submissions are not accepted.' }, 403);
  }

  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > MAX_BODY_BYTES) return json({ success: false, error: 'Submission too large.' }, 413);

  const isNativePost = !(request.headers.get('Accept') || '').includes('application/json');

  let fields;
  try {
    fields = await readFields(request);
  } catch {
    return respond(isNativePost, request, { success: false, error: 'The form could not be read. Please try again.' }, 400);
  }

  // Bots: report success so they learn nothing, but send nothing.
  const honeypotFilled = HONEYPOTS.some((k) => (fields[k] || '').trim() !== '');
  const elapsed = Number(fields._elapsed_ms);
  const tooFast = !isNativePost && (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS);
  if (honeypotFilled || tooFast) {
    return respond(isNativePost, request, { success: true, id: 'ok' }, 200);
  }

  const problem = validate(fields);
  if (problem) return respond(isNativePost, request, { success: false, error: problem }, 422);

  const formId = clean(fields.form_id || 'general-unknown', 80);
  const route = ROUTES[formId.split('-')[0]] || ROUTES.general;
  const to = route.inboxes.map((key) => env[`LEAD_INBOX_${key}`]).filter(Boolean);
  if (!to.length) {
    console.error(JSON.stringify({ event: 'lead_config_error', formId, reason: 'no inbox secrets set' }));
    return respond(isNativePost, request, { success: false, error: 'Delivery is not configured.' }, 503);
  }

  const submissionId = clean(fields.submission_id, 64) || crypto.randomUUID();
  const message = buildEmail(fields, route, formId, submissionId, request);

  // Cloudflare's send takes around 10 seconds, longer than a visitor should wait.
  // Accept the lead now and deliver in the background; if the send fails, the Worker
  // hands the lead to FormSubmit itself, so a failure still never loses it.
  ctx.waitUntil(deliver(env, { to, fields, formId, submissionId, message, origin: url.origin }));
  return respond(isNativePost, request, { success: true, id: submissionId }, 200);
}

async function deliver(env, { to, fields, formId, submissionId, message, origin }) {
  const started = Date.now();
  try {
    await env.EMAIL.send({
      to,
      from: { email: env.MAIL_FROM, name: env.MAIL_FROM_NAME || 'Blue Ocean Realty website' },
      replyTo: isEmail(fields.email) ? { email: fields.email.trim(), name: clean(fields.name, 120) || fields.email.trim() } : undefined,
      subject: message.subject,
      text: message.text,
      html: message.html,
      headers: { 'X-Lead-Id': submissionId, 'X-Form-Id': formId },
    });
    console.log(JSON.stringify({ event: 'lead_sent', formId, submissionId, ms: Date.now() - started }));
    return;
  } catch (err) {
    // No personal data in logs: only the form and the platform error code.
    console.error(JSON.stringify({ event: 'lead_send_failed', formId, submissionId, code: err && err.code ? err.code : 'unknown', ms: Date.now() - started }));
  }

  try {
    const [primary, ...cc] = to;
    const payload = {
      ...Object.fromEntries(Object.entries(fields).filter(([k]) => !HONEYPOTS.includes(k) && !['_elapsed_ms', '_submission_time'].includes(k))),
      _subject: message.subject,
      _template: 'table',
      _captcha: 'false',
      _cc: cc.join(','),
      lead_id: submissionId,
      form_id: formId,
      delivery_note: 'Sent by the website backup route (Cloudflare email failed).',
    };
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primary)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: origin, Referer: origin + '/' },
      body: JSON.stringify(payload),
    });
    console[res.ok ? 'log' : 'error'](JSON.stringify({ event: res.ok ? 'lead_backup_sent' : 'lead_backup_failed', formId, submissionId, status: res.status }));
  } catch (err) {
    console.error(JSON.stringify({ event: 'lead_backup_failed', formId, submissionId, code: 'network' }));
  }
}

async function readFields(request) {
  const type = request.headers.get('Content-Type') || '';
  const out = {};
  if (type.includes('application/json')) {
    const body = await request.json();
    for (const [k, v] of Object.entries(body || {})) out[k] = typeof v === 'string' ? v : String(v ?? '');
    return out;
  }
  const form = await request.formData();
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') out[k] = v;
  }
  return out;
}

function validate(f) {
  const name = (f.name || '').trim();
  const email = (f.email || '').trim();
  const phone = (f.phone || '').trim();
  if (name.length < 2) return 'Please enter your full name.';
  if (!isEmail(email)) return 'Please enter a valid email address.';
  if (phone.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number.';
  for (const [k, v] of Object.entries(f)) {
    const limit = FIELD_LIMITS[k] || DEFAULT_LIMIT;
    if (!HIDDEN_FIELDS.has(k) && v.length > limit) return 'One of the fields is too long. Please shorten it and try again.';
  }
  return null;
}

function buildEmail(f, route, formId, submissionId, request) {
  const name = clean(f.name, 120);
  const property = clean(f.property_name || f.property_interest || f.property || '', 200);
  const subject = `[Blue Ocean Realty] ${route.label}${property ? ': ' + property : ''} (${name})`;

  const main = [
    ['Name', name],
    ['Email', clean(f.email, 160)],
    ['Phone', clean(f.phone, 40)],
    ['Property', property],
    ['Message', clean(f.message, 5000)],
    ['POPIA consent', f.popia_consent ? 'Yes' : 'Not ticked'],
  ];
  const skip = new Set(['name', 'email', 'phone', 'message', 'popia_consent', 'property_name', 'property_interest', 'property', 'page_url', ...ATTRIBUTION_FIELDS]);
  const extra = Object.entries(f)
    .filter(([k, v]) => !HIDDEN_FIELDS.has(k) && !skip.has(k) && v.trim() !== '')
    .map(([k, v]) => [k.replace(/[_-]+/g, ' '), clean(v, DEFAULT_LIMIT)]);
  const source = [
    ['Page', clean(f.page_url, 300)],
    ['Form', formId],
    ...ATTRIBUTION_FIELDS.filter((k) => f[k]).map((k) => [k, clean(f[k], 200)]),
    ['Country', request.cf && request.cf.country ? request.cf.country : ''],
    ['Lead ID', submissionId],
  ];

  const rows = [...main, ...extra].filter(([, v]) => v);
  const sourceRows = source.filter(([, v]) => v);
  const text = [
    `${route.label} from blueoceanluxury.co.za`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Source',
    ...sourceRows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Reply to this email to answer the client directly.',
  ].join('\n');

  const tr = ([k, v]) => `<tr><th align="left" valign="top" style="padding:6px 12px 6px 0;color:#475569;font-weight:600;white-space:nowrap">${esc(k)}</th><td style="padding:6px 0;color:#0F172A">${esc(v).replace(/\n/g, '<br>')}</td></tr>`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;max-width:640px">
<h2 style="font-size:18px;color:#0A192F;margin:0 0 12px">${esc(route.label)}${property ? ': ' + esc(property) : ''}</h2>
<table cellspacing="0" cellpadding="0" style="border-collapse:collapse">${rows.map(tr).join('')}</table>
<h3 style="font-size:14px;color:#0A192F;margin:20px 0 6px">Source</h3>
<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:12px">${sourceRows.map(tr).join('')}</table>
<p style="color:#64748B;font-size:12px;margin-top:20px">Reply to this email to answer the client directly.</p>
</div>`;

  return { subject, text, html };
}

function respond(isNativePost, request, body, status) {
  if (!isNativePost) return json(body, status);
  // Visitors without JavaScript: send them back to the page they came from with the outcome in the URL.
  const back = safeReferer(request);
  back.searchParams.set('enquiry', body.success ? 'sent' : 'failed');
  return new Response(null, { status: 303, headers: { Location: back.toString(), ...SECURITY_HEADERS } });
}

function safeReferer(request) {
  const self = new URL(request.url);
  try {
    const ref = new URL(request.headers.get('Referer') || '');
    if (ref.host === self.host) return new URL(ref.pathname, self.origin);
  } catch { /* missing or malformed referer */ }
  return new URL('/contact', self.origin);
}

function json(body, status, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS, ...extra },
  });
}

function isEmail(v) {
  return typeof v === 'string' && /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]{2,}$/.test(v.trim()) && v.length <= 160;
}

// Strips control characters (header injection) and trims to a maximum length.
function clean(v, max) {
  return String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

function esc(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
