import { apiRequest } from '../api.js';

const EDITOR_REGISTRY = new WeakMap();

const ICONS = {
  undo: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
  redo: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>',
  clear: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4l-3 16"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',
  palette: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  fill: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>',
  alignLeft: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',
  alignCenter: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
  alignRight: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>',
  alignJustify: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  ul: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.3" fill="currentColor"/><circle cx="4" cy="12" r="1.3" fill="currentColor"/><circle cx="4" cy="18" r="1.3" fill="currentColor"/></svg>',
  ol: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
  quote: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',
  note: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  link: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  image: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  video: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><polygon points="10 9 16 12 10 15 10 9" fill="currentColor" stroke="none"/></svg>',
  box: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  table: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>',
  hr: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  cut: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  code: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 10 7 12 9 14"/><polyline points="15 10 17 12 15 14"/><line x1="13" y1="9" x2="11" y2="15"/></svg>',
  expand: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>'
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeImagePreview(raw) {
  if (!raw) return '';
  const s = String(raw).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;
  return `/${s.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')}`;
}

export function getRichEditorHtml(hostEl) {
  const ctrl = EDITOR_REGISTRY.get(hostEl);
  return ctrl ? ctrl.getHtml() : (hostEl.dataset.initialHtml || '');
}

export function mountRichEditor(hostEl, options = {}) {
  if (!hostEl) return null;
  const {
    initialHtml = '',
    label = '',
    placeholder = 'Start writing rich formatted content here...',
    minHeight = 260,
    compact = false,
    onChange = null
  } = options;

  let savedRange = null;
  let sourceMode = false;

  hostEl.innerHTML = `
    ${label ? `<div class="rte-external-label">${escapeHtml(label)}</div>` : ''}
    <div class="rte-wrapper ${compact ? 'rte-compact' : ''}">
      <div class="rte-toolbar" role="toolbar" aria-label="Rich text formatting">
        <div class="rte-row">
          <button type="button" class="rte-btn" data-cmd="undo" title="Undo (Ctrl+Z)">${ICONS.undo}</button>
          <button type="button" class="rte-btn" data-cmd="redo" title="Redo (Ctrl+Y)">${ICONS.redo}</button>
          <span class="rte-sep"></span>

          <select class="rte-select" data-role="block-format" title="Paragraph style">
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Callout Quote</option>
          </select>
          <span class="rte-sep"></span>

          <button type="button" class="rte-btn rte-text-btn" data-cmd="bold" title="Bold (Ctrl+B)"><strong>B</strong></button>
          <button type="button" class="rte-btn rte-text-btn" data-cmd="italic" title="Italic (Ctrl+I)"><em>I</em></button>
          <button type="button" class="rte-btn rte-text-btn" data-cmd="underline" title="Underline (Ctrl+U)"><u>U</u></button>
          <button type="button" class="rte-btn rte-text-btn" data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>
          <button type="button" class="rte-btn" data-cmd="removeFormat" title="Clear formatting">${ICONS.clear}</button>
          <span class="rte-sep"></span>

          <label class="rte-btn rte-color-btn" title="Text Color">
            ${ICONS.palette}
            <input type="color" data-role="fore-color" value="#0E3458" aria-label="Text Color">
          </label>
          <label class="rte-btn rte-color-btn" title="Highlight Color">
            ${ICONS.fill}
            <input type="color" data-role="back-color" value="#ECFDF5" aria-label="Highlight Background Color">
          </label>
          <span class="rte-sep"></span>

          <button type="button" class="rte-btn" data-cmd="justifyLeft" title="Align Left">${ICONS.alignLeft}</button>
          <button type="button" class="rte-btn" data-cmd="justifyCenter" title="Align Center">${ICONS.alignCenter}</button>
          <button type="button" class="rte-btn" data-cmd="justifyRight" title="Align Right">${ICONS.alignRight}</button>
          <button type="button" class="rte-btn" data-cmd="justifyFull" title="Justify">${ICONS.alignJustify}</button>
          <span class="rte-sep"></span>

          <button type="button" class="rte-btn" data-cmd="insertUnorderedList" title="Bullet List">${ICONS.ul}</button>
          <button type="button" class="rte-btn" data-cmd="insertOrderedList" title="Numbered List">${ICONS.ol}</button>
        </div>

        <div class="rte-row rte-row-between">
          <div class="rte-group">
            <button type="button" class="rte-btn" data-action="callout-quote" title="Insert Emerald Callout Quote Box">${ICONS.quote}</button>
            <button type="button" class="rte-btn" data-action="info-note" title="Insert Note Box">${ICONS.note}</button>
            <span class="rte-sep"></span>
            <button type="button" class="rte-btn" data-action="open-link" title="Insert / Edit Link">${ICONS.link}</button>
            <button type="button" class="rte-btn" data-action="open-image" title="Insert Image from URL or Media Library">${ICONS.image}</button>
            <button type="button" class="rte-btn" data-action="open-video" title="Insert Video Link">${ICONS.video}</button>
            <button type="button" class="rte-btn" data-action="insert-card" title="Insert Summary Key Box">${ICONS.box}</button>
            <div class="rte-dropdown-wrap">
              <button type="button" class="rte-btn rte-table-trigger" data-action="toggle-table-menu" title="Insert Table">${ICONS.table} <span style="font-size:10px;">▾</span></button>
              <div class="rte-popover hidden" data-role="table-menu">
                <button type="button" data-table="2x2">2 × 2 Table</button>
                <button type="button" data-table="3x3">3 × 3 Table</button>
                <button type="button" data-table="4x4">4 × 4 Table</button>
                <button type="button" data-table="2x4">2 Cols × 4 Rows</button>
              </div>
            </div>
            <button type="button" class="rte-btn" data-cmd="insertHorizontalRule" title="Horizontal Divider">${ICONS.hr}</button>
            <button type="button" class="rte-btn" data-action="page-break" title="Clean Section Break">${ICONS.cut}</button>
          </div>

          <div class="rte-group">
            <button type="button" class="rte-btn" data-action="toggle-find" title="Find & Replace">${ICONS.search}</button>
            <button type="button" class="rte-btn" data-action="toggle-source" title="Toggle HTML Source View">${ICONS.code}</button>
            <button type="button" class="rte-btn" data-action="toggle-fullscreen" title="Fullscreen Mode">${ICONS.expand}</button>
          </div>
        </div>
      </div>

      <!-- Optional contextual mini-drawer (Link / Image + Media Picker / Find & Replace) -->
      <div class="rte-drawer hidden" data-role="drawer"></div>

      <div
        class="rte-canvas"
        contenteditable="true"
        data-placeholder="${escapeHtml(placeholder)}"
        style="min-height: ${minHeight}px;"
      >${initialHtml || '<p><br></p>'}</div>

      <textarea class="rte-source hidden" style="min-height: ${minHeight}px;" spellcheck="false"></textarea>
    </div>
  `;

  const wrapper = hostEl.querySelector('.rte-wrapper');
  const canvas = hostEl.querySelector('.rte-canvas');
  const sourceArea = hostEl.querySelector('.rte-source');
  const drawer = hostEl.querySelector('[data-role="drawer"]');
  const blockSelect = hostEl.querySelector('[data-role="block-format"]');
  const tableMenu = hostEl.querySelector('[data-role="table-menu"]');

  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (canvas.contains(range.commonAncestorContainer)) {
        savedRange = range.cloneRange();
      }
    }
  }

  function restoreSelection() {
    canvas.focus();
    if (savedRange) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  }

  function emitChange() {
    if (typeof onChange === 'function') onChange(getHtml());
  }

  function exec(cmd, val = null) {
    restoreSelection();
    document.execCommand(cmd, false, val);
    saveSelection();
    syncToolbarState();
    emitChange();
  }

  function insertHtmlAtCursor(html) {
    restoreSelection();
    if (document.queryCommandSupported && document.queryCommandSupported('insertHTML')) {
      document.execCommand('insertHTML', false, html);
    } else {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const frag = range.createContextualFragment(html);
        range.insertNode(frag);
      } else {
        canvas.insertAdjacentHTML('beforeend', html);
      }
    }
    saveSelection();
    emitChange();
  }

  function syncToolbarState() {
    if (sourceMode) return;
    ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList'].forEach((cmd) => {
      const btn = hostEl.querySelector(`[data-cmd="${cmd}"]`);
      if (btn) {
        try {
          btn.classList.toggle('active', document.queryCommandState(cmd));
        } catch (_e) {
          // ignore
        }
      }
    });
    const sel = window.getSelection();
    if (sel && sel.anchorNode && canvas.contains(sel.anchorNode)) {
      let node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
      let matched = 'p';
      while (node && node !== canvas) {
        const tag = node.tagName ? node.tagName.toLowerCase() : '';
        if (['h2', 'h3', 'h4', 'blockquote', 'p'].includes(tag)) {
          matched = tag;
          break;
        }
        node = node.parentElement;
      }
      if (blockSelect) blockSelect.value = matched;
    }
  }

  function getHtml() {
    if (sourceMode) return sourceArea.value.trim();
    const clone = canvas.cloneNode(true);
    const raw = clone.innerHTML.trim();
    if (raw === '<p><br></p>' || raw === '<br>') return '';
    return raw;
  }

  function setHtml(nextHtml) {
    canvas.innerHTML = nextHtml || '<p><br></p>';
    if (sourceMode) sourceArea.value = nextHtml || '';
    emitChange();
  }

  canvas.addEventListener('keyup', () => { saveSelection(); syncToolbarState(); });
  canvas.addEventListener('mouseup', () => { saveSelection(); syncToolbarState(); });
  canvas.addEventListener('input', emitChange);
  sourceArea.addEventListener('input', emitChange);

  // Format select (Paragraph, H2, H3, H4, Blockquote)
  blockSelect.addEventListener('change', () => {
    const tag = blockSelect.value;
    if (tag === 'blockquote') {
      exec('formatBlock', 'blockquote');
      const sel = window.getSelection();
      const bq = sel && sel.anchorNode ? (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode).closest('blockquote') : null;
      if (bq) bq.className = 'rte-callout';
    } else {
      exec('formatBlock', tag);
    }
  });

  // Color & highlight inputs
  hostEl.querySelector('[data-role="fore-color"]').addEventListener('input', (e) => exec('foreColor', e.target.value));
  hostEl.querySelector('[data-role="back-color"]').addEventListener('input', (e) => exec('hiliteColor', e.target.value));

  // Table menu choices
  tableMenu.querySelectorAll('button[data-table]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [cols, rows] = btn.getAttribute('data-table').split('x').map(Number);
      const header = `<tr>${Array.from({ length: cols }, (_, c) => `<th>Heading ${c + 1}</th>`).join('')}</tr>`;
      const body = Array.from({ length: Math.max(1, rows - 1) }, () => `<tr>${Array.from({ length: cols }, () => '<td>Cell</td>').join('')}</tr>`).join('');
      insertHtmlAtCursor(`<table class="rte-table"><thead>${header}</thead><tbody>${body}</tbody></table><p><br></p>`);
      tableMenu.classList.add('hidden');
    });
  });

  function closeDrawer() {
    drawer.classList.add('hidden');
    drawer.innerHTML = '';
  }

  function openLinkDrawer() {
    saveSelection();
    const selText = window.getSelection() ? window.getSelection().toString() : '';
    drawer.classList.remove('hidden');
    drawer.innerHTML = `
      <div class="rte-drawer-bar">
        <input type="text" data-d="text" placeholder="Link text" value="${escapeHtml(selText)}">
        <input type="url" data-d="url" placeholder="https://... or /trek/..." value="https://">
        <button type="button" class="btn btn-primary btn-sm" data-d-apply>Insert Link</button>
        <button type="button" class="btn btn-outline btn-sm" data-d-close>Cancel</button>
      </div>
    `;
    drawer.querySelector('[data-d-close]').addEventListener('click', closeDrawer);
    drawer.querySelector('[data-d-apply]').addEventListener('click', () => {
      const url = drawer.querySelector('[data-d="url"]').value.trim();
      const txt = drawer.querySelector('[data-d="text"]').value.trim() || url;
      if (url) {
        insertHtmlAtCursor(`<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(txt)}</a>`);
      }
      closeDrawer();
    });
  }

  function openImageDrawer() {
    saveSelection();
    drawer.classList.remove('hidden');
    drawer.innerHTML = `
      <div class="rte-drawer-stack">
        <div class="rte-drawer-bar">
          <input type="text" data-d="imgUrl" placeholder="Image path (images/...) or https://...">
          <input type="text" data-d="imgAlt" placeholder="Alt description">
          <button type="button" class="btn btn-primary btn-sm" data-d-insert>Insert Image</button>
          <button type="button" class="btn btn-outline btn-sm" data-d-close>Close</button>
        </div>
        <div class="rte-media-bar">
          <input type="search" data-d="mediaSearch" placeholder="Filter Media Library..." style="max-width:220px;">
          <span class="metric-sub">Or click an image below from your Media Library:</span>
        </div>
        <div class="rte-media-grid" data-d="mediaGrid">Loading Media Library...</div>
      </div>
    `;
    drawer.querySelector('[data-d-close]').addEventListener('click', closeDrawer);
    drawer.querySelector('[data-d-insert]').addEventListener('click', () => {
      const src = drawer.querySelector('[data-d="imgUrl"]').value.trim();
      const alt = drawer.querySelector('[data-d="imgAlt"]').value.trim();
      if (src) {
        const safeSrc = src.startsWith('http') || src.startsWith('/') ? src : `../../${src}`;
        insertHtmlAtCursor(`<figure><img src="${escapeHtml(safeSrc)}" alt="${escapeHtml(alt)}" style="max-width:100%; border-radius:8px;"></figure><p><br></p>`);
      }
      closeDrawer();
    });

    const loadImgs = async (q = '') => {
      const grid = drawer.querySelector('[data-d="mediaGrid"]');
      try {
        const res = await apiRequest(`/admin/media?resourceType=IMAGE&limit=18${q ? `&q=${encodeURIComponent(q)}` : ''}`);
        const assets = res.assets || [];
        if (!assets.length) {
          grid.innerHTML = '<span class="metric-sub">No images found.</span>';
          return;
        }
        grid.innerHTML = assets.map((a) => {
          const url = a.legacyLocalPath || a.secureUrl || '';
          return `<button type="button" class="rte-media-thumb-btn" data-url="${escapeHtml(url)}" data-alt="${escapeHtml(a.altText || a.title || '')}"><img src="${escapeHtml(normalizeImagePreview(url))}" alt=""></button>`;
        }).join('');
        grid.querySelectorAll('.rte-media-thumb-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            const alt = btn.getAttribute('data-alt');
            const safeSrc = url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
            insertHtmlAtCursor(`<img src="${escapeHtml(safeSrc)}" alt="${escapeHtml(alt)}" style="max-width:100%; border-radius:8px;">`);
            closeDrawer();
          });
        });
      } catch (err) {
        grid.innerHTML = `<span class="metric-sub">${escapeHtml(err.message)}</span>`;
      }
    };
    drawer.querySelector('[data-d="mediaSearch"]').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadImgs(e.target.value.trim());
      }
    });
    loadImgs('');
  }

  function openFindDrawer() {
    drawer.classList.remove('hidden');
    drawer.innerHTML = `
      <div class="rte-drawer-bar">
        <input type="text" data-d="find" placeholder="Find text...">
        <input type="text" data-d="replace" placeholder="Replace with...">
        <button type="button" class="btn btn-outline btn-sm" data-d-rep>Replace All</button>
        <button type="button" class="btn btn-outline btn-sm" data-d-close>Close</button>
      </div>
    `;
    drawer.querySelector('[data-d-close]').addEventListener('click', closeDrawer);
    drawer.querySelector('[data-d-rep]').addEventListener('click', () => {
      const f = drawer.querySelector('[data-d="find"]').value;
      const r = drawer.querySelector('[data-d="replace"]').value;
      if (!f) return;
      if (sourceMode) {
        sourceArea.value = sourceArea.value.split(f).join(r);
      } else {
        const walker = document.createTreeWalker(canvas, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.includes(f)) {
            node.nodeValue = node.nodeValue.split(f).join(r);
          }
        }
      }
      emitChange();
    });
  }

  // Toolbar click handlers
  hostEl.querySelector('.rte-toolbar').addEventListener('click', (e) => {
    const cmdBtn = e.target.closest('button[data-cmd]');
    if (cmdBtn) {
      e.preventDefault();
      if (sourceMode) return;
      exec(cmdBtn.getAttribute('data-cmd'));
      return;
    }
    const actBtn = e.target.closest('button[data-action]');
    if (!actBtn) return;
    e.preventDefault();
    const act = actBtn.getAttribute('data-action');

    if (act === 'toggle-source') {
      sourceMode = !sourceMode;
      actBtn.classList.toggle('active', sourceMode);
      if (sourceMode) {
        sourceArea.value = canvas.innerHTML.trim();
        canvas.classList.add('hidden');
        sourceArea.classList.remove('hidden');
      } else {
        canvas.innerHTML = sourceArea.value.trim() || '<p><br></p>';
        sourceArea.classList.add('hidden');
        canvas.classList.remove('hidden');
      }
      emitChange();
      return;
    }

    if (act === 'toggle-fullscreen') {
      wrapper.classList.toggle('rte-fullscreen');
      actBtn.classList.toggle('active', wrapper.classList.contains('rte-fullscreen'));
      return;
    }

    if (act === 'toggle-find') {
      if (drawer.classList.contains('hidden')) openFindDrawer();
      else closeDrawer();
      return;
    }

    if (sourceMode) return;

    if (act === 'callout-quote') {
      restoreSelection();
      const sel = window.getSelection();
      const selText = sel ? sel.toString().trim() : '';
      const anchorEl = sel && sel.anchorNode ? (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode) : null;
      const insideP = anchorEl && canvas.contains(anchorEl) ? anchorEl.closest('p, div:not(.rte-canvas), h2, h3, h4') : null;
      if (insideP && insideP !== canvas && !insideP.textContent.trim()) {
        insideP.outerHTML = '<blockquote class="rte-callout"><p><em>“Write your highlighted trail story or expedition quote here...”</em></p></blockquote><p><br></p>';
        emitChange();
      } else if (selText) {
        exec('formatBlock', 'blockquote');
        const cur = window.getSelection();
        const bq = cur && cur.anchorNode ? (cur.anchorNode.nodeType === 3 ? cur.anchorNode.parentElement : cur.anchorNode).closest('blockquote') : null;
        if (bq) bq.className = 'rte-callout';
        emitChange();
      } else if (insideP && insideP !== canvas) {
        insideP.insertAdjacentHTML('afterend', '<blockquote class="rte-callout"><p><em>“Write your highlighted trail story or expedition quote here...”</em></p></blockquote><p><br></p>');
        emitChange();
      } else {
        insertHtmlAtCursor('<blockquote class="rte-callout"><p><em>“Write your highlighted trail story or expedition quote here...”</em></p></blockquote><p><br></p>');
      }
    } else if (act === 'info-note') {
      insertHtmlAtCursor('<div class="cms-info-box" style="background:#EFF6FF; border-left:4px solid #1A96C8; padding:14px 18px; border-radius:0 8px 8px 0; margin:12px 0;"><strong>Trail Note:</strong> Add key seasonal or permit briefing note here.</div><p><br></p>');
    } else if (act === 'insert-card') {
      insertHtmlAtCursor('<div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px; margin:12px 0;"><h4>Key Highlights Summary</h4><p>Add key highlights or trip takeaway details here.</p></div><p><br></p>');
    } else if (act === 'page-break') {
      insertHtmlAtCursor('<hr><p><br></p>');
    } else if (act === 'toggle-table-menu') {
      saveSelection();
      tableMenu.classList.toggle('hidden');
    } else if (act === 'open-link') {
      openLinkDrawer();
    } else if (act === 'open-image') {
      openImageDrawer();
    } else if (act === 'open-video') {
      saveSelection();
      drawer.classList.remove('hidden');
      drawer.innerHTML = `
        <div class="rte-drawer-bar">
          <input type="url" data-d="vidUrl" placeholder="YouTube or Video link (https://...)">
          <button type="button" class="btn btn-primary btn-sm" data-d-vid>Insert Video Link</button>
          <button type="button" class="btn btn-outline btn-sm" data-d-close>Cancel</button>
        </div>
      `;
      drawer.querySelector('[data-d-close]').addEventListener('click', closeDrawer);
      drawer.querySelector('[data-d-vid]').addEventListener('click', () => {
        const u = drawer.querySelector('[data-d="vidUrl"]').value.trim();
        if (u) insertHtmlAtCursor(`<p><a href="${escapeHtml(u)}" target="_blank" rel="noopener">Watch Expedition Video →</a></p>`);
        closeDrawer();
      });
    }
  });

  const controller = { getHtml, setHtml };
  EDITOR_REGISTRY.set(hostEl, controller);
  return controller;
}
