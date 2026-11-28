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

export async function renderSettingsModule(container, { hasPerm }) {
  const canWrite = hasPerm('settings:write');
  let activeTab = 'general';

  async function draw() {
    container.innerHTML = '<div class="panel-card">Loading website settings...</div>';
    try {
      const data = await apiRequest('/admin/settings');
      const s = data.settings;
      const menus = data.menus || [];
      const locations = data.availableMenuLocations || [];

      container.innerHTML = `
        <div class="tabs-bar">
          <button type="button" class="tab-btn ${activeTab === 'general' ? 'active' : ''}" data-tab="general">Contact, Social &amp; Footer</button>
          <button type="button" class="tab-btn ${activeTab === 'menus' ? 'active' : ''}" data-tab="menus">Navigation Menus (${menus.length})</button>
        </div>
        <div id="settings-tab-body"></div>
      `;

      container.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeTab = btn.getAttribute('data-tab');
          draw();
        });
      });

      const bodyEl = document.getElementById('settings-tab-body');

      if (activeTab === 'general') {
        const socials = s.socialLinksJson || {};
        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>Global Website &amp; Footer Settings</h3>
            </div>
            <div id="settings-save-msg" class="alert alert-success hidden"></div>
            <div id="settings-save-err" class="alert alert-error hidden"></div>
            <form id="settings-form" class="stack-form">
              <div class="form-row-2">
                <div class="form-field"><label>Company Name</label><input id="set-company" type="text" value="${escapeHtml(s.companyName)}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Legal Entity Name</label><input id="set-legal" type="text" value="${escapeHtml(s.legalName)}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              <div class="form-row-2">
                <div class="form-field"><label>Tagline</label><input id="set-tagline" type="text" value="${escapeHtml(s.tagline || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Copyright Text</label><input id="set-copyright" type="text" value="${escapeHtml(s.copyrightText)}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              <div class="form-row-2">
                <div class="form-field"><label>Primary Phone</label><input id="set-phone" type="text" value="${escapeHtml(s.phonePrimary)}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>WhatsApp Digits (no +)</label><input id="set-whatsapp" type="text" value="${escapeHtml(s.whatsappNumber)}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              <div class="form-row-2">
                <div class="form-field"><label>Primary Email</label><input id="set-email1" type="email" value="${escapeHtml(s.emailPrimary)}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Secondary Email</label><input id="set-email2" type="email" value="${escapeHtml(s.emailSecondary || '')}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              <div class="form-row-2">
                <div class="form-field"><label>Kathmandu Office Address</label><input id="set-address" type="text" value="${escapeHtml(s.officeAddress)}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Office Hours</label><input id="set-hours" type="text" value="${escapeHtml(s.officeHours || '')}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              <h4 style="margin-top: 8px; color: var(--navy);">Social Links</h4>
              <div class="form-row-2">
                <div class="form-field"><label>Facebook URL</label><input id="set-fb" type="url" value="${escapeHtml(socials.facebook || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Instagram URL</label><input id="set-ig" type="url" value="${escapeHtml(socials.instagram || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>YouTube URL</label><input id="set-yt" type="url" value="${escapeHtml(socials.youtube || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>LinkedIn URL</label><input id="set-li" type="url" value="${escapeHtml(socials.linkedin || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>TripAdvisor URL</label><input id="set-ta" type="url" value="${escapeHtml(socials.tripadvisor || '')}" ${!canWrite ? 'disabled' : ''}></div>
                <div class="form-field"><label>Google Maps URL</label><input id="set-gm" type="url" value="${escapeHtml(socials.googleMaps || '')}" ${!canWrite ? 'disabled' : ''}></div>
              </div>
              ${canWrite ? '<div class="modal-actions"><button type="submit" class="btn btn-primary">Save Website Settings</button></div>' : ''}
            </form>
          </div>
        `;

        const form = document.getElementById('settings-form');
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const okEl = document.getElementById('settings-save-msg');
          const errEl = document.getElementById('settings-save-err');
          okEl.classList.add('hidden');
          errEl.classList.add('hidden');
          try {
            await apiRequest('/admin/settings', {
              method: 'PATCH',
              body: {
                companyName: document.getElementById('set-company').value.trim(),
                legalName: document.getElementById('set-legal').value.trim(),
                tagline: document.getElementById('set-tagline').value.trim() || null,
                copyrightText: document.getElementById('set-copyright').value.trim(),
                phonePrimary: document.getElementById('set-phone').value.trim(),
                whatsappNumber: document.getElementById('set-whatsapp').value.trim(),
                emailPrimary: document.getElementById('set-email1').value.trim(),
                emailSecondary: document.getElementById('set-email2').value.trim() || null,
                officeAddress: document.getElementById('set-address').value.trim(),
                officeHours: document.getElementById('set-hours').value.trim() || null,
                socialLinksJson: {
                  facebook: document.getElementById('set-fb').value.trim(),
                  instagram: document.getElementById('set-ig').value.trim(),
                  youtube: document.getElementById('set-yt').value.trim(),
                  linkedin: document.getElementById('set-li').value.trim(),
                  tripadvisor: document.getElementById('set-ta').value.trim(),
                  googleMaps: document.getElementById('set-gm').value.trim()
                }
              }
            });
            okEl.textContent = 'Website settings saved successfully.';
            okEl.classList.remove('hidden');
          } catch (err) {
            errEl.textContent = err.message;
            errEl.classList.remove('hidden');
          }
        });
      } else {
        const selectedLocation = locations[0];
        const currentMenu = menus.find((m) => m.location === selectedLocation) || {
          location: selectedLocation,
          title: selectedLocation,
          itemsJson: []
        };

        bodyEl.innerHTML = `
          <div class="panel-card">
            <div class="panel-header">
              <h3>Header &amp; Footer Navigation Menus</h3>
              <select id="menu-location-select">
                ${locations.map((loc) => `<option value="${loc}">${loc}</option>`).join('')}
              </select>
            </div>
            <div id="menu-save-msg" class="alert alert-success hidden"></div>
            <div id="menu-save-err" class="alert alert-error hidden"></div>
            <form id="menu-form" class="stack-form">
              <div class="form-field">
                <label>Menu Display Title</label>
                <input id="menu-title-input" type="text" value="${escapeHtml(currentMenu.title)}" ${!canWrite ? 'disabled' : ''}>
              </div>
              <div class="form-field">
                <label>Menu Items (JSON Array of { label, href, badge, group })</label>
                <textarea id="menu-items-json" rows="12" style="font-family: monospace; font-size: 0.84rem;" ${!canWrite ? 'disabled' : ''}>${escapeHtml(JSON.stringify(currentMenu.itemsJson || [], null, 2))}</textarea>
              </div>
              ${canWrite ? '<div class="modal-actions"><button type="submit" class="btn btn-primary">Save Menu</button></div>' : ''}
            </form>
          </div>
        `;

        const locSelect = document.getElementById('menu-location-select');
        locSelect.addEventListener('change', () => {
          const found = menus.find((m) => m.location === locSelect.value) || {
            location: locSelect.value,
            title: locSelect.value,
            itemsJson: []
          };
          document.getElementById('menu-title-input').value = found.title;
          document.getElementById('menu-items-json').value = JSON.stringify(found.itemsJson || [], null, 2);
        });

        document.getElementById('menu-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const okEl = document.getElementById('menu-save-msg');
          const errEl = document.getElementById('menu-save-err');
          okEl.classList.add('hidden');
          errEl.classList.add('hidden');
          try {
            const itemsJson = JSON.parse(document.getElementById('menu-items-json').value);
            if (!Array.isArray(itemsJson)) throw new Error('Menu items must be a JSON array.');
            await apiRequest(`/admin/settings/menus/${locSelect.value}`, {
              method: 'PUT',
              body: {
                title: document.getElementById('menu-title-input').value.trim(),
                itemsJson
              }
            });
            okEl.textContent = `Saved menu ${locSelect.value}.`;
            okEl.classList.remove('hidden');
          } catch (err) {
            errEl.textContent = err.message;
            errEl.classList.remove('hidden');
          }
        });
      }
    } catch (err) {
      container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    }
  }

  await draw();
}
