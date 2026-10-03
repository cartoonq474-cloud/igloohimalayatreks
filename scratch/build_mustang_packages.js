const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Read base template
const templatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

function buildItineraryAccordion(days) {
  return days.map(d => `
              <!-- Day ${d.day < 10 ? '0' + d.day : d.day} -->
              <div class="itinerary-card">
                <div class="itinerary-header">
                  <div class="itinerary-header-left">
                    <h4 class="itinerary-day-title-new">
                      <span class="day-label">Day ${d.day}:</span> ${d.title}
                    </h4>
                    <p class="itinerary-day-subtitle-new">
                      ${d.dest} – <span data-altitude-m="${d.altM}">${d.altM.toLocaleString()} m / ${Math.round(d.altM * 3.28084).toLocaleString()} ft</span> – ${d.duration}
                    </p>
                  </div>
                  <div class="itinerary-header-right">
                    <div class="itinerary-toggle-btn-new">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="itinerary-content">
                  <div class="itinerary-content-inner">
                    <div class="itinerary-metrics-list">
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Travel/Trek time: ${d.duration}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Accommodation: ${d.acc}</span>
                      </div>
                      <div class="itinerary-metric-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 11.5a6.5 6.5 0 0 1-13 0"></path>
                          <path d="M2 10h20"></path>
                        </svg>
                        <span>Distance: ${d.dist}</span>
                      </div>
                    </div>

                    <div class="itinerary-meta-box">
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        </svg>
                        <span>Meals: ${d.meals}</span>
                      </div>
                      <div class="itinerary-meta-box-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                          <circle cx="12" cy="9" r="2.5"></circle>
                        </svg>
                        <span>Overnight: ${d.dest}</span>
                      </div>
                    </div>

                    <div class="itinerary-description">
                      <p>${d.desc}</p>
                    </div>

                    <div class="itinerary-photos-grid">
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${d.img1}" alt="${d.title}">
                      </div>
                      <div class="itinerary-photo-wrapper">
                        <img loading="lazy" src="../../images/${d.img2}" alt="${d.dest} view">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');
}

// -------------------------------------------------------------
// 1. DATA FOR UPPER MUSTANG TREK (14 DAYS)
// -------------------------------------------------------------
const trekDays = [
  { day: 1, title: "Scenic Flight or Drive Kathmandu to Pokhara (820m)", dest: "Pokhara", altM: 820, duration: "25 min flight / 6 hrs drive", acc: "Hotel in Pokhara", dist: "200 km", meals: "Breakfast", desc: "Arrive in scenic Pokhara, gateway to the Annapurna and Mustang regions. Enjoy an evening stroll around Phewa Lake with reflection views of Machhapuchhre (Fishtail).", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp", img2: "upper-mustang.webp" },
  { day: 2, title: "Morning Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni", dest: "Kagbeni", altM: 2810, duration: "20 min flight + 3.5 hrs trek", acc: "Teahouse Lodge", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Spectacular morning flight through the Annapurna and Dhaulagiri mountain gap to Jomsom. Begin trekking along the breezy Kali Gandaki riverbed to Kagbeni, a historic fortified village and the official checkpoint for Upper Mustang.", img1: "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp" },
  { day: 3, title: "Trek Kagbeni to Chele (3,050m) via Tangbe and Chhusang", dest: "Chele", altM: 3050, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "15 km", meals: "Breakfast, Lunch, Dinner", desc: "Enter the restricted kingdom along the east bank of the Kali Gandaki. Pass Tangbe's whitewashed stone houses and Chhusang's red sandstone cliffs before crossing a footbridge to Chele village perched on a ridge.", img1: "upper-mustang-trek-cost-and-itinerary.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp" },
  { day: 4, title: "Trek Chele to Syangboche (3,800m) crossing Taklam La and Dajori La", dest: "Syangboche", altM: 3800, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb steeply through rocky canyons across Taklam La (3,624m) and Dajori La (3,735m) with sweeping views of Tilicho Peak and Damodar Danda. Pass the sacred Chungsi Cave monastery before arriving at Syangboche.", img1: "upper-mustang.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp" },
  { day: 5, title: "Trek Syangboche to Ghami (3,520m) across Nyi La Pass (4,010m)", dest: "Ghami", altM: 3520, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Traverse Yamada La (3,850m) and climb to Nyi La Pass (4,010m), the highest point before Lo Manthang. Descend into the fertile, sheltered valley of Ghami surrounded by lush green barley fields and apple trees.", img1: "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp", img2: "upper-mustang-trek-cost-and-itinerary.webp" },
  { day: 6, title: "Trek Ghami to Charang (Tsarang, 3,560m) past Nepal's Longest Mani Wall", dest: "Charang", altM: 3560, duration: "5 hours", acc: "Heritage Teahouse", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Pass Nepal's longest sacred mani wall (over 300 meters) and cross the Choya La Pass (3,870m). Enter the ancient town of Charang, dominated by a huge five-story white dzong (palace) and red gompa.", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp", img2: "upper-mustang.webp" },
  { day: 7, title: "Trek Charang to the Ancient Walled City of Lo Manthang (3,840m)", dest: "Lo Manthang", altM: 3840, duration: "4 to 5 hours", acc: "Heritage Hotel", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend gradually through the arid desert landscape to the crest of Lo La Pass (3,950m), where you catch your first breathtaking view of the walled city of Lo Manthang standing solitary on the windswept plateau.", img1: "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp" },
  { day: 8, title: "Exploration of Lo Manthang, Royal Palace & Chhoser Sky Caves", dest: "Lo Manthang", altM: 3840, duration: "Full day exploration", acc: "Heritage Hotel", dist: "Excursion", meals: "Breakfast, Lunch, Dinner", desc: "Visit the three major 15th-century monasteries: Jampa Gompa, Thubchen Gompa, and Chode Gompa. Take a short horse or jeep trip to the 2,500-year-old multi-story Jhong Sky Caves of Chhoser carved deep into vertical sandstone bluffs.", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp", img2: "upper-mustang-trek-cost-and-itinerary.webp" },
  { day: 9, title: "Trek Lo Manthang to Drakmar (3,820m) via Historic Ghar Gompa", dest: "Drakmar", altM: 3820, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "16 km", meals: "Breakfast, Lunch, Dinner", desc: "Take the scenic western return trail across Chogo La (4,230m) to visit Ghar Gompa (built in the 8th century by Guru Rinpoche). Continue through dramatic crimson canyon cliffs to Drakmar village.", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp", img2: "upper-mustang.webp" },
  { day: 10, title: "Trek Drakmar to Shyangmochen (Syangboche, 3,800m)", dest: "Shyangmochen", altM: 3800, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Start early to avoid the afternoon desert wind. Trek through Ghami and Jaite village, taking in sweeping views of the Annapurna and Dhaulagiri mountain massifs.", img1: "upper-mustang-trek-cost-and-itinerary.webp", img2: "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp" },
  { day: 11, title: "Trek Shyangmochen to Chhusang (2,980m)", dest: "Chhusang", altM: 2980, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend past Chele and the dramatic rock formations over the Kali Gandaki River, returning to the lower warmer elevation and apple orchards of Chhusang.", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp", img2: "upper-mustang.webp" },
  { day: 12, title: "Trek Chhusang to Kagbeni & continue to Jomsom (2,720m)", dest: "Jomsom", altM: 2720, duration: "5 to 6 hours", acc: "Hotel in Jomsom", dist: "14 km", meals: "Breakfast, Lunch, Dinner", desc: "Complete the restricted circuit at Kagbeni checkpoint and hike along the riverbed back to Jomsom. Enjoy a celebratory dinner with your guide and sample Marpha apple cider.", img1: "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp" },
  { day: 13, title: "Morning Flights Jomsom to Pokhara & Connecting Flight to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "25 min + 25 min flights", acc: "Hotel in Kathmandu", dist: "Flights", meals: "Breakfast", desc: "Take early morning flights from Jomsom to Pokhara and onward to Kathmandu. Relax at your hotel and enjoy free time for shopping in Thamel.", img1: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp", img2: "upper-mustang.webp" },
  { day: 14, title: "Final Departure from Kathmandu", dest: "Home", altM: 1400, duration: "Departure", acc: "Departure", dist: "Transfer", meals: "Breakfast", desc: "Private vehicle transfer to Tribhuvan International Airport for your flight home.", img1: "upper-mustang.webp", img2: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp" }
];

// -------------------------------------------------------------
// 2. DATA FOR UPPER MUSTANG JEEP TOUR (12 DAYS)
// -------------------------------------------------------------
const jeepDays = [
  { day: 1, title: "Arrival in Kathmandu & Trip Briefing", dest: "Kathmandu", altM: 1400, duration: "Airport transfer", acc: "Hotel in Kathmandu", dist: "City", meals: "Welcome Dinner", desc: "Arrive at Tribhuvan International Airport. Meet your expedition coordinator and check in to your hotel in Thamel. Evening briefing and welcome dinner.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp", img2: "upper-mustang-jeep-tour.webp" },
  { day: 2, title: "Scenic Drive Kathmandu to Pokhara via Prithvi Highway", dest: "Pokhara", altM: 820, duration: "6 to 7 hours drive", acc: "Hotel in Pokhara", dist: "200 km", meals: "Breakfast, Lunch", desc: "Scenic overland journey to the lakeside city of Pokhara. Spend the afternoon boating on Phewa Lake or relaxing along the vibrant lakeside promenade.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" },
  { day: 3, title: "4WD Jeep Drive Pokhara to Tatopani & Kalopani / Marpha", dest: "Marpha", altM: 2670, duration: "6 to 7 hours 4WD", acc: "Comfort Teahouse", dist: "115 km 4WD", meals: "Breakfast, Lunch, Dinner", desc: "Board your private 4WD Toyota Land Cruiser or Scorpio. Drive along the deepest gorge in the world (Kali Gandaki) between Annapurna and Dhaulagiri, reaching the picturesque apple village of Marpha.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp" },
  { day: 4, title: "4WD Drive Marpha to Kagbeni & Enter Upper Mustang to Syangboche", dest: "Syangboche", altM: 3800, duration: "5 to 6 hours 4WD", acc: "Mountain Lodge", dist: "45 km off-road", meals: "Breakfast, Lunch, Dinner", desc: "Process restricted area permits at Kagbeni checkpoint. Drive past Chhusang and Chele cliff caves, crossing high scenic passes to Syangboche with grand views of Nilgiri.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-04.webp", img2: "upper-mustang-jeep-tour.webp" },
  { day: 5, title: "4WD Drive Syangboche to Ghami, Nyi La Pass & Charang", dest: "Charang", altM: 3560, duration: "4 to 5 hours 4WD", acc: "Heritage Lodge", dist: "35 km off-road", meals: "Breakfast, Lunch, Dinner", desc: "Cross the scenic Nyi La Pass (4,010m) and drive through the colorful cliffs of Ghami and its ancient mani wall to reach Charang's historic palace and gompa.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp" },
  { day: 6, title: "4WD Drive Charang to the Ancient Walled Capital of Lo Manthang", dest: "Lo Manthang", altM: 3840, duration: "3 to 4 hours 4WD", acc: "Heritage Hotel", dist: "25 km off-road", meals: "Breakfast, Lunch, Dinner", desc: "Drive across Lo La Pass into the legendary walled kingdom of Lo Manthang. Afternoon guided walking tour of the king's palace and 15th-century Buddhist monasteries.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-04.webp" },
  { day: 7, title: "4WD Overland Excursion to Chhoser Sky Caves & Kora La Border", dest: "Lo Manthang", altM: 3840, duration: "Full day 4WD tour", acc: "Heritage Hotel", dist: "40 km 4WD", meals: "Breakfast, Lunch, Dinner", desc: "Drive north along the desert riverbed to explore the famous Jhong Sky Caves of Chhoser, Niphu Cave Monastery, and take an optional drive toward the ancient Nepal-Tibet trade border at Kora La.", img1: "upper-mustang-jeep-tour.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" },
  { day: 8, title: "4WD Drive Lo Manthang to Ghar Gompa & Chhusang", dest: "Chhusang", altM: 2980, duration: "5 to 6 hours 4WD", acc: "Teahouse Lodge", dist: "50 km off-road", meals: "Breakfast, Lunch, Dinner", desc: "Visit the revered 8th-century Ghar Gompa in Gyakar before driving through scenic red rock cliffs down to the warm valley of Chhusang.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp" },
  { day: 9, title: "Drive Chhusang to Muktinath Temple (3,800m) & Jomsom", dest: "Jomsom", altM: 2720, duration: "4 to 5 hours 4WD", acc: "Hotel in Jomsom", dist: "38 km", meals: "Breakfast, Lunch, Dinner", desc: "Drive to the sacred pilgrimage site of Muktinath (108 water spouts and eternal flame) before descending to the district capital of Jomsom.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-04.webp", img2: "upper-mustang-jeep-tour.webp" },
  { day: 10, title: "Scenic 4WD Drive Jomsom to Pokhara via Beni", dest: "Pokhara", altM: 820, duration: "7 to 8 hours 4WD", acc: "Hotel in Pokhara", dist: "155 km", meals: "Breakfast, Lunch", desc: "Descend through the lush southern slopes of Mustang and Myagdi to Pokhara. Relax by the lake and celebrate the completion of the overland circuit.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp" },
  { day: 11, title: "Drive or Fly Pokhara to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "25 min flight / 6 hrs drive", acc: "Hotel in Kathmandu", dist: "200 km", meals: "Breakfast, Farewell Dinner", desc: "Return to Kathmandu. Enjoy free time for Thamel shopping and a farewell Nepali cultural dinner with your expedition team.", img1: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp", img2: "upper-mustang-jeep-tour.webp" },
  { day: 12, title: "Final International Departure", dest: "Home", altM: 1400, duration: "Departure", acc: "Departure", dist: "Transfer", meals: "Breakfast", desc: "Private vehicle transfer to Tribhuvan International Airport for your return flight home.", img1: "upper-mustang-jeep-tour.webp", img2: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp" }
];

// -------------------------------------------------------------
// 3. DATA FOR UPPER MUSTANG TIJI FESTIVAL TREK (15 DAYS)
// -------------------------------------------------------------
const tijiDays = [
  { day: 1, title: "Flight Kathmandu to Pokhara (820m) & Leisure by Phewa Lake", dest: "Pokhara", altM: 820, duration: "25 min flight", acc: "Hotel in Pokhara", dist: "Flight", meals: "Breakfast", desc: "Fly to Pokhara with views of the Langtang, Ganesh Himal, and Annapurna ranges. Enjoy an afternoon boat ride on Phewa Lake.", img1: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp", img2: "upper-mustang-tiji-festival.webp" },
  { day: 2, title: "Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni", dest: "Kagbeni", altM: 2810, duration: "20 min flight + 3.5 hrs trek", acc: "Teahouse Lodge", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Morning mountain flight to Jomsom. Trek along the breezy Kali Gandaki riverbed to medieval Kagbeni village.", img1: "upper-mustang-tiji-festival-trek.webp", img2: "upper-mustang-tiji-festival-03.webp" },
  { day: 3, title: "Trek Kagbeni to Chele (3,050m) entering Upper Mustang", dest: "Chele", altM: 3050, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "15 km", meals: "Breakfast, Lunch, Dinner", desc: "Check permits and cross into the restricted realm of Lo, passing Tangbe and Chhusang red cliffs to reach Chele.", img1: "upper-mustang-tiji-festival-04.webp", img2: "upper-mustang-tiji-festival-05.webp" },
  { day: 4, title: "Trek Chele to Syangboche (3,800m) via Chungsi Cave", dest: "Syangboche", altM: 3800, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend past high passes and visit the holy Guru Rinpoche meditation cave at Chungsi before reaching Syangboche.", img1: "upper-mustang-tiji-festival.webp", img2: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp" },
  { day: 5, title: "Trek Syangboche to Ghami (3,520m) across Nyi La (4,010m)", dest: "Ghami", altM: 3520, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross the highest pass on the standard route, Nyi La (4,010m), descending into the serene village of Ghami.", img1: "upper-mustang-tiji-festival-trek.webp", img2: "upper-mustang-tiji-festival-03.webp" },
  { day: 6, title: "Trek Ghami to Charang (3,560m) past Long Mani Wall", dest: "Charang", altM: 3560, duration: "5 hours", acc: "Heritage Lodge", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek past the red cliffs of Drakmar and the longest mani wall in Nepal to reach the palace town of Charang.", img1: "upper-mustang-tiji-festival-04.webp", img2: "upper-mustang-tiji-festival-05.webp" },
  { day: 7, title: "Trek Charang to the Ancient Walled City of Lo Manthang (3,840m)", dest: "Lo Manthang", altM: 3840, duration: "4 to 5 hours", acc: "Heritage Hotel", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross Lo La Pass and enter the walled city of Lo Manthang. Settle in as local Lobas and Buddhist monks prepare for the festival.", img1: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp", img2: "upper-mustang-tiji-festival.webp" },
  { day: 8, title: "Tiji Festival Day 1: Sacred Opening Ceremony & Tsa Chham Mask Dance", dest: "Lo Manthang", altM: 3840, duration: "Festival day", acc: "Heritage Hotel", dist: "Royal Square", meals: "Breakfast, Lunch, Dinner", desc: "The festival begins with the unfurling of a massive centuries-old thangka. Witness monks perform the 'Tsa Chham' dance celebrating the birth of Dorje Jono.", img1: "upper-mustang-tiji-festival-trek.webp", img2: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp" },
  { day: 9, title: "Tiji Festival Day 2: Nga Chham Mask Dance & Demon Subjugation", dest: "Lo Manthang", altM: 3840, duration: "Festival day", acc: "Heritage Hotel", dist: "Royal Square", meals: "Breakfast, Lunch, Dinner", desc: "Women in traditional Loba turquoise ornaments gather as monks perform the 'Nga Chham', depicting the wrathful deities battling the negative forces.", img1: "upper-mustang-tiji-festival-03.webp", img2: "upper-mustang-tiji-festival-04.webp" },
  { day: 10, title: "Tiji Festival Day 3: Rha Chham Grand Finale & Burning of Demon Effigy", dest: "Lo Manthang", altM: 3840, duration: "Festival day", acc: "Heritage Hotel", dist: "City Gates", meals: "Breakfast, Lunch, Dinner", desc: "The climatic third day! A ceremonial procession leads to the city walls where the evil demon's effigy is destroyed, restoring peace, balance, and seasonal rain.", img1: "upper-mustang-tiji-festival-05.webp", img2: "upper-mustang-tiji-festival.webp" },
  { day: 11, title: "Trek Lo Manthang to Drakmar (3,820m) via 8th-Century Ghar Gompa", dest: "Drakmar", altM: 3820, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "16 km", meals: "Breakfast, Lunch, Dinner", desc: "Depart Lo Manthang and visit the ancient monastery of Ghar Gompa with its vibrant painted carvings, continuing to Drakmar.", img1: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp", img2: "upper-mustang-tiji-festival-trek.webp" },
  { day: 12, title: "Trek Drakmar to Shyangmochen (3,800m)", dest: "Shyangmochen", altM: 3800, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the panoramic western ridge trail back toward Shyangmochen with views of the Annapurna range.", img1: "upper-mustang-tiji-festival-03.webp", img2: "upper-mustang-tiji-festival-04.webp" },
  { day: 13, title: "Trek Shyangmochen to Chhusang (2,980m)", dest: "Chhusang", altM: 2980, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend into the lower Kali Gandaki river canyon, relaxing in the tranquil village of Chhusang.", img1: "upper-mustang-tiji-festival-05.webp", img2: "upper-mustang-tiji-festival.webp" },
  { day: 14, title: "Trek Chhusang to Kagbeni & continue to Jomsom (2,720m)", dest: "Jomsom", altM: 2720, duration: "5 to 6 hours", acc: "Hotel in Jomsom", dist: "14 km", meals: "Breakfast, Lunch, Dinner", desc: "Exit the restricted area at Kagbeni and trek the final stretch back to Jomsom for a celebratory farewell evening.", img1: "upper-mustang-tiji-festival-trek.webp", img2: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp" },
  { day: 15, title: "Morning Flights Jomsom to Pokhara & Kathmandu", dest: "Kathmandu", altM: 1400, duration: "Flights", acc: "Hotel / Departure", dist: "Flights", meals: "Breakfast", desc: "Fly from Jomsom to Pokhara and onward to Kathmandu for international departure or hotel stay.", img1: "upper-mustang-tiji-festival.webp", img2: "upper-mustang-tiji-festival-03.webp" }
];

function generatePackageHTML(config) {
  let html = baseTemplate;

  // 1. Meta / Head
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${config.metaDesc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${config.canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${config.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${config.metaDesc}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${config.canonicalUrl}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/${config.mainImg}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${config.title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${config.metaDesc}">`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="https://igloohimalayatreks.com/images/${config.mainImg}">`);

  // 2. Schema.org
  const subTripList = config.days.map(d => `          { "@type": "TouristTrip", "name": "Day ${d.day}: ${d.title.replace(/"/g, '\\"')}" }`).join(',\n');
  const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "${config.canonicalUrl}#trip",
        "name": "${config.name}",
        "description": "${config.metaDesc}",
        "touristType": ["Hikers", "Culture Enthusiasts", "Overland Travelers"],
        "subTrip": [
${subTripList}
        ],
        "offers": {
          "@type": "Offer",
          "price": "${config.price}",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "${config.canonicalUrl}"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${config.canonicalUrl}#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://igloohimalayatreks.com/" },
          { "@type": "ListItem", "position": 2, "name": "All Treks", "item": "https://igloohimalayatreks.com/nepal-trekking-packages/" },
          { "@type": "ListItem", "position": 3, "name": "${config.name}", "item": "${config.canonicalUrl}" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "${config.canonicalUrl}#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What permits are required for Upper Mustang?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Upper Mustang is a restricted area requiring a Special Restricted Area Permit (RAP) costing $500 USD per person for the first 10 days, plus the Annapurna Conservation Area Project (ACAP) permit. A minimum of two registered travelers and a licensed government guide are legally required."
            }
          },
          {
            "@type": "Question",
            "name": "Can Upper Mustang be visited during the monsoon (summer)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Upper Mustang lies entirely within the Himalayan rain shadow of Mount Annapurna and Dhaulagiri. It experiences dry, sunny, and arid weather during June, July, and August, making it one of the premier summer trekking destinations in Nepal."
            }
          },
          {
            "@type": "Question",
            "name": "How difficult is this trip?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${config.diffDesc}"
            }
          }
        ]
      }
    ]
  }
  </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);

  // 3. Hero Section Title & Overview
  html = html.replace(/<span class="pill pill-copper">Everest Region • Classic Himalayan Expedition<\/span>/, `<span class="pill pill-copper">Mustang Region • ${config.pill}</span>`);
  html = html.replace(/<h1 class="trek-hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="trek-hero-title" style="font-size: 2.8rem; margin-top: 6px; margin-bottom: 8px; color: var(--color-primary-navy);">${config.name}</h1>`);
  html = html.replace(/<p style="font-size: 1.15rem; color: var\(--color-neutral-600\); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">[\s\S]*?<\/p>/,
    `<p style="font-size: 1.15rem; color: var(--color-neutral-600); line-height: 1.7; margin-top: 12px; margin-bottom: 0;">${config.leadText}</p>`);

  // 4. Hero Collage Gallery
  const collage = `<div class="trek-gallery-collage">
        <div class="trek-gallery-main">
          <img src="../../images/${config.gallery[0]}" alt="${config.name}">
          <div class="trek-gallery-badge">
            <div class="trek-gallery-badge-icon" style="background: #00af87; display: flex; align-items: center; justify-content: center;">
              <svg class="icon-svg icon-sm icon-svg-fill" style="stroke: none; fill: white;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
            <div class="trek-gallery-badge-text">
              <span>Travelers' Choice</span>
              <span>Best of the Best 2026</span>
            </div>
          </div>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/${config.gallery[1]}" alt="Lo Manthang Walled City">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/${config.gallery[2]}" alt="Upper Mustang Cliff Sky Caves">
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/${config.gallery[3]}" alt="Tibetan Monastery in Mustang">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/${config.gallery[4]}" alt="Mustang Red Rock Canyons">
        </div>
      </div>`;
  html = html.replace(/<div class="trek-gallery-collage">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `${collage}</div>`);

  // 5. Key Trip Facts Grid
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Duration<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${config.durationDays} days$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Difficulty<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${config.diffWord}$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Max Altitude<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m=")[^"]*(">)[^<]*(<\/span>)/,
    `$1${config.maxAltM}$2${config.maxAltM.toLocaleString()} m (${Math.round(config.maxAltM * 3.28084).toLocaleString()} ft)$3`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Transport<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${config.transportFact}$2`);

  // 6. Highlights Container Replacement
  const highlightsHTML = `<div class="rich-highlights-container">
              <div style="border-left: 4px solid var(--color-copper-orange); padding-left: 14px; margin-bottom: 12px;">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--color-primary-navy); font-weight: 700;">${config.name} Highlights</h2>
              </div>
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                These are the extraordinary moments travelers cherish most — stepping through the gates of medieval Lo Manthang, exploring ancient cliffside sky caves, and discovering untouched Tibetan culture.
              </p>
              <div class="rich-highlights-grid">
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Ancient Walled City of Lo Manthang:</strong> Explore the medieval capital founded in 1380 AD, featuring the 4-story Royal Palace and ancient whitewashed alleys.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>2,500-Year-Old Cliff Sky Caves:</strong> Climb into the mysterious multi-level Jhong and Chhoser sky caves carved high into sheer vertical canyon walls.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Historic Tibetan Monasteries:</strong> Visit the 15th-century Jampa Gompa, Thubchen Gompa, and the legendary 8th-century Ghar Gompa founded by Guru Rinpoche.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Rain Shadow Desert Landscape:</strong> Experience wind-carved red clay canyons, dramatic gorges, and year-round dry trekking even during the summer monsoon.</div>
                </div>
              </div>
            </div>`;
  html = html.replace(/<div class="rich-highlights-container">[\s\S]*?<\/div>\s*<\/div>\s*<style>\s*\.why-book-container/, `${highlightsHTML}\n<style>\n.why-book-container`);

  // 7. Why Book Title
  html = html.replace(/Why Book the Everest Base Camp Trek with Igloo Himalaya Treks\?/, `Why Book the ${config.name} with Igloo Himalaya Treks?`);
  html = html.replace(/Guides who've worked the Khumbu for 6 to 7 years with us/, `Expert Mustang Sherpa & Loba Guides with Deep Local Connections`);

  // 8. Replace Itinerary Accordion
  const accordionHTML = buildItineraryAccordion(config.days);
  html = html.replace(/<div class="itinerary-timeline">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Map Section -->/,
    `<div class="itinerary-timeline">\n${accordionHTML}\n</div>\n</div>\n</div>\n<!-- Map Section -->`);

  // 9. Pricing Sidebar and Header
  html = html.replace(/<span class="price-value" style="font-size: 2\.2rem; font-weight: 800; color: var\(--color-primary-navy\); line-height: 1;">\$1,399<\/span>/g,
    `<span class="price-value" style="font-size: 2.2rem; font-weight: 800; color: var(--color-primary-navy); line-height: 1;">$${config.price}</span>`);
  html = html.replace(/<span style="font-size: 1\.8rem; font-weight: 800; color: var\(--color-primary-navy\);">\$1,399<\/span>/g,
    `<span style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-navy);">$${config.price}</span>`);

  // Clean any residual Everest/Lukla text
  html = html.replace(/Lukla/g, 'Jomsom');
  html = html.replace(/Namche Bazaar/g, 'Lo Manthang');
  html = html.replace(/Sagarmatha/g, 'Upper Mustang');
  html = html.replace(/Khumbu/g, 'Mustang');

  return html;
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------

