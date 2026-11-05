const fs = require('fs');
const orig = fs.readFileSync('scratch/backup_kanchenjunga_circuit_original.html', 'utf8');

const headEnd = orig.indexOf('</head>');
const head = orig.substring(0, headEnd);

const scripts = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('JSON-LD script count in head:', scripts.length);
scripts.forEach((s, i) => {
  try {
    const json = JSON.parse(s[1]);
    console.log(`Script ${i}: @type =`, json['@type'] || (json['@graph'] ? json['@graph'].map(x => x['@type']) : 'unknown'));
    if (json['@type'] === 'TouristTrip') {
      console.log('TouristTrip name:', json.name, 'offers:', json.offers);
    }
  } catch (e) {
    console.log(`Script ${i}: parse error`, e.message);
  }
});
