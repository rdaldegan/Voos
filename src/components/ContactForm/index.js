/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 2fr 1fr 1fr;

    input,
    textarea{
      margin: 0px;
      padding: 5px;
      background: none;
      border: 4px solid #47453c;
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
      box-shadow: 0 0 0 30px #F6C60C inset !important;
      -webkit-box-shadow: 0 0 0 30px #F6C60C inset !important;
    }

    .name,
    .email,
    .message{
      display: flex;
      flex-direction: column;
    }

    .header{
      font-family: 'Carter One', cursive;
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0;
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

const CustomButton = styled.button`
  position: relative;
  border: none;
  background-color: #47453c;
  color: white;
  border-radius: 8px;
  font-size: 1.5rem;
  letter-spacing: 1px;
  cursor: pointer;
  overflow: hidden;
  :hover{
    div{
      width: 80px;
      height: 80px;
    }
  }
  :active{
    div{
      width: 1000px;
      height: 1000px;
    }
  }
  span{
      position: relative;
      pointer-events: none;
      z-index: 1;
      font-weight: 600;
    }
`;

const BgDiv = styled.div.attrs(
  ({ coordX, coordY }) => ({
    style: {
      top: `${coordY}%`,
      left: `${coordX}%`,
    },
  }),
)`
  pointer-events: none;
  content: '';
  position: absolute;
  transform: translate(-49%, -49%);
  background: #F6C60C;
  border-radius: 50%;
  width: 0;
  height: 0;
  transition: width 0.2s, height 0.2s;
 `;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buttonRef = useRef(null);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);

  function handleMouseMove(e) {
    setCoordX(e.nativeEvent.offsetX);
    setCoordY(e.nativeEvent.offsetY);
  }

  function handleSubmit(e) {
    setSubmitted(false);
    setLoading(true);
    e.preventDefault();
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
        setLoading(false);
        if (res.status === 200) {
          setSubmitted(true);
          setName('');
          setEmail('');
          setMessage('');
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Container>
      <form>
        <h3 className="header">Fale conosco:</h3>
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
        <CustomButton
          className="btn"
          ref={buttonRef}
          type="submit"
          onClick={(e) => handleSubmit(e)}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <BgDiv
            coordX={
              buttonRef.current ? Math.floor((coordX / buttonRef.current.clientWidth) * 100) : 0
            }
            coordY={
              buttonRef.current ? Math.floor((coordY / buttonRef.current.clientHeight) * 100) : 0
            }
          />
          <span>Enviar</span>
        </CustomButton>
        <div className="feedback">
          {loading && <span>Enviando...</span>}
          {submitted && <span>Email enviado com sucesso!</span>}
        </div>
      </form>
    </Container>
  );
}
