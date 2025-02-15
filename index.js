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

// API route to fetch tweets
app.get('/fetch-tweets/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    // Simulate tweet data or use a third-party API to fetch real tweets
    const tweetData = [
      'Check out this new token vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto',
      'Amazing crypto find vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto'
    ];

    // Extract crypto contract addresses (simplified with regex)
    const cryptoCodes = tweetData.map(tweet => {
      const match = tweet.match(/([a-zA-Z0-9]{30,})/); // Match long alphanumeric strings
      return match ? match[0] : null;
    }).filter(Boolean); // Remove nulls

    res.json(cryptoCodes); // Return the extracted codes to the frontend
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
