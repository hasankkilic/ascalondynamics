import{r as l,a as d,i as o}from"./reveal-BGpsitOb.js";const c=[{id:"atmaca",codeName:"ATMACA",model:"VTOL",mission:"Keşif, imha operasyonlarında anlık destek.",features:["Yüksek Hız","Uzun Uçuş Süresi","Mühimmat Taşıma Kapasitesi"],image:"/images/air-vtol.jpg"},{id:"argus",codeName:"ARGUS",model:"Silahlı Drone",mission:"Anlık saldırı, kamikaze ve keşif operasyonları.",features:["Mühimmat Taşıma","Gerçek Zamanlı Görüntüleme"],image:"/images/argus.png"},{id:"sahin",codeName:"ŞAHİN",model:"Sabit Kanat",mission:"Keşif ve tespit.",features:["Detaylı Görüntüleme","Uzun Uçuş Süresi"],image:"/images/sahin.png"}];function u(r){r.innerHTML=`
    <section class="uav-panel" id="uav-panel" aria-labelledby="uav-panel-title">
      <div class="uav-panel-inner">
        <div class="eyebrow-tag reveal">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          FİLO KATALOĞU
        </div>
        <h2 class="uav-panel-title reveal" id="uav-panel-title">İNSANSIZ ARAÇLAR</h2>

        <div class="uav-list">
          ${c.map((a,e)=>`
            <article class="uav-entry reveal" data-uav-entry>
              <div class="uav-visual" data-uav-visual>
                <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
                <img class="uav-visual-img" src="${a.image}" alt="${a.codeName} — ${a.model}" loading="lazy" />
                <span class="uav-visual-sweep" data-uav-sweep aria-hidden="true"></span>
              </div>

              <div class="uav-detail">
                <div class="uav-detail-row">
                  <span class="uav-detail-label">0${e+1} / Kod Adı</span>
                  <span class="uav-detail-value uav-detail-value--code">${a.codeName}</span>
                </div>
                <div class="uav-detail-row">
                  <span class="uav-detail-label">Model</span>
                  <span class="uav-detail-value">${a.model}</span>
                </div>
                <div class="uav-detail-row">
                  <span class="uav-detail-label">Görev</span>
                  <span class="uav-detail-value">${a.mission}</span>
                </div>
                <div class="uav-detail-row uav-detail-row--features">
                  <span class="uav-detail-label">Öne Çıkan Özellikler</span>
                  <div class="uav-feature-tags">
                    ${a.features.map(s=>`<span class="uav-feature-tag">${s}</span>`).join("")}
                  </div>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>
  `,v(r)}function v(r){const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!a&&"IntersectionObserver"in window){const e=r.querySelectorAll("[data-uav-entry]"),s=new IntersectionObserver(t=>{t.forEach(i=>{if(!i.isIntersecting)return;const n=i.target.querySelector("[data-uav-sweep]");n&&n.classList.add("run"),s.unobserve(i.target)})},{threshold:.35});e.forEach(t=>s.observe(t))}a||r.querySelectorAll("[data-uav-visual]").forEach(e=>{e.addEventListener("pointermove",s=>{if(s.pointerType==="touch")return;const t=e.getBoundingClientRect(),i=(s.clientX-t.left)/t.width-.5,n=(s.clientY-t.top)/t.height-.5;e.style.setProperty("--rx",`${i*10}deg`),e.style.setProperty("--ry",`${n*-10}deg`)}),e.addEventListener("pointerleave",()=>{e.style.setProperty("--rx","0deg"),e.style.setProperty("--ry","0deg")})})}l(document.getElementById("header-root"));d(document.getElementById("footer-root"));u(document.getElementById("uav-panel-root"));o(document);
