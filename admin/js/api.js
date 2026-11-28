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

/**
 * Safely parses a Fetch Response as JSON, surfacing clear HTTP/server diagnostics
 * when an empty or non-JSON (e.g. HTML error or static server) body is returned.
 */
export async function parseJsonResponse(res, fallbackMessage = 'Request failed') {
  const rawText = await res.text().catch(() => '');
  const cleanText = rawText.replace(/^\uFEFF/, '').trim();

  if (!cleanText) {
    if (res.ok) {
      return { success: true, data: {} };
    }
    return {
      success: false,
      error: {
        code: 'EMPTY_RESPONSE',
        message: `${fallbackMessage} (HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ''})`
      }
    };
  }

  try {
    return JSON.parse(cleanText);
  } catch (_err) {
    const plainSnippet = cleanText
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 180);
    const hint = res.status === 404 || res.status === 405
      ? ' Ensure the CMS server (npm run cms:start) is running.'
      : '';
    return {
      success: false,
      error: {
        code: 'INVALID_RESPONSE',
        message: `Server returned a non-JSON response (HTTP ${res.status}${plainSnippet ? `: ${plainSnippet}` : ''}).${hint}`
      }
    };
  }
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

  let res;
  try {
    res = await fetch(`/api/v1${path}`, {
      method,
      credentials: 'same-origin',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
  } catch (networkErr) {
    const err = new Error(
      `Unable to reach the CMS server (${networkErr && networkErr.message ? networkErr.message : 'network error'}).`
    );
    err.code = 'NETWORK_ERROR';
    throw err;
  }

  const payload = await parseJsonResponse(res, `Request failed (${res.status})`);

  if (!res.ok || !payload.success) {
    const err = new Error((payload.error && payload.error.message) || `Request failed (${res.status})`);
    err.status = res.status;
    err.code = payload.error && payload.error.code;
    err.details = payload.error && payload.error.details;
    throw err;
  }

  return payload.data;
}
