/**
 * Dedicated Reviews Page Interactive Script
 * Handles Multi-Dimensional Filtering (Region & Platform), Live Search,
 * Read More / Less Toggle, Helpful Vote Persistence, Modal & FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('review-search-input');
  const regionPills = document.querySelectorAll('.filter-pill-btn');
  const platformBtns = document.querySelectorAll('.platform-filter-btn');
  const reviewCards = document.querySelectorAll('.review-card-standalone');
  const statusCounter = document.getElementById('reviews-count-status');
  const noReviewsEl = document.getElementById('no-reviews-found');
  const resetBtn = document.getElementById('reset-search-btn');

  let activeRegion = 'all';
  let activePlatform = 'all';

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    reviewCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region') || 'all';
      const cardPlatform = card.getAttribute('data-platform') || 'all';
      const cardText = card.innerText.toLowerCase();

      const matchesRegion = (activeRegion === 'all' || cardRegion === activeRegion);
      const matchesPlatform = (activePlatform === 'all' || cardPlatform === activePlatform);
      const matchesQuery = (query === '' || cardText.includes(query));

      if (matchesRegion && matchesPlatform && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Counter Status
    if (statusCounter) {
      if (visibleCount === reviewCards.length) {
        statusCounter.innerText = `Showing all ${reviewCards.length} verified reviews`;
      } else {
        statusCounter.innerText = `Showing ${visibleCount} of ${reviewCards.length} verified reviews`;
      }
    }

    // Toggle Empty State
    if (noReviewsEl) {
      if (visibleCount === 0) {
        noReviewsEl.style.display = 'block';
      } else {
        noReviewsEl.style.display = 'none';
      }
    }
  }

  // 1. Region Filter Pills
  regionPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      regionPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeRegion = pill.getAttribute('data-region') || 'all';
      filterCards();
    });
  });

  // 2. Platform Filter Buttons
  platformBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      platformBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = b.getAttribute('data-platform') === 'tripadvisor' ? '#00AA6C' : (b.getAttribute('data-platform') === 'google' ? '#2563EB' : '#1A96C8');
        b.style.borderColor = '#CBD5E1';
      });
      btn.classList.add('active');
      const p = btn.getAttribute('data-platform');
      if (p === 'tripadvisor') {
        btn.style.background = '#00AA6C';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#00AA6C';
      } else if (p === 'google') {
        btn.style.background = '#2563EB';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#2563EB';
      } else {
        btn.style.background = '#1A96C8';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#1A96C8';
      }
      activePlatform = p || 'all';
      filterCards();
    });
  });

  // 3. Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  // 4. Reset Filters Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      activeRegion = 'all';
      activePlatform = 'all';

      regionPills.forEach(p => p.classList.remove('active'));
      const allRegionPill = document.querySelector('.filter-pill-btn[data-region="all"]');
      if (allRegionPill) allRegionPill.classList.add('active');

      platformBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = b.getAttribute('data-platform') === 'tripadvisor' ? '#00AA6C' : (b.getAttribute('data-platform') === 'google' ? '#2563EB' : '#1A96C8');
        b.style.borderColor = '#CBD5E1';
      });
      const allPlatformBtn = document.querySelector('.platform-filter-btn[data-platform="all"]');
      if (allPlatformBtn) {
        allPlatformBtn.classList.add('active');
        allPlatformBtn.style.background = '#1A96C8';
        allPlatformBtn.style.color = '#FFFFFF';
        allPlatformBtn.style.borderColor = '#1A96C8';
      }

      filterCards();
    });
  }

  // 5. Read More / Less Toggle for Long Reviews
  document.addEventListener('click', (e) => {
    const readMoreBtn = e.target.closest('.review-read-more-btn');
    if (!readMoreBtn) return;

    e.preventDefault();
    const wrap = readMoreBtn.closest('.review-text-wrap');
    if (!wrap) return;

    const shortBox = wrap.querySelector('.review-text-short');
    const fullBox = wrap.querySelector('.review-text-full');
    const arrow = readMoreBtn.querySelector('.read-more-arrow');
    const label = readMoreBtn.querySelector('span:first-child');

    if (fullBox.style.display === 'none') {
      fullBox.style.display = 'block';
      shortBox.style.display = 'none';
      if (label) label.innerText = 'Show less';
      if (arrow) arrow.innerText = '↑';
    } else {
      fullBox.style.display = 'none';
      shortBox.style.display = 'block';
      if (label) label.innerText = 'Read full review';
      if (arrow) arrow.innerText = '↓';
    }
  });

  // 6. Helpful Vote Counter with localStorage memory
  const votedKeys = JSON.parse(localStorage.getItem('igloo_helpful_reviews') || '[]');

  const helpfulBtns = document.querySelectorAll('.review-helpful-btn');
  helpfulBtns.forEach((btn, idx) => {
    const countEl = btn.querySelector('.vote-count');
    const reviewId = 'rev_' + idx;

    if (votedKeys.includes(reviewId)) {
      btn.classList.add('voted');
    }

    btn.addEventListener('click', () => {
      if (!countEl) return;
      let currentCount = parseInt(countEl.innerText, 10) || 0;

      if (btn.classList.contains('voted')) {
        btn.classList.remove('voted');
        countEl.innerText = Math.max(0, currentCount - 1);
        const index = votedKeys.indexOf(reviewId);
        if (index > -1) votedKeys.splice(index, 1);
      } else {
        btn.classList.add('voted');
        countEl.innerText = currentCount + 1;
        if (!votedKeys.includes(reviewId)) votedKeys.push(reviewId);
      }
      localStorage.setItem('igloo_helpful_reviews', JSON.stringify(votedKeys));
    });
  });

  // 7. Leave a Review Modal
  const reviewModal = document.getElementById('leave-review-modal');
  const openModalBtns = document.querySelectorAll('.open-review-modal-btn');
  const closeModalBtn = document.getElementById('review-modal-close-btn');
  const reviewForm = document.getElementById('leave-review-form');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (reviewModal) {
        reviewModal.classList.add('active');
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (reviewModal) {
        reviewModal.classList.remove('active');
      }
    });
  }

  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.classList.remove('active');
      }
    });
  }

  // 8. Form Submission Handler
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = reviewForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Your Review...';
      }

      setTimeout(() => {
        if (reviewForm) {
          reviewForm.innerHTML = `
            <div style="text-align: center; padding: 30px 10px;">
              <div style="width: 64px; height: 64px; background: #ECFDF5; color: #10B981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 style="font-size: 1.6rem; color: #0F172A; margin-bottom: 8px;">Review Submitted Successfully!</h3>
              <p style="color: #64748B; font-size: 0.98rem; line-height: 1.6; max-width: 480px; margin: 0 auto 20px auto;">
                Thank you for sharing your experience with Igloo Himalaya Treks! Our team will verify and publish your review shortly.
              </p>
              <button onclick="document.getElementById('leave-review-modal').classList.remove('active')" class="btn btn-primary" style="padding: 10px 26px;">Close Window</button>
            </div>
          `;
        }
      }, 1000);
    });
  }

  // 9. FAQ Accordion Toggle
  const faqHeaders = document.querySelectorAll('.faq-accordion-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const item = header.parentElement;
      const isOpen = item.classList.contains('open') || item.classList.contains('active');
      
      document.querySelectorAll('.faq-accordion-item').forEach(el => el.classList.remove('open', 'active'));
      
      if (!isOpen) {
        item.classList.add('open', 'active');
      }
    });
  });
});
