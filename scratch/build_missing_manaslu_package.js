const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const templatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const pkg = {
  slug: 'manaslu-circuit-trek-12-days',
  title: 'Manaslu Circuit Trek 12 Days (Fast Track) — Igloo Himalaya Treks',
  metaDesc: 'Conquer the 12-day fast-track Manaslu Circuit Trek via Machha Khola and Larkya La Pass (5,106m). Experience pristine Tibetan Buddhist villages, Birendra Lake, and Mount Manaslu (8,163m).',
  canonical: 'https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/',
  heroTitle: 'Manaslu Circuit Trek 12 Days',
  heroSubtitle: 'A fast-track 12-day circumambulation of Mount Manaslu (8,163m) crossing high Larkya La Pass (5,106m), made possible by overland jeep access directly to Machha Khola.',
  heroImage: '../../images/manaslu-circuit-trek-12-days.webp',
  days: '12',
  maxAlt: '5,106 m',
  difficulty: 'Challenging',
  price: '990',
  region: 'Manaslu Region • Restricted Area Circuit',
  overview: `The <strong>Manaslu Circuit Trek 12 Days</strong> is the premier fast-track wilderness expedition in Nepal, circumambulating Mount Manaslu (8,163m)—the world's eighth highest mountain. Traditionally completed over 14 to 16 days starting from Soti Khola, recent infrastructure developments extending the off-road jeep track directly to Machha Khola now permit fit, experienced hikers to conquer this remote trans-Himalayan masterpiece in just 12 days without compromising crucial acclimatization at Samagaon (3,530m).<br><br>
Beginning with a dramatic overland jeep drive from Kathmandu deep into the rugged gorges of the Budhi Gandaki River, the trail ascends through sub-tropical river canyons, traversing dramatic suspension bridges and entering the restricted Manaslu Conservation Area at Jagat. As you climb through Deng and Namrung, lush bamboo and rhododendron forests transition into high alpine pine and juniper, opening up into the ancient Tibetan Buddhist realms of Nubri.<br><br>
In Samagaon (3,530m), you will spend a dedicated acclimatization day exploring the turquoise waters of Birendra Tal glacial lake or ascending towards Manaslu Base Camp (4,800m) with towering views of the mountain's amphitheater. Continuing past Samdo—a traditional trading outpost near the Tibetan border—you will reach Dharamsala (4,460m) before embarking on an alpine pre-dawn push across the formidable Larkya La Pass (5,106m). Standing on the pass rewards you with awe-inspiring panoramas of Himlung Himal, Cheo Himal, Kang Guru, and the Annapurna massif before dropping into the serene meadows of Bimthang and driving back via Dharapani.`,
  highlights: [
    'Circumnavigate Mount Manaslu (8,163m), the 8th highest mountain on Earth',
    'Cross the majestic Larkya La Pass at 5,106 meters (16,752 ft) with 360° Himalayan views',
    'Streamlined 12-day express route utilizing direct overland jeep access to Machha Khola',
    'Acclimatization day in Samagaon with optional hike to glacial Birendra Tal (3,450m)',
    'Immerse in ancient Tibetan Buddhist Nubri culture, stone mani walls, and Ribung Gompa',
    'Restricted area wilderness ensuring crowd-free trails and authentic teahouse hospitality',
    'Dramatic gorge hiking along the roaring Budhi Gandaki river across soaring suspension bridges',
    'Full safety protocol with certified high-altitude Sherpa guide and daily oximeter health checks'
  ],
  itinerary: [
    { day: 1, title: 'Drive from Kathmandu to Machha Khola (900m)', alt: '900m', time: '7-9 hrs drive', desc: 'Depart Kathmandu early by private 4WD jeep, following the Prithvi Highway along the Trishuli River to Malekhu, Dhading Besi, and Arughat. Continue along the rugged gravel road following the Budhi Gandaki river to reach Machha Khola teahouse lodge.' },
    { day: 2, title: 'Trek from Machha Khola to Jagat (1,340m)', alt: '1,340m', time: '6-7 hrs', desc: 'Follow the winding Budhi Gandaki river gorge, passing Khorlabesi and natural thermal springs at Tatopani. Cross suspension bridges, traverse stone staircases, and climb through Dobhan and Yaruphant to arrive at the stone-flagged village of Jagat, the checkpoint for the Manaslu Conservation Area.' },
    { day: 3, title: 'Trek from Jagat to Deng (1,860m)', alt: '1,860m', time: '6-7 hrs', desc: 'Complete permit registration at Jagat and ascend to Salleri with views of Sringi Himal. Cross the river to Philim, a large Gurung village with Japanese-built schools, traverse past Ekle Bhatti, and cross bamboo forests into the narrow river gorge to reach Deng village.' },
    { day: 4, title: 'Trek from Deng to Namrung (2,630m)', alt: '2,630m', time: '6-7 hrs', desc: 'Enter the upper Nubri region where Tibetan Buddhist culture flourishes. Cross several wooden and suspension bridges over the Budhi Gandaki, climbing through dense pine, rhododendron, and oak forests. Pass beautiful carved mani stones and prayer walls to reach Namrung, which offers first views of Ganesh Himal and Himal Chuli.' },
    { day: 5, title: 'Trek from Namrung to Lho (3,180m)', alt: '3,180m', time: '4-5 hrs', desc: 'Ascend gently past Lihi and Sho villages with their distinctive wooden shingles and barley terraces. Enter the stunning village of Lho, dominated by the elaborate Ribung Gompa monastery and framed by a jaw-dropping direct vista of Mount Manaslu’s twin summits.' },
    { day: 6, title: 'Trek from Lho to Samagaon (3,530m)', alt: '3,530m', time: '3-4 hrs', desc: 'A scenic, relaxed morning walk through larch forests and glacial moraine past Shyala village, surrounded by peak panoramas of Himal Chuli, Peak 29, and Manaslu. Arrive at Samagaon, the cultural capital of Nubri, characterized by flat-roofed stone houses, yaks, and ancient prayer wheels.' },
    { day: 7, title: 'Acclimatization & Exploration Day in Samagaon (3,530m)', alt: '3,530m / 4,400m', time: '4-5 hrs hike', desc: 'Essential acclimatization day. Take an active acclimatization hike to the turquoise glacial waters of Birendra Tal (3,450m) and climb towards Manaslu Base Camp (4,400m-4,800m) under towering icefalls. Visit historic Pungyen Gompa or rest at the lodge.' },
    { day: 8, title: 'Trek from Samagaon to Samdo (3,875m)', alt: '3,875m', time: '3-4 hrs', desc: 'Follow the widening alpine valley past juniper trees and long mani walls. Climb gradually above the tree line into high windswept country where blue sheep frequently graze. Arrive at Samdo, an authentic Tibetan refugee village located just a few hours walk from the border with Tibet.' },
    { day: 9, title: 'Trek from Samdo to Dharamsala / Larkya Phedi (4,460m)', alt: '4,460m', time: '4 hrs', desc: 'Descend to cross the wooden bridge over the Budhi Gandaki headwaters and begin the steady ascent across glacial moraines and scree slopes toward Dharamsala (Larkya Phedi). Check into the high mountain lodge, enjoy an early carb-rich dinner, and pack gear for tomorrow\'s early pass crossing.' },
    { day: 10, title: 'Cross Larkya La Pass (5,106m) to Bimthang (3,590m)', alt: '5,106m / 3,590m', time: '8-10 hrs', desc: 'Begin with a headlamp start at 4:00 AM. Ascend past frozen glacial tarns and moraine ridges to the summit of Larkya La Pass (5,106m / 16,752 ft), marked with colorful Buddhist prayer flags. Revel in panoramic vistas of Himlung Himal, Cheo Himal, Gyaji Kung, Kang Guru, and Annapurna II. Descend steeply over loose rock and snow to the alpine sanctuary of Bimthang.' },
    { day: 11, title: 'Trek from Bimthang to Dharapani (1,960m)', alt: '1,960m', time: '6-7 hrs', desc: 'Descend from high alpine pastures into lush rhododendron, pine, and oak forests along the Dudh Khola. Pass through Karche, Gho, and Tilije before crossing the Marsyangdi River suspension bridge to join the Annapurna Circuit road at Dharapani.' },
    { day: 12, title: 'Drive from Dharapani to Besisahar & Kathmandu (1,400m)', alt: '1,400m', time: '8-9 hrs drive', desc: 'Board a 4WD jeep for the rugged mountain drive from Dharapani down through Tal gorge to Besisahar. Transfer to a comfortable private vehicle or tourist coach for the return drive along the Prithvi Highway back to Kathmandu, concluding your Manaslu expedition.' }
  ]
};

