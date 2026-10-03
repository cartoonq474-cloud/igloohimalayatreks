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

let allPassed = true;

sectionIds.forEach((id, idx) => {
  const startTag = `<section id="${id}"`;
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) {
    console.log(`✗ Section ${idx + 1} (#${id}): Section tag NOT found`);
    allPassed = false;
    return;
  }

  const endH2Idx = html.indexOf('</h2>', startIdx);
  if (endH2Idx === -1) {
    console.log(`✗ Section ${idx + 1} (#${id}): </h2> tag NOT found`);
    allPassed = false;
    return;
  }

  const afterH2 = html.substring(endH2Idx + 5, endH2Idx + 300).trim();
  if (afterH2.startsWith('<figure class="article-figure">')) {
    // extract img src
    const imgMatch = afterH2.match(/src="([^"]+)"/);
    const imgSrc = imgMatch ? imgMatch[1] : 'unknown';
    console.log(`✓ Section ${idx + 1} (#${id}): H2 is followed IMMEDIATELY by image (${imgSrc})`);
  } else {
    console.log(`✗ Section ${idx + 1} (#${id}): H2 is NOT followed immediately by <figure>. Found: ${afterH2.substring(0, 50)}...`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n=== ALL 16 SECTIONS VERIFIED: Every H2 heading has an authentic image directly below it! ===');
} else {
  console.log('\n=== SOME SECTIONS FAILED ===');
}
