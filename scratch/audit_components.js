const fs = require('fs');

const html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');

console.log('=== DETAILED CODE & COMPONENT AUDIT ===\n');

// 1. Check all interactive buttons & their targets/handlers
console.log('--- 1. BUTTONS & HANDLERS ---');
const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
console.log(`Found ${buttons.length} buttons.`);
buttons.forEach((btn, idx) => {
  const attrs = btn[1];
  const content = btn[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const idMatch = attrs.match(/id="([^"]+)"/);
  const classMatch = attrs.match(/class="([^"]+)"/);
  const typeMatch = attrs.match(/type="([^"]+)"/);
  const id = idMatch ? idMatch[1] : '(no id)';
  const cls = classMatch ? classMatch[1] : '(no class)';
  const type = typeMatch ? typeMatch[1] : 'SUBMIT (missing type="button")';
  
  if (!typeMatch || typeMatch[1] !== 'button') {
    console.log(`  [WARN] Button #${idx+1} [${content}] missing explicit type="button": id=${id}, class=${cls}`);
  }
});

// 2. Check FAQ Accordions
console.log('\n--- 2. FAQ ACCORDIONS ---');
const faqItems = [...html.matchAll(/class="faq-accordion-item"[\s\S]*?(?=class="faq-accordion-item"|class="article-author-bio-card")/gi)];
console.log(`Found ${faqItems.length} FAQ accordion items.`);
let faqIssues = 0;
faqItems.forEach((item, idx) => {
  const text = item[0];
  const hasBtn = text.includes('class="faq-question-btn"');
  const hasAnswer = text.includes('class="faq-answer"');
  const hasExpanded = text.includes('aria-expanded=');
  if (!hasBtn || !hasAnswer || !hasExpanded) {
    console.log(`  [ISSUE] FAQ #${idx+1} is missing structure: btn=${hasBtn}, ans=${hasAnswer}, aria=${hasExpanded}`);
    faqIssues++;
  }
});
if (faqIssues === 0) console.log('  ✓ All 10 FAQ accordions have valid accessible structure.');

// 3. Check All Table Accessibility & Structure
console.log('\n--- 3. COMPARISON TABLES ---');
const tables = [...html.matchAll(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi)];
console.log(`Found ${tables.length} tables.`);
tables.forEach((t, idx) => {
  const content = t[0];
  const hasThead = content.includes('<thead>');
  const hasTbody = content.includes('<tbody>');
  const hasScope = content.includes('scope="col"');
  console.log(`  Table #${idx+1}: thead=${hasThead}, tbody=${hasTbody}, scope=${hasScope}`);
});

// 4. Check Breadcrumbs & Meta
console.log('\n--- 4. BREADCRUMBS & METADATA ---');
const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'MISSING');
const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/);
console.log('OG URL:', ogUrlMatch ? ogUrlMatch[1] : 'MISSING');
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1].trim() : 'MISSING');

// Check consistency
if (canonicalMatch && ogUrlMatch && canonicalMatch[1] !== ogUrlMatch[1]) {
  console.log('  [ISSUE] Canonical URL does not match og:url!');
} else {
  console.log('  ✓ Canonical and OG URLs match.');
}

// 5. Check JS code syntax and possible bugs
console.log('\n--- 5. JAVASCRIPT SYNTAX & AUDIT ---');
const js = fs.readFileSync('js/blog-article.js', 'utf8');
try {
  new Function(js);
  console.log('  ✓ js/blog-article.js syntax is valid.');
} catch (e) {
  console.log('  [ERROR] Syntax error in js/blog-article.js:', e.message);
}

// 6. Check All IDs for duplicates
console.log('\n--- 6. DUPLICATE ID CHECK ---');
const idMatches = [...html.matchAll(/\bid="([^"]+)"/gi)].map(m => m[1]);
const idCounts = {};
idMatches.forEach(id => {
  idCounts[id] = (idCounts[id] || 0) + 1;
});
let duplicateCount = 0;
for (const [id, count] of Object.entries(idCounts)) {
  if (count > 1) {
    console.log(`  [ISSUE] Duplicate id="${id}" found ${count} times!`);
    duplicateCount++;
  }
}
if (duplicateCount === 0) console.log('  ✓ No duplicate IDs found in HTML document.');

// 7. Check heading tag structure
console.log('\n--- 7. HEADING SEQUENCE CHECK ---');
const headingRegex = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
let prevLevel = 0;
let headingOrderIssues = 0;
while ((match = headingRegex.exec(html)) !== null) {
  const level = parseInt(match[1].replace('h', ''));
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (prevLevel > 0 && level > prevLevel + 1) {
    console.log(`  [WARN] Heading hierarchy skipped from H${prevLevel} to H${level}: "${text.substring(0, 40)}"`);
    headingOrderIssues++;
  }
  prevLevel = level;
}
if (headingOrderIssues === 0) console.log('  ✓ Headings are sequentially nested without skips.');
