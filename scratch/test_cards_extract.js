const fs = require('fs');

function checkCardStructure(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Let's find every comment or element that starts a card
  const cardRegex = /<!--\s*(?:Trek Card|New Package|Upper Mustang|Lower Dolpo|Chisapani|Kanchenjunga)[^>]*-->\s*<div class="card trek-item"[^>]*>([\s\S]*?)(?=<!--\s*(?:Trek Card|New Package|Upper Mustang|Lower Dolpo|Chisapani|Kanchenjunga)|<\/div>\s*<\/div>\s*<\/section>)/g;
  
  console.log('Testing card extraction on', filePath);
}

checkCardStructure('nepal-trekking-packages/index.html');
