const fs = require('fs');
const path = require('path');

const targets = [
  'everest-three-passes-trek',
  'gokyo-lakes-trek',
  'gokyo-lakes-and-cho-la-pass',
  'everest-view-trek',
  'everest-base-camp-via-gokyo-lakes'
];

fs.readdirSync('scratch').filter(f => f.endsWith('.js') || f.endsWith('.json')).forEach(f => {
  const content = fs.readFileSync(path.join('scratch', f), 'utf8');
  targets.forEach(t => {
    if (content.includes(`'${t}'`) || content.includes(`"${t}"`)) {
      console.log(`Found ${t} in scratch/${f}`);
    }
  });
});
