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
import { Container, Box, Typography, Button } from '@mui/material';  // 引入 Material-UI 组件

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

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setConfirmed(true);  // 确保点击按钮后直接跳转到相应的页面
  };

  const renderContent = () => {
    if (!inputMethod) {
      return <InputSelection onInputChange={handleInputChange} />;
    }

    if (!transcript && !confirmed) {
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

        {/* Voice and Text Input buttons */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Button variant="outlined" onClick={() => handleInputChange('voice')} sx={{ mx: 2 }}>
            Voice Input
          </Button>
          <Button variant="outlined" onClick={() => handleInputChange('text')} sx={{ mx: 2 }}>
            Text Input
          </Button>
        </Box>

        {/* New buttons for direct page navigation */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => handleCategoryClick('food_bank')} sx={{ mx: 1 }}>
            FoodBank
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleCategoryClick('shelter')} sx={{ mx: 1 }}>
            Shelter
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleCategoryClick('emergency_call')} sx={{ mx: 1 }}>
            Emergency Call
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleCategoryClick('health_support')} sx={{ mx: 1 }}>
            Health Support
          </Button>
        </Box>

        {renderContent()}
      </Box>
    </Container>
  );
}

export default App;
