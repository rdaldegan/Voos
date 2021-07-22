const futureEventData = [
  {
    logoImg: '/event-title.png',
    eventName: 'Cash & Flow',
    eventPageHref: 'cash-&-flow',
    coverImg: '/event-banner.png',
    pageTitle: 'Tenha o Cash e Viva o Flow',
    titleFont: '\'Qahiri\', sans-serif',
    pageMainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
                  aliquet ante at nibh porttitor, sit amet lacinia risus 
                  porttitor. Cras fringilla lacinia tempor. Donec imperdiet 
                  nisi et placerat iaculis. Maecenas blandit orci vitae 
                  nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
                  rutrum pharetra. Suspendisse potenti. Phasellus mattis 
                  gravida est in hendrerit. Nullam efficitur purus nisl, 
                  eu efficitur libero feugiat non. Ut eu eleifend felis.`,
    textFont: '\'Zen Tokyo Zoo\', cursive',
    atractions: [
      {
        atractionName: 'Costa Gold',
        atractionPhoto: '/about.jpg',
        atractionAbout: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
              aliquet ante at nibh porttitor, sit amet lacinia risus 
              porttitor.`,
      },
    ],
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
    ],
    eventTheme: {
      primary: '#f70e0e',
      secondary: '#bcbcbc',
      tertiary: '',
      bg: '#0c0b0a',
    },
    eventDate: {
      dia: 12,
      mes: 'agosto',
      ano: 2022,
    },
    ticket: {
      buyLink: '/',
      price: '3.40',
      currency: 'BRL',
    },
  },
  {
    logoImg: '/event-title.jpg',
    eventName: 'Contamina DejaVu Djonga',
    eventPageHref: 'contamina-dejavu-djonga',
    coverImg: '/event-banner.jpg',
    pageTitle: 'Tenha o Cash e Viva o Flow',
    titleFont: `<link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Qahiri&display=swap" rel="stylesheet">`,
    pageMainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
                  aliquet ante at nibh porttitor, sit amet lacinia risus 
                  porttitor. Cras fringilla lacinia tempor. Donec imperdiet 
                  nisi et placerat iaculis. Maecenas blandit orci vitae 
                  nisl maximus, at rhoncus nibh fermentum. Sed pharetra 
                  rutrum pharetra. Suspendisse potenti. Phasellus mattis 
                  gravida est in hendrerit. Nullam efficitur purus nisl, 
                  eu efficitur libero feugiat non. Ut eu eleifend felis.`,
    textFont: `<link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Zen+Tokyo+Zoo&display=swap" rel="stylesheet">`,
    atractions: [
      {
        atractionName: 'Costa Gold',
        atractionPhoto: '/about.jpg',
        atractionAbout: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Aliquam nec hendrerit odio. Nunc id aliquet enim. Fusce 
              aliquet ante at nibh porttitor, sit amet lacinia risus 
              porttitor.`,
      },
    ],
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
    ],
    eventTheme: {
      primary: '#dbab1f',
      secondary: '#43220a',
      tertiary: '',
      bg: '#43220a',
    },
    eventDate: {
      dia: 14,
      mes: 'Agosto',
      ano: 2023,
    },
    ticket: {
      buyLink: '/',
      price: '3.40',
      currency: 'BRL',
    },
  },
];

export async function getProps({ event }) {
  return new Promise((resolve, reject) => {
    if (futureEventData) {
      const found = futureEventData.find(
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
