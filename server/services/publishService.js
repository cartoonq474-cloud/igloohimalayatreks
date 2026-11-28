'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { prisma } = require('../db/prisma');
const { renderBlogArticle } = require('../../components/blog/BlogArticleTemplate');
const { renderCanonicalPackageHtml } = require('./trekTemplateRenderer');
const { validateTrekHtml, validateBlogHtml } = require('./publishValidator');
const { AppError } = require('../utils/http');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const BASE_URL = 'https://www.igloohimalayatreks.com';
const FAQ_ENUM_ORDER = ['GENERAL', 'GEAR', 'HEALTH', 'BOOKING'];

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDayLabel(days) {
  const n = Number(days) || 1;
  return `${n} ${n === 1 ? 'Day' : 'Days'}`;
}

function toRelativeMediaSrc(raw, prefix = '../../') {
  if (!raw) return '';
  const s = String(raw).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith('data:')) return s;
  const cleaned = s.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\/+/, '');
  return `${prefix}${cleaned}`;
}

function buildHighlightCardHtml(text) {
  return `<div style="display: flex; align-items: flex-start; gap: 12px;">
    <span style="display: flex; width: 24px; height: 24px; flex-shrink: 0; align-items: center; justify-content: center; border: 1px solid #10B981; border-radius: 50%; background: #ECFDF5; margin-top: 2px;">
      <svg width="14" height="14" stroke="#10B981" stroke-width="2.5" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <span style="font-size: 0.98rem; color: #334155; line-height: 1.55; font-weight: 500;">${escapeHtml(text)}</span>
  </div>`;
}

function buildSidebarBulletHtml(text) {
  return `<li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.93rem; color: #334155; font-weight: 500; margin-bottom: 10px;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${escapeHtml(text)}</span>
  </li>`;
}

function syncHeroAndSeo($, pkg, fullDisplayTitle, metaTitle, metaDesc, canonical, ogImage) {
  $('title').first().text(metaTitle);
  const descEl = $('meta[name="description"]').first();
  if (descEl.length) descEl.attr('content', metaDesc);
  const canonEl = $('link[rel="canonical"]').first();
  if (canonEl.length) canonEl.attr('href', canonical);
  if (pkg.seo && pkg.seo.keywords) {
    let kwEl = $('meta[name="keywords"]').first();
    if (!kwEl.length) {
      $('head').append(`<meta name="keywords" content="${escapeHtml(pkg.seo.keywords)}">`);
    } else {
      kwEl.attr('content', pkg.seo.keywords);
    }
  }

  const ogTitle = $('meta[property="og:title"]').first();
  if (ogTitle.length) ogTitle.attr('content', metaTitle);
  const ogDesc = $('meta[property="og:description"]').first();
  if (ogDesc.length) ogDesc.attr('content', metaDesc);
  const twTitle = $('meta[name="twitter:title"]').first();
  if (twTitle.length) twTitle.attr('content', metaTitle);
  const twDesc = $('meta[name="twitter:description"]').first();
  if (twDesc.length) twDesc.attr('content', metaDesc);

  if (ogImage) {
    const absOg = ogImage.startsWith('http') ? ogImage : `${BASE_URL}/${ogImage.replace(/^\/+/, '')}`;
    const ogImgEl = $('meta[property="og:image"]').first();
    if (ogImgEl.length) ogImgEl.attr('content', absOg);
    const twImgEl = $('meta[name="twitter:image"]').first();
    if (twImgEl.length) twImgEl.attr('content', absOg);
  }

  const h1 = $('h1.trek-hero-title, h1').first();
  if (h1.length) h1.text(fullDisplayTitle);

  const seoDesc = pkg.seo && pkg.seo.metaDescription ? pkg.seo.metaDescription.trim() : '';
  if (pkg.heroSummary && pkg.heroSummary.trim() !== seoDesc) {
    const heroDesc = $('p[itemprop="description"], #ebc-short-desc').first();
    if (heroDesc.length) {
      const anchor = heroDesc.find('a').first();
      if (anchor.length) {
        const anchorHtml = $.html(anchor);
        heroDesc.html(`${escapeHtml(pkg.heroSummary)} ${anchorHtml}`);
      } else {
        heroDesc.text(pkg.heroSummary);
      }
    }
  }

  // Sync 5 Hero Bento Collage images if PackageGallery items exist
  if (Array.isArray(pkg.galleries) && pkg.galleries.length > 0) {
    const heroSlots = ['HERO_MAIN', 'HERO_TILE_1', 'HERO_TILE_2', 'HERO_TILE_3', 'HERO_TILE_4'];
    const imgs = $('.trek-gallery-collage img');
    if (imgs.length > 0) {
      const sorted = [];
      for (const slot of heroSlots) {
        const match = pkg.galleries.find((g) => g.slot === slot);
        if (match && match.media) sorted.push(match);
      }
      const list = sorted.length > 0 ? sorted : pkg.galleries;
      list.forEach((g, idx) => {
        const imgEl = imgs.eq(idx);
        if (!imgEl.length || !g.media) return;
        const rawSrc = g.media.legacyLocalPath || g.media.secureUrl;
        if (rawSrc) imgEl.attr('src', toRelativeMediaSrc(rawSrc));
        if (g.caption || g.media.altText) imgEl.attr('alt', g.media.altText || g.caption);
      });
    }
  }
}

