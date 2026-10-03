const fs = require('fs');
const path = require('path');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

console.log(`Total trek directories with index.html: ${dirs.length}`);

const report = [];

dirs.forEach(slug => {
  const htmlPath = path.join(trekDir, slug, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Check if redirect
  if (/http-equiv=["']refresh["']/i.test(html)) {
    report.push({ slug, status: 'REDIRECT' });
    return;
  }

  // Check title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'NO TITLE';

  // Check itinerary
  const itinMatch = html.match(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i);
  let itinStatus = 'MISSING';
  let daysCount = 0;
  let hasEbcInItin = false;
  let firstDayTitle = '';

  if (itinMatch) {
    const itinHtml = itinMatch[0];
    const cards = [...itinHtml.matchAll(/<div class=["']itinerary-card[^"']*["']/gi)];
    daysCount = cards.length;
    // Check if EBC
    hasEbcInItin = itinHtml.includes('Lukla') || itinHtml.includes('Namche') || itinHtml.includes('Tengboche') || itinHtml.includes('Gorakshep') || itinHtml.includes('Everest Base Camp');
    const firstDayMatch = itinHtml.match(/<h4 class=["']itinerary-day-title-new["'][^>]*>([\s\S]*?)<\/h4>/i);
    firstDayTitle = firstDayMatch ? firstDayMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    itinStatus = hasEbcInItin ? 'EBC_BOILERPLATE' : 'AUTHENTIC';
  }

  report.push({
    slug,
    title,
    daysCount,
    itinStatus,
    firstDayTitle: firstDayTitle.slice(0, 50)
  });
});

console.log('\n--- ACTIVE TREK PAGES SUMMARY ---');
const authentic = report.filter(r => r.itinStatus === 'AUTHENTIC');
const ebcBoilerplate = report.filter(r => r.itinStatus === 'EBC_BOILERPLATE');
const redirects = report.filter(r => r.status === 'REDIRECT');

console.log(`Authentic itineraries: ${authentic.length}`);
console.log(`EBC Boilerplate itineraries: ${ebcBoilerplate.length}`);
console.log(`Redirects: ${redirects.length}`);

console.log('\n--- LIST OF AUTHENTIC TREKS ---');
authentic.forEach(r => console.log(`✓ [${r.slug}] (${r.daysCount} days) - ${r.firstDayTitle}`));

console.log('\n--- LIST OF EBC BOILERPLATE TREKS (NEED OPTIMIZATION) ---');
ebcBoilerplate.forEach(r => console.log(`✗ [${r.slug}] (${r.daysCount} days)`));
