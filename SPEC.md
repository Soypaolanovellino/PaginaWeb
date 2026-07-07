# SPEC — Portafolio Paola Novellino

## Objetivo
Portafolio visual, editorial y minimalista para Paola Novellino (diseño de interiores). La experiencia debe sentirse como una galería privada: mucho espacio en blanco, tipografía pequeña, navegación discreta, silenciosa. Las imágenes son las protagonistas; la información aparece de forma precisa y elegante. NO debe parecer una página comercial.

## Stack
- Sitio estático: HTML + CSS + JavaScript vanilla (sin frameworks, sin build step).
- Listo para deployar en Vercel tal cual (index.html en la raíz).
- Inicializa un repositorio git (`git init`) con un `.gitignore` apropiado y haz un commit inicial.
- Responsive: debe funcionar bien en móvil (las interacciones de hover deben tener equivalente táctil: primer tap muestra el overlay, segundo tap navega).

## Imágenes — IMPORTANTE
Las imágenes reales NO están disponibles todavía. Se agregarán después en la carpeta `/images` con estos nombres exactos. Usa placeholders elegantes (bloques gris muy claro, sin texto ruidoso) que se reemplacen automáticamente cuando existan los archivos:

```
images/
  home-1.jpg          (imagen personal del home; si hay varias: home-2.jpg, home-3.jpg)
  nu-cover.jpg        (portada del proyecto en WORK)
  nu-1.jpg ... nu-6.jpg
  cardinal-cover.jpg
  cardinal-1.jpg ... cardinal-6.jpg
  yellow-butterflies-cover.jpg
  yellow-butterflies-1.jpg ... yellow-butterflies-6.jpg
  harmonia-cover.jpg
  harmonia-1.jpg ... harmonia-6.jpg
```

Escribe el código de forma que agregar o quitar imágenes de un proyecto no requiera tocar más de un lugar (idealmente un pequeño objeto/array de datos en un solo archivo JS con los proyectos y sus imágenes).

## Estructura de páginas

### 1. Home (`index.html`)
- Nombre "Paola Novellino" prominente pero sobrio.
- Espacio central destinado a imagen(es) personales (`home-1.jpg`).
- Dos accesos discretos: **WORK** y **ABOUT**.

### 2. About (`about.html`)
- Página muy limpia y reducida.
- Texto biográfico en escala pequeña, casi como un detalle editorial que invite a acercarse:
  > Paola Novellino R. 1998, Caracas, Venezuela. Lives and works in Caracas.
- Contacto:
  - Email: Paolanovellino@gmail.com (mailto link)
  - Teléfono con link directo a WhatsApp: https://wa.me/584248722929
  - Instagram: @paolanovellinointeriors → https://instagram.com/paolanovellinointeriors
- Volver al home: clic en "Paola Novellino" y/o un pequeño "Back / Home" discreto.

### 3. Work (`work.html`)
- Lista de 4 proyectos, cada uno ocupando un bloque a pantalla completa: **NU, Cardinal, Yellow Butterflies, Harmonia** (en ese orden).
- El scroll del mouse/trackpad desplaza los proyectos de forma **horizontal** (scroll vertical del usuario → movimiento horizontal de los bloques). En móvil, swipe horizontal.
- Cada bloque muestra inicialmente solo la imagen de portada del proyecto.
- Al hacer hover sobre la imagen: overlay rosado (rosa suave, translúcido) y encima aparecen: nombre del proyecto, tipo de proyecto y una breve descripción.
- Cada proyecto es clickeable → navega a su página individual.

### 4. Página individual de proyecto (una por proyecto, o una plantilla con query param — elige lo más simple)
- "Paola Novellino" fijo como encabezado; clic sobre el nombre → vuelve al home.
- Composición dividida:
  - **Izquierda:** información del proyecto — título, descripción conceptual, y datos técnicos: ubicación, año, programa, estatus, cliente, metros cuadrados. (Usa datos placeholder razonables marcados claramente como `[PENDIENTE]` para que sea fácil reemplazarlos.)
  - **Derecha:** carousel/carrete **vertical** de imágenes del proyecto. Se recorre hacia arriba y abajo. Mientras se ve la imagen principal, deben verse parcialmente los bordes de la imagen anterior y la siguiente (continuidad visual).
- Las imágenes deben pasar visualmente **por debajo** del encabezado "Paola Novellino" (el texto es una capa fija encima del contenido; z-index del header sobre las imágenes, el header sin fondo sólido o con fondo transparente).

## Navegación (resumen)
- Home → About
- Home → Work
- Work → Proyecto individual
- Proyecto individual → Home (clic en "Paola Novellino")
- About → Home ("Paola Novellino" o botón discreto de regreso)

## Estética
- Minimalista, editorial. Mucho blanco. Tipografía pequeña y refinada (una serif editorial o una sans neutra elegante — elige con criterio y justifica).
- El único acento de color es el overlay rosado del hover en WORK.
- Transiciones suaves y sutiles; nada llamativo. Respeta `prefers-reduced-motion`.
- Sin sombras pesadas, sin bordes redondeados grandes, sin gradientes decorativos.

## Entregable
- Estructura de carpetas limpia, código comentado en los puntos clave (para poder explicarlo en la entrega de la universidad).
- Un `README.md` corto con: cómo ver el sitio localmente, cómo agregar las imágenes, y cómo cambiar los textos de los proyectos.
