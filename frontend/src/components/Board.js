import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

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

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({ ...board, columnOrder: newColumnOrder });
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setBoard({
        ...board,
        columns: { ...board.columns, [newColumn.id]: newColumn },
      });

      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {board.columnOrder.map((columnId, index) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map(tasksId => board.tasks[tasksId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
