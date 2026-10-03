const fs = require('fs');

let html = fs.readFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', 'utf8');

// 1. SECTION 1: at-a-glance
html = html.replace(
  `          <!-- SECTION 1: AT A GLANCE -->
          <section id="at-a-glance" class="article-section">
            <h2>Everest Base Camp vs. Annapurna Circuit at a Glance</h2>
            <p>`,
  `          <!-- SECTION 1: AT A GLANCE -->
          <section id="at-a-glance" class="article-section">
            <h2>Everest Base Camp vs. Annapurna Circuit at a Glance</h2>
            <figure class="article-figure">
              <img src="../../images/everest-base-camp-vs-annapurna-base-camp-trek-which-one-should-you-choose-igloo-himalaya-t.webp" alt="Everest Base Camp vs Annapurna Circuit overview comparison in Nepal" class="article-figure-img" width="1024" height="576" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                The stark high-altitude amphitheater of Everest contrasted with the sweeping ecological diversity of the Annapurna massif.
              </figcaption>
            </figure>
            <p>`
);

// 2. SECTION 2: everest-base-camp-experience (move figure directly under h2)
const sec2Old = `          <!-- SECTION 2: EVEREST BASE CAMP -->
          <section id="everest-base-camp-experience" class="article-section">
            <h2>Everest Base Camp: What the Trek Is Really Like</h2>
            <p>
              Trekking to Everest Base Camp is an expedition into the spiritual heartland of world mountaineering. Your adventure begins the moment your small Twin Otter aircraft navigates the cloud-shrouded mountain passes of eastern Nepal and touches down on the dramatically angled runway of Tenzing-Hillary Airport in Lukla (2,846 m). For the next two weeks, there are no roads, no vehicles, and no bicycles—every bag of rice, every piece of trekking equipment, and every person moves entirely by foot, yak, or helicopter.
            </p>
            <p>
              From Lukla, the trail winds alongside the roaring, turquoise waters of the Dudh Koshi River, crossing soaring steel suspension bridges festooned with vibrant Buddhist prayer flags. You ascend through lush pine forests into <strong>Namche Bazaar (3,440 m)</strong>, the bustling amphitheater town that serves as the commercial hub of the Sherpa homeland. Here, trekkers spend their first mandatory acclimatization day, taking high-altitude training hikes to the Everest View Hotel to catch their first breathtaking glimpse of Mt. Everest, Nuptse, and the iconic pyramid of Ama Dablam.
            </p>

            <figure class="article-figure">
              <img src="../../images/everest-base-camp-khumbu-trek.webp" alt="Trekkers walking through the Khumbu region toward Everest Base Camp" class="article-figure-img" width="1200" height="768" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Trekkers and porters navigating the dramatic high trail of the Khumbu beneath towering Himalayan peaks.
              </figcaption>
            </figure>`;

const sec2New = `          <!-- SECTION 2: EVEREST BASE CAMP -->
          <section id="everest-base-camp-experience" class="article-section">
            <h2>Everest Base Camp: What the Trek Is Really Like</h2>
            <figure class="article-figure">
              <img src="../../images/everest-base-camp-khumbu-trek.webp" alt="Trekkers walking through the Khumbu region toward Everest Base Camp" class="article-figure-img" width="1200" height="900" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Trekkers and porters navigating the dramatic high trail of the Khumbu beneath towering Himalayan peaks.
              </figcaption>
            </figure>
            <p>
              Trekking to Everest Base Camp is an expedition into the spiritual heartland of world mountaineering. Your adventure begins the moment your small Twin Otter aircraft navigates the cloud-shrouded mountain passes of eastern Nepal and touches down on the dramatically angled runway of Tenzing-Hillary Airport in Lukla (2,846 m). For the next two weeks, there are no roads, no vehicles, and no bicycles—every bag of rice, every piece of trekking equipment, and every person moves entirely by foot, yak, or helicopter.
            </p>
            <p>
              From Lukla, the trail winds alongside the roaring, turquoise waters of the Dudh Koshi River, crossing soaring steel suspension bridges festooned with vibrant Buddhist prayer flags. You ascend through lush pine forests into <strong>Namche Bazaar (3,440 m)</strong>, the bustling amphitheater town that serves as the commercial hub of the Sherpa homeland. Here, trekkers spend their first mandatory acclimatization day, taking high-altitude training hikes to the Everest View Hotel to catch their first breathtaking glimpse of Mt. Everest, Nuptse, and the iconic pyramid of Ama Dablam.
            </p>`;

html = html.replace(sec2Old, sec2New);

