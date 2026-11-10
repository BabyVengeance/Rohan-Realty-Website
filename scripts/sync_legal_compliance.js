const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const ALL_HTML_FILES = [
  'index.html',
  'about.html',
  'residential.html',
  'commercial.html',
  'contact.html',
  '5-nightjar-close.html',
  '55-hawaan-drive.html',
  '12-sera-bella.html',
  '6-sera-bella.html',
  'urban-corner.html',
  'northfield-business-park.html',
  'glass-house-building-5.html',
  '21-richefond.html',
  'the-glades-office-park.html',
  'dunlop-house.html',
  '580-riverside-road.html',
  'the-avenues-centre.html',
  'glass-house-building-2.html',
  'glass-house-building-1.html',
  '7-the-boulevard.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'statutory-disclosure.html'
];

const CANONICAL_FOOTER = `  <!-- ============================================================
       CANONICAL COMPLIANCE FOOTER
       ============================================================ -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <!-- Col 1: Brand & Brokerage -->
        <div class="footer__col-brand">
          <a href="index.html" class="footer__brand-title">
            ROHAN <span>REALTY</span>
          </a>
          <p class="footer__brand-desc">
            Bespoke digital showcases for high-ticket residential, commercial, and industrial real estate across KwaZulu-Natal. Marketed in professional association with Blue Ocean Realty (Pty) Ltd.
          </p>
          <div class="footer__brand-creds">
            <div><strong>Rohan Ramlall</strong> &bull; Candidate Property Practitioner</div>
            <div>Operating under <strong>Blue Ocean Realty (Pty) Ltd</strong></div>
            <div>Registered with the <strong>PPRA</strong> (Property Practitioners Regulatory Authority)</div>
          </div>
        </div>

        <!-- Col 2: Portfolios -->
        <div>
          <h4 class="footer__col-title">Portfolios</h4>
          <ul class="footer__links">
            <li><a href="residential.html">Luxury Residences</a></li>
            <li><a href="commercial.html">Commercial &amp; Industrial</a></li>
            <li><a href="5-nightjar-close.html">5 Nightjar Close (R28M)</a></li>
            <li><a href="55-hawaan-drive.html">55 Hawaan Drive (R19.995M)</a></li>
            <li><a href="12-sera-bella.html">12 Sera Bella (R9.575M)</a></li>
            <li><a href="6-sera-bella.html">6 Sera Bella (R8.995M)</a></li>
          </ul>
        </div>

        <!-- Col 3: Legal & Compliance -->
        <div>
          <h4 class="footer__col-title">Legal &amp; Compliance</h4>
          <ul class="footer__links">
            <li><a href="privacy-policy.html">Privacy Policy (POPIA)</a></li>
            <li><a href="terms-and-conditions.html">Terms of Use &amp; E&amp;OE</a></li>
            <li><a href="statutory-disclosure.html">PPRA Disclosure &amp; Sec 54</a></li>
            <li><a href="statutory-disclosure.html#paia">PAIA Manual Access</a></li>
            <li><a href="about.html">Agency Affiliation</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Socials -->
        <div>
          <h4 class="footer__col-title">Direct Contact</h4>
          <div class="footer__contact-items">
            <div class="footer__contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <div>Direct / WhatsApp: <a href="tel:0695224226" style="color:#FFFFFF; font-weight:700;">069 522 4226</a></div>
                <div style="font-size:0.75rem; color:rgba(255,255,255,0.6);">Rohan Ramlall (Candidate Practitioner)</div>
              </div>
            </div>
            <div class="footer__contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              <div>
                <div>Principal Property Practitioner</div>
                <div style="font-size:0.75rem; color:rgba(255,255,255,0.6);">Benjamin Govindraj: 073 691 0478</div>
              </div>
            </div>
            <div class="footer__contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <div>
                <div>Blue Ocean Realty Office</div>
                <div style="font-size:0.75rem; color:rgba(255,255,255,0.6);">Suite 6, 66 Adelaide Tambo Dr, Durban North</div>
              </div>
            </div>
          </div>

          <div class="footer__socials">
            <a href="https://www.instagram.com/rohanrealty.co.za?rpxt=MWtrcWkybTcxODBlZA==" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="Instagram @rohanrealty.co.za">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.tiktok.com/@rohanrealty.co.za?_r=1&_t=ZS-9B7lsh26nrA" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="TikTok @rohanrealty.co.za">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href="https://www.facebook.com/share/1Gdn6cE84s/" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="Facebook Rohan Realty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Statutory Sub-Footer Compliance Banner -->
      <div class="footer-compliance-banner">
        <p class="compliance-heading">
          BLUE OCEAN REALTY (PTY) LTD &mdash; REGISTERED WITH THE PPRA (PROPERTY PRACTITIONERS REGULATORY AUTHORITY)
        </p>
        <p class="compliance-ffc">
          <strong>Agency FFC Number:</strong> In Process / Available on Request &bull; 
          <strong>Principal Property Practitioner:</strong> Benjamin Govindraj (FFC: In Process / Available on Request) &bull; 
          <strong>Candidate Property Practitioner:</strong> Rohan Ramlall (FFC: In Process / Available on Request)
        </p>
        <p class="compliance-notice">
          <strong>Regulatory Notice (PPA Act 22 of 2019):</strong> &ldquo;Rohan Realty&rdquo; is a domain name and personal marketing portal operated by Rohan Ramlall. It does not operate as an independent estate agency. All property marketing, buyer/seller mandates, Offers to Purchase (OTPs), commercial leases, and commission negotiations are facilitated and concluded strictly through Blue Ocean Realty (Pty) Ltd, an accredited property practitioner firm holding a valid Fidelity Fund Certificate. No trust monies or deposits are received or processed through rohanrealty.co.za; all trust accounts and transaction funds are held and administered exclusively by the appointed conveyancing attorneys or Blue Ocean Realty’s audited Section 54 trust account.
        </p>
        <div class="footer-compliance-links">
          <a href="privacy-policy.html">Privacy Policy (POPIA)</a>
          <a href="terms-and-conditions.html">Terms of Use &amp; E&amp;OE</a>
          <a href="statutory-disclosure.html">PPRA Disclosure &amp; Section 54</a>
          <a href="statutory-disclosure.html#paia">PAIA Manual</a>
        </div>
      </div>

      <div class="footer__divider" style="margin-top: 1.75rem;"></div>

      <div class="footer__bottom">
        <div class="footer__copy">
          <div>&copy; 2026 Rohan Ramlall. Real estate advisory services provided via Blue Ocean Realty (Pty) Ltd. All rights reserved.</div>
          <div>POPIA Compliant Operations &bull; Registered with the PPRA under PPA Act 22 of 2019</div>
        </div>
      </div>
    </div>
  </footer>`;

