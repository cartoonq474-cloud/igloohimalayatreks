const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Read base tour template and base trek template
const tourTemplatePath = path.join(ROOT, 'tour', 'kathmandu-cultural-heritage-tour', 'index.html');
const baseTourTemplate = fs.readFileSync(tourTemplatePath, 'utf8');

const trekTemplatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
const baseTrekTemplate = fs.readFileSync(trekTemplatePath, 'utf8');

function buildTourAccordion(days) {
  return days.map(d => `
                  <!-- Day ${d.day} -->
                  <div class="itinerary-card">
                    <div class="itinerary-header">
                      <div class="itinerary-header-left">
                        <h4 class="itinerary-day-title-new">
                          <span class="day-label">Day ${d.day}:</span> ${d.title}
                        </h4>
                        <p class="itinerary-day-subtitle-new">
                          ${d.dest} – ${d.duration}
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
                            <span>Duration: ${d.duration}</span>
                          </div>
                          <div class="itinerary-metric-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span>Accommodation: ${d.acc}</span>
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
                            <span>Location: ${d.dest}</span>
                          </div>
                        </div>

                        <div class="itinerary-description">
                          <p>${d.desc}</p>
                        </div>

                        <div class="itinerary-photos-grid">
                          <div class="itinerary-photo-wrapper">
                            <img loading="lazy" src="../../images/${d.img1}" alt="${d.title}">
                          </div>
                          <div class="itinerary-photo-wrapper">
                            <img loading="lazy" src="../../images/${d.img2}" alt="${d.dest} Sightseeing View">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`).join('\n');
}

