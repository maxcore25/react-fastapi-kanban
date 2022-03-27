import React, { useState } from 'react';

export default function AddColumn() {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');

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
