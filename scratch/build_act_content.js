const fs = require('fs');
const path = require('path');

const actFilePath = path.join(__dirname, '../trek/annapurna-circuit-trek/index.html');
let html = fs.readFileSync(actFilePath, 'utf8');

console.log('Original ACT length:', html.length);

// 1. Update Title, Meta Description, Open Graph & Twitter
html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Annapurna Circuit Trek (14 Days) — Igloo Himalaya Treks</title>');
html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']/i, '<meta name="description" content="Conquer the world-famous 14-day Annapurna Circuit Trek crossing Thorong La Pass (5,416m). Authentic guided expedition via Manang, Muktinath, and Pokhara with Igloo Himalaya Treks.">');
html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']/i, '<meta property="og:title" content="Annapurna Circuit Trek (14 Days) — Igloo Himalaya Treks">');
html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']/i, '<meta property="og:description" content="Conquer the world-famous 14-day Annapurna Circuit Trek crossing Thorong La Pass (5,416m). Authentic guided expedition via Manang, Muktinath, and Pokhara with Igloo Himalaya Treks.">');
html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']/i, '<meta property="og:image" content="https://igloohimalayatreks.com/images/annapurna-circuit-trek.webp">');
html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']/i, '<meta name="twitter:title" content="Annapurna Circuit Trek (14 Days) — Igloo Himalaya Treks">');
html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']/i, '<meta name="twitter:description" content="Conquer the world-famous 14-day Annapurna Circuit Trek crossing Thorong La Pass (5,416m). Authentic guided expedition via Manang, Muktinath, and Pokhara with Igloo Himalaya Treks.">');
html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']/i, '<meta name="twitter:image" content="https://igloohimalayatreks.com/images/annapurna-circuit-trek.webp">');

