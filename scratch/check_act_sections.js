const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../trek/annapurna-circuit-trek/index.html'), 'utf8');

function checkSection(id) {
  const match = html.match(new RegExp(`<section[^>]*id=["']${id}["'][\\s\\S]*?<\\/section>`, 'i'));
  if (match) {
    const text = match[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`\n=== SECTION #${id} (${text.length} chars) ===`);
    console.log(text.slice(0, 300) + '...');
    const hasLukla = text.includes('Lukla');
    const hasEverest = text.includes('Everest');
    const hasThorong = text.includes('Thorong');
    const hasAnnapurna = text.includes('Annapurna');
    console.log(`Contains: Lukla=${hasLukla}, Everest=${hasEverest}, Thorong=${hasThorong}, Annapurna=${hasAnnapurna}`);
  } else {
    console.log(`Missing section: ${id}`);
  }
}

['section-overview', 'section-includes', 'section-details', 'section-altitude-profile', 'section-weather', 'section-faqs'].forEach(checkSection);
