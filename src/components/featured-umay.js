/**
 * UMAY öne çıkan sistem bölümü — ana sayfadaki iki görev kartından daha
 * ayrıntılı bir tanıtım. Sensör/UAV → Kenar (edge) YZ işleme → AR/HUD
 * gösterim → daha hızlı saha kararı akışını gösterir.
 */
export function renderFeaturedUmay(container) {
  container.innerHTML = `
    <section class="featured-umay reveal" id="featured-umay" aria-labelledby="featured-umay-title">
      <div class="featured-umay-inner">
        <div class="featured-umay-media">
          <video
            class="featured-umay-video"
            src="/images/umay-arhud.mp4"
            poster="/images/umay-scenario-urban.jpg"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
          <img class="featured-umay-badge" src="/images/orijinal_logo2.png" alt="Ascalon Dynamics logosu" />
        </div>

        <div class="featured-umay-body">
          <div class="eyebrow-tag">
            <span class="eyebrow-tag-dot" aria-hidden="true"></span>
            ÖNE ÇIKAN SİSTEM
          </div>
          <h2 class="featured-umay-title" id="featured-umay-title">UMAY</h2>
          <p class="featured-umay-text">Kask üstü AR-HUD sistemi; termal, optik ve İHA verisini kenar (edge) yapay zekâ ile operatörün görüş alanında okunabilir tek resme dönüştürür.</p>

          <ol class="featured-umay-flow" aria-label="UMAY veri akışı">
            <li><span class="featured-umay-flow-step">01</span>Termal, Optik ve İHA Beslemesi</li>
            <li><span class="featured-umay-flow-step">02</span>Sensör Füzyonu ve Kenar YZ</li>
            <li><span class="featured-umay-flow-step">03</span>AR/HUD Gösterim</li>
            <li><span class="featured-umay-flow-step">04</span>Operatör Karar Desteği</li>
          </ol>

          <a class="featured-umay-cta" href="/umay.html">UMAY'ı İncele <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  `;

  const video = container.querySelector('.featured-umay-video');
  if (!video) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    video.pause();
    return;
  }
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(video);
}
