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
                        <span>Trek/Travel time: ${d.duration}</span>
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
                        <img loading="lazy" src="../../images/${d.img2}" alt="${d.dest} scenery">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`).join('\n');
}

// -------------------------------------------------------------
// 1. DATA FOR LOWER DOLPO CIRCUIT TREK (18 DAYS)
// -------------------------------------------------------------
const lowerDolpoDays = [
  { day: 1, title: "Flight Kathmandu to Nepalgunj (150m)", dest: "Nepalgunj", altM: 150, duration: "50 min flight", acc: "Hotel in Nepalgunj", dist: "Flight", meals: "Breakfast", desc: "Board an afternoon flight from Kathmandu to the southwestern border city of Nepalgunj, gateway for flights into Dolpo. Check into hotel and review expedition logistics.", img1: "lower-dolpo-trek.webp", img2: "lower-dolpo-trek-02.webp" },
  { day: 2, title: "Morning Flight Nepalgunj to Juphal (2,475m) & Trek to Dunai", dest: "Dunai", altM: 2140, duration: "35 min flight + 3 hrs trek", acc: "Teahouse Lodge", dist: "8.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Thrilling early morning mountain flight to Juphal airstrip perched on a mountain shelf. Meet your trekking crew and trek downhill along the Thuli Bheri river valley to Dunai, the administrative center of Dolpa.", img1: "lower-dolpo-trek-03.webp", img2: "lower-dolpo-trek-04.webp" },
  { day: 3, title: "Trek Dunai to Chhepka (2,680m)", dest: "Chhepka", altM: 2680, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the turquoise Suli Gad river through lush mixed forests of pine, spruce, and bamboo. Enter Shey Phoksundo National Park at the Sulighat checkpoint and trek to the pleasant settlement of Chhepka.", img1: "lower-dolpo-trek-05.webp", img2: "lower-dolpo-trek.webp" },
  { day: 4, title: "Trek Chhepka to Jharana Hotel (3,110m)", dest: "Jharana", altM: 3110, duration: "5 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend past sparkling waterfalls and birch woodlands. Catch your first dramatic view of the 167-meter Suligad Waterfall (Nepal's highest) plunging out of Phoksundo Lake.", img1: "lower-dolpo-trek-02.webp", img2: "lower-dolpo-trek-03.webp" },
  { day: 5, title: "Trek Jharana to Ringmo & Turquoise Shey Phoksundo Lake (3,600m)", dest: "Ringmo / Phoksundo", altM: 3600, duration: "4 to 5 hours", acc: "Teahouse Lodge", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb through cedar forests to the crest of a ridge, revealing the legendary deep emerald-turquoise waters of Shey Phoksundo Lake. Continue to the ancient Bon Po village of Ringmo.", img1: "lower-dolpo-trek.webp", img2: "lower-dolpo-trek-04.webp" },
  { day: 6, title: "Exploration & Rest Day at Shey Phoksundo Lake", dest: "Ringmo / Phoksundo", altM: 3600, duration: "Day exploration", acc: "Teahouse Lodge", dist: "5 km", meals: "Breakfast, Lunch, Dinner", desc: "Visit the 900-year-old Tshowa Gompa (Bon Po monastery) on the eastern ridge overlooking the lake. Soak in the mirror-like turquoise reflection surrounded by sheer snow-capped cliffs.", img1: "lower-dolpo-trek-05.webp", img2: "lower-dolpo-trek-02.webp" },
  { day: 7, title: "Trek Ringmo along Lake Cliffs to Phoksundo Khola / Chunemba", dest: "Chunemba", altM: 3630, duration: "5 to 6 hours", acc: "Wilderness Camp", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Walk the famous cliffside trail featured in Eric Valli's movie 'Caravan' (Himalaya). The narrow path hangs dramatically above the deep waters, leading to the northern floodplains.", img1: "lower-dolpo-trek-03.webp", img2: "lower-dolpo-trek.webp" },
  { day: 8, title: "Trek Phoksundo Khola to Baga La High Camp / Danigar (4,630m)", dest: "Danigar", altM: 4630, duration: "6 to 7 hours", acc: "High Altitude Camp", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend through a narrow glacial canyon past alpine meadows and dwarf junipers to the foot of Baga La Pass. Prepare gear for tomorrow's 5,000m pass crossing.", img1: "lower-dolpo-trek-04.webp", img2: "lower-dolpo-trek-05.webp" },
  { day: 9, title: "Cross Baga La Pass (5,169m) and Descend to Pelung Tang (4,465m)", dest: "Pelung Tang", altM: 4465, duration: "6 to 7 hours", acc: "Wilderness Camp", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb steadily up the frozen scree to Baga La Pass (5,169m) for panoramic views of Kanjirowa massif and the arid Tibetan plateau. Descend into the deep valley of Pelung Tang.", img1: "lower-dolpo-trek-02.webp", img2: "lower-dolpo-trek.webp" },
  { day: 10, title: "Cross Numa La Pass (5,309m) and Descend to Dho Tarap (3,944m)", dest: "Dho Tarap", altM: 3944, duration: "7 to 8 hours", acc: "Heritage Lodge", dist: "14 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek to the highest point of the circuit atop Numa La (5,309m) with spectacular views stretching to Dhaulagiri I (8,167m). Descend into the sprawling, fertile high-altitude valley of Dho Tarap.", img1: "lower-dolpo-trek-03.webp", img2: "lower-dolpo-trek-04.webp" },
  { day: 11, title: "Acclimatization & Cultural Exploration in Dho Tarap Valley", dest: "Dho Tarap", altM: 3944, duration: "Cultural walk", acc: "Heritage Lodge", dist: "4 km", meals: "Breakfast, Lunch, Dinner", desc: "Explore the highest human settlement in the world. Visit Bon Po and Buddhist monasteries (Ribo Bhumpa and Shipchok Gompa) and observe traditional yak-caravan lifestyles.", img1: "lower-dolpo-trek.webp", img2: "lower-dolpo-trek-05.webp" },
  { day: 12, title: "Trek Dho Tarap down to Ghyamgar / Sisaul (3,755m)", dest: "Ghyamgar", altM: 3755, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the Tarap Khola through dramatic narrowing rock gorges. Cross stone bridges where cliff walls rise thousands of feet straight out of the roaring torrent.", img1: "lower-dolpo-trek-02.webp", img2: "lower-dolpo-trek-03.webp" },
  { day: 13, title: "Trek Ghyamgar to Nawarpani / Chhurwa (3,475m)", dest: "Nawarpani", altM: 3475, duration: "5 hours", acc: "Teahouse Lodge", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Continue descending through the deep canyon where sunlight touches the riverbed for only a few hours each day. Arrive at the sheltered campsite of Nawarpani.", img1: "lower-dolpo-trek-04.webp", img2: "lower-dolpo-trek.webp" },
  { day: 14, title: "Trek Nawarpani to Tarakot (2,540m)", dest: "Tarakot", altM: 2540, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Emerge from the gorge into the wide Bheri valley. Reach the fortress village of Tarakot, an ancient trading stronghold on the historic salt-caravan route.", img1: "lower-dolpo-trek-05.webp", img2: "lower-dolpo-trek-02.webp" },
  { day: 15, title: "Trek Tarakot to Dunai (2,140m)", dest: "Dunai", altM: 2140, duration: "5 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek alongside the Bheri River past terraced millet and buckwheat fields, returning to the lively district headquarters of Dunai.", img1: "lower-dolpo-trek-03.webp", img2: "lower-dolpo-trek.webp" },
  { day: 16, title: "Trek Dunai to Juphal (2,475m)", dest: "Juphal", altM: 2475, duration: "3 to 4 hours", acc: "Hotel in Juphal", dist: "8.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb the final switchbacks up from the riverbed to Juphal airstrip. Enjoy a farewell celebration dinner with your expedition guides and porters.", img1: "lower-dolpo-trek-04.webp", img2: "lower-dolpo-trek-05.webp" },
  { day: 17, title: "Morning Flights Juphal to Nepalgunj & Connecting Flight to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "35 min + 50 min flights", acc: "Hotel in Kathmandu", dist: "Flights", meals: "Breakfast", desc: "Fly through mountain valleys back to Nepalgunj and connect directly to Kathmandu. Transfer to your hotel for a long hot shower and well-deserved rest.", img1: "lower-dolpo-trek.webp", img2: "lower-dolpo-trek-02.webp" },
  { day: 18, title: "Final Departure from Kathmandu", dest: "Home", altM: 1400, duration: "Departure", acc: "Departure", dist: "Transfer", meals: "Breakfast", desc: "Private vehicle transfer to Tribhuvan International Airport for your international flight home.", img1: "lower-dolpo-trek-03.webp", img2: "lower-dolpo-trek.webp" }
];

// -------------------------------------------------------------
// 2. DATA FOR UPPER DOLPO & SHEY GOMPA EXPEDITION (24 DAYS)
// -------------------------------------------------------------
const upperDolpoDays = [
  { day: 1, title: "Flight Kathmandu to Nepalgunj (150m)", dest: "Nepalgunj", altM: 150, duration: "50 min flight", acc: "Hotel in Nepalgunj", dist: "Flight", meals: "Breakfast", desc: "Fly from Kathmandu to the southwestern plains of Nepalgunj near the Indian border. Evening preparation and team briefing for the Upper Dolpo expedition.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek.webp" },
  { day: 2, title: "Morning Flight Nepalgunj to Juphal (2,475m) & Trek to Dunai", dest: "Dunai", altM: 2140, duration: "35 min flight + 3 hrs trek", acc: "Teahouse Lodge", dist: "8.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Fly to Juphal and meet your wilderness pack crew. Trek through terraced fields along the Bheri River valley to Dunai.", img1: "upper-dolpo-trek-02.webp", img2: "upper-dolpo-trek-03.webp" },
  { day: 3, title: "Trek Dunai to Chhepka (2,680m)", dest: "Chhepka", altM: 2680, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Enter Shey Phoksundo National Park following the emerald Suli Gad river past cedar and walnut groves to Chhepka.", img1: "upper-dolpo-trek-04.webp", img2: "upper-dolpo-trek-05.webp" },
  { day: 4, title: "Trek Chhepka to Chunuwar / Jharana (3,110m)", dest: "Chunuwar", altM: 3110, duration: "5 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek through pine woods and take in views of the spectacular 167m Suligad waterfall cascading from the Phoksundo lake plateau.", img1: "upper-dolpo-trek.webp", img2: "upper-dolpo-trek-02.webp" },
  { day: 5, title: "Trek Chunuwar to Ringmo & Turquoise Shey Phoksundo Lake (3,600m)", dest: "Ringmo / Phoksundo", altM: 3600, duration: "4 to 5 hours", acc: "Teahouse Lodge", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend past the lake outlet to reveal the awe-inspiring turquoise jewel of Shey Phoksundo Lake and the ancient Bon Po village of Ringmo.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek-03.webp" },
  { day: 6, title: "Acclimatization & Cultural Exploration around Phoksundo Lake", dest: "Ringmo / Phoksundo", altM: 3600, duration: "Exploration day", acc: "Teahouse Lodge", dist: "5 km", meals: "Breakfast, Lunch, Dinner", desc: "Visit Tshowa Bon Gompa on the cliff edge. Acclimatize and absorb the mystical serenity of Nepal's deepest and most sacred trans-Himalayan lake.", img1: "upper-dolpo-trek-04.webp", img2: "upper-dolpo-trek-05.webp" },
  { day: 7, title: "Trek Phoksundo Lake to Phoksundo Khola / Pine Forest Camp (3,750m)", dest: "Phoksundo Khola", altM: 3750, duration: "5 to 6 hours", acc: "Wilderness Camp", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the iconic cliff-carved 'Demon's Path' along the western shore, entering the true wilderness beyond the lake basin into birch and pine flats.", img1: "upper-dolpo-trek.webp", img2: "upper-dolpo-trek-02.webp" },
  { day: 8, title: "Trek Phoksundo Khola to Kang La High Camp (4,100m)", dest: "Kang La High Camp", altM: 4100, duration: "5 to 6 hours", acc: "High Altitude Camp", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek up a glacial canyon into the true trans-Himalayan desert zone, camping beneath the sheer rock wall of Kang La Pass.", img1: "upper-dolpo-trek-03.webp", img2: "upper-dolpo-trek-04.webp" },
  { day: 9, title: "Cross Kang La Pass (5,360m) & Descend to Sacred Shey Gompa (4,160m)", dest: "Shey Gompa", altM: 4160, duration: "7 to 8 hours", acc: "Heritage Gompa Lodge / Camp", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek to the crux of the journey atop Kang La Pass (5,360m) with sweeping views of the Tibetan plateau. Descend to the legendary 11th-century Shey Gompa at the foot of Crystal Mountain.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek-05.webp" },
  { day: 10, title: "Sacred Pilgrimage Day at Shey Gompa & Crystal Mountain (Tsakang)", dest: "Shey Gompa", altM: 4160, duration: "Pilgrimage walk", acc: "Heritage Gompa Lodge / Camp", dist: "6 km", meals: "Breakfast, Lunch, Dinner", desc: "Explore the mystical red hermitage of Tsakang Gompa clinging to a vertical cliff face. Learn about the ancient kora around the quartz veins of Crystal Mountain.", img1: "upper-dolpo-trek.webp", img2: "upper-dolpo-trek-02.webp" },
  { day: 11, title: "Trek Shey Gompa to Namgong Gompa (4,360m) across Shey La Pass (5,010m)", dest: "Namgong Gompa", altM: 4360, duration: "6 hours", acc: "Wilderness Camp", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross the scenic Shey La Pass (5,010m) with views across the border into Tibet. Arrive at the red stone monastery of Namgong perched beside an alpine stream.", img1: "upper-dolpo-trek-03.webp", img2: "upper-dolpo-trek-04.webp" },
  { day: 12, title: "Trek Namgong Gompa to Saldang (3,770m)", dest: "Saldang", altM: 3770, duration: "4 to 5 hours", acc: "Traditional Homestay / Lodge", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Traverse dry clay slopes and descend to Saldang, the vibrant cultural and trade capital of northern Upper Dolpo with over 80 terraced stone houses.", img1: "upper-dolpo-trek-05.webp", img2: "upper-dolpo-trek.webp" },
  { day: 13, title: "Day Excursion to Yangjer Gompa (3,890m) — Northernmost Dolpo", dest: "Saldang", altM: 3770, duration: "Full day excursion", acc: "Traditional Homestay / Lodge", dist: "14 km roundtrip", meals: "Breakfast, Lunch, Dinner", desc: "Trek along the Nagon Khola to Yangjer Gompa, the wealthiest and most revered monastery in upper Dolpo, before returning to Saldang.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek-02.webp" },
  { day: 14, title: "Trek Saldang to Komash (4,060m)", dest: "Komash", altM: 4060, duration: "5 hours", acc: "Village Camp / Lodge", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the river gorge eastward through terraced barley fields and climb gently up to the high perch of Komash village.", img1: "upper-dolpo-trek-03.webp", img2: "upper-dolpo-trek-04.webp" },
  { day: 15, title: "Trek Komash to Shimen (3,885m) via Shimen La Pass (4,260m)", dest: "Shimen", altM: 3885, duration: "6 hours", acc: "Village Lodge / Camp", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross Shimen La Pass with views of snow leopards' native craggy bluffs. Descend past ancient chortens to the walled village of Shimen.", img1: "upper-dolpo-trek-05.webp", img2: "upper-dolpo-trek.webp" },
  { day: 16, title: "Trek Shimen to Tinje (4,110m)", dest: "Tinje", altM: 4110, duration: "5 hours", acc: "Teahouse / Camp", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the Panjyan Khola valley through broad open steppes past Sonam Gompa to Tinje, renowned for its ancient airstrip and salt-caravan yards.", img1: "upper-dolpo-trek-02.webp", img2: "upper-dolpo-trek-03.webp" },
  { day: 17, title: "Trek Tinje to Rakyo / Yak Kharka (4,600m)", dest: "Yak Kharka", altM: 4600, duration: "5 to 6 hours", acc: "High Altitude Camp", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek into high alpine grazing pastures where local nomads herd yaks and sheep beneath the shadow of Jeng La Pass.", img1: "upper-dolpo-trek-04.webp", img2: "upper-dolpo-trek-05.webp" },
  { day: 18, title: "Cross Jeng La Pass (5,110m) & Descend to Dho Tarap (3,944m)", dest: "Dho Tarap", altM: 3944, duration: "7 hours", acc: "Heritage Lodge", dist: "14 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend to Jeng La (5,110m) for sweeping views of the Dhaulagiri massif. Descend along the river to the green agricultural oasis of Dho Tarap.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek.webp" },
  { day: 19, title: "Exploration & Rest Day in Dho Tarap", dest: "Dho Tarap", altM: 3944, duration: "Village walk", acc: "Heritage Lodge", dist: "4 km", meals: "Breakfast, Lunch, Dinner", desc: "Rest day in the highest settlement valley. Visit ancient Bon and Tibetan Buddhist monasteries and observe daily traditional weaving and farming.", img1: "upper-dolpo-trek-02.webp", img2: "upper-dolpo-trek-03.webp" },
  { day: 20, title: "Trek Dho Tarap to Serkam / Nawarpani (3,475m)", dest: "Serkam", altM: 3475, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "14 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend into the towering Tarap Khola canyon where rock walls loom over the rushing glacial river.", img1: "upper-dolpo-trek-04.webp", img2: "upper-dolpo-trek-05.webp" },
  { day: 21, title: "Trek Serkam to Tarakot (2,540m)", dest: "Tarakot", altM: 2540, duration: "5 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek through the lower gorge to the historic fortress village of Tarakot on the Barbung Khola.", img1: "upper-dolpo-trek.webp", img2: "upper-dolpo-trek-02.webp" },
  { day: 22, title: "Trek Tarakot to Dunai (2,140m)", dest: "Dunai", altM: 2140, duration: "5 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the gentle river trail back into Dunai for a warm shower and market exploration.", img1: "upper-dolpo-trek-03.webp", img2: "upper-dolpo-trek-04.webp" },
  { day: 23, title: "Trek Dunai to Juphal (2,475m)", dest: "Juphal", altM: 2475, duration: "3 to 4 hours", acc: "Hotel in Juphal", dist: "8.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb up to Juphal for the final celebratory dinner with your Sherpa crew.", img1: "upper-dolpo-trek-05.webp", img2: "upper-dolpo-trek.webp" },
  { day: 24, title: "Morning Flights Juphal to Nepalgunj & Connecting Flight to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "Flights", acc: "Hotel in Kathmandu", dist: "Flights", meals: "Breakfast", desc: "Fly to Nepalgunj and onward to Kathmandu, carrying memories of the most remote corner of the Himalayas.", img1: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp", img2: "upper-dolpo-trek-02.webp" }
];

function generatePackageHTML(config) {
  let html = baseTemplate;

  // 1. Meta / Head
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${config.metaDesc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${config.canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${config.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${config.metaDesc}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${config.canonicalUrl}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="https://igloohimalayatreks.com/images/${config.mainImg}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${config.title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${config.metaDesc}">`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="https://igloohimalayatreks.com/images/${config.mainImg}">`);

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
        "touristType": ["Hikers", "Expeditioners", "Culture Enthusiasts"],
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
            "name": "What permits are required for Dolpo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${config.permitFAQ}"
            }
          },
          {
            "@type": "Question",
            "name": "How difficult is the ${config.name}?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${config.diffDesc}"
            }
          },
          {
            "@type": "Question",
            "name": "What is the best season for Dolpo trekking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Spring (April to May), Summer / Monsoon (June to August - Dolpo lies in the Himalayan rain shadow of Dhaulagiri and receives very little rain), and Autumn (September to November) are ideal."
            }
          }
        ]
      }
    ]
  }
  </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);

  // 3. Hero Section Title & Overview
  html = html.replace(/<span class="pill pill-copper">Everest Region • Classic Himalayan Expedition<\/span>/, `<span class="pill pill-copper">Dolpo Region • ${config.pill}</span>`);
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
          <img src="../../images/${config.gallery[1]}" alt="Shey Phoksundo Lake">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/${config.gallery[2]}" alt="High Trans-Himalayan Pass">
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/${config.gallery[3]}" alt="Dho Tarap Tibetan Village">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/${config.gallery[4]}" alt="Crystal Mountain Shey Gompa">
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
                These are the extraordinary moments travelers cherish most — the otherworldly turquoise hues of Shey Phoksundo Lake, high trans-Himalayan passes above 5,000m, and pre-Buddhist Bon culture untouched by time.
              </p>
              <div class="rich-highlights-grid">
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Turquoise Shey Phoksundo Lake (3,600m):</strong> Stand on the shores of Nepal's deepest, most mesmerizing alpine lake with zero aquatic life and crystal clarity.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>${config.passHighlightTitle}:</strong> ${config.passHighlightDesc}</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Ancient Bon Po & Buddhist Heritage:</strong> Visit 900-year-old Tshowa Gompa in Ringmo, circumambulate counter-clockwise in pre-Buddhist Bon fashion, and explore remote monasteries.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>True Wilderness Isolation:</strong> Experience genuine expedition conditions in Nepal's largest national park, home to the elusive Snow Leopard, Himalayan Blue Sheep, and Musk Deer.</div>
                </div>
              </div>
            </div>`;
  html = html.replace(/<div class="rich-highlights-container">[\s\S]*?<\/div>\s*<\/div>\s*<style>\s*\.why-book-container/, `${highlightsHTML}\n<style>\n.why-book-container`);

  // 7. Why Book Title
  html = html.replace(/Why Book the Everest Base Camp Trek with Igloo Himalaya Treks\?/, `Why Book the ${config.name} with Igloo Himalaya Treks?`);
  html = html.replace(/Guides who've worked the Khumbu for 6 to 7 years with us/, `Expert Dolpo Wilderness Guides with High Altitude & Wilderness First Aid Mastery`);

  // 8. Replace Itinerary Accordion
  const accordionHTML = buildItineraryAccordion(config.days);
  html = html.replace(/<div class="itinerary-timeline">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Map Section -->/,
    `<div class="itinerary-timeline">\n${accordionHTML}\n</div>\n</div>\n</div>\n<!-- Map Section -->`);

  // 9. Pricing Sidebar and Header
  html = html.replace(/\$1,299/g, `$${config.price}`);
  html = html.replace(/\$1,499/g, `$${config.price}`);
  html = html.replace(/<span class="price-value" style="font-size: 2\.2rem; font-weight: 800; color: var\(--color-primary-navy\); line-height: 1;">\$1,399<\/span>/g,
    `<span class="price-value" style="font-size: 2.2rem; font-weight: 800; color: var(--color-primary-navy); line-height: 1;">$${config.price}</span>`);
  html = html.replace(/<span style="font-size: 1\.8rem; font-weight: 800; color: var\(--color-primary-navy\);">\$1,399<\/span>/g,
    `<span style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-navy);">$${config.price}</span>`);

  // Clean any residual Everest/Lukla text
  html = html.replace(/Lukla/g, 'Juphal');
  html = html.replace(/Namche Bazaar/g, 'Ringmo');
  html = html.replace(/Sagarmatha/g, 'Shey Phoksundo');
  html = html.replace(/Khumbu/g, 'Dolpo');

  return html;
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------

// 1. Lower Dolpo Trek (18 Days)
const lowerDir = path.join(ROOT, 'trek', 'lower-dolpo-trek');
ensureDir(lowerDir);
const lowerHTML = generatePackageHTML({
  name: "Lower Dolpo Trek (18 Days)",
  title: "Lower Dolpo Circuit Trek (18 Days) — Shey Phoksundo & Numa La — Igloo Himalaya Treks",
  metaDesc: "Explore Nepal's wildest frontier on the 18-day Lower Dolpo Circuit Trek. Discover turquoise Shey Phoksundo Lake (3,600m), Bon Po monasteries, and cross Numa La Pass (5,309m).",
  canonicalUrl: "https://igloohimalayatreks.com/trek/lower-dolpo-trek/",
  mainImg: "lower-dolpo-trek.webp",
  gallery: [
    "lower-dolpo-trek.webp",
    "lower-dolpo-trek-02.webp",
    "lower-dolpo-trek-03.webp",
    "lower-dolpo-trek-04.webp",
    "lower-dolpo-trek-05.webp"
  ],
  pill: "High Pass Alpine Wilderness Circuit",
  leadText: "The Lower Dolpo Circuit is one of Nepal's most breathtaking adventure treks. Circumnavigate the jewel of western Nepal — crystal turquoise Shey Phoksundo Lake — and cross the high alpine passes of Numa La (5,309m) and Baga La (5,169m) into the remote trans-Himalayan Tibetan valley of Dho Tarap.",
  durationDays: 18,
  diffWord: "Challenging",
  diffDesc: "Rated Challenging. Requires high endurance for crossing two consecutive high passes above 5,000m (Numa La at 5,309m and Baga La at 5,169m) with sustained daily walking of 5 to 7 hours in remote terrain.",
  maxAltM: 5309,
  transportFact: "Flights (Nepalgunj–Juphal) + Airport Transfers",
  price: "1,990",
  permitFAQ: "Lower Dolpo requires the Lower Dolpo Restricted Area Permit ($20 USD per person/week) plus the Shey Phoksundo National Park Entry Permit. Solo trekking is prohibited; a minimum of two trekkers and a certified licensed guide are required.",
  passHighlightTitle: "High Pass Double Crossing (5,309m)",
  passHighlightDesc: "Cross Numa La (5,309m) and Baga La (5,169m) with panoramic sweeps of Dhaulagiri (8,167m) and the rugged Tibetan highlands.",
  days: lowerDolpoDays
});
fs.writeFileSync(path.join(lowerDir, 'index.html'), lowerHTML, 'utf8');
console.log('Created trek/lower-dolpo-trek/index.html');

// 2. Upper Dolpo Trek (24 Days)
const upperDir = path.join(ROOT, 'trek', 'upper-dolpo-trek');
ensureDir(upperDir);
const upperHTML = generatePackageHTML({
  name: "Upper Dolpo Trek (24 Days)",
  title: "Upper Dolpo Trek (24 Days) — Shey Gompa & Crystal Mountain — Igloo Himalaya Treks",
  metaDesc: "The pinnacle of Himalayan wilderness: 24-day Upper Dolpo Trek to Shey Gompa (4,160m), Kang La Pass (5,360m), and Shey Phoksundo Lake. Authentic trans-Himalayan expedition.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/upper-dolpo-trek/",
  mainImg: "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp",
  gallery: [
    "upper-dolpo-trek-remote-himalayan-adventure-in-nepal.webp",
    "upper-dolpo-trek.webp",
    "upper-dolpo-trek-02.webp",
    "upper-dolpo-trek-03.webp",
    "upper-dolpo-trek-04.webp"
  ],
  pill: "Ultimate Trans-Himalayan Expedition",
  leadText: "Journey into Peter Matthiessen's 'The Snow Leopard' kingdom on the legendary 24-day Upper Dolpo expedition. Cross Kang La Pass (5,360m) into the sacred sanctuary of Shey Gompa and Crystal Mountain, venturing across ancient Tibetan caravan trails and the turquoise waters of Shey Phoksundo Lake.",
  durationDays: 24,
  diffWord: "Strenuous",
  diffDesc: "Rated Strenuous. A high-altitude expedition across rugged, uncommercialized terrain crossing high passes (Kang La at 5,360m and Jeng La at 5,110m) with extended periods above 4,000 meters requiring high physical stamina.",
  maxAltM: 5360,
  transportFact: "Flights (Nepalgunj–Juphal) + Expedition Pack",
  price: "2,890",
  permitFAQ: "Upper Dolpo is a strictly regulated restricted area requiring the Special Upper Dolpo Permit ($500 USD per person for the first 10 days, plus $50/day thereafter) and Shey Phoksundo National Park permit. Minimum two registered trekkers accompanied by a licensed government guide.",
  passHighlightTitle: "Kang La Pass (5,360m) & Shey Gompa",
  passHighlightDesc: "Cross the dramatic snow pass of Kang La into the sacred Crystal Mountain sanctuary of Shey Gompa (4,160m), revered by pilgrims for centuries.",
  days: upperDolpoDays
});
fs.writeFileSync(path.join(upperDir, 'index.html'), upperHTML, 'utf8');
console.log('Created trek/upper-dolpo-trek/index.html');
