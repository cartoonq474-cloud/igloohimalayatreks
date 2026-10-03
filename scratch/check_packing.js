const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-packing"[\s\S]*?<\/section>/i);
if (m) {
  const isEbc = /lukla|everest|namche|kala patthar|solukhumbu/i.test(m[0]);
  console.log('section-packing has EBC mentions:', isEbc);
  if (isEbc) {
    const matches = m[0].match(/(.{0,40}(lukla|everest|namche|kala patthar|solukhumbu).{0,40})/gi);
    console.log('Matches:', matches ? matches.slice(0, 10) : 'none');
  }
} else {
  console.log('section-packing not found');
}
