import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

import { AnimatePresence } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Voos Produções</title>
        <link rel="icon" href="/logo.svg" />
        <meta name="title" content="Voos Produções" />
        <meta name="description" content="O que faz a sua imaginação voar?" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="Voos Produções" />
        <meta property="og:description" content="O que faz a sua imaginação voar?" />
        <meta property="og:image" content="/logo-black.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="" />
        <meta property="twitter:title" content="Voos Produções" />
        <meta property="twitter:description" content="O que faz a sua imaginação voar?" />
        <meta property="twitter:image" content="/logo-black.jpg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
