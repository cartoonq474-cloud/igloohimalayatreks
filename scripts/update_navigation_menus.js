const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function checkTagBalance(content, filePath) {
  const tags = ["div", "section", "article", "main", "form", "table", "ul", "li", "nav"];
  let hasError = false;
  tags.forEach(tag => {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, "gi");
    const closeRegex = new RegExp(`</${tag}>`, "gi");
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      console.log(`❌ ${filePath}: Tag <${tag}> mismatch! Open: ${openCount}, Close: ${closeCount}`);
      hasError = true;
    }
  });
  return !hasError;
}

function generateMobileAccordion(prefix) {
  return `<!-- Mobile Accordion Menu for All Treks -->
            <div class="mobile-accordion-menu">
              <a href="${prefix}nepal-trekking-packages/" class="mobile-accordion-overview-link">Explore All Trek Packages →</a>
              <div class="mobile-accordion-group-title">Popular Himalayan Classics</div>
              <a href="${prefix}trek/everest-base-camp-trek/" class="nav-dropdown-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
              <a href="${prefix}trek/annapurna-circuit-trek/" class="nav-dropdown-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
              <a href="${prefix}trek/manaslu-circuit-trek/" class="nav-dropdown-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
              <a href="${prefix}trek/annapurna-base-camp-trek/" class="nav-dropdown-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">10 DAYS</span></a>
              <a href="${prefix}trek/langtang-valley-trek/" class="nav-dropdown-link"><span>Langtang Valley Trek</span> <span class="days-badge">10 DAYS</span></a>
              <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="nav-dropdown-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">9 DAYS</span></a>
              <a href="${prefix}trek/mardi-himal-trek/" class="nav-dropdown-link"><span>Mardi Base Camp Trek</span> <span class="days-badge">8 DAYS</span></a>
              <a href="${prefix}trek/chisapani-nagarkot-trek/" class="nav-dropdown-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">5 DAYS</span></a>
              <div class="mobile-accordion-group-title">Peak Climbing Expeditions</div>
              <a href="${prefix}trek/island-peak-climbing/" class="nav-dropdown-link"><span>Island Peak Climbing</span> <span class="days-badge">16 DAYS</span></a>
              <a href="${prefix}trek/mera-peak-climbing/" class="nav-dropdown-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
              <a href="${prefix}trek/lobuche-peak-climbing/" class="nav-dropdown-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">16 DAYS</span></a>
              <a href="${prefix}trek/yala-peak-climbing/" class="nav-dropdown-link"><span>Yala Peak Climbing</span> <span class="days-badge">12 DAYS</span></a>
              <div class="mobile-accordion-group-title">Remote &amp; Forbidden Kingdom</div>
              <a href="${prefix}trek/upper-mustang-trek/" class="nav-dropdown-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">16 DAYS</span></a>
              <a href="${prefix}trek/nar-phu-valley-trek/" class="nav-dropdown-link"><span>Nar Phu Valley Hidden Trek</span> <span class="days-badge">13 DAYS</span></a>
              <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="nav-dropdown-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">20 DAYS</span></a>
            </div>`;
}

