import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .header{
    background-image: url('/brush-stroke-banner-6.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2{
      font-family: 'Carter One', cursive;
      color: #47453c;
      font-size: 4.5rem;
    }
  }
  .no-events{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .warning{
      font-size: 2rem;
      width: 80%;
    }
  }
`;

export async function getStaticProps() {
  const base = process.env.API_BASE_URL;

  const url = new URL('/api/calendario', base);
  let nextEvents = await fetch(url, {
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

  if (nextEvents) {
    nextEvents = nextEvents[0].data;
  } else {
    nextEvents = [];
  }

  return {
    props: {
      nextEvents,
    },
    revalidate: 60,
  };
}

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
      batata
    </Container>
  );
}
