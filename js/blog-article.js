/**
 * Igloo Himalaya Treks — Blog Article Interactive Controller
 * Handles:
 * - Dynamic Reading Progress Indicator
 * - Sticky Table of Contents Active Tracking (Container-only scroll)
 * - Mobile Table of Contents Collapsible Toggle
 * - Categorized FAQ Accordion (Dhaulagiri Circuit Layout)
 * - Social Share API & Copy Link Toast
 * - Floating Back to Top Button
 */

function initBlogArticle() {
  initReadingProgressBar();
  initTableOfContents();
  initMobileTocToggle();
  initFaqAccordion();
  initShareControls();
  initBackToTop();
  initChecklist();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogArticle);
} else {
  initBlogArticle();
}

/**
 * 1. Reading Progress Bar Indicator
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  const article = document.querySelector('.article-main-body');
  if (!progressBar || !article) return;

  window.addEventListener('scroll', () => {
    const articleRect = article.getBoundingClientRect();
    const articleTop = articleRect.top + window.scrollY;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const startOffset = articleTop - 120;
    const totalScrollable = articleHeight - windowHeight + 200;

    if (scrollY < startOffset) {
      progressBar.style.width = '0%';
    } else {
      const progress = Math.min(100, Math.max(0, ((scrollY - startOffset) / totalScrollable) * 100));
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/**
 * 2. Sticky Table of Contents (Desktop) & Anchor Smooth Scrolling
 */
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = Array.from(document.querySelectorAll('.article-content-column section[id]'));

  if (!tocLinks.length || !sections.length) return;

  const headerOffset = 95; // Accounts for sticky header

  // Smooth scroll click handler
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, `#${targetId}`);
        }

        // Close mobile TOC if open
        const mobileTocContent = document.getElementById('mobile-toc-dropdown');
        const mobileTocToggle = document.getElementById('mobile-toc-toggle');
        if (mobileTocContent && mobileTocContent.classList.contains('is-open')) {
          mobileTocContent.classList.remove('is-open');
          if (mobileTocToggle) mobileTocToggle.setAttribute('aria-expanded', 'false');
          const chevron = mobileTocToggle ? mobileTocToggle.querySelector('.mobile-toc-chevron') : null;
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  function scrollTocLinkIntoView(link) {
    const container = link.closest('.toc-nav-scrollable');
    if (!container) return;
    const linkTop = link.offsetTop;
    const linkHeight = link.offsetHeight;
    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    if (linkTop < containerTop) {
      container.scrollTo({ top: Math.max(0, linkTop - 12), behavior: 'smooth' });
    } else if (linkTop + linkHeight > containerTop + containerHeight) {
      container.scrollTo({ top: linkTop + linkHeight - containerHeight + 12, behavior: 'smooth' });
    }
  }

  function updateActiveLink(id) {
    tocLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (id && href === id) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
        // Scroll solely inside the TOC container without touching main window scroll
        scrollTocLinkIntoView(link);
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Robust scroll-spy tracking on scroll
  function updateActiveSectionOnScroll() {
    const scrollPos = window.scrollY + 140; // accounts for sticky header height + breathing room
    const firstSection = sections[0];

    // If user is at or near the roof of the page (hero, title, header, quick summary)
    if (firstSection && scrollPos < firstSection.offsetTop) {
      updateActiveLink(null);
      return;
    }

    let currentId = null;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      } else {
        break;
      }
    }
    updateActiveLink(currentId);
  }

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateActiveSectionOnScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Initial call
  updateActiveSectionOnScroll();
}

/**
 * 3. Mobile Table of Contents Accordion
 */
function initMobileTocToggle() {
  const toggleBtn = document.getElementById('mobile-toc-toggle');
  const dropdown = document.getElementById('mobile-toc-dropdown');
  if (!toggleBtn || !dropdown) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const chevron = toggleBtn.querySelector('.mobile-toc-chevron');
    if (chevron) {
      chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });
}

/**
 * 4. Categorized FAQ Section Handler (Dhaulagiri Circuit Layout)
 */
function initFaqAccordion() {
  const categoryBtns = document.querySelectorAll('.faq-category-btn');
  const categoryPanels = document.querySelectorAll('.faq-category-content');
  const currentCategoryTitle = document.getElementById('faq-current-category-title');
  const expandAllBtn = document.getElementById('faq-expand-all-btn');

  // Category Tab Switcher (if present)
  if (categoryBtns.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetCat = btn.getAttribute('data-category');
        const catText = btn.getAttribute('data-title') || btn.innerText.trim();

        if (currentCategoryTitle) {
          currentCategoryTitle.textContent = catText;
        }

        categoryPanels.forEach(panel => {
          if (panel.id === `faq-cat-${targetCat}`) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });

        // Reset Expand All button label
        if (expandAllBtn) {
          expandAllBtn.textContent = 'Expand All';
        }
      });
    });
  }

  // Accordion Item Toggle (always active for any .faq-item-question)
  document.querySelectorAll('.faq-item-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) {
        item.classList.toggle('active');
        const isNowActive = item.classList.contains('active');
        q.setAttribute('aria-expanded', isNowActive ? 'true' : 'false');
        const answer = item.querySelector('.faq-item-answer');
        if (answer && (answer.style.display === 'none' || answer.style.display === 'block')) {
          answer.style.display = isNowActive ? 'block' : 'none';
        }
      }
    });

    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        q.click();
      }
    });
  });

  // Expand All / Collapse All Button
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.faq-category-content.active');
      const items = activePanel ? activePanel.querySelectorAll('.faq-item') : document.querySelectorAll('.faq-item');
      if (!items.length) return;

      const isExpanded = expandAllBtn.textContent.trim() === 'Collapse All';

      items.forEach(item => {
        const q = item.querySelector('.faq-item-question');
        if (isExpanded) {
          item.classList.remove('active');
          if (q) q.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          if (q) q.setAttribute('aria-expanded', 'true');
        }
      });

      expandAllBtn.textContent = isExpanded ? 'Expand All' : 'Collapse All';
    });
  }
}

