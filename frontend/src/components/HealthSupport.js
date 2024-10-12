import React, { useEffect, useState } from "react";

function HealthSupport() {
  const [healthServices, setHealthServices] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Health Support</h2>
      {error && <p>Error: {error}</p>} {/* Display error if it occurs */}
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
        <p>No health support services found.</p>
      )}
    </div>
  );
}

export default HealthSupport;
