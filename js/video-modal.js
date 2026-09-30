/**
 * Himalayan Video Player Modal Lightbox
 * Handles video playback for hero thumbnail, "How Booking Works",
 * video review cards, testimonial story cards, and webinars.
 */

(function () {
  'use strict';

  function getRootRelativePath(relativePath) {
    if (!relativePath) return '';
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    // If running under http/https protocol, absolute root path works anywhere
    if (window.location.protocol.startsWith('http')) {
      const clean = relativePath.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
      return '/' + clean;
    }
    // If running under file:///, compute relative depth
    const path = window.location.pathname.replace(/\\/g, '/');
    const segments = path.split('/').filter(Boolean);
    let depth = 0;
    if (segments.length > 1 && segments[segments.length - 1].endsWith('.html')) {
      depth = segments.length - 2; // relative to root
    }
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    return prefix + relativePath.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
  }

  function ensureModalDOM() {
    let modal = document.getElementById('video-review-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'video-review-modal';
      modal.className = 'video-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="video-modal-card">
          <button type="button" id="video-modal-close" class="video-modal-close-btn" aria-label="Close Video Player">&times;</button>
          <div class="video-modal-header">
            <h3 id="video-modal-title" style="color: #0E3458; margin-bottom: 4px; font-size: 1.35rem; font-weight: 700;">Himalayan Video Story</h3>
            <span id="video-modal-sub" style="color: #1A96C8; font-weight: 600; font-size: 0.92rem;">Igloo Himalaya Treks Experience</span>
          </div>
          <div class="video-modal-player-wrapper">
            <video id="video-modal-player" controls playsinline preload="auto" style="width: 100%; height: 100%; border-radius: 12px; object-fit: contain; background: #000000;">
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    return modal;
  }

  function initVideoModal() {
    const modal = ensureModalDOM();
    const player = modal.querySelector('#video-modal-player');
    const titleEl = modal.querySelector('#video-modal-title');
    const subEl = modal.querySelector('#video-modal-sub');
    const closeBtn = modal.querySelector('#video-modal-close');

    function openModalWithVideo(trigger) {
      // 1. Determine Video Source
      let rawSrc = trigger.getAttribute('data-video-src') || trigger.getAttribute('data-video-url');

      if (!rawSrc) {
        // Fallback deduction based on text/context
        const text = (trigger.textContent || '').toLowerCase();
        if (text.includes('angelina') || text.includes('manaslu')) {
          rawSrc = 'video/Clip%20Video%20Second.mp4';
        } else if (text.includes('david') || text.includes('everest') || text.includes('ebc')) {
          rawSrc = 'video/Clip%20Video%20Third.mp4';
        } else if (text.includes('emma') || text.includes('langtang')) {
          rawSrc = 'video/Clip%20Video%20Fourth.mp4';
        } else if (text.includes('chad') || text.includes('annapurna')) {
          rawSrc = 'video/Clip%20Video%20Fifth.mp4';
        } else {
          rawSrc = 'video/Clip%20Video%20First.mp4';
        }
      }

      const finalSrc = getRootRelativePath(rawSrc);

      // 2. Determine Title & Subtitle
      let title = trigger.getAttribute('data-video-title') || trigger.getAttribute('data-trekker');
      let sub = trigger.getAttribute('data-video-sub') || trigger.getAttribute('data-trek');

      if (!title) {
        const titleNode = trigger.querySelector('h5, strong, h3, .video-user-name, .video-card-title, .resource-card-title');
        title = titleNode ? titleNode.textContent.trim() : 'Himalayan Adventure Story';
      }

      if (!sub) {
        const subNode = trigger.querySelector('.video-user-info span, .video-story-overlay span, .video-user-trek');
        sub = subNode ? subNode.textContent.trim() : 'Igloo Himalaya Treks Experience';
      }

      // 3. Determine Poster Image
      let poster = trigger.getAttribute('data-video-poster');
      if (!poster) {
        const img = trigger.querySelector('img');
        if (img && img.src) {
          poster = img.src;
        } else {
          const bg = trigger.style.backgroundImage;
          if (bg && bg.includes('url(')) {
            poster = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
          }
        }
      }

      // 4. Update Modal Elements
      if (titleEl) titleEl.textContent = title;
      if (subEl) subEl.textContent = sub;

      if (player) {
        if (poster) player.poster = poster;
        // Pause any existing playback
        player.pause();
        player.src = finalSrc;
        player.currentTime = 0;
        player.load();

        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log('Video autoplay interrupted or restricted:', err);
          });
        }
      }

      // 5. Open Modal Display
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (player) {
        player.pause();
        player.currentTime = 0;
        player.src = '';
      }
      document.body.style.overflow = '';
    }

    // Capture phase document click listener to intercept clicks on any video trigger
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest(
        '.play-video-trigger, .video-card, .video-story-card, .video-thumb-card, .how-works-video-wrapper, .video-review-card, [data-video-src], [data-video-url]'
      );

      if (trigger) {
        // Stop propagation so inquiry modal or card link won't fire
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        openModalWithVideo(trigger);
      }
    }, true);

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      });
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoModal);
  } else {
    initVideoModal();
  }
})();
