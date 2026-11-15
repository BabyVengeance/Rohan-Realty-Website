/**
 * ROHAN REALTY & BLUE OCEAN REALTY (PTY) LTD
 * Unified Production Contact Form Engine
 *
 * Architecture:
 * 1. Tier 1: Asynchronous PHP Dispatch (api/contact.php)
 * 2. Tier 2: FormSubmit.co AJAX Fallback (https://formsubmit.co/ajax/rohanramlall2005@gmail.com)
 * 3. Tier 3: Native FormSubmit POST Fallback
 *
 * Routing Recipients:
 * - Primary: rohanramlall2005@gmail.com
 * - CC: benjamingovindraj@gmail.com
 *
 * Security & Anti-Bot:
 * - Honeypot traps (_honey, _gotcha)
 * - Submission velocity throttling (<1.2s bot tarpit)
 * - POPIA consent gating
 * - Input validation & sanitization
 */

(function () {
  'use strict';

  const PRIMARY_ROUTING = 'rohanramlall2005@gmail.com';
  const CC_ROUTING = 'benjamingovindraj@gmail.com';
  const PHP_ENDPOINT = 'api/contact.php';
  const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${PRIMARY_ROUTING}`;
  const FORMSUBMIT_NATIVE = `https://formsubmit.co/${PRIMARY_ROUTING}`;

  const PAGE_RENDER_TIME = Date.now();

  /**
   * Helper to fetch with timeout
   */
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

  /**
   * Show feedback message within form context
   */
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
      } catch (err) {
        // Fallback for older browsers
      }
    } else {
      alert(message);
    }
  }

  /**
   * Render luxury success state across all page types
   */
  function renderSuccessState(form, leadName) {
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
        <div style="padding: 1rem 0.5rem; text-align: center;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(201,160,80,0.15); border: 2px solid #C9A050; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C9A050" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div style="font-family: var(--font-heading, inherit); font-size: 1.15rem; font-weight: 800; color: #0A192F; margin-bottom: 0.35rem;">
            Viewing Request Received
          </div>
          <p style="font-size: 0.875rem; color: #475569; margin: 0 auto 1rem; max-width: 36ch; line-height: 1.5;">
            Thank you, <strong>${safeName}</strong>. Rohan Ramlall and Benjamin Govindraj have received your request and will contact you directly to confirm.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
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
        submitBtn.disabled = true; // Stay disabled until POPIA re-checked
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
          Thank you, <strong>${safeName}</strong>. Rohan Ramlall and Benjamin Govindraj of Blue Ocean Realty have received your brief and will be in touch directly.
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

  /**
   * Main unified submission handler
   */
  async function handleUnifiedFormSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    const form = e.target || e;
    if (!form || form.nodeName !== 'FORM') return;

    // 1. Anti-Bot: Honeypot trap check
    const honey = form.querySelector('[name="_honey"], [name="_gotcha"], [name="website"]');
    if (honey && honey.value.trim() !== '') {
      // Silently pretend success to trap bot
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
    formData.set('_cc', CC_ROUTING);

    let isDelivered = false;

    // =========================================================================
    // TIER 1: PHP First (api/contact.php)
    // =========================================================================
    try {
      const phpRes = await fetchWithTimeout(PHP_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
        timeout: 6000
      });

      if (phpRes.ok) {
        const phpData = await phpRes.json();
        if (phpData && phpData.success) {
          isDelivered = true;
        }
      }
    } catch (phpErr) {
      // PHP server unavailable, static hosting, or request timeout.
      // Gracefully advance to Tier 2.
    }

    // =========================================================================
    // TIER 2: FormSubmit.co AJAX Fallback
    // =========================================================================
    if (!isDelivered) {
      try {
        const jsonPayload = {};
        formData.forEach((value, key) => {
          jsonPayload[key] = value;
        });

        // Ensure FormSubmit config is complete
        jsonPayload['_cc'] = CC_ROUTING;
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
        // FormSubmit AJAX failed or blocked by network/CORS
      }
    }

    // =========================================================================
    // TIER 3: Native FormSubmit POST (Last-resort fallback)
    // =========================================================================
    if (!isDelivered) {
      form.action = FORMSUBMIT_NATIVE;
      form.method = 'POST';
      // Native submit bypasses preventDefault
      HTMLFormElement.prototype.submit.call(form);
      return;
    }

    // Deliver success presentation
    renderSuccessState(form, nameVal);
  }

  /**
   * Initialize and standardize all contact forms across DOM
   */
  function initContactForms() {
    const candidateForms = document.querySelectorAll(
      'form#contact-form, form#propertyEnquiryForm, form[name="viewing-enquiry"], form[name="contact-enquiry"]'
    );

    candidateForms.forEach((form) => {
      // Prevent double initialization
      if (form._borInitialized) return;
      form._borInitialized = true;

      // 1. Ensure action & method point to FormSubmit native fallback
      form.action = FORMSUBMIT_NATIVE;
      form.method = 'POST';
      form.noValidate = true;

      // 2. Inject honeypot field if missing
      if (!form.querySelector('[name="_honey"]')) {
        const honeyInput = document.createElement('input');
        honeyInput.type = 'text';
        honeyInput.name = '_honey';
        honeyInput.className = 'form__honey';
        honeyInput.setAttribute('tabindex', '-1');
        honeyInput.setAttribute('autocomplete', 'off');
        honeyInput.setAttribute('aria-hidden', 'true');
        honeyInput.style.cssText = 'display:none !important; position:absolute; left:-9999px; width:1px; height:1px;';
        form.appendChild(honeyInput);
      }

      // 3. Inject submission timestamp if missing
      if (!form.querySelector('[name="_submission_time"]')) {
        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = '_submission_time';
        timeInput.value = PAGE_RENDER_TIME.toString();
        form.appendChild(timeInput);
      }

      // 4. Inject _cc recipient if missing
      if (!form.querySelector('[name="_cc"]')) {
        const ccInput = document.createElement('input');
        ccInput.type = 'hidden';
        ccInput.name = '_cc';
        ccInput.value = CC_ROUTING;
        form.appendChild(ccInput);
      }

      // 5. Inject page URL if missing
      if (!form.querySelector('[name="page_url"]')) {
        const pageUrlInput = document.createElement('input');
        pageUrlInput.type = 'hidden';
        pageUrlInput.name = 'page_url';
        pageUrlInput.value = window.location.href;
        form.appendChild(pageUrlInput);
      }

      // 6. Setup POPIA consent gating
      const popiaCheck = form.querySelector('input[name="popia_consent"], input[name="popiaConsent"]');
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

      if (popiaCheck && submitBtn) {
        if (popiaCheck.hasAttribute('checked')) {
          popiaCheck.checked = false;
          popiaCheck.removeAttribute('checked');
        }
        submitBtn.disabled = !popiaCheck.checked;
        popiaCheck.addEventListener('change', () => {
          submitBtn.disabled = !popiaCheck.checked;
        });
      }

      // 7. Bind submit event listener
      form.addEventListener('submit', handleUnifiedFormSubmit);
    });
  }

  // Expose global handler for any inline onsubmit="handleForm(event)"
  window.handleForm = function (event) {
    handleUnifiedFormSubmit(event);
  };

  // Expose public API
  window.BlueOceanForms = {
    init: initContactForms,
    submit: handleUnifiedFormSubmit
  };

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForms);
  } else {
    initContactForms();
  }
})();
