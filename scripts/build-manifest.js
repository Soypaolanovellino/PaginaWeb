/* ============================================================
   build-manifest.js — genera js/images.js
   ------------------------------------------------------------
   Un sitio estático no puede listar carpetas desde el navegador,
   así que este script (Node) recorre images/ y escribe un
   manifiesto js/images.js con las rutas de cada proyecto,
   ordenadas alfabéticamente por nombre de archivo.

   Uso:
     node scripts/build-manifest.js
   Córrelo cada vez que agregues, quites o renombres fotos.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT = path.join(ROOT, 'js', 'images.js');

// Carpetas que consume el sitio (claves del manifiesto).
const FOLDERS = [
  'home',
  'nu',
  'yellow-butterflies', // el proyecto se llama "Yellow Butterfly"; slug histórico
  'cardinal',
  'dos-son-multitud',
];

// Carpeta temporal que NO se publica en el sitio.
const IGNORED = ['_sin-asignar'];

// Extensiones de imagen aceptadas.
const EXT = /\.(jpe?g|png|webp|avif)$/i;

/* Devuelve las rutas relativas (desde la raíz del sitio) de las
   imágenes de una carpeta, ordenadas alfabéticamente. */
function listImages(folder) {
  const dir = path.join(IMAGES_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `images/${folder}/${name}`);
}

/* Portada del proyecto (la foto que se ve en Work). Regla:
   - Si algún archivo tiene "portada" en el nombre, esa es la portada
     (aunque conserve su posición numérica dentro del carrete).
   - Si ninguno la tiene, la portada es la 1ª foto (comportamiento
     histórico). Devuelve null si la carpeta está vacía. */
function pickCover(images) {
  const explicit = images.find((src) => /portada/i.test(path.basename(src)));
  return explicit || images[0] || null;
}

const manifest = {};
const covers = {};
FOLDERS.forEach((folder) => {
  const images = listImages(folder);
  manifest[folder] = images;
  covers[folder] = pickCover(images);
});

// Se informa qué hay pendiente en _sin-asignar (no entra al sitio).
const pending = IGNORED.reduce((sum, f) => sum + listImages(f).length, 0);

const banner =
  '/* ============================================================\n' +
  '   images.js — MANIFIESTO GENERADO AUTOMÁTICAMENTE\n' +
  '   NO editar a mano. Se regenera con:\n' +
  '       node scripts/build-manifest.js\n' +
  '   Lista las imágenes de cada carpeta de images/ en orden\n' +
  '   alfabético (IMAGES) y la portada de cada proyecto (COVERS):\n' +
  '   el archivo con "portada" en el nombre, o la 1ª si no hay.\n' +
  '   ============================================================ */\n\n';

const body =
  'const IMAGES = ' + JSON.stringify(manifest, null, 2) + ';\n\n' +
  'const COVERS = ' + JSON.stringify(covers, null, 2) + ';\n';

fs.writeFileSync(OUTPUT, banner + body, 'utf8');

// Resumen legible en consola.
console.log('Manifiesto escrito en js/images.js');
FOLDERS.forEach((f) => {
  const cover = covers[f] ? path.basename(covers[f]) : '—';
  console.log(`  ${f}: ${manifest[f].length} imagen(es)  (portada: ${cover})`);
});
if (pending) console.log(`  (_sin-asignar: ${pending} sin repartir — no se publican)`);
