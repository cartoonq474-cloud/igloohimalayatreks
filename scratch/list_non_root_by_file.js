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

const rootImagesDir = path.resolve('images');
const files = findHtmlFiles('.');
const nonRootByFile = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const ref = m[1];
    if (ref.startsWith('http://') || ref.startsWith('https://')) {
      if (!nonRootByFile[file]) nonRootByFile[file] = [];
      nonRootByFile[file].push({ ref, type: 'img src (external)' });
    } else {
      const clean = ref.split('?')[0].split('#')[0];
      const resolved = path.resolve(path.dirname(file), clean);
      const rel = path.relative(rootImagesDir, resolved);
      if (rel.startsWith('..') || path.isAbsolute(rel)) {
        if (!nonRootByFile[file]) nonRootByFile[file] = [];
        nonRootByFile[file].push({ ref, type: 'img src (subfolder)' });
      }
    }
  }

  // background image url
  const bgRegex = /url\(['"]?([^'")]+)['"]?\)/gi;
  while ((m = bgRegex.exec(content)) !== null) {
    const ref = m[1];
    if (ref.startsWith('data:') || ref.startsWith('#') || ref.includes('fonts.googleapis.com')) continue;
    if (ref.startsWith('http://') || ref.startsWith('https://')) {
      if (!nonRootByFile[file]) nonRootByFile[file] = [];
      nonRootByFile[file].push({ ref, type: 'css url (external)' });
    } else {
      const clean = ref.split('?')[0].split('#')[0];
      const resolved = path.resolve(path.dirname(file), clean);
      const rel = path.relative(rootImagesDir, resolved);
      if (rel.startsWith('..') || path.isAbsolute(rel)) {
        if (!nonRootByFile[file]) nonRootByFile[file] = [];
        nonRootByFile[file].push({ ref, type: 'css url (subfolder)' });
      }
    }
  }

  // meta og:image
  const metaRegex = /content=["']([^"']+\.(?:png|jpg|jpeg|webp|avif|gif))["']/gi;
  while ((m = metaRegex.exec(content)) !== null) {
    const ref = m[1];
    if (ref.startsWith('http://') || ref.startsWith('https://')) {
      // Check if it's pointing to igloohimalayatreks.com/images/... (which is the production canonical domain for root images)
      // If the user wants ONLY local images from 'images' folder, let's also note this
      if (!nonRootByFile[file]) nonRootByFile[file] = [];
      nonRootByFile[file].push({ ref, type: 'meta image (external)' });
    }
  }
});

console.log('Files with non-root image refs count:', Object.keys(nonRootByFile).length);
for (const [f, refs] of Object.entries(nonRootByFile)) {
  console.log(`\n${f} (${refs.length} refs):`);
  refs.forEach(r => console.log(`   [${r.type}] ${r.ref}`));
}
