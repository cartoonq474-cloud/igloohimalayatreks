const fs = require('fs');

const dirs = fs.readdirSync('tour').filter(d => fs.statSync('tour/' + d).isDirectory() && d !== 'images');
const list = [];

dirs.forEach(d => {
  const p = 'tour/' + d + '/index.html';
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const metaDescMatch = html.match(/<meta name="description" content="([^"]*)"/);
    const imgMatch = html.match(/<img[^>]+src="(?:\.\.\/)*images\/([^"]+)"/);
    
    // Extract price
    let price = 'N/A';
    const jsonLd = html.match(/"price":\s*"([0-9,]+)"/);
    if (jsonLd) price = jsonLd[1];
    else {
      const pMatch = html.match(/\$([0-9,]+)/);
      if (pMatch) price = pMatch[1];
    }

    // Extract days
    let days = 'Day Tour';
    const daysMatch = html.match(/<span[^>]*class="[^"]*badge[^"]*"[^>]*>([0-9]+\s*DAYS?)<\/span>/i) || html.match(/([0-9]+(?:\s*to\s*[0-9]+)?\s*Days?)/i);
    if (daysMatch) days = daysMatch[1];

    list.push({
      folder: d,
      h1: titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : d,
      price: price,
      days: days,
      metaDesc: metaDescMatch ? metaDescMatch[1] : '',
      image: imgMatch ? imgMatch[1] : ''
    });
  }
});

console.log('Total tours found in /tour/:', list.length);
list.forEach((item, i) => console.log(`${i+1}. [${item.folder}] ${item.h1} | $${item.price} | ${item.days}`));

fs.writeFileSync('scratch/all_tour_packages.json', JSON.stringify(list, null, 2));
