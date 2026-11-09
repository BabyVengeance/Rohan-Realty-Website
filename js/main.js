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
    '580-riverside-road.html', 'the-avenues-centre.html', 'glass-house-building-2.html',
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

  /* --------------------------------------------------------------------------
     6. Notion-Style Floating Side Navigation Engine (Outline Rail)
     Auto-discovers sections, tracks active scroll state, and handles flyout
     -------------------------------------------------------------------------- */
  const initNotionSideNav = () => {
    // 1. Only run on property landing pages (exclude main portal indices)
    const portalPages = ['index.html', 'residential.html', 'commercial.html', 'about.html', 'contact.html', ''];
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (portalPages.includes(currentFile)) {
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

});
