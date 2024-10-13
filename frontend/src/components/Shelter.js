import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Shelter({ onBack }) {
  const [shelters, setShelters] = useState([]);
  const [coordinates, setCoordinates] = useState([]); // To store geocoded coordinates
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shelter information when the component mounts
    const fetchShelters = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/GetShelter?address=test" // Replace with actual address
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShelters(data); // Set shelters data from the response
        await fetchCoordinates(data); // Fetch coordinates for the shelters
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchShelters();
  }, []); // Empty dependency array means this effect runs only once

  // Fetch geocoded coordinates for each shelter
  const fetchCoordinates = async (shelters) => {
    const geocodedCoords = await Promise.all(
      shelters.map(async (shelter) => {
        const address = shelter.address; // Assuming the shelter object has an address field
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyASIcA46GS1TRS08fHS5oWojhxYw7mU8aw`
        ); // Replace with your API key
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.status === "OK") {
          return {
            name: shelter.name,
            latitude: geocodeData.results[0].geometry.location.lat,
            longitude: geocodeData.results[0].geometry.location.lng,
          };
        } else {
          console.error(`Geocoding failed for address: ${address}`);
          return null;
        }
      })
    );

    // Filter out any null results
    setCoordinates(geocodedCoords.filter((coord) => coord !== null));
  };

  // Map container styles
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    marginTop: "20px", // Adjust margin as needed
  };

  // Default center for the map (can be adjusted)
  const defaultCenter =
    coordinates.length > 0
      ? { lat: coordinates[0].latitude, lng: coordinates[0].longitude }
      : { lat: -34.397, lng: 150.644 }; // Use first shelter's coordinates as center

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nearby Shelters
      </Typography>

      {/* Error handling */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* List display shelters */}
      {shelters.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {shelters.map((shelter, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
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

      {/* Map display */}
      <LoadScript googleMapsApiKey="AIzaSyASIcA46GS1TRS08fHS5oWojhxYw7mU8aw">
        {" "}
        {/* Replace with your API key */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
        >
          {coordinates.map((coord, index) => (
            <Marker
              key={index}
              position={{ lat: coord.latitude, lng: coord.longitude }}
              title={coord.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Back to home button */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default Shelter;
