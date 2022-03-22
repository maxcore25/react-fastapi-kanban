import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export default function Column() {
  return (
    <Container>
      <Title>hello</Title>
    </Container>
  );
}
