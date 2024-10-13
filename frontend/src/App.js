import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';  // 引入 MUI 的组件
import Shelter from './components/Shelter';
import FoodBank from './components/FoodBank';
import HealthSupport from './components/HealthSupport';
import EmergencyCall from './components/EmergencyCall';
import Weather from './components/Weather';  // 新增 Weather 组件
import AIChat from './components/AIChat'; 
import './App.css';

import aiIcon from './assets/AI.png'; // 使用相对路径引入图片
import WeatherIcon from './assets/weather.png';
import HouseIcon from './assets/HOUSE.png';
import FoodIcon from './assets/food bank.webp';
import HealthIcon from './assets/health-8.png';
import EmergencyIcon from './assets/124992.png';
import Cloud from './assets/CloudPng.webp';  // 引入背景图片

function App() {
  const [category, setCategory] = useState('');
  const [inputMethod, setInputMethod] = useState(null); // 用于跟踪当前的输入方式
  const [isRecording, setIsRecording] = useState(false);  
  const [audioBlob, setAudioBlob] = useState(null);  
  const mediaRecorderRef = useRef(null);  

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  // 开始录制语音
  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        let chunks = [];

        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);  
          chunks = [];
        };

        mediaRecorder.start();
        setIsRecording(true);  
      } catch (err) {
        console.error('Error accessing microphone', err);
      }
    } else {
      alert('Your browser does not support audio recording.');
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();  
      setIsRecording(false);  
    }
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');  

      try {
        const response = await fetch('http://localhost:6969/uploadVoice', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Audio uploaded successfully');
        } else {
          alert('Failed to upload audio');
        }
      } catch (error) {
        console.error('Error uploading audio:', error);
        alert('Error uploading audio');
      }
    }
  };

  const renderContent = () => {
    switch (category) {
      case 'shelter':
        return <Shelter onBack={() => handleCategoryClick('')} />;
      case 'food_bank':
        return <FoodBank onBack={() => handleCategoryClick('')} />;
      case 'health_support':
        return <HealthSupport onBack={() => handleCategoryClick('')} />;
      case 'emergency_call':
        return <EmergencyCall onBack={() => handleCategoryClick('')} />;
      case 'weather':
        return <Weather onBack={() => handleCategoryClick('')} />;
      case 'ai_chat':
        return <AIChat onBack={() => handleCategoryClick('')} />;
      default:
        return (
          <>
            {/* 欢迎标题 */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h4" component="div" gutterBottom sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                Welcome to HavenLink
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontSize: '16px', color: '#555' }}>
                A Smart City Solution for Assisting Homeless Communities
              </Typography>
              <Typography variant="body1" gutterBottom>
                Choose your input method and start interacting
              </Typography>
            </Box>

            {/* 输入方式的按钮 */}
            <Box sx={{ textAlign: 'center', my: 3, mb: 6 }}>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  color: 'black', 
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }, 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  borderRadius: '30px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                  backdropFilter: 'blur(10px)', 
                  width: '100%', 
                  maxWidth: '1200px', 
                  height: '50px', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }} 
                onClick={() => {
                  setInputMethod('voice');
                }}
              >
                Voice Input
              </Button>
            </Box>

            {/* Voice Input Recording Controls */}
            {inputMethod === 'voice' && (
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 6 }}>
                <Grid item>
                  {/* Start Recording Button */}
                  <Button 
                    variant="contained" 
                    onClick={startRecording} 
                    disabled={isRecording} 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      color: 'black', 
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }, 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      borderRadius: '30px', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                      backdropFilter: 'blur(10px)', 
                      height: '40px', 
                      width: '140px', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease' 
                    }}
                  >
                    Start 
                  </Button>
                </Grid>

                <Grid item>
                  {/* Stop Recording Button */}
                  <Button 
                    variant="contained" 
                    onClick={stopRecording} 
                    disabled={!isRecording} 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      color: 'black', 
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }, 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      borderRadius: '30px', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                      backdropFilter: 'blur(10px)', 
                      height: '40px', 
                      width: '140px', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease' 
                    }}
                  >
                    Stop 
                  </Button>
                </Grid>

                <Grid item>
                  {/* Upload Audio Button */}
                  <Button 
                    variant="contained" 
                    onClick={uploadAudio} 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      color: 'black', 
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }, 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      borderRadius: '30px', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                      backdropFilter: 'blur(10px)', 
                      height: '40px', 
                      width: '140px', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease' 
                    }} 
                    disabled={!audioBlob}
                  >
                    Upload
                  </Button>
                </Grid>

                <Grid item>
                  {/* Back Button */}
                  <Button 
                    variant="contained" 
                    onClick={() => setInputMethod(null)} 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      color: 'black', 
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }, 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      borderRadius: '30px', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                      backdropFilter: 'blur(10px)', 
                      height: '40px', 
                      width: '140px', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease' 
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}

            {/* 六个按钮的正方形布局 */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('food_bank')}
                >
                  <img 
                    src={FoodIcon}  
                    alt="Food Bank Icon" 
                    style={{ width: '60px', height: '60px', marginRight: '10px' }} 
                  />
                  Food Bank
                </Button>
              </Grid>

              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('shelter')}
                >
                  <img 
                    src={HouseIcon}  
                    alt="Shelter Icon" 
                    style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                  />
                  Shelter
                </Button>
              </Grid>

              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('emergency_call')}
                >
                  <img 
                    src={EmergencyIcon}  
                    alt="Emergency Call Icon" 
                    style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                  />
                  Emergency Call
                </Button>
              </Grid>

              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('health_support')}
                >
                  <img 
                    src={HealthIcon}  
                    alt="Health Support Icon" 
                    style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                  />
                  Health Support
                </Button>
              </Grid>

              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('weather')}
                >
                  <img 
                    src={WeatherIcon}  
                    alt="Weather Icon" 
                    style={{ width: '55px', height: '55px', marginRight: '10px' }} 
                  />
                  Weather
                </Button>
              </Grid>

              <Grid item xs={10} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    height: '150px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    color: 'black', 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} 
                  onClick={() => handleCategoryClick('ai_chat')}
                >
                  <img 
                    src={aiIcon}  
                    alt="AI Support Icon" 
                    style={{ width: '55px', height: '55px', marginRight: '10px' }} 
                  />
                  AI Emotional Support
                </Button>
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Cloud})`,  // 背景图像
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',  // 设置为全屏高度
        paddingBottom: '20px', 
      }}
    >
      <Container>
        {renderContent()}
      </Container>
    </div>
  );
}

export default App;
