const fs = require('fs');

['nepal-trekking-packages/index.html', 'nepal-trekking-packages.html'].forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('=== Checking', filePath, '===');
  console.log('Has region-pills-header:', content.includes('region-pills-header'));
  console.log('Has region-pills-title-icon:', content.includes('region-pills-title-icon'));
  console.log('Has region-pills-hint:', content.includes('region-pills-hint'));
  console.log('Has mobile horizontal scroll CSS:', content.includes('scroll-snap-type: x mandatory'));
  console.log('Has 10 destination pills:', (content.match(/class="region-quick-pill/g) || []).length);
});

const jsContent = fs.readFileSync('js/nepal-trek-packages.js', 'utf8');
console.log('=== Checking js/nepal-trek-packages.js ===');
console.log('Auto-scroll removed:', !jsContent.includes('window.scrollTo'));