// 3. SECTION 3: annapurna-circuit-experience (move figure directly under h2)
const sec3Old = `          <!-- SECTION 3: ANNAPURNA CIRCUIT -->
          <section id="annapurna-circuit-experience" class="article-section">
            <h2>Annapurna Circuit: What the Trek Is Really Like</h2>
            <p>
              If Everest Base Camp is an intense vertical cathedral, the Annapurna Circuit is an epic widescreen cinema that unfolds over hundreds of kilometers. Recognized globally since Nepal opened its borders to foreigners in 1977, the Circuit circuits the massive Annapurna Himal, home to Annapurna I (8,091 m)—the first 8,000-meter peak ever summited by humankind.
            </p>
            <p>
              The journey begins in the lush lower valleys of the Marsyangdi River. Modern treks typically start around Besisahar, Dharapani, or Chame (1,400 m to 2,670 m). The early days are filled with the roar of thundering waterfalls, lush subtropical vegetation, emerald rice terraces, and dense bamboo groves. As you gain elevation, the jungle gives way to fragrant Himalayan pine, fir, and juniper forests, before clearing into the wide, glaciated amphitheater of the upper Manang Valley.
            </p>

            <figure class="article-figure">
              <img src="../../images/annapurna-circuit-trek-landscape.webp" alt="Mountain landscape along the Annapurna Circuit in Nepal" class="article-figure-img" width="1200" height="572" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                The expansive sweep of the Annapurna massif along the trail between Pisang and Manang.
              </figcaption>
            </figure>`;

const sec3New = `          <!-- SECTION 3: ANNAPURNA CIRCUIT -->
          <section id="annapurna-circuit-experience" class="article-section">
            <h2>Annapurna Circuit: What the Trek Is Really Like</h2>
            <figure class="article-figure">
              <img src="../../images/annapurna-circuit-trek-landscape.webp" alt="Mountain landscape along the Annapurna Circuit in Nepal" class="article-figure-img" width="1200" height="572" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                The expansive sweep of the Annapurna massif along the trail between Pisang and Manang.
              </figcaption>
            </figure>
            <p>
              If Everest Base Camp is an intense vertical cathedral, the Annapurna Circuit is an epic widescreen cinema that unfolds over hundreds of kilometers. Recognized globally since Nepal opened its borders to foreigners in 1977, the Circuit circuits the massive Annapurna Himal, home to Annapurna I (8,091 m)—the first 8,000-meter peak ever summited by humankind.
            </p>
            <p>
              The journey begins in the lush lower valleys of the Marsyangdi River. Modern treks typically start around Besisahar, Dharapani, or Chame (1,400 m to 2,670 m). The early days are filled with the roar of thundering waterfalls, lush subtropical vegetation, emerald rice terraces, and dense bamboo groves. As you gain elevation, the jungle gives way to fragrant Himalayan pine, fir, and juniper forests, before clearing into the wide, glaciated amphitheater of the upper Manang Valley.
            </p>`;

html = html.replace(sec3Old, sec3New);

// 4. SECTION 4: difficulty-and-fitness
html = html.replace(
  `          <!-- SECTION 4: DIFFICULTY -->
          <section id="difficulty-and-fitness" class="article-section">
            <h2>Which Trek Is Harder? Difficulty and Fitness Compared</h2>
            <p>`,
  `          <!-- SECTION 4: DIFFICULTY -->
          <section id="difficulty-and-fitness" class="article-section">
            <h2>Which Trek Is Harder? Difficulty and Fitness Compared</h2>
            <figure class="article-figure">
              <img src="../../images/trekker-posing-with-trekking-poles-on-the-everest-base-camp-trail-with-snow-covered-himala.webp" alt="Trekker with trekking poles tackling high altitude Himalayan trails" class="article-figure-img" width="1446" height="1088" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Trekking in the Himalayas tests aerobic endurance, leg strength, and mental stamina across changing terrain and high altitude.
              </figcaption>
            </figure>
            <p>`
);

// 5. SECTION 5: altitude-and-acclimatization (move figure directly under h2)
const sec5Old = `          <!-- SECTION 5: ALTITUDE AND ACCLIMATIZATION -->
          <section id="altitude-and-acclimatization" class="article-section">
            <h2>Altitude and Acclimatization: What You Need to Know</h2>
            <p>
              High-altitude physiology is the single most critical factor determining success and safety on both Himalayan journeys. Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE) are serious medical conditions that can affect anyone, regardless of age, physical fitness, or prior athletic achievements.
            </p>

            <figure class="article-figure">
              <img src="../../images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.webp" alt="High altitude health and acclimatization in the Himalayas" class="article-figure-img" width="1024" height="680" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Pacing yourself with steady breathing and structured rest stops is the cornerstone of responsible high-altitude trekking.
              </figcaption>
            </figure>`;

