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

export async function renderDestinationsModule(container, { hasPerm }) {
  const canWrite = hasPerm('destinations:write');
  const canPublish = hasPerm('destinations:publish');

  function openDestModal(dest = null) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = dest ? `Edit Destination — ${dest.name}` : 'New Destination Region';
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="dest-form" class="stack-form">
        <div class="form-row-3">
          <div class="form-field"><label>Name *</label><input id="dest-name" type="text" value="${escapeHtml(dest ? dest.name : '')}" required></div>
          <div class="form-field"><label>Slug *</label><input id="dest-slug" type="text" value="${escapeHtml(dest ? dest.slug : '')}" placeholder="everest-region-treks" required></div>
          <div class="form-field"><label>Region Key *</label><input id="dest-key" type="text" value="${escapeHtml(dest ? dest.regionKey : '')}" placeholder="everest" required></div>
        </div>
        <div class="form-row-2">
          <div class="form-field"><label>Tagline</label><input id="dest-tagline" type="text" value="${escapeHtml(dest ? (dest.tagline || '') : '')}"></div>
          <div class="form-field">
            <label>Status</label>
            <select id="dest-status" ${!canPublish ? 'disabled' : ''}>
              ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${dest && dest.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field"><label>Summary</label><textarea id="dest-summary" rows="3">${escapeHtml(dest ? (dest.summary || '') : '')}</textarea></div>
        <div class="form-row-2">
          <div class="form-field"><label>Best Season Summary</label><input id="dest-season" type="text" value="${escapeHtml(dest ? (dest.bestSeasonSummary || '') : '')}"></div>
          <div class="form-field"><label>Display Order</label><input id="dest-order" type="number" value="${dest ? dest.displayOrder : 0}"></div>
        </div>
        <div class="form-row-2">
          <div class="form-field"><label>SEO Meta Title</label><input id="dest-seo-title" type="text" value="${escapeHtml(dest && dest.seo ? dest.seo.metaTitle : '')}"></div>
          <div class="form-field"><label>SEO Meta Description</label><input id="dest-seo-desc" type="text" value="${escapeHtml(dest && dest.seo ? (dest.seo.metaDescription || '') : '')}"></div>
        </div>
        <div id="dest-err" class="alert alert-error hidden"></div>
        <div class="modal-actions"><button type="submit" class="btn btn-primary btn-sm">Save Destination</button></div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('dest-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('dest-err');
      errEl.classList.add('hidden');
      try {
        const seoTitle = document.getElementById('dest-seo-title').value.trim();
        const payload = {
          name: document.getElementById('dest-name').value.trim(),
          slug: document.getElementById('dest-slug').value.trim(),
          regionKey: document.getElementById('dest-key').value.trim(),
          tagline: document.getElementById('dest-tagline').value.trim() || null,
          summary: document.getElementById('dest-summary').value.trim() || null,
          bestSeasonSummary: document.getElementById('dest-season').value.trim() || null,
          displayOrder: Number(document.getElementById('dest-order').value) || 0,
          status: document.getElementById('dest-status').value,
          ...(seoTitle ? { seo: { metaTitle: seoTitle, metaDescription: document.getElementById('dest-seo-desc').value.trim() || null } } : {})
        };
        if (dest) {
          await apiRequest(`/admin/destinations/${dest.id}`, { method: 'PATCH', body: payload });
        } else {
          await apiRequest('/admin/destinations', { method: 'POST', body: payload });
        }
        modal.classList.add('hidden');
        draw();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading destinations...</div>';
    try {
      const data = await apiRequest('/admin/destinations');
      const destinations = data.destinations || [];

      container.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <h3>Himalayan Destinations (${destinations.length})</h3>
            ${canWrite ? '<button id="dest-new-btn" type="button" class="btn btn-primary btn-sm">+ New Destination</button>' : ''}
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Region</th><th>Key / Slug</th><th>Packages</th><th>Status</th>${canWrite ? '<th>Actions</th>' : ''}</tr></thead>
              <tbody>
                ${destinations.map((d) => `
                  <tr>
                    <td><strong>${escapeHtml(d.name)}</strong><br><small>${escapeHtml(d.tagline || '')}</small></td>
                    <td><code>${escapeHtml(d.regionKey)}</code><br><small>/${escapeHtml(d.slug)}</small></td>
                    <td>${d._count.packages}</td>
                    <td><span class="status-pill ${d.status === 'PUBLISHED' ? 'status-active' : 'status-warn'}">${escapeHtml(d.status)}</span></td>
                    ${canWrite ? `<td><button type="button" class="btn btn-outline btn-sm dest-edit-btn" data-id="${d.id}">Edit</button></td>` : ''}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      const newBtn = document.getElementById('dest-new-btn');
      if (newBtn) newBtn.addEventListener('click', () => openDestModal(null));
      container.querySelectorAll('.dest-edit-btn').forEach((b) => {
        b.addEventListener('click', () => {
          const found = destinations.find((d) => d.id === Number(b.getAttribute('data-id')));
          if (found) openDestModal(found);
        });
      });
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
