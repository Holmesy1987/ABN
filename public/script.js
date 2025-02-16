let trackedHandles = [];

// Function to start tracking a Twitter handle
function startTracking() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    if (!trackedHandles.includes(handle)) {
      trackedHandles.push(handle);
      updateTrackedList();
    }

    // Fetch recent tweets from this handle
    fetchRecentTweets(handle);
    // Start polling for new tweets every 5 seconds
    setInterval(() => fetchRecentTweets(handle), 5000);
  } else {
    alert('Please enter a valid Twitter handle.');
  }
}

// Function to play the bell sound
function playBellSound() {
  const bellSound = document.getElementById('bell-sound');
  bellSound.play();
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

        // Play bell sound when a crypto code is detected
        if (code) {
          playBellSound(); // Play sound when crypto code is found
        }
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
