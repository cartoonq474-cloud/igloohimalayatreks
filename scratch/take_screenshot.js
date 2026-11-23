const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = path.join(os.tmpdir(), 'chrome_headless_' + Date.now());
const destDesktop = path.resolve('scratch/tilicho_desktop.png');
const destMobile = path.resolve('scratch/tilicho_mobile.png');
const url = 'http://localhost:3000/trek/annapurna-circuit-with-tilicho-lake/';

try {
  console.log('Taking desktop screenshot to', destDesktop);
  execSync(`"${chrome}" --headless=new --user-data-dir="${tempDir}" --screenshot="${destDesktop}" --window-size=1440,1080 --hide-scrollbars "${url}"`, { stdio: 'inherit', timeout: 15000 });

  console.log('Taking mobile screenshot to', destMobile);
  execSync(`"${chrome}" --headless=new --user-data-dir="${tempDir}" --screenshot="${destMobile}" --window-size=390,844 --hide-scrollbars "${url}"`, { stdio: 'inherit', timeout: 15000 });
} catch (e) {
  console.error('Error or timeout:', e.message);
}

console.log('Desktop exists:', fs.existsSync(destDesktop), fs.existsSync(destDesktop) ? fs.statSync(destDesktop).size : 0);
console.log('Mobile exists:', fs.existsSync(destMobile), fs.existsSync(destMobile) ? fs.statSync(destMobile).size : 0);

try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {}
