const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.send('ABN Server is running');
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
