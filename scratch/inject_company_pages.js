const fs = require('fs');

const guideMap = {
  'Ang Tshering Sherpa - Founder': 'images/sonam-dorji-sherpa-climbing-guide-in-nepal.jpg',
  'Ang Tshering Sherpa': 'images/sonam-dorji-sherpa-climbing-guide-in-nepal.jpg',
  'Pasang Nuru Sherpa': 'images/meet-the-igloo-himalayan-treks-expert-team.jpg',
  'Pemba Sherpa': 'images/kamal-tamang-trekking-guide-in-nepal.jpg',
  'Pemba': 'images/kamal-tamang-trekking-guide-in-nepal.jpg',
  'Dawa Tenzing Sherpa': 'images/milan-tamang-trekking-guide-in-nepal.jpg',
  'Dawa Tenzing': 'images/milan-tamang-trekking-guide-in-nepal.jpg',
  'Dawa': 'images/milan-tamang-trekking-guide-in-nepal.jpg',
  'Lakpa Nuru Sherpa': 'images/sujan-tamang-trekking-guide-in-nepal.jpg',
  'Lakpa Nuru': 'images/sujan-tamang-trekking-guide-in-nepal.jpg',
  'Lakpa': 'images/sujan-tamang-trekking-guide-in-nepal.jpg',
  'Mingma Sherpa': 'images/babu-ram-pokharel-city-guide-in-nepal.jpg',
  'Mingma': 'images/babu-ram-pokharel-city-guide-in-nepal.jpg',
  'Tenzing Chhiri Sherpa': 'images/tom-wangdel-representative-of-the-germany-igloo-himalaya-treks.jpg',
  'Karma Sherpa': 'images/licensed-trekking-guide-leading-foreign-trekkers-on-a-himalayan-trail-in-nepal.jpg',
  'Nima Sherpa': 'images/elise-yuan-representative-of-the-usa-for-igloo-himalaya-treks.jpg',
  'Phurba Sherpa': 'images/licensed-trekking-guide-accompanying-a-foreign-trekker-in-the-nepal-himalayas.jpg',
  'Porter Team on Mountain Trail': 'images/a-trekker-and-a-porter-walking-along-the-everest-base-camp-trekking-trail-with-panoramic-v.jpg',
  'Himalayan Mountain Guide on Trail': 'images/licensed-trekking-guide-leading-foreign-trekkers-on-a-himalayan-trail-in-nepal.jpg',
  'Sarah M.': 'images/clients-home-1.jpg'
};

['about.html', 'team.html', 'reviews.html'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace background hero / section banners
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544735716-392fe2489ffa\?[^"')\s]+/g, 'images/hero-himalayas.jpg');

  for (const [name, imgPath] of Object.entries(guideMap)) {
    const regex1 = new RegExp(`(<img[^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'][^>]+alt=["']${name}["'])`, 'g');
    content = content.replace(regex1, `$1${imgPath}$2`);

    const regex2 = new RegExp(`(<img[^>]+alt=["']${name}["'][^>]+src=["'])https://images\\.unsplash\\.com/[^"']+([\"'])`, 'g');
    content = content.replace(regex2, `$1${imgPath}$2`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});
