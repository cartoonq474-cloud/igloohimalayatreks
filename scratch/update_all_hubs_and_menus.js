const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Update peak-climbing-nepal/index.html
function updatePeakClimbingHub() {
  const file = path.join(ROOT, 'peak-climbing-nepal', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  // Fix Section 2 cards and markup
  const section2OldRegex = /<!-- SECTION 2 -->[\s\S]*?<!-- SECTION 3: Compare & Map -->/;
  const section2New = `<!-- SECTION 2 -->
    <section id="best-treks" class="section-padding" style="padding: 70px 0; background: var(--color-neutral-100);">
      <div class="container">
        <h2 class="section-heading-responsive" style="font-size: 2.2rem; color: var(--color-primary-navy); font-weight: 800; margin-bottom: 30px;">Best Treks in the Peak Climbing Region</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/island-peak-climbing.webp" alt="Island Peak with Everest Base Camp" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">19 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Island Peak with Everest Base Camp</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Combine Everest Base Camp with a 6,189m summit climb facing Lhotse and Ama Dablam.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,190</strong>
                </div>
                <a href="../trek/island-peak-climbing/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/mera-peak-climbing.webp" alt="Mera Peak Climbing Expedition" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">18 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Mera Peak Climbing Expedition</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Ascend Nepal’s highest trekking peak (6,476m) for views of Everest, Lhotse, Cho Oyu, Makalu & Kanchenjunga.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,090</strong>
                </div>
                <a href="../trek/mera-peak-climbing/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/lobuche-peak-climbing.webp" alt="Lobuche East Peak Climbing" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">18 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Lobuche East Peak Climbing</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Technical ridge climb to 6,119m with face-to-face views of Everest south face.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,290</strong>
                </div>
                <a href="../trek/lobuche-peak-climbing/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
              <img src="../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest.webp" alt="Three High Passes with Island Peak Climb" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">21 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Three High Passes with Island Peak</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Cross Kongma La, Cho La, and Renjo La followed by a 6,189m alpine summit expedition.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,790</strong>
                </div>
                <a href="../trek/three-high-passes-with-island-peak-climb/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SECTION 3: Compare & Map -->`;

  content = content.replace(section2OldRegex, section2New);

  // Update Experience cards links
  content = content.replace(
    /alt="First-Time Mountaineers" class="experience-img">[\s\S]*?<a href="[^"]*"/,
    'alt="First-Time Mountaineers" class="experience-img">\n            <div class="experience-body">\n              <div><h3 style="font-size: 1.15rem; color: var(--color-primary-navy); font-weight: 700; margin-bottom: 6px;">First-Time Mountaineers</h3><p style="font-size: 0.88rem; color: var(--color-neutral-600); line-height: 1.5; margin-bottom: 12px;">Mera Peak (6,476m) and Yala Peak (5,500m) are non-technical.</p></div>\n              <a href="../trek/mera-peak-climbing/"'
  );

  content = content.replace(
    /alt="Semi-Technical Climbers" class="experience-img">[\s\S]*?<a href="[^"]*"/,
    'alt="Semi-Technical Climbers" class="experience-img">\n            <div class="experience-body">\n              <div><h3 style="font-size: 1.15rem; color: var(--color-primary-navy); font-weight: 700; margin-bottom: 6px;">Semi-Technical Climbers</h3><p style="font-size: 0.88rem; color: var(--color-neutral-600); line-height: 1.5; margin-bottom: 12px;">Island Peak (6,189m) features ice wall & fixed ropes.</p></div>\n              <a href="../trek/island-peak-climbing/"'
  );

  content = content.replace(
    /alt="Ridge & Rock Climbers" class="experience-img">[\s\S]*?<a href="[^"]*"/,
    'alt="Ridge & Rock Climbers" class="experience-img">\n            <div class="experience-body">\n              <div><h3 style="font-size: 1.15rem; color: var(--color-primary-navy); font-weight: 700; margin-bottom: 6px;">Ridge & Rock Climbers</h3><p style="font-size: 0.88rem; color: var(--color-neutral-600); line-height: 1.5; margin-bottom: 12px;">Lobuche East (6,119m) technical snow ridge summit.</p></div>\n              <a href="../trek/lobuche-peak-climbing/"'
  );

  content = content.replace(
    /alt="8,000m Panorama Seekers" class="experience-img">[\s\S]*?<a href="[^"]*"/,
    'alt="8,000m Panorama Seekers" class="experience-img">\n            <div class="experience-body">\n              <div><h3 style="font-size: 1.15rem; color: var(--color-primary-navy); font-weight: 700; margin-bottom: 6px;">8,000m Panorama Seekers</h3><p style="font-size: 0.88rem; color: var(--color-neutral-600); line-height: 1.5; margin-bottom: 12px;">Mera summit overlooks Everest, Lhotse, Makalu & Kanchenjunga.</p></div>\n              <a href="../trek/mera-peak-climbing/"'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated peak-climbing-nepal/index.html');
}

