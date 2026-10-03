const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// -------------------------------------------------------------
// 1. UPDATE nepal-tour-packages.html & nepal-tour-packages/index.html
// -------------------------------------------------------------
function buildTourHubCards(isSubdir) {
  const prefix = isSubdir ? '../' : '';
  const tourPrefix = isSubdir ? '../tour/' : 'tour/';

  return `
            <!-- One Day Kathmandu City Tour -->
            <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; height: 200px; overflow: hidden;">
                  <img src="${prefix}images/one-day-kathmandu-city-tour-best-sightseeing-tour-in-nepal.webp" alt="One Day Kathmandu City Tour" style="width: 100%; height: 100%; object-fit: cover;">
                  <span style="position: absolute; top: 12px; left: 12px; background: #1A96C8; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">1 DAY</span>
                  <span style="position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #FFFFFF; font-size: 0.88rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">$75</span>
                </div>
                <div style="padding: 20px;">
                  <span style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Heritage & Culture</span>
                  <h3 style="font-size: 1.15rem; color: #0E3458; margin: 6px 0 10px 0; line-height: 1.35;">One Day Kathmandu City Tour</h3>
                  <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-bottom: 14px;">Visit Pashupatinath, Boudhanath, Swayambhunath Monkey Temple, and Kathmandu Durbar Square in one seamless day.</p>
                </div>
              </div>
              <div style="padding: 16px 20px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #F59E0B; font-size: 0.9rem; font-weight: 700;">★★★★★ 5.0</span>
                <a href="${tourPrefix}one-day-kathmandu-city-tour/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">View Itinerary →</a>
              </div>
            </div>

            <!-- Cycling Tour Around Kathmandu Valley -->
            <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; height: 200px; overflow: hidden;">
                  <img src="${prefix}images/cycling-tour-around-kathmandu-valley-biking-adventure.webp" alt="Cycling Tour Around Kathmandu Valley" style="width: 100%; height: 100%; object-fit: cover;">
                  <span style="position: absolute; top: 12px; left: 12px; background: #1A96C8; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">1–2 DAYS</span>
                  <span style="position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #FFFFFF; font-size: 0.88rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">$120</span>
                </div>
                <div style="padding: 20px;">
                  <span style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Adventure & Cycling</span>
                  <h3 style="font-size: 1.15rem; color: #0E3458; margin: 6px 0 10px 0; line-height: 1.35;">Cycling Tour Around Kathmandu Valley</h3>
                  <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-bottom: 14px;">Ride exhilarating single-tracks and pine trails through Mudkhu, Tokha, and Shivapuri with mountain vistas.</p>
                </div>
              </div>
              <div style="padding: 16px 20px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #F59E0B; font-size: 0.9rem; font-weight: 700;">★★★★★ 4.9</span>
                <a href="${tourPrefix}cycling-tour-around-kathmandu-valley/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">View Itinerary →</a>
              </div>
            </div>

            <!-- Jamacho Peak Day Hike -->
            <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; height: 200px; overflow: hidden;">
                  <img src="${prefix}images/jamacho-hike-1-day-hiking-shivapuri-national-park.webp" alt="Jamacho Peak Day Hike" style="width: 100%; height: 100%; object-fit: cover;">
                  <span style="position: absolute; top: 12px; left: 12px; background: #1A96C8; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">1 DAY</span>
                  <span style="position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #FFFFFF; font-size: 0.88rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">$65</span>
                </div>
                <div style="padding: 20px;">
                  <span style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Day Hike & Nature</span>
                  <h3 style="font-size: 1.15rem; color: #0E3458; margin: 6px 0 10px 0; line-height: 1.35;">Jamacho Peak Day Hike (2,128m)</h3>
                  <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-bottom: 14px;">Summit hike in Nagarjun protected forest to ancient Jamacho Gompa overlooking the entire valley and Himalayas.</p>
                </div>
              </div>
              <div style="padding: 16px 20px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #F59E0B; font-size: 0.9rem; font-weight: 700;">★★★★★ 4.9</span>
                <a href="${tourPrefix}jamacho-hike/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">View Itinerary →</a>
              </div>
            </div>

            <!-- 7-Day Rara Lake Overland Jeep Tour -->
            <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; height: 200px; overflow: hidden;">
                  <img src="${prefix}images/7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp" alt="7-Day Rara Lake Overland Jeep Tour" style="width: 100%; height: 100%; object-fit: cover;">
                  <span style="position: absolute; top: 12px; left: 12px; background: #1A96C8; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">7 DAYS</span>
                  <span style="position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #FFFFFF; font-size: 0.88rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">$850</span>
                </div>
                <div style="padding: 20px;">
                  <span style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Overland & 4WD</span>
                  <h3 style="font-size: 1.15rem; color: #0E3458; margin: 6px 0 10px 0; line-height: 1.35;">7-Day Rara Lake Overland Jeep Tour</h3>
                  <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-bottom: 14px;">4WD adventure along the Karnali canyon and Sinja Valley to the deep sapphire waters of Rara Lake (2,990m).</p>
                </div>
              </div>
              <div style="padding: 16px 20px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #F59E0B; font-size: 0.9rem; font-weight: 700;">★★★★★ 5.0</span>
                <a href="${tourPrefix}rara-lake-jeep-tour/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">View Itinerary →</a>
              </div>
            </div>

            <!-- Honeymoon Tour in Nepal -->
            <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; height: 200px; overflow: hidden;">
                  <img src="${prefix}images/honeymoon-tour-in-nepal.webp" alt="Honeymoon Tour in Nepal" style="width: 100%; height: 100%; object-fit: cover;">
                  <span style="position: absolute; top: 12px; left: 12px; background: #1A96C8; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">8 DAYS</span>
                  <span style="position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #FFFFFF; font-size: 0.88rem; font-weight: 800; padding: 4px 10px; border-radius: 50px;">$1,190</span>
                </div>
                <div style="padding: 20px;">
                  <span style="font-size: 0.8rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Luxury & Romance</span>
                  <h3 style="font-size: 1.15rem; color: #0E3458; margin: 6px 0 10px 0; line-height: 1.35;">Honeymoon Tour in Nepal (8 Days)</h3>
                  <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-bottom: 14px;">Boutique luxury heritage hotels, private Fewa Lake sunset cruise, couple's spa, and Nagarkot sunrise retreat.</p>
                </div>
              </div>
              <div style="padding: 16px 20px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #F59E0B; font-size: 0.9rem; font-weight: 700;">★★★★★ 5.0</span>
                <a href="${tourPrefix}honeymoon-tour-in-nepal/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">View Itinerary →</a>
              </div>
            </div>
`;
}

