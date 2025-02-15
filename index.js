const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Real-Time CA Extraction (Placeholder)
app.get('/ca-extract', async (req, res) => {
  // This is just a placeholder for actual data fetching
  const response = await fetch('https://api.twitter.com/2/tweets');
  const data = await response.json();
  res.json(data);
});

// Photon Swap Link
app.get('/photon-swap/:token', (req, res) => {
  const { token } = req.params;
  const swapLink = `https://photon-swap.com/swap?token=${token}`;
  res.json({ link: swapLink });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
