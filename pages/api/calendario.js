const futureEventData = [
  {
    logoImg: '/event-title.png',
    eventName: 'Cash & Flow',
    eventPageHref: 'cash-&-flow',
    coverImg: '/event-banner.png',
    eventTheme: {
      primary: '#f70e0e',
      secondary: '#ffffff',
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
    eventTheme: {
      primary: '#dbab1f',
      secondary: '#ffffff',
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

export async function getEvents() {
  return new Promise((resolve, reject) => {
    if (futureEventData) resolve(futureEventData);
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
