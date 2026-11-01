const fs = require('fs');
['trek/yala-peak-climbing/index.html', 'trek/tamang-heritage-trail-with-langtang-valley-trek/index.html', 'trek/langtang-valley-trek/index.html', 'trek/kanchenjunga-circuit-trek/index.html'].forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const hasSubnav = html.includes('href="#section-details"');
  console.log(f, 'hasSubnav:', hasSubnav);
});
