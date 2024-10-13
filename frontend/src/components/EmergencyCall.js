import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function EmergencyCall({ onBack }) {  // 接收 onBack 函数，用于返回主页
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Emergency Call
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 emergency contacts */}
      {emergencyContacts.length > 0 ? (
        <ul>
          {emergencyContacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}</strong>: {contact.phoneNumber}
            </li>
          ))}
        </ul>
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
