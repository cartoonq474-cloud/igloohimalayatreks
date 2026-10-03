const fs = require('fs');
const html = fs.readFileSync('trek/annapurna-base-camp/index.html', 'utf8');

const days = [...html.matchAll(/<h4 class="itinerary-day-title-new">([\s\S]*?)<\/h4>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Total days in annapurna-base-camp:', days.length);
days.forEach((d, i) => console.log(`${i+1}. ${d}`));
