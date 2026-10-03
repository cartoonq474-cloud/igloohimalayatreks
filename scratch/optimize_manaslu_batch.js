const fs = require('fs');
const path = require('path');
const { manasluPackages } = require('./all_manaslu_data.js');
const { checkTagBalance } = require('./build_act_includes.js');

function buildItineraryHtml(pkg) {
  const cardsHtml = pkg.itinerary.map((d, idx) => {
    const isFirst = idx === 0;
    const activeClass = isFirst ? 'active' : '';
    const dayStr = String(d.day).padStart(2, '0');
    
    const p1 = pkg.gallery[idx % pkg.gallery.length];
    const p2 = pkg.gallery[(idx + 1) % pkg.gallery.length];
    const p3 = pkg.gallery[(idx + 2) % pkg.gallery.length];
    const p4 = pkg.gallery[(idx + 3) % pkg.gallery.length];

    return `              <!-- Day ${dayStr}: ${d.title} -->
              <div class="itinerary-card ${activeClass}">
                <div class="itinerary-header">
                  <div class="itinerary-header-left">
                    <h4 class="itinerary-day-title-new">
                      <span class="day-label">Day ${d.day}:</span> ${d.title}
                    </h4>
                    <p class="itinerary-day-subtitle-new">
                      ${d.dest} – <span data-altitude-m="${d.altM}">${d.altM.toLocaleString()} m / ${Math.round(d.altM * 3.28084).toLocaleString()} ft</span> – ${d.duration}
                    </p>
                  </div>
                  <div class="itinerary-header-right">
                    <div class="itinerary-toggle-btn-new">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="itinerary-content">
                  <div class="itinerary-content-inner">
                    <div class="itinerary-metrics-list">
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Trek/Travel time: ${d.duration}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Accommodation: ${pkg.accommodation}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path>
                          <path d="M2 10h20"></path>
                        </svg>
                        <span>Distance: ${d.dist}</span>
                      </div>
                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        </svg>
                        <span>Meals: ${d.meals}</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                          <circle cx="12" cy="9" r="2.5"></circle>
                        </svg>
                        <span>Overnight: ${d.dest}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${d.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${p1}" alt="${d.title}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${p2}" alt="${d.dest} Mountain Vista">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${p3}" alt="Trail along ${d.dest}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${p4}" alt="Himalayan Panorama">
                      </div>
                    </div>
                  </div>
                </div>
              </div>\n\n`;
  }).join('');

  return `<section id="section-itinerary" class="trek-detail-section">
            <h2 class="trek-section-title">${pkg.seoTitle} Itinerary: Day by Day Details</h2>
            <p style="font-size: 1.05rem; color: var(--color-neutral-600); line-height: 1.6; margin-bottom: 24px; max-width: 800px;">
              Our authentic ${pkg.duration} ${pkg.seoTitle} itinerary is expertly paced for safe acclimatization and panoramic mountain vistas. Review the full day-by-day stages, distances, elevations, and overnight stops below:
            </p>
            
            <div class="itinerary-timeline">
${cardsHtml}            </div>
          </section>`;
}

function buildHighlightsHtml(pkg) {
  const items = pkg.highlights.map(h => {
    return `                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 2 22 22 22"></polygon>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    ${h}
                  </div>
                </div>`;
  }).join('\n');

  return `<div class="rich-highlights-container">
              <div style="border-left: 4px solid var(--color-copper-orange); padding-left: 14px; margin-bottom: 12px;">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--color-primary-navy); font-weight: 700;">${pkg.seoTitle} Highlights</h2>
              </div>
              
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                These are the defining landmarks and unforgettable cultural and mountain moments our trekkers praise season after season on this classic route:
              </p>
              
              <div class="rich-highlights-grid">
${items}
              </div>
            </div>`;
}

