const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tests = [
  {
    name: 'ams_desktop_hero.png',
    size: '1440,900',
    url: 'http://localhost:3000/blog/how-to-prevent-altitude-sickness/'
  },
  {
    name: 'ams_desktop_table.png',
    size: '1440,900',
    url: 'http://localhost:3000/blog/how-to-prevent-altitude-sickness/#barometric-pressure-hypoxia'
  },
  {
    name: 'ams_desktop_faq.png',
    size: '1440,900',
    url: 'http://localhost:3000/blog/how-to-prevent-altitude-sickness/#frequently-asked-questions'
  },
  {
    name: 'ams_mobile_hero.png',
    size: '375,812',
    url: 'http://localhost:3000/blog/how-to-prevent-altitude-sickness/'
  }
];

for (const t of tests) {
  const outPath = path.resolve(__dirname, t.name);
  if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  console.log(`Capturing ${t.name} (${t.size})...`);
  try {
    execSync(`"${chrome}" --headless --disable-gpu --window-size=${t.size} --screenshot="${outPath}" ${t.url}`, { stdio: 'inherit' });
    const ok = fs.existsSync(outPath);
    console.log(`Result: ${t.name} -> Exists: ${ok}, Size: ${ok ? (fs.statSync(outPath).size / 1024).toFixed(1) + ' KB' : '0'}`);
  } catch (err) {
    console.error(`Error capturing ${t.name}:`, err.message);
  }
}
