const fs = require('fs');
const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');

const sectionIds = [
  'at-a-glance',
  'everest-base-camp-experience',
  'annapurna-circuit-experience',
  'difficulty-and-fitness',
  'altitude-and-acclimatization',
  'scenery-and-landscape',
  'culture-and-local-experience',
  'trek-duration-and-itinerary',
  'cost-and-budget-breakdown',
  'teahouses-food-and-accommodation',
  'crowds-and-trail-experience',
  'best-time-to-trek',
  'permits-and-logistics',
  'which-trek-is-better-for-beginners',
  'which-trek-should-you-choose',
  'frequently-asked-questions'
];

sectionIds.forEach((id, index) => {
  const startTag = `<section id="${id}"`;
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) {
    console.log(`[${index + 1}] MISSING SECTION: ${id}`);
    return;
  }
  const nextSectionIdx = html.indexOf('<section id="', startIdx + startTag.length);
  const endIdx = nextSectionIdx !== -1 ? nextSectionIdx : html.indexOf('</article>', startIdx);
  const sectionContent = html.substring(startIdx, endIdx);

  const h2Match = sectionContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  const h2 = h2Match ? h2Match[1].trim() : 'NO H2';
  const hasFigure = sectionContent.includes('class="article-figure"');
  const figureMatches = sectionContent.match(/<img[^>]+src="([^">]+)"/g) || [];

  console.log(`[${index + 1}] #${id}`);
  console.log(`    Heading: ${h2}`);
  console.log(`    Images count: ${figureMatches.length}`);
  figureMatches.forEach(img => console.log(`      - ${img}`));
});
