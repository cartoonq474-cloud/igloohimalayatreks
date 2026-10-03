const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix buttons missing explicit type="button"
const buttonReplacements = [
  {
    target: '<button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">',
    replace: '<button type="button" class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">'
  },
  {
    target: '<button class="mega-talk-pill open-inquiry-btn">Confused? Let\'s Talk ↗</button>',
    replace: '<button type="button" class="mega-talk-pill open-inquiry-btn">Confused? Let\'s Talk ↗</button>'
  },
  {
    target: '<button class="btn btn-primary open-inquiry-btn mobile-drawer-cta">Plan Custom Trip</button>',
    replace: '<button type="button" class="btn btn-primary open-inquiry-btn mobile-drawer-cta">Plan Custom Trip</button>'
  },
  {
    target: '<div>\n        <button class="btn btn-primary open-inquiry-btn">Book Custom Trip</button>\n      </div>',
    replace: '<div>\n        <button type="button" class="btn btn-primary open-inquiry-btn">Book Custom Trip</button>\n      </div>'
  },
  {
    target: '<button class="btn btn-primary open-inquiry-btn" style="padding: 10px 22px; font-size: 0.92rem;">Plan My Trek ↗</button>',
    replace: '<button type="button" class="btn btn-primary open-inquiry-btn" style="padding: 10px 22px; font-size: 0.92rem;">Plan My Trek ↗</button>'
  },
  {
    target: '<button class="btn open-inquiry-btn" style="background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4); padding: 14px 24px;">Talk to a Trekking Expert ↗</button>',
    replace: '<button type="button" class="btn open-inquiry-btn" style="background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4); padding: 14px 24px;">Talk to a Trekking Expert ↗</button>'
  },
  {
    target: '<button class="btn btn-primary open-inquiry-btn" style="width: 100%; padding: 10px; font-size: 0.88rem;">Speak With a Guide ↗</button>',
    replace: '<button type="button" class="btn btn-primary open-inquiry-btn" style="width: 100%; padding: 10px; font-size: 0.88rem;">Speak With a Guide ↗</button>'
  },
  {
    target: '<button class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>',
    replace: '<button type="button" class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>'
  },
  {
    target: '<button class="btn-journey-pill open-inquiry-btn">',
    replace: '<button type="button" class="btn-journey-pill open-inquiry-btn">'
  }
];

buttonReplacements.forEach(({ target, replace }, i) => {
  if (html.includes(target)) {
    html = html.replace(target, replace);
    console.log(`[PASS] Replaced button #${i + 1}`);
  } else {
    console.warn(`[WARN] Button #${i + 1} target not found!`);
  }
});

// 2. Add WAI-ARIA attributes to FAQ items
for (let i = 1; i <= 10; i++) {
  const targetPattern = new RegExp(
    `(<div class="faq-accordion-item">\\s*<button type="button" class="faq-question-btn" aria-expanded="false">)([\\s\\S]*?<span>${i}\\.[\\s\\S]*?)(<\\/button>\\s*<div class="faq-answer">)`,
    'm'
  );
  
  if (targetPattern.test(html)) {
    html = html.replace(targetPattern, (match, p1, p2, p3) => {
      return `<div class="faq-accordion-item">\n              <button type="button" class="faq-question-btn" aria-expanded="false" id="faq-q-${i}" aria-controls="faq-a-${i}">${p2}</button>\n              <div class="faq-answer" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">`;
    });
    console.log(`[PASS] Accessible FAQ #${i} updated`);
  } else {
    console.warn(`[WARN] FAQ #${i} pattern not matched`);
  }
}

// 3. Fix 3 Related Guide Images Dimensions & decoding="async"
const imgReplacements = [
  {
    target: '<img src="../../images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp" alt="Everest Base Camp Trek" class="related-guide-thumb" loading="lazy">',
    replace: '<img src="../../images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp" alt="Everest Base Camp Trek" class="related-guide-thumb" width="600" height="400" loading="lazy" decoding="async">'
  },
  {
    target: '<img src="../../images/trekking-the-classic-annapurna-circuit.webp" alt="Annapurna Circuit Trek" class="related-guide-thumb" loading="lazy">',
    replace: '<img src="../../images/trekking-the-classic-annapurna-circuit.webp" alt="Annapurna Circuit Trek" class="related-guide-thumb" width="600" height="400" loading="lazy" decoding="async">'
  },
  {
    target: '<img src="../../images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.webp" alt="Altitude Safety" class="related-guide-thumb" loading="lazy">',
    replace: '<img src="../../images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.webp" alt="Altitude Safety" class="related-guide-thumb" width="600" height="400" loading="lazy" decoding="async">'
  }
];

imgReplacements.forEach(({ target, replace }, i) => {
  if (html.includes(target)) {
    html = html.replace(target, replace);
    console.log(`[PASS] Replaced image #${i + 1}`);
  } else {
    console.warn(`[WARN] Image #${i + 1} target not found!`);
  }
});

// 4. Fix Footer Headings Hierarchy Skip
const footerHeadingReplacements = [
  {
    target: '<div class="footer-nav-col">\n          <h4>Main Pages</h4>',
    replace: '<div class="footer-nav-col">\n          <h3>Main Pages</h3>'
  },
  {
    target: '<div class="footer-nav-col">\n          <h4>Essential Info</h4>',
    replace: '<div class="footer-nav-col">\n          <h3>Essential Info</h3>'
  },
  {
    target: '<h2 class="footer-cta-title">Expedition Expertise<br>at Your Service</h2>',
    replace: '<h3 class="footer-cta-title">Expedition Expertise<br>at Your Service</h3>'
  },
  {
    target: '<div class="footer-social-col" style="text-align: right;">\n          <h4>Social Media</h4>',
    replace: '<div class="footer-social-col" style="text-align: right;">\n          <h3>Social Media</h3>'
  }
];

footerHeadingReplacements.forEach(({ target, replace }, i) => {
  if (html.includes(target)) {
    html = html.replace(target, replace);
    console.log(`[PASS] Replaced footer heading #${i + 1}`);
  } else {
    console.warn(`[WARN] Footer heading #${i + 1} target not found!`);
  }
});

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully wrote updated HTML file.');
