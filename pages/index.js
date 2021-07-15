import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTransition } from '../src/context/transitionContext';

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
    border-left: 8px solid #F6C60C;
    padding: 0 20px;
    color: #333333;
    font-size: 6em;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: black;
  background-color: #F6C60C;
  padding: 15px 30px;
  border-radius: 15px;
  font-size: 2.5em;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: 0.2s;
  :active {
    transform: scale(0.95);
  }
`;

export default function Home() {
  const router = useRouter();
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  function handleClick(path) {
    setTransitionOpen(false);
    setTransitionTo('index');
    setTimeout(() => {
      router.push(path);
    }, 1300);
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
        <Button href="/home" onClick={() => handleClick('/home')}>Experiencie</Button>
      </Title>
    </Container>
  );
}

// Imagem de <a href="https://pixabay.com/pt/users/thekaleidoscope-8956502/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Vishnu R</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Pixabay</a>
