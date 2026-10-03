const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/annapurna-circuit-trek/index.html'), 'utf8');
const detailsMatch = html.match(/<section[^>]*id=["']section-details["'][\s\S]*?<\/section>/i);
if (detailsMatch) {
  const cards = [...detailsMatch[0].matchAll(/<div class="detail-accordion-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
  // Or match the header text
  const titles = [...detailsMatch[0].matchAll(/<span[^>]*class=["']detail-accordion-title-text["'][^>]*>([\s\S]*?)<\/span>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`Found ${titles.length} accordion cards:`);
  titles.forEach((t, i) => console.log(`  ${i+1}. ${t}`));
}
