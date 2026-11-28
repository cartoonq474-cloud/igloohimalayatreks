'use strict';

const FAQ_ENUM_ORDER = ['GENERAL', 'GEAR', 'HEALTH', 'BOOKING'];

function cleanText(str) {
  return String(str || '').replace(/\s+/g, ' ').trim();
}

function normalizeLocalPath(src) {
  if (!src) return null;
  const s = String(src).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith('data:')) return s;
  return s.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\/+/, '');
}

function extractHero($) {
  let heroSummary = $('p[itemprop="description"]').first().text() || $('#ebc-short-desc').first().text() || '';
  if (!cleanText(heroSummary)) {
    heroSummary = $('h1').first().parent().find('p').first().text() || '';
  }
  heroSummary = cleanText(heroSummary).replace(/\s*(Learn more|See more)\s*→?\s*$/i, '').trim();

  const slots = ['HERO_MAIN', 'HERO_TILE_1', 'HERO_TILE_2', 'HERO_TILE_3', 'HERO_TILE_4'];
  const galleries = [];
  $('.trek-gallery-collage img').each((idx, el) => {
    if (idx >= slots.length) return;
    const rawSrc = $(el).attr('src') || $(el).attr('data-src');
    const localPath = normalizeLocalPath(rawSrc);
    if (!localPath) return;
    galleries.push({
      slot: slots[idx],
      sortOrder: idx,
      src: localPath,
      altText: cleanText($(el).attr('alt')) || null,
      caption: cleanText($(el).attr('title')) || null
    });
  });

  return { heroSummary: heroSummary || null, heroGallery: galleries };
}

function extractSidebar($) {
  const sidebar = $('.sidebar-booking-card').first();
  let startingPriceUsd = null;

  if (sidebar.length) {
    const heroPriceEl = sidebar.find('.hero-price-val, strong, span, div').filter((_i, el) => {
      return $(el).children().length === 0 && /^\$[\d,]+$/.test($(el).text().trim());
    }).first();
    const candidateText = heroPriceEl.length ? heroPriceEl.text() : sidebar.text();
    const m = candidateText.match(/(?:USD|\$)\s*([\d,]+)/i);
    if (m) startingPriceUsd = parseFloat(m[1].replace(/,/g, ''));
  }
  if (!startingPriceUsd) {
    const m = $('body').text().match(/(?:USD|\$)\s*([\d,]+)/i);
    if (m) startingPriceUsd = parseFloat(m[1].replace(/,/g, ''));
  }

  const sidebarTiers = [];
  sidebar.find('.group-discount-content > div').each((_i, el) => {
    const label = cleanText($(el).find('span').first().text());
    const price = cleanText($(el).find('strong').first().text());
    if (label && price) sidebarTiers.push({ label, price });
  });

  const sidebarBullets = [];
  sidebar.find('ul li').each((_i, el) => {
    const txt = cleanText($(el).text());
    if (txt) sidebarBullets.push(txt);
  });

  return {
    startingPriceUsd: startingPriceUsd || 995,
    sidebarTiers,
    sidebarBullets
  };
}

function extractTripFacts($) {
  const facts = [];
  $('.trip-fact-item').each((_i, el) => {
    const spans = $(el).find('span');
    const strong = cleanText($(el).find('strong, h4').first().text());
    const altEl = $(el).find('[data-altitude-m]').first();
    const altVal = altEl.attr('data-altitude-m') ? parseInt(altEl.attr('data-altitude-m'), 10) : null;

    if (spans.length === 0 && !strong) return;

    const category = cleanText(spans.eq(0).text());
    const value = strong || cleanText(spans.eq(1).text());
    const subtitle = spans.length >= 3 ? cleanText(spans.eq(2).text()) : (strong && spans.length >= 2 ? cleanText(spans.eq(1).text()) : '');
    const item = { category, value, subtitle };
    if (altVal) item.altitudeM = altVal;
    facts.push(item);
  });
  return facts;
}

