import { productPillars } from '../data/product-pillars.js';

function productPillarCard(pillar, index) {
  const body = `
    <div class="product-pillar-meta">
      <span class="product-pillar-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="product-pillar-kind">${pillar.kind}</span>
    </div>
    <span class="product-pillar-label">${pillar.label}</span>
    <h3 class="product-pillar-title">${pillar.title}</h3>
    <p class="product-pillar-text">${pillar.text}</p>
    <span class="product-pillar-action">${pillar.href ? 'Detay sayfası' : 'Ana kabiliyet'}</span>
  `;

  if (pillar.href) {
    return `
      <a class="product-pillar-card product-pillar-card--link" href="${pillar.href}" aria-label="${pillar.title} detayını incele">
        ${body}
      </a>
    `;
  }

  return `
    <article class="product-pillar-card">
      ${body}
    </article>
  `;
}

export function renderProductPillars(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="product-pillars reveal" id="product-pillars" aria-labelledby="product-pillars-title">
      <div class="product-pillars-inner">
        <div class="product-pillars-head">
          <div>
            <div class="eyebrow-tag">
              <span class="eyebrow-tag-dot" aria-hidden="true"></span>
              ÜRÜN VE KABİLİYET KATMANLARI
            </div>
            <h2 class="product-pillars-title" id="product-pillars-title">Tek Ekosistemde Saha Kabiliyeti</h2>
          </div>
          <p class="product-pillars-lead">Giyilebilir AR, İHA, yer kontrol, yapay zekâ ve modernizasyon katmanlarını aynı operasyonel resimde buluşturan modüler yapı.</p>
        </div>

        <div class="product-pillars-grid">
          ${productPillars.map(productPillarCard).join('')}
        </div>
      </div>
    </section>
  `;
}
