const fs = require('fs');

let content = fs.readFileSync('annapurna-region-treks/index.html', 'utf8');

// 1. Fix old links
content = content.replace(/href="\.\.\/trek\/annapurna-base-camp-trek\/"/g, 'href="../trek/annapurna-base-camp/"');
content = content.replace(/(<h3[^>]*>Khopra Danda Ridge Trek<\/h3>[\s\S]*?)href="\.\.\/trek\/annapurna-base-camp\/"/, '$1href="../trek/khopra-ridge-trek/"');

// 2. Add extra trek cards to Section 2
const newCardsHtml = `
          <!-- New Package 1: Annapurna Base Camp Heli Return -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/annapurna-base-camp-trek-heli-return.webp" alt="Annapurna Base Camp Heli Return Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: #E05A47; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">8 DAYS • HELI FLYBACK</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">ABC Trek with Helicopter Return</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Trek up to Annapurna Base Camp (4,130m) and fly back to Pokhara by private charter helicopter.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,490</strong></div>
                <a href="../trek/annapurna-base-camp-heli-return/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 2: Ghorepani Poon Hill with Mardi Himal -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/ghorepani-poon-hill-with-mardi-himal-trek.webp" alt="Ghorepani Poon Hill with Mardi Himal Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">9 DAYS • COMBO</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Ghorepani Poon Hill with Mardi Himal</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Two iconic treks in one: Poon Hill golden sunrise (3,210m) plus Mardi Himal Base Camp ridge (4,500m).</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$750</strong></div>
                <a href="../trek/ghorepani-poon-hill-with-mardi-himal-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 3: ABC with Mardi Himal Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/abc-with-mardi-himal-trek.webp" alt="Annapurna Base Camp with Mardi Himal Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">12 DAYS • DUAL ASCENT</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">ABC with Mardi Himal Trek</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">The ultimate dual expedition: deep Annapurna Sanctuary glacial valley plus high alpine Mardi ridge.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$990</strong></div>
                <a href="../trek/abc-with-mardi-himal-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 4: Annapurna Luxury Lodge Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/annapurna-luxury-trek.webp" alt="Annapurna Luxury Lodge Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: #D97706; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">7 DAYS • LUXURY</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Annapurna Luxury Lodge Trek</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Stay in premier boutique mountain heritage lodges with private en-suite baths, gourmet dining, and heated beds.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,690</strong></div>
                <a href="../trek/annapurna-luxury-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 5: Annapurna Circuit Luxury Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/annapurna-circuit-luxury-trek.webp" alt="Annapurna Circuit Luxury Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: #D97706; color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">12 DAYS • VIP CIRCUIT</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Annapurna Circuit Luxury Trek</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Traverse Thorong La Pass (5,416m) with private 4WD support, boutique lodges, and 5-star lakeside resorts.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,990</strong></div>
                <a href="../trek/annapurna-circuit-luxury-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 6: Short Annapurna Base Camp Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/short-annapurna-base-camp-trek.webp" alt="Short Annapurna Base Camp Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">6 DAYS • FAST TRACK</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Short Annapurna Base Camp Trek</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Direct express ascent to 4,130m Annapurna Sanctuary for fit hikers on a tight holiday timeframe.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$590</strong></div>
                <a href="../trek/short-annapurna-base-camp-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>

          <!-- New Package 7: Annapurna Short Trek -->
          <div class="exotic-trek-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;"><img src="../images/panchase-trek-best-short-trek-near-pokhara-nepal.webp" alt="Annapurna Short Trek" style="width:100%; height:100%; object-fit:cover;"><span style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">4 DAYS • EASY SCENIC</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div><h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">Annapurna Short Trek</h3><p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Scenic 4-day introductory loop visiting Poon Hill (3,210m) and Gurung heritage in Ghandruk.</p></div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$390</strong></div>
                <a href="../trek/annapurna-short-trek/" style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>
              </div>
            </div>
          </div>
`;

// Insert before the closing div of the best-treks grid
content = content.replace(/(<div class="exotic-trek-card"[\s\S]*?Khopra Danda Ridge Trek[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/section>\s*<!-- SECTION 3: Compare Table)/, `$1\n${newCardsHtml}$2`);

fs.writeFileSync('annapurna-region-treks/index.html', content, 'utf8');
console.log('Updated annapurna-region-treks/index.html successfully!');