function extractOverview($) {
  const overview = $('#section-overview');
  const highlights = [];

  // Pattern A: Rule 6 inline SVG emerald-circle grid
  overview.find('polyline[points="20 6 9 17 4 12"]').each((_i, el) => {
    const row = $(el).closest('div').parent();
    const textSpan = row.find('span').filter((_j, s) => {
      const $s = $(s);
      return $s.find('svg').length === 0 && cleanText($s.text()).length > 8;
    }).first();
    const txt = cleanText(textSpan.text());
    if (txt && !highlights.includes(txt)) highlights.push(txt);
  });

  // Pattern B: .rich-highlights-container cards
  if (highlights.length === 0) {
    overview.find('.rich-highlights-grid .rich-highlight-item .rich-highlight-content, .rich-highlights-container div[style*="grid-template-columns"] > div').each((_i, card) => {
      const heading = cleanText($(card).find('h3, h4').first().text());
      const desc = cleanText($(card).find('p').first().text());
      const combined = heading && desc ? `${heading}: ${desc}` : cleanText($(card).text());
      if (combined && combined.length > 8 && !highlights.includes(combined)) highlights.push(combined);
    });
  }

  // Pattern C: generic ul li / .highlight-item
  if (highlights.length === 0) {
    overview.find('ul li, .highlight-item span').each((_i, el) => {
      const txt = cleanText($(el).text());
      if (txt && txt.length > 8 && !highlights.includes(txt)) highlights.push(txt);
    });
  }

  // Why Book Cards
  const whyBookCards = [];
  const whyBookHeading = overview.find('h2, h3').filter((_i, el) => /why\s+book/i.test($(el).text())).first();
  const whyBookTitle = cleanText(whyBookHeading.text()) || null;
  if (whyBookHeading.length) {
    const whyGrid = whyBookHeading.closest('div').find('div[style*="grid-template-columns"]').first();
    whyGrid.children('div').each((_i, card) => {
      const title = cleanText($(card).find('h3, h4, strong').first().text());
      const desc = cleanText($(card).find('p').first().text());
      if (title || desc) whyBookCards.push({ title, desc });
    });
  }

  // Narrative Paragraphs (either existing .rte-overview-content wrapper or direct <p> inside #section-overview)
  const rteWrap = overview.find('[data-rte-overview]').first();
  let overviewHtml = null;
  if (rteWrap.length) {
    overviewHtml = (rteWrap.html() || '').trim() || null;
  } else {
    const paragraphs = [];
    overview.children('p').each((_i, p) => {
      const html = cleanText($(p).html());
      if (html && !/chat with us/i.test(html)) {
        paragraphs.push(`<p>${$(p).html().trim()}</p>`);
      }
    });
    overviewHtml = paragraphs.length ? paragraphs.join('\n') : null;
  }

  return {
    highlights,
    overviewHtml,
    whyBookTitle,
    whyBookCards
  };
}

