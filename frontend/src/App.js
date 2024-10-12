import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';  // 引入 MUI 的组件
import Shelter from './components/Shelter';
import FoodBank from './components/FoodBank';
import HealthSupport from './components/HealthSupport';
import EmergencyCall from './components/EmergencyCall';
import Weather from './components/Weather';  // 新增 Weather 组件
import AIChat from './components/AIChat'; 

function App() {
  const [category, setCategory] = useState('');

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const renderContent = () => {
    switch (category) {
      case 'shelter':
        return <Shelter />;
      case 'food_bank':
        return <FoodBank />;
      case 'health_support':
        return <HealthSupport />;
      case 'emergency_call':
        return <EmergencyCall />;
        case 'weather':
        return <Weather />;  
      case 'ai_chat':
        return <AIChat />;  
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
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Button variant="outlined" sx={{ mx: 2 }}>
                Voice Input
              </Button>
              <Button variant="outlined" sx={{ mx: 2 }}>
                Text Input
              </Button>
            </Box>

            {/* 四个按钮的正方形布局 */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FF7043', color: 'white', '&:hover': { backgroundColor: '#E64A19' } }} onClick={() => handleCategoryClick('food_bank')}>
                  Food Bank
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#29B6F6', color: 'white', '&:hover': { backgroundColor: '#0288D1' } }} onClick={() => handleCategoryClick('shelter')}>
                  Shelter
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#66BB6A', color: 'white', '&:hover': { backgroundColor: '#388E3C' } }} onClick={() => handleCategoryClick('emergency_call')}>
                  Emergency Call
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FFA726', color: 'white', '&:hover': { backgroundColor: '#FB8C00' } }} onClick={() => handleCategoryClick('health_support')}>
                  Health Support
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#7E57C2', color: 'white', '&:hover': { backgroundColor: '#5E35B1' } }} onClick={() => handleCategoryClick('weather')}>
                  Weather
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px', backgroundColor: '#FF5252', color: 'white', '&:hover': { backgroundColor: '#E53935' } }} onClick={() => handleCategoryClick('ai_chat')}>
                  AI Chat Emotional Support
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

        {/* 右上角的Logo 占位符 */}
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Box sx={{ width: 100, height: 100, border: '1px solid black', display: 'inline-block' }}>
            <Typography>Logo</Typography> {/* 这是一个占位符，等你有Logo设计好后再替换 */}
          </Box>
        </Grid>
      </Grid>

      {renderContent()}
    </Container>
  );
}

export default App;