const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const hubFile = path.join(ROOT, 'manaslu-region-treks', 'index.html');
let html = fs.readFileSync(hubFile, 'utf8');

// 1. Inject JSON-LD Schema if not present
if (!html.includes('"@type": "CollectionPage"') && !html.includes('"@type": "ItemList"')) {
  const schema = `  <!-- JSON-LD Structured Data Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://igloohimalayatreks.com/manaslu-region-treks/#webpage",
        "url": "https://igloohimalayatreks.com/manaslu-region-treks/",
        "name": "Manaslu Region Treks & Expeditions",
        "description": "Comprehensive guide and package list for trekking in the restricted Manaslu and Tsum Valley regions of Nepal.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://igloohimalayatreks.com/#website",
          "name": "Igloo Himalaya Treks",
          "url": "https://igloohimalayatreks.com"
        }
      },
      {
        "@type": "ItemList",
        "name": "Manaslu Region Trekking Packages",
        "numberOfItems": 4,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Manaslu Circuit Trek (14 Days)", "url": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek/" },
          { "@type": "ListItem", "position": 2, "name": "Manaslu Circuit Trek (12 Days)", "url": "https://igloohimalayatreks.com/trek/manaslu-circuit-trek-12-days/" },
          { "@type": "ListItem", "position": 3, "name": "Tsum Valley Sacred Trek (14 Days)", "url": "https://igloohimalayatreks.com/trek/tsum-valley-trek/" },
          { "@type": "ListItem", "position": 4, "name": "Manaslu & Tsum Valley Combo (18 Days)", "url": "https://igloohimalayatreks.com/trek/manaslu-tsum-valley-trek/" }
        ]
      }
    ]
  }
  </script>\n`;
  html = html.replace(/<link rel="stylesheet" href="\.\.\/index\.css">/, `${schema}  <link rel="stylesheet" href="../index.css">`);
}

// 2. Update Section 1 Category Filters
html = html.replace(
  /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"\s*stroke="currentColor" stroke-width="2">\s*<circle cx="12" cy="12" r="5" \/>\s*<\/svg><\/div><span class="category-filter-title">Tsum Valley Cultural Trek<\/span>/,
  `<a href="../trek/tsum-valley-trek/" class="category-filter-card">
            <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5" />
              </svg></div><span class="category-filter-title">Tsum Valley Cultural Trek</span>`
);

html = html.replace(
  /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"\s*stroke="currentColor" stroke-width="2">\s*<polygon points="12 2 15 8 22 9 17 14 18 21" \/>\s*<\/svg><\/div><span class="category-filter-title">Manaslu & Tsum Combo<\/span>/,
  `<a href="../trek/manaslu-tsum-valley-trek/" class="category-filter-card">
            <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15 8 22 9 17 14 18 21" />
              </svg></div><span class="category-filter-title">Manaslu & Tsum Combo</span>`
);

html = html.replace(
  /<a href="#best-treks" class="category-filter-card">\s*<div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"\s*stroke="currentColor" stroke-width="2">\s*<rect x="3" y="4" width="18" height="18" rx="2" \/>\s*<\/svg><\/div><span class="category-filter-title">Larkya La Pass Express<\/span>/,
  `<a href="../trek/manaslu-circuit-trek-12-days/" class="category-filter-card">
            <div class="category-filter-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
              </svg></div><span class="category-filter-title">Larkya La Pass Express</span>`
);

// 3. Update Section 2 Cards:
// Card 3: Manaslu & Tsum Valley Combo link -> ../trek/manaslu-tsum-valley-trek/
html = html.replace(
  /<h3 style="font-size: 1\.25rem; color: var\(--color-primary-navy\); margin-bottom: 6px; font-weight: 700;">\s*Manaslu & Tsum Valley Combo<\/h3>[\s\S]*?<a href="\.\.\/trek\/manaslu-circuit-trek\/"/,
  `<h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">
                  Manaslu & Tsum Valley Combo</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">
                  Combine the secret Tsum Valley with the full Manaslu circuit for an epic 3-week trip.</p>
              </div>
              <div
                style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span
                    style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong
                    style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$1,690</strong></div>
                <a href="../trek/manaslu-tsum-valley-trek/"`
);

// Card 4: Short Manaslu Circuit -> 12 Days, link to ../trek/manaslu-circuit-trek-12-days/
html = html.replace(
  /<img\s*src="\.\.\/images\/manaslu-circuit-trek-14-days-itinerary-and-cost-igloo\.webp"\s*alt="Short Manaslu Circuit"[\s\S]*?<a href="\.\.\/trek\/manaslu-circuit-trek\/"\s*style="color: #1A96C8; font-weight: 700; font-size: 0\.9rem; text-decoration: none;">Explore →<\/a>/,
  `<img
                src="../images/manaslu-circuit-trek-12-days.webp"
                alt="Manaslu Circuit Trek 12 Days" style="width:100%; height:100%; object-fit:cover;"><span
                style="position: absolute; top: 12px; right: 12px; background: var(--color-primary-navy); color: white; padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 0.75rem;">12
                DAYS</span></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.25rem; color: var(--color-primary-navy); margin-bottom: 6px; font-weight: 700;">
                  Manaslu Circuit Trek (12 Days)</h3>
                <p style="color: var(--color-neutral-600); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">
                  Fast-track circuit utilizing direct road access to Machha Khola and crossing Larkya La (5,106m).</p>
              </div>
              <div
                style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 14px;">
                <div><span
                    style="font-size: 0.72rem; color: var(--color-neutral-500); text-transform: uppercase;">From</span><strong
                    style="display: block; font-size: 1.25rem; color: var(--color-primary-navy);">$990</strong></div>
                <a href="../trek/manaslu-circuit-trek-12-days/"
                  style="color: #1A96C8; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Explore →</a>`
);

// 4. Update Mega Menu Tab 4: Manaslu
const oldMegaManaslu = `<div class="mega-tab-content" id="tab-manaslu">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Circuit & Passes</div>
                        <a href="../trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span>
                          <span class="days-badge">13 DAYS</span></a>
                        <a href="../trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley
                            Combo</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Restricted Valley</div>
                        <a href="../trek/tsum-valley-trek/" class="mega-trek-link"><span>Hidden Tsum Valley Trek</span>
                          <span class="days-badge">14 DAYS</span></a>
                      </div>
                    </div>
                  </div>`;

const newMegaManaslu = `<div class="mega-tab-content" id="tab-manaslu">
                    <div class="mega-content-grid">
                      <div class="mega-col">
                        <div class="mega-col-title">Circuit & Passes</div>
                        <a href="../trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span>
                          <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/manaslu-circuit-trek-12-days/" class="mega-trek-link"><span>Manaslu Circuit Express</span>
                          <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley
                            Combo</span> <span class="days-badge">18 DAYS</span></a>
                      </div>
                      <div class="mega-col">
                        <div class="mega-col-title">Restricted Valley</div>
                        <a href="../trek/tsum-valley-trek/" class="mega-trek-link"><span>Hidden Tsum Valley Trek</span>
                          <span class="days-badge">14 DAYS</span></a>
                      </div>
                    </div>
                  </div>`;

html = html.replace(oldMegaManaslu, newMegaManaslu);

fs.writeFileSync(hubFile, html, 'utf8');
console.log('Updated manaslu-region-treks/index.html successfully');