const sec5New = `          <!-- SECTION 5: ALTITUDE AND ACCLIMATIZATION -->
          <section id="altitude-and-acclimatization" class="article-section">
            <h2>Altitude and Acclimatization: What You Need to Know</h2>
            <figure class="article-figure">
              <img src="../../images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.webp" alt="High altitude health and acclimatization in the Himalayas" class="article-figure-img" width="1316" height="876" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Pacing yourself with steady breathing and structured rest stops is the cornerstone of responsible high-altitude trekking.
              </figcaption>
            </figure>
            <p>
              High-altitude physiology is the single most critical factor determining success and safety on both Himalayan journeys. Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE) are serious medical conditions that can affect anyone, regardless of age, physical fitness, or prior athletic achievements.
            </p>`;

html = html.replace(sec5Old, sec5New);

// 6. SECTION 6: scenery-and-landscape
html = html.replace(
  `          <!-- SECTION 6: SCENERY COMPARISON -->
          <section id="scenery-and-landscape" class="article-section">
            <h2>Scenery: Everest's Dramatic High Mountains vs. Annapurna's Changing Landscapes</h2>
            <p>`,
  `          <!-- SECTION 6: SCENERY COMPARISON -->
          <section id="scenery-and-landscape" class="article-section">
            <h2>Scenery: Everest's Dramatic High Mountains vs. Annapurna's Changing Landscapes</h2>
            <figure class="article-figure">
              <img src="../../images/annapurna-circuit-luxury-trek-13-days-in-nepal.webp" alt="Dramatic Himalayan scenery of the Annapurna Circuit and Everest valleys" class="article-figure-img" width="1920" height="1177" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                From monolithic vertical ice walls in the Khumbu to dynamic river canyons and arid rain-shadow plateaus in Annapurna.
              </figcaption>
            </figure>
            <p>`
);

// 7. SECTION 7: culture-and-local-experience (move figure directly under h2)
const sec7Old = `          <!-- SECTION 7: CULTURE -->
          <section id="culture-and-local-experience" class="article-section">
            <h2>Culture and Local Experience: Sherpa Traditions vs. Multi-Ethnic Tapestry</h2>
            <p>
              A Himalayan trek is far more than a wilderness hike; it is an intimate cultural encounter with mountain communities who have lived in harmony with these formidable peaks for centuries.
            </p>

            <figure class="article-figure">
              <img src="../../images/everest-sherpa-village-trekking.webp" alt="Traditional mountain village in the Everest region with snow capped peaks" class="article-figure-img" width="1200" height="903" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                High stone settlements of the Khumbu retain their distinctive Tibetan-Buddhist architectural character and spiritual tranquility.
              </figcaption>
            </figure>`;

const sec7New = `          <!-- SECTION 7: CULTURE -->
          <section id="culture-and-local-experience" class="article-section">
            <h2>Culture and Local Experience: Sherpa Traditions vs. Multi-Ethnic Tapestry</h2>
            <figure class="article-figure">
              <img src="../../images/everest-sherpa-village-trekking.webp" alt="Traditional mountain village in the Everest region with snow capped peaks" class="article-figure-img" width="1200" height="904" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                High stone settlements of the Khumbu retain their distinctive Tibetan-Buddhist architectural character and spiritual tranquility.
              </figcaption>
            </figure>
            <p>
              A Himalayan trek is far more than a wilderness hike; it is an intimate cultural encounter with mountain communities who have lived in harmony with these formidable peaks for centuries.
            </p>`;

html = html.replace(sec7Old, sec7New);

// 8. SECTION 8: trek-duration-and-itinerary
html = html.replace(
  `          <!-- SECTION 8: DURATION -->
          <section id="trek-duration-and-itinerary" class="article-section">
            <h2>Which Trek Takes More Time? Route Durations and Timelines</h2>
            <p>`,
  `          <!-- SECTION 8: DURATION -->
          <section id="trek-duration-and-itinerary" class="article-section">
            <h2>Which Trek Takes More Time? Route Durations and Timelines</h2>
            <figure class="article-figure">
              <img src="../../images/everest-base-camp-trek-itinerary-2027.webp" alt="Trek itinerary map and route timeline in the Nepal Himalayas" class="article-figure-img" width="1280" height="683" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Carefully paced daily stages and built-in acclimatization rest days are critical to finishing both trek itineraries safely.
              </figcaption>
            </figure>
            <p>`
);

