/* ============================================================
   site.js — utilidades compartidas por todas las páginas
   1) Carga "tolerante" de imágenes: si el archivo existe, la
      imagen aparece con un fundido; si no existe todavía, se
      queda el bloque gris del placeholder (sin icono roto).
   2) Crossfade lento del home cuando hay varias imágenes.
   ============================================================ */

/* Observa todas las imágenes dentro de <figure class="ph">.
   Se puede llamar de nuevo tras inyectar contenido dinámico. */
function hydrateImages(root) {
  (root || document).querySelectorAll('.ph img').forEach((img) => {
    const fig = img.closest('.ph');
    const markLoaded = () => fig.classList.add('is-loaded');

    if (img.complete && img.naturalWidth > 0) {
      markLoaded(); // ya estaba en caché
    } else {
      img.addEventListener('load', markLoaded);
      // en error no hacemos nada: el gris del placeholder queda visible
      img.addEventListener('error', () => img.removeAttribute('alt'));
    }
  });
}

/* ---------- Home: imagen(es) personales ----------
   Si hay varias fotos en images/home/, se suceden con un fundido
   y un leve deslizamiento lateral (ver .home-figure en el CSS).
   Se puede avanzar con clic/tap sobre la imagen o con las flechas
   del teclado, y además avanzan solas de forma lenta y silenciosa.
   Adaptación discreta del home de opus-ark.fi. */
(function initHome() {
  const figure = document.getElementById('home-figure');
  if (!figure || typeof HOME_IMAGES === 'undefined' || !HOME_IMAGES.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const imgs = [];
  let current = 0;

  HOME_IMAGES.forEach((src, i) => {
    const img = document.createElement('img');
    // Los nombres del Home llevan espacios, comas y puntos: se
    // codifican para que la URL sea válida (encodeURI respeta "/").
    img.src = encodeURI(src);
    img.alt = i === 0 ? 'Paola Novellino' : '';
    if (i === 0) img.classList.add('is-current'); // la primera, visible
    img.addEventListener('load', () => figure.classList.add('is-loaded'));
    figure.appendChild(img);
    imgs.push(img);
  });

  /* ---------- Pie de foto (dos líneas, sale de CAPTIONS) ----------
     Centrado bajo el recuadro; cambia EN SINCRONÍA con la imagen.
     Si un archivo no tiene línea 1 (solo crédito), se muestra
     únicamente la línea del crédito. */
  const captionEl = document.getElementById('home-caption');
  const caps = typeof CAPTIONS !== 'undefined' ? CAPTIONS : {};
  function captionHtml(i) {
    const c = caps[HOME_IMAGES[i]];
    if (!c) return '';
    const l1 = c.line1 ? '<span class="cap-line">' + c.line1 + '</span>' : '';
    const l2 = c.line2 ? '<span class="cap-line">' + c.line2 + '</span>' : '';
    return l1 + l2;
  }
  function setCaption(i) {
    if (!captionEl) return;
    captionEl.innerHTML = captionHtml(i);
    captionEl.classList.add('is-visible');
  }
  setCaption(0); // pie inicial visible con la primera imagen

  // Con una sola imagen no hay carrusel; con reduced-motion tampoco
  // se anima (queda fija la primera imagen y su pie).
  if (imgs.length < 2 || reduced) return;

  // Carrusel automático: las imágenes van pasando solas dentro del
  // recuadro, sin botones ni controles. Cada N segundos avanza a la
  // siguiente (fundido + leve deslizamiento, definidos en el CSS).
  // El pie hace un fundido corto y cambia junto con la imagen para
  // que nunca quede un pie viejo con la foto nueva.
  setInterval(() => {
    imgs[current].classList.remove('is-current');
    if (captionEl) captionEl.classList.remove('is-visible'); // fade out
    const next = (current + 1) % imgs.length;
    current = next;
    imgs[current].classList.add('is-current');
    setTimeout(() => setCaption(next), 600); // cambia a mitad del fundido
  }, 4500);
})();

hydrateImages();
