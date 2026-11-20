# Spec: Blue Ocean Luxury: SEO, GEO and Google Ads readiness

## 1. Job
- Client and niche: Blue Ocean Realty (Pty) Ltd, luxury residential and commercial property in KZN. Rohan Ramlall is a Candidate Property Practitioner under Benjamin Govindraj.
- Audience and their main task: HNW buyers, corporate tenants and offshore investors want to look at a listing, then book a viewing or ask a question.
- Primary job: every page is indexable and citable by Google and AI engines, and every listing page works as a Google Ads landing page that records the conversions Ben will bid on.
- Success measure: tracked enquiries (WhatsApp click, call click, form submit), Search Console coverage of every URL, rich-result-eligible schema, mobile LCP under 2.5s on listing pages.

## 2. Verification of the previous audit (2026-11-20-master-geo-seo-audit.md)
| Claim in that audit | Status now |
| --- | --- |
| Canonicals 0/23, no robots.txt, sitemap or llms.txt | Since fixed: all 24 pages have them. **They all point to `rohanrealty.co.za`, which does not resolve.** 205 URLs are wrong. |
| JSON-LD on 4/23 | Since fixed: 24/24 have JSON-LD. But each page holds its own standalone block. There is no shared `@id` entity graph, no `BreadcrumbList`, no `RealEstateListing`, and listing pages have no FAQ. |
| Property24 URL in the 5 Nightjar schema | Fixed. |
| 80 unsized images | Fixed for dimensions (1 left on 40 Idwala). **Not caught: 304 JPG/PNG, zero WebP/AVIF, 110 MB of images, 33 files over 800 KB, up to 2.9 MB each.** This is the biggest Ads Quality Score risk. |
| Missed | No analytics, GTM, Consent Mode or conversion events at all. |
| Missed | Cloudflare Pages strips `.html` with a 308 redirect, so every `.html` canonical, sitemap entry and Ads final URL would be a redirect. |
| Missed | og:image on 10/24 pages, relative paths (social and Ads previews break). Twitter cards on 3/24. |
| Missed | 34 `tel:069...` links are not in international format. Offshore callers fail. |
| Missed | No `_headers` (security headers, caching), no `_redirects`, no 404 page. |
| Missed (compliance) | llms.txt says "100% SARB Capital Repatriation Guarantee": a guarantee claim (CPA s41, ARB). Banned words: "Elevated" (residential.html, apex_check ERROR), "sanctuaries" in listing schema. |

## 3. Scope (all 24 pages plus site infrastructure)
1. **Domain move:** every URL becomes `https://blueoceanluxury.co.za/<clean-path>` (no `.html`). Canonicals, og:url, sitemap, llms.txt, robots and schema all change. Internal links stay as `.html` files (Pages serves them), and the redirects make them resolve cleanly.
2. **Entity graph:** one shared JSON-LD `@graph` per page. It holds `RealEstateAgent` (`#agency`, with PPRA credential, address, geo, hours and `sameAs` to the Instagram, Facebook and TikTok profiles plus blueoceanrealty.co.za), `Person` (`#rohan`, `#benjamin`), `WebSite`, `WebPage` and `BreadcrumbList`. Listing pages add `RealEstateListing` with `about` set to the residence or commercial place and an `Offer`. Listings get a `FAQPage` built only from facts already on the page.
3. **Meta completeness:** absolute og:image (the hero photo of each listing) with width and height, og:type, og:site_name, Twitter cards on all pages, `robots` max-image-preview:large, hreflang `en-ZA` + `x-default`. Titles and descriptions get checked for length and intent.
4. **Ads and analytics layer:** `js/tracking.js`, `config/tracking.json`-style constants inside `js/tracking-config.js`.
   - Google Consent Mode v2 default denied, plus a POPIA cookie banner (accept / reject / manage, nothing pre-ticked).
   - GTM loads only when Ben's ID is filled in. Until then nothing loads, so no errors.
   - dataLayer events: `whatsapp_click`, `phone_click`, `email_click`, `generate_lead` (form submit), `viewing_request`, `listing_view` (with price, suburb and type parameters for Ads remarketing).
   - gclid / gbraid / wbraid and UTM capture kept first-party for 90 days, added as hidden fields to the existing FormSubmit forms. FormSubmit routing itself is not touched.
   - A cookie policy page.
   - `context/docs/ads-handover-ben.md`: the IDs to paste, the events to set as conversions, GTM trigger recipes, and the final URL list.
5. **Listing pages as Ads landers:** a sticky mobile enquiry bar (WhatsApp + call, 48px targets) only where it is missing, a preloaded hero image with `fetchpriority=high`, and E.164 `tel:` links.
6. **Performance:** use ffmpeg to generate a WebP for every JPG/PNG (quality 80, long edge capped at 2000px, original kept as fallback), served via `<picture>`. Long-cache headers for assets. Videos get `preload="none"` + poster.
7. **Infrastructure:** `_headers` (CSP allowing GTM, Google Ads, FormSubmit and Google Fonts; HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors), `_redirects` (www to apex, `.html` to clean, `/index` to `/`), and a matching `.htaccess` for cPanel parity. Branded `404.html`. `/context`, `AGENTS.md` and `scripts/` blocked from serving.
8. **GEO:** llms.txt rewritten on the new domain with factual, per-listing passages (price, size, suburb, beds) and no guarantee claims. robots.txt adds Google-Extended, Applebot-Extended and Claude-SearchBot. A question-led `<h2>` FAQ block on the hubs, built from facts that already exist.
9. **Copy fixes:** remove "Elevated" and "sanctuaries", and reword the repatriation "guarantee" to say it is subject to SARB exchange-control rules.

Out of scope: visual redesign, form backend change (FormSubmit kept, as instructed), new landing pages, the WordPress site on blueoceanrealty.co.za, and creating Ads/GA4/GTM accounts.

## 4. Inputs
- Have: all copy, photos, NAP, socials, PPRA standing.
- Missing (non-blocking): GTM ID, GA4 ID and Ads conversion ID/labels from Ben (the slots ship empty). Google Business Profile URL / Maps CID (add to `sameAs` when supplied). Search Console verification on the new domain (DNS TXT via Cloudflare). FFC numbers.

## 5. Build plan
- Stack: unchanged static HTML, plus Node build scripts in `scripts/` that do the domain rewrite, inject the graph and wrap images. They are idempotent and can be re-run when listings are added.
- Skills: `web-architect` (verify gate), `seo-technical`, `seo-schema`, `geo-architect`, `humanizer` for the copy fixes.

## 6. Compliance and security
- PPRA: candidate status and the principal's name stay in the schema and footer. No invented reviews, ratings or `aggregateRating`.
- POPIA: no analytics or ad cookies before consent. Cookie policy page. The privacy policy gets an analytics and advertising paragraph labelled "Draft for legal review".
- CPA/ARB: guarantee wording removed.
- Security: CSP allowlist, no inline handlers added, no secrets (GTM/AW IDs are public identifiers).

## 7. Assumptions
- Apex `blueoceanluxury.co.za` is canonical, and www redirects to it.
- Cloudflare Pages is the host. `.htaccess` ships for parity only.
- Office hours in the schema stay Mon-Fri 08:00-17:00, Sat 09:00-13:00 if not already stated (checked against the existing footer first, otherwise omitted).
- WebP conversion is lossless enough at q80 for luxury photography. Originals are kept.

## 8. Questions
None blocking. The domain, form backend and Ads targets were answered on 2026-11-20.
