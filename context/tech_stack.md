# Technical Stack & Design System — Rohan Realty

## 1. Core Architecture
- **Type:** Multi-page static architecture (Zero heavy framework bloat; sub-1.2s LCP, zero CLS).
- **Hosting Target:** Cloudflare Pages / cPanel (`public_html`) ready.
- **Routing Structure:**
  - `/` (`index.html`) — Flagship Home & Curated Portfolio Portal
  - `/about.html` — About Rohan Ramlall & Blue Ocean Realty
  - `/residential.html` — Luxury Residential, Penthouses & Prime Estates
  - `/commercial.html` — Commercial, Industrial Warehousing & Development Land
  - `/contact.html` — Private Advisory Desk & VIP Viewing Requests

## 2. Design Tokens (Blue Ocean Realty Brand Standards)
```css
:root {
  /* Brand Accents */
  --color-primary: #FFB800;         /* Signature Gold/Amber Accent */
  --color-primary-hover: #E0A200;
  --color-blue-bg: #003E7E;         /* Deep Heritage Royal Blue */
  --color-navy: #0A192F;            /* Premium Navy (Headings, Cards) */
  --color-navy-dark: #060B14;       /* Obsidian Black (Header/Footer Base) */
  --color-gold: #D4AF37;            /* Metallic Gold */
  
  /* Neutrals & Surfaces */
  --color-surface: #FFFFFF;
  --color-bg-light: #F8FAFC;
  --color-surface-offset: #F1F5F9;
  --color-border: #E2E8F0;
  --color-border-dark: rgba(255, 255, 255, 0.12);

  /* Typography */
  --color-text-main: #0F172A;
  --color-text-muted: #64748B;
  --color-text-inverse: #FFFFFF;
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Spatial Geometry */
  --max-width: 1440px;
  --nav-height: 80px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --touch-min: 48px;

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## 3. Navbar Specifications
- **Style:** Fixed sticky navbar (`height: 80px`, `z-index: 1000`).
- **Initial State:** Transparent gradient `linear-gradient(180deg, rgba(7, 13, 24, 0.85) 0%, rgba(7, 13, 24, 0) 100%)`.
- **Scrolled State:** `rgba(10, 25, 47, 0.96)` with `backdrop-filter: blur(12px)` and subtle bottom border/box-shadow.
- **Active Navigation Indicator:** Clear visual highlight for current active route.
- **Mobile Menu:** Accessible drawer overlay with keyboard escape trap and smooth slide/fade.
