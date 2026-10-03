const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const serverFile = path.join(ROOT, 'server.js');
let serverContent = fs.readFileSync(serverFile, 'utf8');

const updatedMappings = `    // Everest & Peak Climbing /trip/ and alias redirects
    '/trip/everest-base-camp-luxury-trek': '/trek/everest-base-camp-luxury-trek/',
    '/trip/lobuche-peak-climbing-trek': '/trek/lobuche-peak-climbing/',
    '/trip/ebc-trek-with-island-peak': '/trek/island-peak-climbing/',
    '/trip/everest-base-camp-trek-road-based': '/trek/everest-base-camp-trek-without-flight/',
    '/trip/tengbuche-trek': '/trek/everest-view-trek/',
    '/trip/everest-base-camp-trek': '/trek/everest-base-camp-trek/',
    '/trip/three-high-passes-with-island-peak-climb': '/trek/three-high-passes-with-island-peak-climb/',
    '/trip/everest-view-mini-trek': '/trek/everest-view-trek/',
    '/trip/gokyo-lake-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/trip/everest-base-camp-with-cho-la-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trip/gokyo-lake-with-ranjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/trip/everest-base-camp-heli-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/trip/mera-peak': '/trek/mera-peak-climbing/',
    '/trip/everest-base-camp-with-chola-pass-gokyo-trek': '/trek/everest-base-camp-via-gokyo-lakes/',
    '/trip/pikey-peak-trek': '/trek/pikey-peak-trek/',
    '/trip/everest-base-camp-trek-without-flight': '/trek/everest-base-camp-trek-without-flight/',
    '/trip/gokyo-lakes-trek': '/trek/gokyo-lakes-trek/',
    '/trip/gokyo-lakes-luxury-trek': '/trek/gokyo-lakes-luxury-trek/',
    '/trip/everest-chola-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trip/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/trip/ebc-chola-pass-gokyo-trek': '/trek/everest-base-camp-via-gokyo-lakes/',
    '/trip/everest-view-trek': '/trek/everest-view-trek/',
    '/trip/lobuche-peak-climbing': '/trek/lobuche-peak-climbing/',
    '/trip/island-peak-climbing': '/trek/island-peak-climbing/',
    '/trip/mera-peak-climbing': '/trek/mera-peak-climbing/',
    '/trip/gokyo-lake-trek-with-helicopter-return': '/trek/gokyo-lake-trek-with-helicopter-return/',
    '/trip/everest-base-camp-with-island-peak-climb': '/trek/island-peak-climbing/',
    '/trip/everest-base-camp-16-days': '/trek/everest-base-camp-trek/',
    '/trip/everest-three-passes-trek': '/trek/everest-three-passes-trek/',
    '/trip/everest-base-camp-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/',
    // Direct /trek/ and /tour/ alias redirects
    '/trek/lobuche-peak-climbing-trek': '/trek/lobuche-peak-climbing/',
    '/trek/ebc-trek-with-island-peak': '/trek/island-peak-climbing/',
    '/trek/everest-base-camp-with-island-peak-climb': '/trek/island-peak-climbing/',
    '/trek/mera-peak': '/trek/mera-peak-climbing/',
    '/trek/everest-base-camp-trek-road-based': '/trek/everest-base-camp-trek-without-flight/',
    '/trek/everest-chola-and-renjo-la-pass-trek': '/trek/everest-three-passes-trek/',
    '/trek/gokyo-lake-with-renjo-la-pass-trek': '/trek/gokyo-lakes-trek/',
    '/trek/everest-base-camp-chola-pass-gokyo-trek': '/trek/everest-base-camp-via-gokyo-lakes/',
    '/tour/everest-base-camp-heli-tour': '/tour/everest-base-camp-helicopter-tour/',
    '/tour/gokyo-lake-helicopter-tour': '/tour/everest-base-camp-helicopter-tour/'`;

// Replace from '// Everest & Peak Climbing' to '/tour/gokyo-lake-helicopter-tour\': \'/tour/everest-base-camp-helicopter-tour/\''
const regex = /\/\/ Everest & Peak Climbing[\s\S]*?'\/tour\/gokyo-lake-helicopter-tour': '\/tour\/everest-base-camp-helicopter-tour\/'/;
serverContent = serverContent.replace(regex, updatedMappings);

fs.writeFileSync(serverFile, serverContent, 'utf8');
console.log('Updated server.js mappings');

// Also create HTML redirect stubs for these 3 routes as well
const extraStubs = [
  { slug: 'trek/everest-chola-and-renjo-la-pass-trek', target: '/trek/everest-three-passes-trek/' },
  { slug: 'trek/gokyo-lake-with-renjo-la-pass-trek', target: '/trek/gokyo-lakes-trek/' },
  { slug: 'trek/everest-base-camp-chola-pass-gokyo-trek', target: '/trek/everest-base-camp-via-gokyo-lakes/' }
];

for (const stub of extraStubs) {
  const dir = path.join(ROOT, stub.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${stub.target}">
  <link rel="canonical" href="https://igloohimalayatreks.com${stub.target}" />
  <title>Redirecting...</title>
  <script>window.location.replace("${stub.target}");</script>
</head>
<body>
  <p>Redirecting to <a href="${stub.target}">${stub.target}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`Created extra stub: ${stub.slug}/index.html`);
}
