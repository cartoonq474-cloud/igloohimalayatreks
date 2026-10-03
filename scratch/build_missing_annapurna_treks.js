const fs = require('fs');
const path = require('path');

// Read an existing complete trek page as template reference
const baseTrekContent = fs.readFileSync('trek/mardi-himal-trek/index.html', 'utf8');

// Define the 7 new packages with authentic Annapurna details
const packages = [
  {
    slug: 'annapurna-base-camp-heli-return',
    title: 'Annapurna Base Camp Trek with Helicopter Return (8 Days) — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Base Camp Trek with Helicopter Return (8 Days)',
    metaDesc: 'Trek into the Annapurna Sanctuary to ABC (4,130m) and fly back to Pokhara or Kathmandu by chartered helicopter, cutting off 3-4 days of steep downhill descent.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-base-camp-heli-return/',
    duration: '8 days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '4,130 m',
    maxAltFt: '13,550 ft',
    maxAltNum: 4130,
    price: '1,490',
    activity: 'Trekking & Helicopter Flight',
    accommodation: 'Teahouses & Hotel in Pokhara',
    transport: 'Private Vehicle & Chartered Helicopter',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Jhinu Danda',
    trekEnds: 'Pokhara / Kathmandu',
    region: 'Annapurna',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Annapurna Region • Helicopter Flyback Upgrade',
    overviewH1: 'Annapurna Base Camp Trek with Helicopter Return',
    overviewDesc1: 'The 8-day Annapurna Base Camp Trek with Helicopter Return is the premier time-saving Himalayan journey, combining the classic trek through Gurung villages and bamboo forests into the 360-degree mountain amphitheater of Annapurna Sanctuary with a thrilling helicopter flight back.',
    overviewDesc2: 'Instead of spending 3 to 4 strenuous days retracing your steps downhill, you board a chartered helicopter directly from Annapurna Base Camp (4,130m) under towering peaks like Annapurna I (8,091m) and Machhapuchhre (Fishtail). Soar high above the Modi Khola river gorge for a breathtaking bird’s-eye perspective of the entire Annapurna massif before landing smoothly in Pokhara.',
    images: {
      main: '../../images/annapurna-base-camp-trek-heli-return.webp',
      sub1: '../../images/annapurna-base-camp-trek-heli-return-cost-itinerary-2027.webp',
      sub2: '../../images/annapurna-base-camp-trek-heli-return-cost-itinerary-2027-02.webp',
      sub3: '../../images/annapurna-base-camp-trek.webp',
      sub4: '../../images/annapurna-base-camp-trek-02.webp'
    },
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque (jeep) & Trek to Chhomrong', alt: '2,170m / 7,119ft', hours: '5-6 hrs', dist: '10 km', gain: '+600m', overnight: 'Chhomrong', desc: 'Scenic drive from Pokhara to the Matque trailhead. Begin trekking through beautiful terraced farmlands and cross suspension bridges before climbing up to the bustling Gurung settlement of Chhomrong with grand views of Annapurna South and Fishtail.' },
      { day: 2, title: 'Trek Chhomrong to Bamboo', alt: '2,310m / 7,578ft', hours: '4-5 hrs', dist: '8 km', gain: '+450m', overnight: 'Bamboo', desc: 'Descend 2,500 stone stairs to Chhomrong Khola, cross the suspension bridge, and climb through dense rhododendron, oak, and bamboo forests to Sinuwa before descending into the tranquil gorge of Bamboo.' },
      { day: 3, title: 'Trek Bamboo to Deurali', alt: '3,230m / 10,597ft', hours: '5 hrs', dist: '9 km', gain: '+920m', overnight: 'Deurali', desc: 'A steady upward trek through the narrowing Modi Khola canyon passing Dovan and Himalayan Hotel. Enter alpine shrub zones near Hinku Cave before reaching our mountain teahouse in Deurali.' },
      { day: 4, title: 'Trek Deurali to Machhapuchhre Base Camp (MBC)', alt: '3,700m / 12,139ft', hours: '4-5 hrs', dist: '7 km', gain: '+470m', overnight: 'Machhapuchhre Base Camp', desc: 'Trek past avalanche-prone chutes with caution. As the gorge opens into the sacred Annapurna Sanctuary, enjoy stunning up-close panoramas of Machhapuchhre (Fishtail), Gangapurna, and Annapurna III.' },
      { day: 5, title: 'Trek MBC to Annapurna Base Camp (ABC)', alt: '4,130m / 13,550ft', hours: '2-3 hrs', dist: '4 km', gain: '+430m', overnight: 'Annapurna Base Camp', desc: 'A gentle morning climb into the center of the vast glacial amphitheater. Spend an unforgettable afternoon standing before the south face of Annapurna I (8,091m), Hiunchuli, and Annapurna South.' },
      { day: 6, title: 'Dawn Sunrise at ABC & Charter Helicopter Flight to Pokhara', alt: '822m / 2,696ft', hours: '25 min flight', dist: 'Air', gain: '-3,308m', overnight: 'Pokhara', desc: 'Watch golden sunrise light illuminate Annapurna I and the amphitheater peaks. After hot breakfast, board our chartered helicopter for an exhilarating flight back to Pokhara, soaring over the route you walked. Rest of day free to relax lakeside.' },
      { day: 7, title: 'Scenic Drive or Flight Pokhara to Kathmandu', alt: '1,400m / 4,593ft', hours: '25 min flight / 6 hr drive', dist: '200 km', gain: '0m', overnight: 'Kathmandu', desc: 'Return to Kathmandu. Check in to your hotel, explore Thamel for handicraft and souvenir shopping, and celebrate with an evening farewell dinner hosted by Igloo Himalaya Treks.' },
      { day: 8, title: 'Final Departure from Kathmandu', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Private transfer to Tribhuvan International Airport for your flight home, with lifelong memories of your Himalayan adventure.' }
    ],
    faqs: [
      { q: 'How does the helicopter return from Annapurna Base Camp work?', a: 'On Day 6, after viewing sunrise at ABC, a private chartered helicopter lands directly on the ABC helipad (4,130m). Trekkers board with their daypacks and luggage and take a 20-25 minute scenic flight back to Pokhara Airport, saving 3 to 4 days of downhill trekking.' },
      { q: 'What happens if bad weather prevents the helicopter from flying?', a: 'Himalayan mountain weather is monitored closely. In the rare event that morning fog or wind delays the flight, pilots wait for weather clearance. If flights are completely grounded, trekkers descend safely on foot with their guide, and helicopter refunds or re-schedules are handled per policy.' },
      { q: 'Is altitude sickness a risk on the 8-day heli return trek?', a: 'Because you ascend gradually over 5 days on foot (sleeping at Chhomrong, Bamboo, Deurali, and MBC), your body acclimatizes naturally before sleeping at ABC. The fast descent by helicopter actually eliminates altitude risk immediately.' },
      { q: 'What permits are included?', a: 'The Annapurna Conservation Area Project (ACAP) permit, Trekkers Information Management System (TIMS) card, and all civil aviation helicopter landing permissions are 100% arranged and included.' }
    ]
  },
  {
    slug: 'short-annapurna-base-camp-trek',
    title: 'Short Annapurna Base Camp Trek (6 Days) — Fast Track — Igloo Himalaya Treks',
    seoTitle: 'Short Annapurna Base Camp Trek (6 Days)',
    metaDesc: 'Fast-track 6-day express trek into the heart of Annapurna Sanctuary (4,130m) for fit and experienced hikers with limited holiday time.',
    canonical: 'https://igloohimalayatreks.com/trek/short-annapurna-base-camp-trek/',
    duration: '6 days',
    difficulty: 'Strenuous (Fast-Paced)',
    maxAlt: '4,130 m',
    maxAltFt: '13,550 ft',
    maxAltNum: 4130,
    price: '590',
    activity: 'High-Paced Mountain Trekking',
    accommodation: 'Mountain Teahouses',
    transport: 'Private 4WD Jeep',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / Jhinu Danda',
    region: 'Annapurna',
    packageStart: 'Pokhara',
    packageEnd: 'Pokhara',
    heroBadge: 'Annapurna Region • Express High-Altitude Challenge',
    overviewH1: 'Short Annapurna Base Camp Trek (6 Days)',
    overviewDesc1: 'The Short Annapurna Base Camp Trek is an action-packed 6-day itinerary engineered specifically for fit hikers with tight travel schedules who want to reach the majestic Annapurna Sanctuary without taking two weeks off work.',
    overviewDesc2: 'By utilizing private 4WD jeep transport directly to Matque (past Siwai), we cut off unnecessary road walking. Trekkers hike efficiently through Chhomrong, Bamboo, and Deurali, reaching ABC (4,130m) on Day 3 and descending swiftly back via Jhinu natural hot springs.',
    images: {
      main: '../../images/short-annapurna-base-camp-trek.webp',
      sub1: '../../images/short-annapurna-base-camp-trek-02.webp',
      sub2: '../../images/short-annapurna-base-camp-trek-9-days-itinerary-2027.webp',
      sub3: '../../images/annapurna-base-camp-trek-03.webp',
      sub4: '../../images/annapurna-base-camp-trek-04.webp'
    },
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque (3 hrs) & Trek to Lower Sinuwa', alt: '2,340m / 7,677ft', hours: '5 hrs trek', dist: '9 km', gain: '+850m', overnight: 'Sinuwa', desc: 'Early morning 4WD jeep drive to Matque. Cross the suspension bridge and climb past Jhinu Danda and Chhomrong, descending to Chhomrong Khola before a final climb to Lower Sinuwa.' },
      { day: 2, title: 'Trek Sinuwa to Deurali', alt: '3,230m / 10,597ft', hours: '6-7 hrs', dist: '12 km', gain: '+890m', overnight: 'Deurali', desc: 'An energetic hiking day passing Bamboo, Dovan, and Himalaya Hotel through lush rhododendron and mossy bamboo forests, arriving at Deurali beneath towering canyon cliffs.' },
      { day: 3, title: 'Trek Deurali to Annapurna Base Camp (4,130m) via MBC', alt: '4,130m / 13,550ft', hours: '5-6 hrs', dist: '11 km', gain: '+900m', overnight: 'Annapurna Base Camp', desc: 'Climb past Machhapuchhre Base Camp into the heart of the Annapurna Sanctuary. Witness an extraordinary sunset lighting up Annapurna South and the legendary 8,091m south face of Annapurna I.' },
      { day: 4, title: 'Dawn Sunrise at ABC & Trek Down to Bamboo', alt: '2,310m / 7,578ft', hours: '6-7 hrs', dist: '15 km', gain: '-1,820m', overnight: 'Bamboo', desc: 'Take in the majestic 360-degree sunrise. After breakfast, make rapid downhill progress back through MBC, Deurali, and Dovan to reach Bamboo.' },
      { day: 5, title: 'Trek Bamboo to Jhinu Danda Hot Springs', alt: '1,780m / 5,840ft', hours: '5 hrs', dist: '10 km', gain: '-530m', overnight: 'Jhinu Danda', desc: 'Hike uphill to Sinuwa, drop down to Chhomrong river, and climb Chhomrong before dropping to Jhinu Danda. Relax and rejuvenate tired muscles in the natural riverside hot springs.' },
      { day: 6, title: 'Short Walk to Matque & Private Jeep Drive to Pokhara', alt: '822m / 2,696ft', hours: '1 hr walk + 3 hr drive', dist: '3 km + drive', gain: '-958m', overnight: 'Pokhara', desc: 'Walk across the long Jhinu suspension bridge to the jeep station at Matque. Drive back to Pokhara, arriving by early afternoon for leisure and lakeside celebrations.' }
    ],
    faqs: [
      { q: 'Who is the Short ABC trek suitable for?', a: 'This trek is designed for physically fit individuals who have good stamina and prior hiking experience. Daily walking hours average 6 to 7 hours with steep stone staircase ascents.' },
      { q: 'Is there enough time to acclimatize on the 6-day route?', a: 'Yes, because the highest sleeping elevation is 4,130m (which is lower than Everest Base Camp at 5,364m), fit trekkers who hydrate well and maintain a steady pace adapt successfully. Our guides carry pulse oximeters daily.' },
      { q: 'Can I add extra days if I need to walk slower?', a: 'Absolutely. We offer custom private departures where you can extend this to 7 or 8 days if you prefer a gentler pace.' }
    ]
  },
  {
    slug: 'annapurna-short-trek',
    title: 'Annapurna Short Trek (4 Days) — Poon Hill & Ghandruk — Igloo Himalaya Treks',
    seoTitle: 'Annapurna Short Trek (4 Days)',
    metaDesc: 'Experience the best highlights of the Annapurna foothills in 4 days: sunrise over Annapurna and Dhaulagiri from Poon Hill (3,210m) and Gurung culture in Ghandruk.',
    canonical: 'https://igloohimalayatreks.com/trek/annapurna-short-trek/',
    duration: '4 days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,210 m',
    maxAltFt: '10,531 ft',
    maxAltNum: 3210,
    price: '390',
    activity: 'Scenic Foothill Trekking',
    accommodation: 'Cozy Mountain Teahouses',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-May)',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Kimche',
    region: 'Annapurna',
    packageStart: 'Pokhara',
    packageEnd: 'Pokhara',
    heroBadge: 'Annapurna Region • Perfect Beginner & Family Getaway',
    overviewH1: 'Annapurna Short Trek (4 Days)',
    overviewDesc1: 'The Annapurna Short Trek is the ultimate introductory trek in Nepal, offering world-class Himalayan panoramas, blooming rhododendron forests, and warm Gurung hospitality in a comfortable 4-day loop from Pokhara.',
    overviewDesc2: 'Highlights include climbing the stone stairways of Ulleri, resting in the mountain village of Ghorepani, waking up early for the celebrated dawn sunrise from Poon Hill (3,210m) facing Dhaulagiri (8,167m) and Annapurna I (8,091m), and exploring the ancient stone-paved cultural village of Ghandruk.',
    images: {
      main: '../../images/ghorepani-poon-hill-trek.webp',
      sub1: '../../images/panchase-trek-best-short-trek-near-pokhara-nepal.webp',
      sub2: '../../images/annapurna-4496175-1920.webp',
      sub3: '../../images/ghorepani-poon-hill-vs-mardi-himal-trek.webp',
      sub4: '../../images/mardi-himal-trek-02.webp'
    },
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Nayapul & Trek to Tikhedhunga / Ulleri', alt: '1,960m / 6,430ft', hours: '1.5 hr drive + 4-5 hrs walk', dist: '9 km', gain: '+900m', overnight: 'Ulleri', desc: 'Private drive to Nayapul. Walk along the Modi Khola river to Birethanti, follow the Bhurungdi stream past terraced farmland to Hile, and ascend the famous Ulleri stone staircase.' },
      { day: 2, title: 'Trek Ulleri to Ghorepani', alt: '2,860m / 9,383ft', hours: '4-5 hrs', dist: '8.5 km', gain: '+900m', overnight: 'Ghorepani', desc: 'Walk under a lush canopy of giant rhododendron and oak trees, listening to mountain birds. Arrive in the picturesque ridge-top village of Ghorepani with spectacular views of Dhaulagiri.' },
      { day: 3, title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani / Ghandruk', alt: '1,940m / 6,365ft', hours: '6 hrs total', dist: '12 km', gain: '+350m / -1,270m', overnight: 'Ghandruk', desc: 'Pre-dawn hike up Poon Hill (45 min) for the world-famous golden sunrise across two 8,000m giants (Dhaulagiri & Annapurna I). Return for breakfast, trek through Deurali pass and Tadapani to the cultural village of Ghandruk.' },
      { day: 4, title: 'Explore Ghandruk Village & Drive Back to Pokhara', alt: '822m / 2,696ft', hours: '1.5 hr walk + 2.5 hr drive', dist: '4 km', gain: '-500m', overnight: 'Pokhara', desc: 'Visit the Gurung Cultural Museum and traditional stone houses beneath Annapurna South. Descend stone trails to Kimche and take private transport back to Pokhara.' }
    ],
    faqs: [
      { q: 'Is the Annapurna Short Trek suitable for children and seniors?', a: 'Yes! Because the maximum altitude is 3,210m at Poon Hill and the teahouse lodges are very comfortable, this route is the #1 choice for families with kids and first-time hikers.' },
      { q: 'Can I do this trek in winter or monsoon?', a: 'Yes. Autumn (Oct-Nov) and Spring (Mar-Apr) offer the best mountain clarity and blooming rhododendrons, but winter (Dec-Feb) is clear and peaceful. Even in monsoon, the lower elevation paths are lush and green.' }
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
    maxAlt: '4,500 m',
    maxAltFt: '14,763 ft',
    maxAltNum: 4500,
    price: '750',
    activity: 'Scenic Panoramic Ridge Trekking',
    accommodation: 'Mountain Teahouses',
    transport: 'Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Nayapul',
    trekEnds: 'Pokhara / Siding',
    region: 'Annapurna',
    packageStart: 'Kathmandu / Pokhara',
    packageEnd: 'Kathmandu / Pokhara',
    heroBadge: 'Annapurna Region • Two Iconic Treks in One Journey',
    overviewH1: 'Ghorepani Poon Hill with Mardi Himal Trek (9 Days)',
    overviewDesc1: 'Why choose between Nepal’s most beloved sunrise viewpoint and its most dramatic new ridge trail when you can experience both? The 9-day Ghorepani Poon Hill with Mardi Himal Trek ingeniously combines both world-class itineraries into a seamless loop.',
    overviewDesc2: 'Start on the classic Ghorepani trail to catch sunrise over Dhaulagiri from Poon Hill (3,210m), cross over through Tadapani and Landruk, and climb onto the pristine ridge of Mardi Himal. Hike up to Mardi Himal Base Camp (4,500m) standing virtually face-to-face with the towering, sacred Machhapuchhre (Fishtail).',
    images: {
      main: '../../images/ghorepani-poon-hill-with-mardi-himal-trek.webp',
      sub1: '../../images/ghorepani-poon-hill-with-mardi-himal-trek-10-days.webp',
      sub2: '../../images/ghorepani-poon-hill-and-mardi-himal-trek.webp',
      sub3: '../../images/ghorepani-poon-hill-vs-mardi-himal-trek-which-is-better.webp',
      sub4: '../../images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.webp'
    },
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Nayapul & Trek to Ulleri', alt: '1,960m / 6,430ft', hours: '5 hrs', dist: '9 km', gain: '+900m', overnight: 'Ulleri', desc: 'Scenic drive to Nayapul and hike past Birethanti, climbing the stone steps of Ulleri village.' },
      { day: 2, title: 'Trek Ulleri to Ghorepani', alt: '2,860m / 9,383ft', hours: '4-5 hrs', dist: '8.5 km', gain: '+900m', overnight: 'Ghorepani', desc: 'Walk through ancient rhododendron forests alongside crystal mountain streams to Ghorepani.' },
      { day: 3, title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani', alt: '2,630m / 8,628ft', hours: '5 hrs', dist: '10 km', gain: '+350m', overnight: 'Tadapani', desc: 'Golden sunrise over Annapurna and Dhaulagiri from Poon Hill. Continue along the high forest ridge to Tadapani.' },
      { day: 4, title: 'Trek Tadapani to Landruk via Modi Khola', alt: '1,565m / 5,134ft', hours: '4-5 hrs', dist: '8 km', gain: '-1,065m', overnight: 'Landruk', desc: 'Descend through terraced hillsides, cross the suspension bridge over Modi Khola, and climb into the Gurung settlement of Landruk.' },
      { day: 5, title: 'Trek Landruk to Forest Camp (Kokar)', alt: '2,550m / 8,366ft', hours: '4-5 hrs', dist: '7 km', gain: '+985m', overnight: 'Forest Camp', desc: 'Ascend quietly into the tranquil, moss-draped forest trails connecting the Annapurna valley to the Mardi Himal ridge.' },
      { day: 6, title: 'Trek Forest Camp to High Camp via Badal Danda', alt: '3,580m / 11,745ft', hours: '5 hrs', dist: '8.5 km', gain: '+1,030m', overnight: 'High Camp', desc: 'Climb above tree line onto Badal Danda (Cloud Ridge). Enjoy breathtaking, sheer drop-off views of both Modi Khola and Mardi Khola valleys before reaching High Camp.' },
      { day: 7, title: 'Hike to Mardi Himal Base Camp (4,500m) & Descend to Low Camp', alt: '4,500m / 2,970m', hours: '6-7 hrs', dist: '12 km', gain: '+920m / -1,530m', overnight: 'Low Camp', desc: 'Pre-dawn hike to the Upper Viewpoint and Mardi Himal Base Camp (4,500m). Gaze directly into the jagged south face of Fishtail and Annapurna I before descending to Low Camp.' },
      { day: 8, title: 'Trek Low Camp to Siding Village & Private Jeep to Pokhara', alt: '822m / 2,696ft', hours: '3 hrs walk + 2.5 hrs drive', dist: '6 km + drive', gain: '-1,700m', overnight: 'Pokhara', desc: 'Descend through shade trees to the remote farming village of Siding. Board our private 4WD vehicle for the scenic drive back to Pokhara.' },
      { day: 9, title: 'Fly or Drive Pokhara to Kathmandu', alt: '1,400m / 4,593ft', hours: '25 min flight / 6 hr drive', dist: '200 km', gain: '0m', overnight: 'Kathmandu', desc: 'Return to Kathmandu for shopping, rest, and our celebration farewell dinner.' }
    ],
    faqs: [
      { q: 'How difficult is this combined Poon Hill and Mardi Himal trek?', a: 'It is rated Moderate. While Poon Hill is easy, the ascent from Forest Camp to Mardi Base Camp (4,500m) involves narrow alpine ridge trails and high altitude. Trekking poles and good cardio fitness are recommended.' },
      { q: 'What is the accommodation like along this route?', a: 'Standard comfortable mountain teahouses provide twin-share bedrooms, hot showers (gas or solar), dining hall heating, and wholesome meals.' }
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
    maxAlt: '4,500 m',
    maxAltFt: '14,763 ft',
    maxAltNum: 4500,
    price: '990',
    activity: 'Ultimate High-Altitude Expedition',
    accommodation: 'Mountain Teahouses',
    transport: 'Private 4WD Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Pokhara / Matque',
    trekEnds: 'Pokhara / Siding',
    region: 'Annapurna',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Annapurna Region • Ultimate Two-in-One Sanctuary & Ridge Trek',
    overviewH1: 'Annapurna Base Camp with Mardi Himal Trek (12 Days)',
    overviewDesc1: 'The Annapurna Base Camp with Mardi Himal Trek is the definitive expedition for mountain lovers who want the complete Himalayan spectrum: standing inside the colossal glacier amphitheater of Annapurna Sanctuary (4,130m), followed by walking the razor-sharp alpine ridge of Mardi Himal (4,500m).',
    overviewDesc2: 'Instead of choosing between a glacier valley trek and a ridge panorama trek, our expert route links Chhomrong and Landruk directly onto the Mardi ridge. You experience the iconic south face of Annapurna I as well as the world’s most intimate angle of sacred Machhapuchhre.',
    images: {
      main: '../../images/abc-with-mardi-himal-trek.webp',
      sub1: '../../images/abc-with-mardi-himal-trek-cost-package-itinerary-2026.webp',
      sub2: '../../images/abc-with-mardi-himal-trek-cost-package-itinerary-2026-02.webp',
      sub3: '../../images/annapurna-base-camp-trek.webp',
      sub4: '../../images/machhapuchhre-fishtail-mountain-towering-above-mardi-himal-high-camp-with-colorful-prayer.webp'
    },
    itinerary: [
      { day: 1, title: 'Drive Pokhara to Matque & Trek to Chhomrong', alt: '2,170m / 7,119ft', hours: '5 hrs', dist: '9 km', gain: '+750m', overnight: 'Chhomrong', desc: 'Drive to the Matque trailhead and trek through terraced Gurung hillsides up to Chhomrong.' },
      { day: 2, title: 'Trek Chhomrong to Bamboo', alt: '2,310m / 7,578ft', hours: '4-5 hrs', dist: '8 km', gain: '+450m', overnight: 'Bamboo', desc: 'Cross Chhomrong Khola and ascend through thick bamboo and oak forests to Sinuwa, continuing to Bamboo.' },
      { day: 3, title: 'Trek Bamboo to Deurali', alt: '3,230m / 10,597ft', hours: '5 hrs', dist: '9 km', gain: '+920m', overnight: 'Deurali', desc: 'Hike past Dovan and Himalaya Hotel alongside the roaring Modi Khola gorge to Deurali.' },
      { day: 4, title: 'Trek Deurali to Annapurna Base Camp (4,130m) via MBC', alt: '4,130m / 13,550ft', hours: '5-6 hrs', dist: '11 km', gain: '+900m', overnight: 'Annapurna Base Camp', desc: 'Climb past Machhapuchhre Base Camp into the heart of the Annapurna Sanctuary for an unforgettable sunset.' },
      { day: 5, title: 'Sunrise at ABC & Trek Down to Bamboo', alt: '2,310m / 7,578ft', hours: '6 hrs', dist: '15 km', gain: '-1,820m', overnight: 'Bamboo', desc: 'Witness golden dawn light over Annapurna I (8,091m) and make a steady descent back to Bamboo.' },
      { day: 6, title: 'Trek Bamboo to Jhinu Danda Hot Springs', alt: '1,780m / 5,840ft', hours: '5 hrs', dist: '10 km', gain: '-530m', overnight: 'Jhinu Danda', desc: 'Hike to Chhomrong and descend to Jhinu Danda. Soak in the riverside natural hot springs.' },
      { day: 7, title: 'Trek Jhinu Danda to Landruk', alt: '1,565m / 5,134ft', hours: '3-4 hrs', dist: '6 km', gain: '-215m', overnight: 'Landruk', desc: 'Cross the long Modi Khola suspension bridge and enjoy an easy, scenic trek into the traditional Gurung village of Landruk.' },
      { day: 8, title: 'Trek Landruk to Forest Camp (Kokar)', alt: '2,550m / 8,366ft', hours: '4-5 hrs', dist: '7 km', gain: '+985m', overnight: 'Forest Camp', desc: 'Climb up onto the secluded Mardi Himal ridge trail through tranquil rhododendron forests.' },
      { day: 9, title: 'Trek Forest Camp to High Camp via Badal Danda', alt: '3,580m / 11,745ft', hours: '5 hrs', dist: '8.5 km', gain: '+1,030m', overnight: 'High Camp', desc: 'Traverse the dramatic alpine ridge above tree line with views of Fishtail looming directly above.' },
      { day: 10, title: 'Hike to Mardi Himal Base Camp (4,500m) & Descend to Low Camp', alt: '4,500m / 2,970m', hours: '6-7 hrs', dist: '12 km', gain: '+920m / -1,530m', overnight: 'Low Camp', desc: 'Sunrise ascent to Mardi Himal Base Camp for an intimate Fishtail panorama; descend to Low Camp.' },
      { day: 11, title: 'Trek Low Camp to Siding & Private 4WD Drive to Pokhara', alt: '822m / 2,696ft', hours: '3 hrs walk + 2.5 hrs drive', dist: '6 km + drive', gain: '-1,700m', overnight: 'Pokhara', desc: 'Descend through forest to Siding village and drive back to Pokhara for a hot shower and lakeside dining.' },
      { day: 12, title: 'Drive or Fly Pokhara to Kathmandu', alt: '1,400m / 4,593ft', hours: '25 min flight / 6 hr drive', dist: '200 km', gain: '0m', overnight: 'Kathmandu', desc: 'Transfer to Kathmandu. Farewell celebratory dinner with your expedition team.' }
    ],
    faqs: [
      { q: 'How physically demanding is the ABC + Mardi Himal combo?', a: 'This is a strenuous high-altitude trek with multiple 6+ hour days and two peaks above 4,100 meters. Proper cardiovascular preparation and prior trekking experience are strongly recommended.' },
      { q: 'What gear is needed for this combined route?', a: 'Standard trekking gear with four-season layering, a 0°C to -10°C rated sleeping bag, microspikes (for potential icy patches near ABC or Mardi Base Camp in spring/late autumn), and reliable hiking boots.' }
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
    maxAlt: '2,050 m',
    maxAltFt: '6,725 ft',
    maxAltNum: 2050,
    price: '1,690',
    activity: 'Luxury Mountain Lodge Trekking',
    accommodation: 'Premier Heritage Mountain Lodges & 5-Star Hotels',
    transport: 'Private VIP Vehicle & Domestic Flights',
    meals: 'All Gourmet Meals Included (B,L,D)',
    season: 'Sep-May (Best Oct-Dec & Mar-Apr)',
    trekStarts: 'Kathmandu / Pokhara',
    trekEnds: 'Kathmandu / Pokhara',
    region: 'Annapurna',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Annapurna Region • VIP Comfort & Heritage Boutique Lodges',
    overviewH1: 'Annapurna Luxury Lodge Trek (7 Days)',
    overviewDesc1: 'The 7-day Annapurna Luxury Lodge Trek redefines Himalayan exploration. Experience awe-inspiring mountain vistas without sacrificing comfort, resting each evening in prestigious luxury boutique lodges featuring en-suite hot bathrooms, plush down duvets, landscaped garden courtyards, and gourmet dining.',
    overviewDesc2: 'Follow gentle stone pathways through subtropical valleys and picturesque Gurung hamlets, taking in close-up views of Annapurna South, Hiunchuli, and the sacred Machhapuchhre (Fishtail). Combined with 5-star hospitality in Kathmandu and Pokhara, this is Nepal’s finest soft-adventure getaway.',
    images: {
      main: '../../images/annapurna-luxury-trek.webp',
      sub1: '../../images/annapurna-luxury-trek-02.webp',
      sub2: '../../images/annapurna-luxury-trek-2.webp',
      sub3: '../../images/annapurna-luxury-trek-3.webp',
      sub4: '../../images/annapurna-luxury-trek-4.webp'
    },
    itinerary: [
      { day: 1, title: 'Arrive in Kathmandu – VIP Welcome & 5-Star Hotel', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Dwarika’s / Marriott Hotel', desc: 'VIP airport greeting and luxury transfer to your 5-star hotel in Kathmandu. Evening trip briefing and welcome dinner.' },
      { day: 2, title: 'Scenic Flight to Pokhara & Walk to Sanctuary Lodge (Birethanti)', alt: '1,100m / 3,608ft', hours: '25 min flight + 1.5 hr drive + 30 min walk', dist: '3 km', gain: '-300m', overnight: 'Sanctuary Lodge', desc: 'Mountain flight to Pokhara with views of the Himalayan range. Private transfer to Birethanti and check in to the exquisite riverside Sanctuary Lodge surrounded by tropical gardens.' },
      { day: 3, title: 'Trek to Himalaya Lodge (Ghandruk)', alt: '2,010m / 6,594ft', hours: '4-5 hrs', dist: '8 km', gain: '+910m', overnight: 'Himalaya Lodge', desc: 'Hike through terraced fields and Gurung villages to Ghandruk. Settle into the Himalaya Lodge, with private balconies directly facing the sheer south face of Annapurna.' },
      { day: 4, title: 'Scenic Walk to Gurung Lodge (Majgaun)', alt: '1,400m / 4,593ft', hours: '4 hrs', dist: '7 km', gain: '-610m', overnight: 'Gurung Lodge', desc: 'Descend gently through farmland and rhododendron forests to Majgaun. Enjoy traditional afternoon tea in the lodge’s panoramic stone garden.' },
      { day: 5, title: 'Trek to Basanta Lodge (Dhampus)', alt: '1,530m / 5,019ft', hours: '3-4 hrs', dist: '6 km', gain: '+130m', overnight: 'Basanta Lodge', desc: 'Walk along the ridge trail to the charming village of Dhampus. Unobstructed, panoramic sunset views of the entire Annapurna range.' },
      { day: 6, title: 'Sunrise over Fishtail, Walk to Phedi & Luxury Resort in Pokhara', alt: '822m / 2,696ft', hours: '1.5 hr walk + 30 min drive', dist: '4 km', gain: '-708m', overnight: 'The Pavilions Himalayas', desc: 'Watch golden morning light hit Machhapuchhre. Walk down stone steps to Phedi and transfer to Pokhara’s premier luxury eco-resort for spa treatments and relaxation.' },
      { day: 7, title: 'Morning Flight to Kathmandu & Departure', alt: '1,400m / 4,593ft', hours: '25 min flight', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Fly back to Kathmandu. Connect seamlessly with your international flight or extend your stay in Nepal.' }
    ],
    faqs: [
      { q: 'What amenities are available in the luxury lodges?', a: 'Each room has comfortable beds with premium duvets, electric heated mattress pads or hot water bottles, attached private bathrooms with running hot water, flush toilets, and locally crafted organic toiletries. Dining includes multi-course chef-prepared meals.' },
      { q: 'What is the maximum altitude on the Annapurna Luxury Trek?', a: 'The highest overnight stay is at Ghandruk (2,010m / 6,594ft), meaning there is virtually zero risk of altitude sickness. It is ideal for all age groups.' }
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
    maxAlt: '5,416 m',
    maxAltFt: '17,769 ft',
    maxAltNum: 5416,
    price: '1,990',
    activity: 'High-Altitude Pass Crossing with VIP Comfort',
    accommodation: 'Best Available Boutique Mountain Lodges & 5-Star City Hotels',
    transport: 'Private 4WD Land Cruiser & Domestic Flight',
    meals: 'All Meals Included (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Kathmandu / Besisahar',
    trekEnds: 'Kathmandu / Pokhara',
    region: 'Annapurna',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Annapurna Region • Upgraded Comfort Mountain Expedition',
    overviewH1: 'Annapurna Circuit Luxury Trek (12 Days)',
    overviewDesc1: 'The 12-day Annapurna Circuit Luxury Trek elevates the world’s most iconic long-distance Himalayan journey. Cross the legendary Thorong La Pass at 5,416m while enjoying upgraded boutique accommodations, private 4WD expedition support, premium porter and guiding ratios, and comprehensive safety equipment.',
    overviewDesc2: 'Journey from the lush subtropical valleys of Lamjung into the Tibetan-influenced rain shadow of Manang and Mustang. After traversing the pass, rest in boutique comfort in Muktinath and Marpha, ending at a 5-star lakeside sanctuary in Pokhara.',
    images: {
      main: '../../images/annapurna-circuit-luxury-trek.webp',
      sub1: '../../images/annapurna-circuit-luxury-trek-02.webp',
      sub2: '../../images/annapurna-circuit-luxury-trek-03.webp',
      sub3: '../../images/annapurna-circuit-luxury-trek-04.webp',
      sub4: '../../images/annapurna-circuit-luxury-trek-05.webp'
    },
    itinerary: [
      { day: 1, title: 'Private 4WD Transfer Kathmandu to Besisahar & Chame', alt: '2,670m / 8,760ft', hours: '7-8 hrs drive', dist: '220 km', gain: '+1,270m', overnight: 'Chame', desc: 'VIP private 4WD drive along the Marsyangdi River into the mountains, passing waterfalls and entering the district headquarters of Chame.' },
      { day: 2, title: 'Trek Chame to Upper Pisang', alt: '3,300m / 10,826ft', hours: '5 hrs', dist: '14 km', gain: '+630m', overnight: 'Upper Pisang', desc: 'Trek through aromatic pine forests beneath the colossal curved rock face of Paungda Danda to Upper Pisang for grand views of Annapurna II.' },
      { day: 3, title: 'Upper Trail from Pisang to Manang via Ghyaru & Ngawal', alt: '3,540m / 11,614ft', hours: '6-7 hrs', dist: '18 km', gain: '+450m', overnight: 'Manang', desc: 'The scenic high trail offering breathtaking vistas of the Annapurna range. Pass ancient Buddhist chortens and check in to Manang’s premier boutique lodge.' },
      { day: 4, title: 'Acclimatization & Cultural Exploration in Manang', alt: '3,540m / 11,614ft', hours: '3-4 hrs', dist: '5 km', gain: '+300m', overnight: 'Manang', desc: 'Hike to Chongkor viewpoint or Gangapurna glacier lake. Attend an altitude lecture at the Himalayan Rescue Association (HRA) clinic.' },
      { day: 5, title: 'Trek Manang to Yak Kharka', alt: '4,050m / 13,287ft', hours: '4 hrs', dist: '10 km', gain: '+510m', overnight: 'Yak Kharka', desc: 'A gentle, steady climb through alpine meadows and juniper scrub where blue sheep and Himalayan yaks graze.' },
      { day: 6, title: 'Trek Yak Kharka to Thorong Phedi', alt: '4,525m / 14,845ft', hours: '3-4 hrs', dist: '7 km', gain: '+475m', overnight: 'Thorong Phedi', desc: 'Hike to the base of the pass. Rest early, hydrate, and prepare equipment for tomorrow’s summit crossing.' },
      { day: 7, title: 'Cross Thorong La Pass (5,416m) to Muktinath', alt: '5,416m / 3,800m', hours: '8-9 hrs', dist: '16 km', gain: '+891m / -1,616m', overnight: 'Muktinath', desc: 'Pre-dawn climb to the highest point of the circuit at Thorong La Pass (5,416m / 17,769ft). Celebrate with prayer flags and descend into the sacred temple town of Muktinath.' },
      { day: 8, title: 'Explore Muktinath & Private 4WD Drive to Marpha & Tatopani', alt: '1,190m / 3,904ft', hours: '4 hrs drive', dist: '65 km', gain: '-2,610m', overnight: 'Tatopani', desc: 'Visit the sacred 108 water spouts at Muktinath. Private 4WD drive through the Kali Gandaki Gorge and apple orchards of Marpha down to the natural hot springs of Tatopani.' },
      { day: 9, title: 'Drive Tatopani to Pokhara – 5-Star Resort Stay', alt: '822m / 2,696ft', hours: '3-4 hrs drive', dist: '95 km', gain: '-368m', overnight: 'Pokhara', desc: 'Private transfer to Pokhara. Check in to your 5-star lakeside hotel. Rest, indulge in spa treatments, and enjoy a lakeside dinner.' },
      { day: 10, title: 'Pokhara Sightseeing & Leisure Day', alt: '822m / 2,696ft', hours: 'Sightseeing', dist: 'Local', gain: '0m', overnight: 'Pokhara', desc: 'Visit the Peace Pagoda, take a wooden boat on Phewa Lake, or simply relax at your resort with Fishtail mountain views.' },
      { day: 11, title: 'Morning Flight Pokhara to Kathmandu', alt: '1,400m / 4,593ft', hours: '25 min flight', dist: '200 km', gain: '0m', overnight: 'Kathmandu', desc: 'Fly back to Kathmandu with mountain views. Enjoy our farewell celebration dinner.' },
      { day: 12, title: 'VIP Airport Farewell', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Private transfer to the airport for your onward flight.' }
    ],
    faqs: [
      { q: 'How does the luxury Annapurna Circuit differ from standard teahouse treks?', a: 'We utilize private 4WD Land Cruisers to bypass dusty low-altitude road construction, handpick the highest-rated boutique lodges with private heated rooms, provide an upgraded 1:2 porter ratio and 1:4 guide ratio, and include luxury 5-star accommodations in Pokhara and Kathmandu.' },
      { q: 'What safety precautions are taken for Thorong La Pass (5,416m)?', a: 'Our lead guides carry medical-grade oxygen canisters, a portable hyperbaric chamber (PAC bag) protocol, satellite communication, and pulse oximeters. Emergency helicopter evacuation is on 24/7 standby.' }
    ]
  }
];

function generateTrekPage(pkg) {
  let content = baseTrekContent;

  // 1. Meta & Title
  content = content.replace(/<title>[^<]+<\/title>/, `<title>${pkg.title}</title>`);
  content = content.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${pkg.metaDesc}">`);
  content = content.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${pkg.canonical}" />`);
  content = content.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${pkg.canonical}">`);
  content = content.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${pkg.title}">`);
  content = content.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${pkg.metaDesc}">`);
  content = content.replace(/<meta name="twitter:title" content="[^"]*">/g, `<meta name="twitter:title" content="${pkg.title}">`);
  content = content.replace(/<meta name="twitter:description" content="[^"]*">/g, `<meta name="twitter:description" content="${pkg.metaDesc}">`);
  content = content.replace(/<meta property="og:image" content="[^"]*">/g, `<meta property="og:image" content="https://igloohimalayatreks.com/${pkg.images.main.replace('../../', '')}">`);
  content = content.replace(/<meta name="twitter:image" content="[^"]*">/g, `<meta name="twitter:image" content="https://igloohimalayatreks.com/${pkg.images.main.replace('../../', '')}">`);

  // 2. JSON-LD Schemas
  const jsonLdRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  const subTrips = pkg.itinerary.map(item => `          { "@type": "TouristTrip", "name": "Day ${item.day}: ${item.title.replace(/"/g, '\\"')}" }`).join(',\n');
  const faqItems = pkg.faqs.map(item => `          {
            "@type": "Question",
            "name": "${item.q.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${item.a.replace(/"/g, '\\"')}"
            }
          }`).join(',\n');

  const customJsonLd = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "${pkg.canonical}#trip",
        "name": "${pkg.seoTitle.replace(/"/g, '\\"')}",
        "description": "${pkg.metaDesc.replace(/"/g, '\\"')}",
        "touristType": ["Hikers", "Trekking Enthusiasts"],
        "subTrip": [
${subTrips}
        ],
        "offers": {
          "@type": "Offer",
          "price": "${pkg.price.replace(',', '')}",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "${pkg.canonical}"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${pkg.canonical}#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "All Treks", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "${pkg.seoTitle.replace(/"/g, '\\"')}", "item": "${pkg.canonical}" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "${pkg.canonical}#faq",
        "mainEntity": [
${faqItems}
        ]
      }
    ]
  }
  </script>`;
  content = content.replace(jsonLdRegex, customJsonLd);

  // 3. Page Header Section (Badge, H1, Subtitle)
  content = content.replace(/<span class="pill pill-copper"[^>]*>.*?<\/span>/, `<span class="pill pill-copper" style="margin-bottom: 0;">${pkg.heroBadge}</span>`);
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${pkg.overviewH1}</h1>`);
  
  // Replace header description
  const headerDescRegex = /<p style="font-size: 1\.15rem; color: var\(--color-neutral-600\); line-height: 1\.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/;
  const newHeaderDesc = `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">
          ${pkg.metaDesc}
          <span id="ebc-more-text" style="display: none;">
            ${pkg.overviewDesc2}
          </span>
          <button id="ebc-toggle-btn" style="background: none; border: none; color: #1A96C8; font-weight: 700; font-size: 1.05rem; cursor: pointer; padding: 0; margin-left: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; transition: opacity 0.2s ease;">
            Learn more <span style="font-size: 1.1rem; margin-left: 2px;">→</span>
          </button>
        </p>`;
  content = content.replace(headerDescRegex, newHeaderDesc);

  // 4. Hero Collage Gallery Images
  content = content.replace(/(<div class="trek-gallery-main">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.main}$2`);
  content = content.replace(/(<div class="trek-gallery-sub">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub1}$2`);
  content = content.replace(/(<div class="trek-gallery-sub trek-gallery-sub-top-right">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub2}$2`);
  content = content.replace(/(<div class="trek-gallery-sub">\s*<img src=")[^"]+(" alt="Himalayan Peak">)/, `$1${pkg.images.sub3}$2`);
  content = content.replace(/(<div class="trek-gallery-sub trek-gallery-sub-bottom-right">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub4}$2`);

  // 5. Trip Facts Grid values
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Duration<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.duration}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Difficulty<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.difficulty}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Max Altitude<\/span>[\s\S]*?<span[^>]*data-altitude-m=")[^"]*("[^>]*>)[^<]+(<\/span>)/, `$1${pkg.maxAltNum}$2${pkg.maxAlt}$3`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Activity<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.activity}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Accommodation<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.accommodation}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Transport<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.transport}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Meals<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.meals}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Season<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.season}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Trek Starts<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.trekStarts}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Trek End At<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.trekEnds}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Trek Region<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.region}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Package Start Point<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.packageStart}$2`);
  content = content.replace(/(<span style="font-size: 0\.75rem;[^>]*>Package End Point<\/span>[\s\S]*?<span[^>]*>)[^<]+(<\/span>)/, `$1${pkg.packageEnd}$2`);

  // 6. Section 1 Overview Text
  const overviewRegex = /(<section id="section-overview" class="trek-detail-section">[\s\S]*?<h2 class="trek-section-title">Trek Overview<\/h2>)[\s\S]*?(<style>[\s\S]*?\.rich-highlights-container)/;
  const newOverview = `$1
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              ${pkg.overviewDesc1}
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              ${pkg.overviewDesc2}
            </p>
            
            $2`;
  content = content.replace(overviewRegex, newOverview);

  // 7. Dynamic Itinerary Builder
  const itineraryCardsHtml = pkg.itinerary.map(item => `
              <!-- Day ${String(item.day).padStart(2, '0')} -->
              <div class="itinerary-card">
                <div class="itinerary-header">
                  <div class="itinerary-header-left">
                    <h4 class="itinerary-day-title-new">
                      <span class="day-label">Day ${item.day}:</span> ${item.title}
                    </h4>
                    <p class="itinerary-day-subtitle-new">
                      ${item.overnight} – <span>${item.alt}</span> – ${item.hours}
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
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Trek time: ${item.hours}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Accommodation: ${pkg.accommodation.includes('Luxury') ? 'Luxury Heritage Lodge' : 'Mountain Teahouse Lodge'}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path>
                          <path d="M2 10h20"></path>
                        </svg>
                        <span>Trek Distance: ${item.dist}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                          <polyline points="16 7 22 7 22 13"></polyline>
                        </svg>
                        <span>Elevation: ${item.gain}</span>
                      </div>
                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        </svg>
                        <span>Meals: Breakfast, Lunch and Dinner</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                          <circle cx="12" cy="9" r="2.5"></circle>
                        </svg>
                        <span>Overnight: ${item.overnight}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${item.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="${pkg.images.sub1}" alt="${item.title}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="${pkg.images.sub2}" alt="${item.overnight} Mountain View">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="${pkg.images.sub3}" alt="Trail to ${item.overnight}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="${pkg.images.sub4}" alt="Himalayan Panorama">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');

  // Replace itinerary section
  const itineraryContainerRegex = /(<div class="itinerary-accordion-container-new">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>\s*<!-- Section 3: Includes & Excludes -->)/;
  content = content.replace(itineraryContainerRegex, `$1\n${itineraryCardsHtml}\n            </div>\n          </section>\n          <!-- Section 3: Includes & Excludes -->`);

  // 8. Sticky Sidebar Pricing
  content = content.replace(/(<div class="price-amount" data-original-price=")[^"]*(">)\$[^<]*(<\/div>)/g, `$1${pkg.price.replace(',', '')}$2$${pkg.price}$3`);
  content = content.replace(/(<span class="price-tag-value">)\$[^<]*(<\/span>)/g, `$1$${pkg.price}$2`);

  // 9. FAQ Section Accordions
  const faqAccordionHtml = pkg.faqs.map((f, i) => `
              <div class="faq-accordion-item" style="background: white; border: 1px solid var(--color-neutral-200); border-radius: 12px; margin-bottom: 12px; overflow: hidden;">
                <button class="faq-accordion-header" style="width: 100%; text-align: left; padding: 18px 22px; font-weight: 700; color: var(--color-primary-navy); font-size: 1.05rem; background: none; border: none; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                  <span>${f.q}</span>
                  <span style="color: var(--color-copper-orange); font-size: 1.4rem; font-weight: 400;">+</span>
                </button>
                <div class="faq-accordion-body" style="padding: 0 22px 20px 22px; color: var(--color-neutral-700); font-size: 0.95rem; line-height: 1.7;">
                  <p>${f.a}</p>
                </div>
              </div>`).join('\n');

  // Replace FAQs
  const faqRegex = /(<section id="section-faqs"[\s\S]*?<h2 class="trek-section-title">Frequently Asked Questions<\/h2>[\s\S]*?<div class="faq-list">)[\s\S]*?(<\/div>\s*<\/section>)/;
  if (faqRegex.test(content)) {
    content = content.replace(faqRegex, `$1\n${faqAccordionHtml}\n            $2`);
  }

  return content;
}

// Build all packages
packages.forEach(pkg => {
  const dirPath = path.join('trek', pkg.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const pageHtml = generateTrekPage(pkg);
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, pageHtml, 'utf8');
  console.log(`Generated: ${filePath}`);
});

// Build the alias directory for `annapurna-base-camp-helicopter-return-trek`
const aliasDir = path.join('trek', 'annapurna-base-camp-helicopter-return-trek');
if (!fs.existsSync(aliasDir)) {
  fs.mkdirSync(aliasDir, { recursive: true });
}
const aliasHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=../annapurna-base-camp-heli-return/">
  <link rel="canonical" href="https://igloohimalayatreks.com/trek/annapurna-base-camp-heli-return/" />
  <title>Redirecting to Annapurna Base Camp Trek with Helicopter Return...</title>
  <script>window.location.replace('../annapurna-base-camp-heli-return/');</script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 60px 20px; background: #082138; color: white;">
  <h2>Redirecting to Annapurna Base Camp Trek with Helicopter Return...</h2>
  <p style="color: #CBD5E1; margin: 16px 0 24px 0;">If you are not redirected automatically, please follow the link below:</p>
  <a href="../annapurna-base-camp-heli-return/" style="color: #1A96C8; font-size: 1.1rem; font-weight: bold; text-decoration: none; border: 1px solid #1A96C8; padding: 10px 20px; border-radius: 8px;">View Package &rarr;</a>
</body>
</html>`;
fs.writeFileSync(path.join(aliasDir, 'index.html'), aliasHtml, 'utf8');
console.log(`Generated alias redirect: ${path.join(aliasDir, 'index.html')}`);

console.log('All missing Annapurna trek pages successfully built!');
