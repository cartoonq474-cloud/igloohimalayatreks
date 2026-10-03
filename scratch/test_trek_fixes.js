const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const folders = fs.readdirSync(trekDir).filter(f => {
  return fs.statSync(path.join(trekDir, f)).isDirectory() && fs.existsSync(path.join(trekDir, f, 'index.html'));
});

const updates = [];

folders.forEach(f => {
  const filePath = path.join(trekDir, f, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const faqMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!faqMatch) return;

  const h2Match = faqMatch[0].match(/<h2[^>]*class=["']faq-section-accent-title["'][^>]*>([\s\S]*?)<\/h2>/i);
  if (!h2Match) return;

  const h2 = h2Match[1].replace(/<[^>]+>/g, '').trim();

  // Get clean H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let cleanTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : f;
  cleanTitle = cleanTitle.replace(/\s*\(\d+\s*Days?.*?\)/i, '').replace(/\s*\(\d+m.*?\)/i, '').replace(/\s*—.*$/, '').trim();

  // Special cases if H1 had something generic
  if (f === 'langtang-gosaikunda-helambu-trek') cleanTitle = 'Langtang Gosaikunda Helambu Trek';
  if (f === 'tamang-heritage-trail-with-langtang-valley-trek') cleanTitle = 'Tamang Heritage Trail with Langtang Valley Trek';
  if (f === 'yala-peak-climbing') cleanTitle = 'Yala Peak Climbing';

  let needsH2Fix = false;
  if (h2.includes('Mardi Himal Trek') && !f.includes('mardi')) needsH2Fix = true;
  if (h2.includes('Everest Base Camp Trek') && f !== 'everest-base-camp-trek' && f !== 'chisapani-nagarkot-trek') {
    // Only if folder doesn't have ebc
    if (!f.includes('everest-base-camp')) needsH2Fix = true;
  }
  if (f === 'chisapani-nagarkot-trek') needsH2Fix = true;

  const hasMardiPermit = faqMatch[0].includes('What permits are required for Mardi Himal Trek?') && !f.includes('mardi');

  if (needsH2Fix || hasMardiPermit) {
    updates.push({
      folder: f,
      oldH2: h2,
      newTitle: cleanTitle,
      needsH2Fix,
      hasMardiPermit
    });
  }
});

console.log(`Found ${updates.length} trek pages needing title/question fixes:`);
updates.forEach(u => {
  console.log(`- ${u.folder}: "${u.oldH2}" -> "Frequently Asked Questions for ${u.newTitle}" (hasMardiPermit: ${u.hasMardiPermit})`);
});
