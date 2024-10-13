import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function EmergencyCall({ onBack }) {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isCalling, setIsCalling] = useState(false);  // 用于模拟拨打电话的状态

  useEffect(() => {
    // Fetch emergency contact information when the component mounts
    const fetchEmergencyContacts = async () => {
      try {
        const response = await fetch("http://localhost:6969/EmergencyCall");  // Corrected endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmergencyContacts(data);  // Set emergency contacts data from the response
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
      }
    };

    fetchEmergencyContacts();
  }, []);  // Empty dependency array means this effect runs once on mount

  const handleCallClick = (contactName) => {
    setIsCalling(true);  // 开始模拟拨打电话
    alert(`Calling ${contactName}...`);  // 模拟拨打电话提示
    setTimeout(() => {
      setIsCalling(false);  // 假装电话结束
    }, 3000);  // 模拟 3 秒后电话结束
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontSize: '48px', fontWeight: 'bold' }}>
        Emergency Call
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 emergency contacts，使用按钮替代列表项 */}
      {emergencyContacts.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {emergencyContacts.map((contact, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                width: '80%',
                mb: 2,
                backgroundColor: index % 2 === 0 ? '#f0702b' : '#29B6F6',
                '&:hover': {
                  backgroundColor: index % 2 === 0 ? '#E64A19' : '#0288D1',
                },
              }}
              onClick={() => handleCallClick(contact.name)}
              disabled={isCalling}  // 在模拟拨打电话时禁用按钮
            >
              {contact.name}: {contact.phoneNumber}
            </Button>
          ))}

          {/* 显示音频波浪效果 */}
          {isCalling && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Calling... 📞</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <div className="audio-wave"></div>
                <div className="audio-wave"></div>
                <div className="audio-wave"></div>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Typography>No emergency contacts found.</Typography>
      )}

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default EmergencyCall;
