import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from '@mui/material';

function Shelter({ onBack }) {  // 接收 onBack 函数，用于返回主页
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shelter information when the component mounts
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
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nearby Shelters
      </Typography>

      {/* 错误处理 */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* 列表显示 shelters */}
      {shelters.length > 0 ? (
        <ul>
          {shelters.map((shelter, index) => (
            <li key={index}>
              <strong>{shelter.name}</strong>
              <ul>
                <li>Address: {shelter.address}</li>
                <li>Distance: {shelter.distance}</li>
                <li>Hours: {shelter.hours}</li>
              </ul>
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
