// game.js
// Main logic for the Scoundrel game.
// Starts the game when the dedicated key sequence is entered or the start button is clicked.

document.addEventListener("DOMContentLoaded", () => {
  // Initialize key sequence detection to start the game.
  initCardGameSequenceDetection(startCardGame);
  // Also, allow starting the game via the "Start Game" button.
  document.getElementById("start-game").addEventListener("click", startCardGame);
});

let health = 20;
let equippedWeapon = null;
let deck = [];
let discardPile = [];

/**
 * Starts or resets the Scoundrel game.
 */
function startCardGame() {
  deck = createDeck();
  shuffleDeck(deck);
  health = 20;
  equippedWeapon = null;
  discardPile = [];
  updateGameInfo();
  drawRoom();
}

/**
 * Updates the game info display (health and equipped weapon).
 */
function updateGameInfo() {
  document.getElementById("health").textContent = health;
  document.getElementById("equipped-weapon").textContent =
    equippedWeapon ? cardToString(equippedWeapon) : "None";
}

/**
 * Draws a new "room" of cards from the deck (up to 4 cards).
 */
function drawRoom() {
  const roomCards = deck.splice(0, Math.min(4, deck.length));
  const roomContainer = document.getElementById("room");
  roomContainer.innerHTML = "";
  roomCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = cardToString(card);
    cardElement.addEventListener("click", () => handleCardClick(card, roomCards));
    roomContainer.appendChild(cardElement);
  });
}

/**
 * Handles card selection during the game.
 */
function handleCardClick(card, roomCards) {
  // Determine action based on the suit of the card.
  const suit = card.description.split(" of ")[1];
  if (suit === "Spades" || suit === "Clubs") {
    handleMonster(card);
  } else if (suit === "Diamonds") {
    handleWeapon(card);
  } else if (suit === "Hearts") {
    handleHealthPotion(card);
  }
  // Remove the card from the room.
  const index = roomCards.indexOf(card);
  if (index > -1) {
    roomCards.splice(index, 1);
  }
  // When only one card remains, move it to the discard pile and draw a new room.
  if (roomCards.length === 1) {
    discardPile.push(roomCards[0]);
    drawRoom();
  }
}

/**
 * Handles actions for Monster cards.
 */
function handleMonster(card) {
  const monsterValue = parseInt(card.description.split(" ")[0]);
  if (equippedWeapon) {
    const weaponValue = parseInt(equippedWeapon.description.split(" ")[0]);
    const damage = Math.max(0, monsterValue - weaponValue);
    health -= damage;
    equippedWeapon = null;
  } else {
    health -= monsterValue;
  }
  discardPile.push(card);
  updateGameInfo();
  checkGameOver();
}

/**
 * Handles actions for Weapon cards.
 */
function handleWeapon(card) {
  if (equippedWeapon) {
    discardPile.push(equippedWeapon);
  }
  equippedWeapon = card;
  discardPile.push(card);
  updateGameInfo();
}

/**
 * Handles actions for Health Potion cards.
 */
function handleHealthPotion(card) {
  const potionValue = parseInt(card.description.split(" ")[0]);
  health = Math.min(20, health + potionValue);
  discardPile.push(card);
  updateGameInfo();
}

/**
 * Checks if the game has ended.
 */
function checkGameOver() {
  if (health <= 0 || deck.length === 0) {
    alert(health <= 0 ? "Game Over! You died." : "Congratulations! You completed the dungeon.");
    startCardGame();
  }
}