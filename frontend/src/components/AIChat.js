import React from 'react';
import { Button, Box, Typography } from '@mui/material';

function AIChat({ onBack }) {  // 接收 onBack 函数，用于返回主页
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Chat Emotional Support
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start chatting with our AI for emotional support...
      </Typography>

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default AIChat;