function buildPackage() {
  let html = templateHtml;

  // 1. Meta & Title Tags
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${pkg.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${pkg.metaDesc}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${pkg.canonical}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${pkg.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${pkg.metaDesc}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${pkg.canonical}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/manaslu-circuit-trek-12-days.webp"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${pkg.title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${pkg.metaDesc}"`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="https://igloohimalayatreks.com/images/manaslu-circuit-trek-12-days.webp"`);

  // 2. Hero Section
  html = html.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${pkg.heroTitle}</h1>`);
  html = html.replace(/<p style="font-size: 1.15rem; color: var\(--color-neutral-600\); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/,
    `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">${pkg.heroSubtitle}</p>`
  );
  html = html.replace(/<span class="pill pill-copper"[^>]*>[\s\S]*?<\/span>/, `<span class="pill pill-copper">${pkg.region}</span>`);
  
  // Hero Background
  html = html.replace(/background: linear-gradient\(rgba\(8, 33, 56, 0.65\), rgba\(8, 33, 56, 0.8\)\), url\('[^']*'\)/g,
    `background: linear-gradient(rgba(8, 33, 56, 0.65), rgba(8, 33, 56, 0.8)), url('${pkg.heroImage}')`
  );

  // Gallery collage images
  html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days.webp"');
  html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek1\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days-02.webp"');
  html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek2\.jpg"/g, 'src="../../images/manaslu-circuit-trek-12-days-budget-friendly.webp"');
  html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek3\.jpg"/g, 'src="../../images/a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.webp"');
  html = html.replace(/src="\.\.\/\.\.\/images\/Everest Base Camp Trek35\.jpg"/g, 'src="../../images/manaslu-circuit-trek-02.webp"');

  // Key Trip Facts
  html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">14 days<\/span>/, `<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">${pkg.days} days</span>`);
  html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m="5545">5,545 m<\/span>/, `<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;" data-altitude-m="5106">${pkg.maxAlt}</span>`);
  html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">Lukla<\/span>/g, `<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Machha Khola</span>`);
  html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">Lukla<\/span>/g, `<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Dharapani</span>`);
  html = html.replace(/<span style="font-size: 1.05rem; color: var\(--color-neutral-800\); font-weight: 600;">Everest<\/span>/g, `<span style="font-size: 1.05rem; color: var(--color-neutral-800); font-weight: 600;">Manaslu</span>`);
  
  html = html.replace(/\$1,399/g, `$${pkg.price}`);
  html = html.replace(/data-trek-price="1399"/g, `data-trek-price="${pkg.price}"`);
  html = html.replace(/data-trek-title="Everest Base Camp Trek"/g, `data-trek-title="${pkg.heroTitle}"`);

  // Breadcrumb
  html = html.replace(
    /<span class="breadcrumb-current">[^<]*<\/span>/,
    `<span class="breadcrumb-current">${pkg.heroTitle}</span>`
  );

  // Overview content
  html = html.replace(
    /<div class="overview-body"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<!-- Trek Highlights -->/,
    `<div class="overview-body">\n<p style="font-size: 1.05rem; line-height: 1.8; color: var(--color-neutral-700); margin-bottom: 20px;">${pkg.overview}</p>\n</div>\n</div>\n<!-- Trek Highlights -->`
  );

  // Highlights
  const highlightsHtml = pkg.highlights.map(h => `
    <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;">
      <span style="color: var(--color-copper-orange); font-size: 1.2rem; line-height: 1;">✓</span>
      <span style="color: var(--color-neutral-700); font-size: 0.98rem; line-height: 1.5;">${h}</span>
    </div>`).join('\n');

  html = html.replace(
    /<div class="highlights-grid"[\s\S]*?<\/div>\s*<\/section>\s*<!-- Itinerary Section -->/,
    `<div class="highlights-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-top: 20px;">
${highlightsHtml}
    </div>
  </div>
</section>
<!-- Itinerary Section -->`
  );

  // Daily Itinerary
  const itineraryHtml = pkg.itinerary.map(item => `
    <div class="itinerary-day-card" style="background: white; border: 1px solid var(--color-neutral-200); border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid var(--color-neutral-100); padding-bottom: 10px;">
        <h3 style="font-size: 1.2rem; color: var(--color-primary-navy); margin: 0; font-weight: 700;">
          <span style="color: var(--color-copper-orange); margin-right: 6px;">Day ${item.day}:</span> ${item.title}
        </h3>
        <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--color-neutral-600); font-weight: 600;">
          <span>🏔️ ${item.alt}</span>
          <span>⏱️ ${item.time}</span>
        </div>
      </div>
      <p style="color: var(--color-neutral-700); font-size: 0.95rem; line-height: 1.7; margin: 0;">${item.desc}</p>
    </div>`).join('\n');

  html = html.replace(
    /<div class="itinerary-timeline"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- Map Section -->/,
    `<div class="itinerary-timeline">
${itineraryHtml}
    </div>
  </div>
</section>
<!-- Map Section -->`
  );

  // Schema.org Graph Update
  const schemaSubtrips = pkg.itinerary.map(item => `          { "@type": "TouristTrip", "name": "Day ${item.day}: ${item.title.replace(/"/g, '\\"')}" }`).join(',\n');
  const fullSchema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "${pkg.canonical}#trip",
        "name": "${pkg.heroTitle}",
        "description": "${pkg.metaDesc.replace(/"/g, '\\"')}",
        "touristType": ["Hikers", "Trekking Enthusiasts"],
        "subTrip": [
${schemaSubtrips}
        ],
        "offers": {
          "@type": "Offer",
          "price": "${pkg.price}",
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
          { "@type": "ListItem", "position": 2, "name": "All Treks", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "${pkg.heroTitle}", "item": "${pkg.canonical}" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "${pkg.canonical}#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How difficult is the 12-Day Manaslu Circuit Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 12-day Manaslu Circuit is rated Challenging. Because it compresses the route by driving directly to Machha Khola, daily walking durations range from 6 to 7 hours. The crux is crossing Larkya La Pass at 5,106m (16,752 ft), requiring good cardiovascular endurance and steady footing."
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
            "name": "What is the highest altitude reached?",
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

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, fullSchema);

  // Write output
  const targetDir = path.join(ROOT, 'trek', pkg.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`Generated: trek/${pkg.slug}/index.html`);
}

buildPackage();
