import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import ContactForm from '../ContactForm';

const Container = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .form-container,
  .media-container,
  .logo-container{
    margin-top: auto;
    width: 30%;
    display: flex;
    align-items: center;
  }

  .form-container{
    height: 80%;
  }

  .media-container{
    height: 65%;
    a{
      margin: auto;
      width: 15%;
      img{
        width: 100%;
      }
    }
  }
  .logo-container{
    height: 85%;
    .logo {
      height: 80%;
    }
  }
`;

const SVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

export default function Footer() {
  const router = useRouter();
  return (
    <>
      {router.pathname !== '/'
      && (
        <Container>
          <SVG
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 1366 272"
            preserveAspectRatio="none"
            fill="#F6C60C"
          >
            <path
              d="M1366,272H0V38c0,0,135.8-105.1,477.5,32.5c144,58,441.3-24.4,515-31c246-22,373,50,373.5,69.5
              S1366,272,1366,272z"
            />
          </SVG>
          <div className="form-container">
            <ContactForm />
          </div>
          <div className="media-container">
            <a href="https://www.instagram.com/voosproducoes/">
              <img src="/instagram.svg" alt="Icone do Instagram" />
            </a>
            <a href="https://www.facebook.com/Voosproducoes/">
              <img src="/facebook.svg" alt="Icone do Facebook" />
            </a>
            <a href="https://web.whatsapp.com/send?phone=">
              <img src="/wpp-icon.svg" alt="Icone do Whats App" />
            </a>
            <a href="mailto:mockEmail">
              <img src="/email_icon.svg" alt="Icone do Email" />
            </a>
          </div>
          <div className="logo-container">
            <img className="logo" src="/voos.svg" alt="Logo da Voos produções" />
          </div>
        </Container>
      )}
    </>
  );
}
