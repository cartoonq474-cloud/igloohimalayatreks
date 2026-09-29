/**
 * Reusable Trek Details Page Interactive Controller
 * Handles: Scroll-Spy navigation, Smooth anchor scrolling, Collapsible itinerary, Gear checklist, Booking calculator
 */

// Setup Anchor Scroll & Scroll Spy
function setupSubNavScrollSpy() {
  const subNavButtons = document.querySelectorAll('.trek-sub-nav-btn');
  const sections = document.querySelectorAll('.trek-detail-section');
  
  if (!subNavButtons.length) return;

  const headerHeight = 80;
  const subNavHeight = 58;
  const offset = headerHeight + subNavHeight + 15; // Offset compensation for sticky navigation bars

  // Smooth scroll to section on button click
  subNavButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      const targetSection = document.getElementById(`section-${tabId}`);
      
      if (targetSection) {
        // Temporarily detach scroll spy during manual scroll to prevent stutter
        window.removeEventListener('scroll', handleScrollSpy);
        
        subNavButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset + 5;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Re-attach scroll listener after smooth scroll completes
        setTimeout(() => {
          window.addEventListener('scroll', handleScrollSpy);
        }, 800);
      }
    });
  });

  // Scroll spy active state switcher
  function handleScrollSpy() {
    let activeTabId = '';
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(sec => {
      const idAttr = sec.getAttribute('id');
      if (!idAttr) return;
      const secTop = sec.offsetTop - offset;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop - 10 && scrollPos < secTop + secHeight) {
        activeTabId = idAttr.replace('section-', '');
      }
    });

    // Fallback: if we are at the bottom of the page, activate the last tab (FAQs)
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
      activeTabId = 'faqs';
    }

    if (activeTabId) {
      subNavButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === activeTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScrollSpy);
  handleScrollSpy();
}

// Setup Itinerary & FAQs Accordions
function setupAccordions() {
  const accordionHeaders = document.querySelectorAll('.itinerary-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.itinerary-card');
      if (!card) return;
      const content = card.querySelector('.itinerary-content');
      if (!content) return;
      const isExpanded = card.classList.contains('active');

      if (isExpanded) {
        card.classList.remove('active');
        content.style.maxHeight = '';
      } else {
        // Collapse other cards first to make it a clean accordion
        const otherCards = document.querySelectorAll('.itinerary-card.active');
        otherCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('active');
            const otherContent = c.querySelector('.itinerary-content');
            if (otherContent) otherContent.style.maxHeight = '';
          }
        });

        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Automatically compute and set initial heights for active items on page load
  setTimeout(() => {
    const activeContents = document.querySelectorAll('.itinerary-card.active .itinerary-content');
    activeContents.forEach(content => {
      content.style.maxHeight = content.scrollHeight + 'px';
    });
  }, 300);
}

// Setup Interactive Gear Checklist
function setupGearChecklist(trekKey) {
  const checkboxes = document.querySelectorAll('#section-packing .gear-item-checkbox');
  const countDisplay = document.querySelector('.gear-checked-count');
  const totalDisplay = document.querySelector('.gear-total-count');

  if (!checkboxes.length) return;

  const storageKey = `igloo-gear-${trekKey || 'default'}`;
  
  // Load saved checklist states
  let savedStates = {};
  try {
    const data = localStorage.getItem(storageKey);
    if (data) savedStates = JSON.parse(data);
  } catch (e) {
    console.error("Error reading gear states:", e);
  }

  // Initialize checks
  checkboxes.forEach(cb => {
    const id = cb.getAttribute('id');
    if (savedStates[id]) {
      cb.checked = true;
      const row = cb.closest('.gear-item-row');
      if (row) row.classList.add('packed');
    }

    cb.addEventListener('change', () => {
      const parentRow = cb.closest('.gear-item-row');
      if (parentRow) {
        if (cb.checked) {
          parentRow.classList.add('packed');
          savedStates[id] = true;
        } else {
          parentRow.classList.remove('packed');
          delete savedStates[id];
        }
      }
      
      // Save to localStorage
      try {
        localStorage.setItem(storageKey, JSON.stringify(savedStates));
      } catch (e) {
        console.error("Error saving gear states:", e);
      }
      
      updatePackedCount();
    });
  });

  function updatePackedCount() {
    const packedCount = document.querySelectorAll('#section-packing .gear-item-checkbox:checked').length;
    if (countDisplay) countDisplay.textContent = packedCount;
    if (totalDisplay) totalDisplay.textContent = checkboxes.length;
  }

  updatePackedCount();
}

