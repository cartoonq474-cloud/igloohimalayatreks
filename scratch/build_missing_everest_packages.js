const fs = require('fs');
const path = require('path');

// Base trek template
const baseTrekContent = fs.readFileSync('trek/annapurna-base-camp-heli-return/index.html', 'utf8');

// Base tour template
const baseTourContent = fs.readFileSync('tour/nepal-luxury-helicopter-tour/index.html', 'utf8');

const trekPackages = [
  {
    slug: 'everest-base-camp-luxury-trek',
    title: 'Everest Base Camp Luxury Lodge Trek (14 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp Luxury Lodge Trek (14 Days)',
    metaDesc: 'Experience Everest Base Camp (5,364m) and Kala Patthar in ultimate comfort, staying at premier luxury mountain lodges with electric blankets and gourmet dining.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-luxury-trek/',
    duration: '14 days',
    difficulty: 'Moderate to Strenuous (Luxury Comfort)',
    maxAlt: '5,545 m',
    maxAltFt: '18,192 ft',
    maxAltNum: 5545,
    price: '2,490',
    activity: 'Luxury High-Altitude Trekking',
    accommodation: 'Premier Luxury Mountain Lodges & 5-Star Hotel',
    transport: 'Domestic Flights & Private Airport Transfers',
    meals: 'All Gourmet Meals (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Lukla / Phakding',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Everest Region • VIP Comfort & Premier Lodges',
    overviewH1: 'Everest Base Camp Luxury Lodge Trek (14 Days)',
    overviewDesc1: 'The 14-day Everest Base Camp Luxury Lodge Trek redefines Himalayan exploration. Trek the iconic route to Everest Base Camp (5,364m) and Kala Patthar (5,545m) without enduring rough accommodation, resting each evening in the Khumbu’s finest luxury lodges featuring heated beds, en-suite bathrooms, and gourmet dining.',
    overviewDesc2: 'Stay at renowned properties like Yeti Mountain Home and Everest Summit Lodges, where traditional Sherpa hospitality meets five-star comfort. Enjoy hot showers, fresh bakeries, and breathtaking panoramas of Ama Dablam, Lhotse, and Mount Everest.',
    images: {
      main: '../../images/everest-base-camp-luxury-trek.webp',
      sub1: '../../images/everest-base-camp-luxury-trek-1.webp',
      sub2: '../../images/everest-base-camp-luxury-trek-3.webp',
      sub3: '../../images/everest-base-camp-luxury-trek-4.webp',
      sub4: '../../images/everest-base-camp-trek-luxury-14-days-of-comfort-and-adventure.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Luxury Trek to Phakding', alt: '2,610m / 8,563ft', hours: '35 min flight + 3 hrs walk', dist: '8 km', gain: '-250m', overnight: 'Yeti Mountain Home (Phakding)', desc: 'Scenic mountain flight into Lukla. Meet your Sherpa team and take a gentle downhill walk along the Dudh Koshi to check in to the luxurious Yeti Mountain Home in Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'YMH Namche / Everest Summit Lodge', desc: 'Cross high suspension bridges draped in prayer flags, entering Sagarmatha National Park at Monjo. Climb through fragrant pine forests to the vibrant Sherpa capital of Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day – Hike to Hotel Everest View (3,880m)', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Morning walk to the legendary Hotel Everest View for coffee and champagne on the terrace with unobstructed views of Everest, Lhotse, and Ama Dablam. Afternoon exploring Namche.' },
      { day: 4, title: 'Trek Namche to Deboche via Tengboche Monastery', alt: '3,820m / 12,532ft', hours: '5 hrs', dist: '10 km', gain: '+380m', overnight: 'Rivendell Lodge (Deboche)', desc: 'Follow the panoramic high trail above the river gorge, climb to Tengboche Monastery to witness monks chanting, and descend slightly into the serene birch forests of Deboche.' },
      { day: 5, title: 'Trek Deboche to Dingboche', alt: '4,410m / 14,468ft', hours: '5 hrs', dist: '11 km', gain: '+590m', overnight: 'Dingboche Boutique Lodge', desc: 'Walk past ancient mani walls in Pangboche under the soaring pyramid of Ama Dablam. Enter the high alpine Imja Valley and settle into our comfortable lodge in Dingboche.' },
      { day: 6, title: 'Acclimatization Day – Nangkartshang Peak Viewpoint (5,083m)', alt: '5,083m / 16,676ft', hours: '4 hrs', dist: '5 km', gain: '+673m', overnight: 'Dingboche', desc: 'An active acclimatization hike offering breathtaking views of Makalu (8,485m), Island Peak, and the massive Lhotse-Nuptse wall.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', alt: '4,940m / 16,207ft', hours: '5 hrs', dist: '8.5 km', gain: '+530m', overnight: 'Lobuche Boutique Mountain Lodge', desc: 'Ascend past Thokla Pass and the poignant Everest Climbers Memorial. Walk alongside the terminal moraine of the Khumbu Glacier to Lobuche.' },
      { day: 8, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', alt: '5,364m / 17,598ft', hours: '7-8 hrs', dist: '13 km', gain: '+424m', overnight: 'Gorak Shep Luxury Teahouse', desc: 'Trek over glacier moraines to Gorak Shep, drop heavy gear, and proceed to Everest Base Camp. Stand on the Khumbu Glacier directly beneath the historic icefall.' },
      { day: 9, title: 'Sunrise Climb of Kala Patthar (5,545m) & Descend to Pheriche', alt: '5,545m / 4,240m', hours: '6-7 hrs', dist: '14 km', gain: '+375m / -1,305m', overnight: 'Pheriche Luxury Lodge', desc: 'Early morning ascent of Kala Patthar for the world’s most iconic close-up sunrise over Mt. Everest. Descend to Pheriche for an oxygen-rich night of deep rest.' },
      { day: 10, title: 'Trek Pheriche to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '6 hrs', dist: '15 km', gain: '-800m', overnight: 'Yeti Mountain Home (Namche)', desc: 'Descend through Pangboche and Tengboche back to Namche Bazaar. Enjoy hot showers, craft bakeries, and celebratory evening dinners.' },
      { day: 11, title: 'Trek Namche Bazaar to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '19 km', gain: '-580m', overnight: 'Yeti Mountain Home (Lukla)', desc: 'Retrace our steps down the Hillary bridge and past Phakding back to Lukla. Enjoy a farewell celebration dinner with our Sherpa guides and crew.' },
      { day: 12, title: 'Scenic Flight Lukla to Kathmandu', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Dwarika’s / Marriott (Kathmandu)', desc: 'Morning flight back to Kathmandu. VIP private transfer to your 5-star hotel for relaxation, spa treatments, and leisure.' },
      { day: 13, title: 'Kathmandu World Heritage Exploration & Spa Day', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Private guided cultural tour of Patan Durbar Square and Boudhanath Stupa, with an evening fine-dining farewell banquet.' },
      { day: 14, title: 'VIP Airport Transfer & International Departure', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Private transfer to the airport for your flight home.' }
    ],
    faqs: [
      { q: 'What makes the Everest Luxury Lodge trek different from standard teahouses?', a: 'You stay at the finest properties in the Khumbu (Yeti Mountain Home and Everest Summit Lodges). Rooms have electric mattress heaters, en-suite bathrooms with hot running water, Western flush toilets, down duvets, and multi-course à la carte menus.' },
      { q: 'What is the porter and guide ratio on this luxury trek?', a: 'We provide an exclusive 1:1 or 1:2 porter service, plus a certified lead Sherpa guide and assistant guide for groups, ensuring maximum personalized care and comfort.' }
    ]
  },
  {
    slug: 'gokyo-lakes-luxury-trek',
    title: 'Gokyo Lakes Luxury Lodge Trek (11 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lakes Luxury Lodge Trek (11 Days)',
    metaDesc: 'Explore the pristine turquoise alpine lakes of Gokyo and summit Gokyo Ri (5,357m) with luxury lodge accommodations and premier Sherpa guiding.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lakes-luxury-trek/',
    duration: '11 days',
    difficulty: 'Moderate (Luxury Comfort)',
    maxAlt: '5,357 m',
    maxAltFt: '17,575 ft',
    maxAltNum: 5357,
    price: '1,890',
    activity: 'Scenic Alpine Lake Luxury Trek',
    accommodation: 'Luxury Mountain Lodges & 5-Star Hotel',
    transport: 'Domestic Flights & Private Transfers',
    meals: 'All Meals (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Lukla',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Everest Region • Sacred Turquoise Lakes in Comfort',
    overviewH1: 'Gokyo Lakes Luxury Lodge Trek (11 Days)',
    overviewDesc1: 'The Gokyo Lakes Luxury Lodge Trek offers an intimate, tranquil alternative to the crowded Everest Base Camp trail. Journey up the sacred Dudh Koshi valley to the glacial lakes of Gokyo, resting each evening in premium comfort lodges with heating, cozy beds, and delicious dining.',
    overviewDesc2: 'Highlights include climbing Gokyo Ri (5,357m) for what many mountaineers consider the single finest mountain panorama in the world: a view capturing Everest (8,848m), Lhotse (8,516m), Makalu (8,485m), and Cho Oyu (8,188m) alongside the massive Ngozumpa Glacier.',
    images: {
      main: '../../images/gokyo-lakes-luxury-trek.webp',
      sub1: '../../images/gokyo-lakes-luxury-trek-02.webp',
      sub2: '../../images/gokyo-lakes-luxury-trek-03.webp',
      sub3: '../../images/gokyo-lakes-luxury-trek-04.webp',
      sub4: '../../images/gokyo-lakes-luxury-trek-comfort-in-the-everest-region.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Luxury Trek to Phakding', alt: '2,610m / 8,563ft', hours: '3 hrs', dist: '8 km', gain: '-250m', overnight: 'Phakding Luxury Lodge', desc: 'Scenic flight into Lukla and gentle stroll to Phakding for our first luxury lodge stay.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Luxury Lodge', desc: 'Cross Hillary suspension bridge and climb into Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day in Namche Bazaar', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Luxury Lodge', desc: 'Hike to Everest View Hotel terrace for coffee with views of Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', alt: '4,110m / 13,484ft', hours: '5-6 hrs', dist: '12 km', gain: '+670m', overnight: 'Dole Comfort Lodge', desc: 'Leave the main EBC trail at Sanasa and climb through quiet rhododendron and birch forests past Mong La to Dole.' },
      { day: 5, title: 'Trek Dole to Machhermo', alt: '4,470m / 14,665ft', hours: '4-5 hrs', dist: '7 km', gain: '+360m', overnight: 'Machhermo Comfort Lodge', desc: 'Trek along the scenic high ridge with views of Cho Oyu and attend an altitude safety briefing at the Machhermo clinic.' },
      { day: 6, title: 'Trek Machhermo to Gokyo First, Second & Third Lakes', alt: '4,790m / 15,715ft', hours: '4-5 hrs', dist: '8 km', gain: '+320m', overnight: 'Gokyo Resort Lodge', desc: 'Climb past the first and second sacred emerald lakes to reach the lakeside settlement of Gokyo beside Dudh Pokhari.' },
      { day: 7, title: 'Dawn Climb of Gokyo Ri (5,357m) & Explore Ngozumpa Glacier', alt: '5,357m / 17,575ft', hours: '5 hrs', dist: '6 km', gain: '+567m', overnight: 'Gokyo Resort Lodge', desc: 'Sunrise summit of Gokyo Ri for 4 x 8,000m giants. Afternoon walk along the glacier edge.' },
      { day: 8, title: 'Trek Gokyo to Phortse Village', alt: '3,810m / 12,500ft', hours: '5-6 hrs', dist: '12 km', gain: '-980m', overnight: 'Phortse Heritage Lodge', desc: 'Descend the eastern side of the valley to the traditional, peaceful Sherpa agricultural village of Phortse.' },
      { day: 9, title: 'Trek Phortse to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '4-5 hrs', dist: '9 km', gain: '-370m', overnight: 'Namche Luxury Lodge', desc: 'High scenic traverse back to Namche Bazaar for celebratory dining and shopping.' },
      { day: 10, title: 'Trek Namche Bazaar to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '19 km', gain: '-580m', overnight: 'Lukla Luxury Lodge', desc: 'Descend to Lukla for our farewell banquet with the Sherpa guiding crew.' },
      { day: 11, title: 'Flight Lukla to Kathmandu & Departure', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Home', desc: 'Flight to Kathmandu and onward connection.' }
    ],
    faqs: [
      { q: 'Is Gokyo Lakes easier than Everest Base Camp?', a: 'Gokyo has fewer crowds and a slightly shorter distance, but climbing Gokyo Ri (5,357m) is steep. Overall it is considered equivalent in difficulty to EBC, but far more scenic and peaceful.' }
    ]
  },
  {
    slug: 'gokyo-lake-trek-with-helicopter-return',
    title: 'Gokyo Lake Trek with Helicopter Return (9 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lake Trek with Helicopter Return (9 Days)',
    metaDesc: 'Trek through the Dudh Koshi valley to the sacred Gokyo Lakes and Gokyo Ri (5,357m), then fly back to Kathmandu by chartered helicopter.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lake-trek-with-helicopter-return/',
    duration: '9 days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '5,357 m',
    maxAltFt: '17,575 ft',
    maxAltNum: 5357,
    price: '1,750',
    activity: 'Scenic Trek & Helicopter Flyback',
    accommodation: 'Mountain Teahouses & Hotel in Kathmandu',
    transport: 'Domestic Flight, Helicopter Charter & Private Car',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Lukla',
    trekEnds: 'Kathmandu (via Helicopter)',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Everest Region • Sacred Lakes with Helicopter Flyback',
    overviewH1: 'Gokyo Lake Trek with Helicopter Return (9 Days)',
    overviewDesc1: 'The 9-day Gokyo Lake Trek with Helicopter Return is the ultimate express high-altitude adventure. Hike through Sherpa villages and peaceful birch forests to the emerald lakes of Gokyo, summit Gokyo Ri (5,357m), and bypass the 3-day downhill return trek with a scenic helicopter flight directly back to Kathmandu.',
    overviewDesc2: 'Fly over the massive Ngozumpa Glacier, the Dudh Koshi canyon, and the Himalayan foothills, experiencing both the boots-on-the-ground trek and the exhilarating aerial perspective.',
    images: {
      main: '../../images/gokyo-lake-trek-with-helicopter-return.webp',
      sub1: '../../images/gokyo-lake-trek-with-helicopter-return-aerial-adventure-02.webp',
      sub2: '../../images/gokyo-lake-trek-with-helicopter-return-aerial-adventure-03.webp',
      sub3: '../../images/gokyo-lake-trek-with-helicopter-return-aerial-adventure.webp',
      sub4: '../../images/gokyo-lake-trek-helicopter-return.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', alt: '2,610m / 8,563ft', hours: '3 hrs', dist: '8 km', gain: '-250m', overnight: 'Phakding', desc: 'Flight to Lukla and easy walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Bazaar', desc: 'Enter Sagarmatha National Park and climb to Namche.' },
      { day: 3, title: 'Acclimatization Day in Namche Bazaar', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Hike to Hotel Everest View for acclimatization.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', alt: '4,110m / 13,484ft', hours: '5-6 hrs', dist: '12 km', gain: '+670m', overnight: 'Dole', desc: 'Ascend past Mong La into the quiet Gokyo valley.' },
      { day: 5, title: 'Trek Dole to Machhermo', alt: '4,470m / 14,665ft', hours: '4-5 hrs', dist: '7 km', gain: '+360m', overnight: 'Machhermo', desc: 'Trek along high meadows under Cho Oyu.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes', alt: '4,790m / 15,715ft', hours: '4-5 hrs', dist: '8 km', gain: '+320m', overnight: 'Gokyo', desc: 'Reach the shimmering turquoise waters of Third Lake (Dudh Pokhari).' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m)', alt: '5,357m / 17,575ft', hours: '4 hrs', dist: '5 km', gain: '+567m', overnight: 'Gokyo', desc: 'Unrivaled dawn views of Everest, Lhotse, Makalu, and Cho Oyu from Gokyo Ri.' },
      { day: 8, title: 'Charter Helicopter Flight from Gokyo to Kathmandu', alt: '1,400m / 4,593ft', hours: '50 min flight', dist: 'Air', gain: '-3,390m', overnight: 'Kathmandu', desc: 'Board your private chartered helicopter directly from the Gokyo helipad. Soar over the Khumbu range and land in Kathmandu by mid-morning. Free afternoon.' },
      { day: 9, title: 'Final Departure from Kathmandu', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Transfer to airport for your onward journey.' }
    ],
    faqs: [
      { q: 'Where does the helicopter pick us up?', a: 'The chartered helicopter lands directly at the Gokyo helipad situated at 4,790m beside the lake. You fly directly back to Kathmandu (or Lukla for refueling then Kathmandu).' }
    ]
  },
  {
    slug: 'everest-base-camp-trek-without-flight',
    title: 'Everest Base Camp Trek Without Flight (Road-Based 16 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp Trek Without Flight (Road-Based 16 Days)',
    metaDesc: 'Overland 16-day Everest Base Camp trek via Salleri and Tham Danda. 100% flight-delay-free alternative avoiding Lukla airport weather cancellations.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-trek-without-flight/',
    duration: '16 days',
    difficulty: 'Strenuous (High Endurance)',
    maxAlt: '5,545 m',
    maxAltFt: '18,192 ft',
    maxAltNum: 5545,
    price: '1,190',
    activity: 'Overland High-Endurance Trek',
    accommodation: 'Mountain Teahouses',
    transport: 'Private 4WD Jeep Transfer',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Sep-Nov & Mar-May',
    trekStarts: 'Kathmandu / Tham Danda',
    trekEnds: 'Tham Danda / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Everest Region • 100% Flight-Delay-Free Overland Route',
    overviewH1: 'Everest Base Camp Trek Without Flight (Road-Based)',
    overviewDesc1: 'Avoid the stress, uncertainty, and weather cancellations of Lukla flights. The 16-day Everest Base Camp Trek Without Flight travels overland by private 4WD jeep from Kathmandu through the rolling hills of Salleri directly to the trailhead at Tham Danda / Paiya.',
    overviewDesc2: 'Follow the historic expedition trail used by early mountaineers, walking through authentic non-commercial Rai and Sherpa villages in the lower Solu region before merging with the main trail to Namche Bazaar, Everest Base Camp (5,364m), and Kala Patthar (5,545m).',
    images: {
      main: '../../images/everest-base-camp-trek-without-flight.webp',
      sub1: '../../images/everest-base-camp-trek-without-flight-02.webp',
      sub2: '../../images/everest-base-camp-trek-without-flight-03.webp',
      sub3: '../../images/everest-base-camp-trek-without-flight-best-itinerary-cost.webp',
      sub4: '../../images/what-is-it-like-to-go-on-the-everest-base-camp-trek-without-flight.webp'
    },
    itinerary: [
      { day: 1, title: 'Scenic 4WD Drive Kathmandu to Salleri & Tham Danda', alt: '2,360m / 7,742ft', hours: '9-10 hrs drive', dist: '260 km', gain: '+960m', overnight: 'Tham Danda', desc: 'Private 4WD jeep drive through the Sun Koshi river valley, pine hills of Okhaldhunga, and Salleri to Tham Danda.' },
      { day: 2, title: 'Trek Tham Danda to Paiya (Chutok)', alt: '2,730m / 8,956ft', hours: '5-6 hrs', dist: '10 km', gain: '+370m', overnight: 'Paiya', desc: 'Trek through lush forest and farming hamlets with views of Dudh Koshi gorge.' },
      { day: 3, title: 'Trek Paiya to Phakding via Surke', alt: '2,610m / 8,563ft', hours: '5-6 hrs', dist: '12 km', gain: '-120m', overnight: 'Phakding', desc: 'Bypass Lukla via the scenic lower trail of Surke, connecting directly into the main Everest trail at Phakding.' },
      { day: 4, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Bazaar', desc: 'Climb to the Sherpa capital of Namche.' },
      { day: 5, title: 'Acclimatization Day at Everest View Hotel', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Acclimatization hike with views of Everest and Ama Dablam.' },
      { day: 6, title: 'Trek Namche to Tengboche Monastery', alt: '3,860m / 12,664ft', hours: '5 hrs', dist: '10 km', gain: '+420m', overnight: 'Tengboche', desc: 'Visit Tengboche Monastery beneath Ama Dablam.' },
      { day: 7, title: 'Trek Tengboche to Dingboche', alt: '4,410m / 14,468ft', hours: '5 hrs', dist: '11 km', gain: '+550m', overnight: 'Dingboche', desc: 'Trek past Pangboche into the alpine Imja Valley.' },
      { day: 8, title: 'Acclimatization Hike to Nangkartshang Peak', alt: '5,083m / 16,676ft', hours: '4 hrs', dist: '5 km', gain: '+673m', overnight: 'Dingboche', desc: 'Panoramic climb for high-altitude conditioning.' },
      { day: 9, title: 'Trek Dingboche to Lobuche', alt: '4,940m / 16,207ft', hours: '5 hrs', dist: '8.5 km', gain: '+530m', overnight: 'Lobuche', desc: 'Pass the Thokla Pass memorials and glacier moraine.' },
      { day: 10, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', alt: '5,364m / 17,598ft', hours: '7-8 hrs', dist: '13 km', gain: '+424m', overnight: 'Gorak Shep', desc: 'Reach Everest Base Camp on the Khumbu Glacier.' },
      { day: 11, title: 'Kala Patthar Sunrise (5,545m) & Descend to Pheriche', alt: '5,545m / 4,240m', hours: '6-7 hrs', dist: '14 km', gain: '-1,305m', overnight: 'Pheriche', desc: 'Sunrise over Mt. Everest and descent to Pheriche.' },
      { day: 12, title: 'Trek Pheriche to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '6 hrs', dist: '15 km', gain: '-800m', overnight: 'Namche Bazaar', desc: 'Descend to Namche Bazaar for celebration.' },
      { day: 13, title: 'Trek Namche Bazaar to Paiya', alt: '2,730m / 8,956ft', hours: '6-7 hrs', dist: '18 km', gain: '-710m', overnight: 'Paiya', desc: 'Hike south down the valley past Surke to Paiya.' },
      { day: 14, title: 'Trek Paiya to Tham Danda', alt: '2,360m / 7,742ft', hours: '4-5 hrs', dist: '9 km', gain: '-370m', overnight: 'Tham Danda', desc: 'Walk back to the roadhead at Tham Danda.' },
      { day: 15, title: 'Private 4WD Drive Tham Danda to Kathmandu', alt: '1,400m / 4,593ft', hours: '9-10 hrs drive', dist: '260 km', gain: '-960m', overnight: 'Kathmandu', desc: 'Full-day scenic drive back to Kathmandu hotel.' },
      { day: 16, title: 'Final Departure from Kathmandu', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Airport transfer for your international flight.' }
    ],
    faqs: [
      { q: 'Why do trekkers choose the overland route without flights?', a: 'Lukla flights frequently face delays or cancellations due to mountain fog. The road-based trek guarantees you start and finish your trip on time, and provides superior gradual acclimatization.' }
    ]
  },
  {
    slug: 'island-peak-climbing',
    title: 'Island Peak Climbing with Everest Base Camp (6,189m — 19 Days) — Igloo Himalaya Treks',
    seoTitle: 'Island Peak Climbing with Everest Base Camp (19 Days)',
    metaDesc: 'Summit Island Peak (Imja Tse 6,189m) combined with Everest Base Camp and Kala Patthar. Certified IFMGA/NNMGA Sherpa climbing leaders and fixed rope training.',
    canonical: 'https://igloohimalayatreks.com/trek/island-peak-climbing/',
    duration: '19 days',
    difficulty: 'Strenuous & Semi-Technical (Alpine Grade PD)',
    maxAlt: '6,189 m',
    maxAltFt: '20,305 ft',
    maxAltNum: 6189,
    price: '2,190',
    activity: 'Mountaineering Peak Climbing & Trekking',
    accommodation: 'Teahouses & Tented Climbing Base Camp',
    transport: 'Domestic Flights & Private Transfers',
    meals: 'All Meals on Trek and Climbing Camp (B,L,D)',
    season: 'Apr-May & Oct-Nov (Prime Summit Windows)',
    trekStarts: 'Lukla',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Peak Climbing Nepal • Iconic 6,000m Himalayan Summit',
    overviewH1: 'Island Peak Climbing with Everest Base Camp (6,189m)',
    overviewDesc1: 'Island Peak (Imja Tse - 6,189m) is Nepal’s most sought-after trekking peak. Located in the heart of the Khumbu valley surrounded by Lhotse, Nuptse, and Ama Dablam, this 19-day expedition seamlessly pairs the full Everest Base Camp trek for flawless acclimatization with a real alpine summit push.',
    overviewDesc2: 'Under the guidance of our certified summit Sherpas, you will master crampon use, ice axe self-arrest, and ascender (jumar) fixed-rope climbing on the headwall, culminating in an awe-inspiring knife-edge ridge walk to the summit of Island Peak.',
    images: {
      main: '../../images/island-peak-climbing.webp',
      sub1: '../../images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.webp',
      sub2: '../../images/three-climbers-standing-on-the-snowy-summit-of-island-peak-6-189-m-with-panoramic-himalaya.webp',
      sub3: '../../images/island-peak-02.webp',
      sub4: '../../images/island-peak-climbing-02.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', alt: '2,610m / 8,563ft', hours: '3 hrs', dist: '8 km', gain: '-250m', overnight: 'Phakding', desc: 'Flight to Lukla and introductory walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Bazaar', desc: 'Ascent to the Sherpa capital of Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Conditioning hike with views of Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche to Tengboche Monastery', alt: '3,860m / 12,664ft', hours: '5 hrs', dist: '10 km', gain: '+420m', overnight: 'Tengboche', desc: 'Visit the spiritual center of the Khumbu at Tengboche.' },
      { day: 5, title: 'Trek Tengboche to Dingboche', alt: '4,410m / 14,468ft', hours: '5 hrs', dist: '11 km', gain: '+550m', overnight: 'Dingboche', desc: 'Ascend into the alpine Imja Valley under Ama Dablam.' },
      { day: 6, title: 'Acclimatization Hike to Nangkartshang Peak (5,083m)', alt: '5,083m / 16,676ft', hours: '4 hrs', dist: '5 km', gain: '+673m', overnight: 'Dingboche', desc: 'Acclimatization climb overlooking Makalu and Island Peak.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', alt: '4,940m / 16,207ft', hours: '5 hrs', dist: '8.5 km', gain: '+530m', overnight: 'Lobuche', desc: 'Trek past the Thokla memorial to Lobuche.' },
      { day: 8, title: 'Trek to Gorak Shep & Everest Base Camp (5,364m)', alt: '5,364m / 17,598ft', hours: '7-8 hrs', dist: '13 km', gain: '+424m', overnight: 'Gorak Shep', desc: 'Visit Everest Base Camp on the Khumbu Glacier.' },
      { day: 9, title: 'Kala Patthar Sunrise (5,545m) & Trek to Dingboche', alt: '5,545m / 4,410m', hours: '6-7 hrs', dist: '14 km', gain: '+375m / -1,135m', overnight: 'Dingboche', desc: 'Climb Kala Patthar for sunrise over Everest, then descend to Dingboche.' },
      { day: 10, title: 'Trek Dingboche to Chhukung & Pre-Climbing Training', alt: '4,730m / 15,518ft', hours: '3-4 hrs', dist: '7 km', gain: '+320m', overnight: 'Chhukung', desc: 'Trek to Chhukung. In the afternoon, practice crampon techniques, jumar fixed-rope climbing, and abseiling with climbing guides.' },
      { day: 11, title: 'Trek Chhukung to Island Peak Base Camp', alt: '5,200m / 17,060ft', hours: '3-4 hrs', dist: '6 km', gain: '+470m', overnight: 'Tented Base Camp', desc: 'Hike to Island Peak Base Camp. Settle into high-altitude expedition tents, check harness and gear, and rest early.' },
      { day: 12, title: 'SUMMIT DAY: Island Peak (6,189m) & Return to Chhukung', alt: '6,189m / 4,730m', hours: '10-12 hrs', dist: '12 km', gain: '+989m / -1,459m', overnight: 'Chhukung Lodge', desc: 'Summit push begins at 1:00 AM. Scramble the rock gully, cross the crampon point onto the glacier, scale the 100m ice headwall with ascenders, and walk the summit ridge to 6,189m! Descend safely to Chhukung.' },
      { day: 13, title: 'Contingency / Weather Reserve Day', alt: '4,730m / 15,518ft', hours: 'Contingency', dist: '0 km', gain: '0m', overnight: 'Chhukung', desc: 'Built-in weather safety day in case of summit delay.' },
      { day: 14, title: 'Trek Chhukung to Pangboche', alt: '3,930m / 12,893ft', hours: '5 hrs', dist: '11 km', gain: '-800m', overnight: 'Pangboche', desc: 'Descend to Pangboche enjoying thick oxygen and village comfort.' },
      { day: 15, title: 'Trek Pangboche to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5 hrs', dist: '12 km', gain: '-490m', overnight: 'Namche Bazaar', desc: 'Trek back to Namche Bazaar for celebrations.' },
      { day: 16, title: 'Trek Namche Bazaar to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '19 km', gain: '-580m', overnight: 'Lukla', desc: 'Final trekking day back to Lukla airport town.' },
      { day: 17, title: 'Flight Lukla to Kathmandu', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Kathmandu Hotel', desc: 'Morning flight back to Kathmandu.' },
      { day: 18, title: 'Leisure & Celebration Day in Kathmandu', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Summit certificate presentation and celebration banquet.' },
      { day: 19, title: 'Final Airport Farewell', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'International flight departure.' }
    ],
    faqs: [
      { q: 'Is Island Peak very technical?', a: 'Island Peak is classified as Alpine Grade PD (Peu Difficile / Slightly Difficult). It involves glaciated walking, crossing crevasses with aluminum ladders, a 100-meter 45-degree headwall using fixed ropes and a jumar, and an exposed summit ridge. Climbing training is provided before summit day.' },
      { q: 'Are climbing permits and gear included?', a: 'Yes. NMA climbing permit, garbage deposit, climbing Sherpa royalty, high camp tents, meals, and safety equipment are included. Personal climbing gear (boots, crampons, harness) can be rented in Chhukung.' }
    ]
  },
  {
    slug: 'mera-peak-climbing',
    title: 'Mera Peak Climbing Expedition (6,476m — 18 Days) — Igloo Himalaya Treks',
    seoTitle: 'Mera Peak Climbing Expedition (18 Days)',
    metaDesc: 'Climb Mera Peak (6,476m), the highest trekking peak in Nepal. Non-technical glaciated ascent offering a 360-degree summit panorama of 5 of the world’s 8,000m giants.',
    canonical: 'https://igloohimalayatreks.com/trek/mera-peak-climbing/',
    duration: '18 days',
    difficulty: 'Strenuous High Altitude (Non-Technical Alpine Grade F/PD-)',
    maxAlt: '6,476 m',
    maxAltFt: '21,247 ft',
    maxAltNum: 6476,
    price: '2,090',
    activity: 'High-Altitude Peak Climbing Expedition',
    accommodation: 'Mountain Teahouses & Tented High Camp',
    transport: 'Domestic Flights & Airport Transfers',
    meals: 'All Meals on Trek and Climbing Camp (B,L,D)',
    season: 'Apr-May & Oct-Nov',
    trekStarts: 'Lukla',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest / Hinku Valley',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Peak Climbing Nepal • Highest Trekking Peak in Nepal (6,476m)',
    overviewH1: 'Mera Peak Climbing Expedition (6,476m)',
    overviewDesc1: 'At 6,476 meters (21,247 ft), Mera Peak is officially the highest permitted trekking peak in Nepal. Located in the remote, pristine wilderness of the Hinku Valley east of the main Everest trail, Mera offers an authentic mountaineering expedition experience without requiring extreme technical rock or ice climbing.',
    overviewDesc2: 'The ascent is a gradual, glaciated snow climb using crampons and ropes. Standing on the summit rewards climbers with the single most magnificent mountain viewpoint on Earth: a panoramic sweep capturing five of the world’s six highest mountains simultaneously — Mt. Everest (8,848m), Lhotse (8,516m), Cho Oyu (8,188m), Makalu (8,485m), and Kanchenjunga (8,586m).',
    images: {
      main: '../../images/mera-peak-climbing.webp',
      sub1: '../../images/climber-trekking-across-the-mera-peak-glacier-surrounded-by-snow-covered-himalayan-mountai.webp',
      sub2: '../../images/mera-peak-climbing-02.webp',
      sub3: '../../images/mera-peak-climbing-03.webp',
      sub4: '../../images/mera-peak-climbing-safe-and-expert-sherpa-guides.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Paiya (Chutok)', alt: '2,730m / 8,956ft', hours: '3-4 hrs', dist: '9 km', gain: '-130m', overnight: 'Paiya', desc: 'Fly to Lukla and head south into the remote wilderness of Hinku Valley.' },
      { day: 2, title: 'Trek Paiya to Panggom', alt: '2,850m / 9,350ft', hours: '5-6 hrs', dist: '11 km', gain: '+120m', overnight: 'Panggom', desc: 'Cross Kari La pass with forest views to the Sherpa village of Panggom.' },
      { day: 3, title: 'Trek Panggom to Ningsow (Ramailo Danda)', alt: '2,860m / 9,383ft', hours: '5 hrs', dist: '10 km', gain: '+10m', overnight: 'Ningsow', desc: 'Trek through bamboo and rhododendron forests into the Hinku watershed.' },
      { day: 4, title: 'Trek Ningsow to Chhatra Khola', alt: '3,150m / 10,334ft', hours: '6 hrs', dist: '12 km', gain: '+290m', overnight: 'Chhatra Khola', desc: 'Enter the Makalu Barun National Park boundary along ridge trails.' },
      { day: 5, title: 'Trek Chhatra Khola to Kothe', alt: '3,600m / 11,811ft', hours: '6 hrs', dist: '13 km', gain: '+450m', overnight: 'Kothe', desc: 'Follow the river gorge up into the majestic glacial valley of Kothe.' },
      { day: 6, title: 'Trek Kothe to Thaknak', alt: '4,350m / 14,271ft', hours: '4 hrs', dist: '9 km', gain: '+750m', overnight: 'Thaknak', desc: 'Trek alongside the river with dramatic views of Mera Peak looming ahead. Visit the 200-year-old Lungsumgba gompa.' },
      { day: 7, title: 'Acclimatization Day at Thaknak', alt: '4,350m / 14,271ft', hours: '3 hrs', dist: '4 km', gain: '+300m', overnight: 'Thaknak', desc: 'Hike to Sabai Tsho glacial lake for acclimatization.' },
      { day: 8, title: 'Trek Thaknak to Khare (Mera Peak Base Camp)', alt: '5,045m / 16,551ft', hours: '4 hrs', dist: '6 km', gain: '+695m', overnight: 'Khare Lodge', desc: 'Climb lateral moraines into Khare, the last teahouse village beneath the peak.' },
      { day: 9, title: 'Pre-Climbing Training at Khare', alt: '5,045m / 16,551ft', hours: '3 hrs', dist: '2 km', gain: '+100m', overnight: 'Khare Lodge', desc: 'Climbing instruction on fixed ropes, man-rope travel, crampon walking, and ice axe self-arrest with our Sherpa guides.' },
      { day: 10, title: 'Trek Khare to Mera High Camp (5,780m)', alt: '5,780m / 18,963ft', hours: '4-5 hrs', dist: '5 km', gain: '+735m', overnight: 'Tented High Camp', desc: 'Climb onto the Mera glacier and cross Mera La (5,415m) to set up High Camp behind a rocky promontory with stupendous 8,000m views.' },
      { day: 11, title: 'SUMMIT DAY: Mera Peak (6,476m) & Return to Khare', alt: '6,476m / 5,045m', hours: '8-10 hrs', dist: '11 km', gain: '+696m / -1,431m', overnight: 'Khare Lodge', desc: '2:00 AM alpine start. Rope up and ascend the vast gentle snowfields. A final 30m 45-degree slope brings you onto the summit at 6,476m! Celebrate the unbelievable 5 x 8,000m view before descending to Khare.' },
      { day: 12, title: 'Contingency / Weather Reserve Day', alt: '5,045m / 16,551ft', hours: 'Reserve', dist: '0 km', gain: '0m', overnight: 'Khare', desc: 'Built-in contingency day for weather safety.' },
      { day: 13, title: 'Trek Khare to Kothe', alt: '3,600m / 11,811ft', hours: '5 hrs', dist: '15 km', gain: '-1,445m', overnight: 'Kothe', desc: 'Fast downhill descent back into the forested valley of Kothe.' },
      { day: 14, title: 'Trek Kothe to Thuli Kharka', alt: '4,300m / 14,107ft', hours: '5-6 hrs', dist: '10 km', gain: '+700m', overnight: 'Thuli Kharka', desc: 'Traverse westward towards the Zatrwa La high pass.' },
      { day: 15, title: 'Cross Zatrwa La Pass (4,600m) & Descend to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '14 km', gain: '+300m / -1,740m', overnight: 'Lukla', desc: 'Cross Zatrwa La with panoramic mountain views and descend directly into Lukla for summit celebration.' },
      { day: 16, title: 'Fly Lukla to Kathmandu', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Kathmandu Hotel', desc: 'Morning flight back to Kathmandu.' },
      { day: 17, title: 'Leisure Day in Kathmandu', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Rest, sightseeing, and summit celebration banquet.' },
      { day: 18, title: 'Final International Departure', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Transfer to airport.' }
    ],
    faqs: [
      { q: 'Is Mera Peak harder than Island Peak?', a: 'Mera Peak is higher (6,476m vs 6,189m), so altitude and cold are bigger factors. However, the climbing itself is less technical than Island Peak—mostly non-technical glaciated walking with crampons and ice axe.' }
    ]
  },
  {
    slug: 'lobuche-peak-climbing',
    title: 'Lobuche East Peak Climbing with Everest Base Camp (6,119m — 19 Days) — Igloo Himalaya Treks',
    seoTitle: 'Lobuche East Peak Climbing with Everest Base Camp (19 Days)',
    metaDesc: 'Summit Lobuche East (6,119m) and trek to Everest Base Camp & Kala Patthar. Technical mixed rock and snow alpine climb overlooking the Khumbu Glacier.',
    canonical: 'https://igloohimalayatreks.com/trek/lobuche-peak-climbing/',
    duration: '19 days',
    difficulty: 'Strenuous & Technical (Alpine Grade PD+)',
    maxAlt: '6,119 m',
    maxAltFt: '20,075 ft',
    maxAltNum: 6119,
    price: '2,290',
    activity: 'Technical Alpine Peak Climbing & Trekking',
    accommodation: 'Mountain Teahouses & High Altitude Tented Camp',
    transport: 'Domestic Flights & Private Transfers',
    meals: 'All Meals on Trek and Climbing Camp (B,L,D)',
    season: 'Apr-May & Oct-Nov',
    trekStarts: 'Lukla',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Peak Climbing Nepal • Technical Ridge Climbing (6,119m)',
    overviewH1: 'Lobuche East Peak Climbing with Everest Base Camp (6,119m)',
    overviewDesc1: 'Lobuche East Peak (6,119m) is widely regarded by international mountain guides as the most rewarding and technically engaging 6,000m peak climb in the Everest region. Situated immediately adjacent to the Khumbu Glacier, this 19-day expedition includes the full Everest Base Camp trek for gold-standard acclimatization.',
    overviewDesc2: 'The summit push features exhilarating mixed rock slab scrambling, an exposed 45-degree snow headwall on fixed lines, and an unforgettable sharp ridge traverse right across from the sheer granite faces of Nuptse, Pumori, and Mt. Everest.',
    images: {
      main: '../../images/lobuche-peak-climbing.webp',
      sub1: '../../images/lobuche-peak-climbing-with-everest-base-camp-16-days.webp',
      sub2: '../../images/lobuche-peak-climbing-02.webp',
      sub3: '../../images/lobuche-peak-climbing-03.webp',
      sub4: '../../images/lobuche-village-in-the-everest-region-of-nepal-with-snow-capped-himalayan-mountains-under.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', alt: '2,610m / 8,563ft', hours: '3 hrs', dist: '8 km', gain: '-250m', overnight: 'Phakding', desc: 'Flight to Lukla and introductory walk along Dudh Koshi.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Bazaar', desc: 'Climb through pine forest to Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Acclimatization walk to Hotel Everest View.' },
      { day: 4, title: 'Trek Namche to Tengboche Monastery', alt: '3,860m / 12,664ft', hours: '5 hrs', dist: '10 km', gain: '+420m', overnight: 'Tengboche', desc: 'Visit Tengboche Monastery beneath Ama Dablam.' },
      { day: 5, title: 'Trek Tengboche to Dingboche', alt: '4,410m / 14,468ft', hours: '5 hrs', dist: '11 km', gain: '+550m', overnight: 'Dingboche', desc: 'Ascend into the alpine Imja Valley.' },
      { day: 6, title: 'Acclimatization Hike to Nangkartshang Peak', alt: '5,083m / 16,676ft', hours: '4 hrs', dist: '5 km', gain: '+673m', overnight: 'Dingboche', desc: 'Altitude conditioning with Makalu panoramas.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', alt: '4,940m / 16,207ft', hours: '5 hrs', dist: '8.5 km', gain: '+530m', overnight: 'Lobuche', desc: 'Ascend past Thokla Memorial alongside the Khumbu glacier.' },
      { day: 8, title: 'Trek to Gorak Shep & Everest Base Camp (5,364m)', alt: '5,364m / 17,598ft', hours: '7-8 hrs', dist: '13 km', gain: '+424m', overnight: 'Gorak Shep', desc: 'Visit Everest Base Camp on the Khumbu glacier.' },
      { day: 9, title: 'Kala Patthar Sunrise (5,545m) & Descend to Lobuche', alt: '5,545m / 4,940m', hours: '6 hrs', dist: '10 km', gain: '+181m / -605m', overnight: 'Lobuche Lodge', desc: 'Sunrise over Mt. Everest and descent to Lobuche village.' },
      { day: 10, title: 'Trek Lobuche to Lobuche East Base Camp', alt: '5,200m / 17,060ft', hours: '3-4 hrs', dist: '5 km', gain: '+260m', overnight: 'Tented Base Camp', desc: 'Trek to the rocky base camp beside Lobuche glacier lake.' },
      { day: 11, title: 'Climb to Lobuche High Camp (5,400m) & Rope Training', alt: '5,400m / 17,716ft', hours: '3-4 hrs', dist: '3 km', gain: '+200m', overnight: 'Tented High Camp', desc: 'Scramble up rocky slab trails to High Camp. Practice fixed line ascending and abseiling.' },
      { day: 12, title: 'SUMMIT DAY: Lobuche East (6,119m) & Return to Pheriche', alt: '6,119m / 4,240m', hours: '9-11 hrs', dist: '12 km', gain: '+719m / -1,879m', overnight: 'Pheriche Lodge', desc: '1:30 AM start. Climb steep snow headwalls, negotiate the technical ridge, and summit at 6,119m with jaw-dropping views directly into the Everest south face! Descend all the way to Pheriche.' },
      { day: 13, title: 'Contingency / Weather Reserve Day', alt: '4,240m / 13,910ft', hours: 'Reserve', dist: '0 km', gain: '0m', overnight: 'Pheriche', desc: 'Built-in contingency day.' },
      { day: 14, title: 'Trek Pheriche to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '6 hrs', dist: '15 km', gain: '-800m', overnight: 'Namche Bazaar', desc: 'Descend to Namche Bazaar for celebratory dining.' },
      { day: 15, title: 'Trek Namche Bazaar to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '19 km', gain: '-580m', overnight: 'Lukla', desc: 'Trek down to Lukla for farewell party with Sherpas.' },
      { day: 16, title: 'Flight Lukla to Kathmandu', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Kathmandu Hotel', desc: 'Fly back to Kathmandu.' },
      { day: 17, title: 'Leisure Day in Kathmandu', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Sightseeing, shopping, and celebration dinner.' },
      { day: 18, title: 'Buffer Day / Shopping in Thamel', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Rest day.' },
      { day: 19, title: 'Final International Departure', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Airport transfer for flight home.' }
    ],
    faqs: [
      { q: 'How does Lobuche East compare to Island Peak?', a: 'Lobuche East is slightly more technical than Island Peak, requiring more sustained rock slab scrambling and a steeper summit snow crest. It is favored by aspiring mountaineers preparing for 7,000m or 8,000m peaks.' }
    ]
  },
  {
    slug: 'three-high-passes-with-island-peak-climb',
    title: 'Three High Passes with Island Peak Climb (21 Days) — Igloo Himalaya Treks',
    seoTitle: 'Three High Passes with Island Peak Climb (21 Days)',
    metaDesc: 'The ultimate Everest expedition: cross Kongma La (5,535m), Cho La (5,420m), Renjo La (5,360m), visit Gokyo & EBC, and summit Island Peak (6,189m).',
    canonical: 'https://igloohimalayatreks.com/trek/three-high-passes-with-island-peak-climb/',
    duration: '21 days',
    difficulty: 'Extreme High Altitude Mountaineering (Grade 5/5)',
    maxAlt: '6,189 m',
    maxAltFt: '20,305 ft',
    maxAltNum: 6189,
    price: '2,690',
    activity: 'Extreme Trekking & Peak Climbing Expedition',
    accommodation: 'Mountain Teahouses & Tented High Camp',
    transport: 'Domestic Flights & Private Transfers',
    meals: 'All Meals Included (B,L,D)',
    season: 'Apr-May & Oct-Nov',
    trekStarts: 'Lukla',
    trekEnds: 'Lukla / Kathmandu',
    region: 'Everest',
    packageStart: 'Kathmandu',
    packageEnd: 'Kathmandu',
    heroBadge: 'Peak Climbing Nepal • 3 High Passes + 6,000m Summit',
    overviewH1: 'Three High Passes with Island Peak Climb (21 Days)',
    overviewDesc1: 'This is the crown jewel of Himalayan mountaineering expeditions. Spanning 21 grueling and magnificent days, it conquers all three legendary 5,000m passes of the Everest region — Renjo La (5,360m), Cho La (5,420m), and Kongma La (5,535m) — visits sacred Gokyo Lakes and Everest Base Camp, and finishes with a triumphant summit climb of Island Peak (6,189m).',
    overviewDesc2: 'No other trek in Nepal delivers this level of continuous wilderness, mountain amphitheater immersion, and physical achievement. Led by our most experienced expedition Sherpa sirdars.',
    images: {
      main: '../../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest.webp',
      sub1: '../../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest-02.webp',
      sub2: '../../images/island-peak-and-3-high-passes-trek-21-days-trek-in-everest-03.webp',
      sub3: '../../images/island-peak-climbing-best-itinerary-and-cost-2027.webp',
      sub4: '../../images/three-climbers-standing-on-the-snowy-summit-of-island-peak-6-189-m-with-panoramic-himalaya.webp'
    },
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', alt: '2,610m / 8,563ft', hours: '3 hrs', dist: '8 km', gain: '-250m', overnight: 'Phakding', desc: 'Flight to Lukla and walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5-6 hrs', dist: '11 km', gain: '+830m', overnight: 'Namche Bazaar', desc: 'Climb into Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', alt: '3,880m / 12,729ft', hours: '4 hrs', dist: '5 km', gain: '+440m', overnight: 'Namche Bazaar', desc: 'Acclimatization hike with Everest view.' },
      { day: 4, title: 'Trek Namche to Thame Village', alt: '3,820m / 12,532ft', hours: '5 hrs', dist: '10 km', gain: '+380m', overnight: 'Thame', desc: 'Trek west into the traditional mountaineering valley of Thame.' },
      { day: 5, title: 'Trek Thame to Lungden', alt: '4,380m / 14,370ft', hours: '5-6 hrs', dist: '12 km', gain: '+560m', overnight: 'Lungden', desc: 'Hike toward the Tibetan trading route at Lungden.' },
      { day: 6, title: 'PASS 1: Cross Renjo La Pass (5,360m) to Gokyo Lakes', alt: '5,360m / 4,790m', hours: '7-8 hrs', dist: '11 km', gain: '+980m / -570m', overnight: 'Gokyo', desc: 'Conquer Renjo La pass with sudden staggering views of Everest and drop down to turquoise Gokyo Lake.' },
      { day: 7, title: 'Gokyo Ri Summit (5,357m) & Trek to Thagnak', alt: '5,357m / 4,700m', hours: '5 hrs', dist: '7 km', gain: '+567m', overnight: 'Thagnak', desc: 'Sunrise on Gokyo Ri and cross Ngozumpa Glacier moraine to Thagnak.' },
      { day: 8, title: 'PASS 2: Cross Cho La Pass (5,420m) to Dzongla', alt: '5,420m / 4,830m', hours: '7-8 hrs', dist: '9 km', gain: '+720m / -590m', overnight: 'Dzongla', desc: 'Cross the icy glaciated saddle of Cho La pass beneath Cholatse peak to Dzongla.' },
      { day: 9, title: 'Trek Dzongla to Gorak Shep & Everest Base Camp (5,364m)', alt: '5,364m / 17,598ft', hours: '7-8 hrs', dist: '14 km', gain: '+534m', overnight: 'Gorak Shep', desc: 'Trek past Lobuche to Gorak Shep and explore Everest Base Camp.' },
      { day: 10, title: 'Kala Patthar Sunrise (5,545m) & Trek to Lobuche', alt: '5,545m / 4,940m', hours: '5-6 hrs', dist: '10 km', gain: '+181m', overnight: 'Lobuche', desc: 'Morning summit of Kala Patthar and return to Lobuche.' },
      { day: 11, title: 'PASS 3: Cross Kongma La Pass (5,535m) to Chhukung', alt: '5,535m / 4,730m', hours: '7-8 hrs', dist: '11 km', gain: '+595m / -805m', overnight: 'Chhukung', desc: 'Conquer the highest and wildest pass, Kongma La (5,535m), descending into the Imja Valley at Chhukung.' },
      { day: 12, title: 'Pre-Climbing Training in Chhukung', alt: '4,730m / 15,518ft', hours: '3 hrs', dist: '2 km', gain: '0m', overnight: 'Chhukung', desc: 'Gear inspection and fixed-rope practice with climbing Sherpas.' },
      { day: 13, title: 'Trek Chhukung to Island Peak Base Camp', alt: '5,200m / 17,060ft', hours: '3-4 hrs', dist: '6 km', gain: '+470m', overnight: 'Tented Camp', desc: 'Move into expedition tent camp at the foot of Island Peak.' },
      { day: 14, title: 'SUMMIT DAY: Island Peak (6,189m) & Descend to Chhukung', alt: '6,189m / 4,730m', hours: '10-12 hrs', dist: '12 km', gain: '+989m / -1,459m', overnight: 'Chhukung', desc: 'Climb the ice headwall and knife-edge ridge to stand at 6,189m! Complete the grand slam.' },
      { day: 15, title: 'Contingency / Reserve Day', alt: '4,730m / 15,518ft', hours: 'Reserve', dist: '0 km', gain: '0m', overnight: 'Chhukung', desc: 'Reserve day for weather safety.' },
      { day: 16, title: 'Trek Chhukung to Tengboche', alt: '3,860m / 12,664ft', hours: '5 hrs', dist: '13 km', gain: '-870m', overnight: 'Tengboche', desc: 'Descend through Dingboche and Pangboche to Tengboche.' },
      { day: 17, title: 'Trek Tengboche to Namche Bazaar', alt: '3,440m / 11,286ft', hours: '5 hrs', dist: '10 km', gain: '-420m', overnight: 'Namche Bazaar', desc: 'Trek back to Namche Bazaar.' },
      { day: 18, title: 'Trek Namche Bazaar to Lukla', alt: '2,860m / 9,383ft', hours: '6-7 hrs', dist: '19 km', gain: '-580m', overnight: 'Lukla', desc: 'Final trek back to Lukla airport.' },
      { day: 19, title: 'Fly Lukla to Kathmandu', alt: '1,400m / 4,593ft', hours: '35 min flight', dist: 'Air', gain: '-1,460m', overnight: 'Kathmandu Hotel', desc: 'Fly to Kathmandu.' },
      { day: 20, title: 'Celebration Banquet & City Tour', alt: '1,400m / 4,593ft', hours: 'Leisure', dist: 'City', gain: '0m', overnight: 'Kathmandu', desc: 'Rest, celebration, and certificate award.' },
      { day: 21, title: 'Final International Departure', alt: '1,400m / 4,593ft', hours: 'Transfer', dist: 'Airport', gain: '0m', overnight: 'Home', desc: 'Airport transfer for flight home.' }
    ],
    faqs: [
      { q: 'Who is this extreme expedition suited for?', a: 'Only experienced hikers with prior high-altitude endurance and basic crampon/harness familiarity. You will cross 3 passes over 5,300m and climb to nearly 6,200m.' }
    ]
  }
];

function generateTrekPage(pkg) {
  let content = baseTrekContent;

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

  // JSON-LD
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
        "touristType": ["Hikers", "Trekking Enthusiasts", "Mountaineers"],
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

  // Badge & Title
  content = content.replace(/<span class="pill pill-copper"[^>]*>.*?<\/span>/, `<span class="pill pill-copper" style="margin-bottom: 0;">${pkg.heroBadge}</span>`);
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${pkg.overviewH1}</h1>`);
  
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

  // Images
  content = content.replace(/(<div class="trek-gallery-main">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.main}$2`);
  content = content.replace(/(<div class="trek-gallery-sub">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub1}$2`);
  content = content.replace(/(<div class="trek-gallery-sub trek-gallery-sub-top-right">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub2}$2`);
  content = content.replace(/(<div class="trek-gallery-sub">\s*<img src=")[^"]+(" alt="Himalayan Peak">)/, `$1${pkg.images.sub3}$2`);
  content = content.replace(/(<div class="trek-gallery-sub trek-gallery-sub-bottom-right">[\s\S]*?<img src=")[^"]+(")/, `$1${pkg.images.sub4}$2`);

  // Facts
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

  // Section 1 Overview
  const overviewRegex = /(<section id="section-overview" class="trek-detail-section">[\s\S]*?<h2 class="trek-section-title">Trek Overview<\/h2>)[\s\S]*?(<style>[\s\S]*?\.rich-highlights-container)/;
  content = content.replace(overviewRegex, `$1
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              ${pkg.overviewDesc1}
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              ${pkg.overviewDesc2}
            </p>
            $2`);

  // Itinerary
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>Trek time: ${item.hours}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>Accommodation: ${item.overnight.includes('Camp') ? 'Expedition Tented Camp' : item.overnight.includes('Luxury') || item.overnight.includes('Yeti') || item.overnight.includes('Hotel') ? 'Luxury Mountain Lodge' : 'Mountain Teahouse'}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path><path d="M2 10h20"></path></svg>
                        <span>Distance: ${item.dist}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                        <span>Elevation: ${item.gain}</span>
                      </div>
                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
                        <span>Meals: Breakfast, Lunch and Dinner</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
                        <span>Overnight: ${item.overnight}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${item.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper"><img loading="lazy" src="${pkg.images.sub1}" alt="${item.title}"></div>
                      <div class="itinerary-photo-wrapper"><img loading="lazy" src="${pkg.images.sub2}" alt="${item.overnight}"></div>
                      <div class="itinerary-photo-wrapper"><img loading="lazy" src="${pkg.images.sub3}" alt="Himalayan Mountain Landscape"></div>
                      <div class="itinerary-photo-wrapper"><img loading="lazy" src="${pkg.images.sub4}" alt="Everest Region Panorama"></div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');

  const itineraryContainerRegex = /(<div class="itinerary-accordion-container-new">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>\s*<!-- Section 3: Includes & Excludes -->)/;
  content = content.replace(itineraryContainerRegex, `$1\n${itineraryCardsHtml}\n            </div>\n          </section>\n          <!-- Section 3: Includes & Excludes -->`);

  // Pricing
  content = content.replace(/(<div class="price-amount" data-original-price=")[^"]*(">)\$[^<]*(<\/div>)/g, `$1${pkg.price.replace(',', '')}$2$${pkg.price}$3`);
  content = content.replace(/(<span class="price-tag-value">)\$[^<]*(<\/span>)/g, `$1$${pkg.price}$2`);

  // FAQs
  const faqAccordionHtml = pkg.faqs.map(f => `
              <div class="faq-accordion-item" style="background: white; border: 1px solid var(--color-neutral-200); border-radius: 12px; margin-bottom: 12px; overflow: hidden;">
                <button class="faq-accordion-header" style="width: 100%; text-align: left; padding: 18px 22px; font-weight: 700; color: var(--color-primary-navy); font-size: 1.05rem; background: none; border: none; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                  <span>${f.q}</span>
                  <span style="color: var(--color-copper-orange); font-size: 1.4rem; font-weight: 400;">+</span>
                </button>
                <div class="faq-accordion-body" style="padding: 0 22px 20px 22px; color: var(--color-neutral-700); font-size: 0.95rem; line-height: 1.7;">
                  <p>${f.a}</p>
                </div>
              </div>`).join('\n');

  const faqRegex = /(<section id="section-faqs"[\s\S]*?<h2 class="trek-section-title">Frequently Asked Questions<\/h2>[\s\S]*?<div class="faq-list">)[\s\S]*?(<\/div>\s*<\/section>)/;
  if (faqRegex.test(content)) {
    content = content.replace(faqRegex, `$1\n${faqAccordionHtml}\n            $2`);
  }

  return content;
}

// Generate the 8 trek packages
trekPackages.forEach(pkg => {
  const dirPath = path.join('trek', pkg.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const html = generateTrekPage(pkg);
  fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
  console.log(`Generated: trek/${pkg.slug}/index.html`);
});

// Generate 1-Day Everest Base Camp Helicopter Tour
function generateDayHeliTour() {
  let content = baseTourContent;

  const title = "Everest Base Camp 1-Day Helicopter Tour with Kala Patthar Landing — Igloo Himalaya Treks";
  const desc = "Fly directly from Kathmandu to Everest Base Camp by luxury helicopter, land at Kala Patthar (5,400m) for photos, and enjoy champagne breakfast at Hotel Everest View.";
  const canonical = "https://igloohimalayatreks.com/tour/everest-base-camp-helicopter-tour/";

  content = content.replace(/<title>[^<]+<\/title>/, `<title>${title}</title>`);
  content = content.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
  content = content.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">Everest Base Camp 1-Day Helicopter Tour</h1>`);

  // Update gallery images
  content = content.replace(/(<div class="trek-gallery-main">[\s\S]*?<img src=")[^"]+(")/, `$1../../images/everest-base-camp-helicopter-tour.webp$2`);
  content = content.replace(/(<div class="trek-gallery-sub">[\s\S]*?<img src=")[^"]+(")/, `$1../../images/everest-base-camp-heli-tour.webp$2`);
  content = content.replace(/(<div class="trek-gallery-sub trek-gallery-sub-top-right">[\s\S]*?<img src=")[^"]+(")/, `$1../../images/everest-base-camp-helicopter-tour-1-day-luxury-heli-tour.webp$2`);

  // Pricing
  content = content.replace(/(data-original-price=")[^"]*(">\$)[^<]*(<\/div>)/g, `$11150$21,150$3`);

  const tourDir = path.join('tour', 'everest-base-camp-helicopter-tour');
  if (!fs.existsSync(tourDir)) {
    fs.mkdirSync(tourDir, { recursive: true });
  }
  fs.writeFileSync(path.join(tourDir, 'index.html'), content, 'utf8');
  console.log(`Generated: tour/everest-base-camp-helicopter-tour/index.html`);
}

generateDayHeliTour();

// Generate Redirect Stubs
const redirectStubs = [
  { dir: 'trek/lobuche-peak-climbing-trek', target: '../lobuche-peak-climbing/' },
  { dir: 'trek/ebc-trek-with-island-peak', target: '../island-peak-climbing/' },
  { dir: 'trek/everest-base-camp-with-island-peak-climb', target: '../island-peak-climbing/' },
  { dir: 'trek/mera-peak', target: '../mera-peak-climbing/' },
  { dir: 'trek/everest-base-camp-trek-road-based', target: '../everest-base-camp-trek-without-flight/' },
  { dir: 'tour/everest-base-camp-heli-tour', target: '../everest-base-camp-helicopter-tour/' },
  { dir: 'tour/gokyo-lake-helicopter-tour', target: '../everest-base-camp-helicopter-tour/' }
];

redirectStubs.forEach(stub => {
  if (!fs.existsSync(stub.dir)) {
    fs.mkdirSync(stub.dir, { recursive: true });
  }
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${stub.target}">
  <title>Redirecting...</title>
  <script>window.location.replace('${stub.target}');</script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 60px 20px; background: #082138; color: white;">
  <h2>Redirecting to package...</h2>
  <p style="color: #CBD5E1;"><a href="${stub.target}" style="color: #1A96C8;">Click here if not redirected automatically &rarr;</a></p>
</body>
</html>`;
  fs.writeFileSync(path.join(stub.dir, 'index.html'), html, 'utf8');
  console.log(`Generated redirect stub: ${stub.dir}/index.html`);
});

console.log('All Everest and Peak Climbing packages successfully built!');
