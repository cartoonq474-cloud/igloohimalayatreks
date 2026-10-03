const fs = require('fs');
const path = require('path');

// Read the 8 existing packages from build_missing_everest_packages.js
const missingJs = fs.readFileSync(path.join(__dirname, 'build_missing_everest_packages.js'), 'utf8');

// We can evaluate the trekPackages array from build_missing_everest_packages.js
const sandbox = {};
const fn = new Function('require', 'module', 'exports', missingJs + '\nreturn trekPackages;');
const existing8 = fn(require, {}, {});

console.log(`Loaded ${existing8.length} packages from build_missing_everest_packages.js:`);
existing8.forEach(p => console.log(`  - ${p.slug} (${p.duration})`));
