// Master Authentic Data for Manaslu & Tsum Packages

const manasluPackages = [
  // 1. Manaslu Circuit Trek (14 Days)
  {
    slug: 'manaslu-circuit-trek',
    title: 'Manaslu Circuit Trek (14 Days) — The Classic Wilderness Loop — Igloo Himalaya Treks',
    seoTitle: 'Manaslu Circuit Trek (14 Days)',
    metaDesc: 'Trek the classic 14-day Manaslu Circuit around Mt. Manaslu (8,163m). Cross Larkya La Pass (5,106m), explore ancient Nubri culture, and visit glacial Birendra Lake.',
    canonical: 'https://igloohimalayatreks.com/trek/manaslu-circuit-trek/',
    duration: '14 days',
    difficulty: 'Challenging (High Mountain Pass)',
    maxAlt: '5,106 m (16,752 ft)',
    maxAltNum: 5106,
    price: '1,290',
    activity: 'Restricted High-Altitude Wilderness Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private 4WD Land Cruiser / Scorpio',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May (Best Seasons)',
    trekStarts: 'Machha Khola',
    trekEnds: 'Dharapani / Kathmandu',
    region: 'Manaslu (Restricted Area)',
    heroBadge: 'Manaslu Region • Mount Manaslu (8,163m) & Larkya La Pass',
    leadText: 'The 14-day Manaslu Circuit Trek is Nepal’s premier wild and culturally preserved trans-Himalayan journey. Circumnavigating Mount Manaslu (8,163m)—the eighth highest mountain on Earth—this restricted route leads through dramatic Budhi Gandaki river gorges into the ancient Tibetan Buddhist realms of Nubri, culminating in an exhilarating alpine crossing of Larkya La Pass (5,106m).',
    highlights: [
      'Circumambulate Mount Manaslu (8,163m), the 8th highest mountain in the world',
      'Cross the majestic Larkya La Pass (5,106m / 16,752ft) with 360° panoramas of Himlung and Annapurna',
      'Explore ancient Tibetan Buddhist Nubri culture, Ribung Gompa, and Pungyen Monastery',
      'Rest and acclimatization day in Samagaon with hike to turquoise Birendra Tal glacial lake',
      'Hike through dramatic river canyons across soaring steel suspension bridges',
      'Remote restricted area preserving pristine trails, local traditions, and peaceful teahouses'
    ],
    gallery: [
      'manaslu-circuit-trek-12-days.webp',
      'manaslu-circuit-trek-12-days-02.webp',
      'a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.webp',
      'manaslu-circuit-trek-02.webp',
      'manaslu-circuit-trek-12-days-budget-friendly.webp'
    ],
    itinerary: [
      { day: 1, title: 'Scenic 4WD Drive Kathmandu to Machha Khola (900m)', dest: 'Machha Khola', altM: 900, duration: '7-9 hrs drive', dist: '160 km off-road', meals: 'B, L, D', desc: 'Private 4WD drive along the Trishuli River highway and up the rugged Budhi Gandaki valley to Machha Khola.' },
      { day: 2, title: 'Trek Machha Khola to Jagat (1,340m)', dest: 'Jagat', altM: 1340, duration: '6-7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Follow the winding river gorge past Tatopani hot springs and Dobhan. Enter the restricted Manaslu Conservation Area at Jagat.' },
      { day: 3, title: 'Trek Jagat to Deng (1,860m)', dest: 'Deng', altM: 1860, duration: '6-7 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Ascend to Salleri with views of Sringi Himal. Cross to Philim and continue through bamboo forests to Deng village.' },
      { day: 4, title: 'Trek Deng to Namrung (2,630m)', dest: 'Namrung', altM: 2630, duration: '6-7 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Enter upper Nubri where Tibetan culture flourishes. Climb through pine, oak, and rhododendron woods past mani walls to Namrung.' },
      { day: 5, title: 'Trek Namrung to Lho (3,180m)', dest: 'Lho', altM: 3180, duration: '4-5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past Lihi and Sho villages. Arrive in Lho beneath Ribung Gompa with jaw-dropping close-up views of Mount Manaslu.' },
      { day: 6, title: 'Trek Lho to Samagaon (3,530m)', dest: 'Samagaon', altM: 3530, duration: '3-4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Walk through larch forests past Shyala into the expansive alpine valley of Samagaon, cultural heart of Nubri.' },
      { day: 7, title: 'Acclimatization & Cultural Exploration in Samagaon', dest: 'Samagaon', altM: 3530, duration: '4-5 hrs hike', dist: '6 km', meals: 'B, L, D', desc: 'Essential acclimatization day. Hike to turquoise glacial Birendra Tal (3,450m) and towards Manaslu Base Camp (4,400m).' },
      { day: 8, title: 'Trek Samagaon to Samdo (3,875m)', dest: 'Samdo', altM: 3875, duration: '3-4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Follow the widening valley past juniper pastures to Samdo, a traditional Tibetan yak-herding village near the border with Tibet.' },
      { day: 9, title: 'Acclimatization Hike / Rest Day in Samdo', dest: 'Samdo', altM: 3875, duration: '3-4 hrs', dist: '5 km', meals: 'B, L, D', desc: 'Hike towards the ancient Tibetan trading pass of Lajyang La for panoramic views and altitude adaptation.' },
      { day: 10, title: 'Trek Samdo to Dharamsala / Larkya Phedi (4,460m)', dest: 'Dharamsala', altM: 4460, duration: '4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Cross the Budhi Gandaki headwaters and climb across glacial moraines to Dharamsala. Early dinner and rest.' },
      { day: 11, title: 'Cross Larkya La Pass (5,106m) & Descend to Bimthang (3,590m)', dest: 'Bimthang', altM: 5106, duration: '8-10 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Headlamp start at 4:00 AM. Ascend to Larkya La Pass (5,106m / 16,752ft) for panoramas of Himlung, Cheo, and Annapurna II. Descend to Bimthang.' },
      { day: 12, title: 'Trek Bimthang to Tilije & Dharapani (1,960m)', dest: 'Dharapani', altM: 1960, duration: '6-7 hrs', dist: '18 km', meals: 'B, L, D', desc: 'Descend through dense rhododendron and pine forests along Dudh Khola to join the Annapurna Circuit road at Dharapani.' },
      { day: 13, title: '4WD Drive Dharapani to Besisahar & Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '8-9 hrs drive', dist: '200 km', meals: 'B, D', desc: 'Scenic mountain drive down to Besisahar and along the Prithvi Highway back to Kathmandu hotel. Farewell dinner.' },
      { day: 14, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to Tribhuvan International Airport for your flight home.' }
    ],
    faqs: [
      { q: 'What permits are required for the Manaslu Circuit Trek?', a: 'Manaslu is a restricted area requiring: 1) Manaslu Restricted Area Permit ($100 USD/week in Autumn, $75 USD in Spring), 2) Manaslu Conservation Area Project (MCAP), 3) Annapurna Conservation Area Project (ACAP), and TIMS. A minimum of two trekkers and a certified guide are legally required.' },
      { q: 'How difficult is Larkya La Pass (5,106m)?', a: 'Larkya La is a non-technical high-altitude trekking pass. The climb involves steady walking on glacial scree and snow. Microspikes, trekking poles, and safe acclimatization at Samagaon and Samdo ensure high success rates.' }
    ]
  },

  // 2. Tsum Valley Trek (14 Days)
  {
    slug: 'tsum-valley-trek',
    title: 'Tsum Valley Trek (14 Days) — The Sacred Hidden Sanctuary — Igloo Himalaya Treks',
    seoTitle: 'Tsum Valley Trek (14 Days)',
    metaDesc: 'Discover the hidden Buddhist valley of Tsum (Beyul Kyimolung). Visit ancient Mu Gompa (3,700m), Rachen Gompa, and Milarepa Cave with authentic homestays.',
    canonical: 'https://igloohimalayatreks.com/trek/tsum-valley-trek/',
    duration: '14 days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '3,700 m (12,139 ft)',
    maxAltNum: 3700,
    price: '1,250',
    activity: 'Sacred Buddhist Pilgrimage & Restricted Trekking',
    accommodation: 'Traditional Monastery Homestays & Teahouses',
    transport: 'Private 4WD Jeep Transfer',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Machha Khola',
    trekEnds: 'Machha Khola / Kathmandu',
    region: 'Manaslu & Tsum Valley',
    heroBadge: 'Manaslu Region • Sacred Hidden Buddhist Shangri-La',
    leadText: 'The 14-day Tsum Valley Trek leads you into "Beyul Kyimolung"—the sacred valley of happiness blessed by Guru Rinpoche (Padmasambhava) in the 8th century. Opened to outsiders only in 2008, Tsum Valley preserves pure Tibetan Buddhist culture, ancient stone chortens, Milarepa’s meditation cave, and historic monasteries like Mu Gompa (3,700m) and Rachen Gompa.',
    highlights: [
      'Enter the sacred hidden valley of Tsum ("Beyul"), protected by ancient Buddhist non-violence vows',
      'Visit historic Mu Gompa (3,700m), the highest and oldest monastery in upper Tsum Valley',
      'Explore Rachen Gompa nunnery, housing over 80 Buddhist nuns beneath sheer granite peaks',
      'Meditate at Piren Phu (Pigeon Cave), where the great Tibetan saint Milarepa meditated in the 11th century',
      'Immerse in unique Tsumba culture, dialect, traditional attire, and stone-slab architecture',
      'Spectacular views of Ganesh Himal (7,422m), Sringi Himal (7,161m), and Baudha Peak',
      'Strict non-slaughter policy ensuring tranquil, peaceful wildlife and spiritual serenity'
    ],
    gallery: [
      'a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.webp',
      'manaslu-circuit-trek-12-days.webp',
      'manaslu-circuit-trek-02.webp',
      'manaslu-circuit-trek-12-days-02.webp',
      'manaslu-circuit-trek-12-days-budget-friendly.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Machha Khola (900m)', dest: 'Machha Khola', altM: 900, duration: '7-9 hrs drive', dist: '160 km off-road', meals: 'B, L, D', desc: 'Overland 4WD drive from Kathmandu to Machha Khola along the Trishuli and Budhi Gandaki valleys.' },
      { day: 2, title: 'Trek Machha Khola to Jagat (1,340m)', dest: 'Jagat', altM: 1340, duration: '6-7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Follow the Budhi Gandaki gorge past Khorlabesi and Tatopani hot springs to the stone checkpoint village of Jagat.' },
      { day: 3, title: 'Trek Jagat to Lokpa (2,240m) — Gateway to Tsum', dest: 'Lokpa', altM: 2240, duration: '6-7 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek through Philim. Branch off the main Manaslu Circuit at Ekle Bhatti, entering the quiet valley to Lokpa.' },
      { day: 4, title: 'Trek Lokpa to Chumling (2,386m) — Lower Tsum', dest: 'Chumling', altM: 2386, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Descend to Lungwa river and climb through virgin pine and rhododendron woods to Chumling, the first village of Tsum.' },
      { day: 5, title: 'Trek Chumling to Chhekampar (3,031m) — Upper Tsum', dest: 'Chhekampar', altM: 3031, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past terraced fields into the wide, flat upper valley of Chhekampar with magnificent views of Ganesh Himal.' },
      { day: 6, title: 'Trek Chhekampar to Nile (3,361m) via Milarepa Cave', dest: 'Nile', altM: 3361, duration: '5-6 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Visit sacred Piren Phu (Milarepa Cave) where footprints of Milarepa are preserved. Continue past Rachen Gompa to Nile.' },
      { day: 7, title: 'Trek Nile to Ancient Mu Gompa (3,700m)', dest: 'Mu Gompa', altM: 3700, duration: '4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Ascend along the Shiar Khola into high alpine tundra to historic Mu Gompa, the highest monastery in Tsum near the Tibetan border.' },
      { day: 8, title: 'Excursion to Dphyu Lake & Trek back to Chhekampar', dest: 'Chhekampar', altM: 3031, duration: '6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Morning mountain vistas. Descend past Rachen Gompa, interacting with local nuns, and return to Chhekampar.' },
      { day: 9, title: 'Trek Chhekampar to Gho & Chumling (2,386m)', dest: 'Chumling', altM: 2386, duration: '5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Retrace your path down through the scenic valley to Chumling.' },
      { day: 10, title: 'Trek Chumling to Lokpa & Philim (1,570m)', dest: 'Philim', altM: 1570, duration: '6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Exit Tsum Valley via Lokpa and rejoin the main trail to the prosperous Gurung settlement of Philim.' },
      { day: 11, title: 'Trek Philim to Khorlabesi (970m)', dest: 'Khorlabesi', altM: 970, duration: '6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Descend through Jagat and Tatopani hot springs to Khorlabesi.' },
      { day: 12, title: 'Trek Khorlabesi to Machha Khola (900m)', dest: 'Machha Khola', altM: 900, duration: '3-4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Short walk back to the roadhead at Machha Khola. Celebratory final evening with your trekking team.' },
      { day: 13, title: 'Drive Machha Khola back to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '7-9 hrs drive', dist: '160 km', meals: 'B, D', desc: 'Private 4WD drive back to Kathmandu hotel. Evening celebration farewell dinner.' },
      { day: 14, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private vehicle transfer to Tribhuvan International Airport for your international flight.' }
    ],
    faqs: [
      { q: 'Why is Tsum Valley called a sacred valley?', a: 'Tsum Valley is a "Shyagya" (non-violence sanctuary) where hunting, animal slaughter, and forest destruction have been forbidden for centuries. It remains a tranquil living Buddhist sanctuary.' }
    ]
  },

  // 3. Manaslu Tsum Valley Trek (18 Days)
  {
    slug: 'manaslu-tsum-valley-trek',
    title: 'Manaslu with Tsum Valley Trek (18 Days) — The Grand Trans-Himalayan Odyssey — Igloo Himalaya Treks',
    seoTitle: 'Manaslu with Tsum Valley Trek (18 Days)',
    metaDesc: 'The ultimate 18-day expedition uniting the sacred spiritual hidden valley of Tsum (Mu Gompa 3,700m) with the full Manaslu Circuit and Larkya La Pass (5,106m).',
    canonical: 'https://igloohimalayatreks.com/trek/manaslu-tsum-valley-trek/',
    duration: '18 days',
    difficulty: 'Strenuous High Altitude Circuit',
    maxAlt: '5,106 m (16,752 ft)',
    maxAltNum: 5106,
    price: '1,650',
    activity: 'Combined Sacred Valley & High Pass Expedition',
    accommodation: 'Mountain Teahouses & Monasteries',
    transport: 'Private 4WD Land Cruiser Support',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Machha Khola',
    trekEnds: 'Dharapani / Kathmandu',
    region: 'Manaslu & Tsum Valley',
    heroBadge: 'Manaslu Region • Sacred Tsum Valley & Full Manaslu Circuit',
    leadText: 'The 18-day Manaslu with Tsum Valley Trek is Central Nepal’s most complete and awe-inspiring Himalayan expedition. Combining the deeply spiritual, untouched Buddhist sanctuary of Tsum Valley with the classic Manaslu Circuit, this grand traverse explores ancient monasteries like Mu Gompa, passes beneath Mount Manaslu (8,163m), and conquers the thrilling 5,106m Larkya La Pass.',
    highlights: [
      'The definitive 18-day combination uniting sacred Tsum Valley and the complete Manaslu Circuit',
      'Cross the formidable Larkya La Pass (5,106m / 16,752ft) with panoramas of Himlung and Annapurna II',
      'Visit historic Mu Gompa (3,700m) and Rachen Gompa nunnery in the hidden valley of Tsum',
      'Explore Milarepa’s 11th-century meditation cave (Piren Phu) in Chhekampar',
      'Acclimatization day in Samagaon with hike to turquoise Birendra Tal glacial lake',
      'Stand face-to-face with the colossal twin summits of Mount Manaslu (8,163m) from Lho',
      'Overland 4WD access eliminating mountain flight cancellations'
    ],
    gallery: [
      'manaslu-circuit-trek-12-days.webp',
      'a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.webp',
      'manaslu-circuit-trek-02.webp',
      'manaslu-circuit-trek-12-days-02.webp',
      'manaslu-circuit-trek-12-days-budget-friendly.webp'
    ],
    itinerary: [
      { day: 1, title: 'Scenic 4WD Drive Kathmandu to Machha Khola (900m)', dest: 'Machha Khola', altM: 900, duration: '7-9 hrs drive', dist: '160 km off-road', meals: 'B, L, D', desc: 'Overland 4WD drive from Kathmandu to Machha Khola along the Budhi Gandaki river.' },
      { day: 2, title: 'Trek Machha Khola to Jagat (1,340m)', dest: 'Jagat', altM: 1340, duration: '6-7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Follow the river gorge past thermal springs at Tatopani to Jagat, entry checkpoint for restricted permits.' },
      { day: 3, title: 'Trek Jagat to Lokpa (2,240m) — Enter Tsum', dest: 'Lokpa', altM: 2240, duration: '6-7 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek through Philim and branch into the tranquil gorge leading to Lokpa, entrance to sacred Tsum.' },
      { day: 4, title: 'Trek Lokpa to Chumling (2,386m)', dest: 'Chumling', altM: 2386, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Cross suspension bridges and climb through pine and rhododendron woods to Chumling.' },
      { day: 5, title: 'Trek Chumling to Chhekampar (3,031m)', dest: 'Chhekampar', altM: 3031, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past terraced fields into the wide valley of Chhekampar facing Ganesh Himal.' },
      { day: 6, title: 'Trek Chhekampar to Nile (3,361m) via Milarepa Cave', dest: 'Nile', altM: 3361, duration: '5-6 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Visit sacred Milarepa Cave and Rachen Gompa nunnery on the way to Nile.' },
      { day: 7, title: 'Trek Nile to Ancient Mu Gompa (3,700m) & Return to Chhekampar', dest: 'Chhekampar', altM: 3031, duration: '7-8 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Climb to the high monastery of Mu Gompa near the Tibetan border and descend back to Chhekampar.' },
      { day: 8, title: 'Trek Chhekampar to Lokpa & Deng (1,860m)', dest: 'Deng', altM: 1860, duration: '7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Exit Tsum Valley, rejoin the main Manaslu Circuit trail, and continue to Deng.' },
      { day: 9, title: 'Trek Deng to Namrung (2,630m)', dest: 'Namrung', altM: 2630, duration: '6-7 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Climb through dense forests into the high Tibetan Buddhist realm of Nubri at Namrung.' },
      { day: 10, title: 'Trek Namrung to Lho (3,180m)', dest: 'Lho', altM: 3180, duration: '4-5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Walk past mani walls to Lho. Enjoy direct panoramas of Mount Manaslu from Ribung Gompa.' },
      { day: 11, title: 'Trek Lho to Samagaon (3,530m)', dest: 'Samagaon', altM: 3530, duration: '3-4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Pass through Shyala into the broad glacial basin of Samagaon beneath Manaslu icefall.' },
      { day: 12, title: 'Acclimatization Day in Samagaon & Birendra Tal (3,450m)', dest: 'Samagaon', altM: 3530, duration: '4-5 hrs hike', dist: '6 km', meals: 'B, L, D', desc: 'Hike to turquoise Birendra Tal and towards Manaslu Base Camp for active altitude conditioning.' },
      { day: 13, title: 'Trek Samagaon to Samdo (3,875m)', dest: 'Samdo', altM: 3875, duration: '3-4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Trek past juniper scrub and yaks to the Tibetan trading settlement of Samdo.' },
      { day: 14, title: 'Trek Samdo to Dharamsala / Larkya Phedi (4,460m)', dest: 'Dharamsala', altM: 4460, duration: '4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Climb across moraines to the high camp at Dharamsala. Early dinner and sleep.' },
      { day: 15, title: 'Cross Larkya La Pass (5,106m) & Descend to Bimthang (3,590m)', dest: 'Bimthang', altM: 5106, duration: '8-10 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Headlamp departure at 4:00 AM. Cross Larkya La (5,106m) with 360° peak views. Descend to Bimthang.' },
      { day: 16, title: 'Trek Bimthang to Tilije & Dharapani (1,960m)', dest: 'Dharapani', altM: 1960, duration: '6-7 hrs', dist: '18 km', meals: 'B, L, D', desc: 'Trek down along Dudh Khola through pine and rhododendron woods to Dharapani.' },
      { day: 17, title: 'Drive Dharapani to Besisahar & Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '8-9 hrs drive', dist: '200 km', meals: 'B, D', desc: 'Private 4WD drive back to Kathmandu hotel. Evening celebration farewell banquet.' },
      { day: 18, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to airport for your onward flight.' }
    ],
    faqs: [
      { q: 'Is the 18-day trek too demanding?', a: 'Because the first 7 days in Tsum Valley provide gradual elevation gain between 2,200m and 3,700m, trekkers arrive at the high stages of Manaslu with exceptional natural acclimatization, making the Larkya La pass crossing smoother.' }
    ]
  }
];

module.exports = {
  manasluPackages
};
