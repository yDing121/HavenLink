import React from 'react';

function InputSelection({ onInputChange }) {
  return (
    <div>
      <h3>Please choose your input method</h3>
      <button onClick={() => onInputChange('voice')}>Voice Input</button>
      <button onClick={() => onInputChange('text')}>Text Input</button>
    </div>
  );
}

export default InputSelection;
