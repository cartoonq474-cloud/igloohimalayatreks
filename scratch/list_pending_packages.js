const fs = require('fs');
const path = require('path');

const cards = JSON.parse(fs.readFileSync('scratch/all60_cards.json', 'utf8'));
const trekDir = path.join(__dirname, '../trek');

const pending = [];

cards.forEach(c => {
  const slug = c.link.replace('../trek/', '').replace('/', '');
  const htmlPath = path.join(trekDir, slug, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (/http-equiv=["']refresh["']/i.test(html)) return; // skip redirects
    
    // Check if authentic
    const itinMatch = html.match(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i);
    let isEbc = true;
    if (itinMatch) {
      const itin = itinMatch[0];
      // If it's not Everest region, check if it mentions Lukla/Namche/Gorakshep
      if (c.region !== 'everest') {
        isEbc = itin.includes('Lukla') || itin.includes('Namche') || itin.includes('Gorakshep');
      } else {
        // If it's Everest region, check if it has the generic 14-day EBC text when it's supposed to be Gokyo or 3 passes or View trek
        if (c.days !== '14 Days' && [...itin.matchAll(/class=["']itinerary-card/gi)].length === 14) {
          isEbc = true;
        } else if (slug === 'everest-view-trek' && itin.includes('Gorak Shep')) {
          isEbc = true;
        } else if (slug === 'gokyo-lakes-trek' && !itin.includes('Gokyo Ri')) {
          isEbc = true;
        } else if (slug === 'everest-three-passes-trek' && !itin.includes('Kongma La')) {
          isEbc = true;
        } else {
          isEbc = false;
        }
      }
    }
    if (isEbc) {
      pending.push({
        slug,
        title: c.title,
        region: c.region,
        days: c.days,
        price: c.price,
        altitude: c.altitude
      });
    }
  }
});

console.log(`Total pending packages: ${pending.length}`);
const byRegion = {};
pending.forEach(p => {
  byRegion[p.region] = byRegion[p.region] || [];
  byRegion[p.region].push(p);
});

Object.keys(byRegion).forEach(reg => {
  console.log(`\n=== [${reg.toUpperCase()}] (${byRegion[reg].length} packages) ===`);
  byRegion[reg].forEach(p => console.log(`- [${p.slug}] ${p.title} (${p.days}, ${p.price}, max ${p.altitude})`));
});
