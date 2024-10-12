import React, { useEffect, useState } from "react";

function FoodBank() {
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
    <div>
      <h2>Nearby Food Banks</h2>
      {error && <p>Error: {error}</p>} {/* Display error if it occurs */}
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
        <p>No food banks found.</p>
      )}
    </div>
  );
}

export default FoodBank;
