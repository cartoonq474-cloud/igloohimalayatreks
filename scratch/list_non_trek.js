const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === 'trek') return;
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
});

for (const [f, refs] of Object.entries(nonRootByFile)) {
  console.log(`\n${f}:`);
  refs.forEach(r => console.log(`   ${r.ref}`));
}
