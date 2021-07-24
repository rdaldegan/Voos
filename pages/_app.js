import React, { useState } from 'react';
import Router from 'next/router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import TransitionProvider from '../src/context/transitionContext';

import Transition from '../src/components/Transition';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const initialTheme = {
  colors: {
    primary: '#47453c',
    secondary: '#F6C60C',
    tertiary: '#A37D05',
    bg: '#FFFFFF',
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background-color: #FFFFFF;
  }
  #nprogress .bar {
    background: ${initialTheme.colors.primary} !important;
  }
`;

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#47453c',
      secondary: '#F6C60C',
      tertiary: '#A37D05',
      bg: '#FFFFFF',
    },
  });
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  return (
    <>
      <Head>
        <title>Voos Produções</title>
        <link rel="icon" href="/contrast-logo.svg" />
        <meta name="title" content="Voos Produções" />
        <meta name="description" content="O que faz a sua imaginação voar?" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://voos.vercel.app/" />
        <meta property="og:title" content="Voos Produções" />
        <meta property="og:description" content="O que faz a sua imaginação voar?" />
        <meta property="og:image" content="/contrast-logo.svg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://voos.vercel.app/" />
        <meta property="twitter:title" content="Voos Produções" />
        <meta property="twitter:description" content="O que faz a sua imaginação voar?" />
        <meta property="twitter:image" content="/contrast-logo.svg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Merienda&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <TransitionProvider>
          <Header />
          <Component
            {...pageProps}
            theme={theme}
            setTheme={setTheme}
          />
          <Transition theme={theme} />
          <Footer theme={theme} />
        </TransitionProvider>
      </ThemeProvider>
    </>
  );
}
