var player = document.getElementById("player");
var block = document.getElementById("block");
var counter = 0;
var gameStarted = false;

// Function to start the game
function startGame() {
  gameStarted = true;
  gameLoop();
}

// GameLoop Function
function gameLoop() {
  while (gameStarted) {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 20 && blockLeft > -20 && playerTop >= 130) {
      block.style.animation = "none";
      // alert("Game Over score: " + Math.floor(counter / 100));
      counter = 0;
      block.style.animation = "block 1s infinite linear";
    } else {
      counter++;
      document.getElementById("scoreSpan").textContent = Math.floor(counter / 100);
    }
  }
}

// Function to handle the spacebar keydown event
function handleKeyDown(event) {
  if (event.code === "Space" && !gameStarted) { // Check for spacebar key press and game not already started
    gameStarted = true;
    startGame();
  }
}

function jump() {
  if (player.classList.contains("animate")) { return; }
  player.classList.add("animate");
  setTimeout(function () {
    player.classList.remove("animate");
  }, 300);
}

// Add event listener to the document object
document.addEventListener("keydown", handleKeyDown);