function syncSidebar($, pkg, fullDisplayTitle, priceText) {
  const sidebar = $('.sidebar-booking-card').first();
  if (sidebar.length) {
    const priceNode = sidebar.find('.hero-price-val, span, strong, div').filter((_i, el) => {
      const n = $(el);
      return n.children().length === 0 && /^\$[\d,]+$/.test(n.text().trim());
    });
    if (priceNode.length) {
      priceNode.first().text(priceText);
    }

    const durLink = sidebar.find('a[href="#section-itinerary"]').first();
    if (durLink.length) {
      durLink.text(`${pkg.durationDays} ${pkg.durationDays === 1 ? 'day' : 'days'} trip`);
    }

    const gp = pkg.groupPricingJson;
    if (gp && !Array.isArray(gp)) {
      if (Array.isArray(gp.sidebarTiers) && gp.sidebarTiers.length > 0) {
        const tiersWrap = sidebar.find('.group-discount-content').first();
        if (tiersWrap.length) {
          tiersWrap.html(
            gp.sidebarTiers
              .map(
                (t) => `<div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #E2E8F0;">
                  <span style="color: #64748B;">${escapeHtml(t.label)}</span>
                  <strong style="color: #0E3458;">${escapeHtml(t.price)}</strong>
                </div>`
              )
              .join('\n')
          );
        }
      }
      if (Array.isArray(gp.sidebarBullets) && gp.sidebarBullets.length > 0) {
        const ul = sidebar.find('ul').first();
        if (ul.length) {
          ul.html(gp.sidebarBullets.map((b) => buildSidebarBulletHtml(b)).join('\n'));
        }
      }
    }
  }

  $('.hero-price-val, .mobile-sticky-price-val').each((_i, el) => {
    $(el).text(priceText);
  });
  $('.open-inquiry-btn[data-trek-title]').each((_i, el) => {
    $(el).attr('data-trek-title', fullDisplayTitle);
  });
}

function syncTripFacts($, pkg) {
  if (pkg.maxAltitudeM) {
    $('[data-altitude-m]').first().attr('data-altitude-m', String(pkg.maxAltitudeM));
  }
  if (!Array.isArray(pkg.tripFactsJson) || pkg.tripFactsJson.length === 0) return;

  const factItems = $('.trip-fact-item');
  if (!factItems.length) return;
  const grid = factItems.first().parent();
  const templateHtml = $.html(factItems.last());

  factItems.each((idx, el) => {
    if (idx >= pkg.tripFactsJson.length) {
      $(el).remove();
    }
  });

  pkg.tripFactsJson.forEach((fact, idx) => {
    let item = $('.trip-fact-item').eq(idx);
    if (!item.length) {
      grid.append('\n' + templateHtml);
      item = $('.trip-fact-item').last();
    }
    const spans = item.find('span');
    const strong = item.find('strong, h4').first();
    if (spans.eq(0).length) spans.eq(0).text(fact.category || '');
    if (strong.length) {
      strong.text(fact.value || '');
      if (spans.eq(1).length && fact.subtitle !== undefined) spans.eq(1).text(fact.subtitle || '');
    } else {
      if (spans.eq(1).length) spans.eq(1).text(fact.value || '');
      if (spans.eq(2).length) spans.eq(2).text(fact.subtitle || '');
    }
    if (fact.altitudeM) {
      item.find('[data-altitude-m]').attr('data-altitude-m', String(fact.altitudeM));
    }
  });
}

function syncOverviewSection($, pkg) {
  const overview = $('#section-overview');
  if (!overview.length) return;

  if (pkg.overviewHtml && String(pkg.overviewHtml).trim()) {
    const rteExisting = overview.find('[data-rte-overview]').first();
    const wrappedHtml = `<div class="rte-overview-content" data-rte-overview>${pkg.overviewHtml}</div>`;
    if (rteExisting.length) {
      rteExisting.replaceWith(wrappedHtml);
    } else {
      const directParas = overview.children('p');
      if (directParas.length > 0) {
        directParas.first().before(wrappedHtml);
        directParas.remove();
      } else {
        const heading = overview.find('h2').first();
        if (heading.length) heading.after(wrappedHtml);
        else overview.prepend(wrappedHtml);
      }
    }
  }

  if (Array.isArray(pkg.highlightsJson) && pkg.highlightsJson.length > 0) {
    const inlineGrid = overview
      .find('div[style*="grid-template-columns"]')
      .filter((_i, el) => $(el).find('polyline[points="20 6 9 17 4 12"]').length > 0)
      .first();

    if (inlineGrid.length) {
      inlineGrid.html(pkg.highlightsJson.map((item) => buildHighlightCardHtml(item)).join('\n'));
    } else {
      const richGrid = overview.find('.rich-highlights-grid').first();
      if (richGrid.length) {
        const tmpl = richGrid.find('.rich-highlight-item').first();
        const tmplHtml = tmpl.length ? $.html(tmpl) : '';
        if (tmplHtml) {
          richGrid.empty();
          pkg.highlightsJson.forEach((h) => {
            const $item = cheerio.load(tmplHtml)('.rich-highlight-item').first();
            $item.find('.rich-highlight-content').html(escapeHtml(h));
            richGrid.append('\n' + $.html($item));
          });
        }
      }
    }
  }

  const tagsMeta = pkg.tagsJson && typeof pkg.tagsJson === 'object' && !Array.isArray(pkg.tagsJson) ? pkg.tagsJson : null;
  if (tagsMeta && Array.isArray(tagsMeta.whyBookCards) && tagsMeta.whyBookCards.length > 0) {
    const whyHeading = overview.find('h2, h3').filter((_i, el) => /why\s+book/i.test($(el).text())).first();
    if (whyHeading.length) {
      if (tagsMeta.whyBookTitle) whyHeading.text(tagsMeta.whyBookTitle);
      const grid = whyHeading.closest('div').find('div[style*="grid-template-columns"]').first();
      const cards = grid.children('div');
      tagsMeta.whyBookCards.forEach((c, idx) => {
        const card = cards.eq(idx);
        if (!card.length) return;
        const h = card.find('h3, h4, strong').first();
        if (h.length && c.title) h.text(c.title);
        const p = card.find('p').first();
        if (p.length && c.desc !== undefined) p.text(c.desc);
      });
    }
  }
}

