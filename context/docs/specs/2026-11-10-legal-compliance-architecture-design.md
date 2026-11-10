# Specification: Legal Compliance & Statutory Disclosures Architecture

**Date:** 2026-11-10  
**Author:** Apex Digital SA Technical Architecture  
**Status:** Approved for Implementation Planning  
**Domain:** `rohanrealty.co.za`  
**Statutory Framework:** Property Practitioners Act 22 of 2019 (PPA), PPRA Regulations (Reg 34.3.4.6 & Reg 37), Protection of Personal Information Act 4 of 2013 (POPIA), Financial Intelligence Centre Act 38 of 2001 (FICA), Promotion of Access to Information Act 2 of 2000 (PAIA), Consumer Protection Act 68 of 2008 (CPA).

---

## 1. Executive Summary & Objective

The objective of this architecture is to insulate `rohanrealty.co.za`, Rohan Ramlall, and Blue Ocean Realty (Pty) Ltd from statutory and regulatory liability under South African property law.

By restructuring page copy, establishing dedicated legal disclosure routes, implementing a synchronized 4-column statutory footer with a full-width compliance banner, and embedding affirmative POPIA consent mechanics across all lead capture points, `rohanrealty.co.za` will operate with full legal integrity as a **curated digital showcase and personal marketing media hub operating under the statutory authority, supervision, and active license of Blue Ocean Realty (Pty) Ltd**.

---

## 2. Scope of Changes Across 20 Portal Pages

The implementation spans all 20 pages in the repository:
1. **5 Main Portal Pages:**
   - `index.html` (Flagship Home)
   - `about.html` (About Rohan Ramlall & Brokerage Foundation)
   - `residential.html` (Residential Collection Index)
   - `commercial.html` (Commercial & Industrial Portfolio)
   - `contact.html` (Private Advisory & Viewing Desk)
2. **4 Luxury Residential Landing Pages:**
   - `5-nightjar-close.html` (R28M Hawaan Forest Trophy Estate)
   - `55-hawaan-drive.html` (R19.995M Hawaan Contemporary Villa)
   - `12-sera-bella.html` (R9.575M Izinga Ridge Executive Residence)
   - `6-sera-bella.html` (R8.995M Izinga Ridge Executive Residence)
3. **11 Commercial & Industrial Landing Pages:**
   - `urban-corner.html`, `northfield-business-park.html`, `glass-house-building-1.html`, `glass-house-building-2.html`, `glass-house-building-5.html`, `21-richefond.html`, `the-glades-office-park.html`, `dunlop-house.html`, `580-riverside-road.html`, `the-avenues-centre.html`, `7-the-boulevard.html`.
4. **3 New Legal Policy Pages:**
   - `privacy-policy.html`
   - `terms-and-conditions.html`
   - `statutory-disclosure.html`

---

## 3. Pillar 1: About Section Supervision & Affiliation Architecture

### 3.1 Primary Copy Updates (`about.html` & `index.html`)
To prevent any infraction of **PPRA Regulation 34.3.4.6** (unauthorized trading names / holding out as an independent estate agency), the About section copy will declare candidate status and supervision:

- **Eyebrow / Sub-heading:** `PROFESSIONAL PROFILE & AFFILIATION`
- **Main Headline:** `Rohan Ramlall | Candidate Property Practitioner`
- **Supervision Sub-headline:** `In Association with Blue Ocean Realty (Pty) Ltd`
- **Body Copy:**
  > "Rohan Ramlall is a Candidate Property Practitioner registered with the Property Practitioners Regulatory Authority (PPRA), operating under the active mentorship and supervision of Principal Property Practitioner Benjamin Govindraj (FFC: Pending / Available on Request) at Blue Ocean Realty (Pty) Ltd (Firm FFC: Pending / Available on Request).
  >
  > Focusing on prime commercial, industrial logistics, and high-value residential properties across KwaZulu-Natal, this platform functions as a curated digital showcase and personal media hub. All client mandates, property listings, sales agreements, lease contracts, and fiduciary obligations are concluded strictly under the auspices and licensed authority of Blue Ocean Realty (Pty) Ltd."

---

## 4. Pillar 2: Global 4-Column Footer & Full-Width Compliance Strip

### 4.1 Four-Column Responsive Grid Structure
Standardized across all 20 pages using `.footer__grid`:
- **Column 1 — Brand & Purpose:**
  - Wordmark: `ROHAN REALTY`
  - Descriptor: *"Bespoke digital showcases for high-ticket residential, commercial, and industrial real estate across KwaZulu-Natal. Marketed in professional association with Blue Ocean Realty (Pty) Ltd."*