// 2. Update everest-region-treks/index.html
function updateEverestHub() {
  const file = path.join(ROOT, 'everest-region-treks', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  // Fix Card 7 link (Everest Luxury)
  content = content.replace(
    /<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Everest Luxury Lodge Trek<\/h3>[\s\S]*?<a href="[^"]*"/,
    `<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Everest Luxury Lodge Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Iconic landscapes with premium luxury lodge accommodation and helicopter flights.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,490</strong>
                </div>
                <a href="../trek/everest-base-camp-luxury-trek/"`
  );

  // Fix Card 8 link (Jiri / Overland)
  content = content.replace(
    /<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Jiri to Everest Base Camp<\/h3>[\s\S]*?<a href="[^"]*"/,
    `<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Everest Base Camp Overland (No Flight)</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Follow the classic historic route taken by Hillary & Tenzing via Salleri without domestic flights.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,590</strong>
                </div>
                <a href="../trek/everest-base-camp-trek-without-flight/"`
  );

  // Fix Card 9 link (Island Peak)
  content = content.replace(
    /<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Island Peak & EBC Expedition<\/h3>[\s\S]*?<a href="[^"]*"/,
    `<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Island Peak & EBC Expedition</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Combine Everest Base Camp with a 6,189m mountain summit for mountaineering enthusiasts.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,190</strong>
                </div>
                <a href="../trek/island-peak-climbing/"`
  );

  // Add 4 more cards after Card 9 if not already present
  if (!content.includes('gokyo-lake-trek-with-helicopter-return')) {
    const additionalCards = `
          <!-- Package Card 10: Gokyo Heli Return -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div class="exotic-img-wrapper" style="position: relative; height: 200px;">
              <img src="../images/gokyo-lake-trek-with-helicopter-return.webp" alt="Gokyo Lake Trek with Helicopter Return" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: #E05A47; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">10 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Gokyo Lakes Trek with Heli Return</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Ascend Gokyo Ri (5,357m) and fly back to Kathmandu or Lukla directly via scenic helicopter.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,990</strong>
                </div>
                <a href="../trek/gokyo-lake-trek-with-helicopter-return/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- Package Card 11: Gokyo Luxury -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div class="exotic-img-wrapper" style="position: relative; height: 200px;">
              <img src="../images/gokyo-lakes-luxury-trek.webp" alt="Gokyo Lakes Luxury Trek" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: var(--color-copper-orange); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">11 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Gokyo Lakes Luxury Trek</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Pristine glacial lakes and Gokyo Ri panorama with premium comfort lodges and private transfers.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,350</strong>
                </div>
                <a href="../trek/gokyo-lakes-luxury-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- Package Card 12: 1-Day EBC Heli Tour -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div class="exotic-img-wrapper" style="position: relative; height: 200px;">
              <img src="../images/everest-base-camp-helicopter-tour.webp" alt="Everest Base Camp Helicopter Tour" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: #0E3458; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">1 DAY</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Everest Base Camp Helicopter Tour</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Fly directly from Kathmandu to Kala Patthar & EBC with breakfast at Hotel Everest View.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,150</strong>
                </div>
                <a href="../tour/everest-base-camp-helicopter-tour/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- Package Card 13: Three High Passes with Island Peak -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div class="exotic-img-wrapper" style="position: relative; height: 200px;">
              <img src="../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest.webp" alt="Three High Passes with Island Peak Climb" style="width:100%; height:100%; object-fit:cover;">
              <span style="position: absolute; top: 12px; right: 12px; background: #D97706; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">21 DAYS</span>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Three Passes with Island Peak Climb</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">The ultimate Khumbu expedition: Kongma La, Cho La, Renjo La + 6,189m alpine summit.</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span>
                  <strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$2,790</strong>
                </div>
                <a href="../trek/three-high-passes-with-island-peak-climb/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">Explore →</a>
              </div>
            </div>
          </div>
`;
    // Insert before closing `</div>\n      </div>\n    </section>` of section 2
    content = content.replace(
      /(<a href="\.\.\/trek\/island-peak-climbing\/"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/div>\s*<\/section>)/,
      `$1\n${additionalCards}$2`
    );
  }

  // Update Everest Mega Menu Tab
  const everestMenuRegex = /<!-- Tab 3: Everest -->[\s\S]*?<!-- Tab 4: Manaslu -->/;
  const everestMenuNew = `<!-- Tab 3: Everest -->
                  <div class="mega-tab-content" id="tab-everest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Expedition</div>
                        <a href="../trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="../trek/everest-base-camp-via-gokyo-lakes/" class="mega-trek-link"><span>Cho La Pass & Gokyo Lakes</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="../trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes & Island Peak</span> <span class="days-badge">21 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Scenic & Cultural</div>
                        <a href="../trek/gokyo-lakes-trek/" class="mega-trek-link"><span>Gokyo Lakes Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/gokyo-lake-trek-with-helicopter-return/" class="mega-trek-link"><span>Gokyo Heli Return Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="../trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="../trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">9 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Luxury & Overland</div>
                        <a href="../trek/everest-base-camp-luxury-trek/" class="mega-trek-link"><span>EBC Luxury Lodge Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/gokyo-lakes-luxury-trek/" class="mega-trek-link"><span>Gokyo Luxury Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="../tour/everest-base-camp-helicopter-tour/" class="mega-trek-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                        <a href="../trek/everest-base-camp-trek-without-flight/" class="mega-trek-link"><span>EBC Overland (No Flight)</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Peak Climbing</div>
                        <a href="../trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="../trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="../trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="../peak-climbing-nepal/" class="mega-trek-link"><span>All Climbing Peaks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 4: Manaslu -->`;

  content = content.replace(everestMenuRegex, everestMenuNew);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated everest-region-treks/index.html');
}

