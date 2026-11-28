/**
 * Igloo Himalaya Treks — Centralized Booking & Inquiry System
 * Simplified, High-Conversion Inquiry Form with Custom Searchable Tour & Trek Package Picker
 * Fields: Your Name, Email Address, Phone / WhatsApp, Number of Travelers, Subject [Inquiry : ...], Your Message
 */

const OFFICIAL_PHONE = '+9779860843980';
const OFFICIAL_PHONE_DISPLAY = '+977 9860843980';
const OFFICIAL_EMAIL = 'info@igloohimalayatreks.com';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getModalTemplate(trekTitle = "Custom Himalayan Trip", departureInfo = "") {
  const safeTitle = escapeHtml(trekTitle);
  const safeDeparture = escapeHtml(departureInfo);
  const defaultSubject = safeTitle.toLowerCase().startsWith('inquiry:')
    ? safeTitle
    : `Inquiry: ${safeTitle}${safeDeparture ? ` (Departure: ${safeDeparture})` : ''}`;

  return `
    <div class="modal-card inq-modal-card inq-easy-card" role="dialog" aria-modal="true" aria-labelledby="modal-trek-title">
      <button id="modal-close-btn" class="modal-close" aria-label="Close Inquiry Modal" type="button">&times;</button>
      
      <div class="inq-modal-header">
        <span class="inq-brand-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
          OFFICIAL HIMALAYAN EXPEDITION INQUIRY
        </span>
        <h3 id="modal-trek-title" class="inq-modal-title">Book or Inquire About Your Trek</h3>
        <p class="inq-modal-subtitle">
          Receive a confirmed price quote, customized route plan, and gear checklist within <strong>2–4 hours</strong> from our senior Sherpa team in Kathmandu.
        </p>
        
        <div class="inq-selected-trip-wrap" id="inq-trip-badge-wrap">
          <div class="inq-trip-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span id="inq-badge-trek-name">${safeTitle}</span>
          </div>
          <span class="inq-departure-tag" id="inq-departure-tag" style="${safeDeparture ? 'display: inline-flex;' : 'display: none;'}">
            ${safeDeparture ? `📅 Departure: ${safeDeparture}` : ''}
          </span>
        </div>
      </div>

      <form id="custom-inquiry-form" class="inq-form inq-easy-form" action="https://formsubmit.co/info@igloohimalayatreks.com" method="POST" novalidate>
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_autoresponse" value="Namaste from Igloo Himalaya Treks! Thank you for inquiring. Our Senior Sherpa Expedition Team in Kathmandu has received your details and is preparing your personalized itinerary and confirmed quotation. We will reach out to you within 2–4 hours.">
        <input type="hidden" id="inq-hidden-trek" name="trekTitle" value="${safeTitle}">
        <input type="hidden" id="inq-hidden-departure" name="departureDate" value="${safeDeparture}">

        <!-- Row 1: Your Name & Email Address -->
        <div class="inq-form-grid">
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-name">
              <span>Your Name <span class="required">*</span></span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="inq-name" name="name" autocomplete="name" class="inq-input" placeholder="e.g. Sarah Jenkins" required>
            </div>
            <span class="inq-error-msg" id="inq-name-error">Please enter your name</span>
          </div>

          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-email">
              <span>Email Address <span class="required">*</span></span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input type="email" id="inq-email" name="email" autocomplete="email" class="inq-input" placeholder="sarah@example.com" required>
            </div>
            <span class="inq-error-msg" id="inq-email-error">Please enter a valid email address</span>
          </div>
        </div>

        <!-- Row 2: Phone / WhatsApp & Number of Travelers -->
        <div class="inq-form-grid">
          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-phone">
              <span>Phone / WhatsApp <span class="required">*</span></span>
              <span class="hint">With country code</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input type="tel" id="inq-phone" name="phone" autocomplete="tel" class="inq-input" placeholder="+1 (555) 000-0000" required>
            </div>
            <span class="inq-error-msg" id="inq-phone-error">Please enter a valid phone number</span>
          </div>

          <div class="inq-field-group">
            <label class="inq-field-label" for="inq-trekkers">
              <span>Number of Travelers</span>
              <span class="hint">Group discounts</span>
            </label>
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <select id="inq-trekkers" name="trekkers" class="inq-select" style="-webkit-appearance: none; -moz-appearance: none; appearance: none;">
                <option value="1">1 Person (Solo Trekker)</option>
                <option value="2" selected>2 Persons (Most Popular)</option>
                <option value="3-4">3–4 Persons (Small Group)</option>
                <option value="5-9">5–9 Persons (Group Discount)</option>
                <option value="10+">10+ Persons (Large Group Deal)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Row 3: Subject [inquiry : ............] -->
        <div class="inq-field-group full-width">
          <label class="inq-field-label" for="inq-subject">
            <span>Subject [Inquiry : Tour / Trek Package] <span class="required">*</span></span>
            <span class="hint">Click to choose or search 80+ packages</span>
          </label>
          <div class="inq-custom-select-wrap" id="inq-subject-picker">
            <div class="inq-input-wrap">
              <svg class="inq-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <input type="text" id="inq-subject" name="subject" class="inq-input inq-select-trigger" readonly value="${defaultSubject}" placeholder="Click to choose a Tour or Trek Package..." required>
              <svg class="inq-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="inq-options-dropdown" id="inq-options-dropdown" style="display: none;">
              <div class="inq-search-wrap">
                <input type="text" id="inq-package-search" class="inq-search-input" placeholder="Type to filter packages (e.g. Everest, Mardi, Gokyo, Heli)..." autocomplete="off">
              </div>
              <div class="inq-options-list" id="inq-options-list">
                <div class="inq-opt-group">Everest (Khumbu) Region</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Trek — 14 Days" data-slug="everest-base-camp-trek">Everest Base Camp Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Trek — 16 Days" data-slug="everest-base-camp-trek-16-days">Everest Base Camp Trek (16 Days)</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Trek with Helicopter Return — 12 Days" data-slug="everest-base-camp-trek-heli-return">Everest Base Camp Trek Heli Return — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Trek Without Flight — 17 Days" data-slug="everest-base-camp-trek-without-flight">Everest Base Camp Trek Without Flight — 17 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Luxury Trek — 14 Days" data-slug="everest-base-camp-luxury-trek">Everest Base Camp Luxury Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Three High Passes Trek — 21 Days" data-slug="everest-three-passes-trek">Everest Three High Passes Trek — 21 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: EBC Chola Pass Gokyo Trek — 17 Days" data-slug="ebc-chola-pass-gokyo-trek">EBC Chola Pass Gokyo Trek — 17 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Cho La and Renjo La Pass Trek — 19 Days" data-slug="everest-chola-and-renjo-la-pass-trek">Everest Cho La and Renjo La Pass Trek — 19 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gokyo Lakes Trek — 12 Days" data-slug="gokyo-lakes-trek">Gokyo Lakes Trek — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gokyo Lake Trek with Helicopter Return — 11 Days" data-slug="gokyo-lake-trek-with-helicopter-return">Gokyo Lake Trek with Heli Return — 11 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gokyo Lake Renjo La Pass Trek — 14 Days" data-slug="gokyo-lake-with-renjo-la-pass-trek">Gokyo Lake Renjo La Pass Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gokyo Lakes Luxury Trek — 14 Days" data-slug="gokyo-lakes-luxury-trek">Gokyo Lakes Luxury Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest View Trek — 7 Days" data-slug="everest-view-trek">Everest View Trek — 7 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Tengboche (Tengbuche) Trek — 9 Days" data-slug="tengboche-trek">Tengboche (Tengbuche) Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Pikey Peak Trek — 10 Days" data-slug="pikey-peak-trek">Pikey Peak Trek — 10 Days</div>

                <div class="inq-opt-group">Annapurna Region</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Base Camp Trek — 10 Days" data-slug="annapurna-base-camp">Annapurna Base Camp Trek — 10 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Short Annapurna Base Camp Trek — 9 Days" data-slug="short-annapurna-base-camp-trek">Short Annapurna Base Camp Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: North Annapurna Base Camp Trek — 9 Days" data-slug="north-annapurna-base-camp-trek">North Annapurna Base Camp Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Base Camp Trek Heli Return — 11 Days" data-slug="annapurna-base-camp-heli-return">Annapurna Base Camp Trek Heli Return — 11 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Base Camp Trek via Poon Hill — 13 Days" data-slug="annapurna-base-camp-trek-via-poon-hill">Annapurna Base Camp Trek via Poon Hill — 13 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: ABC with Mardi Himal Trek — 13 Days" data-slug="abc-with-mardi-himal-trek">ABC with Mardi Himal Trek — 13 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Circuit Trek — 14 Days" data-slug="annapurna-circuit-trek">Annapurna Circuit Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Classic Annapurna Circuit Trek — 17 Days" data-slug="classic-annapurna-circuit-trek">Classic Annapurna Circuit Trek — 17 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Circuit with Tilicho Lake — 18 Days" data-slug="annapurna-circuit-with-tilicho-lake">Annapurna Circuit with Tilicho Lake — 18 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Circuit Luxury Trek — 13 Days" data-slug="annapurna-circuit-luxury-trek">Annapurna Circuit Luxury Trek — 13 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna Luxury Trek — 9 Days" data-slug="annapurna-luxury-trek">Annapurna Luxury Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Mardi Himal Trek — 8 Days" data-slug="mardi-himal-trek">Mardi Himal Trek — 8 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Ghorepani Poon Hill Trek — 9 Days" data-slug="ghorepani-poon-hill-trek">Ghorepani Poon Hill Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Ghorepani Poon Hill with Mardi Himal Trek — 12 Days" data-slug="ghorepani-poon-hill-with-mardi-himal-trek">Ghorepani Poon Hill with Mardi Himal — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Khopra Ridge Trek — 11 Days" data-slug="khopra-ridge-trek">Khopra Ridge Trek — 11 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Mohare Danda Trek — 9 Days" data-slug="mohare-danda-trek">Mohare Danda Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Annapurna View Trek — 8 Days" data-slug="annapurna-view-trek">Annapurna View Trek — 8 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Panchase Trek — 8 Days" data-slug="panchase-trek">Panchase Trek — 8 Days</div>

                <div class="inq-opt-group">Manaslu & Tsum Valley</div>
                <div class="inq-opt-item" data-value="Inquiry: Manaslu Circuit Trek — 14 Days" data-slug="manaslu-circuit-trek">Manaslu Circuit Trek — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Manaslu Circuit Trek Budget Friendly — 12 Days" data-slug="manaslu-circuit-trek-12-days">Manaslu Circuit Trek Budget Friendly — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Manaslu Tsum Valley Trek — 20 Days" data-slug="manaslu-tsum-valley-trek">Manaslu Tsum Valley Trek — 20 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Tsum Valley Trek — 14 Days" data-slug="tsum-valley-trek">Tsum Valley Trek — 14 Days</div>

                <div class="inq-opt-group">Langtang, Gosaikunda & Helambu</div>
                <div class="inq-opt-item" data-value="Inquiry: Langtang Valley Trek — 10 Days" data-slug="langtang-valley-trek">Langtang Valley Trek — 10 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gosaikunda Lake Trek — 7 Days" data-slug="gosaikunda-lake-trek">Gosaikunda Lake Trek — 7 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Gosaikunda Trek — 6 Days" data-slug="gosaikunda-trek">Gosaikunda Trek — 6 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Langtang–Gosaikunda–Helambu Trek — 16 Days" data-slug="langtang-gosaikunda-helambu-trek">Langtang–Gosaikunda–Helambu Trek — 16 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Tamang Heritage Trail — 10 Days" data-slug="tamang-heritage-trail-trek">Tamang Heritage Trail — 10 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Tamang Heritage Trail With Langtang Valley Trek — 14 Days" data-slug="tamang-heritage-trail-with-langtang-valley-trek">Tamang Heritage Trail with Langtang Valley — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Helambu Trek — 6 Days" data-slug="helambu-trek">Helambu Trek — 6 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Chisapani Nagarkot Trek — 5 Days" data-slug="chisapani-nagarkot-trek">Chisapani Nagarkot Trek — 5 Days</div>

                <div class="inq-opt-group">Mustang & Dolpo (Forbidden Kingdoms)</div>
                <div class="inq-opt-item" data-value="Inquiry: Upper Mustang Trek — 16 Days" data-slug="upper-mustang-trek">Upper Mustang Trek — 16 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Lower Mustang Trek — 8 Days" data-slug="lower-mustang-trek">Lower Mustang Trek — 8 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Nar Phu Valley Trek — 13 Days" data-slug="nar-phu-valley-trek">Nar Phu Valley Trek — 13 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Upper Dolpo & Shey Gompa Trek — 24 Days" data-slug="upper-dolpo-trek">Upper Dolpo &amp; Shey Gompa Trek — 24 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Lower Dolpo Circuit Trek — 18 Days" data-slug="lower-dolpo-trek">Lower Dolpo Circuit Trek — 18 Days</div>

                <div class="inq-opt-group">Wilderness & Remote Expeditions</div>
                <div class="inq-opt-item" data-value="Inquiry: Kanchenjunga Circuit Trek — 20 Days" data-slug="kanchenjunga-circuit-trek">Inquiry: Kanchenjunga Circuit Trek — 20 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Kanchenjunga Circuit Trek Without Flight — 20 Days" data-slug="kanchenjunga-trek-without-flight">Kanchenjunga Circuit Trek Without Flight — 20 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Kanchenjunga Base Camp Trek — 21 Days" data-slug="kanchenjunga-base-camp-trek">Kanchenjunga Base Camp Trek — 21 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Makalu Base Camp Trek — 18 Days" data-slug="makalu-base-camp-trek">Makalu Base Camp Trek — 18 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Dhaulagiri Circuit Trek — 18 Days" data-slug="dhaulagiri-circuit-trek">Dhaulagiri Circuit Trek — 18 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Rolwaling Valley Trek — 15 Days" data-slug="rolwaling-valley-trek">Rolwaling Valley Trek — 15 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Ruby Valley Trek — 9 Days" data-slug="ruby-valley-trek">Ruby Valley Trek — 9 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Rara Lake Trek — 10 Days" data-slug="rara-lake-trek">Rara Lake Trek — 10 Days</div>

                <div class="inq-opt-group">Peak Climbing Expeditions</div>
                <div class="inq-opt-item" data-value="Inquiry: Island Peak Climbing — 16 Days" data-slug="island-peak-climbing">Island Peak Climbing — 16 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Mera Peak Climbing — 18 Days" data-slug="mera-peak-climbing">Mera Peak Climbing — 18 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Lobuche Peak Climbing With Everest Base Camp — 16 Days" data-slug="lobuche-peak-climbing">Lobuche Peak Climbing with EBC — 16 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Yala Peak Climbing — 12 Days" data-slug="yala-peak-climbing">Yala Peak Climbing — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp Trek with Island Peak Climbing — 19 Days" data-slug="everest-base-camp-trek-with-island-peak-climb">Everest Base Camp Trek with Island Peak — 19 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: EBC Three High Passes with Island Peak Climbing — 20 Days" data-slug="three-high-passes-with-island-peak-climb">EBC Three High Passes with Island Peak — 20 Days</div>

                <div class="inq-opt-group">Nepal Tours & Helicopter Flights</div>
                <div class="inq-opt-item" data-value="Inquiry: Everest Base Camp 1-Day Helicopter Tour" data-slug="everest-base-camp-helicopter-tour">Everest Base Camp 1-Day Helicopter Tour</div>
                <div class="inq-opt-item" data-value="Inquiry: Nepal Luxury Helicopter Sightseeing Tour — 5 Days" data-slug="nepal-luxury-helicopter-tour">Nepal Luxury Helicopter Sightseeing Tour — 5 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Best of Nepal: Kathmandu, Pokhara & Chitwan — 8 Days" data-slug="best-of-nepal-tour">Best of Nepal: Kathmandu, Pokhara &amp; Chitwan — 8 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Kathmandu Valley Cultural Heritage Tour — 4 Days" data-slug="kathmandu-cultural-heritage-tour">Kathmandu Valley Cultural Heritage Tour — 4 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: 1-Day Kathmandu UNESCO City Tour" data-slug="kathmandu-unesco-tour">1-Day Kathmandu UNESCO City Tour</div>
                <div class="inq-opt-item" data-value="Inquiry: Pokhara Lakes, Caves & Sarangkot Sunrise — 4 Days" data-slug="pokhara-tour">Pokhara Lakes, Caves &amp; Sarangkot Sunrise — 4 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Nagarkot Sunrise & Bhaktapur Ancient City — 3 Days" data-slug="nagarkot-bhaktapur-tour">Nagarkot Sunrise &amp; Bhaktapur Ancient City — 3 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Chitwan National Park Jungle Safari — 3 Days" data-slug="chitwan-jungle-safari">Chitwan National Park Jungle Safari — 3 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Romantic Luxury Honeymoon Tour in Nepal — 7 Days" data-slug="nepal-honeymoon-tour">Romantic Luxury Honeymoon Tour in Nepal — 7 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: 7-Day Rara Lake Overland 4WD Jeep Tour" data-slug="rara-lake-jeep-tour">7-Day Rara Lake Overland 4WD Jeep Tour</div>
                <div class="inq-opt-item" data-value="Inquiry: Upper Mustang 4WD Jeep Overland Tour — 12 Days" data-slug="upper-mustang-jeep-tour">Upper Mustang 4WD Jeep Overland Tour — 12 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Upper Mustang Tiji Festival Cultural Tour — 14 Days" data-slug="upper-mustang-tiji-festival">Upper Mustang Tiji Festival Cultural Tour — 14 Days</div>
                <div class="inq-opt-item" data-value="Inquiry: Kathmandu Valley Mountain Biking Tour" data-slug="kathmandu-mountain-biking">Kathmandu Valley Mountain Biking Tour</div>
                <div class="inq-opt-item" data-value="Inquiry: Jamacho Peak Day Hike (2,128m)" data-slug="jamacho-peak-hike">Jamacho Peak Day Hike (2,128m)</div>

                <div class="inq-opt-group">Custom & Special Requests</div>
                <div class="inq-opt-item" data-value="Inquiry: Tailor-Made Custom Himalayan Itinerary" data-slug="custom-plan">Tailor-Made Custom Himalayan Itinerary</div>
                <div class="inq-opt-item" data-value="Inquiry: General Inquiry / Need Expert Advice" data-slug="expert-advice">General Inquiry / Need Expert Advice</div>
              </div>
            </div>
          </div>
          <span class="inq-error-msg" id="inq-subject-error">Please choose an inquiry tour or trek package</span>
        </div>

        <!-- Row 4: Your Message -->
        <div class="inq-field-group full-width">
          <label class="inq-field-label" for="inq-message">
            <span>Your Message <span class="required">*</span></span>
            <span class="hint">Dates, fitness level, or questions</span>
          </label>
          <textarea id="inq-message" name="message" class="inq-textarea" rows="2" placeholder="Tell us your target travel dates, fitness level, preferred pace, or questions for our Sherpa team..." required></textarea>
          <textarea id="inq-notes" name="notes" style="display: none;" tabindex="-1"></textarea>
          <span class="inq-error-msg" id="inq-message-error">Please write your message or question</span>
        </div>

        <!-- Primary Submit Button -->
        <div class="inq-actions-wrap">
          <button type="submit" id="inq-submit-btn" class="inq-submit-btn">
            <span class="btn-text">Send Inquiry &amp; Get Proposal</span>
            <svg class="btn-arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <div class="inq-btn-subtext">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>No payment required today • 100% Free custom route plan &amp; confirmed quote</span>
          </div>
        </div>

        <!-- Alternative WhatsApp Quick Button -->
        <a id="inq-whatsapp-link" href="https://wa.me/9779860843980?text=Hello%20Igloo%20Himalaya%20Treks%2C%20I%20would%20like%20to%20inquire%20about%20booking%20${encodeURIComponent(trekTitle)}" target="_blank" rel="noopener" class="inq-whatsapp-alt">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          <span>Prefer instant answer? Chat with Senior Planner on WhatsApp (${OFFICIAL_PHONE_DISPLAY}) →</span>
        </a>

        <!-- Trust Badges Strip -->
        <div class="inq-trust-strip">
          <div class="inq-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>2–4 Hr Response</span>
          </div>
          <div class="inq-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>100% Guaranteed</span>
          </div>
          <div class="inq-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F6851F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Sherpa Certified</span>
          </div>
          <div class="inq-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>No Booking Fees</span>
          </div>
        </div>
      </form>
    </div>
  `;
}

