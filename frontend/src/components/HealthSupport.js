import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function HealthSupport({ onBack }) {  // 接收 onBack 函数，用于返回主页
  const [healthServices, setHealthServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch health support information when the component mounts
    const fetchHealthSupport = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetMentalHealthSupport"  // Correct endpoint
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHealthServices(data);  // Set health services data from the response
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
      }
    };

    fetchHealthSupport();
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Health Support
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 health support services */}
      {healthServices.length > 0 ? (
        <ul>
          {healthServices.map((service, index) => (
            <li key={index}>
              <strong>{service.name}</strong>: {service.phoneNumber},{" "}
              {service.address}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No health support services found.</Typography>
      )}

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default HealthSupport;
