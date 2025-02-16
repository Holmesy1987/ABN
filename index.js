const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Simulated API route to fetch tweets with contract addresses
app.get('/fetch-tweets/:handle', (req, res) => {
  const { handle } = req.params;

  // Simulated tweets with contract addresses
  const tweetData = [
    { tweet: `Check out this new token vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto` },
    { tweet: `Amazing crypto find vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto` },
    { tweet: `New project launching soon vZ7eLmcBxR4hdsc9d0uTDrbcYwVs7wtK9AkLsd38crypto` }
  ];

  // Regex to extract contract addresses
  const cryptoCodes = tweetData.map(tweet => {
    const match = tweet.tweet.match(/([a-zA-Z0-9]{30,})/);  // Match contract address pattern
    return match ? { code: match[0], tweet: tweet.tweet } : null;
  }).filter(Boolean);

  res.json(cryptoCodes);  // Send back the contract addresses in JSON format
});

// Serve the index.html from the 'public' folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