- **Column 2 — Portfolios & Navigation:**
  - Links: Luxury Residences (`residential.html`), Commercial & Industrial (`commercial.html`), Media Showcases, Private Consultations (`contact.html`).
- **Column 3 — Legal & Compliance Routes:**
  - Links:
    - Privacy Policy (POPIA) (`privacy-policy.html`)
    - Terms of Use & E&OE (`terms-and-conditions.html`)
    - PPRA Statutory Disclosure (`statutory-disclosure.html`)
    - PAIA Manual (`statutory-disclosure.html#paia`)
- **Column 4 — Direct Contact & Agency Office:**
  - Agent: Rohan Ramlall (+27 69 522 4226 | `info@blueoceanrealty.co.za`)
  - Principal: Benjamin Govindraj (+27 73 691 0478)
  - Agency: Blue Ocean Realty (Pty) Ltd (Suite 6, 66 Adelaide Tambo Drive, Durban North, 4051)

### 4.2 Full-Width Statutory Sub-Footer Compliance Banner
A full-width high-contrast disclosure block rendered above the final copyright bar:
```html
<div class="footer-compliance-banner">
  <div class="container">
    <p class="compliance-heading">
      BLUE OCEAN REALTY (PTY) LTD — REGISTERED WITH THE PPRA (PROPERTY PRACTITIONERS REGULATORY AUTHORITY)
    </p>
    <p class="compliance-ffc">
      <strong>Agency FFC Number:</strong> In Process / Available on Request &bull; 
      <strong>Principal Property Practitioner:</strong> Benjamin Govindraj (FFC: In Process / Available on Request) &bull; 
      <strong>Candidate Property Practitioner:</strong> Rohan Ramlall (FFC: In Process / Available on Request)
    </p>
    <p class="compliance-notice">
      <strong>Regulatory Notice (PPA Act 22 of 2019):</strong> "Rohan Realty" is a domain name and personal marketing portal operated by Rohan Ramlall. It does not operate as an independent estate agency. All property marketing, buyer/seller mandates, Offers to Purchase (OTPs), commercial leases, and commission negotiations are facilitated and concluded strictly through Blue Ocean Realty (Pty) Ltd, an accredited property practitioner firm holding a valid Fidelity Fund Certificate. No trust monies or deposits are received or processed through rohanrealty.co.za; all trust accounts and transaction funds are held and administered exclusively by the appointed conveyancing attorneys or Blue Ocean Realty’s audited Section 54 trust account.
    </p>
  </div>
</div>
```

---

## 5. Pillar 3: Three Dedicated Policy Page Routes

Each page will inherit the canonical header, brand typography (`Outfit` / `Roboto`), full responsive layout, and canonical compliance footer.

### 5.1 Route 1: `privacy-policy.html` (POPIA & Data Privacy Compliance)
- **Title:** Privacy Policy & Protection of Personal Information (POPIA) Notice
- **Responsible Party Identification:** Blue Ocean Realty (Pty) Ltd and Rohan Ramlall (affiliated Candidate Property Practitioner) as Joint Responsible Parties under Act 4 of 2013.
- **Categories of Personal Information Collected:** Full name, mobile number, email address, property acquisition requirements, investment parameters, financial pre-qualification status, and digital identifiers.
- **Purpose of Processing:**
  - Fulfilling brochure requests and delivering Property Information Packs (PIPs).
  - Booking and managing confidential on-site viewings.
  - Conducting preliminary identity and qualification verifications under the Financial Intelligence Centre Act (FICA Act 38 of 2001).
  - Client communication regarding active mandates held by Blue Ocean Realty (Pty) Ltd.
- **Third-Party Disclosures:** Data is strictly never sold or leased. Disclosed only to supervising principals, appointed conveyancing attorneys, authorized bond originators, and mandated property sellers/landlords to advance transactions.
- **Data Subject Rights:** Explicit instructions on requesting access, correction, or destruction of records (contact: `info@blueoceanrealty.co.za` / `069 522 4226`).
- **Information Regulator Details:** Physical address (JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001) and contact email (`complaints.IR@justice.gov.za`).

### 5.2 Route 2: `terms-and-conditions.html` (Website Terms, E&OE & Mandate Framework)
- **Title:** Terms of Use, Listing Disclaimers & Mandate Framework
- **Section 1 — Errors and Omissions Excepted (E&OE):**
  - All listing details, asking prices, erf sizes, Gross Lettable Area (GLA), rates, taxes, and levies are guidelines subject to change, prior sale, or seller confirmation without prior notice.
  - Purchasers and tenants are contractually required to perform independent due diligence (title deeds, zoning certificates, building plans).
