import{r,a as u,i as m}from"./reveal-BGpsitOb.js";const e="hasankilic@ascalondynamics.com";function p(a){a.innerHTML=`
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
              <a class="contact-link" href="mailto:${e}">${e}</a>
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
          <p class="contact-note">Gönder'e bastığınızda kendi mail uygulamanız açılır, mesajınız ${e} adresine önceden doldurulmuş halde gelir.</p>
          <p class="contact-status" data-contact-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `,v(a)}function v(a){const t=a.querySelector("#contact-form"),s=a.querySelector("[data-contact-status]");t&&t.addEventListener("submit",c=>{c.preventDefault();const n=t.name.value.trim(),l=t.message.value.trim();if(!n||!l){s.textContent="Lütfen ad soyad ve mesaj alanlarını doldurun.";return}const o=`Web Sitesi İletişim Formu — ${n}`,i=`${l}

—
${n}`,d=`mailto:${e}?subject=${encodeURIComponent(o)}&body=${encodeURIComponent(i)}`;window.location.href=d,s.textContent="Mail uygulamanız açılıyor…"})}r(document.getElementById("header-root"));u(document.getElementById("footer-root"));p(document.getElementById("contact-panel-root"));m(document);
