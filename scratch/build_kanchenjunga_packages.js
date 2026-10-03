const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Helper to ensure dir exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Read base template
const templatePath = path.join(ROOT, 'trek', 'everest-base-camp-trek', 'index.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

// Function to build an itinerary accordion HTML
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
// 1. DATA FOR KANCHENJUNGA CIRCUIT TREK (22 DAYS)
// -------------------------------------------------------------
const circuitDays = [
  { day: 1, title: "Fly Kathmandu to Bhadrapur & Drive to Phidim / Ilam", dest: "Phidim", altM: 1200, duration: "45 min flight + 5 hrs drive", acc: "Hotel / Teahouse", dist: "Overland", meals: "Breakfast, Lunch, Dinner", desc: "Board an early morning flight from Kathmandu to Bhadrapur in eastern Nepal with panoramic Himalayan vistas. Upon landing, meet your expedition crew and drive through the tea-cloaked rolling hills of Ilam and Phidim.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 2, title: "Drive Phidim to Taplejung & Sekathum", dest: "Sekathum", altM: 1640, duration: "6 to 7 hours drive", acc: "Teahouse Lodge", dist: "65 km 4WD drive", meals: "Breakfast, Lunch, Dinner", desc: "Navigate the winding mountain roads through Taplejung town and down toward the Kabeli and Tamor River confluence to Sekathum, the traditional trailhead into the Kanchenjunga Conservation Area.", img1: "kanchenjunga-circuit-trek-in-eastern-nepal.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp" },
  { day: 3, title: "Trek Sekathum to Amjilosa", dest: "Amjilosa", altM: 2498, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross dramatic suspension bridges over the thundering Ghunsa Khola. The trail ascends steeply along a narrow stone staircase cut into the rocky river gorge to reach the Tibetan-influenced village of Amjilosa.", img1: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp", img2: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp" },
  { day: 4, title: "Trek Amjilosa to Gyabla (Kyapra)", dest: "Gyabla", altM: 2725, duration: "5 hours", acc: "Teahouse Lodge", dist: "9.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Hike through lush temperate forests of bamboo, oak, and rhododendron. Pass cascading waterfalls and rocky bluffs before arriving at Gyabla, where alpine landscapes begin to open up.", img1: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-03.webp" },
  { day: 5, title: "Trek Gyabla to Ghunsa", dest: "Ghunsa", altM: 3415, duration: "5 to 6 hours", acc: "Mountain Lodge", dist: "11.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek along the river through Phale village, a historic Tibetan refugee settlement renowned for handcrafted carpets and antique monasteries. Continue ascending to Ghunsa, the main Sherpa trading hub of the valley.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 6, title: "Acclimatization & Exploration Day in Ghunsa", dest: "Ghunsa", altM: 3415, duration: "3 to 4 hours hike", acc: "Mountain Lodge", dist: "5 km", meals: "Breakfast, Lunch, Dinner", desc: "Vital acclimatization day. Take a hike up the southern ridge toward Yamatari Glacier and Lake for jaw-dropping views of Jannu and surrounding snow peaks before resting in Ghunsa's cozy lodges.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-04.webp", img2: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp" },
  { day: 7, title: "Trek Ghunsa to Kambachen", dest: "Kambachen", altM: 4145, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Enter the high alpine zone. The trail winds through larch forests and glacial debris, crossing scree slopes. Suddenly, the stupendous granite north face of Mount Jannu (7,710m) towers right in front of you.", img1: "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp", img2: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp" },
  { day: 8, title: "Acclimatization Hike at Kambachen (Jannu Base)", dest: "Kambachen", altM: 4145, duration: "3 to 4 hours hike", acc: "Teahouse Lodge", dist: "6 km", meals: "Breakfast, Lunch, Dinner", desc: "Acclimatization hike toward Jannu North Face Base Camp or along the Nupchu Khola valley. Monitor oxygen saturation levels with your guide to prepare for the high-altitude push to Pangpema.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp", img2: "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp" },
  { day: 9, title: "Trek Kambachen to Lhonak", dest: "Lhonak", altM: 4792, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek past lateral moraines of the Kanchenjunga Glacier. Cross a rocky glacial plateau to reach Lhonak, a desolate high-altitude settlement nestled beneath towering jagged peaks and glaciers.", img1: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp" },
  { day: 10, title: "Trek to Kanchenjunga North Base Camp (Pangpema, 5,143m) & Back to Lhonak", dest: "Lhonak", altM: 5143, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "10 km roundtrip", meals: "Breakfast, Lunch, Dinner", desc: "The apex of the northern route! Hike along the edge of Kanchenjunga Glacier to Pangpema (5,143m). Gaze in awe at the monumental North Face of Mount Kanchenjunga (8,586m) rising straight above before returning to Lhonak.", img1: "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-03.webp" },
  { day: 11, title: "Trek Lhonak down to Ghunsa", dest: "Ghunsa", altM: 3415, duration: "6 to 7 hours", acc: "Mountain Lodge", dist: "18 km", meals: "Breakfast, Lunch, Dinner", desc: "Retrace your footsteps downhill past Kambachen to Ghunsa. The descent restores energy and brings warmer air, rich oxygen, and the comfort of village teahouses.", img1: "kanchenjunga-circuit-trek-in-eastern-nepal.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-04.webp" },
  { day: 12, title: "Trek Ghunsa to Sele La High Camp", dest: "Sele La Camp", altM: 4290, duration: "5 hours", acc: "Rustic Teahouse", dist: "7 km", meals: "Breakfast, Lunch, Dinner", desc: "Leave the northern valley and head southeast into the high wilderness pass corridor. Ascend through stunted juniper and dwarf rhododendron forests to Sele La High Camp beneath rugged rocky towers.", img1: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp", img2: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp" },
  { day: 13, title: "Cross Sele La Pass (4,290m), Sinion La (4,440m) & Mirgin La (4,480m) to Tseram", dest: "Tseram", altM: 3868, duration: "7 to 8 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "An unforgettable pass-crossing day! Cross Sele La, Sinion La, and Mirgin La with panoramic sweeps of Makalu, Jannu, and Baruntse. Descend on steep trails to the southern river valley at Tseram.", img1: "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp", img2: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp" },
  { day: 14, title: "Trek Tseram to Ramche & Kanchenjunga South Base Camp (Oktang Viewpoint, 4,580m)", dest: "Tseram / Ramche", altM: 4580, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend past the snout of the Yalung Glacier to Ramche. Hike up to Oktang viewpoint to behold the immense South Face of Kanchenjunga and the dramatic frozen cirque before returning to Tseram for overnight.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp", img2: "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp" },
  { day: 15, title: "Trek Tseram down to Tortong (Torontan)", dest: "Tortong", altM: 2980, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend steadily following the Simbua Khola gorge through magnificent rhododendron, pine, and moss-draped Himalayan forests to the tranquil settlement of Tortong.", img1: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 16, title: "Trek Tortong to Yamphudin via Lasiya Bhanjyang (3,310m)", dest: "Yamphudin", altM: 1690, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "12.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb through dense forests up to Lasiya Bhanjyang Pass before dropping steeply down into the multi-ethnic village of Yamphudin, home to Gurung, Limbu, and Rai communities.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 17, title: "Trek Yamphudin to Khebang", dest: "Khebang", altM: 1910, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Traverse rolling green agricultural terraces, cardamom plantations, and traditional thatch-roofed farmhouses as you descend through eastern Nepal's vibrant agrarian foothills.", img1: "kanchenjunga-circuit-trek-in-eastern-nepal.webp", img2: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp" },
  { day: 18, title: "Trek Khebang to Khandembe / Meduwa", dest: "Khandembe", altM: 1420, duration: "5 hours", acc: "Teahouse / Homestay", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Enjoy your final day on foot hiking through subtropical valleys and traditional Limbu villages to meet the roadhead at Khandembe/Meduwa.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-03.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 19, title: "Drive Khandembe / Taplejung to Ilam Tea Gardens", dest: "Ilam", altM: 1600, duration: "6 to 7 hours drive", acc: "Hotel / Resort", dist: "110 km drive", meals: "Breakfast, Lunch, Dinner", desc: "Board private 4WD vehicles and drive through the tea-carpeted rolling hills of Ilam. Relax in comfortable hotel accommodations and enjoy fresh Himalayan green tea.", img1: "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp" },
  { day: 20, title: "Drive Ilam to Bhadrapur & Fly to Kathmandu", dest: "Kathmandu", altM: 1400, duration: "3 hrs drive + 45 min flight", acc: "Hotel in Kathmandu", dist: "Flight", meals: "Breakfast", desc: "Drive downhill to Bhadrapur Airport and take a scenic return flight to Kathmandu. Transfer to your hotel for a hot shower and evening celebratory dinner with your guide.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp", img2: "kanchenjunga-circuit-trek-in-eastern-nepal.webp" },
  { day: 21, title: "Reserve Buffer Day & Kathmandu Sightseeing", dest: "Kathmandu", altM: 1400, duration: "Flexible", acc: "Hotel in Kathmandu", dist: "City", meals: "Breakfast", desc: "Crucial contingency buffer day in case of weather delays in eastern Nepal. Enjoy optional sightseeing to UNESCO World Heritage Sites (Pashupatinath, Boudhanath, Swayambhunath).", img1: "kanchenjunga-circuit-trek-in-eastern-nepal.webp", img2: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure-02.webp" },
  { day: 22, title: "Final Departure from Kathmandu", dest: "Home", altM: 1400, duration: "Departure", acc: "Departure", dist: "Airport transfer", meals: "Breakfast", desc: "Transfer to Tribhuvan International Airport for your international flight home, carrying lifelong memories of the untamed Kanchenjunga wilderness.", img1: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp", img2: "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima.webp" }
];

// -------------------------------------------------------------
// 2. DATA FOR KANCHENJUNGA TREK WITHOUT FLIGHT (24 DAYS ROAD-BASED)
// -------------------------------------------------------------
const withoutFlightDays = [
  { day: 1, title: "Scenic 4WD Overland Drive Kathmandu to Ilam via BP Highway", dest: "Ilam", altM: 1600, duration: "8 to 9 hours drive", acc: "Hotel / Teahouse", dist: "380 km overland", meals: "Breakfast, Lunch, Dinner", desc: "Begin your 100% road-based expedition in a private 4WD jeep along the engineered BP Highway, crossing the Sun Koshi River into the eastern Terai and ascending the emerald tea hills of Ilam.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp", img2: "kanchenjunga-circuit-trek-without-flight.webp" },
  { day: 2, title: "Drive Ilam to Phidim, Taplejung & Sekathum", dest: "Sekathum", altM: 1640, duration: "6 to 7 hours drive", acc: "Teahouse Lodge", dist: "135 km 4WD", meals: "Breakfast, Lunch, Dinner", desc: "Drive through eastern Nepal's terraced hills to Taplejung and continue down to Sekathum at the confluence of the Tamor and Ghunsa rivers, resting before the trekking journey commences.", img1: "kanchenjunga-circuit-trek-without-flight-02.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" },
  { day: 3, title: "Trek Sekathum to Amjilosa", dest: "Amjilosa", altM: 2498, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "11 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross the Ghunsa Khola suspension bridge and follow the cascading river gorge uphill on stone steps through dense sub-tropical forests to the high perch of Amjilosa.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp", img2: "kanchenjunga-circuit-trek-without-flight-03.webp" },
  { day: 4, title: "Trek Amjilosa to Gyabla (Kyapra)", dest: "Gyabla", altM: 2725, duration: "5 hours", acc: "Teahouse Lodge", dist: "9.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Wander through tranquil bamboo groves and rhododendron forests alive with birdlife to reach Gyabla, enjoying hospitality in cozy local teahouses.", img1: "kanchenjunga-circuit-trek-without-flight.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp" },
  { day: 5, title: "Trek Gyabla to Ghunsa", dest: "Ghunsa", altM: 3415, duration: "5 to 6 hours", acc: "Mountain Lodge", dist: "11.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend to the riverbank and cross to Phale village, visiting the century-old Tibetan monastery, before gently climbing to the charming stone village of Ghunsa.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp", img2: "kanchenjunga-circuit-trek-without-flight-02.webp" },
  { day: 6, title: "Acclimatization Day at Ghunsa (Yamatari Ridge Hike)", dest: "Ghunsa", altM: 3415, duration: "3 to 4 hours hike", acc: "Mountain Lodge", dist: "5 km", meals: "Breakfast, Lunch, Dinner", desc: "Acclimatize in Ghunsa with a scenic ridge hike toward Yamatari Glacier, taking in panoramic views of Jannu and surrounding snow peaks.", img1: "kanchenjunga-circuit-trek-without-flight-03.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp" },
  { day: 7, title: "Trek Ghunsa to Kambachen", dest: "Kambachen", altM: 4145, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek past pine and larch forests over moraines. Mount Jannu (7,710m) reveals its towering granite north face as you approach Kambachen.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp", img2: "kanchenjunga-circuit-trek-without-flight.webp" },
  { day: 8, title: "Acclimatization Hike at Kambachen", dest: "Kambachen", altM: 4145, duration: "3 to 4 hours hike", acc: "Teahouse Lodge", dist: "6 km", meals: "Breakfast, Lunch, Dinner", desc: "Excursion toward Jannu base camp to aid physiological acclimatization before venturing higher into the glacier zone.", img1: "kanchenjunga-circuit-trek-without-flight-02.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" },
  { day: 9, title: "Trek Kambachen to Lhonak", dest: "Lhonak", altM: 4792, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Walk across lateral moraines of Kanchenjunga Glacier. Reach the wide glacial basin of Lhonak, surrounded by colossal Himalayan walls.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp", img2: "kanchenjunga-circuit-trek-without-flight-03.webp" },
  { day: 10, title: "Excursion to Kanchenjunga North Base Camp (Pangpema, 5,143m) & Back to Lhonak", dest: "Lhonak", altM: 5143, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Trek to Pangpema (5,143m) right in front of the colossal North Face of Kanchenjunga (8,586m) and Wedge Peak, returning to Lhonak for the night.", img1: "kanchenjunga-circuit-trek-without-flight.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" },
  { day: 11, title: "Trek Lhonak down to Ghunsa", dest: "Ghunsa", altM: 3415, duration: "6 to 7 hours", acc: "Mountain Lodge", dist: "18 km", meals: "Breakfast, Lunch, Dinner", desc: "Descend swiftly downhill through Kambachen back to the warmth and oxygen-rich pine forests of Ghunsa.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp", img2: "kanchenjunga-circuit-trek-without-flight-02.webp" },
  { day: 12, title: "Trek Ghunsa to Sele La High Camp", dest: "Sele La Camp", altM: 4290, duration: "5 hours", acc: "Rustic Teahouse", dist: "7 km", meals: "Breakfast, Lunch, Dinner", desc: "Ascend south toward the high pass trail through birch and juniper woods to Sele La High Camp.", img1: "kanchenjunga-circuit-trek-without-flight-03.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp" },
  { day: 13, title: "Cross Sele La (4,290m), Sinion La (4,440m) & Mirgin La (4,480m) to Tseram", dest: "Tseram", altM: 3868, duration: "7 to 8 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Cross the magnificent high pass trio with views extending to Makalu and Everest. Descend into the southern valley at Tseram.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp", img2: "kanchenjunga-circuit-trek-without-flight.webp" },
  { day: 14, title: "Trek Tseram to Ramche & Kanchenjunga South Base Camp (Oktang, 4,580m)", dest: "Tseram / Ramche", altM: 4580, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "12 km", meals: "Breakfast, Lunch, Dinner", desc: "Hike up alongside the Yalung Glacier to Oktang viewpoint for stunning vistas of Kanchenjunga's South Face and glacier.", img1: "kanchenjunga-circuit-trek-without-flight-02.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp" },
  { day: 15, title: "Trek Tseram to Tortong (Torontan)", dest: "Tortong", altM: 2980, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "13 km", meals: "Breakfast, Lunch, Dinner", desc: "Follow the Simbua Khola river valley down through serene forests of rhododendron and fir to Tortong.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp", img2: "kanchenjunga-circuit-trek-without-flight-03.webp" },
  { day: 16, title: "Trek Tortong to Yamphudin via Lasiya Bhanjyang (3,310m)", dest: "Yamphudin", altM: 1690, duration: "6 to 7 hours", acc: "Teahouse Lodge", dist: "12.5 km", meals: "Breakfast, Lunch, Dinner", desc: "Climb through forested ridges across Lasiya Bhanjyang Pass and descend into the vibrant multi-cultural village of Yamphudin.", img1: "kanchenjunga-circuit-trek-without-flight.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" },
  { day: 17, title: "Trek Yamphudin to Khebang", dest: "Khebang", altM: 1910, duration: "5 to 6 hours", acc: "Teahouse Lodge", dist: "10 km", meals: "Breakfast, Lunch, Dinner", desc: "Walk through fertile terraced hills and Limbu settlements surrounded by lush cardamom and ginger plantations.", img1: "kanchenjunga-circuit-trek-without-flight-02.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp" },
  { day: 18, title: "Trek Khebang to Khandembe / Meduwa", dest: "Khandembe", altM: 1420, duration: "5 hours", acc: "Teahouse / Homestay", dist: "9 km", meals: "Breakfast, Lunch, Dinner", desc: "Complete your trekking trek descending to the trailhead at Khandembe/Meduwa.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp", img2: "kanchenjunga-circuit-trek-without-flight.webp" },
  { day: 19, title: "Drive Khandembe / Taplejung to Ilam Tea Gardens", dest: "Ilam", altM: 1600, duration: "6 to 7 hours drive", acc: "Hotel / Resort", dist: "110 km 4WD", meals: "Breakfast, Lunch, Dinner", desc: "Board your private 4WD jeep for a scenic overland drive back to the tranquil tea estates of Ilam.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp", img2: "kanchenjunga-circuit-trek-without-flight-03.webp" },
  { day: 20, title: "Relax & Explore Ilam Tea Gardens & Kanyam", dest: "Ilam / Kanyam", altM: 1600, duration: "Leisure day", acc: "Hotel / Resort", dist: "Local explore", meals: "Breakfast, Lunch, Dinner", desc: "A well-deserved recovery day in the tea capital of Nepal. Tour tea factories, walk through Kanyam gardens, and soak in panoramic low-altitude vistas.", img1: "kanchenjunga-circuit-trek-without-flight.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp" },
  { day: 21, title: "Private 4WD Overland Drive Ilam to Sindhuli", dest: "Sindhuli", altM: 800, duration: "6 to 7 hours drive", acc: "Hotel in Sindhuli", dist: "240 km overland", meals: "Breakfast, Lunch, Dinner", desc: "Drive along the scenic East-West Highway into the historic hill town of Sindhuli, experiencing authentic Nepalese towns along the way.", img1: "kanchenjunga-circuit-trek-without-flight-02.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" },
  { day: 22, title: "Scenic Drive Sindhuli to Kathmandu via BP Highway", dest: "Kathmandu", altM: 1400, duration: "5 to 6 hours drive", acc: "Hotel in Kathmandu", dist: "140 km", meals: "Breakfast, Lunch", desc: "Conclude the overland road trip along the winding, scenic BP Highway through the Sun Koshi river valley, arriving back in Kathmandu.", img1: "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp", img2: "kanchenjunga-circuit-trek-without-flight.webp" },
  { day: 23, title: "Rest, Buffer & Celebration Day in Kathmandu", dest: "Kathmandu", altM: 1400, duration: "Flexible", acc: "Hotel in Kathmandu", dist: "City", meals: "Breakfast, Farewell Dinner", desc: "Full day in Kathmandu for shopping, souvenir hunting, resting, and enjoying a farewell cultural Nepali dinner with your expedition team.", img1: "kanchenjunga-circuit-trek-without-flight-03.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp" },
  { day: 24, title: "Final International Departure", dest: "Home", altM: 1400, duration: "Departure", acc: "Departure", dist: "Airport transfer", meals: "Breakfast", desc: "Private vehicle transfer to Tribhuvan International Airport for your return flight home.", img1: "kanchenjunga-circuit-trek-without-flight.webp", img2: "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp" }
];

// Helper to replace sections in HTML
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
        "touristType": ["Hikers", "Trekking Enthusiasts", "Remote Expeditioners"],
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
            "name": "How difficult is the ${config.name}?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rated Challenging to Strenuous due to the remote, wild nature of eastern Nepal, sustained daily walking of 5 to 7 hours, and crossing high mountain passes (Pangpema at 5,143m and Sele La / Mirgin La at 4,480m)."
            }
          },
          {
            "@type": "Question",
            "name": "What permits are required for Kanchenjunga?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Two permits are required: Kanchenjunga Restricted Area Permit (RAP) and Kanchenjunga Conservation Area Project (KCAP). Solo trekking is forbidden; a minimum of two registered trekkers accompanied by a certified licensed guide is strictly required."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best season for this trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Autumn (September to November) provides the clearest mountain panoramas and stable weather. Spring (March to May) features spectacular blooming rhododendron and magnolia forests across the lower valleys."
            }
          }
        ]
      }
    ]
  }
  </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);

  // 3. Hero Section Title & Overview
  html = html.replace(/<span class="pill pill-copper">Everest Region • Classic Himalayan Expedition<\/span>/, `<span class="pill pill-copper">Kanchenjunga Region • ${config.pill}</span>`);
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
          <img src="../../images/${config.gallery[1]}" alt="Eastern Nepal Himalayan Valley">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-top-right">
          <img src="../../images/${config.gallery[2]}" alt="Kanchenjunga Glacial Moraine">
          <button class="trek-gallery-see-all-btn">
            <span><svg class="icon-svg icon-xs icon-margin-right" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>See all photos</span>
          </button>
        </div>
        <div class="trek-gallery-sub">
          <img src="../../images/${config.gallery[3]}" alt="Mt Kanchenjunga High Peak">
        </div>
        <div class="trek-gallery-sub trek-gallery-sub-bottom-right">
          <img src="../../images/${config.gallery[4]}" alt="Sele La Pass High Himalayas">
        </div>
      </div>`;
  html = html.replace(/<div class="trek-gallery-collage">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `${collage}</div>`);

  // 5. Key Trip Facts Grid
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Duration<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${config.durationDays} days$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Difficulty<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1Challenging$2`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Max Altitude<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;" data-altitude-m=")[^"]*(">)[^<]*(<\/span>)/,
    `$15143$25,143 m (16,873 ft)$3`);
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Transport<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/,
    `$1${config.transportFact}$2`);

  // 6. Highlights Container Replacement
  const highlightsHTML = `<div class="rich-highlights-container">
              <div style="border-left: 4px solid var(--color-copper-orange); padding-left: 14px; margin-bottom: 12px;">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--color-primary-navy); font-weight: 700;">${config.name} Highlights</h2>
              </div>
              <p style="color: var(--color-neutral-600); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; max-width: 850px;">
                These are the authentic expedition moments our trekkers consistently praise — unmatched wilderness seclusion, dual base camps, and the giant towering face of Mount Kanchenjunga (8,586m).
              </p>
              <div class="rich-highlights-grid">
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>North & South Base Camps:</strong> Stand at Pangpema (5,143m) facing Kanchenjunga's sheer north face and Oktang viewpoint (4,580m) overlooking the south face and Yalung Glacier.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>High Pass Crossing:</strong> Traverse Sele La Pass (4,290m) and Mirgin La (4,480m) linking the two glacial valleys with panoramas of Jannu, Makalu, and Baruntse.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Mount Jannu (Kumbhakarna, 7,710m):</strong> Gaze in awe at one of the world's most daunting granite monoliths soaring directly over the Kambachen valley.</div>
                </div>
                <div class="rich-highlight-item">
                  <div class="rich-highlight-icon-wrapper"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg></div>
                  <div class="rich-highlight-content"><strong>Eastern Tea Gardens & Wilderness:</strong> Travel through the emerald green tea gardens of Ilam and Kanyam into uncommercialized mountain sanctuaries.</div>
                </div>
              </div>
            </div>`;
  html = html.replace(/<div class="rich-highlights-container">[\s\S]*?<\/div>\s*<\/div>\s*<style>\s*\.why-book-container/, `${highlightsHTML}\n<style>\n.why-book-container`);

  // 7. Why Book Title
  html = html.replace(/Why Book the Everest Base Camp Trek with Igloo Himalaya Treks\?/, `Why Book the ${config.name} with Igloo Himalaya Treks?`);
  html = html.replace(/Guides who've worked the Khumbu for 6 to 7 years with us/, `Expert Eastern Nepal Sherpa Guides with Decades of Experience`);

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
  html = html.replace(/Lukla/g, config.entryPoint);
  html = html.replace(/Namche Bazaar/g, 'Ghunsa');
  html = html.replace(/Sagarmatha/g, 'Kanchenjunga');
  html = html.replace(/Khumbu/g, 'Kanchenjunga');

  return html;
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------

// 1. Kanchenjunga Circuit Trek (22 Days)
const circuitDir = path.join(ROOT, 'trek', 'kanchenjunga-circuit-trek');
ensureDir(circuitDir);
const circuitHTML = generatePackageHTML({
  name: "Kanchenjunga Circuit Trek (22 Days)",
  title: "Kanchenjunga Circuit Trek (22 Days) — North & South Base Camp — Igloo Himalaya Treks",
  metaDesc: "Conquer the legendary Kanchenjunga Circuit Trek in eastern Nepal. Visit both North (Pangpema, 5,143m) & South Base Camps crossing Sele La Pass (4,290m) with certified Sherpa guides.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/kanchenjunga-circuit-trek/",
  mainImg: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp",
  gallery: [
    "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp",
    "kanchenjunga-circuit-trek-in-eastern-nepal.webp",
    "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp",
    "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp",
    "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp"
  ],
  pill: "Wilderness Circuit & High Passes",
  leadText: "The ultimate remote Himalayan expedition in eastern Nepal. Circumnavigate the massive massif of Mount Kanchenjunga (8,586m) — the world's 3rd highest peak — exploring both North Base Camp (Pangpema, 5,143m) and South Base Camp (Oktang, 4,580m) across the high alpine passes of Sele La and Mirgin La.",
  durationDays: 22,
  transportFact: "Flight to Bhadrapur + Private 4WD",
  price: "2,290",
  entryPoint: "Bhadrapur",
  days: circuitDays
});
fs.writeFileSync(path.join(circuitDir, 'index.html'), circuitHTML, 'utf8');
console.log('Created trek/kanchenjunga-circuit-trek/index.html');

// Also update trek/kanchenjunga-base-camp-trek/index.html with this authentic data so no broken EBC copy remains!
const baseCampDir = path.join(ROOT, 'trek', 'kanchenjunga-base-camp-trek');
ensureDir(baseCampDir);
const baseCampHTML = generatePackageHTML({
  name: "Kanchenjunga Base Camp Trek (22 Days)",
  title: "Kanchenjunga Base Camp Trek (22 Days) — North & South Base Camp — Igloo Himalaya Treks",
  metaDesc: "An epic expedition to both North (Pangpema, 5,143m) and South (Ramche, 4,580m) base camps of Mount Kanchenjunga (8,586m) in Nepal's wild eastern frontier.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/kanchenjunga-base-camp-trek/",
  mainImg: "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp",
  gallery: [
    "kanchenjunga-circuit-trek-nepal-remote-himalayan-adventure.webp",
    "kanchenjunga-circuit-trek-in-eastern-nepal.webp",
    "glacier-flow-seen-during-the-kanchenjunga-circuit-trekking-in-nepal-captured-by-igloo-hima-02.webp",
    "panoramic-view-of-snow-covered-himalayan-peaks-and-glacier-during-the-kanchenjunga-circuit.webp",
    "from-icy-glaciers-to-golden-forests-the-kanchenjunga-circuit-trek-offers-one-of-nepals-mos.webp"
  ],
  pill: "North & South Base Camp Expedition",
  leadText: "An epic expedition to both North (Pangpema, 5,143m) and South (Ramche, 4,580m) base camps of Mount Kanchenjunga (8,586m) in Nepal's wild eastern frontier.",
  durationDays: 22,
  transportFact: "Flight to Bhadrapur + Private 4WD",
  price: "2,290",
  entryPoint: "Bhadrapur",
  days: circuitDays
});
fs.writeFileSync(path.join(baseCampDir, 'index.html'), baseCampHTML, 'utf8');
console.log('Updated trek/kanchenjunga-base-camp-trek/index.html with authentic Kanchenjunga content');

// 2. Kanchenjunga Trek Without Flight (24 Days Road-Based)
const noFlightDir = path.join(ROOT, 'trek', 'kanchenjunga-trek-without-flight');
ensureDir(noFlightDir);
const noFlightHTML = generatePackageHTML({
  name: "Kanchenjunga Trek Without Flight (Road-Based 24 Days)",
  title: "Kanchenjunga Trek Without Flight (Road-Based 24 Days) — Igloo Himalaya Treks",
  metaDesc: "Experience the complete Kanchenjunga Circuit overland without domestic flights. 24-day flight-delay-free road expedition via Ilam tea gardens, Pangpema (5,143m), and Sele La Pass.",
  canonicalUrl: "https://igloohimalayatreks.com/trek/kanchenjunga-trek-without-flight/",
  mainImg: "kanchenjunga-trek-without-flight-scenic-overland-trek.webp",
  gallery: [
    "kanchenjunga-trek-without-flight-scenic-overland-trek.webp",
    "kanchenjunga-circuit-trek-without-flight.webp",
    "kanchenjunga-trek-without-flight-scenic-overland-trek-02.webp",
    "kanchenjunga-circuit-trek-without-flight-02.webp",
    "kanchenjunga-trek-without-flight-scenic-overland-trek-03.webp"
  ],
  pill: "100% Road-Based Overland Expedition",
  leadText: "100% flight-delay-free alternative to eastern Nepal's wilderness. Travel comfortably by private 4WD vehicle through the lush tea gardens of Ilam directly to the trailhead, circumnavigating both North (Pangpema, 5,143m) and South Base Camps with zero flight cancellation worries.",
  durationDays: 24,
  transportFact: "Private 4WD Overland (Zero Flights)",
  price: "2,190",
  entryPoint: "Kathmandu (Overland)",
  days: withoutFlightDays
});
fs.writeFileSync(path.join(noFlightDir, 'index.html'), noFlightHTML, 'utf8');
console.log('Created trek/kanchenjunga-trek-without-flight/index.html');

// 3. Redirect Stub for /trek/kanchenjunga-circuit-trek-nepal/
const redirectDir = path.join(ROOT, 'trek', 'kanchenjunga-circuit-trek-nepal');
ensureDir(redirectDir);
const redirectStubHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to Kanchenjunga Circuit Trek — Igloo Himalaya Treks</title>
  <link rel="canonical" href="https://igloohimalayatreks.com/trek/kanchenjunga-circuit-trek/" />
  <meta http-equiv="refresh" content="0;url=/trek/kanchenjunga-circuit-trek/">
  <script>
    window.location.replace('/trek/kanchenjunga-circuit-trek/');
  </script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <p>Redirecting to <a href="/trek/kanchenjunga-circuit-trek/">Kanchenjunga Circuit Trek</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(redirectDir, 'index.html'), redirectStubHTML, 'utf8');
console.log('Created trek/kanchenjunga-circuit-trek-nepal/index.html redirect stub');
