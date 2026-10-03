const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const templatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
let html = fs.readFileSync(templatePath, 'utf8');

// 1. Meta & Header Information
html = html.replace(/<title>[^<]*<\/title>/, '<title>Manaslu Circuit Trek 12 Days (Fast Track) — Igloo Himalaya Treks</title>');
html = html.replace(/<meta name="description" content="[^"]*"/, '<meta name="description" content="Conquer the 12-day fast-track Manaslu Circuit Trek via Machha Khola and Larkya La Pass (5,106m). Experience pristine Tibetan Buddhist villages, Birendra Lake, and Mount Manaslu (8,163m).">');
html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/" />');
html = html.replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="Manaslu Circuit Trek 12 Days (Fast Track) — Igloo Himalaya Treks">');
html = html.replace(/<meta property="og:description" content="[^"]*"/, '<meta property="og:description" content="Conquer the 12-day fast-track Manaslu Circuit Trek via Machha Khola and Larkya La Pass (5,106m). Experience pristine Tibetan Buddhist villages, Birendra Lake, and Mount Manaslu (8,163m).">');
html = html.replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/">');
html = html.replace(/<meta property="og:image" content="[^"]*"/, '<meta property="og:image" content="https://igloohimalayatreks.com/images/manaslu-circuit-trek-12-days.webp">');
html = html.replace(/<meta name="twitter:title" content="[^"]*"/, '<meta name="twitter:title" content="Manaslu Circuit Trek 12 Days (Fast Track) — Igloo Himalaya Treks">');
html = html.replace(/<meta name="twitter:description" content="[^"]*"/, '<meta name="twitter:description" content="Conquer the 12-day fast-track Manaslu Circuit Trek via Machha Khola and Larkya La Pass (5,106m). Experience pristine Tibetan Buddhist villages, Birendra Lake, and Mount Manaslu (8,163m).">');
html = html.replace(/<meta name="twitter:image" content="[^"]*"/, '<meta name="twitter:image" content="https://igloohimalayatreks.com/images/manaslu-circuit-trek-12-days.webp">');

