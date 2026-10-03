const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const spriteDef = `  <!-- Reusable SVG Symbol Sprite Sheet for High-Performance Rendering -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-star" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </symbol>
    <symbol id="icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </symbol>
    <symbol id="icon-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </symbol>
  </svg>
`;

// Insert sprite right after <body>
if (!html.includes('id="icon-star"')) {
  html = html.replace('<body>', '<body>\n' + spriteDef);
}

// 1. Replace repetitive star polygons
const starRegex = /<svg([^>]*)viewBox=["']0 0 24 24["']([^>]*)>\s*<polygon\s+points=["']12 2 15\.09 8\.26 22 9\.27 17 14\.14 18\.18 21\.02 12 17\.77 5\.82 21\.02 7 14\.14 2 9\.27 8\.91 8\.26 12 2["']\s*\/>\s*<\/svg>/gi;

let starCount = 0;
html = html.replace(starRegex, (match, before, after) => {
  starCount++;
  // Preserve width, height, fill, style, class
  const w = (match.match(/width=["']([^"']+)["']/) || [])[1] || '15';
  const h = (match.match(/height=["']([^"']+)["']/) || [])[1] || '15';
  const fill = (match.match(/fill=["']([^"']+)["']/) || [])[1] || '#F6851F';
  const styleMatch = match.match(/style=["']([^"']+)["']/);
  const styleAttr = styleMatch ? ` style="${styleMatch[1]}"` : '';
  const classMatch = match.match(/class=["']([^"']+)["']/);
  const classAttr = classMatch ? ` class="${classMatch[1]}"` : '';

  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}"${classAttr}${styleAttr}><use href="#icon-star"/></svg>`;
});

// 2. Replace repetitive location pin SVGs
const pinRegex = /<svg([^>]*)viewBox=["']0 0 24 24["']([^>]*)>\s*<path\s+d=["']M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z["']\s*\/>\s*<circle\s+cx=["']12["']\s+cy=["']10["']\s+r=["']3["']\s*\/>\s*<\/svg>/gi;

let pinCount = 0;
html = html.replace(pinRegex, (match) => {
  pinCount++;
  const w = (match.match(/width=["']([^"']+)["']/) || [])[1] || '14';
  const h = (match.match(/height=["']([^"']+)["']/) || [])[1] || '14';
  const stroke = (match.match(/stroke=["']([^"']+)["']/) || [])[1] || '#EF4444';
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}"><use href="#icon-pin"/></svg>`;
});

// 3. Replace bolt/difficulty SVGs
const boltRegex = /<svg([^>]*)viewBox=["']0 0 24 24["']([^>]*)>\s*<polygon\s+points=["']13 2 3 14 12 14 11 22 21 10 12 10 13 2["']\s*\/>\s*<\/svg>/gi;

let boltCount = 0;
html = html.replace(boltRegex, (match) => {
  boltCount++;
  const w = (match.match(/width=["']([^"']+)["']/) || [])[1] || '14';
  const h = (match.match(/height=["']([^"']+)["']/) || [])[1] || '14';
  const stroke = (match.match(/stroke=["']([^"']+)["']/) || [])[1] || '#1A96C8';
  return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}"><use href="#icon-bolt"/></svg>`;
});

fs.writeFileSync(indexPath, html, 'utf8');

console.log(`Successfully converted SVGs to Symbol Sprites on index.html:`);
console.log(`- Stars converted: ${starCount}`);
console.log(`- Pins converted: ${pinCount}`);
console.log(`- Bolts converted: ${boltCount}`);
console.log('New index.html size:', (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1), 'KB');
