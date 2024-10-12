import React, { useState } from 'react';
import Header from './components/Header';
import IntroVideo from './components/IntroVideo';
import InputSelection from './components/InputSelection';
import VoiceInput from './components/VoiceInput';
import TextInput from './components/TextInput';
import ConfirmInput from './components/ConfirmInput';
import Shelter from './components/Shelter';
import FoodBank from './components/FoodBank';
import HealthSupport from './components/HealthSupport';
import EmergencyCall from './components/EmergencyCall';
import NoMatch from './components/NoMatch';
import { Box, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F9AC1F',
    },
    secondary: {
      main: '#FEFBF5',
    },
  },
});


function App() {
  const [inputMethod, setInputMethod] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (method) => {
    setInputMethod(method);
    setConfirmed(false);
    setCategory('');
    setError(false);
  };

  const handleSubmit = async (message) => {
    // Send message to LLM for category analysis
    setTranscript(message);
    
    const response = await fetch('/api/analyze', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: message }),
    });
    const data = await response.json();
    
    if (['shelter', 'food_bank', 'health_support', 'emergency_call'].includes(data.category)) {
      setCategory(data.category); 
    } else {
      setError(true); 
    }
  };

  const handleConfirm = (isCorrect) => {
    if (isCorrect) {
      setConfirmed(true);
    } else {
      handleInputChange(null);
    }
  };

  const renderContent = () => {
    if (!inputMethod) {
      return <InputSelection onInputChange={handleInputChange} />;
    }

    if (!transcript) {
      return inputMethod === 'voice' ? (
        <VoiceInput onSubmit={handleSubmit} />
      ) : (
        <TextInput onSubmit={handleSubmit} />
      );
    }

    if (!confirmed) {
      return <ConfirmInput transcript={transcript} onConfirm={handleConfirm} />;
    }

    if (error) {
      return <NoMatch onRetry={() => handleInputChange(null)} />;
    }

    switch (category) {
      case 'shelter':
        return <Shelter />;
      case 'food_bank':
        return <FoodBank />;
      case 'health_support':
        return <HealthSupport />;
      case 'emergency_call':
        return <EmergencyCall />;
      default:
        return <NoMatch onRetry={() => handleInputChange(null)} />;
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Header />
        <IntroVideo />
        <Typography variant="h4" gutterBottom>
          Choose your input method and start interacting
        </Typography>
        {renderContent()}
      </Box>
    </Container>
  );
}



export default App;
