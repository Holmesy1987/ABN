// Fetch CA Data from Backend
function fetchCAData() {
  fetch('/ca-extract')
    .then(response => response.json())
    .then(data => {
      document.getElementById('ca-output').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Error fetching CA data:', error);
    });
}

// Generate Photon Swap Link
function generateSwapLink() {
  const token = document.getElementById('token-input').value;
  if (token) {
    fetch(`/photon-swap/${token}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('swap-link').textContent = `Swap Link: ${data.link}`;
      })
      .catch(error => {
        console.error('Error generating swap link:', error);
      });
  } else {
    alert('Please enter a token');
  }
}
