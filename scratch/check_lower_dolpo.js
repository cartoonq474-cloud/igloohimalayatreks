const fs = require('fs');
const html = fs.readFileSync('trek/lower-dolpo-trek/index.html', 'utf8');
const itin = html.match(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i);
if (itin) {
  const matches = [...itin[0].matchAll(/(.{0,40}(namche|lukla|kala patthar|everest).{0,40})/gi)];
  console.log('Matches in lower-dolpo section-itinerary:', matches.length);
  matches.slice(0, 5).forEach(m => console.log(m[0].replace(/\n/g, ' ')));
} else {
  console.log('No section-itinerary found');
}
