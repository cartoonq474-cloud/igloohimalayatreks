const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const faqCategories = [
  { id: 'all', name: 'All Questions', count: 12 },
  { id: 'difficulty', name: 'Difficulty & Fitness', count: 3 },
  { id: 'altitude', name: 'Altitude & Safety', count: 2 },
  { id: 'scenery', name: 'Scenery & Culture', count: 2 },
  { id: 'costs', name: 'Costs & Teahouses', count: 2 },
  { id: 'planning', name: 'Timing & Planning', count: 3 }
];

const faqs = [
  // 1. Difficulty & Fitness (3)
  {
    id: 1,
    category: 'difficulty',
    categoryName: 'Difficulty & Fitness',
    question: 'Is Everest Base Camp harder than the Annapurna Circuit?',
    answer: 'For most trekkers, Everest Base Camp feels physically tougher due to prolonged high-altitude exposure. On EBC, you spend 5 to 6 consecutive nights sleeping above 4,000 meters (13,120 ft) and two nights above 4,900 meters at Lobuche and Gorak Shep, where oxygen levels drop below 55% of sea level. By contrast, the Annapurna Circuit features a more gradual acclimatization profile through lower valleys, and while Thorong La Pass (5,416m) is higher than EBC itself, you sleep above 4,500m for only one or two nights before quickly descending to 3,760m at Muktinath the very same afternoon.'
  },
  {
    id: 2,
    category: 'difficulty',
    categoryName: 'Difficulty & Fitness',
    question: 'Which trek is better for first-time trekkers?',
    answer: 'The Annapurna Circuit is often slightly friendlier for first-time Himalayan trekkers who have good fitness but have never hiked at extreme altitude. It starts lower in lush subtropical river valleys (around 1,400m to 1,900m), allowing your body to adapt naturally over 7 to 9 days of gradual walking before reaching the high pass. In contrast, the Everest Base Camp trek flies you straight to 2,846 meters at Lukla on Day 1, requiring immediate cardiovascular adaptation.'
  },
  {
    id: 3,
    category: 'difficulty',
    categoryName: 'Difficulty & Fitness',
    question: 'Can I do either trek without previous high-altitude trekking experience?',
    answer: 'Yes, hundreds of trekkers successfully complete both routes every season without prior high-altitude experience. However, you must have strong cardiovascular fitness, hike at a slow and disciplined pace (\'Bistari, Bistari\'), follow strict acclimatization schedules, stay well hydrated (3 to 4 liters daily), and hike with an experienced licensed guide who carries a pulse oximeter.'
  },

  // 2. Altitude & Safety (2)
  {
    id: 4,
    category: 'altitude',
    categoryName: 'Altitude & Safety',
    question: 'Which trek reaches higher altitude?',
    answer: 'Kala Patthar on the Everest Base Camp trek reaches 5,545 meters (18,192 ft), and Everest Base Camp sits at 5,364 meters (17,598 ft). Thorong La Pass on the Annapurna Circuit reaches 5,416 meters (17,769 ft). While Kala Patthar is technically 129 meters higher, Thorong La is a complete mountain pass crossing that takes 8 to 10 hours of strenuous high-altitude traversing.'
  },
  {
    id: 5,
    category: 'altitude',
    categoryName: 'Altitude & Safety',
    question: 'What emergency evacuation and medical protocols exist if someone gets altitude sickness (AMS)?',
    answer: 'Both trails have established high-altitude rescue networks, but logistics differ. In the Everest (Khumbu) region, chartered helicopter rescue is fast and frequent, capable of evacuating sick trekkers directly from Gorak Shep, Pheriche (which hosts a Himalayan Rescue Association clinic staffed by volunteer doctors), or Namche Bazaar down to Kathmandu within 1–2 hours weather permitting. On the Annapurna Circuit, helicopter evacuation is available up to Thorong Phedi and Muktinath; however, road ambulances and 4WD jeeps provide additional overland evacuation options once you reach Muktinath or Jomsom. All Igloo Himalaya Treks expedition leaders carry pulse oximeters, medical first-aid kits, and satellite communication devices. Trekkers must hold travel insurance covering helicopter evacuation up to 6,000 meters.'
  },

  // 3. Scenery & Culture (2)
  {
    id: 6,
    category: 'scenery',
    categoryName: 'Scenery & Culture',
    question: 'Which trek has better mountain views?',
    answer: 'It depends on the visual style you crave. Everest Base Camp offers raw, monolithic, vertical mountain drama—you are enclosed inside deep glacial valleys directly surrounded by giants like Ama Dablam, Lhotse, Nuptse, Pumori, and Everest. The Annapurna Circuit offers wider, panoramic 360-degree vistas across diverse mountain ranges, including Annapurna I, II, III, IV, Dhaulagiri, Nilgiri, Gangapurna, and Machapuchare (Fishtail).'
  },
  {
    id: 7,
    category: 'scenery',
    categoryName: 'Scenery & Culture',
    question: 'Which trek has more cultural variety?',
    answer: 'The Annapurna Circuit offers dramatically richer cultural diversity across its route. You begin in Hindu Brahmin and Chhetri farming hamlets, hike through Buddhist Gurung and Tamang villages in the middle hills, enter the distinct Tibetan-Buddhist culture of the Manange people in the upper valley, and descend into the arid kingdom of Mustang with its ancient Thakali and Tibetan traditions. The Everest trek is almost exclusively Sherpa Buddhist culture—fascinating, spiritual, and deeply tied to mountaineering history.'
  },

  // 4. Costs & Teahouses (2)
  {
    id: 8,
    category: 'costs',
    categoryName: 'Costs & Teahouses',
    question: 'Which trek is more expensive?',
    answer: 'Everest Base Camp is almost always 20% to 40% more expensive than the Annapurna Circuit. The primary drivers are mandatory domestic flights between Kathmandu/Ramechhap and Lukla (approx. $400–$440 USD round-trip for foreigners) and higher teahouse food and hot water prices in the Khumbu, where all goods must be carried up by porters, mules, or yaks. The Annapurna Circuit relies primarily on overland road transport (4WD jeeps or buses), which keeps initial transport costs lower.'
  },
  {
    id: 9,
    category: 'costs',
    categoryName: 'Costs & Teahouses',
    question: 'What are teahouses like, and do they have Wi-Fi, hot showers, and electricity?',
    answer: 'Teahouse standards on both treks are comfortable at lower elevations but become basic as you ascend. In lower villages (Lukla, Phakding, Namche on EBC; Besisahar, Dharapani, Chame on ACT), teahouses feature private twin rooms, attached bathrooms, hot gas showers, and reliable Wi-Fi. Above 4,000 meters (Dingboche and Lobuche on EBC; Upper Pisang, Manang, and Thorong Phedi on ACT), rooms are unheated wooden twin-shares with communal squat/western toilets. Hot bucket/gas showers cost $3 to $5 USD, battery/device charging costs $2 to $5 USD per full charge, and Wi-Fi is accessed via prepaid cards (Everest Link in Khumbu; Airalo e-SIM or local Ncell/Namaste SIM cards on the Annapurna Circuit). All dining halls are heated each evening by central stoves burning yak or wood fuel.'
  },

  // 5. Timing & Planning (3)
  {
    id: 10,
    category: 'planning',
    categoryName: 'Timing & Planning',
    question: 'What is the best season for Everest Base Camp and Annapurna Circuit?',
    answer: 'The two prime trekking seasons for both regions are Autumn (late September through November) and Spring (March through May). Autumn offers the clearest blue skies, crisp air, and unrivaled mountain visibility following the monsoon. Spring brings warmer daytime temperatures, blooming rhododendron and magnolia forests, and active expedition climbing camps.'
  },
  {
    id: 11,
    category: 'planning',
    categoryName: 'Timing & Planning',
    question: 'Which trek should I choose if I only have two weeks?',
    answer: 'If your international travel window is strictly 14 days door-to-door, Everest Base Camp fits into a standard 12-day trail itinerary, leaving 2 days for international connections and flight contingencies. The Annapurna Circuit can also be completed in 12 to 13 days using 4WD road-head starts (starting from Dharapani or Chame and finishing at Muktinath/Jomsom), but any mountain road delay can tighten your timeline.'
  },
  {
    id: 12,
    category: 'planning',
    categoryName: 'Timing & Planning',
    question: 'Which trek takes longer overall?',
    answer: 'The classic full Annapurna Circuit traditionally takes 14 to 18 days, though modern jeep road extensions allow flexible itineraries ranging from 12 to 14 days. Everest Base Camp typically takes 12 to 14 days round trip from Kathmandu. If you have fewer than 12 days total, EBC with a helicopter return or an Annapurna Base Camp / Poon Hill alternative is preferable to rushing the Circuit.'
  }
];

