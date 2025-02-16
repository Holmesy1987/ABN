////////////////////////////////////////////////////////////////////////////////
// script.js - Frontend Logic
////////////////////////////////////////////////////////////////////////////////

let trackedHandles = [];
let pollingIntervals = {};
let marketCapVisible = false;
let aiVisible = false;

// Start tracking a Twitter handle
function startTracking() {
  const handle = document.getElementById('handle-input').value.trim();
  if (!handle) {
    alert('Please enter a valid Twitter handle.');
    return;
  }
  if (!trackedHandles.includes(handle)) {
    trackedHandles.push(handle);
    updateTrackedList();
  }
  fetchRecentTweets(handle);
  if (!pollingIntervals[handle]) {
    // Poll for new tweets every 5 seconds
    pollingIntervals[handle] = setInterval(() => fetchRecentTweets(handle), 5000);
  }
}

// Update the tracked handles list
function updateTrackedList() {
  const listElement = document.getElementById('tracked-handles-list');
  listElement.innerHTML = '';
  trackedHandles.forEach(handle => {
    const li = document.createElement('li');
    li.textContent = handle;
    listElement.appendChild(li);
  });
}

// Fetch recent tweets with contract addresses
function fetchRecentTweets(handle) {
  fetch(`/fetch-tweets/${handle}`)
    .then(res => res.json())
    .then(data => {
      const tweetsOutput = document.getElementById('tweets-output');
      tweetsOutput.innerHTML = '';
      data.forEach(({ tweet, code }) => {
        const tweetDiv = document.createElement('div');
        tweetDiv.classList.add('tweet');
        tweetDiv.innerHTML = `
          <p>${tweet}</p>
          <a href="https://photon-swap.com/swap?token=${code}" target="_blank">
            <button>Click to Photon</button>
          </a>
        `;
        tweetsOutput.appendChild(tweetDiv);
        if (code) {
          playBellSound();
        }
      });
    })
    .catch(err => console.error(err));
}

// Play bell sound when a CA is detected
function playBellSound() {
  const bellSound = document.getElementById('bell-sound');
  bellSound.play();
}

// Toggle Market Cap
function toggleMarketCap() {
  marketCapVisible = !marketCapVisible;
  const marketCapSection = document.getElementById('market-cap-section');
  if (marketCapVisible) {
    marketCapSection.style.display = 'block';
    fetchMarketCapData();
  } else {
    marketCapSection.style.display = 'none';
  }
}

// Fetch Market Cap Data
function fetchMarketCapData() {
  fetch('/marketcap')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('market-cap-list');
      list.innerHTML = '';
      data.forEach(token => {
        const div = document.createElement('div');
        div.textContent = `${token.token} (${token.symbol}) - Market Cap: $${token.marketCap}`;
        list.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

// AI Suggestions
function showAISuggestions() {
  aiVisible = !aiVisible;
  const aiSection = document.getElementById('ai-section');
  if (aiVisible) {
    aiSection.style.display = 'block';
    fetchAIData();
  } else {
    aiSection.style.display = 'none';
  }
}

function fetchAIData() {
  fetch('/ai-suggestions')
    .then(res => res.json())
    .then(data => {
      const aiOutput = document.getElementById('ai-output');
      aiOutput.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Token: ${item.token} - Suggestion: ${item.suggestion} (Reason: ${item.reason})`;
        aiOutput.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

// Example embedding DEX Screener
window.addEventListener('DOMContentLoaded', () => {
  // Attempt to fetch DEX data
  fetch('/dex-data')
    .then(res => res.json())
    .then(dexInfo => {
      const dexIframe = document.getElementById('dex-iframe');
      if (dexInfo.chartEmbedURL) {
        dexIframe.src = dexInfo.chartEmbedURL;
      }
    })
    .catch(err => console.error(err));
});
