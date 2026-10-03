const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/annapurna-circuit-trek/index.html'), 'utf8');

function inspectSectionLines(id) {
  const regex = new RegExp(`(<section[^>]*id=["']${id}["'][\\s\\S]*?<\\/section>)`, 'i');
  const m = html.match(regex);
  if (m) {
    const text = m[0];
    const lines = text.split('\n');
    console.log(`\n=== SECTION #${id} (lines: ${lines.length}, chars: ${text.length}) ===`);
    console.log('First 5 lines:');
    lines.slice(0, 5).forEach(l => console.log('  ' + l.slice(0, 100)));
    console.log('Last 3 lines:');
    lines.slice(-3).forEach(l => console.log('  ' + l.slice(0, 100)));
  } else {
    console.log(`Section #${id} NOT found`);
  }
}

['section-includes', 'section-dates', 'section-packing', 'section-details', 'section-altitude-profile', 'section-weather', 'section-map', 'section-booking', 'section-reviews', 'section-faqs'].forEach(inspectSectionLines);
