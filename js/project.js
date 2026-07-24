/* ============================================================
   project.js — página individual de proyecto (plantilla única)
   La página se elige con el query param ?p=<slug>, por ejemplo
   project.html?p=nu. Todo el contenido sale de js/data.js.

   Dos diagramaciones (correcciones 11):
   - Desktop (≥768px): dos columnas — info a la izquierda, carrete
     de imágenes a la derecha — con UN SOLO scroll unificado (el
     contenedor .project) y snap de imágenes hecho por el CSS.
   - Móvil (<768px): una sola columna en el orden del PDF
     PW_NU_version_telefono: nombre → tipo → tagline → datos
     técnicos → imagen → párrafo → imagen → párrafo … → Next.
   Al cruzar el breakpoint se re-renderiza (evento raro; las
   imágenes salen de la caché del navegador).
   ============================================================ */

(function () {
  const infoEl = document.getElementById('project-info');
  const carouselEl = document.getElementById('project-carousel');
  if (!infoEl || !carouselEl) return;

  /* ---------- Resolver el proyecto desde la URL ---------- */
  const slug = new URLSearchParams(window.location.search).get('p');
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  document.title = project.title + ' — Paola Novellino';

  /* Enlace discreto al siguiente proyecto (cierra el recorrido) */
  const i = PROJECTS.indexOf(project);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  /* ---------- Piezas de contenido (comunes a ambos layouts) ----------
     `meta` admite campos variables por proyecto (se recorren las
     entradas tal cual, sin lista fija): p. ej. Dos son Multitud
     añade "Institution". */
  const titleHtml = '<h1>' + project.title + '</h1>';
  const subtitleHtml = project.subtitle
    ? '<p class="project-subtitle">' + project.subtitle + '</p>'
    : '';
  const typeHtml = '<p class="project-type label">' + project.type + '</p>';
  const taglineHtml = '<p class="project-tagline">' + project.tagline + '</p>';
  const metaHtml =
    '<dl class="project-meta">' +
    Object.entries(project.meta)
      .map(([key, value]) => '<dt class="label">' + key + '</dt><dd>' + value + '</dd>')
      .join('') +
    '</dl>';
  const nextHtml =
    '<a class="project-next label" href="project.html?p=' + next.slug + '">' +
    'Next — ' + next.title + '</a>';

  // La descripción trae saltos "\n\n" entre párrafos: cada uno se
  // envuelve en su <p> según el layout.
  const paragraphs = project.description.split(/\n\n+/).map((t) => t.trim());

  /* Figuras del carrete: las fotos reales o, si la carpeta aún está
     vacía, tres placeholders grises que conservan la composición. */
  const figures = project.images.length
    ? project.images.map(
        (src, n) =>
          '<figure class="ph"><img src="' + src + '" alt="' +
          project.title + ' — image ' + (n + 1) + '" loading="lazy"></figure>'
      )
    : [1, 2, 3].map(() => '<figure class="ph"></figure>');

  const desktopMQ = window.matchMedia('(min-width: 768px)');

  /* Si la columna de TEXTO resulta más larga que el carrete, su
     último elemento (el enlace Next) se convierte en punto de snap
     "end" (clase info-is-longest, ver CSS): así el final del texto
     es alcanzable aun con snap mandatory. Si el carrete es más
     largo no hace falta — su última imagen ya es el punto final — y
     se evita un punto de snap intermedio que dejaría imágenes a
     medias. Es un cálculo estático de layout: NO manipula el scroll
     (lección de correcciones 07/08). */
  function markLongestColumn() {
    if (!desktopMQ.matches) return;
    infoEl.classList.toggle(
      'info-is-longest',
      infoEl.offsetHeight > carouselEl.offsetHeight
    );
  }

  /* ---------- Desktop: info | carrete ---------- */
  function renderDesktop() {
    infoEl.innerHTML =
      titleHtml + subtitleHtml + typeHtml + taglineHtml +
      '<div class="project-description">' +
      paragraphs.map((t) => '<p>' + t + '</p>').join('') +
      '</div>' +
      metaHtml + nextHtml;
    carouselEl.innerHTML = figures.join('');
    hydrateImages(carouselEl);
    markLongestColumn();
  }

  /* ---------- Móvil: una columna, orden del PDF ---------- */
  function renderMobile() {
    infoEl.innerHTML = titleHtml + subtitleHtml + typeHtml + taglineHtml + metaHtml;
    // imagen → párrafo → imagen → párrafo…; lo que sobre de la lista
    // más larga sigue en orden, y cierra el enlace Next.
    const flow = [];
    const count = Math.max(figures.length, paragraphs.length);
    for (let n = 0; n < count; n++) {
      if (figures[n]) flow.push(figures[n]);
      if (paragraphs[n]) flow.push('<p class="project-paragraph">' + paragraphs[n] + '</p>');
    }
    carouselEl.innerHTML = flow.join('') + nextHtml;
    hydrateImages(carouselEl);
  }

  function render() {
    if (desktopMQ.matches) renderDesktop();
    else renderMobile();
  }

  render();
  desktopMQ.addEventListener('change', render);
  /* Las alturas dependen del viewport: al redimensionar puede
     cambiar cuál columna es la más larga. */
  window.addEventListener('resize', markLongestColumn);

  /* NOTA: aquí vivía la paginación por rueda del carrete (y antes un
     scrollTop += deltaY crudo). Con el scroll unificado sobra: la
     rueda en cualquier punto scrollea .project de forma nativa y el
     CSS hace el snap. No reintroducir JS de scroll. */
})();
