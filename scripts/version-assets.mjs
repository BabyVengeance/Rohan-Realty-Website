// Stamps every local CSS/JS reference in the HTML pages with ?v=<content hash>, so _headers can
// cache /css and /js for a year while edits still reach visitors on their next page view.
// Usage: node scripts/version-assets.mjs          rewrite stale stamps
//        node scripts/version-assets.mjs --check  exit 1 if any stamp is stale (use before deploy)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const REF_RE = /(\s(?:href|src)=")(\/?)((?:css|js)\/[\w.-]+\.(?:css|js)|assets\/fonts\/fonts\.css)(?:\?v=[\w]+)?(")/g;

const hashes = new Map();
function hashOf(rel) {
  if (!hashes.has(rel)) {
    const file = path.join(ROOT, rel);
    hashes.set(rel, fs.existsSync(file)
      ? crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10)
      : null);
  }
  return hashes.get(rel);
}

let stale = 0;

// CSS @imports first: stamping them changes the importing file, and so its own hash.
const IMPORT_RE = /@import url\((['"]?)([\w.-]+\.css)(?:\?v=\w+)?\1\)/g;
for (const sheet of fs.readdirSync(path.join(ROOT, 'css')).filter((f) => f.endsWith('.css'))) {
  const file = path.join(ROOT, 'css', sheet);
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(IMPORT_RE, (m, q, rel) => {
    const h = hashOf(`css/${rel}`);
    return h ? `@import url(${q}${rel}?v=${h}${q})` : m;
  });
  if (after !== before) {
    stale++;
    if (CHECK) console.log('stale import stamps:', `css/${sheet}`);
    else fs.writeFileSync(file, after);
  }
}

for (const page of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const file = path.join(ROOT, page);
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(REF_RE, (m, attr, slash, rel, quote) => {
    const h = hashOf(rel);
    return h ? `${attr}${slash}${rel}?v=${h}${quote}` : m;
  });
  if (after !== before) {
    stale++;
    if (CHECK) console.log('stale asset stamps:', page);
    else fs.writeFileSync(file, after);
  }
}
console.log(CHECK ? `${stale} page(s) with stale stamps` : `stamped ${stale} page(s)`);
if (CHECK && stale) process.exit(1);