// 3. Update nepal-trekking-packages/index.html
function updateTrekkingPackagesHub() {
  const file = path.join(ROOT, 'nepal-trekking-packages', 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  // Fix line 424 broken span
  content = content.replace(
    '<span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);"><div class="grid grid-3" id="treks-container">,490</span>',
    '<span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,490</span>'
  );

  // Update trek count from 41 to 49
  content = content.replace('Showing All Available Treks (41)', 'Showing All Available Treks (49)');

  // Add new package cards right after the existing new cards if not present
  if (!content.includes('everest-base-camp-luxury-trek')) {
    const newCards = `
          <!-- New Package 8: EBC Luxury Trek -->
          <div class="card trek-item" data-region="everest" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/everest-base-camp-luxury-trek.webp" alt="Everest Base Camp Luxury Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Luxury Lodge</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Everest Base Camp Luxury Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Trek to Everest Base Camp with heated luxury lodges, en-suite bathrooms, and gourmet dining.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 12 Days</span>
                <span>🏔️ 5,545 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,490</span>
                </div>
                <a href="../trek/everest-base-camp-luxury-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 9: Gokyo Lakes Luxury Trek -->
          <div class="card trek-item" data-region="everest" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/gokyo-lakes-luxury-trek.webp" alt="Gokyo Lakes Luxury Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Luxury Lodge</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Gokyo Lakes Luxury Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Turquoise alpine lakes and panoramic summit of Gokyo Ri (5,357m) with comfort lodge accommodations.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 11 Days</span>
                <span>🏔️ 5,357 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,350</span>
                </div>
                <a href="../trek/gokyo-lakes-luxury-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 10: Gokyo Heli Return -->
          <div class="card trek-item" data-region="everest" data-duration="medium" data-difficulty="moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/gokyo-lake-trek-with-helicopter-return.webp" alt="Gokyo Lake Trek with Helicopter Return" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #E05A47;">Heli Flyback</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Gokyo Lake Trek with Heli Return</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Trek to Gokyo Lakes and Gokyo Ri, then fly back to Kathmandu or Lukla directly via private helicopter.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 10 Days</span>
                <span>🏔️ 5,357 m</span>
                <span>⚡ Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,990</span>
                </div>
                <a href="../trek/gokyo-lake-trek-with-helicopter-return/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 11: EBC Overland / No Flight -->
          <div class="card trek-item" data-region="everest" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/everest-base-camp-trek-without-flight.webp" alt="Everest Base Camp Trek without Flight" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px;">Overland Jeep Route</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Everest Base Camp (Road Based)</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Overland jeep journey to Salleri / Paiya, eliminating Lukla flight weather delays entirely.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 18 Days</span>
                <span>🏔️ 5,545 m</span>
                <span>⚡ Strenuous</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$1,450</span>
                </div>
                <a href="../trek/everest-base-camp-trek-without-flight/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 12: Island Peak Climbing -->
          <div class="card trek-item" data-region="everest" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/island-peak-climbing.webp" alt="Island Peak Climbing & Everest Base Camp" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">6,000m Peak</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Island Peak Climbing & EBC</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Summit 6,189m Island Peak via headwall fixed ropes after acclimatizing at Everest Base Camp.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 19 Days</span>
                <span>🏔️ 6,189 m</span>
                <span>⚡ Technical</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,190</span>
                </div>
                <a href="../trek/island-peak-climbing/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 13: Mera Peak Climbing -->
          <div class="card trek-item" data-region="everest" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/mera-peak-climbing.webp" alt="Mera Peak Climbing Expedition" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">Highest Trekking Peak</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Mera Peak Climbing Expedition</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Reach 6,476m for an incomparable panorama of 5 of the world's 14 8,000-meter giants.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 18 Days</span>
                <span>🏔️ 6,476 m</span>
                <span>⚡ Demanding</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,090</span>
                </div>
                <a href="../trek/mera-peak-climbing/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 14: Lobuche East Peak -->
          <div class="card trek-item" data-region="everest" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/lobuche-peak-climbing.webp" alt="Lobuche East Peak Climbing" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #0E3458;">Alpine Technical</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Lobuche East Peak Climbing</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Climb 6,119m via snow ridges facing Everest south face, Nuptse, and Ama Dablam.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 18 Days</span>
                <span>🏔️ 6,119 m</span>
                <span>⚡ Technical</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,290</span>
                </div>
                <a href="../trek/lobuche-peak-climbing/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>

          <!-- New Package 15: Three Passes with Island Peak -->
          <div class="card trek-item" data-region="everest" data-duration="long" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest.webp" alt="Three High Passes with Island Peak Climb" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Ultimate Circuit</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Three Passes with Island Peak</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Kongma La, Cho La, and Renjo La pass crossings combined with a 6,189m alpine summit.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 21 Days</span>
                <span>🏔️ 6,189 m</span>
                <span>⚡ Extreme</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$2,790</span>
                </div>
                <a href="../trek/three-high-passes-with-island-peak-climb/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;
    content = content.replace(
      /(<a href="\.\.\/trek\/annapurna-circuit-luxury-trek\/"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/,
      `$1\n${newCards}`
    );
  }

  // Update Everest Mega Menu Tab in nepal-trekking-packages/index.html
  const everestMenuRegex = /<!-- Tab 3: Everest -->[\s\S]*?<!-- Tab 4: Manaslu -->/;
  const everestMenuNew = `<!-- Tab 3: Everest -->
                  <div class="mega-tab-content" id="tab-everest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Expedition</div>
                        <a href="../trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="../trek/everest-base-camp-via-gokyo-lakes/" class="mega-trek-link"><span>Cho La Pass & Gokyo Lakes</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="../trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes & Island Peak</span> <span class="days-badge">21 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Scenic & Cultural</div>
                        <a href="../trek/gokyo-lakes-trek/" class="mega-trek-link"><span>Gokyo Lakes Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/gokyo-lake-trek-with-helicopter-return/" class="mega-trek-link"><span>Gokyo Heli Return Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="../trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="../trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">9 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Luxury & Overland</div>
                        <a href="../trek/everest-base-camp-luxury-trek/" class="mega-trek-link"><span>EBC Luxury Lodge Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/gokyo-lakes-luxury-trek/" class="mega-trek-link"><span>Gokyo Luxury Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="../tour/everest-base-camp-helicopter-tour/" class="mega-trek-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                        <a href="../trek/everest-base-camp-trek-without-flight/" class="mega-trek-link"><span>EBC Overland (No Flight)</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Peak Climbing</div>
                        <a href="../trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="../trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="../trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="../peak-climbing-nepal/" class="mega-trek-link"><span>All Climbing Peaks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 4: Manaslu -->`;

  content = content.replace(everestMenuRegex, everestMenuNew);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated nepal-trekking-packages/index.html');
}

// 4. Update index.html mega menu
function updateIndexMegaMenu() {
  const file = path.join(ROOT, 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  const everestMenuRegex = /<!-- Tab 3: Everest -->[\s\S]*?<!-- Tab 4: Manaslu -->/;
  const everestMenuNew = `<!-- Tab 3: Everest -->
                  <div class="mega-tab-content" id="tab-everest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Expedition</div>
                        <a href="trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="trek/everest-base-camp-via-gokyo-lakes/" class="mega-trek-link"><span>Cho La Pass & Gokyo Lakes</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes & Island Peak</span> <span class="days-badge">21 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Scenic & Cultural</div>
                        <a href="trek/gokyo-lakes-trek/" class="mega-trek-link"><span>Gokyo Lakes Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="trek/gokyo-lake-trek-with-helicopter-return/" class="mega-trek-link"><span>Gokyo Heli Return Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">9 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Luxury & Overland</div>
                        <a href="trek/everest-base-camp-luxury-trek/" class="mega-trek-link"><span>EBC Luxury Lodge Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="trek/gokyo-lakes-luxury-trek/" class="mega-trek-link"><span>Gokyo Luxury Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="tour/everest-base-camp-helicopter-tour/" class="mega-trek-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                        <a href="trek/everest-base-camp-trek-without-flight/" class="mega-trek-link"><span>EBC Overland (No Flight)</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Peak Climbing</div>
                        <a href="trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="peak-climbing-nepal/" class="mega-trek-link"><span>All Climbing Peaks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 4: Manaslu -->`;

  content = content.replace(everestMenuRegex, everestMenuNew);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated index.html mega menu');
}

updatePeakClimbingHub();
updateEverestHub();
updateTrekkingPackagesHub();
updateIndexMegaMenu();
console.log('All hubs and menus successfully synchronized!');
