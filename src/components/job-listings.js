import { jobs } from '../data/jobs.js';

/**
 * Açık pozisyonlar — akordiyon liste. Başlığa tıklayınca detaylar (görev
 * tanımı + aranan nitelikler) açılır/kapanır. "Bu Pozisyona Başvur"
 * butonu CV formuna kaydırır ve pozisyonu otomatik seçer.
 */
export function renderJobListings(container) {
  container.innerHTML = `
    <section class="jobs-panel reveal" id="jobs-panel" aria-labelledby="jobs-panel-title">
      <div class="jobs-panel-inner">
        <div class="eyebrow-tag">
          <span class="eyebrow-tag-dot" aria-hidden="true"></span>
          AÇIK POZİSYONLAR
        </div>
        <h2 class="jobs-panel-title" id="jobs-panel-title">Kariyer</h2>
        <p class="jobs-panel-lead">Sahadaki ihtiyacı gerçek çözüme dönüştüren ekibe katıl.</p>

        <div class="jobs-list">
          ${jobs
            .map(
              (job, i) => `
            <article class="job-card" data-job-card>
              <button class="job-card-head" data-job-toggle aria-expanded="false" aria-controls="job-body-${job.id}">
                <span class="job-card-index">0${i + 1}</span>
                <span class="job-card-heading">
                  <span class="job-card-title">${job.title}</span>
                  <span class="job-card-meta">${job.location} · ${job.type}</span>
                </span>
                <span class="job-card-chevron" aria-hidden="true">+</span>
              </button>

              <div class="job-card-summary">${job.summary}</div>

              <div class="job-card-body" id="job-body-${job.id}" data-job-body>
                <div class="job-card-body-inner">
                  <p class="job-card-desc">${job.description}</p>
                  <div class="job-card-reqs">
                    <span class="uav-detail-label">Aranan Nitelikler</span>
                    <ul>
                      ${job.requirements.map((r) => `<li>${r}</li>`).join('')}
                    </ul>
                  </div>
                  <button class="job-apply-btn" type="button" data-job-apply="${job.id}" data-job-title="${job.title}">
                    Bu Pozisyona Başvur <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `;

  initJobListings(container);
}

function initJobListings(container) {
  container.querySelectorAll('[data-job-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-job-card]');
      const isOpen = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  container.querySelectorAll('[data-job-apply]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const select = document.querySelector('[data-cv-position]');
      if (select) select.value = btn.dataset.jobTitle;
      document.getElementById('cv-form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelector('[data-cv-name]')?.focus({ preventScroll: true });
    });
  });
}
