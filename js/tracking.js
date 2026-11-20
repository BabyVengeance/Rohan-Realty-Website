/*
 * Cookie banner, conversion events, ad click-ID capture and the mobile enquiry bar.
 * Depends on js/consent.js (loaded first in <head>).
 *
 * dataLayer events for GTM:
 *   view_item        listing page view (GA4 ecommerce shape, for remarketing)
 *   whatsapp_click   any wa.me link
 *   phone_click      any tel: link
 *   email_click      any mailto: link
 *   generate_lead    enquiry form delivered (fired by js/main.js via the bor:lead event)
 */
(function () {
  'use strict';

  var consent = window.BOR_CONSENT;
  var config = window.BOR_TRACKING || {};
  var ATTRIB_KEY = 'bor_attribution';
  var ATTRIB_DAYS = 90;
  var CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function push(eventName, params) {
    var payload = { event: eventName };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    window.dataLayer.push(payload);

    // Direct Google tag (no GTM): forward the event and any matching Ads conversion.
    if (consent && !consent.usesGtm() && consent.tagsEnabled()) {
      window.gtag('event', eventName, params);
      var labelKey = { generate_lead: 'lead', whatsapp_click: 'whatsapp', phone_click: 'phone' }[eventName];
      var label = labelKey && config.adsLabels && config.adsLabels[labelKey];
      if (config.adsId && label) window.gtag('event', 'conversion', { send_to: config.adsId + '/' + label });
    }
  }

  /* ---------- Page context from the generated JSON-LD ---------- */
  function readListing() {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      try {
        var graph = JSON.parse(scripts[i].textContent)['@graph'] || [];
        for (var j = 0; j < graph.length; j++) {
          if (graph[j]['@type'] !== 'RealEstateListing') continue;
          var offer = graph[j].offers || {};
          var property = graph.filter(function (n) { return n['@id'] === (graph[j].about || {})['@id']; })[0] || {};
          var isSale = /Sell$/.test(offer.businessFunction || '');
          return {
            id: location.pathname.replace(/^\/|\.html$/g, '') || 'home',
            name: property.name || graph[j].name,
            type: property['@type'] === 'Place' ? 'commercial' : 'residential',
            mode: isSale ? 'sale' : 'lease',
            price: isSale ? Number(offer.price) : Number((offer.priceSpecification || {}).price),
            area: (property.address || {}).addressLocality || ''
          };
        }
      } catch (e) { /* malformed block: skip */ }
    }
    return null;
  }
  var listing = readListing();
  var pageType = listing ? 'listing_' + listing.type : (document.body && document.body.dataset.pageType) || 'page';

  function context(extra) {
    var base = { page_type: pageType };
    if (listing) {
      base.listing_id = listing.id;
      base.listing_name = listing.name;
      base.listing_area = listing.area;
      base.listing_mode = listing.mode;
    }
    for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) base[k] = extra[k];
    return base;
  }

  /* ---------- Ad click-ID capture (attached to enquiries for offline conversion import) ---------- */
  function readAttribution() {
    var params = new URLSearchParams(location.search);
    var fresh = {};
    var found = false;
    CLICK_PARAMS.forEach(function (p) {
      var v = params.get(p);
      if (v) { fresh[p] = v.slice(0, 200); found = true; }
    });
    var stored = null;
    try {
      stored = JSON.parse(sessionStorage.getItem(ATTRIB_KEY)) || JSON.parse(localStorage.getItem(ATTRIB_KEY));
    } catch (e) { stored = null; }
    if (stored && Date.now() - stored.ts > ATTRIB_DAYS * 864e5) stored = null;
    if (found) stored = { params: fresh, landing: location.pathname, ts: Date.now() };
    if (stored) {
      try {
        sessionStorage.setItem(ATTRIB_KEY, JSON.stringify(stored));
        // Persist beyond the session only with advertising consent.
        var choice = consent && consent.get();
        if (choice && choice.ads) localStorage.setItem(ATTRIB_KEY, JSON.stringify(stored));
        else localStorage.removeItem(ATTRIB_KEY);
      } catch (e) { /* storage blocked */ }
    }
    return stored;
  }
  var attribution = readAttribution();
  document.addEventListener('bor:consent', function () { attribution = readAttribution(); });

  function addHidden(form, name, value) {
    if (!value) return;
    var input = form.querySelector('input[type="hidden"][name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }

  function stampForms() {
    if (!attribution) return;
    var forms = document.querySelectorAll('form[action*="formsubmit.co"], form[name="viewing-enquiry"], form#contact-form, form#propertyEnquiryForm');
    Array.prototype.forEach.call(forms, function (form) {
      Object.keys(attribution.params).forEach(function (k) { addHidden(form, k, attribution.params[k]); });
      addHidden(form, 'landing_page', attribution.landing);
    });
  }

  /* ---------- Click and lead events ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var where = link.closest('[data-track-location]');
    var params = context({ link_url: href.split('?')[0], click_location: where ? where.getAttribute('data-track-location') : (link.closest('footer') ? 'footer' : link.closest('header, nav') ? 'header' : 'body') });
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) push('whatsapp_click', params);
    else if (/^tel:/.test(href)) push('phone_click', params);
    else if (/^mailto:/.test(href)) push('email_click', params);
  }, true);

  document.addEventListener('bor:lead', function (e) {
    var form = e.detail && e.detail.form;
    var field = function (n) { var el = form && form.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };
    push('generate_lead', context({
      form_type: field('form_type') || (form && (form.getAttribute('name') || form.id)) || 'enquiry',
      property_name: field('property_name') || (listing ? listing.name : ''),
      delivery: e.detail && e.detail.channel,
      currency: 'ZAR'
    }));
  });

  if (listing) {
    push('view_item', context({
      ecommerce: {
        currency: 'ZAR',
        value: listing.mode === 'sale' ? listing.price : 0,
        items: [{ item_id: listing.id, item_name: listing.name, item_category: listing.type, item_category2: listing.mode, item_variant: listing.area, price: listing.price }]
      }
    }));
  }

  /* ---------- Cookie banner ---------- */
  function buildBanner() {
    var wrap = document.createElement('section');
    wrap.className = 'cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-labelledby', 'cookie-banner-title');
    var choice = consent && consent.get();
    wrap.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<h2 class="cookie-banner__title" id="cookie-banner-title">Cookies on this site</h2>' +
        '<p class="cookie-banner__text">We use essential cookies to run the site. With your permission we also use analytics cookies to see which listings people view, and advertising cookies to measure our Google ads. <a href="/cookie-policy">Cookie policy</a></p>' +
        '<div class="cookie-banner__prefs" hidden>' +
          '<label class="cookie-banner__opt"><input type="checkbox" checked disabled> Essential (always on)</label>' +
          '<label class="cookie-banner__opt"><input type="checkbox" name="analytics"' + (choice && choice.analytics ? ' checked' : '') + '> Analytics</label>' +
          '<label class="cookie-banner__opt"><input type="checkbox" name="ads"' + (choice && choice.ads ? ' checked' : '') + '> Advertising</label>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="cookie-banner__btn cookie-banner__btn--primary" data-consent="all">Accept all</button>' +
          '<button type="button" class="cookie-banner__btn" data-consent="none">Reject non-essential</button>' +
          '<button type="button" class="cookie-banner__btn cookie-banner__btn--link" data-consent="manage" aria-expanded="false">Choose</button>' +
        '</div>' +
      '</div>';
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-consent]');
      if (!btn) return;
      var mode = btn.getAttribute('data-consent');
      var prefs = wrap.querySelector('.cookie-banner__prefs');
      if (mode === 'manage') {
        if (prefs.hidden) {
          prefs.hidden = false;
          btn.textContent = 'Save choices';
          btn.setAttribute('aria-expanded', 'true');
          return;
        }
        consent.set(prefs.querySelector('[name="analytics"]').checked, prefs.querySelector('[name="ads"]').checked);
      } else {
        consent.set(mode === 'all', mode === 'all');
      }
      wrap.remove();
      document.documentElement.classList.remove('has-cookie-banner');
    });
    document.body.appendChild(wrap);
    document.documentElement.classList.add('has-cookie-banner');
  }

  function addSettingsLink() {
    var privacy = document.querySelector('footer a[href*="privacy-policy"]');
    if (!privacy || document.querySelector('[data-cookie-settings]')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cookie-settings-link';
    btn.setAttribute('data-cookie-settings', '');
    btn.textContent = 'Cookie settings';
    btn.addEventListener('click', function () {
      if (!document.querySelector('.cookie-banner')) buildBanner();
    });
    var holder = privacy.closest('li');
    if (holder) {
      var li = document.createElement('li');
      li.appendChild(btn);
      holder.parentNode.insertBefore(li, holder.nextSibling);
    } else {
      privacy.parentNode.insertBefore(btn, privacy.nextSibling);
    }
  }

  /* ---------- Mobile enquiry bar on listing pages ---------- */
  var ICON_CHAT = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var ICON_PHONE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

  function addActionBar() {
    if (!listing || document.querySelector('.mobile-action-bar')) return;
    var ask = listing.type === 'commercial'
      ? 'Hi Rohan, please send me the information pack for ' + listing.name + '.'
      : 'Hi Rohan, I would like to arrange a viewing of ' + listing.name + '.';
    var bar = document.createElement('nav');
    bar.className = 'enquiry-bar';
    bar.setAttribute('aria-label', 'Enquire about this property');
    bar.setAttribute('data-track-location', 'mobile_enquiry_bar');
    bar.innerHTML =
      '<a class="enquiry-bar__btn enquiry-bar__btn--wa" href="https://wa.me/27695224226?text=' + encodeURIComponent(ask) + '" target="_blank" rel="noopener">' + ICON_CHAT + '<span>WhatsApp</span></a>' +
      '<a class="enquiry-bar__btn enquiry-bar__btn--call" href="tel:+27695224226">' + ICON_PHONE + '<span>Call Rohan</span></a>';
    document.body.appendChild(bar);
    document.documentElement.classList.add('has-enquiry-bar');
  }

  function init() {
    stampForms();
    addActionBar();
    // No banner until a tag ID is configured: with no tags there are no non-essential cookies to consent to.
    // Append ?cookie-preview to any URL to see the banner before go-live.
    var preview = /[?&]cookie-preview\b/.test(location.search);
    if (!consent || !(consent.tagsEnabled() || preview)) return;
    addSettingsLink();
    if (!consent.get() || preview) buildBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
