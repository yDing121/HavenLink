import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

function FoodBank({ onBack }) {
  const [foodBanks, setFoodBanks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch food bank information when the component mounts
    const fetchFoodBanks = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetFoodBanks?address=test" // Replace with actual address
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFoodBanks(data); // Set food banks data from the response
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchFoodBanks();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nearby Food Banks
      </Typography>
      {error && <Typography color="error">Error: {error}</Typography>}
      {foodBanks.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}> {/* 修改 ul 样式 */}
          {foodBanks.map((foodBank, index) => (
            <li key={index} style={{ marginBottom: "20px" }}> {/* 修改 li 样式 */}
              <Typography variant="h6" component="strong">
                {foodBank.name}
              </Typography>
              <Typography>Address: {foodBank.address}</Typography>
              <Typography>Distance: {foodBank.distance}</Typography>
              <Typography>Hours: {foodBank.hours}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No food banks found.</Typography>
      )}

      <Button variant="contained" sx={{ mt: 4 }} onClick={onBack}>
        Back to Home
      </Button>
    </Box>
  );
}

export default FoodBank;
