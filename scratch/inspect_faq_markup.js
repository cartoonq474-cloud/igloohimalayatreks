const fs = require('fs');

function inspectFaqMarkup(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const m = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (!m) return console.log('NO FAQ SECTION in ' + filePath);
  
  console.log(`\n============================= ${filePath} =============================`);
  const sectionHtml = m[0];
  
  // Find H2
  const h2 = (sectionHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '';
  console.log('H2:', h2.replace(/<[^>]+>/g, '').trim());

  // Check how questions are structured: <summary>, <h3/h4>, <div class="faq-...">
  const summaries = [...sectionHtml.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)];
  const h3s = [...sectionHtml.matchAll(/<h3[^>]*class="faq-[^"]*"[^>]*>([\s\S]*?)<\/h3>/gi)];
  const details = [...sectionHtml.matchAll(/<details[^>]*>([\s\S]*?)<\/details>/gi)];
  const faqItems = [...sectionHtml.matchAll(/<div class="faq-item"([^>]*)>([\s\S]*?)<\/div>/gi)];

  console.log(`Counts: summaries=${summaries.length}, details=${details.length}, faqItems=${faqItems.length}`);

  if (summaries.length > 0) {
    console.log('Sample questions from <summary>:');
    summaries.slice(0, 5).forEach((s, idx) => console.log(`  ${idx+1}. ${s[1].replace(/<[^>]+>/g, '').trim()}`));
  } else if (faqItems.length > 0) {
    console.log('Sample faq-item head:\n', faqItems[0][0].slice(0, 400));
  } else {
    console.log('Sample section content:\n', sectionHtml.slice(0, 1500));
  }
}

inspectFaqMarkup('trek/annapurna-circuit-trek/index.html');
inspectFaqMarkup('trek/kanchenjunga-circuit-trek/index.html');
inspectFaqMarkup('trek/island-peak-climbing/index.html');
inspectFaqMarkup('tour/chitwan-national-park-safari/index.html');
