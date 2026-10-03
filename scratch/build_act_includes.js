const fs = require('fs');
const path = require('path');

function checkTagBalance(html) {
  const stack = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype']);
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)(\s+[^>]*)?>/g;
  let match;
  let line = 1;
  let lastIndex = 0;
  const errors = [];

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidTags.has(tagName);

    const substr = html.substring(lastIndex, match.index);
    line += (substr.match(/\n/g) || []).length;
    lastIndex = match.index;

    if (tagName.startsWith('!') || tagName === 'script' || tagName === 'style' || tagName === 'svg' || tagName === 'path' || tagName === 'polygon' || tagName === 'circle' || tagName === 'rect' || tagName === 'polyline' || tagName === 'line') {
      continue;
    }

    if (isClosing) {
      if (voidTags.has(tagName)) continue;
      if (stack.length === 0) {
        errors.push({ type: 'EXTRA_CLOSING', tag: tagName, line });
      } else {
        const top = stack.pop();
        if (top.tag !== tagName) {
          errors.push({ type: 'MISMATCH', expected: top.tag, found: tagName, line, openedAt: top.line });
        }
      }
    } else if (!isSelfClosing) {
      stack.push({ tag: tagName, line });
    }
  }

  return { errors, unclosed: stack };
}

// 1. Build Inclusions & Exclusions HTML
const includesHtml = `<section id="section-includes" class="trek-detail-section">
            <style>
              .inc-exc-container {
                margin-top: 10px;
              }
              .inc-exc-section-title-wrapper {
                border-left: 4px solid var(--color-copper-orange);
                padding-left: 14px;
                margin-bottom: 24px;
                margin-top: 30px;
              }
              .inc-exc-section-title {
                font-size: 1.8rem;
                margin: 0;
                color: var(--color-primary-navy);
                font-weight: 700;
              }
              .inc-exc-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 40px;
              }
              .inc-exc-card {
                background: var(--color-white);
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 20px;
                display: flex;
                gap: 14px;
                transition: all var(--transition-fast);
              }
              .inc-exc-card:hover {
                border-color: var(--color-copper-orange);
                box-shadow: 0 8px 20px rgba(26, 150, 200, 0.08);
                transform: translateY(-1px);
              }
              .inc-exc-card.exclude-card:hover {
                border-color: #ef4444;
                box-shadow: 0 8px 20px rgba(239, 68, 68, 0.05);
              }
              .inc-exc-icon-box {
                flex-shrink: 0;
                margin-top: 2px;
              }
              .inc-exc-card-content {
                display: flex;
                flex-direction: column;
                gap: 6px;
              }
              .inc-exc-card-title {
                font-size: 1rem;
                font-weight: 700;
                color: var(--color-primary-navy);
                line-height: 1.4;
              }
              .inc-exc-card-text {
                font-size: 0.9rem;
                line-height: 1.5;
                color: var(--color-neutral-600);
              }
              @media (max-width: 800px) {
                .inc-exc-grid {
                  grid-template-columns: 1fr;
                  gap: 16px;
                }
              }
            </style>

            <div class="inc-exc-container">
              <!-- Includes Heading -->
              <div class="inc-exc-section-title-wrapper">
                <h2 class="inc-exc-section-title">What's Included in the Annapurna Circuit Trek</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
              </div>

              <!-- Includes Grid -->
              <div class="inc-exc-grid">
                <!-- Include 1 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Airport Transfers in Kathmandu (Arrival & Departure)</h4>
                    <p class="inc-exc-card-text">Private air-conditioned vehicle transfers between Tribhuvan International Airport (TIA) and your hotel in Thamel with traditional garland welcome.</p>
                  </div>
                </div>

                <!-- Include 2 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Kathmandu to Besisahar & Dharapani Private Overland Transport</h4>
                    <p class="inc-exc-card-text">Comfortable private tourist vehicle from Kathmandu to Besisahar and sturdy 4WD mountain jeep ascent along Marsyangdi River gorge to Dharapani trailhead.</p>
                  </div>
                </div>

                <!-- Include 3 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Jomsom to Tatopani & Pokhara Ground Connectivity</h4>
                    <p class="inc-exc-card-text">Scenic overland transport down the Kali Gandaki valley via Marpha and Tatopani hot springs to Pokhara, plus comfortable tourist coach/vehicle return to Kathmandu.</p>
                  </div>
                </div>

                <!-- Include 4 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">ACAP Conservation Entry Permit & TIMS Card</h4>
                    <p class="inc-exc-card-text">Official Annapurna Conservation Area Project (ACAP) permit and Trekkers' Information Management System (TIMS) card with all paperwork and checkpoint fees included.</p>
                  </div>
                </div>

                <!-- Include 5 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Licensed Himalayan Guide & Strong Mountain Porters</h4>
                    <p class="inc-exc-card-text">Certified English-speaking lead trekking guide (Wilderness First Aid trained) and local porters (1 porter per 2 trekkers, max 20 kg total) with full insurance, fair wages, food, and lodging.</p>
                  </div>
                </div>

                <!-- Include 6 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Hotel Accommodations in Kathmandu & Lakeside Pokhara</h4>
                    <p class="inc-exc-card-text">2 nights at a 3-star boutique hotel in Thamel, Kathmandu, and 1 night at a scenic hotel in Lakeside, Pokhara, on a twin-sharing basis with breakfast included.</p>
                  </div>
                </div>

                <!-- Include 7 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">10 Nights Teahouse & Mountain Lodge Accommodations</h4>
                    <p class="inc-exc-card-text">Carefully selected, cozy mountain lodges and teahouses along the Annapurna trail (twin-sharing rooms with access to heated dining halls).</p>
                  </div>
                </div>

                <!-- Include 8 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">All Meals on Trek (Breakfast, Lunch & Dinner)</h4>
                    <p class="inc-exc-card-text">Three wholesome meals a day chosen from lodge menus during the trek, plus Welcome Dinner with cultural dance in Kathmandu and celebration Farewell Dinner.</p>
                  </div>
                </div>

                <!-- Include 9 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Daily Evening Fruit Platter & Pulse Oximeter Monitoring</h4>
                    <p class="inc-exc-card-text">Fresh organic seasonal fruits served every evening after dinner, plus twice-daily SpO2 pulse oximeter blood oxygen saturation and heart-rate medical monitoring.</p>
                  </div>
                </div>

                <!-- Include 10 -->
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Down Jacket, Sleeping Bag Rental & Igloo Duffel Bag</h4>
                    <p class="inc-exc-card-text">Complimentary rental of 4-season (-20°C) down sleeping bag and expedition jacket upon request, plus official Igloo Himalaya Treks duffel bag and map (yours to keep).</p>
                  </div>
                </div>
              </div>

              <!-- Excludes Heading -->
              <div class="inc-exc-section-title-wrapper" style="margin-top: 10px;">
                <h2 class="inc-exc-section-title">What's Excluded</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
              </div>

              <!-- Excludes Grid -->
              <div class="inc-exc-grid">
                <!-- Exclude 1 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">International Airfare & Nepal Entry Visa Fees</h4>
                    <p class="inc-exc-card-text">Flights to/from Kathmandu and Nepal tourist entry visa (obtained on arrival at TIA: USD 30 for 15 days, USD 50 for 30 days).</p>
                  </div>
                </div>

                <!-- Exclude 2 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Travel & High-Altitude Medical Evacuation Insurance</h4>
                    <p class="inc-exc-card-text">Comprehensive insurance policy is mandatory and must explicitly cover emergency helicopter rescue and medical hospitalization up to 5,500 meters.</p>
                  </div>
                </div>

                <!-- Exclude 3 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Lunches and Dinners in Kathmandu & Pokhara</h4>
                    <p class="inc-exc-card-text">City meals outside of our welcome and farewell dinner celebrations, allowing you freedom to explore the vibrant restaurants of Thamel and Lakeside.</p>
                  </div>
                </div>

                <!-- Exclude 4 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Hot Showers, Battery Charging & Teahouse Wi-Fi</h4>
                    <p class="inc-exc-card-text">Incidental teahouse utility services along the mountain trail (gas-heated bucket showers, electronic gadget charging, and lodge Wi-Fi cards: typically $2 to $5 per item).</p>
                  </div>
                </div>

                <!-- Exclude 5 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Personal Beverages, Boiled Water & Energy Snacks</h4>
                    <p class="inc-exc-card-text">Bottled/boiled drinking water, herbal teas outside meal times, soft drinks, alcoholic beverages, and chocolate or energy bars purchased along the trail.</p>
                  </div>
                </div>

                <!-- Exclude 6 -->
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Gratuities & Tips for Guide and Porters</h4>
                    <p class="inc-exc-card-text">Customary tips given at the end of the trek to thank your guide and porters for their dedication and hard work (recommended guideline: 10% to 15% of trip cost).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>`;

console.log('Inclusions & Exclusions markup generated.');

module.exports = {
  checkTagBalance,
  includesHtml
};