function generateTourPage(cfg) {
  let html = baseTourTemplate;

  // 1. Meta / Head
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${cfg.metaDesc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${cfg.canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${cfg.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${cfg.metaDesc}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${cfg.canonicalUrl}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/${cfg.gallery[0]}">`);

  // 2. Schema.org
  const subTripList = cfg.days.map(d => `          { "@type": "TouristTrip", "name": "Day ${d.day}: ${d.title.replace(/"/g, '\\"')}" }`).join(',\n');
  const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "${cfg.canonicalUrl}#trip",
        "name": "${cfg.name}",
        "description": "${cfg.metaDesc}",
        "touristType": ["Tourists", "Families", "Culture Lovers"],
        "subTrip": [
${subTripList}
        ],
        "offers": {
          "@type": "Offer",
          "price": "${cfg.price}",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "${cfg.canonicalUrl}"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${cfg.canonicalUrl}#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "Nepal Tours", "item": "https://igloohimalayatreks.com/nepal-tour-packages/" },
          { "@type": "ListItem", "position": 3, "name": "${cfg.name}", "item": "${cfg.canonicalUrl}" }
        ]
      }
    ]
  }
  </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);

  // 3. Hero Section
  html = html.replace(/<span class="pill pill-copper"[^>]*>[^<]*<\/span>/, `<span class="pill pill-copper" style="margin-bottom: 0; background: #F6851F; color: #FFFFFF;">${cfg.pill}</span>`);
  html = html.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${cfg.name}</h1>`);
  html = html.replace(/<p style="font-size: 1\.15rem; color: var\(--color-neutral-600\); line-height: 1\.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/,
    `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">${cfg.leadText}</p>`);

  // 4. Hero Collage Gallery
  const collage = `<div class="trek-gallery-collage">
          <div class="trek-gallery-main">
            <img src="../../images/${cfg.gallery[0]}" alt="${cfg.name}">
            <div class="trek-gallery-badge">
              <div class="trek-gallery-badge-icon" style="background: #00af87; display: flex; align-items: center; justify-content: center;">
                <svg class="icon-svg icon-sm" style="stroke: none; fill: white;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div class="trek-gallery-badge-text">
                <span>Travelers' Choice</span>
                <span>Best of the Best 2026</span>
              </div>
            </div>
          </div>
          <div class="trek-gallery-sub">
            <img src="../../images/${cfg.gallery[1]}" alt="${cfg.name} Sight 1">
          </div>
          <div class="trek-gallery-sub trek-gallery-sub-top-right">
            <img src="../../images/${cfg.gallery[2]}" alt="${cfg.name} Sight 2">
            <button class="trek-gallery-see-all-btn">
              <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
            </button>
          </div>
          <div class="trek-gallery-sub">
            <img src="../../images/${cfg.gallery[3]}" alt="${cfg.name} Sight 3">
          </div>
          <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
            <img src="../../images/${cfg.gallery[4]}" alt="${cfg.name} Sight 4">
          </div>
        </div>`;
  html = html.replace(/<div class="trek-gallery-collage">[\s\S]*?<\/div>\s*<\/div>/, collage);

  // 5. Key Facts
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; color: var\(--color-neutral-500\); font-weight: 700;">Duration<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${cfg.durationWord}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; color: var\(--color-neutral-500\); font-weight: 700;">Tour Difficulty<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${cfg.diffWord}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; color: var\(--color-neutral-500\); font-weight: 700;">Max Altitude<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${cfg.maxAlt}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; color: var\(--color-neutral-500\); font-weight: 700;">Transport<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${cfg.transportWord}$2`);

  // 6. Itinerary
  const accordionHTML = buildTourAccordion(cfg.days);
  html = html.replace(/<div class="itinerary-timeline">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Map Section -->/,
    `<div class="itinerary-timeline">\n${accordionHTML}\n</div>\n</div>\n</div>\n</div>\n<!-- Map Section -->`);

  // 7. Pricing
  html = html.replace(/\$399/g, `$${cfg.price}`);

  return html;
}

// -------------------------------------------------------------
// 1. ONE DAY KATHMANDU CITY TOUR
// -------------------------------------------------------------
const oneDayDir = path.join(ROOT, 'tour', 'one-day-kathmandu-city-tour');
ensureDir(oneDayDir);
const oneDayHTML = generateTourPage({
  name: "One Day Kathmandu City Tour",
  title: "One Day Kathmandu City Tour — UNESCO World Heritage Sightseeing — Igloo Himalaya Treks",
  metaDesc: "Experience the essence of Nepal on a 1-day Kathmandu City Tour. Visit 4 UNESCO World Heritage Sites: Pashupatinath, Boudhanath, Swayambhunath, and Kathmandu Durbar Square.",
  canonicalUrl: "https://igloohimalayatreks.com/tour/one-day-kathmandu-city-tour/",
  pill: "UNESCO World Heritage • 1-Day Guided City Tour",
  leadText: "Immerse yourself in centuries of living art, culture, and spirituality on our guided 1-day Kathmandu City Tour. In a single seamless day, discover the holiest Hindu shrine of Pashupatinath, the colossal Buddhist mandala of Boudhanath Stupa, the iconic hilltop Monkey Temple at Swayambhunath, and the ancient royal courtyards of Kathmandu Durbar Square.",
  price: "75",
  durationWord: "1 Day (6–7 Hours)",
  diffWord: "Easy / Sightseeing",
  maxAlt: "1,400 m",
  transportWord: "Private AC Vehicle + Certified City Guide",
  gallery: [
    "one-day-kathmandu-city-tour-best-sightseeing-tour-in-nepal.webp",
    "this-image-of-the-boudhha-stupa-one-day-kathmandu-city-tour.webp",
    "this-image-of-the-boudhha-stupa-one-day-kathmandu-city-tour-02.webp",
    "city-tour.webp",
    "hindu-and-buddhist-religious-heritage-in-nepal.webp"
  ],
  days: [
    {
      day: 1,
      title: "Full Day Guided Tour: Pashupatinath, Boudhanath, Swayambhunath & Kathmandu Durbar Square",
      dest: "Kathmandu Valley",
      duration: "6 to 7 hours",
      acc: "Return to Hotel in Kathmandu",
      meals: "Welcome Coffee & Guided Tour",
      desc: "Begin at 9:00 AM with hotel pick-up. First visit Pashupatinath Temple on the holy Bagmati River, observing sacred Hindu rituals and ancient cremation ghats. Next, circumambulate the massive dome of Boudhanath Stupa alongside Tibetan monks and butter lamps. Enjoy lunch overlooking the stupa. In the afternoon, ascend the stone staircase to the hilltop Monkey Temple (Swayambhunath) for 360-degree views of the valley. Conclude at Kathmandu Durbar Square exploring the Hanuman Dhoka Palace and the residence of the Living Goddess Kumari before returning to your hotel.",
      img1: "this-image-of-the-boudhha-stupa-one-day-kathmandu-city-tour.webp",
      img2: "city-tour.webp"
    }
  ]
});
fs.writeFileSync(path.join(oneDayDir, 'index.html'), oneDayHTML, 'utf8');
console.log('Created tour/one-day-kathmandu-city-tour/index.html');

// -------------------------------------------------------------
// 2. CYCLING TOUR AROUND KATHMANDU VALLEY
// -------------------------------------------------------------
const cyclingDir = path.join(ROOT, 'tour', 'cycling-tour-around-kathmandu-valley');
ensureDir(cyclingDir);
const cyclingHTML = generateTourPage({
  name: "Cycling Tour Around Kathmandu Valley",
  title: "Cycling Tour Around Kathmandu Valley (1–2 Days) — Mountain Biking Adventure — Igloo Himalaya Treks",
  metaDesc: "Thrilling mountain biking tour around Kathmandu Valley rim. Ride through Tokha, Mudkhu, Shivapuri forest single-tracks, and traditional Newari farming villages.",
  canonicalUrl: "https://igloohimalayatreks.com/tour/cycling-tour-around-kathmandu-valley/",
  pill: "Adventure Cycling • Mountain Biking Valley Trails",
  leadText: "Escape the city bustle and pedal through pristine pine forests, ancient Newari farming hamlets, and exhilarating single-tracks bordering Shivapuri Nagarjun National Park. Our Kathmandu Valley Cycling Tour blends technical off-road riding with panoramic Himalayan vistas across the Ganesh and Langtang mountain massifs.",
  price: "120",
  durationWord: "1 to 2 Days",
  diffWord: "Moderate / Active Riding",
  maxAlt: "1,950 m",
  transportWord: "Premium Front-Suspension MTB + Support Vehicle",
  gallery: [
    "cycling-tour-around-kathmandu-valley-biking-adventure.webp",
    "cycling-tour-around-kathmandu-valley-biking-adventure-02.webp",
    "know-best-cycling-trails-in-kathmandu-igloo-himalaya-treks.webp",
    "cycling-in-nepal.webp",
    "get-the-best-cycling-package-in-nepal-igloo-himalaya-treks.webp"
  ],
  days: [
    {
      day: 1,
      title: "Mountain Biking: Thamel to Mudkhu, Tinpiple, Tokha Heritage Village & Shivapuri Trail",
      dest: "Northern Valley Rim",
      duration: "5 to 6 hours (32 km)",
      acc: "Lodge or Hotel Return",
      meals: "Trail Lunch, Energy Snacks",
      desc: "Gear up at our Thamel bike workshop with high-end hydraulic disc brake mountain bikes and helmets. Ride northwest out of the valley through Balaju to Mudkhu Pass (Scar Road). Follow thrilling pine forest dirt tracks toward Tinpiple, then descend through the ancient cobbled streets of Tokha Newari village before cruising back along scenic agricultural ridges.",
      img1: "cycling-tour-around-kathmandu-valley-biking-adventure.webp",
      img2: "know-best-cycling-trails-in-kathmandu-igloo-himalaya-treks.webp"
    },
    {
      day: 2,
      title: "Ridge Traverse: Budhanilkantha to Sundarijal, Sankhu Ancient Town & Bhaktapur Rim",
      dest: "Eastern Valley Rim",
      duration: "6 hours (38 km)",
      acc: "Return to Hotel in Kathmandu",
      meals: "Breakfast & Local Organic Lunch",
      desc: "Cycle along the base of Shivapuri National Park past the sleeping Vishnu temple at Budhanilkantha. Navigate exciting dirt jeep tracks and single-tracks to Sundarijal waterfalls, descending through rural terraced hillsides to the medieval market town of Sankhu and onward to Bhaktapur.",
      img1: "cycling-tour-around-kathmandu-valley-biking-adventure-02.webp",
      img2: "cycling-in-nepal.webp"
    }
  ]
});
fs.writeFileSync(path.join(cyclingDir, 'index.html'), cyclingHTML, 'utf8');
console.log('Created tour/cycling-tour-around-kathmandu-valley/index.html');

// -------------------------------------------------------------
// 3. JAMACHO PEAK DAY HIKE
// -------------------------------------------------------------
const jamachoDir = path.join(ROOT, 'tour', 'jamacho-hike');
ensureDir(jamachoDir);
const jamachoHTML = generateTourPage({
  name: "Jamacho Peak Day Hike (2,128m)",
  title: "Jamacho Peak Day Hike (2,128m) — Shivapuri Nagarjun National Park — Igloo Himalaya Treks",
  metaDesc: "Hike to sacred Jamacho Peak (2,128m) in Nagarjun Forest. Pristine nature trail, panoramic Kathmandu Valley views, ancient Buddhist stupa, and Langtang mountain vista.",
  canonicalUrl: "https://igloohimalayatreks.com/tour/jamacho-hike/",
  pill: "Day Hike • Nagarjun Forest Peak Climb",
  leadText: "Rising steeply on the northwestern rim of Kathmandu Valley, Jamacho Peak (2,128m) is a tranquil wilderness sanctuary inside the protected Nagarjun Forest of Shivapuri Nagarjun National Park. Ascend beneath canopies of rhododendron, oak, and pine to reach the sacred Buddhist stupa and former royal mountain retreat overlooking the entire Himalayas.",
  price: "65",
  durationWord: "1 Day (5–6 Hours)",
  diffWord: "Moderate / Forest Hike",
  maxAlt: "2,128 m",
  transportWord: "Private Tourist Vehicle Transfer",
  gallery: [
    "jamacho-hike-1-day-hiking-shivapuri-national-park.webp",
    "jamacho-hike-1-day-hiking-shivapuri-national-park-02.webp",
    "view-from-jamacho.webp",
    "view-from-jamacho-02.webp",
    "jamacho-hike.webp"
  ],
  days: [
    {
      day: 1,
      title: "Guided Hike: Fulbari Gate to Jamacho Summit (2,128m) & Monastery",
      dest: "Nagarjun Forest",
      duration: "5 to 6 hours round-trip",
      acc: "Return to Hotel in Kathmandu",
      meals: "Packed Trail Lunch & Refreshments",
      desc: "A brief 20-minute morning drive brings you to the Fulbari National Park checkpoint. Pass through military security into the lush subtropical forest. Follow well-maintained stone steps winding through dense chir pine and broadleaf trees alive with bird songs. Reach the summit ridge (2,128m) featuring Jamacho Gompa, prayer flags, and a view tower granting sensational sweeps of Langtang Lirung, Ganesh Himal, Dorje Lakpa, and the Kathmandu Valley basin.",
      img1: "jamacho-hike-1-day-hiking-shivapuri-national-park.webp",
      img2: "view-from-jamacho.webp"
    }
  ]
});
fs.writeFileSync(path.join(jamachoDir, 'index.html'), jamachoHTML, 'utf8');
console.log('Created tour/jamacho-hike/index.html');

// -------------------------------------------------------------
// 4. 7-DAY RARA LAKE JEEP TOUR
// -------------------------------------------------------------
const raraDir = path.join(ROOT, 'tour', 'rara-lake-jeep-tour');
ensureDir(raraDir);
const raraHTML = generateTourPage({
  name: "7-Day Rara Lake Overland Jeep Tour",
  title: "7-Day Rara Lake Jeep Tour — Overland 4WD Karnali Expedition — Igloo Himalaya Treks",
  metaDesc: "Embark on an epic 7-day 4WD overland jeep tour to Rara Lake (2,990m), Nepal's largest lake. Travel via Surkhet, Sinja Valley, and the Karnali highway.",
  canonicalUrl: "https://igloohimalayatreks.com/tour/rara-lake-jeep-tour/",
  pill: "Overland 4WD Expedition • Remote West Nepal",
  leadText: "Venture deep into the untamed wilderness of western Nepal on a legendary 7-day 4WD overland jeep expedition. Traverse the dramatic Karnali river canyon, explore the 12th-century Khasa ruins in Sinja Valley, and reach the tranquil shores of Rara Lake (2,990m) — the glittering Queen of Himalayan Lakes.",
  price: "850",
  durationWord: "7 Days / 6 Nights",
  diffWord: "Moderate / Overland Adventure",
  maxAlt: "2,990 m (Murma Top: 3,630 m)",
  transportWord: "Private 4WD Mahindra Scorpio / Toyota Prado",
  gallery: [
    "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp",
    "7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp",
    "rara-lake-jeep-tour.webp",
    "book-your-best-trip-today-incredible-trekking-and-tours.webp",
    "hero-himalayas.webp"
  ],
  days: [
    { day: 1, title: "Scenic Drive from Kathmandu to Kohalpur / Surkhet", dest: "Surkhet", duration: "10–12 hours", acc: "Hotel in Surkhet", meals: "Breakfast, Lunch, Dinner", desc: "Depart early from Kathmandu along the Prithvi and East-West highways through the Terai plains to Surkhet, the gateway city of Karnali province.", img1: "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp", img2: "rara-lake-jeep-tour.webp" },
    { day: 2, title: "4WD Jeep Drive: Surkhet to Kalikot (Manma)", dest: "Kalikot", duration: "7 hours", acc: "Mountain Lodge in Manma", meals: "Breakfast, Lunch, Dinner", desc: "Climb through the rugged Karnali canyon along cliff-hugging roads with dramatic views of rushing rivers and terraced mountain settlements.", img1: "7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp", img2: "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp" },
    { day: 3, title: "Drive Kalikot to Sinja Valley & Onward to Rara Lake (Talcha / Salleri)", dest: "Rara Lake", duration: "6 to 7 hours", acc: "Eco Lodge / Camp at Rara", meals: "Breakfast, Lunch, Dinner", desc: "Pass through historic Sinja Valley — the origin of Khas civilization — and cross dense cedar forests into Rara National Park.", img1: "rara-lake-jeep-tour.webp", img2: "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp" },
    { day: 4, title: "Full Day at Rara Lake: Boating, Nature Hike & Murma Viewpoint (3,630m)", dest: "Rara Lake", duration: "Full day exploration", acc: "Eco Lodge at Rara", meals: "Breakfast, Lunch, Dinner", desc: "Spend the day boating on crystal sapphire waters, walking the scenic lakeshore perimeter, and hiking to Murma Top for a bird's-eye panorama.", img1: "7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp", img2: "rara-lake-jeep-tour.webp" },
    { day: 5, title: "Scenic Return Drive: Rara Lake to Jumla / Kalikot", dest: "Kalikot", duration: "6 hours", acc: "Lodge in Kalikot", meals: "Breakfast, Lunch, Dinner", desc: "Bid farewell to Rara Lake as your 4WD traces back through pine forests and apple orchards toward Kalikot.", img1: "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp", img2: "7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp" },
    { day: 6, title: "Drive Kalikot to Surkhet", dest: "Surkhet", duration: "7 hours", acc: "Hotel in Surkhet", meals: "Breakfast, Lunch, Dinner", desc: "Descend out of the high mountain gorges back into Surkhet valley for a celebratory evening dinner.", img1: "rara-lake-jeep-tour.webp", img2: "7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp" },
    { day: 7, title: "Drive Surkhet to Kathmandu", dest: "Kathmandu", duration: "10–11 hours", acc: "Hotel in Kathmandu", meals: "Breakfast & Lunch", desc: "Journey back across the scenic highway to Kathmandu, arriving in the evening with unforgettable memories of western Nepal.", img1: "7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp", img2: "rara-lake-jeep-tour.webp" }
  ]
});
fs.writeFileSync(path.join(raraDir, 'index.html'), raraHTML, 'utf8');
console.log('Created tour/rara-lake-jeep-tour/index.html');

// -------------------------------------------------------------
// 5. HONEYMOON TOUR IN NEPAL
// -------------------------------------------------------------
const honeymoonDir = path.join(ROOT, 'tour', 'honeymoon-tour-in-nepal');
ensureDir(honeymoonDir);
const honeymoonHTML = generateTourPage({
  name: "Honeymoon Tour in Nepal (8 Days)",
  title: "Honeymoon Tour in Nepal (8 Days) — Romantic Luxury Himalayan Escape — Igloo Himalaya Treks",
  metaDesc: "Celebrate romance in the Himalayas with our 8-day Nepal Honeymoon Tour. Candlelight dinners, private Fewa Lake boating in Pokhara, Nagarkot sunrise resort, and boutique stays.",
  canonicalUrl: "https://igloohimalayatreks.com/tour/honeymoon-tour-in-nepal/",
  pill: "Romantic Luxury • Boutique Himalayan Getaway",
  leadText: "Celebrate your love story amidst the majesty of the Himalayas. Our handcrafted 8-day Nepal Honeymoon Tour combines luxury boutique heritage accommodations, romantic private boat cruises across tranquil Fewa Lake, private sunrise champagne breakfasts over Mount Everest at Nagarkot, and pampering couple's spa retreats in Pokhara.",
  price: "1,190",
  durationWord: "8 Days / 7 Nights",
  diffWord: "Easy / Pure Luxury & Romance",
  maxAlt: "2,175 m",
  transportWord: "Private Luxury AC Vehicle + Scenic Domestic Flights",
  gallery: [
    "honeymoon-tour-in-nepal.webp",
    "honeymoon-tour-in-nepal-02.webp",
    "boat-5259878-1920.webp",
    "chisapani-nagarkot-trek.webp",
    "city-tour.webp"
  ],
  days: [
    { day: 1, title: "Welcome to Kathmandu: VIP Airport Transfer & Candlelight Dinner", dest: "Kathmandu", duration: "Arrival day", acc: "5-Star Heritage Hotel (Dwarika's or similar)", meals: "Romantic Welcome Dinner", desc: "Private VIP airport welcome with garlands and transfers to your heritage boutique suite. Enjoy an intimate candlelight dinner with fine wine.", img1: "honeymoon-tour-in-nepal.webp", img2: "honeymoon-tour-in-nepal-02.webp" },
    { day: 2, title: "Private Cultural Exploration: Patan Durbar Square & Swayambhunath", dest: "Kathmandu Valley", duration: "4 to 5 hours", acc: "Heritage Boutique Hotel", meals: "Breakfast", desc: "Leisurely guided stroll through ancient Newari architectural courtyards in Patan followed by sunset views from the Monkey Temple.", img1: "city-tour.webp", img2: "honeymoon-tour-in-nepal.webp" },
    { day: 3, title: "Scenic Flight to Pokhara & Private Sunset Cruise on Fewa Lake", dest: "Pokhara", duration: "25 min flight + Boating", acc: "Luxury Lakeside Resort", meals: "Breakfast", desc: "Fly alongside the Langtang and Manaslu ranges to Pokhara. Board a private wooden boat across Fewa Lake to Tal Barahi Temple with reflection of Machapuchare.", img1: "boat-5259878-1920.webp", img2: "honeymoon-tour-in-nepal-02.webp" },
    { day: 4, title: "Sarangkot Sunrise over Annapurna & Couple's Ayurvedic Spa", dest: "Pokhara", duration: "Morning sunrise + Spa", acc: "Luxury Lakeside Resort", meals: "Breakfast", desc: "Private morning drive to Sarangkot to watch the first golden rays touch Dhaulagiri, Annapurna I, and Fishtail. Afternoon rejuvenating couple's massage.", img1: "honeymoon-tour-in-nepal.webp", img2: "boat-5259878-1920.webp" },
    { day: 5, title: "Peace Pagoda Serenity & Begnas Lake Romantic Excursion", dest: "Pokhara", duration: "Half day tour", acc: "Luxury Lakeside Resort", meals: "Breakfast", desc: "Visit the serene hilltop World Peace Pagoda and enjoy an excursion to peaceful Begnas Lake surrounded by emerald green forests.", img1: "honeymoon-tour-in-nepal-02.webp", img2: "honeymoon-tour-in-nepal.webp" },
    { day: 6, title: "Flight to Kathmandu & Drive to Nagarkot Luxury Hilltop Resort", dest: "Nagarkot", duration: "Flight + 1.5 hr drive", acc: "Luxury Mountain Resort (Club Himalaya / Mystic Mountain)", meals: "Breakfast & Sunset Dinner", desc: "Fly back to Kathmandu and ascend through pine forests to Nagarkot ridge (2,175m). Sip wine on your private balcony overlooking the snowy Himalayan crest.", img1: "chisapani-nagarkot-trek.webp", img2: "honeymoon-tour-in-nepal.webp" },
    { day: 7, title: "Himalayan Sunrise over Everest & Bhaktapur Ancient City Walk", dest: "Kathmandu", duration: "3 hours tour", acc: "5-Star Hotel in Kathmandu", meals: "Breakfast", desc: "Watch the sunrise over Mt. Everest from the resort terrace. On the return drive, explore UNESCO Bhaktapur Durbar Square's 55-window palace.", img1: "honeymoon-tour-in-nepal-02.webp", img2: "chisapani-nagarkot-trek.webp" },
    { day: 8, title: "Farewell Kathmandu & Departure", dest: "International Airport", duration: "Transfer", acc: "Departure", meals: "Breakfast", desc: "Relax with late checkout and private transfer to Tribhuvan International Airport for your flight home.", img1: "honeymoon-tour-in-nepal.webp", img2: "city-tour.webp" }
  ]
});
fs.writeFileSync(path.join(honeymoonDir, 'index.html'), honeymoonHTML, 'utf8');
console.log('Created tour/honeymoon-tour-in-nepal/index.html');

// -------------------------------------------------------------
// 6. CHISAPANI NAGARKOT TREK (3 DAYS)
// -------------------------------------------------------------
const chisapaniDir = path.join(ROOT, 'trek', 'chisapani-nagarkot-trek');
ensureDir(chisapaniDir);

function buildTrekAccordion(days) {
  return days.map(d => `
              <!-- Day ${d.day} -->
              <div class="itinerary-card">
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>Trek/Travel time: ${d.duration}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>Accommodation: ${d.acc}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path><path d="M2 10h20"></path></svg>
                        <span>Distance: ${d.dist}</span>
                      </div>
                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
                        <span>Meals: ${d.meals}</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
                        <span>Overnight: ${d.dest}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${d.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${d.img1}" alt="${d.title}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${d.img2}" alt="${d.dest} scenery">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');
}

