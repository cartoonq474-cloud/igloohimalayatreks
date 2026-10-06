const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Read _redirects
const redirects = new Map();
if (fs.existsSync(path.join(ROOT, '_redirects'))) {
  const lines = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      redirects.set(parts[0], parts[1]);
      redirects.set(parts[0].replace(/\/$/, ''), parts[1]);
    }
  }
}

function walk(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (['node_modules', '.git', 'scratch', '.gemini', '.antigravity', '.antigravitycli'].includes(f)) continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full, list);
    } else if (f.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = walk(ROOT);
console.log(`Auditing ${htmlFiles.length} HTML files with refined parser...`);

const brokenImages = [];
const brokenLinks = [];

function checkFileExists(fileDir, rawSrc) {
  let clean = rawSrc.trim().split('?')[0].split('#')[0];
  try {
    clean = decodeURIComponent(clean);
  } catch (e) {}

  let resolved;
  if (clean.startsWith('/')) {
    resolved = path.join(ROOT, clean);
  } else {
    resolved = path.resolve(fileDir, clean);
  }
  return { exists: fs.existsSync(resolved), resolved: path.relative(ROOT, resolved).replace(/\\/g, '/') };
}

for (const filePath of htmlFiles) {
  const fileDir = path.dirname(filePath);
  const relFilePath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Audit Images
  // 1a: <img src="...">
  const srcRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = srcRegex.exec(html)) !== null) {
    const src = match[1].trim();
    if (!src || src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) continue;
    const check = checkFileExists(fileDir, src);
    if (!check.exists) {
      brokenImages.push({
        file: relFilePath,
        src: src,
        resolved: check.resolved
      });
    }
  }

  // 1b: <source srcset="..."> (split on comma)
  const srcsetRegex = /<(?:img|source)[^>]+srcset=["']([^"']+)["'][^>]*>/gi;
  while ((match = srcsetRegex.exec(html)) !== null) {
    const srcset = match[1].trim();
    const candidates = srcset.split(',').map(s => s.trim().replace(/\s+\d+[wx]$/, ''));
    for (const c of candidates) {
      if (!c || c.startsWith('data:') || c.startsWith('http://') || c.startsWith('https://')) continue;
      const check = checkFileExists(fileDir, c);
      if (!check.exists) {
        brokenImages.push({
          file: relFilePath,
          src: c,
          resolved: check.resolved
        });
      }
    }
  }

  // 1c: CSS style="...url(...)..."
  const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    const bgUrl = match[1].trim();
    if (!bgUrl || bgUrl.startsWith('data:') || bgUrl.startsWith('http://') || bgUrl.startsWith('https://')) continue;
    const check = checkFileExists(fileDir, bgUrl);
    if (!check.exists) {
      brokenImages.push({
        file: relFilePath,
        src: bgUrl,
        resolved: check.resolved
      });
    }
  }

  // 2. Audit Links
  const aRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  while ((match = aRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('http://') || href.startsWith('https://')) continue;

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`) && !html.includes(`name="${id}"`)) {
        brokenLinks.push({
          file: relFilePath,
          href: href,
          reason: `Anchor ID #${id} does not exist in file`
        });
      }
      continue;
    }

    const [pathPart, anchorPart] = href.split('#');
    if (!pathPart) continue;

    let cleanPath = pathPart.split('?')[0];
    try {
      cleanPath = decodeURIComponent(cleanPath);
    } catch (e) {}

    // Check redirect
    const normClean = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
    if (redirects.has(normClean) || redirects.has(normClean.replace(/\/$/, '')) || redirects.has(normClean + '/')) {
      continue;
    }

    let resolved;
    if (cleanPath.startsWith('/')) {
      resolved = path.join(ROOT, cleanPath);
    } else {
      resolved = path.resolve(fileDir, cleanPath);
    }

    let exists = false;
    if (fs.existsSync(resolved)) {
      if (fs.statSync(resolved).isDirectory()) {
        if (fs.existsSync(path.join(resolved, 'index.html'))) {
          exists = true;
        }
      } else {
        exists = true;
      }
    } else {
      if (fs.existsSync(resolved + '.html')) {
        exists = true;
      } else if (fs.existsSync(path.join(resolved, 'index.html'))) {
        exists = true;
      }
    }

    if (!exists) {
      brokenLinks.push({
        file: relFilePath,
        href: href,
        resolved: path.relative(ROOT, resolved).replace(/\\/g, '/'),
        reason: 'Page / directory does not exist'
      });
    }
  }
}

console.log(`\n=== ACCURATE AUDIT RESULTS ===`);
console.log(`Broken Images Found: ${brokenImages.length}`);
console.log(`Broken Links Found: ${brokenLinks.length}`);

// Group broken images
const imgMap = new Map();
for (const b of brokenImages) {
  if (!imgMap.has(b.src)) imgMap.set(b.src, []);
  imgMap.get(b.src).push(b.file);
}

console.log('\n--- Unique Broken Images ---');
for (const [src, files] of imgMap.entries()) {
  console.log(`❌ "${src}" (Used in ${files.length} file(s), e.g. ${files[0]})`);
}

// Group broken links
const linkMap = new Map();
for (const b of brokenLinks) {
  const key = `${b.href} [${b.reason}]`;
  if (!linkMap.has(key)) linkMap.set(key, []);
  linkMap.get(key).push(b.file);
}

console.log('\n--- Unique Broken Links ---');
for (const [key, files] of linkMap.entries()) {
  console.log(`❌ ${key} (Used in ${files.length} file(s), e.g. ${files[0]})`);
}
