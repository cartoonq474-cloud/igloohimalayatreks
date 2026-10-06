const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CANONICAL_PATH = path.join(ROOT, 'blog', 'everest-base-camp-vs-annapurna-circuit', 'index.html');
const canonicalHtml = fs.readFileSync(CANONICAL_PATH, 'utf8');

// Extract Header & Footer from canonical gold-standard template
const headerMatch = canonicalHtml.match(/<header class="main-header">[\s\S]*?<\/header>/);
const footerMatch = canonicalHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

/**
 * Standard Blog Article Template Renderer
 * Guaranteed 100% template identity across all blog article pages.
 *
 * @param {Object} article - Data model representing a single blog article
 * @param {string} [relPath='../'] - Relative path prefix from article file to project root
 * @param {Object} [prevArticle=null] - Previous article metadata for bottom pagination
 * @param {Object} [nextArticle=null] - Next article metadata for bottom pagination
 * @returns {string} Fully rendered HTML document
 */
function renderBlogArticle(article, relPath = '../', prevArticle = null, nextArticle = null) {
  const slug = article.slug.replace(/^\//, '').replace(/\/+$/, '');
  const canonicalUrl = article.canonicalUrl || `https://igloohimalayatreks.com/${slug}/`;

  // Normalize header and footer relative asset links
  const headerHtml = headerMatch
    ? headerMatch[0].replace(/\.\.\/\.\.\//g, relPath)
    : '';
  const footerHtml = footerMatch
    ? footerMatch[0].replace(/\.\.\/\.\.\//g, relPath)
    : '';

  // Breadcrumbs
  const breadcrumbTitle = article.breadcrumbTitle || article.title;

  // Reading time
  const readingTime = article.readingTime || '12 min read';

  // Dates
  const publishedDateText = article.publishedDateText || 'Oct 4, 2026';
  const publishedDateAttr = article.publishedDateAttr || '2026-10-04';
  const updatedDateText = article.updatedDateText || 'Oct 5, 2026';
  const updatedDateAttr = article.updatedDateAttr || '2026-10-05';

  // Hero image
  const heroImg = article.heroImg.startsWith('http') ? article.heroImg : `${relPath}${article.heroImg.replace(/^\/+/, '')}`;
  const heroImgAbsolute = article.heroImg.startsWith('http') ? article.heroImg : `https://igloohimalayatreks.com/${article.heroImg.replace(/^\/+/, '')}`;
  const heroAlt = article.heroAlt || article.h1;
  const heroCaption = article.heroCaption || `Editorial guide to ${breadcrumbTitle} in the Nepal Himalayas.`;

  // Quick Answer / Key Takeaway Card
  const quickAnswerTitle = article.quickAnswerTitle || 'Quick Summary & Essential Takeaways';
  const quickAnswerContent = article.quickAnswerContent || `<p>${article.lead}</p>`;
  const quickAnswerCtaText = article.quickAnswerCtaText || 'Planning your travel dates or have questions?';

  // Sections
  const sections = article.sections || [];

  // TOC entries
  const desktopTocHtml = sections.map((sec, i) => `
    <li><a href="#${sec.id}" class="toc-link"><span class="toc-num">${(i + 1).toString().padStart(2, '0')}</span><span>${sec.h2}</span></a></li>
  `).join('');

  const mobileTocHtml = sections.map((sec, i) => `
    <li><a href="#${sec.id}" class="toc-link"><span class="toc-num">${(i + 1).toString().padStart(2, '0')}.</span> ${sec.h2}</a></li>
  `).join('');

  // Section Body
  const sectionsHtml = sections.map(sec => `
    <section id="${sec.id}" class="article-section" style="margin-bottom: 48px;">
      <h2>${sec.h2}</h2>
      ${sec.content}
    </section>
  `).join('');

  // Related Articles
  const related = article.relatedArticles && article.relatedArticles.length === 3 ? article.relatedArticles : [
    {
      url: `${relPath}blog/ultimate-everest-packing-checklist-2026/`,
      img: `${relPath}images/everest-base-camp-packing-checklist-2026-gear-flat-lay.webp`,
      category: 'Gear & Packing',
      title: 'Ultimate Everest Packing Checklist for 2026',
      excerpt: 'Four-layer clothing system, broken-in boots, sleeping bags, daypack vs main bag organization, and gear rental tips for Nepal.',
      readTime: '31 min read'
    },
    {
      url: `${relPath}blog/how-to-prevent-altitude-sickness/`,
      img: `${relPath}images/acclimatization-and-altitude-sickness-prevention-for-high-altitude-hiking.webp`,
      category: 'High Altitude Safety',
      title: 'How to Prevent Altitude Sickness (AMS): Medical Guide for Nepal Treks',
      excerpt: 'Acclimatization schedules, Diamox dosages, recognizing AMS, HAPE, HACE, pulse oximeter monitoring, and emergency descent protocols.',
      readTime: '35 min read'
    },
    {
      url: `${relPath}blog/teahouse-food-lodging-nepal-trails/`,
      img: `${relPath}images/traditional-nepal-teahouse-dal-bhat-thali.webp`,
      category: 'Culture & Teahouse Life',
      title: 'Teahouse Food & Lodging on Nepal Trails: The Complete Guide',
      excerpt: 'From "Dal Bhat Power 24 Hour" and garlic soup to heated dining halls, solar showers, charging devices, and cultural etiquette on trail.',
      readTime: '24 min read'
    }
  ];

  const relatedArticlesHtml = related.map(item => `
    <a href="${item.url}" class="related-article-card">
      <img src="${item.img}" alt="${item.title}" class="related-article-thumb" width="600" height="400" loading="lazy" decoding="async">
      <div class="related-article-content">
        <span class="related-article-category">${item.category}</span>
        <h3 class="related-article-title">${item.title}</h3>
        <p class="related-article-excerpt">${item.excerpt}</p>
        <div class="related-article-meta">
          <span>By Ang Tshering Sherpa</span>
          <span>•</span>
          <span>${item.readTime || '15 min read'}</span>
        </div>
      </div>
    </a>
  `).join('');

  // Structured Data Schema Graphs
  const schemaGraphs = [
    {
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#article`,
      "isPartOf": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "headline": article.h1,
      "description": article.desc,
      "image": heroImgAbsolute,
      "datePublished": `${publishedDateAttr}T08:00:00+05:45`,
      "dateModified": `${updatedDateAttr}T08:00:00+05:45`,
      "author": {
        "@type": "Person",
        "name": "Ang Tshering Sherpa",
        "jobTitle": "Founder & Managing Director · 5x Everest Summitter",
        "url": "https://igloohimalayatreks.com/team/ang-tshering-sherpa.html",
        "image": "https://igloohimalayatreks.com/images/sonam-dorji-sherpa-climbing-guide-in-nepal.webp"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Igloo Himalaya Treks",
        "url": "https://igloohimalayatreks.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://igloohimalayatreks.com/images/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "articleSection": article.category,
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://igloohimalayatreks.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://igloohimalayatreks.com/blogs.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": breadcrumbTitle,
          "item": canonicalUrl
        }
      ]
    }
  ];

  // Optional FAQ schema
  if (article.faqs && article.faqs.length > 0) {
    schemaGraphs.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    });
  }

  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(article.h1);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title}</title>
  <meta name="description" content="${article.desc}">
  <meta name="robots" content="index, follow">

  <!-- Canonical URL -->
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="${relPath}images/logo.png?v=2">
  <link rel="apple-touch-icon" href="${relPath}images/logo.png?v=2">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Igloo Himalaya Treks">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.desc}">
  <meta property="og:image" content="${heroImgAbsolute}">
  <meta property="article:published_time" content="${publishedDateAttr}T08:00:00+05:45">
  <meta property="article:modified_time" content="${updatedDateAttr}T08:00:00+05:45">
  <meta property="article:section" content="${article.category}">
  <meta property="article:author" content="https://igloohimalayatreks.com/team/ang-tshering-sherpa.html">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.desc}">
  <meta name="twitter:image" content="${heroImgAbsolute}">

  <!-- Google Fonts: Inter, Outfit, Plus Jakarta Sans & Caveat -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap">
  <link rel="stylesheet" href="${relPath}index.css?v=43">

  <!-- JSON-LD Structured Data: BlogPosting, BreadcrumbList & FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": ${JSON.stringify(schemaGraphs, null, 2)}
  }
  </script>
