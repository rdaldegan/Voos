const futureEventData = [
  {
    eventPageHref: '/nextEvents/cash-&-flow',
  },
  {
    eventPageHref: '/nextEvents/contamina-dejavu-djonga',
  },
];

export async function getPaths() {
  return new Promise((resolve, reject) => {
    if (futureEventData) {
      const paths = futureEventData.map((event) => event.eventPageHref);
      resolve(paths);
    } else reject(new Error('Erro ao buscar o evento'));
  });
}

export default async function HandlePaths(req, res) {
  let data = [];

  await getPaths()
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
      res.status(200).json([
        {
          data,
          err: `Promise rejection error: ${err}`,
        },
      ]);
    });
}
