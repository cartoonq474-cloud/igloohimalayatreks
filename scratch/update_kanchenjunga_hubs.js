const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. UPDATE kanchenjunga-region-treks/index.html
const kanchenjungaHubPath = path.join(ROOT, 'kanchenjunga-region-treks', 'index.html');
let kjHub = fs.readFileSync(kanchenjungaHubPath, 'utf8');

// Inject Schema.org JSON-LD if not present
if (!kjHub.includes('"@type": "CollectionPage"')) {
  const schemaMarkup = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Kanchenjunga Region Treks 2026",
    "description": "Explore Kanchenjunga Base Camp and Circuit trekking packages with Igloo Himalaya Treks. Mount Kanchenjunga (8,586m) remote eastern wilderness expeditions.",
    "url": "https://igloohimalayatreks.com/kanchenjunga-region-treks/",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Kanchenjunga Circuit Trek (22 Days)",
          "url": "https://igloohimalayatreks.com/trek/kanchenjunga-circuit-trek/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kanchenjunga Trek Without Flight (Road-Based 24 Days)",
          "url": "https://igloohimalayatreks.com/trek/kanchenjunga-trek-without-flight/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Kanchenjunga Base Camp Trek (22 Days)",
          "url": "https://igloohimalayatreks.com/trek/kanchenjunga-base-camp-trek/"
        }
      ]
    }
  }
  </script>\n</head>`;
  kjHub = kjHub.replace('</head>', schemaMarkup);
}

// Update Mega Menu Tab 6 in kanchenjunga-region-treks
kjHub = kjHub.replace(
  /<div class="mega-tab-content" id="tab-kanchenjunga">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  `<div class="mega-tab-content" id="tab-kanchenjunga">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Far Eastern Wilderness</div>
                        <a href="../trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="../trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">24 DAYS</span></a>
                        <a href="../trek/kanchenjunga-base-camp-trek/" class="mega-trek-link"><span>Kanchenjunga Base Camp</span> <span class="days-badge">22 DAYS</span></a>
                      </div>
                    </div>
                  </div>`
);

// Update Section 2 Cards in kanchenjunga-region-treks/index.html
const updatedCards = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp" alt="Kanchenjunga Circuit Trek (22 Days)" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">22 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Kanchenjunga Circuit Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Complete expedition to North Base Camp (Pangpema, 5,143m) & South Base Camp via Sele La Pass (4,290m).</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,290</strong></div>
                <a href="../trek/kanchenjunga-circuit-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/kanchenjunga-trek-without-flight-scenic-overland-trek.webp" alt="Kanchenjunga Trek Without Flight" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-copper-orange); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">24 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Kanchenjunga Trek Without Flight</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">100% flight-delay-free road expedition via Ilam tea gardens and full North & South circuit.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,190</strong></div>
                <a href="../trek/kanchenjunga-trek-without-flight/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp" alt="Kanchenjunga Base Camp Trek" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">22 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Kanchenjunga Base Camp Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Trek along Tamor river through Ghunsa and Pangpema to Ramche South Base Camp.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,290</strong></div>
                <a href="../trek/kanchenjunga-base-camp-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>
        </div>`;

kjHub = kjHub.replace(/<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 24px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- SECTION 3/, `${updatedCards}\n      </div>\n    </section>\n\n    <!-- SECTION 3`);

fs.writeFileSync(kanchenjungaHubPath, kjHub, 'utf8');
console.log('Updated kanchenjunga-region-treks/index.html');

// 2. UPDATE nepal-trekking-packages/index.html & nepal-trekking-packages.html
const cardsToInsert = `
          <!-- Kanchenjunga Circuit Trek Card -->
          <div class="card trek-item" data-region="kanchenjunga" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp" alt="Kanchenjunga Circuit Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Remote Wilderness</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Kanchenjunga Circuit Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Complete expedition visiting North (Pangpema 5,143m) & South Base Camps via Sele La Pass.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 22 Days</span>
                <span>🏔️ 5,143 m</span>
                <span>🥾 Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,290</span>
                </div>
                <a href="../trek/kanchenjunga-circuit-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- Kanchenjunga Trek Without Flight Card -->
          <div class="card trek-item" data-region="kanchenjunga" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/kanchenjunga-trek-without-flight-scenic-overland-trek.webp" alt="Kanchenjunga Trek Without Flight" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #ea580c;">Road-Based Overland</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Kanchenjunga Trek Without Flight</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">100% flight-delay-free road expedition via scenic Ilam tea estates and full dual base camps.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 24 Days</span>
                <span>🏔️ 5,143 m</span>
                <span>🥾 Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,190</span>
                </div>
                <a href="../trek/kanchenjunga-trek-without-flight/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

['nepal-trekking-packages/index.html', 'nepal-trekking-packages.html'].forEach(relFile => {
  const filePath = path.join(ROOT, relFile);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update counter from (53) to (55)
  content = content.replace(/Showing All Available Treks \(53\)/g, 'Showing All Available Treks (55)');

  // Insert cards if not already present
  if (!content.includes('href="../trek/kanchenjunga-circuit-trek/"')) {
    content = content.replace(
      /(<a href="\.\.\/trek\/kanchenjunga-base-camp-trek\/" class="btn btn-primary"[^>]*>View Itinerary<\/a>\s*<\/div>\s*<\/div>\s*<\/div>)/,
      `$1\n${cardsToInsert}`
    );
  }

  // Update Tab 6 mega menu
  content = content.replace(
    /<div class="mega-tab-content" id="tab-kanchenjunga">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="mega-tab-content" id="tab-kanchenjunga">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Far Eastern Wilderness</div>
                        <a href="../trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="../trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">24 DAYS</span></a>
                        <a href="../trek/kanchenjunga-base-camp-trek/" class="mega-trek-link"><span>Kanchenjunga Base Camp</span> <span class="days-badge">22 DAYS</span></a>
                      </div>
                    </div>
                  </div>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${relFile}`);
});

// 3. UPDATE index.html (Homepage Mega Menus)
const indexFilePath = path.join(ROOT, 'index.html');
let indexHTML = fs.readFileSync(indexFilePath, 'utf8');

// Update Tab 6 mega menu in index.html
indexHTML = indexHTML.replace(
  /<div class="mega-tab-content" id="tab-kanchenjunga">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  `<div class="mega-tab-content" id="tab-kanchenjunga">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Far Eastern Wilderness</div>
                        <a href="trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">24 DAYS</span></a>
                        <a href="trek/kanchenjunga-base-camp-trek/" class="mega-trek-link"><span>Kanchenjunga Base Camp</span> <span class="days-badge">22 DAYS</span></a>
                      </div>
                    </div>
                  </div>`
);

// In Tab 1 Popular Remote:
indexHTML = indexHTML.replace(
  /<a href="trek\/kanchenjunga-base-camp-trek\/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek<\/span> <span class="days-badge">18 DAYS<\/span><\/a>/,
  `<a href="trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>`
);

fs.writeFileSync(indexFilePath, indexHTML, 'utf8');
console.log('Updated index.html');
