const fs = require('fs');
const path = require('path');
const { articles } = require('../data/blog/articles');

function parseCSVRow(str) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '"') {
      if (inQuotes && str[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  result.push(cur.trim());
  return result;
}

const lines = fs.readFileSync('target_sheet.csv', 'utf8').split(/\r?\n/).filter(Boolean);
const sheetRows = lines.slice(1).map(l => parseCSVRow(l));

let matchedCount = 0;
let unmatchedArticles = [];

for (const a of articles) {
  const cleanSlug = a.slug.replace(/^\//, '').replace(/\/$/, '');
  const rowMatch = sheetRows.find(r => {
    const oldClean = r[1].replace(/^\//, '').replace(/\/$/, '');
    const newClean = r[2].replace(/^\//, '').replace(/\/$/, '');
    return oldClean === cleanSlug || newClean === cleanSlug;
  });
  if (rowMatch) {
    matchedCount++;
  } else {
    unmatchedArticles.push(cleanSlug);
  }
}

console.log('Total articles in data/blog/articles.js:', articles.length);
console.log('Articles matched to rows in target_sheet.csv:', matchedCount);
console.log('Articles NOT in target_sheet.csv:', unmatchedArticles.length);
if (unmatchedArticles.length > 0) {
  console.log('Unmatched articles:', unmatchedArticles);
}
