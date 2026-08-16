import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { initScrollReveal } from '../utils/reveal.js';
import { initI18n } from '../i18n.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
initI18n();
initScrollReveal(document);

/**
 * UMAY canlı kayıt kartları — imleç ile hafif 3B eğim, ekrana girince
 * oynat / çıkınca durdur, ve genişlet düğmesiyle tam ekran (sesli) izleme.
 */
const liveCards = [...document.querySelectorAll('[data-live-card]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

liveCards.forEach((card) => {
  const frame = card.querySelector('[data-live-frame]');
  const video = card.querySelector('[data-live-video]');
  const expandBtn = card.querySelector('[data-live-expand]');
  if (!frame || !video) return;

  if (!reduceMotion) {
    frame.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = frame.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--rx', `${px * 6}deg`);
      card.style.setProperty('--ry', `${py * -6}deg`);
    });

    frame.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }

  function syncFullscreenState() {
    const isFullscreen = document.fullscreenElement === card || document.webkitFullscreenElement === card;
    video.muted = !isFullscreen;
    video.controls = isFullscreen;
  }

  function toggleFullscreen() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFullscreen) {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
      return;
    }
    const request = card.requestFullscreen || card.webkitRequestFullscreen;
    request?.call(card);
  }

  expandBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFullscreen();
  });
  frame.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', syncFullscreenState);
  document.addEventListener('webkitfullscreenchange', syncFullscreenState);
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.2 }
  );
  liveCards.forEach((card) => {
    const video = card.querySelector('[data-live-video]');
    if (video) videoObserver.observe(video);
  });
}
