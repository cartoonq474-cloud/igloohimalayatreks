const fs = require('fs');
const path = require('path');
const { includesHtml, checkTagBalance } = require('./build_act_includes.js');
const { renderDetailsHtml } = require('./build_act_details.js');

// 28 Authentic Annapurna Circuit FAQs across 6 categories
const faqCategories = [
  {
    catId: "general",
    title: "General Information",
    items: [
      {
        q: "What makes the Annapurna Circuit Trek so famous?",
        a: "The Annapurna Circuit is internationally renowned for its unparalleled geographic and cultural diversity. In just 14 days, you journey from lush subtropical rice terraces and roaring river gorges at 800m up through alpine pine forests into the stark, high-altitude Tibetan-plateau desert of Manang and Mustang. You cross the world's most famous trekking pass — Thorong La (5,416m) — with 360-degree panoramas of Annapurna I (8,091m), Dhaulagiri (8,167m), and Manaslu (8,163m), descending into the sacred pilgrimage shrines of Muktinath."
      },
      {
        q: "When is the best time to trek the Annapurna Circuit?",
        a: "The two optimal trekking seasons are Autumn (late September to late November) and Spring (March to May). Autumn delivers the clearest mountain skies, crystal-clean air, and dry trails following the summer monsoon. Spring offers warmer temperatures, longer daylight hours, and vibrant hillside forests blooming with wild rhododendrons. Manang and lower Mustang also lie in the Himalayan rain shadow, making the high sections relatively dry even during the summer monsoon."
      },
      {
        q: "How long is the Annapurna Circuit Trek and how many kilometers do we walk?",
        a: "Our classic itinerary takes 14 days round trip from Kathmandu, with 10 active days on the mountain trail. Trekkers cover approximately 135 to 145 kilometers (84 to 90 miles) of walking, averaging 5 to 7 hours of hiking daily. We utilize private 4WD overland vehicles to bypass commercial dirt roads at the start (Besisahar to Dharapani) and end (Jomsom to Pokhara), ensuring your trekking days are spent entirely on scenic mountain footpaths."
      },
      {
        q: "How does the Annapurna Circuit compare to the Everest Base Camp Trek?",
        a: "While Everest Base Camp is an in-and-out trek through a single high-altitude Sherpa valley reaching 5,364m, the Annapurna Circuit is a true geographic loop that transitions through completely different ecosystems and ethnic cultures (Gurung, Thakali, and Tibetan-Buddhists). The circuit is slightly less crowded in the upper reaches and features richer biological diversity, though crossing Thorong La Pass (5,416m) is slightly higher than Everest Base Camp itself."
      },
      {
        q: "Is the Annapurna Circuit suitable for first-time Himalayan trekkers?",
        a: "Yes! Fit beginners with good cardiovascular stamina, positive determination, and proper preparation routinely complete the Annapurna Circuit successfully. No technical mountaineering skills, ropes, or crampons are required. Our carefully planned 14-day itinerary includes a mandatory 2-night acclimatization pause in Manang (3,540m) and manageable daily mileage to guarantee safe altitude adaptation."
      }
    ]
  },
  {
    catId: "permits",
    title: "Permits and Logistics",
    items: [
      {
        q: "What permits are required for the Annapurna Circuit Trek?",
        a: "Two official permits are mandatory: the Annapurna Conservation Area Project (ACAP) Entry Permit and the Trekkers' Information Management System (TIMS) Card. When you book with Igloo Himalaya Treks, we arrange, process, and pay for both permits in advance — saving you time and paperwork in Kathmandu."
      },
      {
        q: "What documents do I need to provide for permits?",
        a: "To process your ACAP and TIMS permits, we require a clear scanned copy or digital photo of your passport information page (valid for at least 6 months) and two digital passport-sized portrait photographs. These can be sent via email or WhatsApp upon booking."
      },
      {
        q: "Are there checkpoints along the Annapurna trail?",
        a: "Yes. Official tourist police and ACAP checkpoints are situated at Besisahar, Dharapani, Chame, Manang, Muktinath, and Birethanti. Your licensed trekking guide carries your official permits and handles all registration and logging stamps at every checkpoint on your behalf."
      },
      {
        q: "Is a guide mandatory for the Annapurna Circuit Trek?",
        a: "Yes. Under the Nepal Tourism Board (NTB) safety regulations effective from April 2023, all foreign trekkers in Nepal's national parks and conservation areas must be accompanied by a government-licensed trekking guide. This regulation ensures enhanced trekker safety, swift emergency response, and support for local mountain livelihoods."
      },
      {
        q: "How does luggage transport work with porters?",
        a: "We provide dedicated local mountain porters (1 porter for every 2 trekkers). Your porter carries your main waterproof duffel bag (up to 10 kg / 22 lbs per trekker, adhering strictly to International Porter Protection Group fair-load standards). You walk carrying only a light daypack (5–7 kg) containing your water bottle, rain shell, camera, sunscreen, and valuables."
      }
    ]
  },
  {
    catId: "accommodation",
    title: "Accommodation and Food",
    items: [
      {
        q: "What is teahouse accommodation like on the Annapurna Circuit?",
        a: "Teahouses are family-owned mountain lodges offering twin-sharing bedrooms with wooden twin beds, foam mattresses, clean bedsheets, and heavy blankets. Lower village lodges (Dharapani, Chame, Upper Pisang) frequently feature attached en-suite bathrooms and solar hot showers. At higher elevations like Yak Kharka and Thorong Phedi, lodges are more rustic with shared facilities. We provide -20°C four-season down sleeping bags so you remain warm and comfortable every night."
      },
      {
        q: "What food is available on the Annapurna Circuit trail?",
        a: "The circuit offers exceptional food diversity! Staples include traditional Nepali Dal Bhat (steamed rice, spiced lentil soup, seasonal vegetable curry, greens, and pickle — with free refills), Tibetan Momos, Thukpa noodle soup, Sherpa stew, fried noodles, macaroni, pizzas, hashbrowns, porridge, muesli, pancakes, and eggs. You can also enjoy fresh apple pies and cinnamon rolls in Manang and Marpha baked from local orchard harvests."
      },
      {
        q: "Are vegetarian, vegan, and gluten-free diets accommodated?",
        a: "Absolutely! The Annapurna Circuit is a haven for plant-based eaters. Most local dishes are naturally vegetarian or vegan, centered around lentils, fresh greens, potatoes, beans, and grains. Teahouses can easily prepare gluten-free meals such as rice dishes, boiled potatoes, corn bread, and egg scrambles."
      },
      {
        q: "How do hot showers, phone charging, and Wi-Fi work?",
        a: "Lower teahouses provide solar or gas-heated showers (either free or for a modest fee of NPR 300–500 / $2–$4). Battery and power-bank charging is available in lodge dining rooms via solar arrays or hydroelectric micro-grids for NPR 200–400 per device. Wi-Fi is available at most lodges up to Manang via local voucher cards or AirJaldi networks ($2–$4/day), though connections can become intermittent during storms."
      },
      {
        q: "How do I get safe drinking water on the trek?",
        a: "To eliminate plastic waste in the fragile Annapurna Conservation Area, we strongly advise against single-use plastic bottles. ACAP operates UV-treated Safe Drinking Water Stations in villages where you can refill water bottles for NPR 50–100 per liter. Alternatively, you can purchase boiled water at lodges or use reusable water bottles with purification tablets (Aquatabs) or a SteriPEN."
      }
    ]
  },
  {
    catId: "health",
    title: "Health and Safety",
    items: [
      {
        q: "How do we prevent Acute Mountain Sickness (AMS) on Thorong La?",
        a: "Our itinerary is medically structured for gradual acclimatization. We ascend steadily along the Marsyangdi River and spend two consecutive nights in Manang (3,540m) taking active day hikes up to 4,000m before sleeping low. We monitor your blood oxygen saturation (SpO2) and heart rate twice daily using pulse oximeters, ensure you drink 3 to 4 liters of clean water daily, and hike at a calm, rhythmic pace. Diamox (Acetazolamide) can also be used under guide consultation to aid acclimatization."
      },
      {
        q: "What happens if someone gets sick or cannot cross Thorong La?",
        a: "Safety always comes first. If a trekker shows signs of severe altitude sickness, pulmonary edema (HAPE), or cerebral edema (HACE), our lead guide immediately initiates descent to a lower elevation. In an acute emergency, our 24/7 Kathmandu operations team dispatches an emergency rescue helicopter to evacuate the trekker to a hospital in Pokhara or Kathmandu. Trekkers who prefer not to cross the pass can also descend safely with an assistant guide."
      },
      {
        q: "Is travel and evacuation insurance mandatory?",
        a: "Yes. All trekkers must have comprehensive travel insurance that explicitly covers high-altitude trekking and emergency helicopter evacuation up to 5,500 meters. Standard travel policies often cap coverage at 3,000 meters, so verify that your policy includes mountaineering/high-altitude search and rescue (providers like World Nomads, Ripcord, Global Rescue, or Allianz)."
      },
      {
        q: "Are the trails safe from landslides and road traffic?",
        a: "Yes. We trek along the official Natural Annapurna Trekking Trails (NATT) network, which keeps trekkers on historical pedestrian footpaths on the opposite side of the river from the motor track wherever possible. Our guides constantly monitor seasonal weather reports and trail updates to ensure complete safety."
      },
      {
        q: "What medical training do your trekking guides have?",
        a: "All our senior trekking guides are certified in Wilderness First Aid, Mountain Rescue, and High Altitude Medicine by authorized Nepali mountaineering bodies. They carry a comprehensive expedition medical kit including altitude medicine, oral rehydration salts, pain relief, bandages, and emergency oxygen equipment."
      }
    ]
  },
  {
    catId: "payments",
    title: "Payments & Extra Costs",
    items: [
      {
        q: "How much extra cash should I budget per day on the trek?",
        a: "We recommend budgeting approximately NPR 3,500 to 4,500 (approx. USD 25 to 35) per person per day. This personal pocket money covers hot showers, device charging, Wi-Fi access cards, specialty coffees, soft drinks or beer, bottled water, bakery treats in Manang, and tips for your mountain crew."
      },
      {
        q: "Are there ATMs along the Annapurna Circuit?",
        a: "There are bank ATMs in Besisahar and Jomsom, and an ATM in Manang. However, mountain ATMs are notoriously unreliable due to frequent network and power outages, or running out of cash during peak season. You must withdraw all required Nepalese Rupee cash in Kathmandu or Pokhara before starting the trek."
      },
      {
        q: "What is your payment and deposit policy?",
        a: "To confirm your reservation, we require a 20% advance deposit paid via secure online credit card (Visa, MasterCard, Amex) or bank wire transfer. The remaining 80% balance is settled upon arrival in Kathmandu during your pre-trek briefing via cash (USD, EUR, GBP, NPR) or card."
      },
      {
        q: "What is the customary tipping amount for guides and porters?",
        a: "Tipping is customary in Nepal to reward excellent service. As a general guideline, we recommend budgeting 10% to 15% of your total trip cost pooled together for your trekking crew. This typically equates to USD 12–15 per day for the lead guide and USD 8–10 per day for each porter, presented on the final evening of the trek."
      }
    ]
  },
  {
    catId: "cultural",
    title: "Cultural Insights",
    items: [
      {
        q: "What cultural etiquette should I follow in monasteries and temples?",
        a: "When visiting Tibetan Buddhist monasteries (such as Braga Gompa) or Hindu temples (such as Muktinath), always remove your shoes before entering, walk clockwise (to the left) around Mani walls, chortens, and shrines, and never point your feet directly at Buddha statues or religious figures. Ask for permission before taking photographs inside prayer halls, and consider leaving a small donation (NPR 50–100) in the monastery donation box."
      },
      {
        q: "What is the religious significance of Muktinath?",
        a: "Muktinath is one of the most sacred pilgrimage sites in the world, revered by both Hindus and Buddhists. Hindus consider it a place of liberation (Moksha) where Lord Vishnu is worshiped in the form of Saligram stones found in the Kali Gandaki River. Buddhists revere it as Chumig Gyatsa (Hundred Springs) associated with Guru Rinpoche (Padmasambhava) and home to an eternal natural gas flame that burns continuously over water."
      },
      {
        q: "What ethnic groups will I encounter on the circuit?",
        a: "In the lower Marsyangdi valley (Besisahar to Chame), you will encounter the Gurung and Magar communities known for their distinctive farming terraces and Gurkha heritage. Above Pisang in Manang, you meet the Manangi people who follow Tibetan Buddhism. After crossing Thorong La into Mustang and the Kali Gandaki, you will experience the rich hospitality and trade culture of the Thakali people."
      },
      {
        q: "Can I buy authentic local handicrafts along the route?",
        a: "Yes! Manang and Muktinath are fantastic places to purchase authentic Tibetan handicrafts, including hand-woven yak wool shawls, traditional carpets, silver jewelry, turquoise amulets, and prayer wheels. In Marpha, you can purchase locally produced dried apples, organic apple cider, and famous Marpha apple brandy."
      }
    ]
  }
];

