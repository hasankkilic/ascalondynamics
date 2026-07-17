import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderAiSoftwarePage } from '../components/ai-software-page.js';
import { initScrollReveal } from '../utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderAiSoftwarePage(document.getElementById('ai-software-page-root'));

initScrollReveal(document);
