import React, { useState, useEffect } from "react";

function Weather() {
  const [zipCode, setZipCode] = useState(""); // State for ZIP code input
  const [weatherInfo, setWeatherInfo] = useState(null); // State for weather information
  const [error, setError] = useState(null); // State for error handling

  const fetchWeatherData = async () => {
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
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.message); // Set error message
      setWeatherInfo(null); // Clear weather info on error
    }
  };

  // Optional: Automatically fetch weather data on ZIP code change
  useEffect(() => {
    if (zipCode) {
      fetchWeatherData();
    }
  }, [zipCode]);

  return (
    <div>
      <h2>Weather Information</h2>
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)} // Update ZIP code state
      />
      <button onClick={fetchWeatherData}>Get Weather</button>{" "}
      {/* Button to fetch weather data */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {weatherInfo && <p>{weatherInfo}</p>} {/* Display fetched weather info */}
    </div>
  );
  // update triger
}

export default Weather;
