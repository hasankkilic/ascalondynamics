const aiStages = [
  {
    code: 'INPUT / 01',
    title: 'Algılama',
    text: 'EO/IR video, radar, telemetri ve görev verisini platform üzerinde gerçek zamanlı olarak işler.',
    image: '/images/ai-stage-detection.png',
    alt: 'İnsansız hava aracından gelen optik ve termal görüntülerin edge bilgisayarında işlenmesi',
    metric: '24 FPS',
    metricLabel: 'Edge görüntü akışı',
    points: ['Nesne ve olay algılama', 'Çok spektrumlu görüntü işleme', 'Platform üzerinde düşük gecikme'],
  },
  {
    code: 'FUSION / 02',
    title: 'Sensör Füzyonu',
    text: 'Farklı zaman ve güven seviyelerindeki sensör verilerini tek, tutarlı operasyonel resimde birleştirir.',
    image: '/images/ai-stage-fusion.png',
    alt: 'Optik, termal, radar ve navigasyon sensörlerinin tek operasyonel modelde birleştirilmesi',
    metric: '0.91',
    metricLabel: 'Füzyon güven skoru',
    points: ['Zaman ve konum eşleme', 'Güven skoru üretimi', 'Tekilleştirilmiş hedef izi'],
  },
  {
    code: 'DECISION / 03',
    title: 'Karar Desteği',
    text: 'Operatöre tehdit, rota ve görev önceliğine göre açıklanabilir öneriler sunar; nihai kontrol operatörde kalır.',
    image: '/images/ai-stage-decision.png',
    alt: 'Operatörün rota riski ve öncelikli olayları değerlendirdiği karar destek arayüzü',
    metric: '38 ms',
    metricLabel: 'Karar destek yanıtı',
    points: ['Önceliklendirilmiş olay kuyruğu', 'Açıklanabilir öneri akışı', 'İnsan-onaylı komut zinciri'],
  },
  {
    code: 'DEPLOY / 04',
    title: 'Dağıtım & Güncelleme',
    text: 'Modelleri ve görev kurallarını donanımı değiştirmeden, kontrollü sürümleme ve geri dönüş desteğiyle sahaya taşır.',
    image: '/images/ai-stage-deployment.png',
    alt: 'Mevcut insansız platformdaki edge bilgisayarına güvenli yazılım paketi aktarılması',
    metric: '12 / 12',
    metricLabel: 'Doğrulanan modül',
    points: ['İmzalı güncelleme paketleri', 'Sürüm ve rollback yönetimi', 'Platform bağımsız adaptörler'],
  },
];

const capabilities = [
  ['01', 'Computer Vision', 'Görüntü ve video akışlarında nesne, hareket ve olay algılama.'],
  ['02', 'Edge AI', 'Bağlantıdan bağımsız, platform üzerinde düşük gecikmeli çıkarım.'],
  ['03', 'Açık Entegrasyon', 'GCS, UMAY, sensör ve araç sistemleri için modüler API ve adaptörler.'],
  ['04', 'Model Yaşam Döngüsü', 'Sürümleme, doğrulama, izleme ve güvenli geri dönüş mekanizmaları.'],
];

function renderStageButton(stage, index) {
  return `
    <button class="ai-stage-tab${index === 0 ? ' is-active' : ''}" type="button" data-ai-stage="${index}" aria-pressed="${index === 0}">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <strong>${stage.title}</strong>
    </button>
  `;
}

