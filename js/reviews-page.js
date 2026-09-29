/**
 * Dedicated Reviews Page Interactive Script
 * Handles Region Filtering, Live Search, Helpful Vote Buttons, Modal, and FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('review-search-input');
  const filterPills = document.querySelectorAll('.filter-pill-btn');
  const reviewCards = document.querySelectorAll('.review-card-standalone');

  let activeRegion = 'all';

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    reviewCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region') || 'all';
      const cardText = card.innerText.toLowerCase();

      const matchesRegion = (activeRegion === 'all' || cardRegion === activeRegion);
      const matchesQuery = (query === '' || cardText.includes(query));

      if (matchesRegion && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // 1. Region Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeRegion = pill.getAttribute('data-region') || 'all';
      filterCards();
    });
  });

  // 2. Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  // 3. Helpful Vote Counter
  const helpfulBtns = document.querySelectorAll('.review-helpful-btn');
  helpfulBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.vote-count');
      if (countEl) {
        let currentCount = parseInt(countEl.innerText, 10) || 0;
        if (btn.classList.contains('voted')) {
          btn.classList.remove('voted');
          countEl.innerText = currentCount - 1;
        } else {
          btn.classList.add('voted');
          countEl.innerText = currentCount + 1;
        }
      }
    });
  });

  // 4. Leave a Review Modal
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

  // 5. Form Submission Handler
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
      }, 1200);
    });
  }

  // 6. FAQ Accordion Toggle
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