function syncItinerarySection($, pkg) {
  if (!Array.isArray(pkg.itineraryDays) || pkg.itineraryDays.length === 0) return;

  const container = $('#section-itinerary');
  const cards = container.find('.itinerary-card');
  if (!cards.length) return;

  const listParent = cards.first().parent();
  const templateHtml = $.html(cards.last());

  // Remove trailing cards if admin removed days
  cards.each((idx, el) => {
    if (idx >= pkg.itineraryDays.length) $(el).remove();
  });

  pkg.itineraryDays.forEach((day, idx) => {
    let card = container.find('.itinerary-card').eq(idx);
    if (!card.length) {
      listParent.append('\n' + templateHtml);
      card = container.find('.itinerary-card').last();
    }
    card.attr('data-day', String(day.dayNumber));

    const hEl = card.find('h3, h4.itinerary-day-title-new, .itinerary-title, .itinerary-day-title-new').first();
    if (hEl.length) {
      hEl.html(`<span class="day-label">Day ${day.dayNumber}:</span> ${escapeHtml(day.title)}`);
    }

    const subEl = card.find('.itinerary-subtitle, .itinerary-day-subtitle-new').first();
    if (subEl.length) {
      if (day.subtitle) {
        subEl.text(day.subtitle);
        if (day.altitudeM !== null && day.altitudeM !== undefined) {
          subEl.attr('data-altitude-m', String(day.altitudeM));
        }
      }
    }

    if (day.altitudeM !== null && day.altitudeM !== undefined) {
      const altSpan = card.find('[data-altitude-m]').first();
      if (altSpan.length) altSpan.attr('data-altitude-m', String(day.altitudeM));
    }

    card.find('.itinerary-meta-box-item').each((_j, item) => {
      const $item = $(item);
      const spans = $item.find('span');
      const strong = $item.find('strong').first();
      const label = spans.first().text().trim().toLowerCase();
      const setVal = (val) => {
        if (!val) return;
        if (strong.length) strong.text(val);
        else if (spans.length >= 2) spans.last().text(val);
      };

      if (label.includes('route') && day.routeSummary) setVal(day.routeSummary);
      else if ((label.includes('activity') || label.includes('main')) && day.activityType) setVal(day.activityType);
      else if ((label.includes('time') || label.includes('duration') || label.includes('hours')) && day.durationHours) setVal(day.durationHours);
      else if (label.includes('distance') && day.distanceKm) setVal(day.distanceKm);
      else if ((label.includes('stay') || label.includes('accommodation') || label.includes('transport')) && day.accommodation) setVal(day.accommodation);
      else if ((label.includes('meal') || label.includes('food')) && day.meals) setVal(day.meals);
    });

    if (day.descriptionHtml !== undefined && day.descriptionHtml !== null) {
      const descBox = card.find('.itinerary-description').first();
      if (descBox.length) {
        const htmlVal = String(day.descriptionHtml).trim();
        descBox.html(htmlVal.startsWith('<') ? htmlVal : `<p>${escapeHtml(htmlVal)}</p>`);
      }
    }
  });
}

function syncIncludesExcludesSection($, pkg) {
  const sec = $('#section-includes, #section-inclusions').first();
  if (!sec.length) return;

  const syncList = (selector, items) => {
    if (!Array.isArray(items) || items.length === 0) return;
    const existingCards = sec.find(selector);
    if (!existingCards.length) return;
    const grid = existingCards.first().parent();
    const tmplHtml = $.html(existingCards.first());

    grid.empty();
    items.forEach((entry) => {
      const $c = cheerio.load(tmplHtml)('.inc-exc-card').first();
      const tEl = $c.find('.inc-exc-card-title, h4, h3, strong').first();
      const pEl = $c.find('.inc-exc-card-text, p').first();
      if (typeof entry === 'string') {
        if (tEl.length) tEl.text(entry);
        if (pEl.length) pEl.text('');
      } else {
        if (tEl.length) tEl.text(entry.title || '');
        if (pEl.length) pEl.text(entry.text || '');
      }
      grid.append('\n' + $.html($c));
    });
  };

  syncList('.inc-exc-card:not(.exclude-card)', pkg.inclusionsJson);
  syncList('.inc-exc-card.exclude-card', pkg.exclusionsJson);
}

