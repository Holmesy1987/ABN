////////////////////////////////////////////////////////////////////////////////
// index.js - Node.js + Express backend
////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // For Discord alerts or real-time data
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your real Discord webhook if needed
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/REPLACE_THIS';

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simulated route for tweets with contract addresses
app.get('/tweets/:handle', async (req, res) => {
  const { handle } = req.params;
  // Mock tweets
  const tweetData = [
    { tweet: `@${handle} Found new gem vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto` },
    { tweet: `@${handle} Another big handle discovered vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto #DeFi` },
    { tweet: `@${handle} Next bull run vZ7eLmcBxR4hdsc9d0uTDrbcYwVs7wtK9AkLsd38crypto #Neon` }
  ];

  // Extract contract addresses
  const results = tweetData.map(td => {
    const match = td.tweet.match(/([a-zA-Z0-9]{30,})/);
    if (match) {
      // Could send a Discord alert
      sendDiscordAlert(match[0], td.tweet, handle);
      return { tweet: td.tweet, code: match[0] };
    }
    return null;
  }).filter(Boolean);

  res.json(results);
});

// Optional: Discord alert function
async function sendDiscordAlert(contractAddress, tweet, handle) {
  try {
    const message = {
      content: `**New Contract Address** from @${handle}\n\`\`\`${contractAddress}\`\`\`\nTweet: ${tweet}`
    };
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (err) {
    console.error('Discord alert error:', err);
  }
}

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
