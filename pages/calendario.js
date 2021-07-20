import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';
import EventCard from '../src/components/EventCard';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default function Calendario() {
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
      <Cover coverUrl="/home-cover4.jpg" pathUrl="/home-cover-clip-path.svg" heigth="600px">
        <div>
          <h2>
            {`Fique por dentro de todas as datas 
            da Voos e não perca um segundo de emoção`}
          </h2>
        </div>
      </Cover>
      <EventCard img="/event-banner.png" dia={12} mes="agosto" ano={2022} />
    </Container>
  );
}
