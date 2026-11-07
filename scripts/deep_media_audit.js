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

let totalMedia = 0;
let missing = [];

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  const matches = html.matchAll(/src=["']([^"']+)["']/g);
  for (const m of matches) {
    const src = m[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    totalMedia++;
    const clean = src.split('?')[0].split('#')[0];
    if (!fs.existsSync(clean)) {
      missing.push({ page: p, src });
    }
  }
});

console.log('Total local media references scanned across all 9 pages:', totalMedia);
console.log('Missing media references count:', missing.length);
if (missing.length > 0) {
  missing.forEach(m => console.log(`  - In ${m.page}: missing ${m.src}`));
  process.exit(1);
} else {
  console.log('100% OF ALL MEDIA ASSETS EXIST LOCALLY ON DISK!');
}
