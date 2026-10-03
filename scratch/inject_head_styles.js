const fs = require('fs');

const styleBlock = `
  <!-- Dedicated Nepal Trekking Packages Catalog Stylesheet -->
  <style id="catalog-page-styles">
    /* Catalog Layout & Filter System */
    .catalog-filter-section {
      padding: 40px 0 30px 0;
      background-color: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
    }
    .region-pills-wrap {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
      border: 1px solid #E2E8F0;
      margin-bottom: 24px;
      transition: all 0.25s ease;
    }
    .region-pills-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .region-pills-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.98rem;
      font-weight: 700;
      color: #071D36;
      letter-spacing: -0.01em;
      margin: 0;
    }
    .region-pills-title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: #EEF6FF;
      color: #1A96C8;
      font-size: 14px;
    }
    .region-pills-hint {
      font-size: 0.8rem;
      color: #64748B;
      font-weight: 500;
    }
    .region-pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }
    .region-quick-pill {
      background: #F8FAFC;
      color: #1E293B;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      border: 1.5px solid #E2E8F0;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      user-select: none;
      white-space: nowrap;
    }
    .region-quick-pill:hover {
      background: #FFFFFF;
      color: #071D36;
      border-color: #1A96C8;
      box-shadow: 0 3px 10px rgba(26, 150, 200, 0.15);
      transform: translateY(-2px);
    }
    .region-quick-pill:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(26, 150, 200, 0.35);
    }
    .region-quick-pill.active {
      background: #071D36 !important;
      color: #FFFFFF !important;
      border-color: #071D36 !important;
      box-shadow: 0 4px 14px rgba(7, 29, 54, 0.28) !important;
      transform: translateY(-1px);
    }
    .region-quick-pill.active:hover {
      background: #0D2847 !important;
      border-color: #0D2847 !important;
    }
    @media (max-width: 768px) {
      .region-pills-wrap {
        padding: 16px;
        border-radius: 14px;
      }
      .region-pills-header {
        margin-bottom: 12px;
      }
      .region-pills-container {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        padding-bottom: 6px;
        margin-bottom: -2px;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .region-pills-container::-webkit-scrollbar {
        display: none;
      }
      .region-quick-pill {
        flex-shrink: 0;
        scroll-snap-align: start;
        padding: 7px 15px;
        font-size: 0.82rem;
      }
    }
    .catalog-filter-box {
      background: linear-gradient(135deg, #071D36 0%, #0F325E 100%);
      border-radius: 16px;
      padding: 28px 32px;
      box-shadow: 0 12px 35px rgba(7, 29, 54, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }
    .catalog-filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .catalog-filter-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }
    .catalog-filter-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr auto;
      gap: 14px;
      align-items: end;
    }
    @media (max-width: 1200px) {
      .catalog-filter-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 768px) {
      .catalog-filter-grid {
        grid-template-columns: 1fr;
      }
    }
    .catalog-filter-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
      color: #94A3B8;
    }
    .catalog-filter-input,
    .catalog-filter-select {
      width: 100%;
      padding: 11px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.2s ease;
    }
    .catalog-filter-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    .catalog-filter-input:focus,
    .catalog-filter-select:focus {
      border-color: #1A96C8;
      background: rgba(255, 255, 255, 0.14);
      box-shadow: 0 0 0 3px rgba(26, 150, 200, 0.3);
    }
    .catalog-filter-select option {
      background-color: #071D36;
      color: #FFFFFF;
    }
    .btn-reset-filters {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 11px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      width: 100%;
    }
    .btn-reset-filters:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: #FFFFFF;
    }
    .catalog-results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .catalog-results-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: #071D36;
      margin: 0;
    }
    .catalog-grid-container {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 28px !important;
      align-items: stretch !important;
    }
    @media (max-width: 1024px) {
      .catalog-grid-container {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 22px !important;
      }
    }
    @media (max-width: 640px) {
      .catalog-grid-container {
        grid-template-columns: 1fr !important;
        gap: 18px !important;
      }
    }
    .card.trek-item {
      background: #FFFFFF !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.07) !important;
      border: 1px solid rgba(226, 232, 240, 0.9) !important;
      display: flex !important;
      flex-direction: column !important;
      height: 100% !important;
      transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.28s ease !important;
      position: relative !important;
    }
    .card.trek-item:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 16px 36px rgba(14, 52, 88, 0.15) !important;
      border-color: rgba(26, 150, 200, 0.4) !important;
    }
    .trek-item-media {
      position: relative !important;
      height: 220px !important;
      width: 100% !important;
      overflow: hidden !important;
      background-color: #0F172A !important;
      flex-shrink: 0 !important;
    }
    .trek-item-media img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .card.trek-item:hover .trek-item-media img {
      transform: scale(1.06) !important;
    }
    .trek-item-media::after {
      content: '' !important;
      position: absolute !important;
      inset: 0 !important;
      background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.4) 100%) !important;
      pointer-events: none !important;
    }
    .trek-badge-pill {
      position: absolute !important;
      top: 14px !important;
      left: 14px !important;
      z-index: 2 !important;
      font-size: 0.72rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.04em !important;
      text-transform: uppercase !important;
      color: #FFFFFF !important;
      padding: 5px 12px !important;
      border-radius: 9999px !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
    }
    .trek-duration-pill {
      position: absolute !important;
      top: 14px !important;
      right: 14px !important;
      z-index: 2 !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      color: #FFFFFF !important;
      background: rgba(7, 29, 54, 0.8) !important;
      padding: 5px 12px !important;
      border-radius: 9999px !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
    }
    .trek-item-body {
      padding: 24px !important;
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      background: #FFFFFF !important;
    }
    .trek-item-top {
      display: flex !important;
      flex-direction: column !important;
    }
    .trek-item-title {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      color: #071D36 !important;
      line-height: 1.35 !important;
      margin-bottom: 8px !important;
      min-height: 2.7em !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }
    .trek-item-desc {
      font-family: 'Inter', sans-serif !important;
      font-size: 0.88rem !important;
      color: #475569 !important;
      line-height: 1.55 !important;
      margin-bottom: 18px !important;
      min-height: 2.8em !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }
    .trek-item-meta {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      margin-bottom: 20px !important;
    }
    .trek-meta-chip {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      background: #F8FAFC !important;
      color: #334155 !important;
      font-size: 0.8rem !important;
      font-weight: 600 !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid #E2E8F0 !important;
    }
    .trek-item-footer {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-top: 1px solid #E2E8F0 !important;
      padding-top: 16px !important;
      margin-top: auto !important;
      gap: 12px !important;
    }
    .trek-price-wrap {
      display: flex !important;
      flex-direction: column !important;
    }
    .trek-price-label {
      font-size: 0.72rem !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #64748B !important;
      font-weight: 600 !important;
    }
    .trek-price-value {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.35rem !important;
      font-weight: 800 !important;
      color: #071D36 !important;
      line-height: 1.1 !important;
    }
    .trek-action-btn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      background-color: #E05A47 !important;
      color: #FFFFFF !important;
      font-weight: 600 !important;
      font-size: 0.88rem !important;
      padding: 9px 18px !important;
      border-radius: 8px !important;
      text-decoration: none !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 4px 12px rgba(224, 90, 71, 0.25) !important;
    }
    .trek-action-btn:hover {
      background-color: #C84634 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 16px rgba(224, 90, 71, 0.35) !important;
    }
    .treks-empty-card {
      grid-column: 1 / -1 !important;
      background: #FFFFFF !important;
      border: 2px dashed #CBD5E1 !important;
      border-radius: 16px !important;
      padding: 60px 24px !important;
      text-align: center !important;
      display: none;
    }
    .treks-empty-icon {
      font-size: 3rem !important;
      margin-bottom: 16px !important;
      display: block !important;
    }
    .treks-empty-title {
      font-family: 'Outfit', sans-serif !important;
      font-size: 1.4rem !important;
      color: #071D36 !important;
      margin-bottom: 8px !important;
    }
    .treks-empty-text {
      color: #64748B !important;
      max-width: 500px !important;
      margin: 0 auto 20px auto !important;
      font-size: 0.95rem !important;
    }
  </style>`;

function injectHeadStyle(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('id="catalog-page-styles"')) {
    content = content.replace(/<style id="catalog-page-styles">[\s\S]*?<\/style>/, styleBlock.trim());
  } else {
    content = content.replace('</head>', `${styleBlock}\n</head>`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Injected head style into', filePath);
}

injectHeadStyle('nepal-trekking-packages/index.html');
if (fs.existsSync('nepal-trekking-packages.html')) {
  injectHeadStyle('nepal-trekking-packages.html');
}
