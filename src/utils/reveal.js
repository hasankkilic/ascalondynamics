/**
 * Kaydırmada hafif giriş animasyonu. `.reveal` sınıfına sahip elemanlar
 * görünüme girdiğinde `.reveal-visible` sınıfını ekler; yalnızca opacity/
 * transform kullanıldığı için (compositor katmanında çalışır) performansı
 * etkilemez. `prefers-reduced-motion` tercihine saygı duyar.
 */
export function initScrollReveal(root = document) {
  const targets = root.querySelectorAll('.reveal');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