export function renderAiSoftwarePage(container) {
  if (!container) return;
  const firstStage = aiStages[0];

  container.innerHTML = `
    <section class="ai-hero" aria-labelledby="ai-hero-title">
      <img class="ai-hero-bg" src="/images/ai-software-hero.png" alt="" aria-hidden="true" />
      <div class="ai-hero-inner">
        <div class="ai-hero-copy reveal">
          <div class="eyebrow-tag"><span class="eyebrow-tag-dot" aria-hidden="true"></span>AI CORE / YAZILIM KATMANI</div>
          <h1 id="ai-hero-title">
            <span class="ai-hero-line"><span class="ai-hero-word">Donanımı</span> <span class="ai-hero-word">değiştirmeden</span></span>
            <span class="ai-hero-line"><span class="ai-hero-word">sahada</span> <span class="ai-hero-word">güncellenebilir</span></span>
            <span class="ai-hero-line"><span class="ai-hero-word">kabiliyet</span></span>
          </h1>
          <p>Algılama, sensör füzyonu, karar desteği ve güvenli model dağıtımını mevcut platformlara bağlayan modüler yapay zekâ katmanı.</p>
          <div class="ai-hero-actions">
            <a class="ai-primary-link" href="#ai-architecture">Mimariyi İncele <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="ai-hero-status reveal" aria-label="Yazılım katmanı durum özeti">
          <span><i aria-hidden="true"></i>SİSTEM HAZIR</span>
          <dl>
            <div><dt>Çıkarım</dt><dd>EDGE</dd></div>
            <div><dt>Dağıtım</dt><dd>MODÜLER</dd></div>
            <div><dt>Kontrol</dt><dd>OPERATÖR</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section class="ai-intro" aria-labelledby="ai-intro-title">
      <div class="ai-section-inner ai-intro-grid reveal">
        <div>
          <div class="eyebrow-tag"><span class="eyebrow-tag-dot" aria-hidden="true"></span>YAZILIMLA MODERNİZASYON</div>
          <h2 class="ai-section-title" id="ai-intro-title">Aynı platform.<br />Yeni görev kabiliyeti.</h2>
        </div>
        <div class="ai-intro-copy">
          <p>Yapay zekâ katmanı, mevcut sensör ve platform yatırımlarını korurken yeni algılama ve karar desteği yeteneklerinin kontrollü yazılım güncellemeleriyle eklenmesini sağlar.</p>
          <div class="ai-micro-stats">
            <span><strong>01</strong> Platform bağımsız</span>
            <span><strong>02</strong> Sahada çalışabilir</span>
            <span><strong>03</strong> İnsan kontrollü</span>
          </div>
        </div>
      </div>
    </section>

    <section class="ai-architecture" id="ai-architecture" aria-labelledby="ai-architecture-title">
      <div class="ai-section-inner">
        <div class="ai-section-head reveal">
          <div>
            <div class="eyebrow-tag"><span class="eyebrow-tag-dot" aria-hidden="true"></span>UÇTAN UCA AKIŞ</div>
            <h2 class="ai-section-title" id="ai-architecture-title">Veriden karara tek katman</h2>
          </div>
          <p>Sensör girdisinden güvenli saha dağıtımına kadar tüm akış izlenebilir ve modüler bir mimari içinde ilerler.</p>
        </div>

        <div class="ai-stage-shell reveal">
          <div class="ai-stage-tabs" aria-label="Yapay zekâ işleme aşamaları">
            ${aiStages.map(renderStageButton).join('')}
          </div>
          <div class="ai-stage-progress" aria-hidden="true"><span data-ai-progress></span></div>
          <div class="ai-stage-layout">
            <figure class="ai-stage-visual">
              <img data-ai-stage-image src="${firstStage.image}" alt="${firstStage.alt}" loading="lazy" />
              <figcaption><span><i aria-hidden="true"></i>VERİ AKIŞI AKTİF</span><span data-ai-visual-code>${firstStage.code}</span></figcaption>
            </figure>
            <article class="ai-stage-detail" data-ai-stage-detail aria-live="polite">
              <span class="ai-stage-code" data-ai-code>${firstStage.code}</span>
              <h3 data-ai-title>${firstStage.title}</h3>
              <p data-ai-text>${firstStage.text}</p>
              <div class="ai-stage-metric"><strong data-ai-metric>${firstStage.metric}</strong><span data-ai-metric-label>${firstStage.metricLabel}</span></div>
              <ul data-ai-points>${firstStage.points.map((point) => `<li>${point}</li>`).join('')}</ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="ai-capabilities" aria-labelledby="ai-capabilities-title">
      <div class="ai-section-inner reveal">
        <div class="eyebrow-tag"><span class="eyebrow-tag-dot" aria-hidden="true"></span>KABİLİYETLER</div>
        <h2 class="ai-section-title" id="ai-capabilities-title">Sahaya hazır yazılım bileşenleri</h2>
        <div class="ai-capability-grid">
          ${capabilities.map(([index, title, text]) => `
            <article class="ai-capability-card">
              <span>${index}</span><h3>${title}</h3><p>${text}</p><i aria-hidden="true">↗</i>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="ai-field" aria-labelledby="ai-field-title">
      <div class="ai-section-inner ai-field-grid reveal">
        <figure class="ai-field-visual">
          <img src="/images/ai-software-field-update.png" alt="Bir mühendisin mevcut hava platformundaki edge bilgisayarını sahada güncellemesi" loading="lazy" />
          <figcaption>MEVCUT PLATFORM / YAZILIMLA YENİ KABİLİYET</figcaption>
        </figure>
        <div class="ai-field-copy">
          <div class="eyebrow-tag"><span class="eyebrow-tag-dot" aria-hidden="true"></span>SAHADA GÜNCELLENEBİLİR</div>
          <h2 class="ai-section-title" id="ai-field-title">Entegrasyondan operasyona kontrollü geçiş</h2>
          <p>Her model paketi platform uyumluluğu, gecikme, doğruluk ve güvenlik kontrollerinden geçer. Güncelleme sonrasında performans izlenir; gerektiğinde güvenli sürüme geri dönülür.</p>
          <ol class="ai-deploy-flow">
            <li><span>01</span><div><strong>Doğrula</strong><small>Model ve platform uyumluluğu</small></div></li>
            <li><span>02</span><div><strong>Dağıt</strong><small>İmzalı saha paketi</small></div></li>
            <li><span>03</span><div><strong>İzle</strong><small>Performans ve güven skoru</small></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="ai-cta" aria-labelledby="ai-cta-title">
      <div class="ai-section-inner ai-cta-inner reveal">
        <span>AI CORE / ENTEGRASYON</span>
        <h2 id="ai-cta-title">Mevcut platformunuza hangi kabiliyeti ekleyebiliriz?</h2>
        <p>Sensör, işlemci ve görev yapınıza uygun modüler yapay zekâ entegrasyonunu birlikte tasarlayalım.</p>
        <a class="ai-primary-link" href="/iletisim.html">İletişime Geç <span aria-hidden="true">→</span></a>
      </div>
    </section>
  `;

  initAiStages(container);
}

function initAiStages(container) {
  const tabs = container.querySelectorAll('[data-ai-stage]');
  const code = container.querySelector('[data-ai-code]');
  const title = container.querySelector('[data-ai-title]');
  const text = container.querySelector('[data-ai-text]');
  const metric = container.querySelector('[data-ai-metric]');
  const metricLabel = container.querySelector('[data-ai-metric-label]');
  const points = container.querySelector('[data-ai-points]');
  const progress = container.querySelector('[data-ai-progress]');
  const stageImage = container.querySelector('[data-ai-stage-image]');
  const visualCode = container.querySelector('[data-ai-visual-code]');
  if (!tabs.length || !code || !title || !text || !metric || !metricLabel || !points || !progress || !stageImage || !visualCode) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const stageIndex = Number(tab.dataset.aiStage);
      const stage = aiStages[stageIndex];
      if (!stage) return;
      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      code.textContent = stage.code;
      title.textContent = stage.title;
      text.textContent = stage.text;
      stageImage.src = stage.image;
      stageImage.alt = stage.alt;
      visualCode.textContent = stage.code;
      metric.textContent = stage.metric;
      metricLabel.textContent = stage.metricLabel;
      points.innerHTML = stage.points.map((point) => `<li>${point}</li>`).join('');
      progress.style.width = `${(stageIndex + 1) * 25}%`;
    });
  });
}
