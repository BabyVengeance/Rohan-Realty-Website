# SEO and GEO audit: blueoceanluxury.co.za

Date: 2026-11-23. Scope: live domain (headers, crawl rules, status codes, redirects) and all 26 HTML pages in the repo.

## Score summary
| Area | Score | Verdict |
| --- | --- | --- |
| Technical / crawlability | 92 | Strong |
| Security headers | 90 | Strong |
| On-page SEO | 78 | Title lengths and thin hub pages |
| Structured data | 85 | Rich, but missing GBP/Maps link and FAQ on key pages |
| GEO / AI citability | 74 | Crawlers open, content not answer-shaped enough |
| Local SEO / entity | 55 | No Google Business Profile in the entity graph |
| Measurement | 20 | No Search Console, Bing, analytics or tag IDs live |

## What passes (live)
- HTTPS + HSTS (1 year, includeSubDomains), full CSP, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors.
- www -> apex 301; `/page.html` -> clean URL; real 404 with `noindex`.
- TTFB 50-360 ms from Durban edge; Cloudflare cache HIT.
- robots.txt explicitly allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot-Extended and others; blocks /api, /scripts, /context.
- sitemap.xml (25 URLs) and llms.txt both return 200.
- Every page: one H1, canonical, OG image, robots max-image-preview:large, zero images missing alt or dimensions.
- JSON-LD @graph on all pages: RealEstateAgent, Person (PPRA credential), BreadcrumbList; listings carry RealEstateListing + Offer + QuantitativeValue.
- apex_check: 0 errors.

## Findings and fixes (priority order)

### P1 - Search Console and Bing not verified
Impact: Google has no submitted sitemap, no index coverage data, no query data. Nothing else here can be measured.
Fix: add a DNS TXT record in Cloudflare for Google Search Console (Domain property) and import into Bing Webmaster Tools; submit `/sitemap.xml` in both. 10 minutes.

### P1 - No Google Business Profile in the entity graph
Impact: local pack and Maps rankings, and AI assistants cannot tie the site to a verified place. `sameAs` lists blueoceanrealty.co.za, Instagram, Facebook, TikTok only.
Fix: get the GBP share link and Maps CID from Ben; add both to `sameAs` and `hasMap` in `scripts/seo/site.config.mjs`, then `node scripts/seo/build.mjs`. Add the PPRA register entry URL to `sameAs` too.

### P1 - Measurement layer inactive
GTM/GA4/Ads IDs not set in `js/consent.js`; Cloudflare Web Analytics off. Fix: turn on CF Web Analytics today (CSP already allows it); paste IDs when Ben supplies them.

### P2 - Titles over 60 characters (truncate in SERPs)
index (65), commercial (66), residential (67), statutory-disclosure (60). Fix in `site.config.mjs`, e.g.:
- index: "Luxury Homes and Commercial Property, KZN | Blue Ocean" (54)
- residential: "Luxury Estate Homes for Sale in KZN | Blue Ocean Realty" (55)
- commercial: "Offices and Industrial to Let in Durban | Blue Ocean Realty" (59)
cookie-policy title (33) is fine.

### P2 - Thin hub and trust pages
about (594 words), contact (552). The About page is the main E-E-A-T page for a regulated practitioner.
Fix: About to 900+ words with real facts only: PPRA registration and FFC status, principal (Benjamin Govindraj), areas served by suburb, years trading, how a viewing and an OTP work. No invented stats.

### P2 - Answer-shaped content (GEO)
Only index carries FAQPage. Only 8 of 26 pages have a question-led H2. AI Overviews, ChatGPT and Perplexity cite passages that answer a question in the first 40-60 words.
Fix:
- residential and commercial: add 4-6 question H2s with direct answers ("What does a luxury home in Zimbali cost?", "What are office rental rates in Umhlanga Ridge per m2?") using only figures already on the listing pages, plus FAQPage schema from the registry.
- Each listing: one 50-word summary paragraph directly under the H1 stating type, suburb, size, price, availability. This is the passage AI engines quote.
- Add `dateModified` to WebPage nodes so freshness is visible; refresh llms.txt with one-line summaries per listing (price, size, suburb).

### P2 - Suburb / area landing pages missing
No pages target "Umhlanga property for sale", "Zimbali estate homes", "Ballito luxury homes", "Durban office space to let". Competitors rank with area pages.
Fix: 3-5 area pages (Umhlanga, Zimbali/Ballito, Durban CBD/Congella, Hillcrest/Westville as listings justify), each linking to its listings, with Place schema and local facts (schools, distance to King Shaka airport). Add to the sitemap via the registry.

### P3 - Google Fonts loaded from googleapis on all 26 pages
Extra DNS + TLS hop before text renders; also a POPIA/GDPR data transfer to Google before consent. No `preload` on any page.
Fix: self-host the WOFF2 files under `assets/fonts/`, `font-display: swap`, preload the one display face, drop fonts.googleapis.com from the CSP.

### P3 - Default AI fonts on several listings
apex_check warns: Inter on commercial listings, Playfair Display on 55 Hawaan Drive (28 instances). Fix: move those pages to the portal's brand faces for consistency.

### P3 - Housekeeping
- `worker/index.js:102` console.log: checked, logs no personal data; kept (see second pass).
- `/about.html` -> `/about` is a 307; make it 301 in `_redirects` (`/about.html /about 301`) so link equity consolidates.
- Glass House Building 2 still says "Available 1 June 2024" - stale availability hurts trust and `Offer.availabilityStarts`.
- Optional: 301 rohanrealty.co.za to this domain (the social handles still use that name).

## Done in this session
- Footer credit "Engineered by Apex Digital SA" linking to https://apexdigitalsa.com on all 26 pages (`rel="noopener"`, new tab, 48px tap target, inherits footer colour). Verified at 375 px on 6 page templates.

## 30-day plan
1. Week 1: Search Console + Bing + sitemap; CF Web Analytics; GBP and CID into sameAs.
2. Week 2: titles, About rewrite, listing summary paragraphs, FAQ blocks on hubs.
3. Weeks 3-4: area landing pages; self-hosted fonts; re-run this audit and compare GSC impressions.

## Applied 2026-11-23 (second pass)
- Titles: index, residential, commercial and statutory disclosure now 50-56 characters (`site.config.mjs`).
- Hub FAQs: visible question-led sections on /residential (4) and /commercial (5), every figure taken from the listing registry; `build.mjs` mirrors them into FAQPage schema.
- `dateModified` on every WebPage node, from the page's last git change (uncommitted = today), so a rebuild alone never fakes freshness.
- `_redirects`: explicit 301 for every old `.html` URL.
- Fonts self-hosted: `scripts/fonts.mjs` copies OFL variable WOFF2 (latin) from @fontsource-variable into `assets/fonts/`, writes `fonts.css`, preloads Outfit; Google Fonts removed from all pages and from the CSP in `_headers` and `.htaccess`.
- Correction: the `console.log` in `worker/index.js:102` logs only form id, submission id and timing (no personal data). It is intentional operational logging and stays.

## Still open (needs Rohan or Ben)
- Search Console + Bing verification and sitemap submission; Cloudflare Web Analytics; GTM/GA4/Ads IDs.
- Google Business Profile link and Maps CID for `sameAs`.
- About page expansion (needs real facts: years trading, deal history, FFC status).
- Suburb landing pages (needs local facts confirmed).
- Glass House Building 2 availability date.
- Inter and Playfair Display remain on some listing templates (design decision, now self-hosted).
