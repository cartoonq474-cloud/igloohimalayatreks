const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('scratch/verified_14_tours.json', 'utf8'));

console.log('--- Tour Filters Logic Test ---');
console.log('Total Tours:', tours.length);

function filterTours(searchVal = '', categoryVal = 'all', durationVal = 'all', sortVal = 'default') {
  let filtered = tours.filter(t => {
    const title = t.title.toLowerCase();
    const desc = t.desc.toLowerCase();
    const tags = (t.categoryLabel + ' ' + t.slug).toLowerCase();
    const search = searchVal.trim().toLowerCase();

    let matchSearch = !search || title.includes(search) || desc.includes(search) || tags.includes(search);
    let matchCategory = categoryVal === 'all' || t.category === categoryVal;
    let matchDuration = durationVal === 'all' || t.durationCat === durationVal;

    return matchSearch && matchCategory && matchDuration;
  });

  if (sortVal === 'price-low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortVal === 'price-high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  } else if (sortVal === 'duration-short') {
    filtered.sort((a, b) => a.daysNum - b.daysNum);
  } else if (sortVal === 'duration-long') {
    filtered.sort((a, b) => b.daysNum - a.daysNum);
  }

  return filtered;
}

// Tests
console.log('1. All tours:', filterTours().length, '(Expected 14)');
console.log('2. Cultural:', filterTours('', 'cultural').length, '(Expected 4)');
console.log('3. Nature:', filterTours('', 'nature').length, '(Expected 4)');
console.log('4. Heli:', filterTours('', 'heli').map(t => t.title));
console.log('5. Overland:', filterTours('', 'overland').map(t => t.title));
console.log('6. Hikes/Cycling:', filterTours('', 'hikes').map(t => t.title));
console.log('7. Search "rara":', filterTours('rara').map(t => t.title));
console.log('8. Search "helicopter":', filterTours('helicopter').map(t => t.title));
console.log('9. Price low to high top 3:', filterTours('', 'all', 'all', 'price-low').slice(0, 3).map(t => `${t.title} (${t.price})`));
console.log('10. Duration long top 3:', filterTours('', 'all', 'all', 'duration-long').slice(0, 3).map(t => `${t.title} (${t.days})`));

// Check HTML integrity
const html = fs.readFileSync('nepal-tour-packages/index.html', 'utf8');
const cardCount = (html.match(/class="card tour-item"/g) || []).length;
console.log('HTML Card Count in nepal-tour-packages/index.html:', cardCount, '(Expected 14)');

const html2 = fs.readFileSync('nepal-tour-packages.html', 'utf8');
const cardCount2 = (html2.match(/class="card tour-item"/g) || []).length;
console.log('HTML Card Count in nepal-tour-packages.html:', cardCount2, '(Expected 14)');

if (cardCount === 14 && cardCount2 === 14) {
  console.log('✅ ALL 14 TOUR PACKAGES CORRECTLY EMBEDDED IN BOTH HTML FILES!');
} else {
  console.error('❌ Mismatch in card count!');
}
