import{r as s,a as r,i as o}from"./reveal-BGpsitOb.js";const l=[{id:"gomulu-yazilim",title:"Gömülü Yazılım Mühendisi",location:"Ankara",type:"Tam Zamanlı",summary:"UAV ve AR-HUD sistemlerinin gerçek zamanlı gömülü yazılımlarını geliştirir.",description:"ASCALON HMD ve insansız araç platformlarımızın düşük gecikmeli, gerçek zamanlı gömülü yazılım katmanında çalışacaksınız. Sensör füzyonu, haberleşme protokolleri ve donanım sürücüleri üzerinde uçtan uca sorumluluk alacaksınız.",requirements:["C/C++ ile ileri düzeyde gömülü sistem deneyimi","RTOS (FreeRTOS, Zephyr vb.) bilgisi","Donanım-yazılım entegrasyonu ve seri haberleşme protokolleri deneyimi"]},{id:"bilgisayarli-goru",title:"Bilgisayarlı Görü / Yapay Zeka Mühendisi",location:"Ankara",type:"Tam Zamanlı",summary:"Çok-spektrumlu sensör verisinden nesne tespiti ve hedef takibi algoritmaları geliştirir.",description:"Termal, optik ve UAV sensör beslemelerini gerçek zamanlı işleyen tespit, sınıflandırma ve takip modelleri üzerinde çalışacaksınız. Modellerin gömülü donanımda düşük gecikmeyle çalışmasını sağlamak da ekibin sorumluluğunda.",requirements:["Python ve C++ ile üretim seviyesinde deneyim","OpenCV ve derin öğrenme çerçeveleri (PyTorch/TensorFlow)","Gerçek zamanlı görüntü işleme ve model optimizasyonu deneyimi"]},{id:"havacilik-sistemleri",title:"Havacılık Sistemleri Mühendisi (VTOL/UAV)",location:"Ankara",type:"Tam Zamanlı",summary:"VTOL ve sabit kanat insansız hava araçlarının aerodinamik ve yapısal tasarımını yürütür.",description:"Filo genelindeki insansız hava araçlarının konsept tasarımından uçuş testine kadar tüm aşamalarında yer alacaksınız. Aerodinamik performans, yapısal dayanım ve uçuş kontrol entegrasyonu ortak sorumluluk alanları.",requirements:["Havacılık, Uzay veya Makine Mühendisliği lisans/yüksek lisans","CAD ve yapısal/aerodinamik analiz araçlarında deneyim","Uçuş testi veya prototipleme deneyimi tercih sebebidir"]},{id:"donanim-elektronik",title:"Donanım / Elektronik Tasarım Mühendisi",location:"Ankara",type:"Tam Zamanlı",summary:"Kask üstü AR-HUD donanımı ve sensör entegrasyon kartlarının tasarımından sorumlu olur.",description:"ASCALON HMD kaskının elektronik donanımı, sensör entegrasyon kartları ve güç yönetim sistemleri üzerinde çalışacaksınız. Şema tasarımından prototip doğrulamaya kadar sürecin içinde olacaksınız.",requirements:["PCB tasarımı ve gömülü elektronik deneyimi","Sensör entegrasyonu (IMU, termal, optik) deneyimi","Düşük güç tüketimli donanım tasarımı bilgisi"]}];function d(a){a.innerHTML=`
    <section class="jobs-panel reveal" id="jobs-panel" aria-labelledby="jobs-panel-title">
      <div class="jobs-panel-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          AÇIK POZİSYONLAR
        </div>
        <h2 class="jobs-panel-title" id="jobs-panel-title">Kariyer</h2>
        <p class="jobs-panel-lead">Sahadaki ihtiyacı gerçek çözüme dönüştüren ekibe katıl.</p>

        <div class="jobs-list">
          ${l.map((e,n)=>`
            <article class="job-card" data-job-card>
              <button class="job-card-head" data-job-toggle aria-expanded="false" aria-controls="job-body-${e.id}">
                <span class="job-card-index">0${n+1}</span>
                <span class="job-card-heading">
                  <span class="job-card-title">${e.title}</span>
                  <span class="job-card-meta">${e.location} · ${e.type}</span>
                </span>
                <span class="job-card-chevron" aria-hidden="true">+</span>
              </button>

              <div class="job-card-summary">${e.summary}</div>

              <div class="job-card-body" id="job-body-${e.id}" data-job-body>
                <div class="job-card-body-inner">
                  <p class="job-card-desc">${e.description}</p>
                  <div class="job-card-reqs">
                    <span class="uav-detail-label">Aranan Nitelikler</span>
                    <ul>
                      ${e.requirements.map(i=>`<li>${i}</li>`).join("")}
                    </ul>
                  </div>
                  <button class="job-apply-btn" type="button" data-job-apply="${e.id}" data-job-title="${e.title}">
                    Bu Pozisyona Başvur <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `,c(a)}function c(a){a.querySelectorAll("[data-job-toggle]").forEach(e=>{e.addEventListener("click",()=>{const i=e.closest("[data-job-card]").classList.toggle("is-open");e.setAttribute("aria-expanded",String(i))})}),a.querySelectorAll("[data-job-apply]").forEach(e=>{e.addEventListener("click",()=>{var i,t;const n=document.querySelector("[data-cv-position]");n&&(n.value=e.dataset.jobTitle),(i=document.getElementById("cv-form-panel"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}),(t=document.querySelector("[data-cv-name]"))==null||t.focus({preventScroll:!0})})})}function m(a){a.innerHTML=`
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
                ${l.map(e=>`<option value="${e.title}">${e.title}</option>`).join("")}
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
  `,p(a)}function p(a){const e=a.querySelector("#cv-form"),n=a.querySelector("[data-cv-status]");e&&e.addEventListener("submit",async i=>{i.preventDefault();{n.textContent="Form henüz bağlanmadı — web3forms.com üzerinden access key alınıp eklenmesi gerekiyor.";return}})}s(document.getElementById("header-root"));r(document.getElementById("footer-root"));d(document.getElementById("jobs-panel-root"));m(document.getElementById("cv-form-root"));o(document);
