/*
 * Consent gate and tag loader. Loads synchronously in <head>, before anything else that could set cookies.
 *
 * To go live, paste the IDs Ben supplies below. Use EITHER gtmId (recommended: Ben manages tags in GTM)
 * OR ga4Id/adsId for a direct Google tag. Leaving everything empty loads nothing.
 *
 * Mode is "basic" consent: no Google tag is requested until the visitor accepts analytics or advertising
 * cookies (POPIA). Consent Mode v2 signals are still set so Google reads the choice correctly.
 */
(function () {
  'use strict';

  var CONFIG = {
    gtmId: '',            // e.g. 'GTM-ABC1234'
    ga4Id: '',            // e.g. 'G-ABCDE12345' (only when not using GTM)
    adsId: '',            // e.g. 'AW-123456789' (only when not using GTM)
    adsLabels: {          // conversion labels from Google Ads (only when not using GTM)
      lead: '',
      whatsapp: '',
      phone: ''
    },
    storageKey: 'bor_consent_v1',
    maxAgeDays: 365
  };

  window.BOR_TRACKING = CONFIG;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', true);

  function readChoice() {
    try {
      var raw = JSON.parse(window.localStorage.getItem(CONFIG.storageKey));
      if (!raw || typeof raw.ts !== 'number') return null;
      if (Date.now() - raw.ts > CONFIG.maxAgeDays * 864e5) return null;
      return { analytics: !!raw.analytics, ads: !!raw.ads, ts: raw.ts };
    } catch (e) {
      return null;
    }
  }

  function applyChoice(choice) {
    var ads = choice.ads ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
      analytics_storage: choice.analytics ? 'granted' : 'denied'
    });
    window.dataLayer.push({ event: 'consent_update', consent_analytics: choice.analytics, consent_ads: choice.ads });
  }

  var tagsLoaded = false;
  function injectScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    (document.head || document.documentElement).appendChild(s);
  }

  function loadTags() {
    if (tagsLoaded) return;
    if (CONFIG.gtmId) {
      tagsLoaded = true;
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      injectScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CONFIG.gtmId));
      return;
    }
    var primary = CONFIG.ga4Id || CONFIG.adsId;
    if (!primary) return;
    tagsLoaded = true;
    injectScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primary));
    window.gtag('js', new Date());
    if (CONFIG.ga4Id) window.gtag('config', CONFIG.ga4Id);
    if (CONFIG.adsId) window.gtag('config', CONFIG.adsId);
  }

  var current = readChoice();
  if (current) {
    applyChoice(current);
    if (current.analytics || current.ads) loadTags();
  }

  window.BOR_CONSENT = {
    get: function () { return current; },
    tagsEnabled: function () { return !!(CONFIG.gtmId || CONFIG.ga4Id || CONFIG.adsId); },
    usesGtm: function () { return !!CONFIG.gtmId; },
    set: function (analytics, ads) {
      current = { analytics: !!analytics, ads: !!ads, ts: Date.now() };
      try { window.localStorage.setItem(CONFIG.storageKey, JSON.stringify(current)); } catch (e) { /* private mode: choice lasts this page only */ }
      applyChoice(current);
      if (current.analytics || current.ads) loadTags();
      document.dispatchEvent(new CustomEvent('bor:consent', { detail: current }));
    }
  };
})();
