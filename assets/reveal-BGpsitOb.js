(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&o(t)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const n=[{label:"Ana Sayfa",href:"/"},{label:"İnsansız Araçlar",href:"/insansiz-araclar.html"},{label:"UMAY",href:"/umay.html"},{label:"Kariyer",href:"/kariyer.html"},{label:"İletişim",href:"/iletisim.html"}];function i(l){return n.map(a=>`<li><a class="${l}" href="${a.href}">${a.label}</a></li>`).join("")}function d(l){l.innerHTML=`
    <header class="site-header">
      <a href="/" class="brand">
        <img src="/images/logo.png" alt="Ascalon Dynamics logosu" class="brand-logo" />
        <span class="brand-name">ASCALON DYNAMICS</span>
      </a>

      <nav class="nav-desktop" aria-label="Ana menü">
        <ul>${i("nav-link")}</ul>
      </nav>

      <button class="hamburger" type="button" aria-label="Menüyü aç" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <div class="mobile-menu" id="mobile-menu">
      <nav aria-label="Mobil menü">
        <ul>${i("mobile-nav-link")}</ul>
      </nav>
    </div>
  `;const a=l.querySelector(".hamburger"),s=l.querySelector("#mobile-menu");function o(){s.classList.remove("is-open"),a.classList.remove("is-active"),a.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open")}function e(){const r=s.classList.toggle("is-open");a.classList.toggle("is-active",r),a.setAttribute("aria-expanded",String(r)),document.body.classList.toggle("menu-open",r)}a.addEventListener("click",e),s.querySelectorAll(".mobile-nav-link").forEach(r=>{r.addEventListener("click",o)})}const c=[{label:"Gizlilik Politikası",href:"#"},{label:"Çerez Politikası",href:"#"},{label:"Kullanım Koşulları",href:"#"},{label:"KVKK Aydınlatma Metni",href:"#"}];function u(l){l.innerHTML=`
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-col footer-brand">
          <a href="/" class="footer-brand-row">
            <img src="/images/logo.png" alt="Ascalon Dynamics logosu" class="footer-logo" />
            <span class="footer-brand-name">ASCALON DYNAMICS</span>
          </a>
          <p class="footer-tagline">Saha için otonom teknolojiler.</p>
          <p class="footer-location">Ankara, Türkiye</p>
        </div>

        <div class="footer-col">
          <h4>Hızlı Bağlantılar</h4>
          <ul>
            ${n.map(a=>`<li><a href="${a.href}">${a.label}</a></li>`).join("")}
          </ul>
        </div>

        <div class="footer-col">
          <h4>İletişim</h4>
          <ul>
            <li><a href="/iletisim.html">İletişim</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Yasal</h4>
          <ul>
            ${c.map(a=>`<li><a href="${a.href}">${a.label}</a></li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <hr class="footer-divider" />
        <p>© 2026 Ascalon Dynamics. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  `}function f(l=document){const a=l.querySelectorAll(".reveal");if(!a.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){a.forEach(e=>e.classList.add("reveal-visible"));return}const o=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add("reveal-visible"),o.unobserve(r.target))})},{threshold:.15,rootMargin:"0px 0px -40px 0px"});a.forEach(e=>o.observe(e))}export{u as a,f as i,d as r};
