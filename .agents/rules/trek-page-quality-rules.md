# Himalayan Trek Page Quality Standards & "Never-Repeat" Rules

This document records the critical lessons learned, root causes, and mandatory pre-flight / post-flight verification checklists for developing, editing, or refactoring Trek Package Detail Pages for Igloo Himalaya Treks.

---

## 1. The 5 Core Mistakes & Root Causes

### Mistake 1: Asymmetric 2-Column Grid (Missing Sticky Booking Sidebar & Modal)
- **What happened**: The main content wrapper was set to a 2-column grid (`grid-template-columns: 2.2fr 1fr;`), but the right column (`.trek-sidebar-col` with `.sidebar-booking-card`) and the `#inquiry-modal` were omitted, creating a massive white void on desktop and breaking booking conversion.
- **Rule**: Every trek detail page MUST have both columns of `.trek-detail-layout`:
  1. Left Column (`<div style="min-width: 0;">` containing the sequential content sections).
  2. Right Column (`<div class="trek-sidebar-col">` containing `.sidebar-booking-card` with sticky positioning `top: 148px`).
  3. Pre-footer `#inquiry-modal` dialog before `.you-might-like-section`.

### Mistake 2: Orphan CSS Classes & Unstyled Markup ("Why Book" failure)
- **What happened**: Components were written with classes (e.g. `.why-book-card`, `.why-book-grid`, etc.) without verifying if those styles existed in `index.css`, resulting in broken, unstyled HTML rendered to the user.
- **Rule**: NEVER write or copy markup with custom class names without:
  1. Grepping `index.css` to confirm every class exists with exact specifications.
  2. If missing, either use the established design system classes or append properly scoped CSS in `index.css`.

### Mistake 3: Omission of Critical JavaScript Data Hooks
- **What happened**: Key Trip Facts were rewritten without `data-altitude-m="[meters]"`, breaking the altitude unit converter (`js/altitude-visualizer.js`).
- **Rule**: All interactive widgets must retain their canonical data hooks:
  - Altitude facts: `data-altitude-m="[number]"`
  - Sub-navigation tabs: `data-tab="[section_name]"` matching `id="section-[section_name]"`
  - Trek wrapper: `data-trek-details-wrapper data-trek-key="[trek_slug]"`
  - Booking CTA triggers: `class="btn open-inquiry-btn" data-trek-title="[Full Trek Title]"`

### Mistake 4: Data Drift Across Page Sections
- **What happened**: Lead price, duration, and group discount tiers varied between the JSON-LD schema, the Hero section, the Package pricing table, and the booking sidebar.
- **Rule**: Every trek detail page must adhere to a Single Source of Truth (SSOT):
  - Trek Title, Duration (e.g. `13 Days`), Max Altitude (e.g. `5,320 m`), Best-Value Price (e.g. `$1,225`), Solo Price (e.g. `$1,305`), and WhatsApp pre-filled text must be 100% synchronized across Schema, Hero, Key Facts, Sidebar, and Modal.

### Mistake 5: Premature Turn Completion Without Visual Verification
- **What happened**: Changes were marked complete without launching the browser subagent to visually verify the rendered output, resulting in the user having to point out visual errors.
- **Rule**: No trek page edit is complete until verified visually using `browser_subagent` on desktop (1440px) and mobile (390px) viewports.

### Mistake 6: Highlights Section Failure (Unstyled Triangle Wireframes & Missing Container)
- **What happened**: When generating Section 1 Highlights, bare unstyled wireframe SVGs (`<polygon points="12 2 2 22 22 22"></polygon>`) were used without the scoped styles, rendering as raw, isolated open triangles (`Δ`) stacked awkwardly above each highlight item in a single column.
- **Rule**: All Highlights sections MUST strictly implement the Nar Phu Valley gold standard:
  1. Contained in a rounded card: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">`.
  2. Heading MUST be an `<h2>` for proper document hierarchy: `<h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy); margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">` with the copper-orange star icon `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper-orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> [Trek Title] Highlights</h2>`.
  3. Responsive 2-column flex grid: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">`.
  4. Each item must be a flex container with an emerald green circular checkmark badge:
     `<div style="display: flex; align-items: flex-start; gap: 12px;">`
       `<div style="width: 24px; height: 24px; background: #ECFDF5; border: 1px solid #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">`
         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
       `</div>`
       `<span style="font-size: 0.98rem; color: #334155; line-height: 1.55; font-weight: 500;">[Highlight Text]</span>`
     `</div>`
  5. NEVER output wireframe triangles (`<polygon points="12 2 2 22 22 22"></polygon>`) as bullet icons.

---

## 2. Mandatory Pre-Flight Checklist (Before Making Changes)

- [ ] Inspect existing layout tags to identify grid column structure (`.trek-detail-layout`).
- [ ] Check `index.css` for any new class names intended for use.
- [ ] Confirm JavaScript hooks and dependencies (`trek-details.js`, `inquiry-modal.js`, `altitude-visualizer.js`).
- [ ] Identify trek-specific SSOT variables (Title, Duration, Starting Price, Solo Price, Max Altitude).

---

## 3. Mandatory Post-Flight Checklist (After Making Changes)

- [ ] **Tag Balancing Check**: Run node tag counter script to ensure 0 tag divergence on `div`, `section`, `article`, `main`, `form`, and `ul`.
- [ ] **Data-Tab Target Validation**: Ensure every `data-tab` button has a matching `id="section-{tab}"` in the document.
- [ ] **Visual Subagent Verification**:
  - Check sticky sidebar behavior on scroll.
  - Verify group discount toggle accordion opens and rotates arrow.
  - Test "Book Now" and "Make an Enquiry" buttons open `#inquiry-modal`.
  - Confirm mobile layout stacks cleanly without horizontal overflow.
- [ ] **Zero Dummy Text Check**: Confirm no `TODO`, `LOREM`, or placeholder content remains.
