// Master Authentic Data for Mustang & Dolpo Packages (6 packages)

const mustangDolpoPackages = [
  // 1. Upper Mustang Trek (14 Days)
  {
    slug: 'upper-mustang-trek',
    title: 'Upper Mustang Trek (14 Days) — Kingdom of Lo — Igloo Himalaya Treks',
    seoTitle: 'Upper Mustang Trek (14 Days)',
    metaDesc: 'Journey to the ancient walled city of Lo Manthang on the 14-day Upper Mustang Trek. Explore Tibetan Buddhist monasteries, 2,500-year-old sky caves, and dramatic red canyons.',
    canonical: 'https://igloohimalayatreks.com/trek/upper-mustang-trek/',
    duration: '14 days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '3,840 m (12,598 ft)',
    maxAltNum: 3840,
    price: '1,650',
    activity: 'Restricted Cultural & Desert Trekking',
    accommodation: 'Traditional Tibetan Heritage Teahouses',
    transport: 'Domestic Flights (Pokhara–Jomsom) & Private 4WD Support',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Mar-Nov (Best in Summer Monsoon - Rain Shadow)',
    trekStarts: 'Jomsom / Kagbeni',
    trekEnds: 'Jomsom / Pokhara',
    region: 'Mustang (Restricted Area)',
    heroBadge: 'Mustang Region • The Forbidden Walled Kingdom of Lo',
    leadText: 'The 14-day Upper Mustang Trek takes you back in time into the ancient Kingdom of Lo, a mystical trans-Himalayan realm hidden behind the Annapurna and Dhaulagiri massifs. Walk through windswept arid canyons, sculptured red cliff faces, 2,500-year-old cliffside sky caves, and 15th-century Tibetan Buddhist monasteries before entering the fortified medieval capital of Lo Manthang.',
    highlights: [
      'Explore the medieval walled capital of Lo Manthang (3,840m) and the King’s Royal Palace',
      'Discover ancient multi-story Jhong Sky Caves of Chhoser carved into vertical sandstone cliffs',
      'Visit 15th-century Tibetan Buddhist gompas: Jampa, Thubchen, and Chode monasteries',
      'Hike past Nepal’s longest sacred mani wall (over 300 meters) in Ghami village',
      'Visit 8th-century Ghar Gompa in Gyakar, built by Guru Rinpoche (Padmasambhava)',
      'Trek inside the trans-Himalayan rain shadow with dry, clear sunny weather even during monsoon',
      'Spectacular flight through the Kali Gandaki canyon between Annapurna and Dhaulagiri',
      'Immerse in pure Tibetan Loba culture, dress, cuisine, and horse-riding traditions'
    ],
    gallery: [
      'upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp',
      'upper-mustang.webp',
      'upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp',
      'upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp',
      'upper-mustang-trek-cost-and-itinerary.webp'
    ],
    itinerary: [
      { day: 1, title: 'Scenic Flight or Drive Kathmandu to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '25 min flight / 6 hrs drive', dist: '200 km', meals: 'Breakfast (B)', desc: 'Arrive in scenic Pokhara, gateway to the Annapurna and Mustang regions. Stroll around Phewa Lake with stunning reflection views of Mount Machhapuchhre (Fishtail).' },
      { day: 2, title: 'Morning Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni (2,810m)', dest: 'Kagbeni', altM: 2810, duration: '20 min flight + 3.5 hrs walk', dist: '10.5 km', meals: 'B, L, D', desc: 'Thrilling flight through the world’s deepest gorge between Annapurna and Dhaulagiri to Jomsom. Trek along the breezy Kali Gandaki riverbed to medieval Kagbeni, official entry checkpoint for Upper Mustang.' },
      { day: 3, title: 'Trek Kagbeni to Chele (3,050m) via Tangbe & Chhusang', dest: 'Chele', altM: 3050, duration: '5-6 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Enter the restricted kingdom along the east bank of the Kali Gandaki. Pass Tangbe’s whitewashed stone houses and Chhusang’s crimson sandstone cliffs before crossing a footbridge to Chele perched on a high ridge.' },
      { day: 4, title: 'Trek Chele to Syangboche (3,800m) crossing Taklam La & Dajori La', dest: 'Syangboche', altM: 3800, duration: '6-7 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Climb steeply through rocky canyons across Taklam La (3,624m) and Dajori La (3,735m) with sweeping views of Tilicho Peak and Damodar Danda. Pass the sacred Chungsi Cave monastery before reaching Syangboche.' },
      { day: 5, title: 'Trek Syangboche to Ghami (3,520m) across Nyi La Pass (4,010m)', dest: 'Ghami', altM: 3520, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Traverse Yamada La (3,850m) and climb to Nyi La Pass (4,010m), the highest pass before Lo Manthang. Descend into the sheltered, fertile valley of Ghami surrounded by lush green barley fields and apple trees.' },
      { day: 6, title: 'Trek Ghami to Charang (Tsarang, 3,560m) past Nepal’s Longest Mani Wall', dest: 'Charang', altM: 3560, duration: '5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Pass Nepal’s longest sacred mani wall (over 300 meters) and cross the Choya La Pass (3,870m). Enter the ancient town of Charang, dominated by a huge five-story white dzong (palace) and red monastery.' },
      { day: 7, title: 'Trek Charang to the Ancient Walled City of Lo Manthang (3,840m)', dest: 'Lo Manthang', altM: 3840, duration: '4-5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Ascend gradually through the arid desert landscape to the crest of Lo La Pass (3,950m), where you catch your first breathtaking view of the walled city of Lo Manthang standing solitary on the windswept plateau.' },
      { day: 8, title: 'Exploration of Lo Manthang, Royal Palace & Chhoser Sky Caves', dest: 'Lo Manthang', altM: 3840, duration: 'Full day exploration', dist: '8 km', meals: 'B, L, D', desc: 'Visit the three major 15th-century monasteries: Jampa Gompa, Thubchen Gompa, and Chode Gompa. Take a short horse or jeep trip to the 2,500-year-old multi-story Jhong Sky Caves of Chhoser carved into vertical sandstone bluffs.' },
      { day: 9, title: 'Trek Lo Manthang to Drakmar (3,820m) via Historic Ghar Gompa', dest: 'Drakmar', altM: 3820, duration: '6-7 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Take the scenic western return trail across Chogo La (4,230m) to visit Ghar Gompa (built in the 8th century by Guru Rinpoche). Continue through dramatic crimson canyon cliffs to Drakmar village.' },
      { day: 10, title: 'Trek Drakmar to Shyangmochen (Syangboche, 3,800m)', dest: 'Shyangmochen', altM: 3800, duration: '5-6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Start early to avoid the afternoon desert wind. Trek through Ghami and Jaite village, taking in sweeping views of the Annapurna and Dhaulagiri mountain massifs.' },
      { day: 11, title: 'Trek Shyangmochen to Chhusang (2,980m)', dest: 'Chhusang', altM: 2980, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Descend past Chele and the dramatic rock formations over the Kali Gandaki River, returning to the lower warmer elevation and apple orchards of Chhusang.' },
      { day: 12, title: 'Trek Chhusang to Kagbeni & continue to Jomsom (2,720m)', dest: 'Jomsom', altM: 2720, duration: '5-6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Complete the restricted circuit at Kagbeni checkpoint and hike along the riverbed back to Jomsom. Enjoy a celebratory dinner with your guide and sample Marpha apple cider.' },
      { day: 13, title: 'Morning Flight Jomsom to Pokhara & Connecting Flight to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min + 25 min flights', dist: 'Flights', meals: 'B, D', desc: 'Take early morning flights from Jomsom to Pokhara and onward to Kathmandu. Relax at your hotel in Thamel and join our traditional farewell dinner.' },
      { day: 14, title: 'Final International Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to Tribhuvan International Airport for your international flight home.' }
    ],
    faqs: [
      { q: 'What permits are required for Upper Mustang and how much do they cost?', a: 'Upper Mustang is a restricted area requiring a Special Restricted Area Permit (RAP) issued by Nepal Immigration for $500 USD per person for the first 10 days, plus the Annapurna Conservation Area Project (ACAP) permit. A minimum of two registered trekkers accompanied by a licensed government guide is legally mandatory.' },
      { q: 'Can I trek in Upper Mustang during the summer monsoon season?', a: 'Yes! Upper Mustang is one of Nepal’s premier monsoon destinations. Situated entirely in the trans-Himalayan rain shadow of the Annapurna and Dhaulagiri ranges, it receives less than 300mm of annual precipitation, offering sunny, dry weather throughout June, July, and August.' },
      { q: 'What is the accommodation like in Upper Mustang?', a: 'You will stay in traditional Loba teahouses and boutique heritage lodges constructed from sun-dried mud bricks and carved wooden beams. Rooms are twin-sharing with clean bedding, and dining rooms serve organic buckwheat bread, momos, dal bhat, and hot tea.' }
    ]
  },

  // 2. Upper Mustang Jeep Tour (12 Days)
  {
    slug: 'upper-mustang-jeep-tour',
    title: 'Upper Mustang 4WD Overland Jeep Tour (12 Days) — Igloo Himalaya Treks',
    seoTitle: 'Upper Mustang 4WD Overland Jeep Tour (12 Days)',
    metaDesc: 'Explore the ancient Kingdom of Lo in comfort with our 12-day 4WD Toyota Land Cruiser tour. Reach Lo Manthang, Chhoser Sky Caves, and Muktinath without strenuous hiking.',
    canonical: 'https://igloohimalayatreks.com/trek/upper-mustang-jeep-tour/',
    duration: '12 days',
    difficulty: 'Easy to Moderate (Overland 4WD)',
    maxAlt: '3,840 m (12,598 ft)',
    maxAltNum: 3840,
    price: '1,990',
    activity: 'Overland 4WD Expedition',
    accommodation: 'Handpicked Heritage Lodges & Boutique Hotels',
    transport: 'Private 4WD Toyota Land Cruiser / Scorpio',
    meals: 'All Meals Included (B,L,D)',
    season: 'Mar-Nov (Optimal in Monsoon Rain Shadow)',
    trekStarts: 'Pokhara / Jomsom',
    trekEnds: 'Pokhara / Kathmandu',
    region: 'Mustang (Restricted Area)',
    heroBadge: 'Mustang Region • Comfort 4WD Overland Trans-Himalayan Adventure',
    leadText: 'The 12-day Upper Mustang Jeep Tour is the ultimate luxury overland adventure into Nepal’s last forbidden Himalayan kingdom. Traveling in a rugged private 4WD Toyota Land Cruiser, you conquer the Kali Gandaki canyon and high desert passes to explore the walled medieval capital of Lo Manthang, prehistoric sky caves, and sacred Muktinath without demanding multi-week foot trekking.',
    highlights: [
      'Travel in rugged private 4WD Toyota Land Cruiser / Mahindra Scorpio vehicles with veteran off-road mountain drivers',
      'Explore the walled medieval fortress city of Lo Manthang and royal palaces in comfort',
      'Discover the multi-story Jhong Sky Caves of Chhoser and Niphu rock-face monastery',
      'Drive across dramatic trans-Himalayan passes including Nyi La (4,010m) and Lo La (3,950m)',
      'Pilgrimage visit to sacred Muktinath Temple (3,800m) with 108 eternal holy water spouts',
      'Pass through the world’s deepest gorge carved by the Kali Gandaki River between Annapurna and Dhaulagiri',
      'Ideal for families, senior travelers, photographers, and adventurers seeking high comfort',
      'Explore the ancient apple orchards and distillery village of Marpha'
    ],
    gallery: [
      'upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp',
      'upper-mustang-jeep-tour.webp',
      'upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp',
      'upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp',
      'upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-04.webp'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kathmandu & Trip Briefing', dest: 'Kathmandu', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Welcome Dinner (D)', desc: 'Arrival at Tribhuvan International Airport. VIP greeting and transfer to your hotel in Thamel. Evening briefing with your overland expedition leader.' },
      { day: 2, title: 'Scenic Drive Kathmandu to Pokhara via Prithvi Highway', dest: 'Pokhara', altM: 820, duration: '6-7 hrs drive', dist: '200 km', meals: 'B, L', desc: 'Scenic overland journey along the Trishuli and Marsyangdi rivers to lakeside Pokhara. Spend the afternoon boating on Phewa Lake with Fishtail mountain views.' },
      { day: 3, title: '4WD Drive Pokhara to Tatopani, Kalopani & Marpha (2,670m)', dest: 'Marpha', altM: 2670, duration: '6-7 hrs 4WD', dist: '115 km off-road', meals: 'B, L, D', desc: 'Board your private 4WD vehicle. Drive through Beni along the roaring Kali Gandaki canyon between Annapurna I (8,091m) and Dhaulagiri (8,167m) to the whitewashed apple village of Marpha.' },
      { day: 4, title: '4WD Drive Marpha to Kagbeni & Enter Upper Mustang to Syangboche (3,800m)', dest: 'Syangboche', altM: 3800, duration: '5-6 hrs 4WD', dist: '45 km off-road', meals: 'B, L, D', desc: 'Process restricted area permits at Kagbeni checkpoint. Drive past Chhusang’s red cliffs and Chele, climbing across panoramic passes to Syangboche.' },
      { day: 5, title: '4WD Drive Syangboche to Ghami, Nyi La Pass & Charang (3,560m)', dest: 'Charang', altM: 3560, duration: '4-5 hrs 4WD', dist: '35 km off-road', meals: 'B, L, D', desc: 'Cross Nyi La Pass (4,010m) and drive through the colorful cliffs of Ghami and its ancient mani wall to reach Charang’s historic palace and gompa.' },
      { day: 6, title: '4WD Drive Charang to the Ancient Walled Capital of Lo Manthang (3,840m)', dest: 'Lo Manthang', altM: 3840, duration: '3-4 hrs 4WD', dist: '25 km off-road', meals: 'B, L, D', desc: 'Drive across Lo La Pass into the legendary walled kingdom of Lo Manthang. Guided walking tour of the king’s palace and 15th-century Buddhist monasteries.' },
      { day: 7, title: '4WD Overland Excursion to Chhoser Sky Caves & Kora La Border', dest: 'Lo Manthang', altM: 3840, duration: 'Full day 4WD tour', dist: '40 km 4WD', meals: 'B, L, D', desc: 'Drive along the desert riverbed to explore the famous Jhong Sky Caves of Chhoser, Niphu Cave Monastery, and take an optional drive toward the ancient Nepal-Tibet trade border at Kora La.' },
      { day: 8, title: '4WD Drive Lo Manthang to Ghar Gompa & Chhusang (2,980m)', dest: 'Chhusang', altM: 2980, duration: '5-6 hrs 4WD', dist: '50 km off-road', meals: 'B, L, D', desc: 'Visit the revered 8th-century Ghar Gompa in Gyakar before driving through scenic red rock cliffs down to the warm valley of Chhusang.' },
      { day: 9, title: 'Drive Chhusang to Muktinath Temple (3,800m) & Jomsom (2,720m)', dest: 'Jomsom', altM: 2720, duration: '4-5 hrs 4WD', dist: '38 km', meals: 'B, L, D', desc: 'Drive to the sacred pilgrimage site of Muktinath (108 water spouts and eternal flame) before descending to the district capital of Jomsom.' },
      { day: 10, title: 'Scenic 4WD Drive Jomsom to Pokhara via Beni', dest: 'Pokhara', altM: 820, duration: '7-8 hrs 4WD', dist: '155 km', meals: 'B, L', desc: 'Descend through the lush southern slopes of Mustang and Myagdi to Pokhara. Relax by the lake and celebrate the completion of the overland circuit.' },
      { day: 11, title: 'Drive or Fly Pokhara to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min flight / 6 hrs drive', dist: '200 km', meals: 'B, D', desc: 'Return to Kathmandu. Enjoy free time for Thamel shopping and a farewell Nepali cultural dinner with your expedition team.' },
      { day: 12, title: 'Final International Departure', dest: 'Home', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private vehicle transfer to Tribhuvan International Airport for your return flight home.' }
    ],
    faqs: [
      { q: 'Is the road to Lo Manthang paved?', a: 'The road between Pokhara and Beni is paved, while Beni to Jomsom and onwards to Lo Manthang is a graded gravel mountain dirt track. We exclusively use sturdy 4WD vehicles like Toyota Land Cruisers or Mahindra Scorpios with high ground clearance.' },
      { q: 'Can elderly travelers or children do this tour?', a: 'Yes! The jeep tour eliminates prolonged foot hiking, making Upper Mustang accessible to senior travelers, families with children, and photography enthusiasts who prefer vehicle transport.' }
    ]
  },

  // 3. Upper Mustang Tiji Festival Trek (15 Days)
  {
    slug: 'upper-mustang-tiji-festival',
    title: 'Upper Mustang Tiji Festival Trek (15 Days) — Igloo Himalaya Treks',
    seoTitle: 'Upper Mustang Tiji Festival Trek (15 Days)',
    metaDesc: 'Witness the sacred 3-day Tiji Festival inside the medieval walled city of Lo Manthang. Experience Buddhist masked dances, ancient rituals, and trans-Himalayan culture.',
    canonical: 'https://igloohimalayatreks.com/trek/upper-mustang-tiji-festival/',
    duration: '15 days',
    difficulty: 'Moderate to Challenging',
    maxAlt: '3,840 m (12,598 ft)',
    maxAltNum: 3840,
    price: '2,190',
    activity: 'Sacred Himalayan Cultural Festival Trek',
    accommodation: 'Heritage Teahouses & Traditional Lodges',
    transport: 'Domestic Flights & Private 4WD Support',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'May (Annual Tiji Festival Dates)',
    trekStarts: 'Jomsom / Kagbeni',
    trekEnds: 'Jomsom / Pokhara',
    region: 'Mustang (Restricted Area)',
    heroBadge: 'Mustang Region • Sacred 3-Day Masked Dance Festival in Lo Manthang',
    leadText: 'The 15-day Upper Mustang Tiji Festival Trek is one of the most culturally profound Himalayan pilgrimages in the world. Centered in the medieval walled capital of Lo Manthang, this extraordinary expedition aligns with the annual 3-day Tiji Festival ("Tenchi"), where monks perform elaborate sacred masked dances to celebrate the triumph of good over evil and bring peace and rain to the kingdom.',
    highlights: [
      'Attend the complete 3-day sacred Tiji Festival inside the royal courtyard of Lo Manthang',
      'Witness the unrolling of the massive 500-year-old sacred embroidered Thangka of Padmasambhava',
      'Watch lamas and monks perform the sacred Tsa Chham and Nga Chham ritual masked dances',
      'See local Loba nobility and villagers dressed in exquisite traditional brocades and turquoise jewelry',
      'Explore the multi-story Jhong Sky Caves of Chhoser and Niphu Cave Monastery',
      'Visit the 8th-century Ghar Gompa in Gyakar featuring intricately painted rock carvings',
      'Cross iconic desert passes with views of Nilgiri, Tilicho Peak, and Dhaulagiri',
      'Limited annual festival departure with certified cultural Sherpa guide'
    ],
    gallery: [
      'upper-mustang-tiji-festival-spectacular-culture-rituals.webp',
      'upper-mustang-tiji-festival.webp',
      'upper-mustang-tiji-festival-trek.webp',
      'upper-mustang-tiji-festival-03.webp',
      'upper-mustang-tiji-festival-04.webp'
    ],
    itinerary: [
      { day: 1, title: 'Flight Kathmandu to Pokhara (820m) & Leisure by Phewa Lake', dest: 'Pokhara', altM: 820, duration: '25 min flight', dist: 'Flight', meals: 'B', desc: 'Fly to Pokhara with views of the Langtang, Ganesh Himal, and Annapurna ranges. Enjoy an afternoon boat ride on Phewa Lake.' },
      { day: 2, title: 'Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni (2,810m)', dest: 'Kagbeni', altM: 2810, duration: '20 min flight + 3.5 hrs walk', dist: '10.5 km', meals: 'B, L, D', desc: 'Morning mountain flight to Jomsom. Trek along the breezy Kali Gandaki riverbed to medieval Kagbeni village.' },
      { day: 3, title: 'Trek Kagbeni to Chele (3,050m) entering Upper Mustang', dest: 'Chele', altM: 3050, duration: '5-6 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Check permits and cross into the restricted realm of Lo, passing Tangbe and Chhusang red cliffs to reach Chele.' },
      { day: 4, title: 'Trek Chele to Syangboche (3,800m) via Chungsi Cave', dest: 'Syangboche', altM: 3800, duration: '6-7 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Ascend past high passes and visit the holy Guru Rinpoche meditation cave at Chungsi before reaching Syangboche.' },
      { day: 5, title: 'Trek Syangboche to Ghami (3,520m) across Nyi La (4,010m)', dest: 'Ghami', altM: 3520, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Cross the highest pass on the standard route, Nyi La (4,010m), descending into the serene village of Ghami.' },
      { day: 6, title: 'Trek Ghami to Charang (3,560m) past Long Mani Wall', dest: 'Charang', altM: 3560, duration: '5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Trek past the red cliffs of Drakmar and the longest mani wall in Nepal to reach the palace town of Charang.' },
      { day: 7, title: 'Trek Charang to the Ancient Walled City of Lo Manthang (3,840m)', dest: 'Lo Manthang', altM: 3840, duration: '4-5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Cross Lo La Pass and enter the walled city of Lo Manthang. Settle in as local Lobas and Buddhist monks prepare for the festival.' },
      { day: 8, title: 'Tiji Festival Day 1: Sacred Opening Ceremony & Tsa Chham Mask Dance', dest: 'Lo Manthang', altM: 3840, duration: 'Festival day', dist: 'Royal Square', meals: 'B, L, D', desc: 'The festival begins with the unfurling of a massive centuries-old thangka. Witness monks perform the "Tsa Chham" dance celebrating the birth of Dorje Jono.' },
      { day: 9, title: 'Tiji Festival Day 2: Nga Chham Mask Dance & Demon Subjugation', dest: 'Lo Manthang', altM: 3840, duration: 'Festival day', dist: 'Royal Square', meals: 'B, L, D', desc: 'Women in traditional Loba turquoise ornaments gather as monks perform the "Nga Chham", depicting the wrathful deities battling negative forces.' },
      { day: 10, title: 'Tiji Festival Day 3: Rha Chham Grand Finale & Burning of Demon Effigy', dest: 'Lo Manthang', altM: 3840, duration: 'Festival day', dist: 'City Gates', meals: 'B, L, D', desc: 'The climatic third day! A ceremonial procession leads to the city walls where the evil demon effigy is destroyed, restoring peace, balance, and seasonal rain.' },
      { day: 11, title: 'Trek Lo Manthang to Drakmar (3,820m) via 8th-Century Ghar Gompa', dest: 'Drakmar', altM: 3820, duration: '6-7 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Depart Lo Manthang and visit the ancient monastery of Ghar Gompa with its vibrant painted carvings, continuing to Drakmar.' },
      { day: 12, title: 'Trek Drakmar to Shyangmochen (3,800m)', dest: 'Shyangmochen', altM: 3800, duration: '5-6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Follow the panoramic western ridge trail back toward Shyangmochen with views of the Annapurna range.' },
      { day: 13, title: 'Trek Shyangmochen to Chhusang (2,980m)', dest: 'Chhusang', altM: 2980, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Descend into the lower Kali Gandaki river canyon, relaxing in the tranquil village of Chhusang.' },
      { day: 14, title: 'Trek Chhusang to Kagbeni & continue to Jomsom (2,720m)', dest: 'Jomsom', altM: 2720, duration: '5-6 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Exit the restricted area at Kagbeni and trek the final stretch back to Jomsom for a celebratory farewell evening.' },
      { day: 15, title: 'Morning Flights Jomsom to Pokhara & Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min + 25 min flights', dist: 'Flights', meals: 'B, D', desc: 'Fly from Jomsom to Pokhara and onward to Kathmandu for international departure or hotel stay.' }
    ],
    faqs: [
      { q: 'What is the significance of the Tiji Festival in Lo Manthang?', a: 'Tiji is a 3-day Buddhist ritual derived from the myth of Dorje Jono, who fought and defeated a demon who caused drought, epidemics, and destruction in the Kingdom of Mustang. The festival cleanses negative energy and brings peace, prosperity, and rain.' },
      { q: 'When is the Tiji Festival held each year?', a: 'The festival dates are determined according to the Tibetan Lunar Calendar, typically falling in May. Because lodge capacity in Lo Manthang is strictly limited during festival days, advance booking 4 to 6 months prior is highly recommended.' }
    ]
  },

  // 4. Lower Mustang Trek (8 Days)
  {
    slug: 'lower-mustang-trek',
    title: 'Lower Mustang Trek (8 Days) — Muktinath & Kali Gandaki Valley — Igloo Himalaya Treks',
    seoTitle: 'Lower Mustang Trek (8 Days)',
    metaDesc: 'Explore Lower Mustang, the holy shrines of Muktinath (3,800m), ancient Kagbeni, and the world’s deepest gorge along the Kali Gandaki in an accessible 8-day itinerary.',
    canonical: 'https://igloohimalayatreks.com/trek/lower-mustang-trek/',
    duration: '8 days',
    difficulty: 'Moderate',
    maxAlt: '3,800 m (12,467 ft)',
    maxAltNum: 3800,
    price: '750',
    activity: 'Scenic Cultural Foothill & Temple Trek',
    accommodation: 'Traditional Mountain Teahouses',
    transport: 'Domestic Mountain Flight & Private Vehicle',
    meals: 'All Meals on Trek (B,L,D)',
    season: 'Year-Round (Best Sep-Nov & Mar-May)',
    trekStarts: 'Pokhara / Jomsom',
    trekEnds: 'Pokhara / Tatopani',
    region: 'Mustang',
    heroBadge: 'Mustang Region • Sacred Shrines & Kali Gandaki Gorge',
    leadText: 'The 8-day Lower Mustang Trek combines the sacred temple pilgrimage of Muktinath (3,800m) with the arid beauty of the Kali Gandaki valley. Walking between the soaring 8,000-meter bulk of Dhaulagiri and the Annapurna massif, this route explores ancient Thakali stone villages, Marpha apple orchards, and relaxing natural hot springs at Tatopani without requiring costly restricted area permits.',
    highlights: [
      'Visit the sacred pilgrimage shrine of Muktinath (3,800m), holy to both Hindus and Buddhists',
      'Wander through the 500-year-old medieval stone-paved alleys of Kagbeni village',
      'Walk alongside the world’s deepest river gorge carved by the Kali Gandaki River',
      'Taste world-famous fresh apple pies, cider, and brandy in the charming village of Marpha',
      'Spectacular flight through the mountain gap between Dhaulagiri (8,167m) and Annapurna I (8,091m)',
      'Soak tired muscles in the natural thermal mineral hot springs of Tatopani',
      'Standard ACAP and TIMS permits only — NO $500 restricted area permit required',
      'Excellent beginner and family-friendly Himalayan trekking route'
    ],
    gallery: [
      'upper-mustang.webp',
      'upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp',
      'annapurna-circuit-trek.webp',
      'upper-mustang-trek-cost-and-itinerary.webp',
      'ghorepani-poon-hill-trek.webp'
    ],
    itinerary: [
      { day: 1, title: 'Drive or Fly Kathmandu to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '25 min flight / 6 hrs drive', dist: '200 km', meals: 'B', desc: 'Scenic journey to Pokhara. Afternoon leisure along the banks of Phewa Lake overlooking the Annapurna range.' },
      { day: 2, title: 'Mountain Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni (2,810m)', dest: 'Kagbeni', altM: 2810, duration: '20 min flight + 3.5 hrs walk', dist: '10.5 km', meals: 'B, L, D', desc: 'Spectacular early morning flight to Jomsom. Trek along the wide Kali Gandaki riverbed to Kagbeni, a historic fortified village on the salt trade route.' },
      { day: 3, title: 'Trek Kagbeni to Muktinath (3,800m) via Jharkot', dest: 'Muktinath', altM: 3800, duration: '4-5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Ascend steadily through arid scrubland to Jharkot village with its ancient monastery. Continue to Muktinath, sacred for its 108 eternal water spouts and continuous natural gas flame.' },
      { day: 4, title: 'Explore Muktinath & Trek downhill to Marpha (2,670m)', dest: 'Marpha', altM: 2670, duration: '5-6 hrs', dist: '16 km', meals: 'B, L, D', desc: 'Morning visit to Muktinath temple. Descend past Jomsom into the whitewashed cobblestone streets of Marpha, famed for apple orchards and stone drainage canals.' },
      { day: 5, title: 'Trek Marpha to Kalopani (2,530m)', dest: 'Kalopani', altM: 2530, duration: '5-6 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Follow the Kali Gandaki river southward as the landscape transforms from arid plateau into lush pine forests. Enjoy jaw-dropping views of Dhaulagiri and Annapurna I.' },
      { day: 6, title: 'Trek Kalopani to Tatopani (1,190m) & Natural Hot Springs', dest: 'Tatopani', altM: 1190, duration: '5-6 hrs', dist: '17 km', meals: 'B, L, D', desc: 'Descend through the narrowest section of the gorge past the dramatic Rupse Chhahara waterfall. Arrive in Tatopani and soak in the riverside natural hot springs.' },
      { day: 7, title: 'Scenic Drive Tatopani to Pokhara (820m)', dest: 'Pokhara', altM: 820, duration: '4-5 hrs drive', dist: '95 km', meals: 'B, L', desc: 'Private transfer along the river highway past Beni to Pokhara. Afternoon at leisure for lakeside massages and shopping.' },
      { day: 8, title: 'Return to Kathmandu & International Departure', dest: 'Kathmandu', altM: 1400, duration: '25 min flight / 6 hrs drive', dist: '200 km', meals: 'B', desc: 'Fly or drive back to Kathmandu. Connect with your flight home or extend your stay in Nepal.' }
    ],
    faqs: [
      { q: 'Do I need the $500 USD Upper Mustang permit for this trek?', a: 'No! Lower Mustang (Jomsom, Kagbeni, Muktinath, and Marpha) only requires the regular Annapurna Conservation Area Project (ACAP) permit and TIMS card. You do not need the expensive restricted area permit.' },
      { q: 'Is Lower Mustang suitable for beginners?', a: 'Yes, Lower Mustang is one of the most accessible and culturally rich treks in the Himalayas, with moderate walking hours, comfortable lodges, and flexible road transport options.' }
    ]
  },

  // 5. Lower Dolpo Circuit Trek (18 Days)
  {
    slug: 'lower-dolpo-trek',
    title: 'Lower Dolpo Circuit Trek (18 Days) — Shey Phoksundo & Tarap Valley — Igloo Himalaya Treks',
    seoTitle: 'Lower Dolpo Circuit Trek (18 Days)',
    metaDesc: 'Trek the legendary 18-day Lower Dolpo Circuit. Witness the deep turquoise waters of Shey Phoksundo Lake, cross Baga La (5,169m) and Numa La (5,309m), and explore Dho Tarap.',
    canonical: 'https://igloohimalayatreks.com/trek/lower-dolpo-trek/',
    duration: '18 days',
    difficulty: 'Challenging (Remote High Pass Wilderness)',
    maxAlt: '5,309 m (17,418 ft)',
    maxAltNum: 5309,
    price: '1,990',
    activity: 'Remote Wilderness & High Alpine Circuit',
    accommodation: 'Rustic Teahouses & Wilderness Camping',
    transport: 'Domestic Flights (Kathmandu–Nepalgunj–Juphal) & Pack Animals',
    meals: 'Full Board on Trek (B,L,D)',
    season: 'May to October (Rain Shadow Route)',
    trekStarts: 'Juphal / Dunai',
    trekEnds: 'Juphal / Nepalgunj',
    region: 'Dolpo (Restricted Area)',
    heroBadge: 'Dolpo Region • Shey Phoksundo Lake & High Himalayan Passes',
    leadText: 'The 18-day Lower Dolpo Circuit Trek is one of Nepal’s most pristine and remote trans-Himalayan wilderness journeys. Trekking through the heart of Shey Phoksundo National Park, you encounter the mirror-like turquoise waters of sacred Phoksundo Lake, cross two demanding 5,000-meter alpine passes (Baga La 5,169m and Numa La 5,309m), and explore the ancient Bon Po and Buddhist settlements of Dho Tarap.',
    highlights: [
      'Gaze upon the jewel-like emerald turquoise waters of sacred Shey Phoksundo Lake (3,600m)',
      'Cross two challenging high passes: Baga La (5,169m) and Numa La (5,309m)',
      'Immerse in ancient pre-Buddhist Bon Po culture and 900-year-old Tshowa Gompa in Ringmo',
      'Walk along the famous cliff-hanging "Caravan" trail above deep lake waters',
      'Explore Dho Tarap (3,944m), one of the highest permanently inhabited human settlements on Earth',
      'Trek through Shey Phoksundo National Park, habitat of elusive snow leopards and blue sheep',
      'Trans-Himalayan rain shadow climate making it an exceptional monsoon trek (June–August)',
      'Authentic wilderness expedition with experienced camp crew and pack mules'
    ],
    gallery: [
      'lower-dolpo-trek.webp',
      'lower-dolpo-trek-02.webp',
      'lower-dolpo-trek-03.webp',
      'lower-dolpo-trek-04.webp',
      'lower-dolpo-trek-05.webp'
    ],
    itinerary: [
      { day: 1, title: 'Flight Kathmandu to Nepalgunj (150m)', dest: 'Nepalgunj', altM: 150, duration: '50 min flight', dist: 'Flight', meals: 'B', desc: 'Afternoon flight from Kathmandu to the southwestern border city of Nepalgunj, gateway for flights into Dolpo. Team briefing and logistics review.' },
      { day: 2, title: 'Morning Flight Nepalgunj to Juphal (2,475m) & Trek to Dunai (2,140m)', dest: 'Dunai', altM: 2140, duration: '35 min flight + 3 hrs walk', dist: '8.5 km', meals: 'B, L, D', desc: 'Thrilling mountain flight to Juphal airstrip. Meet your trekking pack crew and trek downhill along the Thuli Bheri river valley to Dunai, the administrative center of Dolpa.' },
      { day: 3, title: 'Trek Dunai to Chhepka (2,680m)', dest: 'Chhepka', altM: 2680, duration: '5-6 hrs', dist: '13.5 km', meals: 'B, L, D', desc: 'Follow the turquoise Suli Gad river through lush mixed forests of pine, spruce, and bamboo. Enter Shey Phoksundo National Park at Sulighat checkpoint to reach Chhepka.' },
      { day: 4, title: 'Trek Chhepka to Jharana Hotel (3,110m)', dest: 'Jharana', altM: 3110, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Ascend past sparkling waterfalls and birch woodlands. Catch your first dramatic view of the 167-meter Suligad Waterfall plunging out of Phoksundo Lake.' },
      { day: 5, title: 'Trek Jharana to Ringmo & Turquoise Shey Phoksundo Lake (3,600m)', dest: 'Ringmo / Phoksundo', altM: 3600, duration: '4-5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Climb through cedar forests to the crest of a ridge, revealing the legendary deep emerald-turquoise waters of Shey Phoksundo Lake. Continue to the ancient Bon Po village of Ringmo.' },
      { day: 6, title: 'Exploration & Rest Day at Shey Phoksundo Lake', dest: 'Ringmo / Phoksundo', altM: 3600, duration: 'Day exploration', dist: '5 km', meals: 'B, L, D', desc: 'Visit the 900-year-old Tshowa Gompa (Bon Po monastery) on the eastern ridge overlooking the lake. Soak in mirror-like reflections surrounded by sheer snow-capped cliffs.' },
      { day: 7, title: 'Trek Ringmo along Lake Cliffs to Phoksundo Khola / Chunemba', dest: 'Chunemba', altM: 3630, duration: '5-6 hrs', dist: '10.5 km', meals: 'B, L, D', desc: 'Walk the famous cliffside trail featured in Eric Valli’s movie "Caravan" (Himalaya). The narrow path hangs dramatically above deep waters, leading to northern floodplains.' },
      { day: 8, title: 'Trek Phoksundo Khola to Baga La High Camp / Danigar (4,630m)', dest: 'Danigar', altM: 4630, duration: '6-7 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Ascend through a narrow glacial canyon past alpine meadows and dwarf junipers to the foot of Baga La Pass. Prepare gear for tomorrow’s pass crossing.' },
      { day: 9, title: 'Cross Baga La Pass (5,169m) and Descend to Pelung Tang (4,465m)', dest: 'Pelung Tang', altM: 4465, duration: '6-7 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Climb steadily up the frozen scree to Baga La Pass (5,169m) for panoramic views of Kanjirowa massif and the arid Tibetan plateau. Descend into Pelung Tang.' },
      { day: 10, title: 'Cross Numa La Pass (5,309m) and Descend to Dho Tarap (3,944m)', dest: 'Dho Tarap', altM: 3944, duration: '7-8 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek to the highest point of the circuit atop Numa La (5,309m) with views stretching to Dhaulagiri I (8,167m). Descend into the sprawling high valley of Dho Tarap.' },
      { day: 11, title: 'Acclimatization & Cultural Exploration in Dho Tarap Valley', dest: 'Dho Tarap', altM: 3944, duration: 'Cultural walk', dist: '4 km', meals: 'B, L, D', desc: 'Explore one of the highest settlements in the world. Visit Bon Po and Buddhist monasteries (Ribo Bhumpa and Shipchok Gompa) and observe traditional yak-caravan life.' },
      { day: 12, title: 'Trek Dho Tarap down to Ghyamgar / Sisaul (3,755m)', dest: 'Ghyamgar', altM: 3755, duration: '5-6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Follow the Tarap Khola through dramatic narrowing rock gorges where cliff walls rise thousands of feet straight out of the roaring torrent.' },
      { day: 13, title: 'Trek Ghyamgar to Nawarpani / Chhurwa (3,475m)', dest: 'Nawarpani', altM: 3475, duration: '5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Continue descending through the deep canyon where sunlight touches the riverbed for only a few hours each day. Settle at Nawarpani.' },
      { day: 14, title: 'Trek Nawarpani to Tarakot (2,540m)', dest: 'Tarakot', altM: 2540, duration: '5-6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Emerge from the gorge into the wide Bheri valley. Reach the fortress village of Tarakot, an ancient trading stronghold on the historic salt-caravan route.' },
      { day: 15, title: 'Trek Tarakot to Dunai (2,140m)', dest: 'Dunai', altM: 2140, duration: '5 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Trek alongside the Bheri River past terraced millet and buckwheat fields, returning to the lively district headquarters of Dunai.' },
      { day: 16, title: 'Trek Dunai to Juphal (2,475m)', dest: 'Juphal', altM: 2475, duration: '3-4 hrs', dist: '8.5 km', meals: 'B, L, D', desc: 'Climb the final switchbacks up from the riverbed to Juphal airstrip. Enjoy a farewell celebration dinner with your expedition guides and porters.' },
      { day: 17, title: 'Morning Flights Juphal to Nepalgunj & Connecting Flight to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '35 min + 50 min flights', dist: 'Flights', meals: 'B, D', desc: 'Fly back to Nepalgunj and connect directly to Kathmandu. Transfer to your hotel for a hot shower and farewell celebration dinner.' },
      { day: 18, title: 'Final Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private vehicle transfer to Tribhuvan International Airport for your international flight home.' }
    ],
    faqs: [
      { q: 'What permits are required for the Lower Dolpo Trek?', a: 'Lower Dolpo requires a Lower Dolpo Restricted Area Permit ($20 USD per person per week) and the Shey Phoksundo National Park Entry Permit. A government-licensed guide and minimum two trekkers are mandatory.' },
      { q: 'How physically demanding is the Lower Dolpo Circuit?', a: 'Lower Dolpo is graded Challenging. Trekkers cross two high passes over 5,000m (Baga La 5,169m and Numa La 5,309m) and hike through remote canyons with basic teahouse facilities.' }
    ]
  },

  // 6. Upper Dolpo Trek (24 Days)
  {
    slug: 'upper-dolpo-trek',
    title: 'Upper Dolpo & Shey Gompa Trek (24 Days) — Beyond Crystal Mountain — Igloo Himalaya Treks',
    seoTitle: 'Upper Dolpo & Shey Gompa Trek (24 Days)',
    metaDesc: 'Nepal’s ultimate wilderness expedition. 24 days traversing Upper Dolpo to mystical Shey Gompa, Crystal Mountain, Kang La (5,360m), and Shey Phoksundo Lake.',
    canonical: 'https://igloohimalayatreks.com/trek/upper-dolpo-trek/',
    duration: '24 days',
    difficulty: 'Very Strenuous (High Altitude Expedition)',
    maxAlt: '5,360 m (17,585 ft)',
    maxAltNum: 5360,
    price: '2,890',
    activity: 'Extreme Remote Wilderness Expedition',
    accommodation: 'Wilderness Camping & Traditional Gompa Homestays',
    transport: 'Domestic Flights (Kathmandu–Nepalgunj–Juphal) & Mule Caravan',
    meals: 'Full Board Expedition Meals Prepared by Camp Chef (B,L,D)',
    season: 'May to October (Rain Shadow Expedition)',
    trekStarts: 'Juphal / Dunai',
    trekEnds: 'Juphal / Nepalgunj',
    region: 'Dolpo (Restricted Area)',
    heroBadge: 'Dolpo Region • The Crystal Mountain & Sacred Shey Gompa',
    leadText: 'The 24-day Upper Dolpo and Shey Gompa Expedition is universally hailed as Nepal’s most enigmatic, remote, and culturally untouched trans-Himalayan journey. Immortalized by Peter Matthiessen in *The Snow Leopard*, this epic odyssey crosses soaring passes over 5,300 meters into the hidden northern valleys of Saldang, Tingyu, and the mystical 11th-century monastery of Shey Gompa beneath sacred Crystal Mountain.',
    highlights: [
      'Pilgrimage to sacred 11th-century Shey Gompa and the cliffside hermitage of Tsakang Gompa',
      'Perform the sacred kora around Crystal Mountain (Shel-ri), holy to Tibetan Buddhists and Bon pos',
      'Stand beside the mesmerizing turquoise expanse of Shey Phoksundo Lake (3,600m)',
      'Cross high Himalayan passes: Kang La (5,360m), Shey La (5,010m), and Jeng La (5,110m)',
      'Explore Saldang, the ancient cultural and salt-trade capital of northern Upper Dolpo',
      'Experience living 8th-century Tibetan culture, Bon Po traditions, and yak caravans unchanged for centuries',
      'Full self-supported expedition with professional camp kitchen, three-course meals, and mountain pack mules',
      'High probability of spotting Himalayan blue sheep, golden eagles, and signs of rare snow leopards'
    ],
    gallery: [
      'upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp',
      'upper-dolpo-trek.webp',
      'upper-dolpo-trek-02.webp',
      'upper-dolpo-trek-03.webp',
      'upper-dolpo-trek-04.webp'
    ],
    itinerary: [
      { day: 1, title: 'Flight Kathmandu to Nepalgunj (150m)', dest: 'Nepalgunj', altM: 150, duration: '50 min flight', dist: 'Flight', meals: 'B', desc: 'Fly from Kathmandu to the southwestern plains of Nepalgunj. Evening team briefing and gear check.' },
      { day: 2, title: 'Morning Flight Nepalgunj to Juphal (2,475m) & Trek to Dunai (2,140m)', dest: 'Dunai', altM: 2140, duration: '35 min flight + 3 hrs walk', dist: '8.5 km', meals: 'B, L, D', desc: 'Fly to Juphal and meet your wilderness expedition pack crew. Trek through terraced fields along the Bheri River to Dunai.' },
      { day: 3, title: 'Trek Dunai to Chhepka (2,680m)', dest: 'Chhepka', altM: 2680, duration: '5-6 hrs', dist: '13.5 km', meals: 'B, L, D', desc: 'Enter Shey Phoksundo National Park following the emerald Suli Gad river past cedar and walnut groves to Chhepka.' },
      { day: 4, title: 'Trek Chhepka to Chunuwar / Jharana (3,110m)', dest: 'Chunuwar', altM: 3110, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Trek through pine woods and take in views of the spectacular 167m Suligad waterfall cascading from the lake plateau.' },
      { day: 5, title: 'Trek Chunuwar to Ringmo & Turquoise Shey Phoksundo Lake (3,600m)', dest: 'Ringmo / Phoksundo', altM: 3600, duration: '4-5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Ascend past the lake outlet to reveal the awe-inspiring turquoise jewel of Shey Phoksundo Lake and the ancient Bon Po village of Ringmo.' },
      { day: 6, title: 'Acclimatization & Cultural Exploration around Phoksundo Lake', dest: 'Ringmo / Phoksundo', altM: 3600, duration: 'Exploration day', dist: '5 km', meals: 'B, L, D', desc: 'Visit Tshowa Bon Gompa on the cliff edge. Acclimatize and absorb the mystical serenity of Nepal’s deepest and most sacred lake.' },
      { day: 7, title: 'Trek Phoksundo Lake to Phoksundo Khola / Pine Forest Camp (3,750m)', dest: 'Phoksundo Khola', altM: 3750, duration: '5-6 hrs', dist: '10.5 km', meals: 'B, L, D', desc: 'Follow the iconic cliff-carved "Demon’s Path" along the western shore, entering the true wilderness beyond the lake basin into birch and pine flats.' },
      { day: 8, title: 'Trek Phoksundo Khola to Kang La High Camp (4,100m)', dest: 'Kang La High Camp', altM: 4100, duration: '5-6 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Trek up a glacial canyon into the true trans-Himalayan desert zone, camping beneath the sheer rock wall of Kang La Pass.' },
      { day: 9, title: 'Cross Kang La Pass (5,360m) & Descend to Sacred Shey Gompa (4,160m)', dest: 'Shey Gompa', altM: 4160, duration: '7-8 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Trek to the crux of the journey atop Kang La Pass (5,360m) with sweeping views of the Tibetan plateau. Descend to legendary 11th-century Shey Gompa at the foot of Crystal Mountain.' },
      { day: 10, title: 'Sacred Pilgrimage Day at Shey Gompa & Crystal Mountain (Tsakang)', dest: 'Shey Gompa', altM: 4160, duration: 'Pilgrimage walk', dist: '6 km', meals: 'B, L, D', desc: 'Explore the mystical red hermitage of Tsakang Gompa clinging to a vertical cliff face. Learn about the ancient kora around the quartz veins of Crystal Mountain.' },
      { day: 11, title: 'Trek Shey Gompa to Namgong Gompa (4,360m) across Shey La Pass (5,010m)', dest: 'Namgong Gompa', altM: 4360, duration: '6 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Cross scenic Shey La Pass (5,010m) with views into Tibet. Arrive at the red stone monastery of Namgong perched beside an alpine stream.' },
      { day: 12, title: 'Trek Namgong Gompa to Saldang (3,770m)', dest: 'Saldang', altM: 3770, duration: '4-5 hrs', dist: '9 km', meals: 'B, L, D', desc: 'Traverse dry clay slopes and descend to Saldang, the vibrant cultural and trade capital of northern Upper Dolpo with over 80 terraced stone houses.' },
      { day: 13, title: 'Day Excursion to Yangjer Gompa (3,890m) — Northernmost Dolpo', dest: 'Saldang', altM: 3770, duration: 'Full day excursion', dist: '14 km roundtrip', meals: 'B, L, D', desc: 'Trek along the Nagon Khola to Yangjer Gompa, the wealthiest and most revered monastery in upper Dolpo, before returning to Saldang.' },
      { day: 14, title: 'Trek Saldang to Komash (4,060m)', dest: 'Komash', altM: 4060, duration: '5 hrs', dist: '11 km', meals: 'B, L, D', desc: 'Follow the river gorge eastward through terraced barley fields and climb gently up to the high perch of Komash village.' },
      { day: 15, title: 'Trek Komash to Shimen (3,885m) via Shimen La Pass (4,260m)', dest: 'Shimen', altM: 3885, duration: '6 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Cross Shimen La Pass with views of snow leopards’ native craggy bluffs. Descend past ancient chortens to the walled village of Shimen.' },
      { day: 16, title: 'Trek Shimen to Tinje (4,110m)', dest: 'Tinje', altM: 4110, duration: '5 hrs', dist: '12 km', meals: 'B, L, D', desc: 'Follow the broad Panjyan Khola valley through open steppes past Sonam Gompa to Tinje, renowned for its ancient airstrip and salt-caravan yards.' },
      { day: 17, title: 'Trek Tinje to Rakpa (4,530m)', dest: 'Rakpa', altM: 4530, duration: '6-7 hrs', dist: '14 km', meals: 'B, L, D', desc: 'Trek through expansive wilderness pastures where wild yaks and blue sheep graze. Camp at Rakpa near the base of Chharka La.' },
      { day: 18, title: 'Cross Chharka La Pass (5,038m) and Trek to Chharka Bhot (4,302m)', dest: 'Chharka Bhot', altM: 4302, duration: '7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Climb gently to Chharka La Pass and descend into the medieval walled fortress village of Chharka Bhot.' },
      { day: 19, title: 'Trek Chharka to Norbuling / Ghalden Kharka (4,750m)', dest: 'Norbuling', altM: 4750, duration: '6 hrs', dist: '13 km', meals: 'B, L, D', desc: 'Ascend through high glacial river valleys toward the challenging passes leading out of Dolpo towards Jomsom.' },
      { day: 20, title: 'Cross Niwas La (5,120m) and Jungben La (5,550m) to Sangda Phedi', dest: 'Sangda Phedi', altM: 4190, duration: '8-9 hrs', dist: '16 km', meals: 'B, L, D', desc: 'The ultimate double pass day! Cross Niwas La and Jungben La with sweeping vistas of Dhaulagiri before dropping down to Sangda Phedi.' },
      { day: 21, title: 'Trek Sangda Phedi to Sangda Village (3,710m)', dest: 'Sangda', altM: 3710, duration: '5 hrs', dist: '10 km', meals: 'B, L, D', desc: 'Walk along rugged canyon terraces into the picturesque village of Sangda, entering lower Mustang territory.' },
      { day: 22, title: 'Trek Sangda to Phalyak & Jomsom (2,720m)', dest: 'Jomsom', altM: 2720, duration: '6-7 hrs', dist: '15 km', meals: 'B, L, D', desc: 'Ascend to a high ridge overlooking the Kali Gandaki valley and descend through Phalyak to Jomsom. Enjoy hot showers and a feast.' },
      { day: 23, title: 'Flight Jomsom to Pokhara & Connecting Flight to Kathmandu', dest: 'Kathmandu', altM: 1400, duration: '25 min + 25 min flights', dist: 'Flights', meals: 'B, D', desc: 'Scenic mountain flights back to Kathmandu. Relax at your hotel and join our celebratory farewell dinner.' },
      { day: 24, title: 'Final International Departure from Kathmandu', dest: 'Home', altM: 1400, duration: 'Airport transfer', dist: 'Airport', meals: 'Breakfast (B)', desc: 'Private transfer to Tribhuvan International Airport for your return flight home.' }
    ],
    faqs: [
      { q: 'What permits are required for the Upper Dolpo Trek and how much do they cost?', a: 'Upper Dolpo requires a Special Restricted Area Permit (RAP) costing $500 USD per person for the first 10 days ($50/day thereafter), plus the Shey Phoksundo National Park entry fee. A certified guide and minimum two travelers are legally mandatory.' },
      { q: 'What is the camping style and food on the Upper Dolpo expedition?', a: 'Upper Dolpo is predominantly a fully supported tented camping expedition. Our professional expedition crew sets up spacious two-person sleeping tents with thick foam mattresses, a heated dining tent, and toilet tents. Our camp chef prepares three fresh, nutritious meals daily.' }
    ]
  }
];

module.exports = {
  mustangDolpoPackages
};
