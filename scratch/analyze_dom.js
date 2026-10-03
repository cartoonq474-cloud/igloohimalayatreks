const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const lines = indexHtml.split('\n');

console.log('=== HOMEPAGE SECTION BREAKDOWN ===');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('<section') || (line.startsWith('<div') && (line.includes('section') || line.includes('container') || line.includes('hub-') || line.includes('carousel')) && line.includes('class='))) {
    console.log(`L${i + 1}: ${line.substring(0, 100)}`);
  }
}

console.log('\n=== IMAGES IN INDEX.HTML (Top 20 by size or appearance) ===');
const imgRegex = /<img\s+([^>]+)>/gi;
let m;
let count = 0;
const imagesFound = [];

while ((m = imgRegex.exec(indexHtml)) !== null) {
  count++;
  const attrs = m[1];
  const srcM = attrs.match(/src=["']([^"']+)["']/i);
  const altM = attrs.match(/alt=["']([^"']+)["']/i);
  const widthM = attrs.match(/width=["']([^"']+)["']/i);
  const heightM = attrs.match(/height=["']([^"']+)["']/i);
  const loadingM = attrs.match(/loading=["']([^"']+)["']/i);
  const fetchPriorityM = attrs.match(/fetchpriority=["']([^"']+)["']/i);

  const src = srcM ? srcM[1] : 'unknown';
  let sizeKB = 'N/A';
  const cleanSrc = src.split('?')[0].split('#')[0];
  const fullPath = path.join(__dirname, '..', cleanSrc);
  if (fs.existsSync(fullPath)) {
    sizeKB = (fs.statSync(fullPath).size / 1024).toFixed(1) + ' KB';
  }

  imagesFound.push({
    index: count,
    src,
    sizeKB,
    hasWidth: !!widthM,
    hasHeight: !!heightM,
    loading: loadingM ? loadingM[1] : 'eager/default',
    fetchpriority: fetchPriorityM ? fetchPriorityM[1] : 'auto'
  });
}

console.log(`Total images on index.html: ${imagesFound.length}`);
imagesFound.slice(0, 25).forEach(img => {
  console.log(`[#${img.index}] ${img.src} | Size: ${img.sizeKB} | WxH: ${img.hasWidth && img.hasHeight ? 'YES' : 'NO'} | Loading: ${img.loading} | FetchPriority: ${img.fetchpriority}`);
});

console.log('\n=== SCRIPT DEPENDENCY GRAPH & EXECUTION ===');
const scripts = indexHtml.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
scripts.forEach((s, i) => {
  const src = (s.match(/src=["']([^"']+)["']/) || [])[1];
  const type = (s.match(/type=["']([^"']+)["']/) || [])[1] || 'text/javascript';
  if (src) {
    const cleanSrc = src.split('?')[0];
    const fp = path.join(__dirname, '..', cleanSrc);
    const sz = fs.existsSync(fp) ? (fs.statSync(fp).size / 1024).toFixed(1) + ' KB' : 'external';
    console.log(`Script ${i+1}: ${src} (${sz}) [${type}]`);
  } else {
    console.log(`Script ${i+1}: inline (${(Buffer.byteLength(s, 'utf8') / 1024).toFixed(1)} KB) [${type}]`);
  }
});
