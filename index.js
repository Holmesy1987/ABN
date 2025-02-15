const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Home route to load the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simulated route to fetch tweets and contract addresses
app.get('/fetch-tweets/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    // Simulate tweet data (replace with actual logic later)
    const tweetData = [
 
