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

    /* Cinematic hangar → UAV → takeoff sequence — desktop + motion-ok
       only. Mobile / reduced-motion users get the static .cine-mobile
       fallback (see styles.css) and never pay the Three.js/pin cost.
       Must run BEFORE initScrollAnimations(): it pins #cine and inserts
       a large spacer into the document flow, and every ScrollTrigger
       created afterwards needs that spacer to already exist so its own
       start/end positions measure correctly. */
    const cineCanvas = document.getElementById('cineCanvas');
    const wantsCinematic = window.innerWidth > 900 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (cineCanvas && wantsCinematic && typeof THREE !== 'undefined') {
      initCinematicSequence(cineCanvas);
    }

    initScrollAnimations();
    ScrollTrigger.refresh();
  }

}); // end DOMContentLoaded

/* ============================================================
   UAV WIREFRAME BUILDER (nose points toward +Z)
   Shared by the cinematic hero sequence for the hero UAV and
   the dim parked silhouettes in the hangar background.
   ============================================================ */
function buildUAVWireframe(s, materials) {
  const g = new THREE.Group();
  const wM = () => {
    const m = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.05 });
    materials.push(m);
    return m;
  };
  const rM = () => {
    const m = new THREE.LineBasicMaterial({ color: 0xe11d2a, transparent: true, opacity: 0.05 });
    materials.push(m);
    return m;
  };
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

/* Generates a soft radial-gradient sprite texture — used to fake
   volumetric light beams / glow without a full postprocessing pipeline. */
