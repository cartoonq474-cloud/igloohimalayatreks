/**
 * Custom Itinerary & Inquiry Modal Handler
 * Auto-injects inquiry modal DOM if missing and attaches robust event delegation.
 */

export function setupInquiryModal() {
  // 1. Auto-inject modal HTML into document.body if it doesn't exist yet
  if (!document.getElementById('inquiry-modal')) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'inquiry-modal';
    modalDiv.className = 'modal-overlay';
    modalDiv.innerHTML = `
      <div class="modal-card">
        <button id="modal-close-btn" class="modal-close" aria-label="Close Modal">&times;</button>
        <h3 id="modal-trek-title" style="font-size: 1.5rem; margin-bottom: 6px;">Request a Custom Trip Quote</h3>
        <p style="color: var(--color-neutral-600); margin-bottom: 24px; font-size: 0.95rem;">Tell us your preferences, and our senior trip planner will craft a detailed day-by-day itinerary and pricing options for you.</p>

        <form id="custom-inquiry-form">
          <div class="form-group">
            <label class="form-label" for="inq-name">Full Name *</label>
            <input type="text" id="inq-name" class="form-input" placeholder="e.g. Alex Smith" required>
          </div>

          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label" for="inq-email">Email Address *</label>
              <input type="email" id="inq-email" class="form-input" placeholder="alex@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="inq-phone">WhatsApp / Phone *</label>
              <input type="tel" id="inq-phone" class="form-input" placeholder="+1 (555) 000-0000" required>
            </div>
          </div>

          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label" for="inq-trekkers">Number of Travellers</label>
              <input type="number" id="inq-trekkers" class="form-input" min="1" value="2">
            </div>
            <div class="form-group">
              <label class="form-label" for="inq-month">Expected Travel Month</label>
              <select id="inq-month" class="form-select">
                <option value="autumn">Autumn (Sep - Nov)</option>
                <option value="spring">Spring (Mar - May)</option>
                <option value="winter">Winter (Dec - Feb)</option>
                <option value="monsoon">Monsoon (Jun - Aug)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="inq-notes">Custom Requirements / Questions</label>
            <textarea id="inq-notes" class="form-textarea" rows="4" placeholder="Tell us your preferred itinerary, travel dates, hotel grade, or special requests..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Send Custom Inquiry Request</button>
        </form>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  const modalOverlay = document.getElementById('inquiry-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-trek-title');
  const inquiryForm = document.getElementById('custom-inquiry-form') || document.getElementById('inquiry-form');

  const openModal = (title = "Custom Himalayan Trip") => {
    if (modalTitle) modalTitle.textContent = `Inquire about: ${title}`;
    if (modalOverlay) modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // Robust document-level click listener for all button class variants
  document.addEventListener('click', (e) => {
    // If the click is inside a video card or video trigger, ignore inquiry modal
    if (e.target.closest('.play-video-trigger, .video-card, .video-story-card, .video-thumb-card, .how-works-video-wrapper, .video-review-card, [data-video-src], [data-video-url]')) {
      return;
    }
    const btn = e.target.closest('.open-inquiry-btn, .open-inquiry-modal-btn, .open-inquiry-modal-trigger, .btn-journey-pill, [data-inquiry-type]');
    if (btn) {
      e.preventDefault();
      // Determine best title
      let title = btn.getAttribute('data-trek-title') || btn.getAttribute('data-inquiry-type');
      if (!title) {
        const pageH1 = document.querySelector('h1');
        if (pageH1 && pageH1.textContent.trim()) {
          title = pageH1.textContent.trim();
        } else {
          title = "Custom Himalayan Trip";
        }
      }
      openModal(title);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const card = inquiryForm.closest('.modal-card');
      if (!card) {
        alert("Thank you! Your custom tour inquiry has been received.");
        closeModal();
        inquiryForm.reset();
        return;
      }
      
      const originalHTML = card.innerHTML;
      
      card.innerHTML = `
        <div style="text-align: center; padding: 40px 24px; animation: fadeIn 0.4s ease;">
          <div style="width: 72px; height: 72px; background: rgba(16, 185, 129, 0.1); color: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 2.2rem; font-weight: bold;">✓</div>
          <h3 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--color-primary-navy);">Inquiry Received!</h3>
          <p style="color: var(--color-neutral-600); margin-bottom: 28px; font-size: 1.05rem; line-height: 1.6;">
            Thank you! A Senior Travel Expert from <strong>Igloo Himalaya Treks</strong> will contact you within 4 hours to finalize your itinerary.
          </p>
          <button class="btn btn-primary" id="success-done-btn" style="padding: 12px 36px; border-radius: var(--radius-full); width: auto; font-weight: 600;">Back to Page</button>
        </div>
      `;
      
      const doneBtn = card.querySelector('#success-done-btn');
      if (doneBtn) {
        doneBtn.addEventListener('click', () => {
          closeModal();
          setTimeout(() => {
            card.innerHTML = originalHTML;
            setupInquiryModal();
          }, 400);
        });
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupInquiryModal);
} else {
  setupInquiryModal();
}