// Setup Sticky Booking Live Calculator
function setupBookingCalculator() {
  const calcContainer = document.getElementById('booking-calculator');
  if (!calcContainer) return;

  const groupSizeInput = document.getElementById('calc-group-size');
  if (!groupSizeInput) return; // Exit early if we are not displaying the calculator inputs
  const heliCheckbox = document.getElementById('calc-upgrade-heli');
  const singleCheckbox = document.getElementById('calc-upgrade-single');
  
  const basePricePerPersonDisplay = document.getElementById('calc-display-base');
  const discountRateDisplay = document.getElementById('calc-display-discount');
  const heliPriceDisplay = document.getElementById('calc-display-heli');
  const singlePriceDisplay = document.getElementById('calc-display-single');
  const totalPerPersonDisplay = document.getElementById('calc-display-per-person');
  const totalPriceDisplay = document.getElementById('calc-display-total');

  // Load configuration from dataset values (default to EBC pricing if missing)
  const basePriceVal = parseFloat(calcContainer.getAttribute('data-base-price') || '1299');
  const heliPriceVal = parseFloat(calcContainer.getAttribute('data-heli-price') || '800');
  const singlePriceVal = parseFloat(calcContainer.getAttribute('data-single-price') || '250');

  function calculate() {
    const groupSize = parseInt(groupSizeInput.value) || 1;
    const isHeliChecked = heliCheckbox ? heliCheckbox.checked : false;
    const isSingleChecked = singleCheckbox ? singleCheckbox.checked : false;

    // Custom group discount model based on design:
    // 1 pax = $1,499
    // 2-7 pax = $1,299
    // 8-29 pax = $1,199
    let currentBasePrice = basePriceVal;
    
    const row1 = document.getElementById('discount-row-1');
    const row2 = document.getElementById('discount-row-2');
    const row3 = document.getElementById('discount-row-3');
    
    if (basePriceVal === 1299) { // New EBC pricing model
      if (row1) row1.classList.remove('active');
      if (row2) row2.classList.remove('active');
      if (row3) row3.classList.remove('active');

      if (groupSize === 1) {
        currentBasePrice = 1499;
        if (row1) row1.classList.add('active');
      } else if (groupSize >= 2 && groupSize <= 7) {
        currentBasePrice = 1299;
        if (row2) row2.classList.add('active');
      } else if (groupSize >= 8) {
        currentBasePrice = 1199;
        if (row3) row3.classList.add('active');
      }
    } else {
      // Standard progressive group discount percentages
      let discountPercent = 0;
      if (groupSize >= 2 && groupSize <= 4) {
        discountPercent = 0.05;
      } else if (groupSize >= 5 && groupSize <= 9) {
        discountPercent = 0.10;
      } else if (groupSize >= 10) {
        discountPercent = 0.15;
      }
      currentBasePrice = basePriceVal * (1 - discountPercent);
    }

    const addonsPerPerson = (isHeliChecked ? heliPriceVal : 0) + (isSingleChecked ? singlePriceVal : 0);
    const finalPerPerson = currentBasePrice + addonsPerPerson;

    // Set attributes for dynamic currency updates
    if (basePricePerPersonDisplay) {
      basePricePerPersonDisplay.setAttribute('data-price-usd', currentBasePrice);
      basePricePerPersonDisplay.textContent = formatPrice(currentBasePrice);
    }
    if (discountRateDisplay) {
      discountRateDisplay.textContent = `0%`; // Standard EBC uses direct price tiers instead of discount percent
    }
    if (heliPriceDisplay) {
      heliPriceDisplay.setAttribute('data-price-usd', heliPriceVal);
      heliPriceDisplay.textContent = `+${formatPrice(heliPriceVal)}`;
    }
    if (singlePriceDisplay) {
      singlePriceDisplay.setAttribute('data-price-usd', singlePriceVal);
      singlePriceDisplay.textContent = `+${formatPrice(singlePriceVal)}`;
    }

    const perPersonFormatted = formatPrice(finalPerPerson);
    if (totalPerPersonDisplay) {
      totalPerPersonDisplay.setAttribute('data-price-usd', finalPerPerson);
      totalPerPersonDisplay.textContent = perPersonFormatted;
    }

    if (totalPriceDisplay) {
      // Calculate total based on the displayed per person price to prevent rounding visual discrepancies
      const cleanNum = parseInt(perPersonFormatted.replace(/[^0-9]/g, '')) || 0;
      const finalTotalConverted = cleanNum * groupSize;

      const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        NPR: "Rs."
      };
      const activeCurr = typeof getCurrentCurrency === 'function' ? getCurrentCurrency() : 'USD';
      const symbol = currencySymbols[activeCurr] || "$";

      totalPriceDisplay.removeAttribute('data-price-usd');
      totalPriceDisplay.textContent = `${symbol}${finalTotalConverted.toLocaleString()}`;
    }
  }

  // Attach change listeners
  if (groupSizeInput) groupSizeInput.addEventListener('input', calculate);
  if (heliCheckbox) heliCheckbox.addEventListener('change', calculate);
  if (singleCheckbox) singleCheckbox.addEventListener('change', calculate);

  // Listen to external currency switcher events to re-render local prices
  window.addEventListener('currencychange', calculate);

  // Initial render
  calculate();
}

