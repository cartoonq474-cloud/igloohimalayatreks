/**
 * Nepal Tour Packages - Interactive Filter, Search & Sort Controller
 * Igloo Himalaya Treks
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tours-container');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.card.tour-item'));
  const countDisplay = document.getElementById('tours-count-display');
  const emptyState = document.getElementById('tours-empty-state');

  const filterSearch = document.getElementById('filter-search');
  const filterCategory = document.getElementById('filter-category');
  const filterDuration = document.getElementById('filter-duration');
  const filterSort = document.getElementById('filter-sort');
  const resetBtn = document.getElementById('reset-filters-btn');
  const quickPills = document.querySelectorAll('.category-quick-pill');

  // Keep original order of cards for default sort
  const originalCardsOrder = [...cards];

  function applyFilters() {
    const searchVal = filterSearch ? filterSearch.value.trim().toLowerCase() : '';
    const categoryVal = filterCategory ? filterCategory.value : 'all';
    const durationVal = filterDuration ? filterDuration.value : 'all';
    const sortVal = filterSort ? filterSort.value : 'default';

    let visibleCount = 0;

    // Filter cards
    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const duration = card.getAttribute('data-duration') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const desc = (card.querySelector('.tour-item-desc')?.textContent || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();

      // Search match
      let matchesSearch = true;
      if (searchVal) {
        matchesSearch = title.includes(searchVal) || desc.includes(searchVal) || tags.includes(searchVal);
      }

      // Category match
      let matchesCategory = true;
      if (categoryVal !== 'all') {
        matchesCategory = category === categoryVal;
      }

      // Duration match
      let matchesDuration = true;
      if (durationVal !== 'all') {
        matchesDuration = duration === durationVal;
      }

      if (matchesSearch && matchesCategory && matchesDuration) {
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
        countDisplay.textContent = `Showing All ${cards.length} Available Tour Packages`;
      } else {
        countDisplay.textContent = `Showing ${visibleCount} of ${cards.length} Available Tour Packages`;
      }
    }

    // Empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('is-hidden');
        emptyState.style.setProperty('display', 'block', 'important');
      } else {
        emptyState.classList.add('is-hidden');
        emptyState.style.setProperty('display', 'none', 'important');
      }
    }

    // Sync quick pills active class
    quickPills.forEach(pill => {
      const pCategory = pill.getAttribute('data-category');
      if (pCategory === categoryVal) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Event Listeners for Filters
  if (filterSearch) filterSearch.addEventListener('input', applyFilters);
  if (filterCategory) filterCategory.addEventListener('change', applyFilters);
  if (filterDuration) filterDuration.addEventListener('change', applyFilters);
  if (filterSort) filterSort.addEventListener('change', applyFilters);

  // Quick Category Pills
  quickPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const category = pill.getAttribute('data-category') || 'all';
      if (filterCategory) {
        filterCategory.value = category;
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
      if (filterDuration) filterDuration.value = 'all';
      if (filterSort) filterSort.value = 'default';
      applyFilters();
    });
  }

  // Run initial filter check
  applyFilters();
});
