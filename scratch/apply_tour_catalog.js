const fs = require('fs');
const path = require('path');

const tours = JSON.parse(fs.readFileSync('scratch/verified_14_tours.json', 'utf8'));
console.log(`Loaded ${tours.length} verified tours.`);

// Custom CSS for tour packages page
const customStyles = `
  <style>
    /* Category Quick Filter Pills */
    .category-pills-wrap {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 18px;
      padding: 22px 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
    }
    .category-pills-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .category-pills-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #071D36;
      letter-spacing: -0.01em;
    }
    .category-pills-title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: #EEF6FF;
      color: #1A96C8;
      font-size: 14px;
    }
    .category-pills-hint {
      font-size: 0.8rem;
      color: #64748B;
      font-weight: 500;
    }
    .category-pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }
    .category-quick-pill {
      background: #F8FAFC;
      color: #1E293B;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      border: 1.5px solid #E2E8F0;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      user-select: none;
      white-space: nowrap;
    }
    .category-quick-pill:hover {
      background: #FFFFFF;
      color: #071D36;
      border-color: #1A96C8;
      box-shadow: 0 3px 10px rgba(26, 150, 200, 0.15);
      transform: translateY(-2px);
    }
    .category-quick-pill.active {
      background: #071D36 !important;
      color: #FFFFFF !important;
      border-color: #071D36 !important;
      box-shadow: 0 4px 14px rgba(7, 29, 54, 0.28) !important;
      transform: translateY(-1px);
    }
    @media (max-width: 768px) {
      .category-pills-wrap {
        padding: 16px;
        border-radius: 14px;
      }
      .category-pills-container {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        padding-bottom: 6px;
        margin-bottom: -2px;
        scrollbar-width: none;
      }
      .category-pills-container::-webkit-scrollbar {
        display: none;
      }
      .category-quick-pill {
        flex-shrink: 0;
        scroll-snap-align: start;
        padding: 7px 15px;
        font-size: 0.82rem;
      }
    }

    /* Filter Toolbar Box */
    .catalog-filter-box {
      background: linear-gradient(135deg, #071D36 0%, #0F325E 100%);
      border-radius: 16px;
      padding: 28px 32px;
      box-shadow: 0 12px 35px rgba(7, 29, 54, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }
    .catalog-filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .catalog-filter-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }
    .catalog-filter-grid {
      display: grid;
      grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr auto;
      gap: 14px;
      align-items: end;
    }
    @media (max-width: 1200px) {
      .catalog-filter-grid {
        grid-template-columns: repeat(2, 1fr) auto;
      }
    }
    @media (max-width: 768px) {
      .catalog-filter-grid {
        grid-template-columns: 1fr;
      }
    }
    .catalog-filter-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
      color: #94A3B8;
    }
    .catalog-filter-input,
    .catalog-filter-select {
      width: 100%;
      padding: 11px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.2s ease;
    }
    .catalog-filter-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    .catalog-filter-input:focus,
    .catalog-filter-select:focus {
      border-color: #1A96C8;
      background: rgba(255, 255, 255, 0.14);
      box-shadow: 0 0 0 3px rgba(26, 150, 200, 0.3);
    }
    .catalog-filter-select option {
      background-color: #071D36;
      color: #FFFFFF;
    }
    .btn-reset-filters {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 11px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      width: 100%;
    }
    .btn-reset-filters:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: #FFFFFF;
    }

    /* Results Header */
    .catalog-results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .catalog-results-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: #071D36;
      margin: 0;
    }

    /* Grid layout */
    .catalog-grid-container {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 28px !important;
      align-items: stretch !important;
    }
    @media (max-width: 1024px) {
      .catalog-grid-container {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 22px !important;
      }
    }
    @media (max-width: 640px) {
      .catalog-grid-container {
        grid-template-columns: 1fr !important;
        gap: 18px !important;
      }
    }

    /* Tour Cards */
    .card.tour-item {
      background: #FFFFFF !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.07) !important;
      border: 1px solid rgba(226, 232, 240, 0.9) !important;
      display: flex;
      flex-direction: column !important;
      height: 100% !important;
      transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.28s ease !important;
      position: relative !important;
    }
    .card.tour-item.is-hidden {
      display: none !important;
    }
    .card.tour-item:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 16px 36px rgba(14, 52, 88, 0.15) !important;
      border-color: rgba(26, 150, 200, 0.4) !important;
    }
    .tour-item-media {
      position: relative !important;
      height: 220px !important;
      width: 100% !important;
      overflow: hidden !important;
      background-color: #0F172A !important;
      flex-shrink: 0 !important;
    }
    .tour-item-media img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .card.tour-item:hover .tour-item-media img {
      transform: scale(1.06) !important;
    }
    .tour-item-media::after {
      content: '' !important;
      position: absolute !important;
      inset: 0 !important;
      background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.4) 100%) !important;
      pointer-events: none !important;
    }
    .tour-badge-pill {
      position: absolute !important;
      top: 14px !important;
      left: 14px !important;
      z-index: 2 !important;
      font-size: 0.72rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.04em !important;
      text-transform: uppercase !important;
      color: #FFFFFF !important;
      padding: 5px 12px !important;
      border-radius: 9999px !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
    }
    .tour-duration-pill {
      position: absolute !important;
      top: 14px !important;
      right: 14px !important;
      z-index: 2 !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      color: #FFFFFF !important;
      background: rgba(7, 29, 54, 0.8) !important;
      padding: 5px 12px !important;
      border-radius: 9999px !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
    }
    .tour-item-body {
      padding: 24px !important;
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      background: #FFFFFF !important;
    }
    .tour-item-top {
      display: flex !important;
      flex-direction: column !important;
    }
    .tour-item-title {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      color: #071D36 !important;
      line-height: 1.35 !important;
      margin-bottom: 8px !important;
      min-height: 2.7em !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }
    .tour-item-desc {
      font-family: 'Inter', sans-serif !important;
      font-size: 0.88rem !important;
      color: #475569 !important;
      line-height: 1.55 !important;
      margin-bottom: 18px !important;
      min-height: 2.8em !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }
    .tour-item-meta {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      margin-bottom: 20px !important;
    }
    .tour-meta-chip {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      background: #F8FAFC !important;
      color: #334155 !important;
      font-size: 0.8rem !important;
      font-weight: 600 !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid #E2E8F0 !important;
    }
    .tour-item-footer {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-top: 1px solid #E2E8F0 !important;
      padding-top: 16px !important;
      margin-top: auto !important;
      gap: 12px !important;
    }
    .tour-price-wrap {
      display: flex !important;
      flex-direction: column !important;
    }
    .tour-price-label {
      font-size: 0.72rem !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #64748B !important;
      font-weight: 600 !important;
    }
    .tour-price-value {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.35rem !important;
      font-weight: 800 !important;
      color: #071D36 !important;
      line-height: 1.1 !important;
    }
    .tour-action-btn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      background-color: #E05A47 !important;
      color: #FFFFFF !important;
      font-weight: 600 !important;
      font-size: 0.88rem !important;
      padding: 9px 18px !important;
      border-radius: 8px !important;
      text-decoration: none !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 4px 12px rgba(224, 90, 71, 0.25) !important;
    }
    .tour-action-btn:hover {
      background-color: #C84634 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 16px rgba(224, 90, 71, 0.35) !important;
    }

    /* Empty State Card */
    .tours-empty-card {
      grid-column: 1 / -1 !important;
      background: #FFFFFF !important;
      border: 2px dashed #CBD5E1 !important;
      border-radius: 16px !important;
      padding: 60px 24px !important;
      text-align: center !important;
      display: none;
    }
    .tours-empty-icon {
      font-size: 3rem !important;
      margin-bottom: 16px !important;
      display: block !important;
    }
    .tours-empty-title {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.4rem !important;
      color: #071D36 !important;
      margin-bottom: 8px !important;
    }
    .tours-empty-text {
      color: #64748B !important;
      max-width: 500px !important;
      margin: 0 auto 20px auto !important;
      font-size: 0.95rem !important;
    }
  </style>
`;

