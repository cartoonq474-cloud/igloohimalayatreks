'use strict';

/**
 * Idempotent HTML/JS Content Importer for Igloo Himalaya Treks
 * Parses existing static HTML pages (/trek, /tour, /blog, regions, team, core pages, _redirects)
 * and JS data modules (altitude-visualizer, weather-visualizer, data/blog/articles.js)
 * into PostgreSQL via Prisma.
 */
require('dotenv').config({ override: false });
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const mapper = require('../server/services/packageDomMapper');

const prisma = new PrismaClient();
const ROOT_DIR = path.resolve(__dirname, '..');

function loadVisualizerMaps() {
  let altitudeProfiles = {};
  let weatherProfiles = {};
  const makeSandbox = () => ({
    window: { addEventListener: () => {} },
    localStorage: { getItem: () => null, setItem: () => {} },
    document: {
      readyState: 'loading',
      addEventListener: () => {},
      getElementById: () => null,
      querySelectorAll: () => []
    },
    console
  });

  try {
    const altCode = fs
      .readFileSync(path.join(ROOT_DIR, 'js', 'altitude-visualizer.js'), 'utf8')
      .replace(/^\s*export\s+/gm, '');
    const sandbox = makeSandbox();
    vm.runInNewContext(`${altCode}; this.__alt = typeof trekAltitudeProfiles !== 'undefined' ? trekAltitudeProfiles : {};`, sandbox);
    altitudeProfiles = sandbox.__alt || {};
  } catch (err) {
    console.warn('[Importer] Altitude map load notice:', err.message);
  }

  try {
    const wCode = fs
      .readFileSync(path.join(ROOT_DIR, 'js', 'weather-visualizer.js'), 'utf8')
      .replace(/^\s*export\s+/gm, '');
    const sandbox = makeSandbox();
    vm.runInNewContext(`${wCode}; this.__weather = typeof WEATHER_PROFILES !== 'undefined' ? WEATHER_PROFILES : {};`, sandbox);
    weatherProfiles = sandbox.__weather || {};
  } catch (err) {
    console.warn('[Importer] Weather map load notice:', err.message);
  }

  return { altitudeProfiles, weatherProfiles };
}

function parseJsonLd($) {
  const graphs = [];
  $('script[type="application/ld+json"]').each((_i, el) => {
    try {
      const parsed = JSON.parse($(el).html() || '{}');
      graphs.push(parsed);
    } catch (_err) {
      // ignore malformed json-ld
    }
  });
  return graphs;
}

function detectDestinationKey(slug, text, destinationsByKey) {
  const hay = `${slug} ${text}`.toLowerCase();
  const checks = [
    ['everest', ['everest', 'khumbu', 'gokyo', 'island-peak', 'mera-peak', 'lobuche', 'pikey', 'tengboche', 'ebc']],
    ['annapurna', ['annapurna', 'mardi', 'poon-hill', 'khopra', 'mohare', 'panchase', 'tilicho', 'abc']],
    ['manaslu', ['manaslu', 'tsum']],
    ['langtang', ['langtang', 'gosaikunda', 'helambu', 'tamang-heritage', 'chisapani', 'yala-peak']],
    ['mustang', ['mustang', 'nar-phu']],
    ['dolpo', ['dolpo']],
    ['kanchenjunga', ['kanchenjunga']],
    ['makalu', ['makalu']],
    ['rolwaling', ['rolwaling']],
    ['ganesh-himal', ['ganesh', 'ruby-valley']]
  ];
  for (const [key, tokens] of checks) {
    if (tokens.some((t) => hay.includes(t)) && destinationsByKey.has(key)) {
      return destinationsByKey.get(key).id;
    }
  }
  return null;
}

function inferDifficulty(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('strenuous')) return 'STRENUOUS';
  if (t.includes('challenging') || t.includes('hard')) return 'CHALLENGING';
  if (t.includes('easy')) return 'EASY';
  return 'MODERATE';
}

