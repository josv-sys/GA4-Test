/* Catálogo de Opeth Rules (precios ficticios para practicar e-commerce) */
window.OR = window.OR || {};

OR.CURRENCY = 'USD';
OR.VINYL_EXTRA = 15;
OR.VARIANTS = ['CD', 'Vinilo'];

OR.albums = [
  { id: 'orchid', cover: 'Orchid.jpg', title: 'Orchid', year: 1995, era: 'metal', price: 12.99, colors: ['#3b2f4a', '#141018'],
    label: 'Candlelight Records',
    desc: 'El debut: canciones largas donde guitarras acústicas y death metal conviven en una misma pieza. La semilla de todo lo que vendría.',
    tracks: ['In Mist She Was Standing', 'Forest of October', 'The Twilight Is My Robe'] },
  { id: 'morningrise', cover: 'Morningrise.jpg', title: 'Morningrise', year: 1996, era: 'metal', price: 12.99, colors: ['#4a4636', '#15140f'],
    label: 'Candlelight Records',
    desc: 'Cinco canciones, ninguna corta. Más melancólico y atmosférico que su antecesor; incluye la pieza más larga de su catálogo.',
    tracks: ['Advent', 'The Night and the Silent Water', 'Black Rose Immortal'] },
  { id: 'my-arms-your-hearse', cover: 'My arms your hearse.jpg', title: 'My Arms, Your Hearse', year: 1998, era: 'metal', price: 13.99, colors: ['#2a3a3a', '#0d1212'],
    label: 'Candlelight Records',
    desc: 'Su primer álbum conceptual: la historia de un fantasma que observa a quien amó. Más directo y oscuro.',
    tracks: ['April Ethereal', 'When', 'Demon of the Fall'] },
  { id: 'still-life', cover: 'Still life.jpg', title: 'Still Life', year: 1999, era: 'metal', price: 14.99, colors: ['#5a2a26', '#170c0b'],
    label: 'Peaceville Records',
    desc: 'Otro álbum conceptual, con un regreso, un amor prohibido y una comunidad religiosa. Es el primero con Martín Méndez en el bajo.',
    tracks: ['The Moor', 'Godhead\'s Lament', 'Face of Melinda'] },
  { id: 'blackwater-park', cover: 'BW park.jpg', title: 'Blackwater Park', year: 2001, era: 'metal', price: 16.99, colors: ['#3a4636', '#0e110d'],
    label: 'Music for Nations',
    desc: 'Producido por Steven Wilson (Porcupine Tree). Para muchos, su obra maestra y el disco que los llevó al mundo.',
    tracks: ['The Leper Affinity', 'Bleak', 'The Drapery Falls', 'Blackwater Park'] },
  { id: 'deliverance', cover: 'Deliverance.jpg', title: 'Deliverance', year: 2002, era: 'metal', price: 14.99, colors: ['#4b4b4b', '#111111'],
    label: 'Music for Nations',
    desc: 'La mitad pesada de un proyecto doble. Es uno de sus discos más brutales, aunque no le faltan pasajes delicados.',
    tracks: ['Wreath', 'Deliverance', 'A Fair Judgement'] },
  { id: 'damnation', cover: 'Damnation.jpg', title: 'Damnation', year: 2003, era: 'metal', price: 14.99, colors: ['#4d5a66', '#12161a'],
    label: 'Music for Nations',
    desc: 'La otra mitad: sin guturales, todo melancolía, mellotron y voces limpias. Fue grabado junto con Deliverance.',
    tracks: ['Windowpane', 'In My Time of Need', 'Death Whispered a Lullaby'] },
  { id: 'ghost-reveries', cover: 'Ghost Reveries.jpg', title: 'Ghost Reveries', year: 2005, era: 'metal', price: 15.99, colors: ['#5c1f1f', '#140808'],
    label: 'Roadrunner Records',
    desc: 'Su debut con Roadrunner y el primero con Per Wiberg en los teclados. Ocultismo, culpa y riffs inolvidables.',
    tracks: ['Ghost of Perdition', 'The Baying of the Hounds', 'Hours of Wealth'] },
  { id: 'watershed', cover: 'Watershed.jpg', title: 'Watershed', year: 2008, era: 'metal', price: 15.99, colors: ['#2f4a4a', '#0c1414'],
    label: 'Roadrunner Records',
    desc: 'Fredrik Åkesson y Martin Axenrot debutan en estudio. Es su último disco con guturales en mucho tiempo.',
    tracks: ['Heir Apparent', 'The Lotus Eater', 'Burden'] },
  { id: 'heritage', cover: 'Heritage.jpg', title: 'Heritage', year: 2011, era: 'prog', price: 15.99, colors: ['#7a3d1c', '#1c0f08'],
    label: 'Roadrunner Records',
    desc: 'El gran giro: rock progresivo setentero, sin voces guturales. Dividió a los fans y redefinió a la banda.',
    tracks: ['The Devil\'s Orchard', 'Slither', 'Folklore'] },
  { id: 'pale-communion', cover: 'Pale comm.jpg', title: 'Pale Communion', year: 2014, era: 'prog', price: 16.99, colors: ['#3e5a3a', '#0f160e'],
    label: 'Roadrunner Records',
    desc: 'Más cálido y melódico, con arreglos de cuerdas. Es el primero en estudio con Joakim Svalberg en los teclados.',
    tracks: ['Eternal Rains Will Come', 'Cusp of Eternity', 'River'] },
  { id: 'sorceress', cover: 'Sorceress.jpg', title: 'Sorceress', year: 2016, era: 'prog', price: 16.99, colors: ['#6b2f55', '#180b14'],
    label: 'Nuclear Blast / Moderbolaget',
    desc: 'Más pesado y extraño. Lo lanzaron con su propio sello, Moderbolaget, en alianza con Nuclear Blast.',
    tracks: ['Sorceress', 'Strange Brew', 'Era'] },
  { id: 'in-cauda-venenum', cover: 'In Cauda.jpg', title: 'In Cauda Venenum', year: 2019, era: 'prog', price: 17.99, colors: ['#3a1414', '#0a0505'],
    label: 'Nuclear Blast / Moderbolaget',
    desc: 'Se publicó en dos versiones, en sueco y en inglés. Es teatral, oscuro y cinematográfico.',
    tracks: ['Dignity', 'Heart in Hand', 'All Things Will Pass'] },
  { id: 'the-last-will-and-testament', cover: 'Last Will.jpg', title: 'The Last Will and Testament', year: 2024, era: 'prog', price: 19.99, colors: ['#5a5040', '#13110c'],
    label: 'Reigning Phoenix Music',
    desc: 'Un álbum conceptual sobre la herencia de un patriarca, con el regreso de las voces guturales. Ian Anderson (Jethro Tull) participa como invitado.',
    tracks: ['§1', '§3', 'A Story Never Told'] }
];

