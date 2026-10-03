const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scratch').filter(f => f.endsWith('.js'));
files.forEach(f => {
  const content = fs.readFileSync(path.join('scratch', f), 'utf8');
  ['khopra-ridge-trek', 'tilicho-lake-trek', 'nar-phu-valley-trek', 'mohare-danda-trek', 'panchase-trek'].forEach(slug => {
    if (content.includes(slug)) {
      console.log(`Found ${slug} in scratch/${f}`);
    }
  });
});
