import { apiRequest, setCsrfToken, showToast } from './api.js';
import { renderInquiriesModule } from './modules/inquiries.js';
import { renderMediaModule } from './modules/media.js';
import { renderSettingsModule } from './modules/settings.js';
import { renderPackagesModule } from './modules/packages.js';
import { renderDestinationsModule } from './modules/destinations.js';
import { renderBlogsModule } from './modules/blogs.js';
import { renderPagesModule } from './modules/pages.js';
import { renderReviewsModule } from './modules/reviews.js';
import { renderSeoModule } from './modules/seo.js';

const state = {
  user: null,
  activeModule: 'overview',
  usersSubTab: 'staff',
  rolesCache: [],
  permissionsCache: [],
  usersCache: []
};

const MODULE_META = {
  overview: { title: 'Dashboard Overview' },
  packages: { title: 'Trekking Packages', phase: 'Phase 3', desc: 'Create, edit, publish, and manage the 67 treks & 14 tours, itineraries, highlights, group prices, altitude profiles, and weather tables.' },
  destinations: { title: 'Destinations', phase: 'Phase 3', desc: 'Manage Everest, Annapurna, Langtang, Manaslu, Upper Mustang, Dolpo, Kanchenjunga, Makalu, Rolwaling, and Ganesh Himal region hubs.' },
  blogs: { title: 'Blog Management', phase: 'Phase 3', desc: 'Create, edit, publish, and categorize trekking guides, comparison tables, TOCs, and FAQs.' },
  pages: { title: 'Page Management', phase: 'Phase 3', desc: 'Manage editable blocks for Home, About Us, Contact Us, Custom Plan, Equipment Checklist, Legal pages, and Team profiles.' },
  media: { title: 'Media Library', phase: 'Phase 2', desc: 'Upload, replace, tag, and organize images and videos via Cloudinary CDN.' },
  inquiries: { title: 'Inquiry Management', phase: 'Phase 2', desc: 'Review incoming trek inquiries, assign sales staff, log follow-up notes, and track conversion status.' },
  reviews: { title: 'Reviews Management', phase: 'Phase 3', desc: 'Moderate customer, video, and TripAdvisor/Google/Trustpilot reviews and feature top testimonials.' },
  seo: { title: 'SEO Management', phase: 'Phase 3', desc: 'Edit meta titles, descriptions, canonical URLs, JSON-LD structured data overrides, 301 redirects, and sitemap generation.' },
  settings: { title: 'Website Settings', phase: 'Phase 2', desc: 'Configure global contact numbers, WhatsApp, emails, Kathmandu office address, social links, mega-menu, and footer links.' },
  users: { title: 'Admin & Permissions' }
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function hasPerm(perm) {
  if (!perm || !state.user) return true;
  return Array.isArray(state.user.permissions) && state.user.permissions.includes(perm);
}

function initialsOf(name) {
  return String(name || 'U')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

function showView(viewName) {
  document.getElementById('auth-loading').classList.add('hidden');
  document.getElementById('login-view').classList.toggle('hidden', viewName !== 'login');
  document.getElementById('dashboard-view').classList.toggle('hidden', viewName !== 'dashboard');
}

function applySidebarPermissions() {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach((btn) => {
    const reqPerm = btn.getAttribute('data-perm');
    btn.classList.toggle('hidden', Boolean(reqPerm && !hasPerm(reqPerm)));
  });
}

function setActiveModule(moduleKey) {
  state.activeModule = moduleKey;
  document.querySelectorAll('.sidebar-nav .nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-module') === moduleKey);
  });
  const meta = MODULE_META[moduleKey] || { title: 'CMS Module' };
  document.getElementById('module-title').textContent = meta.title;
  document.getElementById('cms-sidebar').classList.remove('open');
  renderActiveModule();
}

