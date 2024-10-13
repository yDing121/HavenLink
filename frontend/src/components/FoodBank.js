import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function FoodBank({ onBack }) {  // 接收 onBack 函数，用于返回主页
  const [foodBanks, setFoodBanks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch food bank information when the component mounts
    const fetchFoodBanks = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetFoodBanks?address=test"  // Replace with actual address
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFoodBanks(data);  // Set food banks data from the response
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
      }
    };

    fetchFoodBanks();
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nearby Food Banks
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 food banks */}
      {foodBanks.length > 0 ? (
        <ul>
          {foodBanks.map((foodBank, index) => (
            <li key={index}>
              <strong>{foodBank.name}</strong>
              <ul>
                <li>Address: {foodBank.address}</li>
                <li>Distance: {foodBank.distance}</li>
                <li>Hours: {foodBank.hours}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No food banks found.</Typography>
      )}

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default FoodBank;