function syncDatesAndPricesSection($, pkg) {
  const sec = $('#section-dates, #section-dates-prices').first();
  if (!sec.length) return;

  const gp = pkg.groupPricingJson;
  if (gp && !Array.isArray(gp)) {
    if (gp.intro) {
      const introEl = sec.find('.dates-price-card-intro').first();
      if (introEl.length) introEl.text(gp.intro);
    }

    if (Array.isArray(gp.tiers) && gp.tiers.length > 0) {
      const tiersGrid = sec.find('.dates-tiers-grid').first();
      if (tiersGrid.length && tiersGrid.find('.dates-tier-item').length > 0) {
        const tmplHtml = $.html(tiersGrid.find('.dates-tier-item').first());
        tiersGrid.empty();
        gp.tiers.forEach((tier) => {
          const $t = cheerio.load(tmplHtml)('.dates-tier-item').first();
          $t.find('.dates-tier-label').text(tier.label || '');
          $t.find('.dates-tier-price').text(tier.price || '');
          if (tier.note !== undefined) $t.find('.dates-tier-pill').text(tier.note || '');
          tiersGrid.append('\n' + $.html($t));
        });
      } else {
        const inlineGrid = sec.find('h3').filter((_i, el) => /starting prices/i.test($(el).text())).parent().find('div[style*="grid-template-columns"]').first();
        if (inlineGrid.length && inlineGrid.children('div').length > 0) {
          const tmplHtml = $.html(inlineGrid.children('div').first());
          inlineGrid.empty();
          gp.tiers.forEach((tier) => {
            const $box = cheerio.load(`<div class="_wrap">${tmplHtml}</div>`)('._wrap > div').first();
            $box.find('span').eq(0).text(tier.label || '');
            $box.find('strong').first().text(tier.price || '');
            $box.find('span').eq(1).text(tier.note || '');
            inlineGrid.append('\n' + $.html($box));
          });
        }
      }
    }

    if (Array.isArray(gp.tableRows) && gp.tableRows.length > 0) {
      const tbody = sec.find('table.dates-table tbody').first();
      if (tbody.length && tbody.find('tr').length > 0) {
        const tmplHtml = $.html(tbody.find('tr').first());
        tbody.empty();
        gp.tableRows.forEach((row) => {
          const $tr = cheerio.load(`<table><tbody>${tmplHtml}</tbody></table>`)('tr').first();
          const tds = $tr.find('td');
          if (tds.eq(0).length) tds.eq(0).text(row.category || '');
          if (tds.eq(1).length) tds.eq(1).text(row.status || '');
          tbody.append('\n' + $.html($tr));
        });
      }
    }
  }

  if (Array.isArray(pkg.departureDatesJson) && pkg.departureDatesJson.length > 0) {
    const depRows = sec.find('.departure-item-row');
    if (depRows.length > 0) {
      const list = depRows.first().parent();
      const tmplHtml = $.html(depRows.first());
      depRows.remove();
      pkg.departureDatesJson.forEach((dep) => {
        const $r = cheerio.load(`<div class="_wrap">${tmplHtml}</div>`)('.departure-item-row').first();
        $r.removeClass('extra-date');
        const badgeSpans = $r.find('.departure-date-badge span');
        if (badgeSpans.eq(0).length && dep.day) badgeSpans.eq(0).text(dep.day);
        if (badgeSpans.eq(1).length && dep.month) badgeSpans.eq(1).text(dep.month);
        $r.find('.departure-title, h4').first().text(dep.title || '');
        if (dep.status) $r.find('.departure-status-badge').first().text(dep.status);
        if (dep.price) {
          $r.find('strong, span').filter((_i, el) => /\$\d/.test($(el).text())).first().text(dep.price);
        }
        list.append('\n' + $.html($r));
      });
    }
  }
}

function syncPackingSection($, pkg) {
  const sec = $('#section-packing');
  const pl = pkg.packingListJson;
  if (!sec.length || !pl || typeof pl !== 'object') return;

  if (pl.intro) sec.find('.packing-intro-text').first().text(pl.intro);
  if (pl.bannerTitle || pl.bannerDesc) {
    const banner = sec.find('.packing-rental-banner').first();
    if (banner.length) {
      if (pl.bannerTitle) banner.find('h3, h4, strong').first().text(pl.bannerTitle);
      if (pl.bannerDesc) banner.find('p').first().text(pl.bannerDesc);
    }
  }
  if (pl.concludingNote) {
    sec.find('.packing-concluding-note p').first().text(pl.concludingNote);
  }

  if (Array.isArray(pl.categories) && pl.categories.length > 0) {
    const catCards = sec.find('.packing-category-card');
    if (catCards.length > 0) {
      const gridParent = catCards.first().parent();
      const cardTmplHtml = $.html(catCards.first());
      const rowTmplEl = catCards.first().find('.gear-item-row').first();
      const rowTmplHtml = rowTmplEl.length ? $.html(rowTmplEl) : '';
      let totalItems = 0;

      catCards.remove();
      pl.categories.forEach((cat, cIdx) => {
        const $card = cheerio.load(`<div class="_wrap">${cardTmplHtml}</div>`)('.packing-category-card').first();
        $card.find('h3, .gear-section-title').first().text(cat.title || '');
        const itemsList = $card.find('.gear-item-row').first().parent();
        itemsList.empty();

        const items = Array.isArray(cat.items) ? cat.items : [];
        totalItems += items.length;
        items.forEach((item, iIdx) => {
          if (!rowTmplHtml) return;
          const $row = cheerio.load(`<div class="_wrap">${rowTmplHtml}</div>`)('.gear-item-row').first();
          const cbId = `pack_cat_${cIdx}_item_${iIdx}`;
          $row.find('input[type="checkbox"]').attr('id', cbId).attr('name', cbId);
          $row.find('.gear-item-label').first().text(item.label || '');

          const descEl = $row.find('.gear-item-desc').first();
          if (descEl.length) {
            const qtyHtml = item.qty ? ` <span class="gear-qty-tag">${escapeHtml(item.qty)}</span>` : '';
            descEl.html(`${escapeHtml(item.desc || '')}${qtyHtml}`);
          }
          itemsList.append('\n' + $.html($row));
        });
        gridParent.append('\n' + $.html($card));
      });

      if (totalItems > 0) {
        sec.find('.gear-total-count').text(String(totalItems));
      }
    }
  }
}

