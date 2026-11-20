# Specification: Flagship Hero Streamlining & De-Cluttering
**Date:** 2026-11-20  
**Status:** Approved by Client  
**Target:** `index.html` (Hero Section)  
**Author:** Apex Digital SA & Blue Ocean Realty Architecture Team  

---

## 1. Problem Statement & User Feedback
The previous hero section on `index.html` attempted to capture all SEO and GEO targeting vectors simultaneously (luxury residential, commercial assets, international advisory, and a granular list of suburbs: Umhlanga, Zimbali, Ballito, Riverhorse Valley). This created visual clutter, 4 lines of heavy headline text covering the architectural photography, and a wordy subtitle that detracted from the brand's "Quiet Luxury" aesthetic.

## 2. Objectives
1. Streamline the headline into 2 balanced lines: White primary text + Gold geographic accent.
2. Reduce the subtitle to 2 clear, authoritative sentences without a repetitive location list.
3. Retain high-intent keywords for Google Ads and search indexing ("Coastal Estates", "Commercial Property", "KwaZulu-Natal").
4. Enhance visual breathing room so the pool and architectural photography are prominent across desktop and mobile viewports.

---

## 3. Approved Production Markup Specification

```html
<section class="home-hero" aria-label="Blue Ocean Realty Flagship Introduction">
  <div class="home-hero__bg">
    <img src="assets/properties/55-hawaan-drive/images/house-06.jpg" alt="White two-storey modern home above a timber deck and pool at 55 Hawaan Drive, Umhlanga" class="home-hero__img" width="1620" height="1080" loading="eager" fetchpriority="high" onerror="this.style.display='none'">
    <div class="home-hero__overlay"></div>
  </div>

  <div class="container">
    <div class="home-hero__content">
      <span class="section-kicker">Blue Ocean Realty &bull; Private Client Desk</span>
      <h1 class="home-hero__title">
        Coastal Estates &amp; Commercial Property <br>
        <span>Across KwaZulu-Natal</span>
      </h1>
      <p class="home-hero__subtitle">
        Discreet acquisition and disposal of luxury residences and prime commercial assets. Direct advisory with registered property practitioners.
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="residential.html" class="btn btn--primary">
          Explore Residential
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="commercial.html" class="btn btn--outline">
          Commercial &amp; Industrial
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## 4. Verification Requirements
- `apex_check.mjs`: Zero errors, zero emoji, zero banned words.
- `verify_architecture.js`: Pass.
- Git commit and push to `origin/main`.