['nepal-tour-packages.html', 'nepal-tour-packages/index.html'].forEach(relFile => {
  const filePath = path.join(ROOT, relFile);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const isSubdir = relFile.includes('/');

  // Update description counter if present
  content = content.replace(/Explore 6 official Nepal tour packages/g, 'Explore official Nepal tour packages and day tours');

  if (!content.includes('One Day Kathmandu City Tour</h3>')) {
    const newCards = buildTourHubCards(isSubdir);
    content = content.replace(
      '<!-- Tour Packages Grid (6 Distinct Cards) -->',
      `<!-- Tour Packages Grid -->\n          ${newCards}`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${relFile}`);
});

// -------------------------------------------------------------
// 2. UPDATE nepal-trekking-packages.html & nepal-trekking-packages/index.html
// -------------------------------------------------------------
const chisapaniTrekCard = `
          <!-- Chisapani Nagarkot Circuit Trek Card -->
          <div class="card trek-item" data-region="kathmandu" data-duration="short" data-difficulty="easy-moderate">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/chisapani-nagarkot-trek.webp" alt="Chisapani Nagarkot Trek" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #1A96C8;">Valley Rim Classic</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Chisapani Nagarkot Trek</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Hike through Shivapuri National Park to Chisapani pass and witness sunrise over Everest from Nagarkot.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 3 Days</span>
                <span>🏔️ 2,215 m</span>
                <span>🥾 Easy to Moderate</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$249</span>
                </div>
                <a href="../trek/chisapani-nagarkot-trek/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

['nepal-trekking-packages/index.html', 'nepal-trekking-packages.html'].forEach(relFile => {
  const filePath = path.join(ROOT, relFile);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Counter 59 -> 60
  content = content.replace(/Showing All Available Treks \(59\)/g, 'Showing All Available Treks (60)');

  // Insert card before Trek Card 33 if not present
  if (!content.includes('Chisapani Nagarkot Trek</h3>')) {
    content = content.replace('<!-- Trek Card 33 -->', `${chisapaniTrekCard}\n          <!-- Trek Card 33 -->`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${relFile}`);
});
