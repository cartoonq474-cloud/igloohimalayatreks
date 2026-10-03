const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-dates"[\s\S]*?<\/section>/i);
if (m) {
  const isEbc = /lukla|everest|namche|kala patthar|solukhumbu/i.test(m[0]);
  console.log('section-dates has EBC mentions:', isEbc);
} else {
  console.log('section-dates not found');
}
