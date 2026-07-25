/* ============================================================
   dev-server.js — servidor local de desarrollo (sin dependencias)
   ------------------------------------------------------------
   Uso:  node scripts/dev-server.js   (o: npm run dev)
   Sirve el sitio en http://localhost:3000 con dos garantías que
   `npx serve` no cumple a la vez:
     1) NUNCA redirige (el ?p=<slug> de project.html se conserva
        siempre; un redirect de "clean URLs" lo tiraba y todos los
        proyectos caían en NU).
     2) Acepta también las URLs sin .html (/work, /project?p=nu),
        sirviéndolas de forma interna, por si quedaron en el
        historial del navegador.
   En producción (Vercel, sin vercel.json) los enlaces del sitio
   usan .html directo y no hay redirects: mismo comportamiento.
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'font/ttf',
};

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch (e) {
      res.writeHead(400).end('Bad request');
      return;
    }
    if (pathname === '/') pathname = '/index.html';

    // Resolución segura dentro de la carpeta del sitio.
    let file = path.normalize(path.join(ROOT, pathname));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    // URL "limpia" sin extensión (/work, /project) → su .html,
    // servido de forma interna, SIN redirect (query intacto).
    if (!path.extname(file) && fs.existsSync(file + '.html')) file += '.html';

    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 — no existe ' + pathname);
      return;
    }

    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store', // dev: siempre la última versión
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log('Sitio local en http://localhost:' + PORT);
  });
