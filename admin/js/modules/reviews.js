import { apiRequest } from '../api.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function renderReviewsModule(container, { hasPerm }) {
  const state = { status: '', platform: '', q: '', page: 1 };
  const canWrite = hasPerm('reviews:write');
  const canModerate = hasPerm('reviews:moderate');
  const canDelete = hasPerm('reviews:delete');

  async function loadReviews() {
    const params = new URLSearchParams({ page: String(state.page), limit: '25' });
    if (state.status) params.set('status', state.status);
    if (state.platform) params.set('platform', state.platform);
    if (state.q) params.set('q', state.q);
    const res = await fetch(`/api/v1/admin/reviews?${params.toString()}`, { credentials: 'same-origin' });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error((json.error && json.error.message) || 'Failed to load reviews.');
    return json;
  }

  function openReviewModal(rev = null) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = rev ? `Edit Review — ${rev.authorName}` : 'Add Customer / Platform Review';
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="rev-form" class="stack-form">
        <div class="form-row-3">
          <div class="form-field"><label>Author Name *</label><input id="rev-author" type="text" value="${escapeHtml(rev ? rev.authorName : '')}" required></div>
          <div class="form-field"><label>Country</label><input id="rev-country" type="text" value="${escapeHtml(rev ? (rev.authorCountry || '') : '')}" placeholder="USA"></div>
          <div class="form-field"><label>Rating (1-5)</label><input id="rev-rating" type="number" min="1" max="5" value="${rev ? rev.rating : 5}"></div>
        </div>
        <div class="form-row-3">
          <div class="form-field">
            <label>Type</label>
            <select id="rev-type">
              ${['CUSTOMER', 'VIDEO', 'PLATFORM'].map((t) => `<option value="${t}" ${rev && rev.reviewType === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Platform</label>
            <select id="rev-platform">
              ${['INTERNAL', 'TRIPADVISOR', 'GOOGLE', 'TRUSTPILOT', 'FACEBOOK'].map((p) => `<option value="${p}" ${rev && rev.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
          </div>
          <div class="form-field"><label>Guide Name</label><input id="rev-guide" type="text" value="${escapeHtml(rev ? (rev.guideName || '') : '')}" placeholder="Surya Lama"></div>
        </div>
        <div class="form-field"><label>Review Title</label><input id="rev-title" type="text" value="${escapeHtml(rev ? (rev.title || '') : '')}"></div>
        <div class="form-field"><label>Review Body *</label><textarea id="rev-body" rows="4" required>${escapeHtml(rev ? rev.body : '')}</textarea></div>
        <div class="form-row-2">
          <div class="form-field"><label>Video URL (if video review)</label><input id="rev-video" type="text" value="${escapeHtml(rev ? (rev.videoUrl || '') : '')}"></div>
          <div class="form-field">
            <label>Moderation Status</label>
            <select id="rev-status" ${!canModerate ? 'disabled' : ''}>
              ${['PENDING', 'APPROVED', 'REJECTED'].map((s) => `<option value="${s}" ${rev && rev.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <label class="checkbox-inline"><input id="rev-featured" type="checkbox" ${rev && rev.isFeaturedHome ? 'checked' : ''} ${!canModerate ? 'disabled' : ''}><span>Feature on Homepage</span></label>
        <div id="rev-err" class="alert alert-error hidden"></div>
        <div class="modal-actions" style="justify-content:space-between;">
          ${rev && canDelete ? '<button type="button" id="rev-del" class="btn btn-danger-outline btn-sm">Delete</button>' : '<span></span>'}
          <button type="submit" class="btn btn-primary btn-sm">Save Review</button>
        </div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('rev-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('rev-err');
      errEl.classList.add('hidden');
      try {
        const payload = {
          authorName: document.getElementById('rev-author').value.trim(),
          authorCountry: document.getElementById('rev-country').value.trim() || null,
          rating: Number(document.getElementById('rev-rating').value) || 5,
          reviewType: document.getElementById('rev-type').value,
          platform: document.getElementById('rev-platform').value,
          guideName: document.getElementById('rev-guide').value.trim() || null,
          title: document.getElementById('rev-title').value.trim() || null,
          body: document.getElementById('rev-body').value.trim(),
          videoUrl: document.getElementById('rev-video').value.trim() || null,
          status: document.getElementById('rev-status').value,
          isFeaturedHome: document.getElementById('rev-featured').checked
        };
        if (rev) {
          await apiRequest(`/admin/reviews/${rev.id}`, { method: 'PATCH', body: payload });
        } else {
          await apiRequest('/admin/reviews', { method: 'POST', body: payload });
        }
        modal.classList.add('hidden');
        draw();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });

    const delBtn = document.getElementById('rev-del');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        if (!confirm('Delete this review?')) return;
        await apiRequest(`/admin/reviews/${rev.id}`, { method: 'DELETE' });
        modal.classList.add('hidden');
        draw();
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading reviews...</div>';
    try {
      const result = await loadReviews();
      const { reviews } = result.data;

      container.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <h3>Reviews &amp; Testimonials (${result.meta.total})</h3>
            <div class="toolbar-row">
              <input id="rev-search" type="search" placeholder="Search author or text..." value="${escapeHtml(state.q)}">
              <select id="rev-status-filter">
                <option value="">All Statuses</option>
                ${['PENDING', 'APPROVED', 'REJECTED'].map((s) => `<option value="${s}" ${state.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
              <select id="rev-platform-filter">
                <option value="">All Platforms</option>
                ${['INTERNAL', 'TRIPADVISOR', 'GOOGLE', 'TRUSTPILOT', 'FACEBOOK'].map((p) => `<option value="${p}" ${state.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
              ${canWrite ? '<button id="rev-new-btn" type="button" class="btn btn-primary btn-sm">+ Add Review</button>' : ''}
            </div>
          </div>

          <div class="table-wrap">
            ${reviews.length === 0
              ? '<p class="metric-sub">No reviews found.</p>'
              : `<table>
                  <thead><tr><th>Author</th><th>Platform / Type</th><th>Rating</th><th>Snippet</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    ${reviews.map((r) => `
                      <tr>
                        <td><strong>${escapeHtml(r.authorName)}</strong><br><small>${escapeHtml(r.authorCountry || '')}</small></td>
                        <td>${escapeHtml(r.platform)} / ${escapeHtml(r.reviewType)}</td>
                        <td>${r.rating} / 5</td>
                        <td>${escapeHtml((r.title || r.body || '').slice(0, 80))}...</td>
                        <td><span class="status-pill ${r.status === 'APPROVED' ? 'status-active' : (r.status === 'PENDING' ? 'status-warn' : 'status-inactive')}">${escapeHtml(r.status)}</span></td>
                        <td style="display:flex; gap:6px;">
                          ${canWrite ? `<button type="button" class="btn btn-outline btn-sm rev-edit-btn" data-id="${r.id}">Edit</button>` : ''}
                          ${canModerate && r.status !== 'APPROVED' ? `<button type="button" class="btn btn-primary btn-sm rev-approve-btn" data-id="${r.id}">Approve</button>` : ''}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>
        </div>
      `;

      const newBtn = document.getElementById('rev-new-btn');
      if (newBtn) newBtn.addEventListener('click', () => openReviewModal(null));
      document.getElementById('rev-status-filter').addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; draw(); });
      document.getElementById('rev-platform-filter').addEventListener('change', (e) => { state.platform = e.target.value; state.page = 1; draw(); });
      const searchEl = document.getElementById('rev-search');
      searchEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.q = searchEl.value.trim(); state.page = 1; draw(); } });
      container.querySelectorAll('.rev-edit-btn').forEach((b) => b.addEventListener('click', () => {
        const found = reviews.find((r) => r.id === Number(b.getAttribute('data-id')));
        if (found) openReviewModal(found);
      }));
      container.querySelectorAll('.rev-approve-btn').forEach((b) => b.addEventListener('click', async () => {
        await apiRequest(`/admin/reviews/${b.getAttribute('data-id')}`, { method: 'PATCH', body: { status: 'APPROVED' } });
        draw();
      }));
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
