import React, { useEffect } from 'react';
import styled from 'styled-components';
import DOMPurify from 'isomorphic-dompurify';

import { useTransition } from '../../src/context/transitionContext';

import Atractions from '../../src/components/Atractions';
import Photos from '../../src/components/Photos';

// Remover quando conectar com o firebase
import { pastEvents } from '../../src/constants/mockEvents';
//

const Container = styled.div`  
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.eventTheme.page.bg};

  h1, h2 {
    font-family: 'Chau Philomene One', sans-serif;
  }
  
  .event-title{
    height: 400px;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 10%;
  
    .event-name,
    .event-logo{
      margin: auto;
      width: 100%;
      height: 80%;
    }
    .event-logo{
      img{
        width: 100%;
        height: 100%;
      }
    }
    .event-name{
      display: flex;
      align-items: center;
      justify-content: center;
      h1{
        color: ${(props) => props.eventTheme.page.mainTitle};
        font-size: 4.5rem;
      }
    }
  }

  .info{
    position: relative;
    width: 60%;
    display: grid;
    grid-template-rows: 2fr 4fr 1fr;
    grid-gap: 50px;
    color: ${(props) => props.eventTheme.page.text};
    margin: 100px 0;

    .eventTitle,
    .main-text,
    .btn-container{
      margin: auto;
    }
    .eventTitle{
      color: ${(props) => props.eventTheme.page.secondTitle};
      font-size: 3.4rem;
    }
    .main-text{
      width: 70%;
      font-size: 1.6rem;
      line-height: 2rem;
      text-align: justify;
      text-justify: inter-word;
    }
  }
  .atractions{
    width: 100%;
    .atractions-header{
      font-size: 3rem;
      color: ${(props) => props.eventTheme.page.thirdTitle};
    }
  }

  .photos{
    margin: 0 0 150px 0;
  }
`;

const Cover = styled.div`
  width: 100%;
  height: ${(props) => props.heigth};
  margin: 0 0 50px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.coverUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  mask-image: url(${(props) => props.pathUrl});
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 33%;
`;

export async function getStaticPaths() {
  const events = pastEvents.map((event) => event.eventPageHref);

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

  const found = pastEvents.find(
    (current) => current.eventPageHref.toUpperCase() === event.toUpperCase(),
  );

  const props = found;

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
    coverImg2,
    pageTitle,
    pageMainText,
    atractions,
    eventPhotos,
    eventTheme,
  } = props;

  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();
  useEffect(() => {
    setTheme({
      colors: {
        primary: eventTheme.primary,
        secondary: eventTheme.secondary,
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
          bg: '#FFFFFF',
        },
      });
    };
  }, []);

  return (
    <>
      <Container
        coverImg={coverImg}
        eventTheme={eventTheme}
      >
        {!props.err
        && (
          <>
            <Cover coverUrl={coverImg} pathUrl="/home-cover-clip-path.svg" heigth="80vh" />
            <div className="event-title">
              {logoImg.length > 0
                && (
                <div className="event-logo">
                  <img src={logoImg} alt={`Foto do evento ${eventName}`} />
                </div>
                )}
              {eventName.length > 0
                && (
                <div className="event-name">
                  <h1>{eventName}</h1>
                </div>
                )}
            </div>
            <div className="info">
              {pageTitle.length > 0
                && <h2 className="eventTitle">{pageTitle}</h2>}
              {pageMainText.length > 0
              // eslint-disable-next-line react/no-danger
              && <div className="main-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageMainText, { USE_PROFILES: { html: true } }) }} />}
            </div>
            <Cover coverUrl={coverImg2} pathUrl="/home-cover-clip-path2.svg" heigth="600px" />
            <div className="atractions">
              <h2 className="atractions-header">Experiências:</h2>
              <Atractions
                atractions={atractions}
                eventTheme={eventTheme}
              />
            </div>
            <div className="photos">
              <Photos eventPhotos={eventPhotos} eventTheme={eventTheme} />
            </div>
          </>
        )}
        {props.err && <h2>404: Infelizmente este evento não foi encontrado</h2>}
      </Container>
    </>
  );
}
