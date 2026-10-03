const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch') return;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

const htmls = walk(path.join(__dirname, '..'));

const pageStats = [];
let totalHtmlBytes = 0;
let totalImagesCount = 0;
let totalSvgCount = 0;
let totalMissingDimensions = 0;
let totalMissingLazy = 0;

htmls.forEach(h => {
  const content = fs.readFileSync(h, 'utf8');
  const size = Buffer.byteLength(content, 'utf8');
  totalHtmlBytes += size;

  const elements = (content.match(/<[a-zA-Z0-9-]+(\s|>)/g) || []).length;
  const imgs = content.match(/<img[^>]*>/gi) || [];
  const svgs = content.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];

  let imgNoDims = 0;
  let imgNoLazy = 0;
  imgs.forEach(img => {
    if (!img.includes('width=') || !img.includes('height=')) {
      imgNoDims++;
    }
    if (!img.includes('loading="lazy"') && !img.includes("loading='lazy'")) {
      imgNoLazy++;
    }
  });

  totalImagesCount += imgs.length;
  totalSvgCount += svgs.length;
  totalMissingDimensions += imgNoDims;
  totalMissingLazy += imgNoLazy;

  pageStats.push({
    file: path.relative(path.join(__dirname, '..'), h),
    sizeKB: (size / 1024).toFixed(1),
    elements,
    imgCount: imgs.length,
    imgNoDims,
    imgNoLazy,
    svgCount: svgs.length
  });
});

console.log('=== SITE-WIDE PERFORMANCE AUDIT SUMMARY ===');
console.log('Total HTML pages:', htmls.length);
console.log('Total HTML payload:', (totalHtmlBytes / (1024 * 1024)).toFixed(2), 'MB');
console.log('Total <img> tags across site:', totalImagesCount);
console.log('Total <img> tags missing width/height (CLS culprits):', totalMissingDimensions);
console.log('Total <img> tags missing loading="lazy":', totalMissingLazy);
console.log('Total inline <svg> tags across site:', totalSvgCount);

console.log('\nTop 15 Heaviest Pages (HTML Size & DOM Element Count):');
pageStats.sort((a, b) => parseFloat(b.sizeKB) - parseFloat(a.sizeKB)).slice(0, 15).forEach(p => {
  console.log(`  - ${p.file}: ${p.sizeKB} KB | ${p.elements} DOM nodes | ${p.imgCount} imgs (${p.imgNoDims} no dims) | ${p.svgCount} svgs`);
});
