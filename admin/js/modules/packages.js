import { apiRequest, parseJsonResponse, showToast } from '../api.js';
import { mountRichEditor, getRichEditorHtml } from '../components/richEditor.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function previewUrl(raw) {
  if (!raw) return '';
  const s = String(raw).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;
  return `/${s.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')}`;
}

function normalizeArray(val) {
  return Array.isArray(val) ? val : [];
}

function normalizePricing(pkg) {
  const gp = pkg && pkg.groupPricingJson;
  if (gp && !Array.isArray(gp) && typeof gp === 'object') {
    return {
      intro: gp.intro || '',
      tiers: normalizeArray(gp.tiers),
      tableRows: normalizeArray(gp.tableRows),
      sidebarTiers: normalizeArray(gp.sidebarTiers),
      sidebarBullets: normalizeArray(gp.sidebarBullets)
    };
  }
  return {
    intro: '',
    tiers: Array.isArray(gp) ? gp : [],
    tableRows: [],
    sidebarTiers: [],
    sidebarBullets: []
  };
}

function normalizePacking(pkg) {
  const pl = pkg && pkg.packingListJson;
  if (pl && !Array.isArray(pl) && typeof pl === 'object') {
    return {
      intro: pl.intro || '',
      bannerTitle: pl.bannerTitle || '',
      bannerDesc: pl.bannerDesc || '',
      concludingNote: pl.concludingNote || '',
      categories: normalizeArray(pl.categories).map((c) => ({
        title: c.title || '',
        items: normalizeArray(c.items)
      }))
    };
  }
  return {
    intro: '',
    bannerTitle: '',
    bannerDesc: '',
    concludingNote: '',
    categories: Array.isArray(pl) ? [{ title: 'Packing List', items: pl }] : []
  };
}

function normalizeReadBeforeBook(pkg) {
  const rb = pkg && pkg.readBeforeBookJson;
  if (rb && !Array.isArray(rb) && typeof rb === 'object') {
    return {
      title: rb.title || '',
      subtitle: rb.subtitle || '',
      secondarySubtitle: rb.secondarySubtitle || '',
      items: normalizeArray(rb.items)
    };
  }
  return {
    title: '',
    subtitle: '',
    secondarySubtitle: '',
    items: Array.isArray(rb) ? rb : []
  };
}

function normalizeTagsMeta(pkg) {
  const t = pkg && pkg.tagsJson;
  if (t && !Array.isArray(t) && typeof t === 'object') {
    return {
      sidebarBadge: t.sidebarBadge || '',
      itineraryIntro: t.itineraryIntro || '',
      expertCta: t.expertCta || { title: '', subtitle: '', status: '' },
      whyBookTitle: t.whyBookTitle || '',
      whyBookIntro: t.whyBookIntro || '',
      whyBookCards: normalizeArray(t.whyBookCards),
      bookingBanner: t.bookingBanner || { title: '', body: '' },
      bottomCta: t.bottomCta || { badge: '', title: '', body: '' },
      routeMap: t.routeMap || { title: '', subtitle: '', imageUrl: '' },
      faqCategories: normalizeArray(t.faqCategories)
    };
  }
  return {
    sidebarBadge: '',
    itineraryIntro: '',
    expertCta: { title: '', subtitle: '', status: '' },
    whyBookTitle: '',
    whyBookIntro: '',
    whyBookCards: [],
    bookingBanner: { title: '', body: '' },
    bottomCta: { badge: '', title: '', body: '' },
    routeMap: { title: '', subtitle: '', imageUrl: '' },
    faqCategories: []
  };
}

