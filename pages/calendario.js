import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';
import EventCard from '../src/components/EventCard';
import MailChimpForm from '../src/components/MailchimpForm';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .header{
    background-image: url('/brush-stroke-banner-6.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2{
      font-family: 'Carter One', cursive;
      color: #47453c;
      font-size: 4.5rem;
    }
  }
  .no-events{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .warning{
      font-size: 2rem;
      width: 80%;
    }
  }
`;

const Cover = styled.div`
  width: 100vw;
  height: ${(props) => props.heigth};
  margin: 0 0 50px 0;
  background-image: url(${(props) => props.coverUrl});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 100% 25%;
  mask-image: url(${(props) => props.pathUrl});
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;
  h2 {
    font-family: 'Otomanopee One', sans-serif;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
    text-align: center;
    width: 50vw;
    color: white;
    font-size: 2.5rem;
  }
`;

export async function getStaticProps() {
  const base = process.env.API_BASE_URL;

  const url = new URL('/api/calendario', base);
  let nextEvents = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => response)
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));

  if (nextEvents) {
    nextEvents = nextEvents[0].data;
  } else {
    nextEvents = [];
  }

  return {
    props: {
      nextEvents,
    },
    revalidate: 3600,
  };
}

export default function Calendario({ nextEvents }) {
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  console.log(nextEvents);

  useEffect(() => {
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  return (
    <Container>
      <Cover coverUrl="/home-cover4.jpg" pathUrl="/home-cover-clip-path.svg" heigth="600px">
        <div>
          <h2>
            {`Fique por dentro de todas as datas 
            da Voos e não perca um segundo de emoção`}
          </h2>
        </div>
      </Cover>
      <div className="header">
        <h2>Próximos eventos:</h2>
      </div>
      {nextEvents.length > 0 && nextEvents.map(({
        eventPageHref,
        logoImg,
        eventName,
        coverImg,
        eventTheme,
        eventDate,
      }) => (
        <EventCard
          key={eventPageHref}
          img={logoImg}
          name={eventName}
          href={`/nextEvents/${eventPageHref}`}
          backgroundImg={coverImg}
          theme={eventTheme}
          dia={eventDate.dia}
          mes={eventDate.mes}
          ano={eventDate.ano}
        />
      ))}

      {nextEvents.length === 0 && (
        <div className="no-events">
          <h3 className="warning">
            Estamos dando um intervalo nos trabalhos, mas logo voltaremos com muito mais!
          </h3>
          <MailChimpForm />
        </div>
      )}
    </Container>
  );
}
