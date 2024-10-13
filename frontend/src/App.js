import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';  // 引入 MUI 的组件
import Shelter from './components/Shelter';
import FoodBank from './components/FoodBank';
import HealthSupport from './components/HealthSupport';
import EmergencyCall from './components/EmergencyCall';
import Weather from './components/Weather';  // 新增 Weather 组件
import AIChat from './components/AIChat'; 


function App() {
  const [category, setCategory] = useState('');
  const [inputMethod, setInputMethod] = useState(null); // 用于跟踪当前的输入方式
  const [isRecording, setIsRecording] = useState(false);  // 录音状态
  const [audioBlob, setAudioBlob] = useState(null);  // 存储录音的音频数据
  const mediaRecorderRef = useRef(null);  // 引用 MediaRecorder 对象
  
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
          setAudioBlob(audioBlob);  // 保存音频数据
          chunks = [];
        };

        mediaRecorder.start();
        setIsRecording(true); // 设置录音状态为 true
      } catch (err) {
        console.error('Error accessing microphone', err);
      }
    } else {
      alert('Your browser does not support audio recording.');
    }
  };


// Upload录制的音频
  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');  // 将音频命名为 recording.wav

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

  // 停止录音并上传音频
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();  // 停止录制
      setIsRecording(false);  // 停止录音状态
    }
  };
//
//  // 上传录制的音频
//  const uploadAudio = async () => {
//    if (audioBlob) {
//      const formData = new FormData();
//      formData.append('audio', audioBlob, 'recording.wav');  // 将音频命名为 recording.wav
//
//      const response = await fetch('http://localhost:6969/uploadVoice', {
//        method: 'POST',
//        body: formData,  // 上传表单数据
//      });
//
//      if (response.ok) {
//        alert('Audio uploaded successfully');
//      } else {
//        alert('Failed to upload audio');
//      }
//    }
//  };

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
              <Typography variant="h4" component="div" gutterBottom>
                Welcome to HavenLink
              </Typography>
              <Typography variant="body1" gutterBottom>
                Choose your input method and start interacting
              </Typography>
            </Box>

            {/* 输入方式的按钮 */}
            <Box sx={{ textAlign: 'center', my: 3, mb: 6 }}>
              <Button variant="outlined" sx={{ mx: 2 }} onClick={() => setInputMethod('voice')}>
                Voice Input
              </Button>
            </Box>

            {/* Voice Input 录音控件 */}
            {inputMethod === 'voice' && (
              <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
                <Typography variant="body1" gutterBottom>
                  {isRecording ? "Recording audio... Click stop to finish." : "Click start to begin recording."}
                </Typography>
                <Button variant="contained" onClick={startRecording} disabled={isRecording} sx={{ mx: 2 }}>
                  Start Recording
                </Button>
                <Button variant="contained" onClick={stopRecording} disabled={!isRecording} sx={{ mx: 2 }}>
                  Stop Recording
                </Button>
                <Button variant="contained" onClick={uploadAudio} sx={{ mx: 2 }} disabled={!audioBlob}>
                  Upload Audio
                </Button>
                {/* 返回按钮 */}
                <Button variant="contained" onClick={() => setInputMethod(null)}>
                  Back
                </Button>
              </Box>
            )}

            {/* 四个按钮的正方形布局 */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FF7043', color: 'white', '&:hover': { backgroundColor: '#E64A19' } }} onClick={() => handleCategoryClick('food_bank')}>
                  Food Bank
                </Button>
              </Grid>
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#29B6F6', color: 'white', '&:hover': { backgroundColor: '#0288D1' } }} onClick={() => handleCategoryClick('shelter')}>
                  Shelter
                </Button>
              </Grid>
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#66BB6A', color: 'white', '&:hover': { backgroundColor: '#388E3C' } }} onClick={() => handleCategoryClick('emergency_call')}>
                  Emergency Call
                </Button>
              </Grid>
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FFA726', color: 'white', '&:hover': { backgroundColor: '#FB8C00' } }} onClick={() => handleCategoryClick('health_support')}>
                  Health Support
                </Button>
              </Grid>
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#7E57C2', color: 'white', '&:hover': { backgroundColor: '#5E35B1' } }} onClick={() => handleCategoryClick('weather')}>
                  Weather
                </Button>
              </Grid>
              <Grid item xs={10} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FF5252', color: 'white', '&:hover': { backgroundColor: '#E53935' } }} onClick={() => handleCategoryClick('ai_chat')}>
                  AI Chat 
                </Button>
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <Container>
      {/* 顶部的标题和描述 */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={8}>
          <Typography variant="h3" component="div" gutterBottom>
            HavenLink
          </Typography>
          <Typography variant="body1">
            A Smart City Solution for Assisting Homeless Communities
          </Typography>
        </Grid>

        
      </Grid>

      {renderContent()}
    </Container>
  );
}

export default App;