function extractItinerary($) {
  const days = [];
  $('#section-itinerary .itinerary-card').each((idx, el) => {
    const $card = $(el);
    const dayNumAttr = parseInt($card.attr('data-day') || '', 10);
    const dayNumber = Number.isFinite(dayNumAttr) && dayNumAttr > 0 ? dayNumAttr : idx + 1;

    const rawTitle = cleanText($card.find('h3, h4, .itinerary-title, .itinerary-day-title-new').first().text());
    const title = rawTitle.replace(/^Day\s+\d+\s*[:–—-]\s*/i, '').trim() || rawTitle;
    const subtitle = cleanText($card.find('.itinerary-subtitle, .itinerary-day-subtitle-new').first().text()) || null;
    const altAttr = $card.find('[data-altitude-m]').first().attr('data-altitude-m');
    const altitudeM = altAttr ? parseInt(altAttr, 10) : null;
    const descHtml = ($card.find('.itinerary-description').first().html() || $card.find('p').first().html() || '').trim() || null;

    let routeSummary = null;
    let activityType = null;
    let durationHours = null;
    let distanceKm = null;
    let accommodation = null;
    let meals = null;

    $card.find('.itinerary-meta-box-item').each((_j, item) => {
      const $item = $(item);
      const spans = $item.find('span');
      const strong = $item.find('strong').first();
      const label = cleanText(spans.first().text()).toLowerCase();
      const value = cleanText(strong.length ? strong.text() : spans.last().text());
      if (!label || !value) return;

      if (label.includes('route')) routeSummary = value.slice(0, 255);
      else if (label.includes('activity') || label.includes('main')) activityType = value.slice(0, 180);
      else if (label.includes('time') || label.includes('duration') || label.includes('hours')) durationHours = value.slice(0, 80);
      else if (label.includes('distance')) distanceKm = value.slice(0, 80);
      else if (label.includes('stay') || label.includes('accommodation') || label.includes('transport')) accommodation = value.slice(0, 180);
      else if (label.includes('meal') || label.includes('food')) meals = value.slice(0, 180);
      else if (!accommodation && label.includes('admission')) accommodation = value.slice(0, 180);
    });

    if (title) {
      days.push({
        dayNumber,
        title: title.slice(0, 255),
        subtitle: subtitle ? subtitle.slice(0, 255) : null,
        altitudeM: Number.isFinite(altitudeM) ? altitudeM : null,
        routeSummary,
        activityType,
        durationHours,
        distanceKm,
        accommodation,
        meals,
        descriptionHtml: descHtml
      });
    }
  });
  return days;
}

function extractIncludesExcludes($) {
  const includes = [];
  const excludes = [];
  const sec = $('#section-includes, #section-inclusions').first();

  sec.find('.inc-exc-card').each((_i, el) => {
    const $c = $(el);
    const title = cleanText($c.find('.inc-exc-card-title, h4, h3, strong').first().text());
    const text = cleanText($c.find('.inc-exc-card-text, p').first().text());
    if (!title && !text) return;
    if ($c.hasClass('exclude-card')) excludes.push({ title, text });
    else includes.push({ title, text });
  });

  return { includes, excludes };
}

function extractDatesAndPrices($, sidebarData) {
  const sec = $('#section-dates, #section-dates-prices').first();
  const sectionIntro = cleanText(sec.find('.dates-price-card-intro').first().text()) || cleanText(sec.find('p').first().text()) || null;

  const tiers = [];
  sec.find('.dates-tier-item').each((_i, el) => {
    const label = cleanText($(el).find('.dates-tier-label').text());
    const price = cleanText($(el).find('.dates-tier-price').text());
    const note = cleanText($(el).find('.dates-tier-pill').text());
    if (label) tiers.push({ label, price, note });
  });
  if (tiers.length === 0) {
    sec.find('h3').filter((_i, el) => /starting prices/i.test($(el).text())).parent().find('div[style*="grid-template-columns"] > div').each((_i, el) => {
      const spans = $(el).find('span');
      const strong = cleanText($(el).find('strong').first().text());
      const label = cleanText(spans.eq(0).text());
      const note = cleanText(spans.eq(1).text());
      if (label && strong) tiers.push({ label, price: strong, note });
    });
  }

  const tableRows = [];
  sec.find('table.dates-table tbody tr').each((_i, tr) => {
    const tds = $(tr).find('td');
    if (tds.length >= 2) {
      tableRows.push({
        category: cleanText(tds.eq(0).text()),
        status: cleanText(tds.eq(1).text()),
        action: cleanText(tds.eq(2).text()) || 'Inquire'
      });
    }
  });

  const departures = [];
  sec.find('.departure-item-row').each((_i, el) => {
    const $row = $(el);
    const title = cleanText($row.find('.departure-title, h4').first().text());
    let day = cleanText($row.find('.calendar-day-num, .departure-day').first().text())
      || cleanText($row.find('.departure-date-badge > div:not(.calendar-ring-dots), .departure-date-badge > span').eq(0).text());
    let month = cleanText($row.find('.calendar-month-txt, .departure-month').first().text())
      || cleanText($row.find('.departure-date-badge > div:not(.calendar-ring-dots), .departure-date-badge > span').eq(1).text())
      || cleanText($row.attr('data-month') || '');
    if ((!day || !month) && title) {
      const mMatch = title.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})\b/i);
      if (mMatch) {
        if (!month) month = mMatch[1].toUpperCase().slice(0, 3);
        if (!day) day = mMatch[2].padStart(2, '0');
      }
    }
    const status = cleanText($row.find('.departure-status-pill, .departure-status-badge, span[class*="status"]').first().text()) || 'AVAILABLE';
    const priceMatch = cleanText($row.text()).match(/\$[\d,]+(?:\s*pp)?/i);
    if (title) {
      departures.push({
        month: month.toUpperCase().slice(0, 3),
        day,
        title,
        status,
        price: priceMatch ? priceMatch[0] : ''
      });
    }
  });

  return {
    groupPricingJson: {
      intro: sectionIntro,
      tiers,
      tableRows,
      sidebarTiers: sidebarData.sidebarTiers || [],
      sidebarBullets: sidebarData.sidebarBullets || []
    },
    departureDatesJson: departures
  };
}

