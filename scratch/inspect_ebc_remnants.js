const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/kanchenjunga-circuit-trek/index.html'), 'utf8');

// Find all matches for "14 days", "EBC", "Everest", "Dudh Koshi"
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (/14\s*days|EBC|Dudh Koshi/i.test(line) && !line.includes('mega-trek-link') && !line.includes('everest-base-camp')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});

// Also check Trek Region
lines.forEach((line, idx) => {
  if (/Trek Region/i.test(line)) {
    console.log(`Region line ${idx + 1}: ${line.trim()}`);
  }
});
