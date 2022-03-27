import React, { useState } from 'react';

export default function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');

  function handleInputComplete() {
    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue('');
  }

  function addNewColumn(title) {
    const newColumnOrder = Array.from(props.board.columnOrder);
    const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title,
      taskIds: [],
    };

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: newColumnOrder,
    });
  }

  return (
    <div>
      {showNewColumnButton ? (
        <button onClick={() => setShowNewColumnButton(false)}>New</button>
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
