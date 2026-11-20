/**
 * 40 IDWALA CIRCLE, IZINGA PARK — LUXURY REAL ESTATE LANDING PAGE ENGINE
 * Tier 3: Obsidian & Champagne Gold Trophy Residence
 * Author: Blue Ocean Realty
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ============================================================
     1. CURATED PHOTOGRAPHY CATALOG (62 HIGH-RESOLUTION ASSETS)
     ============================================================ */
  const PROPERTY_GALLERY = [
    { id: 'photo-01', title: "Architectural Rear Facade & Sparkling Swimming Pool", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_01_389426148.webp', full: 'assets/properties/40-idwala-circle/images/photo_01_389426148.webp' },
    { id: 'photo-02', title: "Sun-Drenched Pool Terrace & Manicured Lawn", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_02_389426149.webp', full: 'assets/properties/40-idwala-circle/images/photo_02_389426149.webp' },
    { id: 'photo-03', title: "Grand Exterior Elevation with Glass Balconies", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_03_389426150.webp', full: 'assets/properties/40-idwala-circle/images/photo_03_389426150.webp' },
    { id: 'photo-04', title: "Poolside Entertainment Deck & Covered Alfresco Patio", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_04_389426151.webp', full: 'assets/properties/40-idwala-circle/images/photo_04_389426151.webp' },
    { id: 'photo-05', title: "Contemporary Architectural Lines & Landscaped Grounds", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_05_389426152.webp', full: 'assets/properties/40-idwala-circle/images/photo_05_389426152.webp' },
    { id: 'photo-06', title: "Expansive Open-Plan Formal Lounge with Porcelain Tiling", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_06_389426153.webp', full: 'assets/properties/40-idwala-circle/images/photo_06_389426153.webp' },
    { id: 'photo-07', title: "Direct Flow Between Living Room and Outdoor Terrace", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_07_389426154.webp', full: 'assets/properties/40-idwala-circle/images/photo_07_389426154.webp' },
    { id: 'photo-08', title: "Double-Volume Living Spaces & Designer Ambient Lighting", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_08_389426155.webp', full: 'assets/properties/40-idwala-circle/images/photo_08_389426155.webp' },
    { id: 'photo-09', title: "Sophisticated Dining Room Designed for Entertaining", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_09_389426156.webp', full: 'assets/properties/40-idwala-circle/images/photo_09_389426156.webp' },
    { id: 'photo-10', title: "Open-Plan Dining Suite with Architectural Glazing", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_10_389426157.webp', full: 'assets/properties/40-idwala-circle/images/photo_10_389426157.webp' },
    { id: 'photo-11', title: "Custom Designer Kitchen with Central Breakfast Island", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_11_389426158.webp', full: 'assets/properties/40-idwala-circle/images/photo_11_389426158.webp' },
    { id: 'photo-12', title: "Gourmet Kitchen with Integrated Premium Cabinetry", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_12_389426159.webp', full: 'assets/properties/40-idwala-circle/images/photo_12_389426159.webp' },
    { id: 'photo-13', title: "Sleek Stone Countertops and High-End Induction Hob", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_13_389426160.webp', full: 'assets/properties/40-idwala-circle/images/photo_13_389426160.webp' },
    { id: 'photo-14', title: "Central Culinary Island with Undermount Prep Bowl", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_14_389426161.webp', full: 'assets/properties/40-idwala-circle/images/photo_14_389426161.webp' },
    { id: 'photo-15', title: "Discreet Back Scullery and Laundry Facility", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_15_389426162.webp', full: 'assets/properties/40-idwala-circle/images/photo_15_389426162.webp' },
    { id: 'photo-16', title: "Kitchen Scullery with Extensive Storage and Appliance Space", category: 'culinary', thumb: 'assets/properties/40-idwala-circle/images/photo_16_389426163.webp', full: 'assets/properties/40-idwala-circle/images/photo_16_389426163.webp' },
    { id: 'photo-17', title: "Reception Foyer and Elegant Floating Staircase", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_17_389426164.webp', full: 'assets/properties/40-idwala-circle/images/photo_17_389426164.webp' },
    { id: 'photo-18', title: "Architectural Glass Balustrades and Double-Volume Atrium", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_18_389426165.webp', full: 'assets/properties/40-idwala-circle/images/photo_18_389426165.webp' },
    { id: 'photo-19', title: "Secondary Family Lounge with Garden Vistas", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_19_389426166.webp', full: 'assets/properties/40-idwala-circle/images/photo_19_389426166.webp' },
    { id: 'photo-20', title: "Formal Entertaining Area Opening onto Pool Deck", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_20_389426167.webp', full: 'assets/properties/40-idwala-circle/images/photo_20_389426167.webp' },
    { id: 'photo-21', title: "Upstairs Private Pyjama Lounge for Family Relaxation", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_21_389426168.webp', full: 'assets/properties/40-idwala-circle/images/photo_21_389426168.webp' },
    { id: 'photo-22', title: "Pyjama Lounge Upper Gallery with Natural Sunlight", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_22_389426169.webp', full: 'assets/properties/40-idwala-circle/images/photo_22_389426169.webp' },
    { id: 'photo-23', title: "Dedicated Private Cinema Room / Home Theater", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_23_389426170.webp', full: 'assets/properties/40-idwala-circle/images/photo_23_389426170.webp' },
    { id: 'photo-24', title: "Cinema Room Interior Ready for Custom Media Installation", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_24_389426171.webp', full: 'assets/properties/40-idwala-circle/images/photo_24_389426171.webp' },
    { id: 'photo-25', title: "Executive Home Office / Private Study", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_25_389426172.webp', full: 'assets/properties/40-idwala-circle/images/photo_25_389426172.webp' },
    { id: 'photo-26', title: "Guest Cloakroom / Downstairs Powder Room", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_26_389426173.webp', full: 'assets/properties/40-idwala-circle/images/photo_26_389426173.webp' },
    { id: 'photo-27', title: "Grand Master Bedroom Suite with Private Balcony Access", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_27_389426174.webp', full: 'assets/properties/40-idwala-circle/images/photo_27_389426174.webp' },
    { id: 'photo-28', title: "Master Bedroom with Floor-to-Ceiling Glazed Sliders", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_28_389426175.webp', full: 'assets/properties/40-idwala-circle/images/photo_28_389426175.webp' },
    { id: 'photo-29', title: "Master Suite Panoramic Garden and Estate Views", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_29_389426176.webp', full: 'assets/properties/40-idwala-circle/images/photo_29_389426176.webp' },
    { id: 'photo-30', title: "Expansive Walk-In Dressing Room with Bespoke Cabinetry", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_30_389426177.webp', full: 'assets/properties/40-idwala-circle/images/photo_30_389426177.webp' },
    { id: 'photo-31', title: "Dressing Room Built-In Wardrobes and Mirror Displays", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_31_389426178.webp', full: 'assets/properties/40-idwala-circle/images/photo_31_389426178.webp' },
    { id: 'photo-32', title: "Spa-Inspired Master En-Suite with Freestanding Soaking Tub", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_32_389426179.webp', full: 'assets/properties/40-idwala-circle/images/photo_32_389426179.webp' },
    { id: 'photo-33', title: "Master Bathroom Dual Floating Vanities and Frameless Glass", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_33_389426180.webp', full: 'assets/properties/40-idwala-circle/images/photo_33_389426180.webp' },
    { id: 'photo-34', title: "Walk-In Rain Shower and Designer Chrome Sanitaryware", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_34_389426181.webp', full: 'assets/properties/40-idwala-circle/images/photo_34_389426181.webp' },
    { id: 'photo-35', title: "Second Bedroom Suite with En-Suite Bathroom and Built-Ins", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_35_389426182.webp', full: 'assets/properties/40-idwala-circle/images/photo_35_389426182.webp' },
    { id: 'photo-36', title: "Second Bedroom En-Suite Bathroom with Porcelain Finishes", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_36_389426183.webp', full: 'assets/properties/40-idwala-circle/images/photo_36_389426183.webp' },
    { id: 'photo-37', title: "Third En-Suite Bedroom with Generous Proportions", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_37_389426184.webp', full: 'assets/properties/40-idwala-circle/images/photo_37_389426184.webp' },
    { id: 'photo-38', title: "Third En-Suite Bathroom with Modern Walk-In Shower", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_38_389426185.webp', full: 'assets/properties/40-idwala-circle/images/photo_38_389426185.webp' },
    { id: 'photo-39', title: "Fourth Bedroom Suite with Balcony Access", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_39_389426186.webp', full: 'assets/properties/40-idwala-circle/images/photo_39_389426186.webp' },
    { id: 'photo-40', title: "Fourth En-Suite Bathroom with Contemporary Vanity", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_40_389426187.webp', full: 'assets/properties/40-idwala-circle/images/photo_40_389426187.webp' },
    { id: 'photo-41', title: "Fifth Bedroom Suite Ideal for Guests or Extended Family", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_41_389426188.webp', full: 'assets/properties/40-idwala-circle/images/photo_41_389426188.webp' },
    { id: 'photo-42', title: "Fifth En-Suite Bathroom with High-End Tiling", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_42_389426189.webp', full: 'assets/properties/40-idwala-circle/images/photo_42_389426189.webp' },
    { id: 'photo-43', title: "Upper Level Landing and Wide Architectural Corridor", category: 'living', thumb: 'assets/properties/40-idwala-circle/images/photo_43_389426190.webp', full: 'assets/properties/40-idwala-circle/images/photo_43_389426190.webp' },
    { id: 'photo-44', title: "Glass-Balustraded Balcony Overlooking Private Gardens", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_44_389426191.webp', full: 'assets/properties/40-idwala-circle/images/photo_44_389426191.webp' },
    { id: 'photo-45', title: "Upper Balcony View Across Izinga Park Estate", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_45_389426192.webp', full: 'assets/properties/40-idwala-circle/images/photo_45_389426192.webp' },
    { id: 'photo-46', title: "Outdoor Covered Verandah with Built-In Braai Potential", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_46_389426193.webp', full: 'assets/properties/40-idwala-circle/images/photo_46_389426193.webp' },
    { id: 'photo-47', title: "Swimming Pool Deck Surrounded by Lush Tropical Foliage", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_47_389426194.webp', full: 'assets/properties/40-idwala-circle/images/photo_47_389426194.webp' },
    { id: 'photo-48', title: "Pristine Pool Water Feature and Sunbathing Area", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_48_389426195.webp', full: 'assets/properties/40-idwala-circle/images/photo_48_389426195.webp' },
    { id: 'photo-49', title: "Private Manicured Lawn and Child-Friendly Grounds", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_49_389426196.webp', full: 'assets/properties/40-idwala-circle/images/photo_49_389426196.webp' },
    { id: 'photo-50', title: "Perimeter Landscaping Ensuring Absolute Privacy", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_50_389426197.webp', full: 'assets/properties/40-idwala-circle/images/photo_50_389426197.webp' },
    { id: 'photo-51', title: "Separate Staff Quarters / Domestic Accommodation with Bath", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_51_389426198.webp', full: 'assets/properties/40-idwala-circle/images/photo_51_389426198.webp' },
    { id: 'photo-52', title: "Domestic Bathroom Facility and Utility Area", category: 'suites', thumb: 'assets/properties/40-idwala-circle/images/photo_52_389426199.webp', full: 'assets/properties/40-idwala-circle/images/photo_52_389426199.webp' },
    { id: 'photo-53', title: "Double Automated Garage Interior with Direct Home Access", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_53_389426200.webp', full: 'assets/properties/40-idwala-circle/images/photo_53_389426200.webp' },
    { id: 'photo-54', title: "Expansive Paved Motor Court with Four Dedicated Guest Bays", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_54_389426201.webp', full: 'assets/properties/40-idwala-circle/images/photo_54_389426201.webp' },
    { id: 'photo-55', title: "Front Entrance Portico and Architectural Pivot Door", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_55_389426202.webp', full: 'assets/properties/40-idwala-circle/images/photo_55_389426202.webp' },
    { id: 'photo-56', title: "Front Facade Viewed from Above Road Level", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_56_389426203.webp', full: 'assets/properties/40-idwala-circle/images/photo_56_389426203.webp' },
    { id: 'photo-57', title: "Side Elevation and Private Boundary Wall", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_57_389426204.webp', full: 'assets/properties/40-idwala-circle/images/photo_57_389426204.webp' },
    { id: 'photo-58', title: "Night Architectural Lighting Highlighting Exterior Facade", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_58_389426205.webp', full: 'assets/properties/40-idwala-circle/images/photo_58_389426205.webp' },
    { id: 'photo-59', title: "Evening Ambiance at the Illuminated Pool Terrace", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_59_389426206.webp', full: 'assets/properties/40-idwala-circle/images/photo_59_389426206.webp' },
    { id: 'photo-60', title: "Twilight Exterior Panorama of 40 Idwala Circle", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_60_389426207.webp', full: 'assets/properties/40-idwala-circle/images/photo_60_389426207.webp' },
    { id: 'photo-61', title: "Izinga Park Secure Streetscape and Idwala Circle Enclave", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_61_389426208.webp', full: 'assets/properties/40-idwala-circle/images/photo_61_389426208.webp' },
    { id: 'photo-62', title: "Panoramic Vista Across Izinga Ridge and Indian Ocean Horizon", category: 'outdoor', thumb: 'assets/properties/40-idwala-circle/images/photo_62_389426209.webp', full: 'assets/properties/40-idwala-circle/images/photo_62_389426209.webp' }
  ];

  /* ============================================================
     2. PROGRESSIVE GALLERY DISCLOSURE ENGINE
     ============================================================ */
  const galleryGrid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMorePhotosBtn');
  const loadMoreWrap = document.getElementById('galleryLoadMoreWrap');
  const loadMoreText = document.getElementById('loadMoreText');
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');

  const INITIAL_VISIBLE_COUNT = 8; // Strictly 2 rows on desktop (4 cols x 2)
  const LOAD_MORE_BATCH = 12;      // 3 additional rows on desktop (4 cols x 3)

  let activeFilter = 'all';
  let visibleItemLimit = INITIAL_VISIBLE_COUNT;
  let activeFilteredList = PROPERTY_GALLERY;

  function filterGallery(filter) {
    activeFilter = filter;
    visibleItemLimit = INITIAL_VISIBLE_COUNT;

    if (filter === 'all') {
      activeFilteredList = PROPERTY_GALLERY;
    } else {
      activeFilteredList = PROPERTY_GALLERY.filter(item => item.category === filter);
    }

    renderGallery();
  }

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    const itemsToDisplay = activeFilteredList.slice(0, visibleItemLimit);

    itemsToDisplay.forEach((photo, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'gallery__item';
      itemEl.setAttribute('role', 'button');
      itemEl.setAttribute('tabindex', '0');
      itemEl.setAttribute('aria-label', `View ${photo.title} in high resolution`);
      itemEl.dataset.index = index;

      itemEl.innerHTML = `
        <img 
          src="${photo.thumb}" 
          alt="${photo.title}" 
          class="gallery__img"
          loading="lazy" 
          width="600" 
          height="450"
          onerror="this.style.display='none'"
        />
        <div class="gallery__item-overlay" aria-hidden="true">
          <div class="gallery__expand-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    updateLoadMoreButtonState();
  }

  function updateLoadMoreButtonState() {
    if (!loadMoreWrap || !loadMoreBtn) return;

    const remainingPhotos = activeFilteredList.length - visibleItemLimit;

    if (remainingPhotos > 0) {
      loadMoreWrap.style.display = 'flex';
      const nextBatch = Math.min(LOAD_MORE_BATCH, remainingPhotos);
      if (loadMoreText) {
        loadMoreText.textContent = `Load More Photos (+${nextBatch} Photos)`;
      }
    } else {
      loadMoreWrap.style.display = 'none';
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleItemLimit += LOAD_MORE_BATCH;
      renderGallery();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      filterGallery(btn.dataset.filter);
    });
  });

  // Initial render
  filterGallery('all');

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
    lightboxCounter.innerHTML = `<span class="lightbox__caption-title">${photo.title}</span> <span class="lightbox__counter-nums">${activeLightboxIndex + 1} / ${activeFilteredList.length}</span>`;
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
  window.addEventListener('keydown', (e) => {
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
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX < 0) {
          nextLightbox(); // Swipe left -> next image
        } else {
          prevLightbox(); // Swipe right -> previous image
        }
      }
    } else if (deltaY > 80) {
      closeLightbox(); // Swipe down -> close lightbox
    }
  }

  /* ============================================================
     4. LUXURY BOND & SARS TRANSFER DUTY CALCULATOR (FIXED PRICE R25,000,000)
     ============================================================ */
  const FIXED_PURCHASE_PRICE = 25000000;
  const MONTHLY_RATES = 18727;
  const MONTHLY_LEVIES = 4533;

  const depositInput = document.getElementById('calcDepositPercent');
  const depositDisplay = document.getElementById('calcDepositDisplay');
  const rateInput = document.getElementById('calcInterestRate');
  const rateDisplay = document.getElementById('calcInterestRateDisplay');
  const termButtons = document.querySelectorAll('.calc__term-btn');

  const monthlyRepaymentDisplay = document.getElementById('calcMonthlyRepayment');
  const loanFinancedDisplay = document.getElementById('calcLoanFinanced');
  const transferDutyDisplay = document.getElementById('calcTransferDuty');
  const conveyancingDisplay = document.getElementById('calcConveyancing');
  const totalMonthlyDisplay = document.getElementById('calcTotalMonthly');
  const qualifyingIncomeDisplay = document.getElementById('calcQualifyingIncome');

  let selectedTermYears = 20;

  function formatZAR(amount) {
    return 'R ' + Math.round(amount).toLocaleString('en-ZA');
  }

  /**
   * SARS Official Transfer Duty Formula (2024–2026 Tax Schedule)
   * Values exceeding R12.1M are taxed at R1,128,600 + 13% of value above R12,100,000.
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
    const price = FIXED_PURCHASE_PRICE;
    const depositPct = parseFloat(depositInput ? depositInput.value : 10) || 0;
    const ratePct = parseFloat(rateInput ? rateInput.value : 11.75) || 11.75;
    const termMonths = selectedTermYears * 12;

    const depositAmount = price * (depositPct / 100);
    const loanAmount = Math.max(0, price - depositAmount);

    // Live display labels
    if (depositDisplay) depositDisplay.textContent = `${depositPct}% (${formatZAR(depositAmount)})`;
    if (rateDisplay) rateDisplay.textContent = `${ratePct.toFixed(2)}%${ratePct === 11.75 ? ' (SA Prime)' : ''}`;

    // Monthly Amortization Formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyRate = (ratePct / 100) / 12;
    let monthlyRepayment = 0;

    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyRepayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    }

    // SARS Transfer Duty & Conveyancing Fees
    const transferDuty = calculateTransferDuty(price);
    const conveyancingFees = Math.round(price * 0.009 + 38000);

    const totalMonthlyCarrying = monthlyRepayment + MONTHLY_RATES + MONTHLY_LEVIES;
    // South African standard 30% gross income threshold for bond approval
    const qualifyingIncome = monthlyRepayment / 0.30;

    // Update Output Elements
    if (monthlyRepaymentDisplay) monthlyRepaymentDisplay.textContent = formatZAR(monthlyRepayment);
    if (loanFinancedDisplay) loanFinancedDisplay.textContent = formatZAR(loanAmount);
    if (transferDutyDisplay) transferDutyDisplay.textContent = formatZAR(transferDuty);
    if (conveyancingDisplay) conveyancingDisplay.textContent = formatZAR(conveyancingFees);
    if (totalMonthlyDisplay) totalMonthlyDisplay.textContent = `${formatZAR(totalMonthlyCarrying)} / mo`;
    if (qualifyingIncomeDisplay) qualifyingIncomeDisplay.textContent = `${formatZAR(qualifyingIncome)} / mo`;
  }

  // Event Listeners for Calculator
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

  // Initial Calculation Run
  calculateBond();

  /* ============================================================
     5. NAVIGATION & SCROLL HANDLERS
     ============================================================ */
  const nav = document.querySelector('.nav');

  // Sticky Navbar Transparency Handler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('nav--scrolled');
      nav?.classList.remove('nav--transparent');
    } else {
      nav?.classList.remove('nav--scrolled');
      nav?.classList.add('nav--transparent');
    }
  }, { passive: true });

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
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
});
