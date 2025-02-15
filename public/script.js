// Fetch Tweets for the entered Twitter handle
function fetchTweets() {
  const handle = document.getElementById('handle-input').value.trim();

  if (handle) {
    const tweetContainer = document.getElementById('tweet-container');
    tweetContainer.innerHTML = ''; // Clear any previous tweets

    // Create Twitter embed URL (this will pull the latest tweet from the handle)
    const tweetEmbedURL = `https://twitter.com/${handle}`;

    // Create the embed iframe element
    const iframe = document.createElement('iframe');
    iframe.src = `https://twitframe.com/show?url=${tweetEmbedURL}`;
    iframe.width = "500";
    iframe.height = "300";
    tweetContainer.appendChild(iframe);

    // Example: after embedding, you'd fetch the text content and parse for crypto code
    const extractedText = extractCryptoCodeFromTweet("Here is a contract address: vTNXmdKveMz4LLwyGrqVGieaVGJKWFdx1kTV1VLpump");
    document.getElementById('codes-output').textContent = extractedText;

  } else {
    alert('Please enter a Twitter handle.');
  }
}

// Extract crypto code (simple regex for demonstration)
function extractCryptoCodeFromTweet(tweet) {
  const regex = /([a-zA-Z0-9]{30,})/; // Match long alphanumeric strings
  const match = tweet.match(regex);
  return match ? match[0] : 'No crypto code found';
}
