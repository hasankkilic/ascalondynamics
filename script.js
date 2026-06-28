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
   THREE.JS HERO SCENE — Flying UAV wireframe
   ============================================================ */
function initHeroScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
  camera.position.set(0, 0, 80);

  scene.fog = new THREE.FogExp2(0xfafafa, 0.006);

  scene.add(new THREE.AmbientLight(0xd0e8f0, 1.4));
  const pointLight1 = new THREE.PointLight(0x0088aa, 2, 200);
  pointLight1.position.set(40, 20, 30);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0xe11d2a, 1.5, 150);
  pointLight2.position.set(-40, -20, 20);
  scene.add(pointLight2);

  /* ── Background star field ── */
  const starPositions = new Float32Array(2400 * 3);
  for (let i = 0; i < starPositions.length; i++) starPositions[i] = (Math.random() - 0.5) * 800;
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x1a2433, size: 0.5, transparent: true, opacity: 0.35, sizeAttenuation: true })));

  /* ── Cyan particle cloud ── */
  const partPos = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    partPos[i*3]   = (Math.random()-0.5)*200;
    partPos[i*3+1] = (Math.random()-0.5)*120;
    partPos[i*3+2] = (Math.random()-0.5)*100 - 20;
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({ color: 0x0088aa, size: 0.9, transparent: true, opacity: 0.4, sizeAttenuation: true }));
  scene.add(particles);

  /* ── Red accent particles ── */
  const redPos = new Float32Array(260 * 3);
  for (let i = 0; i < 260; i++) {
    redPos[i*3]   = (Math.random()-0.5)*160;
    redPos[i*3+1] = (Math.random()-0.5)*90;
    redPos[i*3+2] = (Math.random()-0.5)*60 - 10;
  }
  const redGeo = new THREE.BufferGeometry();
  redGeo.setAttribute('position', new THREE.BufferAttribute(redPos, 3));
  scene.add(new THREE.Points(redGeo, new THREE.PointsMaterial({ color: 0xe11d2a, size: 0.7, transparent: true, opacity: 0.35, sizeAttenuation: true })));

  /* ── Ground grid ── */
  const gridHelper = new THREE.GridHelper(400, 40, 0xc8d0da, 0xd8dde5);
  gridHelper.position.y = -30;
  scene.add(gridHelper);

  /* ── UAV wireframe builder (nose points toward +Z) ── */
  function buildUAV(s) {
    const g = new THREE.Group();
    const wM = () => new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.7 });
    const rM = () => new THREE.LineBasicMaterial({ color: 0xe11d2a, transparent: true, opacity: 0.5 });

    const add = (geo, mat, px, py, pz, rx, ry, rz) => {
      const ls = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat());
      ls.position.set(px||0, py||0, pz||0);
      if (rx !== undefined) ls.rotation.set(rx, ry||0, rz||0);
      g.add(ls);
    };

    // Fuselage — tapered cylinder, narrow end at nose (+Z)
    add(new THREE.CylinderGeometry(0.9*s, 1.5*s, 22*s, 8), wM, 0, 0, 0, Math.PI/2);
    // Nose cone
    add(new THREE.ConeGeometry(0.9*s, 6*s, 8), wM, 0, 0, 14*s, Math.PI/2);
    // Main wings (span along X, chord along Z)
    add(new THREE.BoxGeometry(24*s, 0.22*s, 13*s), wM, 0, 0, -1*s);
    // Winglets at tips
    add(new THREE.BoxGeometry(0.22*s, 2.8*s, 2.5*s), wM,  12*s, 1*s, -6*s, 0, 0,  0.18);
    add(new THREE.BoxGeometry(0.22*s, 2.8*s, 2.5*s), wM, -12*s, 1*s, -6*s, 0, 0, -0.18);
    // V-tail fins
    add(new THREE.BoxGeometry(0.22*s, 4.5*s, 9*s), rM,  3.8*s, 2.2*s, -13*s,  0.38, 0,  0.1);
    add(new THREE.BoxGeometry(0.22*s, 4.5*s, 9*s), rM, -3.8*s, 2.2*s, -13*s, -0.38, 0, -0.1);
    // Engine pods under wings
    add(new THREE.CylinderGeometry(0.65*s, 0.9*s, 5.5*s, 8), wM,  7.5*s, -2*s, -1.5*s, Math.PI/2);
    add(new THREE.CylinderGeometry(0.65*s, 0.9*s, 5.5*s, 8), wM, -7.5*s, -2*s, -1.5*s, Math.PI/2);
    // Horizontal stabiliser (small rear wing)
    add(new THREE.BoxGeometry(10*s, 0.2*s, 5*s), wM, 0, 0.5*s, -13*s);

    return g;
  }

  /* ── Main drone ── */
  const mainUAV = buildUAV(1.3);
  scene.add(mainUAV);

  /* ── Contrail (trail particles) ── */
  const TRAIL_N = 70;
  const trailArr = new Float32Array(TRAIL_N * 3);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailArr, 3));
  const trailPts = new THREE.Points(trailGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.55, transparent: true, opacity: 0.38, sizeAttenuation: true }));
  scene.add(trailPts);
  const trailHist = [];

  /* ── Background drones — straight fly-bys ── */
  const bgDrones = [
    { uav: buildUAV(0.42), x:  115, y: 13,  z: -52, vx: -0.26 },
    { uav: buildUAV(0.3),  x: -115, y: -3,  z: -70, vx:  0.19 },
    { uav: buildUAV(0.36), x:  98,  y: 21,  z: -88, vx: -0.14 },
  ];
  bgDrones.forEach(d => {
    d.uav.position.set(d.x, d.y, d.z);
    d.uav.rotation.y = d.vx < 0 ? -Math.PI/2 : Math.PI/2;
    scene.add(d.uav);
  });

  /* ── Data stream lines ── */
  const lineMeshes = [];
  for (let i = 0; i < 8; i++) {
    const x0 = (Math.random()-0.5)*120, y0 = (Math.random()-0.5)*60, z0 = (Math.random()-0.5)*40 - 30;
    const lGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x0, y0, z0),
      new THREE.Vector3(x0+(Math.random()-0.5)*40, y0+(Math.random()-0.5)*30, z0+20)
    ]);
    const lMat = new THREE.LineBasicMaterial({ color: i%2===0 ? 0x0088aa : 0xe11d2a, transparent: true, opacity: 0.18 });
    scene.add(new THREE.Line(lGeo, lMat));
    lineMeshes.push({ mat: lMat, phase: Math.random()*Math.PI*2 });
  }

  /* ── Resize ── */
  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h); camera.aspect = w/h; camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  /* ── Mouse parallax ── */
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX/window.innerWidth - 0.5)*2;
    mouseY = (e.clientY/window.innerHeight - 0.5)*2;
  }, { passive: true });

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* ── Animate ── */
  let t = 0;
  const animate = () => {
    if (!document.getElementById('heroCanvas')) return;
    requestAnimationFrame(animate);
    t += 0.006;

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;
    camera.position.x = targetX * 12;
    camera.position.y = -targetY * 6 + 4;
    camera.lookAt(0, 6, 0);

    // Main drone: oval flight path
    const spd = 0.13, R = 34;
    const a = t * spd;
    mainUAV.position.x = Math.sin(a) * R;
    mainUAV.position.y = 8 + Math.sin(a * 2) * 3.5;
    mainUAV.position.z = -Math.cos(a) * 18 - 20;
    // Heading — atan2(vx, vz) makes +Z local axis face velocity
    const vx = Math.cos(a) * R;
    const vz = Math.sin(a) * 18;
    mainUAV.rotation.y = Math.atan2(vx, vz);
    // Bank into turns, pitch with mouse
    mainUAV.rotation.z = -Math.sin(a * 2) * 0.24;
    mainUAV.rotation.x = targetY * 0.07;

    // Contrail
    trailHist.unshift({ x: mainUAV.position.x, y: mainUAV.position.y - 0.8, z: mainUAV.position.z });
    if (trailHist.length > TRAIL_N) trailHist.pop();
    for (let i = 0; i < TRAIL_N; i++) {
      const p = trailHist[i] || trailHist[0] || { x:0, y:0, z:0 };
      trailArr[i*3] = p.x; trailArr[i*3+1] = p.y; trailArr[i*3+2] = p.z;
    }
    trailGeo.attributes.position.needsUpdate = true;

    // Background drones fly straight across
    bgDrones.forEach(d => {
      d.x += d.vx;
      if (d.x >  140) d.x = -140;
      if (d.x < -140) d.x =  140;
      d.uav.position.x = d.x;
      d.uav.rotation.y = d.vx < 0 ? -Math.PI/2 : Math.PI/2;
    });

    // Particle drift
    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.008;

    // Light cycle
    pointLight1.position.x = Math.sin(t * 0.4) * 50;
    pointLight1.position.y = Math.cos(t * 0.3) * 25;
    pointLight2.position.x = -Math.sin(t * 0.35) * 40;

    // Line flicker
    lineMeshes.forEach(l => { l.mat.opacity = 0.08 + 0.18*(0.5 + 0.5*Math.sin(t*2 + l.phase)); });

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

}
