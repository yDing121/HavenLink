import React, { useEffect, useState } from "react";

function EmergencyCall() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch emergency contact information when the component mounts
    const fetchEmergencyContacts = async () => {
      try {
        const response = await fetch("http://localhost:6969/EmergencyCall"); // Corrected endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmergencyContacts(data); // Set emergency contacts data from the response
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchEmergencyContacts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Emergency Call</h2>
      {error && <p>Error: {error}</p>} {/* Display error if it occurs */}
      {emergencyContacts.length > 0 ? (
        <ul>
          {emergencyContacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}</strong>: {contact.phoneNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>No emergency contacts found.</p>
      )}
    </div>
  );
}

export default EmergencyCall;
