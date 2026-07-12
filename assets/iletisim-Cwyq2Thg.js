import{t as a,r as m,a as u,b as p,i as v}from"./reveal-CflYcNCV.js";const t="hasankilic@ascalondynamics.com";function f(e){e.innerHTML=`
    <section class="contact-panel reveal" id="contact-panel" aria-labelledby="contact-panel-title">
      <div class="contact-panel-inner">
        <div class="contact-info">
          <div class="eyebrow-tag">
            <span class="eyebrow-tag-dot" aria-hidden="true"></span>
            ${a("İLETİŞİM","CONTACT")}
          </div>
          <h2 class="contact-info-title" id="contact-panel-title">${a("İletişim bilgileri","Contact details")}</h2>
          <p class="contact-info-lead">${a("Size nasıl yardımcı olabiliriz?","How can we help you?")}</p>

          <div class="uav-detail-row">
            <span class="uav-detail-label">${a("Adres","Address")}</span>
            <span class="uav-detail-value">${a("Beytepe Kampüsü,<br />Çankaya / Ankara, Türkiye","Beytepe Campus,<br />Çankaya / Ankara, Türkiye")}</span>
          </div>
          <div class="uav-detail-row">
            <span class="uav-detail-label">${a("Telefon","Phone")}</span>
            <span class="uav-detail-value">
              <a class="contact-link" href="tel:+905387439730">+90 538 743 97 30</a>
            </span>
          </div>
          <div class="uav-detail-row">
            <span class="uav-detail-label">${a("E-posta","Email")}</span>
            <span class="uav-detail-value">
              <a class="contact-link" href="mailto:${t}">${t}</a>
            </span>
          </div>
        </div>

        <form class="contact-form" id="contact-form" novalidate>
          <div class="contact-field">
            <label class="contact-label" for="cf-name">${a("Ad Soyad","Full Name")}</label>
            <input class="contact-input" type="text" id="cf-name" name="name" required autocomplete="name" />
          </div>

          <div class="contact-field">
            <label class="contact-label" for="cf-message">${a("Mesajınız","Your Message")}</label>
            <textarea class="contact-input contact-textarea" id="cf-message" name="message" rows="6" required></textarea>
          </div>

          <button class="contact-submit" type="submit">${a("Gönder","Send")}</button>
          <p class="contact-note">${a(`Gönder'e bastığınızda kendi mail uygulamanız açılır, mesajınız ${t} adresine önceden doldurulmuş halde gelir.`,`When you press Send, your own mail app opens with the message pre-filled and addressed to ${t}.`)}</p>
          <p class="contact-status" data-contact-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `,b(e)}function b(e){const n=e.querySelector("#contact-form"),l=e.querySelector("[data-contact-status]");n&&n.addEventListener("submit",c=>{c.preventDefault();const s=n.name.value.trim(),o=n.message.value.trim();if(!s||!o){l.textContent=a("Lütfen ad soyad ve mesaj alanlarını doldurun.","Please fill in the name and message fields.");return}const i=a(`Web Sitesi İletişim Formu: ${s}`,`Website Contact Form: ${s}`),d=`${o}

${s}`,r=`mailto:${t}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(d)}`;window.location.href=r,l.textContent=a("Mail uygulamanız açılıyor…","Opening your mail app…")})}m(document.getElementById("header-root"));u(document.getElementById("footer-root"));f(document.getElementById("contact-panel-root"));p(document);v(document);