async function renderOverviewModule() {
  const container = document.getElementById('cms-content');
  container.innerHTML = '<div class="panel-card">Loading live PostgreSQL metrics...</div>';

  try {
    const data = await apiRequest('/admin/dashboard/summary');
    const m = data.metrics;

    container.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Trek &amp; Tour Packages</div>
          <div class="metric-value">${m.packages.total}</div>
          <div class="metric-sub">${m.packages.published} published</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Destinations</div>
          <div class="metric-value">${m.destinations.total}</div>
          <div class="metric-sub">Himalayan regions</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Open Inquiries</div>
          <div class="metric-value">${m.inquiries.openNew}</div>
          <div class="metric-sub">${m.inquiries.total} total received</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Blog Articles</div>
          <div class="metric-value">${m.blogs.total}</div>
          <div class="metric-sub">${m.media.total} media assets</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Reviews</div>
          <div class="metric-value">${m.reviews.approved}</div>
          <div class="metric-sub">${m.reviews.pending} awaiting moderation</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Active Staff</div>
          <div class="metric-value">${m.staff.active}</div>
          <div class="metric-sub">Role-based CMS access</div>
        </div>
      </div>

      <div class="split-grid">
        <div class="panel-card">
          <div class="panel-header">
            <h3>Recent Inquiries</h3>
          </div>
          <div class="table-wrap">
            ${data.recentInquiries.length === 0
              ? '<p class="metric-sub">No inquiries stored in database yet.</p>'
              : `<table>
                  <thead><tr><th>Ref</th><th>Traveler</th><th>Subject</th><th>Status</th></tr></thead>
                  <tbody>
                    ${data.recentInquiries.map((inq) => `
                      <tr>
                        <td><strong>${escapeHtml(inq.referenceCode)}</strong></td>
                        <td>${escapeHtml(inq.name)}<br><small>${escapeHtml(inq.email)}</small></td>
                        <td>${escapeHtml(inq.subject)}</td>
                        <td><span class="status-pill status-active">${escapeHtml(inq.status)}</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>
        </div>

        <div class="panel-card">
          <div class="panel-header">
            <h3>Recent Audit Activity</h3>
          </div>
          <div class="table-wrap">
            ${data.recentAuditLogs.length === 0
              ? '<p class="metric-sub">No audit entries yet.</p>'
              : `<table>
                  <thead><tr><th>Action</th><th>Summary</th><th>Actor</th></tr></thead>
                  <tbody>
                    ${data.recentAuditLogs.map((log) => `
                      <tr>
                        <td><strong>${escapeHtml(log.action)}</strong></td>
                        <td>${escapeHtml(log.summary || log.entityType)}</td>
                        <td>${escapeHtml(log.user ? log.user.fullName : 'System')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`}
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
  }
}

async function renderUsersModule() {
  const container = document.getElementById('cms-content');
  container.innerHTML = '<div class="panel-card">Loading users, roles, and audit logs...</div>';

  try {
    const canWriteUsers = hasPerm('users:write');
    const canManageRoles = hasPerm('users:manage_roles');
    const canReadAudit = hasPerm('audit:read');

    const [usersData, rolesData, auditData] = await Promise.all([
      apiRequest('/admin/users'),
      apiRequest('/admin/roles'),
      canReadAudit ? apiRequest('/admin/audit-logs?limit=30') : Promise.resolve({ logs: [] })
    ]);

    state.usersCache = usersData.users;
    state.rolesCache = rolesData.roles;
    state.permissionsCache = rolesData.permissions;

    container.innerHTML = `
      <div class="tabs-bar">
        <button type="button" class="tab-btn ${state.usersSubTab === 'staff' ? 'active' : ''}" data-subtab="staff">Staff Accounts (${usersData.users.length})</button>
        <button type="button" class="tab-btn ${state.usersSubTab === 'roles' ? 'active' : ''}" data-subtab="roles">Roles &amp; Permissions (${rolesData.roles.length})</button>
        ${canReadAudit ? `<button type="button" class="tab-btn ${state.usersSubTab === 'audit' ? 'active' : ''}" data-subtab="audit">Audit Logs</button>` : ''}
      </div>
      <div id="users-subtab-body"></div>
    `;

    container.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.usersSubTab = btn.getAttribute('data-subtab');
        renderUsersModule();
      });
    });

    const bodyEl = document.getElementById('users-subtab-body');

    if (state.usersSubTab === 'staff') {
      bodyEl.innerHTML = `
        <div class="panel-card">
          <div class="panel-header">
            <h3>Administrators &amp; Staff</h3>
            ${canWriteUsers ? '<button id="add-user-btn" type="button" class="btn btn-primary btn-sm">+ Add Staff Member</button>' : ''}
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  ${canWriteUsers ? '<th>Actions</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${usersData.users.map((u) => `
                  <tr>
                    <td><strong>${escapeHtml(u.fullName)}</strong><br><small>${escapeHtml(u.title || '')}</small></td>
                    <td>${escapeHtml(u.email)}</td>
                    <td>${escapeHtml(u.role.displayName)}</td>
                    <td><span class="status-pill ${u.isActive ? 'status-active' : 'status-inactive'}">${u.isActive ? 'Active' : 'Disabled'}</span></td>
                    <td>${u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}</td>
                    ${canWriteUsers ? `<td><button type="button" class="btn btn-outline btn-sm edit-user-btn" data-user-id="${u.id}">Edit</button></td>` : ''}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      const addBtn = document.getElementById('add-user-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => openUserModal(null));
      }
      bodyEl.querySelectorAll('.edit-user-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const uid = Number(btn.getAttribute('data-user-id'));
          const target = state.usersCache.find((u) => u.id === uid);
          if (target) openUserModal(target);
        });
      });
    } else if (state.usersSubTab === 'roles') {
      bodyEl.innerHTML = rolesData.roles.map((role) => `
        <div class="panel-card" style="margin-bottom: 16px;">
          <div class="panel-header">
            <div>
              <h3>${escapeHtml(role.displayName)} (${escapeHtml(role.name)})</h3>
              <p class="metric-sub">${escapeHtml(role.description || '')} &bull; ${role.userCount} user(s)</p>
            </div>
            ${canManageRoles && role.name !== 'SUPER_ADMIN'
              ? `<button type="button" class="btn btn-primary btn-sm save-role-perms-btn" data-role-id="${role.id}">Save Permissions</button>`
              : '<span class="metric-sub">Locked System Role</span>'}
          </div>
          <div class="perm-grid" data-role-grid="${role.id}">
            ${rolesData.permissions.map((perm) => {
              const checked = role.permissionKeys.includes(perm.key) ? 'checked' : '';
              const disabled = !canManageRoles || role.name === 'SUPER_ADMIN' ? 'disabled' : '';
              return `
                <label class="perm-item">
                  <input type="checkbox" value="${escapeHtml(perm.key)}" ${checked} ${disabled}>
                  <span><strong>${escapeHtml(perm.key)}</strong></span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `).join('');

      bodyEl.querySelectorAll('.save-role-perms-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const roleId = Number(btn.getAttribute('data-role-id'));
          const grid = bodyEl.querySelector(`[data-role-grid="${roleId}"]`);
          const keys = Array.from(grid.querySelectorAll('input[type="checkbox"]:checked')).map((el) => el.value);
          btn.disabled = true;
          btn.textContent = 'Saving...';
          try {
            await apiRequest(`/admin/roles/${roleId}/permissions`, {
              method: 'PATCH',
              body: { permissionKeys: keys }
            });
            btn.textContent = 'Saved';
            setTimeout(() => { btn.textContent = 'Save Permissions'; btn.disabled = false; }, 1200);
          } catch (err) {
            showToast(err.message, 'error');
            btn.textContent = 'Save Permissions';
            btn.disabled = false;
          }
        });
      });
    } else if (state.usersSubTab === 'audit') {
      bodyEl.innerHTML = `
        <div class="panel-card">
          <div class="panel-header"><h3>Recent Security &amp; Content Audit Logs</h3></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Entity</th><th>Summary</th><th>IP</th></tr></thead>
              <tbody>
                ${auditData.logs.map((log) => `
                  <tr>
                    <td>${new Date(log.createdAt).toLocaleString()}</td>
                    <td>${escapeHtml(log.user ? `${log.user.fullName} (${log.user.email})` : 'System')}</td>
                    <td><strong>${escapeHtml(log.action)}</strong></td>
                    <td>${escapeHtml(log.entityType)} ${log.entityId ? `#${escapeHtml(log.entityId)}` : ''}</td>
                    <td>${escapeHtml(log.summary || '')}</td>
                    <td>${escapeHtml(log.ipAddress || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  } catch (err) {
    container.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
  }
}

function renderActiveModule() {
  const container = document.getElementById('cms-content');
  if (state.activeModule === 'overview') return renderOverviewModule();
  if (state.activeModule === 'users') return renderUsersModule();
  if (state.activeModule === 'inquiries') return renderInquiriesModule(container, { hasPerm });
  if (state.activeModule === 'media') return renderMediaModule(container, { hasPerm });
  if (state.activeModule === 'settings') return renderSettingsModule(container, { hasPerm });
  if (state.activeModule === 'packages') return renderPackagesModule(container, { hasPerm });
  if (state.activeModule === 'destinations') return renderDestinationsModule(container, { hasPerm });
  if (state.activeModule === 'blogs') return renderBlogsModule(container, { hasPerm });
  if (state.activeModule === 'pages') return renderPagesModule(container, { hasPerm });
  if (state.activeModule === 'reviews') return renderReviewsModule(container, { hasPerm });
  if (state.activeModule === 'seo') return renderSeoModule(container, { hasPerm });
  const meta = MODULE_META[state.activeModule] || { title: 'Module', phase: 'Upcoming', desc: '' };
  container.innerHTML = `
    <div class="panel-card">
      <div class="panel-header">
        <h3>${escapeHtml(meta.title)}</h3>
        <span class="status-pill status-active">Scheduled: ${escapeHtml(meta.phase)}</span>
      </div>
      <p style="color: var(--muted); margin: 0;">${escapeHtml(meta.desc)}</p>
    </div>
  `;
}

function openUserModal(user) {
  const modal = document.getElementById('user-modal');
  const errEl = document.getElementById('user-modal-error');
  errEl.classList.add('hidden');

  const roleSelect = document.getElementById('user-role-select');
  roleSelect.innerHTML = state.rolesCache
    .map((r) => `<option value="${r.id}">${escapeHtml(r.displayName)}</option>`)
    .join('');

  document.getElementById('user-edit-id').value = user ? String(user.id) : '';
  document.getElementById('user-modal-title').textContent = user ? `Edit ${user.fullName}` : 'Add Staff Member';
  document.getElementById('user-fullname-input').value = user ? user.fullName : '';
  document.getElementById('user-email-input').value = user ? user.email : '';
  document.getElementById('user-email-input').disabled = Boolean(user);
  document.getElementById('user-title-input').value = user ? (user.title || '') : '';
  document.getElementById('user-phone-input').value = user ? (user.phone || '') : '';
  document.getElementById('user-role-select').value = user ? String(user.role.id) : String(state.rolesCache[0]?.id || '');
  document.getElementById('user-password-input').value = '';
  document.getElementById('user-password-input').required = !user;
  document.getElementById('user-password-hint').textContent = user ? '(leave blank to keep current)' : '(min 10 chars)';
  document.getElementById('user-active-checkbox').checked = user ? user.isActive : true;

  modal.classList.remove('hidden');
}

function closeUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
}

function hydrateSessionUser(data) {
  state.user = data.user;
  setCsrfToken(data.csrfToken);
  document.getElementById('user-fullname').textContent = data.user.fullName;
  document.getElementById('user-role-label').textContent = data.user.role.displayName;
  document.getElementById('user-initials').textContent = initialsOf(data.user.fullName);
  applySidebarPermissions();
  showView('dashboard');
  setActiveModule('overview');
}

async function bootstrap() {
  try {
    const data = await apiRequest('/admin/auth/me');
    hydrateSessionUser(data);
  } catch (_err) {
    showView('login');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap();

  // Sidebar navigation
  document.querySelectorAll('.sidebar-nav .nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveModule(btn.getAttribute('data-module'));
    });
  });

  // Mobile sidebar toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('cms-sidebar').classList.toggle('open');
  });

  // Login form
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-submit-btn');
    errEl.classList.add('hidden');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    try {
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const data = await apiRequest('/admin/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      hydrateSessionUser(data);
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In to CMS';
    }
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
      await apiRequest('/admin/auth/logout', { method: 'POST' });
    } catch (_err) {
      // Clear local state regardless
    }
    state.user = null;
    setCsrfToken('');
    showView('login');
  });

  // User modal events
  document.getElementById('close-user-modal').addEventListener('click', closeUserModal);
  document.getElementById('cancel-user-modal').addEventListener('click', closeUserModal);
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('user-modal-error');
    errEl.classList.add('hidden');
    const editId = document.getElementById('user-edit-id').value;
    const payload = {
      fullName: document.getElementById('user-fullname-input').value.trim(),
      title: document.getElementById('user-title-input').value.trim() || null,
      phone: document.getElementById('user-phone-input').value.trim() || null,
      roleId: Number(document.getElementById('user-role-select').value),
      isActive: document.getElementById('user-active-checkbox').checked
    };
    const password = document.getElementById('user-password-input').value;
    if (password) payload.password = password;

    try {
      if (editId) {
        await apiRequest(`/admin/users/${editId}`, { method: 'PATCH', body: payload });
      } else {
        payload.email = document.getElementById('user-email-input').value.trim();
        await apiRequest('/admin/users', { method: 'POST', body: payload });
      }
      closeUserModal();
      renderUsersModule();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
    }
  });

  // Shared Phase 2 modal close
  document.getElementById('close-phase2-modal').addEventListener('click', () => {
    document.getElementById('phase2-modal').classList.add('hidden');
  });

  // Change password modal events
  const pwdModal = document.getElementById('password-modal');
  document.getElementById('open-password-btn').addEventListener('click', () => {
    document.getElementById('password-modal-error').classList.add('hidden');
    document.getElementById('password-modal-success').classList.add('hidden');
    document.getElementById('password-form').reset();
    pwdModal.classList.remove('hidden');
  });
  document.getElementById('close-password-modal').addEventListener('click', () => pwdModal.classList.add('hidden'));
  document.getElementById('cancel-password-modal').addEventListener('click', () => pwdModal.classList.add('hidden'));
  document.getElementById('password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('password-modal-error');
    const okEl = document.getElementById('password-modal-success');
    errEl.classList.add('hidden');
    okEl.classList.add('hidden');

    try {
      await apiRequest('/admin/auth/change-password', {
        method: 'POST',
        body: {
          currentPassword: document.getElementById('current-password-input').value,
          newPassword: document.getElementById('new-password-input').value
        }
      });
      okEl.textContent = 'Password updated successfully.';
      okEl.classList.remove('hidden');
      document.getElementById('password-form').reset();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
    }
  });
});
