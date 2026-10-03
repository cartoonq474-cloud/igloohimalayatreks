const fs = require('fs');

const content = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');

const cardSplits = content.split('class="card trek-item"');
const cards = [];

for (let i = 1; i < cardSplits.length; i++) {
  const prevChunk = cardSplits[i-1];
  const chunk = cardSplits[i];

  // Data attributes on opening tag
  const combinedTag = prevChunk.slice(-150) + 'class="card trek-item"' + chunk.slice(0, 100);
  const regionMatch = combinedTag.match(/data-region="([^"]*)"/);
  const durationMatch = combinedTag.match(/data-duration="([^"]*)"/);
  const difficultyMatch = combinedTag.match(/data-difficulty="([^"]*)"/);

  // Image
  const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/);
  const image = imgMatch ? imgMatch[1] : '';
  const alt = imgMatch ? imgMatch[2] : '';

  // Badge
  const badgeMatch = chunk.match(/<span class="badge badge-alpine"[^>]*>([\s\S]*?)<\/span>/);
  const badge = badgeMatch ? badgeMatch[1].trim() : '';

  // Title
  const titleMatch = chunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Desc
  const descMatch = chunk.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : '';

  // Meta spans
  const spansMatch = chunk.match(/<div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0\.85rem; color: var\(--color-neutral-700\);">([\s\S]*?)<\/div>/);
  const rawSpans = spansMatch ? spansMatch[1] : '';

  // Parse days, alt, difficulty text
  const daysMatch = rawSpans.match(/⏱️\s*([0-9]+\s*Days)/i) || rawSpans.match(/([0-9]+\s*Days)/i);
  const days = daysMatch ? daysMatch[1] : '';

  const altMatch = rawSpans.match(/([0-9,]+\s*m)/);
  const altitude = altMatch ? altMatch[1] : '';

  // Difficulty text: e.g. "Challenging", "Moderate", "Easy to Moderate", etc.
  let diffText = 'Moderate';
  if (rawSpans.includes('Extreme')) diffText = 'Extreme';
  else if (rawSpans.includes('Strenuous')) diffText = 'Strenuous';
  else if (rawSpans.includes('Challenging')) diffText = 'Challenging';
  else if (rawSpans.includes('Easy to Moderate') || rawSpans.includes('Easy–Moderate')) diffText = 'Easy to Moderate';
  else if (rawSpans.includes('Easy')) diffText = 'Easy';
  else if (rawSpans.includes('Moderate')) diffText = 'Moderate';

  // Price
  let price = '';
  const pMatch = chunk.match(/\$([0-9,]+)/);
  if (pMatch) {
    price = '$' + pMatch[1];
  } else {
    // Check known price corrections
    if (title.includes('Annapurna Luxury')) price = '$1,690';
    else if (title.includes('Annapurna Circuit Luxury')) price = '$1,990';
    else if (title.includes('Gokyo Lake Trek with Heli')) price = '$1,990';
    else if (title.includes('Everest Base Camp (Road Based)')) price = '$1,450';
    else if (title.includes('Upper Mustang Jeep')) price = '$1,990';
    else price = '$990';
  }

  // Link
  const hrefMatches = [...chunk.matchAll(/href="([^"]+)"/g)];
  let link = '';
  for (const hm of hrefMatches) {
    if (hm[1].includes('../trek/')) {
      link = hm[1];
    }
  }
  // Fallback for broken cards
  if (title.includes('Gokyo Lake Trek with Heli')) link = '../trek/gokyo-lake-trek-with-helicopter-return/';
  if (title.includes('Everest Base Camp (Road Based)')) link = '../trek/everest-base-camp-trek-without-flight/';
  if (title.includes('Upper Mustang Jeep')) link = '../trek/upper-mustang-jeep-tour/';
  if (title.includes('Rolwaling Valley Trek')) link = '../trek/rolwaling-valley-trek/';

  cards.push({
    index: i,
    region: regionMatch ? regionMatch[1] : 'everest',
    duration: durationMatch ? durationMatch[1] : 'medium',
    difficulty: difficultyMatch ? difficultyMatch[1] : 'moderate',
    image,
    alt,
    badge,
    title,
    desc,
    days,
    altitude,
    difficultyText: diffText,
    price,
    link
  });
}

console.log('Parsed', cards.length, 'cards with all original assets.');
cards.forEach(c => {
  console.log(`${c.index}. [${c.region}] ${c.title} | ${c.price} | ${c.days} | ${c.altitude} | ${c.difficultyText} | ${c.link}`);
});

fs.writeFileSync('scratch/original_cards_clean.json', JSON.stringify(cards, null, 2));
