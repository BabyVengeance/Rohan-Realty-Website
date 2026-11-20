# Spec: Blue Ocean Luxury, Worker form router with FormSubmit fallback

## 1. Job
- Every enquiry form on blueoceanluxury.co.za delivers to Rohan's and Benjamin's inboxes, with no email address in page HTML and no lead lost if one route fails.
- Success measure: a test submission from each of the 17 forms arrives through the primary route, and again through the fallback when the primary is forced off.

## 2. Architecture
- Hosting moves from Cloudflare Pages to one Cloudflare Worker with static assets (Pages Functions cannot use the `send_email` binding). The site files, URLs, `_headers` and `_redirects` are unchanged; Workers static assets honour both files.
- `worker/index.js` handles `POST /api/contact` (`run_worker_first: ["/api/*"]`). Every other request is served from the assets.
- Sending: `env.EMAIL.send()` to verified Email Routing destinations, from `forms@blueoceanluxury.co.za`, with Reply-To set to the lead.
- Inbox addresses live in Worker secrets (`LEAD_INBOX_ROHAN`, `LEAD_INBOX_BEN`), not in the repo.

## 3. Routing
- Each form gets a hidden `form_id`: `general-home`, `general-contact`, `residential-<slug>`, `commercial-<slug>`.
- The Worker routes by prefix (general, residential, commercial) to an inbox list. Today all three go to Rohan and Ben. An unknown prefix falls back to general.

## 4. Delivery chain (js/main.js)
1. `POST /api/contact`, with an 8 s timeout. A 2xx with `success: true` means delivered.
2. A 4xx validation response shows the server's message inline and stops (no fallback with bad data).
3. A network error, timeout or 5xx falls back to FormSubmit AJAX, then to a native FormSubmit post.
4. No JavaScript: forms post natively to `/api/contact`. The Worker sends the email and 303-redirects back with `?enquiry=sent`, which `main.js` turns into the success state.

## 5. Spam and abuse
- Honeypot (`_honey`, `_gotcha`, `website`): silently accepted, not sent.
- A client elapsed time under 2.5 s: silently accepted, not sent.
- Same-origin check on `Origin`, a 32 KB body cap and field length caps.
- A per-IP rate limit is a dashboard WAF rule (one free rule on the Free plan), listed in the setup checklist.

## 6. Compliance and security
- POPIA: the consent value is recorded in each email. No lead data is stored by the Worker or logged; logs carry only form_id and error codes.
- Worker responses carry their own security headers (`_headers` does not apply to Worker output).

## 7. Assumptions
- No auto-reply to the lead (that needs the paid Email Sending plan); FormSubmit's `_autoresponse` still works on the fallback route.
- No lead database.
- The FormSubmit fallback target stays in `js/main.js` until Rohan activates FormSubmit's hashed alias, then that one constant changes.
