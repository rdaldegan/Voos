const futureEvents = [
  {
    img: '/event-title.png',
    name: 'Cash & Flow',
    href: '/',
    backgroundImg: '/event-banner.png',
    theme: {
      primary: '#f70e0e',
      secondary: '#ffffff',
      bg: '#0c0b0a',
    },
    dia: 12,
    mes: 'agosto',
    ano: 2022,
  },
  {
    img: '/event-title.jpg',
    name: 'Contamina DejaVu Djonga',
    href: '/',
    backgroundImg: '/event-banner.jpg',
    theme: {
      primary: '#dbab1f',
      secondary: '#ffffff',
      bg: '#43220a',
    },
    dia: 12,
    mes: 'agosto',
    ano: 2022,
  },
];

export async function getEvents() {
  return new Promise((resolve, reject) => {
    if (futureEvents) resolve(futureEvents);
    else reject(new Error('Erro ao buscar os eventos'));
  });
}

export default async function (req, res) {
  let data = [];

  await getEvents()
    .then((results) => {
      data = results;
    })
    .catch((err) => {
      console.log(`Promise rejection error: ${err}`);
    });
  res.status(200).json([
    {
      data,
    },
  ]);
}
