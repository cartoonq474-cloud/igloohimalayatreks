const fs = require('fs');
const lines = fs.readFileSync('scratch/act_temp.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('id="section-')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
