const fs = require('fs');

let content = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');
console.log('Original length:', content.length, 'Original lines:', content.split('\n').length);

// 1. Fix the broken gallery collage: replace lines 598-648 with clean 5-photo collage
const oldGalleryRegex = /<!-- Multi-Image Collage Gallery -->[\s\S]*?<!-- Key Trip Facts Grid -->/;

const cleanGallery = `<!-- Multi-Image Collage Gallery -->
    <div class="container" style="margin-bottom: 24px;">
      <div class="trek-gallery-collage">
        <div class="trek-gallery-main">
          <img src="../../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp" alt="Upper Mustang Trek (14 Days) Ancient Lo Manthang">
          <div class="trek-gallery-badge">
            <div class="trek-gallery-badge-icon" style="background: #00af87; display: flex; align-items: center; justify-content: center;">
              <svg class="icon-svg icon-sm icon-svg-fill" style="stroke: none; fill: white;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
            <div class="trek-gallery-badge-text">
              <span>Travelers' Choice</span>
              <span>Best of the Best 2026</span>
            </div>
          </div>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp" alt="Lo Manthang Walled City">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/upper-mustang-trek-cost-and-itinerary.webp" alt="Upper Mustang Cliff Sky Caves">
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp" alt="Tibetan Monastery in Mustang">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/upper-mustang.webp" alt="Mustang Red Rock Canyons">
        </div>
      </div>
    </div>

    <!-- Key Trip Facts Grid -->`;

if (oldGalleryRegex.test(content)) {
  content = content.replace(oldGalleryRegex, cleanGallery);
  console.log('✓ Fixed gallery collage and removed dangling Everest photos');
} else {
  console.error('✗ Failed to match old gallery regex');
}

// 2. Fix Region Badge & Facts
content = content.replace(
  '<span class="pill pill-copper" style="margin-bottom: 0;">Everest Region • Classic Himalayan Expedition</span>',
  '<span class="pill pill-copper" style="margin-bottom: 0;">Mustang Region • Kingdom of Lo & Sky Caves</span>'
);

content = content.replace(
  '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Everest</span>',
  '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Mustang (Annapurna Rain Shadow)</span>'
);

// 3. Fix data-trek-key and grid alignment
content = content.replace(
  'data-trek-details-wrapper data-trek-key="ebc"',
  'data-trek-details-wrapper data-trek-key="mustang"'
);
content = content.replace(
  '<div class="container trek-detail-layout" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px;">',
  '<div class="container trek-detail-layout" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 40px; align-items: start;">'
);

// 4. Fix Overview text mismatch
const oldOverview = `<p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              The 14-day Everest Base Camp Trek is the ultimate bucket-list adventure in the Nepalese Himalayas. Beginning with a scenic mountain flight to Jomsom, the route follows the historic footprints of Sir Edmund Hillary and Tenzing Norgay Sherpa along the Dudh Koshi river.
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              Highlight features include acclimatization days in Lo Manthang, visiting Tengboche Monastery under the shadow of Ama Dablam, standing on Mustang Glacier at Everest Base Camp (<span data-altitude-m="5364">5,364m</span>), and watching the sunrise over Mt. Everest from Kala Patthar (<span data-altitude-m="5545">5,545m</span>).
            </p>`;

const cleanOverview = `<p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              The 14-day Upper Mustang Trek is an extraordinary journey into the former Kingdom of Lo, a remote trans-Himalayan Tibetan enclave that remained strictly forbidden to outsiders until 1992. Beginning from Jomsom after a scenic mountain flight along the world's deepest Kali Gandaki Gorge, the trail navigates through wind-sculpted sandstone cliffs, vibrant ochre canyons, and whitewashed mud-brick settlements.
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              Highlight features include exploring the 15th-century fortified capital of Lo Manthang (<span data-altitude-m="3840">3,840m</span>), entering 2,500-year-old sky caves carved into sheer cliff faces at Chhoser, visiting Ghar Gompa (one of the oldest active Buddhist monasteries in the world), and crossing scenic passes like Nyi La (<span data-altitude-m="4010">4,010m</span>) with panoramic views of Nilgiri, Tilicho, and Annapurna.
            </p>`;

if (content.includes('Sir Edmund Hillary and Tenzing Norgay Sherpa along the Dudh Koshi river')) {
  content = content.replace(oldOverview, cleanOverview);
  console.log('✓ Fixed Overview text');
}

// 5. Fix sidebar pricing and trek title
content = content.replace(
  '<span style="font-size: 2.5rem; font-weight: 800; color: #0E3458; line-height: 1;">$1,299</span>',
  '<span style="font-size: 2.5rem; font-weight: 800; color: #0E3458; line-height: 1;">$1,790</span>'
);