function syncReadBeforeBookSection($, pkg) {
  const sec = $('#section-details');
  const data = pkg.readBeforeBookJson;
  if (!sec.length || !data || Array.isArray(data)) return;

  if (data.title) sec.find('.details-main-title, h2').first().text(data.title);
  const subs = sec.find('.details-subtitle-text');
  if (data.subtitle && subs.eq(0).length) subs.eq(0).text(data.subtitle);
  if (data.secondarySubtitle && subs.eq(1).length) subs.eq(1).html(data.secondarySubtitle);

  if (Array.isArray(data.items) && data.items.length > 0) {
    const list = sec.find('.detail-accordion-list').first();
    const firstCard = list.find('.detail-accordion-card').first();
    if (list.length && firstCard.length) {
      const tmplHtml = $.html(firstCard);
      list.empty();
      data.items.forEach((topic, idx) => {
        const $card = cheerio.load(`<div class="_wrap">${tmplHtml}</div>`)('.detail-accordion-card').first();
        $card.attr('data-detail-id', topic.id || `topic-${idx + 1}`);
        $card.find('.detail-accordion-title, h4').first().text(topic.title || '');
        const body = $card.find('.detail-accordion-content-inner').first();
        if (body.length) {
          const val = String(topic.contentHtml || '').trim();
          body.html(val.startsWith('<') ? val : `<p>${escapeHtml(val)}</p>`);
        }
        list.append('\n' + $.html($card));
      });
      sec.find('.details-progress-count').first().text(`0/${data.items.length} read`);
    }
  }
}

function syncAltitudeSection($, pkg) {
  const sec = $('#section-altitude-profile');
  const alt = pkg.altitudeProfileJson;
  if (!sec.length || !alt || typeof alt !== 'object') return;

  if (alt.sectionTitle) sec.find('h2').first().text(alt.sectionTitle);
  if (alt.intro) sec.find('> p, .details-title-wrapper + p').first().text(alt.intro);

  if (Array.isArray(alt.overnightTable) && alt.overnightTable.length > 0) {
    const tbody = sec.find('table tbody').first();
    const firstRow = tbody.find('tr').first();
    if (tbody.length && firstRow.length) {
      const tmplHtml = $.html(firstRow);
      tbody.empty();
      alt.overnightTable.forEach((row) => {
        const $tr = cheerio.load(`<table><tbody>${tmplHtml}</tbody></table>`)('tr').first();
        const tds = $tr.find('td');
        if (tds.eq(0).length) tds.eq(0).text(row.day || '');
        if (tds.eq(1).length) tds.eq(1).text(row.stop || '');
        if (tds.eq(2).length) tds.eq(2).text(row.altitude || '');
        tbody.append('\n' + $.html($tr));
      });
    }
  }

  if (Array.isArray(alt.higherPlaces) && alt.higherPlaces.length > 0) {
    const grid = sec.find('.higher-places-grid').first();
    if (grid.length && grid.find('.higher-place-card').length > 0) {
      const tmplHtml = $.html(grid.find('.higher-place-card').first());
      grid.empty();
      alt.higherPlaces.forEach((hp) => {
        const $c = cheerio.load(`<div class="_wrap">${tmplHtml}</div>`)('.higher-place-card').first();
        if (hp.tag !== undefined) $c.find('.higher-place-tag').text(hp.tag || '');
        if (hp.altitude !== undefined) $c.find('.higher-place-alt-badge').text(hp.altitude || '');
        $c.find('.higher-place-title').text(hp.title || '');
        $c.find('.higher-place-desc').text(hp.desc || '');
        if (hp.featureTag !== undefined) $c.find('.higher-place-feature-tag span').text(hp.featureTag || '');
        grid.append('\n' + $.html($c));
      });
    } else {
      const ul = sec.find('ul').first();
      if (ul.length) {
        ul.html(alt.higherPlaces.map((hp) => `<li>${escapeHtml(typeof hp === 'string' ? hp : `${hp.title}${hp.desc ? `: ${hp.desc}` : ''}`)}</li>`).join('\n'));
      }
    }
  }
}

function syncWeatherSection($, pkg) {
  const sec = $('#section-weather');
  const w = pkg.weatherProfileJson;
  if (!sec.length || !w || typeof w !== 'object') return;

  if (w.sectionTitle) sec.find('h2').first().text(w.sectionTitle);
  if (w.intro) sec.find('> div > p, > p').first().text(w.intro);

  if (Array.isArray(w.seasonCards) && w.seasonCards.length > 0) {
    const cards = sec.find('.alt-stat-card');
    if (cards.length > 0) {
      w.seasonCards.forEach((sc, idx) => {
        const c = cards.eq(idx);
        if (!c.length) return;
        if (sc.tag !== undefined) c.find('.alt-stat-tag').text(sc.tag || '');
        if (sc.season !== undefined) c.find('.alt-stat-value').text(sc.season || '');
        if (sc.rangeDesc !== undefined) c.find('.alt-stat-label').text(sc.rangeDesc || '');
      });
    }
  }

  if (Array.isArray(w.seasonalTable) && w.seasonalTable.length > 0) {
    const tbody = sec.find('table tbody').first();
    const firstRow = tbody.find('tr').first();
    if (tbody.length && firstRow.length) {
      const tmplHtml = $.html(firstRow);
      tbody.empty();
      w.seasonalTable.forEach((row) => {
        const $tr = cheerio.load(`<table><tbody>${tmplHtml}</tbody></table>`)('tr').first();
        const tds = $tr.find('td');
        if (tds.eq(0).length) tds.eq(0).text(row.season || '');
        if (tds.eq(1).length) tds.eq(1).text(row.months || '');
        if (tds.eq(2).length) tds.eq(2).text(row.expect || '');
        tbody.append('\n' + $.html($tr));
      });
    }
  }

  sec.find('h4').each((_i, h) => {
    const heading = $(h).text().trim();
    const card = $(h).closest('div[style*="border"], .higher-place-card');
    if (/how weather changes/i.test(heading) && w.routeChangeText) {
      if (w.routeChangeTitle) $(h).text(w.routeChangeTitle);
      card.find('p').first().text(w.routeChangeText);
    } else if (/which season/i.test(heading) && w.bestSeasonText) {
      if (w.bestSeasonTitle) $(h).text(w.bestSeasonTitle);
      card.find('p').first().text(w.bestSeasonText);
    }
  });
}

