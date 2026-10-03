const fs = require('fs');
const path = require('path');

function inspectFolder(baseDir, type) {
  const folders = fs.readdirSync(baseDir).filter(f => {
    const p = path.join(baseDir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  const results = [];

  for (const f of folders) {
    const filePath = path.join(baseDir, f, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');

    // Skip redirect pages
    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
      continue;
    }

    const faqSectionMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
    const hasFaqSection = !!faqSectionMatch;

    let faqH2 = '';
    let faqCount = 0;
    let questions = [];
    let ebcMentionsInFaq = [];
    let mismatchIssues = [];

    if (hasFaqSection) {
      const sectionHtml = faqSectionMatch[0];
      const h2Match = sectionHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
      faqH2 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : '';

      // Count FAQ items
      const qMatches = [...sectionHtml.matchAll(/<button[^>]*class="faq-question-btn"[^>]*>([\s\S]*?)<\/button>/gi)];
      if (qMatches.length > 0) {
        questions = qMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
        faqCount = questions.length;
      } else {
        // Alternative FAQ item structure
        const itemMatches = [...sectionHtml.matchAll(/<div class="faq-item"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
        questions = itemMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
        faqCount = questions.length;
      }

      // Check if Everest / EBC is mentioned in FAQ section of non-Everest pages
      const isEverest = f.includes('everest') || f.includes('gokyo') || f.includes('island-peak') || f.includes('mera-peak') || f.includes('lobuche') || f.includes('three-high-passes');
      if (!isEverest) {
        const ebcHits = [...sectionHtml.matchAll(/\b(everest|ebc|lukla|kala patthar|namche)\b/gi)];
        if (ebcHits.length > 0) {
          ebcMentionsInFaq = Array.from(new Set(ebcHits.map(h => h[0])));
        }
      }

      // Check if Trek terminology is used in pure Tour pages (e.g. Chitwan Safari, Nagarkot Tour, Heritage Tour)
      if (type === 'tour') {
        const isHikeOrTrekTour = f.includes('hike') || f.includes('trek');
        if (!isHikeOrTrekTour) {
          const trekHits = [...sectionHtml.matchAll(/\b(trekking poles|teahouse accommodation|acute mountain sickness|himalayan trail|altitude sickness)\b/gi)];
          if (trekHits.length > 0) {
            mismatchIssues.push(`Tour has high-altitude trek terms: ${Array.from(new Set(trekHits.map(h => h[0]))).join(', ')}`);
          }
        }
      }
    }

    // Check schema FAQ
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
    let schemaFaqCount = 0;
    if (schemaMatch) {
      for (const sm of schemaMatch) {
        if (sm.includes('FAQPage')) {
          try {
            const jsonText = sm.replace(/<\/?script[^>]*>/gi, '').trim();
            const parsed = JSON.parse(jsonText);
            if (parsed['@type'] === 'FAQPage' && parsed.mainEntity) {
              schemaFaqCount = parsed.mainEntity.length;
            }
          } catch(e) {}
        }
      }
    }

    results.push({
      slug: f,
      type,
      hasFaqSection,
      faqH2,
      faqCount,
      schemaFaqCount,
      ebcMentionsInFaq,
      mismatchIssues,
      sampleQuestion: questions[0] || 'NONE'
    });
  }

  return results;
}

const trekResults = inspectFolder('trek', 'trek');
const tourResults = inspectFolder('tour', 'tour');

console.log('=== TREK FAQ AUDIT ===');
console.log(`Total active treks: ${trekResults.length}`);
const trekIssues = trekResults.filter(r => !r.hasFaqSection || r.ebcMentionsInFaq.length > 0 || r.faqCount === 0);
console.log(`Treks with potential issues: ${trekIssues.length}`);
trekIssues.forEach(t => {
  console.log(`- ${t.slug} | FAQs: ${t.faqCount} | Schema: ${t.schemaFaqCount} | EBC mentions: ${t.ebcMentionsInFaq.join(', ')} | H2: "${t.faqH2}"`);
});

console.log('\n=== TOUR FAQ AUDIT ===');
console.log(`Total active tours: ${tourResults.length}`);
tourResults.forEach(t => {
  console.log(`- ${t.slug} | FAQs: ${t.faqCount} | Schema: ${t.schemaFaqCount} | Issues: ${t.mismatchIssues.join('; ') || 'None'} | H2: "${t.faqH2}" | Sample: "${t.sampleQuestion.slice(0, 50)}"`);
});
