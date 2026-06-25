/* ============================================================
   ASCALON DYNAMICS — Main Script
   Three.js hero + GSAP ScrollTrigger + site interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     i18n (TR / EN)
  ───────────────────────────────────────── */
  const LANG_KEY = 'ascalon-lang';
  let curLang = localStorage.getItem(LANG_KEY) || 'tr';

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
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
    localStorage.setItem(LANG_KEY, lang);
  };
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });
  applyLang(curLang);

  /* ─────────────────────────────────────────
     Preloader
  ───────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const dismiss = () => preloader && preloader.classList.add('done');
  window.addEventListener('load', () => setTimeout(dismiss, 1200));
  setTimeout(dismiss, 3000);

  /* ─────────────────────────────────────────
     Scroll: progress bar + header + back-to-top
  ───────────────────────────────────────── */
  const progressEl = document.getElementById('progress');
  const header     = document.getElementById('header');
  const toTopBtn   = document.getElementById('toTop');

  const onScroll = () => {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (progressEl) progressEl.style.width = (pct * 100) + '%';
    if (header) header.classList.toggle('scrolled', h.scrollTop > 40);
    if (toTopBtn) toTopBtn.classList.toggle('show', h.scrollTop > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTopBtn && toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─────────────────────────────────────────
     Mobile menu
  ───────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }));
  }

  /* ─────────────────────────────────────────
     Reveal on scroll (IntersectionObserver)
  ───────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = Math.min(i * 70, 280);
          e.target.style.transitionDelay = delay + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ─────────────────────────────────────────
     Animated counters
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const animCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
  }

  /* ─────────────────────────────────────────
     Capability bars — animate on enter
  ───────────────────────────────────────── */
  const capBars = document.querySelectorAll('.cap-bar__fill');
  if ('IntersectionObserver' in window) {
    const bo = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); bo.unobserve(e.target); } });
    }, { threshold: 0.5 });
    capBars.forEach(b => bo.observe(b));
  }

  /* ─────────────────────────────────────────
     THREE.JS — Hero particle field
  ───────────────────────────────────────── */
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    initHeroScene(heroCanvas);
  }

  /* ─────────────────────────────────────────
     THREE.JS — CTA grid particles
  ───────────────────────────────────────── */
  const ctaCanvas = document.getElementById('ctaCanvas');
  if (ctaCanvas && typeof THREE !== 'undefined') {
    initCtaScene(ctaCanvas);
  }

  /* ─────────────────────────────────────────
     GSAP ScrollTrigger
  ───────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }

  /* ─────────────────────────────────────────
     Hero entrance animation (CSS-driven but
     staggered via JS class additions)
  ───────────────────────────────────────── */
  window.addEventListener('load', () => {
    const eyebrow = document.querySelector('.hero__eyebrow');
    const lines   = document.querySelectorAll('.hero__title-line');
    const sub     = document.querySelector('.hero__sub');
    const actions = document.querySelector('.hero__actions');
    const hudTop  = document.querySelector('.hero__hud-top');
    const hudBot  = document.querySelector('.hero__hud-bottom');

    [eyebrow, ...lines, sub, actions, hudTop, hudBot].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.9s cubic-bezier(0.2,0.8,0.2,1), transform 0.9s cubic-bezier(0.2,0.8,0.2,1)';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, 800 + i * 120);
    });
  });

}); // end DOMContentLoaded

/* ============================================================
   THREE.JS HERO SCENE
   Atmospheric particle field with geometric UAV silhouette
   ============================================================ */
function initHeroScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
  camera.position.set(0, 0, 80);

  /* ── Fog (açık tema: beyaza karışır) ── */
  scene.fog = new THREE.FogExp2(0xfafafa, 0.006);

  /* ── Ambient light ── */
  scene.add(new THREE.AmbientLight(0xd0e8f0, 1.4));
  const pointLight1 = new THREE.PointLight(0x0088aa, 2, 200);
  pointLight1.position.set(40, 20, 30);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0xe11d2a, 1.5, 150);
  pointLight2.position.set(-40, -20, 20);
  scene.add(pointLight2);

  /* ── Koyu nokta bulutu (açık bg'de görünür) ── */
  const starCount = 2400;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 800;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x1a2433, size: 0.5, transparent: true, opacity: 0.35, sizeAttenuation: true
  });
  scene.add(new THREE.Points(starGeo, starMat));

  /* ── Orta-alan siyan partiküller ── */
  const partCount = 1000;
  const partPos  = new Float32Array(partCount * 3);
  const partSizes = new Float32Array(partCount);
  for (let i = 0; i < partCount; i++) {
    partPos[i * 3]     = (Math.random() - 0.5) * 200;
    partPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
    partPos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 20;
    partSizes[i] = Math.random() * 1.4 + 0.4;
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  partGeo.setAttribute('size', new THREE.BufferAttribute(partSizes, 1));
  const partMat = new THREE.PointsMaterial({
    color: 0x0088aa, size: 0.9,
    transparent: true, opacity: 0.4,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  /* ── Kırmızı aksan partiküller ── */
  const redCount = 260;
  const redPos   = new Float32Array(redCount * 3);
  for (let i = 0; i < redCount; i++) {
    redPos[i * 3]     = (Math.random() - 0.5) * 160;
    redPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
    redPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
  }
  const redGeo = new THREE.BufferGeometry();
  redGeo.setAttribute('position', new THREE.BufferAttribute(redPos, 3));
  const redMat = new THREE.PointsMaterial({
    color: 0xe11d2a, size: 0.7, transparent: true, opacity: 0.35, sizeAttenuation: true
  });
  scene.add(new THREE.Points(redGeo, redMat));

  /* ── Izgara düzlemi (yatay) ── */
  const gridHelper = new THREE.GridHelper(400, 40, 0xc8d0da, 0xd8dde5);
  gridHelper.position.y = -30;
  scene.add(gridHelper);

  /* ── Wireframe UAV stand-in (abstract geometric shape) ── */
  const uavGroup = new THREE.Group();

  // Fuselage — elongated octahedron
  const fuselageGeo = new THREE.OctahedronGeometry(6, 0);
  const fuselageGeo2 = new THREE.BoxGeometry(22, 1.2, 3);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x0088aa, wireframe: true, transparent: true, opacity: 0.45
  });
  const solidMat = new THREE.MeshBasicMaterial({
    color: 0xe8ebf0, transparent: true, opacity: 0.7
  });

  const fuselage = new THREE.Mesh(fuselageGeo2, wireMat);
  uavGroup.add(fuselage);

  // Wings
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(18, 0.3, 6), wireMat.clone());
  wingL.position.set(-9, 0, 0);
  const wingR = wingL.clone();
  wingR.position.set(9, 0, 0);
  uavGroup.add(wingL, wingR);

  // Tail
  const tail = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.3), wireMat.clone());
  tail.position.set(-12, 1.2, 0);
  uavGroup.add(tail);

  // Engine pods
  const podGeo = new THREE.CylinderGeometry(0.6, 0.8, 4, 8);
  const podMat = wireMat.clone();
  const podL = new THREE.Mesh(podGeo, podMat);
  podL.rotation.z = Math.PI / 2;
  podL.position.set(-6, -1, 2);
  const podR = podL.clone();
  podR.position.set(-6, -1, -2);
  const podL2 = podL.clone();
  podL2.position.set(6, -1, 2);
  const podR2 = podL.clone();
  podR2.position.set(6, -1, -2);
  uavGroup.add(podL, podR, podL2, podR2);

  uavGroup.position.set(0, 8, -20);
  uavGroup.rotation.y = Math.PI * 0.08;
  scene.add(uavGroup);

  /* ── Connection lines (data streams) ── */
  const lineCount = 8;
  const lineMeshes = [];
  for (let i = 0; i < lineCount; i++) {
    const pts = [];
    const x0 = (Math.random() - 0.5) * 120;
    const y0 = (Math.random() - 0.5) * 60;
    const z0 = (Math.random() - 0.5) * 40 - 30;
    pts.push(new THREE.Vector3(x0, y0, z0));
    pts.push(new THREE.Vector3(x0 + (Math.random()-0.5)*40, y0 + (Math.random()-0.5)*30, z0 + 20));
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const lineMat = new THREE.LineBasicMaterial({
      color: i % 2 === 0 ? 0x0088aa : 0xe11d2a,
      transparent: true, opacity: 0.18
    });
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);
    lineMeshes.push({ mesh: line, mat: lineMat, phase: Math.random() * Math.PI * 2 });
  }

  /* ── Resize ── */
  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  /* ── Mouse parallax ── */
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ── Scroll influence ── */
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* ── Animate ── */
  let t = 0;
  const animate = () => {
    if (!document.getElementById('heroCanvas')) return; // stop if unmounted
    requestAnimationFrame(animate);
    t += 0.006;

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Camera parallax
    camera.position.x = targetX * 12;
    camera.position.y = -targetY * 6 + 4;
    camera.lookAt(0, 6, 0);

    // UAV gentle float
    uavGroup.position.y = 8 + Math.sin(t * 0.7) * 1.8;
    uavGroup.rotation.z = Math.sin(t * 0.5) * 0.04;
    uavGroup.rotation.x = targetY * 0.08;

    // Particle drift
    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.008;

    // Light cycle
    pointLight1.position.x = Math.sin(t * 0.4) * 50;
    pointLight1.position.y = Math.cos(t * 0.3) * 25;
    pointLight2.position.x = -Math.sin(t * 0.35) * 40;

    // Data stream flicker
    lineMeshes.forEach(l => {
      l.mat.opacity = 0.08 + 0.18 * (0.5 + 0.5 * Math.sin(t * 2 + l.phase));
    });

    // Fade hero Three.js on scroll
    const scrollFade = Math.max(0, 1 - scrollY / (window.innerHeight * 0.6));
    renderer.domElement.style.opacity = scrollFade;

    renderer.render(scene, camera);
  };
  animate();
}

