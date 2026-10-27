const fs = require('fs');

const testImages = [
  'images/gokyo lake trek.webp',
  'images/gokyo-Lake-trek.webp',
  'images/gokyo-Lake-trek1.webp',
  'images/gokyo-lake-trek2.webp',
  'images/Gokyo-lake-trek3.webp',
  'images/best-time-for-gokyo-lakes-trek-02.webp',
  'images/everest-base-camp-01.webp',
  'images/renjo-la-pass-01.webp',
  'images/cho-la-pass-01.webp'
];

testImages.forEach(img => {
  console.log(img, fs.existsSync(img) ? 'EXISTS' : 'MISSING');
});
