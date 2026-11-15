# Specification: Blue Ocean Realty Re-Positioning & Statutory Compliance Architecture

- **Date:** 2026-11-15
- **Author:** Apex Digital SA & Blue Ocean Realty Architecture Team
- **Status:** Approved by Client
- **Jurisdiction:** Republic of South Africa
- **Regulatory Framework:** Property Practitioners Act (Act 22 of 2019) & PPRA Regulations 2022

---

## 1. Executive Summary & Legal Context

### 1.1 Statutory Context (Property Practitioners Act 22 of 2019)
Under Section 48, Section 56, and Regulation 34 of the Property Practitioners Act 22 of 2019:
1. Only a registered property practitioner business holding an active Fidelity Fund Certificate (FFC) may operate an estate agency, conclude mandates, market property, or trade under a commercial brand name.
2. A Candidate Property Practitioner (Rohan Ramlall) may not trade under an unregistered personal trading name ("Rohan Realty") as though it were an independent estate agency. Such representation constitutes a regulatory breach and potential criminal sanction under Section 48/56 of the PPA.
3. A Candidate Property Practitioner must explicitly state their candidate status, work under the active mentorship and supervision of a registered Principal Property Practitioner (Benjamin Govindraj), and ensure that all mandates, marketing, and client transactions flow exclusively through the accredited firm: **Blue Ocean Realty (Pty) Ltd**.
4. Section 54 trust accounting regulations require that no individual agent receive trust monies, which must strictly reside with appointed conveyancing attorneys or the firm's audited trust account.

### 1.2 Core Objective
Position the entire digital portal as the official commercial showcase of **Blue Ocean Realty (Pty) Ltd**. Remove all primary-level branding of "Rohan Realty" from the navigation headers and footers across all 23 templates. Maintain the existing layout and structure of the About section and Advisor Spotlight while surgically amending copy to reflect Rohan Ramlall's lawful role as a Candidate Property Practitioner at Blue Ocean Realty.

---

## 2. Scope of Changes Across All Templates

Total Affected Files: 23 HTML Templates
- `index.html`
- `about.html`
- `residential.html`
- `commercial.html`
- `contact.html`
- `statutory-disclosure.html`
- `privacy-policy.html`
- `terms-and-conditions.html`
- Single residential listings (4): `5-nightjar-close.html`, `55-hawaan-drive.html`, `12-sera-bella.html`, `6-sera-bella.html`
- Single commercial listings (11): `21-richefond.html`, `580-riverside-road.html`, `7-the-boulevard.html`, `dunlop-house.html`, `glass-house-building-1.html`, `glass-house-building-2.html`, `glass-house-building-5.html`, `northfield-business-park.html`, `the-avenues-centre.html`, `the-glades-office-park.html`, `urban-corner.html`

---

## 3. Detailed Component Architecture

### 3.1 Header Navigation (`.site-header .nav__brand`)

#### Baseline Markup (To Be Replaced)
```html
<a href="index.html" class="nav__brand" aria-label="Rohan Realty Home">
  <div class="nav__brand-primary">
    <span class="nav__brand-title">ROHAN <span>REALTY</span></span>
  </div>
  <div class="nav__brand-divider" aria-hidden="true"></div>
  <div class="nav__brand-agency">
    <img src="assets/branding/blue-ocean-logo.png" alt="Blue Ocean Realty" class="nav__brand-logo" width="160" height="40" loading="eager">
  </div>
</a>
```

#### Production Specification
- Remove `.nav__brand-primary` and `.nav__brand-divider`.
- The logo `assets/branding/blue-ocean-logo.png` becomes the direct, authoritative child of `.nav__brand`.
- Accessibility label updated to `aria-label="Blue Ocean Realty Home"`.
- Mobile navigation menu drawer retains clean links without "Rohan Realty" branding.

```html
<a href="index.html" class="nav__brand" aria-label="Blue Ocean Realty Home">
  <img src="assets/branding/blue-ocean-logo.png" alt="Blue Ocean Realty" class="nav__brand-logo" width="180" height="44" loading="eager">
</a>
```

---

### 3.2 Canonical Compliance Footer (`footer.footer`)

#### Column 1: Firm Identity (`.footer__col-brand`)
- **Title:** `BLUE OCEAN <span>REALTY</span>`
- **Description:** "Premier real estate brokerage specialising in prime residential estates, luxury coastal developments, and strategic commercial and industrial property across KwaZulu-Natal."
- **Credentials:**
  - `Blue Ocean Realty (Pty) Ltd`
  - `Registered with the PPRA • Holding a Valid Fidelity Fund Certificate`
  - `Durban North Executive Operations • Suite 6, 66 Adelaide Tambo Drive`

#### Column 4: Advisory & Direct Contact
- Contact block clearly differentiates roles:
  - **Candidate Property Practitioner:** Rohan Ramlall (Direct / WhatsApp: 069 522 4226)
  - **Principal Property Practitioner:** Benjamin Govindraj (073 691 0478)
  - **Agency Headquarters:** Suite 6, 66 Adelaide Tambo Drive, Durban North, 4051

