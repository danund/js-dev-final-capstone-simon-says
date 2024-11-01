/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
const statusSpan = document.querySelector(".js-status");
const heading = document.querySelector("h1");
const padContainer = document.querySelector(".js-pad-container");

/**
 * VARIABLES
 */
let computerSequence = [];
let playerSequence = [];
let maxRoundCount = 0;
let roundCount = 0;

/**
 * PADS
 */

const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    sound: new Audio("https://github.com/danund/js-dev-final-capstone-simon-says/tree/main/assets/simon-says-sound-1.mp3?raw=true"),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("https://github.com/danund/js-dev-final-capstone-simon-says/tree/main/assets/simon-says-sound-2.mp3?raw=true"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("https://github.com/danund/js-dev-final-capstone-simon-says/tree/main/assets/simon-says-sound-3.mp3?raw=true"),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("https://github.com/danund/js-dev-final-capstone-simon-says/tree/main/assets/simon-says-sound-4.mp3?raw=true"),
  },
];


/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);


/**
 * EVENT HANDLERS
 */

function startButtonHandler() {
  setLevel();
  roundCount = 1;
  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");
  playComputerTurn();
  return { startButton, statusSpan };
}



function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;

  const pad = pads.find((pad) => pad.color === color);
  pad.sound.play();
  checkPress(color);

  return color;
}

/**
 * HELPER FUNCTIONS
 */


function setLevel(level = 1) {
  switch (level) {
    case 1:
      maxRoundCount = 8;
      break;
    case 2:
      maxRoundCount = 14;
      break;
    case 3:
      maxRoundCount = 20;
      break;
    case 4:
      maxRoundCount = 31;
      break;
    default:
      return "Please enter level 1, 2, 3, or 4";
  }
  return maxRoundCount;
}



function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}

function setText(element, text) {
  element.textContent = text;
  return element;
}


function activatePad(color) {
  const pad = pads.find((pad) => pad.color === color);
  pad.selector.classList.add("activated");
  pad.sound.play();

  setTimeout(() => pad.selector.classList.remove("activated"), 500);
}


function activatePads(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => activatePad(color), index * 600);
  });
}



function playComputerTurn() {
  padContainer.classList.add("unclickable");
  setText(statusSpan, "The computer's turn...");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);

  const randomColor = getRandomItem(pads).color;
  computerSequence.push(randomColor);
  activatePads(computerSequence);


  setTimeout(() => playHumanTurn(roundCount), roundCount * 600 + 1000);
}


function playHumanTurn() {
  padContainer.classList.remove("unclickable");
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(
    statusSpan,
    `Your turn... ${remainingPresses} press${remainingPresses > 1 ? "es" : ""} left`
  );
}

function checkPress(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(
    statusSpan,
    `Your turn... ${remainingPresses} press${remainingPresses > 1 ? "es" : ""} left`
  );


  if (playerSequence[index] !== computerSequence[index]) {
    resetGame("Oh no, that's wrong. Game over.");
    return;
  }


  if (remainingPresses === 0) {
    checkRound();
  }
}



function checkRound() {
  if (playerSequence.length === maxRoundCount) {
    resetGame("Congratulations! You won!");
    return;
  }


  roundCount++;
  playerSequence = [];
  setText(statusSpan, "Nice! Keep going!");
  setTimeout(() => playComputerTurn(), 1000);
}

function resetGame(text) {
  computerSequence = [];
  playerSequence = [];
  roundCount = 0;

  alert(text);
  setText(heading, "Simon Says");
  startButton.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");
}

/**
 * Please do not modify the code below.
 * Used for testing purposes.
 *
 */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;
