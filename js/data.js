/* ============================================================
   data.js — ÚNICA FUENTE DE DATOS DEL SITIO
   Para cambiar TEXTOS y DATOS de los proyectos, edita este
   archivo. Las IMÁGENES ya NO se listan aquí: se leen del
   manifiesto js/images.js (generado por scripts/build-manifest.js
   a partir de las carpetas dentro de images/). Ver README.
   ============================================================ */

/* Devuelve, para una carpeta de images/, la lista ordenada de
   rutas que haya en el manifiesto. Si el manifiesto aún no se ha
   generado o la carpeta está vacía, devuelve []. */
function folderImages(slug) {
  return (typeof IMAGES !== 'undefined' && Array.isArray(IMAGES[slug])) ? IMAGES[slug] : [];
}

/* Imágenes personales del Home: todas las de images/home/
   (crossfade lento entre ellas si hay varias). */
const HOME_IMAGES = folderImages('home');

/* Los 4 proyectos, en el orden en que aparecen en WORK.
   `cover` e `images` se derivan del manifiesto: la PRIMERA foto
   (orden alfabético) de la carpeta es la portada; el resto es el
   carrete vertical de la página del proyecto. */
const PROJECTS = [
  {
    slug: 'nu',
    title: 'NU',
    type: 'Skincare Retail Store',
    tagline:
      'Two ways of pursuing perfection: the wisdom of tradition and the precision of technology.',
    description:
      'Nu is a skincare retail concept inspired by the timeless elegance of traditional ' +
      'apothecaries and the refined atmosphere of Buly 1803. The project explores the ' +
      'evolution of skincare through two distinct yet complementary approaches.\n\n' +
      'The first space celebrates the heritage of skincare rituals. Warm wood, soft lighting, ' +
      'and natural materials create an environment that reflects craftsmanship, patience, and ' +
      'the sensory experience of self-care. Here, skincare is presented as a ritual rooted in ' +
      'tradition and human knowledge.\n\n' +
      'In contrast, the second space represents the contemporary world of scientific ' +
      'innovation. Concrete, glass, steel, and cool lighting establish a precise and clinical ' +
      'atmosphere where technology enhances the understanding and treatment of the skin ' +
      'through research, analysis, and advanced methodologies.\n\n' +
      'Rather than opposing these two worlds, Nu brings them together. The project proposes ' +
      'that the future of skincare lies in the balance between tradition and innovation, ' +
      'combining the emotional value of ritual with the transformative potential of ' +
      'technology. Through this dialogue, the space becomes a reflection of how skincare ' +
      'continues to evolve while remaining connected to its origins.',
    meta: {
      Location:
        'Second Avenue, Los Palos Grandes, between First and Second Cross Streets, Caracas, Venezuela.',
      Year: '2024',
      Program: 'Retail Skincare Store',
      Status: 'Proposal / Design Development',
      Client: 'Confidential',
      'Gross area': '100 sqm',
    },
    get cover() { return folderImages(this.slug)[0] || null; },
    get images() { return folderImages(this.slug).slice(1); },
  },
  {
    slug: 'cardinal',
    title: 'Cardinal',
    type: 'Residential Interior Design | Bedroom',
    tagline:
      'A contemporary interpretation of Parisian elegance through geometry, craftsmanship, and timeless luxury.',
    description:
      'Cardinal is a bedroom concept inspired by the urban structure of Paris and the ' +
      'geometric order that defines the city. The design takes its name from the cardinal ' +
      'points that organize the Parisian landscape and from the diagonal avenues that shape ' +
      'many of its most iconic perspectives.\n\n' +
      'These diagonals become a guiding principle throughout the project, influencing ' +
      'circulation and composition. Classical proportions are reinterpreted through a ' +
      'contemporary lens, creating a balance between tradition and modern living.\n\n' +
      'A refined palette of dark wood, soft stone, marble, and warm textures reinforces the ' +
      'sense of permanence and sophistication. Custom millwork, symmetrical compositions, and ' +
      'carefully crafted details evoke the atmosphere of a Parisian residence while ' +
      'maintaining a clean and contemporary aesthetic.\n\n' +
      'The result is a space that celebrates luxury not through excess, but through ' +
      'proportion, materiality, and timeless design.',
    meta: {
      Location:
        'Second Avenue, Los Palos Grandes, between First and Second Cross Streets, Caracas, Venezuela.',
      Year: '2023',
      Program: 'Residential Interior Design | Bedroom',
      Status: 'Proposal / Design Development',
      Client: 'Confidential',
      'Gross area': '100 sqm',
    },
    get cover() { return folderImages(this.slug)[0] || null; },
    get images() { return folderImages(this.slug).slice(1); },
  },
  {
    slug: 'yellow-butterflies',
    title: 'Yellow Butterflies',
    type: 'Nursery Interior Design',
    tagline:
      'A fairytale nursery inspired by the yellow butterflies that announce the arrival of spring in Caracas.',
    description:
      'Yellow Butterflies is a nursery designed to celebrate the arrival of a baby girl born ' +
      'during the season when Caracas fills with its iconic yellow butterflies. Inspired by ' +
      'this fleeting natural phenomenon, the project transforms the room into a delicate and ' +
      'dreamlike world where nature, imagination, and childhood come together.\n\n' +
      'Drawing from the imagery of classic fairy tales, the design embraces a timeless ' +
      'aesthetic through traditional detailing, soft forms, and carefully curated ' +
      'furnishings. A palette of pastel yellow and forest green creates a balance between ' +
      'warmth and serenity, evoking both the brightness of butterflies in flight and the ' +
      'richness of the surrounding landscape.\n\n' +
      'Every element of the space was selected to create an atmosphere of comfort, wonder, ' +
      'and permanence. Rather than following temporary trends, the room was conceived as a ' +
      'timeless environment that can grow alongside the child while preserving its sense of ' +
      'magic and innocence.\n\n' +
      'The result is a nursery that feels both elegant and enchanting, a space where ' +
      'childhood begins surrounded by beauty, imagination, and the quiet poetry of nature.',
    meta: {
      Location: 'La Castellana, Caracas, Venezuela.',
      Year: '2023',
      Program: 'Interior Design & Decoration',
      Status: 'Proposal / Completed',
      Client: 'Confidential',
      'Gross area': '10,45 sqm',
    },
    get cover() { return folderImages(this.slug)[0] || null; },
    get images() { return folderImages(this.slug).slice(1); },
  },
  {
    slug: 'harmonia',
    title: 'Harmonia',
    type: 'Workplace Interior Design',
    tagline: 'A workplace designed to inspire focus, well-being, and meaningful collaboration.',
    description:
      'Harmonia is an office design project created for a health insurance company, conceived ' +
      'as an alternative to the cold and impersonal environments often associated with ' +
      'corporate workplaces. The goal was to create a space that promotes well-being, ' +
      'creativity, and productivity while fostering a stronger connection between employees ' +
      'and their daily work.\n\n' +
      'The design is based on the idea that a workplace should support both concentration and ' +
      'human interaction. Warm materials such as wood are combined with glass, metal, ' +
      'textiles, and abundant vegetation to create an environment that feels welcoming, ' +
      'organized, and inspiring. Layered textures and natural elements soften the corporate ' +
      'atmosphere, encouraging employees to feel comfortable, motivated, and engaged ' +
      'throughout the day.\n\n' +
      'Drawing from both contemporary and industrial influences, the project balances ' +
      'openness and structure. Transparent partitions encourage collaboration while ' +
      'maintaining privacy, and the material palette introduces warmth without compromising ' +
      'professionalism.\n\n' +
      'The result is a workplace that prioritizes people as much as performance — a calm, ' +
      'flexible, and human-centered environment designed to improve the everyday experience ' +
      'of work.',
    meta: {
      Location: 'Av. Francisco de Miranda, Centro Plaza, Caracas, Venezuela.',
      Year: '2026',
      Program: 'Workplace Interior Design',
      Status: 'Proposal / Design Development',
      Client: 'Confidential',
      'Gross area': '124 sqm',
    },
    get cover() { return folderImages(this.slug)[0] || null; },
    get images() { return folderImages(this.slug).slice(1); },
  },
];
