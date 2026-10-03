const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

const srcPath = path.join(__dirname, 'act_temp.html');
const destPath = path.join(__dirname, '../trek/annapurna-circuit-trek/index.html');

const content = fs.readFileSync(srcPath, 'utf8');

const balance = checkTagBalance(content);
if (balance.errors.length > 0 || balance.unclosed.length > 0) {
  console.error('ABORTING: Tag balance errors detected:', balance);
  process.exit(1);
}

fs.writeFileSync(destPath, content, 'utf8');

const written = fs.readFileSync(destPath, 'utf8');
const destBalance = checkTagBalance(written);
console.log('Destination written successfully! Size:', written.length);
console.log('Destination Tag Balance - Errors:', destBalance.errors.length, 'Unclosed:', destBalance.unclosed.length);