// 9. SECTION 9: cost-and-budget-breakdown
html = html.replace(
  `          <!-- SECTION 9: COST -->
          <section id="cost-and-budget-breakdown" class="article-section">
            <h2>Everest Base Camp vs. Annapurna Circuit: Cost and Budget Breakdown</h2>
            <p>`,
  `          <!-- SECTION 9: COST -->
          <section id="cost-and-budget-breakdown" class="article-section">
            <h2>Everest Base Camp vs. Annapurna Circuit: Cost and Budget Breakdown</h2>
            <figure class="article-figure">
              <img src="../../images/how-to-get-to-everest-base-camp-permits-gear-and-daily-budget.webp" alt="Trekker budgeting gear and logistical expenses for Nepal trekking" class="article-figure-img" width="1900" height="1343" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Understanding logistical costs—including flights, park permits, daily teahouse expenses, and guide services.
              </figcaption>
            </figure>
            <p>`
);

// 10. SECTION 10: teahouses-food-and-accommodation (place high-res dining hall image directly under h2, keep dal bhat in section)
const sec10Old = `          <!-- SECTION 10: ACCOMMODATION AND FOOD -->
          <section id="teahouses-food-and-accommodation" class="article-section">
            <h2>Teahouses, Food, and Accommodation: Life on the Trail</h2>
            <p>
              Both treks are traditional <em>teahouse treks</em>, meaning you sleep in family-owned mountain lodges every night and eat hearty cooked meals in their communal dining rooms. You do not need to carry tents or heavy cooking gear.
            </p>

            <figure class="article-figure">
              <img src="../../images/dal-bhat-nepals-iconic-traditional-dish.webp" alt="Traditional Nepali Dal Bhat meal served at Himalayan teahouses" class="article-figure-img" width="1024" height="683" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                "Dal Bhat Power 24 Hour": Lentil soup, steamed rice, vegetable curry, and spicy pickles provide endless trekking energy.
              </figcaption>
            </figure>`;

const sec10New = `          <!-- SECTION 10: ACCOMMODATION AND FOOD -->
          <section id="teahouses-food-and-accommodation" class="article-section">
            <h2>Teahouses, Food, and Accommodation: Life on the Trail</h2>
            <figure class="article-figure">
              <img src="../../images/everest-base-campp-trekkers-in-hotel-having-their-food.webp" alt="Trekkers enjoying a hot meal inside a Himalayan teahouse dining hall" class="article-figure-img" width="1920" height="1081" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Himalayan teahouse dining halls provide warm, lively communal spaces where trekkers refuel and recharge by the central stove.
              </figcaption>
            </figure>
            <p>
              Both treks are traditional <em>teahouse treks</em>, meaning you sleep in family-owned mountain lodges every night and eat hearty cooked meals in their communal dining rooms. You do not need to carry tents or heavy cooking gear.
            </p>

            <figure class="article-figure">
              <img src="../../images/dal-bhat-nepals-iconic-traditional-dish.webp" alt="Traditional Nepali Dal Bhat meal served at Himalayan teahouses" class="article-figure-img" width="332" height="226" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                "Dal Bhat Power 24 Hour": Lentil soup, steamed rice, vegetable curry, and spicy pickles provide endless trekking energy.
              </figcaption>
            </figure>`;

html = html.replace(sec10Old, sec10New);

// 11. SECTION 11: crowds-and-trail-experience
html = html.replace(
  `          <!-- SECTION 11: CROWDS -->
          <section id="crowds-and-trail-experience" class="article-section">
            <h2>Which Trek Is Less Crowded? Trail Traffic and Atmosphere</h2>
            <p>`,
  `          <!-- SECTION 11: CROWDS -->
          <section id="crowds-and-trail-experience" class="article-section">
            <h2>Which Trek Is Less Crowded? Trail Traffic and Atmosphere</h2>
            <figure class="article-figure">
              <img src="../../images/suspension-bridges-along-the-everest-base-camp-trail.webp" alt="Trekkers crossing iconic suspension bridge in the Everest region" class="article-figure-img" width="1920" height="1280" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Iconic suspension bridges and trail corridors see concentrated foot traffic during peak autumn and spring trekking months.
              </figcaption>
            </figure>
            <p>`
);

