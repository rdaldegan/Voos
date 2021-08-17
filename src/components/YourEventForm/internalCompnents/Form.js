/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';

import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti';

import CustomBtn from '../../CustomBtn';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 60%;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  form{
    display: grid;
    max-width: 70%;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormPage = styled.div.attrs(
  ({
    offset,
  }) => ({
    style: {
      transform: `translateX(${offset})`,
    },
  }),
)`
  grid-area: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: 0.5s cubic-bezier(.39,.06,.38,.85);

  h3{
    font-size: 2rem;
    font-family: 'Chau Philomene One', sans-serif;
    margin: 0;
  }

  .input-div{
    margin: 10px;
  }

  input,
  textarea{
    margin: 0px;
    padding: 5px;
    background: none;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    width: 97%;
    font-size: 1.4rem;
    resize: none;
    :focus {
      outline: none;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active
  {
    box-shadow: 0 0 0 30px #FFFFFF inset !important;
    -webkit-box-shadow: 0 0 0 30px #FFFFFF inset !important;
  }
`;

const PreviousButton = styled.button.attrs(
  ({
    display,
  }) => ({
    style: {
      display,
    },
  }),
)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  cursor: pointer;
  border: none;
  background: none;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};

  transition: 0.3s;
  :hover{
    transform: translateX(-10%) translateY(-50%);
  }
  :active{
    transform: translateX(10%) translateY(-50%);
  }
`;

const NextButton = styled.button.attrs(
  ({
    display,
  }) => ({
    style: {
      display,
    },
  }),
)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  border: none;
  background: none;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};

  transition: 0.3s;
  :hover{
    transform: translateX(10%) translateY(-50%);
  }
  :active{
    transform: translateX(-10%) translateY(-50%);
  }
`;

const StepSection = styled.div`
  position: absolute;
  top: 18px;
  left: 50%;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Chau Philomene One', sans-serif;
  font-size: 1.5rem;
  transform: translateX(-50%);
`;

export default function Form({ theme }) {
  const [current, setCurrent] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [evento, setEvento] = useState('');
  const [tipo, setTipo] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState(0);
  const [dataEstimada, setDataEstimada] = useState('');

  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const date = new Date();

  let mes = date.getMonth() + 1;
  if (mes < 10) {
    mes = `0${mes}`;
  }
  const dataAtual = `${date.getFullYear()}-${mes}-${date.getDate()}`;

  function handleSubmit(e) {
    e.preventDefault();
    if (e.button !== 0 || e.ctrlKey) {
      return;
    }
    if (email === '' || name === '' || tipo === '' || numeroPessoas === 0 || dataEstimada === '' || message === '') {
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
        evento,
        tipo,
        numeroPessoas,
        dataEstimada,
        message,
      };
      fetch('/api/orcamento', {
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
            setFeedback('Email enviado com sucesso! Te retornaremos em breve');
            setName('');
            setEmail('');
            setEvento('');
            setTipo('');
            setNumeroPessoas(0);
            setDataEstimada('');
            setMessage('');
          }
        })
        .catch((err) => {
          setFeedback(err);
        });
    }
  }

  function handlePreviousPage(newCurrent) {
    setFeedback('');
    setCurrent(newCurrent);
  }

  function handleNextPage(newCurrent) {
    switch (newCurrent) {
      case 1:
        if (email === '' || name === '') {
          setFeedback('Por favor preencha todos os campos');
        } else if (email.indexOf('@') < 0) {
          setFeedback('O email precisa de um @');
        } else if (email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1) {
          setFeedback('Email inválido');
        } else {
          setCurrent(newCurrent);
          setFeedback('');
        }
        break;
      case 2:
        if (evento === '' || tipo === '' || numeroPessoas === 0 || dataEstimada === '') {
          setFeedback('Por favor preencha todos os campos');
        } else {
          setCurrent(newCurrent);
          setFeedback('');
        }
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <StepSection>
        <span>{`${current + 1}/3`}</span>
      </StepSection>
      <form>
        <FormPage offset={current === 0 ? '0px' : '-200%'}>
          <div>
            <header className="header">
              <h3>
                Primeiro nos conte um pouco sobre você
              </h3>
            </header>
            <div className="input-div">
              <label htmlFor="name">Nome</label>
              <input type="text" onChange={(e) => { setName(e.target.value); }} value={name} name="name" />
            </div>
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => { setEmail(e.target.value); }} value={email} name="email" />
            </div>
          </div>
        </FormPage>
        <FormPage offset={current === 1 ? '0px' : '-200%'}>
          <div>
            <header className="header">
              <h3>
                Também gostaríamos de algumas informações sobre esse evento
              </h3>
            </header>
            <div className="input-div">
              <label htmlFor="evento">Nome do evento</label>
              <input type="text" onChange={(e) => { setEvento(e.target.value); }} value={evento} name="evento" />
            </div>
            <div className="input-div">
              <label htmlFor="tipo">Tipo de evento</label>
              <input type="text" onChange={(e) => { setTipo(e.target.value); }} value={tipo} name="tipo" placeholder="Festa, show, festival..." />
            </div>
            <div className="input-div">
              <label htmlFor="numeroPessoas">Quantidade de ingressos</label>
              <input type="number" min={0} onChange={(e) => { setNumeroPessoas(e.target.value); }} value={numeroPessoas} name="numeroPessoas" />
            </div>
            <div className="input-div">
              <label htmlFor="data">Provável data</label>
              <input type="date" min={dataAtual} onChange={(e) => { setDataEstimada(e.target.value); }} value={dataEstimada} name="data" />
            </div>
          </div>
        </FormPage>
        <FormPage offset={current === 2 ? '0px' : '-200%'}>
          <div>
            <header className="header">
              <h3>
                E o que mais você quer nos contar sobre essa ideia?
              </h3>
            </header>
            <div className="input-div">
              <textarea rows="5" cols="60" name="Message" onChange={(e) => { setMessage(e.target.value); }} value={message} />
            </div>
          </div>
          <CustomBtn
            handleClick={(e) => handleSubmit(e)}
            text="Enviar"
            btnTheme={{
              textColor: theme.colors.bg,
              btnBg: theme.colors.primary,
              effectBg: theme.colors.secondary,
              shadow: theme.colors.primary,
            }}
          />
        </FormPage>
        <div className="feedback">
          {feedback && <span>{feedback}</span>}
        </div>
      </form>
      <PreviousButton onClick={() => handlePreviousPage(current - 1)} display={current <= 0 ? 'none' : 'flex'}>
        <TiArrowLeftOutline />
      </PreviousButton>
      <NextButton onClick={() => handleNextPage(current + 1)} display={current >= 2 ? 'none' : 'flex'}>
        <TiArrowRightOutline />
      </NextButton>
    </Container>
  );
}
