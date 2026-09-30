const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const htmlFiles = findHtmlFiles('.');
const rootImagesDir = path.resolve('images');

let totalTested = 0;
let totalValid = 0;
const errors = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    testRef(file, m[1], 'img src');
  }

  // background image url
  const bgRegex = /url\(['"]?([^'")]+)['"]?\)/gi;
  while ((m = bgRegex.exec(content)) !== null) {
    if (!m[1].startsWith('data:') && !m[1].startsWith('#') && !m[1].includes('fonts.googleapis.com')) {
      testRef(file, m[1], 'css url');
    }
  }

  // video poster
  const posterRegex = /poster=["']([^"']+)["']/gi;
  while ((m = posterRegex.exec(content)) !== null) {
    testRef(file, m[1], 'poster');
  }
});

function testRef(file, ref, type) {
  totalTested++;
  // If external canonical URL pointing to igloohimalayatreks.com/images/X
  if (ref.startsWith('https://igloohimalayatreks.com/images/')) {
    const filename = ref.replace('https://igloohimalayatreks.com/images/', '');
    const localPath = path.join(rootImagesDir, filename);
    if (!fs.existsSync(localPath)) {
      errors.push({ file, ref, error: 'Canonical file missing in images/' });
    } else {
      totalValid++;
    }
    return;
  }

  // If local relative URL
  const clean = ref.split('?')[0].split('#')[0];
  const resolved = path.resolve(path.dirname(file), clean);

  // 1. Must exist on disk
  if (!fs.existsSync(resolved)) {
    errors.push({ file, ref, resolved, error: 'File does not exist' });
    return;
  }

  // 2. Must be inside root images/ directory
  const rel = path.relative(rootImagesDir, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    errors.push({ file, ref, resolved, error: 'File is not in root images/ folder' });
    return;
  }

  totalValid++;
}

console.log(`=== VALIDATION AUDIT ===`);
console.log(`Total image elements tested across site: ${totalTested}`);
console.log(`Total verified valid images in images/ folder: ${totalValid}`);
console.log(`Total errors: ${errors.length}`);
if (errors.length > 0) {
  console.log('Errors sample:', errors.slice(0, 10));
} else {
  console.log('PERFECT! 100% of image references across the entire website use valid images strictly from the images/ folder!');
}
