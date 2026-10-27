# Igloo Himalaya Treks Development Guidelines

All agents and developers working in this repository must strictly adhere to the standards outlined below.

## Mandatory Quality Standards & "Never-Repeat" Rules

Refer to the full rules specification in [.agents/rules/trek-page-quality-rules.md](.agents/rules/trek-page-quality-rules.md) and skill [.agents/skills/trek-page-builder/SKILL.md](.agents/skills/trek-page-builder/SKILL.md).

### The 18 Non-Negotiable Rules:

1. **Both Columns Mandatory**:
   - The main layout `.trek-detail-layout` is a 2-column grid (`grid-template-columns: 2.2fr 1fr; gap: 40px;`).
   - Left column contains the sequentially numbered content sections (`<div style="min-width: 0;">`).
   - Right column MUST ALWAYS include `<div class="trek-sidebar-col">` with the sticky `.sidebar-booking-card` (`top: 148px; z-index: 50;`).

2. **Pre-Footer Element Ordering**:
   - The pre-footer `#inquiry-modal` modal dialog MUST ALWAYS be placed before `.you-might-like-section`.
   - Never place the modal after the recommendation section or after the footer.

3. **No Orphan CSS Classes or Unstyled Markup**:
   - NEVER use custom class names (e.g., `.why-book-card`, `.rich-highlights-grid`, `.faq-top-banner`) without verifying they exist in `index.css`.
   - If styles do not exist in `index.css`, use verified inline styles or add scoped styles in `index.css`.

4. **Preserve All JavaScript Data Hooks**:
   - Key Trip Facts: `data-altitude-m="{meters}"` on altitude facts (required for `js/altitude-visualizer.js`).
   - Section subnav: `data-tab="{section_name}"` matching `id="section-{section_name}"`.
   - Page container: `data-trek-details-wrapper data-trek-key="{trek_slug}"` (for `js/trek-details.js` localStorage tracking).
   - Modal buttons: `class="btn open-inquiry-btn" data-trek-title="{Full Trek Title}"`.

5. **Single Source of Truth (SSOT)**:
   - Ensure trek title, duration (e.g. `11 Days`), starting price (e.g. `$925`), max altitude (e.g. `4,660 m`), and WhatsApp pre-filled text match 100% across:
     - JSON-LD schemas (`TouristTrip` and `FAQPage`)
     - Hero badges and titles
     - Key Trip Facts
     - Booking sidebar
     - Inquiry modal
     - Package pricing tables

6. **Highlights Component (Nar Phu Valley Gold Standard)**:
   - Container: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">`.
   - Title: `<h2>` with copper-orange star icon (`<polygon points="12 2 15.09 8.26 ...">`).
   - Grid: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">`.
   - Items: Flex container with an emerald-green circular checkmark badge (`#ECFDF5` background, `#10B981` border and stroke) and a 0.98rem span.
   - **NEVER** output raw wireframe triangles (`<polygon points="12 2 2 22 22 22"></polygon>`) or unstyled class blocks.

7. **Authentic Hero Bento Imagery**:
   - Hero Bento galleries must showcase 5 authentic, trek-specific WebP images (1 main panoramic + 4 sub-grid tiles featuring viewpoints, lodges, local trails, culture) with TripAdvisor Travelers' Choice badge.
   - Main photo must match `og:image` and `twitter:image`. All image paths must resolve to physical files in `/images/`.

8. **Comprehensive 14-Item Key Trip Facts**:
   - Render all 14 authentic trip facts from client specifications.
   - Each item must have a distinct semantic SVG icon housed in a circular `#F2F4F6` background badge with `#1A96C8` stroke.
   - Follow 3-tier hierarchy: uppercase category tag, bold primary headline, and subtle detail subtitle.

9. **Clean Standalone Section Architecture**:
   - Never nest Elevation Profile (`#section-altitude-profile`) or Weather (`#section-weather`) inside Read Before You Book (`#section-details`).
   - Keep them standalone with their own subnav anchors and authentic data.
   - Accordion cards in `#section-details` must include the circular SVG reading progress ring and `.detail-check-bubble` status checkmarks.

10. **Authentic Full-Width Recommendations**:
    - `.you-might-like-section` must feature 4 authentic, regionally relevant packages with duration badges, valid links, real webp imagery, and auto-fit grid (`grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));`).
    - Never leave generic Everest cards or dummy `#` links.

11. **Zero Cross-Trek Copy Contamination**:
    - Reviews (`#section-reviews`), hero read-more scripts, and itinerary copy must be 100% authentic to the trek.
    - Never leave leftover copy or IDs from other treks (e.g. Tilicho Lake, Thorong La, EBC, or `#ebc-toggle-btn`).

