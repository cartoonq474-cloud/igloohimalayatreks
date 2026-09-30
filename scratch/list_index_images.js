const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all <img> tags and their contexts
const imgRegex = /<img[^>]*>/gi;
let m;
let i = 0;
while ((m = imgRegex.exec(html)) !== null) {
  i++;
  const tag = m[0];
  const srcMatch = tag.match(/src=["']([^"']+)["']/i);
  const altMatch = tag.match(/alt=["']([^"']+)["']/i);
  const src = srcMatch ? srcMatch[1] : 'NO_SRC';
  const alt = altMatch ? altMatch[1] : '';
  
  // Find surrounding context (e.g. parent section or class)
  const start = Math.max(0, m.index - 150);
  const snippet = html.substring(start, m.index);
  const parentMatch = snippet.match(/class=["']([^"']+)["']/g);
  const lastClass = parentMatch ? parentMatch[parentMatch.length - 1] : '';

  console.log(`[${i}] src="${src}" | alt="${alt}" | ${lastClass}`);
}
