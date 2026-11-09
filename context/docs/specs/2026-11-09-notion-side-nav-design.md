# Notion-Style Side Navigation ("Outline Rail") — Design Specification

**Status:** Proposed & Brainstormed  
**Target:** Rohan Realty & Blue Ocean Realty Property Landing Pages  
**Date:** 2026-11-09  

---

## 1. Objective & Problem Statement

### 1.1 Problem
The existing property landing pages featured a horizontal `.prop-jumpbar` within the hero section content container:
`[GALLERY (66)] [HIGHLIGHTS] [WALKTHROUGH VIDEO] [SPECIFICATIONS] [LOCATION] [BOOK VIEWING]`
While functional, this horizontal bar:
1. Cluttered the initial hero fold and competed with authoritative property titles and valuations.
2. Contributed to vertical height pressure on smaller laptop displays.
3. Disappeared once the user scrolled down past the hero section, leaving the user with no persistent in-page orientation or quick-jump capability.

### 1.2 Solution
Replace the horizontal jumpbar with a persistent, ultra-clean **Notion-Style Side Navigation ("Outline Rail")**:
- **Collapsed:** A slim vertical stack of horizontal dashes/ticks along the right margin of the viewport. The tick corresponding to the user's current scroll position illuminates in Sovereign Champagne Gold (`#C9A050`).
- **Expanded (On Hover / Interaction):** Smoothly opens into a floating obsidian frosted-glass card (`rgba(6, 11, 20, 0.94)`, `backdrop-filter: blur(16px)`, gold hairline border) showing the full property outline with interactive jump links.
- **Hybrid Auto-Discovery:** Automatically scans sections on page load, eliminating manual markup while supporting custom overrides via `data-toc-title`.

---

## 2. Architecture & Component Blueprint

### 2.1 DOM Structure (Dynamically Injected via `js/main.js`)

```html
<nav class="notion-toc" id="notionToc" aria-label="Page Table of Contents">
  <!-- Collapsed Visual Rail (Dashes) -->
  <div class="notion-toc__rail" aria-hidden="true">
    <span class="notion-toc__tick notion-toc__tick--active" data-index="0"></span>
    <span class="notion-toc__tick" data-index="1"></span>
    <span class="notion-toc__tick" data-index="2"></span>
  </div>

  <!-- Expanded Outline Card -->
  <div class="notion-toc__card" role="menu">
    <div class="notion-toc__card-header">
      <span>Property Outline</span>
    </div>
    <div class="notion-toc__items">
      <a href="#hero" class="notion-toc__item notion-toc__item--active" role="menuitem">Overview</a>
      <a href="#gallery" class="notion-toc__item" role="menuitem">Curated Gallery</a>
      <a href="#specs" class="notion-toc__item" role="menuitem">Specifications &amp; Features</a>
      <a href="#contact" class="notion-toc__item" role="menuitem">Private Viewing</a>
    </div>
  </div>
</nav>
```

### 2.2 Auto-Discovery Algorithm

1. The script inspects whether the page is a property landing page (contains `<section id="hero">` or `<section id="featured">`).
2. Finds all target sections:
   - Primary sections with valid `id` attributes (e.g. `hero`, `overview`, `architecture`, `specs`, `gallery`, `video-tour`, `location`, `contact`, `enquiry`, `browse`).
   - Resolves display titles in this priority:
     - `data-toc-title` attribute on the `<section>` element.
     - Section authoritative `<h2>` or `<h3>` (stripping auxiliary badges or subtitle markup).
     - Cleaned/humanized `id` string (e.g. `video-tour` $\rightarrow$ "Video Walkthrough").
3. Ignores utility sections, modals, hidden templates, or sub-footers.
4. If qualifying sections count $\ge 3$, builds and appends the navigation rail.

### 2.3 Visual Design & Motion Physics

- **Positioning:**
  - Desktop: `position: fixed; right: clamp(1rem, 2vw, 2.25rem); top: 50%; transform: translateY(-50%); z-index: 900;`
- **Rail Geometry (Collapsed):**
  - Width: `24px`
  - Inactive ticks: `width: 12px; height: 2px; background: rgba(255, 255, 255, 0.28); border-radius: 1px; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);`
  - Inactive hover: `background: rgba(255, 255, 255, 0.7); width: 16px;`
  - Active tick: `width: 22px; height: 2.5px; background: #C9A050; box-shadow: 0 0 10px rgba(201, 160, 80, 0.5);`
- **Card Geometry (Expanded):**
  - Trigger: `:hover` or click/focus.
  - Background: `rgba(6, 11, 20, 0.94)` obsidian surface.
  - Border: `1px solid rgba(201, 160, 80, 0.28)`.
  - Backdrop Blur: `16px`.
  - Card Header: `Outfit`, `0.6875rem`, letter-spacing `0.12em`, uppercase, gold `#C9A050`.
  - Item styling: `font-size: 0.8125rem; font-weight: 500; color: rgba(255, 255, 255, 0.8); padding: 0.45rem 0.75rem; border-radius: 4px; transition: all 0.15s ease;`
  - Active item: `color: #FFFFFF; font-weight: 700; background: rgba(201, 160, 80, 0.15); border-left: 2px solid #C9A050;`
- **Smooth Navigation & Scroll Margins:**
  - Clicking any item triggers smooth scrolling with header offset:
    `scroll-margin-top: calc(var(--nav-height, 84px) + 1.5rem);`
- **Responsive Handling:**
  - $\ge 1100\text{px}$: Floating Notion Rail on the right edge.
  - $< 1100\text{px}$ (Tablets & Mobile): Automatically transforms into a discreet, floating bottom-right action button (`44px` gold/obsidian compass/outline icon) that opens a touch-friendly bottom sheet jump menu, avoiding any obstruction of property photography.

---

## 3. Migration & De-clutter Checklist

1. Remove `.prop-jumpbar` markup from:
   - `5-nightjar-close.html`
   - `55-hawaan-drive.html`
   - `12-sera-bella.html`
2. Remove `.prop-jumpbar` CSS from `css/header.css`.
3. Add `.notion-toc` styles to `css/header.css`.
4. Add auto-discovery and scroll observation logic to `js/main.js`.
5. Verify on desktop and mobile viewports across all 15 property pages.
