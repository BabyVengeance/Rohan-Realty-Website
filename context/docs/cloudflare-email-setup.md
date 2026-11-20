# Go-live guide: from the Pages demo to blueoceanluxury.co.za

Written 2026-11-20 for a first-time setup. Follow the parts in order. Nothing here deletes your current demo until Part 8, which is optional.

## What is changing (in one minute)
- Today: `rohan-realty-website.pages.dev` is a Cloudflare **Pages** project showing an older copy of the site. Pages cannot send email, so it stays as a demo only.
- New: a Cloudflare **Worker** named `blue-ocean-luxury` serves the same website on `blueoceanluxury.co.za` and runs the form router that emails leads. It deploys automatically from your GitHub repository every time `main` changes.
- Do not delete the Pages project now. It keeps working during the switch, and its forms still deliver through FormSubmit.

## Part 1. Put the new code on GitHub (main)
The new work is on the local branch `seo-geo-ads-readiness`. Cloudflare can only build what is on GitHub.
1. Merge the branch into `main` and push to GitHub (Claude can do this for you on request).
2. If your Pages project is connected to GitHub (check in Part 2), this push also redeploys the demo with the new design. That is fine: on Pages, forms fall back to FormSubmit automatically.

## Part 2. Check how the Pages demo is deployed (2 minutes, no changes)
1. Go to dash.cloudflare.com and log in.
2. Left menu: **Workers & Pages** (under Compute). Click **rohan-realty-website**.
3. Open the **Deployments** tab. If deployments show a branch name and commit (for example `main 635ad00`), the project is connected to GitHub and updates on every push. If they say "Direct upload", it only changes when someone uploads manually.
4. Note what you see. Nothing to change here.

## Part 3. Turn on Email Routing and verify both inboxes
The Worker can only email inboxes that Cloudflare has verified.
1. Dashboard home > click the domain **blueoceanluxury.co.za**.
2. Left menu: **Email** > **Email Routing** (the newer layout files it under Compute > Email Service > Email Routing).
3. If you see **Enable Email Routing** / **Get started**, click it and accept the DNS records it offers (MX, SPF and DKIM). If it already shows Enabled, skip this step.
4. Open **Destination addresses** > **Add destination address** > type Rohan's Gmail > Save.
5. Repeat for Benjamin's Gmail.
6. Each of you opens the email "Verify your email address" from Cloudflare and clicks the link. Check spam if it is not there within 5 minutes.
7. Back on Destination addresses, both rows must say **Verified**. Do not continue until they do.

## Part 4. Create the Worker from GitHub
1. Left menu: **Workers & Pages** > **Create** (or Create application).
2. Choose the **Workers** tab > **Import a repository** (Continue with GitHub).
3. If asked, install or authorise the Cloudflare GitHub app and give it access to `BabyVengeance/Rohan-Realty-Website`.
4. Select the repository **Rohan-Realty-Website**.
5. Fill in the settings exactly:
   - **Project name:** `blue-ocean-luxury` (it must match the `name` in `wrangler.jsonc`, or the build fails)
   - **Production branch:** `main`
   - **Build command:** leave empty
   - **Deploy command:** `npx wrangler deploy`
   - **Non-production branch deploy command:** `npx wrangler versions upload` (default)
   - **Path / root directory:** leave as `/`
6. Click **Create and deploy**. Wait for the build log to finish with a success message (1 to 3 minutes).
7. This first deploy also attaches `blueoceanluxury.co.za` to the Worker and creates its DNS record automatically, and gives a test address like `blue-ocean-luxury.<your-subdomain>.workers.dev`.
8. If the build fails with a message about the email sender domain, do this, then click **Retry deployment**:
   - Left menu: Compute > **Email Service** > **Sending** (or Domains) > add `blueoceanluxury.co.za` and accept the DNS records it suggests.

## Part 5. Add the inbox secrets
The code never contains the email addresses. You enter them once here.
1. Workers & Pages > **blue-ocean-luxury** > **Settings** > **Variables and Secrets** > **Add**.
2. Type: **Secret**. Variable name: `LEAD_INBOX_ROHAN`. Value: Rohan's verified Gmail. Click **Deploy** (or Save and deploy).
3. Add another: Type **Secret**, name `LEAD_INBOX_BEN`, value Benjamin's verified Gmail. Deploy.
4. Leave `MAIL_FROM` and `MAIL_FROM_NAME` alone; they come from the code.
- Names must be typed exactly, in capitals, with underscores. A typo means the Worker cannot find the inbox and every lead goes through FormSubmit instead.

