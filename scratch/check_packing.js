const fs = require('fs');

const file = 'blog/everest-packing-checklist/index.html';
if (fs.existsSync(file)) {
  const html = fs.readFileSync(file, 'utf8');
  console.log('has faq-layout-container:', html.includes('faq-layout-container'));
  console.log('has faq:', html.toLowerCase().includes('faq'));
  const idx = html.toLowerCase().indexOf('frequently asked');
  console.log('idx of frequently asked:', idx);
  if (idx !== -1) {
    console.log(html.slice(idx - 100, idx + 500));
  }
} else {
  console.log('File does not exist');
}
