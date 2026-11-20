# Active session — Blue Ocean Realty (Pty) Ltd

Max 60 lines, current state only. History: `context/docs/session-log.md`.

## Current state
- Canonical domain is now `https://blueoceanluxury.co.za` (clean URLs, no .html), hosted on Cloudflare Pages. All canonicals, schema, sitemap, robots and llms.txt use it.
- SEO, schema and sitemaps are generated: `scripts/seo/site.config.mjs` holds every page's title, description and listing facts; `node scripts/seo/build.mjs` rebuilds heads, JSON-LD @graph, sitemap.xml, robots.txt and llms.txt. Generic listing FAQ accordions have been removed site-wide. Never hand-edit the `seo:start` blocks.
- Listing facts in the registry mirror each page's hero stat cards (checked 2026-11-20). Old commercial titles and schema were stale and have been corrected.
- Tracking layer ready, inactive until IDs are pasted in `js/consent.js`: Consent Mode v2 (basic), POPIA cookie banner (hidden until an ID exists), dataLayer events, gclid/UTM capture into enquiry forms. `js/main.js` fires `bor:lead` on delivered enquiries.
- Images: 299 WebP files (110 MB down to 37 MB) via `scripts/optimize-images.mjs`; 26 share images in `assets/og/`.
- Commercial pages use compiled `css/tailwind-commercial.css` instead of the Tailwind Play CDN.
- `_headers`, `_redirects`, `.htaccess`, `404.html` and `cookie-policy.html` were added. Privacy policy section 8 (analytics/ads) is a draft for legal review.
- Ads handover: `context/docs/ads-handover-ben.md`.
- Gates: `verify_architecture.js` and `apex_check` pass across all pages with 0 errors. All 20 portal pages and 40 Idwala Circle 100% healthy.

## In progress
- Form email routing built 2026-11-20 and tested locally (wrangler dev, simulated email). Hosting is now a Cloudflare Worker with static assets (`wrangler.jsonc`, `worker/index.js`). All 18 forms post to `/api/contact` with a `form_id`; the Worker emails the Rohan and Ben secrets; `js/main.js` falls back to FormSubmit. Not yet deployed: owner steps in `context/docs/cloudflare-email-setup.md`.
- Fixed: commercial enquiries were sent twice (duplicate submit handler); nested form tags on 6-sera-bella.
- 40 Idwala Circle finalised 2026-11-20: form handled by js/main.js (FormSubmit, gclid/UTM stamped, POPIA gate), no banned words, all 26 pages render clean at 320/375/1440. Committed on branch `seo-geo-ads-readiness`.

## Next steps (ordered)
1. Merge `seo-geo-ads-readiness` into main and push.
2. Deploy to Cloudflare Pages, add the www-to-apex redirect rule and test a live enquiry (FormSubmit domain activation).
3. Search Console and Bing: verify the domain and submit the sitemap.
4. Ben pastes the GTM / GA4 / Ads IDs, then verify in Tag Assistant.

## Blockers / waiting on client
- GTM, GA4 and Google Ads IDs (Ben).
- Google Business Profile URL / Maps CID for `sameAs`.
- FFC numbers: "In process / available on request".
- Glass House Building 2 page says "Available 1 June 2024": confirm the current date.
- Drone shot for the index.html hero (Umhlanga/Zimbali).

## Decisions that must not be re-litigated
- 2026-11 — Site is the official showcase of Blue Ocean Realty (Pty) Ltd; Rohan Ramlall appears as Candidate Property Practitioner under Benjamin Govindraj (PPA 22 of 2019, Reg. 34).
- 2026-11 — Public display email is info@blueoceanluxury.co.za; enquiry routing stays on FormSubmit.
- 2026-11 — Agency scope covers luxury residential estates and commercial property across KZN (no coastal-only wording).
- 2026-11-20 — Canonical domain blueoceanluxury.co.za. blueoceanrealty.co.za is the agency's separate WordPress site; it is linked via sameAs, not replaced.
- 2026-11-20 — Consent is basic mode (no Google tags before consent) unless Blue Ocean takes legal advice otherwise.
