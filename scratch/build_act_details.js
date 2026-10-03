const fs = require('fs');

const detailsCards = [
  {
    id: "accommodation",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M3 13h18"></path><circle cx="8" cy="9" r="1.5"></circle></svg>`,
    title: "Accommodation on the Annapurna Circuit Trek",
    content: `
      <p>On your 14-day Annapurna Circuit Trek, your accommodation transitions seamlessly from comfortable boutique city hotels to authentic mountain teahouses and rustic high-alpine stone lodges.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Hotels in Kathmandu & Lakeside Pokhara</h5>
      <p>In Kathmandu and Pokhara, we accommodate you in hand-picked 3-star boutique hotels (such as Hotel Moonlight or similar in Thamel, and Waterfront Resort or similar in Pokhara). Rooms are twin-sharing with en-suite modern bathrooms, hot running showers, free Wi-Fi, air conditioning, and daily breakfast included. Upgrades to 4-star or 5-star luxury heritage properties are available upon request.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Mountain Teahouses on the Circuit (Dharapani to Muktinath)</h5>
      <p>Throughout the trekking days, you stay in family-run Himalayan teahouses. In lower villages like Dharapani, Chame, and Upper Pisang, teahouses are constructed from local pine and slate, frequently offering private attached bathrooms, solar hot showers, and comfortable wooden beds. In Manang (3,540m), lodges offer higher-standard facilities including warm bakeries, espresso machines, and reliable charging.</p>
      <p>At high-altitude outposts such as Yak Kharka (4,050m) and Thorong Phedi / High Camp (4,450m–4,850m), facilities become more rustic due to extreme sub-zero alpine conditions. Bedrooms have two twin beds with foam mattresses and heavy blankets. Toilets here are shared (Western seated or squat). We provide clean -20°C four-season down sleeping bags so you remain completely warm throughout the coldest nights.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Heating and Social Common Rooms</h5>
      <p>Teahouse dining rooms serve as the warm social hub of every lodge. Every afternoon and evening, a central wood or dried-yak-dung stove is stoked, creating a toasty environment where trekkers dine, share trail stories, play card games, and charge devices.</p>
    `
  },
  {
    id: "food",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    title: "Available Food & Dining on Annapurna Circuit",
    content: `
      <p>The food along the Annapurna Circuit is widely regarded as the most diverse, fresh, and delicious of any trekking route in Nepal. Teahouse menus offer an impressive selection of hot, freshly cooked meals blending traditional Nepali staples, Tibetan specialties, and Western comfort favorites.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Traditional Nepalese & Himalayan Staples</h5>
      <p><strong>Dal Bhat Tarkari:</strong> The undisputed powerhouse of Himalayan trekking! Steamed white or brown rice served with rich lentil soup, spiced vegetable curry, fresh spinach (saag), and spicy pickled chutney. Best of all, Dal Bhat comes with unlimited free refills of rice, dal, and curry — living up to the famous sherpa saying: <em>"Dal Bhat Power, 24 Hour!"</em></p>
      <p><strong>Tibetan Specialties:</strong> Steamed and fried Momos (dumplings filled with vegetables, potatoes, or chicken), Thukpa (steaming hot noodle soup with fresh mountain greens), and hearty Sherpa Stew (Syakpa).</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Western & International Dishes</h5>
      <p>Lodge chefs are adept at preparing handmade pizzas, pasta with tomato garlic sauce, fried noodles (Chowmein), hashbrowns, porridge, pancakes, toast with honey/jam, and cheese omelets. You can also sample famous fresh apple pies and pastries in Manang and Marpha, baked using crisp apples harvested directly from local valley orchards.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Dietary Requirements & Safe Water</h5>
      <p>Vegetarian and vegan diets are exceptionally easy to cater for on the Annapurna Circuit, as the majority of local ingredients are plant-based. For meat, we recommend sticking to vegetarian options above Chame (2,670m), as all meat at higher elevations is transported on foot without refrigeration. We provide safe drinking water protocols and recommend using refillable bottles with purification tablets or SteriPEN.</p>
    `
  },
  {
    id: "best-time",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    title: "Best Time to Trek the Annapurna Circuit",
    content: `
      <p>The Annapurna Circuit can be trekked across distinct seasons, but the two primary trekking windows providing the safest pass conditions and clearest mountain panoramas are Autumn and Spring.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Autumn Season (Late September to Late November) — Peak Period</h5>
      <p>Autumn is the premier trekking window in the Annapurna Himalaya. Following the summer monsoon, the atmosphere is scrubbed clean, offering crystalline blue skies, crisp air, and peerless vistas of Annapurna I, II, III, IV, Dhaulagiri, and Manaslu. Daytime temperatures are delightfully mild for walking (14°C to 18°C in valleys), while night temperatures dip below freezing at Thorong Phedi (-5°C to -10°C). Trails are dry and Thorong La Pass is generally clear of heavy snow.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Spring Season (March to May) — Flowers & Warmer Days</h5>
      <p>Spring is the second golden season. Lower forests between Dharapani and Chame burst into brilliant bloom with crimson, pink, and white rhododendrons and wild orchids. Days are progressively longer and warmer, making the high crossing of Thorong La more comfortable. Mountain views are spectacular in the mornings, with occasional afternoon clouds that dissipate by nightfall.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Summer / Monsoon (June to August) & Winter (December to February)</h5>
      <p><strong>Monsoon:</strong> While lower sections (Besisahar to Dharapani) experience monsoon rains and muddy trails, the upper valley from Pisang through Manang, Thorong La, and Muktinath lies entirely within the Himalayan rain shadow behind the Annapurna range, remaining surprisingly arid.</p>
      <p><strong>Winter:</strong> December to February brings heavy snowfall over Thorong La Pass (5,416m), requiring microspikes/gaiters and flexible contingency days in case of pass closures due to blizzards.</p>
    `
  },
  {
    id: "typical-day",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    title: "A Typical Day on the Annapurna Circuit Trek",
    content: `
      <p>Daily life on the Annapurna Circuit follows a natural mountain rhythm that allows you to fully immerse yourself in the majestic landscape without feeling rushed.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Morning Routine (06:30 – 08:00)</h5>
      <p>You wake to fresh mountain air and towering peaks outside your window. After packing your main duffel bag (which your porter will transport), we meet in the heated lodge dining hall for a hearty breakfast — porridge, eggs, pancakes, muesli, or toast paired with hot ginger lemon tea or coffee. By 07:30 to 08:00, we hit the trail to take advantage of the calm morning weather and clearest summit views.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Morning Trek & Scenic Midday Lunch (08:00 – 13:00)</h5>
      <p>We hike at a steady, conversational pace ("bistari, bistari" in Nepali — slow and steady), stopping frequently for photos, suspension bridge crossings, and hydration breaks. Around 12:00, we stop at a picturesque trail settlement for an hour-long hot lunch freshly prepared at a local lodge.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Afternoon Arrival & Acclimatization Walks (13:00 – 17:00)</h5>
      <p>After lunch, we walk another 1.5 to 2.5 hours to reach our destination lodge by 14:30 or 15:30. After checking into your room, we often embark on an optional short acclimatization walk to a nearby viewpoint, chorten, or ancient monastery (e.g. Braga Gompa or Chongba Viewpoint), following the mountaineering rule: <em>"Walk high, sleep low."</em></p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Evening Dinner, Oximeter Check & Briefing (18:00 – 20:30)</h5>
      <p>We gather around the dining stove for dinner, followed by our complimentary evening fruit platter. Your lead guide checks your blood oxygen saturation (SpO2) and heart rate using a medical pulse oximeter, conducts a comprehensive briefing on tomorrow's trail conditions, elevation gain, and weather, and answers all questions before early bed.</p>
    `
  },
  {
    id: "permits",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    title: "Permits Required for Annapurna Circuit Trek",
    content: `
      <p>Entering the Annapurna Conservation Area requires official permits issued by the government of Nepal and the National Trust for Nature Conservation (NTNC). When you book with Igloo Himalaya Treks, we arrange, process, and pay for all permits in advance.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">1. Annapurna Conservation Area Project (ACAP) Permit</h5>
      <p>The ACAP entry permit is mandatory for all foreign nationals entering the Annapurna sanctuary and circuit regions. Revenue directly finances conservation initiatives, trail maintenance, local health posts, and sustainable forestry projects in the mountain communities. Cost: NPR 3,000 (~USD 25) per person.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">2. Trekkers' Information Management System (TIMS) Card</h5>
      <p>The TIMS card is administered jointly by the Nepal Tourism Board (NTB) and Trekking Agencies Association of Nepal (TAAN). It tracks trekker movements across official mountain checkpoints for safety and emergency search-and-rescue coordination. Cost: NPR 2,000 (~USD 17) per person.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Checkpoints & Documentation Needed</h5>
      <p>You will pass official security checkpoints at Besisahar, Dharapani, Chame, Manang, Muktinath, and Birethanti, where your guide presents your permits and logs your entry and exit. To arrange these permits before you land, all you need to provide us is a clear digital copy of your passport photo page and passport-sized portrait photos.</p>
    `
  },
  {
    id: "acclimatization",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    title: "Altitude Acclimatization & Safety on Thorong La",
    content: `
      <p>Crossing <strong>Thorong La Pass (<span data-altitude-m="5416">5,416 m / 17,769 ft</span>)</strong> is an extraordinary feat of endurance. Because atmospheric oxygen at this altitude is nearly 50% lower than at sea level, proper acclimatization is the single most critical factor in guaranteeing your safety and summit success.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Our Golden Acclimatization Profile</h5>
      <p>Unlike rushed itineraries that attempt Thorong La in 9 or 10 days, our 14-day schedule incorporates a gradual, medically sound elevation gain. We spend two full nights in the historic trading hub of <strong>Manang (3,540m)</strong>, allowing your body to generate the necessary red blood cells before venturing above 4,000 meters.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Active Rest Day Hikes in Manang</h5>
      <p>During our acclimatization day in Manang, we don't remain sedentary. We hike up to the Chongba Viewpoint, Gangapurna Glacial Lake, or the hermitage of Praken Gompa (4,000m) to receive a traditional blessing from the 100-year-old lama. We then descend back to Manang to sleep, stimulating optimal altitude adaptation.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Himalayan Rescue Association (HRA) Clinic</h5>
      <p>Manang is home to the world-renowned Himalayan Rescue Association (HRA) clinic staffed by volunteer Western and Nepali altitude doctors. Every afternoon at 15:00, the clinic hosts free altitude awareness lectures covering Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE).</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Daily Medical Monitoring & Diamox</h5>
      <p>Your lead guide conducts twice-daily pulse oximeter readings to track your oxygen saturation and pulse rate. If mild symptoms of altitude sickness develop (headache, nausea, insomnia), we adjust your hydration, slow your hiking pace, and discuss using Diamox (Acetazolamide). If severe symptoms appear, immediate descent is the only medical rule — our guides are trained to coordinate emergency descent without delay.</p>
    `
  },
  {
    id: "difficulty",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>`,
    title: "Difficulty & Physical Fitness Required for Annapurna Circuit",
    content: `
      <p>The 14-day Annapurna Circuit Trek is classified as <strong>Challenging / Strenuous</strong>. While it involves no technical climbing, ropes, or mountaineering equipment, it requires substantial cardiovascular stamina, strong leg muscles, and mental resilience.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Trail Distances & Daily Elevation Changes</h5>
      <p>Trekkers walk an average of 5 to 7 hours per day over varying terrain — from stone village staircases and forest pine trails to loose gravel scree and snow-packed slopes near Thorong La. The most demanding day is <strong>Day 9 (Pass Crossing Day)</strong>, which begins at 04:00 AM, ascends 966 meters to the pass (5,416m), and descends an intense 1,600 vertical meters to Muktinath over 8 to 9 hours.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Recommended Pre-Trip Training (8–12 Weeks Out)</h5>
      <p>To thoroughly enjoy your trek rather than simply endure it, we recommend beginning physical conditioning 2 to 3 months prior to departure:</p>
      <ul>
        <li><strong>Aerobic Cardio (3–4 days/week):</strong> Jogging, cycling, swimming, rowing, or stair-master sessions of 45–60 minutes to strengthen heart and lung efficiency.</li>
        <li><strong>Stair Climbing with Pack:</strong> Walking up and down multi-story building stairs or outdoor inclines carrying a daypack loaded with 6–8 kg.</li>
        <li><strong>Weekend Hill Hikes:</strong> Long 4 to 6-hour hikes on rough outdoor trails wearing the exact trekking boots you plan to bring to Nepal.</li>
      </ul>
    `
  },
  {
    id: "culture",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`,
    title: "Cultural Heritage: Gurung, Thakali, and Tibetan Buddhism",
    content: `
      <p>One of the supreme highlights of the Annapurna Circuit is that it is not solely a wilderness trek — it is a living anthropological corridor connecting ancient Buddhist, Bon, and Hindu Himalayan civilizations.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Lower Marsyangdi: Gurung & Magar Traditions</h5>
      <p>In the lush lower valleys around Dharapani, Bagarchhap, and Chame, the communities belong primarily to the Gurung and Magar ethnic groups. Renowned worldwide for their courage as British and Indian Army Gurkha soldiers, their villages feature slate-roofed houses, carved wooden balconies, and vibrant agricultural traditions.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Upper Manang: Tibetan Buddhist Culture & Ancient Gompas</h5>
      <p>Passing above Pisang into Manang, you enter the cultural realm of the Manangi people, who maintain deep spiritual ties to Tibet. Villages like Ghyaru, Ngawal, and Braga are centered around medieval cliffside monasteries (Gompas). <strong>Braga Gompa</strong>, dating back over 600 years, houses an extraordinary collection of ancient clay statues, Thankas, and gilded Buddhist scriptures.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Muktinath: Sacred Syncretism of Hindus and Buddhists</h5>
      <p>Descending Thorong La into Mustang brings you to <strong>Muktinath (<span data-altitude-m="3800">3,800m</span>)</strong> — one of the holiest pilgrimage shrines in Asia. Hindus revere Muktinath as <em>Muktidham</em> (the place of liberation/salvation), where pilgrims bathe under 108 sacred water spouts carved in the shape of bull heads. Tibetan Buddhists worship it as <em>Chumig Gyatsa</em> (Hundred Springs), home to Dakinis and a sacred eternal natural gas flame burning over a natural spring.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Thakali Culture & Hospitality in Marpha and Jomsom</h5>
      <p>Further down the Kali Gandaki, you enter the homeland of the Thakali people. Historically masters of the trans-Himalayan salt trade between Tibet and the plains of India, the Thakalis are celebrated across Nepal for their immaculate stone-paved towns, white-washed walls, and legendary culinary skills.</p>
    `
  },
  {
    id: "route-options",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon></svg>`,
    title: "Route Variants & NATT Trails (Avoiding Roads)",
    content: `
      <p>Many prospective trekkers ask whether the Annapurna Circuit is spoiled by recent dirt road construction in the lower valleys. The short answer is: <strong>not on our itinerary!</strong></p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">The NATT Bypass Footpaths</h5>
      <p>Following the construction of unpaved tracks, the Annapurna Conservation Area Project developed the <strong>Natural Annapurna Trekking Trails (NATT)</strong> — a network of dedicated walking trails marked with red-and-white or blue-and-white trail blazes that remain on the opposite bank of the river, entirely away from motorized vehicles.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">The Spectacular High Route: Ghyaru & Ngawal</h5>
      <p>Between Pisang and Manang, rather than taking the flat road through the valley floor, our itinerary takes the high panoramic trail via Ghyaru (3,730m) and Ngawal (3,680m). This high path provides the most sensational vantage points in the entire Annapurna range, looking straight across at the icefalls and glaciers of Annapurna II and IV, while simultaneously building superior high-altitude acclimatization.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Smart Overland Transfers</h5>
      <p>We use private 4WD vehicles to bypass the low, dusty commercial highways between Besisahar and Dharapani on the way up, and along the dusty Kali Gandaki corridor below Muktinath, maximizing your time on pure mountain footpaths.</p>
    `
  },
  {
    id: "transportation",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
    title: "Transportation & Roads: Kathmandu, Besisahar, Jomsom & Pokhara",
    content: `
      <p>Smooth, reliable logistics are essential for an effortless Annapurna Circuit experience. Here is exactly how ground and domestic transport operates on our 14-day itinerary:</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Kathmandu to Besisahar & Dharapani</h5>
      <p>On Day 2, we travel west from Kathmandu along the Prithvi Highway in a private tourist vehicle to Dumre and Besisahar (~5–6 hours). From Besisahar, we switch into a robust 4WD Mahindra or Toyota Scorpio mountain jeep. The jeep navigates the rugged cliffside road through the dramatic Marsyangdi canyon, crossing into Manang district to reach Dharapani (1,860m) by late afternoon, saving two full days of walking on dusty road.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Jomsom, Tatopani & Pokhara</h5>
      <p>After crossing Thorong La to Muktinath and Kagbeni, we arrive at Jomsom (2,720m). From Jomsom, we proceed down the dramatic Kali Gandaki valley via private 4WD / tourist vehicle to Tatopani hot springs and Pokhara, allowing you to witness the deepest gorge in the world without having to hike alongside road dust.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Optional Flight: Jomsom to Pokhara</h5>
      <p>For trekkers who prefer to shorten the overland journey, an optional 20-minute scenic mountain flight from Jomsom Airport (JMO) to Pokhara (PKR) is available as an upgrade, soaring right between the eight-thousand-meter giants Dhaulagiri and Annapurna.</p>
    `
  },
  {
    id: "age-groups",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    title: "Annapurna Circuit for Different Age Groups & Families",
    content: `
      <p>The Annapurna Circuit attracts a remarkably diverse demographic of mountain lovers — from adventurous solo backpackers in their twenties to active retirees in their sixties and seventies, as well as outdoor families with teenagers.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Teens & Young Adults (Ages 14–25)</h5>
      <p>Young trekkers usually possess excellent aerobic stamina and adapt swiftly to the daily physical exertion. The primary focus for this age group is maintaining self-discipline — avoiding the temptation to hike too fast uphill during the early days before altitude adaptation has caught up.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Mature Trekkers & Seniors (Ages 50–72)</h5>
      <p>Mature travelers often excel on the Annapurna Circuit because they naturally maintain a measured, rhythmic walking cadence and prioritize hydration and rest. With dedicated porter assistance carrying all heavy gear and our lead guide closely monitoring blood oxygen metrics, seniors with good baseline fitness and joint health achieve high success rates crossing Thorong La.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Families with Children</h5>
      <p>For families traveling with children under 14, we recommend customized private departures where daily walking stages are shortened, or considering the Poon Hill or Annapurna Base Camp routes which peak at lower elevations without the demanding 5,416m pass crossing.</p>
    `
  },
  {
    id: "extensions",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    title: "Trip Extensions: Tilicho Lake, Nar Phu & Poon Hill",
    content: `
      <p>The Annapurna region is a vast trekking playground with world-class route combinations that can easily be added to your classic Annapurna Circuit itinerary:</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">1. Sacred Tilicho Lake Detour (+3 Days)</h5>
      <p>From Manang, instead of proceeding directly to Yak Kharka, you take the side trail toward Khangsar and Tilicho Base Camp to reach <strong>Tilicho Lake (<span data-altitude-m="4919">4,919 m / 16,138 ft</span>)</strong> — one of the highest alpine glacial lakes on earth. Surrounded by the sheer glacial amphitheater of the Great Barrier, its turquoise ice waters provide an unforgettable expedition highlight.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">2. Restricted Nar & Phu Valleys (+5 to 7 Days)</h5>
      <p>From Koto (just before Chame), enter the mystical, restricted trans-Himalayan valleys of Nar and Phu. Home to authentic medieval Tibetan stone hamlets, snow leopard sanctuaries, and ancient Bon monasteries, this extension crosses the high Kang La Pass (5,306m) into Ngawal to rejoin the main circuit.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">3. Ghorepani Poon Hill & Annapurna Base Camp (Sanctuary)</h5>
      <p>After reaching Tatopani, you can continue trekking on foot into the lush rhododendron forests of Ghorepani to catch the sunrise over Dhaulagiri from <strong>Poon Hill (3,210m)</strong>, or ascend the Modi Khola river valley into the spectacular high-altitude amphitheater of <strong>Annapurna Base Camp (4,130m)</strong>.</p>
    `
  },
  {
    id: "porter-guidelines",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
    title: "Porter Guidelines, Fair Wages & Weight Limits",
    content: `
      <p>At Igloo Himalaya Treks, we believe ethical trekking starts with the dignity, safety, and fair compensation of our mountain crew. Without our porters, Himalayan expeditions would be impossible.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Strict Weight Limits (IPPG Standards)</h5>
      <p>We strictly comply with the guidelines set by the International Porter Protection Group (IPPG). Our porters carry a maximum of <strong>20 kg (44 lbs)</strong> total, which is divided between two trekkers (<strong>10 kg / 22 lbs per trekker</strong>). You carry only your light daypack (5–7 kg) containing your water, camera, rain layers, and personal valuables.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Fair Wages & Ethical Working Conditions</h5>
      <p>All our guides and porters receive above-industry-average living wages, comprehensive medical and accidental evacuation insurance, comfortable warm footwear, thermal mountain jackets, gloves, and guaranteed warm food and lodge accommodation on the trail. We never allow our staff to sleep in unheated outbuildings or carry overburdened loads.</p>
    `
  },
  {
    id: "helicopter-rescue",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    title: "Emergency Evacuation & Mountain Helicopter Rescue",
    content: `
      <p>While the Annapurna Circuit is a very safe route when walked with proper acclimatization, high-altitude mountain environments can be unpredictable. We maintain a foolproof emergency response network ready 24/7.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Designated Helicopter Landing Pads</h5>
      <p>Modern Airbus H125 (B3e) emergency rescue helicopters can land at designated mountain helipads along the circuit — including Chame, Pisang, Manang, Yak Kharka, Thorong Phedi, Muktinath, and Jomsom. Flights can evacuate a stricken trekker to an advanced tertiary hospital in Pokhara or Kathmandu in under 45 minutes.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Immediate 24/7 Operations Protocol</h5>
      <p>In the event of acute altitude illness (HAPE/HACE) or serious trauma, your lead guide immediately performs initial triage and contacts our Kathmandu operations desk via satellite phone or cellular emergency line. We dispatch an emergency helicopter immediately while your guide initiates downhill transport.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Mandatory Travel Insurance Requirements</h5>
      <p>All clients must hold a travel insurance policy that explicitly includes search-and-rescue coverage and emergency helicopter evacuation up to 5,500 meters. We handle all insurance paperwork, hospital admission reports, and rescue documentation on your behalf so you can focus entirely on recovery.</p>
    `
  },
  {
    id: "sustainability",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    title: "Sustainable & Responsible Trekking in ACAP",
    content: `
      <p>The Annapurna Conservation Area is Nepal's oldest and largest protected conservation zone, encompassing fragile alpine ecosystems, rare wildlife (such as snow leopards, blue sheep, and Himalayan monals), and delicate indigenous cultures.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Eliminating Single-Use Plastic Water Bottles</h5>
      <p>Discarded plastic bottles represent a major environmental hazard in the Himalaya. To combat this, ACAP has established community-run <strong>Safe Drinking Water Stations</strong> in villages like Dharapani, Chame, Pisang, Manang, and Muktinath. Here, UV-treated and filtered safe drinking water is dispensed into your reusable water bottle for a small fee, keeping hundreds of thousands of plastic bottles out of mountain gorges.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Leave No Trace Principles</h5>
      <p>We pack out all non-biodegradable waste generated by our expeditions. We urge trekkers to avoid littering, never pick wild flora or disturb wildlife, stay on marked footpaths to prevent soil erosion, and use lodge dining facilities that rely on solar power, electricity, or dried biomass rather than burning firewood.</p>
    `
  },
  {
    id: "guided-vs-independent",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>`,
    title: "Guided vs Independent Trekking on Annapurna Circuit",
    content: `
      <p>In April 2023, the Nepal Tourism Board (NTB) made it mandatory for all foreign trekkers in national parks and conservation areas across Nepal to be accompanied by a licensed government trekking guide.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Why a Licensed Guide is Essential on the Circuit</h5>
      <ul>
        <li><strong>Thorong La Safety & Weather Navigation:</strong> Winter snowstorms, sudden blizzards, and shifting trail scree above 5,000 meters require expert local mountain judgment. Your guide knows when it is safe to cross and when to hold back.</li>
        <li><strong>Guaranteed Lodge Rooms in High Season:</strong> In peak autumn and spring, lodges in Manang, Yak Kharka, and Thorong Phedi fill up rapidly. Independent trekkers frequently find themselves without beds. Our guides reserve the best rooms well in advance.</li>
        <li><strong>Cultural Bridge:</strong> Your guide introduces you to village elders, interprets Buddhist monastery murals, explains local ceremonies, and ensures respectful interaction with communities.</li>
        <li><strong>Emergency Management:</strong> In the rare event of severe altitude sickness, your guide instantly initiates downhill transport, administers first aid, and coordinates helicopter evacuation.</li>
      </ul>
    `
  },
  {
    id: "emergency-procedures",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    title: "Emergency Medical Support & Trail Safety Protocols",
    content: `
      <p>Safety is the bedrock of every Igloo Himalaya Treks expedition. We implement rigorous safety protocols throughout the entire Annapurna Circuit journey.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Wilderness First Aid Certification</h5>
      <p>Every lead guide on our team holds certification in Wilderness First Aid, Mountain Safety, and High Altitude Medicine from authorized mountaineering institutions. They carry a comprehensive medical kit stocked with altitude medication, broad-spectrum antibiotics, blister care, rehydration salts, and emergency splints.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Twice-Daily Pulse Oximeter Checks</h5>
      <p>Every morning before breakfast and every evening after dinner, your guide uses a medical fingertip pulse oximeter to record your Blood Oxygen Saturation (% SpO2) and resting pulse rate. By logging these metrics daily in your trek health log, your guide detects any abnormal acclimatization patterns long before symptoms become severe.</p>
    `
  },
  {
    id: "money-atms",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
    title: "Money, Currency Exchange & Trail ATMs",
    content: `
      <p>While your trekking package includes all core transport, permits, accommodation, and three meals daily on trek, you will need local cash (Nepalese Rupees - NPR) for personal incidental expenses along the trail.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Recommended Trail Budget</h5>
      <p>We recommend budgeting approximately <strong>NPR 3,500 to 4,500 (~USD 25 to 35) per person per day</strong> on the trail. This comfortably covers hot bucket showers ($2–$4), charging cameras/phones ($2–$3), lodge Wi-Fi cards ($2–$4), hot lemon ginger teas, specialty coffees, beers/cider in lower villages, and snacks.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">ATMs Along the Circuit</h5>
      <p><strong>Withdraw all your cash in Kathmandu or Pokhara before departure!</strong> While there is a bank ATM in Besisahar and Jomsom, and a seasonal ATM in Manang, mountain ATMs frequently run out of cash, suffer network power cuts, or reject foreign cards. Credit cards are NOT accepted at teahouses along the trail.</p>
    `
  },
  {
    id: "booking-process",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
    title: "Transparent Cost & Booking Process",
    content: `
      <p>Booking your Annapurna Circuit Trek with Igloo Himalaya Treks is simple, completely transparent, and 100% secure.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Step 1: Choose Your Dates or Request Custom Itinerary</h5>
      <p>Select one of our scheduled group departures or request a custom private itinerary tailored to your schedule, group size, and preferred pacing. You can contact us via our website booking form, email, or direct WhatsApp (+977 9800000000).</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Step 2: Confirm with a 20% Deposit</h5>
      <p>To secure your permits, vehicle reservations, and guide team, we require a 20% advance deposit. Deposits can be paid securely via international wire transfer or credit card (Visa, MasterCard, American Express). The remaining 80% balance is payable upon arrival in Kathmandu during your pre-trek briefing.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Flexible Rescheduling Policy</h5>
      <p>We understand that international travel plans can change. If your trip is disrupted by flight cancellations or personal emergencies, we offer fee-free date rescheduling up to 30 days prior to departure.</p>
    `
  },
  {
    id: "tipping",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    title: "Tipping Culture & Guidelines in Nepal",
    content: `
      <p>Tipping is not legally mandatory in Nepal, but it is deeply ingrained in the Himalayan mountaineering culture as an expression of gratitude for the tireless dedication, care, and physical exertion of your guide and porters.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">Recommended Benchmark</h5>
      <p>A fair industry benchmark for a 14-day Annapurna Circuit expedition is approximately <strong>10% to 15% of the total trek cost per trekker</strong>, pooled together and distributed amongst the mountain crew:</p>
      <ul>
        <li><strong>Lead Trekking Guide:</strong> USD 12 to 15 per day from the group.</li>
        <li><strong>Mountain Porters:</strong> USD 8 to 10 per day from the group (shared per porter).</li>
      </ul>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">The Tipping Ceremony</h5>
      <p>Tipping is traditionally presented on the final evening on the trail (at Jomsom or Pokhara) in individual envelopes during a celebration dinner, accompanied by heartfelt thanks.</p>
    `
  },
  {
    id: "essential-notes",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    title: "Critical Advice & Packing Tips for Annapurna Circuit",
    content: `
      <p>To ensure your Annapurna Circuit adventure is safe, comfortable, and memorable from start to finish, keep these vital insider tips in mind:</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">1. Break in Your Trekking Boots Early</h5>
      <p>Never start the Annapurna Circuit in brand-new boots! Wear your high-ankle, waterproof hiking boots on training walks weeks before landing in Nepal. Blisters on Day 3 can turn an unforgettable adventure into an ordeal.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">2. Master the Three-Layer Clothing System</h5>
      <p>You will experience temperatures ranging from +24°C in the subtropical foothills of Besisahar to -15°C at dawn on Thorong La Pass. Dress in breathable moisture-wicking merino base layers, an insulating fleece/down mid-layer, and a windproof/waterproof Gore-Tex outer shell.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">3. High-Altitude Eye & Sun Protection</h5>
      <p>UV radiation increases by 10-12% for every 1,000 meters of elevation. Always wear Category 3 or 4 UV-blocking sunglasses, broad-spectrum SPF 50+ sunscreen, and lip balm with zinc to prevent snow blindness and severe sunburn.</p>
      
      <h5 style="font-size: 1rem; color: var(--color-primary-navy); margin: 16px 0 8px 0; font-weight: 700;">4. Reliable Headlamp & Spare Lithium Batteries</h5>
      <p>Crossing Thorong La begins at 04:00 AM under total darkness. Bring a reliable headlamp with at least 300 lumens output, and carry spare lithium batteries kept in an inside pocket close to your body heat so they do not drain in sub-zero cold.</p>
    `
  }
];

