const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route to serve the frontend HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to simulate fetching tweets (mock data)
app.get('/fetch-tweets/:handle', (req, res) => {
  const { handle } = req.params;

  // Simulate mock tweet data for testing
  const tweetData = [
    { tweet: 'Check out this new token vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto' },
    { tweet: 'Amazing crypto find vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto' }
  ];

  // Extract contract addresses (CAs) from the tweets
  const cryptoCodes = tweetData.map(tweet => {
    const match = tweet.tweet.match(/([a-zA-Z0-9]{30,})/);  // Match long alphanumeric strings (CAs)
    return match ? { code: match[0], tweet: tweet.tweet } : null;
  }).filter(Boolean);  // Remove null values

  res.json(cryptoCodes);  // Send the extracted CAs as a JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
