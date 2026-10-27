const fs = require('fs');

const html = fs.readFileSync('trek/gokyo-lakes-trek/index.html', 'utf8');

const subnavTabs = [...html.matchAll(/data-tab="([^"]+)"/g)].map(m => m[1]);
console.log('Subnav tabs found:', subnavTabs);

let allValid = true;
subnavTabs.forEach(tab => {
  const targetId = `id="section-${tab}"`;
  const exists = html.includes(targetId);
  console.log(`Tab [${tab}] -> Target [${targetId}]: ${exists ? 'EXISTS ✅' : 'MISSING ❌'}`);
  if (!exists) allValid = false;
});

if (!allValid) {
  process.exit(1);
} else {
  console.log('All subnav tabs perfectly match section IDs!');
}
