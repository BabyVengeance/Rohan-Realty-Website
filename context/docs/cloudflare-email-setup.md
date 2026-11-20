# Cloudflare setup: hosting and enquiry email routing

How enquiries flow: every form posts to `/api/contact`, a Cloudflare Worker (`worker/index.js`) that emails Rohan and Benjamin from `forms@blueoceanluxury.co.za`, with Reply-To set to the client. If that fails or takes more than 8 seconds, `js/main.js` sends the same lead through FormSubmit. If FormSubmit also fails, the browser posts it to FormSubmit directly.

Do these steps once, in order. Steps 1 to 3 are in the Cloudflare dashboard.

## 1. Email Routing (inboxes the Worker may send to)
1. Cloudflare dashboard > `blueoceanluxury.co.za` > Email > Email Routing. If it is not enabled, click Enable and let it add the MX, SPF and DKIM records. (The domain already uses Cloudflare mail servers, so this is probably done.)
2. Email Routing > Destination addresses > Add: Rohan's Gmail. Add again: Benjamin's Gmail.
3. Each of you opens the verification email from Cloudflare and clicks the link. The status must show Verified. An unverified inbox makes every send fail, and leads then arrive through FormSubmit only.

## 2. Deploy the Worker
Run in the project folder on your PC:
```powershell
npm install
```
```powershell
npx wrangler login
```
```powershell
npx wrangler secret put LEAD_INBOX_ROHAN
```
Paste Rohan's verified Gmail when asked.
```powershell
npx wrangler secret put LEAD_INBOX_BEN
```
Paste Benjamin's verified Gmail when asked.
```powershell
npx wrangler deploy
```
- `wrangler.jsonc` attaches the custom domain `blueoceanluxury.co.za` to the Worker. If the domain is still attached to an old Pages project, remove it there first (Pages project > Custom domains).
- If the deploy reports that the sender domain must be onboarded, open Compute > Email Service, add `blueoceanluxury.co.za` as a sending domain, follow its DNS prompts, then deploy again.

## 3. Dashboard rules
1. **www redirect:** Rules > Redirect Rules > Create: when the hostname equals `www.blueoceanluxury.co.za`, redirect dynamically to `concat("https://blueoceanluxury.co.za", http.request.uri.path)`, status 301, preserve the query string. Add a proxied DNS record for `www` (for example an AAAA record to `100::`) so the rule can fire.
2. **Rate limit the form:** Security > WAF > Rate limiting rules > Create: URI path equals `/api/contact` and method POST, 5 requests per 1 minute per IP, action Block for 10 minutes. The Free plan includes one rule.
3. **Logs:** Workers & Pages > blue-ocean-luxury > Logs. Observability is already on in the config. Search for `lead_send_failed` to see any primary failures; no client details are logged.

## 4. FormSubmit backup
1. After deploying, send one test enquiry with the primary route broken: temporarily delete the `LEAD_INBOX_ROHAN` secret, or test before Email Routing is verified. FormSubmit emails Rohan an activation link the first time; click it.
2. Optional but recommended: FormSubmit's activation email offers a random-string alias for the address. Replace the value of `PRIMARY_ROUTING` in `js/main.js` with that alias, so the Gmail address no longer appears in the site's JavaScript.
3. Restore the secret if you removed it (step 2 command), then redeploy.

## 5. Test before Ads go live
- Send one enquiry from each form type: home, contact, a residential listing and a commercial listing. Each arrives once, in both inboxes, from "Blue Ocean Realty website". The subject names the property, and Reply goes to the client.
- Commercial enquiries now arrive once. They previously arrived twice because of a duplicate submit handler, fixed on 2026-11-20.
- Check Workers Logs shows `lead_sent` for each.

## Changing who gets which leads
`worker/index.js`, the `ROUTES` table: each form family (`general`, `residential`, `commercial`) lists inbox keys. A key `X` reads the secret `LEAD_INBOX_X`. To send commercial leads to Benjamin only, set `commercial` to `['BEN']` and deploy. New inboxes must be verified in Email Routing first.

## Local development
`npm run dev` runs the site and Worker at http://127.0.0.1:8787. Email is simulated: messages are logged in the terminal, not sent. Test inboxes come from `.dev.vars` (gitignored).
