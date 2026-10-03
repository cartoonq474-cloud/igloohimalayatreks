const fs = require('fs');
const path = require('path');

const files = [
  'build_missing_annapurna_treks.js',
  'build_missing_langtang_packages.js',
  'build_missing_manaslu_package.js',
  'build_mustang_packages.js',
  'build_dolpo_packages.js',
  'build_kanchenjunga_packages.js'
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    const code = fs.readFileSync(p, 'utf8');
    const slugs = [...code.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    console.log(`\n=== ${f} (${slugs.length} packages) ===`);
    console.log(slugs.join(', '));
  }
});
