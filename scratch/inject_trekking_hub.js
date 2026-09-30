const fs = require('fs');

const trekImageMap = {
  'Ghorepani Poon Hill Trek': 'images/ghorepani-poon-hill-trek.jpg',
  'Everest Three Passes Trek': 'images/everest-three-high-passes-trek.jpg',
  'Everest View Trek': 'images/everest-view-trek.jpg',
  'Everest Base Camp via Gokyo Lakes': 'images/ebc-chola-pass-gokyo-trek.jpg',
  'Mardi Himal Trek': 'images/trekkers-posing-at-the-mardi-himal-view-point-sign-surrounded-by-snow-covered-himalayan-pe.jpg',
  'Khopra Ridge Trek': 'images/abc-with-mardi-himal-trek.webp',
  'Nar Phu Valley Trek': 'images/annapurna-circuit-luxury-trek.jpg',
  'Annapurna Sanctuary Trek': 'images/annapurna-sanctuary-1983908-1920.jpg',
  'Tilicho Lake Trek': 'images/annapurna-circuit-with-tilicho-lake-trek-2.jpg',
  'Poon Hill & ABC Trek': 'images/ghorepani-poon-hill-and-mardi-himal-trek.jpg',
  'Gosaikunda Lake Trek': 'images/gosaikunda-trek.jpg',
  'Langtang Gosaikunda Trek': 'images/langtang-gosaikunda-helambu-trek.jpg',
  'Tamang Heritage Trail Trek': 'images/if-you-are-looking-for-a-less-crowded-trekking-region-and-close-to-kathmandu-langtang-vall.jpg',
  'Helambu Trek': 'images/chisapani-nagarkot-trek-02.jpg',
  'Tsum Valley Trek': 'images/tsum-valley-trek-amazing-himalayan-adventure-in-nepal.jpg',
  'Manaslu Tsum Valley Trek': 'images/tsum-valley-trek.jpg',
  'Lower Mustang Trek': 'images/upper-mustang.jpg',
  'Pikey Peak Trek': 'images/view-from-jamacho.webp',
  'Mohare Danda Trek': 'images/annapurna-scenic-trek.jpg',
  'Panchase Trek': 'images/annapurna-scenic-trek-peaceful-trails-and-annapurna-views-02.jpg',
  'Ruby Valley Trek': 'images/chisapani-nagarkot-trek.jpg',
  'Rara Lake Trek': 'images/7-day-rara-lake-jeep-tour-rara-lake-tour-package-02.jpg',
  'Makalu Base Camp Trek': 'images/ama-dablam-peak.jpg',
  'Dhaulagiri Circuit Trek': 'images/best-treks-in-nepal-2027.jpg',
  'Rolwaling Valley Trek': 'images/glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.jpg'
};

function updateTrekkingHub(filePath, isSubdir) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = isSubdir ? '../' : '';

  // Replace hero background
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544735716-392fe2489ffa\?[^"')\s]+/g, prefix + 'images/hero-himalayas.jpg');

  // Replace card images based on alt
  for (const [title, imgPath] of Object.entries(trekImageMap)) {
    const regex = new RegExp(`(<img[^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'][^>]+alt=["']${title}["'])`, 'g');
    content = content.replace(regex, `$1${prefix}${imgPath}$2`);
    
    // Also reverse order (alt before src)
    const regexAltFirst = new RegExp(`(<img[^>]+alt=["']${title}["'][^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'])`, 'g');
    content = content.replace(regexAltFirst, `$1${prefix}${imgPath}$2`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateTrekkingHub('nepal-trekking-packages.html', false);
updateTrekkingHub('nepal-trekking-packages/index.html', true);
