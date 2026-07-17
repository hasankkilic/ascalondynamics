import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { initScrollReveal } from '../utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
initScrollReveal(document);

/**
 * Tanıtım videosuna (showcase) tıklayınca tam ekran açılır/kapanır.
 * Tam ekrandayken ses açılır ve native video kontrolleri görünür;
 * çıkınca sessiz/kontrolsüz haline geri döner.
 */
const showcaseVideo = document.querySelector('.umay-showcase-video');
if (showcaseVideo) {
  showcaseVideo.addEventListener('click', () => {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFullscreen) {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
      return;
    }
    const request =
      showcaseVideo.requestFullscreen ||
      showcaseVideo.webkitRequestFullscreen ||
      showcaseVideo.webkitEnterFullscreen;
    request?.call(showcaseVideo);
  });

  function syncFullscreenState() {
    const isFullscreen =
      document.fullscreenElement === showcaseVideo || document.webkitFullscreenElement === showcaseVideo;
    showcaseVideo.muted = !isFullscreen;
    showcaseVideo.controls = isFullscreen;
  }

  document.addEventListener('fullscreenchange', syncFullscreenState);
  document.addEventListener('webkitfullscreenchange', syncFullscreenState);
}
