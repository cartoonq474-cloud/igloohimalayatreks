const fs = require('fs');

const html = fs.readFileSync('trek/ghorepani-poon-hill-with-mardi-himal-trek/index.html', 'utf8');

const d1Idx = html.indexOf('Day 1:');
const d3Idx = html.indexOf('Day 3:');
console.log('Day 1 and 2 in HTML:\n', html.slice(d1Idx, d3Idx));
