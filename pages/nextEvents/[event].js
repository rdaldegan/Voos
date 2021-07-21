import React from 'react';

export async function getStaticPaths() {
  const eventos = [];
  const paths = [];

  for (let i = 0; i < eventos.length; i += 1) {
    paths.push({ params: { event: eventos[i] } });
  }

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: {

    },
    /* revalidate: 3600, */
  };
}

export default function Event() {
  return (
    <div />
  );
}
