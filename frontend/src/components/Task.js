import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default function Task(props) {
  function deleteTask(columnId, index, taskId) {
    const column = props.board.columns[columnId];
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}