// 1. Upper Mustang Trek (14 Days)
const trekDir = path.join(ROOT, 'trek', 'upper-mustang-trek');
ensureDir(trekDir);
const trekHTML = generatePackageHTML({
  name: "Upper Mustang Trek (14 Days)",
  title: "Upper Mustang Trek (14 Days) — Lo Manthang & Sky Caves — Igloo Himalaya Treks",
  metaDesc: "Explore the ancient walled kingdom of Lo Manthang on the 14-day Upper Mustang Trek. Discover Tibetan Buddhist monasteries, cliffside sky caves, and red rock canyons with certified guides.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/upper-mustang-trek/",
  mainImg: "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp",
  gallery: [
    "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang.webp",
    "upper-mustang-trek-cost-and-itinerary-lo-manthang-walled-city.webp",
    "upper-mustang-trek-cost-and-itinerary.webp",
    "upper-mustang-trek-journey-to-ancient-city-of-lo-manthang-02.webp",
    "upper-mustang.webp"
  ],
  pill: "Last Forbidden Himalayan Kingdom",
  leadText: "Step back into medieval Tibet on the classic Upper Mustang Trek. Journey across windswept high-desert plateaus into the ancient walled capital of Lo Manthang, exploring 2,500-year-old cliffside sky caves, centuries-old Buddhist monasteries, and vibrant Loba cultural heritage.",
  durationDays: 14,
  diffWord: "Moderate",
  diffDesc: "Rated Moderate. The trails are non-technical with daily walking of 5 to 6 hours. High desert wind in the afternoon is typical, and the maximum altitude is 3,840m (Lo Manthang) with pass crossings up to 4,010m.",
  maxAltM: 3840,
  transportFact: "Flight Pokhara–Jomsom + Private 4WD",
  price: "1,790",
  days: trekDays
});
fs.writeFileSync(path.join(trekDir, 'index.html'), trekHTML, 'utf8');
console.log('Updated trek/upper-mustang-trek/index.html');

