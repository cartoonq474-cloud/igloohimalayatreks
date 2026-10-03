const fs = require('fs');
const path = require('path');

// Rephrase delayA in scratch/generate_all_trek_faqs_data.js for Pikey Peak
let code = fs.readFileSync('scratch/generate_all_trek_faqs_data.js', 'utf8');
code = code.replace(/Because there are no Lukla flights involved/g, 'Because there are no domestic mountain flights involved');
fs.writeFileSync('scratch/generate_all_trek_faqs_data.js', code, 'utf8');
console.log('Updated Pikey Peak delayA phrasing in scratch/generate_all_trek_faqs_data.js');

// Also update pikey-peak-trek/index.html directly
const pikeyPath = path.join(__dirname, '../trek/pikey-peak-trek/index.html');
let pikeyHtml = fs.readFileSync(pikeyPath, 'utf8');
pikeyHtml = pikeyHtml.replace(/Because there are no Lukla flights involved/g, 'Because there are no domestic mountain flights involved');
fs.writeFileSync(pikeyPath, pikeyHtml, 'utf8');
console.log('Updated pikey-peak-trek/index.html');
