/**
 * Prototip / saha doğrulama kanıtı — sayısal iddia veya sertifika içermez.
 * Yalnızca gerçek saha senaryosu görselleri ve UMAY sayfasındaki
 * interaktif konsept demosuna referans verir; demo açıkça simülasyon
 * olarak etiketlenir.
 */
export function renderEvidence(container) {
  container.innerHTML = `
    <section class="evidence reveal" id="evidence" aria-labelledby="evidence-title">
      <div class="evidence-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          PROTOTİP SÜRECİ
        </div>
        <h2 class="evidence-title" id="evidence-title">Prototipten Saha Değerine</h2>
        <p class="evidence-lead">Fikirleri doğrudan işlevsel prototiplere dönüştürüyor, saha senaryolarını yansıtan kurgularla test ediyoruz. UMAY sayfasındaki taktik simülatör, bu sürecin <strong>simülasyon verisiyle çalışan</strong> interaktif bir konsept demosudur, gerçek operasyon verisi değildir.</p>

        <a class="evidence-cta" href="/umay.html">Simülasyonu Dene <span aria-hidden="true">→</span></a>
      </div>
    </section>
  `;
}
