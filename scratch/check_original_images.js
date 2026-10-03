const fs = require('fs');
const content = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');

// Find all img tags in cards
const cardSplits = content.split('class="card trek-item"');
for (let i = 1; i < cardSplits.length; i++) {
  const c = cardSplits[i];
  const m = c.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/);
  if (m) {
    const local = m[1].replace('../', '');
    const exists = fs.existsSync(local);
    if (!exists) {
      console.log(`Card ${i} missing: ${m[1]} (${m[2]})`);
    }
  }
}
