/* ============================================================
   data.js — ÚNICA FUENTE DE DATOS DEL SITIO
   Para agregar/quitar imágenes o cambiar textos, edita SOLO
   este archivo. Las páginas Work y Proyecto se generan a
   partir de estos objetos.
   ============================================================ */

/* Genera rutas "images/<slug>-1.jpg" ... "images/<slug>-N.jpg".
   Si un proyecto tiene más o menos fotos, cambia el número aquí
   (o reemplaza la llamada por un array explícito de rutas). */
function imageSeries(slug, count) {
  const list = [];
  for (let i = 1; i <= count; i++) list.push(`images/${slug}-${i}.jpg`);
  return list;
}

/* Imágenes personales del Home. Agrega más rutas si existen
   (p. ej. 'images/home-2.jpg'); si hay varias, el home hace un
   crossfade lento entre las que se logren cargar. */
const HOME_IMAGES = ['images/home-1.jpg'];

/* Los 4 proyectos, en el orden en que aparecen en WORK. */
const PROJECTS = [
  {
    slug: 'nu',
    title: 'NU',
    type: 'Residential interior',
    blurb: 'A quiet apartment conceived as a sequence of calm, light-filled rooms.',
    description:
      'NU explores restraint as a form of comfort. Natural materials, a reduced ' +
      'palette and carefully placed openings organise the daily rituals of its ' +
      'inhabitants, letting light — not objects — define each space. [PENDIENTE]',
    cover: 'images/nu-cover.jpg',
    images: imageSeries('nu', 6),
    meta: {
      Location: 'Caracas, Venezuela [PENDIENTE]',
      Year: '2024 [PENDIENTE]',
      Program: 'Residential [PENDIENTE]',
      Status: 'Completed [PENDIENTE]',
      Client: 'Private [PENDIENTE]',
      Area: '120 m² [PENDIENTE]',
    },
  },
  {
    slug: 'cardinal',
    title: 'Cardinal',
    type: 'Commercial interior',
    blurb: 'A retail space organised around a single axis of colour and light.',
    description:
      'Cardinal takes its name from the precise orientation of its main gesture: ' +
      'one continuous line that guides the visitor through the space. Materials ' +
      'remain neutral so that the products and the light become the protagonists. ' +
      '[PENDIENTE]',
    cover: 'images/cardinal-cover.jpg',
    images: imageSeries('cardinal', 6),
    meta: {
      Location: 'Caracas, Venezuela [PENDIENTE]',
      Year: '2024 [PENDIENTE]',
      Program: 'Retail [PENDIENTE]',
      Status: 'Completed [PENDIENTE]',
      Client: 'Private [PENDIENTE]',
      Area: '85 m² [PENDIENTE]',
    },
  },
  {
    slug: 'yellow-butterflies',
    title: 'Yellow Butterflies',
    type: 'Residential interior',
    blurb: 'A family home where colour appears only as small, deliberate accents.',
    description:
      'Yellow Butterflies is a house of white surfaces and warm wood, punctuated ' +
      'by brief moments of colour — like butterflies resting on a wall. The ' +
      'project balances openness for gathering with intimate corners for retreat. ' +
      '[PENDIENTE]',
    cover: 'images/yellow-butterflies-cover.jpg',
    images: imageSeries('yellow-butterflies', 6),
    meta: {
      Location: 'Caracas, Venezuela [PENDIENTE]',
      Year: '2023 [PENDIENTE]',
      Program: 'Residential [PENDIENTE]',
      Status: 'Completed [PENDIENTE]',
      Client: 'Private [PENDIENTE]',
      Area: '210 m² [PENDIENTE]',
    },
  },
  {
    slug: 'harmonia',
    title: 'Harmonia',
    type: 'Hospitality interior',
    blurb: 'An interior built on proportion, rhythm and the repetition of few elements.',
    description:
      'Harmonia searches for balance through repetition: a limited set of ' +
      'materials and a strict modular rhythm produce a space that feels both ' +
      'serene and precise. Nothing decorative — everything proportional. ' +
      '[PENDIENTE]',
    cover: 'images/harmonia-cover.jpg',
    images: imageSeries('harmonia', 6),
    meta: {
      Location: 'Caracas, Venezuela [PENDIENTE]',
      Year: '2023 [PENDIENTE]',
      Program: 'Hospitality [PENDIENTE]',
      Status: 'In progress [PENDIENTE]',
      Client: 'Private [PENDIENTE]',
      Area: '340 m² [PENDIENTE]',
    },
  },
];
