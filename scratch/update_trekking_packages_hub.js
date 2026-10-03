const fs = require('fs');

function updateHub(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Update counter
  content = content.replace(/Showing All Available Treks \(\d+\)/g, 'Showing All Available Treks (41)');

  const newCards = `
          <!-- New Package 1: ABC Heli Return -->
          <div class="card trek-item" data-region="annapurna" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/annapurna-base-camp-trek-heli-return.webp" alt="Annapurna Base Camp Trek with Helicopter Return" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #E05A47;">Heli Flyback</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">ABC Trek with Helicopter Return</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Trek to 4,130m Annapurna Base Camp and fly back to Pokhara by private charter helicopter.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 8 Days</span>
                <span>🏔️ 4,130 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,490</span>
                </div>
                <a href="../trek/annapurna-base-camp-heli-return/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 2: Ghorepani Poon Hill with Mardi Himal -->
          <div class="card trek-item" data-region="annapurna" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/ghorepani-poon-hill-with-mardi-himal-trek.webp" alt="Ghorepani Poon Hill with Mardi Himal Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Annapurna Combo</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Ghorepani Poon Hill with Mardi Himal</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Combine Poon Hill sunrise (3,210m) with Mardi Himal Base Camp ridge (4,500m) in 9 days.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 9 Days</span>
                <span>🏔️ 4,500 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$750</span>
                </div>
                <a href="../trek/ghorepani-poon-hill-with-mardi-himal-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 3: ABC with Mardi Himal Trek -->
          <div class="card trek-item" data-region="annapurna" data-duration="medium" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/abc-with-mardi-himal-trek.webp" alt="Annapurna Base Camp with Mardi Himal Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Dual Ascent</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">ABC with Mardi Himal Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">The definitive dual mountain trek: Annapurna Sanctuary glacier basin plus high Mardi ridge.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 12 Days</span>
                <span>🏔️ 4,500 m</span>
                <span>⚡ Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$990</span>
                </div>
                <a href="../trek/abc-with-mardi-himal-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 4: Annapurna Luxury Lodge Trek -->
          <div class="card trek-item" data-region="annapurna" data-duration="short" data-difficulty="easy-moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/annapurna-luxury-trek.webp" alt="Annapurna Luxury Lodge Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Luxury Heritage</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Annapurna Luxury Lodge Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Explore Annapurna in supreme comfort, staying at boutique mountain lodges with fine dining.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 7 Days</span>
                <span>🏔️ 2,050 m</span>
                <span>⚡ Easy to Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,690</span>
                </div>
                <a href="../trek/annapurna-luxury-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 5: Annapurna Circuit Luxury Trek -->
          <div class="card trek-item" data-region="annapurna" data-duration="medium" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/annapurna-circuit-luxury-trek.webp" alt="Annapurna Circuit Luxury Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">VIP Circuit</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Annapurna Circuit Luxury Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Thorong La Pass (5,416m) crossing with private 4WD support, boutique lodges, and 5-star resorts.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 12 Days</span>
                <span>🏔️ 5,416 m</span>
                <span>⚡ Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,990</span>
                </div>
                <a href="../trek/annapurna-circuit-luxury-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 6: Short Annapurna Base Camp Trek -->
          <div class="card trek-item" data-region="annapurna" data-duration="short" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/short-annapurna-base-camp-trek.webp" alt="Short Annapurna Base Camp Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Fast Track</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Short Annapurna Base Camp Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Direct express ascent to 4,130m Annapurna Base Camp for fit hikers with limited time.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 6 Days</span>
                <span>🏔️ 4,130 m</span>
                <span>⚡ Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$590</span>
                </div>
                <a href="../trek/short-annapurna-base-camp-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 7: Annapurna Short Trek -->
          <div class="card trek-item" data-region="annapurna" data-duration="short" data-difficulty="easy-moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/panchase-trek-best-short-trek-near-pokhara-nepal.webp" alt="Annapurna Short Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Introductory</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Annapurna Short Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Scenic 4-day introductory loop visiting Poon Hill (3,210m) and Gurung heritage in Ghandruk.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 4 Days</span>
                <span>🏔️ 3,210 m</span>
                <span>⚡ Easy to Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$390</span>
                </div>
                <a href="../trek/annapurna-short-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

  // Insert after the second card (Annapurna Circuit Trek card)
  const marker = '<a href="../trek/annapurna-circuit-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>\n              </div>\n            </div>\n          </div>';
  if (content.includes(marker)) {
    content = content.replace(marker, marker + '\n' + newCards);
  } else {
    // fallback insertion into treks-container
    content = content.replace(/(<div class="grid grid-3" id="treks-container">)/, `$1\n${newCards}`);
  }

  // Adjust relative paths for root file vs subfolder
  if (filePath === 'nepal-trekking-packages.html') {
    content = content.replace(/\.\.\/images\//g, 'images/');
    content = content.replace(/\.\.\/trek\//g, 'trek/');
    content = content.replace(/\.\.\/annapurna-region-treks\//g, 'annapurna-region-treks/');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateHub('nepal-trekking-packages/index.html');
updateHub('nepal-trekking-packages.html');
