const fs = require('fs');
const path = require('path');

function walk(dir) {
  let r = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === '.git' || f === 'node_modules' || f === 'scratch') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (f.endsWith('.html')) r.push(p);
  }
  return r;
}

const remotePattern = 'https://igloohimalayatreks.com/wp-content/uploads/2025/07/Igloo_Himalaya.png';
const files = walk('.');
let updated = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes(remotePattern)) {
    // Determine relative depth
    const parts = f.split(path.sep);
    const depth = parts.length - 1;
    let localPath = 'images/logo.png';
    if (depth === 1) {
      localPath = '../images/logo.png';
    } else if (depth === 2) {
      localPath = '../../images/logo.png';
    } else if (depth >= 3) {
      localPath = '../'.repeat(depth) + 'images/logo.png';
    }

    content = content.replaceAll(remotePattern, localPath);
    fs.writeFileSync(f, content, 'utf8');
    updated++;
  }
}

console.log(`Successfully updated logo in ${updated} HTML files to reliable local paths.`);
