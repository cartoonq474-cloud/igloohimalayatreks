/**
 * Interactive Review Section Handler for Homepage (index.html)
 * Controls Main Tabs (Video, Customer, Platform) & Platform Subtabs (Google, TripAdvisor, Trustpilot, Facebook)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Main 3-Tab Switcher (.review-tab-btn)
  const tabBtns = document.querySelectorAll('.review-tab-btn');
  const tabPanels = document.querySelectorAll('.review-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const container = btn.closest('.review-tabs-container');
      if (container && container.scrollWidth > container.clientWidth) {
        const btnLeft = btn.offsetLeft;
        const btnWidth = btn.offsetWidth;
        const containerWidth = container.clientWidth;
        container.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: 'smooth'
        });
      }
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Platform Sub-Tabs Switcher (.platform-subtab-btn)
  const subtabBtns = document.querySelectorAll('.platform-subtab-btn');
  const platformContents = document.querySelectorAll('.platform-reviews-content');

  subtabBtns.forEach(subBtn => {
    subBtn.addEventListener('click', () => {
      const platformKey = subBtn.getAttribute('data-platform');

      subtabBtns.forEach(b => b.classList.remove('active'));
      platformContents.forEach(c => c.classList.remove('active'));

      subBtn.classList.add('active');
      const targetContent = document.querySelector(`.platform-reviews-content[data-platform="${platformKey}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // FAQ Category Pill Switcher
  const faqCatBtns = document.querySelectorAll('.faq-category-btn');
  const faqPanels = document.querySelectorAll('.faq-category-panel');

  faqCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const catKey = btn.getAttribute('data-faq-cat');

      faqCatBtns.forEach(b => b.classList.remove('active'));
      faqPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetFaqPanel = document.getElementById(`faq-cat-${catKey}`);
      if (targetFaqPanel) {
        targetFaqPanel.classList.add('active');
      }
    });
  });

  // FAQ Accordion Card Toggle
  const accordionItems = document.querySelectorAll('.faq-accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        const parentPanel = item.closest('.faq-category-panel');
        if (parentPanel) {
          parentPanel.querySelectorAll('.faq-accordion-item').forEach(sibling => {
            sibling.classList.remove('active');
          });
        }

        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // Resources Subtab Handler
  const resTabBtns = document.querySelectorAll('.res-tab-btn');
  const resourceData = {
    webinars: [
      {
        title: "Everest Base Camp High Altitude Expedition & Khumbu Glacier Webinar",
        img: "images/everest-base-camp-trek.webp",
        videoSrc: "video/gallery/treks/everest-base-camp.mp4",
        sub: "By Igloo Himalaya Sherpa Experts"
      },
      {
        title: "Revealing Altitude Tactics You Already Know To Pass Thorong La In Annapurna Circuit",
        img: "images/annapurna-circuit-trek.webp",
        videoSrc: "video/gallery/treks/annapurna-circuit-trek.mp4",
        sub: "Annapurna Circuit Technical Preparation"
      },
      {
        title: "Manaslu Circuit Wilderness Trek & Larkya La Pass Masterclass",
        img: "images/manaslu-circuit-trek.webp",
        videoSrc: "video/gallery/treks/manaslu-circuit-trek.mp4",
        sub: "Manaslu Alpine Safety Protocol"
      },
      {
        title: "Mardi Himal High Camp Ridge Trek: Trail Highlights & Acclimatization",
        img: "images/mardi-himal-trek.webp",
        videoSrc: "video/gallery/treks/mardi-himal-trek.mp4",
        sub: "Annapurna Sanctuary Panorama Planning"
      },
      {
        title: "Crossing Kongma La, Cho La & Renjo La: High Pass Route Strategy",
        img: "images/everest-three-passes-trek-route-tips-and-best-itinerary.webp",
        videoSrc: "video/gallery/treks/everest-three-passes-trek.mp4",
        sub: "Everest High Passes Expedition Guide"
      },
      {
        title: "Annapurna Circuit via Tilicho Lake (4,919m): Glacial Lake Route Guide",
        img: "images/annapurna-circuit-with-tilicho-lake-trek.webp",
        videoSrc: "video/gallery/treks/annapurna-circuit-via-tilicho-lake.mp4",
        sub: "High Alpine Acclimatization Webinar"
      }
    ],
    blogs: [
      {
        title: "Top 10 Essential Teahouse Etiquette Tips Every First-Time Everest Trekker Must Know",
        img: "images/gallery-1-4.webp"
      },
      {
        title: "Autumn vs Spring in Nepal: How to Pick the Perfect Trekking Season for Clear Mountain Views",
        img: "images/gallery-1-5.webp"
      },
      {
        title: "Manaslu Circuit vs Annapurna Circuit: Comprehensive Route Breakdown and Permit Guide",
        img: "images/gallery-1-6.webp"
      }
    ],
    checklists: [
      {
        title: "Ultimate High-Altitude Gear & Packing Checklist for Everest Base Camp (Printable PDF)",
        img: "images/gallery-1-7.webp"
      },
      {
        title: "First-Aid Kit & Altitude Sickness Prevention Checklist for Himalayan Remote Expeditions",
        img: "images/gallery-2-1.webp"
      },
      {
        title: "Kathmandu Rental Guide: What Sleeping Bags & Down Jackets to Rent in Thamel",
        img: "images/gallery-2-2.webp"
      }
    ]
  };

  resTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const catKey = btn.getAttribute('data-res-cat');
      resTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isWebinar = (catKey === 'webinars');
      const items = resourceData[catKey] || resourceData.webinars;
      const grid = document.querySelector('.resources-grid');
      if (grid) {
        grid.innerHTML = items.map(item => `
          <div class="resource-card ${isWebinar ? 'play-video-trigger' : 'open-inquiry-btn'}" 
               data-res-type="${catKey}" 
               ${isWebinar ? `data-video-src="${item.videoSrc}" data-video-title="${item.title}" data-video-sub="${item.sub}"` : ''}>
            <div class="resource-thumb-wrapper" style="background-image: url('${item.img}');">
              <div class="yt-play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="9.5,7.5 16.5,12 9.5,16.5"/></svg>
              </div>
            </div>
            <div class="resource-card-content">
              <h3 class="resource-card-title">${item.title}</h3>
            </div>
          </div>
        `).join('');
      }
    });
  });
});
