import React from 'react';
import styled from 'styled-components';

import ImageDiv from './internalCompnents/ImageDiv';
import Form from './internalCompnents/Form';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 80vw;
  height: 500px;
  margin: 35px 0 100px 0;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  background-color: #FFFFFF;
`;

export default function YpurEventsForm({ theme }) {
  return (
    <Container>
      <ImageDiv />
      <Form theme={theme} />
    </Container>
  );
}
