const fs = require('fs');

const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');
const cats = {};
const matches = [...html.matchAll(/data-category="([^"]+)"/g)];
matches.forEach(m => {
  const cat = m[1];
  cats[cat] = (cats[cat] || 0) + 1;
});
console.log('FAQ Categories Breakdown:', cats);
console.log('Total categorized FAQ items:', matches.length);

const tabMatches = [...html.matchAll(/class="faq-cat-btn[^"]*"\s+role="tab"[^>]*data-cat="([^"]+)"/g)];
console.log('Category Tabs in Nav:', tabMatches.map(m => m[1]));
