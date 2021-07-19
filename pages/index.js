import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
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

const CustomButton = styled.button`
  position: relative;
  background: #F6C60C;
  border: none;
  color: black;
  border-radius: 15px;
  padding: 15px 30px;
  border-radius: 15px;
  font-size: 2rem;
  letter-spacing: 1px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  overflow: hidden;
  :hover{
    div{
      width: 100px;
      height: 100px;
    }
  }
  :active{
    div{
      width: 1000px;
      height: 1000px;
    }
  }
  span{
    position: relative;
    pointer-events: none;
    z-index: 1;
    font-weight: 600;
  }
`;

const BgDiv = styled.div.attrs(
  ({ coordX, coordY }) => ({
    style: {
      top: `${coordY}%`,
      left: `${coordX}%`,
    },
  }),
)`
  pointer-events: none;
  content: '';
  position: absolute;
  transform: translate(-49%, -49%);
  background: #47453c;
  border-radius: 50%;
  width: 0;
  height: 0;
  transition: width 0.4s, height 0.4s;
 `;

export default function Home() {
  const router = useRouter();
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  const buttonRef = useRef(null);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);

  function handleMouseMove(e) {
    setCoordX(e.nativeEvent.offsetX);
    setCoordY(e.nativeEvent.offsetY);
  }

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
        <CustomButton
          href="/home"
          ref={buttonRef}
          type="button"
          className="button"
          onClick={() => handleClick('/home')}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <BgDiv
            coordX={
              buttonRef.current ? Math.floor((coordX / buttonRef.current.clientWidth) * 100) : 0
            }
            coordY={
              buttonRef.current ? Math.floor((coordY / buttonRef.current.clientHeight) * 100) : 0
            }
          />
          <span>Faça parte</span>
        </CustomButton>
      </Title>
    </Container>
  );
}

// Imagem de <a href="https://pixabay.com/pt/users/thekaleidoscope-8956502/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Vishnu R</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3387324">Pixabay</a>
