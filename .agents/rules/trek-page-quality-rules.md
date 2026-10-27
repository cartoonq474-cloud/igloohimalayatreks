# Himalayan Trek Page Quality Standards & "Never-Repeat" Rules

This document records the critical lessons learned, root causes, and mandatory pre-flight / post-flight verification checklists for developing, editing, or refactoring Trek Package Detail Pages for Igloo Himalaya Treks.

---

## 1. The 18 Core Mistakes & Root Causes

### Mistake 1: Asymmetric 2-Column Grid (Missing Sticky Booking Sidebar & Modal)
- **What happened**: The main content wrapper was set to a 2-column grid (`grid-template-columns: 2.2fr 1fr;`), but the right column (`.trek-sidebar-col` with `.sidebar-booking-card`) and the `#inquiry-modal` were omitted, creating a massive white void on desktop and breaking booking conversion.
- **Rule**: Every trek detail page MUST have both columns of `.trek-detail-layout`:
  1. Left Column (`<div style="min-width: 0;">` containing the sequential content sections).
  2. Right Column (`<div class="trek-sidebar-col">` containing `.sidebar-booking-card` with sticky positioning `top: 148px`).
  3. Pre-footer `#inquiry-modal` dialog before `.you-might-like-section`.

### Mistake 2: Pre-Footer Structural Ordering Inversion
- **What happened**: `#inquiry-modal` was placed after `.you-might-like-section` or at the very bottom of the document after the footer, breaking modal backdrop z-indexing and violating layout standards.
- **Rule**: Pre-footer order is non-negotiable:
  1. 2-Column Body (`.trek-detail-layout`)
  2. `#inquiry-modal` dialog
  3. `.you-might-like-section` (Full-width recommendations)
  4. Global luxury footer (`.himalayan-ref-footer`)

### Mistake 3: Orphan CSS Classes & Unstyled Markup
- **What happened**: Components were written with invented classes (e.g. `.why-book-card`, `.why-book-grid`, `.rich-highlights-grid`, `.faq-top-banner`) without verifying if those styles existed in `index.css`, resulting in broken, unstyled HTML rendered to the user.
- **Rule**: NEVER write or copy markup with custom class names without:
  1. Grepping `index.css` to confirm every class exists with exact specifications.
  2. If missing, either use the established design system classes or append properly scoped CSS in `index.css`.

### Mistake 4: Omission of Critical JavaScript Data Hooks
- **What happened**: Key Trip Facts were rewritten without `data-altitude-m="[meters]"`, breaking the altitude unit converter (`js/altitude-visualizer.js`).
- **Rule**: All interactive widgets must retain their canonical data hooks:
  - Altitude facts: `data-altitude-m="[number]"`
  - Sub-navigation tabs: `data-tab="[section_name]"` matching `id="section-[section_name]"`
  - Trek wrapper: `data-trek-details-wrapper data-trek-key="[trek_slug]"`
  - Booking CTA triggers: `class="btn open-inquiry-btn" data-trek-title="[Full Trek Title]"`

### Mistake 5: Data Drift Across Page Sections (SSOT failure)
- **What happened**: Lead price, duration, group discount tiers, and max altitude varied between the JSON-LD schema, the Hero section, the Package pricing table, and the booking sidebar.
- **Rule**: Every trek detail page must adhere to a Single Source of Truth (SSOT):
  - Trek Title, Duration (e.g. `11 Days`), Max Altitude (e.g. `4,660 m`), Starting Price (e.g. `$925`), and WhatsApp pre-filled text must be 100% synchronized across Schema, Hero, Key Facts, Sidebar, and Modal.

### Mistake 6: Highlights Section Failure (Unstyled Triangle Wireframes & Missing Container)
- **What happened**: When generating Section 1 Highlights, bare unstyled wireframe SVGs (`<polygon points="12 2 2 22 22 22"></polygon>`) were used without scoped styles, rendering as raw, isolated open triangles (`Δ`) stacked awkwardly above each highlight item in a single column.
- **Rule**: All Highlights sections MUST strictly implement the Nar Phu Valley gold standard:
  1. Contained in a rounded card: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">`.
  2. Heading MUST be an `<h2>` with copper-orange star icon (`<polygon points="12 2 15.09 8.26 ...">`).
  3. Responsive 2-column flex grid: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">`.
  4. Each item must be a flex container with an emerald green circular checkmark badge (`#ECFDF5` background, `#10B981` border and stroke) and 0.98rem text.
  5. NEVER output wireframe triangles (`<polygon points="12 2 2 22 22 22"></polygon>`) as bullet icons.

