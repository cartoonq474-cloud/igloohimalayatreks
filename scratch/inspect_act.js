const fs = require('fs');
const path = require('path');

const actPath = path.join(__dirname, '../trek/annapurna-circuit-trek/index.html');
const html = fs.readFileSync(actPath, 'utf8');

console.log('File size:', Math.round(html.length / 1024), 'KB');
console.log('Total lines:', html.split('\n').length);

// Check current title and meta
const title = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', title ? title[1] : 'none');

// Check sections present
const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Sections present:', sections);

// Check key facts
const factsGrid = html.match(/<div class="trek-facts-grid"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
if (factsGrid) {
  const factItems = [...factsGrid[0].matchAll(/<span[^>]*class=["'][^"']*uppercase[^"']*["'][^>]*>([\s\S]*?)<\/span>[\s\S]*?<span[^>]*class=["'][^"']*(?:color-neutral-800|font-weight: 600)[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi)];
  console.log('Current Facts:');
  factItems.forEach(f => console.log(`  ${f[1].replace(/<[^>]+>/g,'').trim()}: ${f[2].replace(/<[^>]+>/g,'').trim()}`));
}

// Check current Itinerary Day 1 to 5
const itinerary = html.match(/<section[^>]*id=["']section-itinerary["'][\s\S]*?<\/section>/i);
if (itinerary) {
  const days = [...itinerary[0].matchAll(/<h4[^>]*class=["'][^"']*itinerary-day-title-new[^"']*["'][^>]*>([\s\S]*?)<\/h4>/gi)];
  console.log(`Current Itinerary Days (${days.length} total):`);
  days.forEach((d, idx) => console.log(`  Day ${idx+1}: ${d[1].replace(/<[^>]+>/g,'').trim()}`));
}