function extractPackingList($) {
  const sec = $('#section-packing');
  const intro = cleanText(sec.find('.packing-intro-text').first().text()) || null;
  const banner = sec.find('.packing-rental-banner').first();
  const bannerTitle = cleanText(banner.find('h3, h4, strong').first().text()) || null;
  const bannerDesc = cleanText(banner.find('p').first().text()) || null;
  const concludingNote = cleanText(sec.find('.packing-concluding-note p').first().text()) || null;

  const categories = [];
  sec.find('.packing-category-card').each((_i, card) => {
    const $c = $(card);
    const title = cleanText($c.find('h3, .gear-section-title').first().text());
    const items = [];
    $c.find('.gear-item-row').each((_j, row) => {
      const $r = $(row);
      const label = cleanText($r.find('.gear-item-label').first().text());
      const $descClone = $r.find('.gear-item-desc').first().clone();
      const qty = cleanText($descClone.find('.gear-qty-tag').text());
      $descClone.find('.gear-qty-tag').remove();
      const desc = cleanText($descClone.text());
      if (label) items.push({ label, desc: desc || '', qty: qty || '' });
    });
    if (title || items.length > 0) {
      categories.push({ title: title || 'Checklist Category', items });
    }
  });

  return { intro, bannerTitle, bannerDesc, concludingNote, categories };
}

function extractReadBeforeBook($) {
  const sec = $('#section-details');
  const title = cleanText(sec.find('.details-main-title, h2').first().text()) || null;
  const subtitles = sec.find('.details-subtitle-text');
  const subtitle = subtitles.eq(0).length ? cleanText(subtitles.eq(0).text()) : null;
  const secondarySubtitle = subtitles.eq(1).length ? (subtitles.eq(1).html() || '').trim() : null;

  const items = [];
  sec.find('.detail-accordion-card').each((idx, card) => {
    const $c = $(card);
    const id = $c.attr('data-detail-id') || `topic-${idx + 1}`;
    const itemTitle = cleanText($c.find('.detail-accordion-title, h4').first().text());
    const contentHtml = ($c.find('.detail-accordion-content-inner').first().html() || '').trim();
    if (itemTitle) {
      items.push({ id, title: itemTitle, contentHtml });
    }
  });

  return { title, subtitle, secondarySubtitle, items };
}

