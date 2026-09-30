const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles('.');

const pageBreakdown = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  let totalImg = 0;
  let missing = [];
  let unsplash = [];
  let localFound = [];
  
  while ((m = imgRegex.exec(content)) !== null) {
    totalImg++;
    const src = m[1];
    if (src.includes('unsplash.com')) {
      unsplash.push(src);
    } else if (src.startsWith('http')) {
      // other external
    } else {
      const clean = src.split('?')[0].split('#')[0];
      const resolved = path.resolve(path.dirname(file), clean);
      if (fs.existsSync(resolved)) {
        localFound.push(src);
      } else {
        missing.push(src);
      }
    }
  }

  if (missing.length > 0 || unsplash.length > 0 || totalImg > 0) {
    pageBreakdown.push({
      file,
      totalImg,
      missingCount: missing.length,
      missing: [...new Set(missing)],
      unsplashCount: unsplash.length,
      localCount: localFound.length
    });
  }
});

console.log('Total HTML files analyzed:', pageBreakdown.length);
console.log('\nTop 20 pages with missing images:');
console.log(pageBreakdown.sort((a,b) => b.missingCount - a.missingCount).slice(0, 20).map(p => `${p.file}: ${p.missingCount} missing, ${p.unsplashCount} unsplash, ${p.localCount} local, total ${p.totalImg}`));

console.log('\nRoot HTML pages:');
const rootPages = pageBreakdown.filter(p => !p.file.includes(path.sep) || p.file.split(path.sep).length === 1);
rootPages.forEach(p => console.log(`${p.file}: ${p.missingCount} missing, ${p.unsplashCount} unsplash, ${p.localCount} local, total ${p.totalImg}`));
