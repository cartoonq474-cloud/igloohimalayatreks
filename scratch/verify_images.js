const fs = require('fs');

const rawContent = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');

// Let's examine our parsed cards
// We already parsed 57 cards earlier.
// Let's print out all images to verify they exist on disk.
const testScript = require('./scratch/parse_all_cards.js');