### Mistake 7: Generic / Broken Hero Bento Gallery & Social Cards
- **What happened**: Using generic stock photos, wrong mountain ranges, or unverified filenames in the hero bento collage, or leaving `og:image` and `twitter:image` mismatched from the trek.
- **Rule**:
  1. The Hero Bento Gallery must contain 5 authentic WebP images of the specific trek (1 main panoramic + 4 sub-grid tiles showing trails, lodges, mountain vistas, culture).
  2. Main image must include TripAdvisor Travelers' Choice badge.
  3. Every image must exist on disk in `images/`.
  4. `og:image` and `twitter:image` must match the hero main photo.

### Mistake 8: Truncated or Incomplete Key Trip Facts (Hierarchy & Icon failure)
- **What happened**: Omitting items from client specifications or Google Docs (e.g. providing only 8 generic items instead of all 14 detailed items), failing to provide dedicated semantic SVG icons, or failing to follow the 3-tier visual hierarchy.
- **Rule**:
  1. All 14 trip facts from source data must be rendered in a responsive grid (`minmax(220px, 1fr)`).
  2. Each fact item MUST have a distinct semantic SVG icon housed in a circular `#F2F4F6` background badge with `#1A96C8` stroke and `align-items: flex-start`.
  3. 3-tier visual hierarchy: Uppercase category tag, bold primary headline, subtle detail subtitle.
  4. Altitude fact must retain `data-altitude-m="{meters}"`.

### Mistake 9: Mangled "Read Before You Book" & Nesting Unrelated Standalone Sections
- **What happened**: Unrelated sections (such as Altitude Elevation Profile SVG and Weather/Seasons tables) were improperly nested inside the `#section-details` accordion wrapper, breaking layout, copy-pasting unrelated mountain data (e.g. Lukla/Everest on an Annapurna page), and omitting or breaking the interactive circular SVG progress ring and `.detail-check-bubble` status lights.
- **Rule**:
  1. `#section-details` must remain clean and dedicated exclusively to the 10 briefing topics.
  2. Altitude Profile (`#section-altitude-profile`) and Weather (`#section-weather`) must be separate standalone sections with their own navigation anchors and region-specific data.
  3. Accordion cards must include the circular SVG reading progress ring (`#readProgressCircle`, `#readProgressPercent`, `#readProgressText`) and `.detail-check-bubble` checkmarks that illuminate green on read.

### Mistake 10: Irrelevant / Broken "You Might Also Like" Recommendation Cards
- **What happened**: Retaining generic Everest placeholder cards with dummy `#` links and placeholder images (`similar-trek-three-high-pass.png`) on non-Everest pages.
- **Rule**:
  1. The recommendation section must strictly showcase 4 authentic alternative packages within the same region or logical progression.
  2. Every card must have canonical links (`../../trek/{slug}/`), authentic `.webp` images, duration badges with SVG clock icons, real starting prices, and tailored comparative blurbs.
  3. Must use responsive auto-fit grid (`grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));`).

### Mistake 11: Cross-Trek Copy Contamination & Stale Template Artifacts
- **What happened**: Template duplication left reviews referencing other treks (e.g. Annapurna Circuit, Tilicho Lake, Thorong La Pass, EBC) in `#section-reviews`, or left inline hero toggle buttons with hardcoded IDs from other treks (like `#ebc-toggle-btn` targeting `ebc-more-text`).
- **Rule**:
  1. `#section-reviews` must be 100% authentic to the trek, featuring genuine traveler video cards, regional photos, and verified testimonials mentioning waypoints of the current trek.
  2. Inline scripts (like read-more toggles) must be strictly scoped to `{trek-slug}-toggle-btn`.
  3. Run an automated keyword scan for forbidden terms (`tilicho`, `thorong`, `ebc-`, `gokyo`, etc.) before publishing.

### Mistake 12: Incomplete Capture of Client Source Document / Google Doc
- **What happened**: Omitting subsections, tables, or notes present in client Google Docs (such as Higher Places You Visit, Seasonal Weather Conditions table, How Weather Changes Along the Route, Which Season Should You Choose?, Book the Trek CTA banner, or categorized FAQs).
- **Rule**:
  1. Every single section, fact, table row, packing item, and FAQ from client documentation must be faithfully included verbatim.
  2. Maintain an automated parity check script (`scratch/check_doc_match.js`) verifying 30+ critical items against the published page to guarantee 100% compliance.