const chisapaniDays = [
  { day: 1, title: "Drive Kathmandu to Sundarijal & Trek to Chisapani (2,215m)", dest: "Chisapani", altM: 2215, duration: "4 to 5 hours", acc: "Mountain Lodge", dist: "10 km", meals: "Lunch, Dinner", desc: "Drive 45 minutes to Sundarijal, the main water catchment source for Kathmandu Valley. Ascend along stone stairs through lush rhododendron and oak forests in Shivapuri National Park, passing Mulkharka Tamang village to reach the panoramic mountain pass of Chisapani.", img1: "chisapani-nagarkot-trek.webp", img2: "chisapani-nagarkot-trek-02.webp" },
  { day: 2, title: "Trek Chisapani to Nagarkot (2,175m) via Chauki Bhanjyang", dest: "Nagarkot", altM: 2175, duration: "6 to 7 hours", acc: "Hilltop Resort / Lodge", dist: "18 km", meals: "Breakfast, Lunch, Dinner", desc: "Wake up to glorious morning views of Langtang and Dorje Lakpa. Walk along gentle forest trails through Jule and Chauki Bhanjyang, winding through terraced farmlands and pine woods until reaching the famous ridge of Nagarkot for an unforgettable sunset.", img1: "chisapani-nagarkot-trek-03.webp", img2: "chisapani-nagarkot-trek-04.webp" },
  { day: 3, title: "Sunrise over Himalayas, Trek to Changunarayan (1,540m) & Drive to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "3 to 4 hours trek + 1 hr drive", acc: "Hotel in Kathmandu", dist: "9 km", meals: "Breakfast, Lunch", desc: "Witness the magnificent golden sunrise illuminating peaks from Dhaulagiri in the west to Mt. Everest in the east. After breakfast, trek down along pine ridges to ancient Changunarayan Temple, the oldest Hindu temple in Nepal, followed by a private drive back to Kathmandu.", img1: "chisapani-nagarkot-trek.webp", img2: "best-hiking-places-near-kathmandu.webp" }
];

let chisapaniHTML = baseTrekTemplate;
chisapaniHTML = chisapaniHTML.replace(/<title>[^<]*<\/title>/, `<title>Chisapani Nagarkot Trek (3 Days) — Kathmandu Valley Rim — Igloo Himalaya Treks</title>`);
chisapaniHTML = chisapaniHTML.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="The classic 3-day Chisapani Nagarkot circuit trek. Hike through Shivapuri National Park forests, witness spectacular Himalayan sunrises at Nagarkot, and explore ancient Changunarayan.">`);
chisapaniHTML = chisapaniHTML.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/" />`);
chisapaniHTML = chisapaniHTML.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="Chisapani Nagarkot Trek (3 Days) — Kathmandu Valley Rim — Igloo Himalaya Treks">`);
chisapaniHTML = chisapaniHTML.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="The classic 3-day Chisapani Nagarkot circuit trek. Hike through Shivapuri National Park forests, witness spectacular Himalayan sunrises at Nagarkot, and explore ancient Changunarayan.">`);
chisapaniHTML = chisapaniHTML.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/">`);
chisapaniHTML = chisapaniHTML.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/chisapani-nagarkot-trek.webp">`);
chisapaniHTML = chisapaniHTML.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="Chisapani Nagarkot Trek (3 Days) — Kathmandu Valley Rim — Igloo Himalaya Treks">`);
chisapaniHTML = chisapaniHTML.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="The classic 3-day Chisapani Nagarkot circuit trek. Hike through Shivapuri National Park forests, witness spectacular Himalayan sunrises at Nagarkot, and explore ancient Changunarayan.">`);
chisapaniHTML = chisapaniHTML.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="https://igloohimalayatreks.com/images/chisapani-nagarkot-trek.webp">`);

// Schema.org
const chisapaniSubTrips = chisapaniDays.map(d => `          { "@type": "TouristTrip", "name": "Day ${d.day}: ${d.title.replace(/"/g, '\\"')}" }`).join(',\n');
const chisapaniSchema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/#trip",
        "name": "Chisapani Nagarkot Trek (3 Days)",
        "description": "The classic 3-day Chisapani Nagarkot circuit trek through Shivapuri National Park with sunrise views of Mt. Everest and Langtang.",
        "touristType": ["Hikers", "Nature Lovers", "Beginners"],
        "subTrip": [
${chisapaniSubTrips}
        ],
        "offers": {
          "@type": "Offer",
          "price": "249",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "All Treks", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "Chisapani Nagarkot Trek", "item": "https://igloohimalayatreks.com/trek/chisapani-nagarkot-trek/" }
        ]
      }
    ]
  }
  </script>`;
chisapaniHTML = chisapaniHTML.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, chisapaniSchema);

// Hero Title
chisapaniHTML = chisapaniHTML.replace(/<span class="pill pill-copper">Everest Region • Classic Himalayan Expedition<\/span>/, `<span class="pill pill-copper">Kathmandu Valley Rim • Short Scenic Circuit</span>`);
chisapaniHTML = chisapaniHTML.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">Chisapani Nagarkot Trek (3 Days)</h1>`);
chisapaniHTML = chisapaniHTML.replace(/<p style="font-size: 1\.15rem; color: var\(--color-neutral-600\); line-height: 1\.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/,
  `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">The Chisapani Nagarkot Trek is Kathmandu's ultimate short trekking getaway. Trek through Shivapuri National Park's lush watershed forests to Chisapani pass, traverse peaceful village trails to Nagarkot ridge for sunrise views over Mt. Everest and Langtang, and conclude at Nepal's oldest UNESCO temple at Changunarayan.</p>`);

