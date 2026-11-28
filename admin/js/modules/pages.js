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

export async function renderPagesModule(container, { hasPerm }) {
  const canWrite = hasPerm('pages:write');
  const canPublish = hasPerm('pages:publish');
  let activeTab = 'pages';

  function openPageModal(page = null) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = page ? `Edit Page — /${page.slug}` : 'New CMS Page';
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="page-form" class="stack-form">
        <div class="form-row-3">
          <div class="form-field"><label>Slug *</label><input id="pg-slug" type="text" value="${escapeHtml(page ? page.slug : '')}" ${page ? 'disabled' : ''} required></div>
          <div class="form-field"><label>Title *</label><input id="pg-title" type="text" value="${escapeHtml(page ? page.title : '')}" required></div>
          <div class="form-field">
            <label>Status</label>
            <select id="pg-status" ${!canPublish ? 'disabled' : ''}>
              ${['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'].map((s) => `<option value="${s}" ${page && page.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field"><label>Editable Sections JSON</label><textarea id="pg-sections" rows="10" style="font-family:monospace;font-size:0.82rem;">${escapeHtml(JSON.stringify(page ? page.sectionsJson : {}, null, 2))}</textarea></div>
        <div id="pg-err" class="alert alert-error hidden"></div>
        <div class="modal-actions"><button type="submit" class="btn btn-primary btn-sm">Save Page</button></div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('page-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('pg-err');
      errEl.classList.add('hidden');
      try {
        const sectionsJson = JSON.parse(document.getElementById('pg-sections').value || '{}');
        const slug = document.getElementById('pg-slug').value.trim();
        const payload = {
          title: document.getElementById('pg-title').value.trim(),
          status: document.getElementById('pg-status').value,
          sectionsJson
        };
        if (page) {
          await apiRequest(`/admin/pages/${page.slug}`, { method: 'PATCH', body: payload });
        } else {
          await apiRequest('/admin/pages', { method: 'POST', body: { slug, templateKey: 'standard', ...payload } });
        }
        modal.classList.add('hidden');
        draw();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });
  }

  function openTeamModal(member = null) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = member ? `Edit Team Member — ${member.name}` : 'New Team Member';
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="team-form" class="stack-form">
        <div class="form-row-2">
          <div class="form-field"><label>Name *</label><input id="tm-name" type="text" value="${escapeHtml(member ? member.name : '')}" required></div>
          <div class="form-field"><label>Slug *</label><input id="tm-slug" type="text" value="${escapeHtml(member ? member.slug : '')}" required></div>
        </div>
        <div class="form-row-3">
          <div class="form-field"><label>Role *</label><input id="tm-role" type="text" value="${escapeHtml(member ? member.role : '')}" required></div>
          <div class="form-field"><label>Country Badge</label><input id="tm-country" type="text" value="${escapeHtml(member ? member.countryBadge : 'NEPAL')}"></div>
          <div class="form-field"><label>Phone</label><input id="tm-phone" type="text" value="${escapeHtml(member ? (member.phone || '') : '')}"></div>
        </div>
        <label class="checkbox-inline"><input id="tm-footer" type="checkbox" ${member && member.isFooterRep ? 'checked' : ''}><span>Show in Footer Worldwide Representatives</span></label>
        <div id="tm-err" class="alert alert-error hidden"></div>
        <div class="modal-actions" style="justify-content:space-between;">
          ${member ? '<button type="button" id="tm-del" class="btn btn-danger-outline btn-sm">Delete</button>' : '<span></span>'}
          <button type="submit" class="btn btn-primary btn-sm">Save Team Member</button>
        </div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('team-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('tm-name').value.trim(),
        slug: document.getElementById('tm-slug').value.trim(),
        role: document.getElementById('tm-role').value.trim(),
        countryBadge: document.getElementById('tm-country').value.trim() || 'NEPAL',
        phone: document.getElementById('tm-phone').value.trim() || null,
        isFooterRep: document.getElementById('tm-footer').checked
      };
      if (member) {
        await apiRequest(`/admin/pages/team/${member.id}`, { method: 'PATCH', body: payload });
      } else {
        await apiRequest('/admin/pages/team', { method: 'POST', body: payload });
      }
      modal.classList.add('hidden');
      draw();
    });

    const delBtn = document.getElementById('tm-del');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        if (!confirm(`Delete ${member.name}?`)) return;
        await apiRequest(`/admin/pages/team/${member.id}`, { method: 'DELETE' });
        modal.classList.add('hidden');
        draw();
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading pages &amp; team...</div>';
    try {
      const [pagesRes, teamRes] = await Promise.all([
        apiRequest('/admin/pages'),
        apiRequest('/admin/pages/team')
      ]);
      const pages = pagesRes.pages || [];
      const members = teamRes.members || [];

      container.innerHTML = `
        <div class="tabs-bar">
          <button type="button" class="tab-btn ${activeTab === 'pages' ? 'active' : ''}" data-tab="pages">Editable Pages (${pages.length})</button>
          <button type="button" class="tab-btn ${activeTab === 'team' ? 'active' : ''}" data-tab="team">Team &amp; Representatives (${members.length})</button>
        </div>
        <div id="pages-sub-body"></div>
      `;

      container.querySelectorAll('.tab-btn').forEach((b) => b.addEventListener('click', () => { activeTab = b.getAttribute('data-tab'); draw(); }));
      const bodyEl = document.getElementById('pages-sub-body');

      if (activeTab === 'pages') {
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>Website Pages</h3>
              ${canWrite ? '<button id="pg-new-btn" type="button" class="btn btn-primary btn-sm">+ New Page</button>' : ''}
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Page</th><th>Template</th><th>Status</th><th>Updated</th>${canWrite ? '<th>Actions</th>' : ''}</tr></thead>
                <tbody>
                  ${pages.map((p) => `
                    <tr>
                      <td><strong>${escapeHtml(p.title)}</strong><br><small>/${escapeHtml(p.slug)}</small></td>
                      <td>${escapeHtml(p.templateKey)}</td>
                      <td><span class="status-pill ${p.status === 'PUBLISHED' ? 'status-active' : 'status-warn'}">${escapeHtml(p.status)}</span></td>
                      <td>${new Date(p.updatedAt).toLocaleDateString()}</td>
                      ${canWrite ? `<td><button type="button" class="btn btn-outline btn-sm pg-edit-btn" data-slug="${escapeHtml(p.slug)}">Edit</button></td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        const newBtn = document.getElementById('pg-new-btn');
        if (newBtn) newBtn.addEventListener('click', () => openPageModal(null));
        bodyEl.querySelectorAll('.pg-edit-btn').forEach((b) => b.addEventListener('click', () => {
          const found = pages.find((p) => p.slug === b.getAttribute('data-slug'));
          if (found) openPageModal(found);
        }));
      } else {
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>Team Profiles &amp; Worldwide Reps</h3>
              ${canWrite ? '<button id="tm-new-btn" type="button" class="btn btn-primary btn-sm">+ Add Member</button>' : ''}
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Role</th><th>Country</th><th>Footer Rep</th>${canWrite ? '<th>Actions</th>' : ''}</tr></thead>
                <tbody>
                  ${members.map((m) => `
                    <tr>
                      <td><strong>${escapeHtml(m.name)}</strong><br><small>/team/${escapeHtml(m.slug)}</small></td>
                      <td>${escapeHtml(m.role)}</td>
                      <td>${escapeHtml(m.countryBadge)}</td>
                      <td>${m.isFooterRep ? 'Yes' : 'No'}</td>
                      ${canWrite ? `<td><button type="button" class="btn btn-outline btn-sm tm-edit-btn" data-id="${m.id}">Edit</button></td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        const newBtn = document.getElementById('tm-new-btn');
        if (newBtn) newBtn.addEventListener('click', () => openTeamModal(null));
        bodyEl.querySelectorAll('.tm-edit-btn').forEach((b) => b.addEventListener('click', () => {
          const found = members.find((m) => m.id === Number(b.getAttribute('data-id')));
          if (found) openTeamModal(found);
        }));
      }
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
