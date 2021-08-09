const pastEvents = [
  {
    logoImg: '/event-title.png',
    eventName: 'Cash & Flow',
    eventPageHref: 'cash-&-flow',
    coverImg: '/event-banner.png',
    coverImg2: '/event-banner.png',
    pageTitle: 'Tenha o Cash e Viva o Flow',
    pageMainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
    aliquet ante at nibh porttitor, sit amet lacinia risus 
    porttitor. Cras fringilla lacinia tempor. Donec imperdiet 
    nisi et placerat iaculis. Maecenas blandit orci vitae 
    nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
    rutrum pharetra. Suspendisse potenti. Phasellus mattis 
    gravida est in hendrerit. Nullam efficitur purus nisl, 
    eu efficitur libero feugiat non. Ut eu eleifend felis.`,
    atractions: [
      {
        atractionName: 'Djonga',
        atractionCover: '/djonga-cover.jpg',
        atractionLogo: '/djonga-logo.jpg',
        atractionAbout: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
        aliquet ante at nibh porttitor, sit amet lacinia risus 
        porttitor.`,
      },
      {
        atractionName: 'Costa Gold',
        atractionCover: '/costa-gold-cover.jpg',
        atractionLogo: '/costa-gold-logo.jpg',
        atractionAbout: `Cras fringilla lacinia tempor. Donec imperdiet 
        nisi et placerat iaculis. Maecenas blandit orci vitae 
        nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
        rutrum pharetra.`,
      },
      {
        atractionName: 'Costa Gold',
        atractionCover: '/costa-gold-cover.jpg',
        atractionLogo: '/costa-gold-logo.jpg',
        atractionAbout: `Cras fringilla lacinia tempor. Donec imperdiet 
        nisi et placerat iaculis. Maecenas blandit orci vitae 
        nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
        rutrum pharetra.`,
      },
    ],
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
    ],
    eventTheme: {
      primary: '#f70e0e',
      secondary: '#bcbcbc',
      tertiary: '',
      bg: '#0c0b0a',
    },
  },
  {
    logoImg: '/event-title.jpg',
    eventName: 'Contamina DejaVu Djonga',
    eventPageHref: 'contamina-dejavu-djonga',
    coverImg: '/event-banner.jpg',
    coverImg2: '/event-banner.png',
    pageTitle: 'Tenha o Cash e Viva o Flow',
    pageMainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
    aliquet ante at nibh porttitor, sit amet lacinia risus 
    porttitor. Cras fringilla lacinia tempor. Donec imperdiet 
    nisi et placerat iaculis. Maecenas blandit orci vitae 
    nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
    rutrum pharetra. Suspendisse potenti. Phasellus mattis 
    gravida est in hendrerit. Nullam efficitur purus nisl, 
    eu efficitur libero feugiat non. Ut eu eleifend felis.`,
    atractions: [
      {
        atractionName: 'Costa Gold',
        atractionCover: '/costa-gold-cover.jpg',
        atractionLogo: '/costa-gold-logo.jpg',
        atractionAbout: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
              aliquet ante at nibh porttitor, sit amet lacinia risus 
              porttitor.`,
      },
    ],
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
      '/about.jpg',
      '/about2.jpg',
      '/event-banner.png',
    ],
    eventTheme: {
      primary: '#dbab1f',
      secondary: '#43220a',
      tertiary: '',
      bg: '#5b4401',
    },
  },
];

export async function getProps({ event }) {
  return new Promise((resolve, reject) => {
    if (pastEvents) {
      const found = pastEvents.find(
        (current) => current.eventPageHref.toUpperCase() === event.toUpperCase(),
      );
      if (found) resolve(found);
      else reject(new Error('Evento não encontrado'));
    } else reject(new Error('Erro ao buscar o evento'));
  });
}

export default async function HandleProps(req, res) {
  let data = [];

  await getProps(req.body)
    .then((results) => {
      data = results;
      res.status(200).json([
        {
          data,
          err: null,
        },
      ]);
    })
    .catch((err) => {
      res.status(400).json([
        {
          data,
          err: `Promise rejection error: ${err}`,
        },
      ]);
    });
}
