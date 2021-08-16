import React from 'react';
import styled from 'styled-components';

import AnimatedDiv from './AnimatedDiv';

const Container = styled.div`
`;

export default function budgetForm() {
  return (
    <Container>
      <AnimatedDiv>
        AnimatedDiv
      </AnimatedDiv>
      <form>
        <header>
          header
        </header>
      </form>
    </Container>
  );
}
