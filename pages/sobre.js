import React, { useEffect } from 'react';

import { useTransition } from '../src/context/transitionContext';

export default function pages() {
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  useEffect(() => {
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);
  return (
    <div>
      oi
    </div>
  );
}
