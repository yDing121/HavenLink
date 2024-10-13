const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 6969; // Ensure this matches your frontend fetch URL

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"), // Adjust as needed
  filename: (req, file, cb) => {
    cb(null, "recording.wav"); // You can customize the filename if needed
  },
});

// Initialize upload
const upload = multer({ storage });

// Create upload endpoint
app.post("/upload", upload.single("audio_data"), (req, res) => {
  // Ensure this matches your fetch request
  res.send("File uploaded successfully");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
