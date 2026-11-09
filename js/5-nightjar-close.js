/**
 * BLUE OCEAN REALTY — MASTER LANDING PAGE ENGINE
 * Interactive features: Navigation Drawer, Progressive Gallery Disclosure, Lightbox Viewer, Form Validation, Scroll Observer & Mobile Walkthrough Engine.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Mobile Menu Drawer Toggle & Accessible Interaction
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('is-active', !isExpanded);
      navMobile.classList.toggle('is-open', !isExpanded);
    });

    // Close menu when clicking links
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navMobile.classList.remove('is-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('is-open') && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navMobile.classList.remove('is-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navMobile.classList.remove('is-open');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navbar Background Scroll State
     -------------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('nav--scrolled');
    } else {
      nav?.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  /* --------------------------------------------------------------------------
     3. Progressive Gallery Disclosure & Category Filtering (2+3 Rows Engine)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const loadMoreBtn = document.getElementById('galleryLoadMoreBtn');
  const loadMoreCount = document.getElementById('galleryLoadMoreCount');

  const INITIAL_VISIBLE_COUNT = 8;  // Exactly 2 rows on desktop 4-column grid
  const BATCH_INCREMENT = 12;       // Exactly 3 additional rows on load more

  let currentCategory = 'all';
  let currentlyVisibleCount = INITIAL_VISIBLE_COUNT;

  function getMatchingItems() {
    if (currentCategory === 'all') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.getAttribute('data-category') === currentCategory);
  }

  function renderGallery() {
    const matching = getMatchingItems();
    const totalMatching = matching.length;

    // First hide all items that don't match the current category filter
    galleryItems.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      if (currentCategory !== 'all' && itemCat !== currentCategory) {
        item.style.display = 'none';
        item.classList.add('is-hidden');
        item.classList.remove('is-revealed');
      }
    });

    // For matching items, display up to currentlyVisibleCount
    matching.forEach((item, idx) => {
      if (idx < currentlyVisibleCount) {
        item.style.display = 'block';
        item.classList.remove('is-hidden');
        // Add reveal animation if newly displayed beyond initial batch
        if (idx >= INITIAL_VISIBLE_COUNT) {
          item.classList.add('is-revealed');
        }
      } else {
        item.style.display = 'none';
        item.classList.add('is-hidden');
        item.classList.remove('is-revealed');
      }
    });

    // Update Load More Button state and counter
    if (loadMoreBtn && loadMoreCount) {
      const remaining = totalMatching - currentlyVisibleCount;
      if (remaining > 0) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreCount.textContent = `+${remaining} Photo${remaining > 1 ? 's' : ''}`;
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      currentCategory = btn.getAttribute('data-filter') || 'all';
      currentlyVisibleCount = INITIAL_VISIBLE_COUNT; // Reset to 2 rows on filter change
      renderGallery();
    });
  });

  // Load More button handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentlyVisibleCount += BATCH_INCREMENT;
      renderGallery();
    });
  }

  // Initial render
  renderGallery();

  /* --------------------------------------------------------------------------
     4. Fullscreen Lightbox Modal Viewer (Keyboard & Touch Swipe Navigation)
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
    // Provide full browsing through all matching photos in the current category
    const matching = getMatchingItems();
    activeGalleryList = matching.map(item => {
      const img = item.querySelector('img');
      return {
        src: img?.getAttribute('src') || '',
        alt: img?.getAttribute('alt') || 'Property Image'
      };
    });
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

  function showImage(index) {
    if (!lightboxImg || !activeGalleryList[index]) return;
    lightboxImg.src = activeGalleryList[index].src;
    lightboxImg.alt = activeGalleryList[index].alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${activeGalleryList.length}`;
    }
  }

  // Attach click listener to each gallery item
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      updateActiveGalleryList();
      const img = item.querySelector('img');
      const clickedSrc = img?.getAttribute('src');
      const foundIndex = activeGalleryList.findIndex(obj => obj.src === clickedSrc);
      openLightbox(foundIndex >= 0 ? foundIndex : 0);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => {
    if (activeGalleryList.length === 0) return;
    currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    showImage(currentIndex);
  });
  lightboxNext?.addEventListener('click', () => {
    if (activeGalleryList.length === 0) return;
    currentIndex = (currentIndex + 1) % activeGalleryList.length;
    showImage(currentIndex);
  });

  // Close lightbox on backdrop click
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      if (activeGalleryList.length === 0) return;
      currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
      showImage(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      if (activeGalleryList.length === 0) return;
      currentIndex = (currentIndex + 1) % activeGalleryList.length;
      showImage(currentIndex);
    }
  });

  // Mobile Touch Swipe Gesture Support for Lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  lightboxModal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightboxModal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleLightboxSwipe();
  }, { passive: true });

  function handleLightboxSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Check if horizontal swipe is significant and dominant over vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (activeGalleryList.length === 0) return;
      if (diffX < 0) {
        // Swiped Left -> Next Image
        currentIndex = (currentIndex + 1) % activeGalleryList.length;
        showImage(currentIndex);
      } else {
        // Swiped Right -> Prev Image
        currentIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
        showImage(currentIndex);
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. Lead Capture Form Handling & Validation
     -------------------------------------------------------------------------- */
  const enquiryForm = document.getElementById('propertyEnquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = enquiryForm.querySelector('#name');
      const phoneInput = enquiryForm.querySelector('#phone');
      const emailInput = enquiryForm.querySelector('#email');
      const popiaCheck = enquiryForm.querySelector('#popiaConsent');

      if (!nameInput.value.trim() || !phoneInput.value.trim() || !emailInput.value.trim()) {
        showFeedback('Please complete all required fields.', 'is-error');
        return;
      }

      if (!popiaCheck.checked) {
        showFeedback('Please consent to POPIA data processing to continue.', 'is-error');
        return;
      }

      // Simulate successful Netlify submission feedback
      const submitBtn = enquiryForm.querySelector('#submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting Request...</span>';
      }

      setTimeout(() => {
        showFeedback('Thank you! Your viewing request has been received. A Blue Ocean property specialist will contact you shortly.', 'is-success');
        enquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Request a Private Viewing</span>`;
        }
      }, 1000);
    });
  }

  function showFeedback(msg, className) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form__feedback ${className}`;
    formFeedback.style.display = 'block';
  }

  /* --------------------------------------------------------------------------
     6. Intersection Observer for Smooth Scroll Animations
     -------------------------------------------------------------------------- */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animateElements.forEach(el => observer.observe(el));
  } else {
    animateElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     7. Interactive Video Walkthrough Selector, Step Controls & Story Strip
     -------------------------------------------------------------------------- */
  const videoTabs = document.querySelectorAll('.video-tour__tab');
  const panelWalkthroughs = document.getElementById('panel-walkthroughs');
  const panelCinematic = document.getElementById('panel-cinematic');
  const walkthroughVideoPlayer = document.getElementById('walkthroughVideoPlayer');
  const cinematicVideoPlayer = document.getElementById('cinematicVideoPlayer');

  if (videoTabs.length > 0 && panelWalkthroughs && panelCinematic) {
    videoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        videoTabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        if (tab.id === 'tab-walkthroughs') {
          panelWalkthroughs.classList.add('is-active');
          panelWalkthroughs.removeAttribute('hidden');
          panelCinematic.classList.remove('is-active');
          panelCinematic.setAttribute('hidden', '');
          // Pause cinematic video if playing
          if (cinematicVideoPlayer && !cinematicVideoPlayer.paused) {
            cinematicVideoPlayer.pause();
          }
        } else {
          panelCinematic.classList.add('is-active');
          panelCinematic.removeAttribute('hidden');
          panelWalkthroughs.classList.remove('is-active');
          panelWalkthroughs.setAttribute('hidden', '');
          // Pause walkthrough video if playing
          if (walkthroughVideoPlayer && !walkthroughVideoPlayer.paused) {
            walkthroughVideoPlayer.pause();
          }
          if (cinematicVideoPlayer) {
            cinematicVideoPlayer.muted = true;
          }
        }
      });
    });
  }

  const walkthroughItems = document.querySelectorAll('.walkthrough-item');
  const storyStripItems = document.querySelectorAll('.story-strip-item');
  const walkthroughActiveArea = document.getElementById('walkthroughActiveArea');
  const walkthroughActiveTitle = document.getElementById('walkthroughActiveTitle');
  const walkthroughActiveDesc = document.getElementById('walkthroughActiveDesc');
  const walkthroughPrevBtn = document.getElementById('walkthroughPrevBtn');
  const walkthroughNextBtn = document.getElementById('walkthroughNextBtn');
  const walkthroughStepCounter = document.getElementById('walkthroughStepCounter');

  const totalWalkthroughClips = walkthroughItems.length;
  let currentWalkthroughIndex = 0;

  function switchWalkthroughClip(index, shouldPlay = true) {
    if (index < 0 || index >= totalWalkthroughClips) return;
    currentWalkthroughIndex = index;

    const activeItem = walkthroughItems[index];
    if (!activeItem) return;

    // Synchronize Desktop Playlist active class
    walkthroughItems.forEach((item, idx) => {
      const isActive = idx === index;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Synchronize Mobile Story Strip active class & scroll into center
    storyStripItems.forEach((item, idx) => {
      const isActive = idx === index;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    // Update Video Source & Poster
    const videoSrc = activeItem.getAttribute('data-src');
    const posterSrc = activeItem.getAttribute('data-thumb');
    const area = activeItem.getAttribute('data-area') || '';
    const title = activeItem.getAttribute('data-title') || '';
    const desc = activeItem.getAttribute('data-desc') || '';

    if (walkthroughVideoPlayer && videoSrc) {
      walkthroughVideoPlayer.src = videoSrc;
      if (posterSrc) walkthroughVideoPlayer.poster = posterSrc;
      walkthroughVideoPlayer.muted = true;
      walkthroughVideoPlayer.setAttribute('aria-label', `Room Walkthrough Video — ${title}`);
      walkthroughVideoPlayer.load();
      if (shouldPlay) {
        walkthroughVideoPlayer.play().catch(() => {
          // Guard for mobile autoplay restrictions
        });
      }
    }

    // Update Meta Display
    if (walkthroughActiveArea) walkthroughActiveArea.textContent = area;
    if (walkthroughActiveTitle) walkthroughActiveTitle.textContent = title;
    if (walkthroughActiveDesc) walkthroughActiveDesc.textContent = desc;

    // Update Step Controls
    if (walkthroughStepCounter) {
      walkthroughStepCounter.textContent = `Room ${index + 1} of ${totalWalkthroughClips}`;
    }
    if (walkthroughPrevBtn) {
      walkthroughPrevBtn.disabled = (index === 0);
    }
    if (walkthroughNextBtn) {
      walkthroughNextBtn.disabled = (index === totalWalkthroughClips - 1);
    }
  }

  // Attach click listeners to desktop playlist items
  walkthroughItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      switchWalkthroughClip(idx, true);
    });
  });

  // Attach click listeners to mobile story strip items
  storyStripItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      switchWalkthroughClip(idx, true);
    });
  });

  // Step Controls: Prev / Next Buttons
  walkthroughPrevBtn?.addEventListener('click', () => {
    if (currentWalkthroughIndex > 0) {
      switchWalkthroughClip(currentWalkthroughIndex - 1, true);
    }
  });

  walkthroughNextBtn?.addEventListener('click', () => {
    if (currentWalkthroughIndex < totalWalkthroughClips - 1) {
      switchWalkthroughClip(currentWalkthroughIndex + 1, true);
    }
  });

  // Auto-advance to next room clip when current clip finishes playing
  walkthroughVideoPlayer?.addEventListener('ended', () => {
    if (currentWalkthroughIndex < totalWalkthroughClips - 1) {
      switchWalkthroughClip(currentWalkthroughIndex + 1, true);
    }
  });

  // Initialize step controls state
  if (totalWalkthroughClips > 0) {
    if (walkthroughStepCounter) {
      walkthroughStepCounter.textContent = `Room 1 of ${totalWalkthroughClips}`;
    }
    if (walkthroughPrevBtn) {
      walkthroughPrevBtn.disabled = true;
    }
    if (walkthroughNextBtn) {
      walkthroughNextBtn.disabled = totalWalkthroughClips <= 1;
    }
  }

  /* --------------------------------------------------------------------------
     8. Fullscreen Mobile Story / Reel Walkthrough Engine (Option 1)
     -------------------------------------------------------------------------- */
  const storyModal = document.getElementById('storyModal');
  const storyModalVideo = document.getElementById('storyModalVideo');
  const storyProgressBars = document.getElementById('storyProgressBars');
  const storyModalArea = document.getElementById('storyModalArea');
  const storyModalTitle = document.getElementById('storyModalTitle');
  const storyModalDesc = document.getElementById('storyModalDesc');
  const storyModalCounter = document.getElementById('storyModalCounter');
  const storyCloseBtn = document.getElementById('storyCloseBtn');
  const storyTapPrev = document.getElementById('storyTapPrev');
  const storyTapNext = document.getElementById('storyTapNext');
  const storyTapToggle = document.getElementById('storyTapToggle');
  const storyStateIcon = document.getElementById('storyStateIcon');
  const mobileReelCards = document.querySelectorAll('.mobile-reel-card');

  const storyRooms = [
    { area: 'Exterior & Arrival', title: 'Paved Forecourt & Triple Garage', dur: '0:15', src: 'assets/properties/5-nightjar-close/videos/walkthrough_01.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_01.jpg', desc: 'Paved driveway court with automated triple garaging and secure visitor parking.' },
    { area: 'Outdoor Living', title: 'Covered Patio Lounge', dur: '0:13', src: 'assets/properties/5-nightjar-close/videos/walkthrough_02.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_02.jpg', desc: 'Sheltered poolside veranda designed for year-round entertaining with seamless outdoor flow.' },
    { area: 'Entertainment', title: 'Cocktail Bar Room', dur: '0:14', src: 'assets/properties/5-nightjar-close/videos/walkthrough_03.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_03.jpg', desc: 'Dedicated cocktail salon with back-lit glass display shelving, custom timber cabinetry, and prep sink.' },
    { area: 'Ground Level', title: 'Reception Corridor', dur: '0:13', src: 'assets/properties/5-nightjar-close/videos/walkthrough_04.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_04.jpg', desc: 'Wide circulation corridor showcasing clean architectural lines and natural cross ventilation.' },
    { area: 'Great Room', title: 'Living Hall & Island', dur: '0:21', src: 'assets/properties/5-nightjar-close/videos/walkthrough_05.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_05.jpg', desc: 'Grand open-plan living room centered around a contemporary display island.' },
    { area: 'Kitchen Suite', title: 'Kitchen & Cold Room', dur: '0:15', src: 'assets/properties/5-nightjar-close/videos/walkthrough_06.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_06.jpg', desc: 'Gourmet kitchen with Caesarstone countertops, scullery, and walk-in cold room.' },
    { area: 'Architectural Foyer', title: 'Floating Staircase & Art Gallery', dur: '0:27', src: 'assets/properties/5-nightjar-close/videos/walkthrough_07.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_07.jpg', desc: 'Dramatic double-volume entrance foyer featuring floating hardwood stairs.' },
    { area: 'Bedrooms', title: 'Upper Bedroom Wing & Terrace', dur: '0:18', src: 'assets/properties/5-nightjar-close/videos/walkthrough_08.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_08.jpg', desc: 'Private bedroom suites with en-suite bathrooms and private balcony access.' },
    { area: 'Living & Art', title: 'Art Promenade & Glass Cabinets', dur: '0:13', src: 'assets/properties/5-nightjar-close/videos/walkthrough_09.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_09.jpg', desc: 'Upper gallery walkway lined with illuminated glass display cabinets.' },
    { area: 'Upper Level', title: 'Landing Corridor & Suites', dur: '0:18', src: 'assets/properties/5-nightjar-close/videos/walkthrough_10.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_10.jpg', desc: 'Spacious upper landing connecting the primary suites with hardwood floors.' },
    { area: 'Outdoor Living', title: 'Swimming Pool Terrace & Deck', dur: '0:16', src: 'assets/properties/5-nightjar-close/videos/walkthrough_11.mp4', thumb: 'assets/properties/5-nightjar-close/images/thumbnails/video_thumb_11.jpg', desc: 'Private sparkling pool framed by indigenous Hawaan coastal forest trees.' }
  ];

  let currentStoryIdx = 0;
  const storyFills = [];

  // Generate 11 Segmented Progress Bars
  if (storyProgressBars) {
    storyProgressBars.innerHTML = '';
    storyRooms.forEach(() => {
      const bar = document.createElement('div');
      bar.className = 'story-progress-bar';
      const fill = document.createElement('div');
      fill.className = 'story-progress-bar__fill';
      bar.appendChild(fill);
      storyProgressBars.appendChild(bar);
      storyFills.push(fill);
    });
  }

  function updateStoryProgress(index, pct = 0) {
    storyFills.forEach((fill, i) => {
      if (i < index) {
        fill.style.width = '100%';
        fill.style.background = '#C5A059';
      } else if (i === index) {
        fill.style.width = pct + '%';
        fill.style.background = '#C5A059';
      } else {
        fill.style.width = '0%';
        fill.style.background = 'rgba(255, 255, 255, 0.25)';
      }
    });
  }

  function openStoryModal(index) {
    if (!storyModal || !storyModalVideo) return;
    if (index < 0 || index >= storyRooms.length) return;
    currentStoryIdx = index;
    const room = storyRooms[index];

    // Pause any inline videos
    const mobileCinema = document.getElementById('mobileCinemaPlayer');
    if (mobileCinema && !mobileCinema.paused) mobileCinema.pause();
    const cinematicPlayer = document.getElementById('cinematicVideoPlayer');
    if (cinematicPlayer && !cinematicPlayer.paused) cinematicPlayer.pause();
    const walkthroughPlayer = document.getElementById('walkthroughVideoPlayer');
    if (walkthroughPlayer && !walkthroughPlayer.paused) walkthroughPlayer.pause();

    // Populate modal text
    if (storyModalArea) storyModalArea.textContent = room.area;
    if (storyModalTitle) storyModalTitle.textContent = room.title;
    if (storyModalDesc) storyModalDesc.textContent = room.desc;
    if (storyModalCounter) storyModalCounter.textContent = 'Room ' + (index + 1) + ' of ' + storyRooms.length;

    updateStoryProgress(index, 0);

    // Show modal
    storyModal.removeAttribute('hidden');
    void storyModal.offsetWidth; // Force reflow
    storyModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Load & play video
    storyModalVideo.src = room.src;
    storyModalVideo.poster = room.thumb;
    storyModalVideo.currentTime = 0;
    storyModalVideo.play().catch(() => {});
  }

  function closeStoryModal() {
    if (!storyModal || !storyModalVideo) return;
    storyModalVideo.pause();
    storyModal.classList.remove('is-active');
    setTimeout(() => {
      storyModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 220);
  }

  function nextStoryClip() {
    if (currentStoryIdx < storyRooms.length - 1) {
      openStoryModal(currentStoryIdx + 1);
    } else {
      closeStoryModal();
    }
  }

  function prevStoryClip() {
    if (currentStoryIdx > 0) {
      openStoryModal(currentStoryIdx - 1);
    }
  }

  function toggleStoryPlay() {
    if (!storyModalVideo) return;
    if (storyModalVideo.paused) {
      storyModalVideo.play();
      flashIcon('play');
    } else {
      storyModalVideo.pause();
      flashIcon('pause');
    }
  }

  function flashIcon(type) {
    if (!storyStateIcon) return;
    if (type === 'play') {
      storyStateIcon.innerHTML = '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
    } else {
      storyStateIcon.innerHTML = '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    }
    storyStateIcon.classList.add('is-visible');
    setTimeout(() => {
      storyStateIcon.classList.remove('is-visible');
    }, 400);
  }

  // Event Listeners for Video
  if (storyModalVideo) {
    storyModalVideo.addEventListener('timeupdate', () => {
      if (storyModalVideo.duration) {
        const pct = (storyModalVideo.currentTime / storyModalVideo.duration) * 100;
        updateStoryProgress(currentStoryIdx, pct);
      }
    });

    storyModalVideo.addEventListener('ended', () => {
      nextStoryClip();
    });
  }

  // Event Listeners for Controls
  storyTapNext?.addEventListener('click', nextStoryClip);
  storyTapPrev?.addEventListener('click', prevStoryClip);
  storyTapToggle?.addEventListener('click', toggleStoryPlay);
  storyCloseBtn?.addEventListener('click', closeStoryModal);

  // Attach click listeners to mobile reel cards
  mobileReelCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      openStoryModal(idx);
    });
  });

  // Swipe-down to dismiss gesture
  let touchY = 0;
  let touchX = 0;
  storyModal?.addEventListener('touchstart', e => {
    touchY = e.touches[0].clientY;
    touchX = e.touches[0].clientX;
  }, { passive: true });

  storyModal?.addEventListener('touchend', e => {
    const deltaY = e.changedTouches[0].clientY - touchY;
    const deltaX = Math.abs(e.changedTouches[0].clientX - touchX);
    if (deltaY > 80 && deltaY > deltaX) {
      closeStoryModal();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (storyModal && !storyModal.hasAttribute('hidden') && storyModal.classList.contains('is-active')) {
      if (e.key === 'Escape') closeStoryModal();
      if (e.key === 'ArrowRight') nextStoryClip();
      if (e.key === 'ArrowLeft') prevStoryClip();
      if (e.key === ' ') {
        e.preventDefault();
        toggleStoryPlay();
      }
    }
  });

});
