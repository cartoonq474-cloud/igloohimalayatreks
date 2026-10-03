const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// -------------------------------------------------------------
// 1. UPDATE dolpo-region-treks/index.html
// -------------------------------------------------------------
const dolpoHubPath = path.join(ROOT, 'dolpo-region-treks', 'index.html');
if (fs.existsSync(dolpoHubPath)) {
  let content = fs.readFileSync(dolpoHubPath, 'utf8');

  // Add Schema.org if not present
  if (!content.includes('application/ld+json')) {
    const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://igloohimalayatreks.com/dolpo-region-treks/#collection",
        "url": "https://igloohimalayatreks.com/dolpo-region-treks/",
        "name": "Dolpo Region Treks — Upper & Lower Dolpo Expeditions",
        "description": "Discover remote trans-Himalayan adventures in Nepal's Dolpo Region. Includes Upper Dolpo (Shey Gompa, Crystal Mountain) and Lower Dolpo (Shey Phoksundo Lake, Numa La Pass).",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
            { "@type": "ListItem", "position": 2, "name": "Dolpo Region Treks", "item": "https://igloohimalayatreks.com/dolpo-region-treks/" }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Dolpo Trekking Packages",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Upper Dolpo Trek (24 Days)",
              "url": "https://igloohimalayatreks.com/trek/upper-dolpo-trek/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Lower Dolpo Trek (18 Days)",
              "url": "https://igloohimalayatreks.com/trek/lower-dolpo-trek/"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://igloohimalayatreks.com/dolpo-region-treks/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What permits are required for trekking in Dolpo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Upper Dolpo requires a Special Restricted Area Permit ($500 USD per person for the first 10 days, then $50/day) plus Shey Phoksundo National Park entry. Lower Dolpo requires a Lower Dolpo Restricted Area Permit ($20 USD per week) and national park entry. Trekkers must travel in groups of at least two with a licensed guide."
            }
          },
          {
            "@type": "Question",
            "name": "Can you trek Dolpo during the monsoon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Dolpo lies in the trans-Himalayan rain shadow of the Dhaulagiri massif. While the southern lowlands experience heavy rains, Dolpo remains mostly dry, making June through August one of the best windows alongside Spring and Autumn."
            }
          }
        ]
      }
    ]
  }
  </script>`;
    content = content.replace('</head>', `${schema}\n</head>`);
  }

  // Update Section 2 category cards
  content = content.replace(
    /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22L12 2l8 20H4z"\/><\/svg><\/div>\s*<span class="category-filter-title">Upper Dolpo Trek<\/span>/g,
    '<a href="../trek/upper-dolpo-trek/" class="category-filter-card">\n          <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22L12 2l8 20H4z"/></svg></div>\n          <span class="category-filter-title">Upper Dolpo Trek</span>'
  );
  content = content.replace(
    /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 8 22 9 17 14 18 21"\/><\/svg><\/div>\s*<span class="category-filter-title">Lower Dolpo Circuit<\/span>/g,
    '<a href="../trek/lower-dolpo-trek/" class="category-filter-card">\n          <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 8 22 9 17 14 18 21"/></svg></div>\n          <span class="category-filter-title">Lower Dolpo Circuit</span>'
  );
  content = content.replace(
    /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M2 17h20M2 7h20"\/><\/svg><\/div>\s*<span class="category-filter-title">Shey Phoksundo Lake<\/span>/g,
    '<a href="../trek/lower-dolpo-trek/" class="category-filter-card">\n          <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M2 17h20M2 7h20"/></svg></div>\n          <span class="category-filter-title">Shey Phoksundo Lake</span>'
  );

  // Update Section 2 exotic trek cards
  content = content.replace(
    /(<h3[^>]*>Upper Dolpo & Shey Gompa<\/h3>[\s\S]*?<a href=")\.\.\/restricted-area-treks-nepal\/(")/g,
    '$1../trek/upper-dolpo-trek/$2'
  );
  content = content.replace(
    /(<h3[^>]*>Lower Dolpo Circuit<\/h3>[\s\S]*?<a href=")\.\.\/restricted-area-treks-nepal\/(")/g,
    '$1../trek/lower-dolpo-trek/$2'
  );
  content = content.replace(
    /(<h3[^>]*>Shey Phoksundo Lake Short<\/h3>[\s\S]*?<a href=")\.\.\/restricted-area-treks-nepal\/(")/g,
    '$1../trek/lower-dolpo-trek/$2'
  );

  // Update tab-dolpo in mega menu
  content = content.replace(
    /<a href="\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>\s*<span class="days-badge">24 DAYS<\/span><\/a>/g,
    '<a href="../trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span> <span class="days-badge">24 DAYS</span></a>'
  );
  content = content.replace(
    /<a href="\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Lower Dolpo & Phoksundo Lake<\/span>\s*<span class="days-badge">15 DAYS<\/span><\/a>/g,
    '<a href="../trek/lower-dolpo-trek/" class="mega-trek-link"><span>Lower Dolpo Trek</span> <span class="days-badge">18 DAYS</span></a>'
  );

  fs.writeFileSync(dolpoHubPath, content, 'utf8');
  console.log('Updated dolpo-region-treks/index.html');
}

// -------------------------------------------------------------
// 2. UPDATE nepal-trekking-packages/index.html & nepal-trekking-packages.html
// -------------------------------------------------------------
const dolpoCardsHTML = `
          <!-- Lower Dolpo Trek Card -->
          <div class="card trek-item" data-region="dolpo" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/lower-dolpo-trek.webp" alt="Lower Dolpo Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">Restricted Area</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Lower Dolpo Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Circuit across crystal turquoise Shey Phoksundo Lake, Bon Po villages, and Numa La Pass (5,309m).</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 18 Days</span>
                <span>🏔️ 5,309 m</span>
                <span>🥾 Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,990</span>
                </div>
                <a href="../trek/lower-dolpo-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- Upper Dolpo Trek Card -->
          <div class="card trek-item" data-region="dolpo" data-duration="long" data-difficulty="strenuous">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp" alt="Upper Dolpo Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #ea580c;">Trans-Himalayan Expedition</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Upper Dolpo Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">The legendary 24-day Himalayan wilderness odyssey to Shey Gompa, Crystal Mountain, and Kang La (5,360m).</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 24 Days</span>
                <span>🏔️ 5,360 m</span>
                <span>🥾 Strenuous</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,890</span>
                </div>
                <a href="../trek/upper-dolpo-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