function getKeywords(str) {
  return (str || '')
    .toLowerCase()
    .replace(/^inquiry:\s*/i, '')
    .replace(/\([a-z]{3}\s*\d+[^)]*\)/gi, ' ')
    .replace(/[^a-z0-9]/g, ' ')
    .split(/\s+/)
    .filter(w => w && !['trek', 'treks', 'tour', 'tours', 'days', 'day', 'and', 'with', 'the', 'from', 'via', 'to', 'in', 'of', 'for', 'inquiry'].includes(w));
}

function matchTitleToItem(title, items) {
  if (!title || !items || !items.length || title.includes('Leave a Review')) return null;

  const rawNorm = title.toLowerCase().replace(/^inquiry:\s*/i, '').replace(/[^a-z0-9]/g, '');

  // 1. Direct equality
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const val = item.getAttribute('data-value') || '';
    const cleanVal = val.toLowerCase().replace(/^inquiry:\s*/i, '').replace(/[^a-z0-9]/g, '');
    const cleanText = item.textContent.trim().toLowerCase().replace(/^inquiry:\s*/i, '').replace(/[^a-z0-9]/g, '');
    if (rawNorm === cleanVal || rawNorm === cleanText) {
      return item;
    }
  }

  // 2. Slug check
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const slug = item.getAttribute('data-slug');
    if (slug) {
      const slugNorm = slug.replace(/[^a-z0-9]/g, '');
      if (rawNorm.includes(slugNorm)) {
        return item;
      }
    }
  }

  // 3. Keyword scoring
  const titleWords = getKeywords(title);
  let bestItem = null;
  let maxScore = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const val = item.getAttribute('data-value') || '';
    const slug = item.getAttribute('data-slug') || '';
    const optWords = new Set([...getKeywords(val), ...getKeywords(slug)]);
    let score = 0;
    titleWords.forEach(w => {
      if (optWords.has(w) || (w === 'tengbuche' && optWords.has('tengboche'))) {
        score += 2;
      } else {
        for (let ow of optWords) {
          if (ow.length > 4 && (ow.startsWith(w) || w.startsWith(ow))) {
            score += 1;
            break;
          }
        }
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestItem = item;
    }
  }

  return maxScore > 0 ? bestItem : null;
}

