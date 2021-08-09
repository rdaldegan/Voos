const pastEventsData = [
  {
    logoImg: '/event-title.png',
    eventName: 'Cash & Flow',
    eventPageHref: 'cash-&-flow',
    coverImg: '/event-banner.png',
    eventCallText: `Cras fringilla lacinia tempor. Donec imperdiet 
    nisi et placerat iaculis. Maecenas blandit orci vitae 
    nisl maximus, at rhoncus nibh fermentum.`,
    eventTheme: {
      primary: '#f70e0e',
      secondary: '#bcbcbc',
      tertiary: '',
      bg: '#0c0b0a',
    },
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
      '/about.jpg',
      '/about2.jpg',
      '/about.jpg',
      '/about2.jpg',
    ],
  },
  {
    logoImg: '/event-title.jpg',
    eventName: 'Contamina DejaVu Djonga',
    eventPageHref: 'contamina-dejavu-djonga',
    coverImg: '/event-banner.jpg',
    eventCallText: `Cras fringilla lacinia tempor. Donec imperdiet 
    nisi et placerat iaculis. Maecenas blandit orci vitae 
    nisl maximus, at rhoncus nibh fermentum.`,
    eventTheme: {
      primary: '#dbab1f',
      secondary: '#43220a',
      tertiary: '',
      bg: '#43220a',
    },
    eventPhotos: [
      '/about.jpg',
      '/about2.jpg',
      '/about.jpg',
      '/about2.jpg',
      '/about.jpg',
      '/about2.jpg',
    ],
  },
];

export async function getEvents() {
  return new Promise((resolve, reject) => {
    if (pastEventsData) resolve(pastEventsData);
    else reject(new Error('Erro ao buscar os eventos'));
  });
}

export default async function Handler(req, res) {
  let data = [];

  await getEvents()
    .then((results) => {
      data = results;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Promise rejection error: ${err}`);
    });
  res.status(200).json([
    {
      data,
    },
  ]);
}