function makeGlowTexture(hex) {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grad.addColorStop(0,   hex + 'e6');
  grad.addColorStop(0.4, hex + '55');
  grad.addColorStop(1,   hex + '00');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

/* ============================================================
   CINEMATIC SEQUENCE — Hangar → doors open → UAV reveal →
   orbit → runway transition → takeoff into sunrise.
   One scrubbed GSAP timeline drives every camera move, light
   change and UAV motion as a single continuous scroll-shot.
   ============================================================ */
function initCinematicSequence(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0x03060a, 0.05);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 3000);

  /* ── Ambient dust / atmosphere ── */
  const dustPos = new Float32Array(700 * 3);
  for (let i = 0; i < 700; i++) {
    dustPos[i*3]   = (Math.random()-0.5) * 220;
    dustPos[i*3+1] = Math.random() * 90 - 10;
    dustPos[i*3+2] = (Math.random()-0.5) * 260 - 60;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.5, transparent: true, opacity: 0.25, sizeAttenuation: true }));
  scene.add(dust);

  /* ── Hangar / runway floor grid ── */
  const grid = new THREE.GridHelper(520, 52, 0x00d4ff, 0x08202a);
  grid.position.y = -14;
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  scene.add(grid);

  /* ── Back wall of the hangar ── */
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(220, 90),
    new THREE.MeshBasicMaterial({ color: 0x040810, transparent: true, opacity: 0.2 })
  );
  backWall.position.set(0, 30, -95);
  scene.add(backWall);

  /* ── Hangar doors — two panels that slide open ── */
  const doorGeo = new THREE.BoxGeometry(30, 70, 2);
  const buildDoor = (x) => {
    // Wireframe only, no solid fill — reads as a door outline without
    // blocking the scene/video behind it with an opaque rectangle.
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(doorGeo), new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 }));
    edge.position.set(x, 25, -20);
    scene.add(edge);
    return edge;
  };
  const doorL = buildDoor(-15);
  const doorR = buildDoor(15);

  /* ── Light beam sprites through the door gap ── */
  const beamTex = makeGlowTexture('#00d4ff');
  const makeBeam = (x) => {
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: beamTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    spr.scale.set(26, 100, 1);
    spr.position.set(x, 30, -18);
    scene.add(spr);
    return spr;
  };
  const beamA = makeBeam(-4);
  const beamB = makeBeam(4);

  /* ── Rim glow behind the UAV ── */
  const rimGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: beamTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  rimGlow.scale.set(70, 70, 1);
  rimGlow.position.set(0, 10, -66);
  scene.add(rimGlow);

  /* ── Main UAV — dark wireframe until revealed ── */
  const uavMaterials = [];
  const mainUAV = buildUAVWireframe(1.6, uavMaterials);
  mainUAV.position.set(0, 9, -60);
  scene.add(mainUAV);

  /* ── Parked silhouettes deeper in the hangar (atmosphere only) ── */
  const bgMaterials = [];
  const bgUAV1 = buildUAVWireframe(0.5, bgMaterials);
  bgUAV1.position.set(-34, 4, -78);
  bgUAV1.rotation.y = 0.4;
  const bgUAV2 = buildUAVWireframe(0.4, bgMaterials);
  bgUAV2.position.set(30, 2, -85);
  bgUAV2.rotation.y = -0.5;
  scene.add(bgUAV1, bgUAV2);
  bgMaterials.forEach(m => { m.opacity = 0.14; });

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  /* ── Camera + UAV motion state — tweened directly by the
       scrubbed timeline, applied to the real objects every frame ── */
  const cam = { x: 0, y: 11, z: 150, lx: 0, ly: 24, lz: -20 };
  const uavMove = { x: 0, y: 9, z: -60, tilt: 0 };

  const altEl = document.getElementById('cineAlt');
  const spdEl = document.getElementById('cineSpd');

  /* ═══════════════════════════════════════════════════════
     MASTER SCRUBBED TIMELINE — one continuous cinematic shot
     ═══════════════════════════════════════════════════════ */
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '#cine',
      start: 'top top',
      end: '+=650%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate(self) {
        const p = self.progress;
        if (altEl) altEl.textContent = Math.round(p * p * 420) + ' M';
        if (spdEl) spdEl.textContent = Math.round(6 + p * 180) + ' KT';
      }
    }
  });

  // Stage 0 — hangar closed, title readable, ambient video fills the
  // otherwise-empty opening seconds until the Three.js scene takes over
  tl.to('.cine__scrollcue', { opacity: 0, duration: 5 }, 3);
  tl.to('.cine__content',   { opacity: 0, y: -30, duration: 6 }, 6);
  tl.to('.cine__bgvideo',   { opacity: 0, duration: 12 }, 6);

  // Stage 1 — doors open, fog disperses, beams appear, camera creeps forward
  tl.to(doorL.position, { x: -34, duration: 24 }, 8);
  tl.to(doorR.position, { x: 34,  duration: 24 }, 8);
  tl.to(fog,            { density: 0.006, duration: 26 }, 8);
  tl.to([beamA.material, beamB.material], { opacity: 0.55, duration: 14 }, 12);
  tl.to(cam,            { x: 0, y: 12, z: 92, lx: 0, ly: 14, lz: -55, duration: 24 }, 8);

  // Stage 2 — UAV illuminates into view
  tl.to(uavMaterials,     { opacity: 0.9, duration: 16 }, 27);
  tl.to(rimGlow.material, { opacity: 0.85, duration: 16 }, 27);
  tl.to(cam,              { x: 14, y: 10, z: 46, lx: 0, ly: 9, lz: -60, duration: 18 }, 28);
  tl.to([beamA.material, beamB.material], { opacity: 0.12, duration: 10 }, 34);

  // Stage 3 — orbit around the UAV + technical highlight callouts
  const orbitStart = 44, orbitEnd = 66, orbitSteps = 8, orbitR = 32;
  const orbitStep = (orbitEnd - orbitStart) / orbitSteps;
  for (let i = 0; i <= orbitSteps; i++) {
    const a = -0.9 + (i / orbitSteps) * 2.6;
    tl.to(cam, {
      x: Math.sin(a) * orbitR,
      y: 9 + Math.sin(i * 1.7) * 2.2,
      z: -60 + Math.cos(a) * orbitR,
      lx: 0, ly: 9, lz: -60,
      duration: orbitStep,
    }, orbitStart + i * orbitStep);
  }
  tl.to('#cineLabel1', { opacity: 1, duration: 2 }, 45);
  tl.to('#cineLabel1', { opacity: 0, duration: 2 }, 51);
  tl.to('#cineLabel2', { opacity: 1, duration: 2 }, 52);
  tl.to('#cineLabel2', { opacity: 0, duration: 2 }, 58);
  tl.to('#cineLabel3', { opacity: 1, duration: 2 }, 59);
  tl.to('#cineLabel3', { opacity: 0, duration: 2 }, 65);

  // Stage 4 — pull back to a wide runway shot, UAV taxis forward
  tl.to(cam,               { x: 0, y: 22, z: 130, lx: 0, ly: 12, lz: -30, duration: 16 }, 66);
  tl.to(uavMove,           { z: -18, duration: 14 }, 68);
  tl.to(fog.color,         { r: 0.06, g: 0.09, b: 0.14, duration: 16 }, 66);
  tl.to(backWall.material, { opacity: 0.08, duration: 14 }, 66);
  tl.to(grid.material,     { opacity: 0.1, duration: 14 }, 66);

  // Stage 5 — takeoff, sky turns to sunrise, final message
  tl.to(uavMove,     { y: 150, z: -230, tilt: -0.35, duration: 18 }, 82);
  tl.to(cam,         { x: 0, y: 60, z: 150, lx: 0, ly: 70, lz: -160, duration: 18 }, 82);
  tl.to('.cine__sky', { opacity: 1, duration: 18 }, 82);
  tl.to(fog,         { density: 0.0015, duration: 18 }, 82);
  tl.to('#cineFinal', { opacity: 1, duration: 8 }, 90);

  // Header uses the light site-wide theme — hide it for the length of
  // the dark cinematic pin so it doesn't clash, then bring it back
  // just before the sequence hands off to the rest of the page.
  tl.to('#header', { opacity: 0, duration: 2 }, 0);
  tl.to('#header', { opacity: 1, duration: 2 }, 96);

  /* ── Render loop — applies the tweened state every frame ── */
  let t = 0;
  const animate = () => {
    if (!document.getElementById('cineCanvas')) return;
    requestAnimationFrame(animate);
    t += 0.006;

    camera.position.set(cam.x, cam.y, cam.z);
    camera.lookAt(cam.lx, cam.ly, cam.lz);

    mainUAV.position.set(uavMove.x, uavMove.y, uavMove.z);
    mainUAV.rotation.x = uavMove.tilt;

    dust.rotation.y = t * 0.02;
    dust.rotation.x = t * 0.006;

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
