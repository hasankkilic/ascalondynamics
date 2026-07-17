import '../style.css';
import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderVehiclePanel } from '../components/vehicle-panel.js';
import { initScrollReveal } from '../utils/reveal.js';

renderHeader(document.getElementById('header-root'));
renderFooter(document.getElementById('footer-root'));
renderVehiclePanel(document.getElementById('uav-panel-root'));

initScrollReveal(document);
