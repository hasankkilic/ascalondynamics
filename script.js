/* SENTINEL — combined dynamic site interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- i18n (TR / EN language switch) ---- */
  const LANG_KEY = 'ascalon-lang';
  const ROTATE = {
    tr: ['insansız hava sistemleri', 'keşif platformları', 'savunma çözümleri', 'otonom görevler', 'kritik altyapı'],
    en: ['unmanned aerial systems', 'reconnaissance platforms', 'defense solutions', 'autonomous missions', 'critical infrastructure']
  };
  let curLang = localStorage.getItem(LANG_KEY) || 'tr';
  let rotIdx = 0;

  const updateRotator = () => {
    const el = document.getElementById('rotateWord');
    if (el) el.textContent = ROTATE[curLang][rotIdx % ROTATE[curLang].length];
  };

  const swapText = (el, lang) => {
    if (el.dataset.trHtml == null) el.dataset.trHtml = el.innerHTML;
    el.innerHTML = (lang === 'en' && el.dataset.en != null) ? el.dataset.en : el.dataset.trHtml;
  };
  const swapAttr = (el, attr, enVal, cacheKey) => {
    if (el.dataset[cacheKey] == null) el.dataset[cacheKey] = el.getAttribute(attr) || '';
    el.setAttribute(attr, (curLang === 'en' && enVal != null) ? enVal : el.dataset[cacheKey]);
  };

  const applyLang = (lang) => {
    curLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(el => swapText(el, lang));
    document.querySelectorAll('[data-en-content]').forEach(el => swapAttr(el, 'content', el.dataset.enContent, 'trContent'));
    document.querySelectorAll('[data-en-ph]').forEach(el => swapAttr(el, 'placeholder', el.dataset.enPh, 'trPh'));
    document.querySelectorAll('[data-en-alt]').forEach(el => swapAttr(el, 'alt', el.dataset.enAlt, 'trAlt'));
    document.querySelectorAll('.lang-btn').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    localStorage.setItem(LANG_KEY, lang);
    updateRotator();
  };

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });
  applyLang(curLang);

  /* ---- Preloader ---- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => preloader && preloader.classList.add('done'), 900));
  // safety fallback
  setTimeout(() => preloader && preloader.classList.add('done'), 2600);

  /* ---- Year ---- */
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---- Scroll progress + header state + back-to-top ---- */
  const progress = document.getElementById('progress');
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (progress) progress.style.width = (scrolled * 100) + '%';
    if (header) header.classList.toggle('scrolled', h.scrollTop > 20);
    if (toTop) toTop.classList.toggle('show', h.scrollTop > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open'); mobileMenu.classList.remove('open');
    }));
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1400; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---- Hero rotating word (localized) ---- */
  const wordEl = document.getElementById('rotateWord');
  if (wordEl) {
    setInterval(() => {
      rotIdx = (rotIdx + 1) % ROTATE[curLang].length;
      wordEl.style.animation = 'none';
      void wordEl.offsetWidth; // reflow
      updateRotator();
      wordEl.style.animation = '';
    }, 2600);
  }

  /* ---- Domains interactive tabs ---- */
  const tabs = document.querySelectorAll('.domain-tab');
  const domainImg = document.getElementById('domainImg');
  const domainDesc = document.getElementById('domainDesc');
  tabs.forEach(tab => {
    const activate = () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (domainImg) { domainImg.style.opacity = '0'; setTimeout(() => { domainImg.style.backgroundImage = `url('${tab.dataset.img}')`; domainImg.style.opacity = '1'; }, 180); }
      if (domainDesc) domainDesc.textContent = tab.dataset.desc;
    };
    tab.addEventListener('click', activate);
    tab.addEventListener('mouseenter', activate);
  });

  /* ---- Demo option toggle ---- */
  const opts = document.querySelectorAll('.demo__option');
  opts.forEach(o => o.addEventListener('click', () => {
    opts.forEach(x => x.classList.remove('is-active'));
    o.classList.add('is-active');
  }));

  /* ---- Contact form (validate + confirmation) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('formStatus');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      if (status) status.hidden = false;
      contactForm.reset();
    });
  }

  /* ---- Mouse-follow spotlight (cinematic) ---- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && window.matchMedia('(min-width: 901px)').matches) {
    const spot = document.createElement('div');
    spot.className = 'spotlight';
    document.body.appendChild(spot);
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY; spot.classList.add('on');
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      spot.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---- 3D tilt on cards (dynamic depth) ---- */
  if (!reduced && window.matchMedia('(min-width: 901px)').matches) {
    const tilt = (sel, max, lift) => document.querySelectorAll(sel).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'transform .06s linear';
        card.style.transform = `perspective(950px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(${lift}px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
        card.style.transform = '';
      });
    });
    tilt('.card', 5, -6);
    tilt('.domaincard', 4, -6);
    tilt('.subcard', 6, -4);
  }

  /* ---- Light parallax on tagged elements ---- */
  const para = document.querySelectorAll('[data-parallax]');
  if (!reduced && para.length) {
    const onPara = () => {
      const vh = window.innerHeight;
      para.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        const sp = parseFloat(el.dataset.parallax) || 0.06;
        el.style.transform = `translateY(${(-center * sp).toFixed(1)}px)`;
      });
    };
    window.addEventListener('scroll', onPara, { passive: true });
    onPara();
  }
});