// 2. Schema.org JSON-LD Centerpiece
const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/#trip",
        "name": "Manaslu Circuit Trek 12 Days",
        "description": "Conquer the 12-day fast-track Manaslu Circuit Trek via Machha Khola and Larkya La Pass (5,106m). Experience pristine Tibetan Buddhist villages, Birendra Lake, and Mount Manaslu (8,163m).",
        "touristType": ["Hikers", "Trekking Enthusiasts"],
        "subTrip": [
          { "@type": "TouristTrip", "name": "Day 1: Drive Kathmandu to Machha Khola (900m)" },
          { "@type": "TouristTrip", "name": "Day 2: Trek Machha Khola to Jagat (1,340m)" },
          { "@type": "TouristTrip", "name": "Day 3: Trek Jagat to Deng (1,860m)" },
          { "@type": "TouristTrip", "name": "Day 4: Trek Deng to Namrung (2,630m)" },
          { "@type": "TouristTrip", "name": "Day 5: Trek Namrung to Lho (3,180m)" },
          { "@type": "TouristTrip", "name": "Day 6: Trek Lho to Samagaon (3,530m)" },
          { "@type": "TouristTrip", "name": "Day 7: Acclimatization in Samagaon & Birendra Tal" },
          { "@type": "TouristTrip", "name": "Day 8: Trek Samagaon to Samdo (3,875m)" },
          { "@type": "TouristTrip", "name": "Day 9: Trek Samdo to Dharamsala / Larkya Phedi (4,460m)" },
          { "@type": "TouristTrip", "name": "Day 10: Cross Larkya La Pass (5,106m) to Bimthang (3,590m)" },
          { "@type": "TouristTrip", "name": "Day 11: Trek Bimthang to Dharapani (1,960m)" },
          { "@type": "TouristTrip", "name": "Day 12: Drive Dharapani to Besisahar & Kathmandu (1,400m)" }
        ],
        "offers": {
          "@type": "Offer",
          "price": "990",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "All Treks", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "Manaslu Circuit Trek 12 Days", "item": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How difficult is the 12-Day Manaslu Circuit Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 12-day Manaslu Circuit is rated Challenging. Because it compresses the traditional route by driving directly to Machha Khola, daily walking durations range from 6 to 7 hours. The crux is crossing Larkya La Pass at 5,106m (16,752 ft), requiring good cardiovascular endurance and steady footing."
            }
          },
          {
            "@type": "Question",
            "name": "What permits are required for the Manaslu Circuit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Three permits are mandatory: Manaslu Restricted Area Permit (RAP), Manaslu Conservation Area Project (MCAP), and Annapurna Conservation Area Project (ACAP). Solo trekking is strictly prohibited; a minimum of two trekkers and a licensed guide are required."
            }
          },
          {
            "@type": "Question",
            "name": "What is the highest altitude reached on this 12-day trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The highest altitude reached is 5,106 meters (16,752 feet) atop Larkya La Pass on Day 10."
            }
          }
        ]
      }
    ]
  }
  </script>`;
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);

// 3. Hero Section
html = html.replace(/<span class="pill pill-copper">Everest Region • Classic Himalayan Expedition<\/span>/, '<span class="pill pill-copper">Manaslu Region • Restricted Area Circuit</span>');
html = html.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/, '<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">Manaslu Circuit Trek 12 Days</h1>');
html = html.replace(/<p style="font-size: 1.15rem; color: var\(--color-neutral-600\); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/,
  `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">
    A fast-track 12-day circumambulation of Mount Manaslu (8,163m) crossing high Larkya La Pass (5,106m), made possible by overland jeep access directly to Machha Khola.
    <span id="ebc-more-text" style="display: none;">
      Experience ancient Tibetan Buddhist villages in Nubri, visit turquoise Birendra Tal glacial lake, and marvel at 360-degree views of Himlung Himal, Cheo Himal, and the Annapurna massif.
    </span>
    <button id="ebc-toggle-btn" style="background: none; border: none; color: #1A96C8; font-weight: 700; font-size: 1.05rem; cursor: pointer; padding: 0; margin-left: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; transition: opacity 0.2s ease;">
      Learn more <span style="font-size: 1.1rem; margin-left: 2px;">→</span>
    </button>
  </p>`
);

// 4. Photo Collage Gallery
html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days.webp" alt="Manaslu Circuit Trek 12 Days"');
html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek1\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days-02.webp" alt="Manaslu Trail Landscape"');
html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek2\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days-budget-friendly.webp" alt="Larkya La Pass Trail"');
html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek3\.jpg"/g, 'src="../../images/a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.webp" alt="Ribung Gompa Monastery Lho"');
html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek35\.jpg"/g, 'src="../../images/manaslu-circuit-trek-02.webp" alt="Mount Manaslu Peak"');

// 5. Trip Facts Grid
html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">14 days<\/span>/, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">12 days</span>');
html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">Moderate<\/span>/, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Challenging</span>');
html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m="5545">5,545 m<\/span>/, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;" data-altitude-m="5106">5,106 m / 16,752 ft</span>');

// Replace Trek Starts & Trek End At
html = html.replace(/<!-- 10\. Trek Starts -->[\s\S]*?<!-- 13\. Package Start Point -->/, `<!-- 10. Trek Starts -->
          <div class="trip-fact-item">
            <div style="width: 42px; height: 42px; background: #F2F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/><polygon points="12 7 17 12 12 17 12 7"/></svg>
            </div>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek Starts</span>
              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Machha Khola</span>
            </div>
          </div>

          <!-- 11. Trek End At -->
          <div class="trip-fact-item">
            <div style="width: 42px; height: 42px; background: #F2F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            </div>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek End At</span>
              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Dharapani</span>
            </div>
          </div>

          <!-- 12. Trek Region -->
          <div class="trip-fact-item">
            <div style="width: 42px; height: 42px; background: #F2F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek Region</span>
              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Manaslu</span>
            </div>
          </div>

          <!-- 13. Package Start Point -->`);

// 6. Price & Booking Metadata
html = html.replace(/\$1,399/g, '$990');
html = html.replace(/data-trek-price="1399"/g, 'data-trek-price="990"');
html = html.replace(/data-trek-title="Everest Base Camp Trek"/g, 'data-trek-title="Manaslu Circuit Trek 12 Days"');
html = html.replace(/data-trek-key="ebc"/g, 'data-trek-key="manaslu-12"');

// 7. Overview Section Text
const overviewText = `            <h2 class="trek-section-title">Trek Overview</h2>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              The <strong>Manaslu Circuit Trek 12 Days</strong> is the premier fast-track wilderness expedition in Nepal, circumambulating Mount Manaslu (8,163m)—the world's eighth highest mountain. Traditionally completed over 14 to 16 days starting from Soti Khola, recent infrastructure developments extending the off-road jeep track directly to Machha Khola now permit fit, experienced hikers to conquer this remote trans-Himalayan masterpiece in just 12 days without compromising crucial acclimatization at Samagaon (3,530m).
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              Beginning with a dramatic overland jeep drive from Kathmandu deep into the rugged gorges of the Budhi Gandaki River, the trail ascends through sub-tropical river canyons, traversing dramatic suspension bridges and entering the restricted Manaslu Conservation Area at Jagat. As you climb through Deng and Namrung, lush bamboo and rhododendron forests transition into high alpine pine and juniper, opening up into the ancient Tibetan Buddhist realms of Nubri.
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              In Samagaon (3,530m), you will spend a dedicated acclimatization day exploring the turquoise waters of Birendra Tal glacial lake or ascending towards Manaslu Base Camp (4,800m) with towering views of the mountain's amphitheater. Continuing past Samdo—a traditional trading outpost near the Tibetan border—you will reach Dharamsala (4,460m) before embarking on an alpine pre-dawn push across the formidable Larkya La Pass (5,106m). Standing on the pass rewards you with awe-inspiring panoramas of Himlung Himal, Cheo Himal, Kang Guru, and the Annapurna massif before dropping into the serene meadows of Bimthang and driving back via Dharapani.
            </p>`;
html = html.replace(/<h2 class="trek-section-title">Trek Overview<\/h2>[\s\S]*?<style>\s*\.rich-highlights-container/, `${overviewText}\n            <style>\n              .rich-highlights-container`);

// 8. Highlights Section
const highlightsBlock = `            <div class="rich-highlights-container">
              <div style="border-left: 4px solid var(--color-copper-orange); padding-left: 14px; margin-bottom: 12px;">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--color-primary-navy); font-weight: 700;">Manaslu Circuit Trek 12 Days Highlights</h2>
              </div>
              
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                Experience raw wilderness, authentic Tibetan culture, and alpine mountain grandeur on this streamlined high Himalayan circuit.
              </p>
              
              <div class="rich-highlights-grid">
                <!-- 1. Larkya La -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Conquer Larkya La Pass (5,106 m / 16,752 ft).</strong> Dramatic pre-dawn crossing over high moraines with 360-degree views of Himlung Himal, Cheo Himal, Kang Guru, and Annapurna II.
                  </div>
                </div>

                <!-- 2. Circumnavigate Manaslu -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Circumnavigate Mount Manaslu (8,163 m).</strong> Trek around the world's eighth highest mountain with intimate vistas of its twin peaks and giant hanging glaciers.
                  </div>
                </div>

                <!-- 3. Express Fast-Track Route -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Direct Jeep Overland Access to Machha Khola.</strong> Bypass 2 days of dusty low-altitude road walking to maximize time in the spectacular alpine zone.
                  </div>
                </div>

                <!-- 4. Birendra Tal & Samagaon -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Glacial Lake Birendra Tal (3,450 m).</strong> Explore turquoise waters beneath the Manaslu glacier and visit ancient Pungyen Gompa during acclimatization at Samagaon.
                  </div>
                </div>

                <!-- 5. Tibetan Culture in Nubri -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Tibetan Buddhist Heritage of Nubri.</strong> Centuries-old stone mani walls, prayer wheels, and historic gompas untouched by modern commercialization.
                  </div>
                </div>

                <!-- 6. Restricted Area Solitude -->
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 10 11 15 8 12"></polyline>
                    </svg>
                  </div>
                  <div class="rich-highlight-content">
                    <strong>Restricted Conservation Area Status.</strong> Strict quota regulations and mandatory guide requirements ensure uncrowded, pristine trails and genuine teahouse warmth.
                  </div>
                </div>
              </div>
            </div>`;
html = html.replace(/<div class="rich-highlights-container">[\s\S]*?<\/div>\s*<style>\s*\.why-book-container/, `${highlightsBlock}\n\n            <style>\n              .why-book-container`);

// 9. Day-by-Day Accordion Itinerary (12 Days)
const days = [
  { day: 1, title: 'Drive from Kathmandu to Machha Khola', alt: '900m', time: '7 to 9 hours drive', dist: '160 km overland', meals: 'Lunch and Dinner', stay: 'Machha Khola', desc: 'Depart Kathmandu early in a private 4WD jeep, following the Prithvi Highway along the Trishuli River to Malekhu, Dhading Besi, and Arughat. Continue along the rugged gravel road following the Budhi Gandaki river gorge to reach Machha Khola teahouse lodge.' },
  { day: 2, title: 'Trek from Machha Khola to Jagat', alt: '1,340m', time: '6 to 7 hours', dist: '15 km / 9.3 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Jagat', desc: 'Follow the winding Budhi Gandaki river gorge, passing Khorlabesi and natural thermal springs at Tatopani. Cross suspension bridges, traverse stone staircases, and climb through Dobhan and Yaruphant to arrive at the stone-flagged village of Jagat, the checkpoint for the Manaslu Conservation Area.' },
  { day: 3, title: 'Trek from Jagat to Deng', alt: '1,860m', time: '6 to 7 hours', dist: '17 km / 10.5 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Deng', desc: 'Complete permit registration at Jagat and ascend to Salleri with views of Sringi Himal. Cross the river to Philim, a large Gurung village with Japanese-built schools, traverse past Ekle Bhatti, and cross bamboo forests into the narrow river gorge to reach Deng village.' },
  { day: 4, title: 'Trek from Deng to Namrung', alt: '2,630m', time: '6 to 7 hours', dist: '16 km / 9.9 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Namrung', desc: 'Enter the upper Nubri region where Tibetan Buddhist culture flourishes. Cross several wooden and suspension bridges over the Budhi Gandaki, climbing through dense pine, rhododendron, and oak forests. Pass beautiful carved mani stones and prayer walls to reach Namrung, which offers first views of Ganesh Himal and Himal Chuli.' },
  { day: 5, title: 'Trek from Namrung to Lho', alt: '3,180m', time: '4 to 5 hours', dist: '10.5 km / 6.5 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Lho', desc: 'Ascend gently past Lihi and Sho villages with their distinctive wooden shingles and barley terraces. Enter the stunning village of Lho, dominated by the elaborate Ribung Gompa monastery and framed by a jaw-dropping direct vista of Mount Manaslu’s twin summits.' },
  { day: 6, title: 'Trek from Lho to Samagaon', alt: '3,530m', time: '3 to 4 hours', dist: '8.5 km / 5.2 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Samagaon', desc: 'A scenic, relaxed morning walk through larch forests and glacial moraine past Shyala village, surrounded by peak panoramas of Himal Chuli, Peak 29, and Manaslu. Arrive at Samagaon, the cultural capital of Nubri, characterized by flat-roofed stone houses, yaks, and ancient prayer wheels.' },
  { day: 7, title: 'Acclimatization & Exploration Day in Samagaon', alt: '3,530m / 4,400m', time: '4 to 5 hours hike', dist: 'Day excursion', meals: 'Breakfast, Lunch and Dinner', stay: 'Samagaon', desc: 'Essential acclimatization day. Take an active acclimatization hike to the turquoise glacial waters of Birendra Tal (3,450m) and climb towards Manaslu Base Camp (4,400m-4,800m) under towering icefalls. Visit historic Pungyen Gompa or rest at the lodge.' },
  { day: 8, title: 'Trek from Samagaon to Samdo', alt: '3,875m', time: '3 to 4 hours', dist: '8 km / 5 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Samdo', desc: 'Follow the widening alpine valley past juniper trees and long mani walls. Climb gradually above the tree line into high windswept country where blue sheep frequently graze. Arrive at Samdo, an authentic Tibetan refugee village located just a few hours walk from the border with Tibet.' },
  { day: 9, title: 'Trek from Samdo to Dharamsala / Larkya Phedi', alt: '4,460m', time: '4 hours', dist: '7 km / 4.3 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Dharamsala', desc: 'Descend to cross the wooden bridge over the Budhi Gandaki headwaters and begin the steady ascent across glacial moraines and scree slopes toward Dharamsala (Larkya Phedi). Check into the high mountain lodge, enjoy an early carb-rich dinner, and pack gear for tomorrow\'s early pass crossing.' },
  { day: 10, title: 'Cross Larkya La Pass (5,106m) to Bimthang', alt: '5,106m / 3,590m', time: '8 to 10 hours', dist: '16 km / 9.9 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Bimthang', desc: 'Begin with a headlamp start at 4:00 AM. Ascend past frozen glacial tarns and moraine ridges to the summit of Larkya La Pass (5,106m / 16,752 ft), marked with colorful Buddhist prayer flags. Revel in panoramic vistas of Himlung Himal, Cheo Himal, Gyaji Kung, Kang Guru, and Annapurna II. Descend steeply over loose rock and snow to the alpine sanctuary of Bimthang.' },
  { day: 11, title: 'Trek from Bimthang to Dharapani', alt: '1,960m', time: '6 to 7 hours', dist: '18 km / 11.2 miles', meals: 'Breakfast, Lunch and Dinner', stay: 'Dharapani', desc: 'Descend from high alpine pastures into lush rhododendron, pine, and oak forests along the Dudh Khola. Pass through Karche, Gho, and Tilije before crossing the Marsyangdi River suspension bridge to join the Annapurna Circuit road at Dharapani.' },
  { day: 12, title: 'Drive from Dharapani to Besisahar & Kathmandu', alt: '1,400m', time: '8 to 9 hours drive', dist: '210 km overland', meals: 'Breakfast and Lunch', stay: 'Kathmandu (Hotel included)', desc: 'Board a 4WD jeep for the rugged mountain drive from Dharapani down through Tal gorge to Besisahar. Transfer to a comfortable private vehicle or tourist coach for the return drive along the Prithvi Highway back to Kathmandu, concluding your memorable Manaslu expedition.' }
];

const itineraryCards = days.map((d, index) => `
              <!-- Day ${String(d.day).padStart(2, '0')} -->
              <div class="itinerary-card ${index === 0 ? 'active' : ''}">
                <div class="itinerary-header">
                  <div class="itinerary-header-left">
                    <h4 class="itinerary-day-title-new">
                      <span class="day-label">Day ${d.day}:</span> ${d.title}
                    </h4>
                    <p class="itinerary-day-subtitle-new">
                      ${d.stay} – <span data-altitude-m="${parseInt(d.alt)}">${d.alt}</span> – ${d.time}
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
                        <span>Duration: ${d.time}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path>
                          <path d="M2 10h20"></path>
                        </svg>
                        <span>Distance: ${d.dist}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Accommodation: Teahouse / Mountain Lodge</span>
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
                        <span>Overnight: ${d.stay}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${d.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/manaslu-circuit-trek-12-days.webp" alt="Manaslu Trail View">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/manaslu-circuit-trek-12-days-02.webp" alt="Alpine Mountain Path">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/manaslu-circuit-trek-guide.webp" alt="Manaslu Himalayan Landscape">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/manaslu-circuit-trek-guide-02.webp" alt="Manaslu Teahouse Village">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');

html = html.replace(/<h2 class="trek-section-title">Everest Base Camp Trek Itinerary: Day by Day Details<\/h2>/, '<h2 class="trek-section-title">Manaslu Circuit Trek 12 Days Itinerary: Day by Day Details</h2>');
html = html.replace(/Our detailed 14-day itinerary is designed to maximize safety and acclimatization, ensuring you have the best possible chance of standing at the foot of the world's highest mountain\./, 'Our streamlined 12-day fast-track itinerary maximizes alpine trekking time via direct 4WD road access to Machha Khola while preserving crucial acclimatization in Samagaon.');
html = html.replace(/<div class="itinerary-timeline">[\s\S]*?<\/div>\s*<\/section>\s*<!-- Custom Itinerary Plan Your Trip CTA Banner Card -->/, `<div class="itinerary-timeline">\n${itineraryCards}\n            </div>\n          </section>\n          <!-- Custom Itinerary Plan Your Trip CTA Banner Card -->`);

// 10. Includes Section Updates
html = html.replace(/Kathmandu Lukla Kathmandu Flight/g, 'Kathmandu to Machha Khola and Dharapani to Besisahar/Kathmandu Overland Transport');
html = html.replace(/Scheduled mountain flights as listed in the itinerary; weather delays are possible\./g, 'Private 4WD jeep and local mountain transport connecting trailhead at Machha Khola and exit at Dharapani.');
html = html.replace(/Sagarmatha National Park Entry Permit and Local Entry Permits/g, 'Manaslu Restricted Area Permit (RAP), MCAP, and ACAP Permits');
html = html.replace(/We arrange this trekking permit for you before departure — no paperwork on your side\./g, 'All mandatory government restricted area permits and conservation project entry fees included.');
html = html.replace(/Guide for 12 Days, Porter for 11 Days/g, 'Licensed Himalayan Guide & Porters for 12 Days');

// 11. Dates & Availability title
html = html.replace(/Booking Dates & Availability for EBC trek/g, 'Booking Dates & Availability for Manaslu Circuit Trek 12 Days');

// 12. Map Section
html = html.replace(/src="\.\.\/\.\.\/images\/everest-base-camp-trek-map\.webp"/g, 'src="../../images/a-detailed-map-of-the-manaslu-circuit-trek-with-a-altitude-graph.webp"');

// Write out to /trek/manaslu-circuit-trek-12-days/index.html
const outPath = path.join(ROOT, 'trek', 'manaslu-circuit-trek-12-days', 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Clean package generated at trek/manaslu-circuit-trek-12-days/index.html');
