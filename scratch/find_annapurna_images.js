const fs = require('fs');

const files = fs.readdirSync('images');
const abcImgs = files.filter(f => f.includes('annapurna-base-camp') && f.endsWith('.webp'));
const mardiImgs = files.filter(f => f.includes('mardi') && f.endsWith('.webp'));
const poonImgs = files.filter(f => f.includes('poon') && f.endsWith('.webp'));
const sanctuaryImgs = files.filter(f => f.includes('sanctuary') && f.endsWith('.webp'));

console.log('ABC webp images:', abcImgs.length, abcImgs.slice(0, 6));
console.log('Mardi webp images:', mardiImgs.length, mardiImgs.slice(0, 6));
console.log('Poon webp images:', poonImgs.length, poonImgs.slice(0, 6));
console.log('Sanctuary webp images:', sanctuaryImgs.length, sanctuaryImgs.slice(0, 6));
