import '../style.css';
import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderGcsPage } from '../components/gcs-page.js';
import { initScrollReveal } from '../utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderGcsPage(document.getElementById('gcs-page-root'));

initScrollReveal(document);