function renderFaqsHtml() {
  const sidebarButtons = faqCategories.map((cat, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    let iconSvg = '';
    if (cat.catId === 'general') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
    } else if (cat.catId === 'permits') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`;
    } else if (cat.catId === 'accommodation') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
    } else if (cat.catId === 'health') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`;
    } else if (cat.catId === 'payments') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`;
    } else if (cat.catId === 'cultural') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
    }

    return `                  <button type="button" class="faq-category-btn ${activeClass}" data-category="${cat.catId}">
                    <span class="faq-cat-icon">
                      ${iconSvg}
                    </span>
                    ${cat.title}
                  </button>`;
  }).join('\n');

  const categoriesContent = faqCategories.map((cat, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    const itemsHtml = cat.items.map(item => {
      return `                  <div class="faq-item">
                    <div class="faq-item-question">
                      <span>${item.q}</span>
                      <span class="faq-toggle-circle">∨</span>
                    </div>
                    <div class="faq-item-answer">
                      ${item.a}
                    </div>
                  </div>`;
    }).join('\n\n');

    return `                <!-- Category ${idx + 1}: ${cat.title} -->
                <div class="faq-category-content ${activeClass}" id="faq-cat-${cat.catId}">
${itemsHtml}
                </div>`;
  }).join('\n\n');

  return `<section id="section-faqs" class="trek-detail-section">
            <h2 class="faq-section-accent-title">
              <span class="faq-accent-bar"></span>
              Frequently Asked Questions for Annapurna Circuit Trek
            </h2>

            <div class="faq-layout-container">
              <!-- Left Sidebar Category Navigation -->
              <div class="faq-sidebar-card">
                <div class="faq-category-nav">
${sidebarButtons}
                </div>
              </div>

              <!-- Right FAQ Content Panel -->
              <div class="faq-main-panel">
                <!-- Header Bar -->
                <div class="faq-panel-header">
                  <h3 class="faq-active-category-title" id="faq-current-category-title">General Information</h3>
                  <button type="button" class="faq-expand-all-btn" id="faq-expand-all-btn">Expand All</button>
                </div>

${categoriesContent}
              </div>
            </div>
          </section>`;
}

// 3. Build Altitude Profile HTML
const altitudeProfileHtml = `<section id="section-altitude-profile" class="trek-detail-section">
            <div class="details-title-wrapper" style="margin-bottom: 24px;">
              <h2 class="details-main-title">Altitude Profile of Annapurna Circuit Trek</h2>
              <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
            </div>
            <div style="background: white; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--color-neutral-100); box-shadow: var(--shadow-sm); margin-bottom: 30px;">
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 20px;">
                Interactive elevation chart showing daily gain, active acclimatization stops in Manang (3,540m), and the pass crossing at Thorong La (5,416m). Switch units below to convert between meters (m) and feet (ft).
              </p>
              <div id="altitude-chart-wrapper" data-trek-key="annapurna_circuit"></div>
            </div>
          </section>`;

// 4. Build Weather HTML
const weatherHtml = `<section id="section-weather" class="trek-detail-section">
            <div class="details-title-wrapper" style="margin-bottom: 24px;">
              <h2 class="details-main-title">Weather on the Annapurna Circuit Trek</h2>
              <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-neutral-700); line-height: 1.6; margin-bottom: 24px;">
              Find out the temperature ranges you will experience along the Annapurna trail from Dharapani to Thorong La and Muktinath. Toggle between daily variation and monthly averages, and switch units below to convert between Celsius (°C) and Fahrenheit (°F).
            </p>
            <div style="background: white; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--color-neutral-100); box-shadow: var(--shadow-sm); margin-bottom: 30px;">
              <div id="weather-chart-wrapper" data-trek-key="annapurna_circuit"></div>
            </div>
          </section>`;

// 5. Build Map HTML
const mapHtml = `<section id="section-map" class="trek-detail-section">
            <div class="details-title-wrapper" style="margin-bottom: 24px;">
              <h2 class="details-main-title">Annapurna Circuit Trek Route Map</h2>
              <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-neutral-700); line-height: 1.6; margin-bottom: 20px;">
              Our detailed topographic trail map illustrates the complete circuit route around the Annapurna massif, highlighting all key checkpoints, overnight mountain villages, acclimatization waypoints, and the high crossing of Thorong La Pass (5,416m).
            </p>
            <div style="position: relative; background: white; border-radius: var(--radius-md); border: 1px solid var(--color-neutral-100); box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 35px;">
              <img src="../../images/a-detail-map-of-annapurna-circuit-trek-showing-checkpoints-with-landmarks-along-with-a-alt.webp" alt="Detailed Topographic Map of Annapurna Circuit Trek Showing Checkpoints and Landmarks" style="display: block; width: 100%; height: auto; border-radius: var(--radius-md);">
              <a href="../../images/a-detail-map-of-annapurna-circuit-trek-showing-checkpoints-with-landmarks-along-with-a-alt.webp" target="_blank" style="position: absolute; bottom: 20px; right: 20px; display: inline-flex; align-items: center; background: #ffffff; color: var(--color-neutral-900); font-weight: 700; font-size: 0.85rem; padding: 10px 18px; border-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.08); text-decoration: none; transition: transform 0.2s ease;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
                View Full Map
              </a>
            </div>
          </section>`;

// 6. Build You Might Also Like HTML
const ymlHtml = `  <!-- You Might Also Like — Full-Width Recommendation Section -->
  <section class="you-might-like-section">
    <div class="container">
      <div class="yml-header">
        <span class="yml-pill-tag">MORE ADVENTURES</span>
        <div class="yml-title-row">
          <span class="yml-accent-bar"></span>
          <h2 class="yml-title">You might also like</h2>
        </div>
        <p class="yml-subtitle">Handpicked trips in the Annapurna and neighboring Himalayan regions — a natural next adventure.</p>
      </div>

      <div class="yml-cards-grid">
        <!-- Card 1: Annapurna Base Camp Trek -->
        <a href="../../trek/annapurna-base-camp-trek/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/annapurna-base-camp-trek.webp" alt="Annapurna Base Camp Trek" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge">Annapurna Region</span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Annapurna Base Camp Trek (11 Days)</h3>
            <div class="yml-card-rating">
              <span class="yml-stars"><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
              <span class="yml-rating-text">5 · 48 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>799</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>

        <!-- Card 2: Mardi Himal Trek -->
        <a href="../../trek/mardi-himal-trek/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/mardi-himal-trek.webp" alt="Mardi Himal Trek" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge">Annapurna Region</span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Mardi Himal Trek (8 Days)</h3>
            <div class="yml-card-rating">
              <span class="yml-stars"><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
              <span class="yml-rating-text">5 · 32 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>599</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>

        <!-- Card 3: Manaslu Circuit Trek -->
        <a href="../../trek/manaslu-circuit-trek-12-days/" class="yml-card">
          <div class="yml-card-image">
            <img src="../../images/manaslu-circuit-trek.webp" alt="Manaslu Circuit Trek" loading="lazy">
            <div class="yml-card-overlay"></div>
            <span class="yml-card-badge">Manaslu Region</span>
          </div>
          <div class="yml-card-body">
            <h3 class="yml-card-title">Manaslu Circuit Trek (12 Days)</h3>
            <div class="yml-card-rating">
              <span class="yml-stars"><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#1A96C8" stroke="none" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
              <span class="yml-rating-text">5 · 26 reviews</span>
            </div>
            <div class="yml-card-footer">
              <div class="yml-card-price">
                <span class="yml-price-label">Starting from</span>
                <span class="yml-price-value">USD <strong>999</strong></span>
              </div>
              <span class="yml-view-trip-btn">View Trip →</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>`;

// Main Execution
let html = fs.readFileSync(path.join(__dirname, 'act_temp.html'), 'utf8');

// 1. Update wrapper key
html = html.replace(/data-trek-details-wrapper\s+data-trek-key=["']ebc["']/gi, 'data-trek-details-wrapper data-trek-key="annapurna_circuit"');

// 2. Replace section-includes
html = html.replace(/<section id=["']section-includes["'][\s\S]*?<\/section>/i, includesHtml);

// 3. Fix inquiry buttons data-trek-title in dates section
html = html.replace(/data-trek-title=["']Everest Base Camp Private Trek["']/gi, 'data-trek-title="Annapurna Circuit Trek"');

// 4. Replace section-details
const detailsHtml = renderDetailsHtml();
html = html.replace(/<section id=["']section-details["'][\s\S]*?<\/section>/i, detailsHtml);

// 5. Replace section-altitude-profile
html = html.replace(/<section id=["']section-altitude-profile["'][\s\S]*?<\/section>/i, altitudeProfileHtml);

// 6. Replace section-weather
html = html.replace(/<section id=["']section-weather["'][\s\S]*?<\/section>/i, weatherHtml);

// 7. Replace section-map
html = html.replace(/<section id=["']section-map["'][\s\S]*?<\/section>/i, mapHtml);

// 8. Replace section-faqs
const faqsHtml = renderFaqsHtml();
html = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, faqsHtml);

// 9. Replace you-might-like-section
html = html.replace(/<section class=["']you-might-like-section["'][\s\S]*?<\/section>/i, ymlHtml);

// Validate tag balance
const balance = checkTagBalance(html);
console.log('Balance check - Errors:', balance.errors.length, 'Unclosed:', balance.unclosed.length);

if (balance.errors.length > 0 || balance.unclosed.length > 0) {
  console.error('TAG BALANCE ERROR:', balance);
} else {
  console.log('TAG BALANCE 100% PERFECT! Writing act_temp.html...');
  fs.writeFileSync(path.join(__dirname, 'act_temp.html'), html, 'utf8');
}
