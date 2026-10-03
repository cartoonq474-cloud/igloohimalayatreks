const fs = require('fs');
const html = fs.readFileSync('trek/mardi-himal-trek/index.html', 'utf8');

const days = [...html.matchAll(/class="itinerary-day-title-new">([\s\S]*?)<\/h4>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Days in mardi-himal-trek:', days.length);
days.forEach((d, i) => console.log(`${i+1}. ${d}`));