// Setup Interactive Read Tracker (Trip Details)
function setupReadTracker(trekKey) {
  const cards = document.querySelectorAll('.detail-accordion-card');
  const bar = document.querySelector('.details-progress-ring-bar');
  const countText = document.querySelector('.details-progress-count');
  const statusText = document.querySelector('.details-progress-status');
  
  if (!cards.length) return;

  const storageKey = `igloo-read-${trekKey || 'default'}`;
  
  // Load read states
  let readStates = {};
  try {
    const data = localStorage.getItem(storageKey);
    if (data) readStates = JSON.parse(data);
  } catch (e) {
    console.error("Error reading read states:", e);
  }

  // Initial setup of classes
  cards.forEach(card => {
    const id = card.getAttribute('data-detail-id');
    if (readStates[id]) {
      card.classList.add('read');
    }
  });

  function updateProgress() {
    const totalCount = cards.length;
    const readCount = document.querySelectorAll('.detail-accordion-card.read').length;
    
    // Update count display
    if (countText) {
      countText.textContent = `${readCount}/${totalCount} read`;
    }

    // Update status subtext
    if (statusText) {
      if (readCount === 0) {
        statusText.textContent = 'Nice start — keep going';
      } else if (readCount <= Math.floor(totalCount / 3)) {
        statusText.textContent = 'Doing great — learning more';
      } else if (readCount < totalCount) {
        statusText.textContent = 'Almost there — well prepared!';
      } else {
        statusText.textContent = 'All read — you are ready to trek! 🚀';
      }
    }

    // Update progress ring SVG
    if (bar) {
      const radius = 18;
      const circumference = 2 * Math.PI * radius; // 113.1
      const percent = (readCount / totalCount) * 100;
      const offset = circumference - (percent / 100) * circumference;
      bar.style.strokeDashoffset = offset;
    }
  }

  // Click handler to expand/collapse and mark as read
  cards.forEach(card => {
    const header = card.querySelector('.detail-accordion-header');
    const content = card.querySelector('.detail-accordion-content');
    const id = card.getAttribute('data-detail-id');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('active');

      if (isExpanded) {
        card.classList.remove('active');
        content.style.maxHeight = '';
      } else {
        // Collapse other cards first to make it a clean accordion
        const otherCards = document.querySelectorAll('.detail-accordion-card.active');
        otherCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('active');
            const otherContent = c.querySelector('.detail-accordion-content');
            if (otherContent) otherContent.style.maxHeight = '';
          }
        });

        // Expand this card
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';

        // Mark as read if not already read
        if (!card.classList.contains('read')) {
          card.classList.add('read');
          readStates[id] = true;
          try {
            localStorage.setItem(storageKey, JSON.stringify(readStates));
          } catch (e) {
            console.error("Error saving read states:", e);
          }
          updateProgress();
        }
      }
    });

    // Make sure initial active content is sized properly (if any starts expanded)
    if (card.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });

  // Run progress calculation on load
  updateProgress();
}

// Setup Collapsible Group Discount Accordion
function setupDiscountAccordion() {
  const toggleBtn = document.getElementById('booking-discount-toggle');
  const content = document.getElementById('booking-discount-content');
  const chevron = document.getElementById('booking-discount-chevron');

  if (toggleBtn && content && chevron) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = content.classList.toggle('open');
      chevron.classList.toggle('open', isOpen);
    });
  }
}

