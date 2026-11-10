const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const HTML_FILES = [
  'index.html',
  'residential.html',
  'commercial.html',
  'about.html',
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

let totalIssues = 0;

console.log('=== VERIFYING ALL 20 PAGES IN PORTAL ===\n');

for (const file of HTML_FILES) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING HTML FILE: ${file}`);
    totalIssues++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Check for lingering pictures/ paths
  const lingeringPictures = content.match(/pictures\/[^\s"'>]+/gi);
  if (lingeringPictures) {
    console.error(`[${file}] Lingering 'pictures/' paths detected:`, lingeringPictures);
    totalIssues++;
  }

  // Check all src attributes
  const srcMatches = [...content.matchAll(/src="([^"#?]+)(?:\?[^"]*)?"/gi)];
  for (const m of srcMatches) {
    const src = m[1];
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src === '') continue;
    const resolved = path.join(ROOT, src.replace(/%20/g, ' '));
    if (!fs.existsSync(resolved)) {
      console.error(`[${file}] Broken local src: "${src}" -> resolved to "${resolved}"`);
      totalIssues++;
    }
  }

  // Check local href attributes for stylesheets
  const linkMatches = [...content.matchAll(/<link[^>]+href="([^"#?]+)(?:\?[^"]*)?"/gi)];
  for (const m of linkMatches) {
    const href = m[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('data:') || href === '') continue;
    const resolved = path.join(ROOT, href.replace(/%20/g, ' '));
    if (!fs.existsSync(resolved)) {
      console.error(`[${file}] Broken local link href: "${href}" -> resolved to "${resolved}"`);
      totalIssues++;
    }
  }
}

// Verify JS files for 5 Nightjar and 55 Hawaan
const jsFiles = [
  'js/5-nightjar-close.js',
  'js/55-hawaan-drive.js',
  'js/12-sera-bella.js',
  'js/6-sera-bella.js'
];

for (const jsFile of jsFiles) {
  const jsPath = path.join(ROOT, jsFile);
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  // Check for any assets referenced inside JS
  const assetMatches = [...jsContent.matchAll(/['"](assets\/[^'"]+)['"]/gi)];
  for (const m of assetMatches) {
    const assetPath = m[1];
    const resolved = path.join(ROOT, assetPath.replace(/%20/g, ' '));
    if (!fs.existsSync(resolved)) {
      console.error(`[${jsFile}] Broken JS asset reference: "${assetPath}" -> resolved to "${resolved}"`);
      totalIssues++;
    }
  }
}

console.log(`\nAudit completed. Total issues found: ${totalIssues}`);
if (totalIssues === 0) {
  console.log('✓ ALL 20 PAGES & ASSETS ARE 100% HEALTHY!');
}
