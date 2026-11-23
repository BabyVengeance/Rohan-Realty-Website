/**
 * Shared photo loading for listing pages.
 * - BORPhotos.pick(url, width): the 640 / 1280 / full WebP that suits a box of that CSS width.
 * - BORPhotos.load(url): downloads and decodes once; resolves when the photo can paint instantly.
 * - Auto-starts the commercial carousel (#carousel-container with data-images).
 * Swapping only after decode is what stops the previous photo lingering on screen.
 */
(function () {
  'use strict';

  const VARIANT_WIDTHS = [640, 1280];
  const cache = new Map();

  function pick(url, cssWidth) {
    if (!/\/assets\/(properties|agent)\/.+\.webp$/.test(new URL(url, location.href).pathname)) return url;
    if (/-(640|1280)\.webp$/.test(url)) return url;
    const needed = cssWidth * Math.min(window.devicePixelRatio || 1, 2);
    const fit = VARIANT_WIDTHS.find((w) => needed <= w);
    return fit ? url.replace(/\.webp$/, `-${fit}.webp`) : url;
  }

  function load(url) {
    if (!cache.has(url)) {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      const ready = (img.decode ? img.decode() : new Promise((ok, fail) => { img.onload = ok; img.onerror = fail; }))
        .then(() => url)
        .catch((err) => { cache.delete(url); throw err; });
      cache.set(url, ready);
    }
    return cache.get(url);
  }

  const whenIdle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));

  function preload(urls) {
    whenIdle(() => urls.forEach((u) => load(u).catch(() => {})));
  }

  /**
   * Shows photo `index` from `list` in `imgEl` only after it is decoded.
   * Later calls win: a slow photo never replaces one the visitor has already moved past.
   */
  function createSwapper(imgEl, onBusy) {
    let ticket = 0;
    return function swap(url, alt) {
      const mine = ++ticket;
      const busyTimer = setTimeout(() => { if (mine === ticket && onBusy) onBusy(true); }, 150);
      return load(url)
        .catch(() => url)
        .then(() => {
          clearTimeout(busyTimer);
          if (mine !== ticket) return false;
          imgEl.src = url;
          if (alt) imgEl.alt = alt;
          if (onBusy) onBusy(false);
          return true;
        });
    };
  }

  /** Lightbox helper: show(url, alt, neighbourUrls) sizes to the viewport and warms the neighbours. */
  function lightbox(imgEl) {
    const swap = createSwapper(imgEl);
    return function show(url, alt, neighbours) {
      const w = window.innerWidth;
      if (alt) imgEl.alt = alt;
      swap(pick(url, w));
      preload((neighbours || []).filter(Boolean).map((u) => pick(u, w)));
    };
  }

  window.BORPhotos = { pick, load, preload, createSwapper, lightbox };

  function initCarousel(container) {
    const img = container.querySelector('#carousel-image');
    let list;
    try { list = JSON.parse(container.dataset.images || '[]'); } catch (e) { list = []; }
    if (!img || list.length === 0) return;

    const current = container.querySelector('#current-slide');
    const total = container.querySelector('#total-slides');
    const prevBtn = container.querySelector('[data-carousel="prev"]');
    const nextBtn = container.querySelector('[data-carousel="next"]');
    if (total) total.textContent = list.length;
    if (list.length < 2) {
      [prevBtn, nextBtn].forEach((b) => b && (b.hidden = true));
      return;
    }

    // The carousel picks its own size, so the browser must not choose a different srcset candidate.
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    const width = () => container.clientWidth || 800;
    const urlAt = (i) => pick(list[i], width());
    img.src = urlAt(0);

    const swap = createSwapper(img, (busy) => container.classList.toggle('is-loading', busy));
    let index = 0;
    const wrap = (i) => (i + list.length) % list.length;

    function show(i) {
      index = wrap(i);
      if (current) current.textContent = index + 1;
      swap(urlAt(index));
      preload([urlAt(wrap(index + 1)), urlAt(wrap(index - 1))]);
    }

    prevBtn && prevBtn.addEventListener('click', () => show(index - 1));
    nextBtn && nextBtn.addEventListener('click', () => show(index + 1));
    // Start the download as soon as intent shows, before the click lands.
    prevBtn && prevBtn.addEventListener('pointerenter', () => load(urlAt(wrap(index - 1))).catch(() => {}));
    nextBtn && nextBtn.addEventListener('pointerenter', () => load(urlAt(wrap(index + 1))).catch(() => {}));

    container.tabIndex = 0;
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    });

    let startX = null;
    container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    // Warm the whole set once the carousel is near the viewport; listing sets are small.
    const warmAll = () => preload(list.map((_, i) => urlAt(i)));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) { io.disconnect(); warmAll(); }
      }, { rootMargin: '600px 0px' });
      io.observe(container);
    } else {
      warmAll();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const c = document.getElementById('carousel-container');
    if (c) initCarousel(c);
  });
})();