function extractAltitudeDetails($, baseProfile) {
  const sec = $('#section-altitude-profile');
  const title = cleanText(sec.find('h2').first().text()) || null;
  const intro = cleanText(sec.find('> p, .details-title-wrapper + p').first().text()) || null;

  const overnightTable = [];
  sec.find('table tbody tr').each((_i, tr) => {
    const tds = $(tr).find('td');
    if (tds.length >= 2) {
      overnightTable.push({
        day: cleanText(tds.eq(0).text()),
        stop: cleanText(tds.eq(1).text()),
        altitude: cleanText(tds.eq(2).text())
      });
    }
  });

  const higherPlaces = [];
  sec.find('.higher-place-card').each((_i, card) => {
    const $c = $(card);
    higherPlaces.push({
      tag: cleanText($c.find('.higher-place-tag').text()),
      altitude: cleanText($c.find('.higher-place-alt-badge').text()),
      title: cleanText($c.find('.higher-place-title').text()),
      desc: cleanText($c.find('.higher-place-desc').text()),
      featureTag: cleanText($c.find('.higher-place-feature-tag span').text())
    });
  });
  if (higherPlaces.length === 0) {
    sec.find('ul li').each((_i, li) => {
      const txt = cleanText($(li).text()).replace(/^[•\-–]\s*/, '');
      if (txt) higherPlaces.push({ title: txt, desc: '', altitude: '', tag: '', featureTag: '' });
    });
  }

  return {
    ...(baseProfile && typeof baseProfile === 'object' ? baseProfile : {}),
    sectionTitle: title,
    intro,
    overnightTable,
    higherPlaces
  };
}

function extractWeatherDetails($, baseProfile) {
  const sec = $('#section-weather');
  const title = cleanText(sec.find('h2').first().text()) || null;
  const intro = cleanText(sec.find('> div > p, > p').first().text()) || null;

  const seasonCards = [];
  sec.find('.alt-stat-card').each((_i, card) => {
    const $c = $(card);
    seasonCards.push({
      tag: cleanText($c.find('.alt-stat-tag').text()),
      season: cleanText($c.find('.alt-stat-value').text()),
      rangeDesc: cleanText($c.find('.alt-stat-label').text())
    });
  });
  if (seasonCards.length === 0) {
    sec.find('h3').filter((_i, h) => /seasonal weather/i.test($(h).text())).parent().find('div[style*="grid-template-columns"] > div').each((_i, card) => {
      const heading = cleanText($(card).find('h4, strong, span').eq(0).text());
      const months = cleanText($(card).find('span').eq(1).text());
      const body = cleanText($(card).find('p').first().text());
      if (heading) {
        seasonCards.push({
          tag: months || '',
          season: heading,
          rangeDesc: body
        });
      }
    });
  }

  const seasonalTable = [];
  sec.find('table tbody tr').each((_i, tr) => {
    const tds = $(tr).find('td');
    if (tds.length >= 3) {
      seasonalTable.push({
        season: cleanText(tds.eq(0).text()),
        months: cleanText(tds.eq(1).text()),
        expect: cleanText(tds.eq(2).text())
      });
    }
  });

  let routeChangeTitle = null;
  let routeChangeText = null;
  let bestSeasonTitle = null;
  let bestSeasonText = null;
  sec.find('h4').each((_i, h) => {
    const heading = cleanText($(h).text());
    const card = $(h).closest('div[style*="border"], .higher-place-card');
    const body = cleanText(card.find('p').first().text());
    if (/how weather changes/i.test(heading)) {
      routeChangeTitle = heading;
      routeChangeText = body;
    } else if (/which season/i.test(heading)) {
      bestSeasonTitle = heading;
      bestSeasonText = body;
    }
  });

  return {
    ...(baseProfile && typeof baseProfile === 'object' ? baseProfile : {}),
    sectionTitle: title,
    intro,
    seasonCards,
    seasonalTable,
    routeChangeTitle,
    routeChangeText,
    bestSeasonTitle,
    bestSeasonText
  };
}

function extractRouteMap($) {
  const sec = $('#section-map');
  if (!sec.length) return null;
  const img = sec.find('img#trek-route-map-img, img').first();
  const src = normalizeLocalPath(img.attr('src'));
  return {
    title: cleanText(sec.find('h2').first().text()) || null,
    subtitle: cleanText(sec.find('> p').first().text()) || null,
    imageUrl: src,
    altText: cleanText(img.attr('alt')) || null
  };
}

