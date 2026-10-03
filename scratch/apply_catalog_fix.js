const fs = require('fs');
const path = require('path');

// Load 60 cards
const all60 = JSON.parse(fs.readFileSync('scratch/all60_cards.json', 'utf8'));

function getBadgeGradient(badgeText, region) {
  const b = (badgeText || '').toLowerCase();
  if (b.includes('luxury') || b.includes('vip')) return 'linear-gradient(135deg, #D97706, #B45309)';
  if (b.includes('heli') || b.includes('flyback')) return 'linear-gradient(135deg, #E05A47, #C84634)';
  if (b.includes('peak') || b.includes('alpine') || b.includes('climb')) return 'linear-gradient(135deg, #2563EB, #1D4ED8)';
  if (b.includes('restricted') || b.includes('forbidden') || b.includes('sanctuary')) return 'linear-gradient(135deg, #7C3AED, #5B21B6)';
  if (b.includes('overland') || b.includes('4wd') || b.includes('tea')) return 'linear-gradient(135deg, #EA580C, #C2410C)';
  if (b.includes('culture') || b.includes('festival') || b.includes('heritage')) return 'linear-gradient(135deg, #059669, #047857)';
  if (b.includes('lake') || b.includes('glacier') || b.includes('valley')) return 'linear-gradient(135deg, #0284C7, #0369A1)';
  if (b.includes('classic') || b.includes('world') || b.includes('himalayan')) return 'linear-gradient(135deg, #0E3458, #1A96C8)';
  return 'linear-gradient(135deg, #0E3458, #1A96C8)';
}

