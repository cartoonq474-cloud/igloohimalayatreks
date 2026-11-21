/**
 * Nepal Trekking Packages - Interactive Filter, Search & Sort Controller
 * Igloo Himalaya Treks
 * Features dynamic count syncing, interactive destination quick pills,
 * smooth animation transitions, mobile scroll controls, and deep-link sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('treks-container');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.card.trek-item'));
  const countDisplay = document.getElementById('treks-count-display');
  const emptyState = document.getElementById('treks-empty-state');

  const filterSearch = document.getElementById('filter-search');
  const filterCategory = document.getElementById('filter-category');
  const filterRegion = document.getElementById('filter-region');
  const filterDuration = document.getElementById('filter-duration');
  const filterDifficulty = document.getElementById('filter-difficulty');
  const filterSort = document.getElementById('filter-sort');
  const resetBtn = document.getElementById('reset-filters-btn');

  const categoryPills = document.querySelectorAll('.category-quick-pill');
  const regionPills = document.querySelectorAll('.region-quick-pill');
  const regionStatusHint = document.getElementById('region-pills-status');
  const clearRegionBtn = document.getElementById('clear-region-filter-btn');

  const regionScrollContainer = document.getElementById('region-pills-container');
  const regionScrollPrev = document.getElementById('region-scroll-prev');
  const regionScrollNext = document.getElementById('region-scroll-next');

  // Human-readable labels for regions
  const regionLabels = {
    'all': 'All Regions',
    'everest': 'Everest Region',
    'annapurna': 'Annapurna Region',
    'langtang': 'Langtang Region',
    'manaslu': 'Manaslu Region',
    'mustang': 'Upper Mustang',
    'dolpo': 'Dolpo Region',
    'kanchenjunga': 'Kanchenjunga Region',
    'remote': 'Remote Wilderness',
    'kathmandu': 'Kathmandu Rim'
  };

  // Keep original order of cards for default sort
  const originalCardsOrder = [...cards];

  // Dynamic Count Calculation
  function updatePillCounts() {
    const counts = { all: cards.length };
    cards.forEach(card => {
      const reg = card.getAttribute('data-region') || '';
      if (reg) {
        counts[reg] = (counts[reg] || 0) + 1;
      }
    });

    for (const [key, num] of Object.entries(counts)) {
      const badge = document.getElementById('badge-count-' + key);
      if (badge) badge.textContent = num;
    }
  }
  updatePillCounts();

  // Scroll Arrow State Management
  function updateScrollArrows() {
    if (!regionScrollContainer || !regionScrollPrev || !regionScrollNext) return;
    const maxScroll = regionScrollContainer.scrollWidth - regionScrollContainer.clientWidth;
    if (maxScroll <= 5) {
      regionScrollPrev.classList.add('is-disabled');
      regionScrollNext.classList.add('is-disabled');
      return;
    }
    const current = regionScrollContainer.scrollLeft;
    if (current <= 10) {
      regionScrollPrev.classList.add('is-disabled');
    } else {
      regionScrollPrev.classList.remove('is-disabled');
    }
    if (current >= maxScroll - 10) {
      regionScrollNext.classList.add('is-disabled');
    } else {
      regionScrollNext.classList.remove('is-disabled');
    }
  }

  if (regionScrollContainer) {
    regionScrollContainer.addEventListener('scroll', updateScrollArrows, { passive: true });
    window.addEventListener('resize', updateScrollArrows, { passive: true });
    setTimeout(updateScrollArrows, 300);
  }

  if (regionScrollPrev && regionScrollContainer) {
    regionScrollPrev.addEventListener('click', () => {
      regionScrollContainer.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }

  if (regionScrollNext && regionScrollContainer) {
    regionScrollNext.addEventListener('click', () => {
      regionScrollContainer.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  function applyFilters(triggeredByRegionPill = false) {
    const searchVal = filterSearch ? filterSearch.value.trim().toLowerCase() : '';
    let categoryVal = filterCategory ? filterCategory.value : 'all';
    const regionVal = filterRegion ? filterRegion.value : 'all';
    const durationVal = filterDuration ? filterDuration.value : 'all';
    const difficultyVal = filterDifficulty ? filterDifficulty.value : 'all';
    const sortVal = filterSort ? filterSort.value : 'default';

    // Intelligent conflict resolution: if triggered by regional quick pill and
    // current category produces 0 matches for this region, reset category to 'all'
    if (triggeredByRegionPill && regionVal !== 'all' && categoryVal !== 'all') {
      const wouldMatch = cards.some(card => {
        const cReg = card.getAttribute('data-region') || '';
        const cCat = card.getAttribute('data-category') || '';
        const cTitle = (card.getAttribute('data-title') || '').toLowerCase();
        const matchesReg = (regionVal === 'remote')
          ? (cReg === 'remote' || cReg === 'dolpo' || cReg === 'kanchenjunga' || cTitle.includes('rara') || cTitle.includes('makalu') || cTitle.includes('rolwaling') || cTitle.includes('ruby') || cTitle.includes('dhaulagiri'))
          : (cReg === regionVal);
        return matchesReg && (cCat === categoryVal);
      });

      if (!wouldMatch && filterCategory) {
        filterCategory.value = 'all';
        categoryVal = 'all';
      }
    }

    let visibleCount = 0;

    // Filter cards
    cards.forEach(card => {
      const region = card.getAttribute('data-region') || '';
      const category = card.getAttribute('data-category') || '';
      const duration = card.getAttribute('data-duration') || '';
      const difficulty = card.getAttribute('data-difficulty') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const desc = (card.querySelector('.trek-item-desc')?.textContent || '').toLowerCase();

      // Search match
      let matchesSearch = true;
      if (searchVal) {
        matchesSearch = title.includes(searchVal) || desc.includes(searchVal);
      }

      // Category match
      let matchesCategory = true;
      if (categoryVal !== 'all') {
        matchesCategory = category === categoryVal;
      }

      // Region match
      let matchesRegion = true;
      if (regionVal !== 'all') {
        if (regionVal === 'peaks') {
          matchesRegion = category === 'peak-climbing' || region === 'peaks' || title.includes('peak') || title.includes('climbing');
        } else if (regionVal === 'short') {
          matchesRegion = duration === 'short' || category === 'short-treks';
        } else if (regionVal === 'remote') {
          matchesRegion = region === 'remote' || region === 'dolpo' || region === 'kanchenjunga' || title.includes('rara') || title.includes('makalu') || title.includes('rolwaling') || title.includes('ruby') || title.includes('dhaulagiri');
        } else {
          matchesRegion = region === regionVal;
        }
      }

      // Duration match
      let matchesDuration = true;
      if (durationVal !== 'all') {
        matchesDuration = duration === durationVal;
      }

      // Difficulty match
      let matchesDifficulty = true;
      if (difficultyVal !== 'all') {
        if (difficultyVal === 'easy-moderate') {
          matchesDifficulty = difficulty === 'easy-moderate' || difficulty === 'easy';
        } else if (difficultyVal === 'strenuous') {
          matchesDifficulty = difficulty === 'strenuous' || difficulty === 'extreme';
        } else {
          matchesDifficulty = difficulty === difficultyVal;
        }
      }

      if (matchesSearch && matchesCategory && matchesRegion && matchesDuration && matchesDifficulty) {
        card.classList.remove('is-hidden');
        card.style.setProperty('display', 'flex', 'important');
        card.classList.add('filter-animating');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.setProperty('display', 'none', 'important');
        card.classList.remove('filter-animating');
      }
    });

    // Remove animation class after transition completes
    setTimeout(() => {
      cards.forEach(c => c.classList.remove('filter-animating'));
    }, 380);

    // Sorting
    let sortedCards = [...cards];
    if (sortVal === 'price-low') {
      sortedCards.sort((a, b) => parseInt(a.getAttribute('data-price') || '0', 10) - parseInt(b.getAttribute('data-price') || '0', 10));
    } else if (sortVal === 'price-high') {
      sortedCards.sort((a, b) => parseInt(b.getAttribute('data-price') || '0', 10) - parseInt(a.getAttribute('data-price') || '0', 10));
    } else if (sortVal === 'duration-short') {
      sortedCards.sort((a, b) => parseInt(a.getAttribute('data-days') || '0', 10) - parseInt(b.getAttribute('data-days') || '0', 10));
    } else if (sortVal === 'duration-long') {
      sortedCards.sort((a, b) => parseInt(b.getAttribute('data-days') || '0', 10) - parseInt(a.getAttribute('data-days') || '0', 10));
    } else {
      sortedCards = [...originalCardsOrder];
    }

    // Re-append sorted cards
    sortedCards.forEach(c => container.appendChild(c));

    // Update Counter Display
    if (countDisplay) {
      if (visibleCount === cards.length) {
        countDisplay.textContent = `Showing All ${cards.length} Available Treks`;
      } else {
        const regionName = regionLabels[regionVal] || '';
        if (regionVal !== 'all') {
          countDisplay.textContent = `Showing ${visibleCount} of ${cards.length} Available Treks (${regionName})`;
        } else {
          countDisplay.textContent = `Showing ${visibleCount} of ${cards.length} Available Treks`;
        }
      }
    }

    // Empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Sync Category quick pills
    categoryPills.forEach(pill => {
      const pCat = pill.getAttribute('data-category');
      if (pCat === categoryVal) {
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-pressed', 'false');
      }
    });

    // Sync Region quick pills
    regionPills.forEach(pill => {
      const pRegion = pill.getAttribute('data-region');
      if (pRegion === regionVal) {
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-pressed', 'false');
      }
    });

    // Update Region Live Status Text & Reset Chip
    if (regionStatusHint) {
      if (regionVal === 'all') {
        regionStatusHint.innerHTML = `Showing all <strong>${cards.length} packages</strong> across 7 Himalayan regions`;
      } else {
        const rLabel = regionLabels[regionVal] || regionVal;
        regionStatusHint.innerHTML = `Filtered: <strong>${visibleCount} packages</strong> in <strong>${rLabel}</strong>`;
      }
    }

    if (clearRegionBtn) {
      clearRegionBtn.style.display = (regionVal !== 'all') ? 'inline-flex' : 'none';
    }

    // Update URL hash without jumping
    if (window.history && window.history.replaceState) {
      const newHash = (regionVal !== 'all') ? '#' + regionVal : '';
      const newUrl = window.location.pathname + window.location.search + newHash;
      window.history.replaceState(null, '', newUrl);
    }
  }

  // Event Listeners for Filters
  if (filterSearch) filterSearch.addEventListener('input', () => applyFilters(false));
  if (filterCategory) filterCategory.addEventListener('change', () => applyFilters(false));
  if (filterRegion) filterRegion.addEventListener('change', () => applyFilters(false));
  if (filterDuration) filterDuration.addEventListener('change', () => applyFilters(false));
  if (filterDifficulty) filterDifficulty.addEventListener('change', () => applyFilters(false));
  if (filterSort) filterSort.addEventListener('change', () => applyFilters(false));

  // Quick Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = pill.getAttribute('data-category') || 'all';
      if (filterCategory) {
        // Toggle behavior: if already active, toggle back to 'all'
        if (filterCategory.value === cat && cat !== 'all') {
          filterCategory.value = 'all';
        } else {
          filterCategory.value = cat;
        }
      }
      applyFilters(false);
    });
  });

  // Quick Region Pills (Ultra-Interactive with toggle and auto-centering)
  regionPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const region = pill.getAttribute('data-region') || 'all';
      if (filterRegion) {
        // Toggle behavior: if clicking already active region, toggle back to 'all'
        if (filterRegion.value === region && region !== 'all') {
          filterRegion.value = 'all';
        } else {
          filterRegion.value = region;
        }
      }

      applyFilters(true);

      // Mobile auto-center active pill
      if (regionScrollContainer) {
        const pillRect = pill.getBoundingClientRect();
        const containerRect = regionScrollContainer.getBoundingClientRect();
        const offset = (pillRect.left + pillRect.width / 2) - (containerRect.left + containerRect.width / 2);
        regionScrollContainer.scrollBy({ left: offset, behavior: 'smooth' });
      }

      // Smooth scroll if user is scrolled far down
      const filterBar = document.getElementById('region-quick-filter-bar');
      if (filterBar) {
        const barRect = filterBar.getBoundingClientRect();
        if (barRect.top < 60) {
          filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Clear Region Reset Chip
  if (clearRegionBtn) {
    clearRegionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (filterRegion) filterRegion.value = 'all';
      applyFilters(false);
    });
  }

  // Full Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (filterSearch) filterSearch.value = '';
      if (filterCategory) filterCategory.value = 'all';
      if (filterRegion) filterRegion.value = 'all';
      if (filterDuration) filterDuration.value = 'all';
      if (filterDifficulty) filterDifficulty.value = 'all';
      if (filterSort) filterSort.value = 'default';
      applyFilters(false);
    });
  }

  // Check URL Hash for Deep Linking on Page Load
  if (window.location.hash) {
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    const validCats = ['base-camp', 'peak-climbing', 'circuits', 'luxury-heli', 'short-treks', 'restricted'];
    const validRegs = ['everest', 'annapurna', 'langtang', 'manaslu', 'mustang', 'dolpo', 'kanchenjunga', 'remote', 'kathmandu'];

    if (validCats.includes(rawHash) && filterCategory) {
      filterCategory.value = rawHash;
    } else if (validRegs.includes(rawHash) && filterRegion) {
      filterRegion.value = rawHash;
    }
  }

  // Initial Run
  applyFilters(false);
});
