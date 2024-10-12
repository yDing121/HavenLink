import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function TextInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onSubmit(input);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <textarea 
        label="Please enter your request"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
      Submit
      </Button>
    </Box>
  );
}

export default TextInput;
