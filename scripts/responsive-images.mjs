// Builds 640px and 1280px WebP copies of every listing and agent photo, then adds
// srcset/sizes to <img> tags that point at those photos so each device downloads only
// the width it needs. Re-runs skip up-to-date files and tags that already have a srcset.
// Usage: node scripts/responsive-images.mjs   (run after scripts/optimize-images.mjs)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIRS = ['assets/properties', 'assets/agent'];
const WIDTHS = [640, 1280];
const VARIANT_RE = /-(640|1280)\.webp$/;

// Layout width each image class occupies; unlisted images fall back to DEFAULT_SIZES.
const SIZES_BY_CLASS = {
  'hero__img': '100vw',
  'home-hero__img': '100vw',
  'comm-card__img': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  'estate-card__img': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  'property-card__img': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  'suite-card__img': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  'gateway-card__img': '(min-width: 768px) 50vw, 100vw',
  'advisor__img': '(min-width: 768px) 40vw, 100vw',
  'about-story__img': '(min-width: 768px) 50vw, 100vw',
  'overview__img': '(min-width: 768px) 50vw, 100vw',
};
const DEFAULT_SIZES = '(min-width: 1024px) 66vw, 100vw';

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  return d.isDirectory() ? walk(p) : [p];
});
const fresh = (src, out) => fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
const variantPath = (file, w) => file.replace(/\.webp$/, `-${w}.webp`);

// 1. Variants
const bases = SOURCE_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
  .filter((f) => f.endsWith('.webp') && !VARIANT_RE.test(f));
const jobs = bases.flatMap((src) => WIDTHS.map((w) => ({ src, w, out: variantPath(src, w) })))
  .filter(({ src, out }) => !fresh(src, out));

let i = 0;
const failures = [];
await Promise.all(Array.from({ length: Math.max(2, os.cpus().length - 1) }, async () => {
  while (i < jobs.length) {
    const { src, w, out } = jobs[i++];
    try {
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(out);
    } catch (e) { failures.push(`${path.relative(ROOT, src)} @${w}: ${e.message}`); }
  }
}));
console.log(`variants: ${jobs.length} built, failures: ${failures.length}`);
failures.forEach((f) => console.log('  FAIL', f));

// 2. srcset on <img> tags
const widthCache = new Map();
async function naturalWidth(rel) {
  if (!widthCache.has(rel)) widthCache.set(rel, (await sharp(path.join(ROOT, rel)).metadata()).width);
  return widthCache.get(rel);
}

const IMG_RE = /<img\b[^>]*?\ssrc="((?:\/)?assets\/(?:properties|agent)\/[^"]+?\.webp)"[^>]*>/g;
let tagged = 0;
for (const file of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  let out = '';
  let last = 0;
  for (const m of html.matchAll(IMG_RE)) {
    const [tag, src] = m;
    const rel = src.replace(/^\//, '');
    if (/\ssrcset=/.test(tag) || VARIANT_RE.test(rel) || !fs.existsSync(path.join(ROOT, rel))) continue;
    const full = await naturalWidth(rel);
    const set = WIDTHS.filter((w) => w < full).map((w) => `${variantPath(src, w)} ${w}w`);
    set.push(`${src} ${full}w`);
    const cls = (tag.match(/\sclass="([^"]*)"/) || [, ''])[1].split(/\s+/);
    const fullBleed = /id="carousel-image"/.test(tag) ? false : cls.includes('w-full') && cls.includes('h-full');
    const sizes = SIZES_BY_CLASS[cls.find((c) => SIZES_BY_CLASS[c])] || (fullBleed ? '100vw' : DEFAULT_SIZES);
    const next = tag.replace(/\ssrc="[^"]+"/, (s) => `${s} srcset="${set.join(', ')}" sizes="${sizes}"`);
    out += html.slice(last, m.index) + next;
    last = m.index + tag.length;
    tagged++;
  }
  out += html.slice(last);
  if (out !== html) fs.writeFileSync(path.join(ROOT, file), out);
}
console.log(`img tags given srcset: ${tagged}`);