// Build Category Nav HTML
let catNavHtml = '            <div class="faq-category-nav" role="tablist" aria-label="FAQ Categories">\n';
faqCategories.forEach((cat, idx) => {
  const activeClass = idx === 0 ? ' active' : '';
  const selected = idx === 0 ? 'true' : 'false';
  catNavHtml += `              <button type="button" class="faq-cat-btn${activeClass}" role="tab" aria-selected="${selected}" data-cat="${cat.id}">
                <span>${cat.name}</span>
                <span class="faq-cat-count">${cat.count}</span>
              </button>\n`;
});
catNavHtml += '            </div>\n\n';

// Build Accordion Items HTML
let accordionHtml = '';
faqs.forEach((faq) => {
  accordionHtml += `            <div class="faq-accordion-item" data-category="${faq.category}">
              <button type="button" class="faq-question-btn" aria-expanded="false" id="faq-q-${faq.id}" aria-controls="faq-a-${faq.id}">
                <span class="faq-question-title-wrap">
                  <span class="faq-category-tag">${faq.categoryName}</span>
                  <span class="faq-question-text">${faq.id}. ${faq.question}</span>
                </span>
                <span class="faq-toggle-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer" id="faq-a-${faq.id}" role="region" aria-labelledby="faq-q-${faq.id}">
                <div class="faq-answer-content">
                  <p>
                    ${faq.answer}
                  </p>
                </div>
              </div>
            </div>\n\n`;
});

