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
  const navBackdrop = document.querySelector('.nav__mobile-backdrop');

  const openMobileNav = () => {
    navToggle?.setAttribute('aria-expanded', 'true');
    navMobile?.classList.add('is-open');
    navBackdrop?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMobile?.classList.remove('is-open');
    navBackdrop?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navBackdrop?.addEventListener('click', closeMobileNav);

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
  }

  /* --------------------------------------------------------------------------
     3. Synchronized Active Navigation Link Highlighter
     -------------------------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('/').pop().split('#')[0];

    if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
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
     4. Consultation & Viewing Enquiry Form Handler
     -------------------------------------------------------------------------- */
  const urlParams = new URLSearchParams(window.location.search);
  const propertyParam = urlParams.get('property');
  if (propertyParam) {
    const msgTextarea = document.querySelector('[name="message"]');
    if (msgTextarea && !msgTextarea.value.includes(propertyParam)) {
      msgTextarea.value = `I would like to request the Information Memorandum and schedule a confidential discussion regarding: ${propertyParam}.\n\n` + msgTextarea.value;
    }
  }

  const forms = document.querySelectorAll('form[name="viewing-enquiry"], form[name="contact-enquiry"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      // Basic validation
      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');
      const email = form.querySelector('[name="email"]');

      if (!name?.value.trim() || !phone?.value.trim() || !email?.value.trim()) {
        alert('Please fill in all required fields (Full Name, Phone, and Email).');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width:18px; height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Processing Request...
        `;
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(201,160,80,0.15); border: 2px solid #C9A050; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#C9A050" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #0A192F; margin-bottom: 0.5rem;">Confidential Request Received</h4>
            <p style="font-size: 0.9375rem; color: #64748B; max-width: 44ch; margin: 0 auto 1.5rem;">
              Thank you, <strong>${name.value}</strong>. Rohan Ramlall and the Blue Ocean Realty private client team will be in touch directly.
            </p>
            <a href="tel:0695224226" class="btn btn--primary" style="display: inline-flex;">
              Call Rohan Directly: 069 522 4226
            </a>
          </div>
        `;
      }, 900);
    });
  });

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

});
