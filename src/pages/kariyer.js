import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderJobListings } from '../components/job-listings.js';
import { renderCvForm } from '../components/cv-form.js';
import { initScrollReveal } from '../utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderJobListings(document.getElementById('jobs-panel-root'));
renderCvForm(document.getElementById('cv-form-root'));

initScrollReveal(document);