function generateMegaMenu(prefix) {
  return `<div class="mega-menu-dropdown">
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
                  <div class="mega-sidebar-item" data-target="tab-wilderness">Wilderness &amp; Off-Grid</div>
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
                        <a href="${prefix}trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-trek/" class="mega-trek-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-base-camp-trek/" class="mega-trek-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">One week Treks</div>
                        <a href="${prefix}trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Base Camp Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Remote and Unexplored</div>
                        <a href="${prefix}trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu Tsum Valley Trek</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/nar-phu-valley-trek/" class="mega-trek-link"><span>Nar Phu Valley Hidden Trek</span> <span class="days-badge">13 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Short Treks &amp; Highlights</div>
                        <a href="${prefix}trek/chisapani-nagarkot-trek/" class="mega-trek-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">5 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-view-trek/" class="mega-trek-link"><span>Annapurna View Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/khopra-ridge-trek/" class="mega-trek-link"><span>Khopra Ridge Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}nepal-trekking-packages/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Trek Packages →</span> <span class="days-badge">EXPLORE</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 2: Everest Region -->
                  <div class="mega-tab-content" id="tab-everest">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">High Expedition</div>
                        <a href="${prefix}trek/everest-base-camp-trek/" class="mega-trek-link"><span>Everest Base Camp Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">21 DAYS</span></a>
                        <a href="${prefix}trek/ebc-chola-pass-gokyo-trek/" class="mega-trek-link"><span>Cho La Pass &amp; Gokyo Lakes</span> <span class="days-badge">17 DAYS</span></a>
                        <a href="${prefix}trek/everest-chola-and-renjo-la-pass-trek/" class="mega-trek-link"><span>Cho La &amp; Renjo La Pass</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes &amp; Island Peak</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-with-island-peak-climb/" class="mega-trek-link"><span>EBC with Island Peak</span> <span class="days-badge">19 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Scenic &amp; Cultural</div>
                        <a href="${prefix}trek/gokyo-lakes-trek/" class="mega-trek-link"><span>Gokyo Lakes Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/gokyo-lake-with-renjo-la-pass-trek/" class="mega-trek-link"><span>Gokyo &amp; Renjo La Pass</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/gokyo-lake-trek-with-helicopter-return/" class="mega-trek-link"><span>Gokyo Heli Return Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/tengboche-trek/" class="mega-trek-link"><span>Tengboche Monastery Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Luxury &amp; Overland</div>
                        <a href="${prefix}trek/everest-base-camp-luxury-trek/" class="mega-trek-link"><span>EBC Luxury Lodge Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/gokyo-lakes-luxury-trek/" class="mega-trek-link"><span>Gokyo Luxury Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-heli-return/" class="mega-trek-link"><span>EBC Heli Return Trek</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-16-days/" class="mega-trek-link"><span>Everest Base Camp — 16 Days</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-without-flight/" class="mega-trek-link"><span>EBC Overland (No Flight)</span> <span class="days-badge">17 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Peak Climbing &amp; Hub</div>
                        <a href="${prefix}trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak Climb</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}everest-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Everest Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 3: Annapurna Region -->
                  <div class="mega-tab-content" id="tab-annapurna">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Sanctuary &amp; Base Camp</div>
                        <a href="${prefix}trek/annapurna-base-camp-trek/" class="mega-trek-link"><span>Annapurna Base Camp Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}trek/short-annapurna-base-camp-trek/" class="mega-trek-link"><span>Short ABC Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/north-annapurna-base-camp-trek/" class="mega-trek-link"><span>North Annapurna Base Camp</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-base-camp-heli-return/" class="mega-trek-link"><span>ABC with Heli Return</span> <span class="days-badge">11 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Circuit &amp; High Passes</div>
                        <a href="${prefix}trek/annapurna-circuit-trek/" class="mega-trek-link"><span>Annapurna Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/classic-annapurna-circuit-trek/" class="mega-trek-link"><span>Classic Annapurna Circuit</span> <span class="days-badge">17 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-with-tilicho-lake/" class="mega-trek-link"><span>Tilicho Lake &amp; Annapurna</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Viewpoints &amp; Ridges</div>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Himal Ridge Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/khopra-ridge-trek/" class="mega-trek-link"><span>Khopra Ridge Trek</span> <span class="days-badge">11 DAYS</span></a>
                        <a href="${prefix}trek/mohare-danda-trek/" class="mega-trek-link"><span>Mohare Danda Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-view-trek/" class="mega-trek-link"><span>Annapurna View Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/panchase-trek/" class="mega-trek-link"><span>Panchase Scenic Trek</span> <span class="days-badge">8 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Combos, Luxury &amp; Hub</div>
                        <a href="${prefix}trek/ghorepani-poon-hill-with-mardi-himal-trek/" class="mega-trek-link"><span>Poon Hill &amp; Mardi Combo</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/abc-with-mardi-himal-trek/" class="mega-trek-link"><span>ABC with Mardi Himal</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-base-camp-trek-via-poon-hill/" class="mega-trek-link"><span>ABC via Poon Hill Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/nar-phu-valley-trek/" class="mega-trek-link"><span>Nar Phu Valley Hidden Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-luxury-trek/" class="mega-trek-link"><span>Annapurna Luxury Lodge</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-circuit-luxury-trek/" class="mega-trek-link"><span>Circuit Luxury Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}annapurna-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Annapurna Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 4: Manaslu Region -->
                  <div class="mega-tab-content" id="tab-manaslu">
                    <div class="mega-content-grid" style="grid-template-columns: 1fr;">
                      <div class="mega-col">
                        <div class="mega-col-title">Circuit &amp; Valleys</div>
                        <a href="${prefix}trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-circuit-trek-12-days/" class="mega-trek-link"><span>Manaslu Circuit 12 Days</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu &amp; Tsum Valley</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/tsum-valley-trek/" class="mega-trek-link"><span>Hidden Tsum Valley Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}manaslu-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Manaslu Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 5: Langtang Region -->
                  <div class="mega-tab-content" id="tab-langtang">
                    <div class="mega-content-grid" style="grid-template-columns: repeat(2, 1fr);">
                      <div class="mega-col">
                        <div class="mega-col-title">Valley &amp; Heritage Trails</div>
                        <a href="${prefix}trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}trek/gosaikunda-trek/" class="mega-trek-link"><span>Gosaikunda Trek</span> <span class="days-badge">6 DAYS</span></a>
                        <a href="${prefix}trek/tamang-heritage-trail-trek/" class="mega-trek-link"><span>Tamang Heritage Trail</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Grand Combos &amp; Peaks</div>
                        <a href="${prefix}trek/tamang-heritage-trail-with-langtang-valley-trek/" class="mega-trek-link"><span>Tamang &amp; Langtang Combo</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}trek/langtang-gosaikunda-helambu-trek/" class="mega-trek-link"><span>Langtang Gosaikunda Helambu</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}langtang-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Langtang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 6: Peak Climbing -->
                  <div class="mega-tab-content" id="tab-peaks">
                    <div class="mega-content-grid" style="grid-template-columns: repeat(2, 1fr);">
                      <div class="mega-col">
                        <div class="mega-col-title">Popular Trekking Peaks</div>
                        <a href="${prefix}trek/island-peak-climbing/" class="mega-trek-link"><span>Island Peak Climbing (6,189m)</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/mera-peak-climbing/" class="mega-trek-link"><span>Mera Peak Climbing (6,476m)</span> <span class="days-badge">18 DAYS</span></a>
                        <a href="${prefix}trek/lobuche-peak-climbing/" class="mega-trek-link"><span>Lobuche East Peak (6,119m)</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/yala-peak-climbing/" class="mega-trek-link"><span>Yala Peak Climbing (5,500m)</span> <span class="days-badge">12 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Expedition Combos &amp; Hub</div>
                        <a href="${prefix}trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes &amp; Island Peak</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/everest-base-camp-trek-with-island-peak-climb/" class="mega-trek-link"><span>EBC with Island Peak</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}peak-climbing-nepal/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Peak Climbing Trips →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 7: Mustang Region -->
                  <div class="mega-tab-content" id="tab-mustang">
                    <div class="mega-content-grid" style="grid-template-columns: 1fr;">
                      <div class="mega-col">
                        <div class="mega-col-title">Forbidden Kingdom &amp; Overland</div>
                        <a href="${prefix}trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}tour/upper-mustang-jeep-tour/" class="mega-trek-link"><span>Upper Mustang Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="${prefix}tour/upper-mustang-tiji-festival/" class="mega-trek-link"><span>Upper Mustang Tiji Festival</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}mustang-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Mustang Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 8: Dolpo Region -->
                  <div class="mega-tab-content" id="tab-dolpo">
                    <div class="mega-content-grid" style="grid-template-columns: 1fr;">
                      <div class="mega-col">
                        <div class="mega-col-title">Trans-Himalayan Plateau</div>
                        <a href="${prefix}dolpo-region-treks/" class="mega-trek-link"><span>Dolpo Region Expeditions</span> <span class="days-badge">EXPLORE</span></a>
                        <a href="${prefix}dolpo-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Dolpo Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 9: Kanchenjunga Region -->
                  <div class="mega-tab-content" id="tab-kanchenjunga">
                    <div class="mega-content-grid" style="grid-template-columns: 1fr;">
                      <div class="mega-col">
                        <div class="mega-col-title">Far Eastern Giant</div>
                        <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}kanchenjunga-region-treks/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Kanchenjunga Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 10: Short Treks -->
                  <div class="mega-tab-content" id="tab-short">
                    <div class="mega-content-grid" style="grid-template-columns: repeat(2, 1fr);">
                      <div class="mega-col">
                        <div class="mega-col-title">Short Himalayan Escapes (3–8 Days)</div>
                        <a href="${prefix}trek/chisapani-nagarkot-trek/" class="mega-trek-link"><span>Chisapani Nagarkot Trek</span> <span class="days-badge">5 DAYS</span></a>
                        <a href="${prefix}trek/gosaikunda-trek/" class="mega-trek-link"><span>Gosaikunda Trek</span> <span class="days-badge">6 DAYS</span></a>
                        <a href="${prefix}trek/everest-view-trek/" class="mega-trek-link"><span>Everest View Trek</span> <span class="days-badge">7 DAYS</span></a>
                        <a href="${prefix}trek/annapurna-view-trek/" class="mega-trek-link"><span>Annapurna View Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/panchase-trek/" class="mega-trek-link"><span>Panchase Scenic Trek</span> <span class="days-badge">8 DAYS</span></a>
                        <a href="${prefix}trek/mardi-himal-trek/" class="mega-trek-link"><span>Mardi Himal Ridge Trek</span> <span class="days-badge">8 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Iconic 9–10 Day Treks</div>
                        <a href="${prefix}trek/short-annapurna-base-camp-trek/" class="mega-trek-link"><span>Short ABC Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/ghorepani-poon-hill-trek/" class="mega-trek-link"><span>Ghorepani Poon Hill Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/mohare-danda-trek/" class="mega-trek-link"><span>Mohare Danda Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/tengboche-trek/" class="mega-trek-link"><span>Tengboche Monastery Trek</span> <span class="days-badge">9 DAYS</span></a>
                        <a href="${prefix}trek/langtang-valley-trek/" class="mega-trek-link"><span>Langtang Valley Trek</span> <span class="days-badge">10 DAYS</span></a>
                        <a href="${prefix}trek/pikey-peak-trek/" class="mega-trek-link"><span>Pikey Peak Panorama Trek</span> <span class="days-badge">10 DAYS</span></a>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 11: Wilderness & Off-Grid -->
                  <div class="mega-tab-content" id="tab-wilderness">
                    <div class="mega-content-grid" style="grid-template-columns: repeat(2, 1fr);">
                      <div class="mega-col">
                        <div class="mega-col-title">High Pass &amp; Remote Expeditions</div>
                        <a href="${prefix}trek/everest-three-passes-trek/" class="mega-trek-link"><span>Everest Three Passes Trek</span> <span class="days-badge">21 DAYS</span></a>
                        <a href="${prefix}trek/everest-chola-and-renjo-la-pass-trek/" class="mega-trek-link"><span>Cho La &amp; Renjo La Pass</span> <span class="days-badge">19 DAYS</span></a>
                        <a href="${prefix}trek/three-high-passes-with-island-peak-climb/" class="mega-trek-link"><span>Three Passes &amp; Island Peak</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-circuit-trek/" class="mega-trek-link"><span>Kanchenjunga Circuit Trek</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/kanchenjunga-trek-without-flight/" class="mega-trek-link"><span>Kanchenjunga Without Flight</span> <span class="days-badge">20 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Restricted Frontiers &amp; Off-Grid</div>
                        <a href="${prefix}trek/nar-phu-valley-trek/" class="mega-trek-link"><span>Nar Phu Valley Hidden Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="${prefix}trek/upper-mustang-trek/" class="mega-trek-link"><span>Upper Mustang Kingdom Trek</span> <span class="days-badge">16 DAYS</span></a>
                        <a href="${prefix}trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu &amp; Tsum Valley</span> <span class="days-badge">20 DAYS</span></a>
                        <a href="${prefix}trek/tsum-valley-trek/" class="mega-trek-link"><span>Hidden Tsum Valley Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="${prefix}restricted-area-treks-nepal/" class="mega-trek-link" style="color: #1A96C8; font-weight: 700;"><span>All Restricted Treks →</span> <span class="days-badge">HUB</span></a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>`;
}

