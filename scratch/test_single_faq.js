const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');
const { buildFaqSectionHtml, updateSchemaFaqPage } = require('./faq_builder_core.js');
const { getTrekFaqData } = require('./generate_all_trek_faqs_data.js');

function testSingle(slug) {
  const filePath = path.join(__dirname, '../trek', slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const cleanTitle = titleMatch ? titleMatch[1].split('—')[0].trim() : slug;

  const durMatch = html.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                   html.match(/([0-9]+\s*days?)/i);
  const duration = durMatch ? durMatch[1].trim() : '14 Days';

  const altMatch = html.match(/Max Altitude<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                   html.match(/(\d{1,2},\d{3}\s*m)/i);
  const altitude = altMatch ? altMatch[1].trim() : '5,106m';

  const regionMatch = html.match(/Trek Region<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
  const region = regionMatch ? regionMatch[1].trim() : 'Manaslu';

  console.log(`Testing ${slug}:`);
  console.log(`  Title: ${cleanTitle}`);
  console.log(`  Duration: ${duration} | Alt: ${altitude} | Region: ${region}`);

  const faqData = getTrekFaqData(slug, cleanTitle, duration, altitude, region);
  const h2 = `Frequently Asked Questions for ${cleanTitle}`;
  const newFaqSection = buildFaqSectionHtml(h2, faqData);

  // Flatten all questions
  const allQuestions = [];
  Object.keys(faqData).forEach(cat => {
    faqData[cat].forEach(it => allQuestions.push(it));
  });
  console.log(`  Total FAQs generated: ${allQuestions.length}`);

  let updatedHtml = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, newFaqSection);
  updatedHtml = updateSchemaFaqPage(updatedHtml, allQuestions);

  const balance = checkTagBalance(updatedHtml);
  console.log(`  Tag Balance Errors: ${balance.errors.length}, Unclosed: ${balance.unclosed.length}`);
  if (balance.errors.length > 0 || balance.unclosed.length > 0) {
    console.error('  Tag Balance Details:', balance);
  } else {
    console.log('  SUCCESS! Tag balance perfect.');
  }
}

testSingle('manaslu-circuit-trek');
testSingle('island-peak-climbing');
testSingle('annapurna-base-camp');
