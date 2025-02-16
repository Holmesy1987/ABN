const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios'); // For fetching market cap and tweets
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API route to simulate fetching tweets
app.get('/fetch-tweets/:handle', (req, res) => {
  const { handle } = req.params;

  // Simulated tweets for testing
  const tweetData = [
    { tweet: 'Check out this new token vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto' },
    { tweet: 'Amazing crypto find vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto' },
    { tweet: 'New project launching soon vZ7eLmcBxR4hdsc9d0uTDrbcYwVs7wtK9AkLsd38crypto' }
  ];

  // Regex to extract contract addresses
  const cryptoCodes = tweetData.map(tweet => {
    const match = tweet.tweet.match(/([a-zA-Z0-9]{30,})/);  // Match alphanumeric strings as contract addresses
    return match ? { code: match[0], tweet: tweet.tweet } : null;
  }).filter(Boolean);

  res.json(cryptoCodes); // Send back the contract addresses in JSON
});

// Fetch market cap data
app.get('/market-cap', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin'); // Example for Bitcoin
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching market cap:', error);
    res.status(500).json({ error: 'Unable to fetch market cap data.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
