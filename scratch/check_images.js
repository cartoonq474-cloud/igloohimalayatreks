const fs = require('fs');
const files = [
  'images/langtang-gosaikunda-helambu-trek.webp',
  'images/langtang-gosaikunda-helambu-trek-02.webp',
  'images/langtang-gosaikunda-helambu-trek-03.webp',
  'images/langtang-gosaikunda-helambu-trek-difficulty-route-culture.webp',
  'images/langtang-gosaikunda-helambu-trek-difficulty-route-culture-02.webp',
  'images/langtang-valley-trek.webp',
  'images/gosaikunda-lake-trek.webp',
  'images/tamang-heritage-trail-trek.webp',
  'images/yala-peak-climbing.webp'
];

files.forEach(f => {
  console.log(`${f}: ${fs.existsSync(f) ? 'EXISTS (' + fs.statSync(f).size + ' bytes)' : 'MISSING'}`);
});
