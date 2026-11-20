# Google Ads handover: blueoceanluxury.co.za

Prepared 2026-11-20. The site is built so tracking goes live by pasting IDs into one file. Nothing loads, and no cookie banner shows, until an ID is set.

## 1. Paste the IDs

File: `js/consent.js`, the `CONFIG` block at the top.

| Field | What to paste | When |
| --- | --- | --- |
| `gtmId` | `GTM-XXXXXXX` | Recommended. You manage GA4 and Ads tags inside GTM. |
| `ga4Id` | `G-XXXXXXXXXX` | Only if not using GTM. |
| `adsId` | `AW-XXXXXXXXX` | Only if not using GTM. |
| `adsLabels.lead / whatsapp / phone` | conversion labels | Only if not using GTM. |

Consent is POPIA "basic" mode: Google tags load only after the visitor accepts analytics or advertising. Consent Mode v2 defaults (all denied) and updates are sent either way, and `url_passthrough` plus `ads_data_redaction` are on. Switching to "advanced" mode (tags load before consent and send cookieless pings) is a legal call for Blue Ocean, not a technical one.

## 2. Events in the dataLayer

| Event | Fires when | Useful parameters |
| --- | --- | --- |
| `generate_lead` | An enquiry form is actually delivered (not just clicked) | `form_type`, `property_name`, `listing_id`, `listing_name`, `delivery` |
| `whatsapp_click` | Any wa.me link | `click_location` (`mobile_enquiry_bar`, `header`, `body`, `footer`), `listing_id` |
| `phone_click` | Any tel: link | same as above |
| `email_click` | Any mailto: link | same as above |
| `view_item` | A listing page loads | GA4 ecommerce `items[]`: `item_id` (URL slug), `item_category` residential/commercial, `item_category2` sale/lease, `price` |
| `consent_update` | The visitor makes a cookie choice | `consent_analytics`, `consent_ads` |

Suggested Ads conversions: `generate_lead` (primary), `whatsapp_click` and `phone_click` (primary or secondary, your call). GTM recipe: Custom Event trigger on each event name, then a Google Ads Conversion tag with the label. `view_item` with `item_id` supports dynamic remarketing (Real estate vertical: `listing_id` = `item_id`).

## 3. Offline conversions

When a visitor arrives with `gclid`, `gbraid`, `wbraid` or `utm_*`, those values are added as hidden fields to every enquiry form. They arrive in the FormSubmit lead email along with `landing_page`. To upload them as offline conversions ("viewing held", "OTP signed"), pair the gclid with the real outcome.

## 4. Final URLs (clean, no .html)

Residential:
- https://blueoceanluxury.co.za/5-nightjar-close (R28,000,000)
- https://blueoceanluxury.co.za/40-idwala-circle (R25,000,000)
- https://blueoceanluxury.co.za/55-hawaan-drive (R19,995,000)
- https://blueoceanluxury.co.za/12-sera-bella (R9,575,000)
- https://blueoceanluxury.co.za/6-sera-bella (R8,995,000)

Commercial:
- https://blueoceanluxury.co.za/21-richefond
- https://blueoceanluxury.co.za/glass-house-building-1
- https://blueoceanluxury.co.za/glass-house-building-2
- https://blueoceanluxury.co.za/glass-house-building-5
- https://blueoceanluxury.co.za/the-glades-office-park
- https://blueoceanluxury.co.za/7-the-boulevard
- https://blueoceanluxury.co.za/dunlop-house
- https://blueoceanluxury.co.za/580-riverside-road
- https://blueoceanluxury.co.za/northfield-business-park
- https://blueoceanluxury.co.za/the-avenues-centre
- https://blueoceanluxury.co.za/urban-corner

Hubs: `/residential`, `/commercial`, `/contact`.

Every listing page has a sticky WhatsApp + Call bar on mobile, a five-question FAQ that matches its structured data, and a 1200x630 share image at `/assets/og/<slug>.jpg`. Tracking template suggestion: `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}` (auto-tagging gclid stays on).

## 5. Go-live checklist (owner)

1. Cloudflare Pages: connect the repo, build command none, output directory `/`. `_headers` and `_redirects` are picked up automatically.
2. Custom domain `blueoceanluxury.co.za`, plus a Cloudflare Redirect Rule for `www.blueoceanluxury.co.za/*` to `https://blueoceanluxury.co.za/$1` (301). Pages `_redirects` cannot do domain redirects.
3. Google Search Console: add the domain property (DNS TXT in Cloudflare), submit `https://blueoceanluxury.co.za/sitemap.xml`. Do the same in Bing Webmaster Tools.
4. Google Business Profile: once it exists, add its URL to `SITE.sameAs` in `scripts/seo/site.config.mjs` and run `node scripts/seo/build.mjs`.
5. FormSubmit: send a test enquiry from the live domain. FormSubmit asks for a one-time activation per new domain.
6. Paste the IDs (section 1), deploy, and check in GTM Preview / Tag Assistant that `generate_lead` fires on a test enquiry.

## 6. Maintenance

- Listing facts, titles, descriptions, schema, FAQ, sitemap, robots.txt and llms.txt all come from `scripts/seo/site.config.mjs`. Edit there, then run `node scripts/seo/build.mjs`.
- New photos: run `node scripts/optimize-images.mjs` (needs ffmpeg) to build WebP and share images.
- Commercial page styles: `css/tailwind-commercial.css` is compiled Tailwind 3.4.17. After changing Tailwind classes on a commercial page, rebuild: `npx tailwindcss@3.4.17 -i <input with @tailwind base/components/utilities> -o css/tailwind-commercial.css --content "<commercial pages>,js/main.js" --minify`.
