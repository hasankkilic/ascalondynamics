import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { initScrollReveal } from '../utils/reveal.js';
import { initI18n } from '../i18n.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
initI18n();
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

/**
 * Saha senaryoları aynı oynatıcı içinde değişir. Böylece yalnızca aktif
 * videonun kaynağı yüklenir; asset yolları sayfadan bağımsız /images kökünde
 * kalır ve yerel dosya sistemine bağlı olmaz.
 */
const scenarioTabs = [...document.querySelectorAll('.umay-scenario-tab')];
const scenarioPanel = document.getElementById('umay-scenario-panel');
const scenarioVideo = scenarioPanel?.querySelector('.umay-scenario-video');
const scenarioLabel = scenarioPanel?.querySelector('[data-scenario-label]');
const scenarioTitle = scenarioPanel?.querySelector('[data-scenario-title]');
const scenarioDescription = scenarioPanel?.querySelector('[data-scenario-description]');

function activateScenario(nextTab, shouldPlay = true) {
  if (!nextTab || !scenarioPanel || !scenarioVideo) return;

  scenarioTabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  scenarioPanel.setAttribute('aria-labelledby', nextTab.id);
  scenarioLabel.textContent = nextTab.dataset.label;
  scenarioTitle.textContent = nextTab.dataset.title;
  scenarioDescription.textContent = nextTab.dataset.description;
  scenarioVideo.pause();
  scenarioVideo.src = nextTab.dataset.video;
  scenarioVideo.poster = nextTab.dataset.poster;
  scenarioVideo.setAttribute(
    'aria-label',
    `${nextTab.dataset.label}: ${nextTab.dataset.title}`
  );
  scenarioVideo.load();

  if (shouldPlay) {
    scenarioVideo.play().catch(() => {
      // Tarayıcı otomatik oynatmayı engellerse native oynatma kontrolü görünür kalır.
    });
  }
}

scenarioTabs.forEach((tab, tabIndex) => {
  tab.addEventListener('click', () => activateScenario(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = tabIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = scenarioTabs.length - 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (tabIndex - 1 + scenarioTabs.length) % scenarioTabs.length;
    } else {
      nextIndex = (tabIndex + 1) % scenarioTabs.length;
    }

    scenarioTabs[nextIndex].focus();
    activateScenario(scenarioTabs[nextIndex]);
  });
});
