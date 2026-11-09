/**
 * 55 HAWAAN DRIVE — LUXURY REAL ESTATE LANDING PAGE ENGINE
 * Tier 3: Obsidian & Champagne Gold Trophy Residence
 * Author: Blue Ocean Realty
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ============================================================
     1. CURATED PHOTOGRAPHY CATALOG (56 HIGH-RESOLUTION ASSETS)
     ============================================================ */
  const PROPERTY_GALLERY = [
    { id: 'house-01', title: "Front Architectural Facade & Motor Court with Timber Cladding", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-01.jpg', full: 'assets/properties/55-hawaan-drive/images/house-01.jpg' },
    { id: 'house-02', title: "Internal Living Vista Through Glazed Facade to Pergola Garden", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-02.jpg', full: 'assets/properties/55-hawaan-drive/images/house-02.jpg' },
    { id: 'house-03', title: "Automated Timber-Clad Double Garage & Paved Motor Court", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-03.jpg', full: 'assets/properties/55-hawaan-drive/images/house-03.jpg' },
    { id: 'house-04', title: "Contemporary Front Elevation & Indigenous Landscaped Courtyard", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-04.jpg', full: 'assets/properties/55-hawaan-drive/images/house-04.jpg' },
    { id: 'house-05', title: "Undercover Alfresco Entertainer's Patio with Concrete Pillars", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-05.jpg', full: 'assets/properties/55-hawaan-drive/images/house-05.jpg' },
    { id: 'house-06', title: "Swimming Pool, Balau Timber Sun Deck & Rear Modern Architecture", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-06.jpg', full: 'assets/properties/55-hawaan-drive/images/house-06.jpg' },
    { id: 'house-07', title: "Sparkling Swimming Pool & Cascading Water Feature", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-07.jpg', full: 'assets/properties/55-hawaan-drive/images/house-07.jpg' },
    { id: 'house-08', title: "Lap Swimming Pool, Sun Loungers & Private Forest Boundary", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-08.jpg', full: 'assets/properties/55-hawaan-drive/images/house-08.jpg' },
    { id: 'house-09', title: "Manicured Lawn Garden, Stepping Pathway & Concrete Cantilever", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-09.jpg', full: 'assets/properties/55-hawaan-drive/images/house-09.jpg' },
    { id: 'house-10', title: "Covered Patio Lounge Suite with Seamless Flow to Garden & Pool", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-10.jpg', full: 'assets/properties/55-hawaan-drive/images/house-10.jpg' },
    { id: 'house-11', title: "Entertainer's Outdoor Dining & Lounging Pavilion", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-11.jpg', full: 'assets/properties/55-hawaan-drive/images/house-11.jpg' },
    { id: 'house-12', title: "Rear Architectural Elevation Bordering Pristine Forest Canopy", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-12.jpg', full: 'assets/properties/55-hawaan-drive/images/house-12.jpg' },
    { id: 'house-13', title: "Lush Forest Garden Perspective & Upper Bedroom Balcony", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-13.jpg', full: 'assets/properties/55-hawaan-drive/images/house-13.jpg' },
    { id: 'house-14', title: "Architectural Pergola Slatting & Border Courtyard Garden", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-14.jpg', full: 'assets/properties/55-hawaan-drive/images/house-14.jpg' },
    { id: 'house-15', title: "Natural Eco Wetland Pond with Water Lilies & Motor Court Entry", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-15.jpg', full: 'assets/properties/55-hawaan-drive/images/house-15.jpg' },
    { id: 'house-16', title: "Front Approach with Indigenous Wetland Pond & Timber Cladding", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-16.jpg', full: 'assets/properties/55-hawaan-drive/images/house-16.jpg' },
    { id: 'house-17', title: "Grand Open-Plan Living & Dining Salon with Solid European Oak Flooring", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-17.jpg', full: 'assets/properties/55-hawaan-drive/images/house-17.jpg' },
    { id: 'house-18', title: "Formal Reception Lounge with Slatted Timber Entertainment Wall", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-18.jpg', full: 'assets/properties/55-hawaan-drive/images/house-18.jpg' },
    { id: 'house-19', title: "Primary Living Room with Curved Designer Lounge & Concrete Ceiling", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-19.jpg', full: 'assets/properties/55-hawaan-drive/images/house-19.jpg' },
    { id: 'house-20', title: "Formal Dining Room with Designer Chandelier & Glass Pool Outlook", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-20.jpg', full: 'assets/properties/55-hawaan-drive/images/house-20.jpg' },
    { id: 'house-21', title: "Executive Dining Suite Looking Towards Internal Zen Atrium", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-21.jpg', full: 'assets/properties/55-hawaan-drive/images/house-21.jpg' },
    { id: 'house-22', title: "Gourmet Designer Kitchen with Central Quartz Island & Oak Shelving", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-22.jpg', full: 'assets/properties/55-hawaan-drive/images/house-22.jpg' },
    { id: 'house-23', title: "Kitchen Island Workstation with Inset Gas Cooktop & Scullery Access", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-23.jpg', full: 'assets/properties/55-hawaan-drive/images/house-23.jpg' },
    { id: 'house-24', title: "Expansive Chef Scullery Corridor with Stainless Steel Prep Surfaces", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-24.jpg', full: 'assets/properties/55-hawaan-drive/images/house-24.jpg' },
    { id: 'house-25', title: "Kitchen Breakfast Island with Full Garden Sliding Doors", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-25.jpg', full: 'assets/properties/55-hawaan-drive/images/house-25.jpg' },
    { id: 'house-26', title: "Chef's Perspective Over Gas Cooktop to Dining Room & Pool Terrace", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-26.jpg', full: 'assets/properties/55-hawaan-drive/images/house-26.jpg' },
    { id: 'house-27', title: "Light-Filled Gallery Hallway with Driftwood Console & Oak Flooring", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-27.jpg', full: 'assets/properties/55-hawaan-drive/images/house-27.jpg' },
    { id: 'house-28', title: "Internal Glass-Encased Zen Garden Atrium with Living Botanicals", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-28.jpg', full: 'assets/properties/55-hawaan-drive/images/house-28.jpg' },
    { id: 'house-29', title: "Ground-Floor Reception Foyer with Floor-to-Ceiling Glazing", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-29.jpg', full: 'assets/properties/55-hawaan-drive/images/house-29.jpg' },
    { id: 'house-30', title: "Central Ground Floor Hallway Leading to Floating Oak Staircase", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-30.jpg', full: 'assets/properties/55-hawaan-drive/images/house-30.jpg' },
    { id: 'house-31', title: "Intimate Formal Conversational Salon with Custom Dark Joinery", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-31.jpg', full: 'assets/properties/55-hawaan-drive/images/house-31.jpg' },
    { id: 'house-32', title: "Secondary Formal Lounge Seating Area with Sculptural Coffee Table", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-32.jpg', full: 'assets/properties/55-hawaan-drive/images/house-32.jpg' },
    { id: 'house-33', title: "Floating Solid Oak Cantilever Staircase & Frameless Glass Balustrade", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-33.jpg', full: 'assets/properties/55-hawaan-drive/images/house-33.jpg' },
    { id: 'house-34', title: "Ground-Floor VIP Guest Suite (Bedroom 4) with Emerald Velvet Headboard", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-34.jpg', full: 'assets/properties/55-hawaan-drive/images/house-34.jpg' },
    { id: 'house-35', title: "VIP Guest Suite Flowing Directly to Private Enclosed Courtyard", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-35.jpg', full: 'assets/properties/55-hawaan-drive/images/house-35.jpg' },
    { id: 'house-36', title: "Guest Bedroom Outlook to Secluded Gravel Garden & Pergola", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-36.jpg', full: 'assets/properties/55-hawaan-drive/images/house-36.jpg' },
    { id: 'house-37', title: "Private Concrete & Timber Courtyard with Stepping Stones", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-37.jpg', full: 'assets/properties/55-hawaan-drive/images/house-37.jpg' },
    { id: 'house-38', title: "Secluded Outdoor Rain Shower in Private Guest Courtyard", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-38.jpg', full: 'assets/properties/55-hawaan-drive/images/house-38.jpg' },
    { id: 'house-39', title: "Ground-Floor VIP Guest En-Suite with Floating Vanity & Walk-In Shower", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-39.jpg', full: 'assets/properties/55-hawaan-drive/images/house-39.jpg' },
    { id: 'house-40', title: "Upper Level Gallery Landing Overlooking Staircase Void", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-40.jpg', full: 'assets/properties/55-hawaan-drive/images/house-40.jpg' },
    { id: 'house-41', title: "Upstairs Architectural Gallery Hall with Raw Concrete Ceiling", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-41.jpg', full: 'assets/properties/55-hawaan-drive/images/house-41.jpg' },
    { id: 'house-42', title: "Upper Level Corner Window Gallery with Panoramic Sky Vistas", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-42.jpg', full: 'assets/properties/55-hawaan-drive/images/house-42.jpg' },
    { id: 'house-43', title: "Master Spa Bathroom Dressing Vanity with Linear Vanity Mirror", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-43.jpg', full: 'assets/properties/55-hawaan-drive/images/house-43.jpg' },
    { id: 'house-44', title: "Master En-Suite Spa with Freestanding Soaking Tub & Double Walk-In Shower", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-44.jpg', full: 'assets/properties/55-hawaan-drive/images/house-44.jpg' },
    { id: 'house-45', title: "Master Bathroom Panorama Featuring Natural Travertine Finishes", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-45.jpg', full: 'assets/properties/55-hawaan-drive/images/house-45.jpg' },
    { id: 'house-46', title: "Primary Master Suite with Slatted Oak Feature Wall & Balcony Access", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-46.jpg', full: 'assets/properties/55-hawaan-drive/images/house-46.jpg' },
    { id: 'house-47', title: "Private Master Suite Balcony Overlooking Hawaan Forest Canopy", category: 'outdoor', thumb: 'assets/properties/55-hawaan-drive/images/house-47.jpg', full: 'assets/properties/55-hawaan-drive/images/house-47.jpg' },
    { id: 'house-48', title: "Master Bedroom Sanctuary with Walk-Through Glass Wardrobe Boutique", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-48.jpg', full: 'assets/properties/55-hawaan-drive/images/house-48.jpg' },
    { id: 'house-49', title: "Upper Glass Bridge Walkway Linking Master Suite to Family Wing", category: 'living', thumb: 'assets/properties/55-hawaan-drive/images/house-49.jpg', full: 'assets/properties/55-hawaan-drive/images/house-49.jpg' },
    { id: 'house-50', title: "Executive Suite 2 with Wall-to-Wall Glazing & Forest Views", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-50.jpg', full: 'assets/properties/55-hawaan-drive/images/house-50.jpg' },
    { id: 'house-51', title: "Executive Suite 2 Dressing Corridor & Private En-Suite Entrance", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-51.jpg', full: 'assets/properties/55-hawaan-drive/images/house-51.jpg' },
    { id: 'house-52', title: "Executive Suite 2 Custom Fitted Robes & Integrated Study Vanity", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-52.jpg', full: 'assets/properties/55-hawaan-drive/images/house-52.jpg' },
    { id: 'house-53', title: "Suite 2 Luxury En-Suite with Circular Illuminated Vanity Mirror", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-53.jpg', full: 'assets/properties/55-hawaan-drive/images/house-53.jpg' },
    { id: 'house-54', title: "Executive Suite 3 with King Bed & Floor-to-Ceiling Corner Windows", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-54.jpg', full: 'assets/properties/55-hawaan-drive/images/house-54.jpg' },
    { id: 'house-55', title: "Executive Suite 3 Dressing Area, Built-In Desk & En-Suite Portal", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-55.jpg', full: 'assets/properties/55-hawaan-drive/images/house-55.jpg' },
    { id: 'house-56', title: "Suite 3 Designer En-Suite Bathroom with Fluted Wall & Round Mirror", category: 'suites', thumb: 'assets/properties/55-hawaan-drive/images/house-56.jpg', full: 'assets/properties/55-hawaan-drive/images/house-56.jpg' }
  ];

  /* ============================================================
     2. PROGRESSIVE GALLERY ENGINE (2 INITIAL ROWS + 3 LOAD MORE)
     ============================================================ */
  const galleryGrid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMorePhotosBtn');
  const loadMoreText = document.getElementById('loadMoreText');
  const loadMoreWrap = document.getElementById('galleryLoadMoreWrap');
  const filterButtons = document.querySelectorAll('.gallery__filter-btn');

  function getBatchCounts() {
    const isMobile = window.innerWidth <= 768;
    return {
      initial: isMobile ? 4 : 8,   // Exactly 2 rows (2-col mobile or 4-col desktop)
      step: isMobile ? 6 : 12      // Exactly 3 rows (2-col mobile or 4-col desktop)
    };
  }

  let currentFilter = 'all';
  let visibleCount = getBatchCounts().initial;
  let activeFilteredList = [...PROPERTY_GALLERY];

  function getFilteredPhotos(filter) {
    if (filter === 'all') return PROPERTY_GALLERY;
    return PROPERTY_GALLERY.filter(item => item.category === filter);
  }

  function renderGallery() {
    activeFilteredList = getFilteredPhotos(currentFilter);
    const photosToDisplay = activeFilteredList.slice(0, visibleCount);

    galleryGrid.innerHTML = '';

    photosToDisplay.forEach((photo, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'gallery__item';
      itemEl.setAttribute('role', 'button');
      itemEl.setAttribute('tabindex', '0');
      itemEl.setAttribute('aria-label', `View ${photo.title}`);
      itemEl.dataset.index = index;

      itemEl.innerHTML = `
        <img src="${photo.thumb}" alt="${photo.title}" loading="lazy" class="gallery__img" onerror="this.style.display='none'">
        <div class="gallery__item-overlay" aria-hidden="true">
          <div class="gallery__expand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>
      `;

      itemEl.addEventListener('click', () => openLightbox(index));
      itemEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      galleryGrid.appendChild(itemEl);
    });

    // Update Load More Button & Remaining Count
    const remaining = activeFilteredList.length - visibleCount;
    if (remaining > 0) {
      loadMoreWrap.style.display = 'flex';
      const stepCount = getBatchCounts().step;
      const nextBatch = Math.min(stepCount, remaining);
      loadMoreText.textContent = `Load More Photos (+${nextBatch} Photos)`;
    } else {
      loadMoreWrap.style.display = 'none';
    }
  }

  // Load More Button Handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += getBatchCounts().step;
      renderGallery();
    });
  }

  // Category Filter Tab Handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      currentFilter = btn.dataset.filter;
      visibleCount = getBatchCounts().initial; // Reset to 2 rows
      renderGallery();
    });
  });

  // Responsive resize handler with debounce for gallery initial rows
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (visibleCount <= 8) {
        visibleCount = getBatchCounts().initial;
        renderGallery();
      }
    }, 150);
  }, { passive: true });

  // Initial render
  renderGallery();

  /* ============================================================
     3. LIGHTBOX VIEWER (LOCKED SELECTORS & CONTRACT)
     ============================================================ */
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeLightboxIndex = 0;

  function openLightbox(index) {
    activeLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    if (!activeFilteredList[activeLightboxIndex]) return;
    const photo = activeFilteredList[activeLightboxIndex];
    lightboxImg.src = photo.full;
    lightboxImg.alt = photo.title;
    lightboxCounter.innerHTML = `<span class="lightbox__caption-title">${photo.title}</span> &middot; <span class="lightbox__counter-nums">${activeLightboxIndex + 1} / ${activeFilteredList.length}</span>`;
  }

  function nextLightbox() {
    activeLightboxIndex = (activeLightboxIndex + 1) % activeFilteredList.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    activeLightboxIndex = (activeLightboxIndex - 1 + activeFilteredList.length) % activeFilteredList.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  // Backdrop click closes lightbox
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox__image-wrap')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // Mobile Touch Swipe Gestures for Lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleLightboxSwipe();
      }
    }, { passive: true });
  }

  function handleLightboxSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const thresholdX = 40;
    const thresholdY = 60;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > thresholdX) {
      if (diffX < 0) {
        nextLightbox(); // Swipe left -> next image
      } else {
        prevLightbox(); // Swipe right -> previous image
      }
    } else if (diffY > thresholdY && Math.abs(diffX) < 50) {
      closeLightbox(); // Swipe down -> close lightbox
    }
  }

  /* ============================================================
     4. LUXURY BOND & SARS TRANSFER DUTY CALCULATOR
     ============================================================ */
  const priceInput = document.getElementById('calcPurchasePrice');
  const priceDisplay = document.getElementById('calcPurchasePriceDisplay');
  const depositInput = document.getElementById('calcDepositPercent');
  const depositDisplay = document.getElementById('calcDepositDisplay');
  const rateInput = document.getElementById('calcInterestRate');
  const rateDisplay = document.getElementById('calcInterestRateDisplay');
  const termButtons = document.querySelectorAll('.calc__term-btn');
  const priceToggleBtns = document.querySelectorAll('.calc__toggle-btn');

  const monthlyRepaymentDisplay = document.getElementById('calcMonthlyRepayment');
  const loanFinancedDisplay = document.getElementById('calcLoanFinanced');
  const transferDutyDisplay = document.getElementById('calcTransferDuty');
  const conveyancingDisplay = document.getElementById('calcConveyancing');
  const totalMonthlyDisplay = document.getElementById('calcTotalMonthly');
  const qualifyingIncomeDisplay = document.getElementById('calcQualifyingIncome');

  let selectedTermYears = 20;
  const MONTHLY_RATES = 15024;
  const MONTHLY_LEVIES = 4179;

  function formatZAR(amount) {
    return 'R ' + Math.round(amount).toLocaleString('en-ZA');
  }

  /**
   * SARS Official Transfer Duty Formula (2024–2026 Tax Schedule)
   * Values exceeding R12.1M are taxed at R1,128,600 + 13% of the value above R12,100,000.
   */
  function calculateTransferDuty(price) {
    if (price <= 1100000) return 0;
    if (price <= 1512500) return (price - 1100000) * 0.03;
    if (price <= 2117500) return 12375 + (price - 1512500) * 0.06;
    if (price <= 2722500) return 48675 + (price - 2117500) * 0.08;
    if (price <= 12100000) return 97075 + (price - 2722500) * 0.11;
    return 1128600 + (price - 12100000) * 0.13;
  }

  function calculateBond() {
    if (!priceInput) return;
    const price = parseFloat(priceInput.value) || 19995000;
    const depositPct = parseFloat(depositInput.value) || 0;
    const ratePct = parseFloat(rateInput.value) || 11.75;
    const termMonths = selectedTermYears * 12;

    const depositAmount = price * (depositPct / 100);
    const loanAmount = Math.max(0, price - depositAmount);

    // Live display labels
    priceDisplay.textContent = formatZAR(price);
    depositDisplay.textContent = `${depositPct}% (${formatZAR(depositAmount)})`;
    rateDisplay.textContent = `${ratePct.toFixed(2)}%${ratePct === 11.75 ? ' (SA Prime)' : ''}`;

    // Monthly Amortization Formula
    const monthlyRate = (ratePct / 100) / 12;
    let monthlyRepayment = 0;

    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyRepayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    }

    // SARS Transfer Duty & Conveyancing Fees
    const transferDuty = calculateTransferDuty(price);
    // Conveyancing estimation based on Law Society guidelines for high-value bond registration
    const conveyancingFees = Math.round(price * 0.009 + 38000);

    const totalMonthlyCarrying = monthlyRepayment + MONTHLY_RATES + MONTHLY_LEVIES;
    // South African standard 30% gross income threshold for bond approval
    const qualifyingIncome = monthlyRepayment / 0.30;

    // Update Output Elements
    monthlyRepaymentDisplay.textContent = formatZAR(monthlyRepayment);
    loanFinancedDisplay.textContent = formatZAR(loanAmount);
    transferDutyDisplay.textContent = formatZAR(transferDuty);
    conveyancingDisplay.textContent = formatZAR(conveyancingFees);
    totalMonthlyDisplay.textContent = `${formatZAR(totalMonthlyCarrying)} / mo`;
    qualifyingIncomeDisplay.textContent = `${formatZAR(qualifyingIncome)} / mo`;
  }

  // Event Listeners for Calculator
  if (priceInput) priceInput.addEventListener('input', calculateBond);
  if (depositInput) depositInput.addEventListener('input', calculateBond);
  if (rateInput) rateInput.addEventListener('input', calculateBond);

  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      termButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedTermYears = parseInt(btn.dataset.term, 10);
      calculateBond();
    });
  });

  priceToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priceToggleBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const newPrice = parseFloat(btn.dataset.price);
      if (priceInput) {
        priceInput.value = newPrice;
        calculateBond();
      }
    });
  });

  // Initial Calculation Run
  calculateBond();

  /* ============================================================
     5. NAVIGATION & MOBILE DRAWER (LOCKED CONTRACT)
     ============================================================ */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile a');

  // Sticky Navbar Transparency Handler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }, { passive: true });

  // Mobile Hamburger Toggle & Drawer Controller
  if (navToggle && navMobile) {
    function toggleDrawer(open) {
      const shouldOpen = typeof open === 'boolean' ? open : !navMobile.classList.contains('is-open');
      navMobile.classList.toggle('is-open', shouldOpen);
      navToggle.classList.toggle('is-active', shouldOpen);
      navToggle.setAttribute('aria-expanded', shouldOpen.toString());
      document.body.classList.toggle('drawer-open', shouldOpen);
    }

    navToggle.addEventListener('click', () => toggleDrawer());

    // Close Mobile Menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
        toggleDrawer(false);
      }
    });

    // Close when tapping outside drawer on mobile
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('is-open') && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
        toggleDrawer(false);
      }
    });
  }

  /* ============================================================
     6. SCROLL REVEAL OBSERVER (.animate-on-scroll)
     ============================================================ */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser lacks IntersectionObserver
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ============================================================
     7. ENQUIRY FORM CLIENT-SIDE VALIDATION & HANDLING
     ============================================================ */
  const enquiryForm = document.getElementById('propertyEnquiryForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const emailInput = document.getElementById('email');

      if (!nameInput.value.trim() || !phoneInput.value.trim() || !emailInput.value.trim()) {
        e.preventDefault();
        showFeedback('Please provide your name, phone number, and email address.', 'error');
        return;
      }

      // Email format check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        e.preventDefault();
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // If valid, show submitting state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <span>Sending Request...</span>
        `;
      }
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form__feedback is-${type}`;
    formFeedback.style.display = 'block';
    setTimeout(() => {
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
});
