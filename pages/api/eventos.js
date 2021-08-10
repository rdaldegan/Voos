import { pastEvents } from '../../src/constants/mockEvents';

const pastEventsData = pastEvents;

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
