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

      // Transmit newsletter subscription to info@igloohimalayatreks.com
      const emailPayload = {
        "Subscription Type": "Himalayan Trail Notes Newsletter",
        "Subscriber Email": email,
        "Source Page URL": window.location.href,
        "Subscribed At (NPT)": new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (NPT)',
        "_subject": `[Newsletter Subscription] ${email}`,
        "_replyto": email,
        "_template": "table",
        "_captcha": "false"
      };

      try {
        fetch('https://formsubmit.co/ajax/info@igloohimalayatreks.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        }).then(res => res.json()).then(data => {
          console.log('Newsletter subscription dispatched to info@igloohimalayatreks.com:', data);
        }).catch(err => {
          console.warn('FormSubmit background notification:', err);
        });
      } catch (err) {
        console.warn('Direct email dispatch notice:', err);
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