// 2. Upper Mustang Jeep Tour (12 Days)
const jeepDir = path.join(ROOT, 'trek', 'upper-mustang-jeep-tour');
ensureDir(jeepDir);
const jeepHTML = generatePackageHTML({
  name: "Upper Mustang Jeep Tour (12 Days)",
  title: "Upper Mustang Jeep Tour (12 Days) — 4WD Overland Expedition — Igloo Himalaya Treks",
  metaDesc: "Embark on an overland 4WD Upper Mustang Jeep Tour to ancient Lo Manthang. Experience cliffside sky caves, Muktinath temple, and Tibetan culture with zero hiking strain.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/upper-mustang-jeep-tour/",
  mainImg: "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp",
  gallery: [
    "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal.webp",
    "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-02.webp",
    "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-03.webp",
    "upper-mustang-jeep-tour-12-days-to-lo-manthang-nepal-04.webp",
    "upper-mustang-jeep-tour.webp"
  ],
  pill: "4WD Overland Luxury Expedition",
  leadText: "Experience the magic of Upper Mustang without strenuous walking. Travel comfortably by private 4WD Toyota Land Cruiser or Scorpio through the deepest river gorge in the world directly to the walled capital of Lo Manthang, Chhoser sky caves, and sacred Muktinath.",
  durationDays: 12,
  diffWord: "Easy / Leisure",
  diffDesc: "Rated Easy to Moderate. 100% vehicle-based overland travel with short, scenic walking excursions to monasteries, palaces, and caves.",
  maxAltM: 3840,
  transportFact: "Private 4WD Land Cruiser / Scorpio",
  price: "1,990",
  days: jeepDays
});
fs.writeFileSync(path.join(jeepDir, 'index.html'), jeepHTML, 'utf8');
console.log('Created trek/upper-mustang-jeep-tour/index.html');

