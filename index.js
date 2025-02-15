const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route to load the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to scrape tweets
app.get('/scrape-tweets/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    // For simplicity, you can use a public scraping tool or mock data here
    const tweetData = [
      'Check out this new token vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto',
      'Amazing crypto find vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto'
    ];

    // Extract potential contract addresses (using regex)
    const cryptoCodes = tweetData.map(tweet => {
      const match = tweet.match(/([a-zA-Z0-9]{30,})/); // Find long alphanumeric codes
      return match ? match[0] : null;
    }).filter(Boolean); // Remove nulls

    res.json(cryptoCodes);
  } catch (error) {
    console.error('Error scraping tweets:', error);
    res.status(500).json({ error: 'Failed to scr
