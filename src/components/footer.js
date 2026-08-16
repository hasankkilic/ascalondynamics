import { navLinks } from '../data/nav-links.js';

const legalLinks = [
  { label: 'Gizlilik Politikası', href: '#' },
  { label: 'Çerez Politikası', href: '#' },
  { label: 'Kullanım Koşulları', href: '#' },
  { label: 'KVKK Aydınlatma Metni', href: '#' },
];

/**
 * Site genelinde tekrar kullanılabilir footer component'i.
 * Diğer sayfalar oluşturulduğunda aynı fonksiyon import edilip
 * bir container elementine mount edilerek kullanılabilir.
 */
export function renderFooter(container) {
  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-col footer-brand">
          <a href="/" class="footer-brand-row">
            <img src="/images/brand/logo.png" alt="Ascalon Dynamics logosu" class="footer-logo" />
            <span class="footer-brand-name">ASCALON DYNAMICS</span>
          </a>
          <p class="footer-tagline">Saha için otonom teknolojiler.</p>
          <p class="footer-location">Ankara, Türkiye</p>
        </div>

        <div class="footer-col">
          <h4>Hızlı Bağlantılar</h4>
          <ul>
            ${navLinks
              .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
              .join('')}
          </ul>
        </div>

        <div class="footer-col">
          <h4>İletişim</h4>
          <ul>
            <li><a href="/iletisim.html">İletişim</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Yasal</h4>
          <ul>
            ${legalLinks
              .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
              .join('')}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <hr class="footer-divider" />
        <p>© ${new Date().getFullYear()} Ascalon Dynamics. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  `;
}
