# Paola Novellino — Portafolio

Sitio estático (HTML + CSS + JavaScript vanilla, sin build step). Listo para
deployar en Vercel tal cual: `index.html` está en la raíz.

## Ver el sitio localmente

No requiere instalación: abre `index.html` directamente en el navegador.

Si prefieres un servidor local (recomendado para probar en el móvil):

```bash
npx serve .
# o
python -m http.server 8000
```

y abre `http://localhost:8000`.

## Imágenes — carpeta por proyecto

Cada proyecto carga **todas** las imágenes que existan en su subcarpeta dentro
de `images/`, ordenadas alfabéticamente. La estructura es:

```
images/
  home/                 imágenes personales del home (crossfade si hay varias)
  nu/                   fotos del proyecto NU
  yellow-butterflies/   proyecto "Yellow Butterfly" (slug histórico en plural)
  cardinal/
  harmonia/
  allegra/
  dos-son-multitud/
  _sin-asignar/         zona temporal de fotos aún no repartidas (no se publica)
```

Reglas:

- La **primera** imagen (orden alfabético) de cada carpeta es la **portada**
  que se ve en la página Work.
- El **resto** son el carrete vertical de la página del proyecto, en orden
  alfabético.
- Para **reordenar**, antepón un prefijo numérico al archivo: `01_foto.jpg`,
  `02_foto.jpg`, `03_foto.jpg`… El orden alfabético hace el resto.
- Mientras una carpeta esté vacía se muestra un bloque gris claro (placeholder
  elegante), sin iconos de imagen rota.

Como un sitio estático no puede listar carpetas desde el navegador, hay un
**manifiesto** (`js/images.js`) que lista las rutas. Se genera con un script y
lo consume `js/data.js`.

### Flujo para agregar/actualizar fotos

1. **(Opcional pero recomendado) Optimizar.** Copia los originales pesados a
   `images-raw/` (con las mismas subcarpetas: `images-raw/nu/`, etc.). Una sola
   vez instala la dependencia y luego corre el optimizador:

   ```bash
   npm install sharp          # una sola vez
   node scripts/optimize-images.js   # o: npm run optimize
   ```

   Lee de `images-raw/` y escribe las versiones listas para web en `images/`
   (máx. 2000 px por el lado mayor, JPG ~300–500 KB, orientación EXIF
   corregida y un aclarado suave de las fotos oscuras). **No toca los
   originales.** `images-raw/` está en `.gitignore`, así que no se sube al repo.

   Si ya tienes las fotos listas, puedes saltarte este paso y copiarlas
   directamente en la carpeta del proyecto dentro de `images/`.

2. **Generar el manifiesto** (obligatorio después de agregar, quitar o
   renombrar fotos):

   ```bash
   node scripts/build-manifest.js    # o: npm run manifest
   ```

3. **Publicar:**

   ```bash
   git add -A && git commit -m "Fotos de proyectos" && git push
   ```

## Cambiar los textos de los proyectos

Los **textos y datos** viven en **`js/data.js`** (las imágenes ya no, esas
salen del manifiesto):

- `title`, `type`: nombre y tipo de proyecto.
- `tagline`: frase corta (se usa en el overlay rosado de Work y bajo el título
  del proyecto).
- `description`: descripción conceptual (separa párrafos con una línea en
  blanco `\n\n`).
- `meta`: ubicación, año, programa, estatus, cliente y metros cuadrados.

El texto biográfico y los contactos del About están directamente en
`about.html`. *(Pendiente: confirmar con Paola si el email es
`paolanovellino@` o `paolanovellinoid@` — hay un comentario `VERIFICAR EMAIL`
en `about.html`.)*

## Estructura

```
index.html      Home
about.html      About
work.html       Lista de proyectos (scroll horizontal)
project.html    Plantilla de proyecto (se elige con ?p=slug, ej. project.html?p=nu)
css/style.css   Estilos
js/data.js      ← Textos y datos de los proyectos (editar aquí)
js/images.js    Manifiesto de imágenes (GENERADO — no editar a mano)
js/site.js      Utilidades compartidas (placeholders, home)
js/work.js      Lógica de la página Work
js/project.js   Lógica de la página de proyecto
scripts/build-manifest.js   Genera js/images.js a partir de images/
scripts/optimize-images.js  Optimiza images-raw/ → images/ (usa sharp)
images/         Imágenes, una subcarpeta por proyecto
```
