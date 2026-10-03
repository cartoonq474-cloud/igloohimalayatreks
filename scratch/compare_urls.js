const userUrls = [
  "/trip/ghorepani-poon-hill-with-mardi-himal-trek",
  "/trip/annapurna-base-camp-trek",
  "/trip/annapurna-circuit-trek",
  "/trip/annapurna-scenic-trek",
  "/trip/classic-annapurna-circuit-trek",
  "/trip/annapurna-base-camp-helicopter-return-trek",
  "/trip/khopra-ridge-trek",
  "/trip/abc-with-mardi-himal-trek",
  "/trip/annapurna-circuit-with-tilicho-lake",
  "/trip/annapurna-short-trek",
  "/trip/mardi-himal-trek",
  "/trip/panchase-trek",
  "/trip/ghorepani-poonhill-ghandruk-trek",
  "/trip/annapurna-circuit-luxury-trek",
  "/trip/short-annapurna-base-camp-trek",
  "/trip/ghorepani-poon-hill-trek",
  "/trip/annapurna-base-camp-trek-heli-return",
  "/trip/annapurna-luxury-trek"
];

const siteUrls = require('./site_urls.json');
const siteTreks = siteUrls.filter(u => u.file.startsWith('trek/')).map(u => {
  const parts = u.file.split('/');
  return {
    slug: parts[1],
    path: `/trek/${parts[1]}/`,
    title: u.title
  };
});

console.log('Site Annapurna-related Treks:');
siteTreks.forEach(t => console.log(t.path, '-', t.title));