</head>

<body>

  <!-- Dynamic Reading Progress Bar -->
  <div id="reading-progress-bar" aria-hidden="true"></div>

  <!-- Global Header Navigation -->
  ${headerHtml}

  <main class="article-main-body">

    <!-- Blog Breadcrumb -->
    <nav class="blog-breadcrumb-nav" aria-label="Breadcrumb">
      <div class="container">
        <ol class="blog-breadcrumb-list">
          <li><a href="${relPath}index.html">Home</a></li>
          <li class="blog-breadcrumb-separator" aria-hidden="true">/</li>
          <li><a href="${relPath}blogs.html">Blog</a></li>
          <li class="blog-breadcrumb-separator" aria-hidden="true">/</li>
          <li class="blog-breadcrumb-current" aria-current="page">${breadcrumbTitle}</li>
        </ol>
      </div>
    </nav>

    <!-- Article Header -->
    <header class="article-header-area">
      <div class="container">
        <span class="article-category-badge">${article.category}</span>
        <h1 class="article-main-title">${article.h1}</h1>
        <p class="article-lead-description">${article.lead}</p>

        <!-- Metadata Bar -->
        <div class="article-meta-bar">
          <div class="article-author-chip">
            <img src="${relPath}images/sonam-dorji-sherpa-climbing-guide-in-nepal.webp" alt="Ang Tshering Sherpa"
              class="article-author-avatar" width="44" height="44" loading="eager" decoding="async">
            <div class="article-author-info">
              <a href="${relPath}team/ang-tshering-sherpa.html" class="article-author-name" rel="author">Ang Tshering Sherpa</a>
              <span class="article-author-title">Founder & Managing Director · 5x Everest Summitter</span>
            </div>
          </div>
          <div class="article-meta-dot" aria-hidden="true"></div>
          <div class="article-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <time datetime="${publishedDateAttr}">Published ${publishedDateText}</time>
          </div>
          <div class="article-meta-dot" aria-hidden="true"></div>
          <div class="article-meta-item">
            <time datetime="${updatedDateAttr}">Updated ${updatedDateText}</time>
          </div>
          <div class="article-meta-dot" aria-hidden="true"></div>
          <div class="article-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>${readingTime}</span>
          </div>
        </div>

        <!-- Hero Image -->
        <figure class="article-hero-wrap">
          <img src="${heroImg}" alt="${heroAlt}" class="article-hero-media" width="1920" height="960"
            fetchpriority="high" loading="eager" decoding="async">
          <figcaption class="article-hero-caption">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span>${heroCaption}</span>
          </figcaption>
        </figure>

        <!-- Quick Answer / Key Takeaway Card -->
        <aside class="quick-answer-card" aria-labelledby="quick-answer-title">
          <div class="quick-answer-header">
            <span class="quick-answer-badge">Key Takeaway</span>
            <h2 id="quick-answer-title" class="quick-answer-heading">${quickAnswerTitle}</h2>
          </div>
          <div class="quick-answer-body">
            ${quickAnswerContent}
          </div>
          <div class="quick-answer-cta-strip">
            <span class="quick-answer-cta-text">${quickAnswerCtaText}</span>
            <div class="quick-answer-btn-group">
              <button type="button" class="btn btn-primary open-inquiry-btn" style="padding: 10px 22px; font-size: 0.92rem;">Plan My Trek ↗</button>
              <a href="${relPath}nepal-trekking-packages/" class="btn" style="background: #FFFFFF; border: 1px solid var(--color-neutral-300); color: var(--color-primary-dark); padding: 10px 20px; font-size: 0.92rem; text-decoration: none;">Explore All Treks</a>
            </div>
          </div>
        </aside>

      </div>
    </header>

    <!-- Main Content & Sticky Desktop Table of Contents Grid -->
    <div class="container">

      <!-- Mobile Collapsible Table of Contents -->
      <div class="toc-mobile-card">
        <button type="button" id="mobile-toc-toggle" class="toc-mobile-toggle-btn" aria-expanded="false" aria-controls="mobile-toc-dropdown">
          <span>On This Page: ${sections.length} Guide Sections</span>
          <span class="mobile-toc-chevron" aria-hidden="true">▾</span>
        </button>
        <div id="mobile-toc-dropdown" class="toc-mobile-dropdown">
          <ol class="toc-nav-list" style="padding-top: 10px;">
            ${mobileTocHtml}
          </ol>
        </div>
      </div>

      <div class="article-editorial-grid">

        <!-- Left Column: Rich Long-Form Editorial Content -->
        <article class="article-content-column">
          ${sectionsHtml}

          <!-- Author Bio Card -->
          <div class="author-profile-box">
            <img src="${relPath}images/sonam-dorji-sherpa-climbing-guide-in-nepal.webp" alt="Ang Tshering Sherpa" class="author-profile-avatar" width="90" height="90" loading="lazy">
            <div class="author-profile-details">
              <h3>Ang Tshering Sherpa</h3>
              <div class="author-profile-role">Founder & Managing Director · 5x Everest Summitter</div>
              <p class="author-profile-bio">
                Born in the Khumbu and with over 18 years of high-altitude Himalayan expedition leadership, Ang Tshering oversees route safety, Sherpa guide training, and sustainable high-altitude trekking across all major regions of Nepal.
              </p>
              <div class="author-profile-badges">
                <span class="author-badge">UIAGM / NNMGA Certified</span>
                <span class="author-badge">Everest 8,848.86m (5x)</span>
                <span class="author-badge">Khumbu Local</span>
                <a href="${relPath}team/ang-tshering-sherpa.html" style="font-size: 0.82rem; font-weight: 700; color: var(--color-primary); text-decoration: none; display: inline-flex; align-items: center; margin-left: auto;">View Full Profile →</a>
              </div>
            </div>
          </div>

          <!-- Article Share Controls -->
          <div class="article-share-strip">
            <div class="share-strip-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>Share This Guide</span>
            </div>
            <div class="share-strip-buttons">
              <button type="button" id="share-native-btn" class="share-action-btn" style="display: none;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                <span>Share</span>
              </button>
              <button type="button" id="share-copy-link-btn" class="share-action-btn copy-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                <span>Copy Link</span>
              </button>
              <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-action-btn share-facebook" aria-label="Share on Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span>Facebook</span>
              </a>
              <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" class="share-action-btn share-twitter" aria-label="Share on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span>X / Twitter</span>
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-action-btn share-linkedin" aria-label="Share on LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://api.whatsapp.com/send?text=${encodedTitle}%3A%20${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-action-btn share-whatsapp" aria-label="Share on WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <!-- Toast Notification for Copy Link -->
          <div id="share-toast-notification" role="status" aria-live="polite">Link copied to clipboard!</div>

          <!-- Final Article Call to Action -->
          <div class="article-final-cta-card">
            <h2>Ready to Experience the Himalayas?</h2>
            <p>
              Whether you are preparing for high-altitude trekking, cultural circuits, or alpine summit expeditions, start planning a bespoke journey tailored to your fitness, travel season, and style.
            </p>
            <div class="article-final-cta-btn-group">
              <a href="${relPath}${article.ctaLink1 || 'trek/everest-base-camp-trek/'}" class="btn btn-primary"
                style="background: var(--color-accent); border-color: var(--color-accent); color: #0E3458; padding: 14px 28px; font-weight: 700; text-decoration: none;">${article.ctaText1 || 'Explore Classic Treks →'}</a>
              <a href="${relPath}nepal-trekking-packages/" class="btn"
                style="background: #FFFFFF; color: var(--color-primary-dark); padding: 14px 28px; font-weight: 700; text-decoration: none;">View All 60+ Packages →</a>
              <button type="button" class="btn open-inquiry-btn"
                style="background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4); padding: 14px 24px;">Talk to a Trekking Expert ↗</button>
            </div>
          </div>
        </article>

        <!-- Right Column: Sticky Table of Contents (Desktop) -->
        <aside class="article-toc-column" aria-label="Table of contents sidebar">
          <div class="toc-sticky-card">
            <div class="toc-sticky-header">
              <h3 class="toc-sticky-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span>On This Page</span>
              </h3>
              <span style="font-size: 0.75rem; color: var(--color-neutral-400); font-weight: 600;">${sections.length} SECTIONS</span>
            </div>
            <div class="toc-nav-scrollable">
              <ol class="toc-nav-list">
                ${desktopTocHtml}
              </ol>
            </div>
            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--color-neutral-200); text-align: center;">
              <button type="button" class="btn btn-primary open-inquiry-btn" style="width: 100%; padding: 10px; font-size: 0.88rem;">Speak With a Guide ↗</button>
            </div>
          </div>
        </aside>

      </div>
    </div>

    <!-- Related Articles Section -->
    <section class="related-articles-section" aria-labelledby="related-articles-heading">
      <div class="container">
        <div class="flex-between" style="flex-wrap: wrap; gap: 12px; align-items: flex-end;">
          <div>
            <span class="pill pill-copper" style="margin-bottom: 8px;">Explore Related Guides</span>
            <h2 id="related-articles-heading" class="section-title" style="margin: 0; font-size: 1.8rem;">Related Articles</h2>
          </div>
          <a href="${relPath}blogs.html" style="color: var(--color-primary); font-weight: 700; text-decoration: none; font-size: 0.95rem;">View All Articles →</a>
        </div>

        <div class="related-articles-grid">
          ${relatedArticlesHtml}
        </div>
      </div>
    </section>

    <!-- Previous & Next Article Navigation -->
    ${prevArticle && nextArticle ? `
    <nav class="article-pagination-nav" aria-label="Previous and Next Articles" style="padding: 32px 0; background: #FFFFFF; border-top: 1px solid var(--color-neutral-200);">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
        <a href="${relPath}${prevArticle.slug}/" class="article-pagination-link prev" style="display: flex; flex-direction: column; text-decoration: none; max-width: 45%;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 0.5px;">← Previous Guide</span>
          <span style="font-size: 1.05rem; font-weight: 700; color: #0e3458; margin-top: 4px; line-height: 1.35;">${prevArticle.breadcrumbTitle || prevArticle.title}</span>
        </a>
        <a href="${relPath}${nextArticle.slug}/" class="article-pagination-link next" style="display: flex; flex-direction: column; align-items: flex-end; text-align: right; text-decoration: none; max-width: 45%; margin-left: auto;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 0.5px;">Next Guide →</span>
          <span style="font-size: 1.05rem; font-weight: 700; color: #0e3458; margin-top: 4px; line-height: 1.35;">${nextArticle.breadcrumbTitle || nextArticle.title}</span>
        </a>
      </div>
    </nav>
    ` : ''}

  </main>

  <!-- Inquiry Modal (Reuses Global Booking Modal) -->
  <div id="inquiry-modal" class="modal-overlay">
    <div class="modal-card">
      <button type="button" class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>
      <h3 style="font-size: 1.5rem; margin-bottom: 6px; color: var(--color-primary-dark);">Plan Your Himalayan Trek</h3>
      <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 20px;">
        Speak with our certified local Sherpa guides for honest advice tailored to your dates and preferences.
      </p>
      <form id="inquiry-form">
        <div class="filter-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 14px; gap: 12px;">
          <div class="form-group">
            <label class="form-label" for="inq-name">Full Name *</label>
            <input type="text" id="inq-name" class="form-input" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="inq-email">Email Address *</label>
            <input type="email" id="inq-email" class="form-input" placeholder="your@email.com" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label" for="inq-route">Preferred Route</label>
          <select id="inq-route" class="form-input" style="width: 100%;">
            <option value="undecided">Still deciding (Need expert advice)</option>
            <option value="ebc">Everest Base Camp Trek (14 Days)</option>
            <option value="act">Annapurna Circuit Trek (13 Days)</option>
            <option value="abc">Annapurna Base Camp Trek (9 Days)</option>
            <option value="manaslu">Manaslu Circuit Trek (13 Days)</option>
            <option value="langtang">Langtang Valley Trek (8 Days)</option>
            <option value="other">Custom Himalayan Combination</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 18px;">
          <label class="form-label" for="inq-notes">Your Questions / Travel Dates</label>
          <textarea id="inq-notes" class="form-input" rows="3" placeholder="Tell us your tentative travel month, fitness level, or specific questions..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 700;">Submit Inquiry ↗</button>
      </form>
    </div>
  </div>

  <!-- Global Luxury Footer -->
  ${footerHtml}

  <!-- Floating Back to Top (Roof of the Top) Button -->
  <button type="button" id="back-to-top-btn" class="back-to-top-btn" aria-label="Scroll to roof of the top" title="Scroll to top">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 15l-6-6-6 6" />
    </svg>
    <span>Top</span>
  </button>

  <!-- Scripts -->
  <script type="module" src="${relPath}js/inquiry-modal.js"></script>
  <script src="${relPath}js/header-scroll.js"></script>
  <script src="${relPath}js/mega-menu.js"></script>
  <script src="${relPath}js/blog-article.js?v=7"></script>
</body>
</html>`;
}

module.exports = {
  renderBlogArticle
};
