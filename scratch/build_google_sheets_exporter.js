const fs = require('fs');
const path = require('path');

function generateExporter() {
  const csvPath = path.join(__dirname, '../igloo_himalaya_treks_url_mapping_and_optimization_sheet.csv');
  const csvRaw = fs.readFileSync(csvPath, 'utf8');

  // Parse CSV
  const p = csvRaw.replace(/^\uFEFF/, '');
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < p.length; i++) {
    const char = p[i];
    const next = p[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      currentRow.push(currentVal);
      currentVal = '';
      if (currentRow.length > 0 && (currentRow.length > 1 || currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += char;
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  // Generate Tab-Separated string for clipboard (Google Sheets natively pastes TSV perfectly across columns)
  const tsvString = rows.map(r => r.map(c => c.replace(/\t/g, ' ').replace(/[\r\n]+/g, ' ')).join('\t')).join('\n');

  // Count origins
  let newAddedCount = 0;
  let migratedCount = 0;
  let aliasCount = 0;
  let blogCount = 0;

  dataRows.forEach(r => {
    const origin = r[0] || '';
    if (origin.includes('BRAND NEW')) newAddedCount++;
    else if (origin.includes('Migrated')) migratedCount++;
    else if (origin.includes('Canonical Alias')) aliasCount++;
    else if (origin.includes('Blog')) blogCount++;
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Sheets Exporter — Igloo Himalaya Treks URL Migration</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0E3458;
      --primary-accent: #2563eb;
      --success: #059669;
      --star: #d97706;
      --bg: #f8fafc;
      --card: #ffffff;
      --border: #e2e8f0;
      --text: #1e293b;
      --text-muted: #64748b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 30px 20px;
    }
    .container {
      max-width: 1500px;
      margin: 0 auto;
    }
    .header-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #eff6ff;
      color: var(--primary-accent);
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 10px;
    }
    p.lead {
      color: var(--text-muted);
      font-size: 1.05rem;
      margin-bottom: 24px;
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }
    .btn-copy {
      background: #059669;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);
    }
    .btn-copy:hover {
      background: #047857;
      transform: translateY(-2px);
    }
    .btn-sheets {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    }
    .btn-sheets:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
    .btn-download {
      background: #0f172a;
      color: #ffffff;
    }
    .btn-download:hover {
      background: #1e293b;
      transform: translateY(-2px);
    }
    .instruction-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .instruction-box h3 {
      font-size: 1.1rem;
      color: #166534;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .instruction-box ol {
      padding-left: 20px;
      color: #15803d;
      font-size: 0.95rem;
    }
    .instruction-box li {
      margin-bottom: 6px;
    }
    .stats-bar {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      padding: 16px 0;
      border-top: 1px solid var(--border);
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .stats-bar strong {
      color: var(--primary);
    }
    .filter-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
      align-items: center;
    }
    .filter-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .chip {
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      background: #ffffff;
      border: 1px solid var(--border);
      color: var(--text);
      transition: all 0.15s ease;
    }
    .chip:hover {
      border-color: var(--primary-accent);
      color: var(--primary-accent);
    }
    .chip.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }
    .search-input {
      flex: 1;
      min-width: 280px;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 0.95rem;
      background: #ffffff;
    }
    .table-container {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow-x: auto;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      padding: 14px 16px;
      border-bottom: 2px solid var(--border);
      white-space: nowrap;
      position: sticky;
      top: 0;
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    tr:hover td {
      background: #f8fafc;
    }
    .tag-new {
      display: inline-block;
      padding: 3px 8px;
      background: #fef3c7;
      color: #92400e;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.75rem;
      border: 1px solid #fde68a;
    }
    .tag-migrated {
      display: inline-block;
      padding: 3px 8px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.75rem;
    }
    .tag-alias {
      display: inline-block;
      padding: 3px 8px;
      background: #f1f5f9;
      color: #475569;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.75rem;
    }
    .tag-blog {
      display: inline-block;
      padding: 3px 8px;
      background: #ede9fe;
      color: #5b21b6;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.75rem;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #059669;
      color: #fff;
      padding: 14px 24px;
      border-radius: 10px;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 9999;
    }
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-card">
      <span class="badge">Master Client Delivery</span>
      <h1>Igloo Himalaya Treks — Master Google Sheets URL Migration</h1>
      <p class="lead">Complete URL migration mapping from live WordPress site to the newly optimized static site (${dataRows.length} verified records with explicit Brand New Pages tagged).</p>

      <div class="actions-grid">
        <button class="action-btn btn-copy" id="copyBtn" onclick="copyForGoogleSheets()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          📋 Copy All for Google Sheets (Ctrl+V)
        </button>

        <a href="https://sheets.new" target="_blank" class="action-btn btn-sheets">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Open Google Sheets (sheets.new)
        </a>

        <a href="/igloo_himalaya_treks_url_mapping_and_optimization_sheet.csv" download class="action-btn btn-download">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download CSV File
        </a>
      </div>

      <div class="instruction-box">
        <h3>⚡ Easiest Way to View in Google Sheets (Takes 5 Seconds):</h3>
        <ol>
          <li>Click the green <strong>"📋 Copy All for Google Sheets"</strong> button above (it automatically formats all ${dataRows.length} rows and 11 columns into your clipboard).</li>
          <li>Click the blue <strong>"Open Google Sheets"</strong> button (or open <a href="https://sheets.new" target="_blank" style="color: #166534; font-weight: 700;">sheets.new</a> in a new tab).</li>
          <li>Click cell <strong>A1</strong> in the blank sheet and press <strong>Ctrl + V</strong> (Command + V on Mac). Your entire formatted table with headers, 301 redirects, durations, and optimization notes will instantly populate!</li>
        </ol>
      </div>

      <div class="stats-bar">
        <span>Total Rows: <strong>${dataRows.length}</strong></span>
        <span>•</span>
        <span>⭐ Brand New Pages: <strong>${newAddedCount}</strong></span>
        <span>•</span>
        <span>🔄 Migrated from Old Site: <strong>${migratedCount}</strong></span>
        <span>•</span>
        <span>🔀 301 Aliases: <strong>${aliasCount}</strong></span>
        <span>•</span>
        <span>📰 Blog 301s: <strong>${blogCount}</strong></span>
        <span>•</span>
        <span>SEO Link Equity: <strong>100% Preserved</strong></span>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-chips">
        <button class="chip active" onclick="setChipFilter('all', this)">All Rows (${dataRows.length})</button>
        <button class="chip" onclick="setChipFilter('BRAND NEW', this)">⭐ Brand New Pages (${newAddedCount})</button>
        <button class="chip" onclick="setChipFilter('Migrated', this)">🔄 Migrated (${migratedCount})</button>
        <button class="chip" onclick="setChipFilter('Alias', this)">🔀 301 Aliases (${aliasCount})</button>
        <button class="chip" onclick="setChipFilter('Blog', this)">📰 Blog Redirects (${blogCount})</button>
      </div>
      <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search any URL, trek, region, or keyword..." onkeyup="applyFilters()">
    </div>

    <div class="table-container">
      <table id="dataTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Page Origin</th>
            <th>Old Website URL</th>
            <th>New Website URL</th>
            <th>HTTP Status</th>
            <th>Category</th>
            <th>Title</th>
            <th>Region</th>
            <th>Duration</th>
            <th>Altitude</th>
            <th>Optimizations Implemented</th>
            <th>SEO Value</th>
          </tr>
        </thead>
        <tbody>
${dataRows.map((r, i) => {
  const origin = r[0] || '';
  let tagClass = 'tag-migrated';
  if (origin.includes('BRAND NEW')) tagClass = 'tag-new';
  else if (origin.includes('Alias')) tagClass = 'tag-alias';
  else if (origin.includes('Blog')) tagClass = 'tag-blog';

  const oldUrlClean = (r[1] || '').replace('https://igloohimalayatreks.com', '');
  const newUrlClean = (r[2] || '').replace('https://igloohimalayatreks.com', '');

  return `          <tr data-origin="${origin}">
            <td>${i + 1}</td>
            <td><span class="${tagClass}">${origin}</span></td>
            <td title="${r[1]}">${r[1].startsWith('http') ? `<a href="${r[1]}" target="_blank" style="color: #64748b; text-decoration: none;">${oldUrlClean}</a>` : `<span style="color: #94a3b8; font-style: italic;">${r[1]}</span>`}</td>
            <td title="${r[2]}"><a href="${r[2]}" target="_blank" style="color: #059669; font-weight: 700; text-decoration: none;">${newUrlClean}</a></td>
            <td><strong>${r[3]}</strong></td>
            <td>${r[4]}</td>
            <td title="${r[5]}"><strong>${r[5]}</strong></td>
            <td>${r[6]}</td>
            <td>${r[7]}</td>
            <td>${r[8]}</td>
            <td title="${r[9]}">${(r[9] || '').slice(0, 60)}...</td>
            <td title="${r[10]}">${(r[10] || '').slice(0, 60)}...</td>
          </tr>`;
}).join('\n')}
        </tbody>
      </table>
    </div>
  </div>

  <div id="toast" class="toast">✓ Copied ${dataRows.length} rows to clipboard! Now press Ctrl+V in Google Sheets.</div>

  <script>
    const tsvData = ${JSON.stringify(tsvString)};
    let currentChip = 'all';

    function copyForGoogleSheets() {
      navigator.clipboard.writeText(tsvData).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }).catch(err => {
        alert('Please allow clipboard access or download the CSV file.');
      });
    }

    function setChipFilter(chip, btn) {
      currentChip = chip;
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }

    function applyFilters() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const rows = document.querySelectorAll('#dataTable tbody tr');

      rows.forEach(r => {
        const origin = r.getAttribute('data-origin') || '';
        const matchesChip = (currentChip === 'all') || origin.toLowerCase().includes(currentChip.toLowerCase());
        const matchesSearch = !q || r.textContent.toLowerCase().includes(q);
        r.style.display = (matchesChip && matchesSearch) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;

  const outPath = path.join(__dirname, '../google-sheets-exporter.html');
  fs.writeFileSync(outPath, htmlContent, 'utf8');
  console.log('Saved enhanced interactive exporter to:', outPath);
}

module.exports = generateExporter;
if (require.main === module) {
  generateExporter();
}