/* ============================================================
   THREE.JS CTA SCENE — Particle grid
   ============================================================ */
function initCtaScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
  camera.position.set(0, 0, 60);

  // Floating particles
  const N = 600;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random()-0.5)*120;
    pos[i*3+1] = (Math.random()-0.5)*80;
    pos[i*3+2] = (Math.random()-0.5)*60;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0x0088aa, size: 0.6, transparent: true, opacity: 0.35 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  const onResize = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  let t = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    t += 0.004;
    pts.rotation.y = t * 0.15;
    pts.rotation.x = t * 0.06;
    renderer.render(scene, camera);
  };
  animate();
}

/* ============================================================
   GSAP SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {

  /* ── Scroll Zoom — küçük pencereden tam ekrana ── */
  const zoomSection   = document.getElementById('zoomSection');
  const zoomContainer = document.getElementById('zoomContainer');
  if (zoomSection && zoomContainer) {
    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#zoomSection',
        start: 'top top',
        end: '+=260%',
        pin: true,
        scrub: 1.6,
        pinSpacing: true,
        anticipatePin: 1,
      }
    });

    /* HUD öğeleri önce solar */
    zoomTl.to('.zoom-chrome', {
      opacity: 0,
      ease: 'none',
      duration: 0.22,
    });

    /* Konteyner tam ekrana açılır */
    zoomTl.to('#zoomContainer', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      borderColor: 'rgba(0,0,0,0)',
      boxShadow: 'none',
      ease: 'none',
      duration: 1,
    }, 0);

    /* Header: zoom sırasında gizle, çıkışta geri getir */
    ScrollTrigger.create({
      trigger: '#zoomSection',
      start: 'top top',
      end: '+=260%',
      onEnter:     () => gsap.to('#header', { opacity: 0, duration: 0.35, ease: 'power2.in' }),
      onLeave:     () => gsap.to('#header', { opacity: 1, duration: 0.45, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to('#header', { opacity: 1, duration: 0.35, ease: 'power2.out' }),
      onEnterBack: () => gsap.to('#header', { opacity: 0, duration: 0.35, ease: 'power2.in' }),
    });
  }

  /* Mission statement text scramble-in */
  const missionTitle = document.querySelector('.mission-stmt__title');
  if (missionTitle) {
    gsap.from(missionTitle, {
      scrollTrigger: { trigger: missionTitle, start: 'top 80%' },
      opacity: 0, y: 40, duration: 1.1, ease: 'power3.out'
    });
  }

  /* Platform cards stagger */
  gsap.from('.platform-card', {
    scrollTrigger: { trigger: '.platform-grid', start: 'top 78%' },
    opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power3.out'
  });

  /* Fleet cards stagger */
  gsap.from('.fleet-card', {
    scrollTrigger: { trigger: '.fleet-grid', start: 'top 78%' },
    opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: 'power3.out'
  });

  /* Stat cards stagger */
  gsap.from('.stat-card', {
    scrollTrigger: { trigger: '.stats-grid', start: 'top 78%' },
    opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out'
  });

  /* AI core content slide-in from left */
  gsap.from('.ai-core__content', {
    scrollTrigger: { trigger: '.ai-core__inner', start: 'top 75%' },
    opacity: 0, x: -50, duration: 1.1, ease: 'power3.out'
  });

  /* Tac board slide-in from right */
  gsap.from('.tac-board', {
    scrollTrigger: { trigger: '.ai-core__inner', start: 'top 75%' },
    opacity: 0, x: 50, duration: 1.1, ease: 'power3.out'
  });

  /* UMAY media parallax */
  gsap.to('.umay__media', {
    scrollTrigger: {
      trigger: '.umay',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: -40
  });

  /* Capability bars — CSS transition triggered by IntersectionObserver in DOMContentLoaded */

  /* CTA closing title */
  const ctaTitle = document.querySelector('.cta-closing__title');
  if (ctaTitle) {
    gsap.from(ctaTitle, {
      scrollTrigger: { trigger: ctaTitle, start: 'top 80%' },
      opacity: 0, y: 40, duration: 1, ease: 'power3.out'
    });
  }

  /* Horizontal marquee speed boost on scroll */
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    const track = document.querySelector('.marquee__track');
    if (track) {
      const boost = Math.max(10, 32 - Math.abs(delta) * 0.5);
      track.style.animationDuration = boost + 's';
    }
  }, { passive: true });
}
