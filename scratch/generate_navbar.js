const fs = require('fs');
const path = require('path');

function getNavbarHtml(prefix, activeMenu = '') {
  const isTreksActive = activeMenu === 'treks' ? ' active' : '';
  const isToursActive = activeMenu === 'tours' ? ' active' : '';
  const isRegionsActive = activeMenu === 'regions' ? ' active' : '';
  const isGuideActive = activeMenu === 'guide' ? ' active' : '';
  const isCompanyActive = activeMenu === 'company' ? ' active' : '';
  const isBlogActive = activeMenu === 'blog' ? ' active' : '';
  const isContactActive = activeMenu === 'contact' ? ' active' : '';

  return `  <!-- Header Navigation -->
  <header class="main-header">
    <div class="container flex-between">
      <a href="${prefix}index.html" class="logo-brand" aria-label="Igloo Himalaya Treks">
        <img src="${prefix}images/logo.png" alt="Igloo Himalaya Treks" width="85" height="70" style="height: 70px; width: auto; object-fit: contain;" loading="eager" decoding="async" fetchpriority="high">
      </a>

      <!-- Hamburger Menu Button -->
      <button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <!-- Navigation Links -->
      <nav>
        <ul class="nav-menu">
          <!-- Mega Menu Dropdown for All Treks -->
          <li class="nav-item-dropdown mega-nav-item">
            <div class="nav-link-row">
              <a href="${prefix}nepal-trekking-packages/" class="nav-link${isTreksActive}">All Treks <span class="nav-link-arrow-desktop">▾</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle All Treks submenu">▾</button>
            </div>
            <!-- Mobile Accordion Menu for All Treks -->
            <div class="mobile-accordion-menu">
              <a href="${prefix}nepal-trekking-packages/" class="mobile-accordion-overview-link">Explore All 60+ Trek Packages →</a>
              <div class="mobile-accordion-group-title">Popular Himalayan Classics</div>
              <a href="${prefix}trek/everest-base-camp-trek/" class="nav-dropdown-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
              <a href="${prefix}trek/annapurna-circuit-trek/" class="nav-dropdown-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
              <a href="${prefix}trek/manaslu-circuit-trek/" class="nav-dropdown-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
              <a href="${prefix}trek/annapurna-base-camp/" class="nav-dropdown-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">9 DAYS</span></a>
              <a href="${prefix}trek/langtang-valley-trek/" class="nav-dropdown-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
              <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="nav-dropdown-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">4 DAYS</span></a>
              <a href="${prefix}trek/mardi-himal-trek/" class="nav-dropdown-link"><span>Mardi Base Camp Trek</span> <span class="days-badge">6 DAYS</span></a>
              <a href="${prefix}trek/chisapani-nagarkot-trek/" class="nav-dropdown-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">3 DAYS</span></a>
              <div class="mobile-accordion-group-title">Peak Climbing Expeditions</div>
              <a href="${prefix}trek/island-peak-climbing/" class="nav-dropdown-link"><span>Island Peak Climbing</span> <span class="days-badge">19 DAYS</span></a>
              <a href="${prefix}trek/mera-peak-climbing/" class="nav-dropdown-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
              <a href="${prefix}trek/lobuche-peak-climbing/" class="nav-dropdown-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">18 DAYS</span></a>
              <a href="${prefix}trek/yala-peak-climbing/" class="nav-dropdown-link"><span>Yala Peak Climbing</span> <span class="days-badge">11 DAYS</span></a>
              <div class="mobile-accordion-group-title">Remote & Forbidden Kingdom</div>
              <a href="${prefix}trek/upper-mustang-trek/" class="nav-dropdown-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
              <a href="${prefix}trek/upper-dolpo-trek/" class="nav-dropdown-link"><span>Upper Dolpo Circuit Trek</span> <span class="days-badge">24 DAYS</span></a>
              <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="nav-dropdown-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
            </div>
            <div class="mega-menu-dropdown">
              <div class="mega-menu-container">

                <!-- Left Sidebar Navigation -->
                <div class="mega-menu-sidebar">
                  <div class="mega-sidebar-item active" data-target="tab-popular">Popular Treks in Nepal</div>
                  <div class="mega-sidebar-item" data-target="tab-everest">Everest</div>
                  <div class="mega-sidebar-item" data-target="tab-annapurna">Annapurna</div>
                  <div class="mega-sidebar-item" data-target="tab-manaslu">Manaslu</div>
                  <div class="mega-sidebar-item" data-target="tab-langtang">Langtang</div>
                  <div class="mega-sidebar-item" data-target="tab-peaks">Peak Climbing</div>
                  <div class="mega-sidebar-item" data-target="tab-mustang">Mustang</div>
                  <div class="mega-sidebar-item" data-target="tab-dolpo">Dolpo</div>
                  <div class="mega-sidebar-item" data-target="tab-kanchenjunga">Kanchenjunga</div>
                  <div class="mega-sidebar-item" data-target="tab-short">Short Treks</div>
                  <div class="mega-sidebar-item" data-target="tab-wilderness">Wilderness & Off-Grid</div>
                </div>

                <!-- Right Content Area -->
                <div class="mega-menu-content-wrap">
                  <div class="mega-top-bar">
                    <button class="mega-talk-pill open-inquiry-btn">Confused? Let's Talk ↗</button>
                  </div>

                  <!-- Tab 1: Popular Treks in Nepal (Default 4-Column Grid) -->
                  <div class="mega-tab-content active" id="tab-popular">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Two weeks Trek</div>
                        <a href="${prefix}trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-trek/" class="mega-trek-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-base-camp/" class="mega-trek-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">9 DAYS</span></a>
                      </div>

                      <div class="mega-col">
                        <div class="mega-col-title">One week Treks</div>
                        <a href="${prefix}trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">4 DAYS</span></a>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Base Camp Trek</span> <span class="days-badge">6 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                      </div>

                      <div class="mega-col">
                        <div class="mega-col-title">Remote and Unexplored</div>
                        <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu Tsum Valley Trek</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek</span> <span class="days-badge">24 DAYS</span></a>
                      </div>

                      <div class="mega-col">
                        <div class="mega-col-title">Short Treks & Highlights</div>
                        <a href="${prefix}trek/chisapani-nagarkot-trek/" class="mega-trek-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">3 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-short-trek/" class="mega-trek-link"><span>Annapurna Short Trek</span> <span class="days-badge">4 DAYS</span></a>
                        <a href="${prefix}trek/khopra-ridge-trek/" class="mega-trek-link"><span>Khopra Ridge Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}nepal-trekking-packages/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All 60+ Trek Packages →</span> <span class="days-badge">EXPLORE</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 2: Everest -->
                  <div class="mega-tab-content" id="tab-everest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Expedition</div>
                        <a href="${prefix}trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-via-gokyo-lakes/" class="mega-trek-link"><span>Cho La Pass & Gokyo Lakes</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes & Island Peak</span> <span class="days-badge">21 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Scenic & Cultural</div>
                        <a href="${prefix}trek/gokyo-lakes-trek/" class="mega-trek-link"><span>Gokyo Lakes Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/gokyo-lake-trek-with-helicopter-return/" class="mega-trek-link"><span>Gokyo Heli Return Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">9 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Luxury & Overland</div>
                        <a href="${prefix}trek/everest-base-camp-luxury-trek/" class="mega-trek-link"><span>EBC Luxury Lodge Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/gokyo-lakes-luxury-trek/" class="mega-trek-link"><span>Gokyo Luxury Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}tour/everest-base-camp-helicopter-tour/" class="mega-trek-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-without-flight/" class="mega-trek-link"><span>EBC Overland (No Flight)</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Peak Climbing & Hub</div>
                        <a href="${prefix}trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}everest-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Everest Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 3: Annapurna -->
                  <div class="mega-tab-content" id="tab-annapurna">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Classic Treks</div>
                        <a href="${prefix}trek/annapurna-base-camp/" class="mega-trek-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-trek/" class="mega-trek-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/tilicho-lake-trek/" class="mega-trek-link"><span>Tilicho Lake & Annapurna</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-base-camp-heli-return/" class="mega-trek-link"><span>ABC with Heli Return</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/short-annapurna-base-camp-trek/" class="mega-trek-link"><span>Short ABC Trek</span> <span class="days-badge">6 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Short & Panoramic</div>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">4 DAYS</span></a>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Himal Ridge Trek</span> <span class="days-badge">6 DAYS</span></a>
                        <a href="${prefix}trek/khopra-ridge-trek/" class="mega-trek-link"><span>Khopra Ridge Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-short-trek/" class="mega-trek-link"><span>Annapurna Short Trek</span> <span class="days-badge">4 DAYS</span></a>
                        <a href="${prefix}trek/panchase-trek/" class="mega-trek-link"><span>Panchase Scenic Trek</span> <span class="days-badge">4 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Combos & Luxury</div>
                        <a href="${prefix}trek/ghorepani-poon-hill-with-mardi-himal-trek/" class="mega-trek-link"><span>Poon Hill & Mardi Combo</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/abc-with-mardi-himal-trek/" class="mega-trek-link"><span>ABC with Mardi Himal</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-luxury-trek/" class="mega-trek-link"><span>Annapurna Luxury Lodge</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-luxury-trek/" class="mega-trek-link"><span>Circuit Luxury Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}annapurna-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Annapurna Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 4: Manaslu -->
                  <div class="mega-tab-content" id="tab-manaslu">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Circuit & Passes</div>
                        <a href="${prefix}trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-circuit-trek-12-days/" class="mega-trek-link"><span>Manaslu Circuit 12 Days</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Restricted Valley</div>
                        <a href="${prefix}trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/tsum-valley-trek/" class="mega-trek-link"><span>Hidden Tsum Valley Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}manaslu-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Manaslu Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 5: Langtang -->
                  <div class="mega-tab-content" id="tab-langtang">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Valley & Lakes</div>
                        <a href="${prefix}trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/gosaikunda-lake-trek/" class="mega-trek-link"><span>Sacred Gosaikunda Lake</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/langtang-gosaikunda-trek/" class="mega-trek-link"><span>Langtang & Gosaikunda</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Grand Combos & Traverse</div>
                        <a href="${prefix}trek/tamang-heritage-trail-with-langtang-valley-trek/" class="mega-trek-link"><span>Tamang & Langtang Combo</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/langtang-gosaikunda-helambu-trek/" class="mega-trek-link"><span>Langtang Gosaikunda Helambu</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/helambu-trek/" class="mega-trek-link"><span>Helambu Circuit Trek</span> <span class="days-badge">6 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Cultural Trails & Peaks</div>
                        <a href="${prefix}trek/tamang-heritage-trail-trek/" class="mega-trek-link"><span>Tamang Heritage Trail</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}langtang-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Langtang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 6: Peak Climbing -->
                  <div class="mega-tab-content" id="tab-peaks">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Popular Trekking Peaks</div>
                        <a href="${prefix}trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing (6,189m)</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing (6,476m)</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak (6,119m)</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Technical & Pass Combos</div>
                        <a href="${prefix}trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes & Island Peak</span> <span class="days-badge">21 DAYS</span></a>
                        <a href="${prefix}peak-climbing-nepal/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Peak Climbing Trips →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 7: Mustang -->
                  <div class="mega-tab-content" id="tab-mustang">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Forbidden Kingdom & Culture</div>
                        <a href="${prefix}trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/upper-mustang-jeep-tour/" class="mega-trek-link"><span>Upper Mustang 4WD Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/upper-mustang-tiji-festival/" class="mega-trek-link"><span>Mustang Tiji Festival Tour</span> <span class="days-badge">15 DAYS</span></a>
                        <a href="${prefix}mustang-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Mustang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 8: Dolpo -->
                  <div class="mega-tab-content" id="tab-dolpo">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Trans-Himalayan Plateau</div>
                        <a href="${prefix}trek/upper-dolpo-trek/" class="mega-trek-link"><span>Upper Dolpo Circuit Trek</span> <span class="days-badge">24 DAYS</span></a>
                        <a href="${prefix}trek/lower-dolpo-trek/" class="mega-trek-link"><span>Lower Dolpo Wilderness Trek</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}dolpo-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Dolpo Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 9: Kanchenjunga -->
                  <div class="mega-tab-content" id="tab-kanchenjunga">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Far Eastern Giant</div>
                        <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">24 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-base-camp-trek/" class="mega-trek-link"><span>Kanchenjunga Base Camp</span> <span class="days-badge">22 DAYS</span></a>
                        <a href="${prefix}kanchenjunga-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Kanchenjunga Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 10: Short Treks -->
                  <div class="mega-tab-content" id="tab-short">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Short Himalayan Treks</div>
                        <a href="${prefix}trek/chisapani-nagarkot-trek/" class="mega-trek-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">3 DAYS</span></a>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">4 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-short-trek/" class="mega-trek-link"><span>Annapurna Short Trek</span> <span class="days-badge">4 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Panoramic Ridges</div>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Himal Ridge Trek</span> <span class="days-badge">6 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/panchase-trek/" class="mega-trek-link"><span>Panchase Scenic Trek</span> <span class="days-badge">4 DAYS</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 11: Remote Wilderness -->
                  <div class="mega-tab-content" id="tab-wilderness">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Glacial Expeditions</div>
                        <a href="${prefix}trek/makalu-base-camp-trek/" class="mega-trek-link"><span>Makalu Base Camp Trek</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/rolwaling-valley-trek/" class="mega-trek-link"><span>Rolwaling & Tashi Lapcha</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/dhaulagiri-circuit-trek/" class="mega-trek-link"><span>Dhaulagiri Circuit Trek</span> <span class="days-badge">16 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Off-The-Grid Wilderness</div>
                        <a href="${prefix}trek/ruby-valley-trek/" class="mega-trek-link"><span>Ganesh Himal Ruby Valley</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}trek/rara-lake-trek/" class="mega-trek-link"><span>Rara Lake Wilderness Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}restricted-area-treks-nepal/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Restricted Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </li>

          <!-- Standard Tour Packages Dropdown (Enhanced Multi-Column) -->
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <a href="${prefix}nepal-tour-packages/" class="nav-link${isToursActive}">Nepal Tours <span class="nav-link-arrow-desktop">▾</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Nepal Tours submenu">▾</button>
            </div>
            <div class="nav-dropdown-menu tour-dropdown-menu">
              <div>
                <div class="tour-dropdown-col-title">Cultural & Heritage Tours</div>
                <a href="${prefix}tour/one-day-kathmandu-city-tour/" class="nav-dropdown-link"><span>1-Day Kathmandu City Tour</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/kathmandu-cultural-heritage-tour/" class="nav-dropdown-link"><span>Kathmandu Heritage Tour</span> <span class="days-badge">4 DAYS</span></a>
                <a href="${prefix}tour/kathmandu-pokhara-chitwan-tour/" class="nav-dropdown-link"><span>Best of Nepal (Golden Triangle)</span> <span class="days-badge">8 DAYS</span></a>
                <a href="${prefix}tour/pokhara-valley-nature-tour/" class="nav-dropdown-link"><span>Pokhara Valley Nature Tour</span> <span class="days-badge">4 DAYS</span></a>
                <a href="${prefix}tour/nagarkot-sunrise-bhaktapur-tour/" class="nav-dropdown-link"><span>Nagarkot Sunrise & Bhaktapur</span> <span class="days-badge">3 DAYS</span></a>
                <a href="${prefix}tour/lumbini-birthplace-of-buddha-tour/" class="nav-dropdown-link"><span>Lumbini Buddhist Heritage</span> <span class="days-badge">4 DAYS</span></a>
                <a href="${prefix}tour/honeymoon-tour-in-nepal/" class="nav-dropdown-link"><span>Romantic Honeymoon Tour</span> <span class="days-badge">8 DAYS</span></a>
              </div>
              <div>
                <div class="tour-dropdown-col-title">Day Hikes, Cycling, Safari & Helis</div>
                <a href="${prefix}tour/cycling-tour-around-kathmandu-valley/" class="nav-dropdown-link"><span>Kathmandu Cycling Tour</span> <span class="days-badge">1-2 DAYS</span></a>
                <a href="${prefix}tour/jamacho-hike/" class="nav-dropdown-link"><span>Jamacho Peak Forest Hike</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/chitwan-national-park-safari/" class="nav-dropdown-link"><span>Chitwan Jungle Safari</span> <span class="days-badge">3 DAYS</span></a>
                <a href="${prefix}tour/rara-lake-jeep-tour/" class="nav-dropdown-link"><span>Rara Lake Overland Jeep Tour</span> <span class="days-badge">7 DAYS</span></a>
                <a href="${prefix}tour/everest-base-camp-helicopter-tour/" class="nav-dropdown-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/nepal-luxury-helicopter-tour/" class="nav-dropdown-link"><span>Luxury Helicopter Tour</span> <span class="days-badge">5 DAYS</span></a>
                <a href="${prefix}nepal-tour-packages/" class="nav-dropdown-link" style="color: #1A96C8; font-weight: 700; border-top: 1px solid #f1f5f9; margin-top: 6px; padding-top: 8px;"><span>Explore All Tour Packages →</span></a>
              </div>
            </div>
          </li>

          <!-- Standard Trekking Regions Dropdown -->
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <a href="${prefix}trekking-regions-nepal/" class="nav-link${isRegionsActive}">Trekking Regions <span class="nav-link-arrow-desktop">▾</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Trekking Regions submenu">▾</button>
            </div>
            <div class="nav-dropdown-menu">
              <a href="${prefix}everest-region-treks/" class="nav-dropdown-link">Everest Region Treks</a>
              <a href="${prefix}annapurna-region-treks/" class="nav-dropdown-link">Annapurna Region Treks</a>
              <a href="${prefix}langtang-region-treks/" class="nav-dropdown-link">Langtang Region Treks</a>
              <a href="${prefix}manaslu-region-treks/" class="nav-dropdown-link">Manaslu Region Treks</a>
              <a href="${prefix}mustang-region-treks/" class="nav-dropdown-link">Mustang Region Treks</a>
              <a href="${prefix}dolpo-region-treks/" class="nav-dropdown-link">Dolpo Region Treks</a>
              <a href="${prefix}kanchenjunga-region-treks/" class="nav-dropdown-link">Kanchenjunga Region Treks</a>
              <a href="${prefix}ganesh-himal-region-treks/" class="nav-dropdown-link">Ganesh Himal Region Treks</a>
              <a href="${prefix}makalu-region-treks/" class="nav-dropdown-link">Makalu Region Treks</a>
              <a href="${prefix}rolwaling-region-treks/" class="nav-dropdown-link">Rolwaling Region Treks</a>
              <a href="${prefix}restricted-area-treks-nepal/" class="nav-dropdown-link">Restricted Area Treks</a>
              <a href="${prefix}peak-climbing-nepal/" class="nav-dropdown-link">Peak Climbing in Nepal</a>
              <a href="${prefix}trekking-regions-nepal/" class="nav-dropdown-link" style="color: #1A96C8; font-weight: 700; border-top: 1px solid #f1f5f9; margin-top: 4px; padding-top: 8px;">Explore All Regions →</a>
            </div>
          </li>

          <!-- Travel Guide Dropdown -->
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <a href="${prefix}nepal-travel-guide/" class="nav-link${isGuideActive}">Travel Guide <span class="nav-link-arrow-desktop">▾</span></a>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Travel Guide submenu">▾</button>
            </div>
            <div class="nav-dropdown-menu">
              <a href="${prefix}nepal-travel-guide/" class="nav-dropdown-link">Nepal Travel Guide</a>
              <a href="${prefix}nepal-visa/" class="nav-dropdown-link">Nepal Visa</a>
              <a href="${prefix}equipment-checklist/" class="nav-dropdown-link">Equipment Checklist</a>
              <a href="${prefix}travel-insurance/" class="nav-dropdown-link">Travel Insurance</a>
              <a href="${prefix}recommended-medical-kit/" class="nav-dropdown-link">Recommended Medical Kit</a>
            </div>
          </li>

          <!-- Company Info Dropdown -->
          <li class="nav-item-dropdown">
            <div class="nav-link-row">
              <span class="nav-link${isCompanyActive}">Company Info <span class="nav-link-arrow-desktop">▾</span></span>
              <button type="button" class="mobile-dropdown-arrow" aria-label="Toggle Company Info submenu">▾</button>
            </div>
            <div class="nav-dropdown-menu">
              <a href="${prefix}about.html" class="nav-dropdown-link">About Us</a>
              <a href="${prefix}team.html" class="nav-dropdown-link">Meet Our Team</a>
              <a href="${prefix}careers.html" class="nav-dropdown-link">Careers & Jobs</a>
              <a href="${prefix}reviews.html" class="nav-dropdown-link">Reviews & Testimonials</a>
              <a href="${prefix}custom-plan.html" class="nav-dropdown-link">Tailor-Made Trip Planner</a>
            </div>
          </li>

          <li><a href="${prefix}blogs.html" class="nav-link${isBlogActive}">Blog</a></li>
          <li><a href="${prefix}contact.html" class="nav-link${isContactActive}">Contact</a></li>

          <!-- Mobile Drawer Action Strip -->
          <li class="mobile-nav-drawer-actions">
            <button class="btn btn-primary open-inquiry-btn mobile-drawer-cta">Plan Custom Trip</button>
          </li>
        </ul>
      </nav>

      <div>
        <button class="btn btn-primary open-inquiry-btn">Book Custom Trip</button>
      </div>
    </div>
  </header>`;
}

module.exports = { getNavbarHtml };
