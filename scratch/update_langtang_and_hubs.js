const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Update peak-climbing-nepal/index.html to add Yala Peak as a dedicated card
function updatePeakClimbing() {
  const file = path.join(ROOT, 'peak-climbing-nepal', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('trek/yala-peak-climbing/')) {
    const yalaCard = `
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/yala-peak-climbing.webp" alt="Yala Peak Climbing" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">11 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Yala Peak Climbing (Langtang)</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Beginner-friendly non-technical 5,500m summit climb above Kyanjin Gompa facing Shishapangma.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,290</strong>
                </div>
                <a href="../trek/yala-peak-climbing/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>
`;
    content = content.replace(
      /(<a href="\.\.\/trek\/three-high-passes-with-island-peak-climb\/"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/div>\s*<\/section>)/,
      `$1\n${yalaCard}$2`
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated peak-climbing-nepal/index.html with Yala Peak card');
  }
}

// 2. Update langtang-region-treks/index.html
function updateLangtangHub() {
  const file = path.join(ROOT, 'langtang-region-treks', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  // Fix Card 3 link to tamang-heritage-trail-trek
  content = content.replace(
    'href="../trek/tamang-heritage-trail/"',
    'href="../trek/tamang-heritage-trail-trek/"'
  );

  // Fix Card 5 link to helambu-trek
  content = content.replace(
    'href="../trek/helambu-circuit-trek/"',
    'href="../trek/helambu-trek/"'
  );

  // Fix Card 6 (Yala Peak) to link directly to /trek/yala-peak-climbing/
  content = content.replace(
    /<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Yala Peak Climbing & Langtang<\/h3>[\s\S]*?<a href="[^"]*"/,
    `<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Yala Peak Climbing (5,500m)</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Non-technical 5,500m peak climb above Kanjin Gompa with full Sherpa mountaineering support.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,290</strong></div>
                <a href="../trek/yala-peak-climbing/"`
  );

  // Add 2 new cards (Tamang + Langtang Combo & Langtang Gosaikunda Helambu)
  if (!content.includes('tamang-heritage-trail-with-langtang-valley-trek')) {
    const additionalCards = `
          <!-- New Package Card: Tamang Heritage + Langtang Valley -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/tamang-heritage-trail-and-langtang-valley-trek.webp" alt="Tamang Heritage Trail with Langtang Valley" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: #D97706; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">14 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Tamang Heritage & Langtang Valley</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Combine Gatlang, Tatopani hot springs, and Thuman homestays with Kyanjin Gompa and Kyanjin Ri.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$990</strong>
                </div>
                <a href="../trek/tamang-heritage-trail-with-langtang-valley-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package Card: Langtang Gosaikunda Helambu Grand Traverse -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/langtang-gosaikunda-helambu-trek.webp" alt="Langtang Gosaikunda Helambu Trek" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: #0E3458; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">16 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Langtang Gosaikunda Helambu Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">The grand 16-day loop connecting Kyanjin Gompa, sacred Gosaikunda Lake, Laurebina Pass (4,610m), and Helambu.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,190</strong>
                </div>
                <a href="../trek/langtang-gosaikunda-helambu-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>
`;
    content = content.replace(
      /(<a href="\.\.\/trek\/yala-peak-climbing\/"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/div>\s*<\/section>)/,
      `$1\n${additionalCards}$2`
    );
  }

  // Update Langtang Mega Menu Tab
  const langtangMenuRegex = /<!-- Tab 5: Langtang -->[\s\S]*?<!-- Tab 6: Kanchenjunga -->/;
  const langtangMenuNew = `<!-- Tab 5: Langtang -->
                  <div class="mega-tab-content" id="tab-langtang">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Valley & Lakes</div>
                        <a href="../trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="../trek/gosaikunda-lake-trek/" class="mega-trek-link"><span>Sacred Gosaikunda Lake</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="../trek/langtang-gosaikunda-trek/" class="mega-trek-link"><span>Langtang & Gosaikunda</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Grand Combos & Traverse</div>
                        <a href="../trek/tamang-heritage-trail-with-langtang-valley-trek/" class="mega-trek-link"><span>Tamang & Langtang Combo</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/langtang-gosaikunda-helambu-trek/" class="mega-trek-link"><span>Langtang Gosaikunda Helambu</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="../trek/helambu-trek/" class="mega-trek-link"><span>Helambu Circuit Trek</span> <span class="days-badge">6 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Cultural & Peaks</div>
                        <a href="../trek/tamang-heritage-trail-trek/" class="mega-trek-link"><span>Tamang Heritage Trail</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="../trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="../langtang-region-treks/" class="mega-trek-link"><span>All Langtang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 6: Kanchenjunga -->`;

  content = content.replace(langtangMenuRegex, langtangMenuNew);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated langtang-region-treks/index.html');
}

// 3. Update nepal-trekking-packages/index.html
function updateTrekkingPackagesHub() {
  const file = path.join(ROOT, 'nepal-trekking-packages', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  // Update count from 49 to 52
  content = content.replace('Showing All Available Treks (49)', 'Showing All Available Treks (52)');

  // Add the 3 new Langtang cards
  if (!content.includes('tamang-heritage-trail-with-langtang-valley-trek')) {
    const newCards = `
          <!-- New Package 16: Tamang Heritage + Langtang Valley -->
          <div class="card trek-item" data-region="langtang" data-duration="long" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/tamang-heritage-trail-and-langtang-valley-trek.webp" alt="Tamang Heritage Trail with Langtang Valley Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Culture & Alpine</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Tamang Heritage & Langtang Valley</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Tibetan-influenced homestay trail combined with high alpine glacial amphitheater of Kyanjin Gompa.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 14 Days</span>
                <span>🏔️ 4,773 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$990</span>
                </div>
                <a href="../trek/tamang-heritage-trail-with-langtang-valley-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 17: Yala Peak Climbing -->
          <div class="card trek-item" data-region="langtang" data-duration="medium" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/yala-peak-climbing.webp" alt="Yala Peak Climbing" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">5,500m Peak</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Yala Peak Climbing (5,500m)</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Nepal’s best introductory mountaineering summit with panoramas of Langtang Lirung and Shishapangma.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 11 Days</span>
                <span>🏔️ 5,500 m</span>
                <span>⚡ Alpine Climb</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,290</span>
                </div>
                <a href="../trek/yala-peak-climbing/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 18: Langtang Gosaikunda Helambu -->
          <div class="card trek-item" data-region="langtang" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/langtang-gosaikunda-helambu-trek.webp" alt="Langtang Gosaikunda Helambu Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">Grand Traverse</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Langtang Gosaikunda Helambu</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Continuous 16-day loop through Langtang, sacred Gosaikunda Lakes, and Laurebina Pass (4,610m) to Sundarijal.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 16 Days</span>
                <span>🏔️ 4,610 m</span>
                <span>⚡ Strenuous</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,190</span>
                </div>
                <a href="../trek/langtang-gosaikunda-helambu-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;
    content = content.replace(
      /(<a href="\.\.\/trek\/three-high-passes-with-island-peak-climb\/"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/,
      `$1\n${newCards}`
    );
  }

  // Update Langtang Mega Menu Tab in nepal-trekking-packages
  const langtangMenuRegex = /<!-- Tab 5: Langtang -->[\s\S]*?<!-- Tab 6: Kanchenjunga -->/;
  const langtangMenuNew = `<!-- Tab 5: Langtang -->
                  <div class="mega-tab-content" id="tab-langtang">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Valley & Lakes</div>
                        <a href="../trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="../trek/gosaikunda-lake-trek/" class="mega-trek-link"><span>Sacred Gosaikunda Lake</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="../trek/langtang-gosaikunda-trek/" class="mega-trek-link"><span>Langtang & Gosaikunda</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Grand Combos & Traverse</div>
                        <a href="../trek/tamang-heritage-trail-with-langtang-valley-trek/" class="mega-trek-link"><span>Tamang & Langtang Combo</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/langtang-gosaikunda-helambu-trek/" class="mega-trek-link"><span>Langtang Gosaikunda Helambu</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="../trek/helambu-trek/" class="mega-trek-link"><span>Helambu Circuit Trek</span> <span class="days-badge">6 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Cultural & Peaks</div>
                        <a href="../trek/tamang-heritage-trail-trek/" class="mega-trek-link"><span>Tamang Heritage Trail</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="../trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="../langtang-region-treks/" class="mega-trek-link"><span>All Langtang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 6: Kanchenjunga -->`;

  content = content.replace(langtangMenuRegex, langtangMenuNew);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated nepal-trekking-packages/index.html');

  // Also sync nepal-trekking-packages.html
  fs.writeFileSync(path.join(ROOT, 'nepal-trekking-packages.html'), content, 'utf8');
  console.log('Synchronized nepal-trekking-packages.html');
}

// 4. Update index.html mega menu
function updateIndexMegaMenu() {
  const file = path.join(ROOT, 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  const langtangMenuRegex = /<!-- Tab 5: Langtang -->[\s\S]*?<!-- Tab 6: Kanchenjunga -->/;
  const langtangMenuNew = `<!-- Tab 5: Langtang -->
                  <div class="mega-tab-content" id="tab-langtang">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Valley & Lakes</div>
                        <a href="trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="trek/gosaikunda-lake-trek/" class="mega-trek-link"><span>Sacred Gosaikunda Lake</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="trek/langtang-gosaikunda-trek/" class="mega-trek-link"><span>Langtang & Gosaikunda</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Grand Combos & Traverse</div>
                        <a href="trek/tamang-heritage-trail-with-langtang-valley-trek/" class="mega-trek-link"><span>Tamang & Langtang Combo</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="trek/langtang-gosaikunda-helambu-trek/" class="mega-trek-link"><span>Langtang Gosaikunda Helambu</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="trek/helambu-trek/" class="mega-trek-link"><span>Helambu Circuit Trek</span> <span class="days-badge">6 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Cultural & Peaks</div>
                        <a href="trek/tamang-heritage-trail-trek/" class="mega-trek-link"><span>Tamang Heritage Trail</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="langtang-region-treks/" class="mega-trek-link"><span>All Langtang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 6: Kanchenjunga -->`;

  content = content.replace(langtangMenuRegex, langtangMenuNew);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated index.html mega menu');
}

updatePeakClimbing();
updateLangtangHub();
updateTrekkingPackagesHub();
updateIndexMegaMenu();
console.log('All Langtang hubs and menus successfully synchronized!');