function renderCards(isRoot = false) {
  return all60.map((c, idx) => {
    const rawPriceNum = parseInt(c.price.replace(/[^0-9]/g, ''), 10) || 990;
    const daysNumMatch = c.days.match(/([0-9]+)/);
    const rawDaysNum = daysNumMatch ? parseInt(daysNumMatch[1], 10) : 10;
    
    let durationCat = 'medium';
    if (rawDaysNum <= 7) durationCat = 'short';
    else if (rawDaysNum >= 13) durationCat = 'long';

    let diffCat = 'moderate';
    const dl = (c.difficultyText || '').toLowerCase();
    if (dl.includes('easy')) diffCat = 'easy-moderate';
    else if (dl.includes('extreme') || dl.includes('strenuous')) diffCat = 'strenuous';
    else if (dl.includes('challeng') || dl.includes('technical')) diffCat = 'challenging';
    else diffCat = 'moderate';

    let badgeText = c.badge || (c.region.charAt(0).toUpperCase() + c.region.slice(1) + ' Region');
    const badgeGradient = getBadgeGradient(badgeText, c.region);

    let imgPath = c.image;
    let linkPath = c.link;
    if (isRoot) {
      imgPath = imgPath.replace(/^\.\.\//, '');
      linkPath = linkPath.replace(/^\.\.\//, '');
    } else {
      if (!imgPath.startsWith('../')) imgPath = '../' + imgPath;
      if (!linkPath.startsWith('../')) linkPath = '../' + linkPath;
    }

    return `          <!-- Trek Card: ${c.title} -->
          <div class="card trek-item" 
               data-region="${c.region}" 
               data-duration="${durationCat}" 
               data-difficulty="${diffCat}" 
               data-price="${rawPriceNum}" 
               data-days="${rawDaysNum}" 
               data-title="${c.title.toLowerCase()}">
            <div class="trek-item-media">
              <img src="${imgPath}" alt="${c.alt || c.title}" loading="lazy" width="400" height="220">
              <span class="trek-badge-pill" style="background: ${badgeGradient};">${badgeText}</span>
              <span class="trek-duration-pill">⏱️ ${c.days}</span>
            </div>
            <div class="trek-item-body">
              <div class="trek-item-top">
                <h3 class="trek-item-title">${c.title}</h3>
                <p class="trek-item-desc">${c.desc}</p>
              </div>
              <div class="trek-item-meta">
                <span class="trek-meta-chip">⏱️ ${c.days}</span>
                <span class="trek-meta-chip">🏔️ ${c.altitude || 'High Altitude'}</span>
                <span class="trek-meta-chip">⚡ ${c.difficultyText}</span>
              </div>
              <div class="trek-item-footer">
                <div class="trek-price-wrap">
                  <span class="trek-price-label">Starting from</span>
                  <span class="trek-price-value">${c.price}</span>
                </div>
                <a href="${linkPath}" class="trek-action-btn">View Itinerary →</a>
              </div>
            </div>
          </div>`;
  }).join('\n\n');
}

function buildMainContent(isRoot = false) {
  const rel = isRoot ? '' : '../';
  const cardsHtml = renderCards(isRoot);

  return `    <!-- Page Header Banner -->
    <section style="background: linear-gradient(rgba(7, 29, 54, 0.82), rgba(7, 29, 54, 0.92)), url('${rel}images/hero-himalayas.webp') center/cover no-repeat; color: white; padding: 75px 0 65px 0; text-align: center;">
      <div class="container">
        <span class="pill pill-copper" style="margin-bottom: 12px; display: inline-block;">Official Expedition Directory</span>
        <h1 style="font-size: 2.8rem; color: white; margin-top: 10px; font-family: 'Outfit', sans-serif; font-weight: 800; letter-spacing: -0.02em;">Explore All Nepal Trekking Packages</h1>
        <p style="font-size: 1.12rem; color: var(--color-neutral-300); max-width: 740px; margin: 16px auto 0 auto; line-height: 1.6;">
          Handcrafted itineraries, licensed Sherpa guide leadership, and 100% safety commitment across Nepal's iconic classic circuits and remote wilderness frontiers.
        </p>
      </div>
    </section>

    <!-- Trek Search & Filter Widget -->
    <section class="catalog-filter-section">
      <div class="container">

        <!-- Regional Quick Filter Pills Bar -->
        <div class="region-pills-wrap">
          <div class="region-pills-header">
            <strong class="region-pills-title">
              <span class="region-pills-title-icon">📍</span>
              Quick Filter by Destination:
            </strong>
            <span class="region-pills-hint">Select a region to instant filter 60 packages</span>
          </div>
          <div class="region-pills-container">
            <button type="button" class="region-quick-pill active" data-region="all">🌍 All Packages (60)</button>
            <button type="button" class="region-quick-pill" data-region="everest">🏔️ Everest Region</button>
            <button type="button" class="region-quick-pill" data-region="annapurna">🥾 Annapurna Region</button>
            <button type="button" class="region-quick-pill" data-region="langtang">🌲 Langtang Valley</button>
            <button type="button" class="region-quick-pill" data-region="manaslu">🌀 Manaslu Circuit</button>
            <button type="button" class="region-quick-pill" data-region="mustang">🏰 Upper Mustang</button>
            <button type="button" class="region-quick-pill" data-region="dolpo">💎 Dolpo Region</button>
            <button type="button" class="region-quick-pill" data-region="kanchenjunga">❄️ Kanchenjunga</button>
            <button type="button" class="region-quick-pill" data-region="peaks">⛏️ Peak Climbing</button>
            <button type="button" class="region-quick-pill" data-region="short">⚡ Short Treks (1-7D)</button>
          </div>
        </div>

        <!-- Interactive Filter Panel -->
        <div class="catalog-filter-box">
          <div class="catalog-filter-header">
            <h2 class="catalog-filter-title">Filter & Search Trekking Packages</h2>
            <span style="font-size: 0.85rem; color: #94A3B8;">Instant results updated in real-time</span>
          </div>
          <div class="catalog-filter-grid">
            <div class="catalog-filter-group">
              <label for="filter-search">Search Keyword</label>
              <input type="text" id="filter-search" class="catalog-filter-input" placeholder="e.g. Gokyo, Circuit, Helicopter, Base Camp...">
            </div>
            <div class="catalog-filter-group">
              <label for="filter-region">Region</label>
              <select id="filter-region" class="catalog-filter-select">
                <option value="all">All Regions</option>
                <option value="everest">Everest Region</option>
                <option value="annapurna">Annapurna Region</option>
                <option value="langtang">Langtang Region</option>
                <option value="manaslu">Manaslu Region</option>
                <option value="mustang">Mustang Region</option>
                <option value="dolpo">Dolpo Region</option>
                <option value="kanchenjunga">Kanchenjunga Region</option>
                <option value="peaks">Peak Climbing</option>
                <option value="remote">Remote Wilderness</option>
                <option value="kathmandu">Kathmandu Rim</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <label for="filter-duration">Duration</label>
              <select id="filter-duration" class="catalog-filter-select">
                <option value="all">All Durations</option>
                <option value="short">Short (1 - 7 Days)</option>
                <option value="medium">Medium (8 - 12 Days)</option>
                <option value="long">Long (13+ Days)</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <label for="filter-difficulty">Difficulty</label>
              <select id="filter-difficulty" class="catalog-filter-select">
                <option value="all">All Difficulty Levels</option>
                <option value="easy-moderate">Easy to Moderate</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="strenuous">Strenuous / Extreme</option>
              </select>
            </div>
            <div class="catalog-filter-group">
              <label for="filter-sort">Sort By</label>
              <select id="filter-sort" class="catalog-filter-select">
                <option value="default">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-short">Duration: Shortest</option>
                <option value="duration-long">Duration: Longest</option>
              </select>
            </div>
            <div>
              <button id="reset-filters-btn" type="button" class="btn-reset-filters">↺ Reset Filters</button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Treks Grid Listing -->
    <section class="section-padding" style="padding-top: 50px; padding-bottom: 70px;">
      <div class="container">
        <div class="catalog-results-header">
          <h2 class="catalog-results-title" id="treks-count-display">Showing All 60 Available Treks</h2>
          <span style="color: var(--color-neutral-600); font-weight: 500; font-size: 0.95rem;">Guaranteed Departures • 100% Sherpa Led</span>
        </div>

        <div class="catalog-grid-container grid grid-3" id="treks-container">
${cardsHtml}

          <!-- Empty State -->
          <div id="treks-empty-state" class="treks-empty-card">
            <span class="treks-empty-icon">🏔️</span>
            <h3 class="treks-empty-title">No matching trekking packages found</h3>
            <p class="treks-empty-text">We couldn't find any trek packages matching your current filter criteria. Try broadening your duration, difficulty, or region selections.</p>
            <button type="button" class="btn btn-primary" onclick="document.getElementById('reset-filters-btn').click();">Reset All Filters</button>
          </div>
        </div>
      </div>
    </section>

    <section style="background-color: var(--color-primary-dark); color: white; padding: 60px 0; text-align: center;">
      <div class="container">
        <h2 style="font-size: 2rem; color: white; margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Don't see your dream trekking route?</h2>
        <p style="color: var(--color-neutral-300); max-width: 650px; margin: 0 auto 24px auto;">
          We specialize in tailor-made Himalayan itineraries, private departures, custom side-trips, and luxury helicopter returns.
        </p>
        <a href="${rel}custom-plan.html" class="btn btn-primary">Plan A Custom Itinerary</a>
      </div>
    </section>`;
}

function updateFile(filePath, isRoot) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Replace content between <main> and </main>
  const mainStart = fileContent.indexOf('<main>');
  const mainEnd = fileContent.indexOf('</main>');

  if (mainStart === -1 || mainEnd === -1) {
    console.error('Could not find <main> tags in', filePath);
    return;
  }

  const newMain = '<main>\n' + buildMainContent(isRoot) + '\n  </main>';
  let updated = fileContent.slice(0, mainStart) + newMain + fileContent.slice(mainEnd + 7);

  // Replace scripts at the bottom: replace trek-finder.js with nepal-trek-packages.js
  const rel = isRoot ? '' : '../';
  updated = updated.replace(/<script type="module" src="[^"]*js\/trek-finder\.js"><\/script>/, `<script src="${rel}js/nepal-trek-packages.js"></script>`);
  if (!updated.includes('js/nepal-trek-packages.js')) {
    updated = updated.replace('</body>', `  <script src="${rel}js/nepal-trek-packages.js"></script>\n</body>`);
  }

  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('Successfully updated', filePath);
}

updateFile('nepal-trekking-packages/index.html', false);
if (fs.existsSync('nepal-trekking-packages.html')) {
  updateFile('nepal-trekking-packages.html', true);
}