function buildMainContent(isSubdir) {
  const prefix = isSubdir ? '../' : '';

  // Render cards
  const cardsHtml = tours.map(t => {
    const imgPath = isSubdir ? t.image : t.image.replace('../', '');
    const linkPath = isSubdir ? t.link : t.link.replace('../', '');
    const chipsHtml = t.metaChips.map(c => `<span class="tour-meta-chip">${c}</span>`).join('\n                ');

    return `          <!-- Tour Card: ${t.title} -->
          <div class="card tour-item" 
               data-category="${t.category}" 
               data-duration="${t.durationCat}" 
               data-price="${t.priceNum}" 
               data-days="${t.daysNum}" 
               data-title="${t.title.toLowerCase()}"
               data-tags="${t.categoryLabel.toLowerCase()} ${t.slug.toLowerCase()}">
            <div class="tour-item-media">
              <img src="${imgPath}" alt="${t.alt}" loading="lazy" width="400" height="220">
              <span class="tour-badge-pill" style="background: ${t.badgeBg};">${t.badge}</span>
              <span class="tour-duration-pill">⏱️ ${t.days}</span>
            </div>
            <div class="tour-item-body">
              <div class="tour-item-top">
                <h3 class="tour-item-title">${t.title}</h3>
                <p class="tour-item-desc">${t.desc}</p>
              </div>
              <div class="tour-item-meta">
                ${chipsHtml}
              </div>
              <div class="tour-item-footer">
                <div class="tour-price-wrap">
                  <span class="tour-price-label">Starting from</span>
                  <span class="tour-price-value">${t.price}</span>
                </div>
                <a href="${linkPath}" class="tour-action-btn">View Itinerary →</a>
              </div>
            </div>
          </div>`;
  }).join('\n\n');

  return `  <main>
    <!-- Hero Section -->
    <section class="reviews-hero-section" style="padding: 70px 0 45px 0;">
      <div class="container">
        <div style="max-width: 860px; margin: 0 auto; text-align: center;">
          <span class="pill pill-copper" style="margin-bottom: 14px; display: inline-flex; align-items: center; gap: 6px;">
            <span>✨</span> Himalayan Sightseeing, Heritage & Wildlife
          </span>
          <h1 class="reviews-hero-title" style="margin-bottom: 18px;">Nepal Tour Packages & Sightseeing</h1>
          <p class="reviews-hero-desc" style="font-size: 1.1rem; line-height: 1.65; max-width: 740px; margin: 0 auto;">
            Explore official curated Nepal tour packages with Igloo Himalaya Treks: ancient UNESCO World Heritage temples in Kathmandu, tranquil lakes & Annapurna sunrises in Pokhara, raw subtropical jungle safaris in Chitwan, VIP Everest helicopter landings, and rugged 4WD overland expeditions.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Catalog Grid Section -->
    <section class="section-padding" style="background: #F8FAFC; padding-top: 40px; padding-bottom: 75px;">
      <div class="container">
        
        <!-- Category Quick Pills -->
        <div class="category-pills-wrap">
          <div class="category-pills-header">
            <strong class="category-pills-title">
              <span class="category-pills-title-icon">📍</span>
              Quick Filter by Category:
            </strong>
            <span class="category-pills-hint">Select a travel style to instant filter 14 tour packages</span>
          </div>
          <div class="category-pills-container">
            <button type="button" class="category-quick-pill active" data-category="all">🌍 All Packages (${tours.length})</button>
            <button type="button" class="category-quick-pill" data-category="cultural">🏛️ Cultural & Heritage (4)</button>
            <button type="button" class="category-quick-pill" data-category="nature">🦏 Wildlife & Nature (4)</button>
            <button type="button" class="category-quick-pill" data-category="heli">🚁 Helicopter Flights (2)</button>
            <button type="button" class="category-quick-pill" data-category="overland">🚙 4WD Overland (2)</button>
            <button type="button" class="category-quick-pill" data-category="hikes">🥾 Active Hikes & Cycling (2)</button>
          </div>
        </div>

        <!-- Interactive Filter Panel -->
        <div class="catalog-filter-box" style="margin-bottom: 40px;">
          <div class="catalog-filter-header">
            <h2 class="catalog-filter-title">Filter & Search Tour Packages</h2>
            <span style="font-size: 0.85rem; color: #94A3B8;">Instant results updated in real-time</span>
          </div>
          <div class="catalog-filter-grid">
            <div class="catalog-filter-group">
              <label for="filter-search">Search Keyword</label>
              <input type="text" id="filter-search" class="catalog-filter-input" placeholder="e.g. Kathmandu, Chitwan, Helicopter, Rara, Sunrise...">
            </div>
            <div class="catalog-filter-group">
              <label for="filter-category">Tour Style</label>
              <select id="filter-category" class="catalog-filter-select">
                <option value="all">All Tour Styles (14)</option>
                <option value="cultural">Cultural & Heritage Tours</option>
                <option value="nature">Nature, Wildlife & Romance</option>
                <option value="heli">Helicopter Sightseeing</option>
                <option value="overland">4WD Overland Jeep Expeditions</option>
                <option value="hikes">Active Day Hikes & Mountain Biking</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <label for="filter-duration">Duration</label>
              <select id="filter-duration" class="catalog-filter-select">
                <option value="all">All Durations</option>
                <option value="short">Short / Day Tours (1 - 7 Days)</option>
                <option value="medium">Classic Multi-Day (8 - 12 Days)</option>
                <option value="long">Extended Journey (13+ Days)</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <label for="filter-sort">Sort By</label>
              <select id="filter-sort" class="catalog-filter-select">
                <option value="default">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-short">Duration: Shortest First</option>
                <option value="duration-long">Duration: Longest First</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <button type="button" id="reset-filters-btn" class="btn-reset-filters">↻ Reset All</button>
            </div>
          </div>
        </div>

        <!-- Results Counter & Grid -->
        <div class="catalog-results-header">
          <h2 class="catalog-results-title" id="tours-count-display">Showing All 14 Available Tour Packages</h2>
          <span style="color: var(--color-neutral-600); font-weight: 500; font-size: 0.95rem;">Private AC Transportation • Certified Guides • Guaranteed Departures</span>
        </div>

        <!-- 3-Column Catalog Grid -->
        <div class="catalog-grid-container grid grid-3" id="tours-container">
${cardsHtml}

          <!-- Empty State -->
          <div class="tours-empty-card" id="tours-empty-state">
            <span class="tours-empty-icon">🔍</span>
            <h3 class="tours-empty-title">No tour packages match your search</h3>
            <p class="tours-empty-text">We couldn't find any tour packages matching your active filters. Try clearing your search keyword or switching tour styles.</p>
            <button type="button" class="btn btn-primary" onclick="document.getElementById('reset-filters-btn').click();" style="padding: 10px 24px;">Reset All Filters</button>
          </div>
        </div>

      </div>
    </section>
  </main>`;
}

