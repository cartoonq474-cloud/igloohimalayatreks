const fs = require('fs');

// Master Authentic Data for 12 Annapurna Packages
const annapurnaPackages = [
  // 1. Annapurna Base Camp Trek (10 Days)
  {
    slug: 'annapurna-base-camp',
    title: 'Annapurna Base Camp Trek (10 Days) — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Base Camp Trek (10 Days)',
    metaDesc: 'Trek deep into the glacial amphitheater of the Annapurna Sanctuary to Annapurna Base Camp (4,130m). Face-to-face with Annapurna I (8,091m) and Machhapuchhre.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-base-camp/',
    duration: '10 days',
    difficulty: 'Moderate',
    maxAlt: '4,130 m (13,550 ft)',
    maxAltNum: 4130,
    price: '890',
    activity: 'Alpine Glacier Trekking',
    accommodation: 'Mountain Teahouse Lodges & Hotel in Pokhara',
    transport: 'Private Vehicle & Tourist Coach',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / Jhinu Danda',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Iconic Himalayan Glacier Sanctuary',
    leadText: 'The 10-day Annapurna Base Camp Trek (ABC) leads you into a sheer glacial amphitheater ringed by a colossal 360-degree crown of Himalayan giants. Starting through terraced Gurung villages and moss-draped bamboo forests, the trail enters the narrow Modi Khola canyon before bursting into the sacred Annapurna Sanctuary (4,130m) directly beneath the south face of Annapurna I (8,091m).',
    highlights: [
      'Stand inside the 360-degree glacial amphitheater of Annapurna Base Camp (4,130m / 13,550ft)',
      'Unobstructed, intimate views of the colossal south face of Mount Annapurna I (8,091m)',
      'Close-up perspectives of Machhapuchhre (Fishtail, 6,993m), Annapurna South, and Hiunchuli',
      'Trek through the rich cultural Gurung settlements of Chhomrong and Sinuwa',
      'Walk through fragrant rhododendron, oak, and bamboo forests alive with Himalayan wildlife',
      'Relaxation in natural geothermal riverside hot springs at Jhinu Danda',
      'Machhapuchhre Base Camp (MBC - 3,700m) high-altitude alpine waypoint',
      'Scenic leisure time by tranquil Phewa Lake in Pokhara'
    ],
    gallery: [
      'annapurna-base-camp-trek.webp',
      'annapurna-base-camp-trek-02.webp',
      'annapurna-base-camp-trek-03.webp',
      'annapurna-base-camp-trek-04.webp',
      'annapurna-base-camp-9-days-itinerary-02.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '6 to 7 hours drive / 25 min flight', dist: '200 km', meals: 'Breakfast (B)', desc: 'Scenic drive along the Trishuli and Marsyangdi rivers through lush green hills and bustling market towns to the lakeside city of Pokhara. Spend the afternoon strolling along Phewa Lake.' },
      { day: 2, title: 'Drive Pokhara to Matque & Trek to Chhomrong (2,170m)', dest: 'Chhomrong', altM: 2170, duration: '2.5 hrs drive + 4-5 hrs walk', dist: '9.5 km', meals: 'B, L, D', desc: 'Private 4WD drive to Matque trailhead. Cross suspension bridges and hike steadily through terraced farmlands and Jhinu Danda up to the bustling Gurung settlement of Chhomrong.' },
      { day: 3, title: 'Trek Chhomrong to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '4 to 5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Descend 2,500 stone steps to Chhomrong Khola, cross the river, and climb steeply through rhododendron and bamboo woodlands to Sinuwa before dropping down into Bamboo gorge.' },
      { day: 4, title: 'Trek Bamboo to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '5 to 6 hours', dist: '9.5 km', meals: 'B, L, D', desc: 'Follow the narrowing Modi Khola river gorge past Dovan and Himalaya Hotel. Pass the sacred weeping rock of Hinku Cave and enter the sub-alpine shrub zone at Deurali.' },
      { day: 5, title: 'Trek Deurali to Machhapuchhre Base Camp (MBC - 3,700m) & Annapurna Base Camp (ABC - 4,130m)', dest: 'Annapurna Base Camp', altM: 4130, duration: '5 to 6 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Trek gently uphill into the sacred Annapurna Sanctuary. Pass MBC with stunning close-ups of Fishtail, continuing into the vast glacial basin of ABC (4,130m) for an unforgettable sunset.' },
      { day: 6, title: 'Sunrise over Annapurna I (8,091m) & Trek Down to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '6 hours', dist: '14 km', meals: 'B, L, D', desc: 'Awake at dawn for golden sunrise light striking the snow-and-ice wall of Annapurna I, Annapurna South, and Hiunchuli. After breakfast, descend smoothly back down to Bamboo.' },
      { day: 7, title: 'Trek Bamboo to Jhinu Danda (1,780m) & Natural Hot Springs', dest: 'Jhinu Danda', altM: 1780, duration: '5 hours', dist: '10 km', meals: 'B, L, D', desc: 'Hike uphill to Sinuwa, drop to the river, and ascend stone steps to Chhomrong. Continue downhill to Jhinu Danda and soak tired muscles in the natural thermal hot springs beside the river.' },
      { day: 8, title: 'Short Walk to Matque & Private Drive to Pokhara', dest: 'Pokhara', altM: 820, duration: '1 hr walk + 2.5 hrs drive', dist: '3.5 km + drive', meals: 'B, L', desc: 'Cross the long scenic Jhinu suspension bridge to the jeep station at Matque. Drive back to Pokhara, arriving by early afternoon for leisure and celebratory lakeside dining.' },
      { day: 9, title: 'Drive or Fly from Pokhara back to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '6 hrs drive / 25 min flight', dist: '200 km', meals: 'B, D', desc: 'Scenic journey back to Kathmandu. Check into hotel in Thamel, enjoy souvenir shopping, and celebrate with a traditional Nepali farewell dinner hosted by Igloo Himalaya Treks.' },
      { day: 10, title: 'Final International Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to Tribhuvan International Airport (TIA) for your return flight home, taking lifelong memories of the Annapurna Sanctuary.' }
    ],
    faqs: [
      { q: "How difficult is the Annapurna Base Camp Trek?", a: "The 10-day ABC trek is graded Moderate. While requiring good physical stamina for ascending stone staircases and walking 5 to 6 hours daily, the maximum altitude is 4,130m, which is significantly lower than Everest Base Camp (5,364m) or Thorong La Pass (5,416m)." },
      { q: "What permits are required for the Annapurna Base Camp Trek?", a: "You require two permits: the Annapurna Conservation Area Project (ACAP) Entry Permit and the Trekkers' Information Management System (TIMS) Card. Both are 100% arranged and paid for by Igloo Himalaya Treks." },
      { q: "When is the best season to trek to Annapurna Base Camp?", a: "The prime trekking windows are Autumn (October to November) with crystalline blue skies and crisp mountain air, and Spring (March to May) with blooming rhododendrons and warmer daytime temperatures." },
      { q: "Can I take a helicopter back from Annapurna Base Camp?", a: "Yes! If you wish to skip the 3-day return hike, you can upgrade to our Annapurna Base Camp with Helicopter Return package, which flies you directly from ABC back to Pokhara in just 25 minutes." }
    ]
  },

  // 2. Short Annapurna Base Camp Trek (6 Days)
  {
    slug: 'short-annapurna-base-camp-trek',
    title: 'Short Annapurna Base Camp Trek (6 Days) — Fast Track — Igloo Himalaya Treks',
    seoTitle: 'Short Annapurna Base Camp Trek (6 Days)',
    metaDesc: 'Fast-track 6-day express trek into the heart of Annapurna Sanctuary (4,130m) for fit and experienced hikers with limited holiday time.',
    canonical: 'https://igloohimalayatreks.com/trek/short-annapurna-base-camp-trek/',
    duration: '6 days',
    difficulty: 'Strenuous (Fast-Paced)',
    maxAlt: '4,130 m (13,550 ft)',
    maxAltNum: 4130,
    price: '590',
    activity: 'Express Alpine Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private 4WD Jeep',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / Jhinu Danda',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Express High-Altitude Challenge',
    leadText: 'The Short Annapurna Base Camp Trek is an action-packed 6-day fast-track itinerary engineered specifically for fit hikers with tight travel schedules who want to reach the majestic Annapurna Sanctuary without taking two weeks off work.',
    highlights: [
      'Fast-track 6-day itinerary from Pokhara into Annapurna Sanctuary (4,130m)',
      'Reach the base of the world’s 10th highest peak, Annapurna I (8,091m)',
      'Private 4WD jeep transport straight to Matque trailhead, cutting out road walking',
      'Panoramic sunset and dawn sunrise views over Machhapuchhre (Fishtail)',
      'Rejuvenating soak in natural riverside thermal hot springs at Jhinu Danda',
      'Challenging, rewarding daily elevation gain through high alpine gorges',
      'Stay in authentic Himalayan teahouse lodges along the Modi Khola',
      'Ideal for conditioned adventurers and weekend mountain athletes'
    ],
    gallery: [
      'short-annapurna-base-camp-trek.webp',
      'short-annapurna-base-camp-trek-02.webp',
      'short-annapurna-base-camp-trek-9-days-itinerary-2027.webp',
      'annapurna-base-camp-trek-03.webp',
      'annapurna-base-camp-trek-04.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque (3 hrs) & Trek to Lower Sinuwa (2,340m)', dest: 'Sinuwa', altM: 2340, duration: '3 hrs drive + 5 hrs trek', dist: '9 km', meals: 'B, L, D', desc: 'Early morning 4WD jeep drive to Matque. Cross the suspension bridge and climb past Jhinu Danda and Chhomrong, descending to Chhomrong Khola before a final climb to Lower Sinuwa.' },
      { day: 2, title: 'Trek Sinuwa to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '6 to 7 hours', dist: '12 km', meals: 'B, L, D', desc: 'An energetic hiking day passing Bamboo, Dovan, and Himalaya Hotel through lush rhododendron and mossy bamboo forests, arriving at Deurali beneath towering canyon cliffs.' },
      { day: 3, title: 'Trek Deurali to Annapurna Base Camp (4,130m) via MBC', dest: 'Annapurna Base Camp', altM: 4130, duration: '5 to 6 hours', dist: '11 km', meals: 'B, L, D', desc: 'Climb past Machhapuchhre Base Camp into the heart of the Annapurna Sanctuary. Witness an extraordinary sunset lighting up Annapurna South and the legendary 8,091m south face of Annapurna I.' },
      { day: 4, title: 'Dawn Sunrise at ABC & Trek Down to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '6 to 7 hours', dist: '15 km', meals: 'B, L, D', desc: 'Take in the majestic 360-degree sunrise. After breakfast, make rapid downhill progress back through MBC, Deurali, and Dovan to reach Bamboo.' },
      { day: 5, title: 'Trek Bamboo to Jhinu Danda Hot Springs (1,780m)', dest: 'Jhinu Danda', altM: 1780, duration: '5 hours', dist: '10 km', meals: 'B, L, D', desc: 'Hike uphill to Sinuwa, drop down to Chhomrong river, and climb Chhomrong before dropping to Jhinu Danda. Relax and rejuvenate tired muscles in the natural riverside hot springs.' },
      { day: 6, title: 'Short Walk to Matque & Private Jeep Drive to Pokhara', dest: 'Pokhara', altM: 822, duration: '1 hr walk + 2.5 hrs drive', dist: '3.5 km + drive', meals: 'B, L', desc: 'Walk across the long Jhinu suspension bridge to the jeep station at Matque. Drive back to Pokhara, arriving by early afternoon for leisure and lakeside celebrations.' }
    ],
    faqs: [
      { q: "Who is the Short ABC trek suitable for?", a: "This trek is designed for physically fit individuals who have good stamina and prior hiking experience. Daily walking hours average 6 to 7 hours with steep stone staircase ascents." },
      { q: "Is there enough time to acclimatize on the 6-day route?", a: "Yes, because the highest sleeping elevation is 4,130m (which is lower than Everest Base Camp at 5,364m), fit trekkers who hydrate well and maintain a steady pace adapt successfully. Our guides carry pulse oximeters daily." }
    ]
  },

  // 3. Annapurna Base Camp Trek with Helicopter Return (8 Days)
  {
    slug: 'annapurna-base-camp-heli-return',
    title: 'Annapurna Base Camp Trek with Helicopter Return (8 Days) — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Base Camp Trek with Helicopter Return (8 Days)',
    metaDesc: 'Trek into the Annapurna Sanctuary to ABC (4,130m) and fly back to Pokhara or Kathmandu by chartered helicopter, cutting off 3-4 days of steep downhill descent.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-base-camp-heli-return/',
    duration: '8 days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '4,130 m (13,550 ft)',
    maxAltNum: 4130,
    price: '1,490',
    activity: 'Trekking & Helicopter Flight',
    accommodation: 'Teahouses & Hotel in Pokhara',
    transport: 'Private Vehicle & Chartered Helicopter',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / ABC Helipad',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Helicopter Flyback Upgrade',
    leadText: 'The 8-day Annapurna Base Camp Trek with Helicopter Return is the premier time-saving Himalayan journey, combining the classic trek through Gurung villages and bamboo forests into the 360-degree mountain amphitheater of Annapurna Sanctuary with a thrilling helicopter flight back.',
    highlights: [
      'Gradual 5-day scenic foot approach into the heart of Annapurna Sanctuary',
      'Chartered helicopter flight directly from ABC (4,130m) back to Pokhara Airport',
      'Saves 3 to 4 strenuous days of downhill stone staircase walking',
      'Spectacular aerial panoramas of Annapurna I (8,091m), Fishtail, and Modi Khola gorge',
      'Sunrise views across Annapurna South, Hiunchuli, and Gangapurna',
      'Traditional Gurung cultural immersion in Chhomrong village',
      'Cozy mountain teahouse accommodations and full board trail meals',
      'Luxury hotel stay in Pokhara with leisure time on Phewa Lake'
    ],
    gallery: [
      'annapurna-base-camp-trek-heli-return.webp',
      'annapurna-base-camp-trek-heli-return-cost-itinerary-2027.webp',
      'annapurna-base-camp-trek-heli-return-cost-itinerary-2027-02.webp',
      'annapurna-base-camp-trek.webp',
      'annapurna-base-camp-trek-02.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque (jeep) & Trek to Chhomrong (2,170m)', dest: 'Chhomrong', altM: 2170, duration: '2.5 hrs drive + 5 hrs walk', dist: '9.5 km', meals: 'B, L, D', desc: 'Scenic drive from Pokhara to the Matque trailhead. Begin trekking through beautiful terraced farmlands and cross suspension bridges before climbing up to Chhomrong with grand views of Annapurna South and Fishtail.' },
      { day: 2, title: 'Trek Chhomrong to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '4 to 5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Descend 2,500 stone stairs to Chhomrong Khola, cross the suspension bridge, and climb through dense rhododendron, oak, and bamboo forests to Sinuwa before descending into Bamboo.' },
      { day: 3, title: 'Trek Bamboo to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '5 hours', dist: '9.5 km', meals: 'B, L, D', desc: 'A steady upward trek through the narrowing Modi Khola canyon passing Dovan and Himalayan Hotel. Enter alpine shrub zones near Hinku Cave before reaching our mountain teahouse in Deurali.' },
      { day: 4, title: 'Trek Deurali to Machhapuchhre Base Camp (MBC - 3,700m)', dest: 'Machhapuchhre Base Camp', altM: 3700, duration: '4 to 5 hours', dist: '7 km', meals: 'B, L, D', desc: 'Trek past avalanche-prone chutes with caution. As the gorge opens into the sacred Annapurna Sanctuary, enjoy stunning up-close panoramas of Machhapuchhre (Fishtail), Gangapurna, and Annapurna III.' },
      { day: 5, title: 'Trek MBC to Annapurna Base Camp (ABC - 4,130m)', dest: 'Annapurna Base Camp', altM: 4130, duration: '2 to 3 hours', dist: '4.5 km', meals: 'B, L, D', desc: 'A gentle morning climb into the center of the vast glacial amphitheater. Spend an unforgettable afternoon standing before the south face of Annapurna I (8,091m), Hiunchuli, and Annapurna South.' },
      { day: 6, title: 'Dawn Sunrise at ABC & Charter Helicopter Flight to Pokhara', dest: 'Pokhara', altM: 822, duration: '25 min flight', dist: 'Air', meals: 'B, L', desc: 'Watch golden sunrise light illuminate Annapurna I and the amphitheater peaks. After hot breakfast, board our chartered helicopter for an exhilarating flight back to Pokhara. Rest of day free lakeside.' },
      { day: 7, title: 'Scenic Drive or Flight Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min flight / 6 hr drive', dist: '200 km', meals: 'B, D', desc: 'Return to Kathmandu. Check in to your hotel, explore Thamel for handicraft shopping, and celebrate with an evening farewell dinner hosted by Igloo Himalaya Treks.' },
      { day: 8, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to Tribhuvan International Airport for your flight home, with lifelong memories of your Himalayan adventure.' }
    ],
    faqs: [
      { q: "How does the helicopter return from Annapurna Base Camp work?", a: "On Day 6, after viewing sunrise at ABC, a private chartered helicopter lands directly on the ABC helipad (4,130m). Trekkers board with their luggage and take a 20-25 minute scenic flight back to Pokhara Airport, saving 3 to 4 days of steep downhill descent." },
      { q: "Is altitude sickness a risk on the 8-day heli return trek?", a: "Because you ascend gradually over 5 days on foot (sleeping at Chhomrong, Bamboo, Deurali, and MBC), your body acclimatizes naturally before sleeping at ABC. The fast descent by helicopter actually eliminates altitude risk immediately." }
    ]
  },

  // 4. Annapurna Sanctuary Trek (11 Days)
  {
    slug: 'annapurna-sanctuary-trek',
    title: 'Annapurna Sanctuary Trek (11 Days) — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Sanctuary Trek (11 Days)',
    metaDesc: 'Explore the holy mountain amphitheater of Annapurna Sanctuary (4,130m) via Ghandruk, Chhomrong, and Machhapuchhre Base Camp on an unforgettable 11-day journey.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-sanctuary-trek/',
    duration: '11 days',
    difficulty: 'Moderate',
    maxAlt: '4,130 m (13,550 ft)',
    maxAltNum: 4130,
    price: '920',
    activity: 'Mountain Sanctuary Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle & Tourist Coach',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Jhinu Danda',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Sacred Mountain Amphitheater',
    leadText: 'The Annapurna Sanctuary Trek is the classic 11-day cultural and high-alpine circuit that visits the historic Gurung village of Ghandruk before ascending the forested Modi Khola valley into the revered mountain sanctuary of Annapurna Base Camp (4,130m).',
    highlights: [
      'Comprehensive 11-day loop incorporating Ghandruk Gurung heritage village',
      'Entrance into the holy glacial amphitheater of Annapurna Sanctuary',
      'Panoramic views of 8,091m Annapurna I, Hiunchuli, and Annapurna South',
      'Close-up vantage point from Machhapuchhre Base Camp (MBC - 3,700m)',
      'Traditional village hospitality and Gurung cultural museum in Ghandruk',
      'Soaking in natural geothermal hot springs on the banks of Modi Khola at Jhinu',
      'Walk through fragrant rhododendron, bamboo, and pine woodlands',
      'Safe, gradual altitude ascent with full medical pulse oximeter monitoring'
    ],
    gallery: [
      'annapurna-sanctuary-1983908-1920.webp',
      'annapurna-base-camp-trek.webp',
      'annapurna-base-camp-trek-02.webp',
      'annapurna-base-camp-trek-03.webp',
      'annapurna-base-camp-trek-04.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '6 hrs drive', dist: '200 km', meals: 'B', desc: 'Scenic tourist coach or private vehicle drive across the Trishuli valley to the picturesque city of Pokhara.' },
      { day: 2, title: 'Drive Pokhara to Nayapul & Trek to Ghandruk (1,940m)', dest: 'Ghandruk', altM: 1940, duration: '1.5 hr drive + 5 hrs trek', dist: '9 km', meals: 'B, L, D', desc: 'Drive to Nayapul and hike along the river before climbing stone staircases through terraced fields to the iconic Gurung village of Ghandruk.' },
      { day: 3, title: 'Trek Ghandruk to Chhomrong (2,170m)', dest: 'Chhomrong', altM: 2170, duration: '5 hours', dist: '9 km', meals: 'B, L, D', desc: 'Hike across the Kimrong Khola ridge, dropping to the river and ascending to Chhomrong with grand views of Annapurna South.' },
      { day: 4, title: 'Trek Chhomrong to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '4-5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Descend stone stairs to Chhomrong Khola, cross the bridge, and climb through bamboo and oak forests to Sinuwa before descending to Bamboo.' },
      { day: 5, title: 'Trek Bamboo to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '5 hours', dist: '9.5 km', meals: 'B, L, D', desc: 'Hike through the narrowing Modi Khola gorge past Dovan, Himalayan Hotel, and Hinku Cave up to Deurali.' },
      { day: 6, title: 'Trek Deurali to MBC & Annapurna Base Camp (4,130m)', dest: 'Annapurna Base Camp', altM: 4130, duration: '5-6 hours', dist: '9 km', meals: 'B, L, D', desc: 'Enter the Annapurna Sanctuary past Machhapuchhre Base Camp into the vast glacial basin at ABC under the south face of Annapurna I.' },
      { day: 7, title: 'Sunrise at ABC & Trek Down to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '6 hours', dist: '14 km', meals: 'B, L, D', desc: 'Dawn sunrise over the Annapurna amphitheater. Descend rapidly through MBC and Deurali back to Bamboo.' },
      { day: 8, title: 'Trek Bamboo to Jhinu Danda (1,780m) Hot Springs', dest: 'Jhinu Danda', altM: 1780, duration: '5 hours', dist: '10 km', meals: 'B, L, D', desc: 'Hike to Sinuwa, descend to the river, and climb to Chhomrong before dropping to Jhinu Danda. Relax in the riverside natural hot springs.' },
      { day: 9, title: 'Short Walk to Matque & Drive to Pokhara', dest: 'Pokhara', altM: 820, duration: '1 hr walk + 2.5 hrs drive', dist: '3.5 km + drive', meals: 'B, L', desc: 'Cross the Jhinu suspension bridge to Matque and take private transport back to Pokhara for lakeside leisure.' },
      { day: 10, title: 'Drive or Fly Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '6 hrs drive / 25 min flight', dist: '200 km', meals: 'B, D', desc: 'Return to Kathmandu. Rest, souvenir shopping, and celebratory farewell dinner.' },
      { day: 11, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'B', desc: 'Private vehicle transfer to Tribhuvan International Airport for your flight home.' }
    ],
    faqs: [
      { q: "What is the difference between Annapurna Base Camp and Annapurna Sanctuary?", a: "They refer to the same geographical basin! The 'Annapurna Sanctuary' is the sacred natural amphitheater surrounded by Annapurna peaks, and Annapurna Base Camp (ABC - 4,130m) is the lodge station located right at its heart." },
      { q: "Is Ghandruk included in this itinerary?", a: "Yes! Unlike shorter fast-track routes, this 11-day itinerary visits the famous cultural stone village of Ghandruk on Day 2, allowing for a richer cultural experience." }
    ]
  },

  // 5. Mardi Himal Trek (6 Days)
  {
    slug: 'mardi-himal-trek',
    title: 'Mardi Himal Trek (6 Days) — Alpine Ridge Trail — Igloo Himalaya Treks',
    seoTitle: 'Mardi Himal Trek (6 Days)',
    metaDesc: 'Hike the breathtaking alpine ridge of Mardi Himal (4,250m) in 6 days. Up-close panoramas of Machhapuchhre (Fishtail) and Annapurna South.',
    canonical: 'https://igloohimalayatreks.com/trek/mardi-himal-trek/',
    duration: '6 days',
    difficulty: 'Moderate',
    maxAlt: '4,250 m (13,943 ft)',
    maxAltNum: 4250,
    price: '490',
    activity: 'Panoramic Alpine Ridge Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Kande',
    trekEnds: 'Pokhara / Siding',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Pristine Panoramic Ridge Trail',
    leadText: 'The Mardi Himal Trek is Nepal’s most popular new eco-trail. In just 6 days from Pokhara, you climb out of dense rhododendron forests onto a knife-edge alpine ridge directly beneath Machhapuchhre (Fishtail). Standing at the Upper Viewpoint (4,250m), the sacred peak towers so close you feel as though you can reach out and touch its rocky spires.',
    highlights: [
      'Panoramic ridge-walking high above Modi Khola and Mardi Khola valleys',
      'Jaw-dropping, face-to-face vistas of Machhapuchhre (Fishtail, 6,993m)',
      'Reach the high alpine sanctuary of Mardi Himal Upper Viewpoint (4,250m)',
      'Traverse enchanting moss-draped oak and rhododendron forests on the approach',
      'Watch sunrise over Annapurna South, Hiunchuli, and Mount Annapurna I',
      'Authentic homestay hospitality in traditional Gurung settlement of Siding',
      'Less crowded, peaceful mountain trails compared to main commercial routes',
      'Convenient short duration starting and finishing in Pokhara'
    ],
    gallery: [
      'mardi-himal-trek.webp',
      'mardi-himal-trek-02.webp',
      'abc-with-mardi-himal-trek.webp',
      'trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.webp',
      'machhapuchhre-fishtail-mountain-towering-above-mardi-himal-high-camp-with-colorful-prayer.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Kande & Trek to Forest Camp (2,550m)', dest: 'Forest Camp', altM: 2550, duration: '1 hr drive + 5 hrs trek', dist: '10 km', meals: 'B, L, D', desc: 'Private drive from Pokhara to Kande. Hike past Australian Camp and Pothana into peaceful, moss-draped rhododendron and oak woodlands to Forest Camp (Kokar).' },
      { day: 2, title: 'Trek Forest Camp to Low Camp (2,970m)', dest: 'Low Camp', altM: 2970, duration: '4 to 5 hours', dist: '7.5 km', meals: 'B, L, D', desc: 'Ascend quietly through ancient birch and rhododendron forest. Emerge near Low Camp where views of Fishtail’s rocky pyramid suddenly break through the trees.' },
      { day: 3, title: 'Trek Low Camp to High Camp (3,580m) via Badal Danda', altM: 3580, dest: 'High Camp', duration: '4 to 5 hours', dist: '8 km', meals: 'B, L, D', desc: 'Climb above the tree line onto the open grassy ridge of Badal Danda (Cloud Ridge). Enjoy panoramic 360-degree sweeps across the Annapurna valley to High Camp.' },
      { day: 4, title: 'Sunrise Hike to Mardi Himal Upper Viewpoint (4,250m) & Descend to Badal Danda / Low Camp', dest: 'Low Camp', altM: 4250, duration: '6 to 7 hours', dist: '11 km', meals: 'B, L, D', desc: 'Pre-dawn hike along the narrow alpine ridge to the Upper Viewpoint (4,250m). Experience golden sunrise light striking Machhapuchhre and Annapurna South before descending to Low Camp.' },
      { day: 5, title: 'Trek Low Camp down to Siding Village (1,750m) & Private 4WD Drive to Pokhara', dest: 'Pokhara', altM: 820, duration: '3.5 hrs walk + 2 hrs drive', dist: '6.5 km + drive', meals: 'B, L', desc: 'Take a quiet alternate descent path through shade trees to the traditional farming hamlet of Siding. Board our private 4WD jeep for the scenic ride back to Pokhara.' },
      { day: 6, title: 'Leisure in Pokhara or Transfer Back to Kathmandu', dest: 'Pokhara / Kathmandu', altM: 820, duration: 'Flexible', dist: 'Local', meals: 'B', desc: 'Enjoy relaxing by Phewa Lake, boat to the Barahi Temple, or connect with your transfer back to Kathmandu.' }
    ],
    faqs: [
      { q: "How difficult is the Mardi Himal Trek?", a: "Mardi Himal is rated Moderate. Daily walking times are 4 to 5 hours on well-defined forest and ridge paths. The summit ridge push on Day 4 to 4,250m is steep but non-technical." },
      { q: "Can beginners do the Mardi Himal Trek?", a: "Yes! Trekkers with basic hiking fitness and determination can complete this trek with ease. Because it peaks at 4,250m and you descend the same day, altitude sickness risk is minimal." }
    ]
  },

  // 6. Ghorepani Poon Hill Trek (5 Days)
  {
    slug: 'ghorepani-poon-hill-trek',
    title: 'Ghorepani Poon Hill Trek (5 Days) — Sunrise Viewpoint — Igloo Himalaya Treks',
    seoTitle: 'Ghorepani Poon Hill Trek (5 Days)',
    metaDesc: 'The ultimate 5-day introductory Himalayan trek to Poon Hill (3,210m). Watch the golden sunrise over Dhaulagiri and Annapurna ranges from Pokhara.',
    canonical: 'https://igloohimalayatreks.com/trek/ghorepani-poon-hill-trek/',
    duration: '5 days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,210 m (10,531 ft)',
    maxAltNum: 3210,
    price: '450',
    activity: 'Foothill & Sunrise Trekking',
    accommodation: 'Comfortable Mountain Teahouse Lodges',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-May)',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Ghandruk',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • World-Famous Himalayan Sunrise',
    leadText: 'The Ghorepani Poon Hill Trek is globally renowned as the crown jewel of introductory Himalayan treks. In 5 comfortable days from Pokhara, you climb the stone staircases of Ulleri, hike through giant rhododendron forests, stand atop Poon Hill (3,210m) for sunrise over two 8,000m giants (Dhaulagiri and Annapurna I), and explore the Gurung heritage town of Ghandruk.',
    highlights: [
      'Golden sunrise from Poon Hill (3,210m) over Dhaulagiri (8,167m) and Annapurna I (8,091m)',
      'Breathtaking 360-degree panorama of Annapurna South, Machhapuchhre, and Nilgiri',
      'Trek through the largest blooming rhododendron forest in the world in spring',
      'Climb the famous 3,280 stone steps of Ulleri village through terraced farmland',
      'Rich cultural heritage and museum exploration in traditional stone-paved Ghandruk',
      'Low maximum altitude (3,210m) ensuring zero altitude sickness concerns',
      'Comfortable family-run teahouses with hot showers and warm dining rooms',
      'Perfect short trek for families, children, seniors, and first-time visitors to Nepal'
    ],
    gallery: [
      'ghorepani-poon-hill-trek.webp',
      'ghorepani-poon-hill-trek-02.webp',
      'ghorepani-poon-hill-trek-03.webp',
      'ghorepani-poon-hill-trek-2027-cost-itinerary-and-sunrise.webp',
      'ghorepani-poon-hill-and-mardi-himal-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Nayapul & Trek to Tikhedhunga / Ulleri (2,050m)', dest: 'Ulleri', altM: 2050, duration: '1.5 hr drive + 4-5 hrs walk', dist: '9.5 km', meals: 'B, L, D', desc: 'Scenic private drive to Nayapul. Walk along Modi Khola to Birethanti, follow the Bhurungdi stream past terraced farms, and climb the stone steps up to Ulleri village.' },
      { day: 2, title: 'Trek Ulleri to Ghorepani (2,874m)', dest: 'Ghorepani', altM: 2874, duration: '4 to 5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'A delightful walk under the mossy canopy of oak, pine, and giant rhododendrons. Arrive in the scenic ridge-top village of Ghorepani with spectacular sunset views of Dhaulagiri.' },
      { day: 3, title: 'Sunrise Hike to Poon Hill (3,210m) & Trek to Tadapani (2,630m)', dest: 'Tadapani', altM: 2630, duration: '1 hr hike + 5 hrs trek', dist: '11 km', meals: 'B, L, D', desc: 'Pre-dawn climb to Poon Hill (3,210m) for the world-famous golden sunrise over Dhaulagiri, Annapurna I, Annapurna South, and Fishtail. Return for breakfast and trek through ridge forests to Tadapani.' },
      { day: 4, title: 'Trek Tadapani to Ghandruk (1,940m) & Drive to Pokhara', dest: 'Pokhara', altM: 820, duration: '3 hrs walk + 2.5 hrs drive', dist: '6 km + drive', meals: 'B, L', desc: 'Descend through forested slopes to the historic Gurung settlement of Ghandruk. Tour the local cultural museum and slate houses, then drive back to Pokhara.' },
      { day: 5, title: 'Leisure Day in Pokhara & Return to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '6 hrs drive / 25 min flight', dist: '200 km', meals: 'B', desc: 'Morning relaxation by Phewa Lake followed by private transfer or scenic flight back to Kathmandu.' }
    ],
    faqs: [
      { q: "Is the Poon Hill trek suitable for children and seniors?", a: "Yes! Because the maximum altitude is 3,210m at Poon Hill and the daily stages are manageable, it is the #1 recommended family trek in Nepal." },
      { q: "When is the best time to see blooming rhododendrons?", a: "Spring (March to April) is the peak rhododendron blooming season, turning the hillsides between Ulleri and Ghorepani into a sea of red, pink, and white blossoms." }
    ]
  },

  // 7. Poon Hill & ABC Combo Trek (12 Days)
  {
    slug: 'poon-hill-abc-trek',
    title: 'Poon Hill & ABC Trek (12 Days) — Igloo Himalaya Treks',
    seoTitle: 'Poon Hill & ABC Trek (12 Days)',
    metaDesc: 'Combine the iconic golden sunrise from Poon Hill (3,210m) with the glacial amphitheater of Annapurna Base Camp (4,130m) on a supreme 12-day journey.',
    canonical: 'https://igloohimalayatreks.com/trek/poon-hill-abc-trek/',
    duration: '12 days',
    difficulty: 'Moderate',
    maxAlt: '4,130 m (13,550 ft)',
    maxAltNum: 4130,
    price: '980',
    activity: 'Sunrise & Glacier Combination Trek',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Jhinu Danda',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Ultimate Sunrise & Sanctuary Combo',
    leadText: 'The Poon Hill and Annapurna Base Camp Combo Trek is the definitive Annapurna experience. Instead of choosing between the sweeping sunrise panorama of Poon Hill (3,210m) and the sheer glacial walls of Annapurna Base Camp (4,130m), this complete 12-day itinerary seamlessly unites both.',
    highlights: [
      'Golden dawn sunrise from Poon Hill (3,210m) overlooking Dhaulagiri and Annapurna',
      'Trek deep into the colossal glacial sanctuary at Annapurna Base Camp (4,130m)',
      'Hike through the blooming rhododendron forests of Ghorepani and Tadapani',
      'Breathtaking close-up views of Machhapuchhre (Fishtail) from MBC (3,700m)',
      'Rich cultural encounters in traditional Gurung villages of Ulleri and Chhomrong',
      'Relaxation in natural riverside thermal hot springs at Jhinu Danda',
      'Superior acclimatization profile combining a 3,200m pass before heading to 4,130m',
      'Full-board wholesome meals and comfortable mountain teahouse accommodations'
    ],
    gallery: [
      'ghorepani-poon-hill-trek.webp',
      'annapurna-base-camp-trek.webp',
      'ghorepani-poon-hill-trek-02.webp',
      'annapurna-base-camp-trek-02.webp',
      'annapurna-base-camp-trek-03.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '6 hrs drive', dist: '200 km', meals: 'B', desc: 'Scenic overland drive along the Trishuli River highway to Pokhara. Evening leisure along Phewa Lake.' },
      { day: 2, title: 'Drive Pokhara to Nayapul & Trek to Ulleri (2,050m)', dest: 'Ulleri', altM: 2050, duration: '1.5 hr drive + 5 hrs trek', dist: '9.5 km', meals: 'B, L, D', desc: 'Drive to Nayapul and hike past Birethanti, climbing the stone stairs to Ulleri.' },
      { day: 3, title: 'Trek Ulleri to Ghorepani (2,874m)', dest: 'Ghorepani', altM: 2874, duration: '4 to 5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Walk under dense rhododendron and oak canopies alongside babbling mountain streams to Ghorepani.' },
      { day: 4, title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani (2,630m)', dest: 'Tadapani', altM: 2630, duration: '1 hr hike + 5 hrs trek', dist: '11 km', meals: 'B, L, D', desc: 'Early morning climb to Poon Hill for the golden sunrise over Dhaulagiri and Annapurna. Trek on to Tadapani.' },
      { day: 5, title: 'Trek Tadapani to Chhomrong (2,170m)', dest: 'Chhomrong', altM: 2170, duration: '5 hours', dist: '9.5 km', meals: 'B, L, D', desc: 'Descend to Kimrong Khola and ascend to the hillside village of Chhomrong with grand views of Fishtail.' },
      { day: 6, title: 'Trek Chhomrong to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '4-5 hours', dist: '8.5 km', meals: 'B, L, D', desc: 'Drop down stone stairs to the river and climb through thick bamboo forests to Sinuwa, continuing to Bamboo.' },
      { day: 7, title: 'Trek Bamboo to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '5 hours', dist: '9.5 km', meals: 'B, L, D', desc: 'Hike past Dovan and Himalayan Hotel up the Modi Khola canyon to Deurali.' },
      { day: 8, title: 'Trek Deurali to MBC & Annapurna Base Camp (4,130m)', dest: 'Annapurna Base Camp', altM: 4130, duration: '5-6 hours', dist: '9 km', meals: 'B, L, D', desc: 'Ascend past Machhapuchhre Base Camp into the heart of the Annapurna Sanctuary under Annapurna I.' },
      { day: 9, title: 'Sunrise at ABC & Trek Down to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '6 hours', dist: '14 km', meals: 'B, L, D', desc: 'Dawn golden hour over the south face of Annapurna I. Make rapid descent back to Bamboo.' },
      { day: 10, title: 'Trek Bamboo to Jhinu Danda Hot Springs (1,780m)', dest: 'Jhinu Danda', altM: 1780, duration: '5 hours', dist: '10 km', meals: 'B, L, D', desc: 'Climb to Chhomrong and descend to Jhinu Danda. Soak in the riverside natural thermal hot springs.' },
      { day: 11, title: 'Short Walk to Matque & Private Drive to Pokhara', dest: 'Pokhara', altM: 820, duration: '1 hr walk + 2.5 hrs drive', dist: '3.5 km + drive', meals: 'B, L', desc: 'Cross the Jhinu bridge to Matque and take private transport to Pokhara for celebratory dinner.' },
      { day: 12, title: 'Drive or Fly Pokhara to Kathmandu & Final Departure', dest: 'Home', altM: 1400, duration: 'Return transfer', dist: 'Airport', meals: 'B', desc: 'Return to Kathmandu for international departure flights.' }
    ],
    faqs: [
      { q: "Why choose the Poon Hill + ABC combination?", a: "It provides the best of both worlds: the iconic 360-degree sunrise over Dhaulagiri from Poon Hill, plus the intimate glacial amphitheater experience inside Annapurna Base Camp." },
      { q: "Does the preliminary hike to Poon Hill help with acclimatization for ABC?", a: "Yes, tremendously! Reaching 3,210m at Poon Hill early on prepares your body naturally before entering the higher altitudes of the sanctuary (4,130m)." }
    ]
  }
];

module.exports = {
  annapurnaPackages
};
