const fs = require('fs');

const html = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');

const pStart = html.indexOf('id="section-packing"');
console.log('--- SECTION PACKING (first 1500 chars) ---');
console.log(html.substring(pStart, pStart + 1500));

const mStart = html.indexOf('id="section-map"');
console.log('--- SECTION MAP (first 1500 chars) ---');
console.log(html.substring(mStart, mStart + 1500));

const fStart = html.indexOf('id="section-faqs"');
console.log('--- SECTION FAQS (first 1500 chars) ---');
console.log(html.substring(fStart, fStart + 1500));
