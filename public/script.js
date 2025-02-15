// Track the entered Twitter handles
let trackedHandles = [];

// Fetch Tweets for the entered Twitter handle
function fetchTweets() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    // Add to tracking list
    if (!trackedHandles.includes(handle)) {
      trackedHandles.push(handle);
      updateTrackingList();
    }

    // Call API to fetch tweets
    fetch(`/fetch-tweets/${handle}`)
      .then(response => response.json())
      .then(data => {
        const codesOutput = document.getElementById('codes-output');
        data.forEach(({ code, tweet }) => {
          // Create tweet with clickable Photon link
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
        alert('Error fetching tweets');
      });
  } else {
    alert('Please enter a Twitter handle.');
  }
}

// Update the tracking list UI
function updateTrackingList() {
  const listElement = document.getElementById('tracked-handles');
  listElement.innerHTML = '';
  trackedHandles.forEach(handle => {
    const li = document.createElement('li');
    li.textContent = handle;
    listElement.appendChild(li);
  });
}
