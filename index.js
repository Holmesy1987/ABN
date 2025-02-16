<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ABN Server - Crypto Tracker</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>ABN Server - Crypto Tracker</h1>
      <p>Track crypto tokens in real-time with direct links to Photon Swap.</p>
    </header>

    <div class="input-area">
      <input type="text" id="handle-input" placeholder="Enter Twitter handle" />
      <button onclick="startTracking()">Start Tracking</button>
    </div>

    <div class="tracked-handles">
      <h3>Tracked Handles:</h3>
      <ul id="tracked-handles-list"></ul>
    </div>

    <div class="recent-tweets">
      <h3>Recent Tweets with Contract Addresses:</h3>
      <div id="tweets-output"></div>
    </div>

    <footer>
      <p>&copy; 2025 ABN Server. All rights reserved.</p>
    </footer>
  </div>

  <!-- Audio for bell sound -->
  <audio id="bell-sound" src="https://www.soundjay.com/button/beep-07.wav" preload="auto"></audio>

  <script src="script.js"></script>
</body>
</html>
