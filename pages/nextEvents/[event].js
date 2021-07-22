import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../../src/context/transitionContext';

const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
`;

const Cover = styled.div`
  width: 100vw;
  height: ${(props) => props.heigth};
  margin: 0 0 50px 0;
  background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.coverUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  mask-image: url(${(props) => props.pathUrl});
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .event-logo,
  .event-name,
  .event-date {
    margin: auto;
    max-width: 80%;
    max-height: 80%;
  }
  .event-name{
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.secondary};
    h1{
      text-align: center;
      text-justify: inter-character;
      font-size: 3rem;
    }
  }
  .event-date{
    background-color: coral;
  }
`;

export async function getStaticPaths() {
  const base = process.env.API_BASE_URL;
  const url = new URL('/api/nextEvents/paths', base);
  let events = await fetch(url, {
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

  if (events) {
    events = events[0].data;
  } else {
    events = [];
  }

  const paths = [];

  for (let i = 0; i < events.length; i += 1) {
    paths.push({ params: { event: events[i] } });
  }

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { event } = context.params;

  const data = {
    event,
  };

  const base = process.env.API_BASE_URL;
  const url = new URL('/api/nextEvents/props', base);
  const eventData = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => ({ data: [], err: `Error: ${err}` }));

  const props = eventData[0];

  return {
    props: {
      props,
    },
    revalidate: 3600,
  };
}

export default function Event({
  props, setTheme,
}) {
  const {
    logoImg,
    eventName,
    coverImg,
    pageTitle,
    titleFont,
    pageMainText,
    textFont,
    atractions,
    eventPhotos,
    eventTheme,
    eventDate,
    /* ticket, */
  } = props.data;

  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();
  useEffect(() => {
    setTheme({
      colors: {
        primary: eventTheme.primary,
        secondary: eventTheme.secondary,
        tertiary: eventTheme.tertiary,
        bg: eventTheme.bg,
      },
    });
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setTheme({
        colors: {
          primary: '#47453c',
          secondary: '#F6C60C',
          tertiary: '#A37D05',
          bg: '#FFFFFF',
        },
      });
    };
  }, []);

  console.log(eventTheme);

  return (
    <>
      <Container
        coverImg={coverImg}
        eventTheme={eventTheme}
        titleFont={titleFont}
        textFont={textFont}
      >
        {!props.err
        && (
          <>
            <Cover
              coverUrl={coverImg}
              eventTheme={eventTheme}
              pathUrl="/home-cover-clip-path.svg"
              heigth="80vh"
            >
              <img className="event-logo" src={logoImg} alt={`Foto do evento ${eventName}`} />
              <div className="event-name">
                <h1>{eventName}</h1>
              </div>
              <div className="event-date">
                <span>{eventDate.dia}</span>
                <span>{eventDate.mes}</span>
                <span>{eventDate.ano}</span>
              </div>
            </Cover>
            <div className="info">
              <h2 className="title">{pageTitle}</h2>
              <p className="main-text">{pageMainText}</p>
              <button className="buy-button" type="button">
                Garanta já seu ingresso!
              </button>
            </div>
            <div className="atractions">
              <h2 className="title">Atrações</h2>
              <div className="atractions-carroussel">
                {atractions.map(({ atractionName, atractionPhoto, atractionAbout }) => (
                  <div className="item" key={atractionName}>
                    <img className="image" src={atractionPhoto} alt={`Foto ${atractionName}`} />
                    <p className="about">{atractionAbout}</p>
                  </div>
                ))}
                <button className="previous" type="button">{'<'}</button>
                <button className="next" type="button">{'>'}</button>
              </div>
            </div>
            <div className="photos-carroussel">
              {eventPhotos.map((photo) => (
                <div className="item" key={photo}>
                  <img src={photo} alt="Foto no evento" />
                </div>
              ))}
              <button className="previous" type="button">{'<'}</button>
              <button className="next" type="button">{'>'}</button>
            </div>
          </>
        )}
        {props.err && <h2>404: Infelizmente este evento não foi encontrado</h2>}
      </Container>
    </>
  );
}
