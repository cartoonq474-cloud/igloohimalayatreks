'use strict';

const BALANCED_TAGS = ['div', 'section', 'article', 'main', 'form', 'table', 'ul', 'li', 'nav'];

/**
 * Checks open/close tag balance matching scripts/update_navigation_menus.js.
 */
function checkTagBalance(html) {
  const mismatches = [];
  for (const tag of BALANCED_TAGS) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const openCount = (html.match(openRegex) || []).length;
    const closeCount = (html.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      mismatches.push({ tag, openCount, closeCount });
    }
  }
  return mismatches;
}

/**
 * Validates rendered Trek/Tour HTML against the 19 AGENTS.md non-negotiable rules.
 */
function validateTrekHtml(html) {
  const errors = [];
  const tagMismatches = checkTagBalance(html);
  if (tagMismatches.length > 0) {
    errors.push(
      `Tag balance mismatch: ${tagMismatches.map((m) => `<${m.tag}> (${m.openCount}/${m.closeCount})`).join(', ')}`
    );
  }

  const requiredHooks = [
    { pattern: /data-trek-details-wrapper/, msg: 'Missing data-trek-details-wrapper hook' },
    { pattern: /data-trek-key="/, msg: 'Missing data-trek-key attribute' },
    { pattern: /class="trek-sidebar-col"/, msg: 'Missing .trek-sidebar-col sticky column' },
    { pattern: /class="sidebar-booking-card"/, msg: 'Missing .sidebar-booking-card' },
    { pattern: /id="section-overview"/, msg: 'Missing #section-overview' },
    { pattern: /id="section-itinerary"/, msg: 'Missing #section-itinerary' },
    { pattern: /id="section-reviews"/, msg: 'Missing #section-reviews' },
    { pattern: /id="section-faqs"/, msg: 'Missing #section-faqs' },
    { pattern: /<link\s+rel="canonical"/i, msg: 'Missing canonical link tag' },
    { pattern: /<script\s+type="application\/ld\+json">/i, msg: 'Missing JSON-LD structured data' }
  ];

  for (const rule of requiredHooks) {
    if (!rule.pattern.test(html)) {
      errors.push(rule.msg);
    }
  }

  // Rule 2: #inquiry-modal must appear before .you-might-like-section
  const modalIdx = html.indexOf('id="inquiry-modal"');
  const recIdx = html.indexOf('class="you-might-like-section"');
  if (modalIdx === -1) {
    errors.push('Missing #inquiry-modal container');
  } else if (recIdx !== -1 && modalIdx > recIdx) {
    errors.push('Pre-footer ordering violation: #inquiry-modal must appear before .you-might-like-section');
  }

  // Rule 15: Never inline display:none on .faq-category-content
  if (/class="[^"]*faq-category-content[^"]*"[^>]*style="[^"]*display\s*:\s*none/i.test(html)) {
    errors.push('Rule 15 violation: inline display:none found on .faq-category-content');
  }

  // Rule 19: Avoid raw unicode stars/checkmarks in trek HTML body
  if (/[★✓]/.test(html)) {
    errors.push('Rule 19 violation: raw unicode star or checkmark glyph found (use inline SVG)');
  }

  // Validate JSON-LD parses cleanly
  const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  for (const block of jsonLdMatches) {
    const inner = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
    try {
      JSON.parse(inner);
    } catch (err) {
      errors.push(`Invalid JSON-LD block: ${err.message}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validateBlogHtml(html) {
  const errors = [];
  const tagMismatches = checkTagBalance(html);
  if (tagMismatches.length > 0) {
    errors.push(
      `Tag balance mismatch: ${tagMismatches.map((m) => `<${m.tag}> (${m.openCount}/${m.closeCount})`).join(', ')}`
    );
  }
  if (!/<link\s+rel="canonical"/i.test(html)) {
    errors.push('Missing canonical link tag');
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  checkTagBalance,
  validateTrekHtml,
  validateBlogHtml
};
