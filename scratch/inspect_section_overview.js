const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/kanchenjunga-circuit-trek/index.html'), 'utf8');

const m = html.match(/<section id=["']section-overview["'][\s\S]*?(?=<div class=["']rich-highlights)/i);
if (m) {
  console.log('=== section-overview up to rich-highlights ===');
  console.log(m[0]);
} else {
  console.log('No match for section-overview');
}

// Also check sidebar
const side = html.match(/<aside class=["']trek-sidebar[\s\S]*?<\/aside>/i) ||
             html.match(/<div class=["']trek-sidebar[\s\S]*?<\/div>\s*<\/div>/i);
if (side) {
  console.log('=== Sidebar ===');
  console.log(side[0].slice(0, 800));
} else {
  // Let's find "14 days trip"
  const m14 = html.match(/.{0,100}14 days trip.{0,100}/i);
  console.log('=== 14 days trip occurrence ===');
  console.log(m14 ? m14[0] : 'not found');
}

// Check where Dates & Availability is
const dMatch = html.match(/.{0,100}Dates & Availability.{0,100}/gi);
console.log('=== Dates occurrences ===');
console.log(dMatch ? dMatch.slice(0, 3) : 'none');
