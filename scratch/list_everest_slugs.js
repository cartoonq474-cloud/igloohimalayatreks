const fs = require('fs');
const content = fs.readFileSync('scratch/build_missing_everest_packages.js', 'utf8');

const matches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total packages in build_missing_everest_packages.js:', matches.length);
console.log('Slugs:', matches);
