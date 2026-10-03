const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_chrome_out.png');

console.log('Capturing screenshot to', outPath);
execSync(`"${chrome}" --headless --disable-gpu --window-size=1536,900 --screenshot="${outPath}" http://localhost:3000/trek/upper-mustang-trek/`, { stdio: 'inherit' });
console.log('Done. Exists:', fs.existsSync(outPath), 'Size:', fs.existsSync(outPath) ? fs.statSync(outPath).size : 0);
