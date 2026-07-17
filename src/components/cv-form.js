import { jobs } from '../data/jobs.js';

// TODO: web3forms.com'dan alınan gerçek access key ile değiştirilmeli.
// Kurulum: https://web3forms.com adresine hasankilic@ascalondynamics.com ile
// girilir, saniyeler içinde bir access key gelir (hesap açmaya gerek yok).
// Gelen key'i aşağıya yapıştırmak yeterli — form o andan itibaren CV'yi
// gerçek bir mail eki olarak hasankilic@ascalondynamics.com adresine yollar.
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

export function renderCvForm(container) {
  container.innerHTML = `
    <section class="cv-panel reveal" id="cv-form-panel" aria-labelledby="cv-panel-title">
      <div class="cv-panel-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          BAŞVURU
        </div>
        <h2 class="cv-panel-title" id="cv-panel-title">CV Gönder</h2>
        <p class="cv-panel-lead">Uygun bir pozisyon görmesen de CV'ni bırakabilirsin, uygun bir açık olduğunda seninle iletişime geçeriz.</p>

        <form class="cv-form" id="cv-form" novalidate>
          <div class="cv-form-grid">
            <div class="contact-field">
              <label class="contact-label" for="cv-name">Ad Soyad</label>
              <input class="contact-input" type="text" id="cv-name" name="name" required autocomplete="name" data-cv-name />
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-email">E-posta</label>
              <input class="contact-input" type="email" id="cv-email" name="email" required autocomplete="email" />
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-position">Pozisyon</label>
              <select class="contact-input" id="cv-position" name="position" data-cv-position>
                ${jobs.map((j) => `<option value="${j.title}">${j.title}</option>`).join('')}
                <option value="Genel Başvuru">Genel Başvuru</option>
              </select>
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-file">CV (PDF)</label>
              <input class="contact-input cv-file-input" type="file" id="cv-file" name="attachment" accept=".pdf,.doc,.docx" required />
            </div>
          </div>

          <div class="contact-field">
            <label class="contact-label" for="cv-message">Ön Yazı (opsiyonel)</label>
            <textarea class="contact-input contact-textarea" id="cv-message" name="message" rows="4"></textarea>
          </div>

          <button class="contact-submit" type="submit">CV Gönder</button>
          <p class="contact-status" data-cv-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  initCvForm(container);
}

function initCvForm(container) {
  const form = container.querySelector('#cv-form');
  const status = container.querySelector('[data-cv-status]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (WEB3FORMS_ACCESS_KEY === 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
      status.textContent = 'Form henüz bağlanmadı, web3forms.com üzerinden access key alınıp eklenmesi gerekiyor.';
      return;
    }

    const submitBtn = form.querySelector('.contact-submit');
    submitBtn.disabled = true;
    status.textContent = 'Gönderiliyor…';

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `Kariyer Başvurusu: ${formData.get('position')}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        status.textContent = 'Başvurunuz alındı, teşekkürler!';
        form.reset();
      } else {
        status.textContent = 'Gönderilemedi, lütfen tekrar deneyin.';
      }
    } catch {
      status.textContent = 'Bağlantı hatası, lütfen tekrar deneyin.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
