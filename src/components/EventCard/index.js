import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useTransition } from '../../context/transitionContext';
import CustomBtn from '../CustomBtn';

const Container = styled.div`
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${(props) => props.bgImg});
  background-position: center;
  background-size: cover;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;

  width: 80%;
  height: 400px;
  margin: 40px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .course-infos{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    pointer-events: none;
    img{
      max-height: 80%;
      max-width: 90%;
    }
  }

  .course-date {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bolder;
    color: ${(props) => props.colors.primary};
    pointer-events: none;
  }

  .subscrible-link{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    button{
      box-shadow:
        0 2.8px 2.2px ${(props) => `${props.colors.primary}5`},
        0 6.7px 5.3px ${(props) => `${props.colors.primary}10`},
        0 12.5px 10px ${(props) => `${props.colors.primary}15`},
        0 22.3px 17.9px ${(props) => `${props.colors.primary}20`},
    }
  }
`;

const DiaAno = styled.span.attrs(
  ({ coordXDA }) => ({
    style: {
      transform: `translateX(${coordXDA}px)`,
    },
  }),
)`
  font-size: 4rem; 
  line-height: 3.8rem;
  padding: 0;
  margin: 0;
  transition: all 0.8s cubic-bezier(.165,.84,.44,1);
`;
const Mes = styled.span.attrs(
  ({ coordXM }) => ({
    style: {
      transform: `translateX(${coordXM}px)`,
    },
  }),
)`
  font-size: 4rem;
  line-height: 3.8rem;
  padding: 0;
  margin: -5px 0 5px 0;
  color: transparent;
  -webkit-text-stroke: 0.1px ${(props) => props.colors.primary};
  transition: all 0.8s cubic-bezier(.165,.84,.44,1);
`;

export default function EventCard({
  img, name, dia, mes, ano, theme, backgroundImg, href,
}) {
  const router = useRouter();
  const ref = useRef(null);
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  const [coordX, setCoordX] = useState(0);

  useEffect(() => {
    setCoordX(ref.current.clientWidth / 2);
  }, []);

  function handleMouseMove(e) {
    setCoordX(e.nativeEvent.offsetX);
  }

  function handleClick(path) {
    setTransitionOpen(false);
    setTransitionTo('index');
    setTimeout(() => {
      if (router.pathname === path) router.reload(path);
      else router.push(path);
    }, 1300);
  }

  return (
    <Container
      bgImg={backgroundImg}
      colors={theme}
      onMouseMove={(e) => { handleMouseMove(e); }}
      ref={ref}
    >
      <div className="course-infos">
        <img src={img} alt={`Evento ${name}`} />
      </div>
      <div className="course-date">
        <DiaAno
          colors={theme}
          coordXDA={ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) : 0}
        >
          {dia}
        </DiaAno>
        <Mes
          colors={theme}
          coordXM={
            ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) * 1.5 : 0
          }
        >
          {mes.toLowerCase().slice(0, 3)}
        </Mes>
        <DiaAno
          theme={theme}
          coordXDA={ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) : 0}
        >
          {ano}
        </DiaAno>
      </div>
      <div className="subscrible-link">
        <CustomBtn handleClick={() => handleClick(href)} text="Saiba Mais" theme={{ textColor: theme.primary, btnBg: theme.bg, effectBg: `${theme.primary}35` }} />
      </div>
    </Container>
  );
}
