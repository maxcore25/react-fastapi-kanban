import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

export default function Board() {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };
  const [board, setBoard] = useState(initialData);

  useEffect(() => {
    fetchBoard().then(data => setBoard(data));
  }, []);

  async function fetchBoard() {
    const response = await fetch('http://127.0.0.1:8000/board');
    const data = await response.json();
    console.log(data);
    return data.board;
  }

  return (
    <Container>
      Board
      <div></div>
    </Container>
  );
}
