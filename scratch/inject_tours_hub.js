const fs = require('fs');

const tourMap = {
  'Kathmandu Valley UNESCO World Heritage Cultural Tour': 'images/cheap-treks-in-nepal-under-1000-kal-bhairab-temple-and-traditional-pagoda-temples-at-kathm.jpg',
  'Pokhara Lakes, Caves & Sarangkot Himalayan Sunrise Tour': 'images/boat-5259878-1920.jpg',
  'Best of Nepal: Kathmandu, Pokhara & Chitwan Wildlife Tour': 'images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg',
  'Chitwan National Park Jungle Safari & Tharu Cultural Tour': 'images/chitwan-jungle-safari.jpg',
  'Nagarkot Himalayan Sunrise & Bhaktapur Ancient City Tour': 'images/chisapani-nagarkot-trek.jpg',
  'Nepal Everest & Annapurna Luxury Helicopter Sightseeing Tour': 'images/everest-base-camp-helicopter-tour.jpg'
};

function updateTourHub(filePath, isSubdir) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = isSubdir ? '../' : '';

  for (const [title, imgPath] of Object.entries(tourMap)) {
    const regex = new RegExp(`(<img[^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'][^>]+alt=["']${title}["'])`, 'g');
    content = content.replace(regex, `$1${prefix}${imgPath}$2`);
    
    const regexAltFirst = new RegExp(`(<img[^>]+alt=["']${title}["'][^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'])`, 'g');
    content = content.replace(regexAltFirst, `$1${prefix}${imgPath}$2`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateTourHub('nepal-tour-packages.html', false);
updateTourHub('nepal-tour-packages/index.html', true);
