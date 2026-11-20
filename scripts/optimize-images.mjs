// Builds WebP versions of every listing and agent photo, 1200x630 share images per page,
// and points HTML/CSS/JS at the WebP files. Originals are kept as the source of truth.
// Usage: node scripts/optimize-images.mjs   (needs ffmpeg with libwebp on PATH; re-runs skip done files)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { PAGES, SITE } from './seo/site.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIRS = ['assets/properties', 'assets/agent'];
const MAX_EDGE = 1920;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

function ffmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
    let err = '';
    child.stderr.on('data', (d) => { err += d; });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err || `ffmpeg exited ${code}`))));
  });
}

async function pool(jobs, size) {
  let i = 0;
  const failures = [];
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < jobs.length) {
      const job = jobs[i++];
      try { await job.run(); } catch (e) { failures.push(`${job.name}: ${e.message.trim()}`); }
    }
  }));
  return failures;
}

const fresh = (src, out) => fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

// 1. WebP conversions
const sources = SOURCE_DIRS.flatMap((d) => walk(path.join(ROOT, d))).filter((f) => /\.(jpe?g|png)$/i.test(f));
const webpJobs = sources
  .map((src) => ({ src, out: src.replace(/\.(jpe?g|png)$/i, '.webp') }))
  .filter(({ src, out }) => !fresh(src, out))
  .map(({ src, out }) => ({
    name: path.relative(ROOT, src),
    run: () => ffmpeg([
      '-i', src,
      '-vf', `scale='min(${MAX_EDGE},iw)':'min(${MAX_EDGE},ih)':force_original_aspect_ratio=decrease`,
      ...(/\.png$/i.test(src) ? ['-pix_fmt', 'yuva420p'] : []),
      '-c:v', 'libwebp', '-quality', '78', '-compression_level', '6', out,
    ]),
  }));

// 2. Share images (1200x630, JPEG for the widest messenger support)
const ogDir = path.join(ROOT, 'assets/og');
fs.mkdirSync(ogDir, { recursive: true });
const slug = (p) => (p.path === '/' ? 'home' : p.path.slice(1));
const ogJobs = PAGES.map((p) => {
  const src = path.join(ROOT, (p.image || SITE.defaultImage).replace(/^\//, ''));
  const out = path.join(ogDir, `${slug(p)}.jpg`);
  return { name: `og/${slug(p)}`, src, out };
}).filter(({ src, out }) => !fresh(src, out)).map(({ name, src, out }) => ({
  name,
  run: () => ffmpeg(['-i', src, '-vf', 'scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630', '-q:v', '4', out]),
}));

const failures = await pool([...webpJobs, ...ogJobs], Math.max(2, os.cpus().length - 1));
console.log(`webp: ${webpJobs.length} built, og: ${ogJobs.length} built, failures: ${failures.length}`);
failures.forEach((f) => console.log('  FAIL', f));

// 3. Point markup, styles and scripts at WebP where the WebP exists
const targets = [
  ...fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')),
  ...fs.readdirSync(path.join(ROOT, 'css')).filter((f) => f.endsWith('.css')).map((f) => 'css/' + f),
  ...fs.readdirSync(path.join(ROOT, 'js')).filter((f) => f.endsWith('.js')).map((f) => 'js/' + f),
];
let rewritten = 0;
for (const rel of targets) {
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/((?:\.\.\/|\/)?assets\/(?:properties|agent)\/[^"'()\s,]+?)\.(jpe?g|png)\b/gi, (m, base) => {
    const local = path.join(ROOT, base.replace(/^(\.\.\/|\/)/, '') + '.webp');
    return fs.existsSync(local) ? `${base}.webp` : m;
  });
  if (after !== before) { fs.writeFileSync(file, after); rewritten++; }
}
console.log(`references rewritten in ${rewritten} files`);
