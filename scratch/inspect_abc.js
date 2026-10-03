const fs = require('fs');
const html = fs.readFileSync('trek/annapurna-base-camp/index.html', 'utf8');

const title = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', title ? title[1] : 'none');

const itinH2 = html.match(/<section id=["']section-itinerary["'][\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/i);
console.log('Itinerary H2:', itinH2 ? itinH2[1].replace(/<[^>]+>/g, '').trim() : 'none');

const day1 = html.match(/<h4 class="itinerary-day-title-new">([\s\S]*?)<\/h4>/i);
console.log('Day 1:', day1 ? day1[1].replace(/<[^>]+>/g, '').trim() : 'none');
