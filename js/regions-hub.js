/**
 * Trekking Regions Hub - Interactive Features
 * Handles FAQ accordion & live search, Map hotspot smooth scroll, ScrollSpy subnav,
 * and Interactive Region Selection Tool
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion & Category Filter & Live Search
  const faqHeaders = document.querySelectorAll('.faq-accordion-header');
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqCategoryPills = document.querySelectorAll('.faq-pill-btn');

  // Accordion toggle
  faqHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const item = header.closest('.faq-accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('open') || item.classList.contains('active');
      
      // Close other open items in the same visible list
      faqItems.forEach(el => {
        if (el !== item) el.classList.remove('open', 'active');
      });
      
      if (!isOpen) {
        item.classList.add('open', 'active');
      } else {
        item.classList.remove('open', 'active');
      }
    });
  });

  // Category Filtering
  let activeCategory = 'all';
  let searchTerm = '';

  function filterFaqs() {
    faqItems.forEach(item => {
      const itemCat = item.getAttribute('data-faq-cat') || 'all';
      const questionText = (item.querySelector('.faq-accordion-header')?.textContent || '').toLowerCase();
      const bodyText = (item.querySelector('.faq-accordion-body')?.textContent || '').toLowerCase();
      const combinedText = questionText + ' ' + bodyText;

      const matchesCat = (activeCategory === 'all') || (itemCat === activeCategory);
      const matchesSearch = !searchTerm || combinedText.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (faqCategoryPills.length > 0) {
    faqCategoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        faqCategoryPills.forEach(p => p.classList.remove('is-active', 'active'));
        pill.classList.add('is-active', 'active');
        activeCategory = pill.getAttribute('data-faq-cat') || 'all';
        filterFaqs();
      });
    });
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterFaqs();
    });
  }

  // 2. Interactive Region Selection Tool Filter Logic
  const filterForm = document.getElementById('region-finder-form');
  const resultCards = document.querySelectorAll('.region-tool-card');
  const noResultMsg = document.getElementById('no-tool-results');

  if (filterForm && resultCards.length > 0) {
    const filterInputs = filterForm.querySelectorAll('select, input');
    
    function filterRegions() {
      const duration = document.getElementById('filter-duration')?.value || 'all';
      const difficulty = document.getElementById('filter-difficulty')?.value || 'all';
      const crowds = document.getElementById('filter-crowds')?.value || 'all';
      const interest = document.getElementById('filter-interest')?.value || 'all';

      let matchCount = 0;

      resultCards.forEach(card => {
        const cardDuration = card.getAttribute('data-duration') || '';
        const cardDifficulty = card.getAttribute('data-difficulty') || '';
        const cardCrowds = card.getAttribute('data-crowds') || '';
        const cardInterests = card.getAttribute('data-interests') || '';

        const durationMatch = (duration === 'all') || cardDuration.includes(duration);
        const difficultyMatch = (difficulty === 'all') || (cardDifficulty === difficulty);
        const crowdsMatch = (crowds === 'all') || (cardCrowds === crowds);
        const interestMatch = (interest === 'all') || cardInterests.includes(interest);

        if (durationMatch && difficultyMatch && crowdsMatch && interestMatch) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultMsg) {
        noResultMsg.style.display = (matchCount === 0) ? 'block' : 'none';
      }
    }

    filterInputs.forEach(input => {
      input.addEventListener('change', filterRegions);
    });

    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterForm.reset();
        filterRegions();
      });
    }
  }

  // 3. Smooth Scroll for Anchor Links & Sticky Subnav
  const subnavLinks = document.querySelectorAll('.region-subnav-link');
  const sections = [];

  subnavLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const el = document.querySelector(targetId);
      if (el) sections.push({ link, el });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && document.querySelector(targetId)) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        const headerOffset = 130;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ScrollSpy for Subnav
  if (sections.length > 0) {
    function onScrollSpy() {
      const scrollPos = window.scrollY + 160;
      let currentSection = null;

      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].el.offsetTop;
        const height = sections[i].el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = sections[i];
          break;
        }
      }

      if (currentSection) {
        subnavLinks.forEach(l => l.classList.remove('is-active', 'active'));
        currentSection.link.classList.add('is-active', 'active');
      }
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }
});
