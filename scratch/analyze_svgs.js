const fs = require('fs');
const path = require('path');

const ebcHtml = fs.readFileSync(path.join(__dirname, '..', 'trek', 'everest-base-camp-trek', 'index.html'), 'utf8');
const svgs = ebcHtml.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];

console.log('Total SVGs in EBC page:', svgs.length);

const svgGroups = {};
svgs.forEach(s => {
  // Normalize whitespace
  const norm = s.replace(/\s+/g, ' ').trim();
  svgGroups[norm] = (svgGroups[norm] || 0) + 1;
});

const sorted = Object.entries(svgGroups).sort((a, b) => b[1] - a[1]);
console.log('Top repeated SVGs in a single trek page:');
sorted.slice(0, 15).forEach(([svg, count], idx) => {
  console.log(`[Group ${idx + 1}] Repeated ${count} times: ${svg.substring(0, 120)}... (Length: ${svg.length} chars)`);
});
