/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';

import CustomBtn from '../CustomBtn';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 2fr 2fr 1fr;
    color: ${({ theme }) => theme.colors.primary};

    input,
    textarea{
      margin: 0px;
      padding: 5px;
      background: none;
      border: 4px solid ${({ theme }) => theme.colors.primary};
      border-radius: 20px;
      width: 80%;
      font-size: 0.8rem;
      :focus {
        outline: none;
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active
    {
      box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.secondary} inset !important;
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.secondary} inset !important;
    }

    .name,
    .email,
    .message{
      display: flex;
      flex-direction: column;
    }

    .header{
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      h3{
        font-family: 'Chau Philomene One', sans-serif;
        margin: 0;
      }
    }
    .message{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 5;
      textarea {
        width: 90%;
        resize: none;
      }
    }
    .feedback{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 6;
      grid-row-end: 7;
    }
  }
`;

export default function ContactForm({ theme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (e.button !== 0 || e.ctrlKey) {
      return;
    }
    if (email === '' || name === '' || message === '') {
      setFeedback('Preencha todos os campos');
    } else if (email.indexOf('@') < 0) {
      setFeedback('O email precisa de um @');
    } else if (email.indexOf('@') === 0 || email.indexOf('@') === email.length) {
      setFeedback('Email inválido');
    } else {
      setFeedback('Enviando...');
      const data = {
        name,
        email,
        message,
      };
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          setFeedback('');
          if (!res.ok) setFeedback(res.statusText);
          if (res.status === 200) {
            setFeedback('Email enviado com sucesso!');
            setName('');
            setEmail('');
            setMessage('');
          }
        })
        .catch((err) => {
          setFeedback(err);
        });
    }
  }

  return (
    <Container>
      <form>
        <div className="header">
          <h3>Fale conosco:</h3>
        </div>
        <div className="name">
          <label htmlFor="name">Nome</label>
          <input type="text" onChange={(e) => { setName(e.target.value); }} value={name} name="name" />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={(e) => { setEmail(e.target.value); }} value={email} name="email" />
        </div>
        <div className="message">
          <label htmlFor="message">Mensagem</label>
          <textarea rows="5" cols="60" name="Meesage" onChange={(e) => { setMessage(e.target.value); }} value={message} />
        </div>
        <CustomBtn handleClick={(e) => handleSubmit(e)} text="Enviar" btnTheme={{ textColor: theme.colors.secondary, btnBg: theme.colors.primary, effectBg: theme.colors.bg }} />
        <div className="feedback">
          {feedback && <span>{feedback}</span>}
        </div>
      </form>
    </Container>
  );
}
