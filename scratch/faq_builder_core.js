const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

// Master FAQ builder for all trek and tour pages
const trekDir = path.join(__dirname, '../trek');
const tourDir = path.join(__dirname, '../tour');

// Helper to sanitize strings for HTML
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Build FAQ HTML section
function buildFaqSectionHtml(h2Title, categoriesData) {
  // categoriesData is { general: [...], permits: [...], accommodation: [...], health: [...], payments: [...], cultural: [...] }
  const catNavHtml = `
              <!-- Left Sidebar Category Navigation -->
              <div class="faq-sidebar-card">
                <div class="faq-category-nav">
                  <button type="button" class="faq-category-btn active" data-category="general">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    General Information
                  </button>
                  <button type="button" class="faq-category-btn" data-category="permits">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </span>
                    Permits and Logistics
                  </button>
                  <button type="button" class="faq-category-btn" data-category="accommodation">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    Accommodation and Food
                  </button>
                  <button type="button" class="faq-category-btn" data-category="health">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </span>
                    Health and Safety
                  </button>
                  <button type="button" class="faq-category-btn" data-category="payments">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </span>
                    Payments & Booking
                  </button>
                  <button type="button" class="faq-category-btn" data-category="cultural">
                    <span class="faq-cat-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                    </span>
                    Cultural Insights
                  </button>
                </div>
              </div>`;

  const renderCategoryItems = (items) => {
    return items.map(item => `
                  <div class="faq-item">
                    <div class="faq-item-question">
                      <span>${esc(item.q)}</span>
                      <span class="faq-toggle-circle">∨</span>
                    </div>
                    <div class="faq-item-answer">
                      ${item.a}
                    </div>
                  </div>`).join('\n');
  };

  const contentPanelHtml = `
              <!-- Right FAQ Content Panel -->
              <div class="faq-main-panel">
                <!-- Header Bar -->
                <div class="faq-panel-header">
                  <h3 class="faq-active-category-title" id="faq-current-category-title">General Information</h3>
                  <button type="button" class="faq-expand-all-btn" id="faq-expand-all-btn">Expand All</button>
                </div>

                <!-- Category 1: General Information -->
                <div class="faq-category-content active" id="faq-cat-general">
${renderCategoryItems(categoriesData.general || [])}
                </div>

                <!-- Category 2: Permits and Logistics -->
                <div class="faq-category-content" id="faq-cat-permits">
${renderCategoryItems(categoriesData.permits || [])}
                </div>

                <!-- Category 3: Accommodation and Food -->
                <div class="faq-category-content" id="faq-cat-accommodation">
${renderCategoryItems(categoriesData.accommodation || [])}
                </div>

                <!-- Category 4: Health and Safety -->
                <div class="faq-category-content" id="faq-cat-health">
${renderCategoryItems(categoriesData.health || [])}
                </div>

                <!-- Category 5: Payments & Booking -->
                <div class="faq-category-content" id="faq-cat-payments">
${renderCategoryItems(categoriesData.payments || [])}
                </div>

                <!-- Category 6: Cultural Insights -->
                <div class="faq-category-content" id="faq-cat-cultural">
${renderCategoryItems(categoriesData.cultural || [])}
                </div>
              </div>`;

  return `<section id="section-faqs" class="trek-detail-section">
            <h2 class="faq-section-accent-title">
              <span class="faq-accent-bar"></span>
              ${esc(h2Title)}
            </h2>

            <div class="faq-layout-container">
${catNavHtml}
${contentPanelHtml}
            </div>
          </section>`;
}

// Update JSON-LD schema with FAQPage
function updateSchemaFaqPage(html, allQuestions) {
  // allQuestions is array of { q, a }
  const faqSchemaEntity = allQuestions.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a.replace(/<[^>]+>/g, '').trim()
    }
  }));

  const schemaRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let schemaFound = false;

  html = html.replace(schemaRegex, (fullMatch, jsonText) => {
    try {
      const parsed = JSON.parse(jsonText.trim());
      if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        schemaFound = true;
        // Filter out old FAQPage
        parsed['@graph'] = parsed['@graph'].filter(item => item['@type'] !== 'FAQPage');
        // Add new FAQPage
        parsed['@graph'].push({
          "@type": "FAQPage",
          "mainEntity": faqSchemaEntity
        });
        return `<script type="application/ld+json">\n${JSON.stringify(parsed, null, 2)}\n</script>`;
      }
    } catch(e) {}
    return fullMatch;
  });

  return html;
}

module.exports = {
  buildFaqSectionHtml,
  updateSchemaFaqPage
};
