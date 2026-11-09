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

let totalMedia = 0;
let missing = [];

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  const matches = html.matchAll(/src=["']([^"']+)["']/g);
  for (const m of matches) {
    const src = m[1];
    if (src.startsWith('http') || src.startsWith('data:') || src === '') continue;
    totalMedia++;
    const clean = src.split('?')[0].split('#')[0].replace(/%20/g, ' ');
    if (!fs.existsSync(clean)) {
      missing.push({ page: p, src });
    }
  }
});

console.log(`Total local media references scanned across all 20 pages: ${totalMedia}`);
console.log('Missing media references count:', missing.length);
if (missing.length > 0) {
  missing.forEach(m => console.log(`  - In ${m.page}: missing ${m.src}`));
  process.exit(1);
} else {
  console.log('100% OF ALL MEDIA ASSETS EXIST LOCALLY ON DISK!');
}
