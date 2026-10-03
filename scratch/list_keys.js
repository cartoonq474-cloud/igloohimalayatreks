const fs = require('fs');
const code = fs.readFileSync('js/altitude-visualizer.js', 'utf8');
const keys = [...code.matchAll(/"([^"]+)":\s*\{\s*name:/g)].map(m => m[1]);
console.log('Keys in altitude-visualizer.js:', keys);

const weatherCode = fs.readFileSync('js/weather-visualizer.js', 'utf8');
const weatherKeys = [...weatherCode.matchAll(/"([^"]+)":\s*\{/g)].map(m => m[1]);
console.log('Keys in weather-visualizer.js:', weatherKeys);
