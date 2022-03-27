import React, { useState } from 'react';

export default function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  function handleInputComplete() {
    setShowNewTaskButton(true);
    addNewTask(props.columnId, value);
    setValue('');
  }

  function addNewTask(columnId, content) {
    console.log(props.board);

    const newTaskId = 'task-' + Math.floor(Math.random() * 100000);
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content,
    };

    props.setBoard({
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...props.board.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    });
  }

  return (
    <div>
      {showNewTaskButton ? (
        <button onClick={() => setShowNewTaskButton(false)}>New</button>
      ) : (
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleInputComplete}
        />
      )}
    </div>
  );
}