export function setupInquiryModal() {
  let modalOverlay = document.getElementById('inquiry-modal');

  // Auto-inject modal HTML into document.body if missing or upgrade if outdated
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'inquiry-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none';
    modalOverlay.innerHTML = getModalTemplate();
    document.body.appendChild(modalOverlay);
  } else {
    // If modal lacks the custom searchable picker, upgrade to the clean layout
    if (!modalOverlay.querySelector('#inq-subject-picker') || !modalOverlay.querySelector('.inq-options-dropdown')) {
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = getModalTemplate();
    }
  }

  const modalTitle = document.getElementById('modal-trek-title');
  const badgeTrekName = document.getElementById('inq-badge-trek-name');
  const hiddenTrekInput = document.getElementById('inq-hidden-trek');
  const departureTag = document.getElementById('inq-departure-tag');
  const hiddenDepartureInput = document.getElementById('inq-hidden-departure');
  const whatsappLink = document.getElementById('inq-whatsapp-link');

  // Custom Searchable Dropdown Logic
  const pickerWrap = document.getElementById('inq-subject-picker');
  const subjectInput = document.getElementById('inq-subject');
  const dropdownMenu = document.getElementById('inq-options-dropdown');
  const searchInput = document.getElementById('inq-package-search');
  const optionsList = document.getElementById('inq-options-list');

  function openDropdown() {
    if (!dropdownMenu || !pickerWrap) return;
    dropdownMenu.style.display = 'block';
    pickerWrap.classList.add('open');
    if (searchInput) {
      searchInput.value = '';
      filterOptions('');
      setTimeout(() => searchInput.focus(), 60);
    }
  }

  function closeDropdown() {
    if (!dropdownMenu || !pickerWrap) return;
    dropdownMenu.style.display = 'none';
    pickerWrap.classList.remove('open');
  }

  function toggleDropdown() {
    if (!dropdownMenu) return;
    if (dropdownMenu.style.display === 'none' || !dropdownMenu.style.display) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function filterOptions(term) {
    if (!optionsList) return;
    const cleanTerm = (term || '').trim().toLowerCase();
    const groups = optionsList.querySelectorAll('.inq-opt-group');
    const items = optionsList.querySelectorAll('.inq-opt-item');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const val = (item.getAttribute('data-value') || '').toLowerCase();
      if (!cleanTerm || text.includes(cleanTerm) || val.includes(cleanTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });

    // Hide opt-groups with zero visible children
    groups.forEach(group => {
      let next = group.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('inq-opt-group')) {
        if (next.classList.contains('inq-opt-item') && next.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        next = next.nextElementSibling;
      }
      group.style.display = hasVisible ? 'block' : 'none';
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterOptions(e.target.value);
    });
    searchInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  }

  if (optionsList) {
    optionsList.addEventListener('click', (e) => {
      const item = e.target.closest('.inq-opt-item');
      if (!item) return;

      const fullVal = item.getAttribute('data-value') || `Inquiry: ${item.textContent.trim()}`;
      const cleanTrek = item.textContent.trim();

      if (subjectInput) subjectInput.value = fullVal;
      if (badgeTrekName) badgeTrekName.textContent = cleanTrek;
      if (hiddenTrekInput) hiddenTrekInput.value = cleanTrek;
      if (modalTitle) modalTitle.textContent = `Book / Inquire: ${cleanTrek}`;

      // Highlight selected
      const allItems = optionsList.querySelectorAll('.inq-opt-item');
      allItems.forEach(it => it.classList.remove('selected'));
      item.classList.add('selected');

      // Update WhatsApp link
      if (whatsappLink) {
        const dep = hiddenDepartureInput ? hiddenDepartureInput.value : '';
        const waMsg = dep
          ? `Hello Igloo Himalaya Treks, I would like to inquire about booking ${cleanTrek} for departure: ${dep}.`
          : `Hello Igloo Himalaya Treks, I would like to inquire about booking ${cleanTrek}.`;
        whatsappLink.href = `https://wa.me/9779860843980?text=${encodeURIComponent(waMsg)}`;
      }

      // Clear error
      if (subjectInput) {
        subjectInput.classList.remove('has-error');
        const err = document.getElementById('inq-subject-error');
        if (err) err.style.display = 'none';
      }

      closeDropdown();
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (pickerWrap && !pickerWrap.contains(e.target)) {
      closeDropdown();
    }
  });

  const openModal = (title = "Custom Himalayan Trip", departure = "") => {
    // Clean up title
    const cleanTitle = (title || "Custom Himalayan Trip").trim();

    // Update labels and hidden inputs
    if (badgeTrekName) badgeTrekName.textContent = cleanTitle;
    if (hiddenTrekInput) hiddenTrekInput.value = cleanTitle;
    if (modalTitle) {
      modalTitle.textContent = cleanTitle.toLowerCase().includes('inquire') || cleanTitle.toLowerCase().includes('custom')
        ? cleanTitle
        : `Book / Inquire: ${cleanTitle}`;
    }

    if (departureTag) {
      if (departure) {
        departureTag.textContent = `📅 Departure: ${departure}`;
        departureTag.style.display = 'inline-flex';
        if (hiddenDepartureInput) hiddenDepartureInput.value = departure;
      } else {
        departureTag.textContent = '';
        departureTag.style.display = 'none';
        if (hiddenDepartureInput) hiddenDepartureInput.value = '';
      }
    }

    // Auto-select the matching tour or trek package in the custom picker
    if (optionsList && subjectInput) {
      const items = Array.from(optionsList.querySelectorAll('.inq-opt-item'));
      const matchItem = matchTitleToItem(cleanTitle, items);
      items.forEach(it => it.classList.remove('selected'));

      if (matchItem) {
        matchItem.classList.add('selected');
        const formattedSubj = matchItem.getAttribute('data-value') || `Inquiry: ${cleanTitle}`;
        subjectInput.value = departure ? `${formattedSubj} (Departure: ${departure})` : formattedSubj;
      } else if (cleanTitle.toLowerCase().includes('custom') || cleanTitle.toLowerCase().includes('tailor')) {
        subjectInput.value = "Inquiry: Tailor-Made Custom Himalayan Itinerary";
      } else if (cleanTitle) {
        const formattedSubj = cleanTitle.toLowerCase().startsWith('inquiry:')
          ? cleanTitle
          : `Inquiry: ${cleanTitle}${departure ? ` (Departure: ${departure})` : ''}`;
        subjectInput.value = formattedSubj;
      }
    }

    // Update WhatsApp link
    if (whatsappLink) {
      const waMsg = departure
        ? `Hello Igloo Himalaya Treks, I would like to inquire about booking ${cleanTitle} for departure: ${departure}.`
        : `Hello Igloo Himalaya Treks, I would like to inquire about booking ${cleanTitle}.`;
      whatsappLink.href = `https://wa.me/9779860843980?text=${encodeURIComponent(waMsg)}`;
    }

    // Reset errors
    clearFormErrors();
    closeDropdown();

    if (modalOverlay) {
      modalOverlay.style.display = 'flex';
      requestAnimationFrame(() => {
        modalOverlay.classList.add('active');
      });
    }
    document.body.style.overflow = 'hidden';

    // Autofocus name
    setTimeout(() => {
      const nameInput = document.getElementById('inq-name');
      if (nameInput) nameInput.focus();
    }, 100);
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        modalOverlay.style.display = 'none';
      }, 200);
    }
    closeDropdown();
    document.body.style.overflow = '';
  };

  function clearFormErrors() {
    const errorInputs = modalOverlay ? modalOverlay.querySelectorAll('.has-error') : [];
    errorInputs.forEach(el => el.classList.remove('has-error'));
    const errorMsgs = modalOverlay ? modalOverlay.querySelectorAll('.inq-error-msg') : [];
    errorMsgs.forEach(el => { el.style.display = 'none'; });
  }

  // Live validation error clearing on input/change
  modalOverlay.addEventListener('input', (e) => {
    const target = e.target;
    if (target && target.classList.contains('has-error')) {
      target.classList.remove('has-error');
      const errEl = document.getElementById(`${target.id}-error`);
      if (errEl) errEl.style.display = 'none';
    }
  });

  // Global document-level click listener for inquiry buttons
  document.addEventListener('click', (e) => {
    // If click is inside video trigger, ignore
    if (e.target.closest('.play-video-trigger, .video-card, .video-story-card, .video-thumb-card, .how-works-video-wrapper, .video-review-card, [data-video-src], [data-video-url]')) {
      return;
    }

    // Close button trigger
    const closeTrigger = e.target.closest('.modal-close, #modal-close-btn, #close-inquiry-modal, #inq-success-close-btn');
    if (closeTrigger && modalOverlay && modalOverlay.contains(closeTrigger)) {
      closeModal();
      return;
    }

    // Click outside modal card to close
    if (e.target === modalOverlay) {
      closeModal();
      return;
    }

    // Check if clicked button is an inquiry or booking trigger
    const btn = e.target.closest([
      '.open-inquiry-btn',
      '.open-inquiry-modal-btn',
      '.open-inquiry-modal-trigger',
      '.btn-journey-pill',
      '.btn-book-now',
      '#btn-select-private-date',
      '.btn-leave-review',
      '.mega-talk-pill',
      '.mobile-drawer-cta',
      '[data-inquiry-type]'
    ].join(', '));

    if (btn) {
      e.preventDefault();

      let title = btn.getAttribute('data-trek-title') || btn.getAttribute('data-inquiry-type');
      let departureInfo = '';

      // Check if clicked inside a departure row
      const depRow = btn.closest('.departure-item-row');
      if (depRow) {
        const depTitleEl = depRow.querySelector('.departure-title');
        const depPriceEl = depRow.querySelector('.departure-price');
        if (depTitleEl) {
          departureInfo = depTitleEl.textContent.trim();
          if (depPriceEl) departureInfo += ` (${depPriceEl.textContent.trim()})`;
        }
      }

      if (!title) {
        const pageH1 = document.querySelector('h1');
        if (pageH1 && pageH1.textContent.trim()) {
          title = pageH1.textContent.trim();
        } else {
          title = "Custom Himalayan Trip";
        }
      }

      const inquiryMessage = btn.getAttribute('data-inquiry-message');
      const messageInput = document.getElementById('inq-message');
      if (inquiryMessage && messageInput) {
        messageInput.value = inquiryMessage;
      }

      openModal(title, departureInfo);
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Submission Handler
  const attachFormSubmit = () => {
    const inquiryForm = (modalOverlay && modalOverlay.querySelector('form')) ||
                        document.getElementById('custom-inquiry-form') ||
                        document.getElementById('inquiry-form') ||
                        document.getElementById('trek-inquiry-form');
    if (!inquiryForm) return;

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('inq-name');
      const emailEl = document.getElementById('inq-email');
      const phoneEl = document.getElementById('inq-phone');
      const trekkersEl = document.getElementById('inq-trekkers');
      const subjectEl = document.getElementById('inq-subject');
      const messageEl = document.getElementById('inq-message') || document.getElementById('inq-notes');
      const hiddenTrekEl = document.getElementById('inq-hidden-trek');
      const hiddenDepEl = document.getElementById('inq-hidden-departure');
      const submitBtn = document.getElementById('inq-submit-btn');

      let isValid = true;
      let firstInvalid = null;

      // Validate Name
      const nameVal = nameEl ? nameEl.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (nameEl) nameEl.classList.add('has-error');
        const err = document.getElementById('inq-name-error');
        if (err) err.style.display = 'block';
        if (!firstInvalid) firstInvalid = nameEl;
      }

      // Validate Email
      const emailVal = emailEl ? emailEl.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        isValid = false;
        if (emailEl) emailEl.classList.add('has-error');
        const err = document.getElementById('inq-email-error');
        if (err) err.style.display = 'block';
        if (!firstInvalid) firstInvalid = emailEl;
      }

      // Validate Phone
      const phoneVal = phoneEl ? phoneEl.value.trim() : '';
      if (!phoneVal || phoneVal.replace(/\D/g, '').length < 6) {
        isValid = false;
        if (phoneEl) phoneEl.classList.add('has-error');
        const err = document.getElementById('inq-phone-error');
        if (err) err.style.display = 'block';
        if (!firstInvalid) firstInvalid = phoneEl;
      }

      // Validate Subject
      const subjectVal = subjectEl && subjectEl.value ? subjectEl.value.trim() : '';
      if (!subjectVal || subjectVal.length < 3) {
        isValid = false;
        if (subjectEl) subjectEl.classList.add('has-error');
        const err = document.getElementById('inq-subject-error');
        if (err) err.style.display = 'block';
        if (!firstInvalid) firstInvalid = subjectEl;
      }

      // Validate Message
      const messageVal = messageEl ? messageEl.value.trim() : '';
      if (!messageVal || messageVal.length < 5) {
        isValid = false;
        if (messageEl) messageEl.classList.add('has-error');
        const err = document.getElementById('inq-message-error');
        if (err) err.style.display = 'block';
        if (!firstInvalid) firstInvalid = messageEl;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Collect data
      const departureDate = hiddenDepEl ? hiddenDepEl.value : '';
      const trekkers = trekkersEl ? trekkersEl.options[trekkersEl.selectedIndex].text : '2 Persons';
      const cleanTrekTitle = subjectVal.replace(/^Inquiry:\s*/i, '').trim();

      // Save to localStorage for safety
      try {
        const payload = {
          trekTitle: cleanTrekTitle,
          subject: subjectVal,
          departureDate,
          name: nameVal,
          email: emailVal,
          phone: phoneVal,
          trekkers,
          message: messageVal,
          submittedAt: new Date().toISOString()
        };
        localStorage.setItem('igloo_last_inquiry', JSON.stringify(payload));
      } catch (err) {
        // LocalStorage fallback
      }

      // Loading state on button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <div class="spinner"></div>
          <span>Sending Your Inquiry...</span>
        `;
      }

      // Generate pre-filled WhatsApp follow-up link
      const waSummary = `Namaste Igloo Himalaya Treks! I just submitted an inquiry on your website.\n\n` +
        `• Name: ${nameVal}\n` +
        `• Subject: ${subjectVal}\n` +
        `• Phone: ${phoneVal}\n` +
        `• Travelers: ${trekkers}\n` +
        `• Message: ${messageVal}`;

      const waUrl = `https://wa.me/9779860843980?text=${encodeURIComponent(waSummary)}`;

      // Transmit all inquiry details directly to info@igloohimalayatreks.com
      const emailPayload = {
        "Full Name": nameVal,
        "Email Address": emailVal,
        "Phone / WhatsApp": phoneVal,
        "Number of Travelers": trekkers,
        "Subject": subjectVal,
        "Trek / Package": cleanTrekTitle,
        "Departure Date": departureDate || "Flexible",
        "Your Message": messageVal,
        "Source Page URL": window.location.href,
        "Submitted At (NPT)": new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (NPT)',
        "_subject": subjectVal.includes(nameVal) ? subjectVal : `${subjectVal} - ${nameVal}`,
        "_replyto": emailVal,
        "_template": "table",
        "_captcha": "false",
        "_autoresponse": `Namaste from Igloo Himalaya Treks! Thank you for inquiring about ${cleanTrekTitle}. Our senior trekking specialists in Kathmandu have received your details and are preparing your personalized route proposal, permit checklist, and quotation. We will respond within 2–4 hours.`
      };

      // Detect selected package slug from picker or trek URL
      const selectedOpt = document.querySelector('#inq-options-list .inq-opt-item.selected');
      const pathMatch = window.location.pathname.match(/^\/(?:trek|tour)\/([^/]+)/);
      const packageSlug = (selectedOpt && selectedOpt.getAttribute('data-slug')) || (pathMatch ? pathMatch[1] : undefined);

      // Submit to CMS PostgreSQL backend first, with FormSubmit fallback for static-only hosting
      const apiPayload = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        travelersLabel: trekkers,
        preferredDate: departureDate || undefined,
        subject: subjectVal,
        message: messageVal,
        packageSlug,
        packageTitle: cleanTrekTitle,
        source: 'MODAL',
        sourceUrl: window.location.href
      };

      const renderSuccess = (referenceCode = '', serverWaUrl = '') => {
        const finalWaUrl = serverWaUrl || waUrl;
        const refBadgeHtml = referenceCode
          ? `<div style="display: inline-block; background: #EEF6FF; color: #0E3458; border: 1px solid #BFDBFE; border-radius: 999px; padding: 4px 12px; font-size: 0.82rem; font-weight: 700; margin-bottom: 12px;">Reference: ${escapeHtml(referenceCode)}</div>`
          : '';
        const card = inquiryForm.closest('.modal-card');
        if (!card) {
          alert('Thank you! Your inquiry has been submitted. Our team will contact you shortly.');
          closeModal();
          inquiryForm.reset();
          return;
        }

        const originalHTML = card.innerHTML;

        card.innerHTML = `
          <div class="inq-success-wrap">
            <div class="inq-success-icon-box">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            ${refBadgeHtml}
            <h3 class="inq-success-title">Inquiry Received! Namaste, ${escapeHtml(nameVal)}</h3>
            <p class="inq-success-desc">
              Thank you for trusting <strong>Igloo Himalaya Treks</strong>! Our Senior Expedition Planner has received your inquiry for <strong>${escapeHtml(subjectVal)}</strong> (${escapeHtml(trekkers)}).
              <br><br>
              We are preparing your personalized day-by-day route, gear checklist, and best price quotation. You will hear from us within <strong>2–4 hours</strong> on WhatsApp and Email.
            </p>
            <div class="inq-success-actions">
              <a href="${finalWaUrl}" target="_blank" rel="noopener" class="inq-submit-btn" style="width: auto; padding: 12px 28px; text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                <span>Connect on WhatsApp for Instant Reply</span>
              </a>
              <button type="button" id="inq-success-done-btn" class="btn" style="background: #F1F5F9; color: #0E3458; border: 1px solid #CBD5E1; padding: 12px 28px; border-radius: 50px; font-weight: 700; cursor: pointer;">
                Close &amp; Back to Page
              </button>
            </div>
            <div style="margin-top: 22px; font-size: 0.86rem; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 14px;">
              Direct Phone Assistance: <a href="tel:${OFFICIAL_PHONE}" style="color: #1A96C8; font-weight: 700; text-decoration: none;">${OFFICIAL_PHONE_DISPLAY}</a> &bull; Email: <a href="mailto:${OFFICIAL_EMAIL}" style="color: #1A96C8; font-weight: 700; text-decoration: none;">${OFFICIAL_EMAIL}</a>
            </div>
          </div>
        `;

        const doneBtn = card.querySelector('#inq-success-done-btn');
        if (doneBtn) {
          doneBtn.addEventListener('click', () => {
            closeModal();
            setTimeout(() => {
              card.innerHTML = originalHTML;
              attachFormSubmit();
            }, 300);
          });
        }
      };

      fetch('/api/v1/public/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiPayload)
      })
        .then(async (res) => {
          const data = await res.json().catch(() => null);
          if (!res.ok || !data || !data.success) {
            throw new Error('Backend API unavailable');
          }
          renderSuccess(data.data.referenceCode, data.data.whatsappUrl);
        })
        .catch(() => {
          // Static-host fallback via FormSubmit
          fetch('https://formsubmit.co/ajax/info@igloohimalayatreks.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
          }).catch(() => {});
          setTimeout(() => renderSuccess('', ''), 450);
        });
    });
  };

  attachFormSubmit();

  // Support opening via hash anchor e.g. #inquiry-modal or #book
  if (typeof window !== 'undefined' && ['#inquiry-modal', '#book', '#inquire'].includes(window.location.hash)) {
    const pageH1 = document.querySelector('h1');
    const autoTitle = pageH1 && pageH1.textContent.trim() ? pageH1.textContent.trim() : "Custom Himalayan Trip";
    openModal(autoTitle);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupInquiryModal);
} else {
  setupInquiryModal();
}
