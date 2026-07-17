const CONTACT_EMAIL = 'hasankilic@ascalondynamics.com';

/**
 * İletişim sayfası — solda iletişim bilgileri, sağda form.
 * Site statik olduğu için (backend yok) form gönderimi mailto: ile
 * çözülür: "Gönder"e basınca ziyaretçinin kendi mail uygulaması
 * hasankilic@ascalondynamics.com adresine önceden doldurulmuş halde açılır.
 */
export function renderContactPanel(container) {
  container.innerHTML = `
    <section class="contact-panel reveal" id="contact-panel" aria-labelledby="contact-panel-title">
      <div class="contact-panel-inner">
        <div class="contact-info">
          <div class="eyebrow-tag">
            <span class="eyebrow-tag-dot" aria-hidden="true"></span>
            İLETİŞİM
          </div>
          <h2 class="contact-info-title" id="contact-panel-title">İletişim bilgileri</h2>
          <p class="contact-info-lead">Size nasıl yardımcı olabiliriz?</p>

          <div class="uav-detail-row">
            <span class="uav-detail-label">Adres</span>
            <span class="uav-detail-value">Beytepe Kampüsü,<br />Çankaya / Ankara, Türkiye</span>
          </div>
          <div class="uav-detail-row">
            <span class="uav-detail-label">Telefon</span>
            <span class="uav-detail-value">
              <a class="contact-link" href="tel:+905387439730">+90 538 743 97 30</a>
            </span>
          </div>
          <div class="uav-detail-row">
            <span class="uav-detail-label">E-posta</span>
            <span class="uav-detail-value">
              <a class="contact-link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
            </span>
          </div>
        </div>

        <form class="contact-form" id="contact-form" novalidate>
          <div class="contact-field">
            <label class="contact-label" for="cf-name">Ad Soyad</label>
            <input class="contact-input" type="text" id="cf-name" name="name" required autocomplete="name" />
          </div>

          <div class="contact-field">
            <label class="contact-label" for="cf-message">Mesajınız</label>
            <textarea class="contact-input contact-textarea" id="cf-message" name="message" rows="6" required></textarea>
          </div>

          <button class="contact-submit" type="submit">Gönder</button>
          <p class="contact-note">Gönder'e bastığınızda kendi mail uygulamanız açılır, mesajınız ${CONTACT_EMAIL} adresine önceden doldurulmuş halde gelir.</p>
          <p class="contact-status" data-contact-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  initContactForm(container);
}

function initContactForm(container) {
  const form = container.querySelector('#contact-form');
  const status = container.querySelector('[data-contact-status]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
      status.textContent = 'Lütfen ad soyad ve mesaj alanlarını doldurun.';
      return;
    }

    const subject = `Web Sitesi İletişim Formu: ${name}`;
    const body = `${message}\n\n${name}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    status.textContent = 'Mail uygulamanız açılıyor…';
  });
}
