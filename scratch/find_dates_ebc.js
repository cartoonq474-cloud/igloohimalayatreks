const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-dates"[\s\S]*?<\/section>/i);
if (m) {
  const matches = m[0].match(/(.{0,40}(lukla|everest|namche|kala patthar|solukhumbu).{0,40})/gi);
  console.log('section-dates matches:', matches);
}