### Mistake 13: Itinerary Accordion Disconnection, Clipped Timeline Dots & Unstyled Fact Tables
- **What happened**:
  1. The global "Expand All Days" button was generated with `class="itinerary-expand-all-btn"` and `id="itinerary-expand-all-btn"` (copied from broken templates), whereas `js/trek-details.js` line 103 explicitly binds to `#toggle-all-itinerary, .itinerary-toggle-all-btn`. Because of this mismatch, the button was completely dead, unstyled, and did not expand/collapse cards or rotate icons.
  2. `.itinerary-card` had `overflow: hidden`, which clipped the timeline dot pseudo-element (`::before` at `left: -28px`). As a result, the vertical timeline connector had no circular nodes at all, looking like a disconnected line.
  3. Daily fact tables from client Google Docs were rendered into an unstyled gray `#F8FAFC` rectangle without visual hierarchy or icons, looking like an amateur wireframe.
  4. Day card subtitles were sparse 2-word labels lacking overnight altitude, duration, or `data-altitude-m` hooks.
- **Rule**:
  1. Header Bar: Must use `<div class="itinerary-header-bar">` with `<button id="toggle-all-itinerary" class="itinerary-toggle-all-btn" type="button">` containing the animated SVG chevron and "Expand All Days" label.
  2. Timeline Dots: `.itinerary-card` must have `overflow: visible !important;` so the 14px circular dot (`left: -28px; top: 26px; border: 3px solid #1A96C8;`) displays centered on the vertical line (`border-left: 2px solid #E2E8F0;`). When `.active`, the dot illuminates with a glowing ring (`box-shadow: 0 0 0 4px rgba(26, 150, 200, 0.25)`).
  3. Daily Fact Boxes: Must use the canonical `.itinerary-meta-box` and `.itinerary-meta-box-item` grid with `.itinerary-meta-box-badge` housing distinct semantic SVG icons (Activity = blue compass, Altitude = amber mountain, Accommodation = green lodge, Meals = rose cutlery, Time = blue clock, Route = purple map pin). NEVER output plain unstyled grey wireframe tables.
  4. Subtitles: Must feature a rich 3-part subtitle with `data-altitude-m`: `[Action] — <span data-altitude-m="{meters}">[Overnight Altitude & Location]</span> — [Duration/Highlight]`.
  5. Descriptions: Narrative paragraphs must be wrapped in `.itinerary-description` with verbatim client copy preserved.

### Mistake 14: Zero-MVP First-Pass Publishing Failure (9 Iteration Burnout)
- **What happened**: When instructed to publish the trek content from a client Google Doc, initial code generated plain, unfinished, MVP wireframes (basic unstyled tables, grey boxes, missing interactive tabs, placeholder reviews, plain FAQ lists). The user had to spend 9 consecutive requests asking the agent to optimize each section one-by-one.
- **Rule**:
  1. NEVER output MVP, wireframe, or placeholder styling for any section.
  2. In the very first generation pass, every single section must be generated using its full, complete, production-grade Gold Standard architecture (e.g., Nar Phu highlights, 3-tab review system, 10-item sticky subnav, emerald/rose inclusions, standalone altitude visualizer, categorized FAQs without inline display bugs, and ultra-premium bottom CTA card).

### Mistake 15: FAQ Category Panel Inline Display Bug (`display: none` overriding CSS)
- **What happened**: In Section 11 FAQs, inactive panels had inline `style="display: none;"` added in the HTML. When JavaScript toggled the `.active` class on category panels, the inline style took precedence over CSS `.faq-category-content.active { display: block; }`, causing category switching to fail silently.
- **Rule**:
  1. NEVER write inline `style="display: none;"` on `.faq-category-content` containers.
  2. Visibility must be controlled exclusively via CSS classes (`.faq-category-content` is hidden by default; `.faq-category-content.active` displays it).
  3. FAQ accordion items must use `.faq-toggle-circle` with smooth CSS rotation.
  4. FAQ header must include `<button id="faq-expand-all-btn" class="faq-expand-all-btn" type="button">Expand All</button>`.

