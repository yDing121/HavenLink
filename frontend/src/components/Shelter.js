import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function Shelter({ onBack }) {  // 接收 onBack 函数，用于返回主页
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shelter information when组件挂载时获取数据
    const fetchShelters = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetShelter?address=test"  // Replace with actual address
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShelters(data);  // Set shelters data from the response
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
      }
    };

    fetchShelters();
  }, []);  // 空依赖数组意味着此 effect 只在组件挂载时运行

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontSize: '48px', fontWeight: 'bold' }}>
        Nearby Shelters
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 shelters */}
      {shelters.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}> {/* 修改 ul 样式 */}
          {shelters.map((shelter, index) => (
            <li key={index} style={{ marginBottom: "20px" }}> {/* 修改 li 样式 */}
              <Typography variant="h6" component="strong">
                {shelter.name}
              </Typography>
              <Typography>Address: {shelter.address}</Typography>
              <Typography>Distance: {shelter.distance}</Typography>
              <Typography>Hours: {shelter.hours}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No shelters found.</Typography>
      )}

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default Shelter;