- **Section 2 — Non-Binding Digital Presentations:**
  - Financial projections, rental returns, SAPOA lease commissions, and capitalization rates do not constitute formal Offers to Purchase, binding contracts, or financial advice under the Financial Advisory and Intermediary Services Act (FAIS Act 37 of 2002).
- **Section 3 — Mandate and Agency Integrity:**
  - Rohan Ramlall acts strictly as an authorized representative and candidate practitioner of Blue Ocean Realty (Pty) Ltd.
  - All sole, joint, or open mandates are granted exclusively to Blue Ocean Realty (Pty) Ltd.
- **Section 4 — Intellectual Property & Media Rights:**
  - Drone cinematography, 4K walkthroughs, architectural photography, floor plans, and digital styling are proprietary intellectual property. Unauthorized scraping, re-publishing, or syndication is prohibited.

### 5.3 Route 3: `statutory-disclosure.html` (PPRA Regulatory Transparency & Section 54)
- **Title:** Statutory Disclosure & PPRA Regulatory Notice
- **Statutory Entity Registration:** Full confirmation of registration under the Property Practitioners Act 22 of 2019.
- **Fidelity Fund Certificate Schedule:**
  - Licensed Firm: Blue Ocean Realty (Pty) Ltd (Firm FFC: In Process / Available on Request)
  - Designated Principal Property Practitioner: Benjamin Govindraj (FFC: In Process / Available on Request)
  - Candidate Property Practitioner: Rohan Ramlall (FFC: In Process / Available on Request)
- **Section 54 Trust Account Declaration:**
  - Transparent statement declaring that `rohanrealty.co.za` operates no private trust banking account. All deposit monies are handled exclusively through Blue Ocean Realty's audited trust account or appointed conveyancer trust accounts.
- **PAIA Declaration:** Information on how to request the firm's PAIA manual in terms of the Promotion of Access to Information Act.

---

## 6. Pillar 4: Form-Level POPIA Consent Mechanics

### 6.1 Checkbox & Micro-Copy Architecture
Injected into every form across all 20 pages (`contact-enquiry`, `viewing-enquiry`, and property inquiry forms):
```html
<div class="form__group form__group--consent" style="margin: 1.25rem 0;">
  <label class="form__checkbox-label" style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.8125rem; line-height: 1.5; color: var(--color-text-muted);">
    <input type="checkbox" name="popia_consent" class="form__checkbox" required style="margin-top: 0.2rem; width: 18px; height: 18px; accent-color: var(--color-primary); cursor: pointer;">
    <span>
      I consent to Rohan Ramlall and Blue Ocean Realty (Pty) Ltd processing my contact information to provide property brochures, viewing access, and transaction assistance in accordance with the <a href="privacy-policy.html" target="_blank" style="color: var(--color-primary); text-decoration: underline;">Privacy Policy</a>.
    </span>
  </label>
</div>
```

Underneath the submit button:
```html
<p class="form__subtext" style="font-size: 0.75rem; color: #94A3B8; margin-top: 0.75rem; text-align: center; line-height: 1.4;">
  Your details are protected under POPIA and will never be shared without consent. All transactions are concluded via Blue Ocean Realty (Pty) Ltd (PPRA Registered).
</p>
```

### 6.2 Client-Side JavaScript Enforcement (`js/main.js`)
- Every form's submit button will start in a disabled state (`disabled` property set to `true`).
- An event listener on `[name="popia_consent"]` dynamically enables/disables the submit button based on check state.
- Form submission handlers will verify consent before transmitting any data.

---

## 7. Verification & Quality Gates

1. **Parity Checker:** [`scripts/verify_components.js`](file:///e:/MONEY/Real%20estate/rohan%20realty/Rohan%20Realty/scripts/verify_components.js) will be updated to test for the canonical footer, compliance strip, and policy routes across all required pages, ensuring 100% pass rate.
2. **Link Auditor:** [`scripts/audit_links.js`](file:///e:/MONEY/Real%20estate/rohan%20realty/Rohan%20Realty/scripts/audit_links.js) will verify all links to `privacy-policy.html`, `terms-and-conditions.html`, and `statutory-disclosure.html` resolve with zero broken routes.
3. **Responsive Testing:** Verify touch target dimensions ($\ge 48\text{px}$) for the POPIA checkbox and verify zero layout overflow on mobile ($\le 320\text{px}$).