function syncMapAndCtas($, pkg, tagsMeta) {
  const secMap = $('#section-map');
  if (secMap.length) {
    if (tagsMeta && tagsMeta.routeMap) {
      if (tagsMeta.routeMap.title) secMap.find('h2').first().text(tagsMeta.routeMap.title);
      if (tagsMeta.routeMap.subtitle) secMap.find('> p').first().text(tagsMeta.routeMap.subtitle);
    }
    const mapSrc = pkg.routeMapMedia
      ? toRelativeMediaSrc(pkg.routeMapMedia.legacyLocalPath || pkg.routeMapMedia.secureUrl)
      : (tagsMeta && tagsMeta.routeMap && tagsMeta.routeMap.imageUrl ? toRelativeMediaSrc(tagsMeta.routeMap.imageUrl) : null);
    if (mapSrc) {
      secMap.find('img').each((_i, img) => $(img).attr('src', mapSrc));
      secMap.find('a[download], a.btn-sm').each((_i, a) => $(a).attr('href', mapSrc));
    }
  }

  const secBooking = $('#section-booking');
  if (secBooking.length && tagsMeta && tagsMeta.bookingBanner) {
    if (tagsMeta.bookingBanner.title) secBooking.find('h2').first().text(tagsMeta.bookingBanner.title);
    if (tagsMeta.bookingBanner.body) secBooking.find('p').first().text(tagsMeta.bookingBanner.body);
  }

  const ctaBanner = $('#section-faqs .faq-bottom-cta-banner, #section-faqs div[style*="linear-gradient"]').last();
  if (ctaBanner.length && tagsMeta && tagsMeta.bottomCta) {
    if (tagsMeta.bottomCta.badge) ctaBanner.find('span').first().text(tagsMeta.bottomCta.badge);
    if (tagsMeta.bottomCta.title) ctaBanner.find('h2, h3').first().text(tagsMeta.bottomCta.title);
    if (tagsMeta.bottomCta.body) ctaBanner.find('p').first().text(tagsMeta.bottomCta.body);
  }
}

function syncFaqsAndJsonLd($, pkg, fullDisplayTitle, metaDesc, priceNum, tagsMeta) {
  const secFaqs = $('#section-faqs');
  if (secFaqs.length && Array.isArray(pkg.faqs) && pkg.faqs.length > 0) {
    const panes = secFaqs.find('.faq-category-content');
    const btns = secFaqs.find('.faq-category-btn');

    if (panes.length > 0 && btns.length > 0) {
      const firstItem = panes.find('.faq-item').first();
      const itemTmplHtml = firstItem.length ? $.html(firstItem) : null;

      FAQ_ENUM_ORDER.forEach((enumKey, idx) => {
        const pane = panes.eq(idx);
        const btn = btns.eq(idx);
        const catFaqs = pkg.faqs.filter((f) => f.category === enumKey);
        if (btn.length) {
          btn.find('.faq-cat-badge').text(String(catFaqs.length));
        }
        if (pane.length && itemTmplHtml) {
          // Rule 15: never leave inline display:none
          pane.removeAttr('style');
          pane.empty();
          catFaqs.forEach((f) => {
            const $it = cheerio.load(`<div class="_wrap">${itemTmplHtml}</div>`)('.faq-item').first();
            const qBtn = $it.find('.faq-item-question, .faq-question').first();
            const qSpan = qBtn.find('span').first();
            if (qSpan.length) qSpan.text(f.question);
            else qBtn.text(f.question);
            const ans = $it.find('.faq-item-answer, .faq-answer').first();
            const rawAns = String(f.answerHtml || '').trim();
            ans.html(rawAns.startsWith('<') ? rawAns : `<p>${escapeHtml(rawAns)}</p>`);
            pane.append('\n' + $.html($it));
          });
        }
      });
    }
  }

  // Recommendations (.you-might-like-section)
  if (Array.isArray(pkg.recommendations) && pkg.recommendations.length > 0) {
    const grid = $('.you-might-like-section .yml-cards-grid').first();
    const cards = grid.find('.yml-card');
    if (grid.length && cards.length > 0) {
      const tmplHtml = $.html(cards.first());
      grid.empty();
      pkg.recommendations.slice(0, 4).forEach((rec) => {
        const target = rec.recommendedPackage;
        if (!target) return;
        const $card = cheerio.load(`<div class="_wrap">${tmplHtml}</div>`)('.yml-card').first();
        const tFolder = target.type === 'TOUR' ? 'tour' : 'trek';
        const dLabel = formatDayLabel(target.durationDays);
        $card.attr('href', `../../${tFolder}/${target.slug}/`);
        $card.find('.yml-badge-duration').text(dLabel);
        $card.find('.yml-card-title').text(`${target.title} — ${dLabel}`);
        if (target.heroSummary) $card.find('p').first().text(target.heroSummary.slice(0, 180));
        const g = target.galleries && target.galleries[0];
        if (g && g.media) {
          const src = toRelativeMediaSrc(g.media.legacyLocalPath || g.media.secureUrl);
          if (src) $card.find('img').attr('src', src).attr('alt', `${target.title} — ${dLabel}`);
        }
        grid.append('\n' + $.html($card));
      });
    }
  }

  // JSON-LD Structured Data sync
  $('script[type="application/ld+json"]').each((_i, el) => {
    try {
      const rawJson = $(el).html() || '';
      const parsed = JSON.parse(rawJson);
      const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
      let touched = false;
      for (const node of graph) {
        if (node['@type'] === 'TouristTrip') {
          node.name = fullDisplayTitle;
          if (pkg.heroSummary || metaDesc) node.description = pkg.heroSummary || metaDesc;
          if (node.offers && priceNum > 0) {
            node.offers.price = String(priceNum);
          }
          touched = true;
        }
        if (node['@type'] === 'FAQPage' && Array.isArray(pkg.faqs) && pkg.faqs.length > 0) {
          node.mainEntity = pkg.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: String(f.answerHtml || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
            }
          }));
          touched = true;
        }
      }
      if (touched) {
        $(el).text('\n' + JSON.stringify(parsed, null, 2) + '\n');
      }
    } catch (_err) {
      // ignore non-standard json-ld
    }
  });
}

