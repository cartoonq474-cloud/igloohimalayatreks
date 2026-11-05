/**
 * Nepal Trekking Packages - Interactive Filter, Search & Sort Controller
 * Igloo Himalaya Treks
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

  // Keep original order of cards for default sort
  const originalCardsOrder = [...cards];

  function applyFilters() {
    const searchVal = filterSearch ? filterSearch.value.trim().toLowerCase() : '';
    const categoryVal = filterCategory ? filterCategory.value : 'all';
    const regionVal = filterRegion ? filterRegion.value : 'all';
    const durationVal = filterDuration ? filterDuration.value : 'all';
    const difficultyVal = filterDifficulty ? filterDifficulty.value : 'all';
    const sortVal = filterSort ? filterSort.value : 'default';

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
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.setProperty('display', 'none', 'important');
      }
    });

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
        countDisplay.textContent = `Showing ${visibleCount} of ${cards.length} Available Treks`;
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
      } else {
        pill.classList.remove('active');
      }
    });

    // Sync Region quick pills
    regionPills.forEach(pill => {
      const pRegion = pill.getAttribute('data-region');
      if (pRegion === regionVal) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Event Listeners for Filters
  if (filterSearch) filterSearch.addEventListener('input', applyFilters);
  if (filterCategory) filterCategory.addEventListener('change', applyFilters);
  if (filterRegion) filterRegion.addEventListener('change', applyFilters);
  if (filterDuration) filterDuration.addEventListener('change', applyFilters);
  if (filterDifficulty) filterDifficulty.addEventListener('change', applyFilters);
  if (filterSort) filterSort.addEventListener('change', applyFilters);

  // Quick Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = pill.getAttribute('data-category') || 'all';
      if (filterCategory) {
        filterCategory.value = cat;
      }
      applyFilters();
    });
  });

  // Quick Region Pills
  regionPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const region = pill.getAttribute('data-region') || 'all';
      if (filterRegion) {
        filterRegion.value = region;
      }
      applyFilters();
    });
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (filterSearch) filterSearch.value = '';
      if (filterCategory) filterCategory.value = 'all';
      if (filterRegion) filterRegion.value = 'all';
      if (filterDuration) filterDuration.value = 'all';
      if (filterDifficulty) filterDifficulty.value = 'all';
      if (filterSort) filterSort.value = 'default';
      applyFilters();
    });
  }

  // Check URL Hash for Deep Linking on Page Load (e.g. #peak-climbing, #everest)
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
  applyFilters();
});
