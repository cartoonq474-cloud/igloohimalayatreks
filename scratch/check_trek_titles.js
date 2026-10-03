const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const trekFolders = fs.readdirSync(trekDir).filter(f => {
  return fs.statSync(path.join(trekDir, f)).isDirectory() && fs.existsSync(path.join(trekDir, f, 'index.html'));
});

console.log(`Checking ${trekFolders.length} trek folders...`);

trekFolders.forEach(folder => {
  const filePath = path.join(trekDir, folder, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return; // skip redirect stubs

  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) {
    console.log(`[NO FAQ] ${folder}`);
    return;
  }
  const h2Match = faqMatch[0].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const h2 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : 'NO H2';
  
  // Extract package title from <title> or <h1>
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : folder;

  // Check if H2 mentions another trek
  if (h2.toLowerCase().includes('mardi himal') && !folder.includes('mardi')) {
    console.log(`[TITLE MISMATCH] ${folder} -> H1: "${h1.slice(0,30)}..." | H2: "${h2}"`);
  }
});
