const gcsCapabilities = [
  {
    title: 'CBS Harita Katmanı',
    text: 'Uçuş koridoru, görev sınırı, platform konumu ve video pinlerini tek coğrafi görünümde birleştirir.',
    status: 'Harita senkronize',
    image: '/images/gcs/gcs-ui-overview.png',
    alt: 'CBS haritası, platform konumları ve operasyon durumunu gösteren kontrol arayüzü',
    points: ['Canlı platform konumu', 'Görev alanı ve rota katmanları', 'Video ve olay işaretleri'],
  },
  {
    title: 'Video Yönetim Ekranı',
    text: 'EO/IR yayınları, kayıt durumu, snapshot ve olay etiketlerini operatörün aynı ekranda takip etmesini sağlar.',
    status: 'Akışlar hazır',
    image: '/images/gcs/gcs-ui-cbs-video.png',
    alt: 'CBS haritası ile EO ve IR video akışlarını birleştiren kontrol arayüzü',
    points: ['EO/IR yayın seçimi', 'Kayıt ve anlık görüntü', 'Olay bazlı etiketleme'],
  },
  {
    title: 'Sensör ve Telemetri',
    text: 'GNSS, IMU, payload, bağlantı kalitesi ve sensör füzyonu skorlarını canlı durum panellerine dönüştürür.',
    status: 'Telemetri aktif',
    image: '/images/gcs/gcs-ui-sensors.png',
    alt: 'Sensör sağlığı ve telemetri değerlerini gösteren kontrol arayüzü',
    points: ['Bağlantı ve sensör sağlığı', 'Canlı payload değerleri', 'Füzyon güven skorları'],
  },
  {
    title: 'Komut ve Görev Kontrolü',
    text: 'Rota güncelleme, orbit, hold, video pin ve güvenli dönüş gibi komutları onay akışıyla yönetir.',
    status: 'Komut hattı açık',
    image: '/images/gcs/gcs-ui-commands.png',
    alt: 'Komut akışı, rota önizleme ve görev kontrolünü gösteren kontrol arayüzü',
    points: ['Güvenli komut onayı', 'Görev ve rota güncelleme', 'ACK/NACK durum takibi'],
  },
];

