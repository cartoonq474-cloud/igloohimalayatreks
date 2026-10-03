const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const m = html.match(/<section id="section-reviews"[\s\S]*?<\/section>/i);
if (m) {
  console.log('section-reviews length:', m[0].length);
  const reviewTitles = [...m[0].matchAll(/<h4[^>]*class="[^"]*review-author[^"]*"[^>]*>([\s\S]*?)<\/h4>/gi)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  console.log('Review authors:', reviewTitles);
  const reviewTexts = [...m[0].matchAll(/<div[^>]*class="[^"]*review-text-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  reviewTexts.slice(0, 5).forEach((t, i) => console.log(`${i+1}. ${t.substring(0, 150)}...`));
}
