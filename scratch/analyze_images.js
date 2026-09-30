const fs = require('fs');
const path = require('path');

// 1. Analyze files in images folder
const imageFiles = fs.readdirSync('images');
console.log(`Total files in images/ folder: ${imageFiles.length}`);

// Group by extension
const extCounts = {};
imageFiles.forEach(f => {
  const ext = path.extname(f).toLowerCase();
  extCounts[ext] = (extCounts[ext] || 0) + 1;
});
console.log('Extensions:', extCounts);

// 2. Check HTML files across website
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
console.log(`Total HTML files found: ${htmlFiles.length}`);

// 3. Find image references in index.html specifically
function analyzeHtmlImages(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  const refs = [];
  while ((match = imgRegex.exec(html)) !== null) {
    refs.push(match[1]);
  }
  
  // also check background-image: url(...)
  const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    if (!match[1].startsWith('data:')) {
      refs.push(match[1]);
    }
  }

  const missing = [];
  const existing = [];
  const external = [];

  refs.forEach(r => {
    if (r.startsWith('http://') || r.startsWith('https://')) {
      external.push(r);
      return;
    }
    const clean = r.split('?')[0].split('#')[0];
    const resolved = path.resolve(path.dirname(filePath), clean);
    if (fs.existsSync(resolved)) {
      existing.push(r);
    } else {
      missing.push({ ref: r, resolved });
    }
  });

  return { totalRefs: refs.length, existing: existing.length, missing, external: external.length };
}

console.log('\n--- INDEX.HTML ANALYSIS ---');
const indexAnalysis = analyzeHtmlImages('index.html');
console.log(`Total image refs in index.html: ${indexAnalysis.totalRefs}`);
console.log(`Existing image refs: ${indexAnalysis.existing}`);
console.log(`External image refs: ${indexAnalysis.external}`);
console.log(`Missing image refs: ${indexAnalysis.missing.length}`);
console.log('Unique missing refs in index.html:');
const uniqueMissing = [...new Set(indexAnalysis.missing.map(m => m.ref))];
console.log(uniqueMissing.slice(0, 30));

console.log('\n--- ALL HTML FILES OVERVIEW ---');
let totalMissingAcrossSite = 0;
const missingByFile = {};
htmlFiles.forEach(f => {
  const a = analyzeHtmlImages(f);
  if (a.missing.length > 0) {
    missingByFile[f] = a.missing.length;
    totalMissingAcrossSite += a.missing.length;
  }
});
console.log(`HTML files with missing images: ${Object.keys(missingByFile).length}`);
console.log(`Total missing image references across site: ${totalMissingAcrossSite}`);
console.log('Top files with missing images:', Object.entries(missingByFile).sort((a,b) => b[1]-a[1]).slice(0, 15));
