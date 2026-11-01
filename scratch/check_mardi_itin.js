const fs = require('fs');

const html = fs.readFileSync('trek/mardi-himal-trek/index.html', 'utf8');
const itinIdx = html.indexOf('id="section-itinerary"');
console.log(html.slice(itinIdx, itinIdx + 2000));
