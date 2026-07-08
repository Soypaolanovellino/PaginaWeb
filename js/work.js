/* ============================================================
   work.js — página WORK
   - Genera los 4 paneles a partir de PROJECTS (js/data.js).
   - Desktop: la rueda vertical del mouse/trackpad pagina los
     proyectos de forma horizontal (un gesto = un proyecto).
   - Móvil: swipe horizontal nativo con scroll-snap (CSS).
   - Táctil: primer tap muestra el overlay, segundo tap navega.
   ============================================================ */

(function () {
  const track = document.getElementById('work-track');
  if (!track) return;

  /* ---------- Render de paneles desde los datos ---------- */
  PROJECTS.forEach((p) => {
    const panel = document.createElement('a');
    panel.className = 'work-panel';
    panel.href = 'project.html?p=' + p.slug;
    panel.setAttribute('aria-label', p.title + ' — ' + p.type);
    // Si aún no hay portada en la carpeta, se omite el <img> y queda
    // el bloque gris del placeholder (.ph) — sin icono de imagen rota.
    const cover = p.cover ? '<img src="' + p.cover + '" alt="" loading="lazy">' : '';
    panel.innerHTML =
      '<figure class="ph">' + cover + '</figure>' +
      '<div class="work-overlay">' +
      '  <span class="project-title">' + p.title + '</span>' +
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
  let index = 0;

  function updateCounter() {
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
  }

  function goTo(i) {
    index = Math.max(0, Math.min(PROJECTS.length - 1, i));
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
    updateCounter();
  }

  /* ---------- Rueda vertical → paginación horizontal ---------- */
  let accumulated = 0;
  let lockUntil = 0; // evita saltar varios proyectos por un solo gesto

  track.addEventListener(
    'wheel',
    (e) => {
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

  /* Teclado: flechas izquierda/derecha */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  });

  /* Mantiene el índice sincronizado cuando se hace swipe táctil */
  let scrollTimer;
  track.addEventListener(
    'scroll',
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        index = Math.round(track.scrollLeft / track.clientWidth);
        updateCounter();
      }, 100);
    },
    { passive: true }
  );

  /* ---------- Revelado del overlay rosado ----------
     Cada panel ocupa toda la pantalla, así que el cursor casi
     siempre está "encima": un :hover puro dejaría la info siempre
     visible. Por eso, en desktop revelamos con el MOVIMIENTO del
     cursor y ocultamos cuando se detiene un momento o sale del
     panel — por defecto se ve solo la imagen. */
  const hoverCapable = window.matchMedia('(hover: hover)').matches;

  if (hoverCapable) {
    panels.forEach((panel) => {
      let idle;
      const reveal = () => {
        panel.classList.add('is-revealed');
        clearTimeout(idle);
        idle = setTimeout(() => panel.classList.remove('is-revealed'), 2500);
      };
      panel.addEventListener('mousemove', reveal);
      panel.addEventListener('mouseleave', () => {
        clearTimeout(idle);
        panel.classList.remove('is-revealed');
      });
    });
  } else {
    /* Táctil: primer tap revela, segundo tap navega. */
    panels.forEach((panel) => {
      panel.addEventListener('click', (e) => {
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
