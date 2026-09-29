/**
 * Careers Page Interactive Application Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const jobModal = document.getElementById('career-application-modal');
  const closeBtn = document.getElementById('career-modal-close-btn');
  const applyBtns = document.querySelectorAll('.apply-job-btn');
  const positionSelect = document.getElementById('app-position');
  const appForm = document.getElementById('career-application-form');

  // Open modal & pre-select position
  applyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const jobTitle = btn.getAttribute('data-job-title');
      
      if (positionSelect && jobTitle) {
        // Try to match option
        let found = false;
        for (let i = 0; i < positionSelect.options.length; i++) {
          if (positionSelect.options[i].value === jobTitle || positionSelect.options[i].text.includes(jobTitle)) {
            positionSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          positionSelect.value = 'General Application';
        }
      }

      if (jobModal) {
        jobModal.classList.add('active');
      }
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (jobModal) {
        jobModal.classList.remove('active');
      }
    });
  }

  // Close modal on outside click
  if (jobModal) {
    jobModal.addEventListener('click', (e) => {
      if (e.target === jobModal) {
        jobModal.classList.remove('active');
      }
    });
  }

  // Form submission handler
  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = appForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit Application';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Application...';
      }

      setTimeout(() => {
        if (appForm) {
          appForm.innerHTML = `
            <div style="text-align: center; padding: 30px 10px;">
              <div style="width: 60px; height: 60px; background: #ECFDF5; color: #10B981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 style="font-size: 1.5rem; color: #0F172A; margin-bottom: 8px;">Application Submitted Successfully!</h3>
              <p style="color: #64748B; font-size: 0.98rem; line-height: 1.6; max-width: 480px; margin: 0 auto 20px auto;">
                Thank you for applying to Igloo Himalaya Treks. Our HR & Expedition team will review your qualifications and reach out via email/WhatsApp shortly.
              </p>
              <button onclick="document.getElementById('career-application-modal').classList.remove('active')" class="btn btn-primary" style="padding: 10px 24px;">Close Window</button>
            </div>
          `;
        }
      }, 1200);
    });
  }

  // FAQ Accordion Toggle
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
