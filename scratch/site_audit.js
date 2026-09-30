const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const files = findHtmlFiles('.');
let totalMissing = 0;
let totalUnsplash = 0;
let totalLocal = 0;
const withUnsplash = [];
const withMissing = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const src = m[1];
    if (src.includes('unsplash.com')) {
      totalUnsplash++;
      withUnsplash.push({ file: f, src });
    } else if (src.startsWith('http')) {
      // other external
    } else {
      const clean = src.split('?')[0].split('#')[0];
      const resolved = path.resolve(path.dirname(f), clean);
      if (fs.existsSync(resolved)) {
        totalLocal++;
      } else {
        totalMissing++;
        withMissing.push({ file: f, src });
      }
    }
  }
});

console.log('=== SITE-WIDE SUMMARY ===');
console.log('Total local existing images referenced:', totalLocal);
console.log('Total missing/broken images:', totalMissing);
console.log('Total Unsplash images remaining across all files:', totalUnsplash);
if (withMissing.length > 0) {
  console.log('Sample missing:', withMissing.slice(0, 10));
}
if (withUnsplash.length > 0) {
  const uniqueFiles = [...new Set(withUnsplash.map(u => u.file))];
  console.log(`Files with unsplash (${uniqueFiles.length} files):`, uniqueFiles.slice(0, 10));
}
