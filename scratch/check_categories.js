const fs = require('fs');

const p = 'trek/everest-base-camp-trek/index.html';
const html = fs.readFileSync(p, 'utf8');

const sIdx = html.indexOf('id="section-packing"');
const eIdx = html.indexOf('</section>', sIdx);
const sec = html.substring(sIdx, eIdx);

const tabMatches = [...sec.matchAll(/class="[^"]*packing-tab-btn[^"]*"[^>]*data-category="([^"]+)"/g)].map(m => m[1]);
const cardMatches = [...sec.matchAll(/class="[^"]*(?:packing-category-card|gear-section)[^"]*"[^>]*data-category="([^"]+)"/g)].map(m => m[1]);

console.log('Tab categories:', tabMatches);
console.log('Card categories:', cardMatches);
