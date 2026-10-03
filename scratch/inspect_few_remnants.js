const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

const isEverest = (slug) => [
  'everest-base-camp-trek', 'everest-base-camp-luxury-trek', 'everest-base-camp-trek-without-flight',
  'everest-base-camp-via-gokyo-lakes', 'everest-three-passes-trek', 'everest-view-trek',
  'gokyo-lake-trek-with-helicopter-return', 'gokyo-lakes-and-cho-la-pass', 'gokyo-lakes-luxury-trek',
  'gokyo-lakes-trek', 'island-peak-climbing', 'lobuche-peak-climbing', 'mera-peak-climbing',
  'three-high-passes-with-island-peak-climb'
].includes(slug);

dirs.forEach(slug => {
  const p = path.join(trekDir, slug, 'index.html');
  const html = fs.readFileSync(p, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;
  const isEv = isEverest(slug);

  // Overview
  const overMatch = html.match(/<section id=["']section-overview["'][\s\S]*?(?=<div class=["']rich-highlights)/i);
  if (!isEv && overMatch && /Everest Base Camp/i.test(overMatch[0])) {
    console.log(`[Overview EBC] ${slug}`);
  }

  // Region
  if (!isEv) {
    const regMatch = html.match(/Trek Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
    if (regMatch && regMatch[1].trim().toLowerCase() === 'everest') {
      console.log(`[Region Everest] ${slug}`);
    }
  }

  // Details
  const detMatch = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
  if (!isEv && detMatch && /EBC trek/i.test(detMatch[0])) {
    const lines = detMatch[0].split('\n').filter(l => /EBC trek/i.test(l));
    console.log(`[Details EBC] ${slug}: ${lines.length} lines (sample: ${lines[0].trim().slice(0, 70)})`);
  }
});
