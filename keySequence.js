// keySequence.js
// Dedicated key sequence detection for launching the Scoundrel game.
// The sequence is: ArrowUp, ArrowDown, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, Space.

const cardGameSequence = [
  "ArrowUp",
  "ArrowDown",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  " "
];

let cardGameBuffer = [];

/**
 * Initialize the key sequence detection. When the sequence is correctly entered,
 * the provided callback is executed.
 */
function initCardGameSequenceDetection(callback) {
  window.addEventListener("keydown", (event) => {
    cardGameBuffer.push(event.key);
    // Keep the buffer at most as long as the sequence.
    if (cardGameBuffer.length > cardGameSequence.length) {
      cardGameBuffer.shift();
    }
    // Check if the buffer matches the sequence.
    if (cardGameBuffer.join() === cardGameSequence.join()) {
      callback();
      cardGameBuffer = [];
    }
  });
}