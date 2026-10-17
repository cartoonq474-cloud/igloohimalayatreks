const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../trek/abc-with-mardi-himal-trek/index.html');
const html = fs.readFileSync(file, 'utf8');

function inspectSection(id, endTag) {
  const start = html.indexOf(`id="${id}"`);
  if (start === -1) {
    console.log(`NOT FOUND: ${id}`);
    return;
  }
  let end = -1;
  if (endTag) {
    end = html.indexOf(endTag, start);
  }
  const snippet = html.slice(start, end !== -1 ? end : start + 1200);
  console.log(`\n=================== ${id} ===================`);
  console.log(snippet.slice(0, 1000));
}

inspectSection('section-overview', 'id="section-itinerary"');
inspectSection('section-itinerary', 'id="section-includes"');
inspectSection('section-includes', 'id="section-dates"');
inspectSection('section-dates', 'id="section-packing"');
inspectSection('section-packing', 'id="section-details"');
inspectSection('section-details', 'id="section-altitude-profile"');
inspectSection('section-altitude-profile', 'id="section-weather"');
inspectSection('section-weather', 'id="section-map"');
inspectSection('section-faqs', '</section>');
