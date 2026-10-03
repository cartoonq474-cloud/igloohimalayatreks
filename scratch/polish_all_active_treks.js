const fs = require('fs');
const path = require('path');
const { checkTagBalance } = require('./build_act_includes.js');

const trekDir = path.join(__dirname, '../trek');
const dirs = fs.readdirSync(trekDir).filter(f => {
  const p = path.join(trekDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

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

function getRegionAlternatives(region, title) {
  if (region === 'Annapurna') {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Annapurna Sanctuary & Base Camp:</strong> Venture deep into the high amphitheater surrounded by Annapurna I, Machapuchare, and Hiunchuli.</p>
                  <p><strong>• Tilicho Lake Side Trip:</strong> Ascend to one of the world's highest glacial lakes (4,919m) surrounded by towering snow ridges.</p>
                  <p><strong>• Poon Hill Sunrise Extension:</strong> Add a classic pre-dawn hike up Poon Hill (3,210m) for panoramic Dhaulagiri sunrise vistas.</p>`;
  } else if (region === 'Manaslu') {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Tsum Valley Cultural Side Trip:</strong> Explore the sacred hidden valley of non-violence, ancient nunneries, and Milarepa caves.</p>
                  <p><strong>• 12-Day Fast-Paced Circuit:</strong> An express itinerary designed for fit trekkers with prior high-altitude acclimatization.</p>
                  <p><strong>• Annapurna Circuit Connection:</strong> Continue west from Dharapani over the Thorong La Pass for the ultimate grand combination trek.</p>`;
  } else if (region === 'Mustang') {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Upper Mustang Overland 4WD Tour:</strong> A comfortable road-based alternative visiting Lo Manthang and sky caves without long hiking days.</p>
                  <p><strong>• Tiji Festival Departure:</strong> Time your visit with the vibrant three-day masked dance festival in the walled capital of Lo Manthang.</p>
                  <p><strong>• Eastern Return via Yara & Luri Gompa:</strong> Traverse the desolate eastern gorge to explore century-old rock-cut cave monasteries.</p>`;
  } else if (region === 'Dolpo') {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Shey Phoksundo Lake Express:</strong> A shorter trek focusing on the deep turquoise waters of Phoksundo Lake and Ringmo Bon village.</p>
                  <p><strong>• Upper Dolpo & Crystal Mountain Circuit:</strong> A strenuous 24-day wilderness exploration crossing Kang La Pass to Shey Gompa.</p>
                  <p><strong>• Mustang to Dolpo High Traverse:</strong> An extraordinary remote trans-Himalayan expedition linking Jomsom with Juphal.</p>`;
  } else if (region === 'Langtang') {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Gosaikunda Sacred Lakes:</strong> Ascend to the holy alpine lakes at 4,380m and cross the Laurebina Pass.</p>
                  <p><strong>• Tamang Heritage Cultural Loop:</strong> Immerse yourself in authentic Tibetan-influenced Tamang homestays and natural hot springs.</p>
                  <p><strong>• Helambu Alpine Traverse:</strong> Descend south toward the Kathmandu Valley rim through quiet rhododendron and pine forests.</p>`;
  } else {
    return `<p>The standard ${title} can be customized to match your schedule and fitness level. Popular route extensions and alternatives include:</p>
                  <p><strong>• Private Tailor-Made Itinerary:</strong> Add contingency rest days, customized exploration stages, or side valley excursions.</p>
                  <p><strong>• Scenic Helicopter Flyback:</strong> Upgrade your return journey with a chartered helicopter flight directly back to Kathmandu.</p>
                  <p><strong>• Overland 4WD Extensions:</strong> Explore nearby rural cultural valleys, tea estates, and historical heritage sites.</p>`;
  }
}

function polishPage(slug) {
  const filePath = path.join(trekDir, slug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip redirect stubs
  if (/http-equiv=["']refresh["']/i.test(html)) {
    return { slug, status: 'SKIPPED_REDIRECT' };
  }

  // 1. Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  let cleanTitle = titleMatch ? titleMatch[1].split('—')[0].trim() : slug;

  // 2. Duration
  const durMatch = html.match(/Duration<\/span>\s*<span[^>]*>([^<]+)<\/span>/i) ||
                   html.match(/([0-9]+\s*days?)/i);
  let duration = durMatch ? durMatch[1].trim() : '14 Days';

  // 3. Price
  const priceMatch = html.match(/data-original-price=["']([0-9,]+)["']/i) ||
                     html.match(/\$([0-9,]+)/i);
  let price = priceMatch ? priceMatch[1] : '1,290';

  // 4. Meta Description
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  let metaDesc = metaMatch ? metaMatch[1].trim() : '';

  // 5. Region
  const region = getRegion(slug);
  const isEverest = region === 'Everest'; // Only classic Khumbu is true Everest

  // 6. Section Overview Paragraphs on non-Everest pages
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

  // 7. Sidebar Booking Card: Price, Duration, and Title
  html = html.replace(/(<span style="font-size: 2\.5rem; font-weight: 800; color: #0E3458; line-height: 1;">)\$[^<]*(<\/span>)/i,
    `$1$$${price}$2`);

  html = html.replace(/(<a href=["']#section-itinerary["'][^>]*>)[^<]*days? trip(<\/a>)/gi,
    `$1${duration} trip$2`);

  html = html.replace(/(<button class=["']btn open-inquiry-btn["']\s+data-trek-title=["'])[^"']*(")/gi,
    `$1${cleanTitle}$2`);

  // 8. Dates & Availability Heading & Body
  html = html.replace(/<h2 class=["']trek-section-title["'][^>]*>Booking Dates & Availability[^<]*<\/h2>/i,
    `<h2 class="trek-section-title" style="margin-bottom: 0;">Booking Dates & Availability for ${cleanTitle}</h2>`);

  html = html.replace(/Plan your Everest Base Camp Trek: Leave Your Footprint at the World's Tallest Base Camp[^<]*/i,
    `Plan your ${cleanTitle}: Experience unforgettable Himalayan panoramas and authentic local hospitality at your convenience.`);

  // 9. Trek Region in Key Facts grid
  html = html.replace(/(<span style="font-size: 0\.75rem; text-transform: uppercase; letter-spacing: 0\.05em; color: var\(--color-neutral-500\); font-weight: 700;">Trek Region<\/span>\s*<span style="font-size: 1\.05rem; color: var\(--color-neutral-800\); font-weight: 600;">)[^<]*(<\/span>)/i,
    `$1${region}$2`);

  // 10. Knowledge Base (section-details)
  const detailsMatch = html.match(/<section id=["']section-details["'][\s\S]*?<\/section>/i);
  if (detailsMatch) {
    let d = detailsMatch[0];
    if (!isEverest) {
      d = d.replace(/What to expect in a teahouse in the EBC Trek/gi, `What to expect in a teahouse during this trek`);
      d = d.replace(/Are There Hot Showers and Electricity on EBC Trek\?/gi, `Are There Hot Showers and Electricity on this trek?`);
      d = d.replace(/Acclimatization during the EBC Trek/gi, `Acclimatization during the ${cleanTitle}`);
      d = d.replace(/Cost and the Booking Process for EBC Trek/gi, `Cost and the Booking Process for ${cleanTitle}`);
      d = d.replace(/Important Notes for EBC Trek/gi, `Important Notes for ${cleanTitle}`);
      d = d.replace(/On the EBC trek, you will stay/gi, `On the ${cleanTitle}, you will stay`);
      d = d.replace(/menu in EBC teahouses/gi, `menu in local teahouses`);
      d = d.replace(/The EBC trek is achievable/gi, `This trek is achievable`);
      d = d.replace(/your EBC journey/gi, `your ${region} journey`);
      d = d.replace(/for EBC trek\?/gi, `for ${cleanTitle}?`);
      d = d.replace(/Is travel insurance mandatory for EBC trek\?/gi, `Is travel insurance mandatory for this trek?`);
      d = d.replace(/the BEST EBC trek experience ever/gi, `the BEST ${cleanTitle} experience ever`);
      d = d.replace(/Dudh Koshi river/gi, `${region} river valley`);
      
      // Replace Route Alternatives with region-specific alternatives
      const altContent = getRegionAlternatives(region, cleanTitle);
      d = d.replace(/<p>The standard EBC route is an out-and-back trail[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<!-- Accordion Item)/i,
        altContent + '\n                  ');
    } else {
      // On Everest variants
      if (!slug.includes('everest-base-camp-trek')) {
        d = d.replace(/Cost and the Booking Process for EBC Trek/gi, `Cost and the Booking Process for ${cleanTitle}`);
        d = d.replace(/Important Notes for EBC Trek/gi, `Important Notes for ${cleanTitle}`);
        d = d.replace(/Acclimatization during the EBC Trek/gi, `Acclimatization during the ${cleanTitle}`);
      }
    }
    html = html.replace(/<section id=["']section-details["'][\s\S]*?<\/section>/i, d);
  }

  // 11. FAQs (section-faqs)
  const faqsMatch = html.match(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i);
  if (faqsMatch) {
    let f = faqsMatch[0];
    if (!isEverest) {
      f = f.replace(/Everest Base Camp trek/gi, cleanTitle);
      f = f.replace(/Everest Base Camp/gi, cleanTitle);
      f = f.replace(/EBC trek/gi, cleanTitle);
      f = f.replace(/EBC/g, cleanTitle);
      f = f.replace(/takes 14 days round trip from Kathmandu\. This includes acclimatization rest days at [^.]*\./i,
        `takes ${duration} round trip from Kathmandu, expertly paced for acclimatization and wilderness discovery.`);
    }
    html = html.replace(/<section id=["']section-faqs["'][\s\S]*?<\/section>/i, f);
  }

  // 12. Check Tag Balance
  const balance = checkTagBalance(html);
  if (balance.errors.length > 0 || balance.unclosed.length > 0) {
    console.error(`ERROR: Tag balance failed for ${slug}:`, balance);
    return { slug, status: 'FAILED_TAG_BALANCE', errors: balance.errors };
  }

  fs.writeFileSync(filePath, html, 'utf8');
  return { slug, status: 'SUCCESS' };
}

console.log(`Starting enhanced universal polish across ${dirs.length} packages...\n`);

let ok = 0;
let failed = 0;
let skipped = 0;

dirs.forEach(slug => {
  const res = polishPage(slug);
  if (res.status === 'SUCCESS') {
    ok++;
  } else if (res.status === 'SKIPPED_REDIRECT') {
    skipped++;
  } else {
    failed++;
  }
});

console.log(`\n=== Enhanced Polish Summary ===`);
console.log(`- Successfully Polished: ${ok} packages`);
console.log(`- Skipped (Redirects): ${skipped} packages`);
console.log(`- Failed: ${failed} packages`);
