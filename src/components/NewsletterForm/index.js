import React, { useState } from 'react';
import { decode } from 'html-entities';
import styled from 'styled-components';

import CustomBtn from '../CustomBtn';

const Container = styled.div`
  background-color: #F6C60C;
  width: 550px;
  height: 550px;
  margin: 100px 0;
  mask-image: url('/social-proof-mask.svg');
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #47453c;

  .inputs{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px;
    height: 100%;
    
    h3,h4{
      margin: 0 0 30px 0;
      max-width: 80%;
      
    }
    h3{
      font-family: 'Carter One', cursive;
      font-size: 2rem;
    }
    h4 {
      font-size: 1.5rem;
    }
    input {
      margin: 10px 10px 20px 10px;
      padding: 10px 15px;
      background: none;
      border: 4px solid #47453c;
      border-radius: 20px;
      width: 80%;
      font-size: 1.4rem;
      :focus {
        outline: none;
      }
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active
  {
    box-shadow: 0 0 0 30px #F6C60C inset !important;
    -webkit-box-shadow: 0 0 0 30px #F6C60C inset !important;
  }
`;

export default function NewsletterForm({ status, message, onValidated }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  function handleFormSubmit() {
    setError(null);

    if (!email || !name) {
      setError('Preencha todos os campos');
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email, NAME: name });
    return email && email.indexOf('@') > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  function handleInputKeyEvent(event) {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} mess
   * @return {null|*}
   */
  function getMessage(mess) {
    if (mess.indexOf('is already subscribed') > -1) {
      const mySubString = mess.substring(
        mess.lastIndexOf('href="') + 6,
        mess.lastIndexOf('">Click'),
      );
      return (
        <a href={mySubString}>Email já cadastrado. Clique aqui para mudar suas preferências</a>
      );
    }
    if (mess.indexOf('has too many recent signup requests') > -1) {
      return 'Muitos pedidos de inscrição recentes com este email';
    }
    switch (mess) {
      case '0 - An email address must contain a single @':
        return "Um email precisa de um único '@'";
      case '0 - The domain portion of the email address is invalid (the portion after the @: )':
        return "Domínio do email inválido (parte após o '@')";
      case '0 - The username portion of the email address is empty':
        return 'A parte do email antes do @ está em branco';
      case 'Thank you for subscribing!':
        return 'Valeu ai e boa sorte!';
      default:
        return mess ? decode(mess) : null;
    }
  }

  return (
    <Container>
      <div className="inputs">
        <h3>
          Inscreva-se!
        </h3>
        <h4>
          {`Fique por dentro de todas as novidades
          da Voos e concorra a prêmios, ingressos, brindes,
          cortesias em eventos e muito mais!`}
        </h4>
        <input
          onChange={(event) => setName(event?.target?.value ?? '')}
          type="text"
          placeholder="Nome completo"
          className="name-input"
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
        <input
          onChange={(event) => setEmail(event?.target?.value ?? '')}
          type="email"
          placeholder="Seu email favorito"
          className="email-input"
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
        <CustomBtn handleClick={() => handleFormSubmit()} text="Faça Parte" theme={{ textColor: '#FFFFFF', btnBg: '#47453c', effectBg: '#A37D05' }} />
        <div className="info">
          {status === 'sending' && <div>Sending...</div>}
          {status === 'error' || error ? (
            <div className="error">
              {error || getMessage(message) }
            </div>
          ) : null }
          {status === 'success' && status !== 'error' && !error && (
          <div className="sucess">
            { getMessage(message) }
          </div>
          )}
        </div>
      </div>
    </Container>
  );
}
