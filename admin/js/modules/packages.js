import { apiRequest, showToast } from '../api.js';
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
      whyBookTitle: t.whyBookTitle || '',
      whyBookCards: normalizeArray(t.whyBookCards),
      bookingBanner: t.bookingBanner || { title: '', body: '' },
      bottomCta: t.bottomCta || { badge: '', title: '', body: '' },
      routeMap: t.routeMap || { title: '', subtitle: '', imageUrl: '' },
      faqCategories: normalizeArray(t.faqCategories)
    };
  }
  return {
    whyBookTitle: '',
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
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error((json.error && json.error.message) || 'Failed to load packages.');
    return json;
  }

  function renderFactRowHtml(f = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-fact-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Fact #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Category Tag</label><input type="text" data-k="category" value="${escapeHtml(f.category || '')}" placeholder="DURATION"></div>
          <div class="form-field"><label>Headline Value</label><input type="text" data-k="value" value="${escapeHtml(f.value || '')}" placeholder="14 Days"></div>
          <div class="form-field"><label>Subtitle</label><input type="text" data-k="subtitle" value="${escapeHtml(f.subtitle || '')}"></div>
        </div>
      </div>`;
  }

  function renderHighlightRowHtml(text = '', idx = 0) {
    return `
      <div class="pkg-repeater-card" data-highlight-row style="display:flex; gap:8px; align-items:center;">
        <span class="pkg-repeater-title" style="min-width:26px;">#${idx + 1}</span>
        <input type="text" data-k="text" value="${escapeHtml(text)}" style="flex:1; min-width:0; padding:8px 10px; border:1px solid #CBD5E1; border-radius:6px;" placeholder="Enter highlight statement...">
        <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
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

  function renderDayRowHtml(d = {}, idx = 0) {
    const dayNum = d.dayNumber || idx + 1;
    return `
      <div class="pkg-repeater-card" data-day-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Day ${dayNum}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove Day</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Day #</label><input type="number" data-k="dayNumber" min="1" value="${escapeHtml(dayNum)}"></div>
          <div class="form-field"><label>Title *</label><input type="text" data-k="title" value="${escapeHtml(d.title || '')}" required></div>
          <div class="form-field"><label>Max Altitude (m)</label><input type="number" data-k="altitudeM" min="0" value="${escapeHtml(d.altitudeM ?? '')}"></div>
        </div>
        <div class="form-row-2" style="margin-top:8px;">
          <div class="form-field"><label>Subtitle</label><input type="text" data-k="subtitle" value="${escapeHtml(d.subtitle || '')}"></div>
          <div class="form-field"><label>Route Summary</label><input type="text" data-k="routeSummary" value="${escapeHtml(d.routeSummary || '')}"></div>
        </div>
        <div class="form-row-3" style="margin-top:8px;">
          <div class="form-field"><label>Main Activity</label><input type="text" data-k="activityType" value="${escapeHtml(d.activityType || '')}"></div>
          <div class="form-field"><label>Duration / Time</label><input type="text" data-k="durationHours" value="${escapeHtml(d.durationHours || '')}"></div>
          <div class="form-field"><label>Distance</label><input type="text" data-k="distanceKm" value="${escapeHtml(d.distanceKm || '')}"></div>
        </div>
        <div class="form-row-2" style="margin-top:8px;">
          <div class="form-field"><label>Accommodation / Transport</label><input type="text" data-k="accommodation" value="${escapeHtml(d.accommodation || '')}"></div>
          <div class="form-field"><label>Meals</label><input type="text" data-k="meals" value="${escapeHtml(d.meals || '')}"></div>
        </div>
        <div class="form-field" style="margin-top:8px;"><label>Day Description</label><div class="pkg-rte-host" data-k="descriptionHtml" data-rte-compact="1" data-initial-html="${escapeHtml(d.descriptionHtml || '')}"></div></div>
      </div>`;
  }

  function renderTierRowHtml(t = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-tier-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Tier #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Group Label</label><input type="text" data-k="label" value="${escapeHtml(t.label || '')}" placeholder="2–4 People"></div>
          <div class="form-field"><label>Price</label><input type="text" data-k="price" value="${escapeHtml(t.price || '')}" placeholder="USD 1,405"></div>
          <div class="form-field"><label>Badge / Note</label><input type="text" data-k="note" value="${escapeHtml(t.note || '')}" placeholder="Small Group"></div>
        </div>
      </div>`;
  }

  function renderDepartureRowHtml(dep = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-dep-row>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Departure #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove</button>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Month</label><input type="text" data-k="month" value="${escapeHtml(dep.month || '')}" placeholder="OCT"></div>
          <div class="form-field"><label>Day</label><input type="text" data-k="day" value="${escapeHtml(dep.day || '')}" placeholder="12"></div>
          <div class="form-field"><label>Date Range Title</label><input type="text" data-k="title" value="${escapeHtml(dep.title || '')}" placeholder="Oct 12 – Oct 25, 2026"></div>
        </div>
        <div class="form-row-2" style="margin-top:8px;">
          <div class="form-field"><label>Availability Status</label><input type="text" data-k="status" value="${escapeHtml(dep.status || 'AVAILABLE')}"></div>
          <div class="form-field"><label>Price Label</label><input type="text" data-k="price" value="${escapeHtml(dep.price || '')}" placeholder="$1,499 pp"></div>
        </div>
      </div>`;
  }

  function renderPackingItemHtml(item = {}) {
    return `
      <div data-pack-item style="display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 110px auto; gap:8px; align-items:center; margin-top:6px;">
        <input type="text" data-k="label" value="${escapeHtml(item.label || '')}" placeholder="Gear name" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="desc" value="${escapeHtml(item.desc || '')}" placeholder="Description / usage" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <input type="text" data-k="qty" value="${escapeHtml(item.qty || '')}" placeholder="Qty (e.g. 1 pc)" style="padding:7px 9px; border:1px solid #CBD5E1; border-radius:6px;">
        <button type="button" class="btn btn-outline btn-sm pkg-remove-pack-item">&times;</button>
      </div>`;
  }

  function renderPackingCategoryHtml(cat = {}, idx = 0) {
    const items = normalizeArray(cat.items);
    return `
      <div class="pkg-repeater-card" data-pack-cat>
        <div class="pkg-repeater-head">
          <div class="form-field" style="flex:1;"><label>Category #${idx + 1} Title</label><input type="text" data-k="title" value="${escapeHtml(cat.title || '')}" placeholder="Hiking Gear"></div>
          <div style="display:flex; gap:6px; align-self:flex-end;">
            <button type="button" class="btn btn-outline btn-sm pkg-add-pack-item">+ Add Item</button>
            <button type="button" class="btn btn-outline btn-sm pkg-remove-row">Remove Category</button>
          </div>
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

    titleEl.textContent = pkg ? `Edit Package — ${pkg.title}` : 'New Trekking / Tour Package';

    bodyEl.innerHTML = `
      <form id="pkg-form" class="stack-form">
        <div class="pkg-editor-tabs" role="tablist">
          <button type="button" class="pkg-tab-btn active" data-tab="basic">Basic &amp; Sidebar</button>
          <button type="button" class="pkg-tab-btn" data-tab="hero">Hero &amp; Gallery</button>
          <button type="button" class="pkg-tab-btn" data-tab="overview">Trip Facts &amp; Overview</button>
          <button type="button" class="pkg-tab-btn" data-tab="itinerary">Itinerary (${itineraryDays.length})</button>
          <button type="button" class="pkg-tab-btn" data-tab="includes">Includes &amp; Excludes</button>
          <button type="button" class="pkg-tab-btn" data-tab="packing">Prices, Dates &amp; Packing</button>
          <button type="button" class="pkg-tab-btn" data-tab="details">Before Book, Altitude &amp; Weather</button>
          <button type="button" class="pkg-tab-btn" data-tab="faqs">FAQs (${faqs.length}), Recs &amp; SEO</button>
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
                ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${pkg && pkg.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-field">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="pkg-featured" type="checkbox" ${pkg && pkg.isFeatured ? 'checked' : ''} style="width:auto;"> Feature on Homepage / Highlights
            </label>
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

        <!-- TAB 3: Trip Facts & Overview -->
        <div class="pkg-tab-pane" data-pane="overview">
          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Key Trip Facts (14 Fact Grid Items)</h4>
              <button type="button" id="pkg-add-fact" class="btn btn-outline btn-sm">+ Add Fact</button>
            </div>
            <div id="pkg-facts-list" class="pkg-repeater-list">
              ${tripFacts.map((f, i) => renderFactRowHtml(f, i)).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Trip Highlights (${highlights.length})</h4>
              <button type="button" id="pkg-add-highlight" class="btn btn-outline btn-sm">+ Add Highlight</button>
            </div>
            <div id="pkg-highlights-list" class="pkg-repeater-list">
              ${highlights.map((h, i) => renderHighlightRowHtml(h, i)).join('')}
            </div>
          </div>

          <div class="pkg-section-box" style="background:#FFFFFF;">
            <div id="pkg-overview-editor"></div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Why Book With Us Cards</h4>
              <button type="button" id="pkg-add-why" class="btn btn-outline btn-sm">+ Add Card</button>
            </div>
            <div class="form-field" style="margin-bottom:8px;"><label>Why Book Section Title</label><input id="pkg-why-title" type="text" value="${escapeHtml(tagsMeta.whyBookTitle || '')}"></div>
            <div id="pkg-why-list" class="pkg-repeater-list">
              ${tagsMeta.whyBookCards.map((w, i) => renderSimplePairHtml('data-why-row', w, i, 'Card Title', 'Card Copy')).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 4: Itinerary Days -->
        <div class="pkg-tab-pane" data-pane="itinerary">
          <div class="pkg-section-head">
            <h4>Day-by-Day Itinerary Builder</h4>
            <button type="button" id="pkg-add-day" class="btn btn-primary btn-sm">+ Add Day</button>
          </div>
          <div id="pkg-days-list" class="pkg-repeater-list">
            ${itineraryDays.map((d, i) => renderDayRowHtml(d, i)).join('')}
          </div>
        </div>

        <!-- TAB 5: Includes & Excludes -->
        <div class="pkg-tab-pane" data-pane="includes">
          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>What's Included Cards (${inclusions.length})</h4>
              <button type="button" id="pkg-add-inc" class="btn btn-outline btn-sm">+ Add Inclusion</button>
            </div>
            <div id="pkg-inc-list" class="pkg-repeater-list">
              ${inclusions.map((item, i) => renderSimplePairHtml('data-inc-row', item, i, 'Inclusion Title', 'Inclusion Details')).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>What's Excluded Cards (${exclusions.length})</h4>
              <button type="button" id="pkg-add-exc" class="btn btn-outline btn-sm">+ Add Exclusion</button>
            </div>
            <div id="pkg-exc-list" class="pkg-repeater-list">
              ${exclusions.map((item, i) => renderSimplePairHtml('data-exc-row', item, i, 'Exclusion Title', 'Exclusion Details')).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 6: Prices, Dates & Packing -->
        <div class="pkg-tab-pane" data-pane="packing">
          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Section 4 — Group Size Pricing Cards</h4>
              <button type="button" id="pkg-add-tier" class="btn btn-outline btn-sm">+ Add Price Tier</button>
            </div>
            <div class="form-field" style="margin-bottom:8px;"><label>Dates &amp; Prices Intro</label><textarea id="pkg-gp-intro" rows="2">${escapeHtml(pricing.intro)}</textarea></div>
            <div id="pkg-tiers-list" class="pkg-repeater-list">
              ${pricing.tiers.map((t, i) => renderTierRowHtml(t, i)).join('')}
            </div>
            <div class="pkg-section-head" style="margin-top:12px;">
              <h4>Booking Table Rows (for quote-only / city tour tables)</h4>
              <button type="button" id="pkg-add-trow" class="btn btn-outline btn-sm">+ Add Row</button>
            </div>
            <div id="pkg-trows-list" class="pkg-repeater-list">
              ${pricing.tableRows.map((r, i) => renderSimplePairHtml('data-trow-row', r, i, 'Booking Category', 'Price / Quotation Status')).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Group Departure Dates (${departures.length})</h4>
              <button type="button" id="pkg-add-dep" class="btn btn-outline btn-sm">+ Add Departure</button>
            </div>
            <div id="pkg-deps-list" class="pkg-repeater-list">
              ${departures.map((d, i) => renderDepartureRowHtml(d, i)).join('')}
            </div>
          </div>

          <div class="pkg-section-box">
            <div class="pkg-section-head">
              <h4>Section 5 — Packing &amp; Equipment Checklist (${packing.categories.length} categories)</h4>
              <button type="button" id="pkg-add-pack-cat" class="btn btn-outline btn-sm">+ Add Gear Category</button>
            </div>
            <div class="form-field"><label>Packing Intro Paragraph</label><textarea id="pkg-pack-intro" rows="2">${escapeHtml(packing.intro)}</textarea></div>
            <div class="form-row-2" style="margin-top:8px;">
              <div class="form-field"><label>Complimentary Rental Banner Title</label><input id="pkg-pack-banner-title" type="text" value="${escapeHtml(packing.bannerTitle)}"></div>
              <div class="form-field"><label>Concluding Packing Note</label><input id="pkg-pack-note" type="text" value="${escapeHtml(packing.concludingNote)}"></div>
            </div>
            <div class="form-field" style="margin-top:8px; margin-bottom:10px;"><label>Complimentary Rental Banner Text</label><input id="pkg-pack-banner-desc" type="text" value="${escapeHtml(packing.bannerDesc)}"></div>
            <div id="pkg-pack-cats-list" class="pkg-repeater-list">
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

    // Global delegated removal for repeater cards & small rows
    bodyEl.onclick = (e) => {
      const remCard = e.target.closest('.pkg-remove-row');
      if (remCard) {
        const card = remCard.closest('.pkg-repeater-card');
        if (card) card.remove();
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
        const wrap = addPackItem.closest('.pkg-repeater-card').querySelector('[data-pack-items-wrap]');
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
      });
    });

    // + Add button bindings
    document.getElementById('pkg-add-sidebar-tier').addEventListener('click', () => {
      const list = document.getElementById('pkg-sidebar-tiers-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-sidebar-tier-row', {}, list.children.length, 'Group Label', 'Price Text'));
    });
    document.getElementById('pkg-add-fact').addEventListener('click', () => {
      const list = document.getElementById('pkg-facts-list');
      list.insertAdjacentHTML('beforeend', renderFactRowHtml({}, list.children.length));
    });
    document.getElementById('pkg-add-highlight').addEventListener('click', () => {
      const list = document.getElementById('pkg-highlights-list');
      list.insertAdjacentHTML('beforeend', renderHighlightRowHtml('', list.children.length));
    });
    document.getElementById('pkg-add-why').addEventListener('click', () => {
      const list = document.getElementById('pkg-why-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-why-row', {}, list.children.length, 'Card Title', 'Card Copy'));
    });
    document.getElementById('pkg-add-day').addEventListener('click', () => {
      const list = document.getElementById('pkg-days-list');
      const nextNum = list.querySelectorAll('[data-day-row]').length + 1;
      list.insertAdjacentHTML('beforeend', renderDayRowHtml({ dayNumber: nextNum }, nextNum - 1));
      mountCompactEditors(list.lastElementChild);
    });
    document.getElementById('pkg-add-inc').addEventListener('click', () => {
      const list = document.getElementById('pkg-inc-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-inc-row', {}, list.children.length, 'Inclusion Title', 'Inclusion Details'));
    });
    document.getElementById('pkg-add-exc').addEventListener('click', () => {
      const list = document.getElementById('pkg-exc-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-exc-row', {}, list.children.length, 'Exclusion Title', 'Exclusion Details'));
    });
    document.getElementById('pkg-add-tier').addEventListener('click', () => {
      const list = document.getElementById('pkg-tiers-list');
      list.insertAdjacentHTML('beforeend', renderTierRowHtml({}, list.children.length));
    });
    document.getElementById('pkg-add-trow').addEventListener('click', () => {
      const list = document.getElementById('pkg-trows-list');
      list.insertAdjacentHTML('beforeend', renderSimplePairHtml('data-trow-row', {}, list.children.length, 'Booking Category', 'Price / Quotation Status'));
    });
    document.getElementById('pkg-add-dep').addEventListener('click', () => {
      const list = document.getElementById('pkg-deps-list');
      list.insertAdjacentHTML('beforeend', renderDepartureRowHtml({}, list.children.length));
    });
    document.getElementById('pkg-add-pack-cat').addEventListener('click', () => {
      const list = document.getElementById('pkg-pack-cats-list');
      list.insertAdjacentHTML('beforeend', renderPackingCategoryHtml({ items: [{}] }, list.children.length));
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

        const tripFactsPayload = Array.from(bodyEl.querySelectorAll('[data-fact-row]')).map((el) => ({
          category: el.querySelector('[data-k="category"]').value.trim(),
          value: el.querySelector('[data-k="value"]').value.trim(),
          subtitle: el.querySelector('[data-k="subtitle"]').value.trim()
        })).filter((f) => f.category || f.value);

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
            whyBookTitle: getVal('pkg-why-title').trim() || null,
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
                        <td style="display:flex; gap:6px;">
                          ${canWrite ? `<button type="button" class="btn btn-outline btn-sm pkg-edit-btn" data-id="${p.id}">Edit</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-outline btn-sm pkg-pub-btn" data-id="${p.id}">${p.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-primary btn-sm pkg-html-btn" data-id="${p.id}">Render HTML</button>` : ''}
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
      searchEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.q = searchEl.value.trim(); state.page = 1; draw(); } });
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
