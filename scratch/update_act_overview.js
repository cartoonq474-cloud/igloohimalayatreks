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

let html = fs.readFileSync(path.join(__dirname, 'act_temp.html'), 'utf8');

// ==========================================
// 1. SECTION-OVERVIEW
// ==========================================
const newOverviewHtml = `<section id="section-overview" class="trek-detail-section">
            <h2 class="trek-section-title">Trek Overview</h2>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 20px; line-height: 1.7;">
              The <strong>14-day Annapurna Circuit Trek</strong> is globally celebrated as one of the quintessential trekking journeys on planet earth. Encircling the colossal, snow-crowned Annapurna massif in north-central Nepal, this classic expedition takes you on an awe-inspiring geographical and cultural odyssey. Beginning in the lush subtropical foothills, terraced paddy fields, and rushing waterfalls of the Marsyangdi River valley, you gradually ascend through pine and rhododendron woodlands into the stark, windswept high-altitude Tibetan-border valleys of Manang and Mustang.
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              The crowning achievement of the circuit is surmounting the iconic <strong>Thorong La Pass (<span data-altitude-m="5416">5,416 m / 17,769 ft</span>)</strong>, the highest mountain pass in the Annapurna range. Standing on the pass at dawn amidst thousands of colorful Buddhist prayer flags, you are rewarded with an extraordinary 360-degree amphitheater of giant Himalayan peaks — including Annapurna I (8,091m), Dhaulagiri (8,167m), Manaslu (8,163m), Gangapurna, and the sacred Machapuchare (Fishtail). Descending into the arid Mustang valley, you explore the sacred pilgrimage shrines of <strong>Muktinath (<span data-altitude-m="3800">3,800m</span>)</strong> and follow the dramatic <strong>Kali Gandaki Gorge</strong> — the deepest river canyon on earth — before soaking in the natural geothermal hot springs at <strong>Tatopani</strong> and relaxing by Phewa Lake in Pokhara.
            </p>
            
            <style>
              .rich-highlights-container {
                margin-top: 35px;
                padding-top: 25px;
                border-top: 1px solid var(--color-neutral-100);
              }
              .rich-highlights-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 24px 30px;
                margin-top: 24px;
              }
              .rich-highlight-item {
                display: flex;
                gap: 12px;
                align-items: flex-start;
              }
              .rich-highlight-icon-wrapper {
                flex-shrink: 0;
                margin-top: 3px;
                color: var(--color-copper-orange);
              }
              .rich-highlight-content {
                font-size: 0.98rem;
                line-height: 1.6;
                color: var(--color-neutral-700);
              }
              .rich-highlight-content strong {
                color: var(--color-primary-navy);
                font-weight: 700;
              }
              @media (max-width: 800px) {
                .rich-highlights-grid {
                  grid-template-columns: 1fr;
                  gap: 20px;
                }
              }
            </style>

            <!-- Ask Experts WhatsApp CTA Banner Card -->
            <div class="trek-expert-cta-card">
              <div class="expert-cta-left">
                <div class="expert-cta-badge-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8b5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div class="expert-cta-text-group">
                  <h3 class="expert-cta-title">Planning your Annapurna Circuit Trek?</h3>
                  <p class="expert-cta-subtitle">Chat with our senior Sherpa guides — real local experts, not bots.</p>
                  <div class="expert-cta-status">
                    <span class="status-dot"></span>
                    <span>Replies within 15–30 minutes</span>
                  </div>
                </div>
              </div>
              <a href="https://wa.me/9779800000000" target="_blank" rel="noopener" class="expert-whatsapp-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A96C8">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp us</span>
              </a>
            </div>

            <div class="rich-highlights-container">
              <div style="border-left: 4px solid var(--color-copper-orange); padding-left: 14px; margin-bottom: 12px;">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--color-primary-navy); font-weight: 700;">Annapurna Circuit Trek Highlights</h2>
              </div>
              
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                These are the defining landmarks and unforgettable mountain moments our trekkers praise season after season on the classic Annapurna Circuit:
              </p>
              
              <div class="rich-highlights-grid">
                <!-- 1. Thorong La Pass -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 2 22 22 22"></polygon>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Conquer Thorong La Pass (<span data-altitude-m="5416">5,416 m / 17,769 ft</span>).</strong> Stand at the world's most famous Himalayan pass at first light, celebrated by thousands of fluttering Buddhist prayer flags and 360-degree panoramas of the Annapurna, Dhaulagiri, and Damodar mountain massifs.
                  </div>
                </div>

                <!-- 2. Three 8,000m Giants -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Gaze Upon Three 8,000-Meter Peaks.</strong> Encounter jaw-dropping close-up views of Annapurna I (8,091m), Dhaulagiri (8,167m), and Manaslu (8,163m), along with Machapuchare (Fishtail), Annapurna II, III, IV, and Gangapurna.
                  </div>
                </div>

                <!-- 3. Muktinath Temple -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Explore Sacred Muktinath Temple (<span data-altitude-m="3800">3,800 m</span>).</strong> One of the holiest high-altitude pilgrimage sanctuaries in the world for both Hindus and Buddhists, celebrated for its 108 brass waterspouts and the eternal sacred natural flame of Jwala Mai.
                  </div>
                </div>

                <!-- 4. Ghyaru & Ngawal High Route -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Traverse the Elevated Upper Route via Ghyaru & Ngawal.</strong> Hang high above the valley floor on a dramatic ridge trail that offers arguably the most breathtaking panoramic vantage points on the entire circuit.
                  </div>
                </div>

                <!-- 5. Paungda Danda Rock Face -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>The Sheer Paungda Danda Rock Slab.</strong> Marvel at the colossal 1,500-meter curved monolithic stone face rising directly out of the Marsyangdi River, known among locals as the sacred "Gateway to Heaven".
                  </div>
                </div>

                <!-- 6. Gangapurna Glacial Lake & Manang -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Acclimatization in Historic Manang (<span data-altitude-m="3540">3,540 m</span>).</strong> Wander stone-paved alleys, hike to the sparkling turquoise Gangapurna Glacial Lake, and visit the Himalayan Rescue Association (HRA) high-altitude medical clinic.
                  </div>
                </div>

                <!-- 7. Ancient Monasteries -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Centuries-Old Tibetan Buddhist Monasteries.</strong> Visit 500-year-old Braga Monastery, explore Upper Pisang gompa, and wander past centuries-old mani walls, prayer wheels, and chortens that protect mountain travelers.
                  </div>
                </div>

                <!-- 8. Kali Gandaki Gorge -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Trek the World's Deepest Gorge: Kali Gandaki.</strong> Follow the ancient trans-Himalayan salt trade canyon carved between the 8,000m summits of Dhaulagiri and Annapurna I, hunting for sacred Jurassic ammonite fossils (Shaligram).
                  </div>
                </div>

                <!-- 9. Tatopani Hot Springs -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Natural Thermal Hot Springs of Tatopani.</strong> After conquering the high pass and the arid valleys of Mustang, relax and rejuvenate your weary muscles in the riverside mineral thermal pools at Tatopani.
                  </div>
                </div>

                <!-- 10. Cultural Odyssey -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Remarkable Cultural Diversity.</strong> Transition seamlessly from Hindu Gurung and Brahmin terraced villages through Buddhist Manangi highlanders, and savor world-famous organic apple pie and cider in picturesque Marpha.
                  </div>
                </div>
              </div>
            </div>

            <style>
              .why-book-container {
                margin-top: 45px;
                padding-top: 35px;
                border-top: 1px solid var(--color-neutral-100);
              }
              .why-book-title-wrapper {
                border-left: 4px solid var(--color-copper-orange);
                padding-left: 14px;
                margin-bottom: 16px;
              }
              .why-book-title {
                font-size: 1.8rem;
                margin: 0;
                color: var(--color-primary-navy);
                font-weight: 700;
              }
              .why-book-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
                margin-top: 30px;
              }
              .why-book-card {
                background: var(--color-white);
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 24px;
                display: flex;
                gap: 16px;
                transition: all var(--transition-fast);
              }
              .why-book-card:hover {
                border-color: var(--color-copper-orange);
                box-shadow: 0 10px 25px rgba(26, 150, 200, 0.12);
                transform: translateY(-2px);
              }
              .why-book-icon-box {
                flex-shrink: 0;
                width: 44px;
                height: 44px;
                background: rgba(26, 150, 200, 0.12);
                color: var(--color-copper-orange);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .why-book-card-content {
                display: flex;
                flex-direction: column;
                gap: 6px;
              }
              .why-book-card-title {
                font-size: 1.05rem;
                font-weight: 700;
                color: var(--color-primary-navy);
                line-height: 1.4;
              }
              .why-book-card-text {
                font-size: 0.92rem;
                line-height: 1.6;
                color: var(--color-neutral-600);
              }
              @media (max-width: 800px) {
                .why-book-grid {
                  grid-template-columns: 1fr;
                  gap: 16px;
                }
              }
            </style>

            <div class="why-book-container">
              <div class="why-book-title-wrapper">
                <h2 class="why-book-title">Why Book the Annapurna Circuit Trek with Igloo Himalaya Treks?</h2>
              </div>
              
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                Trekking around the entire Annapurna massif demands precise mountain logistics, expert altitude acclimatization, and genuine local Sherpa care. Here is what sets our expeditions apart:
              </p>
              
              <div class="why-book-grid">
                <!-- Card 1: Guides -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Senior Guides with 10+ Years Annapurna Circuit Experience</h4>
                    <p class="why-book-card-text">Our lead mountain guides know every stone, teahouse owner, and high-altitude microclimate across Manang and Mustang. They carry pulse oximeters, read snow conditions at Thorong La Pass with veteran precision, and keep your pace safe and steady.</p>
                  </div>
                </div>

                <!-- Card 2: 100% Guaranteed departures -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">100% Guaranteed Departures</h4>
                    <p class="why-book-card-text">Once your trip is confirmed, it runs guaranteed. We never cancel your trek departure due to group size minimums. If you book a private or small-group trek, your departure date is 100% locked in.</p>
                  </div>
                </div>

                <!-- Card 3: NATT Trails -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Expert Route Design: Bypassing Roads via NATT Trails</h4>
                    <p class="why-book-card-text">Our guides utilize the New Annapurna Trekking Trails (NATT) marked paths through Upper Pisang, Ghyaru, and Ngawal, keeping you on historic footpaths and high wilderness ridges away from vehicle roads.</p>
                  </div>
                </div>

                <!-- Card 4: Pre-trek briefing -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Thorough Pre-Trek Briefing & Gear Inspection</h4>
                    <p class="why-book-card-text">Before leaving Kathmandu, you sit down with your lead guide to review the daily topography, pass-crossing strategy, medical safety protocols, and inspect your gear item by item so nothing is left to chance.</p>
                  </div>
                </div>

                <!-- Card 5: 24/7 replies -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Direct WhatsApp Support with Company Founders</h4>
                    <p class="why-book-card-text">You communicate directly with our founders and expedition planners — not a generic call center or automated chatbot. From visa questions to custom extensions, we answer within minutes.</p>
                  </div>
                </div>

                <!-- Card 6: Private airport pickup -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <circle cx="15" cy="17" r="2"></circle>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Complimentary Door-to-Door Private Airport Transfers</h4>
                    <p class="why-book-card-text">Our professional chauffeur meets you at Kathmandu Airport with a personalized name board and transfers you smoothly to your hotel. Round-trip airport transfers are 100% included in all bookings.</p>
                  </div>
                </div>

                <!-- Card 7: Gear Rentals -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.38 3.46L16 2.14a1 1 0 0 0-1 0L3.62 9.24a1 1 0 0 0-.5.85v8.5a1 1 0 0 0 1 1h16.76a1 1 0 0 0 1-1v-14a1 1 0 0 0-.5-.85zM6.5 12h11M6.5 16h11"></path>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Four-Season Sleeping Bag & Down Jacket Rentals</h4>
                    <p class="why-book-card-text">High-grade -20°C sleeping bags and heavyweight down jackets are available to rent directly from our office at modest rates ($15 each for the full trek), saving you thousands in specialized equipment purchases.</p>
                  </div>
                </div>

                <!-- Card 8: Duffle bag -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Complimentary Heavy-Duty 80L Waterproof Trekking Duffel</h4>
                    <p class="why-book-card-text">Every trekker traveling with a porter receives our signature heavy-duty waterproof Igloo duffel bag (yours to keep), perfectly dimensioned for the porter load limits.</p>
                  </div>
                </div>

                <!-- Card 9: Fair Porter Ethics -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Strict Porter Welfare & Fair-Trade Trekking Standards</h4>
                    <p class="why-book-card-text">We strictly abide by the International Porter Protection Group (IPPG) guidelines. All our porters receive fair living wages, medical insurance, quality alpine outerwear, and strict maximum load limits (20kg per porter).</p>
                  </div>
                </div>

                <!-- Card 10: 24/7 Emergency Support -->
                <div class="why-book-card">
                  <div class="why-book-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                    </svg>
                  </div>
                  <div class="why-book-card-content">
                    <h4 class="why-book-card-title">Direct Helicopter Evacuation Coordination</h4>
                    <p class="why-book-card-text">If severe acute mountain sickness or sudden medical emergencies arise near Thorong La Pass, our Kathmandu control team immediately activates emergency helicopter rescue with leading aviation partners.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>`;

html = html.replace(/<section id=["']section-overview["'][\s\S]*?<\/section>/i, newOverviewHtml);
console.log('Section Overview replaced.');

fs.writeFileSync(path.join(__dirname, 'act_temp.html'), html, 'utf8');
