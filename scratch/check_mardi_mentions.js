const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const trekFolders = fs.readdirSync(trekDir).filter(f => {
  return fs.statSync(path.join(trekDir, f)).isDirectory() && fs.existsSync(path.join(trekDir, f, 'index.html'));
});

trekFolders.forEach(folder => {
  const filePath = path.join(trekDir, folder, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;

  if (folder !== 'mardi-himal-trek' && folder !== 'abc-with-mardi-himal-trek' && folder !== 'ghorepani-poon-hill-with-mardi-himal-trek') {
    if (faqMatch[0].includes('Mardi Himal Trek')) {
      console.log(`[CONTAINS 'Mardi Himal Trek'] ${folder}`);
    }
  }
});
