import { apiRequest, parseJsonResponse } from '../api.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUOTED', 'NEGOTIATING', 'BOOKED', 'ARCHIVED', 'SPAM'];
const PRIORITY_OPTIONS = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];

export async function renderInquiriesModule(container, { hasPerm }) {
  const state = {
    status: '',
    priority: '',
    q: '',
    page: 1,
    staff: []
  };

  const canWrite = hasPerm('inquiries:write');
  const canAssign = hasPerm('inquiries:assign');
  const canExport = hasPerm('inquiries:export');

  if (canAssign) {
    try {
      const staffRes = await apiRequest('/admin/inquiries/staff-options');
      state.staff = staffRes.staff || [];
    } catch (_err) {
      state.staff = [];
    }
  }

  async function loadList() {
    const params = new URLSearchParams({ page: String(state.page), limit: '20' });
    if (state.status) params.set('status', state.status);
    if (state.priority) params.set('priority', state.priority);
    if (state.q) params.set('q', state.q);

    const res = await fetch(`/api/v1/admin/inquiries?${params.toString()}`, { credentials: 'same-origin' });
    const json = await parseJsonResponse(res, 'Failed to load inquiries.');
    if (!res.ok || !json.success) {
      throw new Error((json.error && json.error.message) || 'Failed to load inquiries.');
    }
    return json;
  }

  async function openInquiryDetail(id) {
    const detailData = await apiRequest(`/admin/inquiries/${id}`);
    const inq = detailData.inquiry;

    const modal = document.getElementById('phase2-modal');
    const titleEl = document.getElementById('phase2-modal-title');
    const bodyEl = document.getElementById('phase2-modal-body');

    titleEl.textContent = `Inquiry ${inq.referenceCode} — ${inq.name}`;
    bodyEl.innerHTML = `
      <div class="detail-meta-grid">
        <div><strong>Traveler:</strong> ${escapeHtml(inq.name)}</div>
        <div><strong>Email:</strong> <a href="mailto:${escapeHtml(inq.email)}">${escapeHtml(inq.email)}</a></div>
        <div><strong>Phone:</strong> ${escapeHtml(inq.phone)}</div>
        <div><strong>Travelers:</strong> ${escapeHtml(inq.travelersLabel || 'Not specified')}</div>
        <div><strong>Source:</strong> ${escapeHtml(inq.source)}</div>
        <div><strong>Date:</strong> ${new Date(inq.createdAt).toLocaleString()}</div>
      </div>

      <div class="panel-inset">
        <strong>Subject:</strong> ${escapeHtml(inq.subject)}<br>
        <p style="margin: 8px 0 0; white-space: pre-wrap;">${escapeHtml(inq.message)}</p>
        ${inq.customPlanJson ? `<pre class="json-preview">${escapeHtml(JSON.stringify(inq.customPlanJson, null, 2))}</pre>` : ''}
      </div>

      ${canWrite ? `
        <form id="inq-update-form" class="form-row-3" style="margin-top: 12px;">
          <div class="form-field">
            <label>Status</label>
            <select id="inq-detail-status">
              ${STATUS_OPTIONS.map((s) => `<option value="${s}" ${inq.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Priority</label>
            <select id="inq-detail-priority">
              ${PRIORITY_OPTIONS.map((p) => `<option value="${p}" ${inq.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Assigned Staff</label>
            <select id="inq-detail-assignee" ${!canAssign ? 'disabled' : ''}>
              <option value="">Unassigned</option>
              ${state.staff.map((u) => `<option value="${u.id}" ${inq.assignedToId === u.id ? 'selected' : ''}>${escapeHtml(u.fullName)}</option>`).join('')}
            </select>
          </div>
          <div style="grid-column: 1 / -1; display:flex; gap:10px; justify-content:space-between; align-items:center;">
            <a href="https://wa.me/${escapeHtml(String(inq.phone || '').replace(/\D/g, '') || '9779860843980')}?text=${encodeURIComponent(`Namaste ${inq.name}, following up on your Igloo Himalaya Treks inquiry (${inq.referenceCode}).`)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Reply on WhatsApp ↗</a>
            <button type="submit" class="btn btn-primary btn-sm">Update Lead</button>
          </div>
        </form>

        <form id="inq-note-form" class="stack-form" style="margin-top: 16px; border-top: 1px solid var(--border); padding-top: 14px;">
          <div class="form-field">
            <label>Add Follow-Up Note</label>
            <textarea id="inq-note-text" rows="2" placeholder="Sent quote PDF, waiting for flight confirmation..." required></textarea>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
            <input id="inq-note-followup" type="datetime-local" style="padding:7px 10px; border:1px solid #CBD5E1; border-radius:8px;">
            <button type="submit" class="btn btn-outline btn-sm">+ Add Note</button>
          </div>
        </form>
      ` : ''}

      <div style="margin-top: 16px;">
        <h4 style="font-size: 0.9rem; color: var(--navy); margin-bottom: 8px;">Follow-Up History (${inq.notes.length})</h4>
        ${inq.notes.length === 0
          ? '<p class="metric-sub">No follow-up notes yet.</p>'
          : inq.notes.map((n) => `
              <div class="note-item">
                <div class="note-head">
                  <strong>${escapeHtml(n.author ? n.author.fullName : 'Staff')}</strong>
                  <span>${new Date(n.createdAt).toLocaleString()}</span>
                </div>
                <p style="margin:4px 0 0;">${escapeHtml(n.noteText)}</p>
                ${n.nextFollowUpAt ? `<small style="color:var(--cyan);">Next follow-up: ${new Date(n.nextFollowUpAt).toLocaleString()}</small>` : ''}
              </div>
            `).join('')}
      </div>
    `;

    modal.classList.remove('hidden');

    const updateForm = document.getElementById('inq-update-form');
    if (updateForm) {
      updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const assigneeVal = document.getElementById('inq-detail-assignee').value;
        const body = {
          status: document.getElementById('inq-detail-status').value,
          priority: document.getElementById('inq-detail-priority').value
        };
        if (canAssign) {
          body.assignedToId = assigneeVal ? Number(assigneeVal) : null;
        }
        await apiRequest(`/admin/inquiries/${id}`, { method: 'PATCH', body });
        await openInquiryDetail(id);
        await draw();
      });
    }

    const noteForm = document.getElementById('inq-note-form');
    if (noteForm) {
      noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const noteText = document.getElementById('inq-note-text').value.trim();
        const followVal = document.getElementById('inq-note-followup').value;
        await apiRequest(`/admin/inquiries/${id}/notes`, {
          method: 'POST',
          body: {
            noteText,
            nextFollowUpAt: followVal ? new Date(followVal).toISOString() : null
          }
        });
        await openInquiryDetail(id);
        await draw();
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading inquiries...</div>';
    try {
      const result = await loadList();
      const { inquiries, statusSummary } = result.data;
      const meta = result.meta;

      container.innerHTML = `
        <div class="metrics-grid">
          <div class="metric-card"><div class="metric-label">New Leads</div><div class="metric-value">${statusSummary.NEW || 0}</div></div>
          <div class="metric-card"><div class="metric-label">Contacted</div><div class="metric-value">${statusSummary.CONTACTED || 0}</div></div>
          <div class="metric-card"><div class="metric-label">Quoted</div><div class="metric-value">${statusSummary.QUOTED || 0}</div></div>
          <div class="metric-card"><div class="metric-label">Booked</div><div class="metric-value">${statusSummary.BOOKED || 0}</div></div>
        </div>

        <div class="panel-card">
          <div class="panel-header">
            <h3>Customer Inquiries (${meta.total})</h3>
            <div class="toolbar-row">
              <input id="inq-search-input" type="search" placeholder="Search ref, name, email..." value="${escapeHtml(state.q)}">
              <select id="inq-status-filter">
                <option value="">All Statuses</option>
                ${STATUS_OPTIONS.map((s) => `<option value="${s}" ${state.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
              <select id="inq-priority-filter">
                <option value="">All Priorities</option>
                ${PRIORITY_OPTIONS.map((p) => `<option value="${p}" ${state.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
              ${canExport ? '<a href="/api/v1/admin/inquiries/export.csv" class="btn btn-outline btn-sm">Export CSV</a>' : ''}
            </div>
          </div>

          <div class="table-wrap">
            ${inquiries.length === 0
              ? '<p class="metric-sub">No matching inquiries found.</p>'
              : `<table>
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Traveler</th>
                      <th>Subject / Package</th>
                      <th>Source</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${inquiries.map((inq) => `
                      <tr>
                        <td><strong>${escapeHtml(inq.referenceCode)}</strong><br><small>${new Date(inq.createdAt).toLocaleDateString()}</small></td>
                        <td><strong>${escapeHtml(inq.name)}</strong><br><small>${escapeHtml(inq.email)} &bull; ${escapeHtml(inq.phone)}</small></td>
                        <td>${escapeHtml(inq.subject)}<br><small>${escapeHtml(inq.travelersLabel || '')}</small></td>
                        <td>${escapeHtml(inq.source)}</td>
                        <td>${escapeHtml(inq.assignedTo ? inq.assignedTo.fullName : 'Unassigned')}</td>
                        <td><span class="status-pill ${inq.status === 'NEW' ? 'status-warn' : 'status-active'}">${escapeHtml(inq.status)}</span></td>
                        <td><button type="button" class="btn btn-outline btn-sm view-inq-btn" data-id="${inq.id}">Manage (${inq._count.notes})</button></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>

          <div class="pagination-row">
            <span class="metric-sub">Page ${meta.page} of ${meta.totalPages}</span>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" id="inq-prev-btn" ${meta.page <= 1 ? 'disabled' : ''}>Previous</button>
              <button type="button" class="btn btn-outline btn-sm" id="inq-next-btn" ${meta.page >= meta.totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('inq-status-filter').addEventListener('change', (e) => {
        state.status = e.target.value;
        state.page = 1;
        draw();
      });
      document.getElementById('inq-priority-filter').addEventListener('change', (e) => {
        state.priority = e.target.value;
        state.page = 1;
        draw();
      });
      const searchEl = document.getElementById('inq-search-input');
      searchEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          state.q = searchEl.value.trim();
          state.page = 1;
          draw();
        }
      });

      document.getElementById('inq-prev-btn').addEventListener('click', () => {
        if (state.page > 1) { state.page--; draw(); }
      });
      document.getElementById('inq-next-btn').addEventListener('click', () => {
        if (state.page < meta.totalPages) { state.page++; draw(); }
      });

      container.querySelectorAll('.view-inq-btn').forEach((btn) => {
        btn.addEventListener('click', () => openInquiryDetail(Number(btn.getAttribute('data-id'))));
      });
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
