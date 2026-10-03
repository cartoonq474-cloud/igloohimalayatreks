const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');
const { buildFaqSectionHtml, updateSchemaFaqPage } = require('./faq_builder_core.js');
const { getTrekFaqData } = require('./generate_all_trek_faqs_data.js');

const trekDir = path.join(__dirname, '../trek');
const tourDir = path.join(__dirname, '../tour');

function getRegion(slug) {
  if (slug.includes('annapurna') || slug.includes('mardi') || slug.includes('poon') || slug.includes('khopra') || slug.includes('mohare') || slug.includes('panchase') || slug.includes('tilicho') || slug.includes('abc') || slug.includes('nar-phu')) return 'Annapurna';
  if (slug.includes('manaslu') || slug.includes('tsum')) return 'Manaslu';
  if (slug.includes('mustang')) return 'Mustang';
  if (slug.includes('dolpo')) return 'Dolpo';
  if (slug.includes('langtang') || slug.includes('gosaikunda') || slug.includes('helambu') || slug.includes('tamang') || slug.includes('yala')) return 'Langtang';
  if (slug.includes('kanchenjunga')) return 'Kanchenjunga';
  if (slug.includes('makalu')) return 'Makalu-Barun';
  if (slug.includes('dhaulagiri')) return 'Dhaulagiri';
  if (slug.includes('rolwaling')) return 'Rolwaling';
  if (slug.includes('rara')) return 'Rara / Karnali';
  if (slug.includes('ruby')) return 'Ganesh Himal / Ruby Valley';
  if (slug.includes('chisapani')) return 'Kathmandu Valley Rim';
  if (slug.includes('pikey')) return 'Lower Solukhumbu';
  return 'Everest';
}

function getCleanTitle(html, slug) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const rawH1 = h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (rawH1.length > 5 && !rawH1.toLowerCase().includes('redirect')) return rawH1;
  }
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    let t = titleMatch[1].replace(/—.*$/, '').replace(/\|.*$/, '').trim();
    t = t.replace(/\s*\([^)]*$/, '').trim();
    return t;
  }
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function deployTrekFaqs() {
  console.log('=== DEPLOYING OPTIMIZED FAQS ACROSS ALL 60 ACTIVE TREKS ===');
  const dirs = fs.readdirSync(trekDir).filter(f => {
    const p = path.join(trekDir, f);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  dirs.forEach(slug => {
    const filePath = path.join(trekDir, slug, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');

    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
      skippedCount++;
      return;
    }

    const cleanTitle = getCleanTitle(html, slug);
    const durMatch = html.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                     html.match(/([0-9]+\s*days?)/i);
    const duration = durMatch ? durMatch[1].trim() : '14 Days';

    const altMatch = html.match(/Max Altitude<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                     html.match(/(\d{1,2},\d{3}\s*m)/i);
    const altitude = altMatch ? altMatch[1].trim() : '5,000m';

    const region = getRegion(slug);

    const faqData = getTrekFaqData(slug, cleanTitle, duration, altitude, region);
    const h2Title = `Frequently Asked Questions for ${cleanTitle}`;
    const newSection = buildFaqSectionHtml(h2Title, faqData);

    const allQuestions = [];
    Object.keys(faqData).forEach(cat => {
      faqData[cat].forEach(it => allQuestions.push(it));
    });

    let updatedHtml = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, newSection);
    updatedHtml = updateSchemaFaqPage(updatedHtml, allQuestions);

    const balance = checkTagBalance(updatedHtml);
    if (balance.errors.length > 0 || balance.unclosed.length > 0) {
      console.error(`FAILED: Tag balance error on trek ${slug}:`, balance);
      failedCount++;
      return;
    }

    fs.writeFileSync(filePath, updatedHtml, 'utf8');
    successCount++;
    console.log(`[✓] Trek: ${slug.padEnd(46)} | FAQs: ${allQuestions.length} | H2: "${h2Title.slice(0, 45)}..."`);
  });

  console.log(`\nTreks Summary: ${successCount} updated, ${skippedCount} skipped (redirects), ${failedCount} failed.`);
  return { successCount, skippedCount, failedCount };
}

function deployTourFaqs() {
  console.log('\n=== DEPLOYING OPTIMIZED FAQS ACROSS ALL 12 ACTIVE TOURS ===');
  const tourFaqsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'tour_faqs_data.json'), 'utf8'));
  const tours = Object.keys(tourFaqsData);

  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  tours.forEach(slug => {
    const filePath = path.join(tourDir, slug, 'index.html');
    if (!fs.existsSync(filePath)) {
      console.log(`[NOT FOUND] tour ${slug}`);
      return;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
      skippedCount++;
      return;
    }

    const data = tourFaqsData[slug];
    let title = data.title;
    if (slug === 'everest-base-camp-helicopter-tour') {
      title = 'Everest Base Camp 1-Day Helicopter Tour';
    }
    const h2Title = `Frequently Asked Questions for ${title}`;
    const newSection = buildFaqSectionHtml(h2Title, data.categories);

    const allQuestions = [];
    Object.keys(data.categories).forEach(cat => {
      data.categories[cat].forEach(it => allQuestions.push(it));
    });

    let updatedHtml = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, newSection);
    updatedHtml = updateSchemaFaqPage(updatedHtml, allQuestions);

    const balance = checkTagBalance(updatedHtml);
    if (balance.errors.length > 0 || balance.unclosed.length > 0) {
      console.error(`FAILED: Tag balance error on tour ${slug}:`, balance);
      failedCount++;
      return;
    }

    fs.writeFileSync(filePath, updatedHtml, 'utf8');
    successCount++;
    console.log(`[✓] Tour: ${slug.padEnd(46)} | FAQs: ${allQuestions.length} | H2: "${h2Title.slice(0, 45)}..."`);
  });

  console.log(`\nTours Summary: ${successCount} updated, ${skippedCount} skipped (redirects), ${failedCount} failed.`);
  return { successCount, skippedCount, failedCount };
}

deployTrekFaqs();
deployTourFaqs();
