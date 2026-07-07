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

/* ---------- Home: imagen(es) personales ---------- */
(function initHome() {
  const figure = document.getElementById('home-figure');
  if (!figure || typeof HOME_IMAGES === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loaded = [];

  HOME_IMAGES.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = i === 0 ? 'Paola Novellino' : '';
    img.addEventListener('load', () => {
      figure.classList.add('is-loaded');
      loaded.push(img);
      if (loaded.length > 1) img.style.opacity = '0'; // solo la primera visible
    });
    figure.appendChild(img);
  });

  /* Si hay más de una imagen cargada, alterna con un fundido
     muy lento; con reduced-motion no se anima nada. */
  if (!reduced) {
    let current = 0;
    setInterval(() => {
      if (loaded.length < 2) return;
      loaded[current].style.opacity = '0';
      current = (current + 1) % loaded.length;
      loaded[current].style.opacity = '1';
    }, 6000);
  }
})();

hydrateImages();
