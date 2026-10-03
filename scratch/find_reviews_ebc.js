const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const m = html.match(/<section id="section-reviews"[\s\S]*?<\/section>/i);
if (m) {
  const matches = [...m[0].matchAll(/(.{0,50}(Everest Base Camp|Lukla|Kala Patthar).{0,50})/gi)];
  console.log('Matches in section-reviews:', matches.length);
  matches.forEach((x, i) => console.log(`${i+1}: ${x[0].replace(/\n/g, ' ')}`));
}
