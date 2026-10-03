const fs = require('fs');

const content = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');

// Find the section between id="treks-container" and </main>
const startMarker = '<div class="grid grid-3" id="treks-container">';
const startIdx = content.indexOf(startMarker) + startMarker.length;
const endMarker = '<!-- Footer -->';
const endIdx = content.indexOf(endMarker);

const gridContent = content.slice(startIdx, endIdx);

// Let's find each card
// A card starts with `<div class="card trek-item"`
const rawCards = gridContent.split('<div class="card trek-item"');
console.log('Split into', rawCards.length - 1, 'cards');

const parsed = [];
for (let i = 1; i < rawCards.length; i++) {
  const c = rawCards[i];
  
  // Extract attributes on the card div tag
  const attrEnd = c.indexOf('>');
  const attrs = c.slice(0, attrEnd);
  const region = (attrs.match(/data-region="([^"]*)"/) || [])[1] || '';
  const duration = (attrs.match(/data-duration="([^"]*)"/) || [])[1] || '';
  const difficulty = (attrs.match(/data-difficulty="([^"]*)"/) || [])[1] || '';

  // Image
  const imgMatch = c.match(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/);
  const imgSrc = imgMatch ? imgMatch[1] : '';
  const imgAlt = imgMatch ? imgMatch[2] : '';

  // Badge
  const badgeMatch = c.match(/<span class="badge badge-alpine"[^>]*>([\s\S]*?)<\/span>/);
  const badge = badgeMatch ? badgeMatch[1].trim() : '';

  // Title
  const titleMatch = c.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Description
  const descMatch = c.match(/<p style="font-size: 0\.9rem; color: var\(--color-neutral-600\); margin-bottom: 16px;">([\s\S]*?)<\/p>/) || c.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : '';

  // Meta spans (duration, alt, difficulty)
  // Let's find spans inside the meta container
  const metaSpansMatch = c.match(/<div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0\.85rem; color: var\(--color-neutral-700\);">([\s\S]*?)<\/div>/);
  const metaSpans = metaSpansMatch ? metaSpansMatch[1] : '';

  // Price
  // Notice the price regex: look for $ or number
  const priceMatch = c.match(/\$([0-9,]+)/) || c.match(/,([0-9]+)/);
  let price = priceMatch ? priceMatch[0] : '';
  if (price.startsWith(',')) price = '$1' + price; // fix `,690` -> `$1,690`, `,990` -> `$1,990`, `,450` -> `$1,450`

  // Link
  const linkMatches = [...c.matchAll(/href="([^"]+)"/g)];
  // usually the last href in the card is the button
  const link = linkMatches.length > 0 ? linkMatches[linkMatches.length - 1][1] : '';

  parsed.push({
    index: i,
    title,
    region,
    duration,
    difficulty,
    imgSrc,
    imgAlt,
    badge,
    desc,
    price,
    link,
    rawMeta: metaSpans.replace(/\s+/g, ' ').trim()
  });
}

console.log('Successfully extracted', parsed.length, 'cards:');
parsed.forEach(p => {
  console.log(`${p.index}. [${p.region}] ${p.title} | ${p.price} | ${p.link} | ${p.badge}`);
});
