import React, { useState } from 'react';

export default function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  return (
    <div>
      {setShowNewTaskButton ? (
        <button>New</button>
      ) : (
        <input type='text' value={value} />
      )}
    </div>
  );
}
