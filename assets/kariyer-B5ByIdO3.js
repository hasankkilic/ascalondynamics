import{t as a,c as t,r as o,a as d,b as c,i as m}from"./reveal-CflYcNCV.js";const l=[{id:"gomulu-yazilim",title:"Gömülü Yazılım Mühendisi",titleEn:"Embedded Software Engineer",location:"Ankara",type:"Tam Zamanlı",typeEn:"Full-Time",summary:"UAV ve AR-HUD sistemlerinin gerçek zamanlı gömülü yazılımlarını geliştirir.",summaryEn:"Develops the real-time embedded software of UAV and AR-HUD systems.",description:"ASCALON HMD ve insansız araç platformlarımızın düşük gecikmeli, gerçek zamanlı gömülü yazılım katmanında çalışacaksınız. Sensör füzyonu, haberleşme protokolleri ve donanım sürücüleri üzerinde uçtan uca sorumluluk alacaksınız.",descriptionEn:"You will work on the low-latency, real-time embedded software layer of the ASCALON HMD and our unmanned vehicle platforms, taking end-to-end responsibility for sensor fusion, communication protocols and hardware drivers.",requirements:["C/C++ ile ileri düzeyde gömülü sistem deneyimi","RTOS (FreeRTOS, Zephyr vb.) bilgisi","Donanım-yazılım entegrasyonu ve seri haberleşme protokolleri deneyimi"],requirementsEn:["Advanced embedded systems experience with C/C++","Knowledge of RTOS (FreeRTOS, Zephyr, etc.)","Experience with hardware-software integration and serial communication protocols"]},{id:"bilgisayarli-goru",title:"Bilgisayarlı Görü / Yapay Zeka Mühendisi",titleEn:"Computer Vision / AI Engineer",location:"Ankara",type:"Tam Zamanlı",typeEn:"Full-Time",summary:"Çok-spektrumlu sensör verisinden nesne tespiti ve hedef takibi algoritmaları geliştirir.",summaryEn:"Develops object detection and target tracking algorithms from multi-spectral sensor data.",description:"Termal, optik ve UAV sensör beslemelerini gerçek zamanlı işleyen tespit, sınıflandırma ve takip modelleri üzerinde çalışacaksınız. Modellerin gömülü donanımda düşük gecikmeyle çalışmasını sağlamak da ekibin sorumluluğunda.",descriptionEn:"You will work on detection, classification and tracking models that process thermal, optical and UAV sensor feeds in real time. Making these models run with low latency on embedded hardware is also part of the team’s responsibility.",requirements:["Python ve C++ ile üretim seviyesinde deneyim","OpenCV ve derin öğrenme çerçeveleri (PyTorch/TensorFlow)","Gerçek zamanlı görüntü işleme ve model optimizasyonu deneyimi"],requirementsEn:["Production-level experience with Python and C++","OpenCV and deep learning frameworks (PyTorch/TensorFlow)","Experience with real-time image processing and model optimization"]},{id:"havacilik-sistemleri",title:"Havacılık Sistemleri Mühendisi (VTOL/UAV)",titleEn:"Aerospace Systems Engineer (VTOL/UAV)",location:"Ankara",type:"Tam Zamanlı",typeEn:"Full-Time",summary:"VTOL ve sabit kanat insansız hava araçlarının aerodinamik ve yapısal tasarımını yürütür.",summaryEn:"Leads the aerodynamic and structural design of VTOL and fixed-wing unmanned aerial vehicles.",description:"Filo genelindeki insansız hava araçlarının konsept tasarımından uçuş testine kadar tüm aşamalarında yer alacaksınız. Aerodinamik performans, yapısal dayanım ve uçuş kontrol entegrasyonu ortak sorumluluk alanları.",descriptionEn:"You will take part in every stage of our fleet-wide unmanned aerial vehicles, from concept design to flight testing. Aerodynamic performance, structural integrity and flight control integration are shared areas of responsibility.",requirements:["Havacılık, Uzay veya Makine Mühendisliği lisans/yüksek lisans","CAD ve yapısal/aerodinamik analiz araçlarında deneyim","Uçuş testi veya prototipleme deneyimi tercih sebebidir"],requirementsEn:["BSc/MSc in Aeronautical, Aerospace or Mechanical Engineering","Experience with CAD and structural/aerodynamic analysis tools","Flight test or prototyping experience is a plus"]},{id:"donanim-elektronik",title:"Donanım / Elektronik Tasarım Mühendisi",titleEn:"Hardware / Electronics Design Engineer",location:"Ankara",type:"Tam Zamanlı",typeEn:"Full-Time",summary:"Kask üstü AR-HUD donanımı ve sensör entegrasyon kartlarının tasarımından sorumlu olur.",summaryEn:"Responsible for the design of helmet-mounted AR-HUD hardware and sensor integration boards.",description:"ASCALON HMD kaskının elektronik donanımı, sensör entegrasyon kartları ve güç yönetim sistemleri üzerinde çalışacaksınız. Şema tasarımından prototip doğrulamaya kadar sürecin içinde olacaksınız.",descriptionEn:"You will work on the electronic hardware of the ASCALON HMD helmet, sensor integration boards and power management systems — from schematic design to prototype validation.",requirements:["PCB tasarımı ve gömülü elektronik deneyimi","Sensör entegrasyonu (IMU, termal, optik) deneyimi","Düşük güç tüketimli donanım tasarımı bilgisi"],requirementsEn:["PCB design and embedded electronics experience","Sensor integration (IMU, thermal, optical) experience","Knowledge of low-power hardware design"]}];function p(n){n.innerHTML=`
    <section class="jobs-panel reveal" id="jobs-panel" aria-labelledby="jobs-panel-title">
      <div class="jobs-panel-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          ${a("AÇIK POZİSYONLAR","OPEN POSITIONS")}
        </div>
        <h2 class="jobs-panel-title" id="jobs-panel-title">${a("Kariyer","Careers")}</h2>
        <p class="jobs-panel-lead">${a("Sahadaki ihtiyacı gerçek çözüme dönüştüren ekibe katıl.","Join the team that turns field needs into real solutions.")}</p>

        <div class="jobs-list">
          ${l.map((e,r)=>`
            <article class="job-card" data-job-card>
              <button class="job-card-head" data-job-toggle aria-expanded="false" aria-controls="job-body-${e.id}">
                <span class="job-card-index">0${r+1}</span>
                <span class="job-card-heading">
                  <span class="job-card-title">${t?e.titleEn:e.title}</span>
                  <span class="job-card-meta">${e.location} · ${t?e.typeEn:e.type}</span>
                </span>
                <span class="job-card-chevron" aria-hidden="true">+</span>
              </button>

              <div class="job-card-summary">${t?e.summaryEn:e.summary}</div>

              <div class="job-card-body" id="job-body-${e.id}" data-job-body>
                <div class="job-card-body-inner">
                  <p class="job-card-desc">${t?e.descriptionEn:e.description}</p>
                  <div class="job-card-reqs">
                    <span class="uav-detail-label">${a("Aranan Nitelikler","Qualifications")}</span>
                    <ul>
                      ${(t?e.requirementsEn:e.requirements).map(i=>`<li>${i}</li>`).join("")}
                    </ul>
                  </div>
                  <button class="job-apply-btn" type="button" data-job-apply="${e.id}" data-job-title="${t?e.titleEn:e.title}">
                    ${a("Bu Pozisyona Başvur","Apply for This Position")} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `,u(n)}function u(n){n.querySelectorAll("[data-job-toggle]").forEach(e=>{e.addEventListener("click",()=>{const i=e.closest("[data-job-card]").classList.toggle("is-open");e.setAttribute("aria-expanded",String(i))})}),n.querySelectorAll("[data-job-apply]").forEach(e=>{e.addEventListener("click",()=>{var i,s;const r=document.querySelector("[data-cv-position]");r&&(r.value=e.dataset.jobTitle),(i=document.getElementById("cv-form-panel"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}),(s=document.querySelector("[data-cv-name]"))==null||s.focus({preventScroll:!0})})})}function y(n){n.innerHTML=`
    <section class="cv-panel reveal" id="cv-form-panel" aria-labelledby="cv-panel-title">
      <div class="cv-panel-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          ${a("BAŞVURU","APPLICATION")}
        </div>
        <h2 class="cv-panel-title" id="cv-panel-title">${a("CV Gönder","Submit CV")}</h2>
        <p class="cv-panel-lead">${a("Uygun bir pozisyon görmesen de CV'ni bırakabilirsin, uygun bir açık olduğunda seninle iletişime geçeriz.","Even if you don't see a suitable position, you can still leave your CV — we'll reach out when a matching opening comes up.")}</p>

        <form class="cv-form" id="cv-form" novalidate>
          <div class="cv-form-grid">
            <div class="contact-field">
              <label class="contact-label" for="cv-name">${a("Ad Soyad","Full Name")}</label>
              <input class="contact-input" type="text" id="cv-name" name="name" required autocomplete="name" data-cv-name />
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-email">${a("E-posta","Email")}</label>
              <input class="contact-input" type="email" id="cv-email" name="email" required autocomplete="email" />
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-position">${a("Pozisyon","Position")}</label>
              <select class="contact-input" id="cv-position" name="position" data-cv-position>
                ${l.map(e=>`<option value="${t?e.titleEn:e.title}">${t?e.titleEn:e.title}</option>`).join("")}
                <option value="${a("Genel Başvuru","General Application")}">${a("Genel Başvuru","General Application")}</option>
              </select>
            </div>

            <div class="contact-field">
              <label class="contact-label" for="cv-file">CV (PDF)</label>
              <input class="contact-input cv-file-input" type="file" id="cv-file" name="attachment" accept=".pdf,.doc,.docx" required />
            </div>
          </div>

          <div class="contact-field">
            <label class="contact-label" for="cv-message">${a("Ön Yazı (opsiyonel)","Cover Letter (optional)")}</label>
            <textarea class="contact-input contact-textarea" id="cv-message" name="message" rows="4"></textarea>
          </div>

          <button class="contact-submit" type="submit">${a("CV Gönder","Submit CV")}</button>
          <p class="contact-status" data-cv-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `,v(n)}function v(n){const e=n.querySelector("#cv-form"),r=n.querySelector("[data-cv-status]");e&&e.addEventListener("submit",async i=>{i.preventDefault();{r.textContent=a("Form henüz bağlanmadı — web3forms.com üzerinden access key alınıp eklenmesi gerekiyor.","The form is not connected yet — an access key from web3forms.com needs to be added.");return}})}o(document.getElementById("header-root"));d(document.getElementById("footer-root"));p(document.getElementById("jobs-panel-root"));y(document.getElementById("cv-form-root"));c(document);m(document);
