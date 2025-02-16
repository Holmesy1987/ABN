////////////////////////////////////////////////////////////////////////////////
// index.js - Node.js + Express Backend
////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// OPTIONAL: If you need advanced features like scraping or real APIs
// const puppeteer = require('puppeteer'); // For advanced Twitter scraping
// const axios = require('axios');

////////////////////////////////////////////////////////////////////////////////
// Discord Webhook Setup (Replace with your real webhook URL)
////////////////////////////////////////////////////////////////////////////////
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/XXXXXX/XXXXXX';

////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////
const USE_REAL_MARKET_CAP_API = false; // Switch to true to fetch real data from an API
const USE_REAL_TWITTER_SCRAPING = false; // Switch to true if using puppeteer or real Twitter API

////////////////////////////////////////////////////////////////////////////////
// Express Setup
////////////////////////////////////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for demonstration:
let marketCapData = [
  { token: 'Bitcoin', marketCap: 500_000_000_000, symbol: 'BTC' },
  { token: 'Ethereum', marketCap: 200_000_000_000, symbol: 'ETH' },
  { token: 'Solana', marketCap: 40_000_000_000, symbol: 'SOL' }
];

////////////////////////////////////////////////////////////////////////////////
// AI Trade Suggestions (Mock)
////////////////////////////////////////////////////////////////////////////////
function getAITradeSuggestions() {
  // Simple placeholder logic for demonstration
  return [
    { token: 'Ethereum', suggestion: 'BUY', reason: 'Positive momentum' },
    { token: 'Solana', suggestion: 'HOLD', reason: 'Possible breakout soon' },
    { token: 'RandomToken', suggestion: 'WATCH', reason: 'High volatility' }
  ];
}

////////////////////////////////////////////////////////////////////////////////
// Discord Alert
////////////////////////////////////////////////////////////////////////////////
async function sendDiscordAlert(contractAddress, tweet, handle) {
  // Real-time alert (1-3 sec delay) - we mock it as immediate
  try {
    const content = `**New CA Detected** from @${handle}\n\`\`\`${contractAddress}\`\`\`\nTweet: ${tweet}`;
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
  } catch (err) {
    console.error('Discord alert error:', err);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////////////////////

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve newly tweeted CA page
app.get('/new.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new.html'));
});

// Simulated route to fetch tweets
app.get('/fetch-tweets/:handle', async (req, res) => {
  const { handle } = req.params;

  // Mock tweets with contract addresses
  // In a real scenario, you'd scrape or use Twitter API
  const tweetData = [
    { tweet: `@${handle} Found a new gem vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump #Crypto` },
    { tweet: `@${handle} Another big handle discovered vD19mGzYT2KRZN6TBDWYfwGErHFDqpSzk9JHFQR32crypto #DeFi` },
    { tweet: `@${handle} Next bull run vZ7eLmcBxR4hdsc9d0uTDrbcYwVs7wtK9AkLsd38crypto #Solana` }
  ];

  // Regex to extract contract addresses
  const results = tweetData.map(td => {
    const match = td.tweet.match(/([a-zA-Z0-9]{30,})/);
    if (match) {
      // Send Discord alert
      sendDiscordAlert(match[0], td.tweet, handle);
      return { tweet: td.tweet, code: match[0] };
    }
    return null;
  }).filter(Boolean);

  return res.json(results);
});

// Market cap-based ranking
app.get('/marketcap', async (req, res) => {
  if (USE_REAL_MARKET_CAP_API) {
    // Example:
    // const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    // parse data...
  }
  // Sort mock data by marketCap desc
  marketCapData.sort((a, b) => b.marketCap - a.marketCap);
  res.json(marketCapData);
});

// AI-based trade suggestions
app.get('/ai-suggestions', (req, res) => {
  const suggestions = getAITradeSuggestions();
  res.json(suggestions);
});

// Example DEX route or embed logic for DEX Screener
app.get('/dex-data', (req, res) => {
  // Mock or real data for DEX chart embedding
  const dexData = { chartEmbedURL: 'https://dexscreener.com/solana/XXXXXX' };
  res.json(dexData);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
