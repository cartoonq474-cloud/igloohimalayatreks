const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Top SVG patterns
const starPattern = /<svg[^>]*viewBox=["']0 0 24 24["'][^>]*>\s*<polygon\s+points=["']12 2 15\.09 8\.26 22 9\.27 17 14\.14 18\.18 21\.02 12 17\.77 5\.82 21\.02 7 14\.14 2 9\.27 8\.91 8\.26 12 2["']\s*\/>\s*<\/svg>/gi;

const pinPattern = /<svg[^>]*viewBox=["']0 0 24 24["'][^>]*>\s*<path\s+d=["']M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z["']\s*\/>\s*<circle\s+cx=["']12["']\s+cy=["']10["']\s+r=["']3["']\s*\/>\s*<\/svg>/gi;

const starMatches = content.match(starPattern) || [];
const pinMatches = content.match(pinPattern) || [];

console.log('Star matches found:', starMatches.length);
console.log('Pin matches found:', pinMatches.length);
