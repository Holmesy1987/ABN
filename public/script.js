// Track the entered Twitter handles
let trackedHandles = [];

// Fetch Tweets for the entered Twitter handle
function fetchTweets() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    console.log('Fetching tweets for handle:', handle); // Debug log

    // Add to tracking list if not already there
    if (!trackedHandles.includes(handle)) {
      trackedHandles.push(handle);
      updateTrackingList(); // Update list UI
    }

    // Send request to fetch tweets from the backend API
    fetch(`/fetch-tweets/${handle}`)
      .then(response => {
        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Fetched tweet data:', data); // Debug log
        const codesOutput = document.getElementById('codes-output');
        codesOutput.innerHTML = ''; // Clear previous data

        // Check if data is empty
        if (data.length === 0) {
          codesOutput.innerHTML = '<p>No contract addresses found in tweets.</p>';
          return;
        }

        // Display each tweet with its CA and Photon Swap link
        data.forEach(({ code, tweet }) => {
          const tweetElement = document.createElement('div');
          tweetElement.classList.add('tweet');
          tweetElement.innerHTML = `
            <p>${tweet}</p>
            <a href="https://photon-swap.com/swap?token=${code}" target="_blank">
              <button>Click to Photon</button>
            </a>
          `;
          codesOutput.appendChild(tweetElement);
        });
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
        alert('Error fetching tweets.');
      });
  } else {
    alert('Please enter a Twitter handle.');
  }
}

// Update the tracking list UI
function updateTrackingList() {
  const listElement = document.getElementById('tracked-handles');
  listElement.innerHTML = ''; // Clear previous list

  trackedHandles.forEach(handle => {
    const li = document.createElement('li');
    li.textContent = handle;
    listElement.appendChild(li);
  });
}
