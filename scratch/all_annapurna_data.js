const fs = require('fs');
const path = require('path');
const { annapurnaPackages: base7 } = require('./annapurna_12_packages_data.js');

// Read additional 5 from build_missing_annapurna_treks.js
const missingCode = fs.readFileSync(path.join(__dirname, 'build_missing_annapurna_treks.js'), 'utf8');

// We extract packages from build_missing_annapurna_treks
const additionalSlugs = [
  'annapurna-short-trek',
  'ghorepani-poon-hill-with-mardi-himal-trek',
  'abc-with-mardi-himal-trek',
  'annapurna-luxury-trek',
  'annapurna-circuit-luxury-trek'
];

// Let's create the full 12 array
const all12 = [...base7];

// Let's add the remaining 5 packages with clean formatting
const remaining5 = [
  {
    slug: 'annapurna-short-trek',
    title: 'Annapurna Short Trek (4 Days) — Poon Hill & Ghandruk — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Short Trek (4 Days)',
    metaDesc: 'Experience the best highlights of the Annapurna foothills in 4 days: sunrise over Annapurna and Dhaulagiri from Poon Hill (3,210m) and Gurung culture in Ghandruk.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-short-trek/',
    duration: '4 days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,210 m (10,531 ft)',
    maxAltNum: 3210,
    price: '390',
    activity: 'Scenic Foothill Trekking',
    accommodation: 'Cozy Mountain Teahouses',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-May)',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Kimche',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Perfect Beginner & Family Getaway',
    leadText: 'The Annapurna Short Trek is the ultimate introductory trek in Nepal, offering world-class Himalayan panoramas, blooming rhododendron forests, and warm Gurung hospitality in a comfortable 4-day loop from Pokhara.',
    highlights: [
      'Poon Hill (3,210m) sunrise panorama across Dhaulagiri (8,167m) and Annapurna I (8,091m)',
      'Climb the famous Ulleri stone staircase through terraced farmlands',
      'Walk under ancient rhododendron, pine, and oak canopies',
      'Traditional stone-paved streets and cultural museum in Ghandruk village',
      'Low maximum elevation ensuring zero risk of altitude sickness',
      'Comfortable family-run teahouses with hot showers and warm dining rooms'
    ],
    gallery: [
      'ghorepani-poon-hill-trek.webp',
      'panchase-trek-best-short-trek-near-pokhara-nepal.webp',
      'annapurna-4496175-1920.webp',
      'ghorepani-poon-hill-vs-mardi-himal-trek.webp',
      'mardi-himal-trek-02.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Nayapul & Trek to Tikhedhunga / Ulleri (2,050m)', dest: 'Ulleri', altM: 2050, duration: '1.5 hr drive + 4-5 hrs walk', dist: '9 km', meals: 'B, L, D', desc: 'Private drive to Nayapul. Walk along the Modi Khola river to Birethanti, follow the Bhurungdi stream past terraced farmland to Hile, and ascend the famous Ulleri stone staircase.' },
      { day: 2, title: 'Trek Ulleri to Ghorepani (2,874m)', dest: 'Ghorepani', altM: 2874, duration: '4-5 hrs', dist: '8.5 km', meals: 'B, L, D', desc: 'Walk under a lush canopy of giant rhododendron and oak trees, listening to mountain birds. Arrive in the picturesque ridge-top village of Ghorepani with spectacular views of Dhaulagiri.' },
      { day: 3, title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani / Ghandruk (1,940m)', dest: 'Ghandruk', altM: 1940, duration: '6 hrs total', dist: '12 km', meals: 'B, L, D', desc: 'Pre-dawn hike up Poon Hill (45 min) for the world-famous golden sunrise across two 8,000m giants (Dhaulagiri & Annapurna I). Return for breakfast, trek through Deurali pass and Tadapani to the cultural village of Ghandruk.' },
      { day: 4, title: 'Explore Ghandruk Village & Drive Back to Pokhara', dest: 'Pokhara', altM: 822, duration: '1.5 hr walk + 2.5 hr drive', dist: '4 km + drive', meals: 'B, L', desc: 'Visit the Gurung Cultural Museum and traditional stone houses beneath Annapurna South. Descend stone trails to Kimche and take private transport back to Pokhara.' }
    ],
    faqs: [
      { q: 'Is the Annapurna Short Trek suitable for children and seniors?', a: 'Yes! Because the maximum altitude is 3,210m at Poon Hill and the teahouse lodges are very comfortable, this route is the #1 choice for families with kids and first-time hikers.' }
    ]
  },
  {
    slug: 'ghorepani-poon-hill-with-mardi-himal-trek',
    title: 'Ghorepani Poon Hill with Mardi Himal Trek (9 Days) — Igloo Himalaya Treks',
    seoTitle: 'Ghorepani Poon Hill with Mardi Himal Trek (9 Days)',
    metaDesc: 'The ultimate 9-day Annapurna combo route linking the golden sunrise viewpoint of Poon Hill (3,210m) with the dramatic high alpine ridge of Mardi Himal (4,500m).',
    canonical: 'https://igloohimalayatreks.com/trek/ghorepani-poon-hill-with-mardi-himal-trek/',
    duration: '9 days',
    difficulty: 'Moderate',
    maxAlt: '4,500 m (14,763 ft)',
    maxAltNum: 4500,
    price: '750',
    activity: 'Scenic Panoramic Ridge Trekking',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Siding',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Two Iconic Treks in One Journey',
    leadText: 'Why choose between Nepal’s most beloved sunrise viewpoint and its most dramatic new ridge trail when you can experience both? The 9-day Ghorepani Poon Hill with Mardi Himal Trek ingeniously combines both world-class itineraries into a seamless loop.',
    highlights: [
      'Poon Hill (3,210m) sunrise panorama facing Dhaulagiri and Annapurna ranges',
      'Walk along the breathtaking alpine ridge of Mardi Himal with Machhapuchhre towering above',
      'Reach Mardi Himal Base Camp / Upper Viewpoint at 4,500 meters',
      'Cross through tranquil rhododendron forests connecting Landruk and Forest Camp',
      'Superb acclimatization gaining altitude gradually before the high ridge',
      'Traditional Gurung cultural homestay experience in Landruk and Siding'
    ],
    gallery: [
      'ghorepani-poon-hill-with-mardi-himal-trek.webp',
      'ghorepani-poon-hill-with-mardi-himal-trek-10-days.webp',
      'ghorepani-poon-hill-and-mardi-himal-trek.webp',
      'ghorepani-poon-hill-vs-mardi-himal-trek-which-is-better.webp',
      'trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Nayapul & Trek to Ulleri (2,050m)', dest: 'Ulleri', altM: 2050, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Scenic drive to Nayapul and hike past Birethanti, climbing the stone steps of Ulleri village.' },
      { day: 2, title: 'Trek Ulleri to Ghorepani (2,874m)', dest: 'Ghorepani', altM: 2874, duration: '4-5 hrs', dist: '8.5 km', meals: 'B, L, D', desc: 'Walk through ancient rhododendron forests alongside crystal mountain streams to Ghorepani.' },
      { day: 3, title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani (2,630m)', dest: 'Tadapani', altM: 2630, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Golden sunrise over Annapurna and Dhaulagiri from Poon Hill. Continue along the high forest ridge to Tadapani.' },
      { day: 4, title: 'Trek Tadapani to Landruk (1,565m) via Modi Khola', dest: 'Landruk', altM: 1565, duration: '4-5 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Descend through terraced hillsides, cross the suspension bridge over Modi Khola, and climb into the Gurung settlement of Landruk.' },
      { day: 5, title: 'Trek Landruk to Forest Camp (Kokar - 2,550m)', dest: 'Forest Camp', altM: 2550, duration: '4-5 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Ascend quietly into the tranquil, moss-draped forest trails connecting the Annapurna valley to the Mardi Himal ridge.' },
      { day: 6, title: 'Trek Forest Camp to High Camp (3,580m) via Badal Danda', dest: 'High Camp', altM: 3580, duration: '5 hrs', dist: '8.5 km', meals: 'B, L, D', desc: 'Climb above tree line onto Badal Danda (Cloud Ridge). Enjoy breathtaking views before reaching High Camp.' },
      { day: 7, title: 'Hike to Mardi Himal Base Camp (4,500m) & Descend to Low Camp (2,970m)', dest: 'Low Camp', altM: 4500, duration: '6-7 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Pre-dawn hike to Mardi Himal Base Camp (4,500m) directly under Fishtail before descending to Low Camp.' },
      { day: 8, title: 'Trek Low Camp to Siding Village & Private Jeep to Pokhara', dest: 'Pokhara', altM: 822, duration: '3 hrs walk + 2.5 hrs drive', dist: '6 km + drive', meals: 'B, L', desc: 'Descend through shade trees to Siding village. Board our private 4WD vehicle for the scenic drive back to Pokhara.' },
      { day: 9, title: 'Fly or Drive Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min flight / 6 hr drive', dist: '200 km', meals: 'B, D', desc: 'Return to Kathmandu for shopping, rest, and our celebration farewell dinner.' }
    ],
    faqs: [
      { q: 'How difficult is this combined Poon Hill and Mardi Himal trek?', a: 'It is rated Moderate. While Poon Hill is easy, the ascent from Forest Camp to Mardi Base Camp (4,500m) involves narrow alpine ridge trails. Trekking poles and good cardio fitness are recommended.' }
    ]
  },
  {
    slug: 'abc-with-mardi-himal-trek',
    title: 'Annapurna Base Camp with Mardi Himal Trek (12 Days) — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Base Camp with Mardi Himal Trek (12 Days)',
    metaDesc: 'Combine the deep glacier amphitheater of Annapurna Sanctuary (4,130m) with the sheer panoramic ridge of Mardi Himal (4,500m) on a breathtaking 12-day dual trek.',
    canonical: 'https://igloohimalayatreks.com/trek/abc-with-mardi-himal-trek/',
    duration: '12 days',
    difficulty: 'Strenuous',
    maxAlt: '4,500 m (14,763 ft)',
    maxAltNum: 4500,
    price: '990',
    activity: 'Dual Glacier & Ridge Expedition',
    accommodation: 'Mountain Teahouse Lodges',
    transport: 'Private 4WD Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / Siding',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Ultimate Two-in-One Sanctuary & Ridge Trek',
    leadText: 'The Annapurna Base Camp with Mardi Himal Trek is the definitive expedition for mountain lovers who want the complete Himalayan spectrum: standing inside the colossal glacier amphitheater of Annapurna Sanctuary (4,130m), followed by walking the razor-sharp alpine ridge of Mardi Himal (4,500m).',
    highlights: [
      'Dual ascent: Annapurna Sanctuary glacier basin (4,130m) plus high Mardi ridge (4,500m)',
      'Unsurpassed close-ups of Annapurna I south face, Annapurna South, and Hiunchuli',
      'The world’s most intimate angle of sacred Mount Machhapuchhre (Fishtail)',
      'Soaking in natural geothermal hot springs at Jhinu Danda after the ABC descent',
      'Traverse remote ridge trails above tree line at Badal Danda with drop-off valley views',
      'Authentic Gurung cultural experiences in Chhomrong, Landruk, and Siding villages'
    ],
    gallery: [
      'abc-with-mardi-himal-trek.webp',
      'abc-with-mardi-himal-trek-cost-package-itinerary-2026.webp',
      'abc-with-mardi-himal-trek-cost-package-itinerary-2026-02.webp',
      'annapurna-base-camp-trek.webp',
      'machhapuchhre-fishtail-mountain-towering-above-mardi-himal-high-camp-with-colorful-prayer.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque & Trek to Chhomrong (2,170m)', dest: 'Chhomrong', altM: 2170, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Drive to the Matque trailhead and trek through terraced Gurung hillsides up to Chhomrong.' },
      { day: 2, title: 'Trek Chhomrong to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '4-5 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Cross Chhomrong Khola and ascend through thick bamboo and oak forests to Sinuwa, continuing to Bamboo.' },
      { day: 3, title: 'Trek Bamboo to Deurali (3,230m)', dest: 'Deurali', altM: 3230, duration: '5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Hike past Dovan and Himalaya Hotel alongside the roaring Modi Khola gorge to Deurali.' },
      { day: 4, title: 'Trek Deurali to Annapurna Base Camp (4,130m) via MBC', dest: 'Annapurna Base Camp', altM: 4130, duration: '5-6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Climb past Machhapuchhre Base Camp into the heart of the Annapurna Sanctuary for an unforgettable sunset.' },
      { day: 5, title: 'Sunrise at ABC & Trek Down to Bamboo (2,310m)', dest: 'Bamboo', altM: 2310, duration: '6 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Witness golden dawn light over Annapurna I (8,091m) and make a steady descent back to Bamboo.' },
      { day: 6, title: 'Trek Bamboo to Jhinu Danda Hot Springs (1,780m)', dest: 'Jhinu Danda', altM: 1780, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Hike to Chhomrong and descend to Jhinu Danda. Soak in the riverside natural hot springs.' },
      { day: 7, title: 'Trek Jhinu Danda to Landruk (1,565m)', dest: 'Landruk', altM: 1565, duration: '3-4 hrs', dist: '6 km', meals: 'B, L, D', desc: 'Cross the long Modi Khola suspension bridge and enjoy an easy, scenic trek into the traditional Gurung village of Landruk.' },
      { day: 8, title: 'Trek Landruk to Forest Camp (Kokar - 2,550m)', dest: 'Forest Camp', altM: 2550, duration: '4-5 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Climb up onto the secluded Mardi Himal ridge trail through tranquil rhododendron forests.' },
      { day: 9, title: 'Trek Forest Camp to High Camp (3,580m) via Badal Danda', dest: 'High Camp', altM: 3580, duration: '5 hrs', dist: '8.5 km', meals: 'B, L, D', desc: 'Traverse the dramatic alpine ridge above tree line with views of Fishtail looming directly above.' },
      { day: 10, title: 'Hike to Mardi Himal Base Camp (4,500m) & Descend to Low Camp (2,970m)', dest: 'Low Camp', altM: 4500, duration: '6-7 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Sunrise ascent to Mardi Himal Base Camp for an intimate Fishtail panorama; descend to Low Camp.' },
      { day: 11, title: 'Trek Low Camp to Siding & Private 4WD Drive to Pokhara', dest: 'Pokhara', altM: 822, duration: '3 hrs walk + 2.5 hrs drive', dist: '6 km + drive', meals: 'B, L', desc: 'Descend through forest to Siding village and drive back to Pokhara for a hot shower and lakeside dining.' },
      { day: 12, title: 'Drive or Fly Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min flight / 6 hr drive', dist: '200 km', meals: 'B, D', desc: 'Transfer to Kathmandu. Farewell celebratory dinner with your expedition team.' }
    ],
    faqs: [
      { q: 'How physically demanding is the ABC + Mardi Himal combo?', a: 'This is a strenuous high-altitude trek with multiple 6+ hour days and two peaks above 4,100 meters. Proper cardiovascular preparation and prior trekking experience are strongly recommended.' }
    ]
  },
  {
    slug: 'annapurna-luxury-trek',
    title: 'Annapurna Luxury Lodge Trek (7 Days) — Comfort & Heritage — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Luxury Lodge Trek (7 Days)',
    metaDesc: 'Experience the breathtaking majesty of the Annapurnas in supreme comfort, staying at premier luxury heritage lodges with heated beds, private bathrooms, and fine dining.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-luxury-trek/',
    duration: '7 days',
    difficulty: 'Easy to Moderate (Luxury Comfort)',
    maxAlt: '2,050 m (6,725 ft)',
    maxAltNum: 2050,
    price: '1,690',
    activity: 'Luxury Mountain Lodge Trekking',
    accommodation: 'Premier Heritage Mountain Lodges & 5-Star Hotels',
    transport: 'Private VIP Vehicle & Domestic Flights',
    meals: 'All Gourmet Meals Included (B,L,D)',
    season: 'Sep-May (Best Oct-Dec & Mar-Apr)',
    trekStarts: 'Kathmandu / Pokhara',
    trekEnds: 'Kathmandu / Pokhara',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • VIP Comfort & Heritage Boutique Lodges',
    leadText: 'The 7-day Annapurna Luxury Lodge Trek redefines Himalayan exploration. Experience awe-inspiring mountain vistas without sacrificing comfort, resting each evening in prestigious luxury boutique lodges featuring en-suite hot bathrooms, plush down duvets, landscaped garden courtyards, and gourmet dining.',
    highlights: [
      'Stay in exclusive luxury mountain lodges (Sanctuary Lodge, Himalaya Lodge, Gurung Lodge)',
      'Private attached bathrooms with running hot water and premium heated bed amenities',
      'Sublime views of Annapurna South, Hiunchuli, and Fishtail without high-altitude hardship',
      'Gentle hiking along scenic Gurung village trails averaging 3 to 4 hours per day',
      'VIP luxury ground transfers and scheduled domestic flights between Kathmandu and Pokhara',
      'Fine dining with organic farm-to-table cuisine prepared by skilled lodge chefs'
    ],
    gallery: [
      'annapurna-luxury-trek.webp',
      'annapurna-luxury-trek-02.webp',
      'annapurna-luxury-trek-2.webp',
      'annapurna-luxury-trek-3.webp',
      'annapurna-luxury-trek-4.webp'
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Kathmandu – VIP Welcome & 5-Star Hotel', dest: 'Kathmandu', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'D', desc: 'VIP airport greeting and luxury transfer to your 5-star hotel in Kathmandu. Evening trip briefing and welcome dinner.' },
      { day: 2, title: 'Scenic Flight to Pokhara & Walk to Sanctuary Lodge (Birethanti - 1,100m)', dest: 'Sanctuary Lodge', altM: 1100, duration: '25 min flight + 1.5 hr drive + 30 min walk', dist: '3 km', meals: 'B, L, D', desc: 'Mountain flight to Pokhara with views of the Himalayan range. Private transfer to Birethanti and check in to the exquisite riverside Sanctuary Lodge surrounded by tropical gardens.' },
      { day: 3, title: 'Trek to Himalaya Lodge (Ghandruk - 2,010m)', dest: 'Himalaya Lodge', altM: 2010, duration: '4-5 hrs', dist: '8 km', meals: 'B, L, D', desc: 'Hike through terraced fields and Gurung villages to Ghandruk. Settle into the Himalaya Lodge, with private balconies directly facing the sheer south face of Annapurna.' },
      { day: 4, title: 'Scenic Walk to Gurung Lodge (Majgaun - 1,400m)', dest: 'Gurung Lodge', altM: 1400, duration: '4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Descend gently through farmland and rhododendron forests to Majgaun. Enjoy traditional afternoon tea in the lodge’s panoramic stone garden.' },
      { day: 5, title: 'Trek to Basanta Lodge (Dhampus - 1,530m)', dest: 'Basanta Lodge', altM: 1530, duration: '3-4 hrs', dist: '6 km', meals: 'B, L, D', desc: 'Walk along the ridge trail to the charming village of Dhampus. Unobstructed, panoramic sunset views of the entire Annapurna range.' },
      { day: 6, title: 'Sunrise over Fishtail, Walk to Phedi & Luxury Resort in Pokhara', dest: 'Pokhara', altM: 822, duration: '1.5 hr walk + 30 min drive', dist: '4 km', meals: 'B, L', desc: 'Watch golden morning light hit Machhapuchhre. Walk down stone steps to Phedi and transfer to Pokhara’s premier luxury eco-resort for spa treatments and relaxation.' },
      { day: 7, title: 'Morning Flight to Kathmandu & Departure', dest: 'Home', altM: 1400, duration: '25 min flight', dist: 'Airport', meals: 'B', desc: 'Fly back to Kathmandu. Connect seamlessly with your international flight or extend your stay in Nepal.' }
    ],
    faqs: [
      { q: 'What amenities are available in the luxury lodges?', a: 'Each room has comfortable beds with premium duvets, electric heated mattress pads or hot water bottles, attached private bathrooms with running hot water, flush toilets, and locally crafted organic toiletries. Dining includes multi-course chef-prepared meals.' }
    ]
  },
  {
    slug: 'annapurna-circuit-luxury-trek',
    title: 'Annapurna Circuit Luxury Trek (12 Days) — Comfort Across Thorong La — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Circuit Luxury Trek (12 Days)',
    metaDesc: 'Conquer the world-famous Annapurna Circuit and Thorong La Pass (5,416m) with upgraded luxury lodges, private 4WD support vehicles, and premium expedition service.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-circuit-luxury-trek/',
    duration: '12 days',
    difficulty: 'Strenuous High Altitude (Upgraded Comfort)',
    maxAlt: '5,416 m (17,769 ft)',
    maxAltNum: 5416,
    price: '1,990',
    activity: 'High-Altitude Pass Crossing with VIP Comfort',
    accommodation: 'Best Available Boutique Mountain Lodges & 5-Star City Hotels',
    transport: 'Private 4WD Land Cruiser & Domestic Flight',
    meals: 'All Meals Included (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Kathmandu / Besisahar',
    trekEnds: 'Kathmandu / Pokhara',
    region: 'Annapurna (ACAP)',
    heroBadge: 'Annapurna Region • Upgraded Comfort Mountain Expedition',
    leadText: 'The 12-day Annapurna Circuit Luxury Trek elevates the world’s most iconic long-distance Himalayan journey. Cross the legendary Thorong La Pass at 5,416m while enjoying upgraded boutique accommodations, private 4WD expedition support, premium porter and guiding ratios, and comprehensive safety equipment.',
    highlights: [
      'Cross the world-famous Thorong La Pass (5,416m / 17,769ft)',
      'Handpicked boutique teahouses and luxury city hotels in Kathmandu and Pokhara',
      'Private 4WD Land Cruiser support bypassing dusty low-altitude road sections',
      'Explore the ancient Tibetan Buddhist culture of Manang and sacred Muktinath Temple',
      'Panoramic high trail via Ghyaru and Ngawal facing Annapurna II and IV',
      'Geothermal hot spring relaxation in Tatopani along the Kali Gandaki canyon'
    ],
    gallery: [
      'annapurna-circuit-luxury-trek.webp',
      'annapurna-circuit-luxury-trek-02.webp',
      'annapurna-circuit-luxury-trek-03.webp',
      'annapurna-circuit-luxury-trek-04.webp',
      'annapurna-circuit-luxury-trek-05.webp'
    ],
    itinerary: [
      { day: 1, title: 'Private 4WD Transfer Kathmandu to Besisahar & Chame (2,670m)', dest: 'Chame', altM: 2670, duration: '7-8 hrs drive', dist: '220 km', meals: 'B, L, D', desc: 'VIP private 4WD drive along the Marsyangdi River into the mountains, passing waterfalls and entering the district headquarters of Chame.' },
      { day: 2, title: 'Trek Chame to Upper Pisang (3,300m)', dest: 'Upper Pisang', altM: 3300, duration: '5 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek through aromatic pine forests beneath the colossal curved rock face of Paungda Danda to Upper Pisang for grand views of Annapurna II.' },
      { day: 3, title: 'Upper Trail from Pisang to Manang via Ghyaru & Ngawal (3,540m)', dest: 'Manang', altM: 3540, duration: '6-7 hrs', dist: '18 km', meals: 'B, L, D', desc: 'The scenic high trail offering breathtaking vistas of the Annapurna range. Pass ancient Buddhist chortens and check in to Manang’s premier boutique lodge.' },
      { day: 4, title: 'Acclimatization & Cultural Exploration in Manang', dest: 'Manang', altM: 3540, duration: '3-4 hrs', dist: '5 km', meals: 'B, L, D', desc: 'Hike to Chongkor viewpoint or Gangapurna glacier lake. Attend an altitude lecture at the Himalayan Rescue Association (HRA) clinic.' },
      { day: 5, title: 'Trek Manang to Yak Kharka (4,050m)', dest: 'Yak Kharka', altM: 4050, duration: '4 hrs', dist: '10 km', meals: 'B, L, D', desc: 'A gentle, steady climb through alpine meadows and juniper scrub where blue sheep and Himalayan yaks graze.' },
      { day: 6, title: 'Trek Yak Kharka to Thorong Phedi (4,450m)', dest: 'Thorong Phedi', altM: 4450, duration: '3-4 hrs', dist: '7 km', meals: 'B, L, D', desc: 'Hike to the base of the pass. Rest early, hydrate, and prepare equipment for tomorrow’s summit crossing.' },
      { day: 7, title: 'Cross Thorong La Pass (5,416m) to Muktinath (3,800m)', dest: 'Muktinath', altM: 5416, duration: '8-9 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Pre-dawn climb to the highest point of the circuit at Thorong La Pass (5,416m / 17,769ft). Celebrate with prayer flags and descend into the sacred temple town of Muktinath.' },
      { day: 8, title: 'Explore Muktinath & Private 4WD Drive to Marpha & Tatopani (1,190m)', dest: 'Tatopani', altM: 1190, duration: '4 hrs drive', dist: '65 km', meals: 'B, L, D', desc: 'Visit the sacred 108 water spouts at Muktinath. Private 4WD drive through the Kali Gandaki Gorge and apple orchards of Marpha down to the natural hot springs of Tatopani.' },
      { day: 9, title: 'Drive Tatopani to Pokhara – 5-Star Resort Stay', dest: 'Pokhara', altM: 822, duration: '3-4 hrs drive', dist: '95 km', meals: 'B, L', desc: 'Private transfer to Pokhara. Check in to your 5-star lakeside hotel. Rest, indulge in spa treatments, and enjoy a lakeside dinner.' },
      { day: 10, title: 'Pokhara Sightseeing & Leisure Day', dest: 'Pokhara', altM: 822, duration: 'Sightseeing', dist: 'Local', meals: 'B', desc: 'Visit the Peace Pagoda, take a wooden boat on Phewa Lake, or simply relax at your resort with Fishtail mountain views.' },
      { day: 11, title: 'Morning Flight Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min flight', dist: '200 km', meals: 'B, D', desc: 'Fly back to Kathmandu with mountain views. Enjoy our farewell celebration dinner.' },
      { day: 12, title: 'VIP Airport Farewell', dest: 'Home', altM: 1400, duration: 'Transfer', dist: 'Airport', meals: 'B', desc: 'Private transfer to the airport for your onward flight.' }
    ],
    faqs: [
      { q: 'How does the luxury Annapurna Circuit differ from standard teahouse treks?', a: 'We utilize private 4WD Land Cruisers to bypass dusty low-altitude road construction, handpick the highest-rated boutique lodges with private heated rooms, provide an upgraded 1:2 porter ratio and 1:4 guide ratio, and include luxury 5-star accommodations in Pokhara and Kathmandu.' }
    ]
  }
];

remaining5.forEach(r => all12.push(r));

console.log('Total Annapurna packages compiled:', all12.length);
all12.forEach((p, idx) => console.log(`${idx + 1}. [${p.slug}] ${p.title} (${p.duration})`));

module.exports = {
  allAnnapurnaPackages: all12
};
