import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';  // 引入 MUI 的组件
import Shelter from './components/Shelter';
import FoodBank from './components/FoodBank';
import HealthSupport from './components/HealthSupport';
import EmergencyCall from './components/EmergencyCall';

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
                <Button variant="contained" fullWidth sx={{ height: '150px' }} onClick={() => handleCategoryClick('food_bank')}>
                  Food Bank
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px' }} onClick={() => handleCategoryClick('shelter')}>
                  Shelter
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px' }} onClick={() => handleCategoryClick('emergency_call')}>
                  Emergency Call
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth sx={{ height: '150px' }} onClick={() => handleCategoryClick('health_support')}>
                  Health Support
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

