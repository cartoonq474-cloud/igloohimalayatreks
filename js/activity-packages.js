// Activity Packages Category Switcher with Clean Card Design & Image Hover Overlay
document.addEventListener('DOMContentLoaded', () => {
  const categoryBtns = document.querySelectorAll('.act-category-btn');
  const packagesContainer = document.getElementById('act-packages-grid');
  const progressDots = document.querySelectorAll('.act-progress-dot');

  if (!categoryBtns.length || !packagesContainer) return;

  const activityData = {
    trekking: [
      {
        image: "images/everest-base-camp-16-days.webp",
        duration: "14 DAYS",
        tags: ["CLASSIC", "HIGH ALTITUDE", "TEAHOUSE"],
        name: "Everest Base Camp Trek",
        url: "trek/everest-base-camp-trek/",
        region: "Khumbu Region, Nepal",
        altitude: "5545 m",
        difficulty: "challenging",
        summary: "Trek to the foot of Mt. Everest through Sherpa villages, Tengboche Monastery, and Kala Patthar viewpoint.",
        price: "$1399",
        reviews: 142
      },
      {
        image: "images/trekking-the-classic-annapurna-circuit.webp",
        duration: "13 DAYS",
        tags: ["SCENIC", "PASS CROSSING", "LODGE"],
        name: "Annapurna Circuit Trek",
        url: "trek/annapurna-circuit-trek/",
        region: "Annapurna Massif, Nepal",
        altitude: "5416 m",
        difficulty: "moderate",
        summary: "Traverse diverse eco-zones from lush rhododendron forests to dramatic Thorong La Pass high-altitude desert.",
        price: "$1150",
        reviews: 118
      },
      {
        image: "images/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo.webp",
        duration: "13 DAYS",
        tags: ["RESTRICTED", "REMOTE", "CULTURE"],
        name: "Manaslu Circuit Trek",
        url: "trek/manaslu-circuit-trek/",
        region: "Manaslu Conservation Area",
        altitude: "5106 m",
        difficulty: "challenging",
        summary: "Unspoiled Tibetan Buddhist culture around Mt. Manaslu (8,163m) with crossing of snow-bound Larke La Pass.",
        price: "$1190",
        reviews: 64
      }
    ],
    climbing: [
      {
        image: "images/island-peak-climbing-02.webp",
        duration: "19 DAYS",
        tags: ["GLACIER", "SUMMIT", "TECHNICAL"],
        name: "Island Peak Climbing (6,189m)",
        url: "trek/island-peak-climbing/",
        region: "Imja Valley, Everest Region",
        altitude: "6189 m",
        difficulty: "strenuous",
        summary: "Combine Everest Base Camp trekking with a thrilling 6,000m+ Himalayan summit climb using crampons and fixed ropes.",
        price: "$1899",
        reviews: 112
      },
      {
        image: "images/mera-peak-climbing-02.webp",
        duration: "18 DAYS",
        tags: ["TREKKING PEAK", "HIGH PASS", "EXPEDITION"],
        name: "Mera Peak Expedition (6,476m)",
        url: "trek/mera-peak-climbing/",
        region: "Hinku Valley, Nepal",
        altitude: "6476 m",
        difficulty: "challenging",
        summary: "Nepal's highest non-technical trekking peak offering panoramic summit views of 5 of the world's 14 8,000m peaks.",
        price: "$1999",
        reviews: 74
      },
      {
        image: "images/lobuche-peak-climbing-02.webp",
        duration: "18 DAYS",
        tags: ["EVEREST REGION", "ICE CLIMB", "ALPINE"],
        name: "Lobuche East Peak (6,119m)",
        url: "trek/lobuche-peak-climbing/",
        region: "Khumbu Valley, Nepal",
        altitude: "6119 m",
        difficulty: "strenuous",
        summary: "Technical alpine ridge climbing overlooking Everest, Lhotse, Nuptse, and Ama Dablam from the Lobuche High Camp.",
        price: "$2199",
        reviews: 56
      }
    ],
    tours: [
      {
        image: "images/boat-5259878-1920.webp",
        duration: "8 DAYS",
        tags: ["HERITAGE", "WILDLIFE", "SCENIC"],
        name: "Best of Nepal: Kathmandu, Pokhara & Chitwan",
        url: "tour/kathmandu-pokhara-chitwan-tour/",
        region: "Kathmandu, Pokhara & Chitwan",
        altitude: "1400 m",
        difficulty: "easy",
        summary: "Golden triangle tour combining Kathmandu UNESCO heritage, scenic Pokhara Fewa lake, and Chitwan wildlife jungle safari.",
        price: "$890",
        reviews: 92
      },
      {
        image: "images/kathmandu-heritage-tour-unesco-world-heritage-sites-tour-02.webp",
        duration: "4 DAYS",
        tags: ["HERITAGE", "TEMPLES", "CULTURE"],
        name: "Kathmandu UNESCO World Heritage Tour",
        url: "tour/kathmandu-cultural-heritage-tour/",
        region: "Kathmandu Valley, Nepal",
        altitude: "1400 m",
        difficulty: "easy",
        summary: "Explore historic Durbar Squares, Pashupatinath temple, Boudhanath stupa, and medieval courtyards of Bhaktapur.",
        price: "$350",
        reviews: 108
      },
      {
        image: "images/chitwan-jungle-safari-tour-best-wildlife-safari-in-nepal.webp",
        duration: "3 DAYS",
        tags: ["SAFARI", "RHINOS", "THARU CULTURE"],
        name: "Chitwan National Park Jungle Safari",
        url: "tour/chitwan-national-park-safari/",
        region: "Chitwan National Park, Nepal",
        altitude: "820 m",
        difficulty: "easy",
        summary: "Jeep safari spotting one-horned rhinos, canoe ride along Rapti river, bird watching, and authentic Tharu cultural dance.",
        price: "$299",
        reviews: 84
      }
    ],
    hikes: [
      {
        image: "images/jamacho-hike-1-day-hiking-shivapuri-national-park.webp",
        duration: "1 DAY",
        tags: ["DAY HIKE", "MONASTERY", "FOREST"],
        name: "Jamacho Peak Day Hike (2,128m)",
        url: "tour/jamacho-hike/",
        region: "Shivapuri Nagarjun National Park",
        altitude: "2128 m",
        difficulty: "moderate",
        summary: "Hike through lush Shivapuri Nagarjun National Park to Jamacho Buddhist Monastery with sweeping Himalayan views.",
        price: "$65",
        reviews: 54
      },
      {
        image: "images/chisapani-nagarkot-trek-02.webp",
        duration: "3 DAYS",
        tags: ["SUNRISE", "PANORAMA", "ANCIENT CITY"],
        name: "Nagarkot Sunrise & Bhaktapur Tour",
        url: "tour/nagarkot-sunrise-bhaktapur-tour/",
        region: "Kathmandu Valley Rim",
        altitude: "2175 m",
        difficulty: "easy",
        summary: "Witness sunrise over the Himalayas from Nagarkot tower followed by exploration of ancient Bhaktapur Durbar Square.",
        price: "$220",
        reviews: 78
      },
      {
        image: "images/chisapani-nagarkot-trek.webp",
        duration: "3 DAYS",
        tags: ["SHORT TREK", "RIDGE WALK", "NATURE"],
        name: "Chisapani Nagarkot Scenic Trek",
        url: "trek/chisapani-nagarkot-trek/",
        region: "Shivapuri & Nagarkot Rim",
        altitude: "2438 m",
        difficulty: "easy",
        summary: "The quintessential short introductory trek through Shivapuri forest to Chisapani and Nagarkot for panoramic sunrise.",
        price: "$249",
        reviews: 96
      }
    ],
    heli: [
      {
        image: "images/everest-base-camp-helicopter-tour-1-day-luxury-heli-tour.webp",
        duration: "1 DAY",
        tags: ["HELI TOUR", "EVEREST VIEW", "LUXURY"],
        name: "Everest Base Camp Heli Tour",
        url: "tour/everest-base-camp-helicopter-tour/",
        region: "Khumbu Valley, Nepal",
        altitude: "5364 m",
        difficulty: "easy",
        summary: "Fly directly over Everest Base Camp & Khumbu Icefall with breakfast landing at Hotel Everest View (3,880m).",
        price: "$999",
        reviews: 118
      },
      {
        image: "images/annapurna-base-camp-trek-heli-return.webp",
        duration: "8 DAYS",
        tags: ["ANNAPURNA", "HELI RETURN", "AMPHITHEATER"],
        name: "Annapurna Base Camp Heli Return",
        url: "trek/annapurna-base-camp-heli-return/",
        region: "Annapurna Sanctuary, Nepal",
        altitude: "4130 m",
        difficulty: "moderate",
        summary: "Trek into the heart of Annapurna Sanctuary and take an exhilarating scenic helicopter flight back to Pokhara.",
        price: "$1499",
        reviews: 62
      },
      {
        image: "images/everest-base-camp-heli-tour.webp",
        duration: "5 DAYS",
        tags: ["VIP LUXURY", "EVEREST & ABC", "CHARTER"],
        name: "Nepal Luxury Helicopter Tour",
        url: "tour/nepal-luxury-helicopter-tour/",
        region: "Everest & Annapurna, Nepal",
        altitude: "5364 m",
        difficulty: "easy",
        summary: "Ultimate 5-star aerial expedition over Everest and Annapurna ranges with luxury resort stays in Kathmandu and Pokhara.",
        price: "$2499",
        reviews: 42
      }
    ]
  };

  function renderCategoryPackages(categoryKey) {
    const packages = activityData[categoryKey] || activityData.trekking;
    
    packagesContainer.style.opacity = '0';
    packagesContainer.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
      packagesContainer.innerHTML = packages.map(pkg => `
        <div class="act-package-card">
          <!-- Top Photo Banner with Floating Duration Badge & Smooth Hover Overlay -->
          <div class="act-card-img-wrapper">
            <a href="${pkg.url}" style="display: block; width: 100%; height: 100%;">
              <img src="${pkg.image}" alt="${pkg.name}" class="act-card-img" loading="lazy" width="380" height="240" decoding="async">
            </a>
            <div class="act-card-duration-badge">${pkg.duration}</div>

            <!-- Glassmorphism Hover Info Overlay -->
            <div class="act-img-hover-overlay">
              <div class="act-hover-tags">
                ${pkg.tags.map(t => `<span class="act-hover-tag-pill">${t}</span>`).join('')}
              </div>
              <div class="act-hover-meta">
                <div class="act-hover-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Max: <strong>${pkg.altitude}</strong></span>
                </div>
                <div class="act-hover-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span>${pkg.difficulty}</span>
                </div>
              </div>
              <p class="act-hover-summary">${pkg.summary}</p>
              <div class="dest-hover-hint">Hovered for details</div>
            </div>
          </div>

          <!-- Clean Card Body -->
          <div class="act-card-content">
            <div>
              <div class="package-rating-row">
                <span class="stars-gold"><svg width="15" height="15" viewBox="0 0 24 24" fill="#F6851F" style="display:inline-block; vertical-align:middle;"><use href="#icon-star"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#F6851F" style="display:inline-block; vertical-align:middle;"><use href="#icon-star"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#F6851F" style="display:inline-block; vertical-align:middle;"><use href="#icon-star"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#F6851F" style="display:inline-block; vertical-align:middle;"><use href="#icon-star"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#F6851F" style="display:inline-block; vertical-align:middle;"><use href="#icon-star"/></svg></span>
                <span class="reviews-count">(${pkg.reviews} Reviews)</span>
              </div>
              <h3 class="act-card-title"><a href="${pkg.url}" style="color: inherit; text-decoration: none;">${pkg.name}</a></h3>
              <div class="act-card-subregion">${pkg.region}</div>
            </div>

            <!-- Bottom Price & Inquire Now Row -->
            <div class="act-card-bottom-row">
              <div class="act-price-box">
                <span class="act-starting-label">Starting From</span>
                <span class="act-price-val">${pkg.price}</span>
              </div>
              <button class="btn-inquire-now open-inquiry-btn" data-trek-title="${pkg.name}">Inquire Now</button>
            </div>
          </div>
        </div>
      `).join('');

      packagesContainer.style.opacity = '1';
    }, 180);
  }

  categoryBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      progressDots.forEach(d => d.classList.remove('active'));
      if (progressDots[index]) progressDots[index].classList.add('active');

      const catKey = btn.getAttribute('data-act-cat');
      renderCategoryPackages(catKey);
    });
  });

  // Initial render
  renderCategoryPackages('trekking');
});
