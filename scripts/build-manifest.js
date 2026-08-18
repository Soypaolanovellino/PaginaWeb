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

/* Carpetas cuyos nombres de archivo llevan el pie de foto (Home).
   El pie sale del nombre del archivo, así el runtime no parsea nada:
   solo lee CAPTIONS. */
const CAPTION_FOLDERS = ['home'];

/* Deriva el pie de dos líneas a partir del nombre del archivo:
     "<lugar> Photo by Paola Novellino(1).ext"
   - Línea 1: el texto ANTES del crédito (puede quedar vacío).
   - Línea 2: el crédito, SIEMPRE normalizado a "Photo by Paola
     Novellino" (los nombres traen erratas: "Phoyo by", "Novelino").
   El marcador de crédito se detecta de forma tolerante (Ph… by),
   y se quita el sufijo de copia final "(1)"/"(2)". `hasCredit`
   queda en false si el nombre no trae ningún "…by …" reconocible,
   para reportarlo sin inventar el crédito. */
const CREDIT = 'Photo by Paola Novellino';
function captionFromName(filename) {
  let base = filename.replace(/\.[^.]+$/, '');   // sin extensión
  base = base.replace(/\s*\(\d+\)\s*$/, '');     // sin sufijo de copia (1)
  const m = base.match(/^(.*?)\s*\bph[a-z]+\s+by\b.*$/i); // "…Ph..o by…"
  const line1 = (m ? m[1] : base).replace(/\s{2,}/g, ' ').trim();
  return { line1, line2: CREDIT, hasCredit: !!m };
}

const manifest = {};
const covers = {};
const captions = {};
const captionWarnings = [];
FOLDERS.forEach((folder) => {
  const images = listImages(folder);
  manifest[folder] = images;
  covers[folder] = pickCover(images);
  if (CAPTION_FOLDERS.includes(folder)) {
    images.forEach((src) => {
      const cap = captionFromName(path.basename(src));
      captions[src] = { line1: cap.line1, line2: cap.line2 };
      if (!cap.hasCredit) captionWarnings.push(path.basename(src));
    });
  }
});

// Se informa qué hay pendiente en _sin-asignar (no entra al sitio).
const pending = IGNORED.reduce((sum, f) => sum + listImages(f).length, 0);

const banner =
  '/* ============================================================\n' +
  '   images.js — MANIFIESTO GENERADO AUTOMÁTICAMENTE\n' +
  '   NO editar a mano. Se regenera con:\n' +
  '       node scripts/build-manifest.js\n' +
  '   Lista las imágenes de cada carpeta de images/ en orden\n' +
  '   alfabético (IMAGES), la portada de cada proyecto (COVERS):\n' +
  '   el archivo con "portada" en el nombre, o la 1ª si no hay, y\n' +
  '   los pies de foto del Home (CAPTIONS: ruta → {line1,line2}),\n' +
  '   derivados del nombre del archivo.\n' +
  '   ============================================================ */\n\n';

const body =
  'const IMAGES = ' + JSON.stringify(manifest, null, 2) + ';\n\n' +
  'const COVERS = ' + JSON.stringify(covers, null, 2) + ';\n\n' +
  'const CAPTIONS = ' + JSON.stringify(captions, null, 2) + ';\n';

fs.writeFileSync(OUTPUT, banner + body, 'utf8');

// Resumen legible en consola.
console.log('Manifiesto escrito en js/images.js');
FOLDERS.forEach((f) => {
  const cover = covers[f] ? path.basename(covers[f]) : '—';
  console.log(`  ${f}: ${manifest[f].length} imagen(es)  (portada: ${cover})`);
});
if (pending) console.log(`  (_sin-asignar: ${pending} sin repartir — no se publican)`);
if (captionWarnings.length) {
  console.log('  AVISO — sin crédito "Photo by" reconocible en:');
  captionWarnings.forEach((n) => console.log(`    · ${n}`));
}
