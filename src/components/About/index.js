import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .header{
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/brush-stroke-banner-7.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2{
      font-family: 'Chau Philomene One', sans-serif;
      color: #47453c;
      font-size: 4.5rem;
    }
  }
  .content{
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    .mission, .values{
      width: 100%;
      height: 100%;
      position: relative;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80%;
  
      h3{
        margin: 0;
        font-family: 'Chau Philomene One', sans-serif;
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
      <div className="header">
        <h2>Dando asas ao Hip Hop</h2>
      </div>
      <div className="content">
        <div className="text-container">
          <img className="bg-img" src="/brush-stroke-banner-4.svg" alt="imagem de mancha de tinta" />
          <div className="mission">
            <h3>
              Nossa Miss??o
            </h3>
            <p>
              {`A Voos produ????es come??ou em 2016 sempre buscando dar voz 
            ?? periferia e se expandiu para poder levar todo o 
            tipo de arte e lazer de forma diversa e autoral sem jamais 
            esquecer sua origem e raizes.`}
            </p>
          </div>
        </div>
        <img className="mission-img" src="/about.jpg" alt="Foto de evento" />
        <img className="values-img" src="/about2.jpg" alt="Foto de evento" />
        <div className="text-container">
          <img className="bg-img" src="/brush-stroke-banner-3.svg" alt="imagem de mancha de tinta" />
          <div className="values">
            <h3>
              Valores
            </h3>
            <ul>
              <li>Lazer</li>
              <li>Dar voz</li>
              <li>Seguran??a</li>
              <li>Diversidade</li>
              <li>Promo????o de cultura</li>
              <li>??tica nas rela????es de trabalho</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
