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

export async function renderMediaModule(container, { hasPerm }) {
  const state = {
    folder: '',
    resourceType: '',
    q: '',
    page: 1,
    cloudinaryConfigured: false,
    folders: []
  };

  const canWrite = hasPerm('media:write');
  const canDelete = hasPerm('media:delete');

  async function refreshStatus() {
    const status = await apiRequest('/admin/media/status');
    state.cloudinaryConfigured = status.cloudinaryConfigured;
    state.folders = status.folders || [];
  }

  async function loadMedia() {
    const params = new URLSearchParams({ page: String(state.page), limit: '24' });
    if (state.folder) params.set('folder', state.folder);
    if (state.resourceType) params.set('resourceType', state.resourceType);
    if (state.q) params.set('q', state.q);

    const res = await fetch(`/api/v1/admin/media?${params.toString()}`, { credentials: 'same-origin' });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error((json.error && json.error.message) || 'Failed to load media library.');
    }
    return json;
  }

  function openUploadModal() {
    const modal = document.getElementById('phase2-modal');
    const titleEl = document.getElementById('phase2-modal-title');
    const bodyEl = document.getElementById('phase2-modal-body');

    titleEl.textContent = 'Upload Media to Cloudinary';
    bodyEl.innerHTML = `
      ${!state.cloudinaryConfigured ? `
        <div class="alert alert-error">
          Cloudinary credentials are not configured in <code>.env</code>. Set <code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code>, and <code>CLOUDINARY_API_SECRET</code> to enable direct browser uploads, or register an existing asset URL below.
        </div>
      ` : ''}
      <form id="media-upload-form" class="stack-form">
        <div class="form-row-2">
          <div class="form-field">
            <label>Folder</label>
            <input id="media-up-folder" type="text" value="igloo-cms/treks" required>
          </div>
          <div class="form-field">
            <label>Resource Type</label>
            <select id="media-up-type">
              <option value="image">Image (WebP/JPG/PNG)</option>
              <option value="video">Video (MP4/WebM)</option>
            </select>
          </div>
        </div>
        ${state.cloudinaryConfigured ? `
          <div class="form-field">
            <label>Select File *</label>
            <input id="media-up-file" type="file" accept="image/*,video/*" required>
          </div>
        ` : `
          <div class="form-field">
            <label>Asset Public ID *</label>
            <input id="media-manual-pid" type="text" placeholder="e.g. treks/everest-panorama" required>
          </div>
          <div class="form-field">
            <label>Secure URL *</label>
            <input id="media-manual-url" type="text" placeholder="https://res.cloudinary.com/... or /images/..." required>
          </div>
        `}
        <div class="form-field">
          <label>Alt Text / Description</label>
          <input id="media-up-alt" type="text" placeholder="Everest Base Camp panoramic trail view">
        </div>
        <div id="media-up-error" class="alert alert-error hidden"></div>
        <div class="modal-actions">
          <button type="submit" id="media-up-submit" class="btn btn-primary">${state.cloudinaryConfigured ? 'Upload to Cloudinary' : 'Register Asset'}</button>
        </div>
      </form>
    `;

    modal.classList.remove('hidden');

    document.getElementById('media-upload-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('media-up-error');
      const btn = document.getElementById('media-up-submit');
      errEl.classList.add('hidden');
      btn.disabled = true;

      try {
        const folder = document.getElementById('media-up-folder').value.trim();
        const resourceType = document.getElementById('media-up-type').value;
        const altText = document.getElementById('media-up-alt').value.trim();

        if (state.cloudinaryConfigured) {
          const fileInput = document.getElementById('media-up-file');
          const file = fileInput.files && fileInput.files[0];
          if (!file) throw new Error('Please choose a file to upload.');

          const signed = await apiRequest('/admin/media/signature', {
            method: 'POST',
            body: { folder, resourceType }
          });

          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', signed.apiKey);
          formData.append('timestamp', String(signed.timestamp));
          formData.append('signature', signed.signature);
          formData.append('folder', signed.folder);

          const cloudRes = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
          const cloudData = await cloudRes.json();
          if (!cloudRes.ok) {
            throw new Error((cloudData.error && cloudData.error.message) || 'Cloudinary upload failed.');
          }

          await apiRequest('/admin/media', {
            method: 'POST',
            body: {
              cloudinaryPublicId: cloudData.public_id,
              resourceType: resourceType === 'video' ? 'VIDEO' : 'IMAGE',
              secureUrl: cloudData.secure_url,
              format: cloudData.format || null,
              width: cloudData.width || null,
              height: cloudData.height || null,
              bytes: cloudData.bytes || null,
              folder: signed.folder,
              title: file.name,
              altText: altText || file.name
            }
          });
        } else {
          const publicId = document.getElementById('media-manual-pid').value.trim();
          const secureUrl = document.getElementById('media-manual-url').value.trim();
          await apiRequest('/admin/media', {
            method: 'POST',
            body: {
              cloudinaryPublicId: publicId,
              resourceType: resourceType === 'video' ? 'VIDEO' : 'IMAGE',
              secureUrl,
              folder,
              title: publicId.split('/').pop(),
              altText: altText || null
            }
          });
        }

        modal.classList.add('hidden');
        await refreshStatus();
        await draw();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
        btn.disabled = false;
      }
    });
  }

  function openEditModal(asset) {
    const modal = document.getElementById('phase2-modal');
    document.getElementById('phase2-modal-title').textContent = `Edit Media — ${asset.title || asset.cloudinaryPublicId}`;
    document.getElementById('phase2-modal-body').innerHTML = `
      <form id="media-edit-form" class="stack-form">
        <div class="form-field">
          <label>Title</label>
          <input id="media-ed-title" type="text" value="${escapeHtml(asset.title || '')}">
        </div>
        <div class="form-field">
          <label>Alt Text</label>
          <input id="media-ed-alt" type="text" value="${escapeHtml(asset.altText || '')}">
        </div>
        <div class="form-row-2">
          <div class="form-field">
            <label>Folder</label>
            <input id="media-ed-folder" type="text" value="${escapeHtml(asset.folder || '')}">
          </div>
          <div class="form-field">
            <label>Secure URL</label>
            <input id="media-ed-url" type="text" value="${escapeHtml(asset.secureUrl)}">
          </div>
        </div>
        <div id="media-ed-error" class="alert alert-error hidden"></div>
        <div class="modal-actions" style="justify-content:space-between;">
          ${canDelete ? '<button type="button" id="media-delete-btn" class="btn btn-danger-outline btn-sm">Delete Asset</button>' : '<span></span>'}
          <button type="submit" class="btn btn-primary btn-sm">Save Changes</button>
        </div>
      </form>
    `;
    modal.classList.remove('hidden');

    document.getElementById('media-edit-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      await apiRequest(`/admin/media/${asset.id}`, {
        method: 'PATCH',
        body: {
          title: document.getElementById('media-ed-title').value.trim() || null,
          altText: document.getElementById('media-ed-alt').value.trim() || null,
          folder: document.getElementById('media-ed-folder').value.trim(),
          secureUrl: document.getElementById('media-ed-url').value.trim()
        }
      });
      modal.classList.add('hidden');
      await refreshStatus();
      await draw();
    });

    const delBtn = document.getElementById('media-delete-btn');
    if (delBtn) {
      delBtn.addEventListener('click', async () => {
        if (!confirm('Delete this media asset?')) return;
        try {
          await apiRequest(`/admin/media/${asset.id}`, { method: 'DELETE' });
          modal.classList.add('hidden');
          await refreshStatus();
          await draw();
        } catch (err) {
          const errEl = document.getElementById('media-ed-error');
          errEl.textContent = err.message;
          errEl.classList.remove('hidden');
        }
      });
    }
  }

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading media library...</div>';
    try {
      await refreshStatus();
      const result = await loadMedia();
      const { assets } = result.data;
      const meta = result.meta;

      container.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h3>Media Library (${meta.total} assets)</h3>
              <span class="metric-sub">${state.cloudinaryConfigured ? 'Cloudinary Connected (Direct Upload Enabled)' : 'Local Asset Catalog Mode (Configure Cloudinary keys in .env for cloud upload)'}</span>
            </div>
            <div class="toolbar-row">
              <input id="media-search-input" type="search" placeholder="Search title, alt, path..." value="${escapeHtml(state.q)}">
              <select id="media-type-filter">
                <option value="">All Types</option>
                <option value="IMAGE" ${state.resourceType === 'IMAGE' ? 'selected' : ''}>Images</option>
                <option value="VIDEO" ${state.resourceType === 'VIDEO' ? 'selected' : ''}>Videos</option>
              </select>
              <select id="media-folder-filter">
                <option value="">All Folders</option>
                ${state.folders.map((f) => `<option value="${escapeHtml(f.folder)}" ${state.folder === f.folder ? 'selected' : ''}>${escapeHtml(f.folder)} (${f.count})</option>`).join('')}
              </select>
              ${canWrite ? '<button id="media-open-upload" type="button" class="btn btn-primary btn-sm">+ Upload Media</button>' : ''}
            </div>
          </div>

          ${assets.length === 0
            ? '<p class="metric-sub">No media assets indexed yet. Run <code>node scripts/import_local_media_catalog.js</code> or click "+ Upload Media".</p>'
            : `<div class="media-grid">
                ${assets.map((asset) => `
                  <div class="media-card">
                    <div class="media-thumb">
                      ${asset.resourceType === 'VIDEO'
                        ? `<div class="video-placeholder">VIDEO (${escapeHtml(asset.format || 'mp4')})</div>`
                        : `<img src="${escapeHtml(asset.secureUrl)}" alt="${escapeHtml(asset.altText || asset.title || '')}" loading="lazy">`}
                    </div>
                    <div class="media-info">
                      <strong title="${escapeHtml(asset.title || asset.cloudinaryPublicId)}">${escapeHtml(asset.title || asset.cloudinaryPublicId)}</strong>
                      <small>${escapeHtml(asset.folder)} ${asset.width && asset.height ? `&bull; ${asset.width}x${asset.height}` : ''}</small>
                      <div class="media-actions">
                        <button type="button" class="btn btn-outline btn-sm copy-media-url" data-url="${escapeHtml(asset.secureUrl)}">Copy URL</button>
                        ${canWrite ? `<button type="button" class="btn btn-outline btn-sm edit-media-btn" data-id="${asset.id}">Edit</button>` : ''}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>`}

          <div class="pagination-row">
            <span class="metric-sub">Page ${meta.page} of ${meta.totalPages}</span>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" id="media-prev-btn" ${meta.page <= 1 ? 'disabled' : ''}>Previous</button>
              <button type="button" class="btn btn-outline btn-sm" id="media-next-btn" ${meta.page >= meta.totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;

      const uploadBtn = document.getElementById('media-open-upload');
      if (uploadBtn) uploadBtn.addEventListener('click', openUploadModal);

      document.getElementById('media-type-filter').addEventListener('change', (e) => {
        state.resourceType = e.target.value; state.page = 1; draw();
      });
      document.getElementById('media-folder-filter').addEventListener('change', (e) => {
        state.folder = e.target.value; state.page = 1; draw();
      });
      const searchEl = document.getElementById('media-search-input');
      searchEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { state.q = searchEl.value.trim(); state.page = 1; draw(); }
      });

      document.getElementById('media-prev-btn').addEventListener('click', () => {
        if (state.page > 1) { state.page--; draw(); }
      });
      document.getElementById('media-next-btn').addEventListener('click', () => {
        if (state.page < meta.totalPages) { state.page++; draw(); }
      });

      container.querySelectorAll('.copy-media-url').forEach((btn) => {
        btn.addEventListener('click', () => {
          navigator.clipboard?.writeText(btn.getAttribute('data-url'));
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy URL'; }, 1000);
        });
      });

      container.querySelectorAll('.edit-media-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = Number(btn.getAttribute('data-id'));
          const asset = assets.find((a) => a.id === id);
          if (asset) openEditModal(asset);
        });
      });
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
