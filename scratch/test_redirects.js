const URL_REDIRECTS = {
  '/trip/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
  '/trip/annapurna-base-camp-trek-heli-return': '/trek/annapurna-base-camp-heli-return/',
  '/trek/annapurna-base-camp-helicopter-return-trek': '/trek/annapurna-base-camp-heli-return/',
  '/trek/annapurna-base-camp-helicopter-return-trek/': '/trek/annapurna-base-camp-heli-return/',
  '/trip/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
  '/trek/annapurna-base-camp-trek': '/trek/annapurna-base-camp/',
  '/trek/annapurna-base-camp-trek/': '/trek/annapurna-base-camp/',
  '/trip/annapurna-circuit-trek': '/trek/annapurna-circuit-trek/',
  '/trip/classic-annapurna-circuit-trek': '/trek/annapurna-circuit-trek/',
  '/trip/annapurna-circuit-with-tilicho-lake': '/trek/tilicho-lake-trek/',
  '/trip/ghorepani-poon-hill-trek': '/trek/ghorepani-poon-hill-trek/',
  '/trip/ghorepani-poonhill-ghandruk-trek': '/trek/ghorepani-poon-hill-trek/',
  '/trip/mardi-himal-trek': '/trek/mardi-himal-trek/',
  '/trip/khopra-ridge-trek': '/trek/khopra-ridge-trek/',
  '/trip/panchase-trek': '/trek/panchase-trek/',
  '/trip/annapurna-scenic-trek': '/trek/panchase-trek/',
  '/trip/short-annapurna-base-camp-trek': '/trek/short-annapurna-base-camp-trek/',
  '/trip/annapurna-short-trek': '/trek/annapurna-short-trek/',
  '/trip/ghorepani-poon-hill-with-mardi-himal-trek': '/trek/ghorepani-poon-hill-with-mardi-himal-trek/',
  '/trip/abc-with-mardi-himal-trek': '/trek/abc-with-mardi-himal-trek/',
  '/trip/annapurna-luxury-trek': '/trek/annapurna-luxury-trek/',
  '/trip/annapurna-circuit-luxury-trek': '/trek/annapurna-circuit-luxury-trek/'
};

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

const fs = require('fs');

userUrls.forEach(url => {
  const target = URL_REDIRECTS[url];
  const targetFile = '.' + target + 'index.html';
  const exists = fs.existsSync(targetFile);
  console.log(`${url} -> ${target} (Target file exists: ${exists ? 'YES' : 'NO'})`);
});
