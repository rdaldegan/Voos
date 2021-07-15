import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useTransition } from '../src/context/transitionContext';

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
    <div>
      <button type="button" onClick={() => handleClick('/')}>
        Botao
      </button>
    </div>
  );
}
