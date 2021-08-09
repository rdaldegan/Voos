import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTransition } from '../src/context/transitionContext';
import CustomBtn from '../src/components/CustomBtn';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-15%, -65%);
  max-width: 35%;
  h2 {
    text-align: left;
    border-left: 8px solid #F6C60C;
    padding: 0 20px;
    color: #333333;
    font-size: 6em;
  }
`;

export default function Home() {
  const router = useRouter();
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  function handleClick(e, path) {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey === true)) {
      window.open('/home');
    } else if (e.button === 0) {
      setTransitionOpen(false);
      setTransitionTo('index');
      setTimeout(() => {
        router.push(path);
      }, 1300);
    }
  }

  useEffect(() => {
    setTransitionTo('index');
    setTransitionOpen(true);
  }, []);

  return (
    <Container>
      <Image src="/concert.jpg" layout="fill" />
      <Title>
        <h2>O QUE FAZ A SUA IMAGINAÇÃO VOAR?</h2>
        <CustomBtn handleClick={(e) => handleClick(e, '/home')} text="FAÇA PARTE" theme={{ textColor: '#47453c', btnBg: '#F6C60C', effectBg: '#A37D05' }} />
      </Title>
    </Container>
  );
}

// Imagem de <a href="https://pixabay.com/pt/users/thekaleidoscope-8956502/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Vishnu R</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Pixabay</a>
