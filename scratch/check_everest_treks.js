const fs = require('fs');
const path = require('path');

const everestSlugs = [
  'ebc-trek-with-island-peak',
  'everest-base-camp-chola-pass-gokyo-trek',
  'everest-base-camp-luxury-trek',
  'everest-base-camp-trek',
  'everest-base-camp-trek-road-based',
  'everest-base-camp-trek-without-flight',
  'everest-base-camp-via-gokyo-lakes',
  'everest-base-camp-with-island-peak-climb',
  'everest-chola-and-renjo-la-pass-trek',
  'everest-three-passes-trek',
  'everest-view-trek',
  'gokyo-lake-trek-with-helicopter-return',
  'gokyo-lake-with-renjo-la-pass-trek',
  'gokyo-lakes-and-cho-la-pass',
  'gokyo-lakes-luxury-trek',
  'gokyo-lakes-trek',
  'island-peak-climbing',
  'lobuche-peak-climbing',
  'lobuche-peak-climbing-trek',
  'mera-peak',
  'mera-peak-climbing',
  'three-high-passes-with-island-peak-climb'
];

everestSlugs.forEach(slug => {
  const p = path.join(__dirname, '../trek', slug, 'index.html');
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const title = html.match(/<title>([\s\S]*?)<\/title>/i);
    const dayCount = [...html.matchAll(/class="itinerary-day-title-new"/gi)].length;
    console.log(`${slug}: ${dayCount} days | Title: ${title ? title[1] : 'none'}`);
  }
});
