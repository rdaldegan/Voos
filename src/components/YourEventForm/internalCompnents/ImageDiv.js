import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 40%;
  border-radius: 25px;
  background-color: gainsboro;

  background-image: url('/form-image.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
`;

export default function ImageDiv() {
  return (
    <Container />
  );
}