content = content.replace(
  '<strong style="color: #0E3458;">$1,234 / person</strong>',
  '<strong style="color: #0E3458;">$1,720 / person</strong>'
);
content = content.replace(
  '<strong style="color: #0E3458;">$1,169 / person</strong>',
  '<strong style="color: #0E3458;">$1,650 / person</strong>'
);
content = content.replace(
  '<strong style="color: #F6851F;">$1,104 / person (Best Deal)</strong>',
  '<strong style="color: #F6851F;">$1,550 / person (Best Deal)</strong>'
);

content = content.replaceAll(
  'data-trek-title="Everest Base Camp Trek (Aug 5 - Aug 18, 2026)"',
  'data-trek-title="Upper Mustang Trek (14 Days)"'
);

content = content.replace(
  '<h3 style="font-size: 1.5rem; margin-bottom: 6px;">Inquire About Everest Base Camp Trek</h3>',
  '<h3 style="font-size: 1.5rem; margin-bottom: 6px;">Inquire About Upper Mustang Trek</h3>'
);

// 6. Fix closing tags of the sidebar, section, and main layout
const oldSidebarEnd = `                  </a>
                </div>
              </div>

            </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  </main>`;

const cleanSidebarEnd = `                  </a>
                </div>
              </div>

            </div> <!-- Closes .sidebar-booking-card -->
          </div> <!-- Closes right column wrapper -->

        </div> <!-- Closes .container.trek-detail-layout -->
      </div>
    </section>`;

if (content.includes(oldSidebarEnd)) {
  content = content.replace(oldSidebarEnd, cleanSidebarEnd);
  console.log('✓ Fixed sidebar closing tags and removed premature </main>');
} else {
  console.log('Note: oldSidebarEnd exact string not matched, checking regex...');
  const sidebarRegex = /<!-- Phone & WhatsApp Round Buttons -->[\s\S]*?<\/main>[\s\S]*?<!-- Inquiry Modal -->/;
}

// 7. Fix You Might Also Like section with authentic Mustang & nearby routes
const oldYmlRegex = /<!-- You Might Also Like — Full-Width Recommendation Section -->[\s\S]*?<\/section>[\s\S]*?<\/article>[\s\S]*?<\/main>/;

const cleanYml = `<!-- You Might Also Like — Full-Width Recommendation Section -->
  <section class="you-might-like-section">
    <div class="container">
      <div class="yml-header">
        <span class="yml-pill-tag">MORE ADVENTURES</span>
        <div class="yml-title-row">
          <span class="yml-accent-bar"></span>
          <h2 class="yml-title">You might also like</h2>
        </div>
        <p class="yml-subtitle">Handpicked trips in the Mustang and Annapurna region — authentic Himalayan experiences.</p>
      </div>

      <div class="yml-cards-grid">
        <!-- Card 1: Upper Mustang 4WD Jeep Tour -->
        <a href="../../trek/upper-mustang-jeep-tour/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" alt="Upper Mustang 4WD Jeep Tour" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge">Overland 4WD</span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Upper Mustang 4WD Jeep Tour</h3>
            <div class="yml-card-rating">
              <span class="yml-stars">★★★★★</span>
              <span class="yml-rating-text">5.0 · 64 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>$1,990</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>

        <!-- Card 2: Upper Mustang Tiji Festival Tour -->
        <a href="../../trek/upper-mustang-tiji-festival/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/upper-mustang-tiji-festival-spectacular-culture-rituals.webp" alt="Upper Mustang Tiji Festival Tour" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge">Cultural Festival</span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Upper Mustang Tiji Festival Tour</h3>
            <div class="yml-card-rating">
              <span class="yml-stars">★★★★★</span>
              <span class="yml-rating-text">5.0 · 49 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>$2,190</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>

        <!-- Card 3: Annapurna Circuit Trek -->
        <a href="../../trek/annapurna-circuit-trek/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/annapurna-circuit-trek-nepal-classic-thorong-la-pass-thorong-phedi.webp" alt="Annapurna Circuit Trek" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge yml-badge-duration">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              13 Days
            </span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Annapurna Circuit Trek</h3>
            <div class="yml-card-rating">
              <span class="yml-stars">★★★★★</span>
              <span class="yml-rating-text">5.0 · 112 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>$1,090</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
  </article>
</main>`;

if (oldYmlRegex.test(content)) {
  content = content.replace(oldYmlRegex, cleanYml);
  console.log('✓ Fixed You Might Also Like section and closing article/main tags');
} else {
  console.error('✗ Could not match oldYmlRegex');
}

fs.writeFileSync('trek/upper-mustang-trek/index.html', content, 'utf8');
console.log('Saved trek/upper-mustang-trek/index.html');
