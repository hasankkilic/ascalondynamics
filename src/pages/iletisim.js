import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderContactPanel } from '../components/contact-panel.js';
import { initScrollReveal } from '../utils/reveal.js';
import { initI18n } from '../i18n.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderContactPanel(document.getElementById('contact-panel-root'));

initI18n();
initScrollReveal(document);
