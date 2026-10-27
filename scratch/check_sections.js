const fs = require('fs');

function checkFile(file) {
  console.log('=== ' + file + ' ===');
  const html = fs.readFileSync(file, 'utf8');
  const lines = html.split('\n');
  lines.forEach(l => {
    if (l.includes('<section') && l.includes('id=')) {
      console.log(l.trim());
    }
  });
}

checkFile('trek/gokyo-lakes-trek/index.html');
checkFile('trek/gokyo-lake-with-renjo-la-pass-trek/index.html');
