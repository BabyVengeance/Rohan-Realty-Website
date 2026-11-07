/**
 * ROHAN REALTY — PROGRESSIVE GALLERY & LIGHTBOX ENGINE
 * Strictly enforces 2-row initial view + 3-row load-more reveal with zero text-over-photo.
 */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  const loadMoreBtn = document.getElementById('galleryLoadMore');
  const filterBtns = document.querySelectorAll('.gallery-btn');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__prev');
  const lightboxNext = document.querySelector('.lightbox__next');

  if (!galleryGrid) return;

  const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  const isMobile = window.innerWidth <= 640;
  const initialCount = isMobile ? 4 : 8;   // 2 initial rows
  const stepCount = isMobile ? 6 : 12;     // 3 rows per reveal

  let currentVisibleCount = initialCount;
  let activeFilter = 'all';
  let filteredItems = [...items];
  let currentLightboxIndex = 0;

  // Filter & Visibility Render
  const updateVisibility = () => {
    filteredItems = items.filter(item => {
      if (activeFilter === 'all') return true;
      return item.getAttribute('data-category') === activeFilter;
    });

    items.forEach(item => item.style.display = 'none');

    filteredItems.slice(0, currentVisibleCount).forEach((item, index) => {
      item.style.display = 'block';
      item.setAttribute('data-visible-index', index);
    });

    // Update Load More Button
    if (loadMoreBtn) {
      const remaining = filteredItems.length - currentVisibleCount;
      if (remaining > 0) {
        loadMoreBtn.style.display = 'inline-flex';
        const badge = loadMoreBtn.querySelector('.load-more-count');
        if (badge) {
          badge.textContent = `(+${remaining} Photos)`;
        } else {
          loadMoreBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Load More Photos <span class="load-more-count">(+${remaining} Photos)</span>
          `;
        }
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  };

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      currentVisibleCount = initialCount;
      updateVisibility();
    });
  });

  // Load More Button
  loadMoreBtn?.addEventListener('click', () => {
    currentVisibleCount += stepCount;
    updateVisibility();
  });

  // Initial render
  updateVisibility();

  // Fullscreen Lightbox
  const openLightbox = (index) => {
    if (!lightbox || !lightboxImg) return;
    currentLightboxIndex = index;
    const targetItem = filteredItems[currentLightboxIndex];
    const imgEl = targetItem?.querySelector('img');
    if (!imgEl) return;

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || 'Luxury Property Photography';
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${filteredItems.length}`;
    }
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    if (filteredItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    openLightbox(currentLightboxIndex);
  };

  const showPrev = () => {
    if (filteredItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    openLightbox(currentLightboxIndex);
  };

  // Attach click listener to gallery items
  items.forEach(item => {
    item.addEventListener('click', () => {
      const idx = filteredItems.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', showNext);
  lightboxPrev?.addEventListener('click', showPrev);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});
