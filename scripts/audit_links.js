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
  '7-the-boulevard.html'
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

    const [cleanUrl] = href.split('?');
    const [pagePart] = cleanUrl.split('#');
    const targetFile = pagePart || p;

    if (!fs.existsSync(targetFile)) {
      brokenLinks.push({ from: p, href, reason: `Target file ${targetFile} not found` });
    }
  }
});

console.log(`Audited ${totalLinks} internal links across all 20 pages.`);
if (brokenLinks.length > 0) {
  console.error('Broken links found:', brokenLinks);
  process.exit(1);
} else {
  console.log('100% OF ALL INTERNAL LINKS RESOLVE TO VALID PAGES!');
}
