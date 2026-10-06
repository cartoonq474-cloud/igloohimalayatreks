const fs = require('fs');
const path = require('path');

// Native CSV row splitter
function parseCSVRow(str) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '"') {
      if (inQuotes && str[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

const csvContent = fs.readFileSync('target_sheet.csv', 'utf8');
const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
const header = parseCSVRow(lines[0]);
console.log('Headers:', header);

const sheetRows = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVRow(lines[i]);
  sheetRows.push({
    raw: lines[i],
    origin: row[0],
    oldUrl: row[1],
    newUrl: row[2],
    status: row[3],
    category: row[4],
    title: row[5],
    region: row[6],
    duration: row[7],
    altitude: row[8],
    optimizations: row[9],
    seoValue: row[10]
  });
}

console.log('Total data rows in sheet:', sheetRows.length);

// Breakdown by Page Origin
const originCounts = {};
const statusCounts = {};
const categoryCounts = {};

for (const r of sheetRows) {
  originCounts[r.origin] = (originCounts[r.origin] || 0) + 1;
  statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
  categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
}

console.log('\nPage Origin counts:');
console.table(originCounts);

console.log('\nHTTP Status counts:');
console.table(statusCounts);

console.log('\nCategory counts:');
console.table(categoryCounts);
