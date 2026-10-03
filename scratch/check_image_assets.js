const fs = require('fs');
const files = fs.readdirSync('images').filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

const regions = ['mardi', 'poon', 'annapurna', 'langtang', 'manaslu', 'mustang', 'dolpo', 'kanchenjunga', 'gokyo', 'chola', 'three-passes', 'view-trek', 'island-peak', 'mera', 'lobuche'];

regions.forEach(r => {
  const match = files.filter(f => f.toLowerCase().includes(r));
  console.log(`${r}: ${match.length} images`);
  if (match.length > 0 && match.length <= 10) {
    console.log('   ' + match.slice(0, 5).join(', '));
  }
});
