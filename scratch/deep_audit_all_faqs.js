const fs = require('fs');
const path = require('path');

function extractFaqsFromHtml(html) {
  const section = (html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i) || [])[0];
  if (!section) return null;

  const h2 = ((section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '').replace(/<[^>]+>/g, '').trim();

  const itemRegex = /<div class="faq-item">[\s\S]*?<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-item-answer">([\s\S]*?)<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = itemRegex.exec(section)) !== null) {
    items.push({
      q: m[1].replace(/<[^>]+>/g, '').trim(),
      a: m[2].replace(/<[^>]+>/g, '').trim()
    });
  }

  // Also check category buttons
  const catMatches = [...section.matchAll(/class="faq-category-btn[^"]*"\s+data-category="([^"]+)"/g)].map(x => x[1]);

  return { h2, items, categories: catMatches, rawLength: section.length };
}

function checkAllTreks() {
  const trekDir = path.join(__dirname, '../trek');
  const folders = fs.readdirSync(trekDir).filter(f => {
    const p = path.join(trekDir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  const trekReport = [];

  for (const f of folders) {
    const filePath = path.join(trekDir, f, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');

    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) continue;

    const faqData = extractFaqsFromHtml(html);
    if (!faqData) {
      trekReport.push({ slug: f, error: 'NO FAQ SECTION' });
      continue;
    }

    const issues = [];
    const isEverest = /everest|gokyo|khumbu/i.test(f);
    const isPeakClimbing = /climbing|island-peak|lobuche|mera-peak|yala-peak/i.test(f);

    // Check H2
    if (!faqData.h2) {
      issues.push('Missing FAQ H2');
    } else {
      // Check if H2 title has wrong trek
      if (faqData.h2.includes('Annapurna Base Camp') && !f.includes('annapurna-base-camp')) {
        issues.push(`H2 mentions wrong trek: "${faqData.h2}"`);
      }
      if (faqData.h2.includes('Everest Base Camp') && !isEverest && !f.includes('everest')) {
        issues.push(`H2 mentions EBC on non-Everest: "${faqData.h2}"`);
      }
    }

    // Check items
    let ebcQCount = 0;
    let wrongFlightQCount = 0;
    const suspiciousItems = [];

    faqData.items.forEach((item, idx) => {
      const fullText = item.q + ' ' + item.a;

      // Lukla on non-Everest/non-Rolwaling (Rolwaling ends near Lukla or Barhabise, but mostly Charikot/Gonggar)
      if (/\blukla\b/i.test(fullText) && !isEverest && !/island-peak|mera-peak|lobuche|three-high-passes/.test(f)) {
        wrongFlightQCount++;
        suspiciousItems.push({ idx: idx + 1, q: item.q, reason: 'Mentions Lukla on non-Everest trek' });
      }

      // Everest / EBC on non-Everest / non-peak
      if (!isEverest && !/pikey-peak|island-peak|lobuche|mera-peak|three-high-passes/.test(f)) {
        if (/\b(everest base camp|ebc|kala patthar|namche bazaar|tengboche)\b/i.test(fullText)) {
          ebcQCount++;
          suspiciousItems.push({ idx: idx + 1, q: item.q, reason: 'Mentions EBC/Kala Patthar/Namche/Tengboche on non-Everest trek' });
        }
      }

      // Check if Peak climbing page has general trekking questions without climbing gear/permits
      if (isPeakClimbing && idx < 5) {
        if (/is this trek suitable for beginners/i.test(item.q) && !/climb|peak/i.test(item.q)) {
          // Check if climbing specifics are addressed
        }
      }
    });

    trekReport.push({
      slug: f,
      h2: faqData.h2,
      totalFaqs: faqData.items.length,
      categories: faqData.categories,
      issues,
      ebcQCount,
      wrongFlightQCount,
      suspiciousItems
    });
  }

  return trekReport;
}

const reports = checkAllTreks();
console.log(`Audited ${reports.length} active treks.\n`);

const withIssues = reports.filter(r => r.issues.length > 0 || r.ebcQCount > 0 || r.wrongFlightQCount > 0);
console.log(`Treks with FAQ mismatches/issues: ${withIssues.length} / ${reports.length}\n`);

withIssues.forEach(r => {
  console.log(`=== ${r.slug} (${r.totalFaqs} FAQs) ===`);
  if (r.issues.length > 0) console.log(`  Issues: ${r.issues.join('; ')}`);
  if (r.ebcQCount > 0 || r.wrongFlightQCount > 0) {
    console.log(`  EBC mentions: ${r.ebcQCount}, Lukla mentions: ${r.wrongFlightQCount}`);
    r.suspiciousItems.slice(0, 4).forEach(s => console.log(`    #${s.idx}: ${s.q} [${s.reason}]`));
  }
});
