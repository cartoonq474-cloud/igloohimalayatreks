const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('.');
const data = files.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                         content.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const metaRefresh = content.match(/http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"']+)["']/i);
  const relPath = path.relative('.', file).replace(/\\/g, '/');
  return {
    file: relPath,
    title: titleMatch ? titleMatch[1].trim() : '',
    canonical: canonicalMatch ? canonicalMatch[1].trim() : '',
    redirect: metaRefresh ? metaRefresh[1].trim() : ''
  };
});

fs.writeFileSync('scratch/site_urls.json', JSON.stringify(data, null, 2), 'utf8');

const categories = {
  homepage: [],
  main_landing_hubs: [],
  regional_hubs: [],
  individual_treks: [],
  individual_tours: [],
  travel_guides: [],
  team_profiles: [],
  company_pages: [],
  redirect_stubs: [],
  flat_html_variants: []
};

data.forEach(item => {
  if (item.redirect) {
    categories.redirect_stubs.push(item);
  } else if (item.file === 'index.html') {
    categories.homepage.push(item);
  } else if (['nepal-trekking-packages/index.html', 'nepal-tour-packages/index.html', 'tours-nepal/index.html'].includes(item.file)) {
    categories.main_landing_hubs.push(item);
  } else if (item.file.startsWith('trek/')) {
    categories.individual_treks.push(item);
  } else if (item.file.startsWith('tour/')) {
    categories.individual_tours.push(item);
  } else if (item.file.startsWith('team/')) {
    categories.team_profiles.push(item);
  } else if (item.file.includes('-region-treks/') || item.file.includes('peak-climbing-nepal/') || item.file.includes('restricted-area-treks-nepal/') || item.file.includes('trekking-regions-nepal/')) {
    categories.regional_hubs.push(item);
  } else if (['equipment-checklist/index.html', 'nepal-travel-guide/index.html', 'nepal-visa/index.html', 'travel-insurance/index.html', 'recommended-medical-kit/index.html'].includes(item.file)) {
    categories.travel_guides.push(item);
  } else if (['equipment-checklist.html', 'nepal-tour-packages.html', 'nepal-travel-guide.html', 'nepal-trekking-packages.html', 'nepal-visa.html', 'recommended-medical-kit.html', 'travel-insurance.html'].includes(item.file)) {
    categories.flat_html_variants.push(item);
  } else {
    categories.company_pages.push(item);
  }
});

let report = '';
for (const [k, v] of Object.entries(categories)) {
  report += `\n=== ${k.toUpperCase()} (${v.length}) ===\n`;
  v.forEach(x => {
    report += `  - File: ${x.file}\n    Canonical: ${x.canonical || '(none)'}\n    Title: ${x.title}\n`;
    if (x.redirect) report += `    Redirects To: ${x.redirect}\n`;
  });
}

fs.writeFileSync('scratch/taxonomy_report.txt', report, 'utf8');
console.log('Report written to scratch/taxonomy_report.txt');

