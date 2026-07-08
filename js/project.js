/* ============================================================
   project.js — página individual de proyecto (plantilla única)
   La página se elige con el query param ?p=<slug>, por ejemplo
   project.html?p=nu. Todo el contenido sale de js/data.js.
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

  /* ---------- Columna izquierda: información ---------- */
  const metaRows = Object.entries(project.meta)
    .map(([key, value]) => '<dt class="label">' + key + '</dt><dd>' + value + '</dd>')
    .join('');

  // La descripción trae saltos "\n\n" entre párrafos: los separamos
  // en varios <p> para respetar el ritmo editorial del texto.
  const descriptionHtml = project.description
    .split(/\n\n+/)
    .map((para) => '<p>' + para.trim() + '</p>')
    .join('');

  infoEl.innerHTML =
    '<h1>' + project.title + '</h1>' +
    '<p class="project-type label">' + project.type + '</p>' +
    '<p class="project-tagline">' + project.tagline + '</p>' +
    '<div class="project-description">' + descriptionHtml + '</div>' +
    '<dl class="project-meta">' + metaRows + '</dl>' +
    '<a class="project-next label" href="project.html?p=' + next.slug + '">' +
    'Next — ' + next.title + '</a>';

  /* ---------- Columna derecha: carrete vertical ----------
     Si la carpeta del proyecto aún no tiene fotos, mostramos unos
     bloques grises (placeholders) para conservar la composición. */
  const images = project.images;
  if (images.length) {
    images.forEach((src, n) => {
      const fig = document.createElement('figure');
      fig.className = 'ph';
      fig.innerHTML =
        '<img src="' + src + '" alt="' + project.title + ' — image ' + (n + 1) + '" loading="lazy">';
      carouselEl.appendChild(fig);
    });
  } else {
    for (let n = 0; n < 3; n++) {
      const fig = document.createElement('figure');
      fig.className = 'ph';
      carouselEl.appendChild(fig);
    }
  }
  hydrateImages(carouselEl);

  /* En desktop el carrete tiene su propio scroll; reenviamos la
     rueda cuando el cursor está sobre la columna de texto para
     que toda la página "recorra" las imágenes. */
  const desktop = window.matchMedia('(min-width: 768px)');
  window.addEventListener(
    'wheel',
    (e) => {
      if (!desktop.matches) return;
      if (carouselEl.contains(e.target)) return; // scroll nativo
      carouselEl.scrollTop += e.deltaY;
    },
    { passive: true }
  );
})();
