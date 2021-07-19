import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import { useRouter } from 'next/router';

import { useTransition } from '../../context/transitionContext';

import {
  indexOpen, transitionClose, headerOpen, fixedOpen,
} from '../../constants/transition';

const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 300;
`;
const FixedSVG = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 300;
`;

const Voos = styled.img`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transition: 0.8s;
  pointer-events: ${(props) => props.canClick};
  z-index: 301;
`;

export default function Transition() {
  const router = useRouter();
  const enterAnimationRef = useRef(null);
  const enterAnimationRef2 = useRef(null);

  const {
    transitionTo,
    transitionOpen,
    setTransitionOpen,
    setTransitionTo,
  } = useTransition();

  function handleClick(path) {
    setTransitionOpen(false);
    setTransitionTo('index');
    setTimeout(() => {
      setTransitionTo('header');
      setTransitionOpen(true);
      router.push(path);
    }, 1300);
  }

  function runAnimation(start, animate) {
    enterAnimationRef.current = anime({
      targets: '.morph',
      d: [
        { value: start },
        { value: animate },
      ],
      duration: 1300,
      easing: 'cubicBezier(.78,1.01,.5,.95)',
    });

    let fixedStart = transitionClose;
    let fixedAnimate = fixedOpen;
    if (!transitionOpen) {
      fixedStart = fixedOpen;
      fixedAnimate = transitionClose;
    }
    enterAnimationRef2.current = anime({
      targets: '.morph2',
      d: [
        { value: fixedStart },
        { value: fixedAnimate },
      ],
      duration: 1300,
      easing: 'cubicBezier(.78,1.01,.5,.95)',
    });
  }

  function transitionIndex() {
    let start = transitionClose;
    let animate = indexOpen;
    if (!transitionOpen) {
      animate = transitionClose;
      start = indexOpen;
    }
    runAnimation(start, animate);
  }
  function transitionHeader() {
    let start = transitionClose;
    let animate = headerOpen;
    if (!transitionOpen) {
      animate = transitionClose;
      start = headerOpen;
    }
    runAnimation(start, animate);
  }

  useEffect(() => {
    if (transitionTo === 'index') {
      transitionIndex();
    } else {
      transitionHeader();
    }
  }, [transitionTo, transitionOpen]);

  return (
    <>
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
          d={transitionClose}
        />
      </SVG>
      <FixedSVG
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 1366 768"
        preserveAspectRatio="none"
        fill="#F6C60C"
      >
        <path
          className="morph2"
          d={transitionClose}
        />
      </FixedSVG>
      <Voos
        src="/voos.svg"
        onClick={() => handleClick('/home')}
        canClick={router.pathname === '/' ? 'none' : 'auto'}
        width={transitionTo === 'index' ? '50%' : '20%'}
        height={transitionTo === 'index' ? '50%' : '15%'}
      />
    </>
  );
}
