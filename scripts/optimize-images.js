/* ============================================================
   optimize-images.js — deja las fotos listas para web
   ------------------------------------------------------------
   Lee los ORIGINALES desde images-raw/ y escribe versiones
   optimizadas en images/, respetando la misma estructura de
   subcarpetas y el mismo nombre de archivo (extensión .jpg).
   NUNCA toca ni sobrescribe los originales.

   Por cada imagen:
     - Corrige la orientación EXIF (fotos verticales de celular).
     - Redimensiona el lado mayor a un máx. de 2000 px (no agranda).
     - Aclara suavemente solo las fotos oscuras (sube sombras sin
       reventar los blancos), de forma condicionada al brillo medio.
     - Exporta JPG calidad ~82, apuntando a ~300–500 KB por imagen.
     - NO recorta (no cambia el encuadre).

   Uso (una sola vez):   npm install sharp
   Luego:                node scripts/optimize-images.js
   Después:              node scripts/build-manifest.js
   ============================================================ */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Falta la dependencia "sharp". Instálala una vez con:\n  npm install sharp');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'images-raw');
const OUT_DIR = path.join(ROOT, 'images');

const MAX_SIDE = 2000;          // lado mayor máximo (px)
const QUALITY = 82;             // calidad JPG inicial
const TARGET_MAX_KB = 500;      // objetivo superior por imagen
const MIN_QUALITY = 68;         // límite al recomprimir si pesa de más
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

if (!fs.existsSync(SRC_DIR)) {
  console.error(
    'No existe la carpeta images-raw/. Crea images-raw/ y copia ahí los\n' +
    'originales (con las mismas subcarpetas: nu/, cardinal/, home/, ...).'
  );
  process.exit(1);
}

/* Recorre images-raw/ recursivamente y devuelve rutas de imagen. */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (EXT.test(entry.name)) out.push(full);
  }
  return out;
}

/* Calcula un factor de brillo SUAVE en función de qué tan oscura
   está la imagen. Devuelve 1.0 (sin cambio) para fotos con
   exposición normal, y hasta ~1.18 para las muy subexpuestas. */
function brightnessFactor(meanLuma) {
  const THRESHOLD = 118; // por debajo de esto se considera "oscura"
  if (meanLuma >= THRESHOLD) return 1;
  const lift = (THRESHOLD - meanLuma) / 320; // pendiente suave
  return Math.min(1.18, 1 + lift);
}

async function optimize(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath);
  const relJpg = rel.replace(path.extname(rel), '.jpg');
  const outPath = path.join(OUT_DIR, relJpg);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  // 1) Orientación EXIF corregida antes de medir y redimensionar.
  const base = sharp(srcPath, { failOn: 'none' }).rotate();

  // 2) Brillo medio (canal luma) para decidir si aclarar.
  const stats = await base.clone().stats();
  const luma =
    stats.channels.length >= 3
      ? 0.2126 * stats.channels[0].mean +
        0.7152 * stats.channels[1].mean +
        0.0722 * stats.channels[2].mean
      : stats.channels[0].mean;
  const factor = brightnessFactor(luma);

  // 3) Pipeline: redimensionar (sin agrandar) + aclarado condicional.
  let pipe = base.resize({
    width: MAX_SIDE,
    height: MAX_SIDE,
    fit: 'inside',
    withoutEnlargement: true,
  });
  if (factor > 1) {
    // modulate sube el brillo de forma global y suave; combinado con
    // un gamma leve levanta sombras sin quemar los blancos.
    pipe = pipe.gamma(1.05).modulate({ brightness: factor });
  }

  // 4) Exportar JPG; si supera el objetivo, recomprimir una vez.
  let quality = QUALITY;
  let buf = await pipe.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
  while (buf.length / 1024 > TARGET_MAX_KB && quality > MIN_QUALITY) {
    quality -= 6;
    buf = await pipe.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
  }
  fs.writeFileSync(outPath, buf);

  const kb = Math.round(buf.length / 1024);
  const lit = factor > 1 ? ` +luz(${factor.toFixed(2)})` : '';
  console.log(`  ${rel} → ${relJpg}  ${kb} KB  q${quality}${lit}`);
}

(async function run() {
  const files = walk(SRC_DIR);
  if (!files.length) {
    console.log('images-raw/ está vacía: no hay nada que optimizar.');
    return;
  }
  console.log(`Optimizando ${files.length} imagen(es) de images-raw/ → images/ ...`);
  for (const f of files) {
    try {
      await optimize(f);
    } catch (err) {
      console.error(`  ERROR con ${path.relative(SRC_DIR, f)}: ${err.message}`);
    }
  }
  console.log('Listo. Ahora corre:  node scripts/build-manifest.js');
})();