// Gallery
const chisapaniCollage = `<div class="trek-gallery-collage">
        <div class="trek-gallery-main">
          <img src="../../images/chisapani-nagarkot-trek.webp" alt="Chisapani Nagarkot Trek">
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
          <img src="../../images/chisapani-nagarkot-trek-02.webp" alt="Shivapuri Forest Trail">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/chisapani-nagarkot-trek-03.webp" alt="Chisapani Himalayan Pass">
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/chisapani-nagarkot-trek-04.webp" alt="Nagarkot Sunrise">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/best-hiking-places-near-kathmandu.webp" alt="Changunarayan Trail">
        </div>
      </div>`;
chisapaniHTML = chisapaniHTML.replace(/<div class="trek-gallery-collage">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `${chisapaniCollage}</div>`);

// Facts
chisapaniHTML = chisapaniHTML.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Duration<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
  `$13 days$2`);
chisapaniHTML = chisapaniHTML.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Difficulty<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
  `$1Easy to Moderate$2`);
chisapaniHTML = chisapaniHTML.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Max Altitude<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m=")[^"]*(">)[^<]*(<\/span>)/,
  `$12215$22,215 m (7,267 ft)$3`);
chisapaniHTML = chisapaniHTML.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Transport<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
  `$1Private AC Vehicle (Round-Trip)$2`);

// Itinerary
const chisapaniAccordion = buildTrekAccordion(chisapaniDays);
chisapaniHTML = chisapaniHTML.replace(/<div class="itinerary-timeline">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Map Section -->/,
  `<div class="itinerary-timeline">\n${chisapaniAccordion}\n</div>\n</div>\n</div>\n<!-- Map Section -->`);

// Price
chisapaniHTML = chisapaniHTML.replace(/\$1,299/g, '$249');
chisapaniHTML = chisapaniHTML.replace(/\$1,499/g, '$249');

fs.writeFileSync(path.join(chisapaniDir, 'index.html'), chisapaniHTML, 'utf8');
console.log('Created trek/chisapani-nagarkot-trek/index.html');
