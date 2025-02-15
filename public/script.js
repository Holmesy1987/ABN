// Fetch Tweets for the entered Twitter handle
function fetchTweets() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    const startTime = Date.now(); // Start time to measure speed

    fetch(`/fetch-tweets/${handle}`)
      .then(response => response.json())
      .then(data => {
        const elapsedTime = Date.now() - startTime;
        const cryptoCodes = data.length > 0 ? data.join('\n') : 'No crypto codes found.';
        document.getElementById('codes-output').textContent = cryptoCodes;

        // Append Photon Swap links
        data.forEach(code => {
          const photonLink = `https://photon-swap.com/swap?token=${code}`;
          document.getElementById('codes-output').textContent += `\n[Link to Photon Swap for ${code}](${photonLink})`;
        });

        console.log('Fetched and parsed tweets in:', elapsedTime, 'ms');
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
        document.getElementById('codes-output').textContent = 'Error fetching tweets.';
      });
  } else {
    alert('Please enter a Twitter handle.');
  }
}
