const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const imgRegex = /<img\s+([^>]+)>/gi;
let m;
const images = [];

while ((m = imgRegex.exec(indexHtml)) !== null) {
  const fullTag = m[0];
  const attrs = m[1];
  const src = (attrs.match(/src=["']([^"']+)["']/) || [])[1];
  const cls = (attrs.match(/class=["']([^"']+)["']/) || [])[1];
  const hasWidth = attrs.includes('width=');
  const hasHeight = attrs.includes('height=');
  images.push({ fullTag, src, cls, hasWidth, hasHeight });
}

console.log('Total images:', images.length);
images.forEach((img, i) => {
  console.log(`[#${i+1}] src="${img.src}" class="${img.cls}" width/height=${img.hasWidth && img.hasHeight ? 'YES' : 'NO'}`);
});
