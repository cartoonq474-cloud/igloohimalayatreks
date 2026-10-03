const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

function polishPage(slug) {
  const filePath = path.join(__dirname, '../trek', slug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Extract cleanTitle
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  let cleanTitle = titleMatch ? titleMatch[1].split('—')[0].trim() : slug;

  // Extract duration
  const durMatch = html.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                   html.match(/([0-9]+\s*days?)/i);
  let duration = durMatch ? durMatch[1].trim() : '14 Days';

  // Extract price
  const priceMatch = html.match(/data-original-price=["']([0-9,]+)["']/i) ||
                     html.match(/\$([0-9,]+)/i);
  let price = priceMatch ? priceMatch[1] : '1,290';

  // Extract meta description
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  let metaDesc = metaMatch ? metaMatch[1].trim() : '';

  // Determine Region
  let region = 'Himalayas';
  if (slug.includes('annapurna') || slug.includes('mardi') || slug.includes('poon') || slug.includes('khopra') || slug.includes('mohare') || slug.includes('panchase') || slug.includes('tilicho') || slug.includes('abc')) region = 'Annapurna';
  else if (slug.includes('manaslu') || slug.includes('tsum')) region = 'Manaslu';
  else if (slug.includes('mustang')) region = 'Mustang';
  else if (slug.includes('dolpo')) region = 'Dolpo';
  else if (slug.includes('langtang') || slug.includes('gosaikunda') || slug.includes('helambu') || slug.includes('tamang') || slug.includes('yala')) region = 'Langtang';
  else if (slug.includes('kanchenjunga')) region = 'Kanchenjunga';
  else if (slug.includes('makalu')) region = 'Makalu-Barun';
  else if (slug.includes('dhaulagiri')) region = 'Dhaulagiri';
  else if (slug.includes('rolwaling')) region = 'Rolwaling';
  else if (slug.includes('rara')) region = 'Rara / Karnali';
  else if (slug.includes('ruby')) region = 'Ganesh Himal / Ruby Valley';
  else if (slug.includes('chisapani')) region = 'Kathmandu Valley Rim';
  else if (slug.includes('pikey')) region = 'Lower Solukhumbu';
  else if (slug.includes('everest') || slug.includes('gokyo') || slug.includes('island') || slug.includes('mera') || slug.includes('lobuche') || slug.includes('three-passes')) region = 'Everest';

  const isEverest = region === 'Everest' || region === 'Lower Solukhumbu';

  // 1. Overview text before rich-highlights
  if (!isEverest) {
    const overviewRegex = /(<section id=["']section-overview["'][^>]*>\s*<h2 class=["']trek-section-title["'][^>]*>Trek Overview<\/h2>\s*)<p[\s\S]*?(?=<style|<div class=["']rich-highlights)/i;
    if (overviewRegex.test(html)) {
      const newOverview = `$1<p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 16px; line-height: 1.7;">
              The ${duration} ${cleanTitle} is one of the most remarkable and rewarding trekking journeys in the ${region} region of Nepal. ${metaDesc}
            </p>
            <p style="color: var(--color-neutral-700); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              Key highlights of this journey include exploring traditional indigenous villages, crossing scenic passes with breathtaking panoramas of soaring Himalayan massifs, experiencing genuine mountain teahouse hospitality, and following carefully paced acclimatization stages planned by the expert Sherpa team at Igloo Himalaya Treks.
            </p>\n            `;
      html = html.replace(overviewRegex, newOverview);
    }
  }

  // 2. Sidebar booking card
  html = html.replace(/(<span style="font-size: 2\.5rem; font-weight: 800; color: #0E3458; line-height: 1;">)\$[^<]*(<\/span>)/i,
    `$1$$${price}$2`);

  html = html.replace(/(<a href=["']#section-itinerary["'][^>]*>)[^<]*days? trip(<\/a>)/gi,
    `$1${duration} trip$2`);

  // 3. Dates & Availability heading & text
  html = html.replace(/<h2 class=["']trek-section-title["'][^>]*>Booking Dates & Availability[^<]*<\/h2>/i,
    `<h2 class="trek-section-title" style="margin-bottom: 0;">Booking Dates & Availability for ${cleanTitle}</h2>`);

  html = html.replace(/Plan your Everest Base Camp Trek: Leave Your Footprint at the World's Tallest Base Camp[^<]*/i,
    `Plan your ${cleanTitle}: Experience unforgettable Himalayan panoramas and authentic local hospitality at your convenience.`);

  // 4. Trek Region in Key Facts grid
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Trek Region<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${region}$2`);

  // 5. Knowledge Base (section-details)
  if (!isEverest) {
    html = html.replace(/Acclimatization during the EBC Trek/gi, `Acclimatization during the ${cleanTitle}`);
    html = html.replace(/Cost and the Booking Process for EBC Trek/gi, `Cost and the Booking Process for ${cleanTitle}`);
    html = html.replace(/Important Notes for EBC Trek/gi, `Important Notes for ${cleanTitle}`);
    html = html.replace(/On the EBC trek, you will stay/gi, `On the ${cleanTitle}, you will stay`);
    html = html.replace(/menu in EBC teahouses/gi, `menu in local teahouses`);
    html = html.replace(/The EBC trek is achievable/gi, `This trek is achievable`);
    html = html.replace(/your EBC journey/gi, `your ${region} journey`);
    html = html.replace(/for EBC trek\?/gi, `for ${cleanTitle}?`);
    html = html.replace(/Is travel insurance mandatory for EBC trek\?/gi, `Is travel insurance mandatory for this trek?`);
    html = html.replace(/the BEST EBC trek experience ever/gi, `the BEST ${cleanTitle} experience ever`);
  }

  // 6. Check tag balance
  const balance = checkTagBalance(html);
  if (balance.errors.length > 0 || balance.unclosed.length > 0) {
    console.error(`ERROR: Tag balance failed for ${slug}:`, balance);
    return false;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`SUCCESS: Polished ${slug} (0 errors)!`);
  return true;
}

polishPage('kanchenjunga-circuit-trek');
