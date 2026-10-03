const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const templatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const packages = [
  {
    slug: 'tamang-heritage-trail-with-langtang-valley-trek',
    title: 'Tamang Heritage Trail with Langtang Valley Trek (14 Days) — Igloo Himalaya Treks',
    metaDesc: 'Experience the 14-day Tamang Heritage Trail & Langtang Valley combination trek. Discover Tibetan-influenced villages, natural hot springs at Tatopani, Kyanjin Gompa, and climb Kyanjin Ri (4,773m).',
    canonical: 'https://igloohimalayatreks.com/trek/tamang-heritage-trail-with-langtang-valley-trek/',
    heroTitle: 'Tamang Heritage Trail with Langtang Valley Trek',
    heroSubtitle: 'A 14-day cultural and high-alpine journey combining Tibetan-influenced homestays of Gatlang and Tatopani with the snow-capped amphitheater of Langtang Valley and Kyanjin Gompa.',
    heroImage: '../../images/tamang-heritage-trail-and-langtang-valley-trek.webp',
    days: '14',
    maxAlt: '4,773 m',
    difficulty: 'Moderate',
    price: '990',
    region: 'Langtang Region',
    overview: `The <strong>Tamang Heritage Trail with Langtang Valley Trek</strong> is one of Nepal's most rewarding combined journeys, uniting rich indigenous culture with dramatic glacial alpine scenery in 14 unforgettable days. Located just north of Kathmandu near the Tibetan border, this route begins along the ancient trading paths of the Tamang people—descendants of Tibetan cavalrymen who settled the high valleys centuries ago.<br><br>
Your journey commences in the picturesque village of Gatlang, renowned for its carved wooden houses and women in traditional Tibetan dress, before leading to natural mineral hot springs at Tatopani. Crossing high ridges via the panoramic viewpoint of Nagthali (3,165m), you are treated to breathtaking vistas of the Ganesh Himal, Langtang Lirung, and peaks in Tibet. After experiencing genuine hospitality at community homestays in Thuman and Briddhim, the trail traverses above the Langtang Khola via Sherpagaon to merge directly into the upper Langtang Valley.<br><br>
From Lama Hotel, ascend through enchanting bamboo and rhododendron forests to the reconstructed settlement of Langtang Village and onwards to the iconic Kyanjin Gompa (3,870m). Surrounded by towering 6,000m and 7,000m giants, you'll summit Kyanjin Ri (4,773m) or Tserko Ri (4,984m) for a 360-degree Himalayan panorama before descending to Thulo Syabru and Dhunche.`,
    highlights: [
      'Authentic homestay hospitality in Gatlang, Tatopani, Thuman, and Briddhim villages',
      'Relaxation in the natural curative thermal hot springs of Tatopani (2,607m)',
      'Magnificent 360-degree viewpoint from Nagthali Danda (3,165m) facing Ganesh Himal & Langtang ranges',
      'Scenic high trail via Sherpagaon directly into the heart of upper Langtang Valley',
      'Exploration of historic Kyanjin Gompa (3,870m) and the century-old Swiss yak cheese factory',
      'Spectacular sunrise summit hike to Kyanjin Ri (4,773m) or Tserko Ri (4,984m)',
      'Rich biodiversity within Langtang National Park including red pandas, musk deer, and Himalayan monals',
      'Convenient road-based overland access from Kathmandu without domestic flight cancellations'
    ],
    itinerary: [
      { day: 1, title: 'Scenic Drive from Kathmandu to Syabrubesi (1,460m)', alt: '1,460m', time: '7-8 hrs drive', desc: 'Depart Kathmandu early in a private 4WD jeep or tourist bus, following the Trishuli River highway with terraced hills and distant glimpses of Ganesh Himal. Arrive at Syabrubesi, the bustling gateway town of the Langtang region.' },
      { day: 2, title: 'Trek from Syabrubesi to Gatlang (2,238m) via Goljung', alt: '2,238m', time: '5 hrs', desc: 'Begin walking along an ascending trail past terraced fields to Goljung village, offering fantastic views of Ganesh Himal. Continue uphill to Gatlang, a traditional Tamang village famous for stone-walled houses and the serene Parvati Kunda lake.' },
      { day: 3, title: 'Trek from Gatlang to Tatopani (2,607m)', alt: '2,607m', time: '5-6 hrs', desc: 'Descend through forested slopes to the river at Thambuchet before a gradual climb through pine and rhododendron woods to Tatopani. Spend the afternoon soaking your muscles in the natural hillside hot mineral springs.' },
      { day: 4, title: 'Trek to Thuman (2,338m) via Nagthali Viewpoint (3,165m)', alt: '3,165m / 2,338m', time: '5-6 hrs', desc: 'Climb steeply through dense alpine forest to the open grassy meadows of Nagthali Danda (3,165m), an extraordinary vantage point overlooking Ganesh Himal, Langtang Lirung, and Kerung in Tibet. Descend to the Tibetan-influenced village of Thuman.' },
      { day: 5, title: 'Trek from Thuman to Briddhim (2,229m)', alt: '2,229m', time: '5 hrs', desc: 'Follow the contour trail above the Bhote Koshi valley, crossing suspension bridges and passing historic mani walls. Reach Briddhim, a community homestay village where locals welcome you with traditional songs, butter tea, and home-cooked meals.' },
      { day: 6, title: 'Trek from Briddhim to Lama Hotel (2,470m) via Sherpagaon', alt: '2,470m', time: '6 hrs', desc: 'Leave the cultural heritage circuit and climb along the high scenic trail through Sherpagaon, offering sweeping views of the valley. Descend gently through dense bamboo and oak forests to join the main Langtang route at Lama Hotel.' },
      { day: 7, title: 'Trek from Lama Hotel to Langtang Village / Mundu (3,430m)', alt: '3,430m', time: '5-6 hrs', desc: 'Climb through river gorges and blooming rhododendrons to Ghodatabela where the valley suddenly broadens. Pass prayer wheels and rebuilt stone tea houses to reach the resilient and inspiring community of Langtang Village.' },
      { day: 8, title: 'Trek from Langtang Village to Kyanjin Gompa (3,870m)', alt: '3,870m', time: '3-4 hrs', desc: 'A gentle morning ascent past ancient mani walls and yak pastures brings you into the magnificent amphitheater of Kyanjin Gompa. Sample freshly produced artisan yak cheese and visit the sacred 300-year-old monastery.' },
      { day: 9, title: 'Climb Kyanjin Ri (4,773m) or Tserko Ri (4,984m) & Glacier Exploration', alt: '4,773m / 4,984m', time: '5-7 hrs', desc: 'Early morning summit hike up Kyanjin Ri or the higher Tserko Ri. Marvel at panoramic vistas of Langtang Lirung (7,227m), Yala Peak, Dorje Lakpa, and Langshisha Ri. Return to Kyanjin Gompa for an afternoon of rest.' },
      { day: 10, title: 'Trek from Kyanjin Gompa downhill to Lama Hotel (2,470m)', alt: '2,470m', time: '6-7 hrs', desc: 'Retrace your steps down the glacial valley, enjoying rapid downhill progress with changing mountain views. Drop down through the tree line back to Lama Hotel for a cozy evening.' },
      { day: 11, title: 'Trek from Lama Hotel to Thulo Syabru (2,210m)', alt: '2,210m', time: '5 hrs', desc: 'Descend to Bamboo and cross the Langtang Khola. Take the upper ridge trail climbing up to the scenic village of Thulo Syabru, beautifully perched on a ridge with views of Ganesh Himal and Tibetan peaks.' },
      { day: 12, title: 'Trek from Thulo Syabru to Dhunche (1,960m)', alt: '1,960m', time: '5 hrs', desc: 'Traverse pleasant forest paths and terraced farmland, crossing mineral streams and passing small rural settlements to reach Dhunche, the administrative headquarters of Rasuwa district.' },
      { day: 13, title: 'Drive from Dhunche back to Kathmandu (1,400m)', alt: '1,400m', time: '6-7 hrs drive', desc: 'Board private transportation for the scenic downhill drive through mountain roads back to Kathmandu. Check in to your hotel and join Igloo Himalaya Treks for a celebratory farewell dinner.' },
      { day: 14, title: 'Final International Departure from Kathmandu', alt: '1,400m', time: 'Transfer', desc: 'Transfer to Tribhuvan International Airport for your return flight home, taking lifetime memories of the culture and mountains of Langtang.' }
    ]
  },
  {
    slug: 'yala-peak-climbing',
    title: 'Yala Peak Climbing (5,500m / 11 Days) — Igloo Himalaya Treks',
    metaDesc: 'Summit Yala Peak (5,500m) in Langtang, Nepal. The ideal beginner-friendly 11-day mountaineering expedition featuring Kyanjin Gompa, high camp training, and views of Shishapangma (8,027m).',
    canonical: 'https://igloohimalayatreks.com/trek/yala-peak-climbing/',
    heroTitle: 'Yala Peak Climbing (5,500m)',
    heroSubtitle: 'Nepal’s premier non-technical introductory 5,500m trekking peak in Langtang Valley, offering awe-inspiring panoramas of Langtang Lirung, Dorje Lakpa, and 8,000m Shishapangma.',
    heroImage: '../../images/yala-peak-climbing.webp',
    days: '11',
    maxAlt: '5,500 m',
    difficulty: 'Strenuous / Alpine Climb',
    price: '1290',
    region: 'Langtang & Peak Climbing',
    overview: `<strong>Yala Peak (5,500m / 18,045 ft)</strong> is universally recognized as Nepal’s most accessible and visually rewarding introductory mountaineering summit. Located in the upper Langtang Valley right near the Tibetan border, Yala Peak is an NMA Category B trekking peak requiring no prior technical ice or rock climbing experience—making it the perfect first summit for ambitious trekkers seeking a true Himalayan mountaineering accomplishment.<br><br>
The expedition begins with an overland drive to Syabrubesi, followed by a picturesque trek through the lush forests and Sherpa-Tamang settlements of Lama Hotel and Langtang Village. Arriving at the iconic mountain sanctuary of Kyanjin Gompa (3,870m), climbers undergo vital acclimatization hikes to Kyanjin Ri (4,773m) and receive comprehensive equipment training from our UIAGM / NNMGA certified climbing Sherpa guides.<br><br>
From Kyanjin Gompa, establish Yala Peak Base Camp (4,600m) and push to High Camp (4,800m). On summit morning, an alpine alpine start leads up snow and scree slopes to the 5,500m summit ridge. Standing atop Yala Peak rewards you with an unmatched 360-degree panorama: the colossal south face of Langtang Lirung (7,227m), Dorje Lakpa (6,966m), Gangchempo, Naya Kanga, and Shishapangma (8,027m)—the 14th highest mountain in the world situated just across the border in Tibet.`,
    highlights: [
      'Summit a genuine 5,500m Himalayan peak with certified high-altitude Sherpa guides',
      'Non-technical summit climb ideal for first-time mountaineers and fit trekkers',
      'Spectacular views of 8,000m Shishapangma (8,027m in Tibet) and Langtang Lirung (7,227m)',
      'Full mountaineering training: crampons, ice axe technique, and fixed-rope management included',
      'Scenic trek through Langtang National Park and historic Kyanjin Gompa (3,870m)',
      'Camping experience at Yala Peak High Camp (4,800m) under pristine starry Himalayan skies',
      'All climbing equipment, summit permits, kitchen crew, and safety oxygen fully arranged',
      'Overland journey from Kathmandu without domestic flight weather delays'
    ],
    itinerary: [
      { day: 1, title: 'Drive from Kathmandu to Syabrubesi (1,460m)', alt: '1,460m', time: '7-8 hrs drive', desc: 'Meet your climbing Sherpa guide and depart Kathmandu by private 4WD jeep. Drive through picturesque foothill valleys, terraced riversides, and Dhunche to Syabrubesi.' },
      { day: 2, title: 'Trek from Syabrubesi to Lama Hotel (2,470m)', alt: '2,470m', time: '5-6 hrs', desc: 'Cross the Bhote Koshi and trek along the Langtang Khola through dense oak and rhododendron forests. Watch for monkeys and birdlife before settling into Lama Hotel.' },
      { day: 3, title: 'Trek from Lama Hotel to Langtang Village / Mundu (3,430m)', alt: '3,430m', time: '5-6 hrs', desc: 'Ascend through Ghodatabela where the dramatic glacial gorge opens into an expansive valley. Reach the newly built community of Langtang Village under towering granite cliffs.' },
      { day: 4, title: 'Trek from Langtang Village to Kyanjin Gompa (3,870m)', alt: '3,870m', time: '3-4 hrs', desc: 'A short, acclimatization-friendly ascent across wide yak meadows to Kyanjin Gompa. Explore the 300-year-old monastery and taste artisan Swiss-engineered yak cheese.' },
      { day: 5, title: 'Acclimatization Hike to Kyanjin Ri (4,773m) & Climbing Gear Check', alt: '4,773m', time: '4-5 hrs', desc: 'Climb Kyanjin Ri for vital acclimatization and panoramic photos. In the afternoon, your climbing guide conducts a hands-on equipment check and knot/crampon refresher session.' },
      { day: 6, title: 'Trek from Kyanjin Gompa to Yala Peak Base Camp (4,600m)', alt: '4,600m', time: '4-5 hrs', desc: 'Leave teahouses behind and trek with porters and kitchen crew up the rocky moraine slopes towards Yala Peak Base Camp. Set up high mountain alpine tents.' },
      { day: 7, title: 'Ascend to Yala Peak High Camp (4,800m) & Pre-Summit Prep', alt: '4,800m', time: '3 hrs', desc: 'A steady climb brings the team to High Camp. Practice basic rope-travel and crampon footing on the glacier apron. Early dinner and sleep in preparation for the midnight push.' },
      { day: 8, title: 'Summit Day: Yala Peak (5,500m) & Return to Kyanjin Gompa (3,870m)', alt: '5,500m', time: '8-9 hrs', desc: 'Alpine start at 3:00 AM. Ascend moderate snow slopes and the rocky summit ridge to stand on Yala Peak (5,500m) at sunrise! Relish views of Shishapangma, Dorje Lakpa, and Langtang Lirung. Descend safely past High Camp to Kyanjin Gompa for a hearty celebration.' },
      { day: 9, title: 'Contingency Weather Day / Trek from Kyanjin Gompa to Lama Hotel (2,470m)', alt: '2,470m', time: '6 hrs', desc: 'Used as a buffer day in case of inclement summit weather, or begin the scenic descent through Langtang Village back to Lama Hotel.' },
      { day: 10, title: 'Trek from Lama Hotel to Syabrubesi (1,460m)', alt: '1,460m', time: '4-5 hrs', desc: 'Enjoy the final gentle downhill walk alongside the rushing river, passing bamboo groves and suspension bridges to arrive back in Syabrubesi.' },
      { day: 11, title: 'Drive from Syabrubesi back to Kathmandu (1,400m)', alt: '1,400m', time: '7 hrs drive', desc: 'Private transfer back to Kathmandu. Evening celebration dinner and awarding of your official Yala Peak summit certificates.' }
    ]
  },
  {
    slug: 'langtang-gosaikunda-helambu-trek',
    title: 'Langtang Gosaikunda Helambu Trek (16 Days) — Igloo Himalaya Treks',
    metaDesc: 'Embark on the 16-day Langtang Gosaikunda Helambu grand traverse. Explore Langtang Valley, climb Kyanjin Ri, visit sacred Gosaikunda Lake (4,380m), cross Laurebina Pass (4,610m), and trek through Hyolmo villages to Sundarijal.',
    canonical: 'https://igloohimalayatreks.com/trek/langtang-gosaikunda-helambu-trek/',
    heroTitle: 'Langtang Gosaikunda Helambu Trek',
    heroSubtitle: 'The ultimate 16-day grand traverse linking glacial Langtang Valley, holy alpine lakes of Gosaikunda, high Laurebina La pass (4,610m), and the tranquil Hyolmo cultural villages of Helambu.',
    heroImage: '../../images/langtang-gosaikunda-helambu-trek.webp',
    days: '16',
    maxAlt: '4,610 m',
    difficulty: 'Strenuous / Alpine Circuit',
    price: '1190',
    region: 'Langtang & Helambu',
    overview: `The <strong>Langtang Gosaikunda Helambu Trek (16 Days)</strong> is Nepal’s premier continuous Himalayan loop—a legendary journey connecting three spectacular regions north of Kathmandu without ever backtracking. Known as the "Grand Traverse of Central Nepal," this expedition transitions seamlessly from the deep pine-scented river canyons of Langtang to the windswept sacred alpine lakes of Gosaikunda, over a dramatic 4,610m mountain pass, and down through the untouched Buddhist villages of Helambu directly back to the Kathmandu Valley rim.<br><br>
Your trek begins in Syabrubesi, following the roaring Langtang Khola up to the historic Sherpa sanctuary of Kyanjin Gompa (3,870m). Here, surrounded by colossal hanging glaciers, you'll climb Kyanjin Ri (4,773m) for views extending to Tibet. Retracing downward to Thulo Syabru, the trail ascends steeply through pristine rhododendron and pine forests to Shin Gompa—home to famous artisan yak cheese—and upwards to the holy lake of Gosaikunda (4,380m), sacred to both Hindus and Buddhists.<br><br>
The climax of the route is crossing the breathtaking Laurebina La Pass (4,610m / 15,125 ft), with panoramic views of Manaslu, Ganesh Himal, and Langtang. Descending into the remote and tranquil Helambu region, you walk through charming Hyolmo villages like Tharepati, Kutumsang, and Chisapani before stepping out at Sundarijal and returning to Kathmandu.`,
    highlights: [
      'Complete 16-day continuous loop through Langtang Valley, Gosaikunda, and Helambu without backtracking',
      'Stand at the sacred alpine pilgrimage lakes of Gosaikunda (4,380m), Bhairav Kunda, and Saraswati Kunda',
      'Cross the challenging and panoramic Laurebina La Pass (4,610m / 15,125 ft)',
      'Sunrise climb of Kyanjin Ri (4,773m) facing Langtang Lirung, Dorje Lakpa, and Langshisha Ri',
      'Immersive cultural encounters with Tamang, Tibetan, and Hyolmo indigenous communities',
      'Visit historic Tibetan Buddhist monasteries and local yak cheese production factories in Kyanjin and Shin Gompa',
      'Hike through diverse ecological zones from subtropical river valleys to alpine tundra and bamboo forests',
      'Direct walking finish at Sundarijal on the rim of the Kathmandu Valley'
    ],
    itinerary: [
      { day: 1, title: 'Drive from Kathmandu to Syabrubesi (1,460m)', alt: '1,460m', time: '7-8 hrs drive', desc: 'Scenic morning drive by private jeep or bus along the Trishuli River highway, passing bustling market towns and terraced hills to reach Syabrubesi.' },
      { day: 2, title: 'Trek from Syabrubesi to Lama Hotel (2,470m)', alt: '2,470m', time: '5-6 hrs', desc: 'Cross the Bhote Koshi suspension bridge and ascend through subtropical forest and bamboo thickets alongside the churning Langtang Khola.' },
      { day: 3, title: 'Trek from Lama Hotel to Langtang Village (3,430m)', alt: '3,430m', time: '5-6 hrs', desc: 'Climb through river gorges to Ghodatabela where the valley suddenly broadens into wide pastures. Pass prayer flags and rebuilt tea houses to Langtang Village.' },
      { day: 4, title: 'Trek from Langtang Village to Kyanjin Gompa (3,870m)', alt: '3,870m', time: '3-4 hrs', desc: 'A gentle morning ascent past ancient mani walls and grazing yaks into the majestic alpine amphitheater of Kyanjin Gompa. Visit the local monastery and cheese dairy.' },
      { day: 5, title: 'Summit Hike to Kyanjin Ri (4,773m) & Glacier Exploration', alt: '4,773m', time: '5-6 hrs', desc: 'Early morning hike up Kyanjin Ri for panoramic views of Langtang Lirung, Yala Peak, and Changbu. Afternoon rest in Kyanjin Gompa.' },
      { day: 6, title: 'Trek from Kyanjin Gompa downhill to Lama Hotel (2,470m)', alt: '2,470m', time: '6 hrs', desc: 'Retrace your steps down the glacial valley, dropping through the forest canopy back to Lama Hotel.' },
      { day: 7, title: 'Trek from Lama Hotel to Thulo Syabru (2,210m)', alt: '2,210m', time: '5 hrs', desc: 'Descend to Bamboo, cross the river, and climb the scenic ridge trail to the charming Tamang village of Thulo Syabru perched atop a ridge.' },
      { day: 8, title: 'Trek from Thulo Syabru to Shin Gompa / Chandan Bari (3,330m)', alt: '3,330m', time: '4-5 hrs', desc: 'Ascend steeply through dense forests of hemlock, oak, and rhododendron to Shin Gompa. Tour the historic monastery and taste legendary local yak cheese.' },
      { day: 9, title: 'Trek to Sacred Gosaikunda Lake (4,380m) via Laurebina (3,910m)', alt: '4,380m', time: '5-6 hrs', desc: 'Climb past the tree line to Laurebina viewpoint for jaw-dropping vistas of Ganesh Himal and Annapurna. Cross the ridge into the sacred cirque of Gosaikunda Lake.' },
      { day: 10, title: 'Cross Laurebina Pass (4,610m) & Trek to Ghopte (3,430m)', alt: '4,610m', time: '6-7 hrs', desc: 'Hike past Saraswati and Bhairav Kunda to ascend Laurebina La (4,610m). Take in vast views before descending rough rocky trails into the Helambu region at Ghopte.' },
      { day: 11, title: 'Trek from Ghopte to Kutumsang (2,470m) via Tharepati (3,690m)', alt: '2,470m', time: '6 hrs', desc: 'Ascend to Tharepati ridge for expansive morning views. Follow the scenic ridge trail through rhododendron forests down into the peaceful village of Kutumsang.' },
      { day: 12, title: 'Trek from Kutumsang to Chisapani (2,165m)', alt: '2,165m', time: '6 hrs', desc: 'Hike across gentle ridges through Golphu Bhanjyang and Pati Bhanjyang. Arrive at Chisapani, a famous hill station offering stunning sunset views across the central Himalayas.' },
      { day: 13, title: 'Trek from Chisapani to Sundarijal (1,460m) & Drive to Kathmandu (1,400m)', alt: '1,460m', time: '4 hrs trek + 1 hr drive', desc: 'Trek through the dense oak and pine forests of Shivapuri National Park to the water reservoirs of Sundarijal. Meet private transport and drive back to your hotel in Kathmandu.' },
      { day: 14, title: 'Kathmandu Valley Cultural Heritage Exploration', alt: '1,400m', time: 'Full day', desc: 'Guided cultural tour of UNESCO World Heritage Sites including Swayambhunath (Monkey Temple), Pashupatinath, and Boudhanath Stupa.' },
      { day: 15, title: 'Buffer / Contingency Day in Kathmandu & Farewell Dinner', alt: '1,400m', time: 'Leisure', desc: 'Free day for shopping in Thamel or relaxing. In the evening, join Igloo Himalaya Treks for a celebration dinner.' },
      { day: 16, title: 'Final Departure from Kathmandu', alt: '1,400m', time: 'Transfer', desc: 'Transfer to Tribhuvan International Airport for your flight home, concluding the grand Langtang-Gosaikunda-Helambu traverse.' }
    ]
  }
];

