'use strict';

const sanitizeHtml = require('sanitize-html');

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'details', 'summary', 'hr'
];

function sanitizeRichHtml(dirty) {
  if (!dirty) return '';
  return sanitizeHtml(String(dirty), {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'class', 'style'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding', 'class', 'style'],
      '*': ['class', 'id', 'aria-label', 'role', 'tabindex', 'style', 'data-rte-overview']
    },
    allowedStyles: {
      '*': {
        color: [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i, /^[a-z]+$/i],
        'background-color': [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i, /^[a-z]+$/i],
        background: [/^#[0-9a-f]{3,6}$/i, /^rgb\([\d\s,]+\)$/i],
        'text-align': [/^(left|center|right|justify)$/],
        'border-left': [/^\d+px\s+solid\s+#[0-9a-f]{3,6}$/i],
        'border-radius': [/^[\d\spx%]+$/],
        padding: [/^[\d\spxem.%]+$/],
        margin: [/^[\d\spxem.%auto-]+$/],
        'max-width': [/^[\dpx%]+$/],
        width: [/^[\dpx%]+$/],
        'font-style': [/^(italic|normal)$/]
      }
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false
  });
}

module.exports = {
  sanitizeRichHtml
};
