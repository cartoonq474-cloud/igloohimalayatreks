const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace Unsplash URLs based on their specific contexts or unique URLs:
// Let's inspect each occurrence in index.html and its surrounding context
const lines = html.split(/\r?\n/);
console.log('Total lines:', lines.length);

// We can map by line or regex
// Let's create a list of line number based or regex based replacements
const replacements = [
  // Trust avatars (around line 640-655)
  { line: 642, url: 'images/clients-home-1.jpg', alt: 'Trekker Client' },
  { line: 644, url: 'images/clients-home-2.jpg', alt: 'Trekker Client' },
  { line: 647, url: 'images/clients-home-3.jpg', alt: 'Trekker Client' },
  { line: 650, url: 'images/user.jpg', alt: 'Trekker Client' },

  // Destination carousel 1 (lines 1411, 1456, 1501, 1546)
  { line: 1411, url: 'images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg' },
  { line: 1456, url: 'images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg' },
  { line: 1501, url: 'images/ama-dablam-peak.jpg' },
  { line: 1546, url: 'images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg' },

  // Destination carousel 2 duplicate (lines 1637, 1682, 1727, 1772)
  { line: 1637, url: 'images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg' },
  { line: 1682, url: 'images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg' },
  { line: 1727, url: 'images/ama-dablam-peak.jpg' },
  { line: 1772, url: 'images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg' },

  // Activities (lines 1913, 1986, 2059)
  { line: 1913, url: 'images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.jpg' },
  { line: 1986, url: 'images/trekking-the-classic-annapurna-circuit.jpg' },
  { line: 2059, url: 'images/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo.jpg' },

  // Featured Tabs (lines 2452, 2712, 2817, 2919, 3022, 3126, 3295, 3400, 3505, 3610, 3716)
  { line: 2452, url: 'images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.jpg' },
  { line: 2712, url: 'images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.jpg' },
  { line: 2817, url: 'images/climber-trekking-across-the-mera-peak-glacier-surrounded-by-snow-covered-himalayan-mountai.jpg' },
  { line: 2919, url: 'images/everest-base-camp-with-labuche-peak-climbing.jpg' },
  { line: 3022, url: 'images/yala-peak-climbing-trek-with-snow-covered-himalayan-mountains-in-langtang-nepal.jpg' },
  { line: 3126, url: 'images/island-peak-02.jpg' },
  { line: 3295, url: 'images/cheap-treks-in-nepal-under-1000-kal-bhairab-temple-and-traditional-pagoda-temples-at-kathm.jpg' },
  { line: 3400, url: 'images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg' },
  { line: 3505, url: 'images/boat-5259878-1920.jpg' },
  { line: 3610, url: 'images/hindu-and-buddhist-religious-heritage-in-nepal.jpg' },
  { line: 3716, url: 'images/chisapani-nagarkot-trek.jpg' },

  // Video preview thumb (line 3876)
  { line: 3876, url: 'images/trekkers-in-suspension-bridge.jpg' },

  // Video review card 1 (Angelina)
  { line: 4054, url: 'images/a-confident-female-trekker-on-to-the-everest-base-camp-trek.jpg' },
  { line: 4067, url: 'images/clients-home-1.jpg' },
  // Video review card 2 (David)
  { line: 4082, url: 'images/a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.jpg' },
  { line: 4095, url: 'images/clients-home-2.jpg' },
  // Video review card 3 (Emma)
  { line: 4110, url: 'images/trekkers-posing-with-panoramic-himalayan-views-during-the-langtang-valley-trek-in-nepal.jpg' },
  { line: 4123, url: 'images/clients-home-3.jpg' },
  // Video review card 4 (Chad)
  { line: 4138, url: 'images/trekker-hiking-on-the-annapurna-base-camp-trek-trail-with-breathtaking-himalayan-mountain.jpg' },
  { line: 4151, url: 'images/user.jpg' },

  // Video review duplicate track (lines 4167, 4180, 4195, 4208, 4223, 4236, 4251, 4264)
  { line: 4167, url: 'images/a-confident-female-trekker-on-to-the-everest-base-camp-trek.jpg' },
  { line: 4180, url: 'images/clients-home-1.jpg' },
  { line: 4195, url: 'images/a-memorable-moment-captured-at-everest-base-camp-after-completing-the-challenging-trek.jpg' },
  { line: 4208, url: 'images/clients-home-2.jpg' },
  { line: 4223, url: 'images/trekkers-posing-with-panoramic-himalayan-views-during-the-langtang-valley-trek-in-nepal.jpg' },
  { line: 4236, url: 'images/clients-home-3.jpg' },
  { line: 4251, url: 'images/trekker-hiking-on-the-annapurna-base-camp-trek-trail-with-breathtaking-himalayan-mountain.jpg' },
  { line: 4264, url: 'images/user.jpg' },

  // Customer Card Avatars (lines 4305, 4335, 4365, 4395, 4427, 4457, 4487, 4517)
  { line: 4305, url: 'images/clients-home-1.jpg' },
  { line: 4335, url: 'images/clients-home-2.jpg' },
  { line: 4365, url: 'images/clients-home-3.jpg' },
  { line: 4395, url: 'images/user.jpg' },
  { line: 4427, url: 'images/clients-home-1.jpg' },
  { line: 4457, url: 'images/clients-home-2.jpg' },
  { line: 4487, url: 'images/clients-home-3.jpg' },
  { line: 4517, url: 'images/user.jpg' },

  // Founder & Head Expedition Leader (line 5112)
  { line: 5112, url: 'images/sonam-dorji-sherpa-climbing-guide-in-nepal.jpg' },

  // Team Guides (lines 5201, 5232, 5263, 5293, 5323)
  { line: 5201, url: 'images/kamal-tamang-trekking-guide-in-nepal.jpg' },
  { line: 5232, url: 'images/milan-tamang-trekking-guide-in-nepal.jpg' },
  { line: 5263, url: 'images/sujan-tamang-trekking-guide-in-nepal.jpg' },
  { line: 5293, url: 'images/babu-ram-pokharel-city-guide-in-nepal.jpg' },
  { line: 5323, url: 'images/licensed-trekking-guide-accompanying-a-foreign-trekker-in-the-nepal-himalayas.jpg' },
  // Support Specialist (line 5360)
  { line: 5360, url: 'images/elise-yuan-representative-of-the-usa-for-igloo-himalaya-treks.jpg' },

  // Live Himalayan Photo Stream (lines 5922, 5938, 5954)
  { line: 5922, url: 'images/gallery-1-1.jpg' },
  { line: 5938, url: 'images/gallery-1-2.jpg' },
  { line: 5954, url: 'images/gallery-1-3.jpg' },

  // Newsletter Preview (line 6002)
  { line: 6002, url: 'images/destinations-igloo-himalaya-treks.jpg' }
];

let replaced = 0;
// We will replace Unsplash URL on the specific line (+-2 lines window)
replacements.forEach(rep => {
  let found = false;
  for (let offset = -2; offset <= 2; offset++) {
    const idx = rep.line - 1 + offset;
    if (idx >= 0 && idx < lines.length) {
      if (lines[idx].includes('images.unsplash.com')) {
        // replace url in this line
        lines[idx] = lines[idx].replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, rep.url);
        found = true;
        replaced++;
        break;
      }
    }
  }
  if (!found) {
    console.log('Not found for target line:', rep.line, rep.url);
  }
});

console.log(`Replaced ${replaced} / ${replacements.length} lines.`);
fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
