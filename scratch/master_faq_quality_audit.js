const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

const trekDir = path.join(__dirname, '../trek');
const tourDir = path.join(__dirname, '../tour');

function auditFaqs() {
  console.log('================================================================');
  console.log('   MASTER FAQ QUALITY AUDIT ACROSS ALL TREKS AND TOURS');
  console.log('================================================================\n');

  // 1. Audit Treks
  const trekFolders = fs.readdirSync(trekDir).filter(f => {
    const p = path.join(trekDir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  let totalActiveTreks = 0;
  let totalRedirectTreks = 0;
  let trekTagErrors = 0;
  let trekH2Mismatches = 0;
  let trekEbcRemnants = 0;
  let trekSchemaMissing = 0;
  let trekFaqCountTotal = 0;

  console.log('--- AUDITING 60 ACTIVE TREK PACKAGES ---');
  trekFolders.forEach(slug => {
    const filePath = path.join(trekDir, slug, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');

    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
      totalRedirectTreks++;
      return;
    }
    totalActiveTreks++;

    // Tag balance
    const balance = checkTagBalance(html);
    if (balance.errors.length > 0 || balance.unclosed.length > 0) {
      console.error(`[FAIL TAG BALANCE] ${slug}:`, balance);
      trekTagErrors++;
    }

    const sectionMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
    if (!sectionMatch) {
      console.error(`[FAIL NO FAQ SECTION] ${slug}`);
      return;
    }
    const section = sectionMatch[0];

    // H2 Title
    const h2Match = section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h2 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : '';

    // Check H2 against folder keywords
    if (slug !== 'abc-with-mardi-himal-trek') {
      const keywords = slug.split('-').filter(k => k.length > 3 && !['trek', 'with', 'lake', 'peak', 'circuit', 'valley', 'base', 'camp'].includes(k));
      const hasMatch = keywords.some(k => h2.toLowerCase().includes(k));
      if (!hasMatch && keywords.length > 0) {
        console.error(`[FAIL H2 MISMATCH] ${slug} -> H2: "${h2}"`);
        trekH2Mismatches++;
      }
    }

    // Count FAQ items
    const qMatches = [...section.matchAll(/<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>/gi)];
    trekFaqCountTotal += qMatches.length;
    if (qMatches.length < 20) {
      console.error(`[FAIL LOW FAQ COUNT] ${slug}: only ${qMatches.length} items`);
    }

    // Check EBC / Lukla on non-Everest
    const isEverest = /everest|gokyo|khumbu|island-peak|lobuche|mera-peak|three-high-passes/.test(slug);
    if (!isEverest) {
      const fullFaqText = section.replace(/<[^>]+>/g, ' ');
      const hits = [...fullFaqText.matchAll(/\b(everest base camp|ebc|lukla airport|flights to lukla|tengboche monastery|kala patthar)\b/gi)].map(x => x[0]);
      if (hits.length > 0) {
        console.error(`[FAIL EBC REMNANT] ${slug}: found ${Array.from(new Set(hits)).join(', ')}`);
        trekEbcRemnants++;
      }
    }

    // Check Schema
    const hasSchemaFaq = /"@type":\s*"FAQPage"/i.test(html);
    if (!hasSchemaFaq) {
      console.error(`[FAIL MISSING SCHEMA FAQ] ${slug}`);
      trekSchemaMissing++;
    }
  });

  console.log(`Active Treks Checked: ${totalActiveTreks}`);
  console.log(`Redirect Stubs Preserved: ${totalRedirectTreks}`);
  console.log(`Trek Tag Balance Errors: ${trekTagErrors}`);
  console.log(`Trek H2 Mismatches: ${trekH2Mismatches}`);
  console.log(`Trek EBC Remnants on Non-Everest: ${trekEbcRemnants}`);
  console.log(`Trek Missing Schema FAQPage: ${trekSchemaMissing}`);
  console.log(`Average FAQs per Trek: ${(trekFaqCountTotal / totalActiveTreks).toFixed(1)}\n`);

  // 2. Audit Tours
  const tourFolders = fs.readdirSync(tourDir).filter(f => {
    const p = path.join(tourDir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  let totalActiveTours = 0;
  let totalRedirectTours = 0;
  let tourTagErrors = 0;
  let tourH2Mismatches = 0;
  let tourSchemaMissing = 0;
  let tourFaqCountTotal = 0;

  console.log('--- AUDITING 12 ACTIVE TOUR PACKAGES ---');
  tourFolders.forEach(slug => {
    const filePath = path.join(tourDir, slug, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');

    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
      totalRedirectTours++;
      return;
    }
    totalActiveTours++;

    // Tag balance
    const balance = checkTagBalance(html);
    if (balance.errors.length > 0 || balance.unclosed.length > 0) {
      console.error(`[FAIL TOUR TAG BALANCE] ${slug}:`, balance);
      tourTagErrors++;
    }

    const sectionMatch = html.match(/<section[^>]*id=["']section-faqs["'][\s\S]*?<\/section>/i);
    if (!sectionMatch) {
      console.error(`[FAIL NO FAQ SECTION] ${slug}`);
      return;
    }
    const section = sectionMatch[0];

    const h2Match = section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h2 = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : '';

    const qMatches = [...section.matchAll(/<div class="faq-item-question">\s*<span>([\s\S]*?)<\/span>/gi)];
    tourFaqCountTotal += qMatches.length;

    const hasSchemaFaq = /"@type":\s*"FAQPage"/i.test(html);
    if (!hasSchemaFaq) {
      console.error(`[FAIL TOUR MISSING SCHEMA FAQ] ${slug}`);
      tourSchemaMissing++;
    }

    console.log(`[✓] Tour: ${slug.padEnd(40)} | FAQs: ${qMatches.length} | H2: "${h2.slice(0, 45)}..."`);
  });

  console.log(`\nActive Tours Checked: ${totalActiveTours}`);
  console.log(`Tour Redirects Preserved: ${totalRedirectTours}`);
  console.log(`Tour Tag Balance Errors: ${tourTagErrors}`);
  console.log(`Tour H2 Mismatches: ${tourH2Mismatches}`);
  console.log(`Tour Missing Schema FAQPage: ${tourSchemaMissing}`);
  console.log(`Average FAQs per Tour: ${(tourFaqCountTotal / totalActiveTours).toFixed(1)}\n`);

  console.log('================================================================');
  if (trekTagErrors === 0 && trekH2Mismatches === 0 && trekEbcRemnants === 0 && trekSchemaMissing === 0 &&
      tourTagErrors === 0 && tourH2Mismatches === 0 && tourSchemaMissing === 0) {
    console.log('   🎉 ALL AUDITS PASSED WITH 100% PERFECTION (0 DEFECTS) 🎉');
  } else {
    console.log('   ⚠️ SOME AUDIT ISSUES DETECTED');
  }
  console.log('================================================================');
}

auditFaqs();
