const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Parse target_sheet.csv
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

const lines = fs.readFileSync('target_sheet.csv', 'utf8').split(/\r?\n/).filter(Boolean);
const sheetRows = lines.slice(1).map(line => {
  const r = parseCSVRow(line);
  return {
    raw: line,
    origin: r[0],
    oldUrl: r[1],
    newUrl: r[2],
    status: r[3],
    category: r[4],
    title: r[5],
    region: r[6],
    duration: r[7],
    altitude: r[8],
    optimizations: r[9],
    seoValue: r[10]
  };
});

// 2. Discover all actual pages on disk
function getAllHtmlPages(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (['node_modules', '.git', 'scratch', '.gemini'].includes(f)) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getAllHtmlPages(full, list);
    } else if (f.endsWith('.html')) {
      list.push(path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return list;
}

const actualFiles = getAllHtmlPages(ROOT);
console.log(`Total actual HTML files on disk: ${actualFiles.length}`);

// Convert actual file paths to website URLs:
// e.g. "index.html" -> "/"
// "contact.html" -> "/contact.html"
// "trek/everest-base-camp-trek/index.html" -> "/trek/everest-base-camp-trek/"
// "best-hiking-places-near-kathmandu/index.html" -> "/best-hiking-places-near-kathmandu/"
// "team/pemba-sherpa.html" -> "/team/pemba-sherpa.html"

const fileToUrl = (file) => {
  if (file === 'index.html') return '/';
  if (file.endsWith('/index.html')) {
    return '/' + file.slice(0, -'index.html'.length);
  }
  return '/' + file;
};

const actualUrls = new Set(actualFiles.map(fileToUrl));
console.log(`Total unique URLs on disk: ${actualUrls.size}`);

// Check which sheet URLs actually exist on disk as 200 OK
let matching200 = 0;
let sheet200MissingOnDisk = [];
let sheetRedirects = [];

for (const row of sheetRows) {
  const cleanNewUrl = row.newUrl;
  if (row.status.includes('200 OK')) {
    if (actualUrls.has(cleanNewUrl)) {
      matching200++;
    } else {
      sheet200MissingOnDisk.push(row);
    }
  } else {
    sheetRedirects.push(row);
  }
}

console.log(`Sheet rows marked 200 OK that exist on disk: ${matching200}`);
console.log(`Sheet rows marked 200 OK that do NOT exist on disk: ${sheet200MissingOnDisk.length}`);
if (sheet200MissingOnDisk.length > 0) {
  console.log('Sample missing 200 OK:', sheet200MissingOnDisk.slice(0, 5).map(r => r.newUrl));
}

// Check which actual disk URLs are marked as 301 in the sheet!
const actualUrlsMarkedAsRedirectInSheet = [];
for (const row of sheetRedirects) {
  // Check if oldUrl or newUrl exists as a real file on disk
  const oldAsUrl = row.oldUrl.endsWith('/') ? row.oldUrl : row.oldUrl + '/';
  const oldPlain = row.oldUrl.replace(/\/$/, '');
  
  if (actualUrls.has(row.oldUrl) || actualUrls.has(oldAsUrl) || actualUrls.has(oldPlain + '/')) {
    actualUrlsMarkedAsRedirectInSheet.push(row);
  }
}

console.log(`Sheet rows marked as 301 Redirect that ACTUALLY exist on disk as full pages: ${actualUrlsMarkedAsRedirectInSheet.length}`);
if (actualUrlsMarkedAsRedirectInSheet.length > 0) {
  console.log('Sample actual pages marked as 301:', actualUrlsMarkedAsRedirectInSheet.slice(0, 10).map(r => ({
    oldUrl: r.oldUrl,
    newUrl: r.newUrl,
    status: r.status,
    title: r.title
  })));
}

// Check actual URLs completely missing from sheet
const sheetUrlSet = new Set(sheetRows.map(r => r.newUrl).concat(sheetRows.map(r => r.oldUrl)));
const actualUrlsMissingFromSheet = [];
for (const u of actualUrls) {
  const uTrim = u.replace(/\/$/, '');
  const uSlash = u.endsWith('/') ? u : u + '/';
  if (!sheetUrlSet.has(u) && !sheetUrlSet.has(uTrim) && !sheetUrlSet.has(uSlash)) {
    actualUrlsMissingFromSheet.push(u);
  }
}
console.log(`Actual website URLs completely missing from sheet: ${actualUrlsMissingFromSheet.length}`);
console.log('Sample missing actual URLs:', actualUrlsMissingFromSheet.slice(0, 15));