export function renderGcsPage(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="gcs-hero" aria-labelledby="gcs-hero-title">
      <img class="gcs-hero-bg" src="/images/gcs/gcs-ui-overview.png" alt="" aria-hidden="true" />
      <div class="gcs-hero-inner">
        <div class="gcs-hero-copy reveal">
          <div class="eyebrow-tag">
            <span class="eyebrow-tag-dot" aria-hidden="true"></span>
            KONTROL ARAYÜZÜ
          </div>
          <h1 class="gcs-hero-title" id="gcs-hero-title">Tüm platformlar<br />için tek<br />komuta kontrol<br />arayüzü</h1>
          <p class="gcs-hero-text">GCS; CBS harita, video yönetimi, sensör telemetrisi ve komut akışlarını tek operatör ekranında birleştiren konsept yer kontrol istasyonu arayüzüdür.</p>
          <div class="gcs-hero-actions">
            <a class="gcs-primary-link" href="#gcs-capabilities">Kabiliyetleri İncele <span aria-hidden="true">→</span></a>
            <a class="gcs-secondary-link" href="/iletisim.html">İletişime Geç</a>
          </div>
        </div>
      </div>
    </section>

    <section class="gcs-overview" aria-labelledby="gcs-overview-title">
      <div class="gcs-overview-inner reveal">
        <div>
          <div class="eyebrow-tag">
            <span class="eyebrow-tag-dot" aria-hidden="true"></span>
            OPERASYON MERKEZİ
          </div>
          <h2 class="gcs-section-title" id="gcs-overview-title">Canlı telemetri,<br />görev planlama ve<br />çok platformlu<br />koordinasyon</h2>
        </div>
        <p class="gcs-section-lead">Arayüz, operatörün harita, video, sensör ve komut panelleri arasında kopmadan çalışması için tasarlanmıştır. Görseller gerçek uygulama ekranı hissinde hazırlanmış konsept UI görüntüleridir.</p>
      </div>
    </section>

    <section class="gcs-capabilities" id="gcs-capabilities" aria-labelledby="gcs-capabilities-title">
      <div class="gcs-capabilities-inner reveal">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          KABİLİYETLER
        </div>
        <h2 class="gcs-section-title" id="gcs-capabilities-title">Operatörün beklediği temel kontroller</h2>
        <div class="gcs-capability-grid">
          ${gcsCapabilities
            .map(
              (item, index) => `
            <button class="gcs-capability-card${index === 0 ? ' is-active' : ''}" type="button" data-gcs-capability="${index}" aria-pressed="${index === 0}">
              <span class="gcs-capability-number">0${index + 1}</span>
              <span class="gcs-capability-status"><i aria-hidden="true"></i>${item.status}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              <span class="gcs-capability-action">Detayları göster <b aria-hidden="true">→</b></span>
            </button>`
            )
            .join('')}
        </div>
        <div class="gcs-capability-detail" data-gcs-capability-detail aria-live="polite">
          <figure class="gcs-capability-visual">
            <img data-gcs-detail-image src="${gcsCapabilities[0].image}" alt="${gcsCapabilities[0].alt}" />
            <figcaption>
              <span data-gcs-detail-status><i aria-hidden="true"></i>${gcsCapabilities[0].status}</span>
              <span data-gcs-detail-index>01 / 04</span>
            </figcaption>
          </figure>
          <div class="gcs-capability-detail-copy">
            <span class="gcs-capability-detail-label">SEÇİLİ MODÜL</span>
            <h3 data-gcs-detail-title>${gcsCapabilities[0].title}</h3>
            <p data-gcs-detail-text>${gcsCapabilities[0].text}</p>
            <ul data-gcs-detail-points>
              ${gcsCapabilities[0].points.map((point) => `<li>${point}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="gcs-cta" aria-labelledby="gcs-cta-title">
      <div class="gcs-cta-inner reveal">
        <h2 id="gcs-cta-title">GCS entegrasyonunu konuşalım</h2>
        <p>Mevcut İHA, sensör ve komuta kontrol yapınızı tek arayüz altında nasıl toplayabileceğimizi birlikte değerlendirelim.</p>
        <a class="gcs-primary-link" href="/iletisim.html">İletişime Geç <span aria-hidden="true">→</span></a>
      </div>
    </section>
  `;

  initGcsCapabilities(container);
}

function initGcsCapabilities(container) {
  const cards = container.querySelectorAll('[data-gcs-capability]');
  const title = container.querySelector('[data-gcs-detail-title]');
  const text = container.querySelector('[data-gcs-detail-text]');
  const points = container.querySelector('[data-gcs-detail-points]');
  const image = container.querySelector('[data-gcs-detail-image]');
  const status = container.querySelector('[data-gcs-detail-status]');
  const index = container.querySelector('[data-gcs-detail-index]');
  if (!cards.length || !title || !text || !points || !image || !status || !index) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const capability = gcsCapabilities[Number(card.dataset.gcsCapability)];
      if (!capability) return;
      cards.forEach((item) => {
        const isActive = item === card;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      title.textContent = capability.title;
      text.textContent = capability.text;
      image.src = capability.image;
      image.alt = capability.alt;
      status.innerHTML = `<i aria-hidden="true"></i>${capability.status}`;
      index.textContent = `${String(Number(card.dataset.gcsCapability) + 1).padStart(2, '0')} / ${String(gcsCapabilities.length).padStart(2, '0')}`;
      points.innerHTML = capability.points.map((point) => `<li>${point}</li>`).join('');
    });
  });
}
