import { vehicles } from '../data/vehicles.js';

/**
 * İnsansız Araçlar — filo listesi. Tüm araçlar aynı anda, alt alta
 * görünür (sekme/geçiş yok). Her satırda solda interaktif görsel
 * (imleçle hafif eğim + ekrana girince tarama animasyonu), sağda
 * Kod Adı / Model / Görev / Öne Çıkan Özellikler.
 */
export function renderVehiclePanel(container) {
  container.innerHTML = `
    <section class="uav-panel" id="uav-panel" aria-labelledby="uav-panel-title">
      <div class="uav-panel-inner">
        <div class="eyebrow-tag reveal">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          FİLO KATALOĞU
        </div>
        <h2 class="uav-panel-title reveal" id="uav-panel-title">İNSANSIZ HAVA SİSTEMLERİ</h2>
        <p class="uav-panel-lead reveal">Keşif, gözetleme ve saha desteği için modüler platformlar. Her yapılandırma, görev tipine ve mevcut komuta kontrol ekosistemine uyum odağıyla ele alınır.</p>

        <div class="uav-list">
          ${vehicles
            .map(
              (v, i) => `
            <article class="uav-entry reveal" data-uav-entry>
              <div class="uav-visual" data-uav-visual>
                <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
                <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
                <img class="uav-visual-img" src="${v.image}" alt="${v.codeName} (${v.model})" loading="lazy" />
                <span class="uav-visual-sweep" data-uav-sweep aria-hidden="true"></span>
              </div>

              <div class="uav-detail">
                <div class="uav-detail-row">
                  <span class="uav-detail-label">0${i + 1} / Kod Adı</span>
                  <span class="uav-detail-value uav-detail-value--code">${v.codeName}</span>
                </div>
                ${
                  v.status
                    ? `<div class="uav-detail-row">
                  <span class="uav-detail-label">Geliştirme Durumu</span>
                  <span class="uav-detail-value">${v.status}</span>
                </div>`
                    : ''
                }
                <div class="uav-detail-row">
                  <span class="uav-detail-label">Model</span>
                  <span class="uav-detail-value">${v.model}</span>
                </div>
                <div class="uav-detail-row">
                  <span class="uav-detail-label">Görev</span>
                  <span class="uav-detail-value">${v.mission}</span>
                </div>
                <div class="uav-detail-row uav-detail-row--features">
                  <span class="uav-detail-label">Öne Çıkan Özellikler</span>
                  <div class="uav-feature-tags">
                    ${v.features.map((f) => `<span class="uav-feature-tag">${f}</span>`).join('')}
                  </div>
                </div>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `;

  initVehiclePanel(container);
}

function initVehiclePanel(container) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ekrana girince tarama animasyonunu tetikle
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const entries = container.querySelectorAll('[data-uav-entry]');
    const observer = new IntersectionObserver(
      (list) => {
        list.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sweep = entry.target.querySelector('[data-uav-sweep]');
          if (sweep) sweep.classList.add('run');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    entries.forEach((entry) => observer.observe(entry));
  }

  if (reduceMotion) return;

  // her görsel için imleç eğimi
  container.querySelectorAll('[data-uav-visual]').forEach((visual) => {
    visual.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = visual.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      visual.style.setProperty('--rx', `${px * 10}deg`);
      visual.style.setProperty('--ry', `${py * -10}deg`);
    });

    visual.addEventListener('pointerleave', () => {
      visual.style.setProperty('--rx', '0deg');
      visual.style.setProperty('--ry', '0deg');
    });
  });
}