// 2. Update JSON-LD Schema
const newSchema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "https://igloohimalayatreks.com/trek/annapurna-circuit-trek/#trip",
        "name": "Annapurna Circuit Trek (14 Days)",
        "description": "Embark on Nepal's premier classic mountain journey encircling the monumental Annapurna massif, traversing high arid Tibetan-border valleys, conquering Thorong La Pass (5,416m), and exploring sacred Muktinath and the Kali Gandaki Gorge.",
        "touristType": ["Hikers", "Mountaineers", "Adventure Enthusiasts"],
        "subTrip": [
          { "@type": "TouristTrip", "name": "Day 1: Arrival in Kathmandu & Hotel Transfer (1,400m)" },
          { "@type": "TouristTrip", "name": "Day 2: Drive from Kathmandu to Besisahar & Dharapani (1,860m)" },
          { "@type": "TouristTrip", "name": "Day 3: Trek from Dharapani to Chame (2,670m)" },
          { "@type": "TouristTrip", "name": "Day 4: Trek from Chame to Upper Pisang (3,300m) via Paungda Danda" },
          { "@type": "TouristTrip", "name": "Day 5: Trek from Upper Pisang to Manang (3,540m) via Ghyaru & Ngawal" },
          { "@type": "TouristTrip", "name": "Day 6: Acclimatization and Exploration Day in Manang (3,540m)" },
          { "@type": "TouristTrip", "name": "Day 7: Trek from Manang to Yak Kharka (4,050m)" },
          { "@type": "TouristTrip", "name": "Day 8: Trek from Yak Kharka to Thorong Phedi / High Camp (4,450m–4,850m)" },
          { "@type": "TouristTrip", "name": "Day 9: Cross Thorong La Pass (5,416m) & Trek to Muktinath (3,800m)" },
          { "@type": "TouristTrip", "name": "Day 10: Trek from Muktinath to Kagbeni & Jomsom (2,720m)" },
          { "@type": "TouristTrip", "name": "Day 11: Drive from Jomsom to Tatopani Hot Springs (1,200m) via Kali Gandaki Gorge" },
          { "@type": "TouristTrip", "name": "Day 12: Drive from Tatopani to Pokhara (820m) & Lakeside Leisure" },
          { "@type": "TouristTrip", "name": "Day 13: Drive or Fly from Pokhara to Kathmandu (1,400m) & Farewell Dinner" },
          { "@type": "TouristTrip", "name": "Day 14: Final Departure from Kathmandu" }
        ],
        "offers": {
          "@type": "Offer",
          "price": "1150",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://igloohimalayatreks.com/trek/annapurna-circuit-trek/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://igloohimalayatreks.com/trek/annapurna-circuit-trek/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "Annapurna Region Treks", "item": "https://igloohimalayatreks.com/annapurna-region-treks/" },
          { "@type": "ListItem", "position": 3, "name": "Annapurna Circuit Trek", "item": "https://igloohimalayatreks.com/trek/annapurna-circuit-trek/" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://igloohimalayatreks.com/trek/annapurna-circuit-trek/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How difficult is the Annapurna Circuit Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Annapurna Circuit Trek is graded challenging / strenuous due to high altitude and pass crossing at Thorong La (5,416m / 17,769ft). While technical mountaineering gear is not required, sound cardiovascular endurance, hill walking fitness, and disciplined acclimatization in Manang are essential."
            }
          },
          {
            "@type": "Question",
            "name": "What permits are required for the Annapurna Circuit Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Two permits are required: the Annapurna Conservation Area Project (ACAP) Entry Permit and the Trekkers' Information Management System (TIMS) card. Both permits are 100% included in our all-inclusive package and arranged by Igloo Himalaya Treks."
            }
          },
          {
            "@type": "Question",
            "name": "When is the best time to do the Annapurna Circuit Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Autumn (September to November) and Spring (March to May) are the optimal trekking seasons, offering crystal-clear mountain visibility, stable weather conditions, and moderate daytime temperatures."
            }
          }
        ]
      }
    ]
  }
  </script>`;

html = html.replace(/<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, newSchema);

// 3. Update Hero Subtitle and Facts Grid
html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '<h1 style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">Annapurna Circuit Trek</h1>');

const newHeroParagraph = `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">
          Embark on Nepal's premier classic mountain journey encircling the monumental Annapurna massif, traversing high arid Tibetan-border valleys, conquering Thorong La Pass (5,416m), and exploring sacred Muktinath and the Kali Gandaki Gorge.
          <span id="ebc-more-text" style="display: none;">
            Guided by our certified local expert team, you will safely navigate high-altitude Himalayan terrain with tailored acclimatization in Manang, comfortable teahouse stays, and rich local cultural traditions.
          </span>
          <button id="ebc-toggle-btn" style="background: none; border: none; color: #1A96C8; font-weight: 700; font-size: 1.05rem; cursor: pointer; padding: 0; margin-left: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; transition: opacity 0.2s ease;">
            Learn more <span style="font-size: 1.1rem; margin-left: 2px;">→</span>
          </button>
        </p>`;

html = html.replace(/<p style=["']font-size:\s*1\.15rem;[\s\S]*?Learn more[\s\S]*?<\/p>/i, newHeroParagraph);

// Update Gallery Images to real Annapurna Circuit photos
html = html.replace(/<div class="trek-gallery-collage">[\s\S]*?<!-- Key Trip Facts Grid -->/i, `<div class="trek-gallery-collage">
        <!-- Main Large Photo (Left) with Travelers' Choice badge -->
        <div class="trek-gallery-main">
          <img src="../../images/annapurna-circuit-trek.webp" alt="Annapurna Circuit Trek Spectacular Mountain Panorama">
          <!-- TripAdvisor Travelers' Choice Badge -->
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
        
        <!-- Grid Items (Right 2x2 Columns) -->
        <div class="trek-gallery-sub">
          <img src="../../images/classic-annapurna-circuit-trek.webp" alt="Annapurna Mountain Range and Glacial Valley">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la.webp" alt="Trekkers ascending Thorong La Pass">
          <!-- See all photos button -->
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/classic-annapurna-circuit-trek-02.webp" alt="Ancient Buddhist Chortens in Manang Valley">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/annapurna-circuit-luxury-trek-06.webp" alt="Muktinath Temple Valley and Dhaulagiri Range">
        </div>
      </div>
    </div>

    <!-- Key Trip Facts Grid -->`);

// Update Facts in Grid
html = html.replace(/<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Moderate<\/span>/i, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Challenging</span>');
html = html.replace(/<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']\s+data-altitude-m=["']5545["']>5,545\s*m<\/span>/i, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;" data-altitude-m="5416">5,416 m (Thorong La)</span>');
html = html.replace(/<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Hostels & Guesthouses<\/span>/i, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Mountain Teahouses & Lodges</span>');
html = html.replace(/<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Both way Flight<\/span>/i, '<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Private 4WD & Jomsom/Pokhara</span>');
html = html.replace(/<span style=["']font-size:\s*0\.75rem;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*0\.05em;\s*color:\s*var\(--color-neutral-500\);\s*font-weight:\s*700;["']>Trek Starts<\/span>\s*<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Lukla<\/span>/i, '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek Starts</span>\n              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Besisahar / Dharapani</span>');
html = html.replace(/<span style=["']font-size:\s*0\.75rem;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*0\.05em;\s*color:\s*var\(--color-neutral-500\);\s*font-weight:\s*700;["']>Trek End At<\/span>\s*<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Lukla<\/span>/i, '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek End At</span>\n              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Jomsom / Pokhara</span>');
html = html.replace(/<span style=["']font-size:\s*0\.75rem;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*0\.05em;\s*color:\s*var\(--color-neutral-500\);\s*font-weight:\s*700;["']>Trek Region<\/span>\s*<span style=["']font-size:\s*1\.05rem;\s*color:\s*var\(--color-neutral-800\);\s*font-weight:\s*600;["']>Everest<\/span>/i, '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); font-weight: 700;">Trek Region</span>\n              <span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Annapurna (ACAP)</span>');

console.log('Hero and Facts updated.');
fs.writeFileSync(path.join(__dirname, 'act_temp.html'), html, 'utf8');
