import React, { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export default function TransitionProvider({ children }) {
  const [transitionTo, setTransitionTo] = useState(null);
  const [transitionOpen, setTransitionOpen] = useState(true);

  return (
    <TransitionContext.Provider value={{
      transitionTo,
      setTransitionTo,
      transitionOpen,
      setTransitionOpen,
    }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('useTransition must have a TransitionProvider wrapper in root application');
  const {
    transitionTo,
    setTransitionTo,
    transitionOpen,
    setTransitionOpen,
  } = context;

  return {
    transitionTo,
    setTransitionTo,
    transitionOpen,
    setTransitionOpen,
  };
}
