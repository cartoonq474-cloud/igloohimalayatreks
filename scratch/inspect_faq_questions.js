const fs = require('fs');
const html = fs.readFileSync('scratch/act_temp.html', 'utf8');
const m = html.match(/<section id="section-faqs"[\s\S]*?<\/section>/i);
if (m) {
  const cats = [...m[0].matchAll(/class="faq-category-btn[^"]*"\s+data-category="([^"]+)"/g)].map(x => x[1]);
  console.log('Categories:', cats);
  
  const items = [...m[0].matchAll(/<div class="faq-item"[\s\S]*?<button[^>]*class="faq-question-btn"[^>]*>([\s\S]*?)<\/button>/gi)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  console.log('Total FAQ items:', items.length);
  items.forEach((item, idx) => console.log(`${idx + 1}. ${item}`));
}
