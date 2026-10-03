const fs = require('fs');
const html = fs.readFileSync('c:/Users/ASUS/Desktop/igloohimalayatreks/trek/manaslu-circuit-trek/index.html', 'utf8');
const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];

const itemRegex = /<div class="faq-item">[\s\S]*?<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-item-answer">([\s\S]*?)<\/div>\s*<\/div>/gi;
let m;
let idx = 1;
while ((m = itemRegex.exec(section)) !== null) {
  console.log(`\n--- FAQ #${idx} ---`);
  console.log('Q:', m[1].replace(/<[^>]+>/g, '').trim());
  console.log('A:', m[2].replace(/<[^>]+>/g, '').trim());
  idx++;
}
