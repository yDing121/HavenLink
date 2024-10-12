import React, { useEffect, useState } from "react";

function Shelter() {
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shelter information when the component mounts
    const fetchShelters = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetShelter?address=test"
        ); // Replace with actual address
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShelters(data); // Set shelters data from the response
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchShelters();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Nearby Shelters</h2>
      {error && <p>Error: {error}</p>} {/* Display error if it occurs */}
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
        <p>No shelters found.</p>
      )}
    </div>
  );
}

export default Shelter;
