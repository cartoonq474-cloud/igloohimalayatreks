import { apiRequest, showToast } from '../api.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function renderSeoModule(container, { hasPerm }) {
  const canWrite = hasPerm('seo:write');
  const canPublish = hasPerm('seo:publish');
  let activeTab = 'meta';

  function openSeoModal(rec) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = `Edit SEO #${rec.id} (${rec.entityType})`;
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="seo-edit-form" class="stack-form">
        <div class="form-field"><label>Meta Title *</label><input id="seo-title" type="text" value="${escapeHtml(rec.metaTitle)}" required></div>
        <div class="form-field"><label>Meta Description</label><textarea id="seo-desc" rows="3">${escapeHtml(rec.metaDescription || '')}</textarea></div>
        <div class="form-row-2">
          <div class="form-field"><label>Canonical URL</label><input id="seo-canon" type="url" value="${escapeHtml(rec.canonicalUrl || '')}"></div>
          <div class="form-field"><label>Robots Directive</label><input id="seo-robots" type="text" value="${escapeHtml(rec.robotsDirective || 'index,follow')}"></div>
        </div>
        <div class="form-row-2">
          <div class="form-field"><label>Schema Type</label><input id="seo-schema" type="text" value="${escapeHtml(rec.schemaType || '')}"></div>
          <div class="form-field"><label>Keywords</label><input id="seo-kw" type="text" value="${escapeHtml(rec.keywords || '')}"></div>
        </div>
        <div id="seo-err" class="alert alert-error hidden"></div>
        <div class="modal-actions"><button type="submit" class="btn btn-primary btn-sm">Save SEO</button></div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('seo-edit-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      await apiRequest(`/admin/seo/${rec.id}`, {
        method: 'PATCH',
        body: {
          metaTitle: document.getElementById('seo-title').value.trim(),
          metaDescription: document.getElementById('seo-desc').value.trim() || null,
          canonicalUrl: document.getElementById('seo-canon').value.trim() || null,
          robotsDirective: document.getElementById('seo-robots').value.trim(),
          schemaType: document.getElementById('seo-schema').value.trim() || null,
          keywords: document.getElementById('seo-kw').value.trim() || null
        }
      });
      modal.classList.add('hidden');
      draw();
    });
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading SEO &amp; Redirects...</div>';
    try {
      const [metaRes, auditRes, redirRes] = await Promise.all([
        apiRequest('/admin/seo'),
        apiRequest('/admin/seo/audit'),
        apiRequest('/admin/seo/redirects')
      ]);

      container.innerHTML = `
        <div class="tabs-bar">
          <button type="button" class="tab-btn ${activeTab === 'meta' ? 'active' : ''}" data-tab="meta">Meta &amp; Schema (${metaRes.records.length})</button>
          <button type="button" class="tab-btn ${activeTab === 'audit' ? 'active' : ''}" data-tab="audit">SEO Health Audit (${auditRes.issueCount})</button>
          <button type="button" class="tab-btn ${activeTab === 'redirects' ? 'active' : ''}" data-tab="redirects">301 Redirects (${redirRes.redirects.length})</button>
        </div>
        <div id="seo-sub-body"></div>
      `;

      container.querySelectorAll('.tab-btn').forEach((b) => b.addEventListener('click', () => { activeTab = b.getAttribute('data-tab'); draw(); }));
      const bodyEl = document.getElementById('seo-sub-body');

      if (activeTab === 'meta') {
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>SEO Metadata &amp; Canonical URLs</h3>
              ${canPublish ? '<button id="seo-rebuild-sitemap" type="button" class="btn btn-primary btn-sm">Rebuild sitemap.xml</button>' : ''}
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Entity</th><th>Meta Title</th><th>Canonical</th><th>Schema</th>${canWrite ? '<th>Actions</th>' : ''}</tr></thead>
                <tbody>
                  ${metaRes.records.map((r) => `
                    <tr>
                      <td><strong>${escapeHtml(r.entityType)}</strong></td>
                      <td>${escapeHtml(r.metaTitle)}<br><small>${escapeHtml((r.metaDescription || '').slice(0, 90))}</small></td>
                      <td><small>${escapeHtml(r.canonicalUrl || '-')}</small></td>
                      <td>${escapeHtml(r.schemaType || '-')}</td>
                      ${canWrite ? `<td><button type="button" class="btn btn-outline btn-sm seo-edit-btn" data-id="${r.id}">Edit</button></td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        bodyEl.querySelectorAll('.seo-edit-btn').forEach((b) => b.addEventListener('click', () => {
          const found = metaRes.records.find((r) => r.id === Number(b.getAttribute('data-id')));
          if (found) openSeoModal(found);
        }));
        const smBtn = document.getElementById('seo-rebuild-sitemap');
        if (smBtn) {
          smBtn.addEventListener('click', async () => {
            smBtn.disabled = true;
            try {
              const res = await apiRequest('/admin/publish/sitemap', { method: 'POST' });
              showToast(`Rebuilt sitemap.xml with ${res.count} URLs.`, 'success', { href: '/sitemap.xml', label: 'View Sitemap ↗' });
            } catch (err) {
              showToast(err.message, 'error');
            } finally {
              smBtn.disabled = false;
            }
          });
        }
      } else if (activeTab === 'audit') {
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header"><h3>SEO Health Check (${auditRes.issueCount} flagged of ${auditRes.totalRecords})</h3></div>
            <div class="table-wrap">
              ${auditRes.issues.length === 0
                ? '<p class="metric-sub">All SEO records pass length, description, and canonical checks!</p>'
                : `<table>
                    <thead><tr><th>Type</th><th>Title</th><th>Issues</th></tr></thead>
                    <tbody>
                      ${auditRes.issues.map((iss) => `
                        <tr>
                          <td>${escapeHtml(iss.entityType)}</td>
                          <td>${escapeHtml(iss.metaTitle)}</td>
                          <td>${iss.problems.map((p) => `<span class="status-pill status-warn" style="margin-right:4px;">${escapeHtml(p)}</span>`).join('')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>`}
            </div>
          </div>
        `;
      } else {
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>301 / 302 Redirect Rules</h3>
              ${canPublish ? '<button id="seo-sync-redirects" type="button" class="btn btn-outline btn-sm">Sync _redirects File</button>' : ''}
            </div>
            ${canWrite ? `
              <form id="redir-form" class="toolbar-row" style="margin-bottom: 14px;">
                <input id="redir-from" type="text" placeholder="/old-slug/" required>
                <input id="redir-to" type="text" placeholder="/trek/new-slug/" required>
                <button type="submit" class="btn btn-primary btn-sm">+ Add 301 Redirect</button>
              </form>
            ` : ''}
            <div class="table-wrap">
              <table>
                <thead><tr><th>From</th><th>To</th><th>Code</th>${canWrite ? '<th>Actions</th>' : ''}</tr></thead>
                <tbody>
                  ${redirRes.redirects.map((rd) => `
                    <tr>
                      <td><code>${escapeHtml(rd.fromPath)}</code></td>
                      <td><code>${escapeHtml(rd.toPath)}</code></td>
                      <td>${rd.statusCode}</td>
                      ${canWrite ? `<td><button type="button" class="btn btn-danger-outline btn-sm redir-del-btn" data-id="${rd.id}">Delete</button></td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        const rf = document.getElementById('redir-form');
        if (rf) {
          rf.addEventListener('submit', async (e) => {
            e.preventDefault();
            await apiRequest('/admin/seo/redirects', {
              method: 'POST',
              body: {
                fromPath: document.getElementById('redir-from').value.trim(),
                toPath: document.getElementById('redir-to').value.trim(),
                statusCode: 301
              }
            });
            draw();
          });
        }
        bodyEl.querySelectorAll('.redir-del-btn').forEach((b) => b.addEventListener('click', async () => {
          await apiRequest(`/admin/seo/redirects/${b.getAttribute('data-id')}`, { method: 'DELETE' });
          draw();
        }));
        const syncBtn = document.getElementById('seo-sync-redirects');
        if (syncBtn) {
          syncBtn.addEventListener('click', async () => {
            syncBtn.disabled = true;
            try {
              const res = await apiRequest('/admin/publish/redirects', { method: 'POST' });
              showToast(`Synced _redirects with ${res.count} active rules.`, 'success');
            } catch (err) {
              showToast(err.message, 'error');
            } finally {
              syncBtn.disabled = false;
            }
          });
        }
      }
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
