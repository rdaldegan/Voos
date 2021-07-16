import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';
import SocialProof from '../src/components/SocialProof';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  max-height: '${(props) => props.maxHeight}';
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover{
    width: 100vw;
    height: 500px;
    background-image: url('/home-cover.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100% 25%;
    mask-image: url('/home-cover-clip-path.svg');
    mask-repeat: no-repeat;
    mask-position: center center;
    mask-size: cover;
    h2 {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -25%);
      text-align: center;
      width: 50vw;
      color: white;
      font-size: 2.5rem;
    }
  }
`;

export default function pages() {
  const router = useRouter();
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  useEffect(() => {
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  function handleClick(path) {
    setTransitionOpen(false);
    setTransitionTo('index');
    setTimeout(() => {
      if (router.pathname === path) {
        router.reload(path);
      } else router.push(path);
    }, 1300);
  }

  return (
    <Container maxHeight={true ? 'none' : '100vh'}>
      <div className="cover">
        <h2>
          {`Produtora cultural do movimento Hip Hop, 
        especializada em produção de shows e festivais`}
        </h2>
      </div>
      <SocialProof />
      <button type="button" onClick={() => handleClick('/')}>
        Botao
      </button>
    </Container>
  );
}
