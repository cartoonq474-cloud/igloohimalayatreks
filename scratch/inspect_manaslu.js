const fs = require('fs');
const files = [
  'trek/manaslu-circuit-trek/index.html',
  'trek/manaslu-tsum-valley-trek/index.html',
  'trek/tsum-valley-trek/index.html',
  'manaslu-region-treks/index.html'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const titleMatch = text.match(/<title>([^<]+)<\/title>/);
    const canonicalMatch = text.match(/<link rel="canonical" href="([^"]+)"/);
    const dayMatches = text.match(/\b\d+\s*DAYS\b/gi) || [];
    console.log(`File: ${f}`);
    console.log(`  Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    console.log(`  Canonical: ${canonicalMatch ? canonicalMatch[1] : 'N/A'}`);
    console.log(`  Day mentions: ${dayMatches.slice(0, 3).join(', ')}`);
  } else {
    console.log(`File missing: ${f}`);
  }
}
