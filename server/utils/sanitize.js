'use strict';

const cheerio = require('cheerio');

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'details', 'summary', 'hr'
]);

const DROP_ENTIRE_TAGS = new Set([
  'script', 'style', 'noscript', 'template', 'iframe', 'object', 'embed', 'svg', 'math', 'form', 'input', 'textarea', 'button', 'select'
]);

const GLOBAL_ALLOWED_ATTRS = new Set(['class', 'id', 'aria-label', 'role', 'tabindex', 'style', 'data-rte-overview']);
const TAG_ALLOWED_ATTRS = {
  a: new Set(['href', 'name', 'target', 'rel', 'class', 'style']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading', 'decoding', 'class', 'style'])
};

const ALLOWED_STYLE_RULES = {
  color: [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i, /^[a-z]+$/i],
  'background-color': [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i, /^[a-z]+$/i],
  background: [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i],
  'text-align': [/^(left|center|right|justify)$/i],
  'border-left': [/^\d+px\s+solid\s+#[0-9a-f]{3,6}$/i],
  'border-radius': [/^[\d\spx%]+$/i],
  padding: [/^[\d\spxem.%]+$/i],
  margin: [/^[\d\spxem.%auto-]+$/i],
  'max-width': [/^[\dpx%]+$/i],
  width: [/^[\dpx%]+$/i],
  'font-style': [/^(italic|normal)$/i]
};

function isSafeUrl(rawVal) {
  const val = String(rawVal || '').trim();
  if (!val) return false;
  // Strip ASCII control chars & whitespace before scheme inspection
  const collapsed = val.replace(/[\u0000-\u0020\u007f]+/g, '').toLowerCase();
  if (collapsed.startsWith('//')) return false;
  const schemeMatch = collapsed.match(/^([a-z][a-z0-9+.-]*):/);
  if (schemeMatch) {
    return ['http', 'https', 'mailto', 'tel'].includes(schemeMatch[1]);
  }
  return true;
}

function sanitizeInlineStyle(rawStyle) {
  if (!rawStyle) return '';
  const kept = [];
  for (const decl of String(rawStyle).split(';')) {
    const colonIdx = decl.indexOf(':');
    if (colonIdx <= 0) continue;
    const prop = decl.slice(0, colonIdx).trim().toLowerCase();
    const val = decl.slice(colonIdx + 1).trim();
    const patterns = ALLOWED_STYLE_RULES[prop];
    if (!patterns || !val) continue;
    if (patterns.some((re) => re.test(val))) {
      kept.push(`${prop}: ${val}`);
    }
  }
  return kept.join('; ');
}

function sanitizeRichHtml(dirty) {
  if (!dirty) return '';
  const $ = cheerio.load(`<div id="__sanitize_root__">${String(dirty)}</div>`, {
    decodeEntities: true
  });
  const root = $('#__sanitize_root__');

  // Remove HTML comments
  root.contents().each(function walkComments() {
    if (this.type === 'comment') {
      $(this).remove();
    }
  });

  // Drop dangerous container elements completely
  root.find(Array.from(DROP_ENTIRE_TAGS).join(',')).remove();

  // Iterate bottom-up so unwrapping nested tags doesn't skip descendants
  const elements = root.find('*').toArray().reverse();
  for (const el of elements) {
    if (el.type === 'comment') {
      $(el).remove();
      continue;
    }
    const tagName = String(el.tagName || el.name || '').toLowerCase();
    const $el = $(el);

    if (!ALLOWED_TAGS.has(tagName)) {
      $el.replaceWith($el.contents());
      continue;
    }

    const perTag = TAG_ALLOWED_ATTRS[tagName];
    const attribs = el.attribs || {};
    for (const attrName of Object.keys(attribs)) {
      const lowerAttr = attrName.toLowerCase();
      const allowed = GLOBAL_ALLOWED_ATTRS.has(lowerAttr) || (perTag && perTag.has(lowerAttr));
      if (!allowed) {
        $el.removeAttr(attrName);
        continue;
      }

      if (lowerAttr === 'href' || lowerAttr === 'src') {
        if (!isSafeUrl(attribs[attrName])) {
          $el.removeAttr(attrName);
        }
      } else if (lowerAttr === 'style') {
        const cleanStyle = sanitizeInlineStyle(attribs[attrName]);
        if (cleanStyle) {
          $el.attr('style', cleanStyle);
        } else {
          $el.removeAttr('style');
        }
      }
    }
  }

  return root.html() || '';
}

module.exports = {
  sanitizeRichHtml
};
