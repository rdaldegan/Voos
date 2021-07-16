import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  height: 550px;
  margin: 70px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 6fr;
  grid-template-rows: 4fr 1fr 1fr;
  grid-gap: 30px;

  .carrousel{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 5;
  }

  .sp-img {
    width: 100%;
    height: 100%;
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 5;
    grid-column-end: 6;
    mask-image: url('/social-proof-mask.svg');
    mask-repeat: no-repeat;
    mask-position: center center;
    mask-size: contain;
  }

  .facebookIcon {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
    width: 70px;
    margin-left: auto;
  }

  .instagramIcon{
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 4;
    grid-column-end: 5;
    width: 70px;
    margin-left: auto;
  }
`;

const Citacao = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.opacity};
  transform: translateX(${(props) => props.translateX});
  transition: 2s;
  .text{
    font-size: 2.8rem;
    font-family: 'Merienda', cursive;
  }
  .author{
    margin-left: auto;
    font-family: 'Merienda', cursive;
    font-size: 2.5rem;
  }
`;
const data = [
  {
    text: 'Foda de mais! Esses caras sabem fazer um role truvante e responsa',
    author: 'fulano',
    url: '/social-propf.jpg',
  },
  {
    text: 'sadas d asdasda sd asdasdas dasda',
    author: 'sicrano',
    url: '/social-propf.jpg',
  },
  {
    text: 'asdaas sda asdsada sdasddas dasssssss sasa',
    author: 'beltrano',
    url: '/social-propf.jpg',
  },
];

export default function SocialProof() {
  const citacoes = data;
  const [currentItem, setCurrentItem] = useState(0);

  const componentIsMounted = useRef(true);
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (componentIsMounted.current) {
        if (currentItem === citacoes.length - 1) {
          setCurrentItem(0);
        } else {
          setCurrentItem(currentItem + 1);
        }
      }
    }, 4000);
  }, [currentItem]);

  return (
    <Container className="social-proof">
      <div className="carrousel">
        {citacoes.map((current, index) => {
          let translateX = '0px';
          if (currentItem < index) translateX = '150%';
          else if (currentItem > index) translateX = '-150%';
          return (
            <Citacao key={index} translateX={translateX} opacity={translateX === '0px' ? 1 : 0}>
              <div className="text">
                &ldquo;
                {current.text}
                &rdquo;
              </div>
              <div className="author">{current.author}</div>
            </Citacao>
          );
        })}
      </div>
      <img className="sp-img" src="/social-proof.jpg" alt="Foto de pessoas em festa" />
      <img className="instagramIcon" src="/instagram.svg" alt="Instagram" />
      <img className="facebookIcon" src="/facebook.svg" alt="Facebook" />
    </Container>
  );
}
