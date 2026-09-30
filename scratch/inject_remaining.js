const fs = require('fs');

// 1. Peak Climbing Hub
if (fs.existsSync('peak-climbing-nepal/index.html')) {
  let content = fs.readFileSync('peak-climbing-nepal/index.html', 'utf8');
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544735716-392fe2489ffa\?[^"')\s]+/g, '../images/climbing-in-nepal.jpg');
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, '../images/climbers-celebrating-at-the-island-peak-6-189-m-summit-with-snow-covered-himalayan-peaks-i.jpg');
  fs.writeFileSync('peak-climbing-nepal/index.html', content, 'utf8');
  console.log('Updated peak-climbing-nepal/index.html');
}

// 2. Restricted Area Treks Hub
if (fs.existsSync('restricted-area-treks-nepal/index.html')) {
  let content = fs.readFileSync('restricted-area-treks-nepal/index.html', 'utf8');
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544735716-392fe2489ffa\?[^"')\s]+/g, '../images/upper-mustang.jpg');
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, '../images/upper-dolpo-trek-remote-himalayan-adventure-in-nepal.jpg');
  fs.writeFileSync('restricted-area-treks-nepal/index.html', content, 'utf8');
  console.log('Updated restricted-area-treks-nepal/index.html');
}

// 3. Tour detail pages
const tourConfigs = {
  'tour/chitwan-national-park-safari/index.html': {
    hero: '../../images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg',
    photos: [
      '../../images/chitwan-jungle-safari.jpg',
      '../../images/chitwan-jungle-safari-02.jpg',
      '../../images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg',
      '../../images/explore-best-jungle-safari-packages-in-nepal-igloo-himalaya-treks.jpg'
    ]
  },
  'tour/kathmandu-cultural-heritage-tour/index.html': {
    hero: '../../images/cheap-treks-in-nepal-under-1000-kal-bhairab-temple-and-traditional-pagoda-temples-at-kathm.jpg',
    photos: [
      '../../images/city-tour.jpg',
      '../../images/babu-ram-pokharel-city-guide-in-nepal.jpg',
      '../../images/hindu-and-buddhist-religious-heritage-in-nepal.jpg',
      '../../images/dal-bhat-nepals-iconic-traditional-dish.jpg'
    ]
  },
  'tour/kathmandu-pokhara-chitwan-tour/index.html': {
    hero: '../../images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.jpg',
    photos: [
      '../../images/boat-5259878-1920.jpg',
      '../../images/city-tour.jpg',
      '../../images/chitwan-jungle-safari.jpg',
      '../../images/how-to-get-to-annapurna-flight-from-kathmandu-to-pokhara.jpg'
    ]
  },
  'tour/nagarkot-sunrise-bhaktapur-tour/index.html': {
    hero: '../../images/chisapani-nagarkot-trek.jpg',
    photos: [
      '../../images/chisapani-nagarkot-trek-02.jpg',
      '../../images/chisapani-nagarkot-trek-03.jpg',
      '../../images/chisapani-nagarkot-trek-04.jpg',
      '../../images/view-from-jamacho.webp'
    ]
  },
  'tour/nepal-luxury-helicopter-tour/index.html': {
    hero: '../../images/everest-base-camp-helicopter-tour.jpg',
    photos: [
      '../../images/everest-base-camp-heli-tour.jpg',
      '../../images/everest-base-camp-helicopter-tour-1-day-luxury-heli-tour.jpg',
      '../../images/annapurna-base-camp-trek-heli-return.jpg',
      '../../images/gokyo-lake-trek-helicopter-return.jpg'
    ]
  },
  'tour/pokhara-valley-nature-tour/index.html': {
    hero: '../../images/boat-5259878-1920.jpg',
    photos: [
      '../../images/how-to-get-to-annapurna-flight-from-kathmandu-to-pokhara.jpg',
      '../../images/annapurna-scenic-trek.jpg',
      '../../images/boat-5259878-1920.jpg',
      '../../images/view-from-jamacho-02.webp'
    ]
  }
};

for (const [tPath, tCfg] of Object.entries(tourConfigs)) {
  if (!fs.existsSync(tPath)) continue;
  let content = fs.readFileSync(tPath, 'utf8');
  let idx = 0;
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, () => {
    const chosen = tCfg.photos[idx % tCfg.photos.length];
    idx++;
    return chosen;
  });
  fs.writeFileSync(tPath, content, 'utf8');
  console.log(`Updated tour page: ${tPath}`);
}

// 4. Team member individual pages
const teamMemberImages = {
  'team/ang-tshering-sherpa.html': '../images/sonam-dorji-sherpa-climbing-guide-in-nepal.jpg',
  'team/pasang-nuru-sherpa.html': '../images/meet-the-igloo-himalayan-treks-expert-team.jpg',
  'team/pemba-sherpa.html': '../images/kamal-tamang-trekking-guide-in-nepal.jpg',
  'team/dawa-tenzing-sherpa.html': '../images/milan-tamang-trekking-guide-in-nepal.jpg',
  'team/lakpa-nuru-sherpa.html': '../images/sujan-tamang-trekking-guide-in-nepal.jpg',
  'team/mingma-sherpa.html': '../images/babu-ram-pokharel-city-guide-in-nepal.jpg'
};

for (const [mPath, mImg] of Object.entries(teamMemberImages)) {
  if (!fs.existsSync(mPath)) continue;
  let content = fs.readFileSync(mPath, 'utf8');
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^"')\s]+/g, mImg);
  fs.writeFileSync(mPath, content, 'utf8');
  console.log(`Updated team member: ${mPath}`);
}