function parseNumberFromText(str) {
  const m = String(str || '').replace(/,/g, '').match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

async function importDestinations() {
  const dirs = fs.readdirSync(ROOT_DIR).filter((d) => d.endsWith('-region-treks'));
  const mapByRegion = new Map();

  for (const dir of dirs) {
    const htmlPath = path.join(ROOT_DIR, dir, 'index.html');
    if (!fs.existsSync(htmlPath)) continue;

    const $ = cheerio.load(fs.readFileSync(htmlPath, 'utf8'));
    const metaTitle = $('title').text().trim() || dir;
    const metaDescription = $('meta[name="description"]').attr('content') || null;
    const canonicalUrl = $('link[rel="canonical"]').attr('href') || `https://www.igloohimalayatreks.com/${dir}`;
    const h1 = $('h1').first().text().trim() || dir;
    const regionKey = dir.replace('-region-treks', '');

    let existing = await prisma.destination.findUnique({ where: { slug: dir } });
    let seoId = existing ? existing.seoId : null;
    if (!seoId) {
      const seo = await prisma.seoMeta.create({
        data: { entityType: 'Destination', metaTitle, metaDescription, canonicalUrl, schemaType: 'CollectionPage' }
      });
      seoId = seo.id;
    }

    const dest = await prisma.destination.upsert({
      where: { slug: dir },
      update: { seoId, status: 'PUBLISHED' },
      create: {
        slug: dir,
        name: h1.replace(/\s*\d{4}.*$/, '').trim() || dir,
        regionKey,
        tagline: metaDescription ? metaDescription.slice(0, 240) : null,
        summary: metaDescription,
        seoId,
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
    mapByRegion.set(dest.regionKey, dest);
  }
  console.log(`Imported/synced ${mapByRegion.size} destinations.`);
  return mapByRegion;
}

const mediaCache = new Map();

async function warmMediaCache() {
  const rows = await prisma.mediaAsset.findMany({
    select: { id: true, legacyLocalPath: true, secureUrl: true, cloudinaryPublicId: true }
  });
  for (const row of rows) {
    if (row.legacyLocalPath) {
      mediaCache.set(row.legacyLocalPath.replace(/^\/+/, ''), row);
      mediaCache.set(row.legacyLocalPath, row);
    }
    if (row.secureUrl) {
      mediaCache.set(row.secureUrl, row);
      mediaCache.set(row.secureUrl.replace(/^\/+/, ''), row);
    }
  }
}

async function resolveOrCreateMedia(localOrUrl, altText) {
  if (!localOrUrl) return null;
  const normalized = mapper.normalizeLocalPath(localOrUrl);
  if (!normalized) return null;

  const cached = mediaCache.get(normalized) || mediaCache.get(`/${normalized}`);
  if (cached) return cached;

  let media = await prisma.mediaAsset.findFirst({
    where: {
      OR: [
        { legacyLocalPath: normalized },
        { secureUrl: normalized },
        { legacyLocalPath: `/${normalized}` }
      ]
    }
  });
  if (!media) {
    const publicId = `legacy/${normalized.replace(/[^a-z0-9/_-]+/gi, '-')}`.slice(0, 250);
    media = await prisma.mediaAsset.upsert({
      where: { cloudinaryPublicId: publicId },
      update: {},
      create: {
        cloudinaryPublicId: publicId,
        resourceType: 'IMAGE',
        secureUrl: normalized.startsWith('http') ? normalized : `/${normalized}`,
        legacyLocalPath: normalized.startsWith('http') ? null : normalized,
        folder: normalized.includes('gallery') ? 'gallery' : 'packages',
        title: normalized.split('/').pop(),
        altText: altText || null
      }
    });
  }
  mediaCache.set(normalized, media);
  if (media.secureUrl) mediaCache.set(media.secureUrl, media);
  return media;
}

async function importPackages(destinationsByKey, altitudeProfiles, weatherProfiles) {
  let count = 0;
  const pendingRecommendations = [];
  const slugToId = new Map();
  const groups = [
    { dir: 'trek', defaultType: 'TREK' },
    { dir: 'tour', defaultType: 'TOUR' }
  ];

  for (const grp of groups) {
    const baseDir = path.join(ROOT_DIR, grp.dir);
    if (!fs.existsSync(baseDir)) continue;

    for (const slug of fs.readdirSync(baseDir)) {
      const htmlPath = path.join(baseDir, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;

      const $ = cheerio.load(fs.readFileSync(htmlPath, 'utf8'));
      const wrapper = $('[data-trek-details-wrapper]').first();
      const rawTrekKey = wrapper.attr('data-trek-key') || slug;
      const trekKey = await (async () => {
        const collision = await prisma.package.findUnique({ where: { trekKey: rawTrekKey } });
        if (collision && collision.slug !== slug) return slug;
        return rawTrekKey;
      })();

      const metaTitle = $('title').text().trim() || slug;
      const metaDescription = $('meta[name="description"]').attr('content') || null;
      const canonicalUrl = $('link[rel="canonical"]').attr('href') || `https://www.igloohimalayatreks.com/${grp.dir}/${slug}`;
      const h1Text = $('h1').first().text().trim() || metaTitle;
      const title = h1Text.replace(/\s*[—-]\s*\d+\s*Days?$/i, '').trim() || h1Text;
      const durMatch = (h1Text + ' ' + metaTitle).match(/(\d+)\s*Days?/i);
      const durationDays = durMatch ? parseInt(durMatch[1], 10) : 7;

      const altEl = $('[data-altitude-m]').first();
      const maxAltitudeM = altEl.attr('data-altitude-m') ? parseInt(altEl.attr('data-altitude-m'), 10) : null;
      const maxAltitudeFt = maxAltitudeM ? Math.round(maxAltitudeM * 3.28084) : null;

      const hero = mapper.extractHero($);
      const sidebar = mapper.extractSidebar($);
      const tripFacts = mapper.extractTripFacts($);
      const overview = mapper.extractOverview($);
      const itineraryDays = mapper.extractItinerary($);
      const incExc = mapper.extractIncludesExcludes($);
      const datesAndPrices = mapper.extractDatesAndPrices($, sidebar);
      const packingList = mapper.extractPackingList($);
      const readBeforeBook = mapper.extractReadBeforeBook($);
      const baseAlt = altitudeProfiles[rawTrekKey] || altitudeProfiles[slug] || null;
      const baseWeather = weatherProfiles[rawTrekKey] || weatherProfiles[slug] || null;
      const altitudeProfileJson = mapper.extractAltitudeDetails($, baseAlt);
      const weatherProfileJson = mapper.extractWeatherDetails($, baseWeather);
      const routeMap = mapper.extractRouteMap($);
      const ctaMeta = mapper.extractBookingAndCta($);
      const faqExtracted = mapper.extractFaqs($);
      const recSlugs = mapper.extractRecommendations($);

      const type = slug.includes('peak') || slug.includes('climbing')
        ? 'PEAK_CLIMB'
        : grp.defaultType;

      const destinationId = detectDestinationKey(slug, title, destinationsByKey);
      const difficulty = inferDifficulty($('.trip-fact-item').text());

      let existing = await prisma.package.findUnique({
        where: { slug },
        include: {
          _count: { select: { itineraryDays: true, faqs: true, galleries: true, recommendations: true } }
        }
      });
      let seoId = existing ? existing.seoId : null;
      if (!seoId) {
        const seo = await prisma.seoMeta.create({
          data: { entityType: 'Package', metaTitle, metaDescription, canonicalUrl, schemaType: 'TouristTrip' }
        });
        seoId = seo.id;
      }

      const routeMapMedia = routeMap && routeMap.imageUrl
        ? await resolveOrCreateMedia(routeMap.imageUrl, routeMap.altText || `${title} Route Map`)
        : null;

      const tagsPayload = {
        whyBookTitle: overview.whyBookTitle,
        whyBookCards: overview.whyBookCards,
        bookingBanner: ctaMeta.bookingBanner,
        bottomCta: ctaMeta.bottomCta,
        routeMap,
        faqCategories: faqExtracted.faqCategories
      };

      const isEmptyArr = (v) => !Array.isArray(v) || v.length === 0;
      const needsAltEnrich = !existing || !existing.altitudeProfileJson || typeof existing.altitudeProfileJson !== 'object' || !Array.isArray(existing.altitudeProfileJson.overnightTable);
      const needsWeatherEnrich = !existing || !existing.weatherProfileJson || typeof existing.weatherProfileJson !== 'object' || !Array.isArray(existing.weatherProfileJson.seasonCards);
      const needsPricingEnrich = !existing || !existing.groupPricingJson || Array.isArray(existing.groupPricingJson);
      const needsPackingEnrich = !existing || !existing.packingListJson || isEmptyArr(existing.packingListJson.categories);
      const needsDetailsEnrich = !existing || !existing.readBeforeBookJson || Array.isArray(existing.readBeforeBookJson);

      const pkg = await prisma.package.upsert({
        where: { slug },
        update: {
          title,
          durationDays,
          maxAltitudeM,
          maxAltitudeFt,
          difficulty,
          destinationId: existing && existing.destinationId ? undefined : destinationId,
          ...((!existing || !existing.heroSummary || existing.heroSummary === metaDescription) && hero.heroSummary ? { heroSummary: hero.heroSummary } : {}),
          ...((!existing || Number(existing.startingPriceUsd) === 995) && sidebar.startingPriceUsd ? { startingPriceUsd: sidebar.startingPriceUsd } : {}),
          ...(existing && isEmptyArr(existing.tripFactsJson) && tripFacts.length ? { tripFactsJson: tripFacts } : {}),
          ...(existing && isEmptyArr(existing.highlightsJson) && overview.highlights.length ? { highlightsJson: overview.highlights } : {}),
          ...(existing && !existing.overviewHtml && overview.overviewHtml ? { overviewHtml: overview.overviewHtml } : {}),
          ...(existing && isEmptyArr(existing.inclusionsJson) && incExc.includes.length ? { inclusionsJson: incExc.includes } : {}),
          ...(existing && isEmptyArr(existing.exclusionsJson) && incExc.excludes.length ? { exclusionsJson: incExc.excludes } : {}),
          ...(needsPricingEnrich ? { groupPricingJson: datesAndPrices.groupPricingJson } : {}),
          ...(existing && isEmptyArr(existing.departureDatesJson) && datesAndPrices.departureDatesJson.length ? { departureDatesJson: datesAndPrices.departureDatesJson } : {}),
          ...(needsPackingEnrich && packingList.categories.length ? { packingListJson: packingList } : {}),
          ...(needsDetailsEnrich && readBeforeBook.items.length ? { readBeforeBookJson: readBeforeBook } : {}),
          ...(needsAltEnrich ? { altitudeProfileJson } : {}),
          ...(needsWeatherEnrich ? { weatherProfileJson } : {}),
          ...(existing && !existing.tagsJson ? { tagsJson: tagsPayload } : {}),
          ...(existing && !existing.routeMapMediaId && routeMapMedia ? { routeMapMediaId: routeMapMedia.id } : {}),
          seoId,
          status: 'PUBLISHED'
        },
        create: {
          slug,
          trekKey,
          type,
          title,
          durationDays,
          maxAltitudeM,
          maxAltitudeFt,
          difficulty,
          startingPriceUsd: sidebar.startingPriceUsd,
          destinationId,
          heroSummary: hero.heroSummary || metaDescription,
          overviewHtml: overview.overviewHtml,
          tripFactsJson: tripFacts.length ? tripFacts : undefined,
          highlightsJson: overview.highlights.length ? overview.highlights : undefined,
          inclusionsJson: incExc.includes.length ? incExc.includes : undefined,
          exclusionsJson: incExc.excludes.length ? incExc.excludes : undefined,
          groupPricingJson: datesAndPrices.groupPricingJson,
          departureDatesJson: datesAndPrices.departureDatesJson.length ? datesAndPrices.departureDatesJson : undefined,
          packingListJson: packingList.categories.length ? packingList : undefined,
          readBeforeBookJson: readBeforeBook.items.length ? readBeforeBook : undefined,
          altitudeProfileJson,
          weatherProfileJson,
          tagsJson: tagsPayload,
          routeMapMediaId: routeMapMedia ? routeMapMedia.id : null,
          seoId,
          status: 'PUBLISHED',
          publishedAt: new Date()
        }
      });

      slugToId.set(pkg.slug, pkg.id);
      if (recSlugs.length > 0 && (!existing || existing._count.recommendations === 0)) {
        pendingRecommendations.push({ packageId: pkg.id, recSlugs });
      }

      if (hero.heroGallery.length > 0 && (!existing || existing._count.galleries === 0)) {
        const galleryRows = [];
        for (const item of hero.heroGallery) {
          const media = await resolveOrCreateMedia(item.src, item.altText || title);
          if (media) {
            galleryRows.push({
              packageId: pkg.id,
              mediaId: media.id,
              slot: item.slot,
              sortOrder: item.sortOrder,
              caption: item.caption || item.altText || null
            });
          }
        }
        if (galleryRows.length > 0) {
          await prisma.packageGallery.createMany({ data: galleryRows });
        }
      }

      // Enrich itinerary days if none exist OR existing rows lack meta-box fields while HTML has them
      if (itineraryDays.length > 0) {
        const existingDays = existing
          ? await prisma.packageItineraryDay.findMany({ where: { packageId: pkg.id } })
          : [];
        const missingMeta = existingDays.length > 0 && existingDays.every((d) => !d.routeSummary && !d.activityType && !d.accommodation && !d.meals);
        if (existingDays.length === 0 || (missingMeta && itineraryDays.some((d) => d.routeSummary || d.activityType || d.accommodation || d.meals))) {
          if (existingDays.length > 0) {
            await prisma.packageItineraryDay.deleteMany({ where: { packageId: pkg.id } });
          }
          await prisma.packageItineraryDay.createMany({
            data: itineraryDays.map((d) => ({ ...d, packageId: pkg.id })),
            skipDuplicates: true
          });
        }
      }

      if (faqExtracted.faqs.length > 0 && (!existing || existing._count.faqs === 0)) {
        await prisma.packageFaq.createMany({
          data: faqExtracted.faqs.map((f) => ({ ...f, packageId: pkg.id }))
        });
      }

      count++;
    }
  }

  for (const item of pendingRecommendations) {
    const recRows = [];
    item.recSlugs.forEach((rSlug, idx) => {
      const targetId = slugToId.get(rSlug);
      if (targetId && targetId !== item.packageId) {
        recRows.push({
          packageId: item.packageId,
          recommendedPackageId: targetId,
          sortOrder: idx
        });
      }
    });
    if (recRows.length > 0) {
      await prisma.packageRecommendation.createMany({
        data: recRows,
        skipDuplicates: true
      });
    }
  }

  console.log(`Imported/synced ${count} trek & tour packages.`);
}

async function importBlogs() {
  const defaultAuthor = await prisma.authorProfile.upsert({
    where: { slug: 'surya-lama' },
    update: {},
    create: {
      slug: 'surya-lama',
      name: 'Surya Lama',
      roleTitle: 'Founder & Managing Director',
      experience: '20+ Years Guiding',
      summits: '380+ Himalayan Expeditions'
    }
  });

  const { articles } = require('../data/blog/articles');
  const seenSlugs = new Set();

  for (const art of articles) {
    const slug = art.slug.replace(/^\//, '').replace(/\/+$/, '');
    seenSlugs.add(slug);

    const catName = (art.category || 'Trekking Guides').split('·')[0].trim();
    const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'trekking-guides';
    const category = await prisma.blogCategory.upsert({
      where: { slug: catSlug },
      update: {},
      create: { slug: catSlug, name: catName }
    });

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    let seoId = existing ? existing.seoId : null;
    if (!seoId) {
      const seo = await prisma.seoMeta.create({
        data: {
          entityType: 'BlogPost',
          metaTitle: art.title,
          metaDescription: art.desc || null,
          canonicalUrl: `https://www.igloohimalayatreks.com/blog/${slug}`,
          schemaType: 'Article'
        }
      });
      seoId = seo.id;
    }

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: art.title,
        h1: art.h1 || art.title,
        breadcrumbTitle: art.breadcrumbTitle || null,
        excerpt: art.desc || null,
        lead: art.lead || null,
        sectionsJson: art.sections || undefined,
        faqJson: art.faq || undefined,
        readingMinutes: parseNumberFromText(art.readingTime) || 10,
        categoryId: category.id,
        authorId: defaultAuthor.id,
        seoId,
        status: 'PUBLISHED'
      },
      create: {
        slug,
        title: art.title,
        h1: art.h1 || art.title,
        breadcrumbTitle: art.breadcrumbTitle || null,
        excerpt: art.desc || null,
        lead: art.lead || null,
        sectionsJson: art.sections || undefined,
        faqJson: art.faq || undefined,
        readingMinutes: parseNumberFromText(art.readingTime) || 10,
        categoryId: category.id,
        authorId: defaultAuthor.id,
        seoId,
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
  }

  // Also index any standalone /blog/<slug>/index.html directories not in articles.js
  const blogDir = path.join(ROOT_DIR, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const slug of fs.readdirSync(blogDir)) {
      if (seenSlugs.has(slug)) continue;
      const htmlPath = path.join(blogDir, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const $ = cheerio.load(fs.readFileSync(htmlPath, 'utf8'));
      const title = $('title').text().trim() || slug;
      const h1 = $('h1').first().text().trim() || title;
      const desc = $('meta[name="description"]').attr('content') || null;
      const canonical = $('link[rel="canonical"]').attr('href') || `https://www.igloohimalayatreks.com/blog/${slug}`;

      const existing = await prisma.blogPost.findUnique({ where: { slug } });
      let seoId = existing ? existing.seoId : null;
      if (!seoId) {
        const seo = await prisma.seoMeta.create({
          data: { entityType: 'BlogPost', metaTitle: title, metaDescription: desc, canonicalUrl: canonical, schemaType: 'Article' }
        });
        seoId = seo.id;
      }

      await prisma.blogPost.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          title,
          h1,
          excerpt: desc,
          authorId: defaultAuthor.id,
          seoId,
          status: 'PUBLISHED',
          publishedAt: new Date()
        }
      });
      seenSlugs.add(slug);
    }
  }

  console.log(`Imported/synced ${seenSlugs.size} blog posts.`);
}

async function importPagesTeamAndRedirects() {
  // Team members
  const teamDir = path.join(ROOT_DIR, 'team');
  let teamCount = 0;
  if (fs.existsSync(teamDir)) {
    for (const file of fs.readdirSync(teamDir)) {
      if (!file.endsWith('.html')) continue;
      const slug = file.replace(/\.html$/, '');
      const $ = cheerio.load(fs.readFileSync(path.join(teamDir, file), 'utf8'));
      const name = $('h1').first().text().trim() || slug.replace(/-/g, ' ');
      const role = $('h2, .team-role, p').first().text().trim().slice(0, 140) || 'Team Member';

      await prisma.teamMember.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          name,
          role,
          countryBadge: 'NEPAL',
          sortOrder: teamCount,
          isActive: true
        }
      });
      teamCount++;
    }
  }

  // Core editable pages
  const corePages = [
    { slug: 'home', file: 'index.html', templateKey: 'home' },
    { slug: 'about-us', file: 'about-us/index.html', templateKey: 'about' },
    { slug: 'contact-us', file: 'contact-us/index.html', templateKey: 'contact' },
    { slug: 'custom-plan', file: 'custom-plan.html', templateKey: 'custom-plan' },
    { slug: 'equipment-checklist', file: 'equipment-checklist/index.html', templateKey: 'checklist' },
    { slug: 'reviews', file: 'reviews.html', templateKey: 'reviews' },
    { slug: 'privacy-policy', file: 'privacy-policy.html', templateKey: 'legal' },
    { slug: 'terms-and-conditions', file: 'terms-and-conditions.html', templateKey: 'legal' },
    { slug: 'legal-documents', file: 'legal-documents.html', templateKey: 'legal' }
  ];

  let pageCount = 0;
  for (const p of corePages) {
    const full = path.join(ROOT_DIR, p.file);
    if (!fs.existsSync(full)) continue;
    const $ = cheerio.load(fs.readFileSync(full, 'utf8'));
    const metaTitle = $('title').text().trim() || p.slug;
    const metaDescription = $('meta[name="description"]').attr('content') || null;
    const canonicalUrl = $('link[rel="canonical"]').attr('href') || null;
    const h1 = $('h1').first().text().trim() || metaTitle;

    const existing = await prisma.page.findUnique({ where: { slug: p.slug } });
    let seoId = existing ? existing.seoId : null;
    if (!seoId) {
      const seo = await prisma.seoMeta.create({
        data: { entityType: 'Page', metaTitle, metaDescription, canonicalUrl, schemaType: 'WebPage' }
      });
      seoId = seo.id;
    }

    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: h1,
        templateKey: p.templateKey,
        sectionsJson: { heroTitle: h1, metaDescription },
        seoId,
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
    pageCount++;
  }

  // _redirects
  const redirectsPath = path.join(ROOT_DIR, '_redirects');
  let redirectCount = 0;
  if (fs.existsSync(redirectsPath)) {
    const existingRedirects = await prisma.redirectRule.findMany({ select: { fromPath: true } });
    const existingFromSet = new Set(existingRedirects.map((r) => r.fromPath));
    const lines = fs.readFileSync(redirectsPath, 'utf8').split(/\r?\n/);
    const pendingRedirects = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const fromPath = parts[0];
        const toPath = parts[1];
        const statusCode = parts[2] && parts[2].includes('302') ? 302 : 301;
        redirectCount++;
        if (!existingFromSet.has(fromPath)) {
          existingFromSet.add(fromPath);
          pendingRedirects.push({ fromPath, toPath, statusCode, isActive: true });
        }
      }
    }
    const CHUNK = 200;
    for (let i = 0; i < pendingRedirects.length; i += CHUNK) {
      await prisma.redirectRule.createMany({ data: pendingRedirects.slice(i, i + CHUNK), skipDuplicates: true });
    }
  }

  console.log(`Imported/synced ${teamCount} team profiles, ${pageCount} core pages, and ${redirectCount} redirects.`);
}

async function main() {
  console.log('Starting existing website content ingestion...');
  await warmMediaCache();
  const { altitudeProfiles, weatherProfiles } = loadVisualizerMaps();
  const destinationsByKey = await importDestinations();
  await importPackages(destinationsByKey, altitudeProfiles, weatherProfiles);
  await importBlogs();
  await importPagesTeamAndRedirects();
  console.log('Website content ingestion complete.');
}

main()
  .catch((err) => {
    console.error('Content import failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
