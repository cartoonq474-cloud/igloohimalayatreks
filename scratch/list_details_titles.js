const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const secMatch = html.match(/<section id="section-details"[\s\S]*?<\/section>/i);
if (!secMatch) {
  console.log('section-details not found');
  process.exit(1);
}

const sec = secMatch[0];
const titles = [...sec.matchAll(/<h[34][^>]*class="[^"]*detail-accordion-title[^"]*"[^>]*>([\s\S]*?)<\/h[34]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Titles found:', titles.length);
titles.forEach((t, i) => console.log(`${i+1}. ${t}`));
