const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const svgs = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];

console.log('Total SVGs on index.html:', svgs.length);
let totalBytes = svgs.reduce((s, c) => s + Buffer.byteLength(c, 'utf8'), 0);
console.log('Total SVG bytes:', (totalBytes / 1024).toFixed(1) + ' KB');

const counts = {};
svgs.forEach(s => {
  const norm = s.replace(/\s+/g, ' ').trim();
  counts[norm] = (counts[norm] || 0) + 1;
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
sorted.slice(0, 10).forEach(([svg, count], i) => {
  console.log(`[Top ${i+1}] Count: ${count} | Length: ${svg.length} chars | Total KB: ${(svg.length * count / 1024).toFixed(1)} KB`);
  console.log('   Preview:', svg.substring(0, 100));
});
