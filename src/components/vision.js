/**
 * Şirket vizyonu — kısa, tek paragraflık ileriye dönük bir ifade.
 * Not: bu taslak metindir; şirketin gerçek vizyon/misyon ifadesiyle
 * değiştirilmesi veya onaylanması önerilir.
 */
export function renderVision(container) {
  container.innerHTML = `
    <section class="vision reveal" id="vision" aria-labelledby="vision-title">
      <div class="vision-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          VİZYON
        </div>
        <h2 class="vision-title" id="vision-title">Sahadaki karar anını hızlandırmak</h2>
        <p class="vision-text">Vizyonumuz; saha ekiplerinin karar süresini kısaltan, yapay zekâ destekli otonom sistemleri savunma ve kamu güvenliği alanlarında erişilebilir kılmaktır.</p>
      </div>
    </section>
  `;
}
