const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'index.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('Total characters:', css.length);
console.log('Total lines:', css.split('\n').length);

// Count selectors
const selectors = css.match(/([^{]+)\{/g) || [];
console.log('Total rule blocks:', selectors.length);

// Check comments / sections
const comments = css.match(/\/\*[\s\S]*?\*\//g) || [];
console.log('Total comments:', comments.length);
const sectionHeaders = comments.filter(c => c.length < 150 && (c.includes('===') || c.includes('---') || c.includes('SECTION') || c.includes('Module') || c.includes('COMPONENT')));
console.log('\nMain CSS sections identified:');
sectionHeaders.slice(0, 30).forEach(h => console.log('  ', h.replace(/\n/g, ' ').trim()));

// Check for duplicate rules / selectors
const selectorCounts = {};
selectors.forEach(s => {
  const clean = s.replace(/\{/, '').trim();
  selectorCounts[clean] = (selectorCounts[clean] || 0) + 1;
});
const duplicates = Object.entries(selectorCounts).filter(([_, count]) => count > 3).sort((a, b) => b[1] - a[1]);
console.log(`\nSelectors defined more than 3 times (${duplicates.length} found):`);
duplicates.slice(0, 15).forEach(([sel, count]) => console.log(`  - "${sel}": ${count} times`));
