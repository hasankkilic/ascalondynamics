/**
 * "Çözümlerimiz" bölümü — İnsansız Araçlar ve UMAY sayfalarına yönlendiren
 * iki büyük "görev kartı". Intro bölümündeki HUD diliyle tutarlı: köşe
 * braketleri, durum etiketleri, arka planda video önizleme.
 *
 * Route notu: hem UMAY (/umay.html) hem de İnsansız Araçlar
 * (/insansiz-araclar.html) için gerçek sayfalar mevcuttur.
 */
export function renderSolutions(container) {
  container.innerHTML = `
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
              <p class="mission-card-text">Keşif, gözetleme ve saha desteği için göreve göre yapılandırılabilir modüler İHA platformları.</p>
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
              <p class="mission-card-text">Kask üstü AR sistemi; termal, optik ve İHA beslemelerini tek görüş alanında birleştirir.</p>
              <span class="mission-card-cta">Simülasyonu Başlat <span aria-hidden="true">→</span></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  `;

  initMissionCards(container);
}

/**
 * Performans + erişilebilirlik: video yalnızca görünümdeyken oynatılır,
 * "prefers-reduced-motion" tercihinde ilk kare sabit kalır.
 */
function initMissionCards(container) {
  const videos = container.querySelectorAll('.mission-card-media');
  if (!videos.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    videos.forEach((video) => video.pause());
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.2 }
  );

  videos.forEach((video) => observer.observe(video));
}
