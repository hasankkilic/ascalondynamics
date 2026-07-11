import './style.css';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderIntro } from './components/intro.js';
import { renderSolutions } from './components/solutions.js';
import { initScrollReveal } from './utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderIntro(document.getElementById('intro-root'));
renderSolutions(document.getElementById('solutions-root'));

initScrollReveal(document);