const POPIA_CONSENT_BLOCK = `            <div class="form__group form__group--consent">
              <label class="form__checkbox-label">
                <input type="checkbox" name="popia_consent" id="popiaConsent" class="form__checkbox" required>
                <span class="form__checkbox-text">
                  I consent to Rohan Ramlall and Blue Ocean Realty (Pty) Ltd processing my contact information to provide property brochures, viewing access, and transaction assistance in accordance with the <a href="privacy-policy.html" target="_blank" class="form__checkbox-link">Privacy Policy</a>.
                </span>
              </label>
            </div>`;

const POPIA_SUBTEXT_BLOCK = `            <p class="form__subtext">
              Your details are protected under POPIA and will never be shared without consent. All transactions are concluded via Blue Ocean Realty (Pty) Ltd (PPRA Registered).
            </p>`;

console.log('=== SYNCHRONIZING LEGAL COMPLIANCE ACROSS ALL PAGES ===\n');

ALL_HTML_FILES.forEach(filename => {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`[SKIP] Missing file: ${filename}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Replace existing footer with CANONICAL_FOOTER
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, CANONICAL_FOOTER);
    modified = true;
  }

  // 2. Remove any pre-existing popiaConsent / popia_consent checkboxes to prevent duplicates
  content = content.replace(/<div class="form__group form__group--consent"[\s\S]*?<\/div>\s*/gi, '');
  content = content.replace(/<div class="form__group form__group--checkbox"[\s\S]*?<\/div>\s*/gi, '');
  content = content.replace(/<p class="form__subtext"[\s\S]*?<\/p>\s*/gi, '');

  // 3. Inject POPIA Consent Checkbox and Subtext into forms
  // Strategy: Find submit button in form: <button type="submit"...> or <input type="submit"...>
  // Insert POPIA_CONSENT_BLOCK right before the submit button
  // Insert POPIA_SUBTEXT_BLOCK right after </button> or submit tag

  // Case A: <button type="submit" ... > ... </button>
  const buttonSubmitRegex = /(<button\b[^>]*type=["']submit["'][^>]*>[\s\S]*?<\/button>)/i;
  if (buttonSubmitRegex.test(content)) {
    content = content.replace(buttonSubmitRegex, (match) => {
      // Return consent block + button + subtext block
      return `${POPIA_CONSENT_BLOCK}\n\n${match}\n\n${POPIA_SUBTEXT_BLOCK}`;
    });
    modified = true;
  }

  // 4. Update any remaining non-compliant candidate labels cleanly (idempotent)
  content = content.replace(/Commercial Mandate Lead &bull; Blue Ocean/gi, 'Candidate Property Practitioner &bull; Blue Ocean Realty (Pty) Ltd');
  content = content.replace(/Candidate Candidate Property Practitioner/gi, 'Candidate Property Practitioner');
  content = content.replace(/\(Pty\) Ltd\s*\(Pty\) Ltd/gi, '(Pty) Ltd');
  content = content.replace(/(?<!Candidate\s+)Property Practitioner &bull; Blue Ocean Realty(?!\s+\(Pty\) Ltd)/gi, 'Candidate Property Practitioner &bull; Blue Ocean Realty (Pty) Ltd');
  content = content.replace(/<div><strong>Rohan Ramlall<\/strong> &bull; Property Practitioner<\/div>/gi, '<div><strong>Rohan Ramlall</strong> &bull; Candidate Property Practitioner</div>');

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SYNCHRONIZED] ${filename}`);
  }
});

console.log('\nAll pages synchronized successfully!');
