# Igloo Himalaya Treks Development Guidelines

All agents and developers working in this repository must strictly adhere to the standards outlined below.

## Mandatory Quality Standards & "Never-Repeat" Rules

Refer to the full rules specification in [.agents/rules/trek-page-quality-rules.md](.agents/rules/trek-page-quality-rules.md) and skill [.agents/skills/trek-page-builder/SKILL.md](.agents/skills/trek-page-builder/SKILL.md).

### The 6 Non-Negotiable Rules:

1. **Both Columns Mandatory**:
   - The main layout `.trek-detail-layout` is a 2-column grid (`grid-template-columns: 2.2fr 1fr; gap: 40px;`).
   - Left column contains the sequentially numbered content sections (`<div style="min-width: 0;">`).
   - Right column MUST ALWAYS include `<div class="trek-sidebar-col">` with the sticky `.sidebar-booking-card` (`top: 148px; z-index: 50;`).
   - The pre-footer `#inquiry-modal` modal dialog MUST ALWAYS be included before `.you-might-like-section`.

2. **No Orphan CSS Classes or Unstyled Markup**:
   - NEVER use custom class names (e.g., `.why-book-card`, `.rich-highlights-grid`) without verifying they exist in `index.css`.
   - If styles do not exist in `index.css`, use verified inline styles or add scoped styles in `index.css`.

3. **Preserve All JavaScript Data Hooks**:
   - Key Trip Facts: `data-altitude-m="{meters}"` on altitude facts (required for `js/altitude-visualizer.js`).
   - Section subnav: `data-tab="{section_name}"` matching `id="section-{section_name}"`.
   - Page container: `data-trek-details-wrapper data-trek-key="{trek_slug}"` (for `js/trek-details.js` localStorage tracking).
   - Modal buttons: `class="btn open-inquiry-btn" data-trek-title="{Full Trek Title}"`.

4. **Single Source of Truth (SSOT)**:
   - Ensure trek title, duration (e.g. `8 Days`), starting price (e.g. `$525`), max altitude (e.g. `2,060 m`), and WhatsApp pre-filled text match 100% across:
     - JSON-LD schemas (`TouristTrip` and `FAQPage`)
     - Hero badges and titles
     - Key Trip Facts
     - Booking sidebar
     - Inquiry modal
     - Package pricing tables

5. **Highlights Component (Nar Phu Valley Gold Standard)**:
   - Container: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">`.
   - Title: `<h2>` with copper-orange star icon (`<polygon points="12 2 15.09 8.26 ...">`).
   - Grid: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">`.
   - Items: Flex container with an emerald-green circular checkmark badge (`#ECFDF5` background, `#10B981` border and stroke) and a 0.98rem span.
   - **NEVER** output raw wireframe triangles (`<polygon points="12 2 2 22 22 22"></polygon>`) or unstyled class blocks.

6. **Mandatory Post-Flight Verification Before Returning**:
   - **Tag Balance**: Run the tag balancer script to verify 0 divergence on `div`, `section`, `article`, `main`, `form`, and `table`.
   - **Visual Verification**: Launch `browser_subagent` to visually verify the rendered page on desktop (1440px) and mobile (390px) viewports before finishing the turn.