// Redirect stub for tour/upper-mustang-jeep-tour/
const tourJeepDir = path.join(ROOT, 'tour', 'upper-mustang-jeep-tour');
ensureDir(tourJeepDir);
const tourJeepStub = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to Upper Mustang Jeep Tour — Igloo Himalaya Treks</title>
  <link rel="canonical" href="https://igloohimalayatreks.com/trek/upper-mustang-jeep-tour/" />
  <meta http-equiv="refresh" content="0;url=/trek/upper-mustang-jeep-tour/">
  <script>window.location.replace('/trek/upper-mustang-jeep-tour/');</script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <p>Redirecting to <a href="/trek/upper-mustang-jeep-tour/">Upper Mustang Jeep Tour</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(tourJeepDir, 'index.html'), tourJeepStub, 'utf8');
console.log('Created tour/upper-mustang-jeep-tour/index.html stub');

// 3. Upper Mustang Tiji Festival Trek (15 Days)
const tijiDir = path.join(ROOT, 'trek', 'upper-mustang-tiji-festival');
ensureDir(tijiDir);
const tijiHTML = generatePackageHTML({
  name: "Upper Mustang Tiji Festival Trek (15 Days)",
  title: "Upper Mustang Tiji Festival Trek 2026 (15 Days) — Igloo Himalaya Treks",
  metaDesc: "Witness the sacred 3-day Tiji Festival inside the walled capital of Lo Manthang. Experience ancient Buddhist mask dances, royal rituals, and Upper Mustang wilderness.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/upper-mustang-tiji-festival/",
  mainImg: "upper-mustang-tiji-festival-spectacular-culture-rituals.webp",
  gallery: [
    "upper-mustang-tiji-festival-spectacular-culture-rituals.webp",
    "upper-mustang-tiji-festival-trek.webp",
    "upper-mustang-tiji-festival.webp",
    "upper-mustang-tiji-festival-03.webp",
    "upper-mustang-tiji-festival-04.webp"
  ],
  pill: "Sacred Cultural Mask Dance Festival",
  leadText: "Witness the most electrifying cultural event in the Himalayas. The annual 3-day Tiji Festival brings the royal courtyard of Lo Manthang alive with vibrant costumed mask dances, horn fanfares, and sacred rituals depicting the triumph of good over evil.",
  durationDays: 15,
  diffWord: "Moderate",
  diffDesc: "Rated Moderate. Includes 3 full days stationed in Lo Manthang for festival immersion, with steady 5 to 6-hour daily walking on approach and return.",
  maxAltM: 3840,
  transportFact: "Flight Pokhara–Jomsom + Private Transport",
  price: "2,190",
  days: tijiDays
});
fs.writeFileSync(path.join(tijiDir, 'index.html'), tijiHTML, 'utf8');
console.log('Created trek/upper-mustang-tiji-festival/index.html');
