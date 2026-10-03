const fs = require('fs');
const cards = JSON.parse(fs.readFileSync('scratch/all60_cards.json', 'utf8'));
console.log('Keys of first card:', Object.keys(cards[0]));
console.log('Sample first card:', cards[0]);