// Setup Interactive Booking Dates & Availability Section
function setupDatesAndAvailability() {
  const modeBtns = document.querySelectorAll('.dates-mode-btn');
  const groupView = document.getElementById('dates-group-view');
  const privateView = document.getElementById('dates-private-view');
  
  if (!groupView || !privateView) return;

  // 1. Toggle between Group Joining & Private Date mode
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      if (mode === 'group') {
        groupView.style.display = 'block';
        privateView.style.display = 'none';
      } else {
        groupView.style.display = 'none';
        privateView.style.display = 'block';
      }
    });
  });

  // 2. Group Joining Month Tabs Filter
  const monthTabs = document.querySelectorAll('.dates-month-tab');
  const departureRows = document.querySelectorAll('.departure-item-row');

  monthTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      monthTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetMonth = tab.getAttribute('data-month');
      departureRows.forEach(row => {
        const rowMonth = row.getAttribute('data-month');
        if (rowMonth === targetMonth) {
          if (row.classList.contains('extra-date')) {
            row.style.display = 'none'; // Keep extra dates hidden until load more is clicked
          } else {
            row.style.display = 'flex';
          }
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 3. Load More Dates Expander
  const loadMoreBtn = document.getElementById('btn-load-more-dates');
  if (loadMoreBtn) {
    let expanded = false;
    loadMoreBtn.addEventListener('click', () => {
      expanded = !expanded;
      const activeMonthTab = document.querySelector('.dates-month-tab.active');
      const activeMonth = activeMonthTab ? activeMonthTab.getAttribute('data-month') : 'AUG';

      const extraRows = document.querySelectorAll(`.departure-item-row.extra-date[data-month="${activeMonth}"]`);
      extraRows.forEach(row => {
        row.style.display = expanded ? 'flex' : 'none';
      });

      loadMoreBtn.textContent = expanded ? 'Show fewer dates' : 'Load more dates';
    });
  }

  // 4. Private Date Interactive Dual Calendar Widget
  const calendarMount = document.getElementById('dual-calendar-mount');
  const selectedText = document.getElementById('private-selected-date-text');
  const selectBtn = document.getElementById('btn-select-private-date');

  if (!calendarMount) return;

  let currentYear = 2026;
  let currentMonth = 7; // August (0-indexed: 7 = Aug)
  let selectedStartDate = null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Specific sold out dates for demonstration matching mockup
  const soldOutDates = [
    '2026-08-01', '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-14',
    '2026-08-15', '2026-08-16', '2026-09-01', '2026-09-18'
  ];

  function renderCalendar() {
    let html = '';

    // Render 2 side-by-side consecutive months
    for (let i = 0; i < 2; i++) {
      const mDate = new Date(currentYear, currentMonth + i, 1);
      const year = mDate.getFullYear();
      const month = mDate.getMonth();
      const monthName = monthNames[month];

      const firstDayIndex = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const prevNavBtn = (i === 0) ? `
        <button type="button" class="calendar-nav-btn prev-month-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>` : '<span></span>';

      const nextNavBtn = (i === 1) ? `
        <button type="button" class="calendar-nav-btn next-month-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>` : '<span></span>';

      html += `
        <div class="calendar-month-block">
          <div class="calendar-header-nav">
            ${prevNavBtn}
            <div class="calendar-month-title">
              ${monthName} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              ${year} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            ${nextNavBtn}
          </div>
          <div class="calendar-weekdays-grid">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div class="calendar-days-grid">
      `;

      // Empty lead cells
      for (let e = 0; e < firstDayIndex; e++) {
        html += `<div class="cal-day-cell empty"></div>`;
      }

      // Day numbers
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isSoldOut = soldOutDates.includes(dateStr);
        const thisDate = new Date(year, month, day);

        let cellClasses = ['cal-day-cell'];
        if (isSoldOut) {
          cellClasses.push('disabled');
        }

        if (selectedStartDate) {
          const startTime = selectedStartDate.getTime();
          const endTime = startTime + 13 * 86400000;
          const thisTime = thisDate.getTime();

          if (thisTime === startTime) {
            cellClasses.push('selected');
          } else if (thisTime > startTime && thisTime <= endTime) {
            cellClasses.push('in-range');
          }
        }

        html += `
          <div class="${cellClasses.join(' ')}" data-date="${dateStr}" ${isSoldOut ? 'title="Sold out date"' : ''}>
            ${day}
          </div>
        `;
      }

      html += `
          </div>
        </div>
      `;
    }

    calendarMount.innerHTML = html;

    // Attach month navigation event listeners
    const prevBtn = calendarMount.querySelector('.prev-month-btn');
    const nextBtn = calendarMount.querySelector('.next-month-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentMonth--;
        renderCalendar();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentMonth++;
        renderCalendar();
      });
    }

    // Attach day cell click listeners
    const dayCells = calendarMount.querySelectorAll('.cal-day-cell:not(.disabled):not(.empty)');
    dayCells.forEach(cell => {
      cell.addEventListener('click', () => {
        const dateVal = cell.getAttribute('data-date');
        const [y, m, d] = dateVal.split('-').map(Number);
        selectedStartDate = new Date(y, m - 1, d);

        const endDate = new Date(selectedStartDate);
        endDate.setDate(endDate.getDate() + 13);

        const startTxt = `${monthNames[selectedStartDate.getMonth()].slice(0, 3)} ${selectedStartDate.getDate()}`;
        const endTxt = `${monthNames[endDate.getMonth()].slice(0, 3)} ${endDate.getDate()}, ${endDate.getFullYear()}`;
        const rangeString = `${startTxt} – ${endTxt}`;

        if (selectedText) {
          selectedText.innerHTML = `<strong>Selected Date:</strong> ${rangeString} (14 Days)`;
        }

        if (selectBtn) {
          selectBtn.removeAttribute('disabled');
          selectBtn.setAttribute('data-trek-title', `Everest Base Camp Private Trek (${rangeString})`);
        }

        renderCalendar();
      });
    });
  }

  renderCalendar();
}

