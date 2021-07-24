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
    pointerEvents,
    eventTheme,
  }) => ({
    style: {
      transform: `translateX(${translateX})`,
      opacity: `${opacity}`,
      zIndex: `${zIndex}`,
      pointerEvents: `${pointerEvents}`,
      background: `linear-gradient(${eventTheme.primary}50, ${eventTheme.bg})`,
    },
  }),
)`
  position: relative;
  width: 60%;
  height: 100%; 
  margin: auto;
  grid-area: 1 / -1;
  transition: 2s;

  .info,
  .image{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .image{
    background-image: url(${(props) => props.backgroundPhoto});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    clip-path: polygon(51% 0, 100% 0, 100% 100%, 0 100%, 0 0);
    transition: clip-path 0.4s;
  }
  .name{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    margin: 10px;
    color: ${(props) => `${props.eventTheme.primary}`}
  }

  :hover{
    .image{
      clip-path: polygon(51% 0, 100% 0, 100% 55%, 0 75%, 0 0);
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

  /*
  * Jeito de sempre estar no index certo num carrossel
  * (o +- é apenas para dizer que você pode somar ou subtrair)
  *
  * ((((indexAtual +- 1)) % lenght) + length) % length)
  */
  function changeItem(jumpSize) {
    setCurrentItem(
      (((currentItem + jumpSize) % totalItems) + totalItems) % totalItems,
    );
  }

  return (
    <Container>
      {atractions.map(({ atractionName, atractionPhoto/* , atractionAbout */ }, index) => {
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
            pointerEvents={opacity === 1 ? 'all' : 'none'}
            backgroundPhoto={atractionPhoto}
            eventTheme={eventTheme}
            titleFontImport={titleFontImport}
            titleFontFamily={titleFontFamily}
            textFontImport={textFontImport}
            textFontFamily={textFontFamily}
          >
            {/* <div className="info">
              <p className="about">{atractionAbout}</p>
            </div> */}
            <img className="name" src={atractionName} alt={atractionName} />
            <div className="image" />
          </Citacao>
        );
      })}
      <button className="previous" type="button" onClick={() => changeItem(-1)}>{'<'}</button>
      <button className="next" type="button" onClick={() => changeItem(1)}>{'>'}</button>
    </Container>
  );
}
