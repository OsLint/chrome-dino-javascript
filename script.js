//Global Variables
var player = document.getElementById("player");
var block = document.getElementById("block");
var counter = 0;
var gameStarted = false;
var collisionEvent = new Event("collision");
var scoreUpEvent = new Event("scoreUp");

function userInput() {
  if (!gameStarted) {
    gameStarted = true;
    block.style.animation = "block 1s infinite linear"; // Add animation to the block
    gameLoop();
    jump();
  } else {
    jump();
  }
}

// GameLoop Function
function gameLoop() {
  // Check for collision between player and block
  var playerRect = player.getBoundingClientRect();
  var blockRect = block.getBoundingClientRect();

  if (
    playerRect.right >= blockRect.left &&
    playerRect.left <= blockRect.right &&
    playerRect.bottom >= blockRect.top &&
    playerRect.top <= blockRect.bottom
  ) {
    // Collision occurred, trigger the custom event
    player.dispatchEvent(collisionEvent);
  } else {
    // No Collision occurred, counter++
    player.dispatchEvent(scoreUpEvent);
  }
  if (gameStarted) {
    requestAnimationFrame(gameLoop); // Continuously call gameLoop
  }
}

// Jump function
function jump() {
  if (player.classList.contains("animate")) {
    return;
  }
  player.classList.add("animate");
  setTimeout(function () {
    player.classList.remove("animate");
  }, 300);
}




// Function to handle the SpaceBar keydown event
function handleKeyDown(event) {
  if (event.code === "Space" && event.target === document.body) {
    userInput();
  }
}

// Event listener for the collision event
player.addEventListener("collision", function (event) {
  // Handle the collision event
  gameStarted = false;
  block.style.animation = "none";
  counter = 0;
  document.getElementById("scoreSpan").textContent = Math.floor(counter / 100);
  document.getElementById("game").style.backgroundColor("red");
});

//Event listener for scoreUPevent
player.addEventListener("scoreUp", function (event) {
  //Handle scoreUp event
  counter++;
  updateScore();
});


// Function to update the score
function updateScore() {
  var scoreSpan = document.getElementById("scoreSpan");
  scoreSpan.textContent = Math.floor(counter / 100);
}

// Add event listener to the document object
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("mousedown", userInput);