function buildIncludesHtml(pkg) {
  const isTsum = pkg.slug.includes('tsum');
  let permitText = isTsum
    ? 'Special Manaslu Restricted Area Permit, Tsum Valley Restricted Permit, MCAP, ACAP, and TIMS card.'
    : 'Special Manaslu Restricted Area Permit (RAP), Manaslu Conservation Area Project (MCAP), ACAP, and TIMS card.';

  return `<section id="section-includes" class="trek-detail-section">
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
              <div class="inc-exc-section-title-wrapper">
                <h2 class="inc-exc-section-title">What's Included in the ${pkg.seoTitle}</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
              </div>

              <div class="inc-exc-grid">
                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">All Ground Transportation</h4>
                    <p class="inc-exc-card-text">Private 4WD overland transportation between Kathmandu, Machha Khola, Besisahar, and Kathmandu as per itinerary.</p>
                  </div>
                </div>

                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">All Restricted Area & Park Permits</h4>
                    <p class="inc-exc-card-text">${permitText}</p>
                  </div>
                </div>

                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Licensed Guide & Porter Support</h4>
                    <p class="inc-exc-card-text">Government-certified Wilderness First Aid trained lead guide and strong local mountain porters (1 porter per 2 trekkers, max 20 kg total) with full insurance and mountain gear.</p>
                  </div>
                </div>

                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">All Teahouse & Lodge Accommodations</h4>
                    <p class="inc-exc-card-text">${pkg.accommodation} (twin-sharing rooms with cozy dining halls throughout the trek).</p>
                  </div>
                </div>

                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Full Board Wholesome Meals</h4>
                    <p class="inc-exc-card-text">Three hot meals a day chosen from lodge menus during the trek, plus Welcome and celebration Farewell dinners in Kathmandu.</p>
                  </div>
                </div>

                <div class="inc-exc-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Down Jacket, Sleeping Bag & Duffel</h4>
                    <p class="inc-exc-card-text">Complimentary down jacket and 4-season (-20°C) sleeping bag rental for the trek upon request, plus official Igloo Himalaya Treks waterproof duffel bag.</p>
                  </div>
                </div>
              </div>

              <div class="inc-exc-section-title-wrapper" style="margin-top: 10px;">
                <h2 class="inc-exc-section-title">What's Excluded</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
              </div>

              <div class="inc-exc-grid">
                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">International Airfare & Nepal Entry Visa</h4>
                    <p class="inc-exc-card-text">International flights to/from Kathmandu and Nepal tourist entry visa fees ($30 for 15 days, $50 for 30 days).</p>
                  </div>
                </div>

                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Travel & Medical Evacuation Insurance</h4>
                    <p class="inc-exc-card-text">Comprehensive travel insurance covering high-altitude trekking and emergency helicopter rescue up to ${pkg.maxAlt}.</p>
                  </div>
                </div>

                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Hot Showers, Device Charging & Teahouse Wi-Fi</h4>
                    <p class="inc-exc-card-text">Incidental teahouse utility services (gas-heated bucket showers, phone charging, and Wi-Fi access cards: typically $2–$4 per item).</p>
                  </div>
                </div>

                <div class="inc-exc-card exclude-card">
                  <div class="inc-exc-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div class="inc-exc-card-content">
                    <h4 class="inc-exc-card-title">Personal Drinks & Crew Gratuities</h4>
                    <p class="inc-exc-card-text">Bottled/boiled water, soft drinks, alcoholic beverages, and customary tips for your trekking guide and porter team.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>`;
}

