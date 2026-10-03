const fs = require('fs');
const { checkTagBalance } = require('./build_act_includes.js');

const html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const balance = checkTagBalance(html);
console.log('--- TAG BALANCE ---');
console.log('Errors:', balance.errors.length, 'Unclosed:', balance.unclosed.length);
if (balance.errors.length > 0 || balance.unclosed.length > 0) {
  console.log('Errors detail:', balance.errors);
  console.log('Unclosed detail:', balance.unclosed);
} else {
  console.log('TAG BALANCE IS 100% PERFECT (0 errors, 0 unclosed)!');
}

console.log('--- METADATA & TITLE ---');
const title = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', title ? title[1] : 'NOT FOUND');
const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
console.log('Meta Description:', metaDesc ? metaDesc[1] : 'NOT FOUND');

console.log('--- SCHEMAS ---');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
schemas.forEach((s, idx) => {
  try {
    const parsed = JSON.parse(s[1]);
    console.log(`Schema ${idx + 1} valid JSON: YES`);
    if (parsed['@graph']) {
      parsed['@graph'].forEach(g => {
        console.log(`  - Type: ${g['@type']}, Name: ${g.name || g.headline || 'N/A'}`);
      });
    } else {
      console.log(`  - Type: ${parsed['@type']}, Name: ${parsed.name || 'N/A'}`);
    }
  } catch (e) {
    console.log(`Schema ${idx + 1} valid JSON: NO (${e.message})`);
  }
});
