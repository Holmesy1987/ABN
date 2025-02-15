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
    
