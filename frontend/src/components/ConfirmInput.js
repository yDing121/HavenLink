import React from 'react';

function ConfirmInput({ transcript, onConfirm }) {
  return (
    <div>
      <h3>Please confirm if the following transcribed content is correct:</h3>
      <p>{transcript}</p>
      <button onClick={() => onConfirm(true)}>Correct</button>
      <button onClick={() => onConfirm(false)}>Incorrect</button>
    </div>
  );
}

export default ConfirmInput;
