import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import DOMPurify from 'isomorphic-dompurify';

import { useTransition } from '../../src/context/transitionContext';

import CustomBtn from '../../src/components/CustomBtn';
import Atractions from '../../src/components/Atractions';
/* import PhotoGalerie from '../../src/components/PhotoGalerie'; */

const Container = styled.div`  
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.eventTheme.page.bg};
  
  .event-title{
    height: 400px;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 10%;
  
    .event-name,
    .event-logo,
    .event-date {
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
    .event-date{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bolder;
      color: ${(props) => props.eventTheme.page.date};
      pointer-events: none;
      div{
        font-size: 4rem; 
        line-height: 3.8rem;
        padding: 0;
        margin: 0;
      }
      .mes{
        margin: -5px 0 5px 0;
        color: transparent;
        -webkit-text-stroke: 0.1px ${(props) => props.eventTheme.page.date};
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
`;

const Cover = styled.div`
  width: 100%;
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 33%;
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
  const router = useRouter();
  const {
    logoImg,
    eventName,
    coverImg,
    coverImg2,
    pageTitle,
    pageMainText,
    atractions,
    eventTheme,
    eventDate,
    ticket,
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

  function handleClick(e, path) {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey === true)) {
      window.open(path);
    } else if (e.button === 0) {
      setTransitionOpen(false);
      setTransitionTo('index');
      setTimeout(() => {
        router.push(path);
      }, 1300);
    }
  }

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
              {(eventDate.dia !== '' && eventDate.mes !== '' && eventDate.ano !== '')
              && (
              <div className="event-date">
                <div>
                  {eventDate.dia}
                </div>
                <div className="mes">
                  {eventDate.mes.toLowerCase()}
                </div>
                <div>
                  {eventDate.ano}
                </div>
              </div>
              )}
            </div>
            <div className="info">
              {pageTitle.length > 0
                && <h2 className="eventTitle">{pageTitle}</h2>}
              {pageMainText.length > 0
              // eslint-disable-next-line react/no-danger
              && <div className="main-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageMainText, { USE_PROFILES: { html: true } }) }} />}
              {ticket.buyLink.length > 0
                ? (
                  <div className="btn-container">
                    <CustomBtn
                      handleClick={(e) => handleClick(e, ticket.buyLink)}
                      text="Garanta aqui o seu ingresso!"
                      btnTheme={{
                        textColor: eventTheme.bg,
                        btnBg: eventTheme.primary,
                        effectBg: eventTheme.secondary,
                      }}
                    />
                  </div>

                )
                : (
                  <div className="btn-container">
                    <CustomBtn
                      handleClick={() => {}}
                      text="Ingressos a venda em breve"
                      btnTheme={{
                        textColor: eventTheme.bg,
                        btnBg: eventTheme.primary,
                        effectBg: eventTheme.secondary,
                      }}
                    />
                  </div>
                )}
            </div>
            <Cover coverUrl={coverImg2} pathUrl="/home-cover-clip-path2.svg" heigth="600px" />
            <div className="atractions">
              <h2 className="atractions-header">Experiências:</h2>
              <Atractions
                atractions={atractions}
                eventTheme={eventTheme}
              />
            </div>
            {/* <PhotoGalerie photos={eventPhotos} /> */}
          </>
        )}
        {props.err && <h2>404: Infelizmente este evento não foi encontrado</h2>}
      </Container>
    </>
  );
}
