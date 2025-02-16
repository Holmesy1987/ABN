let trackedHandles = [];

// Function to start tracking a Twitter handle
function startTracking() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    // Add handle to the tracked list
    if (!trackedHandles.includes(handle)) {
      trackedHandles.push(handle);
      updateTrackedList();
    }

    // Call function to get recent tweets
    fetchRecentTweets(handle);
    // Start polling for new tweets every 5 seconds
    setInterval(() => fetchRecentTweets(handle), 5000);
  } else {
    alert('Please enter a valid Twitter handle.');
  }
}

// Fetch recent tweets from the entered Twitter handle
function fetchRecentTweets(handle) {
  fetch(`/fetch-tweets/${handle}`)
    .then(response => response.json())
    .then(data => {
      const tweetsOutput = document.getElementById('tweets-output');
      tweetsOutput.innerHTML = ''; // Clear previous tweets

      // Show the most recent tweets
      data.forEach(({ tweet, code }) => {
        const tweetElement = document.createElement('div');
        tweetElement.classList.add('tweet');
        tweetElement.innerHTML = `
          <p>${tweet}</p>
          <a href="https://photon-swap.com/swap?token=${code}" target="_blank">
            <button>Click to Photon</button>
          </a>
        `;
        tweetsOutput.appendChild(tweetElement);
      });
    })
    .catch(error => {
      console.error('Error fetching tweets:', error);
      alert('Error fetching tweets.');
    });
}

// Update the tracked handles list UI
function updateTrackedList() {
  const listElement = document.getElementById('tracked-handles-list');
  listElement.innerHTML = ''; // Clear previous list

  trackedHandles.forEach(handle => {
    const li = document.createElement('li');
    li.textContent = handle;
    listElement.appendChild(li);
  });
}
