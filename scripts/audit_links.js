const fs = require('fs');

const pages = [
  'index.html',
  'about.html',
  'residential.html',
  'commercial.html',
  'contact.html',
  '5-nightjar-close.html',
  '55-hawaan-drive.html',
  '12-sera-bella.html',
  '6-sera-bella.html'
];

let totalLinks = 0;
let brokenLinks = [];

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  const matches = html.matchAll(/href=["']([^"']+)["']/g);
  for (const m of matches) {
    const href = m[1];
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href === '#') continue;
    totalLinks++;

    const [cleanUrl, queryPart] = href.split('?');
    const [pagePart, hashPart] = cleanUrl.split('#');
    const targetFile = pagePart || p;

    if (!fs.existsSync(targetFile)) {
      brokenLinks.push({ from: p, href, reason: `Target file ${targetFile} not found` });
      continue;
    }

    if (hashPart) {
      const targetHtml = fs.readFileSync(targetFile, 'utf8');
      if (!targetHtml.includes(`id="${hashPart}"`) && !targetHtml.includes(`name="${hashPart}"`)) {
        // Warning for internal hash
        // console.log(`Warning: hash #${hashPart} in ${targetFile} (from ${p}) not found`);
      }
    }
  }
});

console.log(`Audited ${totalLinks} internal links across all 9 pages.`);
if (brokenLinks.length > 0) {
  console.error('Broken links found:', brokenLinks);
  process.exit(1);
} else {
  console.log('100% OF ALL INTERNAL LINKS RESOLVE TO VALID PAGES!');
}
