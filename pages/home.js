import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';
import About from '../src/components/About';
import SocialProof from '../src/components/SocialProof';
import MailchimpForm from '../src/components/MailchimpForm';

const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .spacer{
    margin: 100px 0 50px 0;
  }
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
    font-family: 'Wendy One', sans-serif;
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

const data = [
  {
    text: 'Foda de mais! Esses caras sabem fazer um role truvante e responsa',
    author: 'fulano',
  },
  {
    text: 'sadas d asdasda sd asdasdas dasda',
    author: 'sicrano',
  },
  {
    text: 'asdaas sda asdsada sdasddas dasssssss sasa',
    author: 'beltrano',
  },
];

export default function pages() {
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  const citationsList = data;

  useEffect(() => {
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  return (
    <Container>
      <Cover coverUrl="/home-cover.jpg" pathUrl="/home-cover-clip-path.svg" heigth="600px">
        <h2>
          {`Produtora cultural do movimento Hip Hop, 
        especializada em produção de shows e festivais`}
        </h2>
      </Cover>
      <About />
      <div className="spacer">
        <Cover coverUrl="/home-cover2.jpg" pathUrl="/home-cover-clip-path2.svg" heigth="700px" />
      </div>
      <SocialProof data={citationsList} />
      <MailchimpForm />
    </Container>
  );
}
