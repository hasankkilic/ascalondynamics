import { navLinks } from '../data/nav-links.js';

function navItemsHtml(className) {
  return navLinks
    .map(
      (item) =>
        `<li><a class="${className}" href="${item.href}">${item.label}</a></li>`
    )
    .join('');
}

/**
 * Site genelinde tekrar kullanılabilir header component'i.
 * Verilen container elementinin içine markup basar ve
 * mobil hamburger menü davranışını bağlar.
 */
export function renderHeader(container) {
  container.innerHTML = `
    <header class="site-header">
      <a href="/" class="brand">
        <img src="/images/logo.png" alt="Ascalon Dynamics logosu" class="brand-logo" />
        <span class="brand-name">ASCALON DYNAMICS</span>
      </a>

      <nav class="nav-desktop" aria-label="Ana menü">
        <ul>${navItemsHtml('nav-link')}</ul>
      </nav>

      <button class="hamburger" type="button" aria-label="Menüyü aç" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <div class="mobile-menu" id="mobile-menu">
      <nav aria-label="Mobil menü">
        <ul>${navItemsHtml('mobile-nav-link')}</ul>
      </nav>
    </div>
  `;

  const hamburger = container.querySelector('.hamburger');
  const mobileMenu = container.querySelector('#mobile-menu');

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  }

  hamburger.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}
