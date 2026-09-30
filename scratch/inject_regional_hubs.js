const fs = require('fs');

const regionalMaps = {
  'everest-region-treks/index.html': {
    hero: '../images/hero-himalayas.jpg',
    items: {
      'Everest Three Passes Trek': '../images/everest-three-high-passes-trek.jpg',
      'Short EBC Trek': '../images/everest-base-camp-16-days.jpg',
      'Everest View Trek': '../images/everest-view-trek.jpg',
      'Everest Luxury Trek': '../images/everest-base-camp-luxury-trek.jpg',
      'Jiri to EBC Trek': '../images/everest-base-camp-trek-without-flight.jpg',
      'Island Peak Climbing': '../images/everest-base-camp-with-island-peak-climbing.jpg',
      'First-Time Trekkers': '../images/everest-view-trek-02.jpg',
      'Alpine Lakes Lovers': '../images/gokyo-lakes-trek.jpg',
      'Experienced Trekkers': '../images/everest-cho-la-and-renjo-la-pass-trek-16-days.jpg',
      'Limited Time': '../images/everest-base-camp-heli-tour.jpg',
      'Comfort Seekers': '../images/gokyo-lakes-luxury-trek.jpg',
      'Mountaineers': '../images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.jpg'
    }
  },
  'annapurna-region-treks/index.html': {
    hero: '../images/annapurna-4496175-1920.jpg',
    items: {
      'Ghorepani Poon Hill Trek': '../images/ghorepani-poon-hill-trek.jpg',
      'Mardi Himal Trek': '../images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.jpg',
      'Tilicho Lake & Circuit': '../images/annapurna-circuit-with-tilicho-lake-trek-2.jpg',
      'Khopra Danda Ridge Trek': '../images/abc-with-mardi-himal-trek.webp',
      'First-Time Trekkers': '../images/ghorepani-poon-hill-trek-02.jpg',
      'Alpine Sanctuary Lovers': '../images/annapurna-sanctuary-1983908-1920.jpg',
      'High Pass Challengers': '../images/classic-annapurna-circuit-trek.jpg',
      'Short Trip Travelers': '../images/annapurna-base-camp-trek-itinerary-7-days.jpg',
      'Comfort Seekers': '../images/annapurna-circuit-luxury-trek.jpg',
      'Cultural Explorers': '../images/gurung-dress.jpg'
    }
  },
  'langtang-region-treks/index.html': {
    hero: '../images/langtang-valley-trek-complete-10-day-trekking-guide.jpg',
    items: {
      'Langtang Valley Trek': '../images/langtang-valley-trek-complete-10-day-trekking-guide-02.jpg',
      'Gosaikunda Lake Trek': '../images/gosaikunda-trek.jpg',
      'Tamang Heritage Trail': '../images/if-you-are-looking-for-a-less-crowded-trekking-region-and-close-to-kathmandu-langtang-vall.jpg',
      'Langtang Helambu Trek': '../images/langtang-gosaikunda-helambu-trek.jpg',
      'Yala Peak Climbing': '../images/yala-peak-climbing-trek-with-snow-covered-himalayan-mountains-in-langtang-nepal.jpg',
      'Short Valley Trekkers': '../images/a-collection-of-iconic-moments-and-landscapes-experienced-during-the-langtang-valley-trek.jpg',
      'Sacred Lake Pilgrims': '../images/gosaikunda-trek-02.jpg',
      'Indigenous Culture Seekers': '../images/a-traditional-mani-wall-marks-the-scenic-langtang-valley-trek-route-surrounded-by-stunning.jpg',
      'Beginner Peak Climbers': '../images/yala-peak-climbing.jpg',
      'Budget Conscious Hikers': '../images/himalayan-yaks-are-a-common-sight-along-the-langtang-valley-trek-especially-near-kyanjin-g.jpg',
      'Close to Kathmandu Explorers': '../images/chisapani-nagarkot-trek.jpg'
    }
  },
  'manaslu-region-treks/index.html': {
    hero: '../images/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo.jpg',
    items: {
      'Manaslu Circuit Trek': '../images/manaslu-circuit-trek.jpg',
      'Manaslu Tsum Valley Trek': '../images/tsum-valley-trek.jpg',
      'Tsum Valley Trek': '../images/tsum-valley-trek-amazing-himalayan-adventure-in-nepal.jpg',
      'Remote Circuit Purists': '../images/manaslu-circuit-trek-guide.jpg',
      'Tibetan Buddhist Enthusiasts': '../images/a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.jpg',
      'High Pass Enthusiasts': '../images/manaslu-circuit-trek-12-days.jpg',
      'Restricted Area Explorers': '../images/tsum-valley-trek-photo-with-himalayan-background.jpg',
      'Off-Grid Enthusiasts': '../images/manaslu-circuit-trek-02.jpg',
      'Teahouse Trekkers': '../images/manaslu-trek-food-and-accommodation-guide-teahouses-cost-and-tips.jpg'
    }
  },
  'mustang-region-treks/index.html': {
    hero: '../images/upper-mustang.jpg',
    items: {
      'Upper Mustang Lo Manthang Trek': '../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.jpg',
      'Culture & History Buffs': '../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.jpg',
      'Festival Enthusiasts': '../images/upper-mustang-tiji-festival-spectacular-culture-rituals.jpg',
      'Monsoon Season Trekkers': '../images/upper-mustang-tiji-festival.jpg',
      'Spiritual Pilgrims': '../images/hindu-and-buddhist-religious-heritage-in-nepal.jpg',
      'Jeep & Overland Explorers': '../images/upper-mustang-jeep-tour.jpg',
      'Sky Cave Explorers': '../images/upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.jpg'
    }
  },
  'kanchenjunga-region-treks/index.html': {
    hero: '../images/from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.jpg',
    items: {
      'Long Distance Expeditioners': '../images/kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.jpg',
      '8,000m Mountain Seekers': '../images/kanchenjunga-circuit-trek-in-eastern-nepal.jpg',
      'Flora & Fauna Enthusiasts': '../images/trekkers-walking-beside-a-mountain-river-through-colorful-autumn-forests-on-the-kanchenjun.jpg',
      'Indigenous Culture Seekers': '../images/kanchenjunga-circuit-trek-without-flight.jpg',
      'High Pass Crossers': '../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg',
      'Quiet Trail Lovers': '../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.jpg'
    }
  },
  'dolpo-region-treks/index.html': {
    hero: '../images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg',
    items: {
      'Upper Dolpo & Shey Gompa': '../images/upper-dolpo-trek.jpg',
      'True Wilderness Explorers': '../images/upper-dolpo-trek-02.jpg',
      'Alpine Lake Admirers': '../images/upper-dolpo-trek-03.jpg',
      'Bon Religion Researchers': '../images/upper-dolpo-trek-04.jpg',
      'Long-Distance Expeditioners': '../images/upper-dolpo-trek-05.jpg',
      'High Pass Crossers': '../images/upper-dolpo-trek-06.jpg',
      'Literary & Film Fans': '../images/upper-dolpo-trek-07.jpg'
    }
  },
  'rolwaling-region-treks/index.html': {
    hero: '../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg',
    items: {
      'Tsho Rolpa Lake Trek': '../images/frozen-lake-2393378.jpg',
      'Glacial Lake Lovers': '../images/gosaikunda-trek.jpg',
      'Technical Pass Crossers': '../images/everest-three-high-passes-trek.jpg',
      'Remote Sherpa Culture': '../images/a-trekker-and-a-porter-walking-along-the-everest-base-camp-trekking-trail-with-panoramic-v.jpg',
      'Mountaineers & Climbers': '../images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.jpg'
    }
  },
  'makalu-region-treks/index.html': {
    hero: '../images/ama-dablam-peak.jpg',
    items: {
      'Makalu Base Camp Trek': '../images/best-trekking-in-nepal-2027.jpg',
      'Wilderness Enthusiasts': '../images/best-treks-in-nepal-2027-02.jpg',
      '8,000m Peak Seekers': '../images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.jpg',
      'Extreme Pass Challengers': '../images/everest-three-passes-trek-route-tips-and-best-itinerary.jpg',
      'Deep Elevation Trekkers': '../images/trekkers-walking-beside-a-mountain-river-through-colorful-autumn-forests-on-the-kanchenjun.jpg'
    }
  },
  'ganesh-himal-region-treks/index.html': {
    hero: '../images/chisapani-nagarkot-trek.jpg',
    items: {
      'Ruby Valley Cultural Trek': '../images/chisapani-nagarkot-trek-02.jpg',
      'Community Homestay Lovers': '../images/chisapani-nagarkot-trek-03.jpg',
      'Mineral & Ruby Enthusiasts': '../images/chisapani-nagarkot-trek-04.jpg',
      'Off-the-Beaten-Path Trekkers': '../images/if-you-are-looking-for-a-less-crowded-trekking-region-and-close-to-kathmandu-langtang-vall.jpg',
      'Scenic View Seekers': '../images/view-from-jamacho.webp'
    }
  },
  'trekking-regions-nepal/index.html': {
    hero: '../images/hero-himalayas.jpg',
    items: {
      'Makalu Barun Region': '../images/ama-dablam-peak.jpg',
      'Dolpo Region': '../images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg',
      'Rolwaling Valley': '../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg',
      'Rara Lake Wilderness': '../images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg'
    }
  }
};

for (const [filePath, config] of Object.entries(regionalMaps)) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace background hero / section banners
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544735716-392fe2489ffa\?[^"')\s]+/g, config.hero);

  for (const [name, imgPath] of Object.entries(config.items)) {
    const regex1 = new RegExp(`(<img[^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'][^>]+alt=["']${name}["'])`, 'g');
    content = content.replace(regex1, `$1${imgPath}$2`);

    const regex2 = new RegExp(`(<img[^>]+alt=["']${name}["'][^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'])`, 'g');
    content = content.replace(regex2, `$1${imgPath}$2`);

    // Also handle card style="... url('...')"
    const regexBg = new RegExp(`(alt=["']${name}["'][\\s\\S]*?url\\(['"]?)https://images\\.unsplash\\.com/[^"')]+(['"]?\\))`, 'g');
    content = content.replace(regexBg, `$1${imgPath}$2`);
  }

  // Any remaining generic unsplash in this file, replace with config.hero
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, config.hero);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated regional hub: ${filePath}`);
}
