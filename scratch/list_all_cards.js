const fs = require('fs');

const content = fs.readFileSync('nepal-trekking-packages/index.html', 'utf8');

const regex = /<div class="card trek-item"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
// Let's parse cards more systematically
const cheerio = null; // if not available, let's parse using regex or simple DOM parser

// Let's check available cards by looking for headers inside card trek-item
const cardSplits = content.split('class="card trek-item"');
console.log('Number of split parts:', cardSplits.length - 1);

const cards = [];
for (let i = 1; i < cardSplits.length; i++) {
  const chunk = cardSplits[i];
  const titleMatch = chunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const linkMatch = chunk.match(/href="([^"]+)"/);
  const regionMatch = chunk.match(/data-region="([^"]*)"/); // wait, data-region was on the card opening tag
  const prevTagChunk = cardSplits[i-1].slice(-200);
  const dataRegionMatch = (prevTagChunk + 'class="card trek-item"' + chunk.slice(0, 100)).match(/data-region="([^"]*)"/);
  const dataDurationMatch = (prevTagChunk + 'class="card trek-item"' + chunk.slice(0, 100)).match(/data-duration="([^"]*)"/);
  const dataDifficultyMatch = (prevTagChunk + 'class="card trek-item"' + chunk.slice(0, 100)).match(/data-difficulty="([^"]*)"/);
  
  cards.push({
    index: i,
    title: titleMatch ? titleMatch[1].trim() : 'NO TITLE',
    link: linkMatch ? linkMatch[1] : 'NO LINK',
    region: dataRegionMatch ? dataRegionMatch[1] : 'NONE',
    duration: dataDurationMatch ? dataDurationMatch[1] : 'NONE',
    difficulty: dataDifficultyMatch ? dataDifficultyMatch[1] : 'NONE'
  });
}

console.log('Parsed cards summary:');
cards.forEach(c => {
  console.log(`${c.index}. [${c.region}] ${c.title} -> ${c.link} (${c.duration}, ${c.difficulty})`);
});
