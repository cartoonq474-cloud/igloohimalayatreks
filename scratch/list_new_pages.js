const fs = require('fs');

const csvRaw = fs.readFileSync('igloo_himalaya_treks_url_mapping_and_optimization_sheet.csv', 'utf8');
const lines = csvRaw.split('\n');

const newPages = [];
lines.forEach(line => {
  if (line.includes('BRAND NEW PAGE ADDED')) {
    // Basic CSV parse
    const match = line.match(/^"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
    if (match) {
      newPages.push({
        origin: match[1],
        oldUrl: match[2],
        newUrl: match[3],
        status: match[4],
        category: match[5],
        title: match[6]
      });
    }
  }
});

console.log(`Found ${newPages.length} brand new pages:`);
newPages.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.category}] ${p.title} -> ${p.newUrl}`);
});
