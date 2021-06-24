import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import anime from 'animejs';

import {
  open, closed,
} from '../src/constants/transition';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('/concert.jpg');
  background-position: center;
  background-size: cover;
`;

const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Voos = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  pointer-events: none;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-15%, -50%);
  max-width: 35%;
  h2 {
    border-left: 8px solid #F6C60C;
    padding: 0 20px;
    color: black;
    font: Allerta;
    font-size: 64px;
  }
`;

export default function Home() {
  const exitAnimationRef = useRef(null);
  const enterAnimationRef = useRef(null);
  useEffect(() => {
    enterAnimationRef.current = anime({
      targets: '.morph',
      d: [
        { value: closed },
        { value: open },
      ],
      duration: 1300,
      easing: 'cubicBezier(.78,1.01,.5,.95)',
    });
  }, []);

  return (
    <Container>
      <Title>
        <h2>O que faz sua imaginação voar?</h2>
        <Link href="/sobre">Mudar de pagina</Link>
      </Title>
      <SVG
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 1366 768"
        preserveAspectRatio="none"
        fill="#F6C60C"
      >
        <path
          className="morph"
          initial={{ d: closed }}
          animate={
              {
                d: open,
                transition: {
                  delay: 0.5,
                  duration: 1.3,
                },
              }
}
          d={closed}
        />
      </SVG>
      <Voos src="/voos.svg" />
    </Container>
  );
}

// Imagem de <a href="https://pixabay.com/pt/users/thekaleidoscope-8956502/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Vishnu R</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Pixabay</a>