function buildPackage(pkg) {
  let html = templateHtml;

  // 1. Meta / Head
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${pkg.title}</title>`);
  html = html.replace(/<meta name="description"[\s\S]*?>/, `<meta name="description" content="${pkg.metaDesc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${pkg.canonical}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${pkg.canonical}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${pkg.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${pkg.metaDesc}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/${path.basename(pkg.heroImage)}">`);

  // 2. Hero Section
  html = html.replace(/<h1 class="hero-title"[\s\S]*?<\/h1>/, `<h1 class="hero-title">${pkg.heroTitle}</h1>`);
  html = html.replace(/<p class="hero-subtitle"[\s\S]*?<\/p>/, `<p class="hero-subtitle">${pkg.heroSubtitle}</p>`);
  html = html.replace(/<span class="pill pill-copper"[^>]*>[\s\S]*?<\/span>/, `<span class="pill pill-copper">${pkg.region} • Authentic Himalayan Adventure</span>`);
  
  // Hero Background
  html = html.replace(/background: linear-gradient\(rgba\(8, 33, 56, 0.65\), rgba\(8, 33, 56, 0.8\)\), url\('[^']*'\)/g,
    `background: linear-gradient(rgba(8, 33, 56, 0.65), rgba(8, 33, 56, 0.8)), url('${pkg.heroImage}')`
  );

  // 3. Quick Stats / Specs
  html = html.replace(/<span class="spec-value">14 Days<\/span>/g, `<span class="spec-value">${pkg.days} Days</span>`);
  html = html.replace(/<span class="spec-value">5,364m \/ 5,545m<\/span>/g, `<span class="spec-value">${pkg.maxAlt}</span>`);
  html = html.replace(/<span class="spec-value">Challenging<\/span>/g, `<span class="spec-value">${pkg.difficulty}</span>`);
  html = html.replace(/\$1,399/g, `$${pkg.price}`);
  html = html.replace(/data-trek-price="1399"/g, `data-trek-price="${pkg.price}"`);
  html = html.replace(/data-trek-title="Everest Base Camp Trek"/g, `data-trek-title="${pkg.heroTitle}"`);

  // 4. Breadcrumb
  html = html.replace(
    /<span class="breadcrumb-current">[^<]*<\/span>/,
    `<span class="breadcrumb-current">${pkg.heroTitle}</span>`
  );

  // 5. Overview content
  html = html.replace(
    /<div class="overview-body"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<!-- Trek Highlights -->/,
    `<div class="overview-body">\n<p style="font-size: 1.05rem; line-height: 1.8; color: var(--color-neutral-700); margin-bottom: 20px;">${pkg.overview}</p>\n</div>\n</div>\n<!-- Trek Highlights -->`
  );

  // 6. Highlights
  const highlightsHtml = pkg.highlights.map(h => `
    <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;">
      <span style="color: var(--color-copper-orange); font-size: 1.2rem; line-height: 1;">✓</span>
      <span style="color: var(--color-neutral-700); font-size: 0.98rem; line-height: 1.5;">${h}</span>
    </div>`).join('\n');

  html = html.replace(
    /<div class="highlights-grid"[\s\S]*?<\/div>\s*<\/section>\s*<!-- Itinerary Section -->/,
    `<div class="highlights-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-top: 20px;">
${highlightsHtml}
    </div>
  </div>
</section>
<!-- Itinerary Section -->`
  );

  // 7. Daily Itinerary
  const itineraryHtml = pkg.itinerary.map(item => `
    <div class="itinerary-day-card" style="background: white; border: 1px solid var(--color-neutral-200); border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid var(--color-neutral-100); padding-bottom: 10px;">
        <h3 style="font-size: 1.2rem; color: var(--color-primary-navy); margin: 0; font-weight: 700;">
          <span style="color: var(--color-copper-orange); margin-right: 6px;">Day ${item.day}:</span> ${item.title}
        </h3>
        <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--color-neutral-600); font-weight: 600;">
          <span>🏔️ ${item.alt}</span>
          <span>⏱️ ${item.time}</span>
        </div>
      </div>
      <p style="color: var(--color-neutral-700); font-size: 0.95rem; line-height: 1.7; margin: 0;">${item.desc}</p>
    </div>`).join('\n');

  html = html.replace(
    /<div class="itinerary-timeline"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- Map Section -->/,
    `<div class="itinerary-timeline">
