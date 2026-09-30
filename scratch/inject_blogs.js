const fs = require('fs');

let content = fs.readFileSync('blogs.html', 'utf8');

content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1464822759023-fed622ff2c3b\?[^"')\s]+/g, 'images/hero-himalayas.jpg');
content = content.replace(/(<img[^>]+src=["'])https:\/\/images\.unsplash\.com\/[^"']+([\"'][^>]+alt=["']Everest vs Annapurna["'])/, '$1images/everest-base-camp-vs-annapurna-base-camp-trek-which-one-should-you-choose-igloo-himalaya-t.jpg$2');
content = content.replace(/(<img[^>]+src=["'])https:\/\/images\.unsplash\.com\/[^"']+([\"'][^>]+alt=["']Gear Packing List["'])/, '$1images/everest-base-camp-trek-packing-list.jpg$2');
content = content.replace(/(<img[^>]+src=["'])https:\/\/images\.unsplash\.com\/[^"']+([\"'][^>]+alt=["']AMS Altitude Safety["'])/, '$1images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.jpg$2');
content = content.replace(/(<img[^>]+src=["'])https:\/\/images\.unsplash\.com\/[^"']+([\"'][^>]+alt=["']Teahouse Food Guide["'])/, '$1images/dal-bhat-nepals-iconic-traditional-dish.jpg$2');

fs.writeFileSync('blogs.html', content, 'utf8');
console.log('Updated blogs.html with authentic photography!');
