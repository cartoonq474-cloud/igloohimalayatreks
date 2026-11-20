/**
/**
 * Himalayan Video Player Modal Lightbox (Production Engine)
 * Handles video playback for hero thumbnail, "How Booking Works",
 * video review cards, testimonial story cards, and webinars.
 * Features smart autoplay with browser policy detection, unmuted fallback,
 * and high-visibility sound/play controls.
 */

(function () {
  'use strict';

  function resolveMediaUrl(relativePath) {
    if (!relativePath) return '';
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    // Clean relative prefixes (../../, ./, /)
    const clean = relativePath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\//, '');
    
    // Normalize URI encoding (decode first if already partially encoded, then re-encode safely)
    let safePath = clean;
    try {
      safePath = encodeURI(decodeURI(clean));
    } catch (e) {
      safePath = clean;
    }

    if (window.location.protocol.startsWith('http')) {
      return window.location.origin + '/' + safePath;
    }
    // Fallback for file:/// protocol
    return safePath;
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
            <video id="video-modal-player" controls playsinline webkit-playsinline preload="auto">
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
    const wrapper = modal.querySelector('.video-modal-player-wrapper');
    const titleEl = modal.querySelector('#video-modal-title');
    const subEl = modal.querySelector('#video-modal-sub');
    const closeBtn = modal.querySelector('#video-modal-close');

    let unmuteBadge = null;
    let playOverlay = null;

    function removeOverlays() {
      if (unmuteBadge && unmuteBadge.parentNode) {
        unmuteBadge.parentNode.removeChild(unmuteBadge);
        unmuteBadge = null;
      }
      if (playOverlay && playOverlay.parentNode) {
        playOverlay.parentNode.removeChild(playOverlay);
        playOverlay = null;
      }
    }

    function showUnmuteBadge() {
      if (!wrapper || unmuteBadge) return;
      unmuteBadge = document.createElement('button');
      unmuteBadge.type = 'button';
      unmuteBadge.className = 'video-unmute-badge';
      unmuteBadge.setAttribute('aria-label', 'Tap for sound');
      unmuteBadge.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <span>Tap for Sound</span>
      `;

      unmuteBadge.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (player) {
          player.muted = false;
        }
        removeOverlays();
      });

      wrapper.appendChild(unmuteBadge);
    }

    function showPlayOverlay() {
      if (!wrapper || playOverlay) return;
      playOverlay = document.createElement('button');
      playOverlay.type = 'button';
      playOverlay.className = 'video-center-play-overlay';
      playOverlay.setAttribute('aria-label', 'Play Video');
      playOverlay.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" stroke="none">
          <polygon points="8 5 19 12 8 19 8 5"></polygon>
        </svg>
      `;

      playOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (player) {
          player.muted = false;
          player.play().catch(() => {
            player.muted = true;
            player.play().catch(() => {});
          });
        }
        removeOverlays();
      });

      wrapper.appendChild(playOverlay);
    }

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

      const finalSrc = resolveMediaUrl(rawSrc);

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
        removeOverlays();

        // Clear any previous child <source> elements to prevent media ambiguity
        while (player.firstChild) {
          player.removeChild(player.firstChild);
        }

        player.pause();
        player.controls = true;
        player.playsInline = true;
        player.setAttribute('playsinline', '');
        player.setAttribute('webkit-playsinline', '');
        player.preload = 'auto';

        if (poster) player.poster = poster;

        player.src = finalSrc;
        player.currentTime = 0;
        player.load();

        // Attempt playback with sound first
        player.muted = false;
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Succeeded with audio
            removeOverlays();
          }).catch((err) => {
            console.warn('Unmuted autoplay restricted by browser policy; trying muted playback:', err);
            // Fall back to muted playback so user sees the video moving immediately
            player.muted = true;
            player.play().then(() => {
              // Video is actively playing muted -> display floating unmute button
              showUnmuteBadge();
            }).catch((err2) => {
              console.warn('Muted playback also blocked:', err2);
              // Video couldn't start automatically -> display central Play button
              showPlayOverlay();
            });
          });
        }

        // Tap player wrapper to unmute or remove badge
        const handlePlayerClick = (e) => {
          if (e.target.closest('.video-unmute-badge') || e.target.closest('.video-center-play-overlay')) return;
          if (player.muted && unmuteBadge) {
            player.muted = false;
            removeOverlays();
          }
        };
        wrapper.removeEventListener('click', handlePlayerClick);
        wrapper.addEventListener('click', handlePlayerClick);

        // Remove unmute badge automatically if user unmutes via native controls
        const handleVolumeChange = () => {
          if (!player.muted && unmuteBadge) {
            removeOverlays();
          }
        };
        player.removeEventListener('volumechange', handleVolumeChange);
        player.addEventListener('volumechange', handleVolumeChange);
      }

      // 5. Open Modal Display
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      removeOverlays();
      if (player) {
        player.pause();
        player.currentTime = 0;
        while (player.firstChild) {
          player.removeChild(player.firstChild);
        }
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
