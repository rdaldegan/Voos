import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vw / 2.5);
  margin: 70px auto 200px;
  display: grid;
`;

const Citacao = styled.div.attrs(
  ({
    translateX,
    translateY,
    opacity,
    zIndex,
    eventTheme,
  }) => ({
    style: {
      transform: `translateX(${translateX}) translateY(${translateY})`,
      opacity: `${opacity}`,
      zIndex: `${zIndex}`,
      background: `linear-gradient(${eventTheme.primary}50, ${eventTheme.bg})`,
    },
  }),
)`

  position: relative;
  width: 60%;
  height: 100%; 
  margin: auto;
  grid-area: 1 / -1;
  transition: transform 0.9s;
  
  box-shadow:
    0 2.8px 2.2px ${(props) => `${props.eventTheme.secondary}10`},
    0 6.7px 5.3px ${(props) => `${props.eventTheme.secondary}15`},
    0 12.5px 10px ${(props) => `${props.eventTheme.secondary}20`},
    0 22.3px 17.9px ${(props) => `${props.eventTheme.secondary}25`};
  

  .image{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .image{
    background-image: url(${(props) => props.backgroundCover});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0);
    transition: clip-path 0.4s;
  }
  .atraction-logo{
    height: 70%;
    margin: 10px;
    color: ${(props) => `${props.eventTheme.secondary}`}
  }

  .atraction-info{
    position: absolute;
    width: 100%;
    height: 25%;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => `${props.eventTheme.secondary}`};
    .about{
      margin: 0 20px;
      font-size: 2rem;  
      font-family: ${(props) => props.textFontFamily};
    }
  }

  .big-span{
    pointer-events: none;
    position: absolute;
    font-size: 500px;
    white-space: nowrap;
    top: 20%;
    left: -10%;
    color: ${(props) => `${props.eventTheme.primary}40`};
    mix-blend-mode: screen;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :hover{
    .image{
      clip-path: polygon(100% 0, 100% 55%, 0 75%, 0 0);
    }
  }
`;

export default function Atractions({
  atractions,
  eventTheme,
  textFontImport,
  textFontFamily,
}) {
  const [currentItem, setCurrentItem] = useState(0);

  const totalItems = atractions.length;

  return (
    <Container>
      {atractions.map(({
        atractionName, atractionCover, atractionLogo, atractionAbout,
      }, index) => {
        const offset = index - currentItem;
        const zIndex = totalItems - Math.abs(offset);
        const opacity = (zIndex) / totalItems;
        const translateX = `${105 * offset}%`;
        const translateY = `${-Math.abs(10 * offset)}%`;
        return (
          <Citacao
            key={index}
            translateX={translateX}
            translateY={translateY}
            zIndex={zIndex}
            opacity={(opacity > 0.7 && opacity !== 1) ? 0.7 : opacity}
            backgroundCover={atractionCover}
            eventTheme={eventTheme}
            textFontImport={textFontImport}
            textFontFamily={textFontFamily}
            onClick={() => setCurrentItem(index)}
          >
            <div className="atraction-info">
              <img className="atraction-logo" src={atractionLogo} alt={atractionName} />
              <p className="about">{atractionAbout}</p>
            </div>
            <div className="image">
              <span className="big-span">{atractionName}</span>
            </div>
          </Citacao>
        );
      })}
    </Container>
  );
}
