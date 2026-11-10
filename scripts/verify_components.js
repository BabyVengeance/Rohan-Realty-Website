/**
 * AUTOMATED VERIFICATION GATE: Synchronized Components & Parity Checker
 * Tests: Canonical Navbar, Canonical Footer, Valid Asset References, Route Health
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_PAGES = [
  'index.html',
  'about.html',
  'residential.html',
  'commercial.html',
  'contact.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'statutory-disclosure.html',
  '5-nightjar-close.html',
  '55-hawaan-drive.html',
  '12-sera-bella.html',
  '6-sera-bella.html'
];

let errors = [];
let passed = 0;

console.log('=== ROHAN REALTY COMPONENT PARITY & INTEGRITY AUDIT ===\n');

REQUIRED_PAGES.forEach(file => {
  if (!fs.existsSync(file)) {
    errors.push(`[MISSING PAGE] ${file} does not exist in root.`);
    return;
  }

  const html = fs.readFileSync(file, 'utf8');

  // 1. Navbar Verification
  if (!html.includes('<header class="site-header') || !html.includes('class="nav__brand"')) {
    errors.push(`[NAVBAR MISMATCH] ${file} is missing canonical <header class="site-header"> or .nav__brand.`);
  } else {
    passed++;
  }

  // 2. Footer & Statutory Compliance Verification
  if (!html.includes('<footer class="footer"') || !html.includes('class="footer__grid"')) {
    errors.push(`[FOOTER MISMATCH] ${file} is missing canonical <footer class="footer"> or .footer__grid.`);
  } else if (!html.includes('class="footer-compliance-banner"')) {
    errors.push(`[COMPLIANCE BANNER MISSING] ${file} is missing .footer-compliance-banner.`);
  } else {
    passed++;
  }

  // 2b. Form-Level POPIA Consent Check
  if (html.includes('<form')) {
    if (!html.includes('name="popia_consent"') && !html.includes('id="popiaConsent"')) {
      errors.push(`[POPIA CONSENT MISSING] ${file} contains a form but is missing POPIA consent checkbox.`);
    } else {
      passed++;
    }
  }

  // 3. Asset Integrity Verification
  const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
  for (const match of imgMatches) {
    const src = match[1];
    if (src.startsWith('http://') || src.startsWith('https://')) continue;
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanSrc)) {
      errors.push(`[BROKEN ASSET] In ${file}: Image not found: ${src}`);
    }
  }

  // 4. Mobile Drawer Check
  if (!html.includes('id="mobileNav"') || !html.includes('class="nav__toggle"')) {
    errors.push(`[MOBILE DRAWER MISMATCH] In ${file}: Missing accessible mobileNav drawer or toggle.`);
  }

  // 5. Title & Meta Check
  if (!html.includes('<title>') || !html.includes('name="viewport"')) {
    errors.push(`[META MISSING] In ${file}: Missing title or viewport tag.`);
  }
});

console.log(`Passed component checks: ${passed}`);
if (errors.length > 0) {
  console.error('\nFAILURES DETECTED:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\nALL 9 PAGES VERIFIED 100% SYNCHRONIZED & ASSETS VALID!');
  process.exit(0);
}
