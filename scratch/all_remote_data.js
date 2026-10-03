/**
 * Data definitions for Remote Wilderness & Eastern Nepal Trek Packages:
 * 1. kanchenjunga-base-camp-trek (21 Days)
 * 2. kanchenjunga-circuit-trek (22 Days)
 * 3. kanchenjunga-trek-without-flight (24 Days)
 * 4. makalu-base-camp-trek (18 Days)
 * 5. dhaulagiri-circuit-trek (18 Days)
 * 6. rolwaling-valley-trek (15 Days)
 * 7. rara-lake-trek (10 Days)
 * 8. ruby-valley-trek (9 Days)
 */

const remotePackages = [
  // 1. KANCHENJUNGA BASE CAMP TREK (21 DAYS)
  {
    slug: 'kanchenjunga-base-camp-trek',
    title: 'Kanchenjunga Base Camp Trek (21 Days) — Igloo Himalaya Treks',
    seoTitle: 'Kanchenjunga Base Camp Trek (21 Days)',
    metaDesc: 'Embark on a pristine 21-day expedition to Kanchenjunga North (Pangpema, 5,143m) & South Base Camps. Fully guided with authentic teahouse and wilderness logistics.',
    canonical: 'https://igloohimalayatreks.com/trek/kanchenjunga-base-camp-trek/',
    duration: '21 Days',
    difficulty: 'Strenuous Wilderness',
    maxAlt: '5,143 m / 16,873 ft',
    maxAltNum: 5143,
    transport: 'Domestic Flights & Private 4WD Jeep',
    region: 'Kanchenjunga Conservation Area',
    price: '2,390',
    heroBadge: 'Eastern Nepal • Dual Base Camp Wilderness Trek',
    accommodation: 'Authentic Mountain Lodges & Teahouses',
    gallery: [
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp',
      'kanchenjunga-circuit-trek-in-eastern-nepal.webp',
      'glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp',
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp'
    ],
    highlights: [
      'Trek to both North (Pangpema, 5,143m) and South (Oktang, 4,580m) Base Camps of the world’s third-highest peak.',
      'Traverse remote alpine valleys untouched by modern commercial tourism along the Sikkim and Tibet borders.',
      'Cross high alpine passes including Sele La (4,290m), Sinion La (4,440m), and Mirgin La (4,480m) with jaw-dropping views.',
      'Encounter authentic Sherpa, Tibetan refugee, Limbu, and Rai indigenous mountain culture.',
      'Explore Kanchenjunga Conservation Area, a sanctuary for snow leopards, red pandas, and Himalayan black bears.',
      'Experience the lush cardamom hills and tea gardens of eastern Nepal before entering glacial cirques.'
    ],
    faqs: [
      {
        q: 'How fit do I need to be for the Kanchenjunga Base Camp Trek?',
        a: 'The 21-day Kanchenjunga Base Camp Trek is rated strenuous. Trekkers should have previous multi-day high-altitude trekking experience, excellent cardiovascular stamina, and the ability to hike 6 to 8 hours daily over rugged moraines and steep pass crossings.'
      },
      {
        q: 'What permits are required for Kanchenjunga trekking?',
        a: 'You require the Kanchenjunga Restricted Area Permit (RAP) and the Kanchenjunga Conservation Area Project (KCAP) entry permit. Solo trekking is prohibited; a minimum of two trekkers accompanied by a government-licensed guide is mandatory.'
      },
      {
        q: 'What accommodation and food can I expect on this remote route?',
        a: 'Accommodation consists of rustic, family-run teahouses and basic lodges in higher villages. Meals are home-cooked, hearty, and fresh, featuring Dal Bhat, momos, noodle soups, potatoes, Tibetan bread, and seasonal local vegetables.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Bhadrapur & Drive to Phidim', dest: 'Phidim', altM: 1200, duration: '45 min flight + 5 hrs drive', dist: '120 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Board a scenic morning flight to Bhadrapur in eastern Nepal with sweeping Himalayan vistas. Meet your crew and drive through rolling cardamom plantations and tea terraces to Phidim.' },
      { day: 2, title: 'Drive Phidim to Taplejung & Sekathum', dest: 'Sekathum', altM: 1640, duration: '6-7 hrs 4WD', dist: '65 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Drive through Taplejung bazaar, descending toward the Tamor and Kabeli rivers to Sekathum, the traditional trailhead of the Kanchenjunga Conservation Area.' },
      { day: 3, title: 'Trek Sekathum to Amjilosa', dest: 'Amjilosa', altM: 2498, duration: '5-6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross suspension bridges over the thundering Ghunsa Khola and climb stone staircases through dense bamboo, oak, and rhododendron forests to the Tibetan village of Amjilosa.' },
      { day: 4, title: 'Trek Amjilosa to Gyabla (Kyapra)', dest: 'Gyabla', altM: 2725, duration: '5 hrs', dist: '9.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike through moss-covered temperate forest past cascading waterfalls and deep river canyons to the scenic settlement of Gyabla.' },
      { day: 5, title: 'Trek Gyabla to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '5-6 hrs', dist: '11.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk past Phale, a historic Tibetan carpet-weaving community, and ascend through pine woods to Ghunsa, the principal trading hub of the northern valley.' },
      { day: 6, title: 'Acclimatization Hike in Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Spend an acclimatization day taking a conditioning hike up the southern ridge toward Yamatari Glacier with stunning vistas of Mount Jannu.' },
      { day: 7, title: 'Trek Ghunsa to Kambachen', dest: 'Kambachen', altM: 4145, duration: '5-6 hrs', dist: '10.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend above the tree line along lateral moraines. The colossal north face of Mount Jannu (7,710m) looms dramatically ahead as you arrive in Kambachen.' },
      { day: 8, title: 'Acclimatization Day at Kambachen', dest: 'Kambachen', altM: 4145, duration: '3-4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike toward the Jannu North Face base camp area or explore the Nupchu Khola valley to ensure healthy acclimatization before ascending to Lhonak.' },
      { day: 9, title: 'Trek Kambachen to Lhonak', dest: 'Lhonak', altM: 4792, duration: '5-6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse glacial debris and river beds to the broad sandy alpine plateau of Lhonak, surrounded by Wedge Peak, Tent Peak, and towering icy ramparts.' },
      { day: 10, title: 'Trek to Kanchenjunga North Base Camp (Pangpema, 5,143m) & Back to Lhonak', dest: 'Lhonak', altM: 5143, duration: '6-7 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike along the Kanchenjunga Glacier to Pangpema (5,143m). Gaze directly at the monumental North Face of Mount Kanchenjunga (8,586m) before descending back to Lhonak.' },
      { day: 11, title: 'Trek Lhonak down to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '6-7 hrs', dist: '18 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace your footsteps downhill past Kambachen to Ghunsa, returning to warmer air, rich oxygen, and hot meals.' },
      { day: 12, title: 'Trek Ghunsa to Sele La High Camp', dest: 'Sele La Camp', altM: 4290, duration: '5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Leave the northern valley and head southeast through stunted juniper and dwarf rhododendron up to Sele La High Camp beneath rugged rocky towers.' },
      { day: 13, title: 'Cross Sele La (4,290m), Sinion La (4,440m) & Mirgin La (4,480m) to Tseram', dest: 'Tseram', altM: 3868, duration: '7-8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'An epic high-altitude traverse crossing Sele La, Sinion La, and Mirgin La passes with vistas extending to Makalu and Baruntse before descending to Tseram.' },
      { day: 14, title: 'Excursion to Kanchenjunga South Base Camp (Oktang, 4,580m) & Return to Tseram', dest: 'Tseram', altM: 4580, duration: '6-7 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Ramche along the lateral moraine of the Yalung Glacier to Oktang viewpoint for majestic panoramas of Kanchenjunga South Face and frozen cirques.' },
      { day: 15, title: 'Trek Tseram down to Tortong', dest: 'Tortong', altM: 2980, duration: '5-6 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through dense rhododendron and Himalayan pine forests along the rushing Simbua Khola to the tranquil campsite at Tortong.' },
      { day: 16, title: 'Trek Tortong to Yamphudin via Lasiya Bhanjyang (3,310m)', dest: 'Yamphudin', altM: 1690, duration: '6-7 hrs', dist: '12.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb steeply through mossy woods over Lasiya Bhanjyang Pass before dropping into Yamphudin, a charming village home to Sherpa, Limbu, and Gurung communities.' },
      { day: 17, title: 'Trek Yamphudin to Khebang', dest: 'Khebang', altM: 1910, duration: '5-6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk past lush agrarian valleys, terraced paddy fields, and traditional thatch-roofed farmhouses to Khebang.' },
      { day: 18, title: 'Trek Khebang to Khandembe & Drive to Ilam', dest: 'Ilam', altM: 1600, duration: '4 hrs trek + 5 hrs drive', dist: '65 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Complete the final trekking leg to Khandembe, meet private 4WD vehicles, and drive to the scenic tea garden town of Ilam.' },
      { day: 19, title: 'Drive Ilam to Bhadrapur & Fly to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '3 hrs drive + 45 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Drive down to Bhadrapur Airport and take a scenic flight back to Kathmandu. Transfer to your hotel for a hot shower and rest.' },
      { day: 20, title: 'Contingency / Buffer Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'A buffer day for any weather-related flight delays in eastern Nepal, with leisure time for Kathmandu sightseeing and a farewell cultural dinner.' },
      { day: 21, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your flight home, concluding an unforgettable 21-day Himalayan expedition.' }
    ]
  },

  // 2. KANCHENJUNGA CIRCUIT TREK (22 DAYS)
  {
    slug: 'kanchenjunga-circuit-trek',
    title: 'Kanchenjunga Circuit Trek (22 Days) — Igloo Himalaya Treks',
    seoTitle: 'Kanchenjunga Circuit Trek (22 Days)',
    metaDesc: 'Complete the full 22-day Kanchenjunga Circuit Trek across eastern Nepal, crossing Mirgin La (4,480m) to both Pangpema North and Oktang South Base Camps.',
    canonical: 'https://igloohimalayatreks.com/trek/kanchenjunga-circuit-trek/',
    duration: '22 Days',
    difficulty: 'Strenuous Wilderness Circuit',
    maxAlt: '5,143 m / 16,873 ft',
    maxAltNum: 5143,
    transport: 'Domestic Flights & Private 4WD Jeep',
    region: 'Kanchenjunga Conservation Area',
    price: '2,490',
    heroBadge: 'Eastern Nepal • The Ultimate Wilderness Grand Circuit',
    accommodation: 'Mountain Lodges & Rustic Teahouses',
    gallery: [
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp',
      'kanchenjunga-circuit-trek-in-eastern-nepal.webp',
      'glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp',
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-03.webp'
    ],
    highlights: [
      'The comprehensive 22-day grand circuit encircling the giant massifs of Kanchenjunga (8,586m) and Jannu (7,710m).',
      'Twin base camp explorations at Pangpema (North BC 5,143m) and Oktang (South BC 4,580m).',
      'Traverse three panoramic high passes in a single day: Sele La (4,290m), Sinion La (4,440m), and Mirgin La (4,480m).',
      'Pristine wilderness with exceptional bio-diversity inside the Kanchenjunga Conservation Area.',
      'Cultural immersion in remote Limbu, Rai, and Tibetan-descendant Sherpa villages.',
      'Unwind in the emerald tea estates of Ilam before flying back to Kathmandu.'
    ],
    faqs: [
      {
        q: 'What is the difference between Kanchenjunga Circuit and Base Camp?',
        a: 'The Circuit trek includes additional days crossing high wilderness pass ridges and traversing between the northern and southern river systems, ensuring a complete circular journey around the massif with two full acclimatization stages.'
      },
      {
        q: 'How cold does it get on the Kanchenjunga Circuit Trek?',
        a: 'At high camps like Lhonak (4,792m) and Pangpema (5,143m), nighttime temperatures frequently dip between -10°C and -15°C in autumn and spring. A 4-season (-20°C) sleeping bag and warm down jacket are essential.'
      },
      {
        q: 'Is electricity and charging available on this route?',
        a: 'Electricity is generated via small solar panels in high teahouses. Charging fees apply (typically $2 to $4 per device), and power may be limited on cloudy days. Carrying two high-capacity power banks is strongly recommended.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Bhadrapur & Drive to Phidim', dest: 'Phidim', altM: 1200, duration: '45 min flight + 5 hrs drive', dist: '120 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Morning flight from Kathmandu to Bhadrapur in eastern Nepal with panoramic Himalayan vistas. Drive through scenic tea-cloaked hills to Phidim.' },
      { day: 2, title: 'Drive Phidim to Taplejung & Sekathum', dest: 'Sekathum', altM: 1640, duration: '6 to 7 hrs drive', dist: '65 km', meals: 'Breakfast, Lunch, Dinner', desc: '4WD overland drive down to the Kabeli and Tamor River confluence to reach Sekathum, the gateway to Kanchenjunga.' },
      { day: 3, title: 'Trek Sekathum to Amjilosa', dest: 'Amjilosa', altM: 2498, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross suspension bridges over the Ghunsa Khola and climb narrow stone trails cut into the river gorge to Amjilosa.' },
      { day: 4, title: 'Trek Amjilosa to Gyabla', dest: 'Gyabla', altM: 2725, duration: '5 hrs', dist: '9.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike through bamboo and rhododendron forests past waterfalls to Gyabla, where alpine scenery unfolds.' },
      { day: 5, title: 'Trek Gyabla to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '5 to 6 hrs', dist: '11.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the river through Phale village with its ancient Tibetan monastery, gently climbing to the Sherpa settlement of Ghunsa.' },
      { day: 6, title: 'Acclimatization Day in Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '3 to 4 hrs hike', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Crucial acclimatization day. Hike the southern ridge toward Yamatari Glacier for spectacular views of Jannu.' },
      { day: 7, title: 'Trek Ghunsa to Kambachen', dest: 'Kambachen', altM: 4145, duration: '5 to 6 hrs', dist: '10.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter the alpine zone along glacial moraines. The towering granite north face of Mount Jannu (7,710m) emerges.' },
      { day: 8, title: 'Acclimatization Hike at Kambachen', dest: 'Kambachen', altM: 4145, duration: '3 to 4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike toward Jannu North Face Base Camp to aid acclimatization before ascending to Lhonak.' },
      { day: 9, title: 'Trek Kambachen to Lhonak', dest: 'Lhonak', altM: 4792, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross lateral moraines to reach Lhonak, a desolate high-altitude settlement beneath giant icy walls.' },
      { day: 10, title: 'Excursion to Kanchenjunga North Base Camp (Pangpema, 5,143m)', dest: 'Lhonak', altM: 5143, duration: '6 to 7 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along Kanchenjunga Glacier to Pangpema (5,143m) for an awe-inspiring view of Kanchenjunga North Face before returning to Lhonak.' },
      { day: 11, title: 'Trek Lhonak down to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '6 to 7 hrs', dist: '18 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Kambachen back to Ghunsa for warmer temperatures and comfortable teahouses.' },
      { day: 12, title: 'Trek Ghunsa to Sele La High Camp', dest: 'Sele La Camp', altM: 4290, duration: '5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend through juniper forests to Sele La High Camp beneath rugged rocky spires.' },
      { day: 13, title: 'Cross Sele La (4,290m), Sinion La (4,440m) & Mirgin La (4,480m) to Tseram', dest: 'Tseram', altM: 3868, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'A stunning triple-pass day with vistas extending to Makalu and Baruntse, descending to Tseram.' },
      { day: 14, title: 'Excursion to Kanchenjunga South Base Camp (Oktang, 4,580m)', dest: 'Tseram', altM: 4580, duration: '6 to 7 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend alongside Yalung Glacier to Oktang viewpoint for close-up views of the South Face cirque, returning to Tseram.' },
      { day: 15, title: 'Trek Tseram down to Tortong', dest: 'Tortong', altM: 2980, duration: '5 to 6 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the Simbua Khola gorge downhill through pristine rhododendron and pine forests to Tortong.' },
      { day: 16, title: 'Trek Tortong to Yamphudin via Lasiya Bhanjyang (3,310m)', dest: 'Yamphudin', altM: 1690, duration: '6 to 7 hrs', dist: '12.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb through dense forests over Lasiya Bhanjyang Pass and descend into the vibrant multi-ethnic village of Yamphudin.' },
      { day: 17, title: 'Trek Yamphudin to Khebang', dest: 'Khebang', altM: 1910, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse rolling green agricultural terraces and cardamom plantations down to Khebang.' },
      { day: 18, title: 'Trek Khebang to Khandembe / Meduwa', dest: 'Khandembe', altM: 1420, duration: '5 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final day on trail hiking through traditional Limbu villages to meet the roadhead at Khandembe.' },
      { day: 19, title: 'Drive Khandembe to Ilam Tea Gardens', dest: 'Ilam', altM: 1600, duration: '6 to 7 hrs drive', dist: '110 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Board private 4WD vehicles and drive through the tea-carpeted rolling hills of Ilam to relax in comfort.' },
      { day: 20, title: 'Drive Ilam to Bhadrapur & Fly to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '3 hrs drive + 45 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Drive down to Bhadrapur Airport and fly back to Kathmandu, transferring to your hotel.' },
      { day: 21, title: 'Reserve Buffer Day & Kathmandu Sightseeing', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Contingency day for flight delays, with an evening celebratory farewell Nepali dinner.' },
      { day: 22, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your international flight home.' }
    ]
  },

  // 3. KANCHENJUNGA TREK WITHOUT FLIGHT (24 DAYS)
  {
    slug: 'kanchenjunga-trek-without-flight',
    title: 'Kanchenjunga Trek Without Flight (24 Days) — Igloo Himalaya Treks',
    seoTitle: 'Kanchenjunga Trek Without Flight (24 Days)',
    metaDesc: 'Experience the 24-day 100% overland Kanchenjunga Circuit Trek by private 4WD jeep via BP Highway and Ilam tea gardens, eliminating domestic flight delays.',
    canonical: 'https://igloohimalayatreks.com/trek/kanchenjunga-trek-without-flight/',
    duration: '24 Days',
    difficulty: 'Strenuous Overland Expedition',
    maxAlt: '5,143 m / 16,873 ft',
    maxAltNum: 5143,
    transport: 'Private 4WD Overland Jeep (No Flights)',
    region: 'Kanchenjunga Conservation Area',
    price: '2,350',
    heroBadge: 'Eastern Nepal • 100% Overland Adventure',
    accommodation: 'Mountain Lodges, Teahouses & Hotels',
    gallery: [
      'kanchenjunga-trek-without-flight-scenic-overland-trek.webp',
      'kanchenjunga-circuit-trek-without-flight.webp',
      'kanchenjunga-circuit-trek-without-flight-02.webp',
      'kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp',
      'kanchenjunga-circuit-trek-without-flight-03.webp',
      'kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp'
    ],
    highlights: [
      '100% overland expedition with zero domestic flight risks or weather cancellations.',
      'Scenic private 4WD drive across the engineered BP Highway and eastern Terai lowlands.',
      'Explore the world-famous emerald rolling tea gardens of Ilam and Kanyam.',
      'Trek to both Pangpema (North BC 5,143m) and Oktang (South BC 4,580m).',
      'Cross the challenging high passes of Sele La, Sinion La, and Mirgin La (4,480m).',
      'Authentic immersion in untouched Limbu, Rai, and Tibetan-descendant communities.'
    ],
    faqs: [
      {
        q: 'Why choose the Kanchenjunga Trek Without Flight?',
        a: 'Eastern Nepal flights into Bhadrapur or Suketar are occasionally prone to monsoon or weather delays. Travelling by private 4WD overland guarantees your departure and arrival schedule while letting you experience rural Nepal from the Terai to the high Himalayas.'
      },
      {
        q: 'What kind of vehicles are used for the overland drive?',
        a: 'We use reliable, air-conditioned 4WD Toyota Hilux, Scorpio, or Land Cruiser jeeps with experienced mountain drivers, ensuring comfort and safety across winding hill roads.'
      },
      {
        q: 'Is the itinerary paced comfortably for the long road trip?',
        a: 'Yes. The drive is broken up into scenic segments with overnight lodge and hotel stops in Ilam, Sindhuli, and Phidim, making the journey enjoyable and culturally rewarding.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Scenic 4WD Drive Kathmandu to Ilam via BP Highway', dest: 'Ilam', altM: 1600, duration: '8 to 9 hrs drive', dist: '380 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Drive through the Sun Koshi River valley on the BP Highway into eastern Nepal, arriving in the rolling tea hills of Ilam.' },
      { day: 2, title: 'Drive Ilam to Phidim, Taplejung & Sekathum', dest: 'Sekathum', altM: 1640, duration: '6 to 7 hrs drive', dist: '135 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Overland 4WD drive through Taplejung town down to Sekathum, the trailhead of Kanchenjunga Conservation Area.' },
      { day: 3, title: 'Trek Sekathum to Amjilosa', dest: 'Amjilosa', altM: 2498, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross suspension bridges over Ghunsa Khola and ascend stone gorges into the Tibetan-influenced village of Amjilosa.' },
      { day: 4, title: 'Trek Amjilosa to Gyabla', dest: 'Gyabla', altM: 2725, duration: '5 hrs', dist: '9.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek through lush rhododendron and bamboo forests past cascading waterfalls to Gyabla.' },
      { day: 5, title: 'Trek Gyabla to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '5 to 6 hrs', dist: '11.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Pass through the Tibetan settlement of Phale and climb gently to Ghunsa, the main valley village.' },
      { day: 6, title: 'Acclimatization Day at Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '3 to 4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike toward Yamatari Glacier to acclimatize while soaking in views of Mount Jannu.' },
      { day: 7, title: 'Trek Ghunsa to Kambachen', dest: 'Kambachen', altM: 4145, duration: '5 to 6 hrs', dist: '10.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past the tree line along lateral moraines with breathtaking close-ups of Jannu (7,710m).' },
      { day: 8, title: 'Acclimatization Hike at Kambachen', dest: 'Kambachen', altM: 4145, duration: '3 to 4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Active acclimatization hike toward Jannu North Face Base Camp before pushing to higher elevations.' },
      { day: 9, title: 'Trek Kambachen to Lhonak', dest: 'Lhonak', altM: 4792, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse glacial moraines to reach Lhonak, surrounded by colossal Himalayan peaks.' },
      { day: 10, title: 'Excursion to Kanchenjunga North Base Camp (Pangpema, 5,143m)', dest: 'Lhonak', altM: 5143, duration: '6 to 7 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Stand before the monumental North Face of Mount Kanchenjunga (8,586m) at Pangpema before descending to Lhonak.' },
      { day: 11, title: 'Trek Lhonak down to Ghunsa', dest: 'Ghunsa', altM: 3415, duration: '6 to 7 hrs', dist: '18 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Kambachen back to Ghunsa for warmer temperatures and fresh food.' },
      { day: 12, title: 'Trek Ghunsa to Sele La High Camp', dest: 'Sele La Camp', altM: 4290, duration: '5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend through juniper forests into the high pass corridor at Sele La High Camp.' },
      { day: 13, title: 'Cross Sele La (4,290m), Sinion La (4,440m) & Mirgin La (4,480m) to Tseram', dest: 'Tseram', altM: 3868, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse the dramatic high pass trio with views of Makalu, descending to Tseram.' },
      { day: 14, title: 'Excursion to Kanchenjunga South Base Camp (Oktang, 4,580m)', dest: 'Tseram', altM: 4580, duration: '6 to 7 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike along Yalung Glacier to Oktang viewpoint for majestic views of Kanchenjunga South Face, returning to Tseram.' },
      { day: 15, title: 'Trek Tseram to Tortong', dest: 'Tortong', altM: 2980, duration: '5 to 6 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend along Simbua Khola through rhododendron and fir forests to Tortong.' },
      { day: 16, title: 'Trek Tortong to Yamphudin via Lasiya Bhanjyang (3,310m)', dest: 'Yamphudin', altM: 1690, duration: '6 to 7 hrs', dist: '12.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb through lush forests over Lasiya Bhanjyang Pass down into Yamphudin village.' },
      { day: 17, title: 'Trek Yamphudin to Khebang', dest: 'Khebang', altM: 1910, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk through terraced agrarian foothills and traditional Limbu villages to Khebang.' },
      { day: 18, title: 'Trek Khebang to Khandembe / Meduwa', dest: 'Khandembe', altM: 1420, duration: '5 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final trekking day descending to the roadhead at Khandembe/Meduwa.' },
      { day: 19, title: 'Drive Khandembe to Ilam Tea Gardens', dest: 'Ilam', altM: 1600, duration: '6 to 7 hrs drive', dist: '110 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Board private 4WD jeeps and drive back to the tranquil tea estates of Ilam.' },
      { day: 20, title: 'Relaxation Day in Ilam & Kanyam Tea Gardens', dest: 'Ilam', altM: 1600, duration: 'Leisure day', dist: 'Local explore', meals: 'Breakfast, Lunch, Dinner', desc: 'Tour heritage tea factories, walk through Kanyam gardens, and soak in low-altitude mountain vistas.' },
      { day: 21, title: 'Overland 4WD Drive Ilam to Sindhuli', dest: 'Sindhuli', altM: 800, duration: '6 to 7 hrs drive', dist: '240 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Drive along the East-West Highway into the historic hill town of Sindhuli.' },
      { day: 22, title: 'Drive Sindhuli to Kathmandu via BP Highway', dest: 'Kathmandu', altM: 1400, duration: '5 to 6 hrs drive', dist: '140 km', meals: 'Breakfast, Lunch', desc: 'Conclude the overland road trip along the scenic BP Highway, arriving back in Kathmandu.' },
      { day: 23, title: 'Rest & Buffer Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Full free day in Kathmandu for shopping, sightseeing, and celebratory farewell dinner.' },
      { day: 24, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your return flight home.' }
    ]
  },

  // 4. MAKALU BASE CAMP TREK (18 DAYS)
  {
    slug: 'makalu-base-camp-trek',
    title: 'Makalu Base Camp Trek (18 Days) — Igloo Himalaya Treks',
    seoTitle: 'Makalu Base Camp Trek (18 Days)',
    metaDesc: 'Venture into the wild Barun Valley to Makalu Base Camp (4,870m). An 18-day wilderness trek beneath the world’s fifth-highest peak with certified Sherpa guides.',
    canonical: 'https://igloohimalayatreks.com/trek/makalu-base-camp-trek/',
    duration: '18 Days',
    difficulty: 'Strenuous High-Alpine',
    maxAlt: '5,250 m / 17,224 ft',
    maxAltNum: 5250,
    transport: 'Domestic Flights & 4WD Mountain Transfers',
    region: 'Makalu-Barun National Park',
    price: '2,190',
    heroBadge: 'Eastern Nepal • The Untamed Barun Valley Sanctuary',
    accommodation: 'Wilderness Lodges & Teahouses',
    gallery: [
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp',
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp',
      'hero-himalayas.webp',
      'gallery-peak.webp'
    ],
    highlights: [
      'Stand directly beneath the sheer South Face of Mount Makalu (8,481m), the fifth-highest mountain on Earth.',
      'Trek through the untouched Barun River Valley, renowned for sheer granite cliffs and hanging glaciers.',
      'Cross high alpine passes including Shipton La (4,200m) and Keke La (4,170m) with sweeping views.',
      'Explore Makalu-Barun National Park, home to rare snow leopards, red pandas, and 400+ bird species.',
      'Witness stunning vistas of Everest, Lhotse, Chamlang, and Baruntse from high viewpoints.',
      'Authentic teahouse experience far away from the commercial crowds of popular trekking routes.'
    ],
    faqs: [
      {
        q: 'How difficult is the Makalu Base Camp Trek?',
        a: 'Makalu Base Camp is one of Nepal’s more challenging teahouse treks. It involves steep ascents over stone staircases, crossing high passes, and navigating rocky glacial moraines above 4,800m. Prior trekking experience and strong stamina are required.'
      },
      {
        q: 'What permits are required for Makalu Base Camp?',
        a: 'You require the Makalu-Barun National Park Entry Permit and Makalu Rural Municipality permit. TIMS card registration is also managed by our team.'
      },
      {
        q: 'What is the best season to trek to Makalu Base Camp?',
        a: 'The optimal seasons are Autumn (October to November) for crystal-clear skies and crisp air, and Spring (April to May) when the rhododendron and alpine flora are in full bloom.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Tumlingtar & Drive to Num', dest: 'Num', altM: 1560, duration: '45 min flight + 4 hrs drive', dist: '40 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Board a morning flight from Kathmandu to Tumlingtar in the Arun Valley. Meet your crew and drive by 4WD jeep up along ridge roads to Num village.' },
      { day: 2, title: 'Trek Num to Seduwa', dest: 'Seduwa', altM: 1500, duration: '5 to 6 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend steeply through subtropical forests to the Arun River suspension bridge, then climb terraced slopes to Seduwa, the park checkpoint.' },
      { day: 3, title: 'Trek Seduwa to Tashigaon', dest: 'Tashigaon', altM: 2100, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb gently through cardamom groves, bamboo forests, and traditional Sherpa settlements to Tashigaon, the last permanent village on the route.' },
      { day: 4, title: 'Trek Tashigaon to Khongma Danda', dest: 'Khongma Danda', altM: 3500, duration: '6 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend steeply through dense mossy forests of rhododendron and oak, emerging onto the high crest of Khongma Danda with sweeping mountain views.' },
      { day: 5, title: 'Acclimatization Day at Khongma Danda', dest: 'Khongma Danda', altM: 3500, duration: '3 to 4 hrs', dist: '4 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Crucial acclimatization day. Take a conditioning hike to prepare for tomorrow’s multiple pass crossings over 4,000m.' },
      { day: 6, title: 'Cross Shipton La (4,200m) & Keke La (4,170m) to Debotay (Mumbuk)', dest: 'Debotay', altM: 3540, duration: '7 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Ghungru La, Shipton La, and Keke La with stunning vistas of Chamlang and Kanchenjunga before descending into the Barun Valley at Debotay.' },
      { day: 7, title: 'Trek Debotay to Yangle Kharka', dest: 'Yangle Kharka', altM: 3557, duration: '6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk through the dramatic Barun River gorge beneath towering vertical granite walls and thundering waterfalls to the alpine meadows of Yangle Kharka.' },
      { day: 8, title: 'Trek Yangle Kharka to Langmale Kharka', dest: 'Langmale Kharka', altM: 4410, duration: '5 to 6 hrs', dist: '10.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb steadily past Buddhist prayer flags and grazing pastures of yaks. The gigantic pyramid of Makalu begins to dominate the horizon.' },
      { day: 9, title: 'Trek Langmale Kharka to Makalu Base Camp', dest: 'Makalu Base Camp', altM: 4870, duration: '5 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek across glacial moraines alongside the Barun Glacier, arriving at Makalu Base Camp directly beneath the magnificent granite South Face of Makalu (8,481m).' },
      { day: 10, title: 'Exploration Day at Makalu Base Camp & Barun Glacier (5,250m)', dest: 'Makalu Base Camp', altM: 5250, duration: '5 to 6 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike up to the ridge viewpoints overlooking the Barun Glacier, Makalu South Face, Everest, and Lhotse’s rarely seen eastern face.' },
      { day: 11, title: 'Trek Makalu Base Camp down to Yangle Kharka', dest: 'Yangle Kharka', altM: 3557, duration: '6 to 7 hrs', dist: '19.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace your steps down the Barun Valley past Langmale Kharka back to the sheltered meadows of Yangle Kharka.' },
      { day: 12, title: 'Trek Yangle Kharka to Debotay (Mumbuk)', dest: 'Debotay', altM: 3540, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk through rhododendron and pine forests along the rushing river to Debotay at the foot of the passes.' },
      { day: 13, title: 'Cross Keke La & Shipton La to Khongma Danda', dest: 'Khongma Danda', altM: 3500, duration: '6 to 7 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend back over Shipton La and Keke La passes, enjoying a final panoramic sweep of the eastern Himalayas before resting at Khongma.' },
      { day: 14, title: 'Trek Khongma Danda down to Tashigaon & Seduwa', dest: 'Seduwa', altM: 1500, duration: '6 to 7 hrs', dist: '18 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through dense mossy forests to Tashigaon and continue to Seduwa in the warm Arun Valley.' },
      { day: 15, title: 'Trek Seduwa to Num & Drive to Tumlingtar', dest: 'Tumlingtar', altM: 510, duration: '4 hrs trek + 4 hrs drive', dist: '49 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to the Arun River, climb to Num, and board a 4WD vehicle driving back down to the Tumlingtar plateau.' },
      { day: 16, title: 'Fly Tumlingtar to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '45 min flight', dist: 'Air', meals: 'Breakfast', desc: 'Fly back to Kathmandu, transfer to your hotel, and enjoy a hot shower and evening at leisure.' },
      { day: 17, title: 'Contingency & Kathmandu Exploration Day', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Buffer day for mountain flight schedules, followed by an evening celebratory farewell Nepali dinner.' },
      { day: 18, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your homeward flight.' }
    ]
  },

  // 5. DHAULAGIRI CIRCUIT TREK (18 DAYS)
  {
    slug: 'dhaulagiri-circuit-trek',
    title: 'Dhaulagiri Circuit Trek (18 Days) — Igloo Himalaya Treks',
    seoTitle: 'Dhaulagiri Circuit Trek (18 Days)',
    metaDesc: 'Conquer the rugged 18-day Dhaulagiri Circuit Trek. Cross French Col (5,360m) and Dhampus Pass (5,244m) through the Hidden Valley with certified Sherpa guides.',
    canonical: 'https://igloohimalayatreks.com/trek/dhaulagiri-circuit-trek/',
    duration: '18 Days',
    difficulty: 'Challenging to Strenuous',
    maxAlt: '5,360 m / 17,585 ft',
    maxAltNum: 5360,
    transport: 'Private Overland 4WD & Domestic Flight',
    region: 'Dhaulagiri & Mustang',
    price: '2,290',
    heroBadge: 'Western Nepal • High-Pass Glacial Wilderness Circuit',
    accommodation: 'Teahouses & High Wilderness Alpine Camps',
    gallery: [
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp',
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-04.webp',
      'hero-himalayas.webp',
      'gallery-peak.webp'
    ],
    highlights: [
      'Encircling Mount Dhaulagiri I (8,167m), the seventh-highest mountain in the world.',
      'Traverse high glacial environments at Italian Base Camp (3,660m) and Dhaulagiri Base Camp (4,748m).',
      'Cross two dramatic passes over 5,200m: French Col (5,360m) and Dhampus Pass (5,244m).',
      'Explore the legendary, desolate, and snow-sculpted Hidden Valley (5,140m).',
      'Transition from lush Magar agrarian foothills to Arctic glacial moraines and arid Mustang valleys.',
      'Descend to the apple orchards of Marpha and Jomsom in the Kali Gandaki Gorge.'
    ],
    faqs: [
      {
        q: 'How challenging is the Dhaulagiri Circuit Trek?',
        a: 'The Dhaulagiri Circuit is one of Nepal’s most demanding wilderness routes. It requires traversing active glaciers, walking on moraine and scree slopes, and spending multiple days above 5,000m in remote camps. Excellent fitness and prior alpine trekking experience are mandatory.'
      },
      {
        q: 'Do I need mountaineering equipment for the French Pass?',
        a: 'Standard mountaineering boots, crampons or microspikes, and trekking poles are required for snow and ice sections across French Col and Dhampus Pass. Our team provides group safety equipment and satellite communication.'
      },
      {
        q: 'What permits are needed for the Dhaulagiri Circuit?',
        a: 'You require the Annapurna Conservation Area Project (ACAP) permit, TIMS card, and local area registrations in Myagdi and Mustang districts.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Pokhara & Beni / Darbang', dest: 'Darbang', altM: 1180, duration: '8 to 9 hrs drive', dist: '280 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Scenic drive from Kathmandu past Pokhara along the Myagdi River to the trailhead town of Darbang.' },
      { day: 2, title: 'Trek Darbang to Dharapani', dest: 'Dharapani', altM: 1560, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek alongside the river through fertile terraced hills and Magar farming settlements to Dharapani.' },
      { day: 3, title: 'Trek Dharapani to Muri', dest: 'Muri', altM: 1850, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross suspension bridges and climb stone trails to Muri, enjoying opening views of Dhaulagiri and Gurja Himal.' },
      { day: 4, title: 'Trek Muri to Boghara', dest: 'Boghara', altM: 2080, duration: '6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to the river, follow a rocky canyon path, and climb through bamboo groves to Boghara, the last permanent village.' },
      { day: 5, title: 'Trek Boghara to Dobang', dest: 'Dobang', altM: 2520, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter dense uninhabited forests of oak and rhododendron along the steep Myagdi Khola to Dobang.' },
      { day: 6, title: 'Trek Dobang to Sallaghari (Choriban Kharka)', dest: 'Sallaghari', altM: 3110, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb through towering pine and fir woods up to the alpine campsite at Sallaghari.' },
      { day: 7, title: 'Trek Sallaghari to Italian Base Camp', dest: 'Italian Base Camp', altM: 3660, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb out of the forest onto lateral moraines. Italian Base Camp sits right in front of the colossal West Face of Dhaulagiri I.' },
      { day: 8, title: 'Acclimatization Day at Italian Base Camp', dest: 'Italian Base Camp', altM: 3660, duration: '3 to 4 hrs', dist: '4 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Crucial acclimatization day to adjust to altitude before ascending the glacier corridor.' },
      { day: 9, title: 'Trek Italian Base Camp to Glacier Camp', dest: 'Glacier Camp', altM: 4210, duration: '5 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Navigate through a narrow glacial canyon onto the debris-covered Chhonbardan Glacier to Glacier Camp.' },
      { day: 10, title: 'Trek Glacier Camp to Dhaulagiri Base Camp', dest: 'Dhaulagiri Base Camp', altM: 4748, duration: '5 to 6 hrs', dist: '7.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek across the active glacier to Dhaulagiri Base Camp, surrounded by an amphitheater of ice, hanging seracs, and soaring summits.' },
      { day: 11, title: 'Cross French Col Pass (5,360m) to Hidden Valley', dest: 'Hidden Valley', altM: 5140, duration: '6 to 7 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb the steep glacial moraine to French Col (5,360m) with panoramic sweeps of Dhaulagiri I, Sita Chuchura, and Tukche Peak before descending into Hidden Valley.' },
      { day: 12, title: 'Exploration & Rest Day in Hidden Valley', dest: 'Hidden Valley', altM: 5140, duration: '3 hrs', dist: '4 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Rest and explore this vast arctic wilderness plateau, with options to hike nearby ridges for views into Mustang.' },
      { day: 13, title: 'Cross Dhampus Pass (5,244m) & Descend to Yak Kharka', dest: 'Yak Kharka', altM: 3680, duration: '6 to 7 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Dhampus Pass with breathtaking views of the Annapurna range, then make a long descent to Yak Kharka.' },
      { day: 14, title: 'Trek Yak Kharka to Marpha & Jomsom', dest: 'Jomsom', altM: 2720, duration: '4 to 5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend into the Kali Gandaki valley, visit the whitewashed apple village of Marpha, and continue to Jomsom for a hot shower.' },
      { day: 15, title: 'Fly Jomsom to Pokhara', dest: 'Pokhara', altM: 820, duration: '20 min flight', dist: 'Air', meals: 'Breakfast', desc: 'Early morning flight between Annapurna and Dhaulagiri massifs to Pokhara. Relax by Phewa Lake.' },
      { day: 16, title: 'Drive or Fly Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '6 hrs drive or 25 min flight', dist: '200 km', meals: 'Breakfast', desc: 'Scenic return journey to Kathmandu, transfer to hotel, and evening at leisure.' },
      { day: 17, title: 'Buffer Contingency Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Contingency day for mountain flights, with free time for shopping and an evening celebratory dinner.' },
      { day: 18, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your flight home, celebrating the completion of an epic Himalayan circuit.' }
    ]
  },

  // 6. ROLWALING VALLEY TREK (15 DAYS)
  {
    slug: 'rolwaling-valley-trek',
    title: 'Rolwaling Valley Trek (15 Days) — Igloo Himalaya Treks',
    seoTitle: 'Rolwaling Valley Trek (15 Days)',
    metaDesc: 'Explore Nepal’s hidden sanctuary on the 15-day Rolwaling Valley Trek to the turquoise glacial lake of Tsho Rolpa (4,580m) beneath Mount Gaurishankar.',
    canonical: 'https://igloohimalayatreks.com/trek/rolwaling-valley-trek/',
    duration: '15 Days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '4,580 m / 15,026 ft',
    maxAltNum: 4580,
    transport: 'Private 4WD Mountain Jeep',
    region: 'Rolwaling & Gaurishankar Conservation Area',
    price: '1,690',
    heroBadge: 'Eastern-Central Nepal • Sacred Valley & Glacial Lake Sanctuary',
    accommodation: 'Local Teahouses & Mountain Lodges',
    gallery: [
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp',
      'hero-himalayas.webp',
      'gallery-peak.webp',
      'himalaya-4039495-1920.webp'
    ],
    highlights: [
      'Journey to Tsho Rolpa (4,580m), Nepal’s largest and most magnificent glacial lake.',
      'Trek beneath the sacred, unclimbed twin peaks of Mount Gaurishankar (7,134m).',
      'Discover the hidden Sherpa villages of Beding (3,700m) and Na (4,180m), rich in Buddhist heritage.',
      'Explore untouched alpine terrain within the Gaurishankar Conservation Area.',
      'Experience authentic, tranquil teahouse stays with zero tourist overcrowding.',
      'Spectacular views of Chobutse, Takargo, and the Drolambau Glacier.'
    ],
    faqs: [
      {
        q: 'How difficult is the Rolwaling Valley Trek to Tsho Rolpa?',
        a: 'The trek to Tsho Rolpa is rated moderate to challenging. The trail ascends steadily through narrow river gorges and alpine valleys up to 4,580m. No technical mountaineering equipment is required for the lake trek.'
      },
      {
        q: 'What permits are required for the Rolwaling Valley?',
        a: 'You require the Gaurishankar Conservation Area Project (GCAP) entry permit and TIMS registration card, both arranged by Igloo Himalaya Treks.'
      },
      {
        q: 'What is the accommodation like in Rolwaling?',
        a: 'Accommodation consists of friendly, family-run Sherpa teahouses and community lodges offering basic clean twin rooms and wholesome meals.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Gonggar / Simigaon', dest: 'Simigaon', altM: 2020, duration: '8 hrs 4WD', dist: '180 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Drive through Dolakha along the Tama Koshi River gorge, ascending stone stairs to the cliffside village of Simigaon.' },
      { day: 2, title: 'Trek Simigaon to Dongang (Kyalche)', dest: 'Dongang', altM: 2790, duration: '6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend through dense mossy forests of rhododendron, bamboo, and pine alongside the thundering Rolwaling Khola to Dongang.' },
      { day: 3, title: 'Trek Dongang to Beding', dest: 'Beding', altM: 3700, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb gently as the valley widens. Arrive in Beding, the largest Sherpa settlement in Rolwaling, nestled beneath Gaurishankar.' },
      { day: 4, title: 'Acclimatization Day in Beding', dest: 'Beding', altM: 3700, duration: '3 to 4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit the historic monastery in Beding and take a hike up the valley slopes for panoramic views of Chobutse.' },
      { day: 5, title: 'Trek Beding to Na Gaon', dest: 'Na Gaon', altM: 4180, duration: '4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'An easy, scenic walk along the alpine river plain past yak pastures and mani walls to Na, a summer Sherpa village.' },
      { day: 6, title: 'Acclimatization Hike to Yalung Glacier Viewpoint', dest: 'Na Gaon', altM: 4600, duration: '4 to 5 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Conditioning hike toward Yalung Base Camp offering dramatic views of Yalung Kang and the surrounding icefalls.' },
      { day: 7, title: 'Excursion to Tsho Rolpa Lake (4,580m) & Return to Na', dest: 'Na Gaon', altM: 4580, duration: '6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike up the lateral moraine to the breathtaking turquoise waters of Tsho Rolpa Lake (4,580m), surrounded by giant snow peaks, then return to Na.' },
      { day: 8, title: 'Exploration of Drolambau Glacier Snout or Rest at Na', dest: 'Na Gaon', altM: 4500, duration: '4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Explore the upper moraines toward Drolambau Glacier or relax in Na village enjoying local Sherpa hospitality.' },
      { day: 9, title: 'Trek Na down to Beding', dest: 'Beding', altM: 3700, duration: '3 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Gentle downhill stroll back to Beding, soaking in the serene mountain vistas.' },
      { day: 10, title: 'Trek Beding to Shakpa (Dongang)', dest: 'Dongang', altM: 2790, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through forested gorges past waterfalls back to the cozy teahouses of Dongang.' },
      { day: 11, title: 'Trek Dongang to Simigaon', dest: 'Simigaon', altM: 2020, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace your steps through the tranquil forest down to the hillside village of Simigaon.' },
      { day: 12, title: 'Trek Simigaon to Jagat / Gonggar', dest: 'Gonggar', altM: 1440, duration: '3 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend the stone staircases to the Tama Koshi River at Gonggar/Jagat, concluding the trekking portion.' },
      { day: 13, title: 'Drive Gonggar to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '7 to 8 hrs drive', dist: '180 km', meals: 'Breakfast, Lunch', desc: 'Board private 4WD vehicles and drive back through Dolakha and Charikot to Kathmandu.' },
      { day: 14, title: 'Free Leisure & Buffer Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Enjoy a free day for shopping and exploring Kathmandu, followed by a celebration farewell dinner.' },
      { day: 15, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your onward journey.' }
    ]
  },

  // 7. RARA LAKE TREK (10 DAYS)
  {
    slug: 'rara-lake-trek',
    title: 'Rara Lake Trek (10 Days) — Igloo Himalaya Treks',
    seoTitle: 'Rara Lake Trek (10 Days)',
    metaDesc: 'Discover the Queen of Lakes on the 10-day Rara Lake Trek in remote Far-Western Nepal. Hike through pine forests and ancient Khas villages to Rara Lake (2,990m).',
    canonical: 'https://igloohimalayatreks.com/trek/rara-lake-trek/',
    duration: '10 Days',
    difficulty: 'Moderate',
    maxAlt: '3,700 m / 12,139 ft',
    maxAltNum: 3700,
    transport: 'Domestic Flights (Nepalgunj & Jumla) & Private Transfers',
    region: 'Rara National Park / Far-West Karnali',
    price: '1,490',
    heroBadge: 'Far-West Nepal • Queen of Alpine Lakes Sanctuary',
    accommodation: 'Local Teahouses & Lake Lodges',
    gallery: [
      '7-day-rara-lake-jeep-tour-rara-lake-tour-package.webp',
      '7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.webp',
      'rara-lake-jeep-tour.webp',
      'himalaya-4039495-1920.webp',
      'gallery-peak.webp',
      'hero-himalayas.webp'
    ],
    highlights: [
      'Visit Rara Lake (2,990m), Nepal’s largest and deepest lake, famous for changing turquoise hues.',
      'Hike to Murma Top (3,700m) for a 360-degree panorama of Rara Lake and snow-capped peaks.',
      'Explore Rara National Park, home to musk deer, Himalayan black bears, and rare migratory birds.',
      'Walk through the historical Sinja Valley, the ancestral birthplace of the Nepali Khas language.',
      'Experience the pristine and preserved culture of Far-Western Nepal.',
      'Boating and tranquil lakeside walking along blue pine and spruce forests.'
    ],
    faqs: [
      {
        q: 'How difficult is the Rara Lake Trek?',
        a: 'The Rara Lake Trek is rated moderate. The highest elevation reached is 3,700m at Murma Top, making it accessible to trekkers of all experience levels with standard physical fitness.'
      },
      {
        q: 'What is the best time of year to visit Rara Lake?',
        a: 'Spring (March to May) features blooming alpine wildflowers and rhododendrons, while Autumn (September to November) provides crystal-clear blue skies and mirrored lake reflections.'
      },
      {
        q: 'How do we reach Rara Lake?',
        a: 'We take a flight from Kathmandu to Nepalgunj, followed by a mountain flight to Jumla airport, then embark on a scenic circular trek to Rara Lake.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Nepalgunj', dest: 'Nepalgunj', altM: 150, duration: '50 min flight', dist: 'Flight', meals: 'Dinner', desc: 'Afternoon flight from Kathmandu to Nepalgunj in the western Terai. Transfer to hotel and trip briefing.' },
      { day: 2, title: 'Fly Nepalgunj to Jumla & Trek to Chere Chaur', dest: 'Chere Chaur', altM: 3055, duration: '20 min flight + 4 hrs trek', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Morning mountain flight to Jumla (2,540m). Meet your trekking crew and hike through pine forests to Chere Chaur.' },
      { day: 3, title: 'Trek Chere Chaur to Chalachaur', dest: 'Chalachaur', altM: 2980, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb over Jaljala Pass (3,580m) with sweeping views of the Karnali region, descending to Chalachaur.' },
      { day: 4, title: 'Trek Chalachaur to Sinja Valley', dest: 'Sinja Valley', altM: 2490, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the river gorge down into the historic Sinja Valley, the ancient 12th-century capital of the Khas Kingdom.' },
      { day: 5, title: 'Trek Sinja to Ghorosingha', dest: 'Ghorosingha', altM: 3050, duration: '5 to 6 hrs', dist: '10.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek through Ghatte Khola gorge past stone temples and dense cedar forests to Ghorosingha.' },
      { day: 6, title: 'Trek Ghorosingha to Rara Lake via Chuchemara Pass', dest: 'Rara Lake', altM: 2990, duration: '6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Chuchemara Danda (3,600m) for your first spellbinding view of the deep blue lake, descending to the lakeshore lodges.' },
      { day: 7, title: 'Exploration Day at Rara Lake & Hike to Murma Top (3,700m)', dest: 'Rara Lake', altM: 3700, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike up to Murma Top for a 360-degree panorama of Rara Lake and Tibetan border peaks, followed by lakeside strolls.' },
      { day: 8, title: 'Trek Rara Lake to Pina', dest: 'Pina', altM: 2440, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk around the eastern lake shore, cross Jhyari pass, and descend through walnut orchards to Pina.' },
      { day: 9, title: 'Trek Pina to Bumra & Drive to Jumla', dest: 'Jumla', altM: 2540, duration: '5 hrs trek + 2 hrs drive', dist: '14 km trek', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Danphe Lagna Pass (3,691m) down to Bumra village, meet local transport, and drive back to Jumla.' },
      { day: 10, title: 'Fly Jumla to Nepalgunj & Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '2 flights (20 min + 50 min)', dist: 'Air', meals: 'Breakfast', desc: 'Morning flight from Jumla to Nepalgunj and connecting flight back to Kathmandu, concluding the trip.' }
    ]
  },

  // 8. RUBY VALLEY TREK (9 DAYS)
  {
    slug: 'ruby-valley-trek',
    title: 'Ruby Valley Trek (9 Days) — Igloo Himalaya Treks',
    seoTitle: 'Ruby Valley Trek (9 Days)',
    metaDesc: 'Discover the hidden cultural gem of the Ruby Valley Trek (9 Days). Cross Pangsang Pass (3,845m) with panoramic views of Ganesh Himal, Langtang, and Manaslu.',
    canonical: 'https://igloohimalayatreks.com/trek/ruby-valley-trek/',
    duration: '9 Days',
    difficulty: 'Moderate',
    maxAlt: '3,845 m / 12,615 ft',
    maxAltNum: 3845,
    transport: 'Private 4WD Mountain Jeep',
    region: 'Ganesh Himal / Ruby Valley',
    price: '990',
    heroBadge: 'Central Nepal • Untouched Cultural Foothills & Mineral Valley',
    accommodation: 'Community Homestays & Local Lodges',
    gallery: [
      'from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp',
      'panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp',
      'hero-himalayas.webp',
      'gallery-peak.webp',
      'himalaya-4039495-1920.webp',
      'kanchenjunga-circuit-trek-in-eastern-nepal.webp'
    ],
    highlights: [
      'Panoramic 180-degree Himalayan vistas from Pangsang Pass (3,845m) of Ganesh Himal, Langtang, and Manaslu.',
      'Cultural homestay experience in authentic Gurung and Tamang villages (Tipling, Shertung, Chalish).',
      'Relax in natural riverside hot springs at Tatopani.',
      'Discover traditional shamanic traditions, mineral mines, and handcrafted artisan heritage.',
      'Hike through pristine rhododendron forests, terraced fields, and roaring river gorges.',
      'An off-the-beaten-path trekking gem located conveniently close to Kathmandu.'
    ],
    faqs: [
      {
        q: 'What makes the Ruby Valley Trek unique?',
        a: 'The Ruby Valley (Ganesh Himal region) is renowned for authentic community homestays, rich gemstone mineral heritage (rubies, quartz, zinc), and spectacular unhindered views of the Ganesh Himal massif with zero commercial crowds.'
      },
      {
        q: 'What is the accommodation like in Ruby Valley?',
        a: 'Accommodation consists of warm community homestays and basic lodges where trekkers are welcomed into local Tamang and Gurung family homes, eating wholesome organic village meals.'
      },
      {
        q: 'How fit do I need to be for Ruby Valley?',
        a: 'The trek is graded moderate. Trekkers should be comfortable walking 5 to 6 hours daily over undulating hilly trails and one high pass ascent to Pangsang Pass (3,845m).'
      }
    ],
    itinerary: [
      { day: 1, title: 'Drive Kathmandu to Syabrubesi or Bhalche', dest: 'Bhalche', altM: 1850, duration: '6 to 7 hrs 4WD', dist: '110 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Scenic mountain drive from Kathmandu through Trishuli Bazaar to the traditional Tamang village of Bhalche.' },
      { day: 2, title: 'Trek Bhalche to Gonga (Rupchet)', dest: 'Gonga', altM: 3250, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend through dense rhododendron and oak forests up to the high ridge meadows of Gonga/Rupchet.' },
      { day: 3, title: 'Cross Pangsang Pass (3,845m) & Trek to Tipling', dest: 'Tipling', altM: 2075, duration: '6 to 7 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb to Pangsang Pass (3,845m) for jaw-dropping panoramas of Ganesh Himal I-IV, Langtang, and Manaslu, descending into Tipling.' },
      { day: 4, title: 'Trek Tipling to Shertung & Chalish Village', dest: 'Chalish', altM: 1875, duration: '3 to 4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Short scenic walk down to Shertung and Chalish, a culturally vibrant Gurung village with hospitality and dance.' },
      { day: 5, title: 'Explore Chalish, Shertung & Natural Hot Springs (Tatopani)', dest: 'Chalish', altM: 1875, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit local monasteries, crystal mines, and take an excursion to the natural riverside hot springs at Tatopani.' },
      { day: 6, title: 'Trek Chalish to Borang', dest: 'Borang', altM: 1700, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk through terraced agricultural fields and lush hillsides to the welcoming village of Borang.' },
      { day: 7, title: 'Trek Borang to Darkha Gaon', dest: 'Darkha Gaon', altM: 850, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through subtropical agrarian valleys along the river to Darkha Gaon.' },
      { day: 8, title: 'Trek Darkha to Darkha Phedi & Drive to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '2 hrs trek + 5 hrs drive', dist: '85 km', meals: 'Breakfast, Lunch', desc: 'Walk down to Darkha Phedi, board your private 4WD jeep, and drive back to Kathmandu for a hot shower.' },
      { day: 9, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your flight home.' }
    ]
  }
];

module.exports = { remotePackages };
