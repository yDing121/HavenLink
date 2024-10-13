import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";

function HealthSupport({ onBack }) {
  const [healthServices, setHealthServices] = useState([]);
  const [error, setError] = useState(null);
  const [isCalling, setIsCalling] = useState(false); // 用于模拟拨打电话的状态

  useEffect(() => {
    // Fetch health support information when the component mounts
    const fetchHealthSupport = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetMentalHealthSupport"
        ); // Correct endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHealthServices(data); // Set health services data from the response
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchHealthSupport();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCallClick = (serviceName) => {
    setIsCalling(true); // 开始模拟拨打电话
    alert(`Calling ${serviceName}...`); // 模拟拨打电话提示
    setTimeout(() => {
      setIsCalling(false); // 假装电话结束
    }, 3000); // 模拟 3 秒后电话结束
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Health Support
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 health support services */}
      {healthServices.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {healthServices.map((service, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                width: "80%",
                mb: 2,
                backgroundColor: index % 2 === 0 ? "#66BB6A" : "#FF7043",
                "&:hover": {
                  backgroundColor: index % 2 === 0 ? "#388E3C" : "#E64A19",
                },
              }}
              onClick={() => handleCallClick(service.name)} // Use the service name in the call
              disabled={isCalling} // 在模拟拨打电话时禁用按钮
            >
              {service.name}: {service.phoneNumber}
            </Button>
          ))}

          {/* 显示音频波浪效果 */}
          {isCalling && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Calling... 📞</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <div className="audio-wave"></div>
                <div className="audio-wave"></div>
                <div className="audio-wave"></div>
              </Box>
            </Box>
          )}
        </Box>
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
