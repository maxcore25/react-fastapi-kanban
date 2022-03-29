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
    console.log(taskId);
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.board.tasks;
    const { [taskId]: oldTask, ...newTasks } = tasks;

    props.setBoard({
      ...props.board,
      tasks: {
        ...newTasks,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {props.task.content}
          <span
            onClick={() =>
              // console.log(props.columnId, props.index, props.task.id)
              deleteTask(props.columnId, props.index, props.task.id)
            }>
            {' '}
            [X]
          </span>
        </Container>
      )}
    </Draggable>
  );
}
