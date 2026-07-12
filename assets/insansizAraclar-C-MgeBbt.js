import{t,c as r,r as o,a as u,b as c,i as p}from"./reveal-CflYcNCV.js";const m=[{id:"atmaca",codeName:"ATMACA",model:"VTOL",modelEn:"VTOL",mission:"Keşif, imha operasyonlarında anlık destek.",missionEn:"Reconnaissance and instant support in strike operations.",features:["Yüksek Hız","Uzun Uçuş Süresi","Mühimmat Taşıma Kapasitesi"],featuresEn:["High Speed","Long Endurance","Munition Payload Capacity"],image:"/images/air-vtol.jpg",status:null,statusEn:null},{id:"argus",codeName:"ARGUS",model:"Silahlı Drone",modelEn:"Armed Drone",mission:"Anlık saldırı, kamikaze ve keşif operasyonları.",missionEn:"Instant strike, kamikaze and reconnaissance operations.",features:["Mühimmat Taşıma","Gerçek Zamanlı Görüntüleme"],featuresEn:["Munition Payload","Real-Time Imaging"],image:"/images/argus.png",status:null,statusEn:null},{id:"sahin",codeName:"ŞAHİN",model:"Sabit Kanat",modelEn:"Fixed Wing",mission:"Keşif ve tespit.",missionEn:"Reconnaissance and detection.",features:["Detaylı Görüntüleme","Uzun Uçuş Süresi"],featuresEn:["Detailed Imaging","Long Endurance"],image:"/images/sahin.png",status:null,statusEn:null}];function v(i){i.innerHTML=`
    <section class="uav-panel" id="uav-panel" aria-labelledby="uav-panel-title">
      <div class="uav-panel-inner">
        <div class="eyebrow-tag reveal">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          ${t("FİLO KATALOĞU","FLEET CATALOG")}
        </div>
        <h2 class="uav-panel-title reveal" id="uav-panel-title">${t("İNSANSIZ ARAÇLAR","UNMANNED VEHICLES")}</h2>

        <div class="uav-list">
          ${m.map((e,a)=>`
            <article class="uav-entry reveal" data-uav-entry>
              <div class="uav-visual" data-uav-visual>
                <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
                <img class="uav-visual-img" src="${e.image}" alt="${e.codeName} (${r?e.modelEn:e.model})" loading="lazy" />
                <span class="uav-visual-sweep" data-uav-sweep aria-hidden="true"></span>
              </div>

              <div class="uav-detail">
                <div class="uav-detail-row">
                  <span class="uav-detail-label">0${a+1} / ${t("Kod Adı","Code Name")}</span>
                  <span class="uav-detail-value uav-detail-value--code">${e.codeName}</span>
                </div>
                ${e.status?`<div class="uav-detail-row">
                  <span class="uav-detail-label">${t("Geliştirme Durumu","Development Status")}</span>
                  <span class="uav-detail-value">${r&&e.statusEn?e.statusEn:e.status}</span>
                </div>`:""}
                <div class="uav-detail-row">
                  <span class="uav-detail-label">Model</span>
                  <span class="uav-detail-value">${r?e.modelEn:e.model}</span>
                </div>
                <div class="uav-detail-row">
                  <span class="uav-detail-label">${t("Görev","Mission")}</span>
                  <span class="uav-detail-value">${r?e.missionEn:e.mission}</span>
                </div>
                <div class="uav-detail-row uav-detail-row--features">
                  <span class="uav-detail-label">${t("Öne Çıkan Özellikler","Key Features")}</span>
                  <div class="uav-feature-tags">
                    ${(r?e.featuresEn:e.features).map(s=>`<span class="uav-feature-tag">${s}</span>`).join("")}
                  </div>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `,g(i)}function g(i){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e&&"IntersectionObserver"in window){const a=i.querySelectorAll("[data-uav-entry]"),s=new IntersectionObserver(n=>{n.forEach(l=>{if(!l.isIntersecting)return;const d=l.target.querySelector("[data-uav-sweep]");d&&d.classList.add("run"),s.unobserve(l.target)})},{threshold:.35});a.forEach(n=>s.observe(n))}e||i.querySelectorAll("[data-uav-visual]").forEach(a=>{a.addEventListener("pointermove",s=>{if(s.pointerType==="touch")return;const n=a.getBoundingClientRect(),l=(s.clientX-n.left)/n.width-.5,d=(s.clientY-n.top)/n.height-.5;a.style.setProperty("--rx",`${l*10}deg`),a.style.setProperty("--ry",`${d*-10}deg`)}),a.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}o(document.getElementById("header-root"));u(document.getElementById("footer-root"));v(document.getElementById("uav-panel-root"));c(document);p(document);
