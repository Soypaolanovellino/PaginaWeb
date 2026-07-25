/* ============================================================
   project.js — página individual de proyecto (plantilla única)
   La página se elige con el query param ?p=<slug>, por ejemplo
   project.html?p=nu. Todo el contenido sale de js/data.js.

   Dos diagramaciones (correcciones 11):
   - Desktop (≥768px): dos columnas — info FIJA (sticky) a la
     izquierda, carrete de imágenes deslizándose a la derecha — con
     UN SOLO scroll unificado (el contenedor .project) y snap de
     imágenes; sticky y snap los hace el CSS (correcciones 11 y 12).
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

  /* ---------- Resolver el proyecto desde la URL ----------
     Normalmente viene en ?p=<slug>. Como respaldo se acepta también
     #<slug>: algunos servidores con "clean URLs" (p. ej. `serve` en
     local) redirigen project.html?p=x → /project TIRANDO el query
     string, y sin parámetro todos los proyectos caían en el primero
     (NU). serve.json desactiva ese redirect en local; el hash
     sobrevive a cualquier redirect como segunda red. */
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('p') || window.location.hash.replace('#', '');
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
  // ?p= y #hash a la vez: el hash sobrevive a cualquier redirect que
  // pierda el query string (ver comentario en work.js).
  const nextHtml =
    '<a class="project-next label" href="project.html?p=' + next.slug +
    '#' + next.slug + '">' +
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

  /* ---------- Desktop: info fija (sticky) | carrete ---------- */
  function renderDesktop() {
    infoEl.innerHTML =
      titleHtml + subtitleHtml + typeHtml + taglineHtml +
      '<div class="project-description">' +
      paragraphs.map((t) => '<p>' + t + '</p>').join('') +
      '</div>' +
      metaHtml + nextHtml;
    carouselEl.innerHTML = figures.join('');
    hydrateImages(carouselEl);
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

  /* NOTA: aquí vivió la paginación por rueda del carrete (antes un
     scrollTop += deltaY crudo) y luego la medición de columnas de
     la corr. 11. Con el scroll unificado + info sticky (corr. 12)
     no queda NINGÚN JS de scroll ni de layout: la rueda scrollea
     .project de forma nativa y el CSS hace sticky y snap. No
     reintroducir. */
})();