OR.ERA_LABEL = { metal: 'Era death metal progresivo', prog: 'Era rock progresivo' };

/* Videos. Para incrustarlos, pega el ID de YouTube en youtubeId
   (lo que va después de "watch?v=" en el enlace oficial).
   Sin ID, la tarjeta abre una búsqueda en YouTube (clic saliente). */
OR.videos = [
  { id: 'v-burden', song: 'Burden', album: 'watershed', youtubeId: '' },
  { id: 'v-windowpane', song: 'Windowpane', album: 'damnation', youtubeId: '' },
  { id: 'v-grand-conjuration', song: 'The Grand Conjuration', album: 'ghost-reveries', youtubeId: '' },
  { id: 'v-porcelain-heart', song: 'Porcelain Heart', album: 'watershed', youtubeId: '' },
  { id: 'v-devils-orchard', song: 'The Devil\'s Orchard', album: 'heritage', youtubeId: '' },
  { id: 'v-cusp-of-eternity', song: 'Cusp of Eternity', album: 'pale-communion', youtubeId: '' },
  { id: 'v-sorceress', song: 'Sorceress', album: 'sorceress', youtubeId: '' },
  { id: 'v-heart-in-hand', song: 'Heart in Hand', album: 'in-cauda-venenum', youtubeId: '' },
  { id: 'v-section-3', song: '§3', album: 'the-last-will-and-testament', youtubeId: '' }
];

OR.findAlbum = id => OR.albums.find(a => a.id === id);

OR.priceFor = (album, variant) => +(album.price + (variant === 'Vinilo' ? OR.VINYL_EXTRA : 0)).toFixed(2);

// Convierte un álbum al formato "item" de e-commerce de GA4
OR.toGA4Item = function (album, opts) {
  opts = opts || {};
  const variant = opts.variant || 'CD';
  const item = {
    item_id: album.id,
    item_name: album.title,
    item_brand: 'Opeth',
    item_category: 'Álbumes',
    item_category2: OR.ERA_LABEL[album.era],
    item_category3: String(album.year),
    item_variant: variant,
    price: OR.priceFor(album, variant),
    quantity: opts.quantity || 1
  };
  if (opts.index !== undefined) item.index = opts.index;
  if (opts.listId) { item.item_list_id = opts.listId; item.item_list_name = opts.listName; }
  return item;
};

OR.money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: OR.CURRENCY }).format(n);
