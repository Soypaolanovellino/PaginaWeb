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
    img.src = src;
    img.alt = i === 0 ? 'Paola Novellino' : '';
    if (i === 0) img.classList.add('is-current'); // la primera, visible
    img.addEventListener('load', () => figure.classList.add('is-loaded'));
    figure.appendChild(img);
    imgs.push(img);
  });

  // Con una sola imagen no hay slideshow: nada más que hacer.
  if (imgs.length < 2) return;

  function show(i) {
    if (i === current) return;
    imgs[current].classList.remove('is-current');
    imgs[i].classList.add('is-current');
    current = i;
  }
  function advance(dir) {
    show((current + dir + imgs.length) % imgs.length);
  }

  let timer;
  function restart() {
    clearInterval(timer);
    if (!reduced) timer = setInterval(() => advance(1), 5500);
  }

  figure.style.cursor = 'pointer';
  figure.addEventListener('click', () => { advance(1); restart(); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { advance(1); restart(); }
    if (e.key === 'ArrowLeft') { advance(-1); restart(); }
  });

  restart();
})();

hydrateImages();
