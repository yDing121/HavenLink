import React, { useState } from 'react';

function VoiceInput({ onSubmit }) {
  const [message, setMessage] = useState('');

  const startRecognition = () => {
    const recognition = new window.SpeechRecognition();
    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <div>
      <button onClick={startRecognition}>Click to Start Voice Input</button>
      {message && <p>Transcribed Content: {message}</p>}
      <button onClick={() => onSubmit(message)}>Submit</button>
    </div>
  );
}

export default VoiceInput;
