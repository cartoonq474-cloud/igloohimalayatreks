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

export async function renderBlogsModule(container, { hasPerm }) {
  const state = { status: '', q: '', page: 1, options: { categories: [], authors: [] } };
  const canWrite = hasPerm('blogs:write');
  const canPublish = hasPerm('blogs:publish');
  const canDelete = hasPerm('blogs:delete');

  try {
    state.options = await apiRequest('/admin/blogs/options');
  } catch (_err) {
    // ignore
  }

  async function loadBlogs() {
    const params = new URLSearchParams({ page: String(state.page), limit: '25' });
    if (state.status) params.set('status', state.status);
    if (state.q) params.set('q', state.q);
    const res = await fetch(`/api/v1/admin/blogs?${params.toString()}`, { credentials: 'same-origin' });
    const json = await parseJsonResponse(res, 'Failed to load blogs.');
    if (!res.ok || !json.success) throw new Error((json.error && json.error.message) || 'Failed to load blogs.');
    return json;
  }

  function renderBlogSectionHtml(sec = {}, idx = 0) {
    return `
      <div class="pkg-repeater-card" data-blog-sec>
        <div class="pkg-repeater-head">
          <span class="pkg-repeater-title">Article Section #${idx + 1}</span>
          <button type="button" class="btn btn-outline btn-sm blog-remove-sec">Remove Section</button>
        </div>
        <div class="form-row-2" style="margin-bottom:8px;">
          <div class="form-field"><label>Section ID Anchor</label><input type="text" data-k="id" value="${escapeHtml(sec.id || `section-${idx + 1}`)}" placeholder="section-1"></div>
          <div class="form-field"><label>Section Heading (H2)</label><input type="text" data-k="h2" value="${escapeHtml(sec.h2 || '')}" placeholder="Trail Overview & Highlights"></div>
        </div>
        <div class="pkg-rte-host" data-k="content" data-initial-html="${escapeHtml(sec.content || '')}"></div>
      </div>`;
  }

  async function openBlogModal(postId = null) {
    const modal = document.getElementById('phase2-modal');
    const modalPanel = modal.querySelector('.modal-panel');
    let post = null;
    if (postId) {
      const res = await apiRequest(`/admin/blogs/${postId}`);
      post = res.post;
    }

    if (modalPanel) modalPanel.classList.add('modal-panel-xl');
    const sectionsList = Array.isArray(post && post.sectionsJson) && post.sectionsJson.length > 0
      ? post.sectionsJson
      : [{ id: 'intro', h2: 'Introduction', content: '' }];

    document.getElementById('phase2-modal-title').textContent = post ? `Edit Article — ${post.h1}` : 'Create Blog Article';
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="blog-form" class="stack-form">
        <div class="form-row-2">
          <div class="form-field"><label>H1 Heading *</label><input id="blog-h1" type="text" value="${escapeHtml(post ? post.h1 : '')}" required></div>
          <div class="form-field"><label>Slug *</label><input id="blog-slug" type="text" value="${escapeHtml(post ? post.slug : '')}" placeholder="everest-base-camp-guide" required></div>
        </div>
        <div class="form-row-3">
          <div class="form-field">
            <label>Category</label>
            <select id="blog-cat">
              <option value="">Uncategorized</option>
              ${state.options.categories.map((c) => `<option value="${c.id}" ${post && post.categoryId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Author</label>
            <select id="blog-author">
              <option value="">Default</option>
              ${state.options.authors.map((a) => `<option value="${a.id}" ${post && post.authorId === a.id ? 'selected' : ''}>${escapeHtml(a.name)}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Status</label>
            <select id="blog-status" ${!canPublish ? 'disabled' : ''}>
              ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${post && post.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field"><label>SEO Page Title *</label><input id="blog-title" type="text" value="${escapeHtml(post ? post.title : '')}" required></div>
        <div class="form-field"><label>Lead / Excerpt</label><textarea id="blog-lead" rows="3">${escapeHtml(post ? (post.lead || post.excerpt || '') : '')}</textarea></div>
        <div class="pkg-section-box">
          <div class="pkg-section-head">
            <h4>Article Content Sections</h4>
            <button type="button" id="blog-add-sec" class="btn btn-outline btn-sm">+ Add Section</button>
          </div>
          <div id="blog-sections-list" class="pkg-repeater-list">
            ${sectionsList.map((s, idx) => renderBlogSectionHtml(s, idx)).join('')}
          </div>
        </div>
        <div id="blog-err" class="alert alert-error hidden"></div>
        <div class="modal-actions" style="justify-content:space-between;">
          ${post && canDelete ? '<button type="button" id="blog-del-btn" class="btn btn-danger-outline btn-sm">Delete Article</button>' : '<span></span>'}
          <button type="submit" class="btn btn-primary btn-sm">Save Article</button>
        </div>
      </form>
    `;
    modal.classList.remove('hidden');

    const mountSectionEditors = (root) => {
      root.querySelectorAll('.pkg-rte-host').forEach((host) => {
        if (host.dataset.rteMounted === '1') return;
        host.dataset.rteMounted = '1';
        mountRichEditor(host, {
          initialHtml: host.dataset.initialHtml || '',
          minHeight: 190,
          placeholder: 'Write rich article section content...'
        });
      });
    };
    const secListEl = document.getElementById('blog-sections-list');
    mountSectionEditors(secListEl);

    document.getElementById('blog-add-sec').addEventListener('click', () => {
      const idx = secListEl.querySelectorAll('[data-blog-sec]').length;
      secListEl.insertAdjacentHTML('beforeend', renderBlogSectionHtml({}, idx));
      mountSectionEditors(secListEl.lastElementChild);
    });
    secListEl.addEventListener('click', (e) => {
      const rem = e.target.closest('.blog-remove-sec');
      if (rem) rem.closest('[data-blog-sec]').remove();
    });
    const closeHeader = document.getElementById('close-phase2-modal');
    if (closeHeader) closeHeader.addEventListener('click', () => {
      if (modalPanel) modalPanel.classList.remove('modal-panel-xl');
    }, { once: true });

    document.getElementById('blog-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('blog-err');
      errEl.classList.add('hidden');
      try {
        const sectionsJson = Array.from(secListEl.querySelectorAll('[data-blog-sec]')).map((secEl, idx) => ({
          id: secEl.querySelector('[data-k="id"]').value.trim() || `section-${idx + 1}`,
          h2: secEl.querySelector('[data-k="h2"]').value.trim(),
          content: getRichEditorHtml(secEl.querySelector('[data-k="content"]')).trim()
        })).filter((s) => s.h2 || s.content);
        const catId = document.getElementById('blog-cat').value;
        const authId = document.getElementById('blog-author').value;
        const payload = {
          h1: document.getElementById('blog-h1').value.trim(),
          title: document.getElementById('blog-title').value.trim(),
          slug: document.getElementById('blog-slug').value.trim(),
          lead: document.getElementById('blog-lead').value.trim() || null,
          excerpt: document.getElementById('blog-lead').value.trim() || null,
          categoryId: catId ? Number(catId) : null,
          authorId: authId ? Number(authId) : null,
          status: document.getElementById('blog-status').value,
          sectionsJson
        };
        let saveRes;
        if (post) {
          saveRes = await apiRequest(`/admin/blogs/${post.id}`, { method: 'PATCH', body: payload });
        } else {
          saveRes = await apiRequest('/admin/blogs', { method: 'POST', body: payload });
        }
        if (modalPanel) modalPanel.classList.remove('modal-panel-xl');
        modal.classList.add('hidden');
        if (saveRes && saveRes.publishedRoute) {
          showToast(`Saved & updated live article ${saveRes.publishedRoute}`, 'success', { href: saveRes.publishedRoute, label: 'View Live ↗' });
        } else {
          showToast('Blog article saved.', 'success');
        }
        draw();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });

    const delBtn = document.getElementById('blog-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        if (!confirm(`Delete "${post.h1}"?`)) return;
        await apiRequest(`/admin/blogs/${post.id}`, { method: 'DELETE' });
        modal.classList.add('hidden');
        draw();
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading blog articles...</div>';
    try {
      const result = await loadBlogs();
      const { posts } = result.data;
      const meta = result.meta;

      container.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <h3>Blog Articles (${meta.total})</h3>
            <div class="toolbar-row">
              <input id="blog-search" type="search" placeholder="Search title or slug..." value="${escapeHtml(state.q)}">
              <select id="blog-status-filter">
                <option value="">All Statuses</option>
                ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${state.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
              ${canWrite ? '<button id="blog-new-btn" type="button" class="btn btn-primary btn-sm">+ New Article</button>' : ''}
            </div>
          </div>

          <div class="table-wrap">
            ${posts.length === 0
              ? '<p class="metric-sub">No blog articles found. Run <code>node scripts/import_existing_content.js</code> or click "+ New Article".</p>'
              : `<table>
                  <thead><tr><th>Article</th><th>Category</th><th>Read Time</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    ${posts.map((p) => `
                      <tr>
                        <td><strong>${escapeHtml(p.h1)}</strong><br><small>/blog/${escapeHtml(p.slug)}</small></td>
                        <td>${escapeHtml(p.category ? p.category.name : '-')}</td>
                        <td>${p.readingMinutes} min (${p.wordCount} words)</td>
                        <td><span class="status-pill ${p.status === 'PUBLISHED' ? 'status-active' : 'status-warn'}">${escapeHtml(p.status)}</span></td>
                        <td style="display:flex; gap:6px;">
                          ${canWrite ? `<button type="button" class="btn btn-outline btn-sm blog-edit-btn" data-id="${p.id}">Edit</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-outline btn-sm blog-pub-btn" data-id="${p.id}">${p.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</button>` : ''}
                          ${canPublish ? `<button type="button" class="btn btn-primary btn-sm blog-html-btn" data-id="${p.id}">Render HTML</button>` : ''}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>

          <div class="pagination-row">
            <span class="metric-sub">Page ${meta.page} of ${meta.totalPages}</span>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" id="blog-prev" ${meta.page <= 1 ? 'disabled' : ''}>Previous</button>
              <button type="button" class="btn btn-outline btn-sm" id="blog-next" ${meta.page >= meta.totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;

      const newBtn = document.getElementById('blog-new-btn');
      if (newBtn) newBtn.addEventListener('click', () => openBlogModal(null));
      document.getElementById('blog-status-filter').addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; draw(); });
      const searchEl = document.getElementById('blog-search');
      searchEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.q = searchEl.value.trim(); state.page = 1; draw(); } });
      document.getElementById('blog-prev').addEventListener('click', () => { if (state.page > 1) { state.page--; draw(); } });
      document.getElementById('blog-next').addEventListener('click', () => { if (state.page < meta.totalPages) { state.page++; draw(); } });
      container.querySelectorAll('.blog-edit-btn').forEach((b) => b.addEventListener('click', () => openBlogModal(Number(b.getAttribute('data-id')))));
      container.querySelectorAll('.blog-pub-btn').forEach((b) => b.addEventListener('click', async () => {
        await apiRequest(`/admin/blogs/${b.getAttribute('data-id')}/publish`, { method: 'POST' });
        draw();
      }));
      container.querySelectorAll('.blog-html-btn').forEach((b) => b.addEventListener('click', async () => {
        b.disabled = true;
        b.textContent = 'Publishing...';
        try {
          const res = await apiRequest(`/admin/publish/blog/${b.getAttribute('data-id')}`, { method: 'POST' });
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
