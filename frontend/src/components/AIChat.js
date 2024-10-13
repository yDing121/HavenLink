import React, { useState } from "react";
import { Button, Box, Typography, TextField, Paper } from "@mui/material";

function AIChat({ onBack }) {
  // 接收 onBack 函数，用于返回主页
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("http://localhost:6969/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await res.json();
      setResponse(data.response); // Set the AI's response
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with the AI. Please try again.");
    } finally {
      setLoading(false);
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontSize: '48px', fontWeight: 'bold' }}>
        AI Chat Emotional Support
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start chatting with our AI for emotional support...
      </Typography>

      {/* User input field */}
      <TextField
        label="Your Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSendMessage}
        sx={{ mt: 2, mr: 2 }}
        disabled={loading} // Disable button while loading
      >
        Send
      </Button>

      {/* Response area */}
      {loading ? (
        <Typography variant="body1" gutterBottom>
          Loading...
        </Typography>
      ) : (
        <Paper sx={{ padding: 2, mt: 2, textAlign: "left" }}>
          <Typography variant="h6">AI Response:</Typography>
          <Typography variant="body1">{response || "..."}</Typography>
        </Paper>
      )}

      {/* 返回主页按钮 */}
      <Button variant="contained" onClick={onBack} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default AIChat;
