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

  .social-media-icons{
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .facebookIcon, .instagramIcon{
    margin: 0 15px;
    cursor: pointer;
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

export default function SocialProof({ data }) {
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
    <Container>
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
      <div className="social-media-icons">
        <a href="https://www.instagram.com/voosproducoes/">
          <img className="instagramIcon" src="/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/Voosproducoes/">
          <img className="facebookIcon" src="/facebook.svg" alt="Facebook" />
        </a>
      </div>
    </Container>
  );
}
