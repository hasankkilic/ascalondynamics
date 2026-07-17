/**
 * Değer önermesi — hero'nun hemen altında, şirketin ne yaptığını tek
 * cümlede özetleyen kısa ve net bölüm. Bilinçli olarak HUD dekorasyonu
 * içermez: mesajın kendisi öne çıksın diye sade tutulur.
 */
export function renderValueProp(container) {
  container.innerHTML = `
    <section class="value-prop reveal" id="value-prop" aria-labelledby="value-prop-statement">
      <div class="value-prop-inner">
        <p class="value-prop-statement" id="value-prop-statement">Mevcut donanımı, sahada güncellenebilir yapay zekâ ve yazılım katmanlarıyla yeni kabiliyetlere dönüştürüyoruz.</p>
        <p class="value-prop-support">Sensör füzyonu, otonom algılama ve karar destek yazılımlarını modüler platformlara entegre ederek operatör ve komuta katmanının aynı operasyonel resmi görmesini sağlıyoruz.</p>
      </div>
    </section>
  `;
}