export async function renderPackagesModule(container, { hasPerm }) {
  const state = {
    type: '',
    status: '',
    q: '',
    page: 1,
    options: { destinations: [], categories: [], packages: [] }
  };
  const canWrite = hasPerm('packages:write');
  const canPublish = hasPerm('packages:publish');
  const canDelete = hasPerm('packages:delete');

  try {
    state.options = await apiRequest('/admin/packages/options');
  } catch (_err) {
    // fallback empty
  }

  async function loadPackages() {
    const params = new URLSearchParams({ page: String(state.page), limit: '25' });
    if (state.type) params.set('type', state.type);
    if (state.status) params.set('status', state.status);
    if (state.q) params.set('q', state.q);

    const res = await fetch(`/api/v1/admin/packages?${params.toString()}`, { credentials: 'same-origin' });
    const json = await parseJsonResponse(res, 'Failed to load packages.');
    if (!res.ok || !json.success) throw new Error((json.error && json.error.message) || 'Failed to load packages.');
    return json;
  }

  function adminFactIconSvg(category) {
    const c = String(category || '').toLowerCase();
    if (c.includes('alt') || c.includes('elev')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>';
    }
    if (c.includes('diff') || c.includes('grade') || c.includes('fit')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
    }
    if (c.includes('accomm') || c.includes('stay') || c.includes('lodge') || c.includes('hotel')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
    }
    if (c.includes('meal') || c.includes('food')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>';
    }
    if (c.includes('season') || c.includes('time') || c.includes('month')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    }
    if (c.includes('group') || c.includes('guide') || c.includes('team') || c.includes('porter')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
    }
    if (c.includes('permit') || c.includes('pass') || c.includes('visa') || c.includes('doc')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
    }
    if (c.includes('transport') || c.includes('flight') || c.includes('drive')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>';
    }
    if (c.includes('start') || c.includes('end') || c.includes('region') || c.includes('route') || c.includes('dest')) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
    }
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  }

  function renderFactRowHtml(f = {}, idx = 0) {
    return `
      <div class="admin-fact-card" data-fact-row>
        <div class="admin-fact-icon-badge" data-fact-icon>${adminFactIconSvg(f.category)}</div>
        <div class="admin-fact-fields">
          <div class="admin-fact-top">
            <input type="text" data-k="category" value="${escapeHtml(f.category || '')}" placeholder="CATEGORY TAG">
            <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Fact">&times;</button>
          </div>
          <input type="text" data-k="value" value="${escapeHtml(f.value || '')}" placeholder="Headline value (e.g. 9 Days)">
          <div class="admin-fact-bottom">
            <input type="text" data-k="subtitle" value="${escapeHtml(f.subtitle || '')}" placeholder="Subtitle note">
            <input type="number" data-k="altitudeM" min="0" value="${escapeHtml(f.altitudeM ?? '')}" placeholder="Alt (m)" title="Optional data-altitude-m for visualizer">
          </div>
        </div>
      </div>`;
  }

  function renderHighlightRowHtml(text = '') {
    return `
      <div class="admin-highlight-item" data-highlight-row>
        <span class="admin-highlight-check" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <input type="text" data-k="text" value="${escapeHtml(text)}" placeholder="Enter highlight bullet statement...">
        <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Highlight">&times;</button>
      </div>`;
  }

  const WHY_BOOK_ICONS = [
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  ];

  function renderWhyCardRowHtml(item = {}, idx = 0) {
    const iconSvg = WHY_BOOK_ICONS[idx % WHY_BOOK_ICONS.length];
    return `
      <div class="admin-why-card" data-why-row>
        <div class="admin-why-icon-badge" aria-hidden="true">${iconSvg}</div>
        <div class="admin-why-fields">
          <div class="admin-why-head">
            <input type="text" data-k="a" value="${escapeHtml(item.title || '')}" placeholder="Card Title (e.g. Trip Briefing &amp; Gear Check)">
            <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Card">&times;</button>
          </div>
          <textarea data-k="b" rows="2" placeholder="Explain how your team delivers this benefit...">${escapeHtml(item.desc || '')}</textarea>
        </div>
      </div>`;
  }

  function renderSimplePairHtml(attrName, item = {}, idx = 0, labelA = 'Title', labelB = 'Description') {
    const valA = typeof item === 'string' ? item : (item.title || item.label || item.category || '');
    const valB = typeof item === 'string' ? '' : (item.text || item.desc || item.price || item.status || '');
    return `
      <div class="pkg-repeater-card" ${attrName}>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">#${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="pkg-inline-grid-2">
          <div class="form-field"><label>${escapeHtml(labelA)}</label><input type="text" data-k="a" value="${escapeHtml(valA)}"></div>
          <div class="form-field"><label>${escapeHtml(labelB)}</label><input type="text" data-k="b" value="${escapeHtml(valB)}"></div>
        </div>
      </div>`;
  }

  function renderIncExcCardHtml(kind, item = {}) {
    const isInc = kind === 'inc';
    const valA = typeof item === 'string' ? item : (item.title || '');
    const valB = typeof item === 'string' ? '' : (item.text || item.desc || '');
    const attrName = isInc ? 'data-inc-row' : 'data-exc-row';
    const iconSvg = isInc
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F6851F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 10 11 15 8 12"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    return `
      <div class="admin-inc-exc-card ${isInc ? 'include' : 'exclude'}" ${attrName}>
        <div class="admin-inc-exc-icon" aria-hidden="true">${iconSvg}</div>
        <div class="admin-inc-exc-body">
          <div class="admin-inc-exc-head">
            <input type="text" data-k="a" value="${escapeHtml(valA)}" placeholder="${isInc ? 'Inclusion Title (e.g. Airport Transfers)' : 'Exclusion Title (e.g. International Flights)'}">
            <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Item">&times;</button>
          </div>
          <textarea data-k="b" rows="2" placeholder="${isInc ? 'Explain what this includes on the route...' : 'Explain what travellers arrange separately...'}">${escapeHtml(valB)}</textarea>
        </div>
      </div>`;
  }

  function formatDaySubPreview(d) {
    const cleanTitle = String(d.title || '').replace(/^Day\s+\d+\s*[:–—-]*\s*/i, '').trim();
    const parts = [d.subtitle, d.altitudeM !== '' && d.altitudeM !== null && d.altitudeM !== undefined ? `${Number(d.altitudeM).toLocaleString()} m` : '', d.durationHours].filter(Boolean);
    return {
      cleanTitle: cleanTitle || 'Untitled Day Stage',
      subLine: parts.join(' — ') || 'Full trail schedule'
    };
  }

  function renderDayRowHtml(d = {}, idx = 0, isOpen = idx === 0) {
    const dayNum = d.dayNumber || idx + 1;
    const prev = formatDaySubPreview(d);
    return `
      <div class="admin-itin-card ${isOpen ? 'is-open' : ''}" data-day-row>
        <div class="admin-itin-header" role="button" tabindex="0" aria-expanded="${isOpen ? 'true' : 'false'}">
          <div class="admin-itin-header-left">
            <h5 class="admin-itin-day-title">
              <span class="admin-itin-day-label">Day ${escapeHtml(dayNum)}:</span>
              <span class="admin-itin-title-text">${escapeHtml(prev.cleanTitle)}</span>
            </h5>
            <p class="admin-itin-subtitle-preview">${escapeHtml(prev.subLine)}</p>
          </div>
          <div class="admin-itin-header-right">
            <button type="button" class="admin-itin-mini-btn admin-itin-up" title="Move Day Up">&uarr;</button>
            <button type="button" class="admin-itin-mini-btn admin-itin-down" title="Move Day Down">&darr;</button>
            <button type="button" class="admin-itin-mini-btn admin-itin-dup" title="Duplicate Day">Duplicate</button>
            <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Day">Remove</button>
            <span class="admin-itin-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>
        </div>
        <div class="admin-itin-body">
          <div class="form-row-3">
            <div class="form-field"><label>Day #</label><input type="number" data-k="dayNumber" min="1" value="${escapeHtml(dayNum)}"></div>
            <div class="form-field"><label>Day Title *</label><input type="text" data-k="title" value="${escapeHtml(d.title || '')}" placeholder="e.g. Kathmandu to Somdang" required></div>
            <div class="form-field"><label>Max Altitude (m)</label><input type="number" data-k="altitudeM" min="0" value="${escapeHtml(d.altitudeM ?? '')}" placeholder="3270"></div>
          </div>
          <div class="form-field" style="margin-top:8px;">
            <label>Card Header Subtitle <small style="color:#64748B; font-weight:500;">(renders above badges alongside Altitude &amp; Travel Time)</small></label>
            <input type="text" data-k="subtitle" value="${escapeHtml(d.subtitle || '')}" placeholder="e.g. Scenic mountain drive into Ruby Valley">
          </div>

          <!-- 6 Color-Coded Meta Badges Mirroring Frontend .itinerary-meta-box -->
          <div class="admin-itin-meta-box">
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #FAF5FF; color: #7C3AED;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="form-field"><label>Route</label><input type="text" data-k="routeSummary" value="${escapeHtml(d.routeSummary || '')}" placeholder="Kathmandu -> Syabrubesi"></div>
            </div>
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #EFF6FF; color: #1D4ED8;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div class="form-field"><label>Main Activity</label><input type="text" data-k="activityType" value="${escapeHtml(d.activityType || '')}" placeholder="Mountain Jeep Drive / Trek"></div>
            </div>
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #EEF2FF; color: #4F46E5;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="form-field"><label>Travel Time</label><input type="text" data-k="durationHours" value="${escapeHtml(d.durationHours || '')}" placeholder="6–7 hrs"></div>
            </div>
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #FFFBEB; color: #D97706;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
              </div>
              <div class="form-field"><label>Distance</label><input type="text" data-k="distanceKm" value="${escapeHtml(d.distanceKm || '')}" placeholder="12 km"></div>
            </div>
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #ECFDF5; color: #059669;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div class="form-field"><label>Stay</label><input type="text" data-k="accommodation" value="${escapeHtml(d.accommodation || '')}" placeholder="Mountain Teahouse / Lodge"></div>
            </div>
            <div class="admin-itin-meta-field">
              <div class="admin-itin-meta-badge" style="background: #FFF1F2; color: #E11D48;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>
              </div>
              <div class="form-field"><label>Meals</label><input type="text" data-k="meals" value="${escapeHtml(d.meals || '')}" placeholder="Breakfast, Lunch, Dinner"></div>
            </div>
          </div>

          <div class="form-field" style="margin-top:12px;">
            <label>Day Narrative Description</label>
            <div class="pkg-rte-host" data-k="descriptionHtml" data-rte-compact="1" data-initial-html="${escapeHtml(d.descriptionHtml || '')}"></div>
          </div>
        </div>
      </div>`;
  }

  function renderTierRowHtml(t = {}, idx = 0) {
    const isBest = Boolean(t.highlight || /best/i.test(t.note || '') || idx === 2);
    return `
      <div class="admin-tier-card ${isBest ? 'best-value' : ''}" data-tier-row>
        <button type="button" class="admin-itin-mini-btn danger pkg-remove-row admin-tier-remove" title="Remove Tier">&times;</button>
        <input type="text" data-k="label" value="${escapeHtml(t.label || '')}" placeholder="Group Size (e.g. 2–4 People)">
        <input type="text" data-k="price" value="${escapeHtml(t.price || '')}" placeholder="USD 1,405">
        <input type="text" data-k="note" value="${escapeHtml(t.note || '')}" placeholder="Best Value / Small Group">
      </div>`;
  }

  function renderDepartureRowHtml(dep = {}, idx = 0) {
    const mon = String(dep.month || 'SEP').toUpperCase().slice(0, 3);
    const dayStr = String(dep.day || '05').padStart(2, '0');
    return `
      <div class="admin-dep-row" data-dep-row data-month="${escapeHtml(mon)}">
        <div class="admin-dep-badge">
          <div class="admin-dep-badge-top" data-dep-badge-mon>${escapeHtml(mon)}</div>
          <div class="admin-dep-badge-day" data-dep-badge-day>${escapeHtml(dayStr)}</div>
        </div>
        <div class="admin-dep-fields">
          <div class="form-field"><label>Month</label><input type="text" data-k="month" value="${escapeHtml(mon)}" placeholder="OCT" maxlength="3"></div>
          <div class="form-field"><label>Day</label><input type="text" data-k="day" value="${escapeHtml(dayStr)}" placeholder="12" maxlength="2"></div>
          <div class="form-field"><label>Date Range Title</label><input type="text" data-k="title" value="${escapeHtml(dep.title || '')}" placeholder="Oct 12 – Oct 21, 2026"></div>
          <div class="form-field"><label>Status</label><input type="text" data-k="status" value="${escapeHtml(dep.status || 'AVAILABLE')}"></div>
          <div class="form-field"><label>Price pp</label><input type="text" data-k="price" value="${escapeHtml(dep.price || '')}" placeholder="$890 pp"></div>
        </div>
        <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Departure">&times;</button>
      </div>`;
  }

  function renderPackingItemHtml(item = {}) {
    return `
      <div data-pack-item style="display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 96px auto; gap:6px; align-items:center; margin-top:6px;">
        <input type="text" data-k="label" value="${escapeHtml(item.label || '')}" placeholder="Gear name" style="padding:6px 8px; border:1px solid #CBD5E1; border-radius:6px; font-size:0.84rem;">
        <input type="text" data-k="desc" value="${escapeHtml(item.desc || '')}" placeholder="Description / usage" style="padding:6px 8px; border:1px solid #CBD5E1; border-radius:6px; font-size:0.82rem;">
        <input type="text" data-k="qty" value="${escapeHtml(item.qty || '')}" placeholder="Qty" style="padding:6px 8px; border:1px solid #CBD5E1; border-radius:6px; font-size:0.82rem;">
        <button type="button" class="admin-itin-mini-btn danger pkg-remove-pack-item">&times;</button>
      </div>`;
  }

  const PACK_CAT_THEMES = [
    { icon: '🥾', bg: '#FFF7ED', color: '#EA580C' },
    { icon: '🧥', bg: '#EFF6FF', color: '#1D4ED8' },
    { icon: '⛺', bg: '#F5F3FF', color: '#7C3AED' },
    { icon: '🧼', bg: '#ECFDF5', color: '#059669' },
    { icon: '🔌', bg: '#FEF3C7', color: '#D97706' },
    { icon: '📄', bg: '#FFF1F2', color: '#E11D48' }
  ];

  function renderPackingCategoryHtml(cat = {}, idx = 0) {
    const items = normalizeArray(cat.items);
    const theme = PACK_CAT_THEMES[idx % PACK_CAT_THEMES.length];
    return `
      <div class="admin-pack-cat-card" data-pack-cat>
        <div class="admin-pack-cat-head">
          <span class="admin-pack-cat-badge" style="background:${theme.bg}; color:${theme.color};">${theme.icon}</span>
          <input type="text" data-k="title" value="${escapeHtml(cat.title || '')}" placeholder="Category Title (e.g. Hiking Gear)">
          <button type="button" class="admin-itin-mini-btn pkg-add-pack-item">+ Item</button>
          <button type="button" class="admin-itin-mini-btn danger pkg-remove-row" title="Remove Category">&times;</button>
        </div>
        <div data-pack-items-wrap>
          ${items.map((it) => renderPackingItemHtml(it)).join('')}
        </div>
      </div>`;
  }

  function renderDetailTopicHtml(t = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-detail-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Topic #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-2">
          <div class="form-field"><label>Topic Key ID</label><input type="text" data-k="id" value="${escapeHtml(t.id || `topic-${idx + 1}`)}"></div>
          <div class="form-field"><label>Heading Title</label><input type="text" data-k="title" value="${escapeHtml(t.title || '')}"></div>
        </div>
        <div class="form-field" style="margin-top:8px;"><label>Topic Briefing Content</label><div class="pkg-rte-host" data-k="contentHtml" data-rte-compact="1" data-initial-html="${escapeHtml(t.contentHtml || '')}"></div></div>
      </div>`;
  }

  function renderAltTableRowHtml(r = {}) {
    return `
      <div data-alt-row style="display:grid; grid-template-columns:120px minmax(0,1fr) 160px auto; gap:8px; align-items:center; margin-top:6px;">
        <input type="text" data-k="day" value="${escapeHtml(r.day || '')}" placeholder="Day / Zone" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="stop" value="${escapeHtml(r.stop || '')}" placeholder="Location / Stop" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="altitude" value="${escapeHtml(r.altitude || '')}" placeholder="4,410 m" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <button type="button" class="btn btn-outline btn-sm pkg-remove-alt-row">&times;</button>
      </div>`;
  }

  function renderHigherPlaceRowHtml(hp = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-hp-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Highlight Point #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Badge Tag</label><input type="text" data-k="tag" value="${escapeHtml(hp.tag || '')}"></div>
          <div class="form-field"><label>Title</label><input type="text" data-k="title" value="${escapeHtml(hp.title || '')}"></div>
          <div class="form-field"><label>Elevation Text</label><input type="text" data-k="altitude" value="${escapeHtml(hp.altitude || '')}"></div>
        </div>
        <div class="form-row-2" style="margin-top:8px;">
          <div class="form-field"><label>Description</label><input type="text" data-k="desc" value="${escapeHtml(hp.desc || '')}"></div>
          <div class="form-field"><label>Footer Highlight Tag</label><input type="text" data-k="featureTag" value="${escapeHtml(hp.featureTag || '')}"></div>
        </div>
      </div>`;
  }

  function renderSeasonCardHtml(sc = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-season-card>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Season Card #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Ribbon Tag</label><input type="text" data-k="tag" value="${escapeHtml(sc.tag || '')}" placeholder="Peak Season"></div>
          <div class="form-field"><label>Season Title</label><input type="text" data-k="season" value="${escapeHtml(sc.season || '')}" placeholder="Autumn (Sep–Nov)"></div>
          <div class="form-field"><label>Summary Label</label><input type="text" data-k="rangeDesc" value="${escapeHtml(sc.rangeDesc || '')}"></div>
        </div>
      </div>`;
  }

  function renderSeasonalTableRowHtml(r = {}) {
    return `
      <div data-wtable-row style="display:grid; grid-template-columns:130px 160px minmax(0,1fr) auto; gap:8px; align-items:center; margin-top:6px;">
        <input type="text" data-k="season" value="${escapeHtml(r.season || '')}" placeholder="Spring" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="months" value="${escapeHtml(r.months || '')}" placeholder="March–May" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="expect" value="${escapeHtml(r.expect || '')}" placeholder="What to expect..." style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <button type="button" class="btn btn-outline btn-sm pkg-remove-wtable-row">&times;</button>
      </div>`;
  }

  function renderFaqRowHtml(f = {}, idx = 0, catLabels = []) {
    const labelFor = (enumKey, fallback) => {
      const found = catLabels.find((c) => c.enumKey === enumKey);
      return found && found.label ? `${enumKey} (${found.label})` : fallback;
    };
    return `
      <div class="pkg-repeater-card" data-faq-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">FAQ #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-2">
          <div class="form-field">
            <label>Category</label>
            <select data-k="category">
              <option value="GENERAL" ${(!f.category || f.category === 'GENERAL') ? 'selected' : ''}>${escapeHtml(labelFor('GENERAL', 'GENERAL'))}</option>
              <option value="GEAR" ${f.category === 'GEAR' ? 'selected' : ''}>${escapeHtml(labelFor('GEAR', 'GEAR'))}</option>
              <option value="HEALTH" ${f.category === 'HEALTH' ? 'selected' : ''}>${escapeHtml(labelFor('HEALTH', 'HEALTH'))}</option>
              <option value="BOOKING" ${f.category === 'BOOKING' ? 'selected' : ''}>${escapeHtml(labelFor('BOOKING', 'BOOKING'))}</option>
            </select>
          </div>
          <div class="form-field"><label>Question *</label><input type="text" data-k="question" value="${escapeHtml(f.question || '')}" required></div>
        </div>
        <div class="form-field" style="margin-top:8px;"><label>Answer *</label><div class="pkg-rte-host" data-k="answerHtml" data-rte-compact="1" data-initial-html="${escapeHtml(f.answerHtml || '')}"></div></div>
      </div>`;
  }

  function attachMediaPicker(targetInputId, targetPreviewId = null) {
    const pickerHost = document.getElementById('pkg-media-picker-box');
    if (!pickerHost) return;
    pickerHost.classList.remove('hidden');
    pickerHost.innerHTML = `
      <div class="pkg-section-box" style="margin-top:10px; border-color:#1A96C8; background:#EFF6FF;">
        <div class="pkg-section-head">
          <h4>Pick Image from Media Library</h4>
          <div style="display:flex; gap:8px;">
            <input id="pkg-mp-search" type="search" placeholder="Search filename or alt..." style="padding:5px 9px; border:1px solid #CBD5E1; border-radius:6px;">
            <button type="button" id="pkg-mp-close" class="btn btn-outline btn-sm">Close</button>
          </div>
        </div>
        <div id="pkg-mp-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(120px, 1fr)); gap:8px; max-height:220px; overflow-y:auto;">Loading images...</div>
      </div>`;

    document.getElementById('pkg-mp-close').addEventListener('click', () => {
      pickerHost.classList.add('hidden');
      pickerHost.innerHTML = '';
    });

    async function loadGrid(query = '') {
      const grid = document.getElementById('pkg-mp-grid');
      if (!grid) return;
      try {
        const res = await apiRequest(`/admin/media?resourceType=IMAGE&limit=24${query ? `&q=${encodeURIComponent(query)}` : ''}`);
        const assets = res.assets || [];
        if (!assets.length) {
          grid.innerHTML = '<p class="metric-sub">No matching images found.</p>';
          return;
        }
        grid.innerHTML = assets.map((a) => {
          const url = a.legacyLocalPath || a.secureUrl || '';
          return `
            <button type="button" class="pkg-mp-item" data-url="${escapeHtml(url)}" data-alt="${escapeHtml(a.altText || a.title || '')}" style="text-align:left; background:#fff; border:1px solid #CBD5E1; border-radius:8px; padding:4px; cursor:pointer;">
              <img src="${escapeHtml(previewUrl(url))}" alt="" style="width:100%; height:64px; object-fit:cover; border-radius:4px;">
              <div style="font-size:0.72rem; color:#334155; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:3px;">${escapeHtml(a.title || url.split('/').pop())}</div>
            </button>`;
        }).join('');
        grid.querySelectorAll('.pkg-mp-item').forEach((btn) => {
          btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            const input = document.getElementById(targetInputId);
            if (input) input.value = url;
            if (targetPreviewId) {
              const img = document.getElementById(targetPreviewId);
              if (img) img.src = previewUrl(url);
            }
            pickerHost.classList.add('hidden');
            pickerHost.innerHTML = '';
          });
        });
      } catch (err) {
        grid.innerHTML = `<span class="metric-sub">${escapeHtml(err.message)}</span>`;
      }
    }

    const search = document.getElementById('pkg-mp-search');
    search.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadGrid(search.value.trim());
      }
    });
    loadGrid('');
  }

  async function openPackageModal(pkgId = null) {
    const modal = document.getElementById('phase2-modal');
    const modalPanel = modal.querySelector('.modal-panel');
    const titleEl = document.getElementById('phase2-modal-title');
    const bodyEl = document.getElementById('phase2-modal-body');

    let pkg = null;
    if (pkgId) {
      const res = await apiRequest(`/admin/packages/${pkgId}`);
      pkg = res.package;
    }

    if (modalPanel) modalPanel.classList.add('modal-panel-xl');

    const pricing = normalizePricing(pkg);
    const packing = normalizePacking(pkg);
    const readBefore = normalizeReadBeforeBook(pkg);
    const tagsMeta = normalizeTagsMeta(pkg);
    const altObj = (pkg && pkg.altitudeProfileJson && typeof pkg.altitudeProfileJson === 'object') ? pkg.altitudeProfileJson : {};
    const weatherObj = (pkg && pkg.weatherProfileJson && typeof pkg.weatherProfileJson === 'object') ? pkg.weatherProfileJson : {};
    const tripFacts = normalizeArray(pkg && pkg.tripFactsJson);
    const highlights = normalizeArray(pkg && pkg.highlightsJson);
    const inclusions = normalizeArray(pkg && pkg.inclusionsJson);
    const exclusions = normalizeArray(pkg && pkg.exclusionsJson);
    const departures = normalizeArray(pkg && pkg.departureDatesJson);
    const itineraryDays = normalizeArray(pkg && pkg.itineraryDays);
    const faqs = normalizeArray(pkg && pkg.faqs);
    const recommendedIds = new Set(normalizeArray(pkg && pkg.recommendations).map((r) => r.recommendedPackageId));

    const heroSlots = [
      { slot: 'HERO_MAIN', label: 'Hero Main Panoramic (Tile 1)' },
      { slot: 'HERO_TILE_1', label: 'Hero Sub-Tile 1' },
      { slot: 'HERO_TILE_2', label: 'Hero Sub-Tile 2' },
      { slot: 'HERO_TILE_3', label: 'Hero Sub-Tile 3' },
      { slot: 'HERO_TILE_4', label: 'Hero Sub-Tile 4' }
    ];
    const galleryBySlot = (slot, idx) => {
      const gList = normalizeArray(pkg && pkg.galleries);
      return gList.find((g) => g.slot === slot) || gList[idx] || null;
    };
    const routeMapImgUrl = (pkg && pkg.routeMapMedia && (pkg.routeMapMedia.legacyLocalPath || pkg.routeMapMedia.secureUrl))
      || (tagsMeta.routeMap && tagsMeta.routeMap.imageUrl) || '';

    const liveRoute = pkg && pkg.status === 'PUBLISHED'
      ? `/${pkg.type === 'TOUR' ? 'tour' : 'trek'}/${pkg.slug}/`
      : '';
    const cloneOptionsHtml = (state.options.packages || [])
      .filter((p) => !pkg || p.id !== pkg.id)
      .map((p) => `<option value="${p.id}">${escapeHtml(p.title)} (${p.durationDays}d • ${p.type})</option>`)
      .join('');

    titleEl.textContent = pkg ? `Edit Package — ${pkg.title}` : 'New Trekking / Tour Package';

    bodyEl.innerHTML = `
      <form id="pkg-form" class="stack-form">
        <div class="pkg-quickstart-bar">
          <div class="pkg-quickstart-left">
            <span class="pkg-quickstart-label">Quick Template:</span>
            <select id="pkg-clone-src" class="pkg-quickstart-select" aria-label="Source package template">
              <option value="">-- Clone empty sections from existing package --</option>
              ${cloneOptionsHtml}
            </select>
            <button type="button" id="pkg-clone-btn" class="btn btn-outline btn-sm">Import Sections</button>
            <button type="button" id="pkg-fill-defaults-btn" class="btn btn-outline btn-sm">1-Click Fill Gold Defaults</button>
          </div>
          ${liveRoute ? `<a href="${escapeHtml(liveRoute)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">View Live Page &#8599;</a>` : ''}
        </div>

        <div class="pkg-editor-tabs" role="tablist">
          <button type="button" class="pkg-tab-btn active" data-tab="basic">Basic &amp; Sidebar</button>
          <button type="button" class="pkg-tab-btn" data-tab="hero">Hero &amp; Gallery <span class="pkg-tab-badge" id="tab-badge-hero">${normalizeArray(pkg && pkg.galleries).length}/5</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="overview">Facts &amp; Overview <span class="pkg-tab-badge" id="tab-badge-facts">${tripFacts.length}</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="itinerary">Itinerary <span class="pkg-tab-badge" id="tab-badge-days">${itineraryDays.length}</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="includes">Includes &amp; Excludes <span class="pkg-tab-badge" id="tab-badge-inc">${inclusions.length}/${exclusions.length}</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="packing">Prices, Dates &amp; Packing <span class="pkg-tab-badge" id="tab-badge-pack">${packing.categories.length}</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="details">Before Book, Alt &amp; Weather <span class="pkg-tab-badge" id="tab-badge-details">${readBefore.items.length}</span></button>
          <button type="button" class="pkg-tab-btn" data-tab="faqs">FAQs &amp; SEO <span class="pkg-tab-badge" id="tab-badge-faqs">${faqs.length}</span></button>
        </div>

        <!-- TAB 1: Basic & Sidebar -->
        <div class="pkg-tab-pane active" data-pane="basic">
          <div class="form-row-2">
            <div class="form-field"><label>Title *</label><input id="pkg-title" type="text" value="${escapeHtml(pkg ? pkg.title : '')}" required></div>
            <div class="form-field"><label>URL Slug *</label><input id="pkg-slug" type="text" value="${escapeHtml(pkg ? pkg.slug : '')}" placeholder="everest-base-camp-trek" required></div>
          </div>
          <div class="form-row-3">
            <div class="form-field"><label>Trek Key (DOM/Chart ID) *</label><input id="pkg-key" type="text" value="${escapeHtml(pkg ? pkg.trekKey : '')}" placeholder="everest-base-camp-trek" required></div>
            <div class="form-field">
              <label>Type</label>
              <select id="pkg-type">
                ${['TREK', 'TOUR', 'PEAK_CLIMB'].map((t) => `<option value="${t}" ${pkg && pkg.type === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>Difficulty</label>
              <select id="pkg-diff">
                ${['EASY', 'MODERATE', 'CHALLENGING', 'STRENUOUS'].map((d) => `<option value="${d}" ${pkg && pkg.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row-3">
            <div class="form-field"><label>Duration (Days) *</label><input id="pkg-days" type="number" min="1" value="${pkg ? pkg.durationDays : 14}" required></div>
            <div class="form-field"><label>Max Altitude (m)</label><input id="pkg-alt" type="number" min="0" value="${pkg && pkg.maxAltitudeM !== null ? pkg.maxAltitudeM : ''}"></div>
            <div class="form-field"><label>Starting Price (USD) *</label><input id="pkg-price" type="number" step="0.01" min="0" value="${pkg ? pkg.startingPriceUsd : 1495}" required></div>
          </div>
          <div class="form-row-3">
            <div class="form-field">
              <label>Destination Region</label>
              <select id="pkg-dest">
                <option value="">None</option>
                ${state.options.destinations.map((d) => `<option value="${d.id}" ${pkg && pkg.destinationId === d.id ? 'selected' : ''}>${escapeHtml(d.name)}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>Package Category</label>
              <select id="pkg-cat">
                <option value="">None</option>
                ${state.options.categories.map((c) => `<option value="${c.id}" ${pkg && pkg.categoryId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>Status</label>
              <select id="pkg-status">
                ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${(!pkg && s === 'PUBLISHED') || (pkg && pkg.status === s) ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row-2" style="align-items:center;">
            <div class="form-field">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-top:6px;">
                <input id="pkg-featured" type="checkbox" ${pkg && pkg.isFeatured ? 'checked' : ''} style="width:auto;"> Feature on Homepage / Highlights
              </label>
            </div>
            <div class="form-field"><label>Sidebar Top Ribbon Badge</label><input id="pkg-sidebar-badge" type="text" value="${escapeHtml(tagsMeta.sidebarBadge || 'BEST SELLER')}" placeholder="BEST SELLER"></div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Sidebar Booking Card — Group Rate Rows</h4>
              <button type="button" id="pkg-add-sidebar-tier" class="btn btn-outline btn-sm">+ Add Rate Row</button>
            </div>
            <div id="pkg-sidebar-tiers-list" class="pkg-repeater-list">
              ${pricing.sidebarTiers.map((t, i) => renderSimplePairHtml('data-sidebar-tier-row', { title: t.label, text: t.price }, i, 'Group Label (e.g. 2–4 People)', 'Price Text (e.g. USD 1,405 / person)')).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Sidebar Booking Card — Feature Bullets (one per line)</h4>
            </div>
            <div class="form-field">
              <textarea id="pkg-sidebar-bullets" rows="5" placeholder="Trek Leading by well trained Team&#10;Hassle-Free & Instant Booking">${escapeHtml(pricing.sidebarBullets.join('\n'))}</textarea>
            </div>
          </div>
        </div>

        <!-- TAB 2: Hero & Gallery -->
        <div class="pkg-tab-pane" data-pane="hero">
          <div class="form-field">
            <label>Hero Summary Paragraph</label>
            <textarea id="pkg-summary" rows="3" placeholder="Introductory paragraph shown right below the hero heading...">${escapeHtml(pkg ? (pkg.heroSummary || '') : '')}</textarea>
          </div>

          <div id="pkg-media-picker-box" class="hidden"></div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>Hero Bento Collage (5 Images)</h4></div>
            <div class="pkg-repeater-list">
              ${heroSlots.map((hs, idx) => {
                const g = galleryBySlot(hs.slot, idx);
                const imgVal = g && g.media ? (g.media.legacyLocalPath || g.media.secureUrl || '') : '';
                const altVal = (g && (g.caption || (g.media && g.media.altText))) || '';
                return `
                  <div class="pkg-repeater-card" data-hero-slot="${hs.slot}" data-sort="${idx}">
                    <div class="pkg-repeater-head">
                      <span class="pkg-repeater-title">${escapeHtml(hs.label)}</span>
                      <button type="button" class="btn btn-outline btn-sm pkg-pick-media" data-target="hero-img-${idx}" data-preview="hero-prev-${idx}">Choose Media</button>
                    </div>
                    <div class="pkg-media-row">
                      <img id="hero-prev-${idx}" class="pkg-media-thumb" src="${escapeHtml(previewUrl(imgVal))}" alt="">
                      <div class="form-field"><label>Image URL / Path</label><input id="hero-img-${idx}" type="text" data-k="imageUrl" value="${escapeHtml(imgVal)}" placeholder="images/gallery/..."></div>
                      <div class="form-field"><label>Alt Text / Caption</label><input type="text" data-k="altText" value="${escapeHtml(altVal)}" placeholder="Descriptive alt text"></div>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Route Map Section (#section-map)</h4>
              <button type="button" class="btn btn-outline btn-sm pkg-pick-media" data-target="pkg-map-url" data-preview="pkg-map-prev">Choose Map Media</button>
            </div>
            <div class="pkg-media-row" style="margin-bottom:8px;">
              <img id="pkg-map-prev" class="pkg-media-thumb" src="${escapeHtml(previewUrl(routeMapImgUrl))}" alt="">
              <div class="form-field"><label>Route Map Image Path/URL</label><input id="pkg-map-url" type="text" value="${escapeHtml(routeMapImgUrl)}" placeholder="images/everes-base-camp-trek-map.jpg"></div>
              <div class="form-field"><label>Map Section Title</label><input id="pkg-map-title" type="text" value="${escapeHtml(tagsMeta.routeMap.title || '')}"></div>
            </div>
            <div class="form-field"><label>Map Section Intro</label><input id="pkg-map-sub" type="text" value="${escapeHtml(tagsMeta.routeMap.subtitle || '')}"></div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>Booking Banner &amp; Bottom Dark Gradient CTA</h4></div>
            <div class="form-row-2">
              <div class="form-field"><label>Booking Section Title (#section-booking)</label><input id="pkg-book-title" type="text" value="${escapeHtml(tagsMeta.bookingBanner.title || '')}"></div>
              <div class="form-field"><label>Bottom CTA Kicker Pill</label><input id="pkg-cta-badge" type="text" value="${escapeHtml(tagsMeta.bottomCta.badge || '')}"></div>
            </div>
            <div class="form-field" style="margin-top:8px;"><label>Booking Section Paragraph</label><textarea id="pkg-book-body" rows="2">${escapeHtml(tagsMeta.bookingBanner.body || '')}</textarea></div>
            <div class="form-row-2" style="margin-top:8px;">
              <div class="form-field"><label>Bottom CTA Heading</label><input id="pkg-cta-title" type="text" value="${escapeHtml(tagsMeta.bottomCta.title || '')}"></div>
              <div class="form-field"><label>Bottom CTA Body</label><textarea id="pkg-cta-body" rows="2">${escapeHtml(tagsMeta.bottomCta.body || '')}</textarea></div>
            </div>
          </div>
        </div>

        <!-- TAB 3: Trip Facts & Overview (Mirrors Frontend Facts, Overview, Highlights & Why Book) -->
        <div class="pkg-tab-pane" data-pane="overview">
          <!-- 1. Key Trip Facts Grid -->
          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom: 12px;">
              <div class="admin-itin-title-wrap">
                <h4>
                  Key Trip Facts
                  <span class="admin-itin-count-pill" id="pkg-facts-count-pill">${tripFacts.length} Facts</span>
                </h4>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="pkg-fill-14-facts" class="btn btn-outline btn-sm">Fill 14 Standard Facts</button>
                <button type="button" id="pkg-add-fact" class="btn btn-primary btn-sm">+ Add Fact</button>
              </div>
            </div>
            <div id="pkg-facts-list" class="admin-facts-grid">
              ${tripFacts.map((f, i) => renderFactRowHtml(f, i)).join('')}
            </div>
          </div>

          <!-- 2. Overview Narrative -->
          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom: 10px;">
              <div class="admin-itin-title-wrap">
                <h4>${escapeHtml(pkg ? pkg.title : 'Package')} Overview Narrative</h4>
              </div>
            </div>
            <div id="pkg-overview-editor"></div>
          </div>

          <!-- 3. Ask Experts WhatsApp CTA Banner Card -->
          <div class="admin-expert-cta-card">
            <div class="admin-expert-cta-head">
              <div class="admin-expert-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div>
                <h4 style="margin:0; font-size:0.95rem; color:#0E3458;">Ask Experts WhatsApp Banner (#section-overview)</h4>
                <small style="color:#0369A1;">Mirrors the live chat banner right beneath the overview narrative</small>
              </div>
            </div>
            <div class="form-row-3">
              <div class="form-field"><label>Banner Title</label><input id="pkg-exp-title" type="text" value="${escapeHtml(tagsMeta.expertCta.title || '')}" placeholder="Want to know more about this trek?"></div>
              <div class="form-field"><label>Subtitle</label><input id="pkg-exp-sub" type="text" value="${escapeHtml(tagsMeta.expertCta.subtitle || '')}" placeholder="Chat with us — real Himalayan experts, not bots."></div>
              <div class="form-field"><label>Response Time Pill</label><input id="pkg-exp-status" type="text" value="${escapeHtml(tagsMeta.expertCta.status || '')}" placeholder="Replies within 2–4 hours"></div>
            </div>
          </div>

          <!-- 4. Trip Highlights Card (Emerald Checkmark Grid) -->
          <div class="admin-section-card-slate">
            <div class="pkg-section-head" style="margin-bottom: 12px;">
              <h4 style="display:flex; align-items:center; gap:8px; margin:0; color:#0E3458; font-size:1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#F6851F" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Trip Highlights</span>
                <span class="admin-itin-count-pill" id="pkg-hl-count-pill">${highlights.length} Items</span>
              </h4>
              <button type="button" id="pkg-add-highlight" class="btn btn-primary btn-sm">+ Add Highlight</button>
            </div>
            <div id="pkg-highlights-list" class="admin-highlights-grid">
              ${highlights.map((h) => renderHighlightRowHtml(h)).join('')}
            </div>
          </div>

          <!-- 5. Why Book With Us Cards -->
          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom: 12px;">
              <div class="admin-itin-title-wrap">
                <h4>
                  Why Book With Us Cards
                  <span class="admin-itin-count-pill" id="pkg-why-count-pill">${tagsMeta.whyBookCards.length} Cards</span>
                </h4>
              </div>
              <button type="button" id="pkg-add-why" class="btn btn-primary btn-sm">+ Add Card</button>
            </div>
            <div class="form-row-2" style="margin-bottom:12px;">
              <div class="form-field"><label>Why Book Section Title</label><input id="pkg-why-title" type="text" value="${escapeHtml(tagsMeta.whyBookTitle || '')}" placeholder="Why Book with Igloo Himalaya Treks?"></div>
              <div class="form-field"><label>Why Book Section Intro</label><input id="pkg-why-intro" type="text" value="${escapeHtml(tagsMeta.whyBookIntro || '')}" placeholder="We prepare every traveller in Kathmandu and provide seamless mountain logistics..."></div>
            </div>
            <div id="pkg-why-list" class="admin-why-grid">
              ${tagsMeta.whyBookCards.map((w, i) => renderWhyCardRowHtml(w, i)).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 4: Itinerary Days (Mirrors Frontend #section-itinerary Timeline Architecture) -->
        <div class="pkg-tab-pane" data-pane="itinerary">
          <div class="admin-itin-header-bar">
            <div class="admin-itin-title-wrap">
              <h4>
                Itinerary — Day by Day
                <span class="admin-itin-count-pill" id="pkg-itin-count-pill">${itineraryDays.length} Days</span>
              </h4>
            </div>
            <div class="admin-itin-actions">
              <button type="button" id="pkg-itin-expand-all" class="btn btn-outline btn-sm">Expand All Days</button>
              <button type="button" id="pkg-itin-renumber" class="btn btn-outline btn-sm">Auto-Number (1..N)</button>
              <button type="button" id="pkg-add-day" class="btn btn-primary btn-sm">+ Add Day</button>
            </div>
            <div class="form-field" style="flex: 1 1 100%; margin: 4px 0 0 0;">
              <label>Itinerary Intro Paragraph <small style="color:#64748B; font-weight:500;">(shown right beneath the Itinerary heading on the live page)</small></label>
              <textarea id="pkg-itin-intro" rows="2" placeholder="Leave blank to use default duration summary, or write a custom itinerary overview paragraph...">${escapeHtml(tagsMeta.itineraryIntro || '')}</textarea>
            </div>
          </div>

          <div id="pkg-days-list" class="admin-itin-timeline">
            ${itineraryDays.map((d, i) => renderDayRowHtml(d, i, i === 0)).join('')}
          </div>
        </div>

        <!-- TAB 5: Includes & Excludes (Mirrors Live #section-includes 2-Column Card Grid) -->
        <div class="pkg-tab-pane" data-pane="includes">
          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom: 14px;">
              <div class="admin-itin-title-wrap">
                <h4>
                  What’s Included in ${escapeHtml(pkg ? pkg.title : 'Package')}
                  <span class="admin-itin-count-pill" id="pkg-inc-count-pill">${inclusions.length} Included</span>
                </h4>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="pkg-fill-std-inc" class="btn btn-outline btn-sm">Fill Standard Includes</button>
                <button type="button" id="pkg-add-inc" class="btn btn-primary btn-sm">+ Add Inclusion</button>
              </div>
            </div>
            <div id="pkg-inc-list" class="admin-inc-exc-grid">
              ${inclusions.map((item) => renderIncExcCardHtml('inc', item)).join('')}
            </div>
          </div>

          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom: 14px;">
              <div class="admin-itin-title-wrap" style="border-left-color: #EF4444;">
                <h4>
                  What’s Not Included in ${escapeHtml(pkg ? pkg.title : 'Package')}
                  <span class="admin-itin-count-pill" id="pkg-exc-count-pill" style="background:#FEF2F2; color:#DC2626;">${exclusions.length} Excluded</span>
                </h4>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="pkg-fill-std-exc" class="btn btn-outline btn-sm">Fill Standard Excludes</button>
                <button type="button" id="pkg-add-exc" class="btn btn-primary btn-sm">+ Add Exclusion</button>
              </div>
            </div>
            <div id="pkg-exc-list" class="admin-inc-exc-grid">
              ${exclusions.map((item) => renderIncExcCardHtml('exc', item)).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 6: Prices, Dates & Packing (Mirrors Live Sections 4 & 5) -->
        <div class="pkg-tab-pane" data-pane="packing">
          <!-- Group Size Pricing 4-Column Stat Cards -->
          <div class="admin-section-card">
            <div class="admin-dates-header">
              <div class="admin-itin-title-wrap">
                <h4>
                  Dates &amp; Availability — Group Pricing
                  <span class="admin-itin-count-pill" id="pkg-tiers-count-pill">${pricing.tiers.length} Tiers</span>
                </h4>
              </div>
              <div class="admin-dates-mode-pills" aria-hidden="true">
                <span class="admin-dates-mode-pill active">Group Departures</span>
                <span class="admin-dates-mode-pill">Private Calendar (Auto-enabled)</span>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="pkg-fill-4-tiers" class="btn btn-outline btn-sm">Fill 4 Group Tiers</button>
                <button type="button" id="pkg-add-tier" class="btn btn-primary btn-sm">+ Add Price Tier</button>
              </div>
            </div>

            <div class="form-field" style="margin-bottom:10px;">
              <label>Group Departures Intro Note <small style="color:#64748B; font-weight:500;">(shown under Dates &amp; Availability heading)</small></label>
              <textarea id="pkg-gp-intro" rows="2" placeholder="Prices are in US dollars per person. Contact us with your travel dates and group size...">${escapeHtml(pricing.intro)}</textarea>
            </div>

            <div id="pkg-tiers-list" class="admin-tier-grid">
              ${pricing.tiers.map((t, i) => renderTierRowHtml(t, i)).join('')}
            </div>

            <div class="pkg-section-head" style="margin-top:18px;">
              <h4>Booking Table Rows <small style="color:#64748B; font-weight:500;">(optional quote/tour table rows)</small></h4>
              <button type="button" id="pkg-add-trow" class="btn btn-outline btn-sm">+ Add Row</button>
            </div>
            <div id="pkg-trows-list" class="pkg-repeater-list">
              ${pricing.tableRows.map((r, i) => renderSimplePairHtml('data-trow-row', r, i, 'Booking Category', 'Price / Quotation Status')).join('')}
            </div>
          </div>

          <!-- Group Departure Dates Card (Mirrors .dates-card-container + Calendar Leaf Badges) -->
          <div class="admin-section-card">
            <div class="pkg-section-head" style="margin-bottom:12px;">
              <div class="admin-itin-title-wrap">
                <h4>
                  Scheduled Group Departures
                  <span class="admin-itin-count-pill" id="pkg-deps-count-pill">${departures.length} Departures</span>
                </h4>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="pkg-fill-2026-deps" class="btn btn-outline btn-sm">Fill 2026 Departures</button>
                <button type="button" id="pkg-add-dep" class="btn btn-primary btn-sm">+ Add Departure</button>
              </div>
            </div>

            <div class="admin-dep-topbar">
              <span class="admin-dep-year-badge">2026</span>
              <div class="admin-dep-month-tabs" id="pkg-dep-month-tabs">
                <button type="button" class="admin-dep-month-btn active" data-dep-filter="ALL">ALL</button>
                ${['AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((m) => `<button type="button" class="admin-dep-month-btn" data-dep-filter="${m}">${m}</button>`).join('')}
              </div>
            </div>

            <div id="pkg-deps-list" class="admin-dep-list">
              ${departures.map((d, i) => renderDepartureRowHtml(d, i)).join('')}
            </div>
          </div>

          <!-- Section 5 — Packing & Equipment Checklist (Mirrors Live Rental Banner + 2-Column Categories) -->
          <div class="admin-section-card">
            <div class="pkg-section-head">
              <div class="admin-itin-title-wrap">
                <h4>
                  What to Pack — Gear Checklist
                  <span class="admin-itin-count-pill" id="pkg-pack-count-pill">${packing.categories.length} Categories</span>
                </h4>
              </div>
              <button type="button" id="pkg-add-pack-cat" class="btn btn-primary btn-sm">+ Add Gear Category</button>
            </div>
            <div class="form-field"><label>Packing Intro Paragraph</label><textarea id="pkg-pack-intro" rows="2">${escapeHtml(packing.intro)}</textarea></div>

            <div class="admin-rental-banner">
              <div class="admin-rental-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><polyline points="10 6 14 10 10 14"/></svg>
              </div>
              <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:8px;">
                <div style="font-size:0.86rem; font-weight:800; color:#0E3458;">Complimentary Equipment Banner <span class="admin-rental-badge">Included Free</span></div>
                <div class="form-row-2">
                  <div class="form-field"><label>Banner Title</label><input id="pkg-pack-banner-title" type="text" value="${escapeHtml(packing.bannerTitle)}"></div>
                  <div class="form-field"><label>Concluding Packing Note</label><input id="pkg-pack-note" type="text" value="${escapeHtml(packing.concludingNote)}"></div>
                </div>
                <div class="form-field"><label>Banner Text</label><input id="pkg-pack-banner-desc" type="text" value="${escapeHtml(packing.bannerDesc)}"></div>
              </div>
            </div>

            <div id="pkg-pack-cats-list" class="admin-packing-grid">
              ${packing.categories.map((c, i) => renderPackingCategoryHtml(c, i)).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 7: Read Before You Book, Altitude & Weather -->
        <div class="pkg-tab-pane" data-pane="details">
          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Section 6 — Read Before You Book (${readBefore.items.length} topics)</h4>
              <button type="button" id="pkg-add-detail" class="btn btn-outline btn-sm">+ Add Topic</button>
            </div>
            <div class="form-row-2">
              <div class="form-field"><label>Section Main Title</label><input id="pkg-rb-title" type="text" value="${escapeHtml(readBefore.title)}"></div>
              <div class="form-field"><label>Primary Subtitle</label><input id="pkg-rb-sub" type="text" value="${escapeHtml(readBefore.subtitle)}"></div>
            </div>
            <div class="form-field" style="margin:8px 0 10px;"><label>Secondary Contact Subtitle (HTML)</label><input id="pkg-rb-sub2" type="text" value="${escapeHtml(readBefore.secondarySubtitle)}"></div>
            <div id="pkg-details-list" class="pkg-repeater-list">
              ${readBefore.items.map((t, i) => renderDetailTopicHtml(t, i)).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>Section 7 — Elevation Profile (#section-altitude-profile)</h4></div>
            <div class="form-row-2">
              <div class="form-field"><label>Altitude Section Heading</label><input id="pkg-alt-title" type="text" value="${escapeHtml(altObj.sectionTitle || '')}"></div>
              <div class="form-field"><label>Altitude Section Intro</label><input id="pkg-alt-intro" type="text" value="${escapeHtml(altObj.intro || '')}"></div>
            </div>
            <div class="pkg-section-head" style="margin-top:10px;">
              <h4>Overnight / Stop Altitudes Table</h4>
              <button type="button" id="pkg-add-alt-row" class="btn btn-outline btn-sm">+ Add Stop</button>
            </div>
            <div id="pkg-alt-table-list">${normalizeArray(altObj.overnightTable).map((r) => renderAltTableRowHtml(r)).join('')}</div>

            <div class="pkg-section-head" style="margin-top:12px;">
              <h4>Higher Places / Key Elevation Cards</h4>
              <button type="button" id="pkg-add-hp" class="btn btn-outline btn-sm">+ Add Place</button>
            </div>
            <div id="pkg-hp-list" class="pkg-repeater-list">
              ${normalizeArray(altObj.higherPlaces).map((hp, i) => renderHigherPlaceRowHtml(hp, i)).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>Section 8 — Weather &amp; Seasonal Guide (#section-weather)</h4></div>
            <div class="form-row-2">
              <div class="form-field"><label>Weather Section Heading</label><input id="pkg-w-title" type="text" value="${escapeHtml(weatherObj.sectionTitle || '')}"></div>
              <div class="form-field"><label>Weather Section Intro</label><input id="pkg-w-intro" type="text" value="${escapeHtml(weatherObj.intro || '')}"></div>
            </div>
            <div class="pkg-section-head" style="margin-top:10px;">
              <h4>4 Seasonal Quick Cards</h4>
              <button type="button" id="pkg-add-scard" class="btn btn-outline btn-sm">+ Add Season Card</button>
            </div>
            <div id="pkg-scards-list" class="pkg-repeater-list">
              ${normalizeArray(weatherObj.seasonCards).map((sc, i) => renderSeasonCardHtml(sc, i)).join('')}
            </div>
            <div class="pkg-section-head" style="margin-top:10px;">
              <h4>Seasonal Weather Table</h4>
              <button type="button" id="pkg-add-wrow" class="btn btn-outline btn-sm">+ Add Table Row</button>
            </div>
            <div id="pkg-wtable-list">${normalizeArray(weatherObj.seasonalTable).map((r) => renderSeasonalTableRowHtml(r)).join('')}</div>
            <div class="form-row-2" style="margin-top:10px;">
              <div class="form-field"><label>How Weather Changes Title</label><input id="pkg-w-rctitle" type="text" value="${escapeHtml(weatherObj.routeChangeTitle || '')}"></div>
              <div class="form-field"><label>Which Season to Choose Title</label><input id="pkg-w-bstitle" type="text" value="${escapeHtml(weatherObj.bestSeasonTitle || '')}"></div>
            </div>
            <div class="form-row-2" style="margin-top:8px;">
              <div class="form-field"><label>How Weather Changes Copy</label><textarea id="pkg-w-rctext" rows="2">${escapeHtml(weatherObj.routeChangeText || '')}</textarea></div>
              <div class="form-field"><label>Which Season to Choose Copy</label><textarea id="pkg-w-bstext" rows="2">${escapeHtml(weatherObj.bestSeasonText || '')}</textarea></div>
            </div>
          </div>
        </div>

        <!-- TAB 8: FAQs, Recommendations & SEO -->
        <div class="pkg-tab-pane" data-pane="faqs">
          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Frequently Asked Questions (${faqs.length})</h4>
              <button type="button" id="pkg-add-faq" class="btn btn-primary btn-sm">+ Add FAQ</button>
            </div>
            <div id="pkg-faqs-list" class="pkg-repeater-list">
              ${faqs.map((f, i) => renderFaqRowHtml(f, i, tagsMeta.faqCategories)).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>You Might Also Like — Recommended Packages (max 4)</h4></div>
            <div class="pkg-chip-grid" id="pkg-recs-grid">
              ${state.options.packages.filter((p) => !pkg || p.id !== pkg.id).map((p) => `
                <label class="pkg-chip-option">
                  <input type="checkbox" value="${p.id}" ${recommendedIds.has(p.id) ? 'checked' : ''} style="width:auto;">
                  <span>${escapeHtml(p.title)} (${p.durationDays}d)</span>
                </label>`).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head"><h4>SEO &amp; OpenGraph Metadata</h4></div>
            <div class="form-row-2">
              <div class="form-field"><label>SEO Meta Title</label><input id="pkg-seo-title" type="text" value="${escapeHtml(pkg && pkg.seo ? pkg.seo.metaTitle : '')}"></div>
              <div class="form-field"><label>Canonical URL</label><input id="pkg-seo-canon" type="text" value="${escapeHtml(pkg && pkg.seo ? (pkg.seo.canonicalUrl || '') : '')}" placeholder="https://www.igloohimalayatreks.com/..."></div>
            </div>
            <div class="form-row-2" style="margin-top:8px;">
              <div class="form-field"><label>SEO Meta Description</label><textarea id="pkg-seo-desc" rows="2">${escapeHtml(pkg && pkg.seo ? (pkg.seo.metaDescription || '') : '')}</textarea></div>
              <div class="form-field"><label>Keywords</label><textarea id="pkg-seo-kw" rows="2">${escapeHtml(pkg && pkg.seo ? (pkg.seo.keywords || '') : '')}</textarea></div>
            </div>
          </div>
        </div>

        <div id="pkg-form-err" class="alert alert-error hidden"></div>
        <div class="modal-actions" style="justify-content:space-between; align-items:center;">
          <div>
            ${pkg && canDelete ? '<button type="button" id="pkg-delete-btn" class="btn btn-outline" style="color:#B91C1C;">Delete Package</button>' : ''}
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" class="btn btn-outline" id="pkg-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="pkg-save-btn">Save &amp; Sync Package</button>
          </div>
        </div>
      </form>
    `;

    modal.classList.remove('hidden');

    const overviewEditorHost = document.getElementById('pkg-overview-editor');
    if (overviewEditorHost) {
      mountRichEditor(overviewEditorHost, {
        label: 'FULL OVERVIEW',
        initialHtml: pkg ? (pkg.overviewHtml || '') : '',
        placeholder: 'Write detailed trip overview headings, callout quotes, and paragraphs...',
        minHeight: 280
      });
    }

    const mountCompactEditors = (rootEl) => {
      rootEl.querySelectorAll('.pkg-rte-host').forEach((host) => {
        if (host.dataset.rteMounted === '1') return;
        host.dataset.rteMounted = '1';
        mountRichEditor(host, {
          initialHtml: host.dataset.initialHtml || '',
          compact: true,
          minHeight: 130,
          placeholder: 'Write formatted content...'
        });
      });
    };
    mountCompactEditors(bodyEl);

    const refreshTabBadges = () => {
      const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
      const heroFilled = Array.from(bodyEl.querySelectorAll('[data-hero-slot] input[data-k="imageUrl"]')).filter((i) => i.value.trim()).length;
      const factCount = bodyEl.querySelectorAll('[data-fact-row]').length;
      const hlCount = bodyEl.querySelectorAll('[data-highlight-row]').length;
      const whyCount = bodyEl.querySelectorAll('[data-why-row]').length;
      const dayCount = bodyEl.querySelectorAll('[data-day-row]').length;
      const incCount = bodyEl.querySelectorAll('[data-inc-row]').length;
      const excCount = bodyEl.querySelectorAll('[data-exc-row]').length;
      const tierCount = bodyEl.querySelectorAll('[data-tier-row]').length;
      const depCount = bodyEl.querySelectorAll('[data-dep-row]').length;
      const packCatCount = bodyEl.querySelectorAll('[data-pack-cat]').length;
      setTxt('tab-badge-hero', `${heroFilled}/5`);
      setTxt('tab-badge-facts', String(factCount));
      setTxt('pkg-facts-count-pill', `${factCount} ${factCount === 1 ? 'Fact' : 'Facts'}`);
      setTxt('pkg-hl-count-pill', `${hlCount} ${hlCount === 1 ? 'Item' : 'Items'}`);
      setTxt('pkg-why-count-pill', `${whyCount} ${whyCount === 1 ? 'Card' : 'Cards'}`);
      setTxt('tab-badge-days', String(dayCount));
      setTxt('pkg-itin-count-pill', `${dayCount} ${dayCount === 1 ? 'Day' : 'Days'}`);
      setTxt('tab-badge-inc', `${incCount}/${excCount}`);
      setTxt('pkg-inc-count-pill', `${incCount} Included`);
      setTxt('pkg-exc-count-pill', `${excCount} Excluded`);
      setTxt('tab-badge-pack', String(packCatCount));
      setTxt('pkg-tiers-count-pill', `${tierCount} ${tierCount === 1 ? 'Tier' : 'Tiers'}`);
      setTxt('pkg-deps-count-pill', `${depCount} ${depCount === 1 ? 'Departure' : 'Departures'}`);
      setTxt('pkg-pack-count-pill', `${packCatCount} ${packCatCount === 1 ? 'Category' : 'Categories'}`);
      setTxt('tab-badge-details', String(bodyEl.querySelectorAll('[data-detail-row]').length));
      setTxt('tab-badge-faqs', String(bodyEl.querySelectorAll('[data-faq-row]').length));
    };

    const syncDayCardHeader = (card) => {
      if (!card) return;
      const dayNum = card.querySelector('[data-k="dayNumber"]')?.value || '';
      const rawTitle = card.querySelector('[data-k="title"]')?.value || '';
      const altVal = card.querySelector('[data-k="altitudeM"]')?.value;
      const subVal = card.querySelector('[data-k="subtitle"]')?.value || '';
      const durVal = card.querySelector('[data-k="durationHours"]')?.value || '';
      const prev = formatDaySubPreview({ title: rawTitle, subtitle: subVal, altitudeM: altVal, durationHours: durVal });
      const lblEl = card.querySelector('.admin-itin-day-label');
      const tEl = card.querySelector('.admin-itin-title-text');
      const sEl = card.querySelector('.admin-itin-subtitle-preview');
      if (lblEl) lblEl.textContent = `Day ${dayNum || '?'}:`;
      if (tEl) tEl.textContent = prev.cleanTitle;
      if (sEl) sEl.textContent = prev.subLine;
    };

    // Auto-slugify and auto-trekKey when creating a new package
    if (!pkg) {
      const titleInput = document.getElementById('pkg-title');
      const slugInput = document.getElementById('pkg-slug');
      const keyInput = document.getElementById('pkg-key');
      let slugManual = false;
      let keyManual = false;
      if (slugInput) slugInput.addEventListener('input', () => { slugManual = true; });
      if (keyInput) keyInput.addEventListener('input', () => { keyManual = true; });
      if (titleInput) {
        titleInput.addEventListener('input', () => {
          const autoSlug = titleInput.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          if (slugInput && !slugManual) slugInput.value = autoSlug;
          if (keyInput && !keyManual) keyInput.value = autoSlug;
        });
      }
    }

    // 1-Click Fill Gold Standard Defaults handler
    const fillDefaultsBtn = document.getElementById('pkg-fill-defaults-btn');
    if (fillDefaultsBtn) {
      fillDefaultsBtn.addEventListener('click', () => {
        const curTitle = (document.getElementById('pkg-title')?.value || 'Himalayan Package').trim();
        const curDays = Number(document.getElementById('pkg-days')?.value || 14);
        const curAlt = Number(document.getElementById('pkg-alt')?.value || 0);
        const curPrice = Number(document.getElementById('pkg-price')?.value || 995);

        const factsList = document.getElementById('pkg-facts-list');
        if (factsList && factsList.children.length === 0) {
          const defaultFacts = [
            { category: 'DESTINATION', value: 'Nepal Himalayas', subtitle: 'Curated alpine route' },
            { category: 'DURATION', value: `${curDays} Days`, subtitle: 'Full arrival to departure' },
            { category: 'MAX ALTITUDE', value: curAlt ? `${curAlt.toLocaleString()} m` : 'Moderate Altitude', subtitle: 'Highest route point' },
            { category: 'TRIP GRADE', value: document.getElementById('pkg-diff')?.value || 'MODERATE', subtitle: 'Consecutive daily stages' },
            { category: 'ACCOMMODATION', value: 'Hotel & Teahouse Lodges', subtitle: 'Clean twin-sharing stays' },
            { category: 'BEST SEASONS', value: 'Spring & Autumn', subtitle: 'Mar–May & Sep–Nov' }
          ];
          factsList.innerHTML = defaultFacts.map((f, i) => renderFactRowHtml(f, i)).join('');
        }

        const whyList = document.getElementById('pkg-why-list');
        if (whyList && whyList.children.length === 0) {
          const whyDefaults = [
            { title: 'Trip Briefing & Gear Check', desc: 'Complete Kathmandu pre-trip briefing and equipment inspection with your lead guide.' },
            { title: 'Licensed Local Guide & Crew', desc: 'Government-certified English-speaking guide trained in altitude safety and local culture.' },
            { title: 'Complimentary Expedition Gear', desc: '4-season down sleeping bag, warm down jacket, and waterproof duffel provided on loan.' },
            { title: '24/7 Local Safety Coordination', desc: 'Direct Kathmandu operations desk monitoring weather and transport schedules.' }
          ];
          whyList.innerHTML = whyDefaults.map((w, i) => renderWhyCardRowHtml(w, i)).join('');
        }

        const tiersList = document.getElementById('pkg-tiers-list');
        if (tiersList && tiersList.children.length === 0) {
          const defaultTiers = [
            { label: '1 Person (Solo)', price: `USD ${Math.round(curPrice * 1.15).toLocaleString()}`, note: 'Private Support' },
            { label: '2–4 People', price: `USD ${curPrice.toLocaleString()}`, note: 'Small Group' },
            { label: '5–7 People', price: `USD ${Math.round(curPrice * 0.92).toLocaleString()}`, note: 'Best Value' },
            { label: '8+ People', price: 'Quote', note: 'Request Quote' }
          ];
          tiersList.innerHTML = defaultTiers.map((t, i) => renderTierRowHtml(t, i)).join('');
        }

        const sbTiers = document.getElementById('pkg-sidebar-tiers-list');
        if (sbTiers && sbTiers.children.length === 0) {
          sbTiers.innerHTML = [
            { title: '1 person (Solo)', text: `USD ${Math.round(curPrice * 1.15).toLocaleString()} / person` },
            { title: '2–4 people', text: `USD ${curPrice.toLocaleString()} / person` },
            { title: '5–9 people', text: `USD ${Math.round(curPrice * 0.92).toLocaleString()} / person` }
          ].map((t, i) => renderSimplePairHtml('data-sidebar-tier-row', t, i, 'Group Label', 'Price Text')).join('');
        }

        const packCats = document.getElementById('pkg-pack-cats-list');
        if (packCats && packCats.children.length === 0) {
          const defaultPack = [
            { title: 'Hiking Gear', items: [{ label: 'Waterproof Trekking Boots', desc: 'Broken in beforehand with solid ankle grip', qty: '1 pair' }, { label: 'Daypack (25–35 L)', desc: 'For water, extra layers and valuables', qty: '1 pc' }, { label: 'Trekking Poles', desc: 'Adjustable poles for descents', qty: '1 pair' }] },
            { title: 'Clothing & Layers', items: [{ label: 'Moisture-Wicking Base Layers', desc: 'Breathable merino or synthetic tops', qty: '3–4 pcs' }, { label: 'Down Jacket & Waterproof Shell', desc: 'Windproof outer layer + warm insulation', qty: '1 each' }] },
            { title: 'Travel Documents & First Aid', items: [{ label: 'Passport + Photos + Insurance', desc: 'Emergency evacuation coverage & permit photos', qty: '1 set' }, { label: 'Sunscreen SPF 50+ & First Aid', desc: 'UV protection, blister plasters & prescriptions', qty: '1 kit' }] }
          ];
          packCats.innerHTML = defaultPack.map((c, i) => renderPackingCategoryHtml(c, i)).join('');
        }

        const scards = document.getElementById('pkg-scards-list');
        if (scards && scards.children.length === 0) {
          scards.innerHTML = [
            { tag: 'Peak Visibility', season: 'Autumn (Sep–Nov)', rangeDesc: 'Crisp blue skies & festive trails' },
            { tag: 'Wildflowers', season: 'Spring (Mar–May)', rangeDesc: 'Rhododendrons & pleasant days' },
            { tag: 'Peaceful Trails', season: 'Winter (Dec–Feb)', rangeDesc: 'Quiet lodges & bright sun' },
            { tag: 'Lush Valleys', season: 'Monsoon (Jun–Aug)', rangeDesc: 'Green hills & rainshadow corridors' }
          ].map((sc, i) => renderSeasonCardHtml(sc, i)).join('');
        }

        if (!document.getElementById('pkg-rb-title')?.value.trim()) document.getElementById('pkg-rb-title').value = `Read Before You Book — ${curTitle}`;
        if (!document.getElementById('pkg-cta-title')?.value.trim()) document.getElementById('pkg-cta-title').value = `Book ${curTitle}`;
        refreshTabBadges();
        showToast('Populated Gold Standard default sections cleanly!', 'success');
      });
    }

    // Clone Sections From Existing Package handler
    const cloneBtn = document.getElementById('pkg-clone-btn');
    if (cloneBtn) {
      cloneBtn.addEventListener('click', async () => {
        const srcId = Number(document.getElementById('pkg-clone-src')?.value || 0);
        if (!srcId) {
          showToast('Choose a source package from the template dropdown first.', 'error');
          return;
        }
        cloneBtn.disabled = true;
        cloneBtn.textContent = 'Importing...';
        try {
          const res = await apiRequest(`/admin/packages/${srcId}`);
          const src = res.package;
          if (!src) throw new Error('Source package not found.');

          const srcTags = normalizeTagsMeta(src);
          const srcPricing = normalizePricing(src);
          const srcPack = normalizePacking(src);
          const srcRb = normalizeReadBeforeBook(src);
          const srcAlt = (src.altitudeProfileJson && typeof src.altitudeProfileJson === 'object') ? src.altitudeProfileJson : {};
          const srcWeather = (src.weatherProfileJson && typeof src.weatherProfileJson === 'object') ? src.weatherProfileJson : {};

          // Populate empty Hero images & map
          const srcGals = normalizeArray(src.galleries);
          heroSlots.forEach((hs, idx) => {
            const urlEl = document.getElementById(`hero-img-${idx}`);
            const prevEl = document.getElementById(`hero-prev-${idx}`);
            if (urlEl && !urlEl.value.trim()) {
              const g = srcGals.find((x) => x.slot === hs.slot) || srcGals[idx];
              const u = g && g.media ? (g.media.legacyLocalPath || g.media.secureUrl || '') : '';
              if (u) {
                urlEl.value = u;
                if (prevEl) prevEl.src = previewUrl(u);
              }
            }
          });
          const mapEl = document.getElementById('pkg-map-url');
          if (mapEl && !mapEl.value.trim()) {
            const mapUrl = (src.routeMapMedia && (src.routeMapMedia.legacyLocalPath || src.routeMapMedia.secureUrl)) || (srcTags.routeMap && srcTags.routeMap.imageUrl) || '';
            if (mapUrl) {
              mapEl.value = mapUrl;
              const prevMap = document.getElementById('pkg-map-prev');
              if (prevMap) prevMap.src = previewUrl(mapUrl);
            }
          }

          if (document.getElementById('pkg-facts-list').children.length === 0 && normalizeArray(src.tripFactsJson).length) {
            document.getElementById('pkg-facts-list').innerHTML = src.tripFactsJson.map((f, i) => renderFactRowHtml(f, i)).join('');
          }
          if (document.getElementById('pkg-highlights-list').children.length === 0 && normalizeArray(src.highlightsJson).length) {
            document.getElementById('pkg-highlights-list').innerHTML = src.highlightsJson.map((h, i) => renderHighlightRowHtml(h, i)).join('');
          }
          if (document.getElementById('pkg-why-list').children.length === 0 && srcTags.whyBookCards.length) {
            document.getElementById('pkg-why-list').innerHTML = srcTags.whyBookCards.map((w, i) => renderWhyCardRowHtml(w, i)).join('');
          }
          if (document.getElementById('pkg-why-title') && !document.getElementById('pkg-why-title').value.trim() && srcTags.whyBookTitle) {
            document.getElementById('pkg-why-title').value = srcTags.whyBookTitle;
          }
          if (document.getElementById('pkg-why-intro') && !document.getElementById('pkg-why-intro').value.trim() && srcTags.whyBookIntro) {
            document.getElementById('pkg-why-intro').value = srcTags.whyBookIntro;
          }
          if (document.getElementById('pkg-inc-list').children.length === 0 && normalizeArray(src.inclusionsJson).length) {
            document.getElementById('pkg-inc-list').innerHTML = src.inclusionsJson.map((item) => renderIncExcCardHtml('inc', item)).join('');
          }
          if (document.getElementById('pkg-exc-list').children.length === 0 && normalizeArray(src.exclusionsJson).length) {
            document.getElementById('pkg-exc-list').innerHTML = src.exclusionsJson.map((item) => renderIncExcCardHtml('exc', item)).join('');
          }
          if (document.getElementById('pkg-tiers-list').children.length === 0 && srcPricing.tiers.length) {
            document.getElementById('pkg-tiers-list').innerHTML = srcPricing.tiers.map((t, i) => renderTierRowHtml(t, i)).join('');
          }
          if (document.getElementById('pkg-sidebar-tiers-list').children.length === 0 && srcPricing.sidebarTiers.length) {
            document.getElementById('pkg-sidebar-tiers-list').innerHTML = srcPricing.sidebarTiers.map((t, i) => renderSimplePairHtml('data-sidebar-tier-row', { title: t.label, text: t.price }, i, 'Group Label', 'Price Text')).join('');
          }
          if (!document.getElementById('pkg-sidebar-bullets').value.trim() && srcPricing.sidebarBullets.length) {
            document.getElementById('pkg-sidebar-bullets').value = srcPricing.sidebarBullets.join('\n');
          }
          if (document.getElementById('pkg-deps-list').children.length === 0 && normalizeArray(src.departureDatesJson).length) {
            document.getElementById('pkg-deps-list').innerHTML = src.departureDatesJson.map((d, i) => renderDepartureRowHtml(d, i)).join('');
          }
          if (document.getElementById('pkg-pack-cats-list').children.length === 0 && srcPack.categories.length) {
            document.getElementById('pkg-pack-cats-list').innerHTML = srcPack.categories.map((c, i) => renderPackingCategoryHtml(c, i)).join('');
          }
          if (!document.getElementById('pkg-pack-intro').value.trim() && srcPack.intro) document.getElementById('pkg-pack-intro').value = srcPack.intro;
          if (!document.getElementById('pkg-pack-banner-title').value.trim() && srcPack.bannerTitle) document.getElementById('pkg-pack-banner-title').value = srcPack.bannerTitle;
          if (!document.getElementById('pkg-pack-banner-desc').value.trim() && srcPack.bannerDesc) document.getElementById('pkg-pack-banner-desc').value = srcPack.bannerDesc;

          if (document.getElementById('pkg-details-list').children.length === 0 && srcRb.items.length) {
            const detHost = document.getElementById('pkg-details-list');
            detHost.innerHTML = srcRb.items.map((t, i) => renderDetailTopicHtml(t, i)).join('');
            mountCompactEditors(detHost);
          }
          if (document.getElementById('pkg-scards-list').children.length === 0 && normalizeArray(srcWeather.seasonCards).length) {
            document.getElementById('pkg-scards-list').innerHTML = srcWeather.seasonCards.map((sc, i) => renderSeasonCardHtml(sc, i)).join('');
          }
          if (document.getElementById('pkg-wtable-list').children.length === 0 && normalizeArray(srcWeather.seasonalTable).length) {
            document.getElementById('pkg-wtable-list').innerHTML = srcWeather.seasonalTable.map((r) => renderSeasonalTableRowHtml(r)).join('');
          }
          if (document.getElementById('pkg-faqs-list').children.length === 0 && normalizeArray(src.faqs).length) {
            const faqsHost = document.getElementById('pkg-faqs-list');
            faqsHost.innerHTML = src.faqs.map((f, i) => renderFaqRowHtml(f, i, srcTags.faqCategories)).join('');
            mountCompactEditors(faqsHost);
          }

          refreshTabBadges();
          showToast(`Imported empty template sections from "${src.title}"`, 'success');
        } catch (err) {
          showToast(err.message, 'error');
        } finally {
          cloneBtn.disabled = false;
          cloneBtn.textContent = 'Import Sections';
        }
      });
    }

    // Tab switching
    const tabs = bodyEl.querySelectorAll('.pkg-tab-btn');
    const panes = bodyEl.querySelectorAll('.pkg-tab-pane');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabs.forEach((b) => b.classList.toggle('active', b === btn));
        panes.forEach((p) => p.classList.toggle('active', p.getAttribute('data-pane') === target));
      });
    });

    // Global delegated clicks for repeaters & timeline accordion cards
    bodyEl.onclick = (e) => {
      const remCard = e.target.closest('.pkg-remove-row');
      if (remCard) {
        const card = remCard.closest('.pkg-repeater-card, .admin-itin-card, .admin-fact-card, .admin-highlight-item, .admin-why-card, .admin-inc-exc-card, .admin-tier-card, .admin-dep-row, .admin-pack-cat-card');
        if (card) card.remove();
        refreshTabBadges();
        return;
      }
      const moveUp = e.target.closest('.admin-itin-up');
      if (moveUp) {
        const card = moveUp.closest('.admin-itin-card');
        if (card && card.previousElementSibling) {
          card.parentNode.insertBefore(card, card.previousElementSibling);
        }
        return;
      }
      const moveDown = e.target.closest('.admin-itin-down');
      if (moveDown) {
        const card = moveDown.closest('.admin-itin-card');
        if (card && card.nextElementSibling) {
          card.parentNode.insertBefore(card.nextElementSibling, card);
        }
        return;
      }
      const dupBtn = e.target.closest('.admin-itin-dup');
      if (dupBtn) {
        const card = dupBtn.closest('.admin-itin-card');
        if (card) {
          const dayData = {
            dayNumber: (Number(card.querySelector('[data-k="dayNumber"]')?.value) || 0) + 1,
            title: `${card.querySelector('[data-k="title"]')?.value || ''} (Copy)`.trim(),
            altitudeM: card.querySelector('[data-k="altitudeM"]')?.value || '',
            subtitle: card.querySelector('[data-k="subtitle"]')?.value || '',
            routeSummary: card.querySelector('[data-k="routeSummary"]')?.value || '',
            activityType: card.querySelector('[data-k="activityType"]')?.value || '',
            durationHours: card.querySelector('[data-k="durationHours"]')?.value || '',
            distanceKm: card.querySelector('[data-k="distanceKm"]')?.value || '',
            accommodation: card.querySelector('[data-k="accommodation"]')?.value || '',
            meals: card.querySelector('[data-k="meals"]')?.value || '',
            descriptionHtml: getRichEditorHtml(card.querySelector('[data-k="descriptionHtml"]')) || ''
          };
          card.insertAdjacentHTML('afterend', renderDayRowHtml(dayData, 0, true));
          const cloned = card.nextElementSibling;
          mountCompactEditors(cloned);
          refreshTabBadges();
        }
        return;
      }
      const itinHeader = e.target.closest('.admin-itin-header');
      if (itinHeader && !e.target.closest('.admin-itin-mini-btn')) {
        const card = itinHeader.closest('.admin-itin-card');
        if (card) {
          const open = card.classList.toggle('is-open');
          itinHeader.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        return;
      }
      const remPackItem = e.target.closest('.pkg-remove-pack-item');
      if (remPackItem) {
        const row = remPackItem.closest('[data-pack-item]');
        if (row) row.remove();
        return;
      }
      const addPackItem = e.target.closest('.pkg-add-pack-item');
      if (addPackItem) {
        const wrap = addPackItem.closest('.pkg-repeater-card, .admin-pack-cat-card').querySelector('[data-pack-items-wrap]');
        if (wrap) wrap.insertAdjacentHTML('beforeend', renderPackingItemHtml({}));
        return;
      }
      const remAlt = e.target.closest('.pkg-remove-alt-row');
      if (remAlt) {
        const row = remAlt.closest('[data-alt-row]');
        if (row) row.remove();
        return;
      }
      const remW = e.target.closest('.pkg-remove-wtable-row');
      if (remW) {
        const row = remW.closest('[data-wtable-row]');
        if (row) row.remove();
        return;
      }
      const pickBtn = e.target.closest('.pkg-pick-media');
      if (pickBtn) {
        attachMediaPicker(pickBtn.getAttribute('data-target'), pickBtn.getAttribute('data-preview'));
      }
    };

    // Live thumbnail update when URL typed manually
    bodyEl.querySelectorAll('input[data-k="imageUrl"], #pkg-map-url').forEach((inp) => {
      inp.addEventListener('change', () => {
        const card = inp.closest('.pkg-media-row');
        const img = card ? card.querySelector('img') : null;
        if (img) img.src = previewUrl(inp.value);
        refreshTabBadges();
      });
    });

    // + Add button bindings
    document.getElementById('pkg-add-sidebar-tier').addEventListener('click', () => {
      const list = document.getElementById('pkg-sidebar-tiers-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-sidebar-tier-row', {}, list.children.length, 'Group Label', 'Price Text'));
    });
    document.getElementById('pkg-facts-list').addEventListener('input', (e) => {
      if (e.target.matches('[data-k="category"]')) {
        const card = e.target.closest('.admin-fact-card');
        const iconHost = card ? card.querySelector('[data-fact-icon]') : null;
        if (iconHost) iconHost.innerHTML = adminFactIconSvg(e.target.value);
      }
    });
    const fill14Btn = document.getElementById('pkg-fill-14-facts');
    if (fill14Btn) {
      fill14Btn.addEventListener('click', () => {
        const list = document.getElementById('pkg-facts-list');
        if (!list) return;
        const curDays = Number(document.getElementById('pkg-days')?.value || 14);
        const curAlt = Number(document.getElementById('pkg-alt')?.value || 0);
        const curDiff = document.getElementById('pkg-diff')?.value || 'MODERATE';
        const curType = document.getElementById('pkg-type')?.value || 'TREK';
        const templateFacts = [
          { category: 'DESTINATION', value: 'Nepal Himalayas', subtitle: 'Curated alpine route' },
          { category: 'TRIP DURATION', value: `${curDays} ${curDays === 1 ? 'Day' : 'Days'}`, subtitle: 'Full arrival-to-departure programme' },
          { category: 'MAXIMUM ALTITUDE', value: curAlt ? `${curAlt.toLocaleString()} m (${Math.round(curAlt * 3.28084).toLocaleString()} ft)` : 'Moderate Altitude', subtitle: 'Highest planned elevation', altitudeM: curAlt || undefined },
          { category: 'TRIP GRADE', value: curDiff, subtitle: 'Daily walking & trail grade' },
          { category: 'TRIP STYLE', value: curType === 'TOUR' ? 'Guided Cultural Tour' : 'Teahouse Trekking', subtitle: 'Private & group joining options' },
          { category: 'ACCOMMODATION', value: 'Hotel & Teahouses', subtitle: 'Twin-sharing clean stays' },
          { category: 'MEAL PLAN', value: 'Breakfast, Lunch & Dinner', subtitle: 'On route + breakfast in KTM' },
          { category: 'DAILY ACTIVITY', value: curType === 'TOUR' ? 'Guided Sightseeing' : '4–7 Hours Walking Daily', subtitle: 'Comfortable acclimatised pace' },
          { category: 'GROUP SIZE', value: '1–12 Travellers', subtitle: 'Small groups or private departure' },
          { category: 'BEST SEASONS', value: 'Spring & Autumn', subtitle: 'Mar–May & Sep–Nov' },
          { category: 'START / END POINT', value: 'Kathmandu, Nepal', subtitle: 'With airport pickup & drop-off' },
          { category: 'TRANSPORTATION', value: 'Private Vehicle / Transfers', subtitle: 'Included per itinerary' },
          { category: 'PERMITS & DOCS', value: 'All Required Permits', subtitle: 'Arranged in Kathmandu' },
          { category: 'GUIDE & TEAM', value: 'Licensed Local Guide', subtitle: 'Experienced Himalayan crew' }
        ];
        const existingCats = new Set(Array.from(list.querySelectorAll('[data-k="category"]')).map((i) => i.value.trim().toLowerCase()));
        let added = 0;
        templateFacts.forEach((f) => {
          if (list.children.length < 14 && !existingCats.has(f.category.toLowerCase())) {
            list.insertAdjacentHTML('beforeend', renderFactRowHtml(f, list.children.length));
            added++;
          }
        });
        refreshTabBadges();
        showToast(added > 0 ? `Added ${added} missing standard trip facts!` : 'Facts list already has up to 14 items.', 'success');
      });
    }
    document.getElementById('pkg-add-fact').addEventListener('click', () => {
      const list = document.getElementById('pkg-facts-list');
      list.insertAdjacentHTML('beforeend', renderFactRowHtml({}, list.children.length));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-highlight').addEventListener('click', () => {
      const list = document.getElementById('pkg-highlights-list');
      list.insertAdjacentHTML('beforeend', renderHighlightRowHtml(''));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-why').addEventListener('click', () => {
      const list = document.getElementById('pkg-why-list');
      list.insertAdjacentHTML('beforeend', renderWhyCardRowHtml({}, list.children.length));
      refreshTabBadges();
    });
    document.getElementById('pkg-days-list').addEventListener('input', (e) => {
      const card = e.target.closest('.admin-itin-card');
      if (card) syncDayCardHeader(card);
    });
    const expandAllDaysBtn = document.getElementById('pkg-itin-expand-all');
    if (expandAllDaysBtn) {
      expandAllDaysBtn.addEventListener('click', () => {
        const cards = Array.from(document.querySelectorAll('#pkg-days-list .admin-itin-card'));
        const allOpen = cards.length > 0 && cards.every((c) => c.classList.contains('is-open'));
        cards.forEach((c) => {
          c.classList.toggle('is-open', !allOpen);
          const hdr = c.querySelector('.admin-itin-header');
          if (hdr) hdr.setAttribute('aria-expanded', !allOpen ? 'true' : 'false');
        });
        expandAllDaysBtn.textContent = !allOpen ? 'Collapse All Days' : 'Expand All Days';
      });
    }
    const renumBtn = document.getElementById('pkg-itin-renumber');
    if (renumBtn) {
      renumBtn.addEventListener('click', () => {
        document.querySelectorAll('#pkg-days-list .admin-itin-card').forEach((c, idx) => {
          const numEl = c.querySelector('[data-k="dayNumber"]');
          if (numEl) numEl.value = String(idx + 1);
          syncDayCardHeader(c);
        });
        showToast('Renumbered itinerary days 1..N in current visual order.', 'success');
      });
    }
    document.getElementById('pkg-add-day').addEventListener('click', () => {
      const list = document.getElementById('pkg-days-list');
      const nextNum = list.querySelectorAll('[data-day-row]').length + 1;
      list.insertAdjacentHTML('beforeend', renderDayRowHtml({ dayNumber: nextNum }, nextNum - 1, true));
      mountCompactEditors(list.lastElementChild);
      refreshTabBadges();
      list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    document.getElementById('pkg-add-inc').addEventListener('click', () => {
      const list = document.getElementById('pkg-inc-list');
      list.insertAdjacentHTML('beforeend', renderIncExcCardHtml('inc', {}));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-exc').addEventListener('click', () => {
      const list = document.getElementById('pkg-exc-list');
      list.insertAdjacentHTML('beforeend', renderIncExcCardHtml('exc', {}));
      refreshTabBadges();
    });
    const fillStdInc = document.getElementById('pkg-fill-std-inc');
    if (fillStdInc) {
      fillStdInc.addEventListener('click', () => {
        const list = document.getElementById('pkg-inc-list');
        if (!list) return;
        const defaults = [
          { title: 'Airport Transfers', text: 'Pickup and drop-off for your arrival and departure in Kathmandu.' },
          { title: 'Kathmandu Hotel Stays', text: '3-star boutique hotel accommodation in Kathmandu with daily breakfast.' },
          { title: 'Mountain Accommodation', text: 'Comfortable twin-sharing teahouse / local lodge stays along the trail.' },
          { title: 'All Meals on Route', text: 'Freshly prepared breakfast, lunch and dinner during all trekking stages.' },
          { title: 'Licensed Guide & Porter Support', text: 'Government-certified English-speaking guide and porter assistance.' },
          { title: 'Required Permits & Entry Fees', text: 'All national park, conservation area, and local municipality permits.' }
        ];
        const existing = new Set(Array.from(list.querySelectorAll('[data-k="a"]')).map((i) => i.value.trim().toLowerCase()));
        let added = 0;
        defaults.forEach((d) => {
          if (!existing.has(d.title.toLowerCase())) {
            list.insertAdjacentHTML('beforeend', renderIncExcCardHtml('inc', d));
            added++;
          }
        });
        refreshTabBadges();
        showToast(added ? `Added ${added} standard inclusion cards.` : 'Standard inclusions already present.', 'success');
      });
    }
    const fillStdExc = document.getElementById('pkg-fill-std-exc');
    if (fillStdExc) {
      fillStdExc.addEventListener('click', () => {
        const list = document.getElementById('pkg-exc-list');
        if (!list) return;
        const defaults = [
          { title: 'International Flights & Nepal Visa', text: 'Round-trip international airfare and Nepal tourist entry visa fee.' },
          { title: 'Travel & Evacuation Insurance', text: 'Personal travel policy covering high-altitude emergency evacuation.' },
          { title: 'Personal Trekking Gear', text: 'Personal boots, clothing, toiletries and accessories beyond loaned items.' },
          { title: 'Teahouse Extras & Gratuities', text: 'Hot showers, Wi-Fi, battery charging, snacks, and guide/porter tips.' }
        ];
        const existing = new Set(Array.from(list.querySelectorAll('[data-k="a"]')).map((i) => i.value.trim().toLowerCase()));
        let added = 0;
        defaults.forEach((d) => {
          if (!existing.has(d.title.toLowerCase())) {
            list.insertAdjacentHTML('beforeend', renderIncExcCardHtml('exc', d));
            added++;
          }
        });
        refreshTabBadges();
        showToast(added ? `Added ${added} standard exclusion cards.` : 'Standard exclusions already present.', 'success');
      });
    }
    document.getElementById('pkg-tiers-list').addEventListener('input', (e) => {
      if (e.target.matches('[data-k="note"]')) {
        const card = e.target.closest('.admin-tier-card');
        if (card) card.classList.toggle('best-value', /best/i.test(e.target.value));
      }
    });
    const fill4TiersBtn = document.getElementById('pkg-fill-4-tiers');
    if (fill4TiersBtn) {
      fill4TiersBtn.addEventListener('click', () => {
        const list = document.getElementById('pkg-tiers-list');
        if (!list) return;
        const curPrice = Number(document.getElementById('pkg-price')?.value || 995);
        list.innerHTML = [
          { label: '1 Person (Solo)', price: `USD ${Math.round(curPrice * 1.15).toLocaleString()}`, note: 'Private Support' },
          { label: '2–4 People', price: `USD ${curPrice.toLocaleString()}`, note: 'Small Group' },
          { label: '5–7 People', price: `USD ${Math.round(curPrice * 0.92).toLocaleString()}`, note: 'Best Value', highlight: true },
          { label: '8+ People', price: 'Quote', note: 'Request Quote' }
        ].map((t, i) => renderTierRowHtml(t, i)).join('');
        refreshTabBadges();
        showToast('Populated 4 group size pricing cards.', 'success');
      });
    }
    document.getElementById('pkg-add-tier').addEventListener('click', () => {
      const list = document.getElementById('pkg-tiers-list');
      list.insertAdjacentHTML('beforeend', renderTierRowHtml({}, list.children.length));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-trow').addEventListener('click', () => {
      const list = document.getElementById('pkg-trows-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-trow-row', {}, list.children.length, 'Booking Category', 'Price / Quotation Status'));
    });

    document.getElementById('pkg-deps-list').addEventListener('input', (e) => {
      const row = e.target.closest('.admin-dep-row');
      if (!row) return;
      if (e.target.matches('[data-k="month"]')) {
        const m = e.target.value.trim().toUpperCase().slice(0, 3) || 'MON';
        row.setAttribute('data-month', m);
        const badgeMon = row.querySelector('[data-dep-badge-mon]');
        if (badgeMon) badgeMon.textContent = m;
      }
      if (e.target.matches('[data-k="day"]')) {
        const badgeDay = row.querySelector('[data-dep-badge-day]');
        if (badgeDay) badgeDay.textContent = e.target.value.trim().padStart(2, '0') || '--';
      }
    });
    const depMonthTabs = document.getElementById('pkg-dep-month-tabs');
    if (depMonthTabs) {
      depMonthTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-dep-filter]');
        if (!btn) return;
        const targetMonth = btn.getAttribute('data-dep-filter');
        depMonthTabs.querySelectorAll('[data-dep-filter]').forEach((b) => b.classList.toggle('active', b === btn));
        document.querySelectorAll('#pkg-deps-list .admin-dep-row').forEach((row) => {
          const rm = String(row.getAttribute('data-month') || '').toUpperCase();
          row.style.display = (targetMonth === 'ALL' || rm === targetMonth) ? 'flex' : 'none';
        });
      });
    }
    const fill2026DepsBtn = document.getElementById('pkg-fill-2026-deps');
    if (fill2026DepsBtn) {
      fill2026DepsBtn.addEventListener('click', () => {
        const list = document.getElementById('pkg-deps-list');
        if (!list) return;
        const curPrice = Number(document.getElementById('pkg-price')?.value || 995);
        const curDays = Number(document.getElementById('pkg-days')?.value || 10);
        const seeds = [
          { month: 'AUG', day: '09', sMonth: 7, sDay: 9, status: 'AVAILABLE' },
          { month: 'SEP', day: '05', sMonth: 8, sDay: 5, status: 'GUARANTEED' },
          { month: 'OCT', day: '04', sMonth: 9, sDay: 4, status: 'GUARANTEED' },
          { month: 'OCT', day: '18', sMonth: 9, sDay: 18, status: 'AVAILABLE' },
          { month: 'NOV', day: '02', sMonth: 10, sDay: 2, status: 'AVAILABLE' },
          { month: 'DEC', day: '05', sMonth: 11, sDay: 5, status: 'AVAILABLE' }
        ];
        const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const existingTitles = new Set(Array.from(list.querySelectorAll('[data-k="title"]')).map((i) => i.value.trim().toLowerCase()));
        let added = 0;
        seeds.forEach((sd) => {
          const endDt = new Date(2026, sd.sMonth, sd.sDay + Math.max(0, curDays - 1));
          const title = `${mNames[sd.sMonth]} ${sd.sDay} – ${mNames[endDt.getMonth()]} ${endDt.getDate()}, ${endDt.getFullYear()}`;
          if (!existingTitles.has(title.toLowerCase())) {
            list.insertAdjacentHTML('beforeend', renderDepartureRowHtml({
              month: sd.month,
              day: sd.day,
              title,
              status: sd.status,
              price: `$${curPrice.toLocaleString()} pp`
            }, list.children.length));
            added++;
          }
        });
        refreshTabBadges();
        showToast(added ? `Added ${added} 2026 seasonal departures (${curDays}-day window).` : 'Standard departures already present.', 'success');
      });
    }
    document.getElementById('pkg-add-dep').addEventListener('click', () => {
      const list = document.getElementById('pkg-deps-list');
      list.insertAdjacentHTML('beforeend', renderDepartureRowHtml({}, list.children.length));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-pack-cat').addEventListener('click', () => {
      const list = document.getElementById('pkg-pack-cats-list');
      list.insertAdjacentHTML('beforeend', renderPackingCategoryHtml({ items: [{}] }, list.children.length));
      refreshTabBadges();
    });
    document.getElementById('pkg-add-detail').addEventListener('click', () => {
      const list = document.getElementById('pkg-details-list');
      list.insertAdjacentHTML('beforeend', renderDetailTopicHtml({}, list.children.length));
      mountCompactEditors(list.lastElementChild);
    });
    document.getElementById('pkg-add-alt-row').addEventListener('click', () => {
      document.getElementById('pkg-alt-table-list').insertAdjacentHTML('beforeend', renderAltTableRowHtml({}));
    });
    document.getElementById('pkg-add-hp').addEventListener('click', () => {
      const list = document.getElementById('pkg-hp-list');
      list.insertAdjacentHTML('beforeend', renderHigherPlaceRowHtml({}, list.children.length));
    });
    document.getElementById('pkg-add-scard').addEventListener('click', () => {
      const list = document.getElementById('pkg-scards-list');
      list.insertAdjacentHTML('beforeend', renderSeasonCardHtml({}, list.children.length));
    });
    document.getElementById('pkg-add-wrow').addEventListener('click', () => {
      document.getElementById('pkg-wtable-list').insertAdjacentHTML('beforeend', renderSeasonalTableRowHtml({}));
    });
    document.getElementById('pkg-add-faq').addEventListener('click', () => {
      const list = document.getElementById('pkg-faqs-list');
      list.insertAdjacentHTML('beforeend', renderFaqRowHtml({}, list.children.length, tagsMeta.faqCategories));
      mountCompactEditors(list.lastElementChild);
    });

    const closePkgModal = () => {
      if (modalPanel) modalPanel.classList.remove('modal-panel-xl');
      modal.classList.add('hidden');
    };
    document.getElementById('pkg-cancel-btn').addEventListener('click', closePkgModal);
    const headerClose = document.getElementById('close-phase2-modal');
    if (headerClose) headerClose.addEventListener('click', () => {
      if (modalPanel) modalPanel.classList.remove('modal-panel-xl');
    }, { once: true });

    document.getElementById('pkg-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('pkg-form-err');
      errEl.classList.add('hidden');

      const saveBtn = document.getElementById('pkg-save-btn');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      try {
        const getVal = (id) => (document.getElementById(id) ? document.getElementById(id).value : '');
        const readPairs = (selector, kA, kB) => Array.from(bodyEl.querySelectorAll(selector)).map((el) => ({
          [kA]: el.querySelector('[data-k="a"]').value.trim(),
          [kB]: el.querySelector('[data-k="b"]').value.trim()
        })).filter((item) => item[kA] || item[kB]);

        const galleriesPayload = Array.from(bodyEl.querySelectorAll('[data-hero-slot]')).map((card) => ({
          slot: card.getAttribute('data-hero-slot'),
          sortOrder: Number(card.getAttribute('data-sort') || 0),
          imageUrl: card.querySelector('[data-k="imageUrl"]').value.trim(),
          altText: card.querySelector('[data-k="altText"]').value.trim() || null
        })).filter((g) => g.imageUrl);

        const tripFactsPayload = Array.from(bodyEl.querySelectorAll('[data-fact-row]')).map((el) => {
          const altRaw = el.querySelector('[data-k="altitudeM"]')?.value;
          const item = {
            category: el.querySelector('[data-k="category"]').value.trim(),
            value: el.querySelector('[data-k="value"]').value.trim(),
            subtitle: el.querySelector('[data-k="subtitle"]').value.trim()
          };
          if (altRaw !== undefined && altRaw !== '' && Number.isFinite(Number(altRaw))) {
            item.altitudeM = Number(altRaw);
          }
          return item;
        }).filter((f) => f.category || f.value);

        const highlightsPayload = Array.from(bodyEl.querySelectorAll('[data-highlight-row]')).map((el) =>
          el.querySelector('[data-k="text"]').value.trim()
        ).filter(Boolean);

        const itineraryPayload = Array.from(bodyEl.querySelectorAll('[data-day-row]')).map((el, idx) => {
          const dNum = Number(el.querySelector('[data-k="dayNumber"]').value) || idx + 1;
          const altRaw = el.querySelector('[data-k="altitudeM"]').value;
          return {
            dayNumber: dNum,
            title: el.querySelector('[data-k="title"]').value.trim(),
            subtitle: el.querySelector('[data-k="subtitle"]').value.trim() || null,
            altitudeM: altRaw === '' ? null : Number(altRaw),
            routeSummary: el.querySelector('[data-k="routeSummary"]').value.trim() || null,
            activityType: el.querySelector('[data-k="activityType"]').value.trim() || null,
            durationHours: el.querySelector('[data-k="durationHours"]').value.trim() || null,
            distanceKm: el.querySelector('[data-k="distanceKm"]').value.trim() || null,
            accommodation: el.querySelector('[data-k="accommodation"]').value.trim() || null,
            meals: el.querySelector('[data-k="meals"]').value.trim() || null,
            descriptionHtml: getRichEditorHtml(el.querySelector('[data-k="descriptionHtml"]')).trim() || null
          };
        }).filter((d) => d.title);

        const inclusionsPayload = readPairs('[data-inc-row]', 'title', 'text');
        const exclusionsPayload = readPairs('[data-exc-row]', 'title', 'text');

        const sidebarTiersPayload = readPairs('[data-sidebar-tier-row]', 'label', 'price');
        const sidebarBulletsPayload = getVal('pkg-sidebar-bullets').split('\n').map((s) => s.trim()).filter(Boolean);
        const tiersPayload = Array.from(bodyEl.querySelectorAll('[data-tier-row]')).map((el) => ({
          label: el.querySelector('[data-k="label"]').value.trim(),
          price: el.querySelector('[data-k="price"]').value.trim(),
          note: el.querySelector('[data-k="note"]').value.trim()
        })).filter((t) => t.label || t.price);
        const tableRowsPayload = readPairs('[data-trow-row]', 'category', 'status').map((r) => ({ ...r, action: 'Inquire' }));

        const departuresPayload = Array.from(bodyEl.querySelectorAll('[data-dep-row]')).map((el) => ({
          month: el.querySelector('[data-k="month"]').value.trim(),
          day: el.querySelector('[data-k="day"]').value.trim(),
          title: el.querySelector('[data-k="title"]').value.trim(),
          status: el.querySelector('[data-k="status"]').value.trim() || 'AVAILABLE',
          price: el.querySelector('[data-k="price"]').value.trim()
        })).filter((d) => d.title);

        const packingCatsPayload = Array.from(bodyEl.querySelectorAll('[data-pack-cat]')).map((catEl) => ({
          title: catEl.querySelector('[data-k="title"]').value.trim(),
          items: Array.from(catEl.querySelectorAll('[data-pack-item]')).map((itEl) => ({
            label: itEl.querySelector('[data-k="label"]').value.trim(),
            desc: itEl.querySelector('[data-k="desc"]').value.trim(),
            qty: itEl.querySelector('[data-k="qty"]').value.trim()
          })).filter((it) => it.label)
        })).filter((c) => c.title || c.items.length > 0);

        const readBeforePayload = {
          title: getVal('pkg-rb-title').trim() || null,
          subtitle: getVal('pkg-rb-sub').trim() || null,
          secondarySubtitle: getVal('pkg-rb-sub2').trim() || null,
          items: Array.from(bodyEl.querySelectorAll('[data-detail-row]')).map((el, idx) => ({
            id: el.querySelector('[data-k="id"]').value.trim() || `topic-${idx + 1}`,
            title: el.querySelector('[data-k="title"]').value.trim(),
            contentHtml: getRichEditorHtml(el.querySelector('[data-k="contentHtml"]')).trim()
          })).filter((t) => t.title)
        };

        const altitudePayload = {
          ...(altObj || {}),
          sectionTitle: getVal('pkg-alt-title').trim() || null,
          intro: getVal('pkg-alt-intro').trim() || null,
          overnightTable: Array.from(bodyEl.querySelectorAll('[data-alt-row]')).map((el) => ({
            day: el.querySelector('[data-k="day"]').value.trim(),
            stop: el.querySelector('[data-k="stop"]').value.trim(),
            altitude: el.querySelector('[data-k="altitude"]').value.trim()
          })).filter((r) => r.day || r.stop),
          higherPlaces: Array.from(bodyEl.querySelectorAll('[data-hp-row]')).map((el) => ({
            tag: el.querySelector('[data-k="tag"]').value.trim(),
            title: el.querySelector('[data-k="title"]').value.trim(),
            altitude: el.querySelector('[data-k="altitude"]').value.trim(),
            desc: el.querySelector('[data-k="desc"]').value.trim(),
            featureTag: el.querySelector('[data-k="featureTag"]').value.trim()
          })).filter((hp) => hp.title)
        };

        const weatherPayload = {
          ...(weatherObj || {}),
          sectionTitle: getVal('pkg-w-title').trim() || null,
          intro: getVal('pkg-w-intro').trim() || null,
          seasonCards: Array.from(bodyEl.querySelectorAll('[data-season-card]')).map((el) => ({
            tag: el.querySelector('[data-k="tag"]').value.trim(),
            season: el.querySelector('[data-k="season"]').value.trim(),
            rangeDesc: el.querySelector('[data-k="rangeDesc"]').value.trim()
          })).filter((sc) => sc.season),
          seasonalTable: Array.from(bodyEl.querySelectorAll('[data-wtable-row]')).map((el) => ({
            season: el.querySelector('[data-k="season"]').value.trim(),
            months: el.querySelector('[data-k="months"]').value.trim(),
            expect: el.querySelector('[data-k="expect"]').value.trim()
          })).filter((r) => r.season),
          routeChangeTitle: getVal('pkg-w-rctitle').trim() || null,
          routeChangeText: getVal('pkg-w-rctext').trim() || null,
          bestSeasonTitle: getVal('pkg-w-bstitle').trim() || null,
          bestSeasonText: getVal('pkg-w-bstext').trim() || null
        };

        const faqsPayload = Array.from(bodyEl.querySelectorAll('[data-faq-row]')).map((el, idx) => ({
          category: el.querySelector('[data-k="category"]').value,
          question: el.querySelector('[data-k="question"]').value.trim(),
          answerHtml: getRichEditorHtml(el.querySelector('[data-k="answerHtml"]')).trim(),
          sortOrder: idx
        })).filter((f) => f.question && f.answerHtml);

        const recIds = Array.from(bodyEl.querySelectorAll('#pkg-recs-grid input:checked')).map((cb) => Number(cb.value)).slice(0, 4);

        const routeMapUrlVal = getVal('pkg-map-url').trim();
        const overviewVal = overviewEditorHost ? getRichEditorHtml(overviewEditorHost).trim() : getVal('pkg-overview-html').trim();

        const payload = {
          title: getVal('pkg-title').trim(),
          slug: getVal('pkg-slug').trim(),
          trekKey: getVal('pkg-key').trim(),
          type: getVal('pkg-type'),
          difficulty: getVal('pkg-diff'),
          durationDays: Number(getVal('pkg-days')),
          maxAltitudeM: getVal('pkg-alt') ? Number(getVal('pkg-alt')) : null,
          startingPriceUsd: Number(getVal('pkg-price')),
          destinationId: getVal('pkg-dest') ? Number(getVal('pkg-dest')) : null,
          categoryId: getVal('pkg-cat') ? Number(getVal('pkg-cat')) : null,
          status: getVal('pkg-status'),
          isFeatured: document.getElementById('pkg-featured').checked,
          heroSummary: getVal('pkg-summary').trim() || null,
          overviewHtml: overviewVal || null,
          tripFactsJson: tripFactsPayload,
          highlightsJson: highlightsPayload,
          inclusionsJson: inclusionsPayload,
          exclusionsJson: exclusionsPayload,
          groupPricingJson: {
            intro: getVal('pkg-gp-intro').trim() || null,
            tiers: tiersPayload,
            tableRows: tableRowsPayload,
            sidebarTiers: sidebarTiersPayload,
            sidebarBullets: sidebarBulletsPayload
          },
          departureDatesJson: departuresPayload,
          packingListJson: {
            intro: getVal('pkg-pack-intro').trim() || null,
            bannerTitle: getVal('pkg-pack-banner-title').trim() || null,
            bannerDesc: getVal('pkg-pack-banner-desc').trim() || null,
            concludingNote: getVal('pkg-pack-note').trim() || null,
            categories: packingCatsPayload
          },
          readBeforeBookJson: readBeforePayload,
          altitudeProfileJson: altitudePayload,
          weatherProfileJson: weatherPayload,
          routeMapUrl: routeMapUrlVal || null,
          tagsJson: {
            sidebarBadge: getVal('pkg-sidebar-badge').trim() || 'BEST SELLER',
            itineraryIntro: getVal('pkg-itin-intro').trim() || null,
            expertCta: {
              title: getVal('pkg-exp-title').trim() || null,
              subtitle: getVal('pkg-exp-sub').trim() || null,
              status: getVal('pkg-exp-status').trim() || null
            },
            whyBookTitle: getVal('pkg-why-title').trim() || null,
            whyBookIntro: getVal('pkg-why-intro').trim() || null,
            whyBookCards: readPairs('[data-why-row]', 'title', 'desc'),
            bookingBanner: {
              title: getVal('pkg-book-title').trim() || null,
              body: getVal('pkg-book-body').trim() || null
            },
            bottomCta: {
              badge: getVal('pkg-cta-badge').trim() || null,
              title: getVal('pkg-cta-title').trim() || null,
              body: getVal('pkg-cta-body').trim() || null
            },
            routeMap: {
              title: getVal('pkg-map-title').trim() || null,
              subtitle: getVal('pkg-map-sub').trim() || null,
              imageUrl: routeMapUrlVal || null
            },
            faqCategories: tagsMeta.faqCategories
          },
          galleries: galleriesPayload,
          itineraryDays: itineraryPayload,
          faqs: faqsPayload,
          recommendedPackageIds: recIds,
          seo: {
            metaTitle: getVal('pkg-seo-title').trim() || undefined,
            metaDescription: getVal('pkg-seo-desc').trim() || null,
            canonicalUrl: getVal('pkg-seo-canon').trim() || null,
            keywords: getVal('pkg-seo-kw').trim() || null
          }
        };

        let result;
        if (pkg) {
          result = await apiRequest(`/admin/packages/${pkg.id}`, { method: 'PATCH', body: payload });
        } else {
          result = await apiRequest('/admin/packages', { method: 'POST', body: payload });
        }

        state.options = await apiRequest('/admin/packages/options').catch(() => state.options);
        closePkgModal();
        await draw();
        if (result.publishedRoute) {
          showToast(`Saved & synced live page ${result.publishedRoute}`, 'success', { href: result.publishedRoute, label: 'View Live Page ↗' });
        } else if (result.publishWarning) {
          showToast(`Package saved, but HTML sync notice: ${result.publishWarning}`, 'error');
        } else {
          showToast('Package saved successfully', 'success');
        }
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save & Sync Package';
      }
    });

    const delBtn = document.getElementById('pkg-delete-btn');
    if (delBtn && pkg) {
      delBtn.addEventListener('click', async () => {
        if (!confirm(`Delete "${pkg.title}"?`)) return;
        await apiRequest(`/admin/packages/${pkg.id}`, { method: 'DELETE' });
        closePkgModal();
        showToast(`Deleted "${pkg.title}"`, 'success');
        await draw();
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading trekking &amp; tour packages...</div>';
    try {
      const result = await loadPackages();
      const { packages } = result.data;
      const meta = result.meta;

      container.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <h3>Trekking &amp; Tour Packages (${meta.total})</h3>
            <div class="toolbar-row">
              <input id="pkg-search" type="search" placeholder="Search title or slug..." value="${escapeHtml(state.q)}">
              <select id="pkg-type-filter">
                <option value="">All Types</option>
                <option value="TREK" ${state.type === 'TREK' ? 'selected' : ''}>Trek</option>
                <option value="TOUR" ${state.type === 'TOUR' ? 'selected' : ''}>Tour</option>
                <option value="PEAK_CLIMB" ${state.type === 'PEAK_CLIMB' ? 'selected' : ''}>Peak Climb</option>
              </select>
              <select id="pkg-status-filter">
                <option value="">All Statuses</option>
                ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${state.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
              ${canWrite ? '<button id="pkg-new-btn" type="button" class="btn btn-primary btn-sm">+ New Package</button>' : ''}
            </div>
          </div>

          <div class="table-wrap">
            ${packages.length === 0
              ? '<p class="metric-sub">No packages found. Run <code>node scripts/import_existing_content.js</code> or click "+ New Package".</p>'
              : `<table>
                  <thead><tr><th>Title / Slug</th><th>Region</th><th>Days / Alt</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    ${packages.map((p) => `
                      <tr>
                        <td><strong>${escapeHtml(p.title)}</strong><br><small>/${p.type === 'TOUR' ? 'tour' : 'trek'}/${escapeHtml(p.slug)} (${p._count.itineraryDays} days, ${p._count.faqs} FAQs)</small></td>
                        <td>${escapeHtml(p.destination ? p.destination.name : '-')}</td>
                        <td>${p.durationDays}d ${p.maxAltitudeM ? `&bull; ${p.maxAltitudeM}m` : ''}</td>
                        <td>$${Number(p.startingPriceUsd).toLocaleString()}</td>
                        <td><span class="status-pill ${p.status === 'PUBLISHED' ? 'status-active' : 'status-warn'}">${escapeHtml(p.status)}</span></td>
                        <td style="display:flex; gap:6px; flex-wrap:wrap;">
                          ${canWrite ? `<button type="button" class="btn btn-outline btn-sm pkg-edit-btn" data-id="${p.id}">Edit</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-outline btn-sm pkg-pub-btn" data-id="${p.id}">${p.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-primary btn-sm pkg-html-btn" data-id="${p.id}">Render HTML</button>` : ''}
                          ${p.status === 'PUBLISHED' ? `<a href="/${p.type === 'TOUR' ? 'tour' : 'trek'}/${escapeHtml(p.slug)}/" target="_blank" rel="noopener" class="btn btn-outline btn-sm">View &#8599;</a>` : ''}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>

          <div class="pagination-row">
            <span class="metric-sub">Page ${meta.page} of ${meta.totalPages}</span>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" id="pkg-prev" ${meta.page <= 1 ? 'disabled' : ''}>Previous</button>
              <button type="button" class="btn btn-outline btn-sm" id="pkg-next" ${meta.page >= meta.totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;

      const newBtn = document.getElementById('pkg-new-btn');
      if (newBtn) newBtn.addEventListener('click', () => openPackageModal(null));
      document.getElementById('pkg-type-filter').addEventListener('change', (e) => { state.type = e.target.value; state.page = 1; draw(); });
      document.getElementById('pkg-status-filter').addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; draw(); });
      const searchEl = document.getElementById('pkg-search');
      let searchTimer = null;
      searchEl.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          state.q = searchEl.value.trim();
          state.page = 1;
          draw();
        }, 320);
      });
      searchEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(searchTimer); state.q = searchEl.value.trim(); state.page = 1; draw(); } });
      document.getElementById('pkg-prev').addEventListener('click', () => { if (state.page > 1) { state.page--; draw(); } });
      document.getElementById('pkg-next').addEventListener('click', () => { if (state.page < meta.totalPages) { state.page++; draw(); } });
      container.querySelectorAll('.pkg-edit-btn').forEach((b) => b.addEventListener('click', () => openPackageModal(Number(b.getAttribute('data-id')))));
      container.querySelectorAll('.pkg-pub-btn').forEach((b) => b.addEventListener('click', async () => {
        await apiRequest(`/admin/packages/${b.getAttribute('data-id')}/publish`, { method: 'POST' });
        draw();
      }));
      container.querySelectorAll('.pkg-html-btn').forEach((b) => b.addEventListener('click', async () => {
        b.disabled = true;
        b.textContent = 'Publishing...';
        try {
          const res = await apiRequest(`/admin/publish/package/${b.getAttribute('data-id')}`, { method: 'POST' });
          showToast(`Published ${res.route} successfully`, 'success', { href: res.route, label: 'View Page ↗' });
        } catch (err) {
          showToast(err.message, 'error');
        } finally {
          b.disabled = false;
          b.textContent = 'Render HTML';
        }
      }));
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
