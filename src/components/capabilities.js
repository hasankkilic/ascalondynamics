import { capabilities } from '../data/capabilities.js';

/**
 * Mühendislik kabiliyetleri — dört kısa kart. Sayısal/istatistiksel bir
 * iddia içermez; yalnızca hangi mühendislik alanlarında çalışıldığını
 * anlatır (bkz. src/data/jobs.js ile aynı kaynak).
 */
export function renderCapabilities(container) {
  container.innerHTML = `
    <section class="capabilities reveal" id="capabilities" aria-labelledby="capabilities-title">
      <div class="capabilities-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          MÜHENDİSLİK
        </div>
        <h2 class="capabilities-title" id="capabilities-title">Mühendislik Kabiliyetlerimiz</h2>

        <div class="capabilities-grid">
          ${capabilities
            .map(
              (c, i) => `
            <article class="capability-card">
              <span class="capability-index">0${i + 1}</span>
              <h3 class="capability-title">${c.title}</h3>
              <p class="capability-text">${c.text}</p>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