### Mistake 16: Low-Conversion Wireframe Bottom CTA Card
- **What happened**: At the bottom of Section 11 (FAQs), right before the pre-footer modal and recommendations, the final conversion CTA was left as an unstyled, pale gray `#F8FAFC` box with a single basic button.
- **Rule**:
  1. At the bottom of Section 11 before `</section>`, always implement the high-conversion dark Himalayan gradient card (`background: linear-gradient(135deg, #0A2540 0%, #0E3458 55%, #144A75 100%);`).
  2. Must feature ambient radial glowing accents, frosted glass kicker badge (`PLAN YOUR HIMALAYAN EXPEDITION`), verbatim client closing text, dual action buttons (Adventure Orange `Enquire Now` with modal trigger + frosted glass `Chat on WhatsApp` with pre-filled message text), and 3 trust badges (100% Guaranteed Departures, 2–4 Hr Response, Certified High-Altitude Sherpa Guides).

### Mistake 17: Reviews Section Missing Interactive 3-Tab Architecture & Video Lightbox
- **What happened**: `#section-reviews` was generated as a static block without interactive tabs, missing the 4.9/5 aggregate score bar with TripAdvisor & Google verified badges, and lacking video lightbox modal hooks.
- **Rule**:
  1. Must feature 3 interactive tabs: `All Reviews`, `Video Stories`, and `Photo Reviews`.
  2. Must feature the aggregate rating bar (4.9/5 stars, TripAdvisor 5.0, Google 4.9).
  3. Video thumbnails must have play overlay buttons hooked into `video-modal.js` and `setupHimalayanReviews()`.
  4. 100% authentic trekker reviews specific to this route.

### Mistake 18: Sticky Subnav Bar Alignment, Scrollbar & Backdrop Incompleteness
- **What happened**: Subnav tabs didn't stick cleanly, lacked blur backdrop, had visible scrollbars on mobile, or broke active tab highlighting.
- **Rule**:
  1. Sticky at `top: 76px` with `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`.
  2. Exactly 10 anchor buttons with SVG icons corresponding to the 10 left-column sections.
  3. Subnav container must have `display: flex; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;` with active tab border-bottom accent.

---

## 2. Mandatory Pre-Flight Checklist (Before Making Changes)

- [ ] Inspect existing layout tags to identify grid column structure (`.trek-detail-layout`).
- [ ] Check `index.css` for any new class names intended for use.
- [ ] Confirm JavaScript hooks and dependencies (`trek-details.js`, `inquiry-modal.js`, `altitude-visualizer.js`).
- [ ] Identify trek-specific SSOT variables (Title, Duration, Starting Price, Solo Price, Max Altitude).
- [ ] Check image folder (`/images/`) to verify all planned images exist.
- [ ] Extract and review full client source text into `scratch/{slug}_doc.txt`.

---

## 3. Mandatory Post-Flight Checklist (After Making Changes)

- [ ] **Tag Balancing Check**: Run node tag counter script to ensure 0 tag divergence on `div`, `section`, `article`, `main`, `form`, `table`, and `ul`:
  ```bash
  node -e "
  const fs = require('fs');
  const html = fs.readFileSync('trek/{slug}/index.html', 'utf8');
  const tags = ['div', 'section', 'article', 'main', 'form', 'table', 'ul'];
  tags.forEach(t => {
    const open = (html.match(new RegExp('<' + t + '[^a-zA-Z0-9_-]', 'gi')) || []).length;
    const close = (html.match(new RegExp('</' + t + '>', 'gi')) || []).length;
    console.log(t + ': open=' + open + ', close=' + close + ', diff=' + (open - close));
  });
  "
  ```
- [ ] **Automated Parity Check**: Run `scratch/check_doc_match.js` against the published HTML to verify 100% match with source Google Doc content.
- [ ] **Forbidden Keyword Scan**: Ensure 0 occurrences of terms from other treks (e.g., `ebc-`, `thorong`, `tilicho`).
- [ ] **Data-Tab Target Validation**: Ensure every `data-tab` button has a matching `id="section-{tab}"` in the document.
- [ ] **Visual Subagent Verification**:
  - Launch `browser_subagent` and inspect page on Desktop (1440px) and Mobile (390px).
  - Check sticky sidebar behavior on scroll.
  - Verify group discount toggle accordion opens and rotates arrow.
  - Test "Book Now" and "Make an Enquiry" buttons open `#inquiry-modal`.
  - Confirm mobile layout stacks cleanly without horizontal overflow.
- [ ] **Zero Dummy Text Check**: Confirm no `TODO`, `LOREM`, `#` links, or placeholder content remains.
