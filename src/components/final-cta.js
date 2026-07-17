/**
 * İletişim çağrı bölümü — ana sayfanın son kısmı, footer'dan hemen önce.
 */
export function renderFinalCta(container) {
  container.innerHTML = `
    <section class="final-cta reveal" id="final-cta" aria-labelledby="final-cta-title">
      <div class="final-cta-inner">
        <h2 class="final-cta-title" id="final-cta-title">Sahadaki ihtiyacınızı konuşalım</h2>
        <p class="final-cta-text">Operasyonel ihtiyacınızı ve olası çözüm yaklaşımını birlikte değerlendirelim.</p>
        <a class="final-cta-button" href="/iletisim.html">İletişime Geç <span aria-hidden="true">→</span></a>
      </div>
    </section>
  `;
}