function generateTourDropdown(prefix) {
  return `<div class="nav-dropdown-menu tour-dropdown-menu">
              <div>
                <div class="tour-dropdown-col-title">Cultural &amp; Heritage Tours</div>
                <a href="${prefix}tour/one-day-kathmandu-city-tour/" class="nav-dropdown-link"><span>1-Day Kathmandu City Tour</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/kathmandu-cultural-heritage-tour/" class="nav-dropdown-link"><span>Kathmandu Heritage Tour</span> <span class="days-badge">2 DAYS</span></a>
                <a href="${prefix}tour/honeymoon-tour-in-nepal/" class="nav-dropdown-link"><span>Romantic Honeymoon Tour</span> <span class="days-badge">11 DAYS</span></a>
                <a href="${prefix}tour/kailash-mansarovar-yatra/" class="nav-dropdown-link"><span>Kailash Mansarovar Yatra</span> <span class="days-badge">14 DAYS</span></a>
                <a href="${prefix}tour/upper-mustang-jeep-tour/" class="nav-dropdown-link"><span>Upper Mustang Jeep Tour</span> <span class="days-badge">12 DAYS</span></a>
                <a href="${prefix}tour/upper-mustang-tiji-festival/" class="nav-dropdown-link"><span>Upper Mustang Tiji Festival</span> <span class="days-badge">16 DAYS</span></a>
              </div>
              <div>
                <div class="tour-dropdown-col-title">Day Hikes, Cycling, Safari &amp; Helis</div>
                <a href="${prefix}tour/cycling-tour-around-kathmandu-valley/" class="nav-dropdown-link"><span>Kathmandu Cycling Tour</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/jamacho-hike/" class="nav-dropdown-link"><span>Jamacho Peak Forest Hike</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}tour/chitwan-national-park-safari/" class="nav-dropdown-link"><span>Chitwan Jungle Safari</span> <span class="days-badge">5 DAYS</span></a>
                <a href="${prefix}tour/rara-lake-jeep-tour/" class="nav-dropdown-link"><span>Rara Lake Overland Jeep Tour</span> <span class="days-badge">7 DAYS</span></a>
                <a href="${prefix}tour/everest-base-camp-helicopter-tour/" class="nav-dropdown-link"><span>EBC 1-Day Heli Tour</span> <span class="days-badge">1 DAY</span></a>
                <a href="${prefix}nepal-tour-packages/" class="nav-dropdown-link" style="color: #1A96C8; font-weight: 700; border-top: 1px solid #f1f5f9; margin-top: 6px; padding-top: 8px;"><span>Explore All Tour Packages →</span></a>
              </div>
            </div>`;
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (file === "node_modules" || file === ".git" || file === "scratch" || file === ".gemini") return;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith(".html")) {
      results.push(full);
    }
  });
  return results;
}

