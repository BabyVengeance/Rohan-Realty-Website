/**
 * BLUE OCEAN REALTY — TIER 2 EXECUTIVE LANDING PAGE ENGINE
 * Property: Unit 6 Sera Bella, 61 Mahogany Drive, Izinga Ridge, Umhlanga
 * Features:
 * 1. Mobile Menu Drawer
 * 2. Sticky Navbar Transition
 * 3. Progressive Gallery Engine (2 Initial Rows + 3 Rows Load More + Lightbox)
 * 4. Interactive Bond & Zero-Transfer-Duty Savings Calculator
 * 5. Form Validation & Submission Handler
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Mobile Menu Drawer Toggle & Touch State
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.getElementById('navMobile') || document.querySelector('.nav__mobile');
  const navBackdrop = document.getElementById('navBackdrop');
  const navClose = document.getElementById('navClose');
  const mobileActionBar = document.getElementById('mobileActionBar');

  const openMobileMenu = () => {
    navToggle?.setAttribute('aria-expanded', 'true');
    navMobile?.classList.add('is-open');
    navBackdrop?.classList.add('is-active');
    document.body.classList.add('menu-open');
    mobileActionBar?.classList.add('is-hidden');
  };

  const closeMobileMenu = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMobile?.classList.remove('is-open');
    navBackdrop?.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    if (window.scrollY > 350) {
      mobileActionBar?.classList.remove('is-hidden');
    }
  };

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navClose?.addEventListener('click', closeMobileMenu);
    navBackdrop?.addEventListener('click', closeMobileMenu);

    // Close menu when clicking links
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // ESC to close drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navbar Background Scroll State (rAF Throttled)
     -------------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  let isNavScrolled = false;
  let navTicking = false;

  const updateNavState = () => {
    const shouldBeScrolled = window.scrollY > 40;
    if (shouldBeScrolled !== isNavScrolled) {
      isNavScrolled = shouldBeScrolled;
      if (isNavScrolled) {
        nav?.classList.add('nav--scrolled');
        nav?.classList.remove('nav--transparent');
      } else {
        nav?.classList.remove('nav--scrolled');
        nav?.classList.add('nav--transparent');
      }
    }
    navTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(updateNavState);
      navTicking = true;
    }
  }, { passive: true });
  updateNavState(); // Initial check

  /* --------------------------------------------------------------------------
     3. Progressive Gallery Engine (Mandatory Skill Contract)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // Progressive parameters:
  // Desktop: 4 columns -> 2 rows = 8 items initially; 3 rows = 12 items on load more.
  // Mobile (<640px): 2 columns -> 2 rows = 4 items initially; 3 rows = 6 items on load more.
  const isMobile = () => window.innerWidth < 640;
  const getInitialLimit = () => isMobile() ? 4 : 8;
  const getBatchIncrement = () => isMobile() ? 8 : 16;

  let currentCategory = 'all';
  let visibleCount = getInitialLimit();

  function updateGalleryDisplay() {
    const matchingItems = galleryItems.filter(item => {
      const category = item.getAttribute('data-category');
      return currentCategory === 'all' || category === currentCategory;
    });

    matchingItems.forEach((item, index) => {
      if (index < visibleCount) {
        item.style.display = 'block';
        item.classList.remove('is-hidden');
        if (item.classList.contains('reveal-on-scroll')) {
          requestAnimationFrame(() => {
            item.classList.add('is-revealed');
          });
        }
      } else {
        item.style.display = 'none';
        item.classList.add('is-hidden');
      }
    });

    // Hide non-matching items completely
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (currentCategory !== 'all' && category !== currentCategory) {
        item.style.display = 'none';
        item.classList.add('is-hidden');
      }
    });

    // Update or toggle Load More button
    if (loadMoreBtn) {
      const remainingCount = matchingItems.length - visibleCount;
      if (remainingCount > 0) {
        loadMoreBtn.style.display = 'inline-flex';
        const countBadge = loadMoreBtn.querySelector('.gallery__count-pill');
        if (countBadge) {
          countBadge.textContent = `+${Math.min(remainingCount, getBatchIncrement())} Photos`;
        }
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      currentCategory = btn.getAttribute('data-filter') || 'all';
      visibleCount = getInitialLimit(); // Reset to initial 2 rows
      updateGalleryDisplay();
    });
  });

  // Load more button handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += getBatchIncrement();
      updateGalleryDisplay();
    });
  }

  // Handle window resize for gallery responsive limit
  window.addEventListener('resize', () => {
    if (visibleCount < getInitialLimit()) {
      visibleCount = getInitialLimit();
      updateGalleryDisplay();
    }
  });

  // Initialize gallery display
  updateGalleryDisplay();

  /* --------------------------------------------------------------------------
     4. Fullscreen Lightbox Modal Viewer
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__prev');
  const lightboxNext = document.querySelector('.lightbox__next');

  let activeReel = [];
  let currentReelIndex = 0;

  function openLightbox(indexInVisibleList) {
    // Collect all currently visible matching items
    activeReel = galleryItems.filter(item => {
      const category = item.getAttribute('data-category');
      return currentCategory === 'all' || category === currentCategory;
    });

    if (activeReel.length === 0) return;
    currentReelIndex = Math.max(0, Math.min(indexInVisibleList, activeReel.length - 1));
    renderLightboxItem();

    lightboxModal?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    mobileActionBar?.classList.add('is-hidden');
  }

  function closeLightbox() {
    lightboxModal?.classList.remove('is-open');
    document.body.style.overflow = '';
    if (window.scrollY > 350) {
      mobileActionBar?.classList.remove('is-hidden');
    }
  }

  function renderLightboxItem() {
    const activeItem = activeReel[currentReelIndex];
    if (!activeItem) return;

    const img = activeItem.querySelector('.gallery__img');
    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Unit 6 Sera Bella photography';
      lightboxImg.style.display = 'block';
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `Photo ${currentReelIndex + 1} of ${activeReel.length}`;
    }
  }

  function prevLightbox() {
    if (activeReel.length <= 1) return;
    currentReelIndex = (currentReelIndex - 1 + activeReel.length) % activeReel.length;
    renderLightboxItem();
  }

  function nextLightbox() {
    if (activeReel.length <= 1) return;
    currentReelIndex = (currentReelIndex + 1) % activeReel.length;
    renderLightboxItem();
  }

  // Attach click listener to gallery items
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const matchingItems = galleryItems.filter(i => {
        const cat = i.getAttribute('data-category');
        return currentCategory === 'all' || cat === currentCategory;
      });
      const indexInMatching = matchingItems.indexOf(item);
      openLightbox(indexInMatching !== -1 ? indexInMatching : 0);
    });
  });

  // Lightbox controls
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', prevLightbox);
  lightboxNext?.addEventListener('click', nextLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  // Backdrop click to close
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Mobile Touch Swipe Navigation for Lightbox (Frictionless thumb flick)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  lightboxModal?.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  lightboxModal?.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }
  }, { passive: true });

  function handleLightboxSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Dominant horizontal gesture with minimum 40px delta
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        nextLightbox(); // Swiped left -> next photo
      } else {
        prevLightbox(); // Swiped right -> prev photo
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. Interactive Bond & Zero Transfer Duty Savings Calculator
     -------------------------------------------------------------------------- */
  const priceInput = document.getElementById('purchasePriceInput');
  const depositInput = document.getElementById('depositInput');
  const interestInput = document.getElementById('interestInput');
  const termButtons = document.querySelectorAll('.calc-term-btn');
  const includeHoldingCheckbox = document.getElementById('includeHoldingCosts');

  const priceDisplay = document.getElementById('priceDisplay');
  const depositDisplay = document.getElementById('depositDisplay');
  const interestDisplay = document.getElementById('interestDisplay');
  const monthlyRepaymentVal = document.getElementById('monthlyRepaymentVal');
  const holdingCostSub = document.getElementById('holdingCostSub');
  const loanAmountVal = document.getElementById('loanAmountVal');
  const dutySavedVal = document.getElementById('dutySavedVal');

  let selectedTermYears = 20;
  const MONTHLY_RATES = 6829.27;
  const MONTHLY_LEVIES = 3885.15;
  const TOTAL_MONTHLY_HOLDING = MONTHLY_RATES + MONTHLY_LEVIES; // R10,714.42

  // Format ZAR currency
  const formatZAR = (num) => {
    return 'R' + Math.round(num).toLocaleString('en-ZA');
  };

  // SARS Transfer Duty Calculation Formula
  function calculateTransferDuty(propertyPrice) {
    if (propertyPrice <= 1100000) return 0;
    if (propertyPrice <= 1512500) {
      return (propertyPrice - 1100000) * 0.03;
    }
    if (propertyPrice <= 2117500) {
      return 12375 + (propertyPrice - 1512500) * 0.06;
    }
    if (propertyPrice <= 2722500) {
      return 12375 + 36300 + (propertyPrice - 2117500) * 0.08;
    }
    if (propertyPrice <= 12100000) {
      return 12375 + 36300 + 48400 + (propertyPrice - 2722500) * 0.11;
    }
    return 12375 + 36300 + 48400 + 1031525 + (propertyPrice - 12100000) * 0.13;
  }

  function updateCalculator() {
    const price = parseFloat(priceInput?.value || 8995000);
    const deposit = parseFloat(depositInput?.value || 899500);
    const interest = parseFloat(interestInput?.value || 11.75);
    const includeHolding = includeHoldingCheckbox?.checked ?? true;

    // Synchronize displays
    if (priceDisplay) priceDisplay.textContent = formatZAR(price);
    const depositPct = Math.round((deposit / price) * 100);
    if (depositDisplay) depositDisplay.textContent = `${formatZAR(deposit)} (${depositPct}%)`;
    if (interestDisplay) interestDisplay.textContent = `${interest.toFixed(2)}% (Prime)`;

    // Calculate loan financing
    const loanAmount = Math.max(0, price - deposit);
    if (loanAmountVal) loanAmountVal.textContent = formatZAR(loanAmount);

    // Monthly Bond Repayment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const monthlyRate = (interest / 100) / 12;
    const totalMonths = selectedTermYears * 12;

    let monthlyBond = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyBond = loanAmount * (monthlyRate * factor) / (factor - 1);
    }

    if (monthlyRepaymentVal) {
      monthlyRepaymentVal.textContent = formatZAR(monthlyBond);
    }

    // Holding cost addition
    if (holdingCostSub) {
      if (includeHolding) {
        const totalHolding = monthlyBond + TOTAL_MONTHLY_HOLDING;
        holdingCostSub.innerHTML = `+ R10,714 monthly rates & levies = <strong>${formatZAR(totalHolding)} / month</strong> total holding cost`;
      } else {
        holdingCostSub.innerHTML = `Base bond repayment excluding municipal rates and levies`;
      }
    }

    // Transfer Duty Saved
    const dutySaved = calculateTransferDuty(price);
    if (dutySavedVal) {
      dutySavedVal.textContent = formatZAR(dutySaved);
    }
  }

  // Term button handlers
  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      termButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-checked', 'true');
      selectedTermYears = parseInt(btn.getAttribute('data-term') || '20', 10);
      updateCalculator();
    });
  });

  // Slider inputs event bindings
  priceInput?.addEventListener('input', () => {
    // Keep deposit proportional if sliding price
    if (depositInput && priceInput) {
      const curPrice = parseFloat(priceInput.value);
      depositInput.max = (curPrice * 0.5).toString();
    }
    updateCalculator();
  });
  depositInput?.addEventListener('input', updateCalculator);
  interestInput?.addEventListener('input', updateCalculator);
  includeHoldingCheckbox?.addEventListener('change', updateCalculator);

  // Initial calculation trigger
  updateCalculator();

  /* --------------------------------------------------------------------------
     6. Enquiry Form Validation & Submission Handler
     -------------------------------------------------------------------------- */
  const enquiryForm = document.getElementById('propertyEnquiryForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      const name = enquiryForm.querySelector('#name')?.value.trim();
      const phone = enquiryForm.querySelector('#phone')?.value.trim();
      const email = enquiryForm.querySelector('#email')?.value.trim();

      if (!name || !phone || !email) {
        e.preventDefault();
        showFeedback('Please provide your full name, phone number, and email address to arrange a viewing.', 'error');
        return;
      }

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showFeedback('Please provide a valid email address.', 'error');
        return;
      }

      // Validating South African phone numbers (at least 9-10 digits)
      const cleanedPhone = phone.replace(/[^\d+]/g, '');
      if (cleanedPhone.length < 9) {
        e.preventDefault();
        showFeedback('Please provide a valid telephone number for booking confirmation.', 'error');
        return;
      }

      // Let FormSubmit handle native POST or async feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('span');
        if (btnText) btnText.textContent = 'Submitting Request...';
      }
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form__feedback is-${type}`;
    formFeedback.style.display = 'block';
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* --------------------------------------------------------------------------
     8. Sleek Scroll Reveal System (Emil Kowalski Design Engineering)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '[data-reveal], .duty-section__header, .duty-card, .section-intro, .editorial-card, .spec-card, .calc-card, .gallery__item, .location-card, .enquiry__info, .enquiry__form'
  );

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');

      // Stagger siblings in grid / stack layouts (60ms cascading delay)
      if (el.dataset.revealDelay) {
        const delayIdx = parseInt(el.dataset.revealDelay, 10);
        el.style.setProperty('--stagger-index', Math.max(0, delayIdx - 1));
      } else {
        const parent = el.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(c =>
            c.classList.contains('duty-card') ||
            c.classList.contains('spec-card') ||
            c.classList.contains('calc-card') ||
            c.classList.contains('gallery__item') ||
            c.classList.contains('location-card') ||
            c.classList.contains('editorial-card')
          );
          if (siblings.length > 1) {
            const idx = siblings.indexOf(el);
            el.style.setProperty('--stagger-index', idx % 4);
          }
        }
      }
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 40px 0px',
      threshold: 0.02
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     8. Floating Mobile Action Bar Scroll Controller (Mobile Only)
     -------------------------------------------------------------------------- */
  if (mobileActionBar) {
    let actionBarTicking = false;
    const updateActionBarState = () => {
      if (window.innerWidth <= 768) {
        const isMenuOpen = navMobile?.classList.contains('is-open');
        const isLightboxOpen = lightboxModal?.classList.contains('is-open');
        if (!isMenuOpen && !isLightboxOpen) {
          if (window.scrollY > 350) {
            mobileActionBar.classList.remove('is-hidden');
          } else {
            mobileActionBar.classList.add('is-hidden');
          }
        }
      } else {
        mobileActionBar.classList.add('is-hidden');
      }
      actionBarTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!actionBarTicking) {
        window.requestAnimationFrame(updateActionBarState);
        actionBarTicking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!actionBarTicking) {
        window.requestAnimationFrame(updateActionBarState);
        actionBarTicking = true;
      }
    }, { passive: true });
    
    // Initial state check
    updateActionBarState();
  }

});
