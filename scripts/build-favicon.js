/* ============================================================
   build-favicon.js — genera el favicon con la "P" del wordmark
   ------------------------------------------------------------
   El wordmark del sitio usa la fuente script Lady Suettaya
   (--font-script). Para que la pestaña del navegador muestre esa
   misma "P" sin depender de la fuente en el favicon, se EXTRAE el
   contorno del glifo "P" del .ttf con opentype.js y se escribe un
   favicon.svg con el path ya vectorizado. De ahí se rasterizan los
   PNG con sharp.

   Genera (en la raíz del sitio):
     - favicon.svg          vector, fondo transparente
     - favicon-32.png       32×32, transparente (fallback PNG)
     - apple-touch-icon.png 180×180, FONDO BLANCO (iOS ignora alfa)

   El glifo se escala para LLENAR el cuadro (los favicons son
   diminutos) y, como los trazos de la caligrafía son finísimos, se
   engrosan con un stroke del mismo color para que se lean a 32 px.
   Tinta = color del wordmark (--ink #1c1c1c).

   Uso:  node scripts/build-favicon.js   (o: npm run favicon)
   ============================================================ */

const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const FONT = path.join(ROOT, 'fonts', 'LadySuettaya.ttf');

const INK = '#1c1c1c';   // --ink, color del wordmark
const PAD = 4;           // margen dentro del cuadro de 100 (viewBox)
const STROKE = 5;        // engrosado (en unidades de viewBox) para 32 px

// 1) Contorno del glifo "P" a un tamaño de trabajo cómodo (1000 u).
const font = opentype.parse(fs.readFileSync(FONT).buffer);
const glyphPath = font.charToGlyph('P').getPath(0, 0, 1000);
const d = glyphPath.toPathData(2);
const bb = glyphPath.getBoundingBox();
const w = bb.x2 - bb.x1;
const h = bb.y2 - bb.y1;

// 2) Transform para meter el glifo en un viewBox 0 0 100 100.
//    Se ajusta por el lado MAYOR (aquí el ancho) para que llene el
//    cuadro; el menor se centra. El stroke se pasa a las unidades
//    locales del path (dividido por la escala) para que en pantalla
//    mida STROKE unidades de viewBox.
const avail = 100 - 2 * PAD;
const scale = avail / Math.max(w, h);
const tx = PAD + (avail - w * scale) / 2 - bb.x1 * scale;
const ty = PAD + (avail - h * scale) / 2 - bb.y1 * scale;
const strokeLocal = (STROKE / scale).toFixed(1);

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n' +
  '  <path transform="translate(' + tx.toFixed(2) + ' ' + ty.toFixed(2) +
  ') scale(' + scale.toFixed(4) + ')"\n' +
  '        d="' + d + '"\n' +
  '        fill="' + INK + '" stroke="' + INK + '" stroke-width="' + strokeLocal +
  '" stroke-linejoin="round" stroke-linecap="round"/>\n' +
  '</svg>\n';

fs.writeFileSync(path.join(ROOT, 'favicon.svg'), svg, 'utf8');

// 3) PNGs con sharp desde el mismo SVG.
(async () => {
  await sharp(Buffer.from(svg))
    .resize(32, 32)
    .png()
    .toFile(path.join(ROOT, 'favicon-32.png'));

  await sharp(Buffer.from(svg))
    .resize(180, 180)
    .flatten({ background: '#ffffff' }) // iOS no respeta transparencia
    .png()
    .toFile(path.join(ROOT, 'apple-touch-icon.png'));

  console.log('Favicon generado desde el glifo "P" de LadySuettaya.ttf:');
  console.log('  favicon.svg, favicon-32.png (32×32), apple-touch-icon.png (180×180)');
})();
