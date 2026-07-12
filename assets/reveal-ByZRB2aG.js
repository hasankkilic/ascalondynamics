(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const f=[{label:"Ana Sayfa",labelEn:"Home",href:"/"},{label:"İnsansız Araçlar",labelEn:"Unmanned Vehicles",href:"/insansiz-araclar.html"},{label:"UMAY",labelEn:"UMAY",href:"/umay.html"},{label:"Kariyer",labelEn:"Careers",href:"/kariyer.html"},{label:"İletişim",labelEn:"Contact",href:"/iletisim.html"}],g="ascalon-lang";function c(){try{return localStorage.getItem(g)==="en"?"en":"tr"}catch{return"tr"}}function m(l){try{localStorage.setItem(g,l==="en"?"en":"tr")}catch{}window.location.reload()}const i=c()==="en",n=(l,e)=>i?e:l;function h(l=document){i&&(document.documentElement.lang="en",l.querySelectorAll("[data-en]").forEach(e=>{e.textContent=e.dataset.en}),l.querySelectorAll("meta[data-en-content]").forEach(e=>{e.setAttribute("content",e.dataset.enContent)}),l.querySelectorAll("[data-lang-tr]").forEach(e=>{e.hidden=!0}),l.querySelectorAll("[data-lang-en]").forEach(e=>{e.hidden=!1}))}function d(l){return f.map(e=>`<li><a class="${l}" href="${e.href}">${i?e.labelEn:e.label}</a></li>`).join("")}function u(l){const e=c();return`
    <div class="${l}" role="group" aria-label="${n("Dil seçimi","Language selection")}">
      <button type="button" class="lang-btn${e==="tr"?" is-active":""}" data-set-lang="tr" aria-pressed="${e==="tr"}">TR</button>
      <span class="lang-sep" aria-hidden="true">|</span>
      <button type="button" class="lang-btn${e==="en"?" is-active":""}" data-set-lang="en" aria-pressed="${e==="en"}">EN</button>
    </div>
  `}function p(l){l.innerHTML=`
    <header class="site-header">
      <a href="/" class="brand">
        <img src="/images/logo1-transparent.png" alt="${n("Ascalon Dynamics logosu","Ascalon Dynamics logo")}" class="brand-logo" />
        <span class="brand-name">ASCALON DYNAMICS</span>
      </a>

      <nav class="nav-desktop" aria-label="${n("Ana menü","Main menu")}">
        <ul>${d("nav-link")}</ul>
      </nav>

      ${u("lang-toggle lang-toggle--desktop")}

      <button class="hamburger" type="button" aria-label="${n("Menüyü aç","Open menu")}" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <div class="mobile-menu" id="mobile-menu">
      <nav aria-label="${n("Mobil menü","Mobile menu")}">
        <ul>${d("mobile-nav-link")}</ul>
      </nav>
      ${u("lang-toggle lang-toggle--mobile")}
    </div>
  `;const e=l.querySelector(".hamburger"),o=l.querySelector("#mobile-menu");function r(){o.classList.remove("is-open"),e.classList.remove("is-active"),e.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open")}function t(){const a=o.classList.toggle("is-open");e.classList.toggle("is-active",a),e.setAttribute("aria-expanded",String(a)),document.body.classList.toggle("menu-open",a)}e.addEventListener("click",t),o.querySelectorAll(".mobile-nav-link").forEach(a=>{a.addEventListener("click",r)}),l.querySelectorAll("[data-set-lang]").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.setLang;s!==c()&&m(s)})})}const b=[{label:"Gizlilik Politikası",labelEn:"Privacy Policy",href:"#"},{label:"Çerez Politikası",labelEn:"Cookie Policy",href:"#"},{label:"Kullanım Koşulları",labelEn:"Terms of Use",href:"#"},{label:"KVKK Aydınlatma Metni",labelEn:"Personal Data Protection Notice",href:"#"}];function v(l){l.innerHTML=`
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-col footer-brand">
          <a href="/" class="footer-brand-row">
            <img src="/images/logo.png" alt="${n("Ascalon Dynamics logosu","Ascalon Dynamics logo")}" class="footer-logo" />
            <span class="footer-brand-name">ASCALON DYNAMICS</span>
          </a>
          <p class="footer-tagline">${n("Saha için otonom teknolojiler.","Autonomous technologies for the field.")}</p>
          <p class="footer-location">${n("Ankara, Türkiye","Ankara, Türkiye")}</p>
        </div>

        <div class="footer-col">
          <h4>${n("Hızlı Bağlantılar","Quick Links")}</h4>
          <ul>
            ${f.map(e=>`<li><a href="${e.href}">${i?e.labelEn:e.label}</a></li>`).join("")}
          </ul>
        </div>

        <div class="footer-col">
          <h4>${n("İletişim","Contact")}</h4>
          <ul>
            <li><a href="/iletisim.html">${n("İletişim","Contact")}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${n("Yasal","Legal")}</h4>
          <ul>
            ${b.map(e=>`<li><a href="${e.href}">${i?e.labelEn:e.label}</a></li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <hr class="footer-divider" />
        <p>${n(`© ${new Date().getFullYear()} Ascalon Dynamics. Tüm hakları saklıdır.`,`© ${new Date().getFullYear()} Ascalon Dynamics. All rights reserved.`)}</p>
      </div>
    </footer>
  `}function y(l=document){const e=l.querySelectorAll(".reveal");if(!e.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(t=>t.classList.add("reveal-visible"));return}const r=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("reveal-visible"),r.unobserve(a.target))})},{threshold:.15,rootMargin:"0px 0px -40px 0px"});e.forEach(t=>r.observe(t))}export{v as a,h as b,i as c,y as i,p as r,n as t};
