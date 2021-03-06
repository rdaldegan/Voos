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

const Voos = styled.svg`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transition: 0.8s;
  pointer-events: ${(props) => props.canClick};
  z-index: 301;

  path, polygon {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Transition({ theme }) {
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
        fill={theme.colors.secondary}
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
        fill={theme.colors.secondary}
      >
        <path
          className="morph2"
          d={transitionClose}
        />
      </FixedSVG>
      <Voos
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 661.5 376.6"
        onClick={() => handleClick('/home')}
        canClick={router.pathname === '/' ? 'none' : 'auto'}
        width={transitionTo === 'index' ? '50%' : '20%'}
        height={transitionTo === 'index' ? '50%' : '15%'}
      >

        <path className="st0" d="M275.3,310.6H261v39h10.3v-12.4h4.2C296,338.1,296.5,308.9,275.3,310.6z M275,329h-3.7v-10.3h3.5C283.1,317.7,283,329.5,275,329z" />
        <path className="st0" d="M151.5,276.4c-1.2,5.6-3.3,9.8-4.7,9.8c-1,0-29.2-28.1-61.9-62.5c-51.1-53.8-59.8-64.2-59.8-73.6v-10.6c0.8,6.4,108.9,128.9,115.5,118.8c43.5-73.2,65.4-107.6,105.1-167.7c37.6-55.9,54.8-81.2,59.2-69C292.4,29.9,155.3,257.6,151.5,276.4z" />
        <path className="st0" d="M321.6,334.3c12.4-7.6,5.7-25.6-9.3-23.8h-14.8v39h10.3v-13.1h4l6.7,13.1h11.6L321.6,334.3z M311.5,328.3h-3.7v-9.6h3.7C320.1,317.6,319.5,328.9,311.5,328.3z" />
        <path className="st0" d="M351.7,309.8c-24.2-1.6-23.8,41.8,0,40.4C375.5,351.7,375.9,308.3,351.7,309.8z M351.7,341.4c-9.9,1.1-10.1-23.8,0-22.7C361.8,317.6,361.6,342.5,351.7,341.4z" />
        <path className="st0" d="M197.3,282c11.9-33.6,115.3-220.6,135.3-252.8c1.7,0,1.4,2.1-0.7,4.2c-18.3,31.1-76,142.7-97.7,182.2c-15.3,29.2-28.2,54.5-28.2,55.9c0,3.5,46.6,8.3,53.6,5.5c11.5-4.2,124.2-221.1,118.3-227c-2.1-3-28.7-9.5-29.2-14.2c0-1.7,0.4-3.1,1-3.1c3.5,0,35.8,11.8,38.3,13.5c5.5-1.3-112.3,231.5-108.9,229.4c0,1.7-1.4,3.5-3.5,3.5c-5.5-0.6-1.3-10.5-8.4-1.2C269,287.7,202,285.2,197.3,282z" />
        <path className="st0" d="M388.3,310.5h-11.5v39h12.1C414.9,351.4,415.1,308.1,388.3,310.5z M387.1,341.2v-22.4h0.6C401.9,317.1,401.1,343.4,387.1,341.2z" />
        <path className="st0" d="M447.3,330.7c2.4,26.5-34.4,26.5-32.2,0v-20.2h10.3v21.4c0,7,1.8,9.5,5.9,9.5s6-2.5,6-9.5v-21.4h10L447.3,330.7L447.3,330.7z" />
        <path className="st0" d="M374.3,277.9c-2.8-1-4.9,0-4.9,2.4c-2.3,7.9-72.1,0.6-76.6-1.1c3.3-8.4,30.3-59.4,16-24.6c-10.4,20.1-9,21.2,26.1,20.1c24.4-0.4,32.7-2.1,34.8-5.9c23.1-44.8,46-95.4,56.7-122.8c4.5-9.7,10.8-24.7,14.3-33.3c3.1-8.7,8.3-18.4,11.1-21.5c3.1-3.5,4.5-8,3.5-10.8c-2.1-5.2-43.5-21.5-47-18.4c-1,1.4-13.6,24.6-27.5,51.7c-19.8,40.5-35.5,61.8-16.3,23.3c6.6-9.4,37.8-78,48-81.9c1.7,0.5,50.2,16.2,50.8,19.5c-0.5,8-62.9,144.7-76.5,182.2C382.4,274.8,379.2,279.6,374.3,277.9z" />
        <path className="st0" d="M479.9,338l5.4,6.5c-2.6,3.1-6.1,5-10.1,5.5l-1.3,3.1c10.1,3.3,3,11.9-7.9,11.1l-0.7-4c7.2,0.1,8.7-4,1.4-4.9l2.6-5.3c-30.8-6.4-10.5-56.9,15.5-35l-5.4,6.6C459.2,306.6,459.9,354.7,479.9,338z" />
        <path className="st0" d="M504.8,309.8c-24.2-1.6-23.9,41.8,0,40.4C528.8,351.7,528.9,308.3,504.8,309.8z M504.8,341.4c-9.9,1.1-10.2-23.8,0-22.7C514.9,317.6,514.7,342.5,504.8,341.4z" />
        <path className="st0" d="M499.1,307.8l-6.6-0.5c0.4-6.6,3.8-9.1,8.2-9.1c5.5-0.3,8.5,6.8,9.9,0.6l6.6,0.5c-0.4,6.6-3.8,9.1-8.2,9.1C503.5,308.7,500.6,301.6,499.1,307.8z" />
        <polygon className="st0" points="540.2,340.8 555.7,340.8 555.7,349.5 529.9,349.5 529.9,310.5 555.1,310.5 555.1,319.1 540.2,319.1 540.2,325.2 552.9,325.2 552.9,333.8 540.2,333.8 " />
        <path className="st0" d="M575.7,350.2c-4.9,0-10.6-1.8-14.8-5.6l5.9-7.1c7,7.2,21.6,2.3,8.2-2.8c-5.9-2.2-12.8-4.8-12.8-12.9c-0.2-12.5,19.2-16,27.5-6.9l-5.2,6.5c-5.9-6-19.8-0.9-6.1,3.7l4.7,1.9C596.3,332,591.6,351,575.7,350.2z" />
        <path className="st0" d="M619.8,251.4c-24.9-10.8-71.9-58.5-102.6-80.9c-13.2-9.7-28.5-21.5-33.7-26.4c-5.5-4.5-9.7-6.6-9.7-4.5c0,2.5-1.4,4.2-3.5,4.2c-5.5,0-4.1-6.2,5.6-28.1c8.4-18,13.2-22.5,18.8-17c8.9,6.3,50.9,27,61.9,33.6c10.4,6.2,14.6,7.3,14.6,3.8c0.3-2.8,2.1-2.1,5.2,2.1c7.4,9.8,4.5-1.1,7.3-6.3c1.4-3.9-9.1-10.8-43.5-27.8c-25-12.8-47.3-22.9-49.4-22.9c-6.3,2-43.7,82.7-31.3,71.5c5.5-3.3,2.6,9,6.9,8.4c9.8,0,94.3,71.5,94.3,79.8c0,3.1-3.8,10.1-8.7,15.3c-8.3,19.6-74.7-0.6-102.6,5.6c-9.2,6.6-55-12.3-52.2,10.4c0,8.4,12.5,18.8,19.5,16c3.1-1.1,47-2.1,97.4-2.1c70.6-0.3,91.8-1,91.1-4.5c-1.7-7.9,6.9-33,11.2-19c0,3.1,1.4,2.8,3.5-0.7C624.1,255.3,624.5,251.5,619.8,251.4z M402.9,275.7c-2-1.1,1.8-14.8,5.5-13.8C412.7,262,403.7,276.3,402.9,275.7z M500.3,276.8c-4.1-3.7,10.9-7.2,11.8-5.5C514.9,273.7,503.8,278.9,500.3,276.8z M562.6,268.8c-17.6,8.8-11.7-4.5-0.7-3.1C569.2,265.7,569.2,266.1,562.6,268.8z M564.3,250.8c9.8-5.1,6.4-18.4,9.4-9C578.9,263.7,543.3,266.2,564.3,250.8z M585.7,274.7c-1.5-8.4-9.1-3-6.6-12.8c2.8-11.4-7.1,1.9-3.5-8.3c1.4-3.5,2.4-8.7,2.8-11.8c0.2-9.6,5.7,11.7,9.8,8.3c1.8-1,4.9,0.4,7,2.8c3.5,3.8,2.8,7.6-1.9,16.6C588.5,278.2,586.7,279.6,585.7,274.7z M599.4,274.7c-5.3,11.3-4.2-5.7-1.4-6.9C602.2,263.3,603.2,268.2,599.4,274.7z" />
      </Voos>
    </>
  );
}
