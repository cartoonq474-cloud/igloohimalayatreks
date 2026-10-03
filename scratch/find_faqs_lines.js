const fs = require('fs');
const html = fs.readFileSync('trek/everest-base-camp-luxury-trek/index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('#section-faqs') || l.includes('section-faqs')) {
    console.log(`Line ${idx+1}: ${l.slice(0, 80)}`);
  }
});
