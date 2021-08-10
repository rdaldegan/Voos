import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';

import PastEventCard from '../src/components/PastEventCard';
import MailchimpForm from '../src/components/MailchimpForm';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header{
    background-image: url('/brush-stroke-banner-5.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2{
      font-family: 'Chau Philomene One', sans-serif;
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
  background-size: cover;
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

  const url = new URL('/api/eventos', base);
  let pastEvents = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response[0].err) throw new Error(response[0].err);
      else return response;
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));

  if (pastEvents) {
    pastEvents = pastEvents[0].data;
  } else {
    pastEvents = [];
  }

  return {
    props: {
      pastEvents,
    },
    revalidate: 60,
  };
}

export default function Eventos({ pastEvents }) {
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  useEffect(() => {
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  return (
    <Container>
      <Cover coverUrl="/home-cover5.jpg" pathUrl="/home-cover-clip-path.svg" heigth="600px">
        <h2>
          Conheça nosso trabalho e nossa história
        </h2>
      </Cover>
      <div className="header">
        <h2>Eventos com a marca da Voos</h2>
      </div>
      {pastEvents.length > 0 && pastEvents.map((event) => (
        <PastEventCard
          key={event.eventName}
          img={event.logoImg}
          name={event.eventName}
          href={`/events/${event.eventPageHref}`}
          backgroundImg={event.coverImg}
          text={event.cardText}
          eventTheme={event.eventTheme}
        />
      ))}

      {pastEvents.length === 0 && (
        <div className="no-events">
          <h3 className="warning">
            Desculpe. Houve um erro ao buscar pelos eventos.
          </h3>
          <MailchimpForm />
        </div>
      )}
    </Container>
  );
}
