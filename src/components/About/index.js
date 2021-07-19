import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content{
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr;

    .header{
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      h2{
        font-family: 'Carter One', cursive;
        color: #F6C60C;
        font-size: 4.5rem;
      }
    }
    .mission, .values{
      position: relative;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 80%;
  
      h3{
        font-family: 'Carter One', cursive;
        font-size: 3rem;
      }
    }
  
    .mission{
      p{
        font-size: 2rem;
        line-height: 3rem;
        text-align: justify;
        text-justify: inter-word;
      }
    }
  
    .values{
      ul{
        list-style: none;
        display: flex;
        flex-direction: column;
      }
      li{
        font-size: 2rem;
        line-height: 3rem;
        margin: auto;
      }
    }
  
    .values-img,
    .mission-img{
      margin: auto;
      width: 100%;
      mask-image: url('/social-proof-mask.svg');
      mask-repeat: no-repeat;
      mask-position: center center;
      mask-size: contain;
    }
    
    .text-container{
      position: relative;
    }
    .bg-img{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(-25%);
      z-index: -1;
    }
  }
`;

export default function About() {
  return (
    <Container>
      <div className="background" />
      <div className="content">
        <div className="header">
          <h2>Dando asas ao Hip Hop</h2>
        </div>
        <div className="text-container">
          <img className="bg-img" src="/brush-stroke-banner-7.svg" alt="imagem de mancha de tinta" />
          <div className="mission">
            <h3>
              Nossa Missão
            </h3>
            <p>
              {`A Voos produções começou em 2016 sempre buscando dar voz 
            à periferia e se expandiu para poder levar todo o 
            tipo de arte e lazer de forma diversa e autoral sem jamais 
            esquecer sua origem e raizes.`}
            </p>
          </div>
        </div>
        <img className="mission-img" src="/about.jpg" alt="Foto de evento" />
        <img className="values-img" src="/about2.jpg" alt="Foto de evento" />
        <div className="text-container">
          <img className="bg-img" src="/brush-stroke-banner-6.svg" alt="imagem de mancha de tinta" />
          <div className="values">
            <h3>
              Valores
            </h3>
            <ul>
              <li>Segurança</li>
              <li>Diversidade</li>
              <li>Promoção de cultura</li>
              <li>Ética nas relações de trabalho</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
