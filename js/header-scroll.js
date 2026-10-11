/**
 * Header Scroll & Mobile Navigation Controller
 * Igloo Himalaya Treks — Seamless In-Place Mobile Accordions & Clean Scroll States
 */
(function () {
  'use strict';

  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.main-header');
  if (header) {
    const SCROLL_THRESHOLD = 30;
    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 2. Mobile Navigation & In-Place Accordion Controller
  let isNavInitialized = false;

  function initMobileNav() {
    if (isNavInitialized) return;
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!toggleBtn || !navMenu) return;

    isNavInitialized = true;

    // Quick WhatsApp button in header if not already present
    let actionsWrapper = toggleBtn.closest('.mobile-header-actions');
    if (!actionsWrapper) {
      actionsWrapper = document.createElement('div');
      actionsWrapper.className = 'mobile-header-actions';

      const quickWhatsApp = document.createElement('a');
      quickWhatsApp.className = 'mobile-quick-whatsapp';
      quickWhatsApp.href = 'https://wa.me/9779860843980?text=Hello%20Igloo%20Himalaya%20Treks%2C%20I%20would%20like%20to%20inquire%20about%20a%20trek';
      quickWhatsApp.target = '_blank';
      quickWhatsApp.rel = 'noopener';
      quickWhatsApp.setAttribute('aria-label', 'Chat on WhatsApp');
      quickWhatsApp.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>';

      actionsWrapper.appendChild(quickWhatsApp);
      if (toggleBtn.parentNode) {
        toggleBtn.parentNode.insertBefore(actionsWrapper, toggleBtn);
      }
      actionsWrapper.appendChild(toggleBtn);

      const navEl = navMenu.closest('nav');
      if (navEl && navEl.parentNode) {
        navEl.parentNode.insertBefore(actionsWrapper, navEl.nextSibling);
      }
    }

    // Ensure action buttons exist at bottom of mobile menu
    let drawerFooter = navMenu.querySelector('.mobile-drawer-footer');
    if (!drawerFooter) {
      drawerFooter = document.createElement('li');
      drawerFooter.className = 'mobile-drawer-footer';
      drawerFooter.innerHTML = `
        <a href="https://wa.me/9779860843980?text=Hello%20Igloo%20Himalaya%20Treks%2C%20I%20am%20interested%20in%20a%20trek%20in%20Nepal." target="_blank" rel="noopener" class="mobile-drawer-whatsapp-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          WhatsApp (24/7 Expert Advice)
        </a>
        <button type="button" class="mobile-drawer-plan-btn open-inquiry-btn">
          Plan Custom Trip →
        </button>
        <a href="tel:+9779860843980" class="mobile-drawer-phone-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6851F" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Direct Hotline: <strong>+977 9860843980</strong>
        </a>
      `;
      navMenu.appendChild(drawerFooter);
    }

    function syncResponsiveVisibility() {
      const isDesktop = window.innerWidth > 1024;
      if (drawerFooter) {
        drawerFooter.style.display = isDesktop ? 'none' : 'flex';
      }
      if (actionsWrapper && actionsWrapper.classList.contains('mobile-header-actions')) {
        actionsWrapper.style.display = isDesktop ? 'none' : 'flex';
      }
    }
    syncResponsiveVisibility();

    // Open / Close Controllers
    function closeMobileMenu() {
      navMenu.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-nav-lock');
      document.documentElement.classList.remove('mobile-nav-lock');
      if (window.innerWidth > 1024 && drawerFooter) {
        drawerFooter.style.display = 'none';
      }
    }

    function openMobileMenu() {
      navMenu.classList.add('active');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-nav-lock');
      document.documentElement.classList.add('mobile-nav-lock');
      if (drawerFooter) {
        drawerFooter.style.display = 'flex';
      }
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Accordion Controllers for Mobile
    const dropdownItems = navMenu.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(item => {
      const row = item.querySelector('.nav-link-row');
      if (!row) return;

      row.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('dropdown-open');

          // Close all other open dropdowns
          dropdownItems.forEach(other => {
            if (other !== item) other.classList.remove('dropdown-open');
          });

          item.classList.toggle('dropdown-open', !isOpen);

          if (!isOpen) {
            setTimeout(() => {
              item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 80);
          }
        }
      });
    });

    // Close on leaf link click inside dropdowns or regular links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // If clicking the category toggle row link on mobile, toggleAccordion handles it
        if (link.closest('.nav-link-row') && window.innerWidth <= 1024) {
          return;
        }

        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          if (window.innerWidth <= 1024) {
            closeMobileMenu();
          }
        }
      });
    });

    navMenu.querySelectorAll('.open-inquiry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeMobileMenu();
        }
      });
    });

    // Close when clicking outside header & menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Window Resize Guard
    window.addEventListener('resize', () => {
      syncResponsiveVisibility();
      if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // 3. Desktop Mega Menu Tab Switching Logic
  function initMegaMenuTabs() {
    const sidebarItems = document.querySelectorAll('.mega-sidebar-item');
    const tabContents = document.querySelectorAll('.mega-tab-content');
    if (!sidebarItems.length || !tabContents.length) return;

    sidebarItems.forEach(item => {
      ['mouseenter', 'click'].forEach(evtType => {
        item.addEventListener(evtType, () => {
          const targetId = item.getAttribute('data-target');
          if (!targetId) return;

          sidebarItems.forEach(i => i.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          item.classList.add('active');
          const targetTab = document.getElementById(targetId);
          if (targetTab) {
            targetTab.classList.add('active');
          }
        });
      });
    });
  }

  function initAll() {
    initMobileNav();
    initMegaMenuTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
