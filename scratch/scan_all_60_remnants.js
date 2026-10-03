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

let overviewEbcCount = 0;
let sidebarDaysMismatch = 0;
let datesEbcCount = 0;
let regionMismatch = 0;
let detailsEbcCount = 0;

dirs.forEach(slug => {
  const p = path.join(trekDir, slug, 'index.html');
  const html = fs.readFileSync(p, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html)) return;

  const isEv = isEverest(slug);

  // Overview
  const overMatch = html.match(/<section id=["']section-overview["'][\s\S]*?(?=<div class=["']rich-highlights)/i);
  if (!isEv && overMatch && /Everest Base Camp/i.test(overMatch[0])) {
    overviewEbcCount++;
  }

  // Sidebar
  const sideDays = html.match(/<a href=["']#section-itinerary["'][^>]*>([^<]+)<\/a>/i);
  if (sideDays) {
    // Check if it matches duration in facts bar
    const factDur = html.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
    if (factDur && !sideDays[1].toLowerCase().includes(factDur[1].split(' ')[0].toLowerCase())) {
      sidebarDaysMismatch++;
    }
  }

  // Dates
  if (!isEv && /Dates & Availability for EBC/i.test(html)) {
    datesEbcCount++;
  }

  // Region
  if (!isEv) {
    const regMatch = html.match(/Trek Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
    if (regMatch && regMatch[1].trim().toLowerCase() === 'everest') {
      regionMismatch++;
    }
  }

  // Details
  const detMatch = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
  if (!isEv && detMatch && /EBC trek/i.test(detMatch[0])) {
    detailsEbcCount++;
  }
});

console.log(`Scan Results across 60 Active Packages:`);
console.log(`- Overview with EBC copy on non-Everest: ${overviewEbcCount}`);
console.log(`- Sidebar duration mismatch: ${sidebarDaysMismatch}`);
console.log(`- Dates heading with "EBC": ${datesEbcCount}`);
console.log(`- Region showing "Everest" on non-Everest: ${regionMismatch}`);
console.log(`- Details section with "EBC trek": ${detailsEbcCount}`);
