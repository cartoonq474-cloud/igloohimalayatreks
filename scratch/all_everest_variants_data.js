/**
 * Data definitions for all 14 Everest Packages:
 * 1. everest-view-trek (7 Days)
 * 2. everest-three-passes-trek (19 Days)
 * 3. gokyo-lakes-trek (12 Days)
 * 4. gokyo-lakes-and-cho-la-pass (15 Days)
 * 5. everest-base-camp-via-gokyo-lakes (16 Days)
 * 6. everest-base-camp-trek (14 Days)
 * 7. everest-base-camp-luxury-trek (14 Days)
 * 8. gokyo-lakes-luxury-trek (11 Days)
 * 9. gokyo-lake-trek-with-helicopter-return (9 Days)
 * 10. everest-base-camp-trek-without-flight (16 Days)
 * 11. island-peak-climbing (19 Days)
 * 12. mera-peak-climbing (18 Days)
 * 13. lobuche-peak-climbing (19 Days)
 * 14. three-high-passes-with-island-peak-climb (21 Days)
 */

const everestPackages = [
  // 1. EVEREST VIEW TREK (7 DAYS)
  {
    slug: 'everest-view-trek',
    title: 'Everest View Trek (7 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest View Trek (7 Days)',
    metaDesc: 'Experience the magic of Mount Everest on the 7-day Everest View Trek. Visit Namche Bazaar, Hotel Everest View (3,880m), and ancient Tengboche Monastery.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-view-trek/',
    duration: '7 Days',
    difficulty: 'Easy to Moderate',
    maxAlt: '3,880 m / 12,729 ft',
    maxAltNum: 3880,
    transport: 'Domestic Flight (Kathmandu/Ramechhap to Lukla)',
    region: 'Everest / Khumbu',
    price: '990',
    heroBadge: 'Everest Region • Short Panoramic Mountain Panorama',
    accommodation: 'Comfortable Mountain Lodges & Teahouses',
    gallery: [
      'everest-view-trek-02.webp',
      'everest-view-trek-03.webp',
      'everest-view-trek-04.webp',
      'everest-view-trek-05.webp',
      'everest-view-trek-06.webp',
      'everest-view-trek-07.webp'
    ],
    highlights: [
      'Breathtaking unobstructed panoramas of Mount Everest, Lhotse, Ama Dablam, and Thamserku.',
      'Sip morning coffee on the terrace of the world-famous Hotel Everest View (3,880m).',
      'Explore the vibrant Sherpa market hub of Namche Bazaar and the Hillary School in Khumjung.',
      'Visit Tengboche Monastery, the spiritual heartbeat of the entire Khumbu region.',
      'Walk across high suspension bridges draped in colorful Tibetan prayer flags over the Dudh Koshi.',
      'Ideal short Himalayan trek for travelers wanting iconic Everest vistas without strenuous high passes.'
    ],
    faqs: [
      {
        q: 'Is the Everest View Trek suitable for beginners?',
        a: 'Yes! The Everest View Trek is specifically designed for trekkers who want to experience the majesty of Everest and Sherpa culture without walking into extreme high altitudes above 4,000m. Daily walks are 4 to 6 hours on well-maintained trails.'
      },
      {
        q: 'What permits are required for the Everest View Trek?',
        a: 'You require the Sagarmatha National Park entry permit and the Khumbu Pasang Lhamu Rural Municipality entry permit, both handled by Igloo Himalaya Treks.'
      },
      {
        q: 'Where do flights to Lukla operate from?',
        a: 'During peak spring and autumn trekking seasons, flights to Lukla typically operate from Ramechhap Airport (Manthali), preceded by a 4-hour shared tourist vehicle transfer from Kathmandu. In low seasons, direct Kathmandu-Lukla flights operate.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Scenic Flight to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Board an exhilarating mountain flight to Lukla (2,840m). Meet your Sherpa team and take an easy acclimatizing stroll alongside the rushing Dudh Koshi river to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter Sagarmatha National Park at Monjo, cross high suspension bridges including the Hillary Bridge, and ascend through pine forests to the lively Sherpa capital of Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Walk to Hotel Everest View & Khumjung', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike up to the legendary Hotel Everest View (3,880m) for coffee with sweeping vistas of Everest, Lhotse, and Ama Dablam, visiting the Edmund Hillary school in Khumjung before returning to Namche.' },
      { day: 4, title: 'Trek Namche Bazaar to Tengboche Monastery', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk along the panoramic trail high above the river, descend to Phunki Tenga, and climb through rhododendron groves to Tengboche Monastery beneath the soaring peak of Ama Dablam.' },
      { day: 5, title: 'Trek Tengboche down to Monjo', dest: 'Monjo', altM: 2835, duration: '5 to 6 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Attend morning Buddhist chants at the monastery, then retrace your steps down past Namche Bazaar and the Hillary Bridge to the peaceful village of Monjo.' },
      { day: 6, title: 'Trek Monjo to Lukla', dest: 'Lukla', altM: 2840, duration: '4 to 5 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Gentle walk back along the Dudh Koshi valley through Phakding and Cheplung to Lukla. Enjoy an evening farewell celebration with your guide and porter crew.' },
      { day: 7, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Early morning flight back to Kathmandu (or Ramechhap transfer), transfer to your hotel, and celebrate the completion of your Everest adventure.' }
    ]
  },

  // 2. EVEREST THREE PASSES TREK (19 DAYS)
  {
    slug: 'everest-three-passes-trek',
    title: 'Everest Three Passes Trek (19 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Three Passes Trek (19 Days)',
    metaDesc: 'Conquer the ultimate Khumbu circuit on the 19-day Everest Three Passes Trek. Cross Renjo La (5,360m), Cho La (5,420m), and Kongma La (5,535m) with Gokyo and EBC.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-three-passes-trek/',
    duration: '19 Days',
    difficulty: 'Strenuous High-Pass Circuit',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Domestic Flights & Airport Transfers',
    region: 'Everest / Sagarmatha National Park',
    price: '1,890',
    heroBadge: 'Everest Region • The Ultimate High-Pass Grand Slam',
    accommodation: 'Mountain Lodges & High Alpine Teahouses',
    gallery: [
      'everest-three-high-passes-trek-02.webp',
      'everest-three-high-passes-trek.webp',
      'everest-three-passes-trek-route-tips-and-best-itinerary-02.webp',
      'everest-three-passes-trek-route-tips-and-best-itinerary-03.webp',
      'everest-three-passes-trek-route-tips-and-best-itinerary.webp',
      'a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.webp'
    ],
    highlights: [
      'Cross all three iconic 5,000m+ high mountain passes: Renjo La (5,360m), Cho La (5,420m), and Kongma La (5,535m).',
      'Visit both sacred Gokyo Lakes and historic Everest Base Camp (5,364m) on a single epic circuit.',
      'Climb twin legendary viewpoints: Gokyo Ri (5,357m) and Kala Patthar (5,545m) for world-class panoramas.',
      'Traverse massive glaciers including Ngozumpa (Nepal’s longest) and the Khumbu Glacier icefall.',
      'Explore untouched Sherpa valleys in Thame, Lungden, Dzongla, and Chhukung.',
      'Unrivaled views of four 8,000m giants: Everest, Lhotse, Makalu, and Cho Oyu.'
    ],
    faqs: [
      {
        q: 'How difficult is the Everest Three Passes Trek?',
        a: 'The Three Passes Trek is the most demanding non-technical teahouse trek in the Everest region. It involves three pass crossings over 5,300m, long 7 to 9-hour hiking days on rocky moraines, and sustained exposure to high altitude. Excellent fitness and prior trekking experience are required.'
      },
      {
        q: 'What is the recommended direction for the Three Passes Trek?',
        a: 'We trek in an anti-clockwise direction (Renjo La first, then Cho La, then Kongma La). This route provides the safest and most gradual physiological acclimatization profile, tackling the steepest pass (Kongma La) when you are already fully acclimatized.'
      },
      {
        q: 'Do I need crampons or microspikes for Cho La Pass?',
        a: 'Yes, microspikes or light crampons are essential for crossing the glaciated snow/ice section on Cho La Pass. Our guides provide assistance across all slippery sections.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu/Ramechhap to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Scenic flight into Lukla (2,840m). Meet your Sherpa team and take a gentle downhill trek along the Dudh Koshi to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the river past Monjo into Sagarmatha National Park, crossing high suspension bridges and climbing through pine woods to Namche.' },
      { day: 3, title: 'Acclimatization Day at Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization hike to Hotel Everest View for panoramic vistas of Everest and Ama Dablam, exploring Khumjung monastery.' },
      { day: 4, title: 'Trek Namche Bazaar to Thame', dest: 'Thame', altM: 3820, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Head west into the traditional Bhote Koshi valley toward Thame, childhood home of Tenzing Norgay and Apa Sherpa.' },
      { day: 5, title: 'Trek Thame to Lungden', dest: 'Lungden', altM: 4380, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek through rugged alpine pastures along the ancient Tibetan salt trade route to the small stone hamlet of Lungden.' },
      { day: 6, title: 'PASS 1: Cross Renjo La Pass (5,360m) & Descend to Gokyo Lakes', dest: 'Gokyo', altM: 4790, duration: '7 to 8 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend stone staircases to Renjo La Pass (5,360m) for an explosive panorama of Everest, Lhotse, and Makalu, then descend to turquoise Gokyo Lake.' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m) & Rest at Gokyo Lake', dest: 'Gokyo', altM: 5357, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Pre-dawn climb up Gokyo Ri for a sublime 360-degree sunrise over the Himalayas, spending the afternoon resting by the tranquil lakeshore.' },
      { day: 8, title: 'Trek Gokyo across Ngozumpa Glacier to Thangnak', dest: 'Thangnak', altM: 4700, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Navigate the rocky lateral moraines across the enormous Ngozumpa Glacier to the foot of Cho La at Thangnak.' },
      { day: 9, title: 'PASS 2: Cross Cho La Pass (5,420m) & Descend to Dzongla', dest: 'Dzongla', altM: 4830, duration: '7 to 8 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Scramble up boulder fields and cross the snow-covered glacier saddle of Cho La (5,420m) before descending to the high alpine huts of Dzongla.' },
      { day: 10, title: 'Trek Dzongla to Lobuche', dest: 'Lobuche', altM: 4940, duration: '3 to 4 hrs', dist: '6.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk along the panoramic contour path overlooking Cholatse and Dughla lake, merging with the main Everest trail at Lobuche.' },
      { day: 11, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek over the rocky Khumbu glacier to Gorak Shep, drop heavy packs, and hike to Everest Base Camp right beneath the Khumbu Icefall.' },
      { day: 12, title: 'Sunrise Climb of Kala Patthar (5,545m) & Trek to Lobuche', dest: 'Lobuche', altM: 5545, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb Kala Patthar (5,545m) for the definitive close-up sunrise over Everest and Nuptse, then return to Gorak Shep and descend to Lobuche.' },
      { day: 13, title: 'PASS 3: Cross Kongma La Pass (5,535m) to Chhukung', dest: 'Chhukung', altM: 4730, duration: '7 to 8 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross the highest of the three passes: Kongma La (5,535m) between Nuptse and Pokalde, descending into the Imja Valley at Chhukung.' },
      { day: 14, title: 'Trek Chhukung down to Pangboche', dest: 'Pangboche', altM: 3930, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Dingboche past ancient stone-walled fields to the historic village of Pangboche.' },
      { day: 15, title: 'Trek Pangboche via Tengboche Monastery to Namche', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit Tengboche Monastery, descend to Phunki Tenga, and traverse back to the comfort and bakeries of Namche Bazaar.' },
      { day: 16, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Long descent across suspension bridges past Phakding back to Lukla, celebrating your epic three-pass conquest with your Sherpa crew.' },
      { day: 17, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu. Private transfer to your hotel for a relaxing shower and free afternoon.' },
      { day: 18, title: 'Contingency / Buffer Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Buffer day for mountain flight schedules, followed by an evening celebration farewell Nepali banquet.' },
      { day: 19, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your international flight home.' }
    ]
  },

  // 3. GOKYO LAKES TREK (12 DAYS)
  {
    slug: 'gokyo-lakes-trek',
    title: 'Gokyo Lakes Trek (12 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lakes Trek (12 Days)',
    metaDesc: 'Discover the sacred turquoise alpine lakes on the 12-day Gokyo Lakes Trek. Climb Gokyo Ri (5,357m) for a 360-degree panorama of four 8,000m Himalayan giants.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lakes-trek/',
    duration: '12 Days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '5,357 m / 17,575 ft',
    maxAltNum: 5357,
    transport: 'Domestic Flights & Airport Transfers',
    region: 'Everest / Gokyo Valley',
    price: '1,350',
    heroBadge: 'Everest Region • Sacred Turquoise Lakes & Glacier Panorama',
    accommodation: 'Cozy Mountain Lodges & Teahouses',
    gallery: [
      'best-time-for-gokyo-lakes-trek-02.webp',
      'best-time-for-gokyo-lakes-trek-03.webp',
      'best-time-for-gokyo-lakes-trek-04.webp',
      'best-time-for-gokyo-lakes-trek-05.webp',
      'best-time-for-gokyo-lakes-trek-06.webp',
      'a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.webp'
    ],
    highlights: [
      'Summit Gokyo Ri (5,357m) for what many call the finest mountain panorama in Nepal.',
      'Explore the series of six high-altitude oligotrophic turquoise lakes of Gokyo.',
      'Gaze upon four 8,000m peaks: Everest (8,848m), Lhotse (8,516m), Makalu (8,485m), and Cho Oyu (8,188m).',
      'Walk alongside the massive Ngozumpa Glacier, the largest glacier in the Nepal Himalayas.',
      'Peaceful, less-crowded alternative route through tranquil birch and rhododendron forests.',
      'Experience authentic Sherpa culture in high-altitude summer grazing settlements.'
    ],
    faqs: [
      {
        q: 'Why choose Gokyo Lakes over Everest Base Camp?',
        a: 'The Gokyo Lakes Trek is less crowded, offers dramatically more varied scenery (sacred alpine lakes, massive lateral moraines, and lush rhododendron valleys), and the viewpoint from Gokyo Ri gives a broader, more unobstructed view of Mount Everest than Base Camp itself.'
      },
      {
        q: 'How hard is the climb up Gokyo Ri?',
        a: 'The hike up Gokyo Ri from Gokyo village takes 2.5 to 3.5 hours on a winding zigzag dirt trail. It requires no technical climbing, but the elevation (5,357m) makes it a slow, steady uphill climb.'
      },
      {
        q: 'Is the lake water frozen in winter?',
        a: 'Yes, the Gokyo Lakes typically freeze over between December and February, creating a dramatic arctic landscape. In spring and autumn, the waters are deep turquoise.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu/Ramechhap to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Fly to Lukla and take a gentle walk along the Dudh Koshi to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross suspension bridges into Sagarmatha National Park and climb to Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day at Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Hotel Everest View for panoramic vistas of Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', dest: 'Dole', altM: 4110, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Branch off the main trail, climb through Mong La, and descend into the tranquil Gokyo valley to Dole.' },
      { day: 5, title: 'Trek Dole to Machhermo', dest: 'Machhermo', altM: 4470, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend scenic juniper-dotted ridges past Luza with magnificent views of Cho Oyu and Kantega.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes (Third Lake)', dest: 'Gokyo', altM: 4790, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the glacial river past the First and Second lakes to reach the breathtaking turquoise Third Lake (Dudh Pokhari).' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m) & Scramble to 4th Lake', dest: 'Gokyo', altM: 5357, duration: '5 to 6 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb Gokyo Ri for sunrise over Everest, Lhotse, Makalu, and Cho Oyu, exploring the 4th lake in the afternoon.' },
      { day: 8, title: 'Trek Gokyo down to Dole', dest: 'Dole', altM: 4110, duration: '5 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend swiftly downhill along the valley enjoying thicker oxygen and warmer temperatures.' },
      { day: 9, title: 'Trek Dole to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk back via Mong La and Sanasa to the comfort, bakeries, and hot showers of Namche.' },
      { day: 10, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace steps across suspension bridges past Phakding back to Lukla airport town.' },
      { day: 11, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight to Kathmandu, transfer to hotel, and leisure time.' },
      { day: 12, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your onward international flight.' }
    ]
  },

  // 4. GOKYO LAKES AND CHO LA PASS (15 DAYS)
  {
    slug: 'gokyo-lakes-and-cho-la-pass',
    title: 'Gokyo Lakes and Cho La Pass Trek (15 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lakes and Cho La Pass Trek (15 Days)',
    metaDesc: 'Cross the glaciated Cho La Pass (5,420m) connecting sacred Gokyo Lakes with Everest Base Camp (5,364m) and Kala Patthar on an epic 15-day circuit.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lakes-and-cho-la-pass/',
    duration: '15 Days',
    difficulty: 'Challenging High-Pass',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Domestic Flights & Airport Transfers',
    region: 'Everest / Sagarmatha National Park',
    price: '1,650',
    heroBadge: 'Everest Region • The Classic High-Pass & Lakes Traverse',
    accommodation: 'Mountain Lodges & Teahouses',
    gallery: [
      'best-time-for-gokyo-lakes-trek-02.webp',
      'best-time-for-gokyo-lakes-trek-03.webp',
      'everest-three-passes-trek-route-tips-and-best-itinerary-02.webp',
      'a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp',
      'a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.webp',
      'a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.webp'
    ],
    highlights: [
      'Cross the thrilling high glaciated saddle of Cho La Pass (5,420m).',
      'Experience both the tranquility of Gokyo Lakes and the legendary Everest Base Camp.',
      'Climb twin iconic panoramic summits: Gokyo Ri (5,357m) and Kala Patthar (5,545m).',
      'Traverse Ngozumpa Glacier and stand directly beneath the Khumbu Icefall.',
      'Complete a rewarding circular loop avoiding the repetitive out-and-back trail.',
      'Unsurpassed close-up views of Everest, Lhotse, Cho Oyu, Nuptse, and Ama Dablam.'
    ],
    faqs: [
      {
        q: 'How difficult is crossing Cho La Pass?',
        a: 'Cho La Pass (5,420m) is a challenging alpine crossing. It involves boulder scrambling, a short walk across a crevassed snow/ice glacier, and a steep descent on scree. It is not technical, but physical stamina and surefootedness are essential.'
      },
      {
        q: 'Do we need technical mountaineering equipment for Cho La Pass?',
        a: 'No heavy climbing gear is required. We strongly recommend microspikes or slip-on crampons for traction on the icy glacier section, along with trekking poles.'
      },
      {
        q: 'What happens if Cho La Pass is blocked by heavy snow?',
        a: 'In the rare event of severe unseasonal snowfall closing the pass, your experienced guide will safely detour via the lower valley through Phortse to connect with the Everest trail.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Fly to Lukla and walk along the Dudh Koshi to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter Sagarmatha National Park and climb to Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day at Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Hotel Everest View for acclimatization and mountain panoramas.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', dest: 'Dole', altM: 4110, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb via Mong La and descend into the tranquil Gokyo valley to Dole.' },
      { day: 5, title: 'Trek Dole to Machhermo', dest: 'Machhermo', altM: 4470, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along open alpine ridges past Luza with views of Cho Oyu.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes', dest: 'Gokyo', altM: 4790, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Arrive at the mesmerizing turquoise Third Lake of Gokyo.' },
      { day: 7, title: 'Sunrise Climb of Gokyo Ri (5,357m) & Trek to Thangnak', dest: 'Thangnak', altM: 4700, duration: '6 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb Gokyo Ri for sunrise, then cross the Ngozumpa Glacier moraine to Thangnak.' },
      { day: 8, title: 'Cross Cho La Pass (5,420m) to Dzongla', dest: 'Dzongla', altM: 4830, duration: '7 to 8 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross the icy glaciated saddle of Cho La pass beneath Cholatse to Dzongla.' },
      { day: 9, title: 'Trek Dzongla to Lobuche', dest: 'Lobuche', altM: 4940, duration: '3 to 4 hrs', dist: '6.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the high contour trail above Dughla lake to Lobuche.' },
      { day: 10, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along Khumbu glacier to Gorak Shep and explore Everest Base Camp.' },
      { day: 11, title: 'Sunrise Ascent of Kala Patthar (5,545m) & Descend to Pheriche', dest: 'Pheriche', altM: 4240, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb Kala Patthar for sunrise over Everest, then descend to Pheriche.' },
      { day: 12, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Tengboche Monastery back to Namche Bazaar.' },
      { day: 13, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final trek back down to Lukla airport for evening celebrations.' },
      { day: 14, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu and transfer to your hotel.' },
      { day: 15, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your flight home.' }
    ]
  },

  // 5. EVEREST BASE CAMP VIA GOKYO LAKES (16 DAYS)
  {
    slug: 'everest-base-camp-via-gokyo-lakes',
    title: 'Everest Base Camp via Gokyo Lakes Trek (16 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp via Gokyo Lakes Trek (16 Days)',
    metaDesc: 'The premier 16-day circuit combining Gokyo Lakes, Gokyo Ri (5,357m), Cho La Pass (5,420m), Everest Base Camp (5,364m), and Kala Patthar (5,545m).',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-via-gokyo-lakes/',
    duration: '16 Days',
    difficulty: 'Challenging High-Altitude Traverse',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Domestic Flights & Airport Transfers',
    region: 'Everest / Sagarmatha National Park',
    price: '1,690',
    heroBadge: 'Everest Region • The Ultimate 16-Day Lakes & Base Camp Loop',
    accommodation: 'Mountain Lodges & Teahouses',
    gallery: [
      'best-time-for-gokyo-lakes-trek-02.webp',
      'best-time-for-gokyo-lakes-trek-03.webp',
      'a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp',
      'a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.webp',
      'everest-three-passes-trek-route-tips-and-best-itinerary-02.webp',
      'a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.webp'
    ],
    highlights: [
      'The comprehensive 16-day itinerary with extra acclimatization time in Gokyo and Namche.',
      'Explore the sacred fourth and fifth Gokyo lakes beside Cho Oyu.',
      'Summit Gokyo Ri (5,357m) and Kala Patthar (5,545m) for world-class panoramic vistas.',
      'Cross the dramatic glaciated saddle of Cho La Pass (5,420m).',
      'Stand at Everest Base Camp (5,364m) right beside the historic Khumbu Icefall.',
      'Complete a circular route with thick-air recovery nights in Namche and Pheriche.'
    ],
    faqs: [
      {
        q: 'What is the advantage of the 16-day itinerary over 15 days?',
        a: 'The 16-day itinerary incorporates an additional buffer day and extra acclimatization hike in the upper Gokyo valley, greatly enhancing comfort, safety, and summit success on Cho La Pass and Kala Patthar.'
      },
      {
        q: 'How cold does it get at Gorak Shep and Gokyo?',
        a: 'Nighttime temperatures at Gokyo (4,790m) and Gorak Shep (5,164m) typically drop to between -5°C and -15°C in autumn and spring. A 4-season down sleeping bag and thermal layers are essential.'
      },
      {
        q: 'What meals are provided during the trek?',
        a: 'Three hearty hot meals per day (Breakfast, Lunch, Dinner) are provided from teahouse menus, including local specialties like Dal Bhat, Sherpa stew, fried rice, noodle soups, porridge, eggs, and hot drinks.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu/Ramechhap to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Scenic flight into Lukla and easy walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Hillary suspension bridge and climb into Namche.' },
      { day: 3, title: 'Acclimatization Day at Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization walk to Hotel Everest View with views of Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', dest: 'Dole', altM: 4110, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Mong La into the quiet Gokyo valley.' },
      { day: 5, title: 'Trek Dole to Machhermo', dest: 'Machhermo', altM: 4470, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along high alpine ridges past Luza to Machhermo.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes (Third Lake)', dest: 'Gokyo', altM: 4790, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the Dudh Koshi to the turquoise lakes of Gokyo.' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m) & Rest Day', dest: 'Gokyo', altM: 5357, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Dawn climb up Gokyo Ri for four 8,000m peaks, resting in Gokyo in the afternoon.' },
      { day: 8, title: 'Excursion to 4th & 5th Lakes & Trek to Thangnak', dest: 'Thangnak', altM: 4700, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Explore the upper glacial lakes beneath Cho Oyu, then cross Ngozumpa Glacier to Thangnak.' },
      { day: 9, title: 'Cross Cho La Pass (5,420m) to Dzongla', dest: 'Dzongla', altM: 4830, duration: '7 to 8 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross the icy glaciated saddle of Cho La pass to Dzongla.' },
      { day: 10, title: 'Trek Dzongla to Lobuche', dest: 'Lobuche', altM: 4940, duration: '3 to 4 hrs', dist: '6.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Panoramic walk above Dughla lake to Lobuche.' },
      { day: 11, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Reach Everest Base Camp on the Khumbu Glacier.' },
      { day: 12, title: 'Sunrise Ascent of Kala Patthar (5,545m) & Descend to Pheriche', dest: 'Pheriche', altM: 4240, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Sunrise over Mt. Everest and descent to Pheriche.' },
      { day: 13, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Tengboche Monastery back to Namche Bazaar.' },
      { day: 14, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final trek back to Lukla airport town.' },
      { day: 15, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu and hotel transfer.' },
      { day: 16, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your onward flight.' }
    ]
  },

  // 6. EVEREST BASE CAMP TREK (14 DAYS)
  {
    slug: 'everest-base-camp-trek',
    title: 'Everest Base Camp Trek (14 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp Trek (14 Days)',
    metaDesc: 'Embark on the iconic 14-day Everest Base Camp Trek (5,364m) and summit Kala Patthar (5,545m) with certified local Sherpa guides and authentic teahouse hospitality.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-trek/',
    duration: '14 Days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Domestic Flights (Kathmandu/Ramechhap to Lukla)',
    region: 'Everest / Sagarmatha National Park',
    price: '1,399',
    heroBadge: 'Everest Region • The World’s Most Iconic Himalayan Trek',
    accommodation: 'Authentic Mountain Lodges & Teahouses',
    gallery: [
      'a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp',
      'a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.webp',
      'a-confident-female-trekker-on-to-the-everest-base-camp-trek.webp',
      'a-trekker-and-a-porter-walking-along-the-everest-base-camp-trekking-trail-with-panoramic-v.webp',
      'best-things-to-do-along-the-everest-base-camp-trail-02.webp',
      'best-things-to-do-along-the-everest-base-camp-trail-03.webp'
    ],
    highlights: [
      'Stand at the foot of the world’s highest peak at Everest Base Camp (5,364m / 17,598ft).',
      'Ascend Kala Patthar (5,545m) for the definitive close-up sunrise panorama of Mount Everest.',
      'Explore legendary Sherpa capital Namche Bazaar and spiritual Tengboche Monastery.',
      'Walk alongside the monumental Khumbu Glacier beneath Nuptse, Lhotse, and Ama Dablam.',
      'Two built-in acclimatization stages in Namche Bazaar (3,440m) and Dingboche (4,410m).',
      'Led by certified local Sherpa guides with satellite phones, pulse oximeters, and medical gear.'
    ],
    faqs: [
      {
        q: 'How fit do I need to be for the 14-day Everest Base Camp Trek?',
        a: 'The 14-day EBC trek is rated moderate to strenuous. You do not need mountaineering experience, but you should be capable of walking 5 to 7 hours daily over rocky terrain with an elevation gain of 400m to 800m per day.'
      },
      {
        q: 'How does Igloo Himalaya Treks manage acclimatization?',
        a: 'Our 14-day itinerary incorporates two mandatory acclimatization rest days: one at Namche Bazaar (3,440m) and another at Dingboche (4,410m), both featuring active conditioning hikes to higher elevations following the "climb high, sleep low" rule.'
      },
      {
        q: 'What permits are required for Everest Base Camp?',
        a: 'You require the Sagarmatha National Park entry permit and the Khumbu Pasang Lhamu Rural Municipality permit, both arranged and included in your package by our team.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Scenic Flight to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Board your mountain flight into Lukla (2,840m). Meet your trekking porters and hike down along the Dudh Koshi river to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter Sagarmatha National Park at Monjo, cross suspension bridges over the river, and climb through fragrant pine woods to Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day – Hike to Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to the legendary Hotel Everest View (3,880m) for coffee overlooking Everest, Lhotse, and Ama Dablam, visiting the Hillary school in Khumjung.' },
      { day: 4, title: 'Trek Namche Bazaar to Tengboche Monastery', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along the scenic high ridge, descend to Phunki Tenga, and climb to Tengboche Monastery to witness the monks chanting under Ama Dablam.' },
      { day: 5, title: 'Trek Tengboche to Dingboche', dest: 'Dingboche', altM: 4410, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to Deboche, cross the river past ancient mani stones in Pangboche, and enter the alpine Imja Valley to Dingboche.' },
      { day: 6, title: 'Acclimatization Day – Hike to Nangkartshang Peak (5,083m)', dest: 'Dingboche', altM: 5083, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Active acclimatization climb up Nangkartshang Peak for breathtaking views of Makalu, Island Peak, and the towering south face of Lhotse.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Dughla and the poignant climbers memorial at Thokla Pass, walking alongside the lateral moraine of the Khumbu Glacier to Lobuche.' },
      { day: 8, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse glacial moraines to Gorak Shep, drop heavy gear, and hike to Everest Base Camp right beside the world-famous Khumbu Icefall.' },
      { day: 9, title: 'Sunrise Ascent of Kala Patthar (5,545m) & Descend to Pheriche', dest: 'Pheriche', altM: 4240, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Early morning climb of Kala Patthar for the definitive sunrise over Mount Everest, descending to Pheriche for an oxygen-rich night.' },
      { day: 10, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Pangboche and Tengboche back to Namche Bazaar for celebratory dining and bakeries.' },
      { day: 11, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace footsteps across Hillary Bridge past Phakding to Lukla. Farewell celebration dinner with your mountain crew.' },
      { day: 12, title: 'Scenic Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu (or Ramechhap transfer), private transfer to your hotel, and free afternoon.' },
      { day: 13, title: 'Contingency / Buffer Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Flexible', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Buffer day for mountain flight schedules, followed by an evening celebratory farewell Nepali banquet.' },
      { day: 14, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to Tribhuvan International Airport for your flight home.' }
    ]
  },

  // 7. EVEREST BASE CAMP LUXURY TREK (14 DAYS)
  {
    slug: 'everest-base-camp-luxury-trek',
    title: 'Everest Base Camp Luxury Lodge Trek (14 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp Luxury Lodge Trek (14 Days)',
    metaDesc: 'Experience Everest Base Camp (5,364m) and Kala Patthar in ultimate comfort, staying at premier luxury mountain lodges with electric blankets and gourmet dining.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-luxury-trek/',
    duration: '14 Days',
    difficulty: 'Moderate to Strenuous (Luxury Comfort)',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Domestic Flights & VIP Private Airport Transfers',
    region: 'Everest / Sagarmatha National Park',
    price: '2,490',
    heroBadge: 'Everest Region • VIP Comfort & Premier Lodges',
    accommodation: 'Premier Luxury Mountain Lodges & 5-Star Hotel',
    gallery: [
      'everest-base-camp-luxury-trek.webp',
      'everest-base-camp-luxury-trek-1.webp',
      'everest-base-camp-luxury-trek-3.webp',
      'everest-base-camp-luxury-trek-4.webp',
      'everest-base-camp-trek-luxury-14-days-of-comfort-and-adventure.webp',
      'a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp'
    ],
    highlights: [
      'Trek to Everest Base Camp (5,364m) while sleeping in the Khumbu’s finest luxury lodges.',
      'Stay at renowned Yeti Mountain Home and Everest Summit Lodges with en-suite bathrooms and heated beds.',
      'Gourmet à la carte dining with multi-course meals prepared by certified executive mountain chefs.',
      'Sunrise climb of Kala Patthar (5,545m) for the iconic panoramic view of Mount Everest.',
      'Exclusive 1:1 or 1:2 porter service and private lead Sherpa guide.',
      'Relaxation in 5-star luxury hotels in Kathmandu with spa treatments included.'
    ],
    faqs: [
      {
        q: 'What makes the Everest Luxury Lodge trek different from standard teahouses?',
        a: 'You stay at the finest properties in the Khumbu (Yeti Mountain Home and Everest Summit Lodges). Rooms have electric mattress heaters, en-suite bathrooms with hot running water, Western flush toilets, down duvets, and multi-course à la carte menus.'
      },
      {
        q: 'What is the porter and guide ratio on this luxury trek?',
        a: 'We provide an exclusive 1:1 or 1:2 porter service, plus a certified lead Sherpa guide and assistant guide for groups, ensuring maximum personalized care and comfort.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Luxury Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs walk', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Scenic mountain flight into Lukla. Meet your Sherpa team and take a gentle downhill walk along the Dudh Koshi to check in to the luxurious Yeti Mountain Home in Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross high suspension bridges draped in prayer flags, entering Sagarmatha National Park at Monjo. Climb through fragrant pine forests to the vibrant Sherpa capital of Namche Bazaar.' },
      { day: 3, title: 'Acclimatization Day – Hike to Hotel Everest View (3,880m)', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Morning walk to the legendary Hotel Everest View for coffee on the terrace with unobstructed views of Everest, Lhotse, and Ama Dablam. Afternoon exploring Namche.' },
      { day: 4, title: 'Trek Namche to Deboche via Tengboche Monastery', dest: 'Deboche', altM: 3820, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the panoramic high trail above the river gorge, climb to Tengboche Monastery to witness monks chanting, and descend slightly into the serene birch forests of Deboche.' },
      { day: 5, title: 'Trek Deboche to Dingboche', dest: 'Dingboche', altM: 4410, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk past ancient mani walls in Pangboche under the soaring pyramid of Ama Dablam. Enter the high alpine Imja Valley and settle into our comfortable boutique lodge in Dingboche.' },
      { day: 6, title: 'Acclimatization Day – Nangkartshang Peak Viewpoint (5,083m)', dest: 'Dingboche', altM: 5083, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'An active acclimatization hike offering breathtaking views of Makalu (8,485m), Island Peak, and the massive Lhotse-Nuptse wall.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Thokla Pass and the poignant Everest Climbers Memorial. Walk alongside the terminal moraine of the Khumbu Glacier to Lobuche.' },
      { day: 8, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek over glacier moraines to Gorak Shep, drop heavy gear, and proceed to Everest Base Camp. Stand on the Khumbu Glacier directly beneath the historic icefall.' },
      { day: 9, title: 'Sunrise Climb of Kala Patthar (5,545m) & Descend to Pheriche', dest: 'Pheriche', altM: 4240, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Early morning ascent of Kala Patthar for the world’s most iconic close-up sunrise over Mt. Everest. Descend to Pheriche for an oxygen-rich night of deep rest.' },
      { day: 10, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Pangboche and Tengboche back to Namche Bazaar. Enjoy hot showers, craft bakeries, and celebratory evening dinners.' },
      { day: 11, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Retrace our steps down the Hillary bridge and past Phakding back to Lukla. Enjoy a farewell celebration dinner with our Sherpa guides and crew.' },
      { day: 12, title: 'Scenic Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu. VIP private transfer to your 5-star hotel for relaxation, spa treatments, and leisure.' },
      { day: 13, title: 'Kathmandu World Heritage Exploration & Spa Day', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Private guided cultural tour of Patan Durbar Square and Boudhanath Stupa, with an evening fine-dining farewell banquet.' },
      { day: 14, title: 'VIP Airport Transfer & International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Private transfer to the airport for your flight home.' }
    ]
  },

  // 8. GOKYO LAKES LUXURY TREK (11 DAYS)
  {
    slug: 'gokyo-lakes-luxury-trek',
    title: 'Gokyo Lakes Luxury Lodge Trek (11 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lakes Luxury Lodge Trek (11 Days)',
    metaDesc: 'Explore the pristine turquoise alpine lakes of Gokyo and summit Gokyo Ri (5,357m) with luxury lodge accommodations and premier Sherpa guiding.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lakes-luxury-trek/',
    duration: '11 Days',
    difficulty: 'Moderate (Luxury Comfort)',
    maxAlt: '5,357 m / 17,575 ft',
    maxAltNum: 5357,
    transport: 'Domestic Flights & Private Transfers',
    region: 'Everest / Gokyo Valley',
    price: '1,890',
    heroBadge: 'Everest Region • Sacred Turquoise Lakes in Comfort',
    accommodation: 'Luxury Mountain Lodges & 5-Star Hotel',
    gallery: [
      'gokyo-lakes-luxury-trek.webp',
      'gokyo-lakes-luxury-trek-02.webp',
      'gokyo-lakes-luxury-trek-03.webp',
      'gokyo-lakes-luxury-trek-04.webp',
      'gokyo-lakes-luxury-trek-comfort-in-the-everest-region.webp',
      'best-time-for-gokyo-lakes-trek-02.webp'
    ],
    highlights: [
      'Experience the turquoise lakes of Gokyo with heated beds and en-suite comfort lodges.',
      'Summit Gokyo Ri (5,357m) for a 360-degree panorama of Everest, Lhotse, Makalu, and Cho Oyu.',
      'Gourmet meals and attentive private Sherpa service on a quiet, peaceful trekking route.',
      'Hike alongside the enormous Ngozumpa Glacier without rough teahouse stays.',
      'Stay at Yeti Mountain Home luxury properties in Phakding and Namche Bazaar.',
      '5-star hotel luxury accommodations and spa relaxation in Kathmandu.'
    ],
    faqs: [
      {
        q: 'Where do we stay on the Gokyo Luxury Trek?',
        a: 'In the lower valleys (Phakding and Namche) you stay at premium Yeti Mountain Home luxury lodges. In the upper valley (Dole, Machhermo, and Gokyo) you stay in the finest boutique lodges with private heated blankets and upgraded rooms.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Luxury Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Scenic flight into Lukla and gentle stroll to Phakding for our first luxury lodge stay.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Hillary suspension bridge and climb into Namche Bazaar to check into our luxury lodge.' },
      { day: 3, title: 'Acclimatization Day at Hotel Everest View', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Hotel Everest View for morning coffee overlooking Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', dest: 'Dole', altM: 4110, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Mong La into the quiet Gokyo valley, enjoying comfort accommodations.' },
      { day: 5, title: 'Trek Dole to Machhermo', dest: 'Machhermo', altM: 4470, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along high meadows under Cho Oyu to Machhermo.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes', dest: 'Gokyo', altM: 4790, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Reach the shimmering turquoise waters of Third Lake (Dudh Pokhari) and settle into our premium lodge.' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m) & Lakeside Rest', dest: 'Gokyo', altM: 5357, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Unrivaled dawn views of Everest, Lhotse, Makalu, and Cho Oyu from Gokyo Ri.' },
      { day: 8, title: 'Trek Gokyo down to Dole', dest: 'Dole', altM: 4110, duration: '5 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend downhill back to Dole enjoying thick oxygen and fresh food.' },
      { day: 9, title: 'Trek Dole to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Return to Yeti Mountain Home in Namche Bazaar for celebratory dining and warm showers.' },
      { day: 10, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to Lukla for a farewell celebration dinner with our Sherpa team.' },
      { day: 11, title: 'Flight Lukla to Kathmandu & International Departure', dest: 'Kathmandu', altM: 1400, duration: '35 min flight + transfer', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight to Kathmandu and private airport transfer for onward departure.' }
    ]
  },

  // 9. GOKYO LAKE TREK WITH HELICOPTER RETURN (9 DAYS)
  {
    slug: 'gokyo-lake-trek-with-helicopter-return',
    title: 'Gokyo Lake Trek with Helicopter Return (9 Days) — Igloo Himalaya Treks',
    seoTitle: 'Gokyo Lake Trek with Helicopter Return (9 Days)',
    metaDesc: 'Trek through the Dudh Koshi valley to the sacred Gokyo Lakes and Gokyo Ri (5,357m), then fly back to Kathmandu by chartered helicopter.',
    canonical: 'https://igloohimalayatreks.com/trek/gokyo-lake-trek-with-helicopter-return/',
    duration: '9 Days',
    difficulty: 'Moderate to Strenuous',
    maxAlt: '5,357 m / 17,575 ft',
    maxAltNum: 5357,
    transport: 'Domestic Flight, Helicopter Charter & Private Car',
    region: 'Everest / Gokyo Valley',
    price: '1,750',
    heroBadge: 'Everest Region • Sacred Lakes with Helicopter Flyback',
    accommodation: 'Mountain Teahouses & Hotel in Kathmandu',
    gallery: [
      'gokyo-lake-trek-with-helicopter-return.webp',
      'gokyo-lake-trek-with-helicopter-return-aerial-adventure-02.webp',
      'gokyo-lake-trek-with-helicopter-return-aerial-adventure-03.webp',
      'gokyo-lake-trek-with-helicopter-return-aerial-adventure.webp',
      'gokyo-lake-trek-helicopter-return.webp',
      'best-time-for-gokyo-lakes-trek-02.webp'
    ],
    highlights: [
      'Summit Gokyo Ri (5,357m) for a panorama of Everest, Lhotse, Makalu, and Cho Oyu.',
      'Bypass the 3-day downhill trek with a scenic helicopter flight directly from Gokyo to Kathmandu.',
      'Aerial bird’s-eye views of Ngozumpa Glacier, Dudh Koshi gorge, and the high Himalayas.',
      'Ideal for trekkers seeking high-altitude majesty with limited holiday time.',
      'Explore Namche Bazaar and the peaceful rhododendron valley of Dole and Machhermo.',
      'Led by certified wilderness first aid Sherpa guides with satellite tracking.'
    ],
    faqs: [
      {
        q: 'Where does the helicopter pick us up?',
        a: 'The chartered helicopter lands directly at the Gokyo helipad situated at 4,790m beside the lake. You fly directly back to Kathmandu (or Lukla for refueling then Kathmandu).'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Flight to Lukla and easy walk along Dudh Koshi to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter Sagarmatha National Park and climb through pine woods to Namche.' },
      { day: 3, title: 'Acclimatization Day in Namche Bazaar', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Hotel Everest View for acclimatization and mountain panoramas.' },
      { day: 4, title: 'Trek Namche Bazaar to Dole', dest: 'Dole', altM: 4110, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Mong La into the quiet Gokyo valley to Dole.' },
      { day: 5, title: 'Trek Dole to Machhermo', dest: 'Machhermo', altM: 4470, duration: '4 to 5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek along high meadows under Cho Oyu to Machhermo.' },
      { day: 6, title: 'Trek Machhermo to Gokyo Lakes', dest: 'Gokyo', altM: 4790, duration: '4 to 5 hrs', dist: '8 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Reach the shimmering turquoise waters of Third Lake (Dudh Pokhari).' },
      { day: 7, title: 'Sunrise Ascent of Gokyo Ri (5,357m)', dest: 'Gokyo', altM: 5357, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Unrivaled dawn views of Everest, Lhotse, Makalu, and Cho Oyu from Gokyo Ri.' },
      { day: 8, title: 'Charter Helicopter Flight from Gokyo to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '50 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Board your private chartered helicopter directly from Gokyo helipad. Soar over the Khumbu range and land in Kathmandu by mid-morning. Free afternoon.' },
      { day: 9, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Transfer to airport for your onward journey.' }
    ]
  },

  // 10. EVEREST BASE CAMP TREK WITHOUT FLIGHT (16 DAYS)
  {
    slug: 'everest-base-camp-trek-without-flight',
    title: 'Everest Base Camp Trek Without Flight (Road-Based 16 Days) — Igloo Himalaya Treks',
    seoTitle: 'Everest Base Camp Trek Without Flight (Road-Based 16 Days)',
    metaDesc: 'Overland 16-day Everest Base Camp trek via Salleri and Tham Danda. 100% flight-delay-free alternative avoiding Lukla airport weather cancellations.',
    canonical: 'https://igloohimalayatreks.com/trek/everest-base-camp-trek-without-flight/',
    duration: '16 Days',
    difficulty: 'Strenuous (High Endurance)',
    maxAlt: '5,545 m / 18,192 ft',
    maxAltNum: 5545,
    transport: 'Private 4WD Jeep Transfer (Overland)',
    region: 'Everest / Solukhumbu',
    price: '1,190',
    heroBadge: 'Everest Region • 100% Flight-Delay-Free Overland Route',
    accommodation: 'Mountain Teahouses & Lodges',
    gallery: [
      'everest-base-camp-trek-without-flight.webp',
      'everest-base-camp-trek-without-flight-02.webp',
      'everest-base-camp-trek-without-flight-03.webp',
      'everest-base-camp-trek-without-flight-best-itinerary-cost.webp',
      'what-is-it-like-to-go-on-the-everest-base-camp-trek-without-flight.webp',
      'a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp'
    ],
    highlights: [
      '100% guaranteed departure avoiding Lukla flights, cancellations, and stress.',
      'Follow the historic expedition footsteps of Hillary and Tenzing through lower Solu.',
      'Gradual elevation profile providing superior acclimatization for higher altitudes.',
      'Trek through authentic Rai and Sherpa villages untarnished by mass tourism.',
      'Stand at Everest Base Camp (5,364m) and summit Kala Patthar (5,545m).',
      'Scenic 4WD overland travel across the engineered BP Highway and Sun Koshi valley.'
    ],
    faqs: [
      {
        q: 'Why do trekkers choose the overland route without flights?',
        a: 'Lukla flights frequently face delays or cancellations due to mountain fog. The road-based trek guarantees you start and finish your trip on time, and provides superior gradual acclimatization.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Scenic 4WD Drive Kathmandu to Salleri & Tham Danda', dest: 'Tham Danda', altM: 2360, duration: '9 to 10 hrs drive', dist: '260 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Private 4WD jeep drive through the Sun Koshi river valley, pine hills of Okhaldhunga, and Salleri to Tham Danda.' },
      { day: 2, title: 'Trek Tham Danda to Paiya (Chutok)', dest: 'Paiya', altM: 2730, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek through lush forest and farming hamlets with views of Dudh Koshi gorge.' },
      { day: 3, title: 'Trek Paiya to Phakding via Surke', dest: 'Phakding', altM: 2610, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Bypass Lukla via the scenic lower trail of Surke, connecting directly into the main Everest trail at Phakding.' },
      { day: 4, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb to the Sherpa capital of Namche.' },
      { day: 5, title: 'Acclimatization Day at Everest View Hotel', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization hike with views of Everest and Ama Dablam.' },
      { day: 6, title: 'Trek Namche to Tengboche Monastery', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit Tengboche Monastery beneath Ama Dablam.' },
      { day: 7, title: 'Trek Tengboche to Dingboche', dest: 'Dingboche', altM: 4410, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek past Pangboche into the alpine Imja Valley.' },
      { day: 8, title: 'Acclimatization Hike to Nangkartshang Peak', dest: 'Dingboche', altM: 5083, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Panoramic climb for high-altitude conditioning.' },
      { day: 9, title: 'Trek Dingboche to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Pass the Thokla Pass memorials and glacier moraine.' },
      { day: 10, title: 'Trek Lobuche to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Reach Everest Base Camp on the Khumbu Glacier.' },
      { day: 11, title: 'Kala Patthar Sunrise (5,545m) & Descend to Pheriche', dest: 'Pheriche', altM: 4240, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Sunrise over Mt. Everest and descent to Pheriche.' },
      { day: 12, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to Namche Bazaar for celebration.' },
      { day: 13, title: 'Trek Namche Bazaar to Paiya', dest: 'Paiya', altM: 2730, duration: '6 to 7 hrs', dist: '18 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike south down the valley past Surke to Paiya.' },
      { day: 14, title: 'Trek Paiya to Tham Danda', dest: 'Tham Danda', altM: 2360, duration: '4 to 5 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Walk back to the roadhead at Tham Danda.' },
      { day: 15, title: 'Private 4WD Drive Tham Danda to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '9 to 10 hrs drive', dist: '260 km', meals: 'Breakfast, Lunch', desc: 'Full-day scenic drive back to Kathmandu hotel.' },
      { day: 16, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Airport transfer for your international flight.' }
    ]
  },

  // 11. ISLAND PEAK CLIMBING (19 DAYS)
  {
    slug: 'island-peak-climbing',
    title: 'Island Peak Climbing with Everest Base Camp (6,189m — 19 Days) — Igloo Himalaya Treks',
    seoTitle: 'Island Peak Climbing with Everest Base Camp (19 Days)',
    metaDesc: 'Summit Island Peak (Imja Tse 6,189m) combined with Everest Base Camp and Kala Patthar. Certified IFMGA/NNMGA Sherpa climbing leaders and fixed rope training.',
    canonical: 'https://igloohimalayatreks.com/trek/island-peak-climbing/',
    duration: '19 Days',
    difficulty: 'Strenuous & Semi-Technical (Alpine Grade PD)',
    maxAlt: '6,189 m / 20,305 ft',
    maxAltNum: 6189,
    transport: 'Domestic Flights & Private Transfers',
    region: 'Everest / Imja Valley',
    price: '2,190',
    heroBadge: 'Peak Climbing Nepal • Iconic 6,000m Himalayan Summit',
    accommodation: 'Teahouses & Tented Climbing Base Camp',
    gallery: [
      'island-peak-climbing.webp',
      'climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.webp',
      'three-climbers-standing-on-the-snowy-summit-of-island-peak-6-189-m-with-panoramic-himalaya.webp',
      'best-time-to-climb-island-peak-season-and-month-guide-02.webp',
      'best-time-to-climb-island-peak-season-and-month-guide.webp',
      'island-peak-climbing-02.webp'
    ],
    highlights: [
      'Summit Island Peak (Imja Tse - 6,189m), Nepal’s most iconic 6,000m trekking peak.',
      'Comprehensive pre-climbing acclimatization on the complete Everest Base Camp & Kala Patthar trek.',
      'Professional climbing instruction on fixed ropes, jumars, crampons, and ice axe technique.',
      'Knife-edge snow summit ridge overlooking Lhotse, Nuptse, Makalu, and Ama Dablam.',
      'Led by certified IFMGA / NNMGA licensed summit Sherpa climbing guides.',
      'High-quality mountain expedition tents, safety equipment, and medical oxygen support.'
    ],
    faqs: [
      {
        q: 'Is Island Peak very technical?',
        a: 'Island Peak is classified as Alpine Grade PD (Peu Difficile / Slightly Difficult). It involves glaciated walking, crossing crevasses with aluminum ladders, a 100-meter 45-degree headwall using fixed ropes and a jumar, and an exposed summit ridge. Climbing training is provided before summit day.'
      },
      {
        q: 'Are climbing permits and gear included?',
        a: 'Yes. NMA climbing permit, garbage deposit, climbing Sherpa royalty, high camp tents, meals, and safety equipment are included. Personal climbing gear (boots, crampons, harness) can be rented in Chhukung.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Flight to Lukla and introductory walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascent to the Sherpa capital of Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Conditioning hike with views of Everest and Ama Dablam.' },
      { day: 4, title: 'Trek Namche to Tengboche Monastery', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit the spiritual center of the Khumbu at Tengboche.' },
      { day: 5, title: 'Trek Tengboche to Dingboche', dest: 'Dingboche', altM: 4410, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend into the alpine Imja Valley under Ama Dablam.' },
      { day: 6, title: 'Acclimatization Hike to Nangkartshang Peak (5,083m)', dest: 'Dingboche', altM: 5083, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization climb overlooking Makalu and Island Peak.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek past the Thokla memorial to Lobuche.' },
      { day: 8, title: 'Trek to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit Everest Base Camp on the Khumbu Glacier.' },
      { day: 9, title: 'Kala Patthar Sunrise (5,545m) & Trek to Dingboche', dest: 'Dingboche', altM: 4410, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb Kala Patthar for sunrise over Everest, then descend to Dingboche.' },
      { day: 10, title: 'Trek Dingboche to Chhukung & Pre-Climbing Training', dest: 'Chhukung', altM: 4730, duration: '3 to 4 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek to Chhukung. In the afternoon, practice crampon techniques, jumar fixed-rope climbing, and abseiling with climbing guides.' },
      { day: 11, title: 'Trek Chhukung to Island Peak Base Camp', dest: 'Base Camp', altM: 5200, duration: '3 to 4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Island Peak Base Camp. Settle into high-altitude expedition tents, check harness and gear, and rest early.' },
      { day: 12, title: 'SUMMIT DAY: Island Peak (6,189m) & Return to Chhukung', dest: 'Chhukung', altM: 6189, duration: '10 to 12 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Summit push begins at 1:00 AM. Scramble the rock gully, cross the crampon point onto the glacier, scale the 100m ice headwall with ascenders, and walk the summit ridge to 6,189m! Descend safely to Chhukung.' },
      { day: 13, title: 'Contingency / Weather Reserve Day', dest: 'Chhukung', altM: 4730, duration: 'Contingency', dist: '0 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Built-in weather safety day in case of summit delay.' },
      { day: 14, title: 'Trek Chhukung to Pangboche', dest: 'Pangboche', altM: 3930, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to Pangboche enjoying thick oxygen and village comfort.' },
      { day: 15, title: 'Trek Pangboche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek back to Namche Bazaar for celebrations.' },
      { day: 16, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final trekking day back to Lukla airport town.' },
      { day: 17, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu.' },
      { day: 18, title: 'Leisure & Celebration Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Summit certificate presentation and celebration banquet.' },
      { day: 19, title: 'Final Airport Farewell', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'International flight departure.' }
    ]
  },

  // 12. MERA PEAK CLIMBING (18 DAYS)
  {
    slug: 'mera-peak-climbing',
    title: 'Mera Peak Climbing Expedition (6,476m — 18 Days) — Igloo Himalaya Treks',
    seoTitle: 'Mera Peak Climbing Expedition (18 Days)',
    metaDesc: 'Climb Mera Peak (6,476m), the highest trekking peak in Nepal. Non-technical glaciated ascent offering a 360-degree summit panorama of 5 of the world’s 8,000m giants.',
    canonical: 'https://igloohimalayatreks.com/trek/mera-peak-climbing/',
    duration: '18 Days',
    difficulty: 'Strenuous High Altitude (Non-Technical Alpine Grade F/PD-)',
    maxAlt: '6,476 m / 21,247 ft',
    maxAltNum: 6476,
    transport: 'Domestic Flights & Airport Transfers',
    region: 'Everest / Hinku Valley',
    price: '2,090',
    heroBadge: 'Peak Climbing Nepal • Highest Trekking Peak in Nepal (6,476m)',
    accommodation: 'Mountain Teahouses & Tented High Camp',
    gallery: [
      'mera-peak-climbing.webp',
      'climber-trekking-across-the-mera-peak-glacier-surrounded-by-snow-covered-himalayan-mountai.webp',
      'mera-peak-climbing-02.webp',
      'mera-peak-climbing-03.webp',
      'mera-peak-climbing-safe-and-expert-sherpa-guides.webp',
      'mera-peak-climbing-04.webp'
    ],
    highlights: [
      'Summit Nepal’s highest trekking peak at 6,476 meters (21,247 feet).',
      'Unsurpassed 360-degree panorama of five 8,000m giants: Everest, Lhotse, Makalu, Cho Oyu, and Kanchenjunga.',
      'Pristine wilderness expedition through the remote and untouched Hinku Valley.',
      'Non-technical glaciated snow climb ideal for fit adventurers wanting high-altitude experience.',
      'High camp positioned at 5,780m with dramatic sunsets over the Himalayas.',
      'Led by certified high-altitude Sherpa climbing leaders with full emergency safety equipment.'
    ],
    faqs: [
      {
        q: 'Is Mera Peak harder than Island Peak?',
        a: 'Mera Peak is higher (6,476m vs 6,189m), so altitude and cold are bigger factors. However, the climbing itself is less technical than Island Peak—mostly non-technical glaciated walking with crampons and ice axe.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Paiya', dest: 'Paiya', altM: 2730, duration: '35 min flight + 3 to 4 hrs trek', dist: '9 km', meals: 'Lunch, Dinner', desc: 'Fly to Lukla and head south into the remote wilderness of Hinku Valley.' },
      { day: 2, title: 'Trek Paiya to Panggom', dest: 'Panggom', altM: 2850, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Kari La pass with forest views to the Sherpa village of Panggom.' },
      { day: 3, title: 'Trek Panggom to Ningsow', dest: 'Ningsow', altM: 2860, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek through bamboo and rhododendron forests into the Hinku watershed.' },
      { day: 4, title: 'Trek Ningsow to Chhatra Khola', dest: 'Chhatra Khola', altM: 3150, duration: '6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Enter the Makalu Barun National Park boundary along ridge trails.' },
      { day: 5, title: 'Trek Chhatra Khola to Kothe', dest: 'Kothe', altM: 3600, duration: '6 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Follow the river gorge up into the majestic glacial valley of Kothe.' },
      { day: 6, title: 'Trek Kothe to Thaknak', dest: 'Thaknak', altM: 4350, duration: '4 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek alongside the river with dramatic views of Mera Peak looming ahead. Visit the 200-year-old Lungsumgba gompa.' },
      { day: 7, title: 'Acclimatization Day at Thaknak', dest: 'Thaknak', altM: 4350, duration: '3 hrs', dist: '4 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike to Sabai Tsho glacial lake for acclimatization.' },
      { day: 8, title: 'Trek Thaknak to Khare (Mera Peak Base Camp)', dest: 'Khare', altM: 5045, duration: '4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb lateral moraines into Khare, the last teahouse village beneath the peak.' },
      { day: 9, title: 'Pre-Climbing Training at Khare', dest: 'Khare', altM: 5045, duration: '3 hrs', dist: '2 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climbing instruction on fixed ropes, man-rope travel, crampon walking, and ice axe self-arrest with our Sherpa guides.' },
      { day: 10, title: 'Trek Khare to Mera High Camp (5,780m)', dest: 'High Camp', altM: 5780, duration: '4 to 5 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb onto the Mera glacier and cross Mera La (5,415m) to set up High Camp behind a rocky promontory with stupendous 8,000m views.' },
      { day: 11, title: 'SUMMIT DAY: Mera Peak (6,476m) & Return to Khare', dest: 'Khare', altM: 6476, duration: '8 to 10 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: '2:00 AM alpine start. Rope up and ascend the vast gentle snowfields. A final 30m 45-degree slope brings you onto the summit at 6,476m! Celebrate the unbelievable 5 x 8,000m view before descending to Khare.' },
      { day: 12, title: 'Contingency / Weather Reserve Day', dest: 'Khare', altM: 5045, duration: 'Reserve', dist: '0 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Built-in contingency day for weather safety.' },
      { day: 13, title: 'Trek Khare to Kothe', dest: 'Kothe', altM: 3600, duration: '5 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Fast downhill descent back into the forested valley of Kothe.' },
      { day: 14, title: 'Trek Kothe to Thuli Kharka', dest: 'Thuli Kharka', altM: 4300, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Traverse westward towards the Zatrwa La high pass.' },
      { day: 15, title: 'Cross Zatrwa La Pass (4,600m) & Descend to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross Zatrwa La with panoramic mountain views and descend directly into Lukla for summit celebration.' },
      { day: 16, title: 'Fly Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Morning flight back to Kathmandu.' },
      { day: 17, title: 'Leisure Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Rest, sightseeing, and summit celebration banquet.' },
      { day: 18, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Transfer to airport for your onward flight.' }
    ]
  },

  // 13. LOBUCHE PEAK CLIMBING (19 DAYS)
  {
    slug: 'lobuche-peak-climbing',
    title: 'Lobuche East Peak Climbing with Everest Base Camp (6,119m — 19 Days) — Igloo Himalaya Treks',
    seoTitle: 'Lobuche East Peak Climbing with Everest Base Camp (19 Days)',
    metaDesc: 'Summit Lobuche East (6,119m) and trek to Everest Base Camp & Kala Patthar. Technical mixed rock and snow alpine climb overlooking the Khumbu Glacier.',
    canonical: 'https://igloohimalayatreks.com/trek/lobuche-peak-climbing/',
    duration: '19 Days',
    difficulty: 'Strenuous & Technical (Alpine Grade PD+)',
    maxAlt: '6,119 m / 20,075 ft',
    maxAltNum: 6119,
    transport: 'Domestic Flights & Private Transfers',
    region: 'Everest / Khumbu',
    price: '2,290',
    heroBadge: 'Peak Climbing Nepal • Technical Ridge Climbing (6,119m)',
    accommodation: 'Mountain Teahouses & High Altitude Tented Camp',
    gallery: [
      'lobuche-peak-climbing.webp',
      'lobuche-peak-climbing-with-everest-base-camp-16-days.webp',
      'lobuche-peak-climbing-02.webp',
      'lobuche-peak-climbing-03.webp',
      'lobuche-village-in-the-everest-region-of-nepal-with-snow-capped-himalayan-mountains-under.webp',
      'lobuche-peak-climbing-04.webp'
    ],
    highlights: [
      'Summit Lobuche East (6,119m), a premier technical alpine peak overlooking the Khumbu Glacier.',
      'Flawless acclimatization with the complete Everest Base Camp (5,364m) and Kala Patthar (5,545m) trek.',
      'Technical mixed rock slab scrambling and 45-degree fixed snow line headwall.',
      'Sharp airy summit ridge directly opposite the giant granite wall of Nuptse and Everest.',
      'High camp positioned at 5,400m beside an alpine tarn with views of Ama Dablam.',
      'Guided by UIAGM/NNMGA certified Sherpa mountaineering specialists.'
    ],
    faqs: [
      {
        q: 'How does Lobuche East compare to Island Peak?',
        a: 'Lobuche East is slightly more technical than Island Peak, requiring more sustained rock slab scrambling and a steeper summit snow crest. It is favored by aspiring mountaineers preparing for 7,000m or 8,000m peaks.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Flight to Lukla and introductory walk along Dudh Koshi.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb through pine forest to Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization walk to Hotel Everest View.' },
      { day: 4, title: 'Trek Namche to Tengboche Monastery', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit Tengboche Monastery beneath Ama Dablam.' },
      { day: 5, title: 'Trek Tengboche to Dingboche', dest: 'Dingboche', altM: 4410, duration: '5 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend into the alpine Imja Valley.' },
      { day: 6, title: 'Acclimatization Hike to Nangkartshang Peak', dest: 'Dingboche', altM: 5083, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Altitude conditioning with Makalu panoramas.' },
      { day: 7, title: 'Trek Dingboche to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 hrs', dist: '8.5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Ascend past Thokla Memorial alongside the Khumbu glacier.' },
      { day: 8, title: 'Trek to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Visit Everest Base Camp on the Khumbu glacier.' },
      { day: 9, title: 'Kala Patthar Sunrise (5,545m) & Descend to Lobuche', dest: 'Lobuche', altM: 4940, duration: '6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Sunrise over Mt. Everest and descent to Lobuche village.' },
      { day: 10, title: 'Trek Lobuche to Lobuche East Base Camp', dest: 'Base Camp', altM: 5200, duration: '3 to 4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek to the rocky base camp beside Lobuche glacier lake.' },
      { day: 11, title: 'Climb to Lobuche High Camp (5,400m) & Rope Training', dest: 'High Camp', altM: 5400, duration: '3 to 4 hrs', dist: '3 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Scramble up rocky slab trails to High Camp. Practice fixed line ascending and abseiling.' },
      { day: 12, title: 'SUMMIT DAY: Lobuche East (6,119m) & Return to Pheriche', dest: 'Pheriche', altM: 6119, duration: '9 to 11 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: '1:30 AM start. Climb steep snow headwalls, negotiate the technical ridge, and summit at 6,119m with jaw-dropping views directly into the Everest south face! Descend all the way to Pheriche.' },
      { day: 13, title: 'Contingency / Weather Reserve Day', dest: 'Pheriche', altM: 4240, duration: 'Reserve', dist: '0 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Built-in contingency day.' },
      { day: 14, title: 'Trek Pheriche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '6 hrs', dist: '15 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend to Namche Bazaar for celebratory dining.' },
      { day: 15, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek down to Lukla for farewell party with Sherpas.' },
      { day: 16, title: 'Flight Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Fly back to Kathmandu.' },
      { day: 17, title: 'Leisure Day in Kathmandu', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast', desc: 'Sightseeing, shopping, and celebration dinner.' },
      { day: 18, title: 'Buffer Day / Shopping in Thamel', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Rest day and celebratory dinner.' },
      { day: 19, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Airport transfer for flight home.' }
    ]
  },

  // 14. THREE HIGH PASSES WITH ISLAND PEAK CLIMB (21 DAYS)
  {
    slug: 'three-high-passes-with-island-peak-climb',
    title: 'Three High Passes with Island Peak Climb (21 Days) — Igloo Himalaya Treks',
    seoTitle: 'Three High Passes with Island Peak Climb (21 Days)',
    metaDesc: 'The ultimate Everest expedition: cross Kongma La (5,535m), Cho La (5,420m), Renjo La (5,360m), visit Gokyo & EBC, and summit Island Peak (6,189m).',
    canonical: 'https://igloohimalayatreks.com/trek/three-high-passes-with-island-peak-climb/',
    duration: '21 Days',
    difficulty: 'Extreme High Altitude Mountaineering',
    maxAlt: '6,189 m / 20,305 ft',
    maxAltNum: 6189,
    transport: 'Domestic Flights & Private Transfers',
    region: 'Everest / Khumbu',
    price: '2,690',
    heroBadge: 'Peak Climbing Nepal • 3 High Passes + 6,000m Summit',
    accommodation: 'Mountain Teahouses & Tented High Camp',
    gallery: [
      'island-peak-and-3-high-passes-trek-21-days-trek-in-everest.webp',
      'island-peak-and-3-high-passes-trek-21-days-trek-in-everest-02.webp',
      'island-peak-and-3-high-passes-trek-21-days-trek-in-everest-03.webp',
      'island-peak-climbing-best-itinerary-and-cost-2027.webp',
      'three-climbers-standing-on-the-snowy-summit-of-island-peak-6-189-m-with-panoramic-himalaya.webp',
      'everest-three-high-passes-trek.webp'
    ],
    highlights: [
      'The supreme grand slam of the Himalayas: 3 legendary 5,000m passes + 6,189m peak summit.',
      'Cross Renjo La (5,360m), Cho La (5,420m), and Kongma La (5,535m).',
      'Summit Island Peak (6,189m) via the 100m ice headwall and airy summit ridge.',
      'Explore sacred Gokyo Lakes, Gokyo Ri (5,357m), Everest Base Camp, and Kala Patthar (5,545m).',
      'Traverse Ngozumpa and Khumbu glaciers in the most comprehensive Everest circuit imaginable.',
      'Led by elite expedition Sherpa mountaineers with full high camp logistics and safety equipment.'
    ],
    faqs: [
      {
        q: 'Who is this extreme expedition suited for?',
        a: 'Only experienced hikers with prior high-altitude endurance and basic crampon/harness familiarity. You will cross 3 passes over 5,300m and climb to nearly 6,200m.'
      }
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla & Trek to Phakding', dest: 'Phakding', altM: 2610, duration: '35 min flight + 3 hrs trek', dist: '8 km', meals: 'Lunch, Dinner', desc: 'Flight to Lukla and walk to Phakding.' },
      { day: 2, title: 'Trek Phakding to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 to 6 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb into Namche.' },
      { day: 3, title: 'Acclimatization Day at Everest View Hotel', dest: 'Namche Bazaar', altM: 3880, duration: '4 hrs', dist: '5 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Acclimatization hike with Everest view.' },
      { day: 4, title: 'Trek Namche to Thame Village', dest: 'Thame', altM: 3820, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek west into the traditional mountaineering valley of Thame.' },
      { day: 5, title: 'Trek Thame to Lungden', dest: 'Lungden', altM: 4380, duration: '5 to 6 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Hike toward the Tibetan trading route at Lungden.' },
      { day: 6, title: 'PASS 1: Cross Renjo La Pass (5,360m) to Gokyo Lakes', dest: 'Gokyo', altM: 4790, duration: '7 to 8 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Conquer Renjo La pass with sudden staggering views of Everest and drop down to turquoise Gokyo Lake.' },
      { day: 7, title: 'Gokyo Ri Summit (5,357m) & Trek to Thangnak', dest: 'Thangnak', altM: 4700, duration: '5 hrs', dist: '7 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Sunrise on Gokyo Ri and cross Ngozumpa Glacier moraine to Thangnak.' },
      { day: 8, title: 'PASS 2: Cross Cho La Pass (5,420m) to Dzongla', dest: 'Dzongla', altM: 4830, duration: '7 to 8 hrs', dist: '9 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Cross the icy glaciated saddle of Cho La pass beneath Cholatse peak to Dzongla.' },
      { day: 9, title: 'Trek Dzongla to Gorak Shep & Everest Base Camp (5,364m)', dest: 'Gorak Shep', altM: 5364, duration: '7 to 8 hrs', dist: '14 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek past Lobuche to Gorak Shep and explore Everest Base Camp.' },
      { day: 10, title: 'Kala Patthar Sunrise (5,545m) & Trek to Lobuche', dest: 'Lobuche', altM: 4940, duration: '5 to 6 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Morning summit of Kala Patthar and return to Lobuche.' },
      { day: 11, title: 'PASS 3: Cross Kongma La Pass (5,535m) to Chhukung', dest: 'Chhukung', altM: 4730, duration: '7 to 8 hrs', dist: '11 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Conquer the highest and wildest pass, Kongma La (5,535m), descending into the Imja Valley at Chhukung.' },
      { day: 12, title: 'Pre-Climbing Training in Chhukung', dest: 'Chhukung', altM: 4730, duration: '3 hrs', dist: '2 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Gear inspection and fixed-rope practice with climbing Sherpas.' },
      { day: 13, title: 'Trek Chhukung to Island Peak Base Camp', dest: 'Base Camp', altM: 5200, duration: '3 to 4 hrs', dist: '6 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Move into expedition tent camp at the foot of Island Peak.' },
      { day: 14, title: 'SUMMIT DAY: Island Peak (6,189m) & Descend to Chhukung', dest: 'Chhukung', altM: 6189, duration: '10 to 12 hrs', dist: '12 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Climb the ice headwall and knife-edge ridge to stand at 6,189m! Complete the grand slam.' },
      { day: 15, title: 'Contingency / Reserve Day', dest: 'Chhukung', altM: 4730, duration: 'Reserve', dist: '0 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Reserve day for weather safety.' },
      { day: 16, title: 'Trek Chhukung to Tengboche', dest: 'Tengboche', altM: 3867, duration: '5 hrs', dist: '13 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Descend through Dingboche and Pangboche to Tengboche.' },
      { day: 17, title: 'Trek Tengboche to Namche Bazaar', dest: 'Namche Bazaar', altM: 3440, duration: '5 hrs', dist: '10 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Trek back to Namche Bazaar.' },
      { day: 18, title: 'Trek Namche Bazaar to Lukla', dest: 'Lukla', altM: 2840, duration: '6 to 7 hrs', dist: '19 km', meals: 'Breakfast, Lunch, Dinner', desc: 'Final trek back to Lukla airport.' },
      { day: 19, title: 'Fly Lukla to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min flight', dist: 'Flight', meals: 'Breakfast', desc: 'Fly to Kathmandu.' },
      { day: 20, title: 'Celebration Banquet & City Tour', dest: 'Kathmandu', altM: 1400, duration: 'Leisure', dist: 'City', meals: 'Breakfast, Farewell Dinner', desc: 'Rest, celebration, and certificate award.' },
      { day: 21, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Departure', dist: 'Airport', meals: 'Breakfast', desc: 'Airport transfer for flight home.' }
    ]
  }
];

module.exports = { everestPackages };
