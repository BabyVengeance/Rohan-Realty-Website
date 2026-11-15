# Specification: Premium Property Filter and Sorting System

- **Date:** 2026-11-15
- **Author:** Apex Digital SA Engineering Team
- **Status:** Approved by Client
- **Pages Affected:** `residential.html`, `commercial.html`
- **Copy Standard:** Plain, direct, humanized English (zero filler or inflated jargon)

---

## 1. Overview & Objective

Upgrade property discovery on both the residential (`residential.html`) and commercial (`commercial.html`) listing pages. Replace the absence of filters on the residential page and the basic flat buttons on the commercial page with a clean, two-tier executive filter and sort system.

### Principles:
1. **Simple, direct language:** Use plain words that everyday buyers and investors use (Area, Price, Bedrooms, For Sale, To Let).
2. **Instant live response:** Filter and sort immediately in the browser with vanilla JavaScript. No page reloads.
3. **Graceful zero-result handling:** When a search returns zero properties, show a helpful off-market enquiry box with direct WhatsApp/phone contact instead of a blank white page.
4. **Mobile-friendly:** 48px touch targets, horizontally scrollable top pill buttons, and zero horizontal page overflow.

---

## 2. Residential Page Specification (`residential.html`)

### 2.1 Inventory & Data Attributes
Every `<article class="estate-card">` receives explicit data attributes:
- `data-area`: `"hawaan"` (for 5 Nightjar Close and 55 Hawaan Drive) or `"izinga"` (for 12 Sera Bella and 6 Sera Bella)
- `data-price`: Integer value in ZAR (`28000000`, `19995000`, `9575000`, `8995000`)
- `data-price-tier`: `"under-10m"`, `"10m-20m"`, or `"over-20m"`
- `data-bedrooms`: Integer count (`5`, `4`)
- `data-title`: Property name and location string for keyword matching

### 2.2 Filter Console Controls
A control bar (`class="property-controls"`) placed directly above `.portfolio-grid`:

1. **Top Row (Area Buttons):**
   - `All Areas (4)` [Default active]
   - `Hawaan Forest Estate (2)`
   - `Izinga (2)`

2. **Second Row (Refinement Bar):**
   - **Keyword Search:** Input with placeholder `"Search by area or street..."`
   - **Price Select:**
     - `All Prices`
     - `Under R10M`
     - `R10M to R20M`
     - `Over R20M`
   - **Bedrooms Select:**
     - `All Bedrooms`
     - `4 Bedrooms`
     - `5 Bedrooms`
   - **Sort Select:**
     - `Featured`
     - `Price: High to Low`
     - `Price: Low to High`
   - **Results Status & Reset:**
     - Live counter element (`<span class="results-counter">Showing 4 homes</span>`)
     - Reset button (`<button class="reset-filters-btn" style="display:none;">Reset filters</button>`)

3. **No Results Box:**
   Rendered inside `.portfolio-grid` when visible cards equal zero:
   - Heading: `"No matching homes found"`
   - Message: `"We do not have a public listing matching your exact search. For unlisted private properties in Umhlanga and surrounding estates, speak with Rohan directly."`
   - Action links: WhatsApp Concierge (`069 522 4226`) and `"Clear all filters"` button.

---

## 3. Commercial Page Specification (`commercial.html`)

### 3.1 Inventory & Data Attributes
Every `<article class="comm-card">` receives explicit data attributes:
- `data-type`: `"sale"` or `"lease"`
- `data-category`: `"land"`, `"industrial"`, `"office"`, or `"retail"`
- `data-location`: `"umhlanga"`, `"durban-north"`, `"northfield"`, or `"hilton"`
- `data-price`: Integer value or representative rent figure for numerical sorting
- `data-size`: Integer value in square meters (GLA or Land Bulk)
- `data-title`: Property title for keyword matching

### 3.2 Filter Console Controls
Replacing the current `.filter-bar`:

1. **Top Row (Listing Type Buttons):**
   - `All Properties (11)` [Default active]
   - `For Sale` (Land parcels & investment assets)
   - `To Let` (Offices, logistics, and retail spaces)

2. **Second Row (Refinement Bar):**
   - **Keyword Search:** Input with placeholder `"Search by park, area, or property..."`
   - **Property Type Select:**
     - `All Types`
     - `Offices`
     - `Industrial & Warehouses`
     - `Commercial Land`
     - `Retail & Showrooms`
   - **Location Select:**
     - `All Locations`
     - `Umhlanga & Ridgeside`
     - `Durban North & Riverside`
     - `Northfield & Riverhorse`
     - `Hilton & Midlands`
   - **Sort Select:**
     - `Recommended`
     - `Price: High to Low`
     - `Price: Low to High`
     - `Size: Largest First`
   - **Results Status & Reset:**
     - Live counter element (`<span class="results-counter">Showing 11 properties</span>`)
     - Reset button (`<button class="reset-filters-btn" style="display:none;">Reset filters</button>`)

3. **No Results Box:**
   - Heading: `"No commercial properties match this search"`
   - Message: `"We do not have a listed property matching these exact criteria on the site right now. Contact our desk to ask about upcoming leases or private investment opportunities."`
   - Action links: Direct phone call (`069 522 4226`) and `"Reset filters"` button.

---

## 4. UI Architecture & Styling Tokens

### Visual System:
- **Surface:** Off-white background container (`var(--color-surface-offset)`) with subtle border (`1px solid var(--color-border)`).
- **Buttons (Pills):**
  - Normal state: Clean white background, 1px border, 0.875rem font size, minimum 48px touch footprint.
  - Active state: Deep navy background (`var(--color-navy)`), crisp white text, gold border highlight (`var(--color-primary)`).
- **Dropdowns & Inputs:**
  - Styled with custom SVG carats and focus rings in metallic gold (`#C9A050`).
  - No default OS styling glitches.
- **Card Transitions:**
  - Cards smoothly toggle with CSS opacity and display rules.
  - Container maintains balanced layout rhythm without empty orphan spaces.

---

## 5. Verification & Test Plan

1. **Filtering Accuracy:**
   - Test each category, area, price range, and bedroom count to confirm only correct cards show.
2. **Sorting Accuracy:**
   - Test High-to-Low and Low-to-High sorting on both pages to verify DOM elements sort in exact numerical order.
3. **Search Matching:**
   - Type keywords like "Hawaan", "Urban", "Izinga", "Logistics" into search fields to confirm real-time keystroke filtering.
4. **Empty State & Reset Test:**
   - Set filters to an impossible combination (e.g. 4 Bedrooms + Over R20M) to confirm the No Results card appears.
   - Click "Reset filters" to confirm full inventory restores.
5. **Mobile Viewport Test:**
   - Verify layout on 375px width to ensure top buttons scroll horizontally with zero layout break.
