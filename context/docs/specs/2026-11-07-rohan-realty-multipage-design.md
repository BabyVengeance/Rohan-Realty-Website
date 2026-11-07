# Specification: Rohan Realty Multi-Page Luxury Portal (`rohanrealty.co.za`)

**Date:** 2026-11-07  
**Author:** Apex Digital SA Technical Architecture  
**Status:** Validated Draft for Client Review  
**Domain:** `rohanrealty.co.za`  
**Licensee Backing:** Blue Ocean Realty (Suite 6, 66 Adelaide Tambo Drive, Durban North)  

---

## 1. Overview & Business Objective
Transform `rohanrealty.co.za` into an authoritative, high-status multi-page digital real estate portal. It bridges Rohan Ramlall's high-visibility personal brand on social media (`@rohanrealty.co.za` on Instagram, TikTok, Facebook) with Blue Ocean Realty's institutional brokerage infrastructure and PPRA compliance.

Wealthy individuals (HNWIs) and corporate investors demand rapid page loads, zero visual clutter, and transparent property specs.

---

## 2. Directory & Page Architecture (Flat, Zero-Subfolder Structure)

The existing nested property directories (`12 Sera Bela/`, `5 Night jar/`, `55 Hawan/`, `6 Sera Bela/`) and legacy `Template/` will be extracted and consolidated into a unified root page structure and centralized `assets/` repository:

```
rohan-realty/
├── assets/
│   ├── branding/                 # Dual lockup logo, Blue Ocean crest, favicon bundle
│   ├── agent/                    # High-res portraits of Rohan Ramlall (e.g. coastal balcony)
│   └── properties/
│       ├── 5-nightjar-close/     # 66 high-res photographs + video walkthroughs
│       ├── 55-hawaan-drive/      # 56 high-res photographs
│       ├── 12-sera-bella/        # 40 high-res photographs
│       ├── 6-sera-bella/         # 23 high-res photographs
│       └── commercial/           # Industrial, logistics, and development land assets
├── css/
│   ├── main.css                  # Co-branded navbar, typography, layout, footer, shared tokens
│   ├── tier-executive.css        # Tier 2 (R5M - R10M) Executive Navy Bronze styling
│   └── tier-trophy.css           # Tier 3 (R10M+) Obsidian Trophy Luxury styling
├── js/
│   ├── main.js                   # Sticky navbar state, mobile drawer, contact form validation
│   └── gallery.js                # Progressive photo loading (2 rows initial + 3 rows reveal) & lightbox
├── index.html                    # 1. Flagship Home & Portfolio Gateway
├── about.html                    # 2. About Rohan Ramlall & Blue Ocean Realty Synergy
├── residential.html              # 3. Residential Portfolio Index (Grid of all 4 luxury estates)
├── commercial.html               # 4. Commercial, Industrial & Development Land Index
├── contact.html                  # 5. Private Advisory Concierge & VIP Viewing Desk
├── 5-nightjar-close.html         # R28,000,000 Trophy Estate (Tier 3 Obsidian)
├── 55-hawaan-drive.html          # R19,995,000 Contemporary Villa (Tier 3 Obsidian)
├── 12-sera-bella.html            # R9,575,000 Executive Residence (Tier 2 Navy Bronze)
└── 6-sera-bella.html             # R8,995,000 Executive Residence (Tier 2 Navy Bronze)
```

---

## 3. Dynamic Price-Tier Styling Engine

As mandated by the `realestate-landing-page` system, visual treatment is dynamically dictated by property transaction scale:

### Tier 2: R5,000,000 – R10,000,000 (Executive Freehold & Gated Estates)
* **Properties:**
  - `12-sera-bella.html` — **R9,575,000** (Izinga Ridge, Umhlanga)
  - `6-sera-bella.html` — **R8,995,000** (Izinga Ridge, Umhlanga)
