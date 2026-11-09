/**
 * BLUE OCEAN REALTY — MASTER LANDING PAGE ENGINE
 * Property: 12 Sera Bella, Izinga Ridge, Umhlanga
 * Features: Mobile Drawer, Progressive 2+3 Gallery, Lightbox Modal, 
 *           Bond & 0-Transfer-Duty Savings Calculator, Form Validation & Scroll Observer.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Mobile Menu Drawer Toggle & Touch State
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');

  if (navToggle && navMobile) {
    function closeMobileMenu() {
      navToggle.setAttribute('aria-expanded', 'false');
      navMobile.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function openMobileMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      navMobile.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on click outside mobile drawer
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('is-open') && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navbar Background Scroll State
     -------------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('nav--scrolled');
      nav?.classList.remove('nav--transparent');
    } else {
      nav?.classList.remove('nav--scrolled');
      nav?.classList.add('nav--transparent');
    }
  }, { passive: true });

  /* --------------------------------------------------------------------------
     3. Progressive Gallery Engine (2 Rows Initial + 3 Rows Load More)
     -------------------------------------------------------------------------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const loadMoreBtn = document.getElementById('loadMoreGalleryBtn');
  const hiddenCountBadge = document.getElementById('galleryHiddenCount');

  // Progressive limits (Desktop 4 cols: row 1-2 = ~8 items, batch 3-4 rows = ~16 items)
  const INITIAL_VISIBLE_COUNT = 8;
  const LOAD_MORE_BATCH_COUNT = 16;

  let currentCategory = 'all';
  let visibleLimit = INITIAL_VISIBLE_COUNT;

  function refreshGallery() {
    // 1. Filter matching items
    const matchingItems = galleryItems.filter(item => {
      const cat = item.getAttribute('data-category');
      return currentCategory === 'all' || cat === currentCategory;
    });

    // 2. Hide all items first
    galleryItems.forEach(item => {
      item.style.display = 'none';
    });

    // 3. Show matching items up to visibleLimit
    matchingItems.slice(0, visibleLimit).forEach(item => {
      item.style.display = 'block';
    });

    // 4. Update or hide Load More button
    const remainingCount = matchingItems.length - visibleLimit;
    if (remainingCount > 0) {
      loadMoreBtn.style.display = 'inline-flex';
      if (hiddenCountBadge) {
        hiddenCountBadge.textContent = `+ ${remainingCount} Photos`;
      }
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      currentCategory = btn.getAttribute('data-filter') || 'all';
      visibleLimit = INITIAL_VISIBLE_COUNT; // Reset progressive window to 2 rows
      refreshGallery();
    });
  });

  // Load More Button Click
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleLimit += LOAD_MORE_BATCH_COUNT;
      refreshGallery();
    });
  }

  // Initial render
  refreshGallery();

  /* --------------------------------------------------------------------------
     4. Fullscreen Lightbox Modal Viewer
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__prev');
  const lightboxNext = document.querySelector('.lightbox__next');

  let activeGalleryList = [];
  let currentIndex = 0;

  function updateActiveGalleryList() {
    const visibleCards = galleryItems.filter(item => item.style.display !== 'none');
    activeGalleryList = visibleCards.map(item => {
      const img = item.querySelector('img');
      return {
        src: img?.getAttribute('src') || '',
        alt: img?.getAttribute('alt') || '12 Sera Bella Photograph'
      };
    });
  }

  function showImage(index) {
    if (!lightboxImg || !activeGalleryList[index]) return;
    lightboxImg.src = activeGalleryList[index].src;
    lightboxImg.alt = activeGalleryList[index].alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${activeGalleryList.length}`;
    }
  }

  function openLightbox(index) {
    updateActiveGalleryList();
    if (activeGalleryList.length === 0) return;
    currentIndex = index;
    showImage(currentIndex);
    lightboxModal?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal?.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Item click listeners
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateActiveGalleryList();
      const clickedImg = item.querySelector('img');
      const clickedSrc = clickedImg?.getAttribute('src');
      const foundIdx = activeGalleryList.findIndex(obj => obj.src === clickedSrc);
      openLightbox(foundIdx >= 0 ? foundIdx : 0);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    showImage(currentIndex);
  });

  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % activeGalleryList.length;
    showImage(currentIndex);
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
      showImage(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % activeGalleryList.length;
      showImage(currentIndex);
    }
  });

  // Touch Swipe Gestures for Mobile Fullscreen Browsing
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }, { passive: true });

    function handleLightboxSwipe() {
      if (!lightboxModal.classList.contains('is-active')) return;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Horizontal swipe threshold: 45px
      if (absDeltaX > 45 && absDeltaX > absDeltaY * 1.3) {
        if (deltaX < 0) {
          // Swiped Left -> Next Photo
          currentIndex = (currentIndex + 1) % activeGalleryList.length;
          showImage(currentIndex);
        } else {
          // Swiped Right -> Previous Photo
          currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
          showImage(currentIndex);
        }
      } else if (deltaY > 80 && absDeltaY > absDeltaX * 1.5) {
        // Swiped Down -> Close Modal
        closeLightbox();
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. Interactive Bond & Zero Transfer Duty Calculator
     -------------------------------------------------------------------------- */
  const priceInput = document.getElementById('calcPrice');
  const depositInput = document.getElementById('calcDeposit');
  const rateInput = document.getElementById('calcRate');
  const termBtns = document.querySelectorAll('.term-btn');

  const priceDisplay = document.getElementById('calcPriceDisplay');
  const depositPercent = document.getElementById('calcDepositPercent');
  const depositVal = document.getElementById('calcDepositVal');
  const rateDisplay = document.getElementById('calcRateDisplay');
  const monthlyRepay = document.getElementById('calcMonthlyRepay');
  const dutySaved = document.getElementById('calcDutySaved');
  const totalLoan = document.getElementById('calcTotalLoan');
  const totalInterest = document.getElementById('calcTotalInterest');

  let loanYears = 20;

  function formatZAR(num) {
    return 'R ' + Math.round(num).toLocaleString('en-ZA');
  }

  function calculateSARSDuty(price) {
    if (price <= 1100000) return 0;
    if (price <= 1512500) return (price - 1100000) * 0.03;
    if (price <= 2117500) return 12375 + (price - 1512500) * 0.06;
    if (price <= 2722500) return 48675 + (price - 2117500) * 0.08;
    if (price <= 12100000) return 97075 + (price - 2722500) * 0.11;
    return 1128600 + (price - 12100000) * 0.13;
  }

  function updateCalculator() {
    const price = parseFloat(priceInput?.value || 9575000);
    const depPercent = parseFloat(depositInput?.value || 10);
    const annualRate = parseFloat(rateInput?.value || 11.25);

    const depositAmount = price * (depPercent / 100);
    const principal = price - depositAmount;

    // Monthly Amortization
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = loanYears * 12;
    
    let monthlyInstallment = 0;
    if (monthlyRate > 0) {
      monthlyInstallment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                           (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyInstallment = principal / totalMonths;
    }

    const totalPaid = monthlyInstallment * totalMonths;
    const interestPaid = totalPaid - principal;
    const standardDuty = calculateSARSDuty(price);

    // Update DOM Readouts
    if (priceDisplay) priceDisplay.textContent = formatZAR(price);
    if (depositPercent) depositPercent.textContent = `${depPercent}%`;
    if (depositVal) depositVal.textContent = formatZAR(depositAmount);
    if (rateDisplay) rateDisplay.textContent = `${annualRate.toFixed(2)}% ${annualRate === 11.25 ? '(Prime)' : ''}`;
    if (monthlyRepay) monthlyRepay.textContent = formatZAR(monthlyInstallment);
    if (dutySaved) dutySaved.textContent = `~${formatZAR(standardDuty)}`;
    if (totalLoan) totalLoan.textContent = formatZAR(principal);
    if (totalInterest) totalInterest.textContent = formatZAR(interestPaid);
  }

  priceInput?.addEventListener('input', updateCalculator);
  depositInput?.addEventListener('input', updateCalculator);
  rateInput?.addEventListener('input', updateCalculator);

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      loanYears = parseInt(btn.getAttribute('data-term') || '20', 10);
      updateCalculator();
    });
  });

  // Run on load
  updateCalculator();

  /* --------------------------------------------------------------------------
     6. Lead Capture Form Validation & Feedback
     -------------------------------------------------------------------------- */
  const enquiryForm = document.getElementById('propertyEnquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      const name = enquiryForm.querySelector('#name')?.value.trim();
      const phone = enquiryForm.querySelector('#phone')?.value.trim();
      const email = enquiryForm.querySelector('#email')?.value.trim();

      if (!name || !phone || !email) {
        e.preventDefault();
        showFeedback('Please complete all required fields.', 'is-error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showFeedback('Please provide a valid email address.', 'is-error');
        return;
      }

      const submitBtn = enquiryForm.querySelector('#submitBtn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Submitting Request...</span>';
      }
    });
  }

  function showFeedback(msg, className) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form__feedback ${className}`;
    formFeedback.style.display = 'block';
  }

  /* --------------------------------------------------------------------------
     7. Intersection Observer for Scroll Animations
     -------------------------------------------------------------------------- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

});

