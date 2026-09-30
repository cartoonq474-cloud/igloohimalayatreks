const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  // 1. Hero trust badge avatars
  {
    search: '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"\n                  alt="Trekker">',
    replace: '<img src="images/clients-home-1.jpg"\n                  alt="Trekker Client">'
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"\n                  alt="Trekker">',
    replace: '<img src="images/clients-home-2.jpg"\n                  alt="Trekker Client">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"\n                  alt="Trekker">',
    replace: '<img loading="lazy"\n                  src="images/clients-home-3.jpg"\n                  alt="Trekker Client">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"\n                  alt="Trekker">',
    replace: '<img loading="lazy"\n                  src="images/user.jpg"\n                  alt="Trekker Client">'
  },

  // 2. Destination Carousel 1st set
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"\n                  alt="Dolpo & Phoksundo Lake" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg"\n                  alt="Dolpo & Phoksundo Lake" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"\n                  alt="Rolwaling Valley Expedition" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg"\n                  alt="Rolwaling Valley Expedition" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80"\n                  alt="Makalu Barun Sanctuary" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/ama-dablam-peak.jpg"\n                  alt="Makalu Barun Sanctuary" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"\n                  alt="Humla & Mount Kailash Trail" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg"\n                  alt="Humla & Mount Kailash Trail" class="dest-card-img">'
  },

  // 3. Destination Carousel 2nd set (duplicate clone)
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"\n                  alt="Dolpo & Phoksundo Lake" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg"\n                  alt="Dolpo & Phoksundo Lake" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"\n                  alt="Rolwaling Valley Expedition" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg"\n                  alt="Rolwaling Valley Expedition" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80"\n                  alt="Makalu Barun Sanctuary" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/ama-dablam-peak.jpg"\n                  alt="Makalu Barun Sanctuary" class="dest-card-img">'
  },
  {
    search: '<img loading="lazy"\n                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"\n                  alt="Humla & Mount Kailash Trail" class="dest-card-img">',
    replace: '<img loading="lazy"\n                  src="images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg"\n                  alt="Humla & Mount Kailash Trail" class="dest-card-img">'
  },

  // 4. Activities Section
  {
    search: 'src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"\n                alt="Everest Base Camp Trek"',
    replace: 'src="images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.jpg"\n                alt="Everest Base Camp Trek"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80"\n                alt="Annapurna Circuit Expedition"',
    replace: 'src="images/trekking-the-classic-annapurna-circuit.jpg"\n                alt="Annapurna Circuit Expedition"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"\n                alt="Manaslu Circuit & Larke Pass"',
    replace: 'src="images/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo.jpg"\n                alt="Manaslu Circuit & Larke Pass"'
  },

  // 5. Featured Tabs: Mardi Himal
  {
    search: 'src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"\n                alt="Mardi Himal Ridge Trek"',
    replace: 'src="images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.jpg"\n                alt="Mardi Himal Ridge Trek"'
  },

  // 6. Featured Tabs: Peak Climbing
  {
    search: 'src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"\n                alt="Island Peak Climbing"',
    replace: 'src="images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.jpg"\n                alt="Island Peak Climbing"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"\n                alt="Mera Peak Climbing"',
    replace: 'src="images/climber-trekking-across-the-mera-peak-glacier-surrounded-by-snow-covered-himalayan-mountai.jpg"\n                alt="Mera Peak Climbing"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"\n                alt="Lobuche East Peak Climbing"',
    replace: 'src="images/everest-base-camp-with-labuche-peak-climbing.jpg"\n                alt="Lobuche East Peak Climbing"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"\n                alt="Yala Peak Climbing"',
    replace: 'src="images/yala-peak-climbing-trek-with-snow-covered-himalayan-mountains-in-langtang-nepal.jpg"\n                alt="Yala Peak Climbing"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1522083165195-342750297f4e?auto=format&fit=crop&w=800&q=80"\n                alt="Pisang Peak Climbing"',
    replace: 'src="images/island-peak-02.jpg"\n                alt="Pisang Peak Climbing"'
  },

  // 7. Featured Tabs: Nepal Tours
  {
    search: 'src="https://images.unsplash.com/photo-1558799401-1dcba79834c2?auto=format&fit=crop&w=800&q=80"\n                alt="Kathmandu Valley Heritage Tour"',
    replace: 'src="images/cheap-treks-in-nepal-under-1000-kal-bhairab-temple-and-traditional-pagoda-temples-at-kathm.jpg"\n                alt="Kathmandu Valley Heritage Tour"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80"\n                alt="Chitwan Jungle Safari"',
    replace: 'src="images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg"\n                alt="Chitwan Jungle Safari"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80"\n                alt="Pokhara Lakeside Adventure"',
    replace: 'src="images/boat-5259878-1920.jpg"\n                alt="Pokhara Lakeside Adventure"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"\n                alt="Lumbini Spiritual Pilgrimage"',
    replace: 'src="images/hindu-and-buddhist-religious-heritage-in-nepal.jpg"\n                alt="Lumbini Spiritual Pilgrimage"'
  },
  {
    search: 'src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"\n                alt="Nagarkot Sunrise & Village Tour"',
    replace: 'src="images/chisapani-nagarkot-trek.jpg"\n                alt="Nagarkot Sunrise & Village Tour"'
  },

  // 8. How Booking Works preview
  {
    search: 'src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80"\n                alt="How Booking Works Video Preview"',
    replace: 'src="images/trekkers-in-suspension-bridge.jpg"\n                alt="How Booking Works Video Preview"'
  },

  // 9. Video review cards (Background images + avatar footers)
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/a-confident-female-trekker-on-to-the-everest-base-camp-trek.jpg');\""
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Angelina">',
    replace: '<img src="images/clients-home-1.jpg" alt="Angelina">'
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.jpg');\""
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="David">',
    replace: '<img src="images/clients-home-2.jpg" alt="David">'
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/trekkers-posing-with-panoramic-himalayan-views-during-the-langtang-valley-trek-in-nepal.jpg');\""
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Emma">',
    replace: '<img src="images/clients-home-3.jpg" alt="Emma">'
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/trekker-hiking-on-the-annapurna-base-camp-trek-trail-with-breathtaking-himalayan-mountain.jpg');\""
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Chad">',
    replace: '<img src="images/user.jpg" alt="Chad">'
  },

  // 10. Customer cards avatars (Jack, Robin, James, Brandon)
  {
    search: '<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Jack">',
    replace: '<img src="images/clients-home-1.jpg" alt="Jack">'
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Robin">',
    replace: '<img src="images/clients-home-2.jpg" alt="Robin">'
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="James">',
    replace: '<img src="images/clients-home-3.jpg" alt="James">'
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Brandon">',
    replace: '<img src="images/user.jpg" alt="Brandon">'
  },

  // 11. Founder Profile & Team Guides
  {
    search: 'src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"\n                    alt="Pasang Sherpa - Founder & Head Expedition Leader"',
    replace: 'src="images/sonam-dorji-sherpa-climbing-guide-in-nepal.jpg"\n                    alt="Pasang Sherpa - Founder & Head Expedition Leader"'
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/kamal-tamang-trekking-guide-in-nepal.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/milan-tamang-trekking-guide-in-nepal.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/sujan-tamang-trekking-guide-in-nepal.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/babu-ram-pokharel-city-guide-in-nepal.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');\"",
    replace: "style=\"background-image: url('images/licensed-trekking-guide-accompanying-a-foreign-trekker-in-the-nepal-himalayas.jpg');\""
  },
  {
    search: '<img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Support Specialist">',
    replace: '<img src="images/elise-yuan-representative-of-the-usa-for-igloo-himalaya-treks.jpg" alt="Support Specialist">'
  },

  // 12. Himalayan Gallery Live Stream
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80');\"",
    replace: "style=\"background-image: url('images/gallery-1-1.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80');\"",
    replace: "style=\"background-image: url('images/gallery-1-2.jpg');\""
  },
  {
    search: "style=\"background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80');\"",
    replace: "style=\"background-image: url('images/gallery-1-3.jpg');\""
  },

  // 13. Newsletter Mockup
  {
    search: '<img loading="lazy"\n                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"\n                    alt="Igloo Himalaya Treks Newsletter Preview"',
    replace: '<img loading="lazy"\n                    src="images/destinations-igloo-himalaya-treks.jpg"\n                    alt="Igloo Himalaya Treks Newsletter Preview"'
  }
];

let replacedCount = 0;
replacements.forEach(r => {
  if (html.includes(r.search)) {
    // replace all occurrences
    html = html.split(r.search).join(r.replace);
    replacedCount++;
  } else {
    console.warn('NOT FOUND:', r.search.substring(0, 60));
  }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log(`Applied ${replacedCount} / ${replacements.length} replacement rules to index.html`);
