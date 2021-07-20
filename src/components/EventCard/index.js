import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  background: linear-gradient( rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0.6) ), url('/home-cover.jpg');
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
  height: 250px;
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
  }

  .course-date {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.tertiary};
    pointer-events: none;
  }

  .subscrible-link{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    a{
      font-family: 'Otomanopee One', sans-serif;
      width: 200px;
      height: 60px;
      border-radius: 25px;
      background: ${({ theme }) => theme.colors.tertiary};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.tertiary};
      font-size: 25px;
      font-weight: bolder;
      pointer-events: all;
      color: white;
      text-decoration: none;
      transition: 0.3s;
      :hover {
        transform: scale(1.1);
      }
      :active{
        transform: scale(1);
      }
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
  -webkit-text-stroke: 0.1px ${({ theme }) => theme.colors.tertiary};
  transition: all 0.8s cubic-bezier(.165,.84,.44,1);
`;

export default function SincCourseAd({
  img, dia, mes, ano,
}) {
  const ref = useRef(null);

  const [coordX, setCoordX] = useState(0);

  useEffect(() => {
    setCoordX(ref.current.clientWidth / 2);
  }, []);

  function handleMouseMove(e) {
    setCoordX(e.nativeEvent.offsetX);
  }

  return (
    <Container
      onMouseMove={(e) => { handleMouseMove(e); }}
      ref={ref}
    >
      <div className="course-infos">
        <img src={img} alt="Foto de capa do evento" />
      </div>
      <div className="course-date">
        <DiaAno
          className="dia"
          coordXDA={ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) : 0}
        >
          {dia}
        </DiaAno>
        <Mes
          className="mes"
          coordXM={
            ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) * 1.5 : 0
          }
        >
          {mes.slice(0, 3)}
        </Mes>
        <DiaAno
          className="ano"
          coordXDA={ref.current ? Math.floor((coordX / ref.current.clientWidth) * 100 - 50) : 0}
        >
          {ano}
        </DiaAno>
      </div>
      <div className="subscrible-link">
        <Link href="/">SAIBA MAIS</Link>
      </div>
    </Container>
  );
}