function cleanDetailsSection(html, pkg) {
  const detailsMatch = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
  if (!detailsMatch) return html;

  let d = detailsMatch[0];
  d = d.replace(/Everest Base Camp Trek/gi, `${pkg.seoTitle}`);
  d = d.replace(/Everest Base Camp/gi, 'Mount Manaslu & Larkya La');
  d = d.replace(/Lukla/gi, 'Machha Khola');
  d = d.replace(/Namche Bazaar/gi, 'Samagaon / Lho');
  d = d.replace(/Sagarmatha National Park/gi, 'Manaslu Conservation Area');
  d = d.replace(/Khumbu/gi, 'Manaslu');

  return html.replace(/<section id=["']section-details["'][\s\S]*?<\/section>/i, d);
}

function optimizePackage(pkg) {
  const filePath = path.join(__dirname, '../trek', pkg.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Title & Meta Description
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pkg.title}</title>`);
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']/i, `<meta name="description" content="${pkg.metaDesc}">`);
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']/i, `<meta property="og:title" content="${pkg.title}">`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']/i, `<meta property="og:description" content="${pkg.metaDesc}">`);
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']/i, `<meta name="twitter:title" content="${pkg.title}">`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']/i, `<meta name="twitter:description" content="${pkg.metaDesc}">`);

  // 2. Canonical & OG URLs
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']/i, `<link rel="canonical" href="${pkg.canonical}"`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']/i, `<meta property="og:url" content="${pkg.canonical}">`);

  // 3. Structured Data JSON-LD
  const subTrips = pkg.itinerary.map(item => `          { "@type": "TouristTrip", "name": "Day ${item.day}: ${item.title.replace(/"/g, '\\"')}" }`).join(',\n');
  const faqItems = pkg.faqs.map(item => `          {
            "@type": "Question",
            "name": "${item.q.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${item.a.replace(/"/g, '\\"')}"
            }
          }`).join(',\n');

  const customJsonLd = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "${pkg.canonical}#trip",
        "name": "${pkg.seoTitle.replace(/"/g, '\\"')}",
        "description": "${pkg.metaDesc.replace(/"/g, '\\"')}",
        "touristType": ["Hikers", "Trekking Enthusiasts", "Culture Lovers"],
        "subTrip": [
${subTrips}
        ],
        "offers": {
          "@type": "Offer",
          "price": "${pkg.price.replace(',', '')}",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "${pkg.canonical}"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${pkg.canonical}#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "Nepal Trekking Packages", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "${pkg.seoTitle.replace(/"/g, '\\"')}", "item": "${pkg.canonical}" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "${pkg.canonical}#faq",
        "mainEntity": [
${faqItems}
        ]
      }
    ]
  }
  </script>`;

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, customJsonLd);

  // 4. Hero section title & lead
  html = html.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/i, `<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${pkg.title.split('—')[0].trim()}</h1>`);
  html = html.replace(/<span class="pill pill-copper">[\s\S]*?<\/span>/i, `<span class="pill pill-copper">${pkg.heroBadge}</span>`);
  
  // 5. Key Trip Facts bar
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Duration<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${pkg.duration}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Difficulty<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${pkg.difficulty}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Max Altitude<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m=")[^"]*(">)[^<]*(<\/span>)/i,
    `$1${pkg.maxAltNum}$2${pkg.maxAlt}$3`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Transport<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${pkg.transport}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Region<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${pkg.region}$2`);

  // 6. Pricing values
  html = html.replace(/(<div class="price-amount" data-original-price=")[^"]*(">)\$[^<]*(<\/div>)/gi, `$1${pkg.price.replace(',', '')}$2$${pkg.price}$3`);
  html = html.replace(/(<span class="price-tag-value">)\$[^<]*(<\/span>)/gi, `$1$${pkg.price}$2`);
  html = html.replace(/<span style="font-size: 1\.8rem; font-weight: 800; color: var\(--color-primary-navy\);">\$[^<]*<\/span>/gi, `<span style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-navy);">$${pkg.price}</span>`);

  // 7. Data trek key for altitude chart & wrapper
  const trekKey = 'manaslu';
  html = html.replace(/data-trek-details-wrapper\s+data-trek-key=["'][^"']*["']/gi, `data-trek-details-wrapper data-trek-key="${trekKey}"`);
  html = html.replace(/id=["']altitude-chart-wrapper["']\s+data-trek-key=["'][^"']*["']/gi, `id="altitude-chart-wrapper" data-trek-key="${trekKey}"`);
  html = html.replace(/id=["']weather-chart-wrapper["']\s+data-trek-key=["'][^"']*["']/gi, `id="weather-chart-wrapper" data-trek-key="${trekKey}"`);

  // 8. Replace Itinerary Section
  const itineraryHtml = buildItineraryHtml(pkg);
  html = html.replace(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i, itineraryHtml);

  // 9. Replace Highlights in Overview
  const highlightsHtml = buildHighlightsHtml(pkg);
  html = html.replace(/<div class="rich-highlights-container">[\s\S]*?<\/div>\s*<\/div>\s*(<div class="trek-expert-cta-card">|<style>|<div class="why-book)/i, `${highlightsHtml}\n$1`);

  // 10. Replace Inclusions / Exclusions
  const incExcHtml = buildIncludesHtml(pkg);
  html = html.replace(/<section id=["']section-includes["'][\s\S]*?<\/section>/i, incExcHtml);

  // 11. Clean Details Section (Knowledge Base)
  html = cleanDetailsSection(html, pkg);

  // 12. Replace Map image
  const mapImg = 'manaslu-circuit-trek-12-days.webp';
  html = html.replace(/<img src=["'][^"']*ebc-map\.png["'][^>]*>/gi, `<img src="../../images/${mapImg}" alt="${pkg.seoTitle} Topographic Map" style="display: block; width: 100%; height: auto; border-radius: var(--radius-md);">`);
  html = html.replace(/href=["'][^"']*ebc-map\.png["']/gi, `href="../../images/${mapImg}"`);

  // 13. Replace Reviews / EBC mentions in reviews & inquiry buttons
  html = html.replace(/data-trek-title=["']Everest Base Camp Private Trek["']/gi, `data-trek-title="${pkg.seoTitle}"`);
  html = html.replace(/Review for Everest Base Camp Trek/gi, `Review for ${pkg.seoTitle}`);
  html = html.replace(/Our Everest Base Camp trek with Igloo Himalaya Treks/gi, `Our ${pkg.seoTitle} with Igloo Himalaya Treks`);
  html = html.replace(/Booking Everest Base Camp through Igloo Himalaya Treks/gi, `Booking ${pkg.seoTitle} through Igloo Himalaya Treks`);

  // 14. Check tag balance
  const balance = checkTagBalance(html);
  if (balance.errors.length > 0 || balance.unclosed.length > 0) {
    console.error(`ERROR: Tag balance failed for ${pkg.slug}:`, balance);
    return false;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`SUCCESS: Optimized ${pkg.slug} (${html.length} bytes, 0 errors)!`);
  return true;
}

let okCount = 0;
manasluPackages.forEach(p => {
  if (optimizePackage(p)) okCount++;
});

console.log(`\nManaslu Optimization: ${okCount} / ${manasluPackages.length} successful.`);
