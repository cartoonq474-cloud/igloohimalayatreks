const fs = require('fs');
const path = require('path');

['annapurna-base-camp-trek', 'annapurna-circuit-trek', 'manaslu-circuit-trek', 'langtang-valley-trek'].forEach(folder => {
  const filePath = path.join(__dirname, '../trek', folder, 'index.html');
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');
  const m = html.match(/id=["']faq-cat-permits["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  console.log(`\n================ ${folder} ================`);
  if (m) {
    console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400));
  }
});
