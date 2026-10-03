const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

console.log(`=== MASTER AUDIT OF ALL ${dirs.length} TREK PACKAGES ===\n`);

const isEverestRegion = (slug) => {
  const everestSlugs = [
    'everest-base-camp-trek',
    'everest-base-camp-luxury-trek',
    'everest-base-camp-trek-without-flight',
    'everest-base-camp-via-gokyo-lakes',
    'everest-three-passes-trek',
    'everest-view-trek',
    'gokyo-lake-trek-with-helicopter-return',
    'gokyo-lakes-and-cho-la-pass',
    'gokyo-lakes-luxury-trek',
    'gokyo-lakes-trek',
    'island-peak-climbing',
    'lobuche-peak-climbing',
    'mera-peak-climbing',
    'three-high-passes-with-island-peak-climb',
    'pikey-peak-trek' // lower solu
  ];
  return everestSlugs.includes(slug);
};

let redirectCount = 0;
let activeCount = 0;
let tagErrorCount = 0;
let nonEverestWithEbcBoilerplate = 0;
let missingItineraryCount = 0;
let missingIncludesCount = 0;
let missingHighlightsCount = 0;

const activeResults = [];

dirs.forEach(slug => {
  const filePath = path.join(trekDir, slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  if (/http-equiv=["']refresh["']/i.test(html)) {
    redirectCount++;
    return;
  }

  activeCount++;

  // 1. Tag balance
  const balance = checkTagBalance(html);
  const tagOk = balance.errors.length === 0 && balance.unclosed.length === 0;
  if (!tagOk) tagErrorCount++;

  // 2. Itinerary check
  const itinMatch = html.match(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i);
  let daysCount = 0;
  let hasItin = !!itinMatch;
  let firstDay = '';
  if (itinMatch) {
    const cards = [...itinMatch[0].matchAll(/<div class=["']itinerary-card[^"']*["']/gi)];
    daysCount = cards.length;
    const fMatch = itinMatch[0].match(/<h4 class=["']itinerary-day-title-new["'][^>]*>([\s\S]*?)<\/h4>/i);
    firstDay = fMatch ? fMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  } else {
    missingItineraryCount++;
  }

  // 3. EBC boilerplate check on non-Everest pages
  let ebcAnomaly = false;
  if (!isEverestRegion(slug) && itinMatch) {
    const txt = itinMatch[0];
    if (txt.includes('Lukla') || txt.includes('Namche Bazaar') || txt.includes('Tengboche') || txt.includes('Gorakshep') || txt.includes('Kala Patthar')) {
      ebcAnomaly = true;
      nonEverestWithEbcBoilerplate++;
    }
  }

  // 4. Includes check
  const hasIncludes = /<section id=["']section-includes["'][\s\S]*?<\/section>/i.test(html);
  if (!hasIncludes) missingIncludesCount++;

  // 5. Highlights check
  const hasHighlights = html.includes('rich-highlights-container');
  if (!hasHighlights) missingHighlightsCount++;

  // 6. Title
  const tMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = tMatch ? tMatch[1].trim() : 'NO TITLE';

  activeResults.push({
    slug,
    title,
    daysCount,
    firstDay: firstDay.slice(0, 45),
    tagOk,
    hasItin,
    ebcAnomaly,
    hasIncludes,
    hasHighlights
  });
});

console.log(`Summary Statistics:`);
console.log(`- Total Directories: ${dirs.length}`);
console.log(`- Redirect Stubs: ${redirectCount}`);
console.log(`- Active Trek Pages: ${activeCount}`);
console.log(`- Pages with Tag Balance Errors: ${tagErrorCount}`);
console.log(`- Non-Everest pages with EBC Boilerplate in Itinerary: ${nonEverestWithEbcBoilerplate}`);
console.log(`- Pages missing Itinerary: ${missingItineraryCount}`);
console.log(`- Pages missing Inclusions/Exclusions: ${missingIncludesCount}`);
console.log(`- Pages missing Highlights: ${missingHighlightsCount}`);

console.log(`\nDetailed Active Treks (${activeResults.length} packages):`);
activeResults.sort((a, b) => a.slug.localeCompare(b.slug)).forEach((r, idx) => {
  const statusMark = (r.tagOk && r.hasItin && !r.ebcAnomaly && r.hasIncludes && r.hasHighlights) ? '✓' : '✗';
  console.log(`${String(idx + 1).padStart(2, ' ')}. [${statusMark}] ${r.slug.padEnd(46, ' ')} (${String(r.daysCount).padStart(2, ' ')}D) : ${r.firstDay}`);
});
