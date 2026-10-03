const fs = require('fs');
const path = require('path');

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

const siteUrls = require('./site_urls.json');

console.log("=== EXISTING EVEREST & CLIMBING PAGES ON SITE ===");
const relevantPages = siteUrls.filter(u => 
  u.file.includes('everest') || 
  u.file.includes('gokyo') || 
  u.file.includes('peak') || 
  u.file.includes('pikey') || 
  u.file.includes('island') || 
  u.file.includes('mera') || 
  u.file.includes('lobuche') || 
  u.file.includes('cho-la') ||
  u.file.includes('tour')
);

relevantPages.forEach(p => console.log(`- ${p.file} | canonical: ${p.canonical}`));

fs.writeFileSync('scratch/everest_audit_input.json', JSON.stringify({ userUrls, relevantPages }, null, 2));
