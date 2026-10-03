const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const m = html.match(/<section id="section-reviews"[\s\S]*?<\/section>/i);
if (m) {
  const lines = m[0].split('\n');
  lines.forEach((l, idx) => {
    if (/Everest Base Camp|Lukla|Kala Patthar/i.test(l)) {
      console.log(`Line ${idx}: ${l}`);
      for (let j = Math.max(0, idx - 5); j <= Math.min(lines.length - 1, idx + 5); j++) {
        console.log(`  [${j}] ${lines[j]}`);
      }
      console.log('---');
    }
  });
}
