const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-faqs"[\s\S]*?<\/section>/i);
if (m) {
  console.log(m[0].substring(0, 1500));
}
