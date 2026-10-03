const fs = require('fs');
const path = require('path');

const tourData = JSON.parse(fs.readFileSync(path.join(__dirname, 'tour_faqs_data.json'), 'utf8'));

// SVG icons matching Everest Base Camp Luxury Trek exactly
const categoryIcons = {
  general: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>`,
  permits: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>`,
  accommodation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>`,
  health: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>`,
  payments: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>`,
  cultural: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>`
};

const categoryLabels = {
  general: 'General Information',
  permits: 'Permits and Logistic',
  accommodation: 'Accommodation and Food',
  health: 'Health and Safety',
  payments: 'Payments & Extra Costs',
  cultural: 'Cultural Insights'
};

function renderFaqSection(key) {
  const data = tourData[key];
  if (!data) throw new Error(`Missing tour data for key: ${key}`);

  const catKeys = ['general', 'permits', 'accommodation', 'health', 'payments', 'cultural'];

  let buttonsHtml = '';
  let panelsHtml = '';

  catKeys.forEach((catKey, index) => {
    const isActive = index === 0;
    const activeClass = isActive ? ' active' : '';
    const label = categoryLabels[catKey];
    const icon = categoryIcons[catKey];
    const items = data.categories[catKey] || [];

    buttonsHtml += `                  <button type="button" class="faq-category-btn${activeClass}" data-category="${catKey}">
                    <span class="faq-cat-icon">
                      ${icon}
                    </span>
                    ${label}
                  </button>\n`;

    let itemsHtml = '';
    items.forEach(item => {
      itemsHtml += `                  <div class="faq-item">
                    <div class="faq-item-question">
                      <span>${item.q}</span>
                      <span class="faq-toggle-circle">∨</span>
                    </div>
                    <div class="faq-item-answer">
                      ${item.a}
                    </div>
                  </div>\n\n`;
    });

    panelsHtml += `                <!-- Category ${index + 1}: ${label} -->
                <div class="faq-category-content${activeClass}" id="faq-cat-${catKey}">
${itemsHtml}                </div>\n\n`;
  });

  return `<section id="section-faqs" class="trek-detail-section">
            <h2 class="faq-section-accent-title">
              <span class="faq-accent-bar"></span>
              Frequently Asked Questions for ${data.title}
            </h2>

            <div class="faq-layout-container">
              <!-- Left Sidebar Category Navigation -->
              <div class="faq-sidebar-card">
                <div class="faq-category-nav">
${buttonsHtml}                </div>
              </div>

              <!-- Right FAQ Content Panel -->
              <div class="faq-main-panel">
                <!-- Header Bar -->
                <div class="faq-panel-header">
                  <h3 class="faq-active-category-title" id="faq-current-category-title">General Information</h3>
                  <button type="button" class="faq-expand-all-btn" id="faq-expand-all-btn">Expand All</button>
                </div>

${panelsHtml}              </div>
            </div>
          </section>`;
}

const sampleHtml = renderFaqSection('chitwan-national-park-safari');
console.log('Sample rendered length:', sampleHtml.length);
console.log('Sample preview:\n', sampleHtml.slice(0, 1000));
