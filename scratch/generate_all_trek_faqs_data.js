const fs = require('fs');
const path = require('path');

function getTrekFaqData(slug, title, durationStr, altitudeStr, region) {
  const durNum = parseInt(durationStr) || 14;
  const isPeak = /climbing|peak/i.test(slug);
  const isLuxury = /luxury/i.test(slug);
  const isHeli = /heli/i.test(slug);
  const isRoadOnly = /without-flight|road-based|jeep/i.test(slug) ||
                     ['manaslu-circuit-trek', 'manaslu-circuit-trek-12-days', 'manaslu-tsum-valley-trek', 'tsum-valley-trek',
                      'langtang-valley-trek', 'langtang-gosaikunda-trek', 'langtang-gosaikunda-helambu-trek', 'gosaikunda-lake-trek',
                      'helambu-trek', 'tamang-heritage-trail-trek', 'tamang-heritage-trail-with-langtang-valley-trek', 'yala-peak-climbing',
                      'ruby-valley-trek', 'rolwaling-valley-trek', 'dhaulagiri-circuit-trek', 'chisapani-nagarkot-trek', 'pikey-peak-trek'].includes(slug);

  // Determine specific transport details
  let transportQ = "";
  let transportA = "";
  let luggageQ = "";
  let luggageA = "";
  let delayQ = "";
  let delayA = "";

  if (region === 'Everest') {
    if (isRoadOnly) {
      transportQ = `How do we reach the trailhead for ${title} without flying to Lukla?`;
      transportA = `We travel by private rugged 4WD Jeep from Kathmandu via the scenic BP Highway and Salleri to Tham Danda or Paiya (approx. 9–10 hours). This road-based journey completely avoids Lukla flight delays, offering stunning foothill landscapes and natural gradual acclimatization.`;
      luggageQ = `What is the luggage allowance for the road-based ${title}?`;
      luggageA = `Unlike flights with strict 15 kg restrictions, overland travel is much more flexible. We recommend packing up to 15–18 kg in your main duffel bag (carried by our porters) and carrying a comfortable 5–7 kg daypack with your daily essentials.`;
      delayQ = `Are road conditions safe between Kathmandu and the Solukhumbu trailhead?`;
      delayA = `We utilize experienced mountain chauffeurs and reliable 4WD vehicles (such as Toyota Land Cruiser or Mahindra Scorpio). Roads are paved up to Salleri with off-road sections thereafter. Our itinerary builds in generous timing to ensure a smooth, relaxed journey.`;
    } else if (isHeli) {
      transportQ = `Where do flights depart from, and how does the helicopter return work?`;
      transportA = `Outbound flights to Lukla depart from Kathmandu or Ramechhap (Manthali). After completing your trek to Gokyo Ri, you board an exclusive chartered helicopter directly from Gokyo (or Gorak Shep) back to Kathmandu, enjoying an unforgettable aerial panorama of Everest without the grueling return hike.`;
      luggageQ = `What is the luggage weight limit for Lukla flights and the helicopter?`;
      luggageA = `Domestic flights and helicopters strictly enforce a 15 kg (33 lbs) total weight limit per passenger (10 kg main duffel bag + 5 kg hand-carry daypack). Excess luggage can be securely stored free of charge at our Kathmandu hotel.`;
      delayQ = `What happens if flights to Lukla are delayed by weather?`;
      delayA = `Mountain weather can change rapidly. We monitor real-time forecasts, build contingency buffers into your schedule, and can arrange chartered helicopter flights if scheduled twin-otter planes are grounded due to low cloud cover.`;
    } else {
      transportQ = `Where do flights to Lukla depart from, and how long is the flight?`;
      transportA = `During peak trekking seasons (Spring: March–May; Autumn: September–November), civil aviation authorities schedule Lukla flights from Ramechhap Airport (Manthali), a 4-hour scenic drive from Kathmandu. In off-peak months, flights depart directly from Tribhuvan International Airport in Kathmandu. The flight duration is approximately 25–30 minutes.`;
      luggageQ = `What is the luggage weight limit for Lukla domestic flights?`;
      luggageA = `Domestic flights to Lukla strictly enforce a 15 kg (33 lbs) total weight limit per passenger (10 kg main duffel bag + 5 kg daypack). Excess weight incurs extra baggage fees or may need to be left behind, so we recommend packing light.`;
      delayQ = `What happens if the flight to or from Lukla is delayed by cloud cover?`;
      delayA = `Lukla's Tenzing-Hillary Airport operates under visual flight rules (VFR). If clouds temporarily obscure the runway, flights are held until visibility clears. We include contingency timing in our packages and can arrange shared emergency helicopter shuttles if required.`;
    }
  } else if (region === 'Annapurna') {
    transportQ = `How do we travel from Kathmandu to Pokhara and the Annapurna trailhead?`;
    transportA = `We provide comfortable tourist bus or private AC vehicle transfers between Kathmandu and Pokhara (approx. 6–7 hours), or you can upgrade to a quick 25-minute scenic domestic flight. From Pokhara, private 4WD jeeps transport you directly to trailheads such as Matque, Nayapul, Kande, or Besisahar.`;
    luggageQ = `What is the luggage allowance and what will porters carry?`;
    luggageA = `If flying between Kathmandu and Pokhara, the domestic allowance is 20 kg checked luggage + 7 kg carry-on. On the trail, our porters carry up to 15 kg per trekker in your main duffel bag, while you carry a small 20–30L daypack with your water, jacket, and camera.`;
    delayQ = `Are road transfers between Kathmandu and Pokhara reliable?`;
    delayA = `Yes. The Prithvi Highway connects Kathmandu and Pokhara. While ongoing highway upgrades can cause occasional delays, we travel in well-maintained private tourist vehicles with experienced drivers. Upgrading to a 25-minute domestic flight is always an option.`;
  } else if (region === 'Manaslu') {
    transportQ = `How do we reach the Manaslu trailhead at Machha Khola from Kathmandu?`;
    transportA = `We travel from Kathmandu to Machha Khola by private rugged 4WD Jeep (approx. 7–8 hours via Dhading Besi and Arughat). The drive follows paved highways before transitioning to mountain dirt roads along the Budhi Gandaki river.`;
    luggageQ = `What luggage weight should I prepare for the Manaslu Circuit?`;
    luggageA = `Because there are no domestic flights on Manaslu, luggage is carried by our dedicated porters or mules. We recommend keeping your duffel bag to 15 kg (33 lbs) to ensure our staff are treated fairly and ethically under IPPG guidelines.`;
    delayQ = `How do we return to Kathmandu after crossing the Larkya La Pass?`;
    delayA = `After descending from Larkya La to Bimthang and Dharapani, private 4WD jeeps transfer you to Besisahar, where you connect to private transport or a tourist vehicle back to Kathmandu (or onwards to Pokhara).`;
  } else if (region === 'Langtang') {
    transportQ = `How do we travel from Kathmandu to the Langtang trailhead?`;
    transportA = `We travel by private 4WD jeep or comfortable tourist vehicle from Kathmandu to Syabrubesi (approx. 6–7 hours via Trisuli Bazaar and Dhunche). For Helambu routes, the trail starts with a short 1-hour drive directly to Sundarijal on the northern valley rim.`;
    luggageQ = `What is the baggage limit for Langtang trekking?`;
    luggageA = `Your main gear is carried by our professional porters (up to 15 kg per trekker in a weather-resistant duffel bag). You only carry a light daypack with your water bottles, rain shell, warm fleece, sunscreen, and valuables.`;
    delayQ = `Are the mountain roads to Syabrubesi safe and accessible year-round?`;
    delayA = `Yes. The Pasang Lhamu Highway to Syabrubesi is a vital overland trade route to the Tibetan border. Roads are monitored and cleared regularly by highway crews. We always use robust vehicles with seasoned mountain drivers.`;
  } else if (region === 'Mustang') {
    transportQ = `How do we get to Upper Mustang from Kathmandu?`;
    transportA = `The journey starts with a scenic flight or drive to Pokhara, followed by an early morning 20-minute flight through the deep Kali Gandaki gorge between Annapurna and Dhaulagiri into Jomsom. Alternatively, a complete private 4WD overland expedition travels all the way from Pokhara to Lo Manthang.`;
    luggageQ = `What is the baggage allowance for Jomsom mountain flights?`;
    luggageA = `Flights between Pokhara and Jomsom enforce a strict 15 kg (33 lbs) total weight limit (10 kg duffel + 5 kg daypack). If you travel by private 4WD overland jeep, baggage capacity is substantially more relaxed.`;
    delayQ = `Why do flights between Pokhara and Jomsom only operate in the early morning?`;
    delayA = `High thermal winds gust through the Kali Gandaki canyon starting mid-morning. For flight safety, all STOL aircraft operate before 10:00 AM. In the rare event of afternoon wind delays, our team coordinates road transfers or rescheduled morning departures.`;
  } else if (region === 'Dolpo') {
    transportQ = `How do we reach remote Dolpo from Kathmandu?`;
    transportA = `We take a domestic flight from Kathmandu south to Nepalgunj (50 mins) in the western Terai, stay overnight, and board an early morning STOL mountain flight into Juphal Airstrip in Dolpa (35 mins), where our trekking crew and pack mules meet us.`;
    luggageQ = `What is the baggage limit for flights into Juphal (Dolpa)?`;
    luggageA = `Twin-otter mountain flights into Juphal strictly enforce a 15 kg total weight limit per passenger (10 kg check-in + 5 kg carry-on). Extra gear can be securely left at our hotel in Nepalgunj or Kathmandu.`;
    delayQ = `How are weather delays handled for western Nepal flights?`;
    delayA = `Juphal is an alpine airstrip nestled among towering ridges. Because flights depend on mountain clarity, we schedule built-in buffer days in our Dolpo itineraries to ensure seamless international connections.`;
  } else if (region === 'Kanchenjunga') {
    if (isRoadOnly) {
      transportQ = `How does the road-based overland journey to Kanchenjunga work?`;
      transportA = `We travel overland across eastern Nepal via the BP Highway and East-West Highway to the lush tea estates of Ilam and Kanyam, continuing by 4WD jeep up to Taplejung and Sekathum. This road trip showcases rural Nepal's diverse cultures and lush sub-tropical hills.`;
    } else {
      transportQ = `Where do flights depart for Kanchenjunga, and how do we reach the trailhead?`;
      transportA = `We fly from Kathmandu to Bhadrapur Airport in eastern Nepal (approx. 45 minutes), followed by a scenic private 4WD jeep drive through the tea-carpeted hills of Ilam to Taplejung and Sekathum to begin trekking.`;
    }
    luggageQ = `What baggage allowance applies to the Kanchenjunga trek?`;
    luggageA = `Domestic flights to Bhadrapur allow 20 kg checked luggage + 7 kg hand carry. On the trail, our porters carry up to 15 kg per person in your main duffel bag, leaving you free to hike with a comfortable daypack.`;
    delayQ = `Is Bhadrapur Airport subject to mountain weather cancellations?`;
    delayA = `No. Bhadrapur is located in the eastern plains (Terai) with modern instrument landing systems, making cancellations extremely rare compared to high-altitude mountain airstrips.`;
  } else if (region === 'Makalu-Barun') {
    transportQ = `How do we get to the Makalu Base Camp trailhead from Kathmandu?`;
    transportA = `We take a scheduled domestic flight from Kathmandu east to Tumlingtar Airport in the Arun Valley (35 mins), followed by a thrilling private 4WD jeep drive up to Num or Chichila along the Makalu ridge.`;
    luggageQ = `What is the luggage limit for Makalu domestic flights and porters?`;
    luggageA = `Domestic flights to Tumlingtar allow 15 kg total weight (10 kg duffel + 5 kg carry-on). Porters carry your 15 kg duffel bag on the trail, while you hike with a 5–6 kg daypack containing hydration, snacks, and extra layers.`;
    delayQ = `Are flights to Tumlingtar reliable?`;
    delayA = `Tumlingtar Airport sits at a comfortable elevation (518m) in a broad valley. Morning flights operate with high regularity throughout the Spring and Autumn trekking seasons.`;
  } else if (region === 'Dhaulagiri') {
    transportQ = `How do we travel to the Dhaulagiri Circuit trailhead?`;
    transportA = `We travel by private vehicle from Kathmandu to Pokhara and onwards to Beni and Darbang (approx. 8–9 hours total). The trek circuits around Mt. Dhaulagiri I and finishes in Marpha/Jomsom in the Kali Gandaki valley.`;
    luggageQ = `What luggage guidelines apply to the strenuous Dhaulagiri expedition?`;
    luggageA = `Because Dhaulagiri involves crossing glaciers and camping at High Camp, our expedition crew and porters carry all heavy camping gear, food supplies, and your 15 kg personal duffel bag. You carry a sturdy alpine daypack.`;
    delayQ = `How do we return to Kathmandu after completing the Dhaulagiri Circuit?`;
    delayA = `Upon reaching Jomsom or Marpha, you can take a quick 20-minute flight to Pokhara or travel by private 4WD jeep along the Kali Gandaki highway back to Pokhara and Kathmandu.`;
  } else if (region === 'Rara / Karnali') {
    transportQ = `How do we reach remote Rara Lake from Kathmandu?`;
    transportA = `We fly from Kathmandu to Nepalgunj, stay overnight, and board a connecting morning flight to Talcha Airport in Mugu (or Jumla). From Talcha, a gentle 2-hour walk brings you to the pristine shores of Rara Lake. Overland 4WD jeep options via the Karnali Highway are also available.`;
    luggageQ = `What baggage allowance applies for flights to Talcha / Jumla?`;
    luggageA = `Flights to Talcha strictly enforce a 15 kg total weight limit per person (10 kg duffel + 5 kg daypack). If traveling on our overland 4WD tour, baggage limits are flexible.`;
    delayQ = `What happens if weather delays the flight between Nepalgunj and Talcha?`;
    delayA = `Flights operate early morning before winds pick up. If weather delays occur, flights are prioritized for the next clear window, and our team handles all local logistics and comfortable transit lodging in Nepalgunj.`;
  } else if (region === 'Ganesh Himal / Ruby Valley') {
    transportQ = `How do we travel to Ruby Valley from Kathmandu?`;
    transportA = `We travel by private 4WD jeep from Kathmandu through Trisuli Bazaar to Syabrubesi or Bhalche (approx. 5–6 hours). From the trailhead, we begin ascending toward Pangsang Pass overlooking the Ganesh Himal.`;
    luggageQ = `What is the baggage allowance for Ruby Valley trekking?`;
    luggageA = `Porters carry your 15 kg duffel bag between homestays. You only need a comfortable daypack with your drinking water, windbreaker, camera, and personal essentials.`;
    delayQ = `Are road connections to Ruby Valley reliable?`;
    delayA = `Yes. We use rugged 4WD vehicles equipped for rural mountain roads, with experienced local drivers familiar with the terrain.`;
  } else if (region === 'Kathmandu Valley Rim') {
    transportQ = `How do we travel to the start of the Chisapani Nagarkot trek?`;
    transportA = `We pick you up directly from your hotel in Kathmandu and drive 45 minutes to 1 hour to Sundarijal on the northern edge of Kathmandu Valley, where the trail begins entering Shivapuri National Park.`;
    luggageQ = `What should I pack for this short 3-day trek?`;
    luggageA = `You only need a lightweight backpack with comfortable walking clothes, a warm fleece or light down jacket for cool Nagarkot mornings, a rain shell, and personal toiletries. Heavy luggage can be safely stored at your Kathmandu hotel.`;
    delayQ = `How do we return to Kathmandu from Nagarkot?`;
    delayA = `After watching the sunrise over the Himalayas from Nagarkot and visiting the ancient UNESCO World Heritage temple of Changunarayan, our private AC vehicle transfers you smoothly back to your Kathmandu hotel (approx. 1 hour).`;
  } else if (region === 'Lower Solukhumbu') {
    transportQ = `How do we reach the trailhead for Pikey Peak from Kathmandu?`;
    transportA = `We travel by private 4WD Jeep from Kathmandu via the scenic BP Highway and Okhaldhunga to Dhap or Jhapre (approx. 7–8 hours). This overland journey completely eliminates the need for expensive domestic mountain flights.`;
    luggageQ = `What is the baggage allowance for the Pikey Peak trek?`;
    luggageA = `Our porters carry up to 15 kg per trekker in your main duffel bag. You carry a lightweight 20–25L daypack for your camera, water bottle, extra layers, and sunscreen.`;
    delayQ = `Are there any flight cancellation risks on the Pikey Peak trek?`;
    delayA = `None! Pikey Peak is an overland road-based trek. Because there are no domestic mountain flights involved, your schedule is never disrupted by mountain airport closures or cloud delays.`;
  }

  // Determine Permits Q&A
  let permitsQ = `What permits are required for the ${title}?`;
  let permitsA = "";
  if (region === 'Everest') {
    permitsA = `You need two main permits: the Sagarmatha National Park Entry Permit and the Khumbu Pasang Lhamu Rural Municipality Permit. If climbing Island Peak, Lobuche, or Mera Peak, an official NMA Climbing Permit and refundable garbage deposit are also required. All permits are 100% arranged and included by Igloo Himalaya Treks.`;
  } else if (region === 'Annapurna') {
    if (slug.includes('nar-phu')) {
      permitsA = `You need the Nar Phu Restricted Area Permit (RAP - $100 USD/week in Autumn, $75 USD in Spring/Winter), the Annapurna Conservation Area Project (ACAP) permit, and a TIMS card. All permits are fully handled and included in our package.`;
    } else {
      permitsA = `You need two permits: the Annapurna Conservation Area Project (ACAP) permit and the Trekkers' Information Management System (TIMS) card. Both permits are 100% arranged and included in your package by Igloo Himalaya Treks.`;
    }
  } else if (region === 'Manaslu') {
    if (slug.includes('tsum')) {
      permitsA = `You need four permits: the Manaslu Restricted Area Permit (RAP), the Tsum Valley Restricted Area Permit, the Manaslu Conservation Area Project (MCAP) permit, and the Annapurna Conservation Area Project (ACAP) permit for the Dharapani exit. All permits are 100% included and processed by our team.`;
    } else {
      permitsA = `You need three main permits: the Manaslu Restricted Area Permit (RAP), the Manaslu Conservation Area Project (MCAP) permit, and the Annapurna Conservation Area Project (ACAP) permit (required as the trek exits through Dharapani into the Annapurna region). All permits are fully arranged and included in our tour price.`;
    }
  } else if (region === 'Langtang') {
    if (isPeak) {
      permitsA = `You need the NMA Yala Peak Climbing Permit, the Langtang National Park Entry Permit, a TIMS card, and the mountaineering garbage deposit. All official paperwork is 100% arranged by Igloo Himalaya Treks.`;
    } else if (slug.includes('helambu') || slug.includes('chisapani')) {
      permitsA = `You need the Langtang National Park Entry Permit, the Shivapuri Nagarjun National Park Permit, and a TIMS card. All permits are arranged and included by our team.`;
    } else {
      permitsA = `You need the Langtang National Park Entry Permit and the Trekkers' Information Management System (TIMS) card. Both permits are fully arranged and included in our package.`;
    }
  } else if (region === 'Mustang') {
    if (slug.includes('upper-mustang')) {
      permitsA = `You need the Special Restricted Area Permit (RAP) for Upper Mustang ($500 USD per person for the first 10 days + $50 per day thereafter) and the Annapurna Conservation Area Project (ACAP) permit. Both permits are 100% organized and included in our package price.`;
    } else {
      permitsA = `You need the Annapurna Conservation Area Project (ACAP) permit and the Trekkers' Information Management System (TIMS) card. Both permits are 100% arranged and included by our team.`;
    }
  } else if (region === 'Dolpo') {
    if (slug.includes('upper-dolpo')) {
      permitsA = `You need the Upper Dolpo Special Restricted Area Permit (RAP - $500 USD per person for 10 days + $50/day thereafter) and the Shey Phoksundo National Park Entry Permit. All official government permits are 100% handled and included in your package.`;
    } else {
      permitsA = `You need the Lower Dolpo Restricted Area Permit (RAP - $20 USD per person per week) and the Shey Phoksundo National Park Entry Permit. Both are included and arranged by our team.`;
    }
  } else if (region === 'Kanchenjunga') {
    permitsA = `You need the Kanchenjunga Restricted Area Permit (RAP - $20 USD per person per week for the first 4 weeks) and the Kanchenjunga Conservation Area Project (KCAP) permit. All permits are 100% arranged and included by Igloo Himalaya Treks.`;
  } else if (region === 'Makalu-Barun') {
    permitsA = `You need the Makalu Barun National Park Entry Permit and a TIMS card. Both permits are 100% handled and included in our package.`;
  } else if (region === 'Dhaulagiri') {
    permitsA = `You need the Annapurna Conservation Area Project (ACAP) permit and a TIMS card. Both permits are arranged and included in our package.`;
  } else if (region === 'Rara / Karnali') {
    permitsA = `You need the Rara National Park Entry Permit and a TIMS card. Both permits are arranged and included in our package price.`;
  } else if (region === 'Ganesh Himal / Ruby Valley') {
    permitsA = `You need the Langtang National Park Permit and/or TIMS card depending on the specific trail entry point. All required passes are included in our tour fee.`;
  } else if (region === 'Kathmandu Valley Rim') {
    permitsA = `You need the Shivapuri Nagarjun National Park entry permit and the Bhaktapur/Nagarkot municipal entry pass. All fees are 100% included in the tour price.`;
  } else if (region === 'Lower Solukhumbu') {
    permitsA = `You need the local Gauri Shankar / Solukhumbu community entrance permit and TIMS registration. All permits are arranged and included by our team.`;
  }

  // Determine Highlights Q&A
  let highlightsQ = `What are the key scenic and cultural highlights of the ${title}?`;
  let highlightsA = "";
  if (region === 'Everest') {
    if (isPeak) {
      highlightsA = `Highlights include standing on the summit of ${title.split('(')[0].trim()} with 360-degree views of Everest, Lhotse, Makalu, and Ama Dablam; crossing glaciated terrain with fixed ropes; visiting Everest Base Camp and Kala Patthar; and experiencing Sherpa mountain culture in Namche Bazaar and Tengboche Monastery.`;
    } else if (slug.includes('three-passes')) {
      highlightsA = `Highlights include crossing three formidable 5,300m+ high passes (Kongma La, Cho La, and Renjo La), visiting Everest Base Camp, standing on Kala Patthar (5,545m) and Gokyo Ri (5,357m), and gazing over the six sacred turquoise Gokyo Lakes and Ngozumpa Glacier.`;
    } else if (slug.includes('gokyo')) {
      highlightsA = `Highlights include the six emerald Gokyo Glacial Lakes, ascending Gokyo Ri (5,357m) for an iconic sunrise panorama of four 8,000m giants (Everest, Lhotse, Makalu, Cho Oyu), hiking alongside Ngozumpa Glacier (the longest in the Himalayas), and exploring vibrant Sherpa settlements.`;
    } else {
      highlightsA = `Highlights include standing at Everest Base Camp (5,364m) beneath the Khumbu Icefall, watching the sunrise over Mt. Everest from Kala Patthar (5,545m), visiting the historic Tengboche Monastery, crossing high suspension bridges, and immersing yourself in Sherpa heritage at Namche Bazaar.`;
    }
  } else if (region === 'Annapurna') {
    if (slug.includes('circuit') || slug.includes('tilicho')) {
      highlightsA = `Highlights include crossing the world-famous Thorong La Pass (5,416m), visiting the sacred pilgrimage shrine of Muktinath, exploring the arid Tibetan landscapes of Manang, hiking to turquoise Tilicho Lake (4,919m), and gazing at towering massifs of Annapurna I, II, III, IV, Dhaulagiri, and Machapuchare.`;
    } else if (slug.includes('mardi')) {
      highlightsA = `Highlights include walking narrow forested ridgelines beneath the sheer pyramid of Machapuchare (Fishtail), reaching Mardi Himal High Viewpoint (4,200m) with eye-level views of Annapurna South, and experiencing tranquil, less-crowded teahouse trails.`;
    } else if (slug.includes('poon-hill') || slug.includes('short') || slug.includes('khopra') || slug.includes('mohare')) {
      highlightsA = `Highlights include the world-famous pre-dawn sunrise from Poon Hill (3,210m) over Dhaulagiri and Annapurna, blooming rhododendron forests in Spring, traditional Gurung villages like Ghandruk, and panoramic ridgelines at Khopra or Mohare Danda.`;
    } else {
      highlightsA = `Highlights include entering the high natural mountain amphitheater of Annapurna Base Camp (4,130m) surrounded 360-degrees by Annapurna I, Annapurna South, Machapuchare (Fishtail), and Hiunchuli, soothing your muscles in Jhinu Danda natural hot springs, and visiting traditional Gurung settlements.`;
    }
  } else if (region === 'Manaslu') {
    if (slug.includes('tsum')) {
      highlightsA = `Highlights include exploring the sacred, peaceful valley of Tsum with its 800-year-old Mu Gompa and Rachen Gompa, crossing the challenging Larkya La Pass (5,106m), walking beneath Mt. Manaslu (8,163m), admiring glacial lakes like Birendra Tal, and experiencing an untouched Tibetan Buddhist way of life.`;
    } else {
      highlightsA = `Highlights include circling Mt. Manaslu (8,163m - the 8th highest peak on Earth), crossing the dramatic Larkya La Pass (5,106m), hiking past turquoise Birendra Tal glacial lake, visiting ancient Pungyen Gompa, and experiencing authentic Nubri Tibetan culture in Samagaon and Samdo.`;
    }
  } else if (region === 'Langtang') {
    if (isPeak) {
      highlightsA = `Highlights include ascending the non-technical alpine summit of Yala Peak (5,500m) for sweeping views of Shishapangma (8,027m) in Tibet and Langtang Lirung; exploring Kyanjin Gompa and its traditional yak cheese factory; and trekking through blooming rhododendron valleys.`;
    } else if (slug.includes('gosaikunda')) {
      highlightsA = `Highlights include visiting the holy high-altitude alpine lakes of Gosaikunda (4,380m) revered by Hindu and Buddhist pilgrims, crossing the panoramic Laurebina Pass (4,610m), exploring Kyanjin Gompa beneath Langtang Lirung, and enjoying panoramic vistas of Ganesh Himal and Manaslu.`;
    } else {
      highlightsA = `Highlights include exploring the rebuilt, resilient valley of Langtang, visiting the ancient monastery and artisanal yak cheese factory at Kyanjin Gompa, climbing Kyanjin Ri (4,773m) or Tserko Ri (4,984m) for 360-degree glacier views, and immersing in Tamang culture.`;
    }
  } else if (region === 'Mustang') {
    highlightsA = `Highlights include entering the ancient walled capital of Lo Manthang, visiting the King's royal palace, exploring the multi-story cliffside Chhoser Shija Jhong sky caves (dating back over 2,500 years), admiring 8th-century murals at Ghar Gompa, marveling at the wind-eroded red canyon cliffs of Dhakmar, and searching for ammonite fossils along the Kali Gandaki.`;
  } else if (region === 'Dolpo') {
    highlightsA = `Highlights include the jaw-dropping turquoise waters of Shey Phoksundo Lake (Nepal's deepest alpine lake), visiting sacred Shey Gompa (Crystal Mountain), crossing the thrilling Kang La Pass (5,360m), observing rare Tibetan Bon-po monasteries, and walking through pristine trans-Himalayan wilderness inhabited by elusive snow leopards and blue sheep.`;
  } else if (region === 'Kanchenjunga') {
    highlightsA = `Highlights include reaching both North (Pangpema 5,143m) and South (Oktang 4,730m) Base Camps of Mt. Kanchenjunga (8,586m - 3rd highest on Earth), crossing high passes like Sele Le (4,290m), viewing the massive Yalung Glacier, and exploring traditional Sherpa and Limbu villages like Ghunsa and Yamphudin.`;
  } else if (region === 'Makalu-Barun') {
    highlightsA = `Highlights include standing beneath the imposing granite south face of Mt. Makalu (8,485m - 5th highest on Earth), traversing the wild and biodiverse Barun River gorge, crossing four high mountain passes including Shipton La (4,216m), and viewing Kalo Pokhari holy lake.`;
  } else if (region === 'Dhaulagiri') {
    highlightsA = `Highlights include circumnavigating Mt. Dhaulagiri I (8,167m - 7th highest on Earth), crossing the glaciated French Col (5,360m) into the mysterious barren Hidden Valley, crossing Dhampus Pass (5,244m), and staying at Italian Base Camp and Dhaulagiri Base Camp.`;
  } else if (region === 'Rara / Karnali') {
    highlightsA = `Highlights include gazing over pristine Rara Lake (Nepal's largest freshwater lake at 2,990m), hiking up Chuchemara Danda (4,087m) for mirror-like lake and Himalayan views, exploring the ancient ruins and temples of Sinja Valley (birthplace of the Nepali language), and spotting rare Himalayan bird species.`;
  } else if (region === 'Ganesh Himal / Ruby Valley') {
    highlightsA = `Highlights include panoramic sunrise vistas from Pangsang Pass (3,850m) taking in Ganesh Himal, Langtang, and Manaslu; discovering local crystal and ruby mining heritage; and staying in authentic Gurung and Tamang community homestays untouched by commercial tourism.`;
  } else if (region === 'Kathmandu Valley Rim') {
    highlightsA = `Highlights include walking through the peaceful subtropical oak and rhododendron forests of Shivapuri National Park, watching the sunrise over 8 Himalayan ranges from Nagarkot, exploring the 5th-century UNESCO World Heritage temple of Changunarayan, and seeing rural village life just outside Kathmandu.`;
  } else if (region === 'Lower Solukhumbu') {
    highlightsA = `Highlights include standing atop Pikey Peak (4,065m) for what Sir Edmund Hillary described as the finest panoramic view of Mt. Everest, Kanchenjunga, Makalu, and Dhaulagiri; visiting the ancient Buddhist monastery of Thubten Choling in Junbesi; and enjoying genuine Sherpa hospitality away from commercial crowds.`;
  }

  // Determine Solo Trekking Q&A
  let soloQ = `Can I do the ${title} solo as an independent trekker?`;
  let soloA = "";
  const isRestricted = ['Manaslu', 'Mustang', 'Dolpo', 'Kanchenjunga'].includes(region) || slug.includes('nar-phu') || slug.includes('tsum');
  if (isRestricted) {
    soloA = `No. Under Nepal Department of Immigration regulations, solo independent trekking is strictly prohibited in restricted regions. Trekkers must be in a minimum group of two foreign nationals accompanied by a government-licensed Nepali trekking guide, and permits must be issued through a registered agency like Igloo Himalaya Treks.`;
  } else {
    soloA = `Under Nepal Tourism Board regulations enforced for mountain safety, solo independent trekking without a licensed guide is restricted in national parks. Solo travelers are warmly welcomed to join one of our small group departures or hire a private licensed Sherpa guide through Igloo Himalaya Treks.`;
  }

  // Determine Cultural Etiquette Q&A
  let cultureQ = `What local cultural customs and etiquette should I observe during the trek?`;
  let cultureA = "";
  if (region === 'Dolpo') {
    cultureA = `Dolpo is home to both Tibetan Buddhism and ancient pre-Buddhist Bon religion. When passing Buddhist stupas and mani walls, always walk clockwise. However, when passing Bon-po chortens, walk counter-clockwise according to Bon tradition. Always remove shoes before entering gompa prayer halls, ask before photographing elders, and greet locals with 'Tashi Delek'.`;
  } else if (region === 'Mustang') {
    cultureA = `Upper Mustang preserves pure Tibetan Buddhist culture. Always pass chortens, mani walls, and prayer wheels on your right (clockwise). Remove footwear before entering sacred monastery shrines, avoid touching religious paintings or murals, dress modestly, and greet locals with a warm 'Tashi Delek'.`;
  } else if (region === 'Manaslu') {
    cultureA = `The Nubri and Tsum valleys follow devout Tibetan Buddhist principles of non-violence (Ahimsa), where killing animals is strictly forbidden. Always walk clockwise around mani walls and chortens, remove shoes in monasteries, do not step over religious books or prayer items, and greet locals with 'Tashi Delek' or 'Namaste'.`;
  } else if (region === 'Langtang') {
    cultureA = `The Langtang and Tamang Heritage valleys are predominantly Tamang and Hyolmo communities with deep Buddhist traditions. Always walk clockwise around prayer walls and stupas, remove hats and shoes inside gompas, respect local water sources, and greet residents with 'Namaste' or 'Tashi Delek'.`;
  } else if (region === 'Annapurna') {
    cultureA = `The Annapurna region is home to Gurung, Magar, and Thakali communities blending Buddhist and Hindu traditions. Always walk clockwise around Buddhist shrines, dress modestly, remove footwear before entering temples and dining halls when requested, and greet local villagers with 'Namaste'.`;
  } else if (region === 'Kanchenjunga' || region === 'Makalu-Barun') {
    cultureA = `Eastern Nepal is home to Kirat (Rai and Limbu) and Sherpa communities. Respect sacred natural sites and animist shrines, pass Buddhist chortens clockwise, ask permission before taking portraits, and enjoy the generous mountain hospitality when offered hot tea or traditional meals.`;
  } else {
    cultureA = `In the Khumbu and mountain valleys, always pass mani stones, chortens, and prayer wheels on your right (clockwise). Remove shoes before entering Buddhist monasteries, ask permission before photographing monks or villagers, do not point your feet toward sacred shrines, and greet locals with 'Tashi Delek' or 'Namaste'.`;
  }

  // Construct items
  const generalList = [
    {
      q: `When is the best time to trek to ${title}?`,
      a: region === 'Mustang' ?
        `The best times for ${title} are Spring (March to May), Autumn (September to November), and Summer/Monsoon (June to August). Because Upper Mustang lies in the trans-Himalayan rain shadow behind the Annapurna and Dhaulagiri ranges, it receives virtually no monsoon rain, making it one of Nepal's finest summer trekking destinations.` :
        `The best times for ${title} are Autumn (September to November) and Spring (March to May). During these peak months, skies are remarkably clear, daytime hiking temperatures are comfortable, and mountain visibility is pristine. Spring also brings colorful blooming rhododendron forests.`
    },
    {
      q: `How long does the ${title} take?`,
      a: `Our standard ${title} itinerary takes ${durNum} Days round trip from Kathmandu, expertly paced with built-in acclimatization stages and contingency timing to maximize safety and scenic enjoyment.`
    },
    {
      q: `Is ${title} suitable for beginners?`,
      a: isPeak ?
        `Peak climbing requires a good baseline of cardiovascular fitness and mental endurance. While prior technical mountaineering experience is advantageous, our certified climbing Sherpa guides conduct a comprehensive glacier training session at Base Camp covering fixed rope ascending (jumar), crampon footwork, and descents, making it accessible to fit trekkers with strong determination.` :
        (durNum <= 6 || region === 'Kathmandu Valley Rim' ?
          `Yes! This trek is perfectly suited for beginners, families, and hikers with basic fitness. Trails are well-graded with gentle ascents, moderate elevations, and comfortable daily walking hours.` :
          `Yes, fit beginners can complete this trek successfully! While trails involve sustained daily ascents and high altitudes (up to ${altitudeStr}), our itinerary features gradual elevation gains, rest days, and steady pacing ('Bistari, Bistari') to ensure your body adapts smoothly.`)
    },
    {
      q: `What is the daily hiking distance and hours during the trek?`,
      a: isPeak ?
        `On regular trekking days, you will walk 5 to 6 hours covering 10 to 14 km. On summit day, you will start between 01:00 AM and 02:00 AM with headlamps, completing a demanding 10 to 14-hour round trip push to the summit and back to camp.` :
        `On average, trekkers hike between 5 to 7 hours per day covering approximately 10 to 15 kilometers (6 to 9 miles), with regular scenic tea breaks and a relaxed 1-hour hot lunch stop along the trail.`
    }
  ];

  const permitsList = [
    {
      q: transportQ,
      a: transportA
    },
    {
      q: permitsQ,
      a: permitsA
    },
    {
      q: luggageQ,
      a: luggageA
    },
    {
      q: delayQ,
      a: delayA
    }
  ];

  if (isPeak) {
    permitsList.push({
      q: `What technical climbing gear is provided by Igloo Himalaya Treks vs what should I bring?`,
      a: `We provide all group climbing equipment: high-altitude four-season expedition tents, dynamic climbing ropes, snow bars, ice screws, and shared kitchen equipment. Trekkers should bring or rent personal mountaineering gear in Kathmandu: rigid mountaineering boots, crampons, climbing harness, ice axe, ascender (Jumar), descender (Figure 8 / ATC), locking carabiners, and a climbing helmet.`
    });
  }

  const accommodationList = [
    {
      q: `What kind of accommodation is available along the route?`,
      a: isLuxury ?
        `You will stay in premium luxury mountain lodges (such as Yeti Mountain Home or Ker & Downey lodges) featuring spacious heated bedrooms, plush down bedding, electric blankets, private en-suite bathrooms with 24-hour hot running water, and elegant dining lounges.` :
        (isPeak ?
          `During the approach and return trek, you will stay in clean, comfortable twin-sharing teahouse lodges. During the climbing phase at Base Camp and High Camp, we provide high-altitude 4-season alpine expedition tents, insulated sleeping mats, a heated dining tent, and hot meals prepared by our camp chef.` :
          `You will stay in traditional, authentic mountain teahouses run by local families. Rooms are clean, comfortable twin-sharing rooms with foam mattresses, fresh linens, and warm blankets. Dining halls are heated in the evening with central wood or fuel stoves, serving as lively social hubs.`)
    },
    {
      q: `What food and meals are served during the trek?`,
      a: `Teahouse menus offer a hearty variety of fresh meals: traditional Dal Bhat (lentil soup, rice, and organic seasonal vegetable curry with free refills), fried noodles, momo dumplings, potato dishes, pasta, soups, porridge, pancakes, and eggs. Vegetarian and vegan choices are abundant along the entire route.`
    },
    {
      q: `Is drinking water safe along the trail?`,
      a: `Tap and stream water should not be consumed untreated. We strongly recommend drinking boiled water available at teahouses or using reusable water bottles with purification tablets, SteriPEN UV purifiers, or LifeStraw filtration systems to eliminate single-use plastic waste in protected conservation areas.`
    }
  ];

  const healthList = [
    {
      q: soloQ,
      a: soloA
    },
    {
      q: `What physical fitness level is required for this trip?`,
      a: isPeak ?
        `A high level of cardiovascular endurance and leg stamina is required. We recommend 2 to 3 months of regular aerobic conditioning: stair climbing carrying a 7–10 kg backpack, trail running, cycling, and resistance exercises to prepare your body for long summit day exertions.` :
        `A moderate level of cardiovascular fitness is recommended. Engaging in regular cardio exercises such as brisk walking, stair climbing, swimming, or weekend hill hikes with a 5 kg daypack for 4 to 8 weeks prior to departure will ensure an enjoyable and comfortable trek.`
    },
    {
      q: `How do you manage Altitude Sickness (AMS) during the trek?`,
      a: `Safety is our top priority. Our itineraries feature conservative daily altitude gains. Lead guides carry pulse oximeters to check your blood oxygen saturation and heart rate every morning and evening. Guides are trained in wilderness first aid and carry supplemental oxygen and medical kits. If symptoms persist, immediate descent is arranged.`
    },
    {
      q: `Is travel insurance mandatory for the ${title}?`,
      a: `Yes! Comprehensive travel insurance that explicitly covers high-altitude mountain trekking up to ${altitudeStr} and emergency helicopter rescue/evacuation is mandatory for all clients before departure.`
    }
  ];

  if (isPeak) {
    healthList.push({
      q: `What climbing guide to client ratio is maintained on summit day?`,
      a: `For maximum safety and summit success, we maintain a strict 1:2 or 1:3 climbing guide-to-client ratio on all peak ascents. All our climbing leaders are certified by the Nepal Mountaineering Association (NMA) and many have summited 8,000m Himalayan giants multiple times.`
    });
  }

  const paymentsList = [
    {
      q: highlightsQ,
      a: highlightsA
    },
    {
      q: `Do I need to book the ${title} in advance?`,
      a: isRestricted ?
        `Yes! Because restricted area permits (RAP) require government department verification and original passport documentation, and mountain transport is in high demand, we strongly advise booking 2 to 3 months in advance.` :
        `We recommend booking 2 to 4 months in advance, especially for Spring (March–May) and Autumn (September–November) departures, to secure preferred domestic flights, top-rated teahouses, and licensed veteran guides.`
    },
    {
      q: `What extra personal expenses should I budget for per day?`,
      a: `You should budget approximately $15 to $25 USD per day for personal expenses not included in standard packages, such as hot showers ($3–$5), electronic device charging ($2–$5), Wi-Fi internet access cards ($3–$5), cold beers/soft drinks, snacks, and tipping for your guide and porters.`
    },
    {
      q: `How much deposit is required to confirm our booking?`,
      a: `We require a 20% advance deposit to secure your permits, logistics, transport, and guide assignments. The remaining 80% balance can be settled conveniently upon your arrival in Kathmandu via credit card, cash (USD, EUR, GBP, NPR), or bank wire transfer.`
    }
  ];

  const culturalList = [
    {
      q: cultureQ,
      a: cultureA
    },
    {
      q: `What is the significance of the Buddhist prayer flags, mani stones, and chortens along the trail?`,
      a: `Prayer flags in five colors (blue for sky, white for air, red for fire, green for water, yellow for earth) carry prayers of peace, compassion, and strength on the mountain wind. Mani stones are carved with the sacred mantra 'Om Mani Padme Hum'. Chortens (stupas) hold sacred relics and harmonize the surrounding environment. Trekkers are asked to treat them with utmost reverence.`
    },
    {
      q: `How does trekking with Igloo Himalaya Treks support local Himalayan communities?`,
      a: `We practice responsible tourism by employing local guides and porters from the valleys we trek through, ensuring fair living wages, comprehensive medical insurance, and proper mountain gear. We support local teahouses, patronize family-run farms, and contribute a portion of each trek's proceeds toward remote village schools and trail conservation projects.`
    }
  ];

  return {
    general: generalList,
    permits: permitsList,
    accommodation: accommodationList,
    health: healthList,
    payments: paymentsList,
    cultural: culturalList
  };
}

module.exports = { getTrekFaqData };
