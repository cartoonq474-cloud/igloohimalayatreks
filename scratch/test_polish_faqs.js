const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

const filePath = path.join(__dirname, '../trek/kanchenjunga-circuit-trek/index.html');
let html = fs.readFileSync(filePath, 'utf8');

const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
let cleanTitle = titleMatch ? titleMatch[1].split('—')[0].trim() : 'Kanchenjunga Circuit Trek (22 Days)';
let duration = '22 Days';

// In section-faqs:
const faqsMatch = html.match(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i);
if (faqsMatch) {
  let f = faqsMatch[0];
  // Replace "Everest Base Camp trek" -> cleanTitle
  f = f.replace(/Everest Base Camp trek/gi, cleanTitle);
  f = f.replace(/Everest Base Camp/gi, cleanTitle);
  f = f.replace(/EBC trek/gi, cleanTitle);
  f = f.replace(/EBC/g, cleanTitle);
  // Replace standard duration
  f = f.replace(/takes 14 days round trip from Kathmandu\. This includes acclimatization rest days at [^.]*\./i,
    `takes ${duration} round trip from Kathmandu, expertly paced for acclimatization and wilderness discovery.`);

  html = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, f);
}

// In section-details:
const detailsMatch = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
if (detailsMatch) {
  let d = detailsMatch[0];
  d = d.replace(/Everest Base Camp trek/gi, cleanTitle);
  d = d.replace(/Everest Base Camp/gi, cleanTitle);
  d = d.replace(/EBC trek/gi, cleanTitle);
  d = d.replace(/EBC/g, cleanTitle);
  d = d.replace(/Dudh Koshi river/gi, 'mountain river valley');
  d = d.replace(/The standard [^.]* route is an out-and-back trail starting and ending in Bhadrapur\./gi,
    `The standard ${cleanTitle} route is an expertly designed circular circuit starting and ending in eastern Nepal.`);

  html = html.replace(/<section id=["']section-details["'][\s\S]*?<\/section>/i, d);
}

const balance = checkTagBalance(html);
console.log('Tag balance:', balance);
if (balance.errors.length === 0 && balance.unclosed.length === 0) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('SUCCESS: Updated FAQs and Details!');
}
