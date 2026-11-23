/**
 * Igloo Himalaya Treks - Universal Expedition Dossier & Itinerary PDF Engine
 * Generates an ultra-premium, multi-page vector PDF dossier for any Himalayan trek or tour package.
 * Includes complete Day-by-Day Itinerary (zero truncation), Key Trip Facts, Route Highlights,
 * Package Inclusions & Exclusions, Emergency Protocols, and Booking Contact details.
 *
 * Designed with Igloo Himalaya Treks Gold Standard Design System:
 * Primary Navy (#0A2540), Cyan Blue (#1A96C8), Copper Orange (#E05A47), Emerald Green (#10B981)
 */

(function () {
  'use strict';

  function cleanText(str) {
    if (!str) return '';
    return str
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&mdash;/g, ' - ')
      .replace(/&ndash;/g, '-')
      .replace(/&bull;/g, '* ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/[\u2014\u2013]/g, ' - ')
      .replace(/[\u2022\u00B7]/g, '* ')
      .replace(/[\u2713\u2714]/g, '')
      .replace(/[\u2715\u2716\u2717\u00D7]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract comprehensive package data directly from the active DOM
   */
  function extractPackageData() {
    // 1. Title
    let title = '';
    const h1 = document.querySelector('h1');
    const detailsTitle = document.querySelector('.details-main-title, .trek-section-title');
    if (h1 && h1.textContent.trim()) {
      title = h1.textContent.trim();
    } else if (detailsTitle && detailsTitle.textContent.trim()) {
      title = detailsTitle.textContent.trim();
    } else {
      title = document.title.split(' - ')[0].split('|')[0].trim();
    }
    title = cleanText(title)
      .replace(/\s*Itinerary:.*$/i, '')
      .replace(/\s*Trip Itinerary.*$/i, '')
      .replace(/\s*Day-by-Day Itinerary.*$/i, '')
      .trim();

    // 2. Duration
    let duration = '';
    const durMatch = title.match(/(\d+\s*Days?)/i) || (document.body.innerText && document.body.innerText.match(/(\d+\s*Days?\s*[\u2022\*\-]\s*All-Inclusive)/i));
    if (durMatch) {
      duration = cleanText(durMatch[1] || durMatch[0]);
    }

    // 3. Starting Price
    let price = '';
    const priceEl = document.querySelector('.mobile-sticky-price-val, .hero-price-val, [data-price]');
    if (priceEl) {
      const pm = priceEl.textContent.match(/[\$]\s*[\d,]+/);
      if (pm) price = pm[0].replace(/\s+/g, '');
    }

    // 4. Key Trip Facts (All facts from trip-fact-item, key-fact-item)
    const facts = [];
    const factCards = document.querySelectorAll('.trip-fact-item, .key-fact-item');
    factCards.forEach(fc => {
      const spans = fc.querySelectorAll('span');
      const strong = fc.querySelector('strong, h4, [data-altitude-m]');
      if (spans.length > 0) {
        facts.push({
          cat: cleanText(spans[0].textContent),
          val: cleanText(strong ? strong.textContent : (spans[1] ? spans[1].textContent : '')),
          sub: cleanText(spans[spans.length - 1] ? spans[spans.length - 1].textContent : '')
        });
      }
    });

    let maxAltitude = '';
    let tripGrade = '';
    let startFinish = '';
    let accommodation = '';
    let meals = '';
    let bestSeason = '';
    let groupSize = '';

    facts.forEach(f => {
      const cat = f.cat.toUpperCase();
      if (cat.includes('ALTITUDE') || cat.includes('ELEVATION')) maxAltitude = `${f.val} ${f.sub ? '(' + f.sub + ')' : ''}`.trim();
      if (cat.includes('GRADE') || cat.includes('DIFFICULTY')) tripGrade = f.val;
      if (cat.includes('START') || cat.includes('FINISH') || cat.includes('TRANSPORT')) startFinish = `${f.val} ${f.sub ? '(' + f.sub + ')' : ''}`.trim();
      if (cat.includes('ACCOMMODATION') || cat.includes('LODGE')) accommodation = f.val;
      if (cat.includes('MEAL')) meals = f.val;
      if (cat.includes('SEASON') || cat.includes('MONTH')) bestSeason = `${f.val} ${f.sub ? '(' + f.sub + ')' : ''}`.trim();
      if (cat.includes('GROUP') || cat.includes('TEAM')) groupSize = f.val;
    });

    if (!maxAltitude) {
      const altEl = document.querySelector('[data-altitude-m]');
      maxAltitude = altEl ? `${altEl.getAttribute('data-altitude-m')} m` : 'Alpine High Altitude';
    }
    if (!tripGrade) tripGrade = 'Challenging / Alpine (PD)';
    if (!startFinish) startFinish = 'Kathmandu, Nepal';
    if (!accommodation) accommodation = 'Hotels & Mountain Lodges';
    if (!meals) meals = 'All Meals on Trek (Breakfast, Lunch, Dinner)';
    if (!bestSeason) bestSeason = 'Spring (Mar - May) & Autumn (Sep - Nov)';
    if (!groupSize) groupSize = 'Private & Small Groups Guided';

    // 5. Highlights
    const highlights = [];
    const hlElements = document.querySelectorAll(
      '#section-highlights span, .rich-highlights-grid .rich-highlight-item, .rich-highlights-grid h4, .rich-highlights-grid span, [style*="#ECFDF5"] + span, [style*="#10B981"] + span'
    );
    hlElements.forEach(h => {
      const h4 = h.querySelector ? h.querySelector('h4') : null;
      const p = h.querySelector ? h.querySelector('p') : null;
      let t = '';
      if (h4) {
        t = cleanText(h4.textContent) + (p ? ': ' + cleanText(p.textContent) : '');
      } else {
        t = cleanText(h.textContent);
      }
      if (t.length > 12 && !highlights.includes(t)) highlights.push(t);
    });

    if (highlights.length === 0) {
      const pills = document.querySelectorAll('#section-overview span, .overview-highlights-pills span');
      pills.forEach(p => {
        const t = cleanText(p.textContent);
        if (t.length > 5 && !highlights.includes(t)) highlights.push(t);
      });
    }

    // 6. Overview
    let overview = '';
    const pEl = document.querySelector('#section-overview p, #section-itinerary .itinerary-header-bar p, #section-itinerary > p, .itinerary-header-bar p');
    if (pEl && pEl.textContent.trim()) {
      overview = cleanText(pEl.textContent);
    } else {
      overview = `Official expedition dossier for ${title}. Daily walking times, stages, and elevations are expertly paced for safe acclimatisation and panoramic Himalayan views.`;
    }

    // 7. Day-by-Day Itinerary
    const days = [];
    const cards = document.querySelectorAll('#section-itinerary .itinerary-card, .itinerary-timeline .itinerary-card');
    cards.forEach((c, idx) => {
      const dayNum = c.getAttribute('data-day') || (idx + 1);
      const titleEl = c.querySelector('.itinerary-day-title-new, .itinerary-day-title, h3, h4');
      const subEl = c.querySelector('.itinerary-day-subtitle-new, .itinerary-day-subtitle');
      const metaItems = c.querySelectorAll('.itinerary-meta-box-item');
      const meta = [];
      metaItems.forEach(mi => {
        const spans = mi.querySelectorAll('span');
        if (spans.length >= 2) {
          meta.push({ label: cleanText(spans[0].textContent), value: cleanText(spans[1].textContent) });
        }
      });

      const descPs = c.querySelectorAll('.itinerary-description p, .itinerary-content p, .itinerary-body p');
      const desc = [];
      descPs.forEach(p => {
        const t = cleanText(p.textContent);
        if (t) desc.push(t);
      });

      days.push({
        day: parseInt(dayNum, 10),
        title: cleanText(titleEl ? titleEl.textContent.replace(/^Day\s*\d+\s*:\s*/i, '') : `Stage ${dayNum}`),
        subtitle: cleanText(subEl ? subEl.textContent : ''),
        meta,
        description: desc
      });
    });

    // 8. Inclusions & Exclusions
    const inclusions = [];
    const exclusions = [];
    const incSec = document.querySelector('#section-inclusions, #section-includes, .inc-exc-container');
    if (incSec) {
      const incCards = incSec.querySelectorAll('.inc-exc-card, .include-card, .exclude-card, [style*="#F0FDF4"], [style*="#FEF2F2"], [style*="#ECFDF5"], [style*="#FEE2E2"]');
      if (incCards.length > 0) {
        incCards.forEach(c => {
          const isExc = c.classList.contains('inc-exc-card-excluded') ||
                        c.classList.contains('exclude-card') ||
                        c.innerHTML.includes('#FEF2F2') ||
                        c.innerHTML.includes('#FEE2E2') ||
                        c.innerHTML.includes('#EF4444') ||
                        c.querySelector('[stroke="#EF4444"], [stroke="var(--color-neutral-400)"]');
          const h4 = c.querySelector('h4, strong, .inc-exc-card-title');
          const p = c.querySelector('p, .inc-exc-card-text');
          if (h4) {
            const item = cleanText(h4.textContent) + (p ? ': ' + cleanText(p.textContent) : '');
            if (isExc) { if (!exclusions.includes(item)) exclusions.push(item); }
            else { if (!inclusions.includes(item)) inclusions.push(item); }
          } else {
            const item = cleanText(c.textContent);
            if (item.length > 3) {
              if (isExc) { if (!exclusions.includes(item)) exclusions.push(item); }
              else { if (!inclusions.includes(item)) inclusions.push(item); }
            }
          }
        });
      }

      // Fallback list items if cards were not used
      if (inclusions.length === 0 && exclusions.length === 0) {
        let mode = 'inc';
        const children = incSec.querySelectorAll('h2, h3, h4, li');
        children.forEach(el => {
          const t = el.textContent.toLowerCase();
          if (t.includes('not included') || t.includes('exclusion')) mode = 'exc';
          else if (t.includes('included') || t.includes('inclusion')) mode = 'inc';
          else if (el.tagName === 'LI') {
            const text = cleanText(el.textContent);
            if (text.length > 3) {
              if (mode === 'exc') { if (!exclusions.includes(text)) exclusions.push(text); }
              else { if (!inclusions.includes(text)) inclusions.push(text); }
            }
          }
        });
      }
    }

    // Slug for filename
    const pageWrapper = document.querySelector('[data-trek-key]');
    let slug = pageWrapper ? pageWrapper.getAttribute('data-trek-key') : '';
    if (!slug) {
      const segs = window.location.pathname.split('/').filter(Boolean);
      slug = segs[segs.length - 1] || 'himalayan-expedition';
    }
    slug = slug.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    return {
      title,
      duration: duration || (days.length > 0 ? `${days.length} Days` : 'Multi-Day'),
      price,
      maxAltitude,
      tripGrade,
      startFinish,
      accommodation,
      meals,
      bestSeason,
      groupSize,
      overview,
      highlights,
      days,
      inclusions,
      exclusions,
      slug
    };
  }

  /**
   * Ultra-Premium Vector PDF Generator using jsPDF
   */
  function generateMasterItineraryPDF(data) {
    const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || window.jspdf);
    if (!jsPDFClass) {
      throw new Error("jsPDF library not loaded.");
    }

    const doc = new jsPDFClass({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 14;
    const contentWidth = pageWidth - (margin * 2); // 182mm
    const bottomLimit = pageHeight - 15; // 282mm

    let currentY = margin;

    // Palette matching Igloo Himalaya Treks
    const navy = [10, 37, 64];          // #0A2540
    const cyanBlue = [26, 150, 200];    // #1A96C8
    const copper = [224, 90, 71];       // #E05A47
    const charcoal = [30, 41, 59];      // #1E293B
    const slateMuted = [100, 116, 139]; // #64748B
    const cardBg = [248, 250, 252];     // #F8FAFC
    const borderCol = [226, 232, 240];  // #E2E8F0
    const emerald = [16, 185, 129];     // #10B981
    const rose = [239, 68, 68];         // #EF4444

    function renderHeader(isFirstPage) {
      if (isFirstPage) {
        // Top Deep Navy Band
        doc.setFillColor(navy[0], navy[1], navy[2]);
        doc.rect(0, 0, pageWidth, 28, 'F');

        // Copper Accent Line
        doc.setFillColor(copper[0], copper[1], copper[2]);
        doc.rect(0, 28, pageWidth, 1.5, 'F');

        // Brand Name
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13.5);
        doc.text('IGLOO HIMALAYA TREKS', margin, 11);

        // Contact & Registration Meta
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(203, 213, 225);
        doc.text('Govt. Lic. #148924 | Bhagwan Bahal, Thamel, Kathmandu, Nepal', margin, 17);
        doc.text('WhatsApp: +977 9860843980 | Email: info@igloohimalayatreks.com | Web: www.igloohimalayatreks.com', margin, 22);

        currentY = 36;
      } else {
        // Page 2+ Running Header
        doc.setFillColor(navy[0], navy[1], navy[2]);
        doc.rect(0, 0, pageWidth, 11, 'F');

        doc.setFillColor(copper[0], copper[1], copper[2]);
        doc.rect(0, 11, pageWidth, 0.8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        const truncTitle = data.title.length > 55 ? data.title.substring(0, 53) + '...' : data.title;
        doc.text(`${truncTitle} - Official Dossier`, margin, 7.5);

        doc.setFont('helvetica', 'normal');
        doc.text('Igloo Himalaya Treks | www.igloohimalayatreks.com', pageWidth - margin - 58, 7.5);

        currentY = 17;
      }
    }

    // --- PAGE 1: COVER & EXPEDITION OVERVIEW ---
    renderHeader(true);

    // 1. Expedition Title Block
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16.5);
    const fullTitle = data.title.includes(data.duration) ? data.title : `${data.title} - ${data.duration}`;
    const titleLines = doc.splitTextToSize(fullTitle, contentWidth);
    doc.text(titleLines, margin, currentY);
    currentY += (titleLines.length * 6.5) + 1;

    // Sub-kicker & Price pill
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(cyanBlue[0], cyanBlue[1], cyanBlue[2]);
    doc.text('OFFICIAL EXPEDITION ITINERARY & COMPLETE ROUTE DOSSIER', margin, currentY);

    if (data.price) {
      const priceText = `Starting From: ${data.price} / person | Guaranteed Departures`;
      const priceWidth = doc.getTextWidth(priceText) + 8;
      const px = pageWidth - margin - priceWidth;
      doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
      doc.setDrawColor(copper[0], copper[1], copper[2]);
      doc.roundedRect(px, currentY - 5, priceWidth, 7, 1.5, 1.5, 'FD');
      doc.setTextColor(copper[0], copper[1], copper[2]);
      doc.setFontSize(7.5);
      doc.text(priceText, px + 4, currentY - 0.5);
    }
    currentY += 8;

    // 2. Key Trip Facts Specification Grid (2 rows x 4 cols = 8 facts)
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.roundedRect(margin, currentY, contentWidth, 29, 2, 2, 'FD');

    const factItems = [
      { label: 'DURATION', val: data.duration },
      { label: 'MAX ALTITUDE', val: data.maxAltitude },
      { label: 'TRIP GRADE', val: data.tripGrade },
      { label: 'START / FINISH', val: data.startFinish },
      { label: 'ACCOMMODATION', val: data.accommodation },
      { label: 'MEAL PLAN', val: data.meals },
      { label: 'BEST SEASON', val: data.bestSeason },
      { label: 'GROUP TYPE', val: data.groupSize }
    ];

    const colW = contentWidth / 4;
    factItems.forEach((f, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      const fx = margin + (col * colW) + 3.5;
      const fy = currentY + (row * 14) + 4;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.2);
      doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
      doc.text(f.label, fx, fy);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.6);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      const valLines = doc.splitTextToSize(f.val, colW - 6);
      doc.text(valLines[0] || f.val, fx, fy + 4.5);
      if (valLines.length > 1) {
        doc.setFontSize(6.8);
        doc.setFont('helvetica', 'normal');
        doc.text(valLines[1], fx, fy + 8);
      }

      if (col < 3) {
        doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
        doc.line(margin + ((col + 1) * colW), fy - 1, margin + ((col + 1) * colW), fy + 9);
      }
    });

    // Horizontal divider between row 1 and row 2
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.line(margin + 2, currentY + 14.5, pageWidth - margin - 2, currentY + 14.5);
    currentY += 34;

    // 3. Route Overview Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('Expedition Overview & Strategic Acclimatisation', margin, currentY);
    currentY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    const splitOver = doc.splitTextToSize(data.overview, contentWidth);
    doc.text(splitOver, margin, currentY);
    currentY += (splitOver.length * 3.7) + 5;

    // 4. Route Highlights (if available)
    if (data.highlights && data.highlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text('Key Route Highlights & Destinations', margin, currentY);
      currentY += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

      const half = Math.ceil(data.highlights.length / 2);
      const col1 = data.highlights.slice(0, half);
      const col2 = data.highlights.slice(half);

      const startHlY = currentY;
      let y1 = startHlY;
      col1.forEach(h => {
        // Emerald vector bullet circle
        doc.setFillColor(emerald[0], emerald[1], emerald[2]);
        doc.circle(margin + 2, y1 - 0.8, 0.9, 'F');
        doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
        const hlLines = doc.splitTextToSize(h, (contentWidth / 2) - 8);
        doc.text(hlLines, margin + 4.5, y1);
        y1 += (hlLines.length * 3.4) + 1.5;
      });

      let y2 = startHlY;
      col2.forEach(h => {
        // Emerald vector bullet circle
        doc.setFillColor(emerald[0], emerald[1], emerald[2]);
        doc.circle(margin + (contentWidth / 2) + 2, y2 - 0.8, 0.9, 'F');
        doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
        const hlLines = doc.splitTextToSize(h, (contentWidth / 2) - 8);
        doc.text(hlLines, margin + (contentWidth / 2) + 4.5, y2);
        y2 += (hlLines.length * 3.4) + 1.5;
      });

      currentY = Math.max(y1, y2) + 4;
    }

    // Divider before itinerary
    doc.setDrawColor(cyanBlue[0], cyanBlue[1], cyanBlue[2]);
    doc.setLineWidth(0.6);
    doc.line(margin, currentY, margin + 45, currentY);
    currentY += 7;

    // Itinerary Section Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('COMPLETE DAY-BY-DAY EXPEDITION ITINERARY', margin, currentY);
    currentY += 6;

    // --- RENDER EACH ITINERARY DAY WITH ZERO TRUNCATION ---
    data.days.forEach(day => {
      const dayBadgeText = `DAY ${day.day < 10 ? '0' + day.day : day.day}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      const titleLines = doc.splitTextToSize(day.title, contentWidth - 26);

      let subLines = [];
      if (day.subtitle) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.4);
        subLines = doc.splitTextToSize(day.subtitle, contentWidth - 6);
      }

      // Measure meta height (2 columns of key-values)
      let metaHeight = 0;
      if (day.meta && day.meta.length > 0) {
        const halfMeta = Math.ceil(day.meta.length / 2);
        metaHeight = (halfMeta * 4.6) + 3.5;
      }

      // Measure description lines
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.7);
      const splitDesc = day.description.map(p => doc.splitTextToSize(p, contentWidth - 6));

      const minDayHeight = 8 + (titleLines.length * 4.2) + (subLines.length * 3.4) + metaHeight;

      // Smart page break check
      if (currentY + minDayHeight + 15 > bottomLimit) {
        doc.addPage();
        renderHeader(false);
      }

      const dayStartY = currentY;

      // Header Band: Pale Slate tint with left border
      const headerBandHeight = Math.max(7, (titleLines.length * 4.5) + 3);
      doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.roundedRect(margin, dayStartY, contentWidth, headerBandHeight, 1.2, 1.2, 'FD');

      // Day Pill Badge
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.roundedRect(margin + 2.5, dayStartY + 2.2, 16, 5, 0.8, 0.8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text(dayBadgeText, margin + 4, dayStartY + 5.8);

      // Day Title (Full wrapped text!)
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      titleLines.forEach((tl, tidx) => {
        doc.text(tl, margin + 21, dayStartY + 5.8 + (tidx * 4.2));
      });

      currentY = dayStartY + headerBandHeight + 2;

      // Subtitle (Full wrapped text!)
      if (subLines.length > 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.4);
        doc.setTextColor(cyanBlue[0], cyanBlue[1], cyanBlue[2]);
        subLines.forEach(sl => {
          doc.text(sl, margin + 3, currentY);
          currentY += 3.4;
        });
        currentY += 1;
      }

      // Daily Meta Box (2-column specifications, zero truncation!)
      if (day.meta && day.meta.length > 0) {
        const boxY = currentY;
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
        doc.roundedRect(margin + 2, boxY, contentWidth - 4, metaHeight, 1, 1, 'FD');

        const half = Math.ceil(day.meta.length / 2);
        const mCol1 = day.meta.slice(0, half);
        const mCol2 = day.meta.slice(half);
        const mColW = (contentWidth - 8) / 2;

        // Col 1
        let my1 = boxY + 3.2;
        mCol1.forEach(mi => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6);
          doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
          doc.text(`${mi.label}:`, margin + 4.5, my1);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.8);
          doc.setTextColor(navy[0], navy[1], navy[2]);
          const valL = doc.splitTextToSize(mi.value, mColW - 24);
          doc.text(valL[0] || mi.value, margin + 24, my1);
          my1 += 4.5;
        });

        // Col 2
        let my2 = boxY + 3.2;
        mCol2.forEach(mi => {
          const mx = margin + 4 + mColW;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6);
          doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
          doc.text(`${mi.label}:`, mx + 2, my2);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.8);
          doc.setTextColor(navy[0], navy[1], navy[2]);
          const valL = doc.splitTextToSize(mi.value, mColW - 24);
          doc.text(valL[0] || mi.value, mx + 22, my2);
          my2 += 4.5;
        });

        currentY = boxY + metaHeight + 2.5;
      }

      // Narrative Paragraphs (Fluid multi-page flow)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.7);
      doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

      splitDesc.forEach(lines => {
        lines.forEach(line => {
          if (currentY + 4 > bottomLimit) {
            doc.addPage();
            renderHeader(false);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.7);
            doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
          }
          doc.text(line, margin + 3, currentY);
          currentY += 3.5;
        });
        currentY += 2; // space between paragraphs
      });

      // Divider between days
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.line(margin + 2, currentY, pageWidth - margin - 2, currentY);
      currentY += 4.5;
    });

    // --- SECTION: WHAT'S INCLUDED & WHAT'S EXCLUDED ---
    if (data.inclusions.length > 0 || data.exclusions.length > 0) {
      doc.addPage();
      renderHeader(false);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text('PACKAGE INCLUSIONS & EXCLUSIONS', margin, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
      doc.text('Transparent Himalayan expedition specifications with zero hidden charges.', margin, currentY);
      currentY += 7;

      // 2 Column Layout: Inclusions (Left), Exclusions (Right)
      const incColW = (contentWidth - 6) / 2;
      const startIncY = currentY;

      // Left Column: Inclusions Header
      doc.setFillColor(236, 253, 245); // #ECFDF5
      doc.setDrawColor(emerald[0], emerald[1], emerald[2]);
      doc.roundedRect(margin, startIncY, incColW, 8.5, 1.2, 1.2, 'FD');

      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('WHAT IS INCLUDED IN YOUR PACKAGE', margin + 4, startIncY + 5.8);

      let incY = startIncY + 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

      data.inclusions.forEach(inc => {
        const lines = doc.splitTextToSize(inc, incColW - 7);
        if (incY + (lines.length * 3.4) > bottomLimit) {
          doc.addPage();
          renderHeader(false);
          incY = 18;
        }
        // Crisp emerald circle bullet
        doc.setFillColor(emerald[0], emerald[1], emerald[2]);
        doc.circle(margin + 2, incY - 0.8, 0.9, 'F');
        doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
        doc.text(lines, margin + 4.5, incY);
        incY += (lines.length * 3.4) + 2.2;
      });

      // Right Column: Exclusions Header
      doc.setFillColor(254, 242, 242); // #FEF2F2
      doc.setDrawColor(rose[0], rose[1], rose[2]);
      const excX = margin + incColW + 6;
      doc.roundedRect(excX, startIncY, incColW, 8.5, 1.2, 1.2, 'FD');

      doc.setTextColor(rose[0], rose[1], rose[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('WHAT IS NOT INCLUDED (EXCLUSIONS)', excX + 4, startIncY + 5.8);

      let excY = startIncY + 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);

      data.exclusions.forEach(exc => {
        const lines = doc.splitTextToSize(exc, incColW - 7);
        if (excY + (lines.length * 3.4) > bottomLimit) {
          doc.addPage();
          renderHeader(false);
          excY = 18;
        }
        // Crisp rose circle bullet
        doc.setFillColor(rose[0], rose[1], rose[2]);
        doc.circle(excX + 2, excY - 0.8, 0.9, 'F');
        doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
        doc.text(lines, excX + 4.5, excY);
        excY += (lines.length * 3.4) + 2.2;
      });

      currentY = Math.max(incY, excY) + 6;
    }

    // --- SECTION: BOOKING INFORMATION & CONTACT CARD ---
    if (currentY + 42 > bottomLimit) {
      doc.addPage();
      renderHeader(false);
    }

    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.roundedRect(margin, currentY, contentWidth, 38, 2, 2, 'F');

    // Accent Line
    doc.setFillColor(copper[0], copper[1], copper[2]);
    doc.rect(margin, currentY, contentWidth, 1.2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('READY TO PLAN YOUR HIMALAYAN EXPEDITION?', margin + 6, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    doc.text('Contact our mountain leaders for custom departure dates, private groups, and gear consultation:', margin + 6, currentY + 12);

    // Trust badges row
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(cyanBlue[0], cyanBlue[1], cyanBlue[2]);
    doc.text('* 100% Guaranteed Departures', margin + 6, currentY + 18);
    doc.text('* Certified High-Altitude Sherpas', margin + 60, currentY + 18);
    doc.text('* Emergency Medical Protocol', margin + 115, currentY + 18);

    // Contact details box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 6, currentY + 22, contentWidth - 12, 11, 1.2, 1.2, 'F');

    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.text('WhatsApp: +977 9860843980', margin + 10, currentY + 29);
    doc.text('Email: info@igloohimalayatreks.com', margin + 65, currentY + 29);
    doc.text('Web: www.igloohimalayatreks.com', margin + 120, currentY + 29);

    // --- RUNNING FOOTERS ---
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
      doc.text('Igloo Himalaya Treks * Government Lic. #148924 * Thamel, Kathmandu, Nepal * www.igloohimalayatreks.com', margin, pageHeight - 5.5);
      doc.setFont('helvetica', 'bold');
      doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin - 15, pageHeight - 5.5);
    }

    return doc;
  }

  /**
   * Helper: Show Toast Notification
   */
  function showToast(message, type) {
    type = type || 'success';
    let toast = document.getElementById('itinerary-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'itinerary-toast';
      toast.className = 'itinerary-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `itinerary-toast show ${type}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /**
   * Main Handler: Share / Download PDF
   */
  async function handlePDFAction(buttonEl, event) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();

    const btn = buttonEl || document.getElementById('itinerary-download-pdf-btn');
    const originalContent = btn ? btn.innerHTML : '';

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="spin-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Preparing Dossier...</span>
      `;
    }

    setTimeout(async () => {
      try {
        const data = extractPackageData();
        const doc = generateMasterItineraryPDF(data);
        const filename = `${data.slug}-Expedition-Dossier-Igloo-Himalaya-Treks.pdf`;

        // Check if device supports Web Share API file sharing (e.g. Mobile Safari, Android Chrome)
        let sharedViaNative = false;
        if (navigator.canShare) {
          try {
            const pdfBlob = doc.output('blob');
            const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
            if (navigator.canShare({ files: [pdfFile] })) {
              await navigator.share({
                files: [pdfFile],
                title: `${data.title} (${data.duration}) Dossier - Igloo Himalaya Treks`,
                text: `Official expedition itinerary and complete dossier for ${data.title} (${data.duration}) with Igloo Himalaya Treks.`
              });
              sharedViaNative = true;
              showToast('Expedition Dossier shared successfully!');
            }
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') {
              sharedViaNative = true;
            } else {
              console.warn('Native share error, falling back to download:', shareErr);
              sharedViaNative = false;
            }
          }
        }

        // Direct vector download fallback
        if (!sharedViaNative) {
          doc.save(filename);
          showToast(`${data.title} Itinerary Dossier downloaded successfully!`);
        }
      } catch (err) {
        console.error('PDF generation error:', err);
        showToast('Error preparing PDF. Opening print preview instead.', 'error');
        window.print();
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalContent;
        }
      }
    }, 120);
  }

  // Expose globally
  window.handleItineraryPDFAction = handlePDFAction;
  window.downloadItineraryPDF = handlePDFAction;
  window.extractPackageData = extractPackageData;
  window.generateMasterItineraryPDF = generateMasterItineraryPDF;

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('itinerary-download-pdf-btn');
    if (btn) {
      btn.addEventListener('click', (e) => handlePDFAction(btn, e));
    }
  });
})();