function renderDetailsHtml() {
  const cardsHtml = detailsCards.map((item, idx) => {
    return `                <!-- Item ${idx + 1}: ${item.id} -->
                <div class="detail-accordion-card" data-detail-id="${item.id}">
                  <div class="detail-accordion-header">
                    <div class="detail-accordion-header-left">
                      <div class="detail-icon-container">
                        ${item.icon}
                        <div class="detail-check-bubble">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                      <h4 class="detail-accordion-title">${item.title}</h4>
                    </div>
                    <div class="detail-accordion-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div class="detail-accordion-content">
                    <div class="detail-accordion-content-inner">
${item.content.trim()}
                    </div>
                  </div>
                </div>\n\n`;
  }).join('');

  return `<section id="section-details" class="trek-detail-section">
            <div class="details-section-container">
              <!-- Heading -->
              <div class="details-title-wrapper">
                <h2 class="details-main-title">Read before you book: Annapurna Circuit Trek Knowledge Base</h2>
                <div style="width: 48px; height: 4px; background: var(--color-copper-orange); border-radius: 2px; margin-top: 8px;"></div>
              </div>

              <!-- Subtitle Paragraphs -->
              <p class="details-subtitle-text">To help you prepare and know exactly what to expect on your 14-day Annapurna Circuit journey, our senior Sherpa guides have compiled this comprehensive 21-topic knowledge guide covering trails, pass crossing, accommodation, permits, and packing.</p>
              <p class="details-subtitle-text" style="margin-bottom: 24px;">If you have any specific questions about physical fitness, high-altitude acclimatization, or customized departure dates, message our Himalayan specialists directly on <a href="https://wa.me/9779800000000" target="_blank">WhatsApp</a> or via email.</p>

              <!-- Interactive Progress Tracker Badge -->
              <div class="details-progress-wrapper">
                <div class="details-progress-badge">
                  <div class="details-progress-ring-box">
                    <svg width="44" height="44">
                      <circle class="details-progress-ring-bg" r="18" cx="22" cy="22"></circle>
                      <circle class="details-progress-ring-bar" r="18" cx="22" cy="22"></circle>
                    </svg>
                  </div>
                  <div class="details-progress-text-box">
                    <span class="details-progress-count">0/21 read</span>
                    <span class="details-progress-status">Nice start — keep going</span>
                  </div>
                </div>
              </div>

              <!-- Accordion List (21 Items) -->
              <div class="detail-accordion-list">
${cardsHtml}              </div>
            </div>
          </section>`;
}

const fullDetailsHtml = renderDetailsHtml();
console.log('Generated full 21-topic details, length:', fullDetailsHtml.length);

module.exports = {
  renderDetailsHtml
};
