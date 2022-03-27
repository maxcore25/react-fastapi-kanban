import React, { useState } from 'react';

export default function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  function handleInputChange(e) {
    setShowNewTaskButton(true);
    addNewTask(props.columnId, value);
    setValue('');
  }

  function addNewTask(columnId, content) {
    const newTaskId = 'task-' + Math.floor(Math.random() * 100000);
    const column = props.board.column[columnId];
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
          onBlur={handleInputChange}
        />
      )}
    </div>
  );
}
