// Client-side interactions for Igloo Himalaya Treks Reference-Matched Footer
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('ref-newsletter-form');
  const feedbackEl = document.getElementById('ref-newsletter-feedback');

  if (newsletterForm && feedbackEl) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@') || !email.includes('.')) {
        feedbackEl.textContent = 'Please enter a valid email address.';
        feedbackEl.className = 'ref-newsletter-feedback error';
        return;
      }

      // Display accessible confirmation
      feedbackEl.textContent = 'Thank you for subscribing! Himalayan Trail Notes are on their way.';
      feedbackEl.className = 'ref-newsletter-feedback success';
      newsletterForm.reset();

      // Reset feedback after 6 seconds
      setTimeout(() => {
        feedbackEl.style.display = 'none';
        feedbackEl.className = 'ref-newsletter-feedback';
        feedbackEl.textContent = '';
      }, 6000);
    });
  }
});