// 1. Process nepal-tour-packages/index.html
const indexPath = 'nepal-tour-packages/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Inject or update custom styles in <head>
if (indexContent.includes('Category Quick Filter Pills')) {
  indexContent = indexContent.replace(/<style>[\s\S]*?Category Quick Filter Pills[\s\S]*?<\/style>/, customStyles.trim());
} else {
  indexContent = indexContent.replace('</head>', `${customStyles}\n</head>`);
}

// Replace <main>...</main>
const mainRegex = /<main>[\s\S]*?<\/main>/;
indexContent = indexContent.replace(mainRegex, buildMainContent(true));

// Inject js script before </body>
if (!indexContent.includes('js/nepal-tour-packages.js')) {
  indexContent = indexContent.replace('</body>', `  <script src="../js/nepal-tour-packages.js"></script>\n</body>`);
}

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Successfully updated nepal-tour-packages/index.html');

// 2. Process nepal-tour-packages.html
const htmlPath = 'nepal-tour-packages.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

if (htmlContent.includes('Category Quick Filter Pills')) {
  htmlContent = htmlContent.replace(/<style>[\s\S]*?Category Quick Filter Pills[\s\S]*?<\/style>/, customStyles.trim());
} else {
  htmlContent = htmlContent.replace('</head>', `${customStyles}\n</head>`);
}

htmlContent = htmlContent.replace(mainRegex, buildMainContent(false));

if (!htmlContent.includes('js/nepal-tour-packages.js')) {
  htmlContent = htmlContent.replace('</body>', `  <script src="js/nepal-tour-packages.js"></script>\n</body>`);
}

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully updated nepal-tour-packages.html');
