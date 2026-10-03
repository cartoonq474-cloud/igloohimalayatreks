const fs = require('fs');

['trek/upper-mustang-trek/index.html', 'trek/lower-dolpo-trek/index.html'].forEach(p => {
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const details = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
    console.log(`${p}: section-details found? ${!!details} (length: ${details ? details[0].length : 0})`);
    if (details) {
      console.log('Sample content:', details[0].slice(0, 300));
    }
  }
});
