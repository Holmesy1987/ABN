<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ABN Server - Crypto Tracker</title>
  <link rel="stylesheet" href="styles.css">
  <!-- Add FontAwesome for icons (Photon button for example) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>ABN Server - Crypto Code Tracker</h1>
      <p>Your go-to place for tracking crypto contracts and getting instant links to Photon Swap.</p>
    </header>

    <!-- Input field to enter Twitter handle -->
    <div class="input-area">
      <input type="text" id="handle-input" placeholder="Enter Twitter handle" />
      <button onclick="fetchTweets()">Start Tracking</button>
    </div>

    <!-- Tracked Twitter Handles -->
    <div class="tracked-list">
      <h3>Tracked Handles:</h3>
      <ul id="tracked-handles"></ul>
    </div>

    <!-- Display tweets with CAs and Photon Swap links -->
    <div class="crypto-codes">
      <h3>Latest Crypto Codes:</h3>
      <div id="codes-output"></div>
    </div>

    <footer>
      <p>&copy; 2025 ABN Server. All rights reserved.</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
