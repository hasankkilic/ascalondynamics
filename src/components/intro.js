/**
 * Şirket tanıtım bölümü — Problem / Çözüm.
 * Video hero ile "Çözümlerimiz" bölümü arasında, footer'dan önce yer alır.
 * Tema: UMAY sayfasındaki taktik AR-HUD diline (köşe braketleri, tarama
 * çizgileri, camgöbeği vurgu, mono etiketler) uygun, imleç ile etkileşimli
 * bir "saha raporu" paneli.
 */
export function renderIntro(container) {
  container.innerHTML = `
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
  `;

  initHudInteractivity(container);
}

/**
 * İmleç takibiyle: bölüm genelinde radar tarzı bir spot ışığı (--mx/--my)
 * ve her kart için hafif bir 3B eğim (--rx/--ry) üretir. Dokunmatik veya
 * "prefers-reduced-motion" tercihlerinde devre dışı bırakılır.
 */
function initHudInteractivity(container) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const section = container.querySelector(".intro");
  const cards = container.querySelectorAll("[data-hud-card]");
  if (!section) return;

  section.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const rect = section.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    section.style.setProperty("--mx", `${mx}%`);
    section.style.setProperty("--my", `${my}%`);
  });

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${px * 8}deg`);
      card.style.setProperty("--ry", `${py * -8}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}
