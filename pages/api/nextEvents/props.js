import { futureEvents } from '../../../src/constants/mockEvents';

const futureEventData = futureEvents;

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