* **Aesthetic:** Polished Executive Luxury, architectural clarity.
* **Palette:**
  - Executive Navy: `#0A192F` / `#0B132B`
  - Accent Bronze / Warm Champagne: `#C5A880`
  - Clean Surface: `#FFFFFF` / Slate `#F8FAFC`
* **Typography:** `Outfit` display sans paired with `Roboto` body.
* **Layout:** Full-bleed widescreen hero with floating frosted glass spec bar, alternating feature breakdowns.

### Tier 3: R10,000,000+ (Bespoke Trophy Residences & Ultra-Luxury)
* **Properties:**
  - `5-nightjar-close.html` — **R28,000,000** (Hawaan Forest Estate)
  - `55-hawaan-drive.html` — **R19,995,000** (Hawaan Forest Estate)
* **Aesthetic:** Black-tie Obsidian Editorial, Sovereign Minimalism.
* **Palette:**
  - Obsidian Base: `#090A0F`
  - Charcoal Surface: `#121620`
  - Polished Champagne Gold Accent: `#D4AF37` / `#C9A050`
  - Off-White Text: `#F8FAFC`
* **Typography:** Editorial Serif headings (`Playfair Display`) paired with clean tracked sans body (`Roboto`).
* **Layout:** Cinematic dark viewport hero, frosted dark-glass cards with gold border hairlines, video walkthrough embeds.

---

## 4. Immutable Brand Anchors & Co-Branded Navbar

Every single page (`index.html`, `about.html`, `residential.html`, `commercial.html`, `contact.html`, and each property page) shares the exact same high-status navigation:

### Navbar Architecture
1. **Container Width:** `max-width: 1440px` with dynamic edge clamp `clamp(1.5rem, 4vw, 3rem)`.
2. **Left Brand Lockup:**
   - Primary: `ROHAN REALTY` in bold, uppercase `Outfit`.
   - Vertical gold divider (`#FFB800` / `#C9A050`).
   - Corporate Crest: `Blue Ocean Realty` emblem with the golden circular house mark.
   - Kicker/Descriptor: `Property Practitioner at Blue Ocean Realty`.
3. **Primary Links:**
   - `Home` (`index.html`)
   - `Residential` (`residential.html`)
   - `Commercial & Industrial` (`commercial.html`)
   - `About` (`about.html`)
4. **Primary CTA:**
   - Gold button: `Private Consultation` (linking to `contact.html` or direct WhatsApp `+27 69 522 4226`).
5. **Initial & Scroll Behavior:**
   - Initial: Transparent linear gradient overlay.
   - Scrolled: Solid frosted navy `rgba(10, 25, 47, 0.96)` with `backdrop-filter: blur(12px)`.

### Enquiry & Contact Standard
- Retains Blue Ocean Realty's high-converting 2-column layout:
  - Left: Rohan Ramlall (`069 522 4226`), Benjamin Govinraj (`073 691 0478`), `info@blueoceanrealty.co.za`, Office KZN.
  - Right: Clean 3-block form (Name/Phone, Email, Message, "Request a Private Viewing" CTA).

---

## 5. Commercial & Industrial Integration

The `commercial.html` page houses commercial developments, heavy/light industrial logistics facilities, and development land across prime KZN economic corridors (Riverhorse Valley, Springfield Park, Cornubia, Ballito Commercial):
- **Technical Metrics:** Gross Lettable Area (GLA in $m^2$), 3-phase power (kVA / Amps), eave height, superlink turning radius, zoning.
- **Conversion Trigger:** "Request Information Memorandum (IM)" and "Schedule Site Inspection".

---

## 6. Progressive Gallery Protocol (Property Pages)
1. **Initial Load:** Exactly 2 rows of high-resolution photographs (desktop: 8 photos, mobile: 4 photos).
2. **Expand Control:** "Load More Photos (+XX Photos)" button revealing 3 additional rows on demand.
3. **Zero Overlay Text:** Photos remain pristine with hover zoom only.
4. **Lightbox Modal:** Fullscreen swipe/arrow navigation with counter and keyboard escape trap.
