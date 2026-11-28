let csrfToken = '';

export function setCsrfToken(token) {
  csrfToken = token || '';
}

export function getCsrfToken() {
  return csrfToken;
}

export function showToast(message, type = 'success', link = null) {
  let root = document.getElementById('cms-toast-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'cms-toast-root';
    root.className = 'cms-toast-root';
    document.body.appendChild(root);
  }

  const toast = document.createElement('div');
  toast.className = `cms-toast cms-toast-${type === 'error' ? 'error' : 'success'}`;

  const msgSpan = document.createElement('span');
  msgSpan.textContent = message;
  toast.appendChild(msgSpan);

  if (link && link.href) {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'cms-toast-link';
    a.textContent = link.label || 'View Page';
    toast.appendChild(a);
  }

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'cms-toast-close';
  closeBtn.setAttribute('aria-label', 'Dismiss notification');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => toast.remove());
  toast.appendChild(closeBtn);

  root.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5500);
}

export async function apiRequest(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = {
    'Accept': 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const res = await fetch(`/api/v1${path}`, {
    method,
    credentials: 'same-origin',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await res.json().catch(() => ({
    success: false,
    error: { code: 'INVALID_RESPONSE', message: 'Invalid JSON response from server.' }
  }));

  if (!res.ok || !payload.success) {
    const err = new Error((payload.error && payload.error.message) || `Request failed (${res.status})`);
    err.status = res.status;
    err.code = payload.error && payload.error.code;
    err.details = payload.error && payload.error.details;
    throw err;
  }

  return payload.data;
}
