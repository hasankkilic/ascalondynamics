import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderValueProp } from './components/value-prop.js';
import { renderIntro } from './components/intro.js';
import { renderSolutions } from './components/solutions.js';
import { renderProductPillars } from './components/product-pillars.js';
import { renderFeaturedUmay } from './components/featured-umay.js';
import { renderCapabilities } from './components/capabilities.js';
import { renderEvidence } from './components/evidence.js';
import { renderVision } from './components/vision.js';
import { renderFinalCta } from './components/final-cta.js';
import { initScrollReveal } from './utils/reveal.js';
import { initI18n } from './i18n.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderValueProp(document.getElementById('value-prop-root'));
renderIntro(document.getElementById('intro-root'));
renderSolutions(document.getElementById('solutions-root'));
renderProductPillars(document.getElementById('product-pillars-root'));
renderFeaturedUmay(document.getElementById('featured-umay-root'));
renderCapabilities(document.getElementById('capabilities-root'));
renderEvidence(document.getElementById('evidence-root'));
renderVision(document.getElementById('vision-root'));
renderFinalCta(document.getElementById('final-cta-root'));

initI18n();
initScrollReveal(document);

document.querySelectorAll('.hero-video').forEach((video) => {
  video.playbackRate = 1.5;
});
