import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useTransition } from '../../context/transitionContext';
import CustomBtn from '../CustomBtn';

const Container = styled.div`
  

  position: relative;
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${(props) => props.bgImg});
  background-position: center;
  background-size: cover;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);

  width: 80%;
  height: 550px;
  overflow: hidden;
  margin: 40px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 3fr 1fr;

  .event-logo{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    pointer-events: none;
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none;
    img{
      height: 275px;
      max-width: 90%;
    }
  }
  
  .info-text{
    position: relative;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .blur-bg{
      background-color: blue;
      margin: 0;
    }
    p{
      font-size: 2.2rem;
      line-height: 3rem;
      color: ${(props) => props.eventTheme.card.text};
      border-radius: 8px;
      margin-right: 10%;
      backdrop-filter: blur(2px);
    }
  }

  .button-section{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function PastEventCard({
  img, name, eventTheme, backgroundImg, href, text, textFont,
}) {
  const router = useRouter();
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  function handleClick(e, path) {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey === true)) {
      window.open(path);
    } else if (e.button === 0) {
      setTransitionOpen(false);
      setTransitionTo('index');
      setTimeout(() => {
        if (router.pathname === path) router.reload(path);
        else router.push(path);
      }, 1300);
    }
  }

  return (
    <Container
      bgImg={backgroundImg}
      eventTheme={eventTheme}
      textFont={textFont}
    >
      <div className="event-logo">
        <img src={img} alt={`Evento ${name}`} />
      </div>
      <div className="info-text">
        <p>{text}</p>
      </div>
      <div className="button-section">
        <CustomBtn handleClick={(e) => handleClick(e, href)} text="Página do Evento" btnTheme={{ textColor: eventTheme.card.button.primary, btnBg: eventTheme.card.button.bg, effectBg: `${eventTheme.card.button.primary}35` }} />
      </div>
    </Container>
  );
}
