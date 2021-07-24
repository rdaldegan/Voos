import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 650px;
  margin: 70px auto;
  display: grid;
  
  .previous, .next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: darkgray;
    z-index: 100;
  }
  .previousu{
    left: 0;
  }
  .next{
    right: 0;
  }
`;

const Citacao = styled.div.attrs(
  ({
    translateX,
    opacity,
    zIndex,
    eventTheme,
  }) => ({
    style: {
      transform: `translateX(${translateX})`,
      opacity: `${opacity}`,
      zIndex: `${zIndex}`,
      background: `linear-gradient(${eventTheme.primary}50, ${eventTheme.bg})`,
    },
  }),
)`

  @import url(${(props) => props.titleFontImport});
  @import url(${(props) => props.textFontImport});
  position: relative;
  width: 60%;
  height: 100%; 
  margin: auto;
  grid-area: 1 / -1;
  transition: 2s;

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
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => `${props.eventTheme.secondary}40`};
    font-size: 30vw;
    font-family: ${(props) => props.titleFontFamily};
    mix-blend-mode: screen;
  }

  :hover{
    .image{
      clip-path: polygon(100% 0, 100% 55%, 0 75%, 0 0);
    }
  }
`;

export default function Atractions({
  atractions, eventTheme,
  titleFontImport,
  titleFontFamily,
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
        return (
          <Citacao
            key={index}
            translateX={translateX}
            zIndex={zIndex}
            opacity={(opacity > 0.7 && opacity !== 1) ? 0.7 : opacity}
            backgroundCover={atractionCover}
            eventTheme={eventTheme}
            titleFontImport={titleFontImport}
            titleFontFamily={titleFontFamily}
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