const newFaqSectionHtml = `<!-- SECTION 16: FAQ -->
          <section id="frequently-asked-questions" class="article-section">
            <h2>Frequently Asked Questions</h2>
            <p>
              Explore categorized answers to the 12 most frequent questions trekkers ask when deciding between Everest Base Camp and the Annapurna Circuit:
            </p>

${catNavHtml}${accordionHtml}          </section>`;

// Replace FAQ section
const faqSectionRegex = /<!-- SECTION 16: FAQ -->[\s\S]*?<\/section>/;
if (faqSectionRegex.test(html)) {
  html = html.replace(faqSectionRegex, newFaqSectionHtml);
  console.log('[PASS] Replaced FAQ Section in HTML.');
} else {
  console.error('[FAIL] Could not match FAQ Section!');
}

// Build JSON-LD FAQPage array
const faqSchemaMainEntity = faqs.map(f => ({
  "@type": "Question",
  "name": f.question,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": f.answer
  }
}));

// Replace JSON-LD FAQPage section
const faqPageSchemaRegex = /\{\s*"@type":\s*"FAQPage",[\s\S]*?"mainEntity":\s*\[[\s\S]*?\]\s*\}/;
const newFaqPageSchema = JSON.stringify({
  "@type": "FAQPage",
  "@id": "https://igloohimalayatreks.com/blog/everest-base-camp-vs-annapurna-circuit/#faq",
  "mainEntity": faqSchemaMainEntity
}, null, 6).split('\n').map((line, i) => i === 0 ? line : '      ' + line).join('\n');

if (faqPageSchemaRegex.test(html)) {
  html = html.replace(faqPageSchemaRegex, newFaqPageSchema);
  console.log('[PASS] Replaced FAQPage JSON-LD schema.');
} else {
  console.error('[FAIL] Could not match FAQPage JSON-LD schema!');
}

// Bump cache versions
html = html.replace(/index\.css\?v=\d+/g, 'index.css?v=36');
html = html.replace(/blog-article\.js\?v=\d+/g, 'blog-article.js?v=5');

fs.writeFileSync(filePath, html, 'utf8');
console.log('[PASS] Successfully updated blog HTML file with categorized FAQ.');
