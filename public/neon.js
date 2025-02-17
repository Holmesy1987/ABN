////////////////////////////////////////////////////////////////////////////////
// neon.js - Advanced 5s polling, side panel for handles, real-time CA detection
////////////////////////////////////////////////////////////////////////////////

let handles = [];
let intervals = {};
let activeHandle = null;
const POLL_INTERVAL = 5000; // 5 seconds

function addHandle() {
  const input = document.getElementById('handle-input');
  const handle = input.value.trim();
  if (!handle) {
    alert('Enter a valid handle');
    return;
  }
  if (!handles.includes(handle)) {
    handles.push(handle);
    renderHandleList();
  }
  input.value = '';
}

function renderHandleList() {
  const handleList = document.getElementById('handle-list');
  handleList.innerHTML = '';
  handles.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    li.onclick = () => selectHandle(h);
    handleList.appendChild(li);
  });
}

function selectHandle(handle) {
  activeHandle = handle;
  document.getElementById('active-handle-title').textContent = `Tweets for @${handle}`;
  if (!intervals[handle]) {
    intervals[handle] = setInterval(() => fetchTweets(handle), POLL_INTERVAL);
  }
  fetchTweets(handle);
}

function fetchTweets(handle) {
  fetch(`/tweets/${handle}`)
    .then(res => res.json())
    .then(data => {
      if (activeHandle === handle) {
        renderTweets(data);
      }
    })
    .catch(err => console.error('Error:', err));
}

function renderTweets(tweets) {
  const output = document.getElementById('tweet-output');
  output.innerHTML = '';
  tweets.forEach(item => {
    const div = document.createElement('div');
    let codeBtn = '';
    if (item.code) {
      codeBtn = `
        <button onclick="buyNow('${item.code}')">Buy Now</button>
      `;
      playBell();
    }
    div.innerHTML = `
      <p>${item.tweet}</p>
      ${codeBtn}
    `;
    output.appendChild(div);
  });
}

function buyNow(contractAddress) {
  // Link to a swap site with the contract address
  window.open(`https://example-swap-site.com/swap?token=${contractAddress}`, '_blank');
}

function playBell() {
  const bell = document.getElementById('bell-sound');
  bell.play();
}