${itineraryHtml}
    </div>
  </div>
</section>
<!-- Map Section -->`
  );

  // 8. Schema.org TouristTrip update
  const schemaSubtrips = pkg.itinerary.map(item => `          { "@type": "TouristTrip", "name": "Day ${item.day}: ${item.title.replace(/"/g, '\\"')}" }`).join(',\n');
  html = html.replace(
    /"@type": "TouristTrip",\s*"@id": "[^"]*",\s*"name": "[^"]*",\s*"description": "[^"]*",\s*"touristType": \[[^\]]*\],\s*"subTrip": \[[^\]]*\]/,
    `"@type": "TouristTrip",
        "@id": "${pkg.canonical}#trip",
        "name": "${pkg.heroTitle}",
        "description": "${pkg.metaDesc.replace(/"/g, '\\"')}",
        "touristType": ["Hikers", "Trekking Enthusiasts", "Mountaineers"],
        "subTrip": [
${schemaSubtrips}
        ]`
  );

  // Write output
  const targetDir = path.join(ROOT, 'trek', pkg.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`Generated: trek/${pkg.slug}/index.html`);
}

// Generate the 3 packages
packages.forEach(buildPackage);

// Generate 1 Redirect Stub for alias: trek/tamang-heritage-trail-langtang-valley
const aliasStubDir = path.join(ROOT, 'trek', 'tamang-heritage-trail-langtang-valley');
fs.mkdirSync(aliasStubDir, { recursive: true });
const stubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/trek/tamang-heritage-trail-with-langtang-valley-trek/">
  <link rel="canonical" href="https://igloohimalayatreks.com/trek/tamang-heritage-trail-with-langtang-valley-trek/" />
  <title>Redirecting to Tamang Heritage Trail with Langtang Valley Trek...</title>
  <script>window.location.replace("/trek/tamang-heritage-trail-with-langtang-valley-trek/");</script>
</head>
<body>
  <p>Redirecting to <a href="/trek/tamang-heritage-trail-with-langtang-valley-trek/">Tamang Heritage Trail with Langtang Valley Trek</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(aliasStubDir, 'index.html'), stubHtml, 'utf8');
console.log('Generated redirect stub: trek/tamang-heritage-trail-langtang-valley/index.html');