// 12. SECTION 12: best-time-to-trek
html = html.replace(
  `          <!-- SECTION 12: BEST TIME TO TREK -->
          <section id="best-time-to-trek" class="article-section">
            <h2>Best Time to Trek: Season by Season</h2>
            <p>`,
  `          <!-- SECTION 12: BEST TIME TO TREK -->
          <section id="best-time-to-trek" class="article-section">
            <h2>Best Time to Trek: Season by Season</h2>
            <figure class="article-figure">
              <img src="../../images/best-season-to-trek-in-nepal-explore-best-time-for-each-season.webp" alt="Best seasons to trek in Nepal showing clear mountain skies" class="article-figure-img" width="1600" height="1066" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Autumn (Oct–Nov) and spring (Mar–May) deliver stable weather, crisp mountain visibility, and dry trail conditions across Nepal.
              </figcaption>
            </figure>
            <p>`
);

// 13. SECTION 13: permits-and-logistics
html = html.replace(
  `          <!-- SECTION 13: PERMITS AND LOGISTICS -->
          <section id="permits-and-logistics" class="article-section">
            <h2>Permits and Logistics: Everything You Need to Organize</h2>
            <p>`,
  `          <!-- SECTION 13: PERMITS AND LOGISTICS -->
          <section id="permits-and-logistics" class="article-section">
            <h2>Permits and Logistics: Everything You Need to Organize</h2>
            <figure class="article-figure">
              <img src="../../images/trekker-showing-permits-at-a-nepal-trekking-checkpoint-with-a-park-official.webp" alt="Trekker presenting national park permits at a Nepal trail checkpoint" class="article-figure-img" width="1386" height="923" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Official checkpoints along both the Khumbu and Annapurna routes verify regional conservation permits and licensed guide credentials.
              </figcaption>
            </figure>
            <p>`
);

// 14. SECTION 14: which-trek-is-better-for-beginners
html = html.replace(
  `          <!-- SECTION 14: BEGINNERS -->
          <section id="which-trek-is-better-for-beginners" class="article-section">
            <h2>Which Trek Is Better for Beginners?</h2>
            <p>`,
  `          <!-- SECTION 14: BEGINNERS -->
          <section id="which-trek-is-better-for-beginners" class="article-section">
            <h2>Which Trek Is Better for Beginners?</h2>
            <figure class="article-figure">
              <img src="../../images/annapurna-base-camp-trek-for-beginners.webp" alt="Beginner hikers enjoying scenic trail in the Annapurna region" class="article-figure-img" width="1120" height="748" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                The Annapurna region's gradual lower-altitude ascent provides first-time Himalayan hikers with optimal acclimatization.
              </figcaption>
            </figure>
            <p>`
);

// 15. SECTION 15: which-trek-should-you-choose
html = html.replace(
  `          <!-- SECTION 15: DECISION SECTION -->
          <section id="which-trek-should-you-choose" class="article-section">
            <h2>Which Trek Should You Choose? Editorial Decision Matrix</h2>
            <p>`,
  `          <!-- SECTION 15: DECISION SECTION -->
          <section id="which-trek-should-you-choose" class="article-section">
            <h2>Which Trek Should You Choose? Editorial Decision Matrix</h2>
            <figure class="article-figure">
              <img src="../../images/trekkers-at-everest-base-camp-sign-in-nepal.webp" alt="Trekkers celebrating at Everest Base Camp landmark stone in Nepal" class="article-figure-img" width="1306" height="979" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Reaching your chosen Himalayan milestone—whether Everest Base Camp or Thorong La Pass—is an unforgettable lifetime achievement.
              </figcaption>
            </figure>
            <p>`
);

// 16. SECTION 16: frequently-asked-questions
html = html.replace(
  `          <!-- SECTION 16: FAQ -->
          <section id="frequently-asked-questions" class="article-section">
            <h2>Frequently Asked Questions</h2>
            <p>`,
  `          <!-- SECTION 16: FAQ -->
          <section id="frequently-asked-questions" class="article-section">
            <h2>Frequently Asked Questions</h2>
            <figure class="article-figure">
              <img src="../../images/everest-base-camp-trek-faqs-guide.webp" alt="Everest and Annapurna trekking frequently asked questions guide" class="article-figure-img" width="1920" height="1080" loading="lazy" decoding="async">
              <figcaption class="article-figure-caption">
                Direct answers to essential planning questions on fitness, high altitude, seasonal weather, and trail logistics.
              </figcaption>
            </figure>
            <p>`
);

fs.writeFileSync('blog/everest-base-camp-vs-annapurna-circuit/index.html', html, 'utf8');
console.log('Successfully updated blog/everest-base-camp-vs-annapurna-circuit/index.html');
