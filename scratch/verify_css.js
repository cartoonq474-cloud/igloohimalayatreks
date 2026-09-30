const fs = require('fs');
const path = require('path');

function findCssFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(findCssFiles(fullPath));
    else if (file.endsWith('.css')) results.push(fullPath);
  });
  return results;
}

const cssFiles = findCssFiles('.');
console.log('Total CSS files:', cssFiles.length);

const rootImagesDir = path.resolve('images');
let cssErrors = 0;

cssFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const bgRegex = /url\(['"]?([^'")]+)['"]?\)/gi;
  let m;
  while ((m = bgRegex.exec(content)) !== null) {
    const ref = m[1];
    if (ref.startsWith('data:') || ref.startsWith('#') || ref.includes('fonts.googleapis.com')) continue;
    if (ref.startsWith('http')) {
      console.log(f, 'External CSS url:', ref);
      cssErrors++;
    } else {
      const clean = ref.split('?')[0].split('#')[0];
      const resolved = path.resolve(path.dirname(f), clean);
      const rel = path.relative(rootImagesDir, resolved);
      if (!fs.existsSync(resolved) || rel.startsWith('..') || path.isAbsolute(rel)) {
        console.log(f, 'Non-root/missing CSS url:', ref, '->', resolved);
        cssErrors++;
      }
    }
  }
});

console.log('Total CSS url errors:', cssErrors);