function extractBookingAndCta($) {
  const secBooking = $('#section-booking');
  const bookingBanner = secBooking.length
    ? {
        title: cleanText(secBooking.find('h2').first().text()) || null,
        body: cleanText(secBooking.find('p').first().text()) || null
      }
    : null;

  const ctaBanner = $('#section-faqs .faq-bottom-cta-banner, #section-faqs div[style*="linear-gradient"]').last();
  const bottomCta = ctaBanner.length
    ? {
        badge: cleanText(ctaBanner.find('span').first().text()) || null,
        title: cleanText(ctaBanner.find('h2, h3').first().text()) || null,
        body: cleanText(ctaBanner.find('p').first().text()) || null
      }
    : null;

  return { bookingBanner, bottomCta };
}

function extractFaqs($) {
  const categoryMeta = [];
  const domKeyToEnum = new Map();

  $('#section-faqs .faq-category-btn').each((idx, btn) => {
    const domKey = $(btn).attr('data-category') || `cat_${idx}`;
    const labelEl = $(btn).find('.faq-cat-label').length ? $(btn).find('.faq-cat-label') : $(btn);
    const label = cleanText(labelEl.text());
    const enumKey = FAQ_ENUM_ORDER[idx] || 'GENERAL';
    domKeyToEnum.set(domKey, enumKey);
    categoryMeta.push({ enumKey, domKey, label });
  });

  const faqs = [];
  let sortOrder = 0;

  if ($('#section-faqs .faq-category-content').length > 0) {
    $('#section-faqs .faq-category-content').each((catIdx, pane) => {
      const idAttr = ($(pane).attr('id') || '').replace(/^faq-cat-/, '');
      const catAttr = $(pane).attr('data-category') || idAttr;
      const enumKey = domKeyToEnum.get(catAttr) || FAQ_ENUM_ORDER[catIdx] || 'GENERAL';

      $(pane).find('.faq-item, details').each((_j, item) => {
        const $item = $(item);
        const $qEl = $item.find('summary, .faq-item-question, .faq-question').first();
        const qText = cleanText($qEl.find('span').first().length ? $qEl.find('span').first().text() : $qEl.text());
        const $aEl = $item.find('.faq-item-answer, .faq-answer, p').first();
        const ansHtml = ($aEl.html() || '').trim();
        if (qText && ansHtml) {
          faqs.push({
            category: enumKey,
            question: qText,
            answerHtml: ansHtml.startsWith('<') ? ansHtml : `<p>${ansHtml}</p>`,
            sortOrder: sortOrder++
          });
        }
      });
    });
  } else {
    $('#section-faqs .faq-item, #section-faqs details').each((_i, item) => {
      const $item = $(item);
      const $qEl = $item.find('summary, .faq-item-question, .faq-question').first();
      const qText = cleanText($qEl.find('span').first().length ? $qEl.find('span').first().text() : $qEl.text());
      const $aEl = $item.find('.faq-item-answer, .faq-answer, p').first();
      const ansHtml = ($aEl.html() || '').trim();
      if (qText && ansHtml) {
        faqs.push({
          category: 'GENERAL',
          question: qText,
          answerHtml: ansHtml.startsWith('<') ? ansHtml : `<p>${ansHtml}</p>`,
          sortOrder: sortOrder++
        });
      }
    });
  }

  return { faqs, faqCategories: categoryMeta };
}

function extractRecommendations($) {
  const slugs = [];
  $('.you-might-like-section a.yml-card').each((_i, el) => {
    const href = $(el).attr('href') || '';
    const cleaned = href.replace(/[?#].*$/, '').replace(/\/+$/, '');
    const parts = cleaned.split('/').filter(Boolean);
    const slug = parts[parts.length - 1];
    if (slug && !slugs.includes(slug)) slugs.push(slug);
  });
  return slugs.slice(0, 4);
}

module.exports = {
  FAQ_ENUM_ORDER,
  cleanText,
  normalizeLocalPath,
  extractHero,
  extractSidebar,
  extractTripFacts,
  extractOverview,
  extractItinerary,
  extractIncludesExcludes,
  extractDatesAndPrices,
  extractPackingList,
  extractReadBeforeBook,
  extractAltitudeDetails,
  extractWeatherDetails,
  extractRouteMap,
  extractBookingAndCta,
  extractFaqs,
  extractRecommendations
};
