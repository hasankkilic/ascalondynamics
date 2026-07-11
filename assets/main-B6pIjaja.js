import{r as o,a as c,i as l}from"./reveal-BGpsitOb.js";function u(e){e.innerHTML=`
    <section class="intro reveal" id="intro" aria-labelledby="intro-title">
      <div class="intro-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          SAHA RAPORU — CANLI VERİ AKIŞI
        </div>
        <h2 class="intro-title" id="intro-title">SAHADAKİ İHTİYAÇTAN DOĞRULANMIŞ ÇÖZÜME</h2>
        <p class="intro-lead">Ascalon Dynamics, sahadaki operasyonel ihtiyaçları hızla belirleyerek yapay zekâ destekli savunma teknolojilerine dönüştüren çevik bir teknoloji şirketidir.</p>

        <div class="hud-grid">
          <article class="hud-card hud-card--problem" data-hud-card>
            <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--br" aria-hidden="true"></span>

            <div class="hud-card-head">
              <span class="hud-status"><span class="hud-status-dot" aria-hidden="true"></span>TESPİT: AKTİF RİSK</span>
              <span class="hud-tag">01 / PROBLEM</span>
            </div>
            <h3 class="hud-card-title">Problem</h3>
            <p class="hud-card-text">Savunma sanayiinin yüksek kurumsallığı ve ağır işleyişi, zaman zaman sahadaki operasyonel eksikliklerin görülmesini zorlaştırmakta ve yapay zekâ destekli çözüm seçeneklerinin denenmesini yavaşlatmaktadır.</p>
            <div class="hud-card-stat">
              <span>GECİKME RİSKİ</span>
              <b>YÜKSEK</b>
            </div>
          </article>

          <article class="hud-card hud-card--solution" data-hud-card>
            <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--br" aria-hidden="true"></span>

            <div class="hud-card-head">
              <span class="hud-status"><span class="hud-status-dot" aria-hidden="true"></span>DURUM: ÇÖZÜLDÜ</span>
              <span class="hud-tag">02 / ÇÖZÜM</span>
            </div>
            <h3 class="hud-card-title">Çözüm</h3>
            <p class="hud-card-text">Sahadaki operasyonel eksiklikleri hızla tespit ediyor, yeni yapay zekâ destekli çözümleri 1-2 hafta içerisinde prototip hâline getirerek ürünlerin gerçek kullanım değerini teknik olarak değerlendiriyor ve doğruluyoruz.</p>
            <div class="hud-card-stat">
              <span>PROTOTİP SÜRESİ</span>
              <b>1–2 HAFTA</b>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,h(e)}function h(e){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const r=e.querySelector(".intro"),t=e.querySelectorAll("[data-hud-card]");r&&(r.addEventListener("pointermove",s=>{if(s.pointerType==="touch")return;const a=r.getBoundingClientRect(),i=(s.clientX-a.left)/a.width*100,n=(s.clientY-a.top)/a.height*100;r.style.setProperty("--mx",`${i}%`),r.style.setProperty("--my",`${n}%`)}),t.forEach(s=>{s.addEventListener("pointermove",a=>{if(a.pointerType==="touch")return;const i=s.getBoundingClientRect(),n=(a.clientX-i.left)/i.width-.5,d=(a.clientY-i.top)/i.height-.5;s.style.setProperty("--rx",`${n*8}deg`),s.style.setProperty("--ry",`${d*-8}deg`)}),s.addEventListener("pointerleave",()=>{s.style.setProperty("--rx","0deg"),s.style.setProperty("--ry","0deg")})}))}function p(e){e.innerHTML=`
    <section class="solutions reveal" id="solutions" aria-labelledby="solutions-title">
      <div class="solutions-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          AKTİF SİSTEMLER
        </div>
        <h2 class="solutions-title" id="solutions-title">ÇÖZÜMLERİMİZ</h2>

        <div class="solutions-grid">
          <a class="mission-card" href="/insansiz-araclar.html" data-mission-card>
            <video
              class="mission-card-media"
              src="/images/air-hero.mp4"
              poster="/images/air-vtol.jpg"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <div class="mission-card-overlay" aria-hidden="true"></div>
            <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
            <div class="mission-card-body">
              <div class="mission-card-head">
                <span class="hud-status"><span class="hud-status-dot" aria-hidden="true"></span>AKTİF</span>
                <span class="hud-tag">MODÜL 01</span>
              </div>
              <span class="mission-card-kicker">UAV · VTOL · SUAS</span>
              <h3 class="mission-card-title">İNSANSIZ ARAÇLAR</h3>
              <p class="mission-card-text">Sabit kanat ve VTOL insansız hava araçları — saha görevleri için modüler, uzun menzilli platformlar.</p>
              <span class="mission-card-cta">İncele <span aria-hidden="true">→</span></span>
            </div>
          </a>

          <a class="mission-card" href="/umay.html" data-mission-card>
            <video
              class="mission-card-media"
              src="/images/umay-cinematic.mp4"
              poster="/images/umay-scenario-urban.jpg"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <div class="mission-card-overlay" aria-hidden="true"></div>
            <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
            <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
            <div class="mission-card-body">
              <div class="mission-card-head">
                <span class="hud-status"><span class="hud-status-dot" aria-hidden="true"></span>CANLI</span>
                <span class="hud-tag">MODÜL 02</span>
              </div>
              <span class="mission-card-kicker">AR-HUD · SENSÖR FÜZYONU</span>
              <h3 class="mission-card-title">UMAY</h3>
              <p class="mission-card-text">Taktik AR muharebe sistemi — kask üstü gerçek zamanlı sensör füzyonu ve hedef tespiti.</p>
              <span class="mission-card-cta">Simülasyonu Başlat <span aria-hidden="true">→</span></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,m(e)}function m(e){const r=e.querySelectorAll(".mission-card-media");if(!r.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){r.forEach(a=>a.pause());return}if(!("IntersectionObserver"in window))return;const s=new IntersectionObserver(a=>{a.forEach(i=>{const n=i.target;i.isIntersecting?n.play().catch(()=>{}):n.pause()})},{threshold:.2});r.forEach(a=>s.observe(a))}o(document.getElementById("header-root"));c(document.getElementById("footer-root"));u(document.getElementById("intro-root"));p(document.getElementById("solutions-root"));l(document);