/**
 * 5. Social Sharing & Native Share API
 */
function initShareControls() {
  const copyBtn = document.getElementById('share-copy-link-btn');
  const nativeShareBtn = document.getElementById('share-native-btn');
  const shareToast = document.getElementById('share-toast-notification');

  const articleUrl = window.location.href;
  const articleTitle = document.title;

  function showToast(message) {
    if (!shareToast) return;
    shareToast.textContent = message;
    shareToast.classList.add('show');
    setTimeout(() => {
      shareToast.classList.remove('show');
    }, 2800);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(articleUrl);
          showToast('Link copied to clipboard!');
        } else {
          // Fallback for older browsers
          const input = document.createElement('input');
          input.value = articleUrl;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          showToast('Link copied to clipboard!');
        }
      } catch (err) {
        showToast('Unable to copy link. Please copy URL from browser.');
      }
    });
  }

  // Native Web Share API for Mobile
  if (nativeShareBtn) {
    if (navigator.share) {
      nativeShareBtn.style.display = 'inline-flex';
      nativeShareBtn.addEventListener('click', async () => {
        try {
          const shareText = nativeShareBtn.getAttribute('data-share-text') ||
            document.querySelector('meta[name="description"]')?.getAttribute('content') ||
            "Compare Everest Base Camp and the Annapurna Circuit to find which Nepal trek fits you best.";
          await navigator.share({
            title: articleTitle,
            text: shareText,
            url: articleUrl
          });
        } catch (err) {
          // User dismissed or share failed
        }
      });
    } else {
      nativeShareBtn.style.display = 'none';
    }
  }

  // Open external share popups cleanly (Facebook, X / Twitter, LinkedIn)
  const shareLinks = document.querySelectorAll('.share-strip-buttons a[target="_blank"]');
  shareLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow default direct app / new tab behavior for WhatsApp on mobile devices
      if (link.classList.contains('share-whatsapp') && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return;
      }
      e.preventDefault();
      const href = link.getAttribute('href');
      const width = 600;
      const height = 480;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(
        href,
        'share-dialog',
        `width=${width},height=${height},top=${top},left=${left},toolbar=0,menubar=0,status=0`
      );
    });
  });
}

/**
 * 6. Floating Back to Top (Roof of the Top) Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. Interactive Packing Checklist (localStorage persistence + Reset + Print)
 */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const resetBtns = document.querySelectorAll('.reset-checklist-btn');
  const printBtns = document.querySelectorAll('.print-checklist-btn');
  const progressCounters = document.querySelectorAll('.checklist-progress-text');
  const progressBarFills = document.querySelectorAll('.checklist-progress-fill');
  const STORAGE_KEY = 'ebc_packing_checklist_v1';

  if (!checkboxes.length) return;

  // Load saved state
  let savedState = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) savedState = JSON.parse(raw);
  } catch (e) {
    savedState = {};
  }

  function updateProgress() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      const id = cb.dataset.itemId || cb.id;
      if (savedState[id]) {
        cb.checked = true;
        checkedCount++;
        const row = cb.closest('.checklist-row') || cb.closest('.glance-checklist-item');
        if (row) row.classList.add('is-checked');
      } else {
        cb.checked = false;
        const row = cb.closest('.checklist-row') || cb.closest('.glance-checklist-item');
        if (row) row.classList.remove('is-checked');
      }
    });

    const percent = Math.round((checkedCount / checkboxes.length) * 100) || 0;

    progressCounters.forEach(counter => {
      counter.textContent = `${checkedCount} of ${checkboxes.length} items packed (${percent}%)`;
    });

    progressBarFills.forEach(fill => {
      fill.style.width = `${percent}%`;
    });
  }

  updateProgress();

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.dataset.itemId || cb.id;
      if (cb.checked) {
        savedState[id] = true;
      } else {
        delete savedState[id];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      } catch (e) {}
      updateProgress();
    });
  });

  resetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Reset your saved packing checklist? All checkmarks will be cleared.')) {
        savedState = {};
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        updateProgress();
      }
    });
  });

  printBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.print();
    });
  });
}
