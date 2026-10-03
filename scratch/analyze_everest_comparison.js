const fs = require('fs');

const userUrls = [
  "/trip/everest-base-camp-luxury-trek",
  "/trip/lobuche-peak-climbing-trek",
  "/trip/ebc-trek-with-island-peak",
  "/trip/everest-base-camp-trek-road-based",
  "/trip/tengbuche-trek",
  "/trip/everest-base-camp-trek",
  "/trip/three-high-passes-with-island-peak-climb",
  "/trip/everest-view-mini-trek",
  "/trip/gokyo-lake-helicopter-tour",
  "/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek",
  "/trip/gokyo-lake-with-ranjo-la-pass-trek",
  "/trip/everest-base-camp-heli-tour",
  "/trip/mera-peak",
  "/trip/everest-base-camp-with-chola-pass-gokyo-trek",
  "/trip/pikey-peak-trek",
  "/trip/everest-base-camp-trek-without-flight",
  "/trip/gokyo-lakes-trek",
  "/trip/gokyo-lakes-luxury-trek",
  "/trip/everest-chola-and-renjo-la-pass-trek",
  "/trip/gokyo-lake-with-renjo-la-pass-trek",
  "/trip/ebc-chola-pass-gokyo-trek",
  "/trip/everest-view-trek",
  "/trip/lobuche-peak-climbing",
  "/trip/island-peak-climbing",
  "/trip/mera-peak-climbing",
  "/trip/gokyo-lake-trek-with-helicopter-return",
  "/trip/everest-base-camp-with-island-peak-climb",
  "/trip/everest-base-camp-16-days",
  "/trip/everest-three-passes-trek",
  "/trip/everest-base-camp-helicopter-tour"
];

// Existing trek & tour folders
const trekFolders = fs.readdirSync('trek');
const tourFolders = fs.readdirSync('tour');

console.log(`Found ${trekFolders.length} trek folders and ${tourFolders.length} tour folders.`);

// Map each URL
const analysis = userUrls.map(url => {
  const slug = url.replace('/trip/', '');
  let match = null;
  let type = 'missing';
  let canonical = null;

  if (trekFolders.includes(slug)) {
    match = `/trek/${slug}/`;
    type = 'exact';
  } else if (tourFolders.includes(slug)) {
    match = `/tour/${slug}/`;
    type = 'exact';
  } else {
    // Check known equivalents
    if (slug === 'everest-base-camp-trek') match = '/trek/everest-base-camp-trek/';
    else if (slug === 'everest-view-trek') match = '/trek/everest-view-trek/';
    else if (slug === 'everest-three-passes-trek') match = '/trek/everest-three-passes-trek/';
    else if (slug === 'pikey-peak-trek') match = '/trek/pikey-peak-trek/';
    else if (slug === 'gokyo-lakes-trek') match = '/trek/gokyo-lakes-trek/';
    else if (['ebc-chola-pass-gokyo-trek', 'everest-base-camp-with-chola-pass-gokyo-trek'].includes(slug)) {
      match = '/trek/gokyo-lakes-and-cho-la-pass/';
      type = 'equivalent';
    } else if (slug === 'everest-base-camp-16-days') {
      match = '/trek/everest-base-camp-via-gokyo-lakes/';
      type = 'equivalent';
    } else if (['everest-base-camp-heli-tour', 'everest-base-camp-helicopter-tour'].includes(slug)) {
      match = '/tour/nepal-luxury-helicopter-tour/';
      type = 'equivalent_or_new';
    } else if (['gokyo-lake-with-ranjo-la-pass-trek', 'gokyo-lake-with-renjo-la-pass-trek', 'everest-chola-and-renjo-la-pass-trek', 'everest-base-camp-with-cho-la-and-renjo-la-pass-trek'].includes(slug)) {
      match = '/trek/everest-three-passes-trek/';
      type = 'equivalent_or_new';
    } else if (slug === 'everest-view-mini-trek') {
      match = '/trek/everest-view-trek/';
      type = 'equivalent';
    } else if (slug === 'tengbuche-trek') {
      match = '/trek/everest-view-trek/';
      type = 'equivalent';
    } else if (['everest-base-camp-trek-road-based', 'everest-base-camp-trek-without-flight'].includes(slug)) {
      type = 'missing_road_based';
    } else if (['island-peak-climbing', 'ebc-trek-with-island-peak', 'everest-base-camp-with-island-peak-climb'].includes(slug)) {
      type = 'missing_peak_island';
    } else if (['mera-peak', 'mera-peak-climbing'].includes(slug)) {
      type = 'missing_peak_mera';
    } else if (['lobuche-peak-climbing', 'lobuche-peak-climbing-trek'].includes(slug)) {
      type = 'missing_peak_lobuche';
    } else if (slug === 'three-high-passes-with-island-peak-climb') {
      type = 'missing_three_passes_island';
    } else if (slug === 'gokyo-lake-trek-with-helicopter-return') {
      type = 'missing_gokyo_heli';
    } else if (slug === 'gokyo-lake-helicopter-tour') {
      type = 'missing_gokyo_heli_tour';
    } else if (slug === 'everest-base-camp-luxury-trek') {
      type = 'missing_ebc_luxury';
    } else if (slug === 'gokyo-lakes-luxury-trek') {
      type = 'missing_gokyo_luxury';
    }
  }

  return { url, slug, match, type };
});

fs.writeFileSync('scratch/everest_analysis.json', JSON.stringify(analysis, null, 2));

const grouped = {};
analysis.forEach(a => {
  grouped[a.type] = grouped[a.type] || [];
  grouped[a.type].push(a);
});

for (const [k, v] of Object.entries(grouped)) {
  console.log(`\n=== TYPE: ${k} (${v.length}) ===`);
  v.forEach(x => console.log(`  ${x.url} -> ${x.match || 'MISSING'}`));
}
