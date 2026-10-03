// Master Authentic Data for Langtang & Helambu Packages (8 packages)

const langtangPackages = [
  // 1. Langtang Valley Trek (8 Days)
  {
    slug: 'langtang-valley-trek',
    title: 'Langtang Valley Trek (8 Days) — Glacier Amphitheater — Igloo Himalaya Treks',
    seoTitle: 'Langtang Valley Trek (8 Days)',
    metaDesc: 'Trek the scenic Langtang Valley to historic Kyanjin Gompa (3,870m) and climb Kyanjin Ri (4,773m). Close overland access from Kathmandu with no flight delays.',
    canonical: 'https://igloohimalayatreks.com/trek/langtang-valley-trek/',
    duration: '8 days',
    difficulty: 'Moderate',
    maxAlt: '4,773 m (15,659 ft)',
    maxAltNum: 4773,
    price: '680',
    activity: 'Scenic Alpine Valley Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private 4WD Jeep / Tourist Bus',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-May & Sep-Nov',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Syabrubesi / Kathmandu',
    region: 'Langtang National Park',
    heroBadge: 'Langtang Region • The Valley of Glaciers & Tibetan Culture',
    leadText: 'The 8-day Langtang Valley Trek is the quintessential introductory Himalayan expedition, located just north of Kathmandu near the Tibetan border. Following the roaring Langtang Khola through bamboo forests and rhododendrons, you emerge into a glacial amphitheater of 7,000m peaks at Kyanjin Gompa (3,870m), where you can summit panoramic Kyanjin Ri (4,773m) and sample artisan Swiss-crafted yak cheese.',
    highlights: [
      'Summit Kyanjin Ri (4,773m) or Tserko Ri (4,984m) for 360° panoramas of Langtang Lirung (7,227m)',
      'Explore historic Kyanjin Gompa monastery and the famous 1955 Swiss yak cheese factory',
      'Walk through rich biodiversity in Langtang National Park: red pandas, Himalayan tahrs, and monals',
      'Overland journey from Kathmandu eliminating domestic mountain flight weather delays',
      'Experience the resilient Tamang and Tibetan cultures and warm family-run teahouses',
      'Scenic hike through mossy bamboo forests, alpine larch groves, and glacial floodplains'
    ],
    gallery: [
      'langtang-valley-trek.webp',
      'langtang-valley-trek-02.webp',
      'langtang-valley-trek-03.webp',
      'langtang-valley-trek-04.webp',
      'kyanjin-gompa-langtang.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Private 4WD jeep drive through Trishuli Bazaar, terraced farmlands, and Dhunche into Syabrubesi, the vibrant gateway to Langtang.' },
      { day: 2, title: 'Trek Syabrubesi to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Cross the Bhote Koshi suspension bridge and ascend gently through lush subtropical forests of oak, bamboo, and rhododendron along the Langtang Khola.' },
      { day: 3, title: 'Trek Lama Hotel to Langtang Village (3,430m)', dest: 'Langtang Village', altM: 3430, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Climb through Ghodatabela where the narrow gorge opens into a wide glacial valley. Pass prayer wheels and rebuilt stone houses to reach resilient Langtang Village.' },
      { day: 4, title: 'Trek Langtang Village to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 3870, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'A gentle ascent past ancient mani walls and yak pastures into the breathtaking amphitheater of Kyanjin Gompa beneath the towering icefall of Langtang Lirung.' },
      { day: 5, title: 'Sunrise Hike to Kyanjin Ri (4,773m) & Explore Glacial Basin', dest: 'Kyanjin Gompa', altM: 4773, duration: '5-6 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Dawn climb to the prayer-flag-draped summit of Kyanjin Ri (4,773m) for views of Langtang Lirung, Dorje Lakpa, and Langshisha Ri. Afternoon cheese tasting at the dairy.' },
      { day: 6, title: 'Trek Kyanjin Gompa back down to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Retrace your path smoothly downhill through Langtang Village and Ghodatabela back to the cozy forest shelter of Lama Hotel.' },
      { day: 7, title: 'Trek Lama Hotel to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '4-5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'A pleasant downhill walk beside the rushing river, passing through Bamboo and crossing suspension bridges back to Syabrubesi.' },
      { day: 8, title: 'Scenic Drive Syabrubesi to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, D', desc: 'Drive back along the mountain highway to Kathmandu. Check in to your hotel in Thamel and enjoy our celebratory farewell dinner.' }
    ],
    faqs: [
      { q: 'How physically difficult is the Langtang Valley Trek?', a: 'Langtang Valley is graded Moderate. It features gradual elevation gains and manageable 5 to 6-hour walking days, making it ideal for fit beginner trekkers and families.' },
      { q: 'Do we need mountain flights for Langtang?', a: 'No! Unlike Everest, Langtang is completely road-accessible by private 4WD jeep from Kathmandu (7 to 8 hours), completely avoiding flight delays or cancellations.' }
    ]
  },

  // 2. Gosaikunda Lake Trek (7 Days)
  {
    slug: 'gosaikunda-lake-trek',
    title: 'Gosaikunda Lake Trek (7 Days) — Sacred Alpine Pilgrimage — Igloo Himalaya Treks',
    seoTitle: 'Gosaikunda Lake Trek (7 Days)',
    metaDesc: 'Trek to the holy alpine pilgrimage lakes of Gosaikunda (4,380m) in 7 days. Jaw-dropping panoramas of Ganesh Himal and Langtang from Laurebina ridge.',
    canonical: 'https://igloohimalayatreks.com/trek/gosaikunda-lake-trek/',
    duration: '7 days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '4,380 m (14,370 ft)',
    maxAltNum: 4380,
    price: '590',
    activity: 'Sacred High-Altitude Lake Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle / Tourist Coach',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-May & Sep-Nov (Janai Purnima in Aug)',
    trekStarts: 'Dhunche',
    trekEnds: 'Dhunche / Kathmandu',
    region: 'Langtang National Park',
    heroBadge: 'Langtang Region • Holy Glacial Lakes & Ganesh Himal Panoramas',
    leadText: 'The 7-day Gosaikunda Lake Trek ascends steeply into the heavens to reach a sacred cirque of pristine glacial alpine lakes (4,380m) revered by Hindus and Buddhists alike. Legend says Lord Shiva thrust his holy trident into the mountain to quench his thirst after swallowing poison, creating these crystalline waters beneath towering Himalayan peaks.',
    highlights: [
      'Stand beside the sacred turquoise waters of Gosaikunda Lake (4,380m), Bhairav Kunda, and Saraswati Kunda',
      'Panoramic sunrise ridge walk from Laurebina with sweeping views across Ganesh Himal and Manaslu',
      'Visit historic Shin Gompa (Chandan Bari) and sample freshly prepared Himalayan artisan yak cheese',
      'Trek through dense virgin forests of pine, hemlock, and blooming red rhododendrons',
      'Close road access from Kathmandu via Dhunche with no flight delays',
      'Cultural encounters with Tamang and Hyolmo mountain communities'
    ],
    gallery: [
      'gosaikunda-lake-trek.webp',
      'gosaikunda-lake-trek-02.webp',
      'gosaikunda-lake-trek-03.webp',
      'langtang-gosaikunda-trek.webp',
      'langtang-valley-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Scenic Drive Kathmandu to Dhunche (1,960m)', dest: 'Dhunche', altM: 1960, duration: '6-7 hrs drive', dist: '118 km', meals: 'B, L, D', desc: 'Overland drive along the Trishuli River highway passing green foothills and terraced valleys to Dhunche, headquarters of Rasuwa district.' },
      { day: 2, title: 'Trek Dhunche to Deurali & Shin Gompa / Chandan Bari (3,330m)', dest: 'Shin Gompa', altM: 3330, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Climb through mineral streams and dense hemlock and oak woods to Deurali. Continue uphill through pine forest to Shin Gompa for yak cheese tasting.' },
      { day: 3, title: 'Trek Shin Gompa to Cholangpati & Laurebina (3,910m)', dest: 'Laurebina', altM: 3910, duration: '4 hrs', dist: '6.5 km', meals: 'B, L, D', desc: 'Ascend past the tree line onto open grassy ridges. Arrive at the high viewpoint of Laurebina, famous for dramatic sunset views of Ganesh Himal and Langtang.' },
      { day: 4, title: 'Trek Laurebina to Sacred Gosaikunda Lake (4,380m)', dest: 'Gosaikunda', altM: 4380, duration: '3 hrs', dist: '4 km', meals: 'B, L, D', desc: 'A scenic ridge walk past Saraswati Kunda and Bhairav Kunda into the dramatic lake basin of Gosaikunda. Spend the afternoon exploring sacred shrines.' },
      { day: 5, title: 'Sunrise over Holy Lake & Trek down to Shin Gompa (3,330m)', dest: 'Shin Gompa', altM: 3330, duration: '5 hrs', dist: '10.5 km', meals: 'B, L, D', desc: 'Watch golden sunrise light illuminate the peaks reflected on Gosaikunda. Descend smoothly back through Laurebina and Cholangpati to Shin Gompa.' },
      { day: 6, title: 'Trek Shin Gompa down to Dhunche (1,960m)', dest: 'Dhunche', altM: 1960, duration: '4 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Trek downhill through forest paths and traditional farm hamlets, arriving in Dhunche for a celebratory evening with your trekking team.' },
      { day: 7, title: 'Drive Dhunche to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '6-7 hrs drive', dist: '118 km', meals: 'B, D', desc: 'Scenic return drive to Kathmandu. Hotel check-in, souvenir shopping in Thamel, and our traditional Nepali farewell celebration dinner.' }
    ],
    faqs: [
      { q: 'Is Gosaikunda safe from altitude sickness?', a: 'Gosaikunda reaches 4,380m. Our 7-day itinerary breaks the ascent with overnight stays at 3,330m (Shin Gompa) and 3,910m (Laurebina), providing safe, gradual acclimatization.' },
      { q: 'Can I visit Gosaikunda in winter?', a: 'In winter (December to February), Gosaikunda is completely frozen, creating an ethereal white wonderland, though crampons and warm gear are mandatory due to snow.' }
    ]
  },

  // 3. Langtang Gosaikunda Trek (12 Days)
  {
    slug: 'langtang-gosaikunda-trek',
    title: 'Langtang Gosaikunda Trek (12 Days) — Valley to Holy Lakes — Igloo Himalaya Treks',
    seoTitle: 'Langtang Gosaikunda Trek (12 Days)',
    metaDesc: 'Combine the glacial valley of Langtang and Kyanjin Ri (4,773m) with the sacred alpine lakes of Gosaikunda (4,380m) on an unforgettable 12-day mountain journey.',
    canonical: 'https://igloohimalayatreks.com/trek/langtang-gosaikunda-trek/',
    duration: '12 days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '4,773 m (15,659 ft)',
    maxAltNum: 4773,
    price: '890',
    activity: 'Glacier Valley & High Alpine Lakes Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private 4WD Vehicle Support',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-May & Sep-Nov',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Dhunche / Kathmandu',
    region: 'Langtang National Park',
    heroBadge: 'Langtang Region • Valley of Glaciers & Sacred Gosaikunda Lakes',
    leadText: 'The 12-day Langtang Gosaikunda Trek unites the two most celebrated highlights of Central Nepal into one continuous alpine loop. Journey from the lush gorges of the Langtang Khola up to the icy mountain amphitheater of Kyanjin Gompa (3,870m), then cross high forested ridges to reach the mystical holy waters of Gosaikunda Lake (4,380m).',
    highlights: [
      'Summit Kyanjin Ri (4,773m) for views of Langtang Lirung, Yala Peak, and Tibetan peaks',
      'Stand beside the sacred glacial pilgrimage waters of Gosaikunda Lake (4,380m)',
      'Explore historic Kyanjin Gompa monastery and artisan Swiss yak cheese dairies',
      'Traverse high scenic ridge trails through Thulo Syabru and Laurebina with Ganesh Himal vistas',
      'Walk through rich biodiversity in Langtang National Park from bamboo to alpine tundra',
      'Complete overland route from Kathmandu with zero domestic flight delays'
    ],
    gallery: [
      'langtang-gosaikunda-trek.webp',
      'langtang-valley-trek.webp',
      'gosaikunda-lake-trek.webp',
      'langtang-valley-trek-02.webp',
      'kyanjin-gompa-langtang.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Overland drive through foothill valleys and market towns to Syabrubesi.' },
      { day: 2, title: 'Trek Syabrubesi to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Trek along the Langtang Khola through dense bamboo, oak, and rhododendron forests.' },
      { day: 3, title: 'Trek Lama Hotel to Langtang Village (3,430m)', dest: 'Langtang Village', altM: 3430, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Climb past Ghodatabela where the valley broadens into wide pastures under snow-capped peaks.' },
      { day: 4, title: 'Trek Langtang Village to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 3870, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Walk past ancient mani walls into the colossal alpine amphitheater of Kyanjin Gompa.' },
      { day: 5, title: 'Sunrise Climb to Kyanjin Ri (4,773m) & Glacial Exploration', dest: 'Kyanjin Gompa', altM: 4773, duration: '5-6 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Climb Kyanjin Ri for panoramic 360° views across Langtang Lirung and glaciers. Visit local cheese dairy.' },
      { day: 6, title: 'Trek Kyanjin Gompa down to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Retrace your steps smoothly downhill through the forest to Lama Hotel.' },
      { day: 7, title: 'Trek Lama Hotel to Thulo Syabru (2,210m)', dest: 'Thulo Syabru', altM: 2210, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Descend to Bamboo, cross the river, and climb the scenic ridge trail up to the beautiful ridge village of Thulo Syabru.' },
      { day: 8, title: 'Trek Thulo Syabru to Shin Gompa / Chandan Bari (3,330m)', dest: 'Shin Gompa', altM: 3330, duration: '4-5 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Climb through moss-covered hemlock and rhododendron forests to Shin Gompa monastery.' },
      { day: 9, title: 'Trek Shin Gompa to Sacred Gosaikunda Lake (4,380m)', dest: 'Gosaikunda', altM: 4380, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Ascend past Laurebina with sweeping views of Ganesh Himal and Annapurna into the sacred cirque of Gosaikunda.' },
      { day: 10, title: 'Explore Gosaikunda Lakes & Trek down to Shin Gompa (3,330m)', dest: 'Shin Gompa', altM: 3330, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Sunrise over the mirror-like waters of the holy lake. Descend past Laurebina back to Shin Gompa.' },
      { day: 11, title: 'Trek Shin Gompa to Dhunche (1,960m)', dest: 'Dhunche', altM: 1960, duration: '4 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Descend through peaceful forest trails to Dhunche for our final evening celebration.' },
      { day: 12, title: 'Drive Dhunche to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '6-7 hrs drive', dist: '118 km', meals: 'B, D', desc: 'Scenic private drive back to Kathmandu hotel. Evening celebration farewell banquet.' }
    ],
    faqs: [
      { q: 'Why choose the combined Langtang Gosaikunda Trek?', a: 'This route combines both the high glacial amphitheater of Langtang and the sacred alpine lakes of Gosaikunda in one continuous, efficient loop without needing long retracing.' }
    ]
  },

  // 4. Tamang Heritage Trail Trek (8 Days)
  {
    slug: 'tamang-heritage-trail-trek',
    title: 'Tamang Heritage Trail Trek (8 Days) — Cultural Homestay — Igloo Himalaya Treks',
    seoTitle: 'Tamang Heritage Trail Trek (8 Days)',
    metaDesc: 'Discover Tibetan-influenced culture on the 8-day Tamang Heritage Trail. Experience authentic village homestays, natural hot springs at Tatopani, and views from Nagthali (3,165m).',
    canonical: 'https://igloohimalayatreks.com/trek/tamang-heritage-trail-trek/',
    duration: '8 days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,165 m (10,383 ft)',
    maxAltNum: 3165,
    price: '580',
    activity: 'Indigenous Cultural & Village Homestay Trek',
    accommodation: 'Community Homestays & Teahouses',
    transport: 'Private Vehicle / Tourist Coach',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-May)',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Syabrubesi / Kathmandu',
    region: 'Langtang & Tamang Heritage',
    heroBadge: 'Langtang Region • Authentic Tibetan-Influenced Village Homestays',
    leadText: 'The 8-day Tamang Heritage Trail Trek is Nepal’s premier cultural journey, winding through untouched villages settled by descendants of ancient Tibetan horse-traders near the Tibetan border. Staying in welcoming community homestays in Gatlang, Thuman, and Briddhim, you experience traditional dances, natural hot springs at Tatopani, and stunning views of Ganesh Himal from Nagthali Danda (3,165m).',
    highlights: [
      'Authentic community homestay hospitality in Gatlang, Tatopani, Thuman, and Briddhim',
      'Relaxation in natural curative thermal hot mineral springs at Tatopani (2,607m)',
      '360° panorama of Ganesh Himal, Langtang Lirung, and peaks in Tibet from Nagthali Danda (3,165m)',
      'Discover unique Tamang craftsmanship: carved wooden houses, weaving, and traditional costumes',
      'Low maximum altitude (3,165m) ensuring zero risk of altitude sickness — ideal for beginners & families',
      'Overland access from Kathmandu with zero domestic flight delays'
    ],
    gallery: [
      'tamang-heritage-trail-and-langtang-valley-trek.webp',
      'langtang-valley-trek.webp',
      'langtang-valley-trek-02.webp',
      'gosaikunda-lake-trek.webp',
      'kyanjin-gompa-langtang.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Scenic mountain drive to Syabrubesi along the Trishuli River highway.' },
      { day: 2, title: 'Trek Syabrubesi to Gatlang (2,238m) via Goljung', dest: 'Gatlang', altM: 2238, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend through terraced fields past Goljung village to Gatlang, famous for its stone houses and serene Parvati Kunda lake.' },
      { day: 3, title: 'Trek Gatlang to Tatopani (2,607m) & Hot Springs', dest: 'Tatopani', altM: 2607, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Descend to Thambuchet river and climb through pine forests to Tatopani. Soak in the natural healing hillside thermal baths.' },
      { day: 4, title: 'Trek Tatopani to Thuman (2,338m) via Nagthali Viewpoint (3,165m)', dest: 'Thuman', altM: 2338, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Climb through alpine forest to open meadows at Nagthali (3,165m) with grand views of Ganesh Himal and Tibet. Descend to Tibetan-style Thuman.' },
      { day: 5, title: 'Trek Thuman to Briddhim (2,229m) Homestay', dest: 'Briddhim', altM: 2229, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Follow high trails above the Bhote Koshi to Briddhim, a community homestay village where hosts share traditional butter tea and culture.' },
      { day: 6, title: 'Trek Briddhim down to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '4 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Gentle descent through forest paths back down to Syabrubesi. Celebrate with your guide and crew.' },
      { day: 7, title: 'Scenic Drive Syabrubesi to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, D', desc: 'Drive back to Kathmandu. Relax at your hotel and join our celebratory farewell dinner.' },
      { day: 8, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'B', desc: 'Private transfer to Tribhuvan International Airport for your flight home.' }
    ],
    faqs: [
      { q: 'Is the Tamang Heritage Trail suitable for children and seniors?', a: 'Yes! With a low maximum altitude of 3,165m and gentle daily walking stages, it is one of the best family and senior-friendly treks in Nepal.' }
    ]
  },

  // 5. Helambu Trek (6 Days)
  {
    slug: 'helambu-trek',
    title: 'Helambu Trek (6 Days) — Peaceful Hyolmo Valley — Igloo Himalaya Treks',
    seoTitle: 'Helambu Trek (6 Days)',
    metaDesc: 'Discover the tranquil Buddhist villages and rhododendron forests of Helambu in 6 days. Walk from Sundarijal through Kutumsang, Tarke Ghyang, and Sermathang.',
    canonical: 'https://igloohimalayatreks.com/trek/helambu-trek/',
    duration: '6 days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,650 m (11,975 ft)',
    maxAltNum: 3650,
    price: '460',
    activity: 'Scenic Cultural Foothill Trekking',
    accommodation: 'Mountain Teahouses',
    transport: 'Private Vehicle Transfers',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-May)',
    trekStarts: 'Sundarijal',
    trekEnds: 'Melamchi / Kathmandu',
    region: 'Helambu & Langtang',
    heroBadge: 'Central Nepal • Ancient Hyolmo Monasteries & Forest Footpaths',
    leadText: 'The 6-day Helambu Trek is an idyllic short Himalayan hike starting right on the northern rim of the Kathmandu Valley at Sundarijal. Walking through Shivapuri National Park into the tranquil Hyolmo cultural kingdom of Helambu, you encounter ancient Buddhist monasteries, terraced hillsides, and sweeping views of the Langtang and Jugal Himal ranges.',
    highlights: [
      'Begin hiking directly from the rim of the Kathmandu Valley at Sundarijal',
      'Experience the unique culture and peaceful Buddhist monasteries of the Hyolmo people',
      'Walk through the tranquil forests of Shivapuri National Park and sweet apple orchards',
      'Visit historic monasteries at Tarke Ghyang and Sermathang',
      'Stunning sunrise views across the central Himalayan range from Chisapani and Tharepati',
      'Short duration and close access makes it the ideal short trek from Kathmandu'
    ],
    gallery: [
      'langtang-gosaikunda-helambu-trek.webp',
      'langtang-valley-trek.webp',
      'gosaikunda-lake-trek.webp',
      'langtang-gosaikunda-trek.webp',
      'kyanjin-gompa-langtang.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Sundarijal & Trek to Chisapani (2,165m)', dest: 'Chisapani', altM: 2165, duration: '1 hr drive + 4-5 hrs walk', dist: '10 km', meals: 'B, L, D', desc: 'Short drive to Sundarijal. Climb through Shivapuri National Park oak forests to Chisapani for sunset views over the Himalayas.' },
      { day: 2, title: 'Trek Chisapani to Kutumsang (2,470m)', dest: 'Kutumsang', altM: 2470, duration: '6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek along ridge paths through meadows and Tamang villages of Pati Bhanjyang and Golphu Bhanjyang to Kutumsang.' },
      { day: 3, title: 'Trek Kutumsang to Tharepati (3,650m)', dest: 'Tharepati', altM: 3650, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Ascend through dense forests of blooming rhododendron and pine to the open vantage point of Tharepati.' },
      { day: 4, title: 'Trek Tharepati to Tarke Ghyang (2,600m)', dest: 'Tarke Ghyang', altM: 2600, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Descend into the heart of Helambu to Tarke Ghyang, the largest Hyolmo village with its ancient monastery.' },
      { day: 5, title: 'Trek Tarke Ghyang to Sermathang (2,590m)', dest: 'Sermathang', altM: 2590, duration: '4-5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Follow gentle contour trails through pine forests and apple orchards to the peaceful monastery village of Sermathang.' },
      { day: 6, title: 'Trek Sermathang to Melamchi Pul Bazaar & Drive to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '4 hrs walk + 3 hrs drive', dist: '14 km + drive', meals: 'B, L, D', desc: 'Walk down to Melamchi Pul Bazaar. Board private transport back to Kathmandu hotel for celebration dinner.' }
    ],
    faqs: [
      { q: 'How far is Helambu from Kathmandu?', a: 'Helambu begins just 1 hour’s drive from central Kathmandu at Sundarijal, making it the most easily accessible mountain trek in Nepal.' }
    ]
  },

  // 6. Tamang Heritage Trail with Langtang Valley Trek (14 Days)
  {
    slug: 'tamang-heritage-trail-with-langtang-valley-trek',
    title: 'Tamang Heritage Trail with Langtang Valley Trek (14 Days) — Igloo Himalaya Treks',
    seoTitle: 'Tamang Heritage Trail with Langtang Valley Trek (14 Days)',
    metaDesc: 'The ultimate 14-day combination: Tibetan-influenced homestays in Gatlang and Tatopani with the snow-capped glacier amphitheater of Kyanjin Gompa (3,870m).',
    canonical: 'https://igloohimalayatreks.com/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    duration: '14 days',
    difficulty: 'Moderate',
    maxAlt: '4,773 m (15,659 ft)',
    maxAltNum: 4773,
    price: '1,050',
    activity: 'Combined Cultural Homestay & Alpine Glacier Trek',
    accommodation: 'Community Homestays & Mountain Teahouses',
    transport: 'Private 4WD Vehicle Support',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-May & Sep-Nov',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Syabrubesi / Kathmandu',
    region: 'Langtang & Tamang Heritage',
    heroBadge: 'Langtang Region • Authentic Cultural Homestays & High Glaciers',
    leadText: 'The 14-day Tamang Heritage Trail with Langtang Valley Trek is Central Nepal’s most rewarding combined odyssey. Uniting the ancient cultural trading paths of the Tamang people with the sheer glacial wonder of upper Langtang Valley, you journey from relaxing hot springs in Tatopani to the 4,773m summit viewpoint of Kyanjin Ri.',
    highlights: [
      'Complete combined 14-day journey linking cultural heritage homestays with high-alpine glaciers',
      'Authentic homestay hospitality in Gatlang, Tatopani, Thuman, and Briddhim villages',
      'Relaxation in the natural thermal mineral hot springs of Tatopani (2,607m)',
      'Sunrise climb of Kyanjin Ri (4,773m) facing Langtang Lirung and Dorje Lakpa',
      'Exploration of historic Kyanjin Gompa (3,870m) and the local artisan yak cheese factory',
      'Panoramic viewpoint of Nagthali Danda (3,165m) facing Ganesh Himal and Tibet'
    ],
    gallery: [
      'tamang-heritage-trail-and-langtang-valley-trek.webp',
      'langtang-valley-trek.webp',
      'kyanjin-gompa-langtang.webp',
      'langtang-valley-trek-02.webp',
      'gosaikunda-lake-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Scenic mountain drive along the Trishuli River highway to Syabrubesi.' },
      { day: 2, title: 'Trek Syabrubesi to Gatlang (2,238m) via Goljung', dest: 'Gatlang', altM: 2238, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past Goljung village with Ganesh Himal views to the traditional stone village of Gatlang.' },
      { day: 3, title: 'Trek Gatlang to Tatopani (2,607m) & Hot Springs', dest: 'Tatopani', altM: 2607, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Descend to Thambuchet before climbing through pine woods to soak in natural hot springs at Tatopani.' },
      { day: 4, title: 'Trek Tatopani to Thuman (2,338m) via Nagthali (3,165m)', dest: 'Thuman', altM: 2338, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Climb to the spectacular Nagthali ridge viewpoint facing Ganesh Himal and Tibet. Descend to Thuman.' },
      { day: 5, title: 'Trek Thuman to Briddhim (2,229m)', dest: 'Briddhim', altM: 2229, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Follow high trails above the Bhote Koshi valley to the welcoming community homestay village of Briddhim.' },
      { day: 6, title: 'Trek Briddhim to Lama Hotel (2,470m) via Sherpagaon', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Traverse the scenic high trail of Sherpagaon to merge into the main Langtang route at Lama Hotel.' },
      { day: 7, title: 'Trek Lama Hotel to Langtang Village (3,430m)', dest: 'Langtang Village', altM: 3430, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Climb through river gorges and blooming rhododendrons into the wide valley of Langtang Village.' },
      { day: 8, title: 'Trek Langtang Village to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 3870, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Ascend gently past yak meadows into the high mountain sanctuary of Kyanjin Gompa.' },
      { day: 9, title: 'Climb Kyanjin Ri (4,773m) & Glacial Basin Exploration', dest: 'Kyanjin Gompa', altM: 4773, duration: '5-6 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Early morning summit hike up Kyanjin Ri for breathtaking vistas of Langtang Lirung and glaciers.' },
      { day: 10, title: 'Trek Kyanjin Gompa downhill to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Retrace your steps down the glacial valley back into the forest at Lama Hotel.' },
      { day: 11, title: 'Trek Lama Hotel to Thulo Syabru (2,210m)', dest: 'Thulo Syabru', altM: 2210, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Descend to Bamboo and climb the upper ridge trail to the picturesque village of Thulo Syabru.' },
      { day: 12, title: 'Trek Thulo Syabru to Dhunche (1,960m)', dest: 'Dhunche', altM: 1960, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Traverse pleasant forest paths and terraced fields to Dhunche.' },
      { day: 13, title: 'Drive Dhunche back to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '6-7 hrs drive', dist: '118 km', meals: 'B, D', desc: 'Private transfer back to Kathmandu hotel. Enjoy our celebration farewell banquet.' },
      { day: 14, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'B', desc: 'Private airport transfer for your return flight home.' }
    ],
    faqs: [
      { q: 'Why do trekkers choose this combined 14-day route?', a: 'It offers the perfect combination of authentic cultural immersion in remote Tamang villages with the high-altitude glacial beauty of Kyanjin Gompa.' }
    ]
  },

  // 7. Langtang Gosaikunda Helambu Trek (16 Days)
  {
    slug: 'langtang-gosaikunda-helambu-trek',
    title: 'Langtang Gosaikunda Helambu Trek (16 Days) — The Grand Central Traverse — Igloo Himalaya Treks',
    seoTitle: 'Langtang Gosaikunda Helambu Trek (16 Days)',
    metaDesc: 'Nepal’s premier continuous Himalayan loop. Explore Langtang Valley, climb Kyanjin Ri, visit sacred Gosaikunda Lake, and cross Laurebina Pass (4,610m) to Helambu.',
    canonical: 'https://igloohimalayatreks.com/trek/langtang-gosaikunda-helambu-trek/',
    duration: '16 days',
    difficulty: 'Strenuous / Alpine Circuit',
    maxAlt: '4,773 m (15,659 ft)',
    maxAltNum: 4773,
    price: '1,190',
    activity: 'Continuous Grand Traverse & Pass Crossing',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle Transfers',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-May & Sep-Nov',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Sundarijal / Kathmandu',
    region: 'Langtang & Helambu',
    heroBadge: 'Central Nepal • Complete 16-Day Grand Himalayan Traverse',
    leadText: 'The 16-day Langtang Gosaikunda Helambu Trek is Central Nepal’s ultimate grand traverse, connecting three extraordinary regions without ever backtracking. Beginning in the pine-scented canyons of Langtang to Kyanjin Gompa (3,870m), you cross to the sacred alpine lakes of Gosaikunda (4,380m), traverse the high Laurebina La Pass (4,610m), and hike down through the tranquil Hyolmo monasteries of Helambu straight to the Kathmandu Valley rim.',
    highlights: [
      'Complete 16-day continuous loop through Langtang Valley, Gosaikunda, and Helambu without backtracking',
      'Stand at the sacred alpine pilgrimage lakes of Gosaikunda (4,380m), Bhairav Kunda, and Saraswati Kunda',
      'Cross the challenging and panoramic Laurebina La Pass (4,610m / 15,125 ft)',
      'Sunrise climb of Kyanjin Ri (4,773m) facing Langtang Lirung, Dorje Lakpa, and Langshisha Ri',
      'Immersive cultural encounters with Tamang, Tibetan, and Hyolmo indigenous communities',
      'Direct walking finish at Sundarijal on the rim of the Kathmandu Valley'
    ],
    gallery: [
      'langtang-gosaikunda-helambu-trek.webp',
      'langtang-valley-trek.webp',
      'gosaikunda-lake-trek.webp',
      'kyanjin-gompa-langtang.webp',
      'langtang-gosaikunda-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Morning drive along the Trishuli River highway to Syabrubesi.' },
      { day: 2, title: 'Trek Syabrubesi to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Trek through subtropical forest and bamboo thickets alongside the churning Langtang Khola.' },
      { day: 3, title: 'Trek Lama Hotel to Langtang Village (3,430m)', dest: 'Langtang Village', altM: 3430, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Climb through river gorges to Ghodatabela where the valley broadens into wide alpine pastures.' },
      { day: 4, title: 'Trek Langtang Village to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 3870, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'A gentle ascent past ancient mani walls into the alpine amphitheater of Kyanjin Gompa.' },
      { day: 5, title: 'Summit Hike to Kyanjin Ri (4,773m) & Glacier Exploration', dest: 'Kyanjin Gompa', altM: 4773, duration: '5-6 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Early morning hike up Kyanjin Ri for panoramic views of Langtang Lirung and Yala Peak.' },
      { day: 6, title: 'Trek Kyanjin Gompa downhill to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Retrace your steps down the glacial valley back into the forest canopy at Lama Hotel.' },
      { day: 7, title: 'Trek Lama Hotel to Thulo Syabru (2,210m)', dest: 'Thulo Syabru', altM: 2210, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Descend to Bamboo, cross the river, and climb the scenic ridge trail to Thulo Syabru.' },
      { day: 8, title: 'Trek Thulo Syabru to Shin Gompa / Chandan Bari (3,330m)', dest: 'Shin Gompa', altM: 3330, duration: '4-5 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Ascend through dense forests of hemlock and rhododendron to Shin Gompa monastery and cheese dairy.' },
      { day: 9, title: 'Trek Shin Gompa to Sacred Gosaikunda Lake (4,380m)', dest: 'Gosaikunda', altM: 4380, duration: '5-6 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Climb past Laurebina viewpoint for jaw-dropping vistas of Ganesh Himal into the sacred cirque of Gosaikunda.' },
      { day: 10, title: 'Cross Laurebina Pass (4,610m) & Trek to Ghopte (3,430m)', dest: 'Ghopte', altM: 4610, duration: '6-7 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Ascend past holy lakes to cross Laurebina La Pass (4,610m). Descend rocky trails into the Helambu region at Ghopte.' },
      { day: 11, title: 'Trek Ghopte to Kutumsang (2,470m) via Tharepati (3,690m)', dest: 'Kutumsang', altM: 2470, duration: '6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Ascend to Tharepati ridge for morning panoramas and follow the forest trail down into Kutumsang.' },
      { day: 12, title: 'Trek Kutumsang to Chisapani (2,165m)', dest: 'Chisapani', altM: 2165, duration: '6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Hike across gentle ridges through Pati Bhanjyang to Chisapani for sunset views across the central Himalayas.' },
      { day: 13, title: 'Trek Chisapani to Sundarijal (1,460m) & Drive to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '4 hrs trek + 1 hr drive', dist: '10 km + drive', meals: 'B, L', desc: 'Trek through Shivapuri National Park to Sundarijal. Meet private transport and drive back to Kathmandu hotel.' },
      { day: 14, title: 'Kathmandu Valley Cultural Heritage Exploration', dest: 'Kathmandu', altM: 1400, duration: 'Full day sightseeing', dist: 'City', meals: 'B', desc: 'Guided cultural tour of UNESCO World Heritage Sites including Swayambhunath and Boudhanath Stupa.' },
      { day: 15, title: 'Buffer / Contingency Day in Kathmandu & Farewell Dinner', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'B, D', desc: 'Free day for shopping in Thamel. Evening celebration farewell dinner.' },
      { day: 16, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'B', desc: 'Private transfer to Tribhuvan International Airport for your flight home.' }
    ],
    faqs: [
      { q: 'How difficult is the Laurebina Pass crossing?', a: 'Laurebina Pass stands at 4,610m. The ascent is steady and non-technical, but proper cold-weather layers, trekking poles, and safe acclimatization at Gosaikunda beforehand are essential.' }
    ]
  },

  // 8. Yala Peak Climbing (11 Days)
  {
    slug: 'yala-peak-climbing',
    title: 'Yala Peak Climbing (5,500m / 11 Days) — Introductory Summit — Igloo Himalaya Treks',
    seoTitle: 'Yala Peak Climbing (5,500m / 11 Days)',
    metaDesc: 'Summit Yala Peak (5,500m) in Langtang, Nepal. The ideal beginner-friendly 11-day mountaineering expedition featuring Kyanjin Gompa, high camp training, and views of Shishapangma (8,027m).',
    canonical: 'https://igloohimalayatreks.com/trek/yala-peak-climbing/',
    duration: '11 days',
    difficulty: 'Strenuous / Non-Technical Alpine Summit',
    maxAlt: '5,500 m (18,045 ft)',
    maxAltNum: 5500,
    price: '1,390',
    activity: 'Beginner Mountaineering Peak Climbing',
    accommodation: 'Mountain Teahouses & High Altitude Camping',
    transport: 'Private 4WD Vehicle Support',
    meals: 'All Meals on Trek and Climbing Camp (B,L,D)',
    season: 'Mar-May & Oct-Nov',
    trekStarts: 'Syabrubesi',
    trekEnds: 'Syabrubesi / Kathmandu',
    region: 'Langtang & Peak Climbing',
    heroBadge: 'Peak Climbing Nepal • Nepal’s Premier Non-Technical 5,500m Summit',
    leadText: 'Yala Peak (5,500m / 18,045 ft) is universally acclaimed as Nepal’s most accessible and visually rewarding introductory mountaineering summit. Located in the upper Langtang Valley near the Tibetan border, this 11-day expedition requires no prior technical ice climbing experience, making it the perfect first Himalayan summit for ambitious hikers and fit trekkers.',
    highlights: [
      'Summit a genuine 5,500m Himalayan peak with certified high-altitude Sherpa climbing guides',
      'Non-technical summit climb ideal for first-time mountaineers and fit trekkers',
      'Spectacular views of 8,000m Shishapangma (8,027m in Tibet) and Langtang Lirung (7,227m)',
      'Full mountaineering training: crampons, ice axe technique, and fixed-rope management included',
      'Scenic trek through Langtang National Park and historic Kyanjin Gompa (3,870m)',
      'High camp experience (4,800m) under pristine starry Himalayan skies',
      'All climbing equipment, climbing permits, kitchen crew, and safety equipment fully arranged',
      'Overland journey from Kathmandu without domestic flight weather delays'
    ],
    gallery: [
      'yala-peak-climbing.webp',
      'kyanjin-gompa-langtang.webp',
      'langtang-valley-trek.webp',
      'langtang-valley-trek-02.webp',
      'gosaikunda-lake-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, L, D', desc: 'Private 4WD drive through foothill valleys and market towns to Syabrubesi.' },
      { day: 2, title: 'Trek Syabrubesi to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Trek along the Langtang Khola through dense oak and rhododendron forests to Lama Hotel.' },
      { day: 3, title: 'Trek Lama Hotel to Langtang Village (3,430m)', dest: 'Langtang Village', altM: 3430, duration: '5-6 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past Ghodatabela where the dramatic glacial gorge opens into an expansive valley.' },
      { day: 4, title: 'Trek Langtang Village to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 3870, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'A short, acclimatization-friendly ascent across wide yak meadows to Kyanjin Gompa.' },
      { day: 5, title: 'Acclimatization Hike to Kyanjin Ri (4,773m) & Climbing Gear Check', dest: 'Kyanjin Gompa', altM: 4773, duration: '4-5 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Climb Kyanjin Ri for vital acclimatization. Afternoon climbing equipment check and knot/crampon refresher session.' },
      { day: 6, title: 'Trek Kyanjin Gompa to Yala Peak Base Camp (4,600m)', dest: 'Yala Base Camp', altM: 4600, duration: '4-5 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Leave teahouses behind and trek with porters and kitchen crew up rocky moraine slopes to Base Camp. Set up high alpine tents.' },
      { day: 7, title: 'Ascend to Yala Peak High Camp (4,800m) & Pre-Summit Prep', dest: 'Yala High Camp', altM: 4800, duration: '3 hrs', dist: '4 km', meals: 'B, L, D', desc: 'A steady climb brings the team to High Camp. Practice basic rope travel on the snow apron. Early dinner and sleep.' },
      { day: 8, title: 'Summit Day: Yala Peak (5,500m) & Return to Kyanjin Gompa (3,870m)', dest: 'Kyanjin Gompa', altM: 5500, duration: '8-9 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Alpine start at 3:00 AM. Ascend moderate snow slopes and the rocky summit ridge to stand on Yala Peak (5,500m) at sunrise! Panoramic views of Shishapangma (8,027m). Descend to Kyanjin Gompa.' },
      { day: 9, title: 'Contingency Weather Day / Trek Kyanjin Gompa to Lama Hotel (2,470m)', dest: 'Lama Hotel', altM: 2470, duration: '6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Buffer day for summit weather, or begin the scenic descent through Langtang Village back to Lama Hotel.' },
      { day: 10, title: 'Trek Lama Hotel to Syabrubesi (1,460m)', dest: 'Syabrubesi', altM: 1460, duration: '4-5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Final gentle downhill walk alongside the river past bamboo thickets to arrive back in Syabrubesi.' },
      { day: 11, title: 'Drive Syabrubesi back to Kathmandu (1,400m)', dest: 'Kathmandu', altM: 1400, duration: '7-8 hrs drive', dist: '122 km', meals: 'B, D', desc: 'Private transfer back to Kathmandu. Evening celebration dinner and awarding of your official summit certificates.' }
    ],
    faqs: [
      { q: 'Do I need prior mountaineering experience for Yala Peak?', a: 'No technical mountaineering experience is required! Yala Peak is a non-technical trekking peak (F / PD grade). Our certified climbing Sherpa guides provide full hands-on training for crampons, harness, and fixed ropes before the summit push.' }
    ]
  }
];

module.exports = {
  langtangPackages
};