#### Sub-Footer Statutory Banner
- **Notice Heading:** `BLUE OCEAN REALTY (PTY) LTD — REGISTERED WITH THE PPRA (PROPERTY PRACTITIONERS REGULATORY AUTHORITY)`
- **FFC Line:** `Agency FFC Number: In Process / Available on Request • Principal Property Practitioner: Benjamin Govindraj (FFC: In Process / Available on Request) • Candidate Property Practitioner: Rohan Ramlall (FFC: In Process / Available on Request)`
- **Regulatory Text:**
  "All property marketing, buyer and seller representation, sole and open mandates, Offers to Purchase (OTPs), commercial leases, and commission negotiations are facilitated and concluded strictly through Blue Ocean Realty (Pty) Ltd, an accredited property practitioner firm holding a valid Fidelity Fund Certificate. No trust monies or deposits are received or processed through personal accounts; all trust accounts and transaction funds are held and administered exclusively by the appointed conveyancing attorneys or Blue Ocean Realty’s audited Section 54 trust account."

#### Copyright Sub-Bar
- `&copy; 2026 Blue Ocean Realty (Pty) Ltd. All rights reserved.`
- `POPIA Compliant Operations • Registered with the PPRA under PPA Act 22 of 2019`

---

### 3.3 About Section & Advisor Spotlight Amendments

#### In `about.html`:
1. **Hero Subtitle:**
   - From: "Meet Rohan Ramlall — bridging high-impact modern media with rigorous real estate advisory under Blue Ocean Realty."
   - To: "Meet Rohan Ramlall — delivering high-impact property media and dedicated client representation at Blue Ocean Realty."
2. **Affiliation Badge:**
   - From: `In Association with Blue Ocean Realty (Pty) Ltd`
   - To: `Blue Ocean Realty (Pty) Ltd • Candidate Property Practitioner`
3. **Statutory Mentorship Box:**
   - Sentence 1: "Rohan Ramlall is a Candidate Property Practitioner registered with the Property Practitioners Regulatory Authority (PPRA), operating under the active mentorship and supervision of Principal Property Practitioner Benjamin Govindraj (FFC: In Process / Available on Request) at Blue Ocean Realty (Pty) Ltd (Firm FFC: In Process / Available on Request)."
   - Sentence 2: "Focusing on prime commercial, industrial logistics, and high-value residential properties across KwaZulu-Natal, this portal serves as a specialized showcase for Blue Ocean Realty's premium mandates. All client mandates, property listings, sales agreements, lease contracts, and fiduciary obligations are concluded strictly under the licensed authority of Blue Ocean Realty (Pty) Ltd."
4. **Media Reach Paragraph:**
   - From: "Through Rohan Realty and his personal channels across Instagram (@rohanrealty.co.za)..."
   - To: "Leveraging high-production digital media and his established audience across Instagram (@rohanrealty.co.za), TikTok, and Facebook, Rohan provides high-impact property cinematic showcases for Blue Ocean Realty's premier mandates. Every exclusive listing receives cinematic visual production and targeted investor distribution engineered to reach qualified buyers, corporate executives, and private investors directly."
5. **Agency Foundation Intro:**
   - From: "Every transaction concluded through Rohan Realty operates under the strict regulatory oversight..."
   - To: "Every mandate, transaction, and client representation operates under the strict regulatory oversight, contractual backing, and executive governance of Blue Ocean Realty in Durban North."

#### In `index.html` (Advisor Spotlight):
1. **Card Role:** `Candidate Property Practitioner • Blue Ocean Realty (Pty) Ltd`
2. **Kicker:** `Blue Ocean Realty • Advisor Spotlight`
3. **Bio Text:** "Operating at the intersection of modern cinematic media distribution and institutional advisory, Rohan Ramlall delivers active buyer discovery for Blue Ocean Realty's marquee sellers and bespoke acquisition services for private clients."

---

### 3.4 Page Titles, Meta Tags & Hero Kickers

1. **Meta `<title>` standard:**
   - Replace `Rohan Realty • Blue Ocean Realty` with `Blue Ocean Realty`
   - Example: `5 Nightjar Close, Zimbali Coastal Resort | Blue Ocean Realty`
   - Example: `About Rohan Ramlall | Candidate Property Practitioner • Blue Ocean Realty`
2. **Meta Descriptions & OG Tags:**
   - Standardize all descriptions to cite Blue Ocean Realty as the brokerage firm.
3. **Hero Kickers:**
   - Replace `Rohan Realty • Blue Ocean Realty` with `Blue Ocean Realty • KwaZulu-Natal` or `Blue Ocean Realty • Luxury & Commercial Portfolios`.

---

## 4. Verification and Quality Gates

1. **DOM Tree & CSS Check:** Confirm `.nav__brand-logo` renders properly without layout shifts when standalone.
2. **Zero-Cutoff & Mobile Invariant:** Verify header and footer on 320px, 375px, and 1440px viewports.
3. **Search & Replace Integrity Check:** Execute global grep across all `.html` files to guarantee that zero instances of "Rohan Realty" remain in navbars, footers, or unapproved headers.
4. **Zero-Emoji Enforcement:** Verify that all updated templates contain zero unicode emojis.