function syncExistingPackageDom(rawHtml, pkg) {
  const $ = cheerio.load(rawHtml, { decodeEntities: false });
  const folder = pkg.type === 'TOUR' ? 'tour' : 'trek';
  const dayLabel = formatDayLabel(pkg.durationDays);
  const fullDisplayTitle = `${pkg.title} — ${dayLabel}`;
  const metaTitle = (pkg.seo && pkg.seo.metaTitle) || `${pkg.title} — ${dayLabel} — Igloo Himalaya Treks`;
  const metaDesc = (pkg.seo && pkg.seo.metaDescription) || pkg.heroSummary || '';
  const canonical = (pkg.seo && pkg.seo.canonicalUrl) || `${BASE_URL}/${folder}/${pkg.slug}`;
  const priceNum = Number(pkg.startingPriceUsd || 0);
  const priceText = `$${priceNum.toLocaleString()}`;
  const mainGal = Array.isArray(pkg.galleries) ? (pkg.galleries.find((g) => g.slot === 'HERO_MAIN') || pkg.galleries[0]) : null;
  const ogImage = mainGal && mainGal.media ? (mainGal.media.legacyLocalPath || mainGal.media.secureUrl) : null;
  const tagsMeta = pkg.tagsJson && typeof pkg.tagsJson === 'object' && !Array.isArray(pkg.tagsJson) ? pkg.tagsJson : null;

  syncHeroAndSeo($, pkg, fullDisplayTitle, metaTitle, metaDesc, canonical, ogImage);
  syncSidebar($, pkg, fullDisplayTitle, priceText);
  syncTripFacts($, pkg);
  syncOverviewSection($, pkg);
  syncItinerarySection($, pkg);
  syncIncludesExcludesSection($, pkg);
  syncDatesAndPricesSection($, pkg);
  syncPackingSection($, pkg);
  syncReadBeforeBookSection($, pkg);
  syncAltitudeSection($, pkg);
  syncWeatherSection($, pkg);
  syncMapAndCtas($, pkg, tagsMeta);
  syncFaqsAndJsonLd($, pkg, fullDisplayTitle, metaDesc, priceNum, tagsMeta);

  return $.html();
}

async function publishBlogPostToStatic(blogId) {
  const post = await prisma.blogPost.findUnique({
    where: { id: blogId },
    include: { category: true, author: true, heroMedia: true, seo: true }
  });
  if (!post) throw new AppError(404, 'BLOG_NOT_FOUND', 'Blog post not found.');

  const allPublished = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, h1: true, breadcrumbTitle: true }
  });
  const idx = allPublished.findIndex((p) => p.slug === post.slug);
  const prevPost = allPublished.length > 1 ? allPublished[(idx - 1 + allPublished.length) % allPublished.length] : null;
  const nextPost = allPublished.length > 1 ? allPublished[(idx + 1) % allPublished.length] : null;

  const heroSrc = post.heroMedia ? (post.heroMedia.legacyLocalPath || post.heroMedia.secureUrl) : 'images/hero-himalayas.webp';
  const articleObj = {
    slug: post.slug,
    title: (post.seo && post.seo.metaTitle) || post.title,
    h1: post.h1,
    breadcrumbTitle: post.breadcrumbTitle || post.h1,
    category: post.category ? post.category.name : 'Trekking Guides',
    desc: (post.seo && post.seo.metaDescription) || post.excerpt || '',
    lead: post.lead || post.excerpt || '',
    readingTime: `${post.readingMinutes} min read`,
    publishedDateText: (post.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedDateAttr: (post.publishedAt || new Date()).toISOString().split('T')[0],
    updatedDateText: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    updatedDateAttr: new Date().toISOString().split('T')[0],
    heroImg: heroSrc,
    heroAlt: (post.heroMedia && post.heroMedia.altText) || post.h1,
    heroCaption: post.heroCaption || '',
    sections: Array.isArray(post.sectionsJson) ? post.sectionsJson : [],
    faq: Array.isArray(post.faqJson) ? post.faqJson : []
  };

  const html = renderBlogArticle(articleObj, '../../', prevPost, nextPost);
  const validation = validateBlogHtml(html);
  if (!validation.valid) {
    throw new AppError(422, 'PUBLISH_VALIDATION_FAILED', 'Blog HTML failed template quality validation.', validation.errors);
  }

  const targetDir = path.join(ROOT_DIR, 'blog', post.slug);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');

  return {
    slug: post.slug,
    route: `/blog/${post.slug}/`,
    filePath: targetFile,
    validation
  };
}

