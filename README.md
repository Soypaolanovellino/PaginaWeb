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

## Agregar las imágenes

Copia los archivos JPG en la carpeta `images/` con estos nombres exactos:

```
images/
  home-1.jpg          (imagen personal del home; opcional: home-2.jpg, home-3.jpg…)
  nu-cover.jpg
  nu-1.jpg … nu-6.jpg
  cardinal-cover.jpg
  cardinal-1.jpg … cardinal-6.jpg
  yellow-butterflies-cover.jpg
  yellow-butterflies-1.jpg … yellow-butterflies-6.jpg
  harmonia-cover.jpg
  harmonia-1.jpg … harmonia-6.jpg
```

No hay que tocar código: mientras un archivo no exista se muestra un bloque
gris claro, y en cuanto exista la imagen aparece automáticamente.

- **Más imágenes del home:** agrega la ruta al array `HOME_IMAGES` en
  `js/data.js` (si hay varias, rotan con un fundido lento).
- **Más/menos fotos en un proyecto:** cambia el número en
  `imageSeries('slug', 6)` dentro de `js/data.js` (o usa un array explícito
  de rutas).

## Cambiar los textos de los proyectos

Todo el contenido vive en **`js/data.js`** (única fuente de datos):

- `title`, `type`: nombre y tipo de proyecto.
- `blurb`: texto corto del overlay rosado en WORK.
- `description`: descripción conceptual de la página del proyecto.
- `meta`: ubicación, año, programa, estatus, cliente y metros cuadrados.
  Los valores actuales están marcados con `[PENDIENTE]` — reemplázalos y
  borra la marca.

El texto biográfico y los contactos del About están directamente en
`about.html`.

## Estructura

```
index.html      Home
about.html      About
work.html       Lista de proyectos (scroll horizontal)
project.html    Plantilla de proyecto (se elige con ?p=slug, ej. project.html?p=nu)
css/style.css   Estilos
js/data.js      ← Datos de proyectos e imágenes (editar aquí)
js/site.js      Utilidades compartidas (placeholders, home)
js/work.js      Lógica de la página Work
js/project.js   Lógica de la página de proyecto
images/         Imágenes (se agregan después)
```
