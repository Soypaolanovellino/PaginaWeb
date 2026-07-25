/* ============================================================
   work.js — página WORK
   - Genera los paneles a partir de PROJECTS (js/data.js).
   - Desktop (≥768px): scroll horizontal; la rueda vertical del
     mouse/trackpad pagina los proyectos (un gesto = un proyecto)
     y el scroll-snap del CSS alinea los gestos nativos.
   - Móvil (<768px): lista VERTICAL con scroll normal de la
     página, sin overlay (la info va debajo de cada imagen) y un
     solo tap navega directo (PDFs versión teléfono).
   ============================================================ */

(function () {
  const track = document.getElementById('work-track');
  if (!track) return;

  /* ---------- Render de paneles desde los datos ---------- */
  PROJECTS.forEach((p) => {
    const panel = document.createElement('a');
    panel.className = 'work-panel';
    /* El proyecto va en ?p= y TAMBIÉN en #hash: si algún servidor o
       un redirect 301 cacheado por el navegador se come el query
       string, el fragmento sobrevive siempre y project.js lo usa de
       respaldo — ningún proyecto vuelve a caer en NU. */
    panel.href = 'project.html?p=' + p.slug + '#' + p.slug;
    panel.setAttribute('aria-label', p.title + ' — ' + p.type);
    // Si aún no hay portada en la carpeta, se omite el <img> y queda
    // el bloque gris del placeholder (.ph) — sin icono de imagen rota.
    const cover = p.cover ? '<img src="' + p.cover + '" alt="" loading="lazy">' : '';
    const subtitle = p.subtitle
      ? '  <span class="project-subtitle">' + p.subtitle + '</span>'
      : '';
    panel.innerHTML =
      '<figure class="ph">' + cover + '</figure>' +
      '<div class="work-overlay">' +
      '  <span class="project-title">' + p.title + '</span>' +
      subtitle +
      '  <span class="project-type label">' + p.type + '</span>' +
      '  <p class="project-blurb">' + p.tagline + '</p>' +
      '</div>';
    track.appendChild(panel);
  });
  hydrateImages(track);

  const panels = Array.from(track.children);
  const counter = document.getElementById('work-current');
  const total = document.getElementById('work-total');
  if (total) total.textContent = String(PROJECTS.length).padStart(2, '0');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* En móvil el track es una lista vertical sin scroll propio: toda la
     lógica de paginación horizontal se desactiva. */
  const desktop = window.matchMedia('(min-width: 768px)');
  let index = 0;

  function updateCounter() {
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
  }

  /* Desplaza al panel i usando su offset REAL (offsetLeft), que es
     exactamente el punto de snap del CSS. Antes se usaba
     index * clientWidth, que con anchos fraccionarios no coincide
     con los offsets reales y dejaba el destino fuera del punto de
     snap (proyecto a medias). */
  function goTo(i, behavior) {
    index = Math.max(0, Math.min(panels.length - 1, i));
    track.scrollTo({
      left: panels[index].offsetLeft,
      behavior: behavior || (reduced ? 'auto' : 'smooth'),
    });
    updateCounter();
  }

  /* ---------- Rueda vertical → paginación horizontal (desktop) ------
     preventDefault: el scroll por rueda es 100% del JS (el snap del
     CSS ni interviene), y como goTo apunta a offsets exactos de snap
     no hay pelea entre ambos. */
  let accumulated = 0;
  let lockUntil = 0; // evita saltar varios proyectos por un solo gesto

  track.addEventListener(
    'wheel',
    (e) => {
      if (!desktop.matches) return; // móvil: scroll vertical nativo
      e.preventDefault();
      const now = Date.now();
      if (now < lockUntil) return;

      // usa el eje dominante del gesto (rueda o trackpad)
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accumulated += delta;

      if (Math.abs(accumulated) > 40) {
        goTo(index + (accumulated > 0 ? 1 : -1));
        accumulated = 0;
        lockUntil = now + 750;
      }
    },
    { passive: false }
  );

  /* Teclado: flechas izquierda/derecha (solo desktop) */
  window.addEventListener('keydown', (e) => {
    if (!desktop.matches) return;
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  });

  /* Scroll nativo (arrastre táctil en pantallas híbridas, etc.):
     la alineación la hace SOLO el scroll-snap del CSS; aquí
     únicamente se actualiza el contador. OJO: este handler antes
     relanzaba un scrollTo suave "correctivo" que competía con la
     animación de snap del navegador — se cancelaban mutuamente y el
     scroll quedaba a mitad de camino. No reintroducir. */
  let scrollTimer;
  track.addEventListener(
    'scroll',
    () => {
      if (!desktop.matches) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        index = Math.max(
          0,
          Math.min(panels.length - 1, Math.round(track.scrollLeft / track.clientWidth))
        );
        updateCounter();
      }, 120);
    },
    { passive: true }
  );

  /* Al cambiar el ancho de la ventana los offsets se mueven:
     reencuadra el proyecto actual sin animación. */
  window.addEventListener('resize', () => {
    if (desktop.matches) goTo(index, 'auto');
  });

  /* ---------- Revelado del overlay rosado ----------
     El recuadro es pequeño y centrado, así que en desktop basta el
     :hover real SOBRE el cuadro (lo maneja el CSS: .work-overlay:hover).
     En táctil ANCHO (tablet): primer tap revela, segundo tap navega.
     En MÓVIL no hay overlay (la info va debajo de la imagen): un solo
     tap navega directo al proyecto. */
  const touchOnly = window.matchMedia('(hover: none)').matches;
  if (touchOnly) {
    panels.forEach((panel) => {
      panel.addEventListener('click', (e) => {
        if (!desktop.matches) return; // móvil: el enlace navega directo
        if (!panel.classList.contains('is-revealed')) {
          e.preventDefault();
          panels.forEach((p) => p.classList.remove('is-revealed'));
          panel.classList.add('is-revealed');
        }
        // si ya estaba revelado, el click sigue el enlace normalmente
      });
    });
  }

  updateCounter();
})();