async function publishPackageToStatic(packageId) {
  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
    include: {
      seo: true,
      destination: true,
      routeMapMedia: true,
      itineraryDays: { orderBy: { dayNumber: 'asc' } },
      faqs: { orderBy: { sortOrder: 'asc' } },
      galleries: { orderBy: { sortOrder: 'asc' }, include: { media: true } },
      recommendations: {
        orderBy: { sortOrder: 'asc' },
        include: {
          recommendedPackage: {
            select: {
              slug: true,
              type: true,
              title: true,
              durationDays: true,
              heroSummary: true,
              galleries: { orderBy: { sortOrder: 'asc' }, include: { media: true }, take: 1 }
            }
          }
        }
      }
    }
  });
  if (!pkg) throw new AppError(404, 'PACKAGE_NOT_FOUND', 'Package not found.');

  const siteSetting = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const folder = pkg.type === 'TOUR' ? 'tour' : 'trek';
  const targetDir = path.join(ROOT_DIR, folder, pkg.slug);
  const targetFile = path.join(targetDir, 'index.html');

  let html;
  if (fs.existsSync(targetFile)) {
    const existingRaw = fs.readFileSync(targetFile, 'utf8');
    // Upgrade legacy minimal CMS-rendered stubs automatically, while preserving hand-crafted pages via DOM sync
    const isMinimalStub = existingRaw.includes('<footer class="site-footer">') || !existingRaw.includes('class="faq-layout-container"');
    html = isMinimalStub
      ? renderCanonicalPackageHtml(pkg, siteSetting)
      : syncExistingPackageDom(existingRaw, pkg);
  } else {
    html = renderCanonicalPackageHtml(pkg, siteSetting);
  }

  const validation = validateTrekHtml(html);
  if (!validation.valid) {
    throw new AppError(422, 'PUBLISH_VALIDATION_FAILED', 'Package HTML failed template quality validation.', validation.errors);
  }

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetFile, html, 'utf8');

  return {
    slug: pkg.slug,
    route: `/${folder}/${pkg.slug}/`,
    filePath: targetFile,
    validation
  };
}

async function publishDestinationToStatic(destinationId) {
  const dest = await prisma.destination.findUnique({
    where: { id: destinationId },
    include: { seo: true }
  });
  if (!dest) return null;

  const targetFile = path.join(ROOT_DIR, dest.slug, 'index.html');
  if (!fs.existsSync(targetFile)) return null;

  const $ = cheerio.load(fs.readFileSync(targetFile, 'utf8'), { decodeEntities: false });
  const metaTitle = (dest.seo && dest.seo.metaTitle) || dest.name;
  const metaDesc = (dest.seo && dest.seo.metaDescription) || dest.summary || '';
  const canonical = (dest.seo && dest.seo.canonicalUrl) || `${BASE_URL}/${dest.slug}`;

  $('title').first().text(metaTitle);
  $('meta[name="description"]').first().attr('content', metaDesc);
  $('link[rel="canonical"]').first().attr('href', canonical);
  if (dest.name) $('h1').first().text(dest.name);

  fs.writeFileSync(targetFile, $.html(), 'utf8');
  return { slug: dest.slug, route: `/${dest.slug}/` };
}

async function publishPageToStatic(slug) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { seo: true }
  });
  if (!page) return null;

  const candidates = [
    slug === 'home' ? path.join(ROOT_DIR, 'index.html') : path.join(ROOT_DIR, slug, 'index.html'),
    path.join(ROOT_DIR, `${slug}.html`)
  ];
  const targetFile = candidates.find((p) => fs.existsSync(p));
  if (!targetFile) return null;

  const $ = cheerio.load(fs.readFileSync(targetFile, 'utf8'), { decodeEntities: false });
  if (page.seo && page.seo.metaTitle) $('title').first().text(page.seo.metaTitle);
  if (page.seo && page.seo.metaDescription) $('meta[name="description"]').first().attr('content', page.seo.metaDescription);
  if (page.seo && page.seo.canonicalUrl) $('link[rel="canonical"]').first().attr('href', page.seo.canonicalUrl);
  if (page.title && slug !== 'home') {
    $('h1').first().text(page.title);
  }

  fs.writeFileSync(targetFile, $.html(), 'utf8');
  return { slug: page.slug, route: slug === 'home' ? '/' : `/${slug}/` };
}

async function rebuildSitemapXml() {
  const [packages, destinations, blogs, pages] = await Promise.all([
    prisma.package.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, type: true, updatedAt: true } }),
    prisma.destination.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    prisma.page.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } })
  ]);

  const entries = new Map();
  const addEntry = (loc, lastmod, changefreq, priority) => {
    if (!entries.has(loc)) {
      entries.set(loc, { loc, lastmod: lastmod.toISOString().split('T')[0], changefreq, priority });
    }
  };

  addEntry(`${BASE_URL}/`, new Date(), 'daily', '1.0');
  for (const p of packages) {
    const prefix = p.type === 'TOUR' ? 'tour' : 'trek';
    addEntry(`${BASE_URL}/${prefix}/${p.slug}/`, p.updatedAt, 'weekly', '0.9');
  }
  for (const d of destinations) {
    addEntry(`${BASE_URL}/${d.slug}/`, d.updatedAt, 'weekly', '0.9');
  }
  for (const b of blogs) {
    addEntry(`${BASE_URL}/blog/${b.slug}/`, b.updatedAt, 'weekly', '0.8');
  }
  for (const pg of pages) {
    if (pg.slug === 'home') continue;
    addEntry(`${BASE_URL}/${pg.slug}/`, pg.updatedAt, 'monthly', '0.7');
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from(entries.values()).map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ),
    '</urlset>',
    ''
  ].join('\n');

  const outPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  return { count: entries.size, filePath: outPath };
}

async function syncRedirectsFile() {
  const rules = await prisma.redirectRule.findMany({
    where: { isActive: true },
    orderBy: { id: 'asc' }
  });

  const lines = [
    '# Igloo Himalaya Treks - 301 Permanent Redirects',
    '# Managed by CMS SEO Redirect Manager',
    ...rules.map((r) => `${r.fromPath} ${r.toPath} ${r.statusCode}!`),
    ''
  ];

  const outPath = path.join(ROOT_DIR, '_redirects');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  return { count: rules.length, filePath: outPath };
}

module.exports = {
  syncExistingPackageDom,
  publishBlogPostToStatic,
  publishPackageToStatic,
  publishDestinationToStatic,
  publishPageToStatic,
  rebuildSitemapXml,
  syncRedirectsFile
};