12. **Client Source Document Verbatim Parity**:
    - When working from a client Google Doc or brief, ensure 100% verbatim capture of all sections, sub-tables, packing items, higher places, seasonal conditions, and FAQs. Validate using an automated parity check script.

13. **Itinerary Architecture, Timeline Dots & Semantic Badges**:
    - Header Bar: Must use `<div class="itinerary-header-bar">` and `<button id="toggle-all-itinerary" class="itinerary-toggle-all-btn" type="button">` with animated SVG chevron (hooks to `js/trek-details.js`). NEVER use unstyled `.itinerary-expand-all-btn`.
    - Timeline Dots: `.itinerary-card` must have `overflow: visible !important;` so the 14px circular timeline dot (`::before` at `left: -28px; top: 26px; border: 3px solid #1A96C8;`) displays centered on the vertical line (`border-left: 2px solid #E2E8F0;`).
    - Daily Fact Boxes: Render Google Doc daily facts inside `.itinerary-meta-box` and `.itinerary-meta-box-item` with color-coded `.itinerary-meta-box-badge` SVGs (Activity = blue compass, Altitude = amber mountain, Accommodation = green lodge, Meals = rose cutlery, Time = blue clock, Route = purple map pin). NEVER output plain unstyled grey wireframe tables.
    - Rich Subtitles: Include 3-part subtitle with `data-altitude-m="{meters}"`: `[Action] — <span data-altitude-m="{meters}">[Overnight Altitude & Location]</span> — [Duration/Highlight]`.
    - Narrative Paragraphs: Wrap narrative paragraphs inside `.itinerary-description` with verbatim client copy preserved.

14. **Zero-MVP First-Pass Publishing Mandate**:
    - When publishing content from a Google Doc or brief, NEVER output wireframe or MVP placeholder sections (e.g. basic unstyled tables, grey boxes, plain bullet lists, or incomplete tabs).
    - Every single section (Subnav, Highlights, Inclusions/Exclusions, Starting Prices, Packing List, Read Before You Book, Standalone Altitude Profile, Weather, Booking Banner, Reviews, Categorized FAQs, and Bottom CTA Card) MUST be generated in full production-grade Gold Standard styling immediately in Pass 1.

15. **FAQ Panel Visibility & Inline Style Rule**:
    - NEVER write inline `style="display: none;"` on `.faq-category-content` containers.
    - Visibility must be governed strictly by CSS (`.faq-category-content { display: none; }` and `.faq-category-content.active { display: block; }`). Hardcoded inline `display: none` overrides the active CSS class and breaks tab switching.
    - Accordion items must include `.faq-toggle-circle` with smooth CSS rotation, and the header must include `<button id="faq-expand-all-btn" class="faq-expand-all-btn" type="button">Expand All</button>`.

16. **High-Conversion Book / Enquire Bottom CTA Card**:
    - At the bottom of Section 11 (`#section-faqs`) before `</section>`, NEVER output a plain `#F8FAFC` gray box.
    - Must feature the ultra-premium high-conversion gradient card (`background: linear-gradient(135deg, #0A2540 0%, #0E3458 55%, #144A75 100%);`) with glowing radial accents, frosted glass kicker badge (`PLAN YOUR HIMALAYAN EXPEDITION`), verbatim client copy, dual action buttons (`Enquire Now` with modal trigger + `Chat on WhatsApp` with pre-filled text), and 3 trust badges (100% Guaranteed Departures, 2–4 Hr Response, Certified High-Altitude Sherpa Guides).

17. **Reviews & Testimonials 3-Tab Architecture**:
    - `#section-reviews` must feature the 3-tab filter system (`All Reviews`, `Video Stories`, `Photo Reviews`), 4.9/5 aggregate score bar with TripAdvisor & Google badges, playable video card lightbox modal triggers (`video-modal.js` + `setupHimalayanReviews()`), and authentic trekker reviews specific to the route.

18. **Subnav Sticky Bar Architecture & Smooth Scrolling**:
    - Must feature exactly 10 anchor buttons with SVG icons corresponding to the 10 left-column sections.
    - Must use `top: 76px`, `backdrop-filter: blur(12px);`, horizontal scrolling with hidden scrollbars, and active state pill indicators.

### Mandatory Post-Flight Verification Before Returning:
- **Tag Balance**: Run the tag balancer script to verify 0 divergence on `div`, `section`, `article`, `main`, `form`, `table`, and `ul`.
- **Automated Parity**: Run `check_doc_match.js` to ensure 100% pass on key headings, pricing, and content blocks.
- **Visual Verification**: Launch `browser_subagent` to visually verify the rendered page on desktop (1440px) and mobile (390px) viewports before finishing the turn.
