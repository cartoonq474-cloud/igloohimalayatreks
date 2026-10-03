const fs = require('fs');

const originalClean = JSON.parse(fs.readFileSync('scratch/original_cards_clean.json', 'utf8'));

// Build the full 60 cards array
const all60 = [...originalClean];

// Add the 3 extra cards
all60.push({
  index: 58,
  region: "peaks",
  duration: "medium",
  difficulty: "challenging",
  image: "../images/yala-peak-climbing.webp",
  alt: "Yala Peak Climbing Expedition in Langtang",
  badge: "Non-Technical Peak",
  title: "Yala Peak Climbing",
  desc: "Ideal first Himalayan summit climb (5,500m) in Langtang Valley with panoramic vistas of Shishapangma 8,013m.",
  days: "11 Days",
  altitude: "5,500 m",
  difficultyText: "Non-Technical Peak",
  price: "$1,390",
  link: "../trek/yala-peak-climbing/"
});

all60.push({
  index: 59,
  region: "manaslu",
  duration: "long",
  difficulty: "strenuous",
  image: "../images/manaslu-circuit-trek.webp",
  alt: "Manaslu Circuit with Tsum Valley Combined Trek",
  badge: "Grand Circuit",
  title: "Manaslu Circuit with Tsum Valley",
  desc: "Full 22-day grand journey combining sacred Tsum Valley monasteries with Mount Manaslu circumambulation.",
  days: "22 Days",
  altitude: "5,106 m",
  difficultyText: "Strenuous",
  price: "$1,850",
  link: "../trek/manaslu-circuit-with-tsum-valley-trek/"
});

all60.push({
  index: 60,
  region: "langtang",
  duration: "long",
  difficulty: "moderate",
  image: "../images/tamang-heritage-trail-and-langtang-valley-trek.webp",
  alt: "Tamang Heritage with Langtang Valley Trek",
  badge: "Culture & Glaciers",
  title: "Tamang Heritage with Langtang Valley",
  desc: "Comprehensive 14-day loop pairing warm Tibetan homestays in Gatlang with alpine heights of Kyanjin Gompa.",
  days: "14 Days",
  altitude: "3,870 m",
  difficultyText: "Moderate",
  price: "$1,050",
  link: "../trek/tamang-heritage-trail-with-langtang-valley-trek/"
});

console.log('Total cards in complete catalog:', all60.length);

// Generate badge gradient helper
function getBadgeGradient(badgeText, region) {
  const b = badgeText.toLowerCase();
  if (b.includes('luxury') || b.includes('vip')) return 'linear-gradient(135deg, #D97706, #B45309)';
  if (b.includes('heli') || b.includes('flyback')) return 'linear-gradient(135deg, #E05A47, #C84634)';
  if (b.includes('peak') || b.includes('alpine') || b.includes('climb')) return 'linear-gradient(135deg, #2563EB, #1D4ED8)';
  if (b.includes('restricted') || b.includes('forbidden') || b.includes('sanctuary')) return 'linear-gradient(135deg, #7C3AED, #5B21B6)';
  if (b.includes('overland') || b.includes('4wd') || b.includes('tea')) return 'linear-gradient(135deg, #EA580C, #C2410C)';
  if (b.includes('culture') || b.includes('festival') || b.includes('heritage')) return 'linear-gradient(135deg, #059669, #047857)';
  if (b.includes('lake') || b.includes('glacier') || b.includes('valley')) return 'linear-gradient(135deg, #0284C7, #0369A1)';
  if (b.includes('classic') || b.includes('world') || b.includes('himalayan')) return 'linear-gradient(135deg, #0E3458, #1A96C8)';
  return 'linear-gradient(135deg, #0E3458, #1A96C8)';
}

// Generate card HTML
function generateCardHtml(c, isRoot = false) {
  const rawPriceNum = parseInt(c.price.replace(/[^0-9]/g, ''), 10) || 990;
  const daysNumMatch = c.days.match(/([0-9]+)/);
  const rawDaysNum = daysNumMatch ? parseInt(daysNumMatch[1], 10) : 10;
  
  // Duration category
  let durationCat = 'medium';
  if (rawDaysNum <= 7) durationCat = 'short';
  else if (rawDaysNum >= 13) durationCat = 'long';

  // Difficulty category
  let diffCat = 'moderate';
  const dl = c.difficultyText.toLowerCase();
  if (dl.includes('easy')) diffCat = 'easy-moderate';
  else if (dl.includes('extreme') || dl.includes('strenuous')) diffCat = 'strenuous';
  else if (dl.includes('challeng') || dl.includes('technical')) diffCat = 'challenging';
  else diffCat = 'moderate';

  // Badge text
  let badgeText = c.badge || (c.region.charAt(0).toUpperCase() + c.region.slice(1) + ' Region');
  if (!badgeText || badgeText === 'badge') badgeText = 'Curated Trek';
  const badgeGradient = getBadgeGradient(badgeText, c.region);

  // Path resolution for root vs subfolder
  let imgPath = c.image;
  let linkPath = c.link;
  if (isRoot) {
    imgPath = imgPath.replace('../', '');
    linkPath = linkPath.replace('../', '');
  } else {
    if (!imgPath.startsWith('../')) imgPath = '../' + imgPath;
    if (!linkPath.startsWith('../')) linkPath = '../' + linkPath;
  }

  return `          <!-- Trek Card: ${c.title} -->
          <div class="card trek-item" 
               data-region="${c.region}" 
               data-duration="${durationCat}" 
               data-difficulty="${diffCat}" 
               data-price="${rawPriceNum}" 
               data-days="${rawDaysNum}" 
               data-title="${c.title.toLowerCase()}">
            <div class="trek-item-media">
              <img src="${imgPath}" alt="${c.alt || c.title}" loading="lazy" width="400" height="220">
              <span class="trek-badge-pill" style="background: ${badgeGradient};">${badgeText}</span>
              <span class="trek-duration-pill">⏱️ ${c.days}</span>
            </div>
            <div class="trek-item-body">
              <div class="trek-item-top">
                <h3 class="trek-item-title">${c.title}</h3>
                <p class="trek-item-desc">${c.desc}</p>
              </div>
              <div class="trek-item-meta">
                <span class="trek-meta-chip">⏱️ ${c.days}</span>
                <span class="trek-meta-chip">🏔️ ${c.altitude || 'High Altitude'}</span>
                <span class="trek-meta-chip">⚡ ${c.difficultyText}</span>
              </div>
              <div class="trek-item-footer">
                <div class="trek-price-wrap">
                  <span class="trek-price-label">Starting from</span>
                  <span class="trek-price-value">${c.price}</span>
                </div>
                <a href="${linkPath}" class="trek-action-btn">View Itinerary →</a>
              </div>
            </div>
          </div>`;
}

fs.writeFileSync('scratch/all60_cards.json', JSON.stringify(all60, null, 2));
console.log('Saved all 60 cards configuration to scratch/all60_cards.json');