['nepal-trekking-packages/index.html', 'nepal-trekking-packages.html'].forEach(relFile => {
  const filePath = path.join(ROOT, relFile);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Counter 57 -> 59
  content = content.replace(/Showing All Available Treks \(57\)/g, 'Showing All Available Treks (59)');

  // Filter option
  if (!content.includes('value="dolpo"')) {
    content = content.replace(
      '<option value="mustang">Mustang Region</option>',
      '<option value="mustang">Mustang Region</option>\n                <option value="dolpo">Dolpo Region</option>'
    );
  }

  // Insert cards before Trek Card 33 if not present
  if (!content.includes('Lower Dolpo Trek</h3>')) {
    content = content.replace('<!-- Trek Card 33 -->', `${dolpoCardsHTML}\n          <!-- Trek Card 33 -->`);
  }

  // Mega menu tab-dolpo
  content = content.replace(
    /<a href="\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>\s*<span class="days-badge">24 DAYS<\/span><\/a>/g,
    '<a href="../trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span> <span class="days-badge">24 DAYS</span></a>'
  );
  content = content.replace(
    /<a href="\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Lower Dolpo & Phoksundo Lake<\/span>\s*<span class="days-badge">15 DAYS<\/span><\/a>/g,
    '<a href="../trek/lower-dolpo-trek/" class="mega-trek-link"><span>Lower Dolpo Trek</span> <span class="days-badge">18 DAYS</span></a>'
  );

  // Tab 1 popular link
  content = content.replace(
    /<a href="\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>/g,
    '<a href="../trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${relFile}`);
});

// -------------------------------------------------------------
// 3. UPDATE root index.html
// -------------------------------------------------------------
const rootIndexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(rootIndexPath)) {
  let content = fs.readFileSync(rootIndexPath, 'utf8');

  // Tab 7 mega menu
  content = content.replace(
    /<a href="dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>\s*<span\s+class="days-badge">24 DAYS<\/span><\/a>/g,
    '<a href="trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span> <span class="days-badge">24 DAYS</span></a>'
  );
  content = content.replace(
    /<a href="dolpo-region-treks\/" class="mega-trek-link"><span>Lower Dolpo & Phoksundo Lake<\/span>\s*<span\s+class="days-badge">15 DAYS<\/span><\/a>/g,
    '<a href="trek/lower-dolpo-trek/" class="mega-trek-link"><span>Lower Dolpo Trek</span> <span class="days-badge">18 DAYS</span></a>'
  );

  // Tab 1 popular link
  content = content.replace(
    /<a href="dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>\s*<span\s+class="days-badge">24 DAYS<\/span><\/a>/g,
    '<a href="trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span> <span class="days-badge">24 DAYS</span></a>'
  );

  fs.writeFileSync(rootIndexPath, content, 'utf8');
  console.log('Updated root index.html');
}

// -------------------------------------------------------------
// 4. UPDATE ALL trek/*/index.html MEGA MENUS FOR DOLPO
// -------------------------------------------------------------
const trekDir = path.join(ROOT, 'trek');
if (fs.existsSync(trekDir)) {
  const folders = fs.readdirSync(trekDir);
  let updatedCount = 0;
  for (const folder of folders) {
    const pkgIndex = path.join(trekDir, folder, 'index.html');
    if (fs.existsSync(pkgIndex)) {
      let content = fs.readFileSync(pkgIndex, 'utf8');
      let changed = false;

      if (content.includes('href="../../dolpo-region-treks/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek</span>')) {
        content = content.replace(
          /<a href="\.\.\/\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek<\/span>\s*<span class="days-badge">24 DAYS<\/span><\/a>/g,
          '<a href="../upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Trek</span> <span class="days-badge">24 DAYS</span></a>'
        );
        changed = true;
      }

      if (content.includes('href="../../dolpo-region-treks/" class="mega-trek-link"><span>Lower Dolpo & Phoksundo Lake</span>')) {
        content = content.replace(
          /<a href="\.\.\/\.\.\/dolpo-region-treks\/" class="mega-trek-link"><span>Lower Dolpo & Phoksundo Lake<\/span>\s*<span class="days-badge">15 DAYS<\/span><\/a>/g,
          '<a href="../lower-dolpo-trek/" class="mega-trek-link"><span>Lower Dolpo Trek</span> <span class="days-badge">18 DAYS</span></a>'
        );
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(pkgIndex, content, 'utf8');
        updatedCount++;
      }
    }
  }
  console.log(`Updated mega menus across ${updatedCount} trek package pages`);
}
