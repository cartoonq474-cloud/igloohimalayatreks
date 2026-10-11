const fs = require('fs');

const pages = [
  'trek/everest-base-camp-trek/index.html',
  'trek/annapurna-circuit-trek/index.html',
  'trek/poon-hill-abc-trek/index.html',
  'trek/short-annapurna-base-camp-trek/index.html'
];

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  ['section-itinerary', 'section-faqs'].forEach(id => {
    const reg = new RegExp('<section id=\"' + id + '\"[\\s\\S]*?<\\/section>');
    const match = html.match(reg);
    if (match) {
      const secHtml = match[0];
      const openD = (secHtml.match(/<div(\s|>)/g) || []).length;
      const closeD = (secHtml.match(/<\/div>/g) || []).length;
      console.log(p, id, { openD, closeD, balanced: openD === closeD });
    } else {
      console.log(p, id, 'NOT FOUND');
    }
  });
});
