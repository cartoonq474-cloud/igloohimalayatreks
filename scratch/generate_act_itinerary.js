const fs = require('fs');
const path = require('path');

// 14 Days Authentic Annapurna Circuit Itinerary Data
const itineraryDays = [
  {
    dayNum: 1,
    title: "Arrival in Kathmandu & Transfer to Hotel",
    subtitle: "Kathmandu – 1,400 m / 4,593 ft",
    altM: 1400,
    metrics: [
      { icon: 'clock', text: "Airport transfer: 25 to 35 minutes" },
      { icon: 'home', text: "Accommodation: 3-Star Boutique Hotel in Thamel, Kathmandu" },
      { icon: 'triangle', text: "Activity: Pre-trek briefing, gear inspection & Welcome Dinner" }
    ],
    meta: {
      meals: "Welcome Dinner with Cultural Performance (D)",
      overnight: "Kathmandu"
    },
    desc: [
      "Welcome to Nepal! Upon landing at Tribhuvan International Airport (TIA) in Kathmandu, our airport representative will warmly welcome you outside the arrivals terminal with a traditional marigold garland (Khada) and transfer you in a private air-conditioned vehicle to your hotel in Thamel.",
      "After resting and settling in, we gather in the late afternoon at our office for a comprehensive pre-trek expedition briefing. Your lead guide will examine your gear, review high-altitude pass-crossing protocols for Thorong La, verify your ACAP and TIMS permits, and answer any questions. In the evening, we host an authentic Nepali welcome dinner featuring organic Dal Bhat, momos, and traditional folk music."
    ],
    photos: [
      { src: "../../images/classic-annapurna-circuit-trek.webp", alt: "Kathmandu Valley and Annapurna Expedition Welcome" },
      { src: "../../images/annapurna-circuit-luxury-trek-05.webp", alt: "Heritage architecture of Kathmandu" },
      { src: "../../images/annapurna-circuit-luxury-trek-06.webp", alt: "Thamel vibrant tourist streets and gear shops" },
      { src: "../../images/annapurna-circuit-luxury-trek-07.webp", alt: "Traditional Nepali welcome dinner and culture" }
    ]
  },
  {
    dayNum: 2,
    title: "Drive from Kathmandu to Besisahar & Dharapani",
    subtitle: "Dharapani – 1,860 m / 6,102 ft – 7 to 8 hours drive",
    altM: 1860,
    metrics: [
      { icon: 'clock', text: "Driving time: 7 to 8 hours by private 4WD jeep / tourist vehicle" },
      { icon: 'distance', text: "Distance: ~220 km (137 miles)" },
      { icon: 'home', text: "Accommodation: Local Mountain Teahouse in Dharapani" },
      { icon: 'triangle', text: "Activity: Scenic highway drive along Trishuli & Marsyangdi Rivers" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Dharapani"
    },
    desc: [
      "Our Annapurna Circuit journey begins early with a scenic drive west from Kathmandu along the winding Prithvi Highway. The route follows the rushing glacial waters of the Trishuli River through lush valleys, terraced hillsides, and lively riverside towns before turning north at Dumre toward Besisahar, the historical district headquarters of Lamjung.",
      "From Besisahar, we transfer to a sturdy 4WD vehicle and ascend along the dramatic Marsyangdi River gorge. Passing through subtropical forests, towering cascading waterfalls, and the picturesque cliffside village of Tal (the gateway to Manang district), we cross into the Buddhist cultural zone and arrive at Dharapani (1,860m) for our first night in the mountains."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek.webp", alt: "Marsyangdi river valley leading toward Dharapani" },
      { src: "../../images/classic-annapurna-circuit-trek-02.webp", alt: "Cascading waterfalls along the Annapurna trail" },
      { src: "../../images/annapurna-circuit-trek-02.webp", alt: "Traditional suspension bridge crossing Marsyangdi River" },
      { src: "../../images/annapurna-circuit-luxury-trek-08.webp", alt: "Charming stone teahouse lodges in Dharapani" }
    ]
  },
  {
    dayNum: 3,
    title: "Trek from Dharapani to Chame",
    subtitle: "Chame – 2,670 m / 8,760 ft – 5 to 6 hours",
    altM: 2670,
    metrics: [
      { icon: 'clock', text: "Hiking time: 5 to 6 hours" },
      { icon: 'distance', text: "Distance: ~15.5 km (9.6 miles) | Ascent: +810 m" },
      { icon: 'home', text: "Accommodation: Mountain Teahouse in Chame" },
      { icon: 'triangle', text: "Activity: Forest trekking along Marsyangdi River & hot springs" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Chame"
    },
    desc: [
      "We begin our first true trekking day following the Marsyangdi River uphill through fragrant pine, oak, and rhododendron forests. Crossing several sturdy wooden and steel suspension bridges, we pass the traditional Gurung settlement of Bagarchhap, where Tibetan-style flat-roofed stone houses and colorful Buddhist prayer flags signal our entry into the upper Himalaya.",
      "Continuing through Danakyu and the peaceful village of Timang (2,750m), we are rewarded with our first dramatic glimpses of Mt. Manaslu (8,163m) and Peak 29 towering on the eastern horizon. The trail winds gently through pine-scented glades and apple orchards to Chame (2,670m), the bustling administrative center of Manang district, where natural riverside hot springs offer a welcoming afternoon soak."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la.webp", alt: "Dense pine forests and rocky trails toward Chame" },
      { src: "../../images/annapurna-circuit-luxury-trek-09.webp", alt: "First views of snow peaks above the tree line" },
      { src: "../../images/classic-annapurna-circuit-trek-03.webp", alt: "Prayer wheels and mani walls in Manang district" },
      { src: "../../images/annapurna-circuit-luxury-trek-10.webp", alt: "Chame village and Marsyangdi river valley" }
    ]
  },
  {
    dayNum: 4,
    title: "Trek from Chame to Upper Pisang via Paungda Danda",
    subtitle: "Upper Pisang – 3,300 m / 10,826 ft – 5 to 6 hours",
    altM: 3300,
    metrics: [
      { icon: 'clock', text: "Hiking time: 5 to 6 hours" },
      { icon: 'distance', text: "Distance: ~14.2 km (8.8 miles) | Ascent: +630 m" },
      { icon: 'home', text: "Accommodation: Mountain Teahouse in Upper Pisang" },
      { icon: 'triangle', text: "Activity: Viewing Paungda Danda rock face & entering arid high valley" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Upper Pisang"
    },
    desc: [
      "Leaving Chame, the valley narrows dramatically into a deep alpine pine canyon. Crossing to the northern bank of the Marsyangdi River, the trail ascends through dense spruce forests until the jaw-dropping monolithic rock wall of Paungda Danda suddenly looms overhead. This immense curved slab of seamless slate rises 1,500 meters vertically out of the riverbed, revered by local Tibetan Buddhists as the 'Swarga Dwar' or Gateway to Heaven.",
      "As we climb beyond Paungda Danda, the dense forests rapidly give way to arid alpine scrub as we penetrate the Himalayan rain shadow. We cross a high suspension bridge and ascend to historic Upper Pisang (3,300m). Perched high on the northern hillside, Upper Pisang features an ancient Tibetan gompa offering breathtaking panoramic vistas of Annapurna II (7,937m) and Pisang Peak."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la-02.webp", alt: "The colossal curved face of Paungda Danda rock" },
      { src: "../../images/annapurna-circuit-luxury-trek-04.webp", alt: "Upper Pisang village with Annapurna II backdrop" },
      { src: "../../images/classic-annapurna-circuit-trek-04.webp", alt: "Ancient Tibetan Buddhist monastery at Upper Pisang" },
      { src: "../../images/annapurna-circuit-luxury-trek-03.webp", alt: "Prayer flags dancing against high Himalayan peaks" }
    ]
  },
  {
    dayNum: 5,
    title: "Trek from Upper Pisang to Manang via Ghyaru & Ngawal",
    subtitle: "Manang – 3,540 m / 11,614 ft – 6 to 7 hours",
    altM: 3540,
    metrics: [
      { icon: 'clock', text: "Hiking time: 6 to 7 hours (High Panoramic Route)" },
      { icon: 'distance', text: "Distance: ~18.5 km (11.5 miles) | Ascent: +580 m, Descent: -340 m" },
      { icon: 'home', text: "Accommodation: Mountain Teahouse in Manang" },
      { icon: 'triangle', text: "Activity: Hiking the scenic upper ridge trail with 180° Annapurna views" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Manang"
    },
    desc: [
      "Today is widely considered the single most scenic trekking day on the entire Annapurna Circuit. Taking the recommended high northern trail, we climb a series of steady switchbacks to the medieval cliffside village of Ghyaru (3,670m). The view from Ghyaru's stone chorten is simply mind-blowing: an uninterrupted 180-degree panorama of Annapurna II, Annapurna IV, Annapurna III, and Gangapurna standing majestically across the canyon.",
      "From Ghyaru, we traverse a high undulating balcony trail to the stone village of Ngawal (3,660m), stopping for hot lemon tea at a scenic viewpoint cafe. We then descend gradually back toward the wide, braided Marsyangdi river valley, passing through the historic village of Braga with its 500-year-old cliff-clinging monastery before arriving in Manang (3,540m), the bustling cultural capital of the region."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek.webp", alt: "Panoramic view of Annapurna II and III from Ghyaru ridge" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027.webp", alt: "High scenic trail between Ghyaru and Ngawal" },
      { src: "../../images/annapurna-circuit-luxury-trek-07.webp", alt: "Ancient Braga Gompa perched on cliff face" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-02.webp", alt: "Stone houses and welcoming lodges of Manang village" }
    ]
  },
  {
    dayNum: 6,
    title: "Acclimatization & Exploration Day in Manang",
    subtitle: "Manang – 3,540 m / 11,614 ft (Day Hikes to 4,000m)",
    altM: 3540,
    metrics: [
      { icon: 'clock', text: "Hiking time: 3 to 4 hours active acclimatization hike" },
      { icon: 'distance', text: "Distance: ~6 km (3.7 miles) | Climb high, sleep low" },
      { icon: 'home', text: "Accommodation: Mountain Teahouse in Manang" },
      { icon: 'triangle', text: "Activity: Hike to Gangapurna Lake or Milarepa Cave & HRA clinic visit" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Manang"
    },
    desc: [
      "To ensure a safe and successful crossing of Thorong La Pass, a full acclimatization day in Manang is essential. Following the golden mountaineering rule of 'climb high, sleep low', your guide will lead an active morning acclimatization hike across the river to the vivid turquoise waters of Gangapurna Lake and the Chongkor viewpoint (3,800m), offering up-close views of the Gangapurna Icefall.",
      "Alternatively, fit trekkers can hike up to Praken Gompa (3,950m) or the hermit cave of Buddhist poet-saint Milarepa. In the afternoon, explore Manang's traditional cobblestone alleys, visit local bakeries for fresh Himalayan apple pastry, and attend the daily 3:00 PM altitude sickness and safety lecture at the Himalayan Rescue Association (HRA) volunteer medical clinic."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la.webp", alt: "Turquoise waters of Gangapurna Glacial Lake beneath snowy peaks" },
      { src: "../../images/annapurna-circuit-luxury-trek-11.webp", alt: "Acclimatization view over Manang valley and Annapurna range" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-03.webp", alt: "Mani stones and prayer flags in upper Manang" },
      { src: "../../images/annapurna-circuit-luxury-trek.webp", alt: "Relaxing at local teahouse bakeries in Manang" }
    ]
  },
  {
    dayNum: 7,
    title: "Trek from Manang to Yak Kharka",
    subtitle: "Yak Kharka – 4,050 m / 13,287 ft – 4 to 5 hours",
    altM: 4050,
    metrics: [
      { icon: 'clock', text: "Hiking time: 4 to 5 hours" },
      { icon: 'distance', text: "Distance: ~10.4 km (6.5 miles) | Ascent: +510 m" },
      { icon: 'home', text: "Accommodation: Alpine Teahouse Lodge in Yak Kharka" },
      { icon: 'triangle', text: "Activity: Ascending into high alpine tundra pasturelands" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Yak Kharka"
    },
    desc: [
      "Refreshed and acclimatized, we bid farewell to the Marsyangdi River and branch north into the Jarsang Khola valley. The landscape now transforms into open high-altitude alpine tundra, where trees completely disappear, replaced by dwarf juniper bushes, wild gentian, and dry scrub grass.",
      "The trail climbs steadily past the quaint hamlet of Gunsang (3,950m), where we stop for warm tea and admire sweeping views of Annapurna III and Gangapurna. Continuing across open pasturelands where herds of yaks and wild Himalayan blue sheep (Bharal) graze on steep scree hillsides, we cross a small wooden footbridge to reach the peaceful high settlement of Yak Kharka (4,050m)."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-02.webp", alt: "High alpine tundra and yak pastures of Yak Kharka" },
      { src: "../../images/classic-annapurna-circuit-trek-02.webp", alt: "Grazing yaks and blue sheep beneath snow-dusted ridges" },
      { src: "../../images/annapurna-circuit-luxury-trek-06.webp", alt: "Alpine teahouses of Yak Kharka at 4,050m" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-04.webp", alt: "Expansive high mountain valley leading to Thorong La" }
    ]
  },
  {
    dayNum: 8,
    title: "Trek from Yak Kharka to Thorong Phedi or High Camp",
    subtitle: "Thorong Phedi – 4,450 m to 4,850 m / 14,599 ft to 15,912 ft – 3 to 4 hours",
    altM: 4450,
    metrics: [
      { icon: 'clock', text: "Hiking time: 3 to 4 hours" },
      { icon: 'distance', text: "Distance: ~7.2 km (4.5 miles) | Ascent: +400 m to +800 m" },
      { icon: 'home', text: "Accommodation: High-Altitude Lodge in Thorong Phedi or High Camp" },
      { icon: 'triangle', text: "Activity: Approaching base of the pass & early evening summit prep" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Thorong Phedi / High Camp"
    },
    desc: [
      "Today is a deliberately short, measured ascent designed to preserve your stamina and ensure your body continues adjusting to the thinning air. We hike past Ledar, gently gaining elevation along the eastern flank of the valley before descending briefly to cross the headwaters of the Jarsang Khola on an impressive suspension bridge.",
      "We then negotiate a well-graded scree path traversing a dramatic slope that leads directly to the foot of the pass at Thorong Phedi (4,450m). Depending on weather, fitness, and guide assessment, groups may continue a steep 1-hour zigzag climb to Thorong High Camp (4,850m). We enjoy an early carbohydrate-rich dinner, hydrate extensively with garlic soup and herbal tea, and prepare our warm summit layers for a pre-dawn wake-up."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la-02.webp", alt: "Trail cutting through steep high-altitude scree toward Thorong Phedi" },
      { src: "../../images/annapurna-circuit-luxury-trek-09.webp", alt: "Atmospheric lodges at the foot of Thorong La Pass" },
      { src: "../../images/classic-annapurna-circuit-trek.webp", alt: "High Camp ridge at 4,850m beneath starry skies" },
      { src: "../../images/annapurna-circuit-trek.webp", alt: "Early morning prep and headlamp climbing toward the pass" }
    ]
  },
  {
    dayNum: 9,
    title: "Cross Thorong La Pass (5,416m) & Trek to Muktinath",
    subtitle: "Muktinath – 3,800 m / 12,467 ft via Thorong La Pass (5,416 m) – 8 to 9 hours",
    altM: 5416,
    metrics: [
      { icon: 'clock', text: "Hiking time: 8 to 9 hours (The Ultimate Pass Day!)" },
      { icon: 'distance', text: "Distance: ~16.5 km (10.2 miles) | Ascent: +966 m, Descent: -1,616 m" },
      { icon: 'home', text: "Accommodation: Teahouse Lodge in sacred Muktinath" },
      { icon: 'triangle', text: "Activity: Conquering Thorong La Pass (5,416m) & crossing into Mustang" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Muktinath"
    },
    desc: [
      "The pinnacle of our expedition! We rise at 04:00 AM under a canopy of blazing Himalayan stars, equip our headlamps and warm layers, and begin the steady ascent up the switchbacks of Thorong La. Pacing is slow, rhythmical, and deliberate ('Bistari, Bistari'). As dawn breaks over the snowline, golden morning sunlight illuminates the jagged peaks of Khatung Kang and Thorong Peak.",
      "After 4 to 5 hours of continuous climbing, we reach the crest of Thorong La Pass (5,416m / 17,769ft), marked by a celebrated cairn draped in thousands of colorful prayer flags. The celebratory relief and emotional triumph are unforgettable. We enjoy hot tea at the seasonal summit teahouse, marvel at 360-degree panoramas of the Annapurna and Dhaulagiri ranges, and begin a long, scenic 3.5-hour descent into the arid Tibetan landscapes of Mustang to reach sacred Muktinath (3,800m)."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la.webp", alt: "Trekkers celebrating at Thorong La Pass signpost (5,416m)" },
      { src: "../../images/annapurna-circuit-luxury-trek-08.webp", alt: "Sea of colorful prayer flags fluttering on Thorong La" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027.webp", alt: "Spectacular panoramic descent into the Mustang valley" },
      { src: "../../images/classic-annapurna-circuit-trek-02.webp", alt: "Arriving at sacred Muktinath temple village" }
    ]
  },
  {
    dayNum: 10,
    title: "Trek from Muktinath to Kagbeni & Jomsom",
    subtitle: "Jomsom – 2,720 m / 8,923 ft – 5 to 6 hours",
    altM: 2720,
    metrics: [
      { icon: 'clock', text: "Hiking time: 5 to 6 hours" },
      { icon: 'distance', text: "Distance: ~18 km (11.2 miles) | Descent: -1,080 m" },
      { icon: 'home', text: "Accommodation: Comfortable Hotel / Lodge in Jomsom" },
      { icon: 'triangle', text: "Activity: Visiting Muktinath Temple, ancient Kagbeni & Kali Gandaki canyon" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Jomsom"
    },
    desc: [
      "In the morning, we visit the sacred Muktinath temple complex, revered by Hindus as Muktikshetra (place of liberation) and by Buddhists as Chumig Gyatsa (Hundred Waters). Trekkers walk past the 108 stone brass water spouts shaped like boar heads and view the miraculous eternal natural gas flame flickering inside Jwala Mai monastery.",
      "We then begin our descent into the arid Mustang plateau, taking the picturesque trail through Jharkot and down into medieval Kagbeni (2,800m). Guarded by a striking red monastery and mud-brick alleyways, Kagbeni is the historic gateway to the forbidden kingdom of Upper Mustang. Following the wide, windy riverbed of the Kali Gandaki River — keeping an eye out for prehistoric Shaligram fossils — we arrive in Jomsom (2,720m), the bustling airport hub of Mustang."
    ],
    photos: [
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-02.webp", alt: "Sacred 108 water spouts at Muktinath Temple complex" },
      { src: "../../images/annapurna-circuit-luxury-trek-05.webp", alt: "Medieval Tibetan mud-brick architecture of Kagbeni" },
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-03.webp", alt: "Windy, fossil-strewn Kali Gandaki river canyon" },
      { src: "../../images/annapurna-circuit-luxury-trek-10.webp", alt: "Jomsom town beneath the imposing face of Mt. Nilgiri" }
    ]
  },
  {
    dayNum: 11,
    title: "Drive from Jomsom to Tatopani Hot Springs via Kali Gandaki Gorge",
    subtitle: "Tatopani – 1,200 m / 3,937 ft – 4 to 5 hours drive",
    altM: 1200,
    metrics: [
      { icon: 'clock', text: "Driving time: 4 to 5 hours scenic 4WD ride" },
      { icon: 'distance', text: "Distance: ~48 km (30 miles) | World's Deepest Gorge" },
      { icon: 'home', text: "Accommodation: Riverside Lodge in Tatopani" },
      { icon: 'triangle', text: "Activity: Marpha apple orchards, deepest gorge on earth & natural hot spring soak" }
    ],
    meta: {
      meals: "Breakfast, Lunch, Dinner (B, L, D)",
      overnight: "Tatopani"
    },
    desc: [
      "Leaving Jomsom, we take a short drive to Marpha, a postcard-perfect Thakali village with immaculate whitewashed stone buildings, narrow paved lanes, and lush apple orchards. We explore a local distillery, sample fresh apple cider and dried fruit, and visit the serene hilltop Buddhist monastery.",
      "Continuing south by private jeep, our route plunges into the heart of the Kali Gandaki Gorge — famously recognized as the deepest river canyon on earth, dropping nearly 6,000 meters between the sheer summit walls of Dhaulagiri (8,167m) to the west and Annapurna I (8,091m) to the east. Passing the thundering Rupse Chhahara waterfall, we arrive in subtropical Tatopani (1,200m). Here, we spend a blissful afternoon soaking in the riverside natural thermal hot spring pools to soothe muscles after hundreds of kilometers on foot."
    ],
    photos: [
      { src: "../../images/classic-annapurna-circuit-trek-package-itinerary-2027-04.webp", alt: "Picturesque whitewashed cobblestone streets of Marpha" },
      { src: "../../images/annapurna-circuit-luxury-trek-04.webp", alt: "The colossal depths of the Kali Gandaki river gorge" },
      { src: "../../images/classic-annapurna-circuit-trek-03.webp", alt: "Cascading Rupse Chhahara waterfall along the gorge" },
      { src: "../../images/annapurna-circuit-trek-2027-the-honest-guide-to-thorong-la-02.webp", alt: "Natural geothermal hot springs at Tatopani" }
    ]
  },
  {
    dayNum: 12,
    title: "Drive from Tatopani to Pokhara & Leisure at Phewa Lake",
    subtitle: "Pokhara – 820 m / 2,690 ft – 4 to 5 hours drive",
    altM: 820,
    metrics: [
      { icon: 'clock', text: "Driving time: 4 to 5 hours private tourist vehicle" },
      { icon: 'distance', text: "Distance: ~105 km (65 miles)" },
      { icon: 'home', text: "Accommodation: Deluxe Lakeside Hotel in Pokhara" },
      { icon: 'triangle', text: "Activity: Transfer to Pokhara, lakeside dining & Phewa Lake boat cruise" }
    ],
    meta: {
      meals: "Breakfast, Lunch (B, L)",
      overnight: "Pokhara"
    },
    desc: [
      "After a leisurely breakfast by the orange and banana trees of Tatopani, we board our private transport and drive south along the Kali Gandaki and Modi Khola valleys through Beni and Nayapul. The road winds through vibrant lowland farmland, subtropical bamboo groves, and bustling bazaar towns, gradually bringing us to Nepal's beloved tourism capital: Pokhara (820m).",
      "Arriving at our lakeside hotel, enjoy a hot luxury shower, fresh laundry, and the modern amenities of Pokhara. Spend a relaxed afternoon strolling the scenic pedestrian promenade of Lakeside, enjoy an optional peaceful wooden boat ride across Phewa Lake to Tal Barahi temple, and gaze at the reflection of Machapuchare in the calm lake waters while dining at world-class international cafes."
    ],
    photos: [
      { src: "../../images/annapurna-circuit-luxury-trek-06.webp", alt: "Scenic drive through lush foothills toward Pokhara" },
      { src: "../../images/annapurna-circuit-trek.webp", alt: "Tranquil Phewa Lake with Machapuchare (Fishtail) reflection" },
      { src: "../../images/classic-annapurna-circuit-trek.webp", alt: "Colorful wooden boats moored on Phewa Lake" },
      { src: "../../images/annapurna-circuit-luxury-trek-02.webp", alt: "Relaxing lakeside cafe atmosphere in Pokhara" }
    ]
  },
  {
    dayNum: 13,
    title: "Drive or Fly from Pokhara to Kathmandu & Farewell Dinner",
    subtitle: "Kathmandu – 1,400 m / 4,593 ft",
    altM: 1400,
    metrics: [
      { icon: 'clock', text: "Travel: 25-minute scenic flight OR 6 to 7 hours tourist drive" },
      { icon: 'distance', text: "Distance: ~200 km (124 miles)" },
      { icon: 'home', text: "Accommodation: 3-Star Boutique Hotel in Kathmandu" },
      { icon: 'triangle', text: "Activity: Return to capital, souvenir shopping & Farewell Dinner" }
    ],
    meta: {
      meals: "Breakfast and Farewell Dinner (B, D)",
      overnight: "Kathmandu"
    },
    desc: [
      "Following breakfast in Pokhara with the morning sun illuminating the Annapurnas, we journey back to Kathmandu. Travelers can opt for a scenic 25-minute domestic flight over the Annapurna, Manaslu, and Ganesh Himal ranges, or enjoy a picturesque overland tourist vehicle drive along the Prithvi Highway tracing the Marsyangdi and Trishuli river valleys.",
      "Upon arriving in Kathmandu, transfer back to your hotel in Thamel. The afternoon is completely free for exploring heritage courtyards, visiting the sacred stupas of Swayambhunath or Boudhanath, and picking up pashminas, thangkas, and handcrafted souvenirs. In the evening, Igloo Himalaya Treks hosts a joyous farewell dinner to celebrate your successful crossing of Thorong La Pass and completion of the Annapurna Circuit!"
    ],
    photos: [
      { src: "../../images/annapurna-circuit-luxury-trek-05.webp", alt: "Himalayan flight over central Nepal ridges" },
      { src: "../../images/annapurna-circuit-luxury-trek-07.webp", alt: "Historic heritage courtyards of Kathmandu Valley" },
      { src: "../../images/classic-annapurna-circuit-trek-04.webp", alt: "Handcrafted souvenirs, prayer wheels and singing bowls" },
      { src: "../../images/annapurna-circuit-luxury-trek-08.webp", alt: "Celebratory farewell dinner in Kathmandu" }
    ]
  },
  {
    dayNum: 14,
    title: "Final Departure from Kathmandu",
    subtitle: "Kathmandu – 1,400 m / 4,593 ft",
    altM: 1400,
    metrics: [
      { icon: 'clock', text: "Transfer: 25 to 35 minutes to TIA Airport" },
      { icon: 'home', text: "Accommodation: End of Tour Services" },
      { icon: 'triangle', text: "Activity: Private airport drop-off for international flight" }
    ],
    meta: {
      meals: "Breakfast (B)",
      overnight: "Departure"
    },
    desc: [
      "Your unforgettable Annapurna Circuit adventure comes to a conclusion today. Savor a final relaxed breakfast at your hotel, exchange photos and heartfelt goodbyes with your guides and fellow trekkers, and finish any last-minute packing.",
      "Approximately 3 hours prior to your scheduled international flight departure, our private chauffeur will arrive at your hotel lobby to transfer you smoothly to Tribhuvan International Airport (TIA). As you fly above the majestic Himalayan peaks, you take home extraordinary memories, lifelong friendships, and the supreme accomplishment of having conquered the Annapurna Circuit!"
    ],
    photos: [
      { src: "../../images/annapurna-circuit-trek.webp", alt: "Final farewell to the majestic Himalayan mountains" },
      { src: "../../images/classic-annapurna-circuit-trek.webp", alt: "Tribhuvan International Airport departure" },
      { src: "../../images/annapurna-circuit-luxury-trek-09.webp", alt: "Himalayan peaks from the flight window" },
      { src: "../../images/classic-annapurna-circuit-trek-02.webp", alt: "Unforgettable memories of the Annapurna Circuit" }
    ]
  }
];

function renderDaysHtml() {
  let cardsHtml = '';
  itineraryDays.forEach(day => {
    const isActive = day.dayNum === 1 ? ' active' : '';

    let metricsHtml = '';
    day.metrics.forEach(m => {
      let iconSvg = '';
      if (m.icon === 'clock') {
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      } else if (m.icon === 'home') {
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
      } else if (m.icon === 'distance') {
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>`;
      } else {
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 22 22 22"></polygon></svg>`;
      }
      metricsHtml += `                      <div class="itinerary-metric-item">
                        ${iconSvg}
                        <span>${m.text}</span>
                      </div>\n`;
    });

    let descHtml = day.desc.map(p => `                      <p>${p}</p>`).join('\n');

    let photosHtml = day.photos.map(p => `                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="${p.src}" alt="${p.alt}">
                      </div>`).join('\n');

    cardsHtml += `              <!-- Day ${day.dayNum < 10 ? '0' + day.dayNum : day.dayNum} -->
              <div class="itinerary-card${isActive}">
                <div class="itinerary-header">
                  <div class="itinerary-header-left">
                    <h4 class="itinerary-day-title-new">
                      <span class="day-label">Day ${day.dayNum}:</span> ${day.title}
                    </h4>
                    <p class="itinerary-day-subtitle-new">
                      ${day.subtitle.replace(/(\d+[\d,]*\s*m)/g, `<span data-altitude-m="${day.altM}">$1</span>`)}
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
${metricsHtml}                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        </svg>
                        <span>Meals: ${day.meta.meals}</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                          <circle cx="12" cy="9" r="2.5"></circle>
                        </svg>
                        <span>Overnight: ${day.meta.overnight}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
${descHtml}
                    </div>

                    <div class="itinerary-photos-grid">
${photosHtml}
                    </div>
                  </div>
                </div>
              </div>\n\n`;
  });

  return `<section id="section-itinerary" class="trek-detail-section">
            <h2 class="trek-section-title">Annapurna Circuit Trek Itinerary: Day by Day Details</h2>
            <p style="font-size: 1.05rem; color: var(--color-neutral-600); line-height: 1.6; margin-bottom: 24px; max-width: 800px;">
              Our authentic 14-day Annapurna Circuit itinerary is expertly paced for gradual altitude acclimatization, taking you safely across Thorong La Pass (5,416m) and down into the sacred valleys of Mustang. Review the full day-by-day route, hiking distances, elevations, and overnight lodges below:
            </p>
            
            <div class="itinerary-timeline">
${cardsHtml}            </div>
          </section>`;
}

const fullItineraryHtml = renderDaysHtml();
console.log('Generated full 14-day itinerary, length:', fullItineraryHtml.length);

let currentHtml = fs.readFileSync(path.join(__dirname, 'act_temp.html'), 'utf8');
currentHtml = currentHtml.replace(/<section id=["']section-itinerary["'][\s\S]*?<\/section>/i, fullItineraryHtml);

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

const balance = checkTagBalance(currentHtml);
if (balance.errors.length > 0 || balance.unclosed.length > 0) {
  console.error('TAG BALANCE ERROR:', balance);
} else {
  console.log('TAG BALANCE IS 100% PERFECT!');
  fs.writeFileSync(path.join(__dirname, 'act_temp.html'), currentHtml, 'utf8');
}