## Part 6. www, rate limit and logs
1. **www to main domain**
   - Domain blueoceanluxury.co.za > **DNS** > **Records** > **Add record**: Type `AAAA`, Name `www`, IPv6 address `100::`, Proxy status **Proxied** (orange cloud) > Save.
   - Domain > **Rules** > **Redirect Rules** (or Rules > Overview > Create rule) > use the template **Redirect from WWW to root** > Deploy. If there is no template: when the hostname equals `www.blueoceanluxury.co.za`, a dynamic redirect to `concat("https://blueoceanluxury.co.za", http.request.uri.path)`, status 301, preserve query string.
2. **Rate limit the form endpoint** (stops floods of spam)
   - Domain > **Security** > **WAF** > **Rate limiting rules** > **Create rule**.
   - Name `Form flood guard`. If incoming requests match: URI Path equals `/api/contact` AND Request Method equals `POST`.
   - Rate: 5 requests per 1 minute, counted per IP. Action: **Block** for 10 minutes. Deploy.
3. **Logs:** Workers & Pages > blue-ocean-luxury > **Logs** (observability is already on). Every lead shows as `lead_sent`; a failed send shows `lead_send_failed` with an error code, and that lead will have gone through FormSubmit.

## Part 7. Test everything (before Ben starts ads)
1. Open `https://blueoceanluxury.co.za` in an incognito window. Check the home page, a residential listing and a commercial listing load with photos.
2. Send one enquiry from each: the home page form, the contact page, one residential listing, one commercial listing. Use your own details and say "TEST" in the message.
3. Each test arrives **once** in **both** Gmail inboxes, from "Blue Ocean Realty website", with the property in the subject. Press Reply: the To field must be the address you typed in the form.
4. Check Logs show four `lead_sent` entries.
5. **Activate the FormSubmit backup** (one time). On the old demo `https://rohan-realty-website.pages.dev` (after the Part 1 push), send one enquiry. Pages cannot run the Worker, so this goes through FormSubmit. FormSubmit emails Rohan an activation link: click it. Send one more test and confirm it arrives.
6. Optional: FormSubmit's emails offer a random-string alias for your address. Ask Claude to put that alias into `js/main.js` so the Gmail address disappears from the site's code.

## Part 8. Afterwards (optional)
- After the new site has run cleanly for about a week, you can delete the demo: Workers & Pages > rohan-realty-website > Settings > Delete project. Deleting it does not affect the Worker or the domain. Keeping it is also harmless: its pages point Google to blueoceanluxury.co.za as the original.
- Next: Search Console and Bing for the new domain (submit `https://blueoceanluxury.co.za/sitemap.xml`), then Ben pastes his IDs into `js/consent.js` (see `ads-handover-ben.md`).

## If something goes wrong
| Symptom | Cause | Fix |
| --- | --- | --- |
| Build fails: name mismatch | Project name is not `blue-ocean-luxury` | Rename in settings or redo Part 4 with the exact name |
| Build fails: sender domain | Domain not onboarded for sending | Part 4 step 8 |
| Leads arrive but from FormSubmit, not "Blue Ocean Realty website" | Secret missing or misspelled, or an inbox not verified | Check Part 3 step 7 and Part 5; read Logs for the error code |
| `blueoceanluxury.co.za` shows an error page | DNS record still being created | Wait 5 to 10 minutes; check Worker > Settings > Domains & Routes lists the domain |
| www does not redirect | AAAA record missing or not proxied | Part 6 step 1 |

## Changing who gets which leads
`worker/index.js`, the `ROUTES` table: each form family (`general`, `residential`, `commercial`) lists inbox keys. A key `X` reads the secret `LEAD_INBOX_X`. Change it, push to main, and Cloudflare redeploys. New inboxes must be verified in Part 3 and added as a secret in Part 5.

## Local development
`npm run dev` runs the site and Worker at http://127.0.0.1:8787. Email is simulated, not sent. Test inboxes come from `.dev.vars` (gitignored).