// Setup Best Himalayan Trekking Reviews Section
function setupHimalayanReviews() {
  const tabBtns = document.querySelectorAll('.review-tab-btn');
  const panes = document.querySelectorAll('.review-pane-content');

  // 1. Tab Switcher
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.style.display = 'block';
          pane.classList.add('active');
        } else {
          pane.style.display = 'none';
          pane.classList.remove('active');
        }
      });
    });
  });

  // 2. Video Player Modal Lightbox
  const videoCards = document.querySelectorAll('.video-review-card');
  const modal = document.getElementById('video-review-modal');
  const closeBtn = document.getElementById('video-modal-close');
  const modalTitle = document.getElementById('video-modal-title');
  const modalSub = document.getElementById('video-modal-sub');
  const player = document.getElementById('video-modal-player');

  if (modal) {
    const openVideoModal = (card) => {
      const trekker = card.getAttribute('data-trekker') || 'Trekker';
      const trek = card.getAttribute('data-trek') || 'Himalayan Trek';
      const videoUrl = card.getAttribute('data-video-url') || 'https://www.w3schools.com/html/mov_bbb.mp4';
      const bgImg = card.querySelector('.video-card-bg');

      if (modalTitle) modalTitle.textContent = `${trekker}'s Experience`;
      if (modalSub) modalSub.textContent = trek;
      if (player) {
        if (bgImg) player.poster = bgImg.src;
        player.src = videoUrl;
        player.play().catch(() => {});
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
      modal.classList.remove('active');
      if (player) {
        player.pause();
        player.currentTime = 0;
      }
      document.body.style.overflow = 'auto';
    };

    videoCards.forEach(card => {
      card.addEventListener('click', () => openVideoModal(card));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideoModal();
    });
  }

  // 3. Helpful Vote Buttons
  const helpfulBtns = document.querySelectorAll('.helpful-vote-btn');
  helpfulBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const countSpan = btn.querySelector('.vote-count');
      let votes = parseInt(btn.getAttribute('data-votes') || '0', 10);
      const isVoted = btn.classList.contains('voted');

      if (isVoted) {
        votes -= 1;
        btn.classList.remove('voted');
      } else {
        votes += 1;
        btn.classList.add('voted');
      }

      btn.setAttribute('data-votes', votes);
      if (countSpan) countSpan.textContent = votes;
    });
  });

  // 4. Photo Lightbox Trigger
  const photoThumbs = document.querySelectorAll('.review-photo-thumb');
  photoThumbs.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      if (modal) {
        if (modalTitle) modalTitle.textContent = "Trek Photo Gallery";
        if (modalSub) modalSub.textContent = "Customer Uploaded Memory";
        if (player) player.style.display = 'none';

        let imgPreview = modal.querySelector('#photo-modal-img');
        if (!imgPreview) {
          imgPreview = document.createElement('img');
          imgPreview.id = 'photo-modal-img';
          imgPreview.style.cssText = 'width: 100%; max-height: 70vh; border-radius: 12px; object-fit: contain;';
          if (player && player.parentNode) {
            player.parentNode.appendChild(imgPreview);
          }
        }
        imgPreview.src = thumb.src;
        imgPreview.style.display = 'block';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Reset modal elements when closed
  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (player) player.style.display = 'block';
      const imgPreview = modal.querySelector('#photo-modal-img');
      if (imgPreview) imgPreview.style.display = 'none';
    });
  }

  // 5. Sub-Platform Tab Switcher
  const platformSubTabs = document.querySelectorAll('.platform-sub-tab');
  const platformCards = document.querySelectorAll('.platform-review-item');
  const summaryCount = document.getElementById('platform-summary-count');

  const platformCounts = {
    google: '(1,549 Verified Reviews)',
    tripadvisor: '(380 Verified Reviews)',
    trustpilot: '(250 Verified Reviews)',
    sourceforge: '(120 Verified Reviews)'
  };

  platformSubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      platformSubTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetPlatform = tab.getAttribute('data-platform');
      if (summaryCount && platformCounts[targetPlatform]) {
        summaryCount.textContent = platformCounts[targetPlatform];
      }

      platformCards.forEach(card => {
        const cardPlatform = card.getAttribute('data-platform');
        if (cardPlatform === targetPlatform) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Review "See more" / "See less" text expander (Delegated listener)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.review-see-more-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    const parent = btn.closest('.review-body-text');
    const textContent = parent ? parent.querySelector('.review-text-content') : null;
    if (!textContent) return;

    const isExpanded = textContent.classList.contains('expanded');
    if (isExpanded) {
      textContent.classList.remove('expanded');
      btn.textContent = 'See more';
    } else {
      textContent.classList.add('expanded');
      btn.textContent = 'See less';
    }
  });
}

