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

  /* ---------- Columna izquierda: información ----------
     `meta` admite campos variables por proyecto (se recorren las
     entradas tal cual, sin lista fija): p. ej. Dos son Multitud
     añade "Institution". */
  const metaRows = Object.entries(project.meta)
    .map(([key, value]) => '<dt class="label">' + key + '</dt><dd>' + value + '</dd>')
    .join('');

  // La descripción trae saltos "\n\n" entre párrafos: los separamos
  // en varios <p> para respetar el ritmo editorial del texto.
  const descriptionHtml = project.description
    .split(/\n\n+/)
    .map((para) => '<p>' + para.trim() + '</p>')
    .join('');

  // Subtítulo opcional (p. ej. "two are multitude" en Dos son Multitud)
  const subtitleHtml = project.subtitle
    ? '<p class="project-subtitle">' + project.subtitle + '</p>'
    : '';

  infoEl.innerHTML =
    '<h1>' + project.title + '</h1>' +
    subtitleHtml +
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

  /* En desktop el carrete tiene su propio scroll (con snap del CSS).
     Cuando la rueda ocurre SOBRE el carrete no intervenimos: scroll
     nativo + snap mandatory alinean solos. Cuando ocurre sobre la
     columna de texto, PAGINAMOS el carrete a la figura siguiente o
     anterior usando su offset REAL (offsetTop), que coincide con el
     punto de snap. OJO: antes aquí se hacía scrollTop += deltaY
     (scroll manual crudo), que dejaba el carrete en posiciones
     intermedias peleando con el snap — no reintroducir (lección de
     correcciones 07). */
  const desktop = window.matchMedia('(min-width: 768px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const figures = Array.from(carouselEl.children);

  /* scrollTop que deja la figura centrada en el carrete: es el mismo
     punto al que lleva el snap de CSS (scroll-snap-align: center). */
  function centeredTop(fig) {
    return fig.offsetTop - (carouselEl.clientHeight - fig.clientHeight) / 2;
  }

  /* Figura más cercana al encuadre actual. */
  function nearestFigure() {
    let best = 0;
    let bestDist = Infinity;
    figures.forEach((fig, n) => {
      const dist = Math.abs(centeredTop(fig) - carouselEl.scrollTop);
      if (dist < bestDist) { bestDist = dist; best = n; }
    });
    return best;
  }

  let accumulated = 0;
  let lockUntil = 0; // evita saltar varias fotos por un solo gesto

  window.addEventListener(
    'wheel',
    (e) => {
      if (!desktop.matches) return;
      if (carouselEl.contains(e.target)) return; // scroll nativo + snap CSS
      const now = Date.now();
      if (now < lockUntil) return;

      accumulated += e.deltaY;
      if (Math.abs(accumulated) > 40) {
        const target = Math.max(
          0,
          Math.min(figures.length - 1, nearestFigure() + (accumulated > 0 ? 1 : -1))
        );
        carouselEl.scrollTo({
          top: centeredTop(figures[target]),
          behavior: reduced ? 'auto' : 'smooth',
        });
        accumulated = 0;
        lockUntil = now + 600;
      }
    },
    { passive: true }
  );
})();
