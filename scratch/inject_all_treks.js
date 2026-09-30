const fs = require('fs');
const path = require('path');

const trekGalleries = {
  'everest-base-camp-trek': {
    main: '../../images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.jpg',
    sub1: '../../images/everest-base-camp-trek-02.jpg',
    sub2: '../../images/everest-base-camp-trek-03.jpg',
    sub3: '../../images/everest-base-camp-trek-04.jpg',
    sub4: '../../images/everest-base-camp-trek-05.jpg',
    map: '../../images/ebc-map.png',
    photos: [
      '../../images/everest-base-camp-trek-06.jpg',
      '../../images/everest-base-camp-trek-07.jpg',
      '../../images/everest-base-camp-trek-08.jpg',
      '../../images/everest-base-camp-trek-09.jpg',
      '../../images/everest-base-camp-trek-10.jpg',
      '../../images/everest-base-camp-trek-11.jpg',
      '../../images/everest-base-camp-trek-12.jpg',
      '../../images/everest-base-camp-trek-13.jpg'
    ]
  },
  'annapurna-base-camp': {
    main: '../../images/annapurna-base-camp-trek.jpg',
    sub1: '../../images/annapurna-base-camp-trek-02.jpg',
    sub2: '../../images/annapurna-base-camp-trek-03.jpg',
    sub3: '../../images/annapurna-base-camp-trek-04.jpg',
    sub4: '../../images/annapurna-base-camp-trek-05.jpg',
    map: '../../images/a-detailed-map-of-the-annapurna-base-camp-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/annapurna-base-camp-trek-06.jpg',
      '../../images/annapurna-base-camp-trek-07.jpg',
      '../../images/annapurna-base-camp-trek-08.jpg',
      '../../images/annapurna-base-camp-trek-09.jpg',
      '../../images/annapurna-base-camp-trek-10.jpg',
      '../../images/annapurna-base-camp-trek-11.jpg',
      '../../images/annapurna-base-camp-trek-12.jpg',
      '../../images/annapurna-base-camp-trek-13.jpg'
    ]
  },
  'annapurna-circuit-trek': {
    main: '../../images/annapurna-circuit-trek.jpg',
    sub1: '../../images/annapurna-circuit-trek-02.jpg',
    sub2: '../../images/annapurna-circuit-luxury-trek-02.jpg',
    sub3: '../../images/annapurna-circuit-luxury-trek-03.jpg',
    sub4: '../../images/annapurna-circuit-luxury-trek-04.jpg',
    map: '../../images/a-detail-map-of-annapurna-circuit-trek-showing-checkpoints-with-landmarks-along-with-a-alt.jpg',
    photos: [
      '../../images/annapurna-circuit-luxury-trek-05.jpg',
      '../../images/annapurna-circuit-luxury-trek-06.jpg',
      '../../images/annapurna-circuit-luxury-trek-07.jpg',
      '../../images/annapurna-circuit-luxury-trek-08.jpg'
    ]
  },
  'gokyo-lakes-trek': {
    main: '../../images/gokyo-lakes-trek.jpg',
    sub1: '../../images/gokyo-lakes-trek-02.jpg',
    sub2: '../../images/gokyo-lakes-trek-03.jpg',
    sub3: '../../images/gokyo-lakes-trek-04.jpg',
    sub4: '../../images/gokyo-lakes-luxury-trek.jpg',
    map: '../../images/a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/gokyo-lakes-luxury-trek-02.jpg',
      '../../images/gokyo-lakes-luxury-trek-03.jpg',
      '../../images/gokyo-lakes-luxury-trek-04.jpg',
      '../../images/gokyo-lakes-luxury-trek-05.jpg'
    ]
  },
  'gokyo-lakes-and-cho-la-pass': {
    main: '../../images/gokyo-lake-and-chola-pass-trek.jpg',
    sub1: '../../images/ebc-chola-pass-gokyo-trek.jpg',
    sub2: '../../images/ebc-chola-pass-gokyo-trek-02.jpg',
    sub3: '../../images/ebc-chola-pass-gokyo-trek-03.jpg',
    sub4: '../../images/gokyo-lakes-luxury-trek-06.jpg',
    map: '../../images/a-detailed-map-of-the-gokyo-lake-with-ranjo-la-pass-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/ebc-chola-pass-gokyo-trek-17-day-epic-itinerary-cost-and-map.jpg',
      '../../images/gokyo-lakes-luxury-trek-07.jpg'
    ]
  },
  'manaslu-circuit-trek': {
    main: '../../images/manaslu-circuit-trek.jpg',
    sub1: '../../images/manaslu-circuit-trek-02.jpg',
    sub2: '../../images/manaslu-circuit-trek-12-days.jpg',
    sub3: '../../images/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo.jpg',
    sub4: '../../images/a-glimpse-of-a-beautiful-monastery-from-the-manaslu-trek-in-nepal-by-igloo-himalay-treks.jpg',
    map: '../../images/a-detailed-map-of-the-manaslu-circuit-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/manaslu-circuit-trek-guide.jpg',
      '../../images/manaslu-circuit-trek-guide-02.jpg',
      '../../images/manaslu-circuit-trek-guide-03.jpg',
      '../../images/manaslu-circuit-trek-guide-04.jpg'
    ]
  },
  'langtang-valley-trek': {
    main: '../../images/langtang-valley-trek-complete-10-day-trekking-guide.jpg',
    sub1: '../../images/langtang-valley-trek-complete-10-day-trekking-guide-02.jpg',
    sub2: '../../images/a-collection-of-iconic-moments-and-landscapes-experienced-during-the-langtang-valley-trek.jpg',
    sub3: '../../images/a-traditional-mani-wall-marks-the-scenic-langtang-valley-trek-route-surrounded-by-stunning.jpg',
    sub4: '../../images/himalayan-yaks-are-a-common-sight-along-the-langtang-valley-trek-especially-near-kyanjin-g.jpg',
    map: '../../images/a-detailed-map-of-the-langtang-valley-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/langtang-valley-trek-complete-10-day-trekking-guide-03.jpg',
      '../../images/langtang-valley-trek-cost-02.jpg'
    ]
  },
  'mardi-himal-trek': {
    main: '../../images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.jpg',
    sub1: '../../images/what-is-the-mardi-himal-trek.jpg',
    sub2: '../../images/what-is-the-mardi-himal-trek-complete-guide.jpg',
    sub3: '../../images/mardi-himal-trek-guide.jpg',
    sub4: '../../images/trekker-standing-on-a-rocky-viewpoint-with-machhapuchhre-fishtail-mountain-towering-under.jpg',
    map: '../../images/a-detailed-map-of-the-annapurna-base-camp-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/ghorepani-poon-hill-vs-mardi-himal-trek.jpg',
      '../../images/abc-with-mardi-himal-trek.webp'
    ]
  },
  'upper-mustang-trek': {
    main: '../../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.jpg',
    sub1: '../../images/upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.jpg',
    sub2: '../../images/upper-mustang-tiji-festival-spectacular-culture-rituals.jpg',
    sub3: '../../images/upper-mustang-tiji-festival.jpg',
    sub4: '../../images/upper-mustang.jpg',
    map: '../../images/map3.jpg',
    photos: [
      '../../images/upper-mustang-jeep-tour.jpg',
      '../../images/upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.jpg'
    ]
  },
  'kanchenjunga-base-camp-trek': {
    main: '../../images/kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.jpg',
    sub1: '../../images/from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.jpg',
    sub2: '../../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg',
    sub3: '../../images/trekkers-walking-beside-a-mountain-river-through-colorful-autumn-forests-on-the-kanchenjun.jpg',
    sub4: '../../images/kanchenjunga-circuit-trek-without-flight.jpg',
    map: '../../images/map.png',
    photos: [
      '../../images/kanchenjunga-circuit-trek-in-eastern-nepal.jpg',
      '../../images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.jpg'
    ]
  },
  'ghorepani-poon-hill-trek': {
    main: '../../images/ghorepani-poon-hill-trek.jpg',
    sub1: '../../images/ghorepani-poon-hill-trek-02.jpg',
    sub2: '../../images/ghorepani-poon-hill-trek-03.jpg',
    sub3: '../../images/ghorepani-poon-hill-trek-2027-cost-itinerary-and-sunrise.jpg',
    sub4: '../../images/ghorepani-poonhill-trekking.jpg',
    map: '../../images/a-detailed-map-of-the-annapurna-base-camp-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/ghorepani-poon-hill-and-mardi-himal-trek.jpg',
      '../../images/ghorepani-poon-hill-vs-mardi-himal-trek.jpg'
    ]
  },
  'everest-view-trek': {
    main: '../../images/everest-view-trek.jpg',
    sub1: '../../images/everest-view-trek-02.jpg',
    sub2: '../../images/everest-view-trek-03.jpg',
    sub3: '../../images/everest-view-trek-04.jpg',
    sub4: '../../images/everest-view-trek-05.jpg',
    map: '../../images/ebc-map.png',
    photos: [
      '../../images/everest-view-trek-06.jpg',
      '../../images/everest-view-trek-07.jpg',
      '../../images/everest-view-trek-08.jpg',
      '../../images/everest-view-trek-09.jpg'
    ]
  },
  'everest-three-passes-trek': {
    main: '../../images/everest-three-high-passes-trek.jpg',
    sub1: '../../images/everest-three-passes-trek-route-tips-and-best-itinerary.jpg',
    sub2: '../../images/everest-three-passes-trek-route-tips-and-best-itinerary-02.jpg',
    sub3: '../../images/everest-three-high-passes-trek-02.jpg',
    sub4: '../../images/everest-cho-la-and-renjo-la-pass-trek-16-days.jpg',
    map: '../../images/ebc-map.png',
    photos: [
      '../../images/everest-three-passes-trek-route-tips-and-best-itinerary-03.jpg',
      '../../images/everest-cho-la-and-renjo-la-pass-trek-16-days-02.webp'
    ]
  },
  'gosaikunda-lake-trek': {
    main: '../../images/gosaikunda-trek.jpg',
    sub1: '../../images/gosaikunda-trek-02.jpg',
    sub2: '../../images/gosaikunda-trek-03.jpg',
    sub3: '../../images/gosaikunda-trek-04.jpg',
    sub4: '../../images/gosaikunda-trek-05.jpg',
    map: '../../images/a-detailed-map-of-the-langtang-valley-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/frozen-lake-2393378.jpg',
      '../../images/langtang-gosaikunda-helambu-trek.jpg'
    ]
  },
  'tsum-valley-trek': {
    main: '../../images/tsum-valley-trek-amazing-himalayan-adventure-in-nepal.jpg',
    sub1: '../../images/tsum-valley-trek.jpg',
    sub2: '../../images/tsum-valley-trek-photo-with-himalayan-background.jpg',
    sub3: '../../images/tsum-valley-trek-02.jpg',
    sub4: '../../images/tsum-valley-trek-photo.jpg',
    map: '../../images/a-detailed-map-of-the-manaslu-circuit-trek-with-a-altitude-graph.jpg',
    photos: [
      '../../images/tsum-valley-trek-03.jpg',
      '../../images/tsum-valley-trek-photo-02.jpg'
    ]
  },
  'rara-lake-trek': {
    main: '../../images/7-day-rara-lake-jeep-tour-rara-lake-tour-package.jpg',
    sub1: '../../images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg',
    sub2: '../../images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-03.png',
    sub3: '../../images/boat-5259878-1920.jpg',
    sub4: '../../images/frozen-lake-2393378.jpg',
    map: '../../images/map.png',
    photos: [
      '../../images/himalaya-4039495-1920.jpg'
    ]
  },
  'tilicho-lake-trek': {
    main: '../../images/annapurna-circuit-with-tilicho-lake-trek-2.jpg',
    sub1: '../../images/annapurna-circuit-with-tilicho-lake-trek-igloo-himalaya-treks.jpg',
    sub2: '../../images/annapurna-circuit-with-tilicho-lake-trek-igloo-himalaya-treks-02.jpg',
    sub3: '../../images/annapurna-circuit-with-tilicho-lake-trek-02.webp',
    sub4: '../../images/annapurna-circuit-with-tilicho-lake-trek-3.webp',
    map: '../../images/a-detail-map-of-annapurna-circuit-trek-showing-checkpoints-with-landmarks-along-with-a-alt.jpg',
    photos: [
      '../../images/annapurna-circuit-with-tilicho-lake-trek-igloo-himalaya-treks-03.jpg'
    ]
  }
};

