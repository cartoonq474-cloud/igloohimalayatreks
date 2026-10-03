const fs = require('fs');
const path = require('path');

['everest-base-camp-luxury-trek', 'annapurna-luxury-trek', 'island-peak-climbing'].forEach(folder => {
  const filePath = path.join(__dirname, '../trek', folder, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const m = html.match(/id=["']faq-cat-permits["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  console.log(`\n================ ${folder} ================`);
  if (m) {
    console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  }
});
