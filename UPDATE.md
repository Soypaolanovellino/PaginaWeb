# UPDATE — Portafolio Paola Novellino (actualización sobre sitio existente)

## ⚠️ CONTEXTO — LEER PRIMERO
El sitio YA ESTÁ CONSTRUIDO y funcionando (HTML/CSS/JS vanilla, sin build step,
repo git ya inicializado). Este documento es una ACTUALIZACIÓN, NO una
reconstrucción. NO rehagas la arquitectura, NO cambies el stack, NO borres
páginas ni reescribas archivos completos si no hace falta. Haz cambios
quirúrgicos sobre lo que ya existe. Antes de tocar nada, lee los archivos
actuales (index.html, about.html, work.html, project.html, js/data.js,
js/work.js, js/project.js, js/site.js, css/style.css) para entender la
estructura vigente.

Al terminar, haz un commit con mensaje claro (p. ej. "Contenido real de
proyectos + sistema de imágenes por carpeta + script de optimización").

---

## TAREA 1 — Rellenar el contenido real de los 4 proyectos en js/data.js

Sustituye los textos y datos `[PENDIENTE]` por el contenido real de abajo.
Mantén la MISMA estructura de objetos que ya tiene data.js; solo cambia los
valores. Respeta tildes y mayúsculas. Los textos están en inglés a propósito
(el sitio es en inglés).

### Proyecto 1 — NU  (slug: `nu`)
- **title:** NU
- **type:** Skincare Retail Store
- **tagline:** Two ways of pursuing perfection: the wisdom of tradition and the precision of technology.
- **description (concepto):**
Nu is a skincare retail concept inspired by the timeless elegance of traditional apothecaries and the refined atmosphere of Buly 1803. The project explores the evolution of skincare through two distinct yet complementary approaches.

The first space celebrates the heritage of skincare rituals. Warm wood, soft lighting, and natural materials create an environment that reflects craftsmanship, patience, and the sensory experience of self-care. Here, skincare is presented as a ritual rooted in tradition and human knowledge.

In contrast, the second space represents the contemporary world of scientific innovation. Concrete, glass, steel, and cool lighting establish a precise and clinical atmosphere where technology enhances the understanding and treatment of the skin through research, analysis, and advanced methodologies.

Rather than opposing these two worlds, Nu brings them together. The project proposes that the future of skincare lies in the balance between tradition and innovation, combining the emotional value of ritual with the transformative potential of technology. Through this dialogue, the space becomes a reflection of how skincare continues to evolve while remaining connected to its origins.
- **Datos técnicos:**
  - Location: Second Avenue, Los Palos Grandes, between First and Second Cross Streets, Caracas, Venezuela.
  - Year: 2024
  - Program: Retail Skincare Store
  - Status: Proposal / Design Development
  - Client: Confidential
  - Gross area: 100 sqm

### Proyecto 2 — Cardinal  (slug: `cardinal`)
- **title:** Cardinal
- **type:** Residential Interior Design | Bedroom
- **tagline:** A contemporary interpretation of Parisian elegance through geometry, craftsmanship, and timeless luxury.
- **description (concepto):**
Cardinal is a bedroom concept inspired by the urban structure of Paris and the geometric order that defines the city. The design takes its name from the cardinal points that organize the Parisian landscape and from the diagonal avenues that shape many of its most iconic perspectives.

These diagonals become a guiding principle throughout the project, influencing circulation and composition. Classical proportions are reinterpreted through a contemporary lens, creating a balance between tradition and modern living.

A refined palette of dark wood, soft stone, marble, and warm textures reinforces the sense of permanence and sophistication. Custom millwork, symmetrical compositions, and carefully crafted details evoke the atmosphere of a Parisian residence while maintaining a clean and contemporary aesthetic.

The result is a space that celebrates luxury not through excess, but through proportion, materiality, and timeless design.
- **Datos técnicos:**
  - Location: Second Avenue, Los Palos Grandes, between First and Second Cross Streets, Caracas, Venezuela.
  - Year: 2023
  - Program: Residential Interior Design | Bedroom
  - Status: Proposal / Design Development
  - Client: Confidential
  - Gross area: 100 sqm

### Proyecto 3 — Yellow Butterflies  (slug: `yellow-butterflies`)
- **title:** Yellow Butterflies
- **type:** Nursery Interior Design
- **tagline:** A fairytale nursery inspired by the yellow butterflies that announce the arrival of spring in Caracas.
- **description (concepto):**
Yellow Butterflies is a nursery designed to celebrate the arrival of a baby girl born during the season when Caracas fills with its iconic yellow butterflies. Inspired by this fleeting natural phenomenon, the project transforms the room into a delicate and dreamlike world where nature, imagination, and childhood come together.

Drawing from the imagery of classic fairy tales, the design embraces a timeless aesthetic through traditional detailing, soft forms, and carefully curated furnishings. A palette of pastel yellow and forest green creates a balance between warmth and serenity, evoking both the brightness of butterflies in flight and the richness of the surrounding landscape.

Every element of the space was selected to create an atmosphere of comfort, wonder, and permanence. Rather than following temporary trends, the room was conceived as a timeless environment that can grow alongside the child while preserving its sense of magic and innocence.

The result is a nursery that feels both elegant and enchanting, a space where childhood begins surrounded by beauty, imagination, and the quiet poetry of nature.
- **Datos técnicos:**
  - Location: La Castellana, Caracas, Venezuela.
  - Year: 2023
  - Program: Interior Design & Decoration
  - Status: Proposal / Completed
  - Client: Confidential
  - Gross area: 10,45 sqm

### Proyecto 4 — Harmonia  (slug: `harmonia`)
- **title:** Harmonia
- **type:** Workplace Interior Design
- **tagline:** A workplace designed to inspire focus, well-being, and meaningful collaboration.
- **description (concepto):**
Harmonia is an office design project created for a health insurance company, conceived as an alternative to the cold and impersonal environments often associated with corporate workplaces. The goal was to create a space that promotes well-being, creativity, and productivity while fostering a stronger connection between employees and their daily work.

The design is based on the idea that a workplace should support both concentration and human interaction. Warm materials such as wood are combined with glass, metal, textiles, and abundant vegetation to create an environment that feels welcoming, organized, and inspiring. Layered textures and natural elements soften the corporate atmosphere, encouraging employees to feel comfortable, motivated, and engaged throughout the day.

Drawing from both contemporary and industrial influences, the project balances openness and structure. Transparent partitions encourage collaboration while maintaining privacy, and the material palette introduces warmth without compromising professionalism.

The result is a workplace that prioritizes people as much as performance — a calm, flexible, and human-centered environment designed to improve the everyday experience of work.
- **Datos técnicos:**
  - Location: Av. Francisco de Miranda, Centro Plaza, Caracas, Venezuela.
  - Year: 2026
  - Program: Workplace Interior Design
  - Status: Proposal / Design Development
  - Client: Confidential
  - Gross area: 124 sqm

### Nota sobre el email de contacto (About)
El PDF muestra el email como `paolanovellinoid@gmail.com` (con "id" antes de la
arroba), mientras que la primera versión usaba `paolanovellino@gmail.com`.
NO cambies nada todavía: deja el que ya está y marca con un comentario
`/* VERIFICAR EMAIL: ¿paolanovellino@ o paolanovellinoid@? */` para que el
usuario lo confirme. (Andrés: pregúntale a Paola cuál es el correcto.)

---

## TAREA 2 — Cambiar el sistema de imágenes a "carpeta por proyecto con orden automático"

Hoy las imágenes se referencian con nombres fijos (`nu-1.jpg`, etc.). Cámbialo
para que cada proyecto cargue TODAS las imágenes que existan en su subcarpeta,
ordenadas alfabéticamente por nombre de archivo. Estructura nueva:

```
images/
  home/                 → imágenes del home (crossfade si hay varias)
  nu/                   → todas las fotos del proyecto NU
  cardinal/
  yellow-butterflies/
  harmonia/
  _sin-asignar/         → zona temporal de fotos aún no repartidas
```

Requisitos:
- La PRIMERA imagen (orden alfabético) de cada carpeta es la portada (cover)
  que se usa en la página Work.
- El resto son el carrete vertical de la página de proyecto, en orden alfabético.
- Para reordenar, el usuario antepone un prefijo numérico al archivo:
  `01_foto.jpg`, `02_foto.jpg`… El orden alfabético hace el resto.
- Como en un sitio estático NO se puede listar una carpeta desde el navegador,
  genera un pequeño manifiesto: un script Node (`scripts/build-manifest.js`) que
  recorra `images/` y escriba `js/images.js` con un objeto
  `{ home:[...], nu:[...], cardinal:[...], ... }` con las rutas ordenadas.
  Documenta que hay que correr `node scripts/build-manifest.js` después de
  agregar o renombrar fotos. data.js debe consumir ese manifiesto en lugar de
  los nombres fijos.
- Mantén el comportamiento de placeholder elegante cuando una carpeta esté vacía
  (bloque gris claro, sin iconos rotos), tal como está hoy.
- Actualiza el README para explicar el flujo nuevo: (1) copiar fotos a la
  carpeta del proyecto, (2) correr el script del manifiesto, (3) git push.

Deja las 19 fotos actuales viviendo en `images/_sin-asignar/` de momento; el
manifiesto puede ignorar `_sin-asignar` o listarlo aparte, como prefieras, pero
que su presencia NO rompa el build.

---

## TAREA 3 — Script de optimización de fotos

Crea `scripts/optimize-images.js` (Node, usando la librería `sharp`) que procese
las fotos de `images/` para dejarlas listas para web. El script NO debe
sobrescribir los originales: que lea de una carpeta `images-raw/` y escriba el
resultado optimizado en `images/`.

El script debe, para cada imagen:
- Redimensionar el lado mayor a un máximo de 2000 px (sin agrandar las que ya
  sean menores).
- Convertir a JPG de calidad ~82 y comprimir a un objetivo aproximado de
  300–500 KB por imagen.
- Corregir orientación EXIF (muchas son verticales de celular).
- Aplicar una corrección de exposición SUAVE y automática para levantar sombras
  en las fotos muy oscuras (varias están muy subexpuestas). Que sea sutil y no
  reviente los blancos; si `sharp` lo permite de forma simple (p. ej. `normalise`
  o un pequeño ajuste gamma/brillo condicionado al brillo medio), úsalo con
  moderación. NO recortar (no cambiar el encuadre).
- Conservar el mismo nombre de archivo de entrada.

Documenta en el README: poner los originales en `images-raw/`, correr
`npm install sharp` una vez, luego `node scripts/optimize-images.js`, y después
`node scripts/build-manifest.js`. Añade `images-raw/` al `.gitignore` para no
subir los originales pesados al repo.

---

## RESUMEN DE ENTREGABLES
1. `js/data.js` con los textos y datos técnicos reales de los 4 proyectos + el
   comentario VERIFICAR EMAIL.
2. Sistema de imágenes por carpeta + `scripts/build-manifest.js` que genera
   `js/images.js`; data.js consumiéndolo.
3. `scripts/optimize-images.js` (sharp) para normalizar/comprimir/aclarar fotos.
4. Carpetas `images/{home,nu,cardinal,yellow-butterflies,harmonia,_sin-asignar}`
   creadas (con `.gitkeep` donde estén vacías).
5. README actualizado con los dos flujos (optimizar → manifiesto → push).
6. Commit final.

NO toques la estética, la navegación, el scroll horizontal de Work, el overlay
rosado ni el carrete vertical: todo eso ya funciona y debe quedar igual.