// Update trek pages
const trekDir = path.join('.', 'trek');
const trekFolders = fs.readdirSync(trekDir);

let updatedTrekCount = 0;

trekFolders.forEach(folder => {
  const pagePath = path.join(trekDir, folder, 'index.html');
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, 'utf8');
  const cfg = trekGalleries[folder] || {
    main: '../../images/hero-himalayas.jpg',
    sub1: '../../images/gallery-1-1.jpg',
    sub2: '../../images/gallery-1-2.jpg',
    sub3: '../../images/gallery-1-3.jpg',
    sub4: '../../images/gallery-1-4.jpg',
    map: '../../images/map.png',
    photos: ['../../images/gallery-1-5.jpg', '../../images/gallery-1-6.jpg']
  };

  // Replace collage images if they contain unsplash
  // Match the collage section
  const collageRegex = /(<div class="trek-gallery-collage">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/i;
  const m = content.match(collageRegex);
  if (m && m[0].includes('images.unsplash.com')) {
    let collageHtml = m[0];
    // replace first img
    collageHtml = collageHtml.replace(/(<div class="trek-gallery-main">\s*<img[^>]+src=")[^"]+(")/i, `$1${cfg.main}$2`);
    // replace sub images sequentially
    const subs = [cfg.sub1, cfg.sub2, cfg.sub3, cfg.sub4];
    let subIdx = 0;
    collageHtml = collageHtml.replace(/(<div class="trek-gallery-sub[^"]*">\s*<img[^>]+src=")[^"]+(")/gi, (match, p1, p2) => {
      const url = subs[subIdx] || cfg.sub1;
      subIdx++;
      return `${p1}${url}${p2}`;
    });
    content = content.replace(m[0], collageHtml);
  }

  // Replace remaining Unsplash images in itinerary photos sequentially
  let photoIdx = 0;
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, (match) => {
    const list = cfg.photos || [cfg.sub1, cfg.sub2];
    const chosen = list[photoIdx % list.length];
    photoIdx++;
    return chosen;
  });

  fs.writeFileSync(pagePath, content, 'utf8');
  updatedTrekCount++;
});

console.log(`Updated ${updatedTrekCount} trek detail pages with authentic photography!`);
