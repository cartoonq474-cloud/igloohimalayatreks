// Hero Section Multi-Video Background Crossfade Controller (Optimized for Web Performance)
// Intelligently respects mobile devices, Data-Saver, and prevents initial network congestion

(function () {
  function initHeroVideo() {
    // 1. Performance Gate: Never download heavy video backgrounds on mobile screens or when Save-Data is enabled
    const isMobile = window.innerWidth < 768;
    const isSaveData = navigator.connection && (navigator.connection.saveData === true || navigator.connection.effectiveType === '2g');
    if (isMobile || isSaveData) {
      // Keep static poster image for ultra-fast LCP & zero unnecessary cellular data usage
      return;
    }

    const video1 = document.getElementById('hero-bg-video-1');
    const video2 = document.getElementById('hero-bg-video-2');

    if (!video1 || !video2) return;

    const playlist = [
      'video/Clip%20Video%20First.mp4',
      'video/Clip%20Video%20Second.mp4',
      'video/Clip%20Video%20Third.mp4',
      'video/Clip%20Video%20Fourth.mp4',
      'video/Clip%20Video%20Fifth.mp4'
    ];

    let currentIndex = 0;
    let activeVideo = video1;
    let nextVideo = video2;
    let isTransitioning = false;
    let transitionLockTimer = null;
    let standbyPreloaded = false;
    const CROSSFADE_SEC = 1.2;

    // Initialize attributes for reliable autoplay without audio
    [video1, video2].forEach(v => {
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.autoplay = true;
    });

    function safePlay(video) {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser policy blocks autoplay, resume on first user interaction
          const resume = () => {
            if (activeVideo.paused) activeVideo.play();
            document.removeEventListener('click', resume);
            document.removeEventListener('touchstart', resume);
          };
          document.addEventListener('click', resume, { once: true });
          document.addEventListener('touchstart', resume, { once: true });
        });
      }
    }

    // Set initial source ONLY for primary video slot
    video1.src = playlist[0];
    video1.classList.add('active');
    video2.classList.remove('active');
    safePlay(video1);

    // Function to preload standby slot only when primary is already playing
    function preloadStandbySlot() {
      if (standbyPreloaded) return;
      standbyPreloaded = true;
      const nextIdx = (currentIndex + 1) % playlist.length;
      nextVideo.src = playlist[nextIdx];
      nextVideo.load();
    }

    function transitionToNext() {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex = (currentIndex + 1) % playlist.length;
      const upcomingVideo = nextVideo;
      const outgoingVideo = activeVideo;

      // Start playing the incoming video
      safePlay(upcomingVideo);

      // Perform visual crossfade
      upcomingVideo.classList.add('active');
      outgoingVideo.classList.remove('active');

      // Swap active and next references
      activeVideo = upcomingVideo;
      nextVideo = outgoingVideo;
      standbyPreloaded = false;

      // Reset transition lock after crossfade completes
      clearTimeout(transitionLockTimer);
      transitionLockTimer = setTimeout(() => {
        try {
          outgoingVideo.pause();
          outgoingVideo.currentTime = 0;
        } catch (e) {}

        isTransitioning = false;
      }, (CROSSFADE_SEC * 1000) + 150);
    }

    function handleTimeUpdate(e) {
      const v = e.target;
      if (v !== activeVideo || isTransitioning) return;

      // Preload next standby clip when current video reaches halfway mark
      if (v.duration && v.currentTime > v.duration * 0.5 && !standbyPreloaded) {
        preloadStandbySlot();
      }

      // Transition when approaching end of clip
      if (v.duration && v.duration > 0 && (v.duration - v.currentTime <= CROSSFADE_SEC)) {
        transitionToNext();
      }
    }

    function handleEnded(e) {
      if (e.target === activeVideo) {
        transitionToNext();
      }
    }

    // Attach listeners
    [video1, video2].forEach(v => {
      v.addEventListener('timeupdate', handleTimeUpdate);
      v.addEventListener('ended', handleEnded);
      v.addEventListener('error', (e) => {
        console.warn('Video slot warning, transitioning:', e);
        if (v === activeVideo) {
          setTimeout(transitionToNext, 500);
        }
      });
    });

    // Failsafe Watchdog: checks every 2 seconds
    let lastTime = 0;
    let stallCount = 0;
    setInterval(() => {
      if (!activeVideo || isTransitioning) return;

      if (activeVideo.paused && !document.hidden) {
        safePlay(activeVideo);
      }

      if (activeVideo.duration && activeVideo.duration > 0) {
        if (activeVideo.currentTime >= activeVideo.duration - 0.5) {
          transitionToNext();
          return;
        }
      }

      if (Math.abs(activeVideo.currentTime - lastTime) < 0.1 && !activeVideo.paused) {
        stallCount++;
        if (stallCount >= 4) {
          stallCount = 0;
          transitionToNext();
        }
      } else {
        stallCount = 0;
      }
      lastTime = activeVideo.currentTime;
    }, 2000);
  }

  // Defer initialization until page window load or idle time
  if (document.readyState === 'complete') {
    initHeroVideo();
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(initHeroVideo, { timeout: 2000 });
      } else {
        setTimeout(initHeroVideo, 500);
      }
    });
  }
})();
