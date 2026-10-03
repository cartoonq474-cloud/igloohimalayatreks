const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. UPDATE mustang-region-treks/index.html
const mustangHubPath = path.join(ROOT, 'mustang-region-treks', 'index.html');
let mHub = fs.readFileSync(mustangHubPath, 'utf8');

// Inject Schema.org JSON-LD if not present
if (!mHub.includes('"@type": "CollectionPage"')) {
  const schemaMarkup = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Mustang Region Treks 2026",
    "description": "Explore Upper Mustang and Lo Manthang trekking and 4WD overland packages with Igloo Himalaya Treks. Restricted area permits, Tiji festival, and ancient cave monasteries.",
    "url": "https://igloohimalayatreks.com/mustang-region-treks/",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Upper Mustang Trek (14 Days)",
          "url": "https://igloohimalayatreks.com/trek/upper-mustang-trek/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Upper Mustang Jeep Tour (12 Days)",
          "url": "https://igloohimalayatreks.com/trek/upper-mustang-jeep-tour/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Upper Mustang Tiji Festival Trek (15 Days)",
          "url": "https://igloohimalayatreks.com/trek/upper-mustang-tiji-festival/"
        }
      ]
    }
  }
  </script>\n</head>`;
  mHub = mHub.replace('</head>', schemaMarkup);
}

// Update Section 2 Cards in mustang-region-treks/index.html
const updatedMustangCards = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <!-- Card 1: Upper Mustang Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp" alt="Upper Mustang Lo Manthang Trek" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">14 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Upper Mustang Lo Manthang Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Classic restricted trek through Kagbeni, Charang, and the walled city of Lo Manthang.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,790</strong></div>
                <a href="../trek/upper-mustang-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- Card 2: Upper Mustang Jeep Tour -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" alt="Upper Mustang Jeep Tour" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-copper-orange); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">12 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Upper Mustang Jeep Tour</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Overland 4WD expedition across Kali Gandaki gorge to Lo Manthang & Chhoser sky caves.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,990</strong></div>
                <a href="../trek/upper-mustang-jeep-tour/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- Card 3: Lo Manthang Tiji Festival -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/upper-mustang-tiji-festival-spectacular-culture-rituals.webp" alt="Lo Manthang Tiji Festival Special" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">15 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Lo Manthang Tiji Festival Special</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Witness the annual spring Tiji mask festival celebrating good over evil in Lo Manthang.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,190</strong></div>
                <a href="../trek/upper-mustang-tiji-festival/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>
        </div>`;

mHub = mHub.replace(/<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 24px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- SECTION 3/, `${updatedMustangCards}\n      </div>\n    </section>\n\n    <!-- SECTION 3`);

// Update Tab 10 mega menu in mustang-region-treks/index.html
const updatedTab10 = `<div class="mega-tab-content" id="tab-farwest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Forbidden Kingdom & Rara</div>
                        <a href="../trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/upper-mustang-jeep-tour/" class="mega-trek-link"><span>Upper Mustang Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/upper-mustang-tiji-festival/" class="mega-trek-link"><span>Mustang Tiji Festival</span> <span class="days-badge">15 DAYS</span></a>
                        <a href="../trek/rara-lake-trek/" class="mega-trek-link"><span>Rara Lake Wilderness Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                    </div>
                  </div>`;
mHub = mHub.replace(/<div class="mega-tab-content" id="tab-farwest">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, updatedTab10);

fs.writeFileSync(mustangHubPath, mHub, 'utf8');
console.log('Updated mustang-region-treks/index.html');

// 2. UPDATE nepal-trekking-packages/index.html & nepal-trekking-packages.html
const mustangCardsToInsert = `
          <!-- Upper Mustang Jeep Tour Card -->
          <div class="card trek-item" data-region="mustang" data-duration="medium" data-difficulty="easy">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" alt="Upper Mustang Jeep Tour" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #ea580c;">4WD Overland Tour</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Upper Mustang Jeep Tour</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Overland 4WD expedition across Kali Gandaki gorge to Lo Manthang & Chhoser sky caves.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 12 Days</span>
                <span>🏔️ 3,840 m</span>
                <span>🚙 Overland 4WD</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,990</span>
                </div>
                <a href="../trek/upper-mustang-jeep-tour/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- Upper Mustang Tiji Festival Trek Card -->
          <div class="card trek-item" data-region="mustang" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/upper-mustang-tiji-festival-spectacular-culture-rituals.webp" alt="Upper Mustang Tiji Festival Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #8b5cf6;">Cultural Festival</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Upper Mustang Tiji Festival Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Witness the 3-day spiritual Tiji mask dance celebration inside medieval Lo Manthang.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 15 Days</span>
                <span>🏔️ 3,840 m</span>
                <span>🎭 Cultural Trek</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,190</span>
                </div>
                <a href="../trek/upper-mustang-tiji-festival/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

['nepal-trekking-packages/index.html', 'nepal-trekking-packages.html'].forEach(relFile => {
  const filePath = path.join(ROOT, relFile);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update counter from (55) to (57)
  content = content.replace(/Showing All Available Treks \(55\)/g, 'Showing All Available Treks (57)');

  // Insert cards if not already present
  if (!content.includes('href="../trek/upper-mustang-jeep-tour/"')) {
    content = content.replace(
      /(<a href="\.\.\/trek\/upper-mustang-trek\/" class="btn btn-primary"[^>]*>View Itinerary<\/a>\s*<\/div>\s*<\/div>\s*<\/div>)/,
      `$1\n${mustangCardsToInsert}`
    );
  }

  // Update Tab 10 mega menu
  content = content.replace(
    /<div class="mega-tab-content" id="tab-farwest">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="mega-tab-content" id="tab-farwest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Forbidden Kingdom & Rara</div>
                        <a href="../trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/upper-mustang-jeep-tour/" class="mega-trek-link"><span>Upper Mustang Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/upper-mustang-tiji-festival/" class="mega-trek-link"><span>Mustang Tiji Festival</span> <span class="days-badge">15 DAYS</span></a>
                        <a href="../trek/rara-lake-trek/" class="mega-trek-link"><span>Rara Lake Wilderness Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                    </div>
                  </div>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${relFile}`);
});

// 3. UPDATE index.html
const indexFilePath = path.join(ROOT, 'index.html');
let indexHTML = fs.readFileSync(indexFilePath, 'utf8');

indexHTML = indexHTML.replace(
  /<div class="mega-tab-content" id="tab-farwest">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  `<div class="mega-tab-content" id="tab-farwest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Forbidden Kingdom & Rara</div>
                        <a href="trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="trek/upper-mustang-jeep-tour/" class="mega-trek-link"><span>Upper Mustang Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="trek/upper-mustang-tiji-festival/" class="mega-trek-link"><span>Mustang Tiji Festival</span> <span class="days-badge">15 DAYS</span></a>
                        <a href="trek/rara-lake-trek/" class="mega-trek-link"><span>Rara Lake Wilderness Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                    </div>
                  </div>`
);

fs.writeFileSync(indexFilePath, indexHTML, 'utf8');
console.log('Updated index.html');
