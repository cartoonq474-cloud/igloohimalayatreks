const fs = require('fs');
const html = fs.readFileSync('trek/kanchenjunga-circuit-trek/index.html', 'utf8');
const items = [...html.matchAll(/<div class="faq-item"[\s\S]*?(?=<div class="faq-item"|<\/div>\s*<\/div>\s*<\/section>)/gi)];
console.log('Total items in Kanchenjunga Circuit:', items.length);
if (items.length > 0) {
  console.log('First FAQ Item:\n', items[0][0].trim());
  console.log('\nSecond FAQ Item:\n', items[1][0].trim());
}
