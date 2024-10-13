import React, { useState, useEffect } from "react";
import { Button, Box, Typography, TextField, Alert, CircularProgress } from '@mui/material';

function Weather({ onBack }) {
  const [zipCode, setZipCode] = useState(""); // State for ZIP code input
  const [weatherInfo, setWeatherInfo] = useState(null); // State for weather information
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // 新增 loading 状态

  const fetchWeatherData = async () => {
    setLoading(true);  // 开始加载
    setError(null);    // 清除之前的错误信息
    try {
      const response = await fetch("http://localhost:6969/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipcode: zipCode }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setWeatherInfo(data.forecast); // Set the fetched weather info
    } catch (err) {
      setError(err.message); // Set error message
      setWeatherInfo(null); // Clear weather info on error
    } finally {
      setLoading(false);  // 加载结束
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather Information
      </Typography>

      {/* 输入 ZIP code */}
      <TextField
        label="Enter ZIP code"
        variant="outlined"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)} // Update ZIP code state
        sx={{ mb: 2 }}
      />
      <br />

      {/* 获取天气按钮和返回主页按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
        <Button variant="contained" onClick={fetchWeatherData} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Get Weather"} {/* 在加载中时显示 spinner */}
        </Button>
        <Button variant="contained" onClick={onBack}>  {/* 使用传递的 onBack 函数 */}
          Back to Home
        </Button>
      </Box>

      {/* 错误信息显示 */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 显示天气信息 */}
      {weatherInfo && (
        <Typography variant="body1">
          {weatherInfo}
        </Typography>
      )}
    </Box>
  );
  // update triger
}

export default Weather;