function getPrefix(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const parts = rel.split("/");
  const depth = parts.length - 1;
  if (depth === 0) return "";
  if (depth === 1) return "../";
  if (depth === 2) return "../../";
  return "../".repeat(depth);
}

function updateNavigationInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("mega-menu-dropdown")) return { updated: false, reason: "No mega menu" };

  const original = content;
  const prefix = getPrefix(filePath);

  const mobileAccordion = generateMobileAccordion(prefix);
  const megaMenu = generateMegaMenu(prefix);
  const tourDropdown = generateTourDropdown(prefix);

  const mobileRegex = /(?:<!-- Mobile Accordion Menu for All Treks -->\s*)?<div class="mobile-accordion-menu">[\s\S]*?<\/div>(?=\s*<div class="mega-menu-dropdown">)/i;
  const megaRegex = /<div class="mega-menu-dropdown">[\s\S]*?<\/div>\s*(?=<\/li>\s*<!-- Standard Tour Packages Dropdown)/i;
  const tourRegex = /<div class="nav-dropdown-menu tour-dropdown-menu">[\s\S]*?<\/div>\s*(?=<\/li>\s*<!-- Standard Trekking Regions Dropdown)/i;

  if (!mobileRegex.test(content) || !megaRegex.test(content) || !tourRegex.test(content)) {
    return { updated: false, reason: "Regex mismatch", file: filePath };
  }

  content = content.replace(mobileRegex, mobileAccordion);
  content = content.replace(megaRegex, megaMenu);
  content = content.replace(tourRegex, tourDropdown);

  if (!checkTagBalance(content, filePath)) {
    throw new Error(`Tag balance error after updating ${filePath}`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    return { updated: true, file: filePath };
  }

  return { updated: false, reason: "No changes needed", file: filePath };
}

const htmlFiles = walk(ROOT);
console.log(`Scanning ${htmlFiles.length} HTML files...`);

let updatedCount = 0;
let unchangedCount = 0;
let errors = [];

htmlFiles.forEach(f => {
  try {
    const res = updateNavigationInFile(f);
    if (res.updated) {
      updatedCount++;
    } else {
      unchangedCount++;
    }
  } catch (err) {
    errors.push({ file: f, error: err.message });
  }
});

console.log(`\nNavigation Update Summary:`);
console.log(`- Updated: ${updatedCount} files`);
console.log(`- Unchanged/Skipped: ${unchangedCount} files`);
if (errors.length > 0) {
  console.error(`- Errors: ${errors.length}`);
  errors.forEach(e => console.error(`  ${e.file}: ${e.error}`));
} else {
  console.log(`- All files verified cleanly with 0 tag balance errors!`);
}
