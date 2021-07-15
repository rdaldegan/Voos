import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useTransition } from '../../context/transitionContext';

const Container = styled.nav`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;
  width: 50vw;
  height: 6vh;
  font-size: 62.5%;
  display: flex;
  flex-direction: row;
  align-items: center;

  ul{
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  li{
    margin: 0 0 0 2em;
    
    transition: 0.1s;
    :hover {
      transform: scale(1.05);
    }
    :active{
      transform: scale(1);
      transition: 0.1s;
    }
  }
  button{
    background: none;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 3em;
    line-height: 2.5em;
    color: #57523E;
    cursor: pointer;
  }
`;

const headerItens = [
  {
    name: 'Quem Somos',
    href: '/sobre',
  },
  {
    name: 'Eventos',
    href: '/portfolio',
  },
  {
    name: 'Orçamento',
    href: '/orçamento',
  },
];

export default function Header() {
  const router = useRouter();

  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

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
    <Container>
      <ul>
        {headerItens.map((item, index) => (
          <li key={index}>
            <button type="button" onClick={() => handleClick(item.href)}>
              {item.name.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
