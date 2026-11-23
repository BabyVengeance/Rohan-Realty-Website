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

## Live (2026-11-20)
- blueoceanluxury.co.za is served by the Cloudflare Worker `blue-ocean-luxury` (custom domain attached, workers.dev on), auto-deployed from GitHub `main` (Workers Builds). The old Pages project `rohan-realty-website` is a demo only; never attach the domain to it.
- Forms: `/api/contact` accepts instantly and emails in the background (Cloudflare send takes about 10 s); on failure the Worker forwards to FormSubmit. Verified live by Rohan. Inbox: `LEAD_INBOX_ROHAN` only (dashboard variable, kept across deploys by `keep_vars`). Ben not added by choice; the FormSubmit backup CC is empty.
- FormSubmit activated for blueoceanluxury.co.za. www redirects to apex with the query string kept. A rate-limit rule is on `/api/contact`.

- 2026-11-23: SEO/GEO audit applied and live (see context/docs/2026-11-23-seo-geo-audit.md). About page rewritten from Rohan's answers; Ben reduced to legal mentions; Glass House Building 2 removed.

## Next steps (ordered)
1. Turn on Cloudflare Web Analytics for blueoceanluxury.co.za (the CSP already allows it).
2. Search Console and Bing: verify the domain and submit the sitemap.
3. Ben pastes the GTM / GA4 / Ads IDs into `js/consent.js`, then verify in Tag Assistant.
4. Optional: swap FormSubmit's Gmail target for its hashed alias; add `LEAD_INBOX_BEN` when Ben agrees.

## Blockers / waiting on client
- GTM, GA4 and Google Ads IDs (Ben).
- Google Business Profile URL / Maps CID for `sameAs`.
- FFC numbers: "In process / available on request".
- Drone shot for the index.html hero (Umhlanga/Zimbali).

## Decisions that must not be re-litigated
- 2026-11-23 — Ben (Benjamin Govindraj) is named only where legally required: statutory footer line, statutory disclosure, privacy and terms pages. No phone, schema node, contact blocks or autoresponder mentions. Paid ads work waits until Ben starts it.
- 2026-11-23 — Glass House Building 2 removed; /glass-house-building-2 301s to /commercial. rohanrealty.co.za already redirects here.
- 2026-11-23 — Commercial listings must match the partner feed (screenshots from Rohan). Kept: Glass House B1, B5, The Glades, 7 The Boulevard, Dunlop House, The Avenues Centre, Urban Corner. Removed and 301ed to /commercial: 21 Richefond, 580 Riverside Road, Northfield. Urban Corner restored as it was (Rohan, 2026-11-23). Added 2026-11-23: The Shed, Stadium Building and fifth floor at Lion Match; 13 and 30A The Boulevard. Also added: Glass House Building 3 and Glass House Main Building (upper ground). Glass House Building 1 removed (not a partner listing); 7 The Boulevard updated to 214.92 m² at R155. Glass House address is 309 Umhlanga Rocks Drive. Originals in context/raw/partner-listings-2026-11-23/
- 2026-11-23 — Site goal: win seller and landlord mandates (sole or open) as much as buyers. About page leads with that.
- 2026-11 — Site is the official showcase of Blue Ocean Realty (Pty) Ltd; Rohan Ramlall appears as Candidate Property Practitioner under Benjamin Govindraj (PPA 22 of 2019, Reg. 34).
- 2026-11 — Public display email is info@blueoceanluxury.co.za; enquiry routing stays on FormSubmit.
- 2026-11 — Agency scope covers luxury residential estates and commercial property across KZN (no coastal-only wording).
- 2026-11-20 — Canonical domain blueoceanluxury.co.za. blueoceanrealty.co.za is the agency's separate WordPress site; it is linked via sameAs, not replaced.
- 2026-11-20 — Consent is basic mode (no Google tags before consent) unless Blue Ocean takes legal advice otherwise.
