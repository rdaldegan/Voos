import { pastEvents } from '../../../src/constants/mockEvents';

const eventsData = pastEvents;

export async function getPaths() {
  return new Promise((resolve, reject) => {
    if (eventsData) {
      const paths = eventsData.map((event) => event.eventPageHref);
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
