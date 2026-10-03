const fs = require('fs');
const path = require('path');

const blogHtmlPath = path.join(__dirname, '..', 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html');
const cssPath = path.join(__dirname, '..', 'index.css');
const jsPath = path.join(__dirname, '..', 'js', 'blog-article.js');

let html = fs.readFileSync(blogHtmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Define the 6 categories and their questions
const categories = [
  {
    id: 'general',
    name: 'General Comparison',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    faqs: [
      {
        question: 'Which trek should I choose between Everest Base Camp and the Annapurna Circuit?',
        answer: 'Choose Everest Base Camp if your dream is standing beneath the world’s highest monoliths, immersing yourself in Sherpa Buddhist mountaineering heritage, and experiencing raw, vertical glacial valleys. Choose the Annapurna Circuit if you desire dramatic ecological variety (from subtropical rice paddy terraces to high alpine desert), 360-degree panoramic massif views, richer cultural diversity across Hindu and Tibetan-influenced villages, and the thrilling crossing of 5,416m Thorong La Pass.'
      },
      {
        question: 'Which trek is better for first-time Himalayan trekkers?',
        answer: 'The Annapurna Circuit is often friendlier for first-time Himalayan trekkers who have good physical fitness but have never hiked at extreme altitude. It starts lower in lush river valleys (~1,400m), giving your body 7 to 9 days of gradual walking before reaching high altitude. In contrast, Everest Base Camp flies you directly to 2,846 meters at Lukla on Day 1, requiring immediate cardiovascular adaptation from your very first trekking hour.'
      }
    ]
  },
  {
    id: 'difficulty',
    name: 'Difficulty & Fitness',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    faqs: [
      {
        question: 'Is Everest Base Camp harder than the Annapurna Circuit?',
        answer: 'For most trekkers, Everest Base Camp feels physically tougher due to prolonged high-altitude exposure. On EBC, you spend 5 to 6 consecutive nights sleeping above 4,000 meters (13,120 ft) and two nights above 4,900 meters at Lobuche and Gorak Shep, where oxygen drops below 55% of sea level. By contrast, while Thorong La Pass (5,416m) is technically higher than EBC, you sleep above 4,500m for only 1 or 2 nights before quickly descending to 3,760m at Muktinath the very same afternoon.'
      },
      {
        question: 'Can I do either trek without previous high-altitude trekking experience?',
        answer: 'Yes, hundreds of trekkers successfully complete both routes every season without prior high-altitude experience. However, you must have strong cardiovascular fitness, hike at a slow and disciplined pace (\'Bistari, Bistari\'), adhere to strict acclimatization schedules, stay well hydrated (3 to 4 liters daily), and hike with an experienced licensed guide who monitors blood oxygen levels daily with a pulse oximeter.'
      }
    ]
  },
  {
    id: 'health',
    name: 'Altitude & Safety',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    faqs: [
      {
        question: 'Which trek reaches higher altitude?',
        answer: 'Kala Patthar on the Everest Base Camp trek reaches 5,545 meters (18,192 ft), and Everest Base Camp sits at 5,364 meters (17,598 ft). Thorong La Pass on the Annapurna Circuit reaches 5,416 meters (17,769 ft). While Kala Patthar is technically 129 meters higher, Thorong La is a strenuous mountain pass crossing requiring an 8-to-10 hour push across snow and scree.'
      },
      {
        question: 'What emergency evacuation and medical protocols exist if someone gets altitude sickness (AMS)?',
        answer: 'Both trails have established high-altitude rescue networks, but logistics differ. In the Everest (Khumbu) region, chartered helicopter rescue is fast and frequent, capable of evacuating sick trekkers directly from Gorak Shep, Pheriche (which hosts a Himalayan Rescue Association clinic staffed by volunteer doctors), or Namche Bazaar down to Kathmandu within 1–2 hours weather permitting. On the Annapurna Circuit, helicopter evacuation is available up to Thorong Phedi and Muktinath; however, road ambulances and 4WD jeeps provide additional overland evacuation options once you reach Muktinath or Jomsom. All Igloo Himalaya Treks expedition leaders carry pulse oximeters, medical first-aid kits, and satellite communication devices. Trekkers must hold travel insurance covering helicopter evacuation up to 6,000 meters.'
      }
    ]
  },
  {
    id: 'scenery',
    name: 'Scenery & Culture',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
    faqs: [
      {
        question: 'Which trek has better mountain views?',
        answer: 'It depends on the visual style you crave. Everest Base Camp offers raw, monolithic, vertical mountain drama—you are enclosed inside deep glacial valleys directly surrounded by giants like Ama Dablam, Lhotse, Nuptse, Pumori, and Everest. The Annapurna Circuit offers wider, panoramic 360-degree vistas across diverse mountain ranges, including Annapurna I, II, III, IV, Dhaulagiri, Nilgiri, Gangapurna, and Machapuchare (Fishtail).'
      },
      {
        question: 'Which trek has more cultural variety?',
        answer: 'The Annapurna Circuit offers dramatically richer cultural diversity across its route. You begin in Hindu Brahmin and Chhetri farming hamlets, hike through Buddhist Gurung and Tamang villages in the middle hills, enter the distinct Tibetan-Buddhist culture of the Manange people in the upper valley, and descend into the arid kingdom of Mustang with its ancient Thakali and Tibetan traditions. The Everest trek is almost exclusively Sherpa Buddhist culture—fascinating, spiritual, and deeply tied to mountaineering history.'
      }
    ]
  },
  {
    id: 'accommodation',
    name: 'Accommodation & Food',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    faqs: [
      {
        question: 'Which trek is more expensive?',
        answer: 'Everest Base Camp is almost always 20% to 40% more expensive than the Annapurna Circuit. The primary drivers are mandatory domestic flights between Kathmandu/Ramechhap and Lukla (approx. $400–$440 USD round-trip for foreigners) and higher teahouse food and hot water prices in the Khumbu, where all goods must be carried up by porters, mules, or yaks. The Annapurna Circuit relies primarily on overland road transport (4WD jeeps or buses), which keeps initial transport costs lower.'
      },
      {
        question: 'What are teahouses like, and do they have Wi-Fi, hot showers, and electricity?',
        answer: 'Teahouse standards on both treks are comfortable at lower elevations but become basic as you ascend. In lower villages (Lukla, Phakding, Namche on EBC; Besisahar, Dharapani, Chame on ACT), teahouses feature private twin rooms, attached bathrooms, hot gas showers, and reliable Wi-Fi. Above 4,000 meters (Dingboche and Lobuche on EBC; Upper Pisang, Manang, and Thorong Phedi on ACT), rooms are unheated wooden twin-shares with communal squat/western toilets. Hot bucket/gas showers cost $3 to $5 USD, battery/device charging costs $2 to $5 USD per full charge, and Wi-Fi is accessed via prepaid cards (Everest Link in Khumbu; Airalo e-SIM or local Ncell/Namaste SIM cards on the Annapurna Circuit). All dining halls are heated each evening by central stoves burning yak or wood fuel.'
      }
    ]
  },
  {
    id: 'planning',
    name: 'Season & Logistics',
    iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    faqs: [
      {
        question: 'What is the best season for Everest Base Camp and Annapurna Circuit?',
        answer: 'The two prime trekking seasons for both regions are Autumn (late September through November) and Spring (March through May). Autumn offers the clearest blue skies, crisp air, and unrivaled mountain visibility following the monsoon. Spring brings warmer daytime temperatures, blooming rhododendron and magnolia forests, and active expedition climbing camps.'
      },
      {
        question: 'Which trek should I choose if I only have two weeks?',
        answer: 'If your international travel window is strictly 14 days door-to-door, Everest Base Camp fits into a standard 12-day trail itinerary, leaving 2 days for international connections and flight contingencies. The Annapurna Circuit can also be completed in 12 to 13 days using 4WD road-head starts (starting from Dharapani or Chame and finishing at Muktinath/Jomsom), but any mountain road delay can tighten your timeline.'
      },
      {
        question: 'Which trek takes longer overall?',
        answer: 'The classic full Annapurna Circuit traditionally takes 14 to 18 days, though modern jeep road extensions allow flexible itineraries ranging from 12 to 14 days. Everest Base Camp typically takes 12 to 14 days round trip from Kathmandu. If you have fewer than 12 days total, EBC with a helicopter return or an Annapurna Base Camp / Poon Hill alternative is preferable to rushing the Circuit.'
      }
    ]
  }
];

// 2. Build Dhaulagiri-style HTML
let sidebarNavHtml = '';
categories.forEach((cat, idx) => {
  const activeClass = idx === 0 ? ' active' : '';
  sidebarNavHtml += `                  <button type="button" class="faq-category-btn${activeClass}" data-category="${cat.id}">
                    <span class="faq-cat-icon">
                      ${cat.iconSvg}
                    </span>
                    ${cat.name}
                  </button>\n`;
});

let categoryPanelsHtml = '';
categories.forEach((cat, idx) => {
  const activeClass = idx === 0 ? ' active' : '';
  categoryPanelsHtml += `                <!-- Category: ${cat.name} -->\n`;
  categoryPanelsHtml += `                <div class="faq-category-content${activeClass}" id="faq-cat-${cat.id}">\n`;
  cat.faqs.forEach(faq => {
    categoryPanelsHtml += `                  <div class="faq-item">
                    <div class="faq-item-question" role="button" tabindex="0" aria-expanded="false">
                      <span>${faq.question}</span>
                      <span class="faq-toggle-circle">∨</span>
                    </div>
                    <div class="faq-item-answer">
                      ${faq.answer}
                    </div>
                  </div>\n`;
  });
  categoryPanelsHtml += `                </div>\n\n`;
});

const dhaulagiriFaqSectionHtml = `<!-- Section 16: FAQs (Dhaulagiri Circuit Layout) -->
          <section id="frequently-asked-questions" class="article-section">
            <h2 class="faq-section-accent-title">
              <span class="faq-accent-bar"></span>
              Frequently Asked Questions: Everest vs. Annapurna
            </h2>
            <p style="margin-bottom: 24px; color: #475569;">
              Select a category below to explore expert answers to the most common questions travelers ask when deciding between Everest Base Camp and the Annapurna Circuit:
            </p>

            <div class="faq-layout-container">

              <!-- Left Sidebar Category Navigation -->
              <div class="faq-sidebar-card">
                <div class="faq-category-nav">
${sidebarNavHtml}                </div>
              </div>

              <!-- Right FAQ Content Panel -->
              <div class="faq-main-panel">
                <!-- Header Bar -->
                <div class="faq-panel-header">
                  <h3 class="faq-active-category-title" id="faq-current-category-title">General Comparison</h3>
                  <button type="button" class="faq-expand-all-btn" id="faq-expand-all-btn">Expand All</button>
                </div>

${categoryPanelsHtml}              </div>

            </div>
          </section>`;

// Replace FAQ section in HTML
const currentFaqRegex = /<!-- Section 16: FAQ[\s\S]*?<\/section>/i;
if (currentFaqRegex.test(html)) {
  html = html.replace(currentFaqRegex, dhaulagiriFaqSectionHtml);
  console.log('[PASS] Replaced FAQ Section with Dhaulagiri Layout.');
} else {
  // Try matching by id="frequently-asked-questions"
  const altFaqRegex = /<section id="frequently-asked-questions"[\s\S]*?<\/section>/;
  if (altFaqRegex.test(html)) {
    html = html.replace(altFaqRegex, dhaulagiriFaqSectionHtml);
    console.log('[PASS] Replaced FAQ Section via alt regex.');
  } else {
    console.error('[FAIL] Could not match FAQ section in index.html!');
  }
}

// 3. Update JSON-LD FAQPage with all questions
const allFaqsFlat = [];
categories.forEach(cat => {
  cat.faqs.forEach(f => {
    allFaqsFlat.push({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    });
  });
});

const faqPageSchemaRegex = /\{\s*"@type":\s*"FAQPage",[\s\S]*?"mainEntity":\s*\[[\s\S]*?\]\s*\}/;
const newFaqPageSchema = JSON.stringify({
  "@type": "FAQPage",
  "@id": "https://igloohimalayatreks.com/blog/everest-base-camp-vs-annapurna-circuit/#faq",
  "mainEntity": allFaqsFlat
}, null, 6).split('\n').map((line, i) => i === 0 ? line : '      ' + line).join('\n');

if (faqPageSchemaRegex.test(html)) {
  html = html.replace(faqPageSchemaRegex, newFaqPageSchema);
  console.log('[PASS] Replaced FAQPage JSON-LD schema with all 13 questions.');
}

// 4. Update index.css to remove the obsolete .faq-cat-btn styles and ensure .article-content-column .faq-layout-container fits perfectly
// Remove lines between /* Categorized FAQ Filter & Badge Styles */ and @media (max-width: 900px)
const obsoleteFaqCssRegex = /\/\* Categorized FAQ Filter & Badge Styles \*\/[\s\S]*?(?=@media \(max-width: 900px\))/;
if (obsoleteFaqCssRegex.test(css)) {
  css = css.replace(obsoleteFaqCssRegex, '');
  console.log('[PASS] Removed temporary tab CSS from index.css.');
}

// Ensure .article-content-column .faq-layout-container responsive rule exists
const articleFaqLayoutCss = `
/* Article Column Adaptation for Dhaulagiri FAQ Layout */
.article-content-column .faq-layout-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 22px;
  align-items: start;
}

@media (max-width: 900px) {
  .article-content-column .faq-layout-container {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
`;

if (!css.includes('.article-content-column .faq-layout-container')) {
  // Insert before /* ==========================================================================
  //    Floating Back to Top
  css = css.replace('/* ==========================================================================\n   Floating Back to Top', articleFaqLayoutCss + '\n/* ==========================================================================\n   Floating Back to Top');
  console.log('[PASS] Added article-content-column FAQ layout CSS.');
}

// 5. Update js/blog-article.js with Dhaulagiri FAQ Handler
const newJsFaqHandler = `/**
 * 4. Categorized FAQ Section Handler (Dhaulagiri Circuit Layout)
 */
function initFaqAccordion() {
  const categoryBtns = document.querySelectorAll('.faq-category-btn');
  const categoryPanels = document.querySelectorAll('.faq-category-content');
  const currentCategoryTitle = document.getElementById('faq-current-category-title');
  const expandAllBtn = document.getElementById('faq-expand-all-btn');

  if (!categoryBtns.length) return;

  // Category Tab Switcher
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCat = btn.getAttribute('data-category');
      const catText = btn.innerText.trim();

      if (currentCategoryTitle) {
        currentCategoryTitle.textContent = catText;
      }

      categoryPanels.forEach(panel => {
        if (panel.id === \`faq-cat-\${targetCat}\`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Reset Expand All button label
      if (expandAllBtn) {
        expandAllBtn.textContent = 'Expand All';
      }
    });
  });

  // Accordion Item Toggle
  document.querySelectorAll('.faq-item-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) {
        item.classList.toggle('active');
        const isNowActive = item.classList.contains('active');
        q.setAttribute('aria-expanded', isNowActive ? 'true' : 'false');
      }
    });

    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        q.click();
      }
    });
  });

  // Expand All / Collapse All Button
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.faq-category-content.active');
      if (!activePanel) return;

      const items = activePanel.querySelectorAll('.faq-item');
      const isExpanded = expandAllBtn.textContent.trim() === 'Collapse All';

      items.forEach(item => {
        const q = item.querySelector('.faq-item-question');
        if (isExpanded) {
          item.classList.remove('active');
          if (q) q.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          if (q) q.setAttribute('aria-expanded', 'true');
        }
      });

      expandAllBtn.textContent = isExpanded ? 'Expand All' : 'Collapse All';
    });
  }
}`;

const jsFaqRegex = /\/\*\*[\s\S]*?4\. FAQ Accordion[\s\S]*?function initFaqAccordion\(\) \{[\s\S]*?\n\}/;
if (jsFaqRegex.test(js)) {
  js = js.replace(jsFaqRegex, newJsFaqHandler);
  console.log('[PASS] Replaced initFaqAccordion in js/blog-article.js.');
} else {
  // Try matching just function initFaqAccordion()
  const altJsRegex = /function initFaqAccordion\(\) \{[\s\S]*?\n\}/;
  if (altJsRegex.test(js)) {
    js = js.replace(altJsRegex, newJsFaqHandler);
    console.log('[PASS] Replaced initFaqAccordion via alt regex in js/blog-article.js.');
  } else {
    console.error('[FAIL] Could not match initFaqAccordion in js/blog-article.js!');
  }
}

// 6. Bump cache versions
html = html.replace(/index\.css\?v=\d+/g, 'index.css?v=37');
html = html.replace(/blog-article\.js\?v=\d+/g, 'blog-article.js?v=6');

fs.writeFileSync(blogHtmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
fs.writeFileSync(jsPath, js, 'utf8');

console.log('Successfully completed Dhaulagiri Circuit FAQ layout integration!');