// 6. Categorized FAQ Section Handler
function setupFaqSection() {
  const categoryBtns = document.querySelectorAll('.faq-category-btn');
  const categoryPanels = document.querySelectorAll('.faq-category-content');
  const currentCategoryTitle = document.getElementById('faq-current-category-title');
  const expandAllBtn = document.getElementById('faq-expand-all-btn');

  if (!categoryBtns.length) return;

  // Category Tab Switcher
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCat = btn.getAttribute('data-category');
      const catText = btn.innerText.trim();

      if (currentCategoryTitle) {
        currentCategoryTitle.textContent = catText;
      }

      categoryPanels.forEach(panel => {
        if (panel.id === `faq-cat-${targetCat}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Reset Expand All button label
      if (expandAllBtn) {
        expandAllBtn.textContent = 'Expand All';
      }
    });
  });

  // Accordion Item Toggle
  document.querySelectorAll('.faq-item-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) {
        item.classList.toggle('active');
      }
    });
  });

  // Expand All / Collapse All Button
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.faq-category-content.active');
      if (!activePanel) return;

      const items = activePanel.querySelectorAll('.faq-item');
      const isExpanded = expandAllBtn.textContent.trim() === 'Collapse All';

      items.forEach(item => {
        if (isExpanded) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });

      expandAllBtn.textContent = isExpanded ? 'Expand All' : 'Collapse All';
    });
  }
}

// Initialise everything on page load
function initTrekDetails() {
  const detailsWrapper = document.querySelector('[data-trek-details-wrapper]');
  const trekKey = detailsWrapper ? detailsWrapper.getAttribute('data-trek-key') : 'ebc';

  const safeRun = (fn, label) => {
    try {
      fn();
    } catch (e) {
      console.warn(`[initTrekDetails] Error initializing ${label}:`, e);
    }
  };

  safeRun(() => setupSubNavScrollSpy(), 'setupSubNavScrollSpy');
  safeRun(() => setupAccordions(), 'setupAccordions');
  safeRun(() => setupGearChecklist(trekKey), 'setupGearChecklist');
  safeRun(() => setupBookingCalculator(), 'setupBookingCalculator');
  safeRun(() => setupReadTracker(trekKey), 'setupReadTracker');
  safeRun(() => setupDiscountAccordion(), 'setupDiscountAccordion');
  safeRun(() => setupDatesAndAvailability(), 'setupDatesAndAvailability');
  safeRun(() => setupHimalayanReviews(), 'setupHimalayanReviews');
  safeRun(() => setupFaqSection(), 'setupFaqSection');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrekDetails);
} else {
  initTrekDetails();
}


