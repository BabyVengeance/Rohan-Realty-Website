/**
 * ROHAN REALTY & BLUE OCEAN REALTY — MASTER PORTAL ENGINE
 * Synchronized Navigation, Mobile Drawer, Form Validation & Scroll Observers
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Synchronized Navbar Scroll State
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('site-header--scrolled');
      header?.classList.remove('site-header--transparent');
    } else {
      header?.classList.remove('site-header--scrolled');
      header?.classList.add('site-header--transparent');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check

  /* --------------------------------------------------------------------------
     2. Accessible Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');
  const navBackdrop = document.querySelector('.nav__mobile-backdrop') || document.getElementById('mobileNavBackdrop');

  const openMobileNav = () => {
    navToggle?.setAttribute('aria-expanded', 'true');
    navToggle?.classList.add('is-active');
    navMobile?.classList.add('is-open');
    navBackdrop?.classList.add('is-visible');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.classList.remove('is-active');
    navMobile?.classList.remove('is-open');
    navBackdrop?.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  if (navToggle && navMobile && !navToggle.dataset.navBound) {
    navToggle.dataset.navBound = 'true';
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navBackdrop?.addEventListener('click', closeMobileNav);
    navBackdrop?.addEventListener('touchstart', closeMobileNav, { passive: true });

    // Close on click outside drawer
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('is-open') && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close drawer when resizing past desktop threshold
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navMobile.classList.contains('is-open')) {
        closeMobileNav();
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     3. Synchronized Active Navigation Link Highlighter
     -------------------------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  const residentialProps = ['5-nightjar-close.html', '55-hawaan-drive.html', '12-sera-bella.html', '6-sera-bella.html'];
  const commercialProps = [
    'urban-corner.html', 'northfield-business-park.html', 'glass-house-building-5.html',
    '21-richefond.html', 'the-glades-office-park.html', 'dunlop-house.html',
    '580-riverside-road.html', 'the-avenues-centre.html',
    'glass-house-building-1.html', '7-the-boulevard.html'
  ];

  let targetActive = currentPath;
  if (residentialProps.includes(currentPath)) targetActive = 'residential.html';
  if (commercialProps.includes(currentPath)) targetActive = 'commercial.html';
  if (targetActive === '') targetActive = 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('/').pop().split('#')[0];

    if (cleanHref === targetActive) {
      link.classList.add('nav__link--active');
      link.classList.add('nav__mobile-link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('nav__link--active');
      link.classList.remove('nav__mobile-link--active');
      link.removeAttribute('aria-current');
    }
  });

  /* --------------------------------------------------------------------------
     4. Consultation & Viewing Enquiry Form Handler (PHP First + FormSubmit Fallback)
     -------------------------------------------------------------------------- */
  const urlParams = new URLSearchParams(window.location.search);
  const propertyParam = urlParams.get('property');
  if (propertyParam) {
    const msgTextarea = document.querySelector('[name="message"]');
    if (msgTextarea && !msgTextarea.value.includes(propertyParam)) {
      msgTextarea.value = `I would like to request the Information Memorandum and schedule a confidential discussion regarding: ${propertyParam}.\n\n` + msgTextarea.value;
    }
  }

  const PRIMARY_ROUTING = 'rohanramlall2005@gmail.com';
  // Backup-route CC. Empty while leads go to Rohan only; put an address back here to copy someone in.
  const CC_ROUTING = '';
  // Primary route. PRIMARY_ROUTING / CC_ROUTING above are only used by the FormSubmit fallback;
  // swap PRIMARY_ROUTING for FormSubmit's hashed alias once it is activated (see context/docs/cloudflare-email-setup.md).
  const PRIMARY_ENDPOINT = '/api/contact';
  const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${PRIMARY_ROUTING}`;
  const FORMSUBMIT_NATIVE = `https://formsubmit.co/${PRIMARY_ROUTING}`;
  const PAGE_RENDER_TIME = Date.now();

  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 7000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  function showFormFeedback(form, message, type = 'error') {
    let feedback = form.querySelector('#formFeedback, .form__feedback');
    if (!feedback) {
      feedback = document.getElementById('formFeedback');
    }

    if (feedback) {
      feedback.textContent = message;
      feedback.className = `form__feedback is-${type}`;
      feedback.style.display = 'block';
      try {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (err) {}
    } else {
      alert(message);
    }
  }

  function restoreSubmitButton(form) {
    form._borSending = false;
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn && submitBtn._originalContent) {
      submitBtn.innerHTML = submitBtn._originalContent;
      submitBtn.disabled = false;
    }
  }

  // Ad and analytics conversions listen for this; it only fires once a lead has actually been delivered.
  function announceLead(form, channel) {
    document.dispatchEvent(new CustomEvent('bor:lead', { detail: { form, channel } }));
  }

  function renderSuccessState(form, leadName) {
    announceLead(form, 'ajax');
    const safeName = leadName || 'Valued Client';
    const successModal = document.getElementById('successModal');

    // Case 1: Commercial Landing Pages with #successModal
    if (successModal) {
      successModal.classList.remove('hidden');
      successModal.classList.add('flex');
      form.reset();
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn && submitBtn._originalContent) {
        submitBtn.innerHTML = submitBtn._originalContent;
        submitBtn.disabled = false;
      }
      return;
    }

    // Case 2: Residential Property Pages with #formFeedback
    const feedback = form.querySelector('#formFeedback, .form__feedback') || document.getElementById('formFeedback');
    if (feedback) {
      feedback.className = 'form__feedback is-success';
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <div style="padding: 1.25rem 0.5rem; text-align: center;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(201,160,80,0.15); border: 2px solid #C9A050; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C9A050" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div style="font-family: var(--font-heading, inherit); font-size: 1.2rem; font-weight: 800; color: #0A192F; margin-bottom: 0.35rem;">
            Viewing Request Received
          </div>
          <p style="font-size: 0.875rem; color: #475569; margin: 0 auto 1.25rem; max-width: 38ch; line-height: 1.5;">
            Thank you, <strong>${safeName}</strong>. Rohan Ramlall has received your request and will contact you directly to confirm.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.625rem; justify-content: center;">
            <a href="tel:0695224226" class="btn btn--primary" style="padding: 0.5rem 1rem; font-size: 0.8125rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
              Call Rohan: 069 522 4226
            </a>
            <a href="https://wa.me/27695224226" target="_blank" rel="noopener noreferrer" class="btn" style="padding: 0.5rem 1rem; font-size: 0.8125rem; font-weight: 700; background: #25D366; color: #FFFFFF; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
              WhatsApp Concierge
            </a>
          </div>
        </div>
      `;
      form.reset();
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn && submitBtn._originalContent) {
        submitBtn.innerHTML = submitBtn._originalContent;
        submitBtn.disabled = true;
      }
      try {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (e) {}
      return;
    }

    // Case 3: Flagship Portal (index.html) and Contact Page (contact.html)
    form.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(201,160,80,0.15); border: 2px solid #C9A050; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#C9A050" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h4 style="font-family: var(--font-heading, inherit); font-size: 1.5rem; font-weight: 800; color: #0A192F; margin-bottom: 0.5rem;">
          Confidential Request Received
        </h4>
        <p style="font-size: 0.9375rem; color: #64748B; max-width: 44ch; margin: 0 auto 1.5rem; line-height: 1.6;">
          Thank you, <strong>${safeName}</strong>. Rohan Ramlall of Blue Ocean Realty has received your brief and will be in touch directly.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-bottom: 1.5rem;">
          <a href="tel:0695224226" class="btn btn--primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
            Call Rohan Directly: 069 522 4226
          </a>
          <a href="https://wa.me/27695224226" target="_blank" rel="noopener noreferrer" class="btn" style="background: #25D366; color: #FFFFFF; display: inline-flex; align-items: center; gap: 0.5rem;">
            WhatsApp Concierge
          </a>
        </div>
        <p style="font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0;">
          Blue Ocean Realty (Pty) Ltd &bull; PPRA Registered
        </p>
      </div>
    `;
  }

  async function handleUnifiedSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    const form = e.target || e;
    if (!form || form.nodeName !== 'FORM') return;

    // 1. Anti-Bot: Honeypot trap check
    const honey = form.querySelector('[name="_honey"], [name="_gotcha"], [name="website"]');
    if (honey && honey.value.trim() !== '') {
      renderSuccessState(form, 'Lead');
      return;
    }

    // 2. Anti-Bot: Submission velocity check (< 1.2s bot tarpit)
    const timeElapsed = Date.now() - PAGE_RENDER_TIME;
    if (timeElapsed < 1200) {
      renderSuccessState(form, 'Lead');
      return;
    }

    // 3. Extract and validate required inputs
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const popiaConsent = form.querySelector('[name="popia_consent"], [name="popiaConsent"]');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';

    if (!nameVal || !phoneVal || !emailVal) {
      showFormFeedback(form, 'Please complete all required fields (Full Name, Phone, and Email).', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      showFormFeedback(form, 'Please provide a valid email address.', 'error');
      if (emailInput) emailInput.focus();
      return;
    }

    const cleanPhoneDigits = phoneVal.replace(/[^\d]/g, '');
    if (cleanPhoneDigits.length < 7) {
      showFormFeedback(form, 'Please provide a valid contact telephone number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (popiaConsent && !popiaConsent.checked) {
      showFormFeedback(form, 'Please review and accept the POPIA consent box before submitting.', 'error');
      popiaConsent.focus();
      return;
    }

    // Commercial pages bind this handler twice (inline onsubmit and addEventListener);
    // without this guard every enquiry was sent and counted twice.
    if (form._borSending) return;
    form._borSending = true;

    // 4. Set loading state on submit button
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      if (!submitBtn._originalContent) {
        submitBtn._originalContent = submitBtn.innerHTML;
      }
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-flex; align-items:center; gap:0.5rem;">
          <svg style="animation:spin 1s linear infinite; width:16px; height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>Transmitting Request...</span>
        </span>
      `;
    }

    // 5. Build FormData payload
    const formData = new FormData(form);
    if (!formData.has('page_url') || !formData.get('page_url')) {
      formData.set('page_url', window.location.href);
    }
    formData.set('_submission_time', PAGE_RENDER_TIME.toString());
    formData.set('_elapsed_ms', String(Date.now() - PAGE_RENDER_TIME));
    // One ID per lead, shared by both routes, so a rare double delivery is easy to spot.
    if (!formData.get('submission_id')) {
      formData.set('submission_id', (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
    }

    let isDelivered = false;

    // TIER 1: Cloudflare Worker (/api/contact). Inbox routing lives server-side.
    try {
      const primaryRes = await fetchWithTimeout(PRIMARY_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
        timeout: 8000
      });
      const primaryData = await primaryRes.json().catch(() => null);

      if (primaryRes.ok && primaryData && primaryData.success) {
        isDelivered = true;
      } else if (primaryRes.status === 422 && primaryData && primaryData.error) {
        // The server rejected the details themselves: resending them elsewhere would not help.
        showFormFeedback(form, primaryData.error, 'error');
        restoreSubmitButton(form);
        return;
      }
    } catch (primaryErr) {
      // Network error or timeout: fall through to FormSubmit.
    }

    // TIER 2: FormSubmit.co AJAX Fallback
    if (!isDelivered) {
      if (CC_ROUTING) formData.set('_cc', CC_ROUTING);
      try {
        const jsonPayload = {};
        formData.forEach((value, key) => {
          jsonPayload[key] = value;
        });

        if (CC_ROUTING) jsonPayload['_cc'] = CC_ROUTING;
        else delete jsonPayload['_cc'];
        jsonPayload['_template'] = 'table';
        jsonPayload['_captcha'] = 'false';
        if (!jsonPayload['_subject']) {
          const propName = jsonPayload['property_name'] || jsonPayload['property_interest'] || 'Direct Mandate Inquiry';
          jsonPayload['_subject'] = `[Blue Ocean Realty] Lead Notification - ${propName} (${nameVal})`;
        }

        const fsRes = await fetchWithTimeout(FORMSUBMIT_AJAX, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(jsonPayload),
          timeout: 7000
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json();
          if (fsData && (fsData.success === 'true' || fsData.success === true || fsData.message)) {
            isDelivered = true;
          }
        }
      } catch (fsErr) {
        // FormSubmit AJAX failed
      }
    }

    // TIER 3: Native FormSubmit POST (Last-resort fallback)
    if (!isDelivered) {
      announceLead(form, 'native');
      form.action = FORMSUBMIT_NATIVE;
      form.method = 'POST';
      HTMLFormElement.prototype.submit.call(form);
      return;
    }

    form._borSending = false;
    renderSuccessState(form, nameVal);
  }

  // Setup all forms across DOM
  const allContactForms = document.querySelectorAll(
    'form#contact-form, form#propertyEnquiryForm, form[name="viewing-enquiry"], form[name="contact-enquiry"], form[action="/api/contact"]'
  );

  // Visitors without JavaScript post straight to /api/contact, which redirects back with ?enquiry=sent|failed.
  const enquiryOutcome = new URLSearchParams(window.location.search).get('enquiry');
  if (enquiryOutcome && allContactForms.length) {
    const firstForm = allContactForms[0];
    if (enquiryOutcome === 'sent') renderSuccessState(firstForm, '');
    else showFormFeedback(firstForm, 'Your enquiry could not be sent. Please WhatsApp or call Rohan on +27 69 522 4226.', 'error');
    // Drop the flag so a reload does not count the lead twice.
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('enquiry');
    history.replaceState(null, '', cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
  }

  allContactForms.forEach(form => {
    if (form._borInitialized) return;
    form._borInitialized = true;

    form.method = 'POST';
    form.noValidate = true;

    // Honeypot injection
    if (!form.querySelector('[name="_honey"]')) {
      const honeyInput = document.createElement('input');
      honeyInput.type = 'text';
      honeyInput.name = '_honey';
      honeyInput.className = 'form__honey';
      honeyInput.setAttribute('tabindex', '-1');
      honeyInput.setAttribute('autocomplete', 'off');
      honeyInput.setAttribute('aria-hidden', 'true');
      form.appendChild(honeyInput);
    }

    // Submission time injection
    if (!form.querySelector('[name="_submission_time"]')) {
      const timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = '_submission_time';
      timeInput.value = PAGE_RENDER_TIME.toString();
      form.appendChild(timeInput);
    }

    // CC injection (only when a backup CC is configured)
    if (CC_ROUTING && !form.querySelector('[name="_cc"]')) {
      const ccInput = document.createElement('input');
      ccInput.type = 'hidden';
      ccInput.name = '_cc';
      ccInput.value = CC_ROUTING;
      form.appendChild(ccInput);
    }

    // Page URL injection
    if (!form.querySelector('[name="page_url"]')) {
      const pageUrlInput = document.createElement('input');
      pageUrlInput.type = 'hidden';
      pageUrlInput.name = 'page_url';
      pageUrlInput.value = window.location.href;
      form.appendChild(pageUrlInput);
    }

    // POPIA Consent Gating
    const consentCheckbox = form.querySelector('input[name="popia_consent"], input[name="popiaConsent"]');
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    if (consentCheckbox && submitBtn) {
      if (consentCheckbox.hasAttribute('checked')) {
        consentCheckbox.checked = false;
        consentCheckbox.removeAttribute('checked');
      }
      submitBtn.disabled = !consentCheckbox.checked;

      consentCheckbox.addEventListener('change', () => {
        submitBtn.disabled = !consentCheckbox.checked;
      });
    }

    form.addEventListener('submit', handleUnifiedSubmit);
  });

  // Global window handleForm for legacy inline callers
  window.handleForm = function (e) {
    handleUnifiedSubmit(e);
  };

  /* --------------------------------------------------------------------------
     5. Bond Calculator Logic (If present on property page)
     -------------------------------------------------------------------------- */
  const calcForm = document.getElementById('bondCalculatorForm');
  if (calcForm) {
    const priceInput = document.getElementById('calcPrice');
    const depositInput = document.getElementById('calcDeposit');
    const rateInput = document.getElementById('calcRate');
    const termInput = document.getElementById('calcTerm');
    const monthlyOutput = document.getElementById('calcMonthly');
    const totalOutput = document.getElementById('calcTotal');

    const calculateRepayment = () => {
      const price = parseFloat(priceInput?.value) || 0;
      const deposit = parseFloat(depositInput?.value) || 0;
      const annualRate = (parseFloat(rateInput?.value) || 11.75) / 100;
      const years = parseInt(termInput?.value) || 20;

      const principal = Math.max(0, price - deposit);
      const monthlyRate = annualRate / 12;
      const numberOfPayments = years * 12;

      let monthlyPayment = 0;
      if (monthlyRate > 0 && numberOfPayments > 0) {
        monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }

      if (monthlyOutput) monthlyOutput.textContent = 'R ' + Math.round(monthlyPayment).toLocaleString();
      if (totalOutput) totalOutput.textContent = 'R ' + Math.round(monthlyPayment * numberOfPayments).toLocaleString();
    };

    [priceInput, depositInput, rateInput, termInput].forEach(inp => {
      inp?.addEventListener('input', calculateRepayment);
    });

    calculateRepayment();
  }

  /* --------------------------------------------------------------------------
     6. Notion-Style Floating Side Navigation Engine (Outline Rail)
     Auto-discovers sections, tracks active scroll state, and handles flyout
     -------------------------------------------------------------------------- */
  const initNotionSideNav = () => {
    // 1. Only run on property landing pages (exclude main portal indices)
    const rawFile = window.location.pathname.split('/').pop() || 'index.html';
    const cleanFile = rawFile.replace(/\.html$/, '').toLowerCase();
    const portalPages = ['index', 'residential', 'commercial', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'statutory-disclosure', ''];
    if (portalPages.includes(cleanFile)) {
      return;
    }

    // 2. Discover eligible section elements with valid IDs
    const candidateNodes = Array.from(document.querySelectorAll('section[id], div#inquiry[id]'));
    
    // Ignore modals, overlays, footers, or hidden elements
    const ignoreIds = new Set(['mobileNav', 'mobileNavBackdrop', 'galleryModal', 'videoModal', 'imageModal', 'photoModal']);

    // Canonical humanized titles for common property sections
    const standardTitles = {
      'hero': 'Overview',
      'featured': 'Overview & Valuation',
      'overview': 'Overview',
      'duty-benefit': 'Transfer Duty Benefit',
      'transfer-duty': 'Zero Transfer Duty',
      'engineering': 'Autonomous Engineering',
      'suites': 'Master Suites',
      'gallery': 'Curated Gallery',
      'highlights': 'Key Highlights',
      'video-tour': 'Walkthrough Video',
      'specs': 'Specifications',
      'features': 'Architectural Specs',
      'calculator': 'Repayment Calculator',
      'location': 'Location & Access',
      'enquiry': 'Private Consultation',
      'inquiry': 'Confidential Brief',
      'browse': 'Related Mandates'
    };

    const sections = [];
    candidateNodes.forEach(node => {
      const id = node.getAttribute('id');
      if (!id || ignoreIds.has(id)) return;
      if (node.getAttribute('aria-hidden') === 'true' || (node.offsetParent === null && node.id !== 'hero')) return;

      // Determine human label
      let label = node.getAttribute('data-toc-title');
      if (!label && standardTitles[id]) {
        label = standardTitles[id];
      }
      if (!label) {
        const heading = node.querySelector('h1, h2, h3, .section-title, .hero__title');
        if (heading) {
          const rawText = heading.textContent.replace(/\s+/g, ' ').trim();
          label = rawText.length > 26 ? rawText.slice(0, 24).trim() + '…' : rawText;
        } else {
          // Humanize id from kebab-case
          label = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }

      // Decode any HTML entities (e.g. &amp; -> &)
      if (label && label.includes('&')) {
        const txt = document.createElement('textarea');
        txt.innerHTML = label;
        label = txt.value;
      }

      sections.push({ id, label, element: node });
    });

    // Require at least 3 sections to justify side navigation
    if (sections.length < 3) return;

    // 3. Construct Notion-style DOM structure
    const tocNav = document.createElement('nav');
    tocNav.className = 'notion-toc';
    tocNav.id = 'notionToc';
    tocNav.setAttribute('aria-label', 'Property Page Outline');

    // Mobile trigger button (< 1100px)
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'notion-toc__btn';
    mobileBtn.id = 'notionTocBtn';
    mobileBtn.setAttribute('aria-label', 'Toggle Page Outline');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="15" y2="12"></line>
        <line x1="3" y1="18" x2="18" y2="18"></line>
      </svg>
    `;

    // Collapsed tick rail
    const rail = document.createElement('div');
    rail.className = 'notion-toc__rail';
    rail.setAttribute('aria-hidden', 'true');
    rail.title = 'Page Outline (Hover to expand)';

    // Expanded flyout card
    const card = document.createElement('div');
    card.className = 'notion-toc__card';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', 'Page Sections');

    const cardHeader = document.createElement('div');
    cardHeader.className = 'notion-toc__card-header';
    cardHeader.innerHTML = `
      <span>Outline</span>
      <span style="opacity: 0.55; font-size: 0.625rem; font-weight: 500; text-transform: none;">Jump To</span>
    `;
    card.appendChild(cardHeader);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'notion-toc__items';

    // Populate ticks and card links
    const tickElements = [];
    const itemElements = [];

    sections.forEach((sec, idx) => {
      // Tick
      const tick = document.createElement('div');
      tick.className = 'notion-toc__tick' + (idx === 0 ? ' is-active' : '');
      tick.setAttribute('data-target', sec.id);
      tick.title = sec.label;
      rail.appendChild(tick);
      tickElements.push(tick);

      // Card item
      const item = document.createElement('a');
      item.className = 'notion-toc__item' + (idx === 0 ? ' is-active' : '');
      item.href = `#${sec.id}`;
      item.setAttribute('data-target', sec.id);
      item.innerHTML = `
        <span class="notion-toc__bullet" style="display:inline-block; width:5px; height:5px; border-radius:50%; background:currentColor; opacity:0.6; flex-shrink:0;"></span>
        <span class="notion-toc__label" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${sec.label}</span>
      `;
      itemsContainer.appendChild(item);
      itemElements.push(item);
    });

    card.appendChild(itemsContainer);
    // Offset button if page has a fixed mobile action bar
    if (document.querySelector('.mobile-action-bar')) {
      tocNav.classList.add('notion-toc--offset');
    }

    tocNav.appendChild(mobileBtn);
    tocNav.appendChild(rail);
    tocNav.appendChild(card);
    document.body.appendChild(tocNav);

    // 4. Smooth Scrolling Handler with Fixed Navbar Offset (88px)
    const scrollToSection = (targetId) => {
      const targetNode = document.getElementById(targetId);
      if (!targetNode) return;
      const navOffset = 88;
      const elementPosition = targetNode.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile card on click
      tocNav.classList.remove('is-open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    };

    // Attach click listeners to ticks and items
    tickElements.forEach(tick => {
      tick.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = tick.getAttribute('data-target');
        scrollToSection(targetId);
      });
    });

    itemElements.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        scrollToSection(targetId);
      });
    });

    // Mobile button toggle
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isOpen = tocNav.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside or ESC
    document.addEventListener('click', (e) => {
      if (!tocNav.contains(e.target)) {
        tocNav.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tocNav.classList.contains('is-open')) {
        tocNav.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // 5. Scroll-Spy Engine: Highlight current active section in rail & card
    let activeId = sections[0].id;

    const setActiveSection = (id) => {
      if (activeId === id) return;
      activeId = id;

      tickElements.forEach(tick => {
        const matches = tick.getAttribute('data-target') === id;
        tick.classList.toggle('is-active', matches);
        tick.classList.toggle('notion-toc__tick--active', matches);
      });

      itemElements.forEach(item => {
        const matches = item.getAttribute('data-target') === id;
        item.classList.toggle('is-active', matches);
        item.classList.toggle('notion-toc__item--active', matches);
      });
    };

    const updateScrollSpy = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Top of page edge case
      if (scrollPos < 100) {
        setActiveSection(sections[0].id);
        return;
      }

      // Bottom of page edge case
      if (scrollPos + windowHeight >= docHeight - 40) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Find section currently in view
      const navOffset = 110;
      let currentSectionId = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].element.getBoundingClientRect();
        if (rect.top <= navOffset + 80) {
          currentSectionId = sections[i].id;
        }
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy(); // Initial calibration
  };

  initNotionSideNav();

  /* --------------------------------------------------------------------------
     6. Universal Property Card Clickability Engine
     Ensures clicking anywhere on any property card navigates directly to its mandate
     -------------------------------------------------------------------------- */
  const initPropertyCardClickability = () => {
    document.addEventListener('click', (e) => {
      // Find enclosing property card
      const card = e.target.closest('.property-card, .estate-card, .comm-card, #property-grid > div, [data-clickable-card]');
      if (!card) return;

      // Identify if the click was directly on a secondary action (e.g. WhatsApp, phone, request info)
      const interactive = e.target.closest('a, button, input, textarea, select');
      if (interactive) {
        const href = interactive.getAttribute('href') || '';
        // If it's an external or secondary action, let it execute naturally
        if (href.startsWith('https://wa.me') || href.startsWith('tel:') || href.includes('contact.html') || (interactive.tagName === 'BUTTON' && !interactive.getAttribute('onclick')?.includes('.html'))) {
          return;
        }
        // If it's the primary card link or explore button, let standard navigation proceed
        return;
      }

      // Check for target URL: first from data-href, then by querying internal mandate link
      let targetUrl = card.getAttribute('data-href');
      if (!targetUrl) {
        const primaryLink = card.querySelector('a[href$=".html"]:not([href*="contact"]):not([href*="about"]):not([href*="residential"]):not([href*="commercial"]):not([href*="privacy"]):not([href*="terms"]):not([href*="statutory"]):not([href*="index"])');
        if (primaryLink) {
          targetUrl = primaryLink.getAttribute('href');
        }
      }

      if (!targetUrl) return;

      // Handle modifier keys for new tab / window
      if (e.ctrlKey || e.metaKey || e.button === 1) {
        window.open(targetUrl, '_blank');
      } else {
        window.location.href = targetUrl;
      }
    });
  };

  initPropertyCardClickability();

  /* --------------------------------------------------------------------------
     7. Scroll Reveals (styles in css/motion.css)
     Only content below the fold is ever hidden, so nothing the visitor can
     already see blinks out. Each batch that enters together is staggered in
     reading order, and once an element has settled its motion classes are
     removed so it returns to its native hover and transition styles.
     -------------------------------------------------------------------------- */
  const initScrollReveals = () => {
    if (document.body.dataset.motion === 'bespoke') return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const REVEAL_SELECTORS = [
      '.section-kicker', '.section-label', '.section-title', '.section-subtitle',
      '.gateway-card', '.property-card', '.estate-card', '.comm-card',
      '.advisor__media', '.advisor__card', '.advisor__pillar',
      '.about-story__grid > *', '.foundation-card', '.social-box',
      '.enquiry__info', '.enquiry__card',
      '.contact-direct-card', '.contact-form-card',
      '.legal-section',
      '#property-grid > *',
      'section[data-toc-title]:not(#featured) h2',
      '#overview .grid > div > *'
    ].join(', ');

    // Heroes animate on load in CSS; chrome, dialogs, sticky panels and the
    // script-managed gallery keep their own behaviour.
    const EXCLUDED_ZONES = '.site-header, .nav__mobile, .footer, .home-hero, .page-hero, #featured, [role="dialog"], .sticky, .gallery__item';

    const candidates = Array.from(document.querySelectorAll(REVEAL_SELECTORS))
      .filter((el) => !el.closest(EXCLUDED_ZONES));

    // Animate the outermost match only, so a card and its own heading never
    // reveal twice.
    const targets = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));

    const foldLine = window.innerHeight * 0.92;
    const belowFold = targets.filter((el) => el.getBoundingClientRect().top > foldLine);
    if (!belowFold.length) return;

    const REVEAL_MS = 900;
    const STAGGER_MS = 80;
    const MAX_STAGGER_STEPS = 5;

    const settle = (el, delay) => {
      window.setTimeout(() => {
        el.classList.remove('mo-reveal', 'mo-in');
        el.style.removeProperty('--mo-delay');
      }, REVEAL_MS + delay + 400);
    };

    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return (ra.top - rb.top) || (ra.left - rb.left);
        });

      entering.forEach((el, index) => {
        const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;
        el.style.setProperty('--mo-delay', `${delay}ms`);
        el.classList.add('mo-in');
        observer.unobserve(el);
        settle(el, delay);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    document.documentElement.classList.add('mo-ready');
    belowFold.forEach((el) => {
      el.classList.add('mo-reveal');
      observer.observe(el);
    });

    // Printing should never capture half-revealed content.
    window.addEventListener('beforeprint', () => {
      belowFold.forEach((el) => el.classList.add('mo-in'));
    });
  };

  initScrollReveals();

});
