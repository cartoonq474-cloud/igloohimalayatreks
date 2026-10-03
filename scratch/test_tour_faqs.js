const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');
const { buildFaqSectionHtml, updateSchemaFaqPage } = require('./faq_builder_core.js');

const tourFaqsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'tour_faqs_data.json'), 'utf8'));
const tourDir = path.join(__dirname, '../tour');

const tours = Object.keys(tourFaqsData);
console.log(`Found ${tours.length} tour definitions in tour_faqs_data.json`);

tours.forEach(slug => {
  const filePath = path.join(tourDir, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`[NOT FOUND] ${slug}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (/http-equiv=["']refresh["']/i.test(html) && html.length < 5000) {
    console.log(`[REDIRECT] ${slug}`);
    return;
  }

  const data = tourFaqsData[slug];
  let title = data.title;
  if (slug === 'everest-base-camp-helicopter-tour') {
    title = 'Everest Base Camp 1-Day Helicopter Tour';
  }
  const h2 = `Frequently Asked Questions for ${title}`;
  const newSection = buildFaqSectionHtml(h2, data.categories);

  const allQuestions = [];
  Object.keys(data.categories).forEach(cat => {
    data.categories[cat].forEach(it => allQuestions.push(it));
  });

  let updatedHtml = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, newSection);
  updatedHtml = updateSchemaFaqPage(updatedHtml, allQuestions);

  const balance = checkTagBalance(updatedHtml);
  console.log(`${slug.padEnd(40)} | FAQs: ${allQuestions.length} | Balance: errors=${balance.errors.length}, unclosed=${balance.unclosed.length}`);
});
