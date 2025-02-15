// cards.js
// Creates and manages the deck for the Scoundrel game using Unicode playing cards.

/**
 * Filters and returns a deck of cards for the game.
 * Red suits (Hearts, Diamonds) only use numbered cards,
 * while black suits (Spades, Clubs) include face cards.
 */
function createDeck() {
  return playingCardsUnicode.filter(card => {
    // Exclude Jokers.
    if (card.description.includes("Joker")) return false;

    // Card description should have the format "Value of Suit".
    const parts = card.description.split(" of ");
    if (parts.length !== 2) return false;
    const valueStr = parts[0];
    const suit = parts[1];

    // For red suits, only allow numbered cards.
    if (suit === "Diamonds" || suit === "Hearts") {
      return !isNaN(parseInt(valueStr));
    }
    return true;
  });
}

/**
 * Shuffles the provided deck array using the Fisher-Yates algorithm.
 */
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

/**
 * Returns a string representation of a card in a card-like format.
 */
function cardToString(card) {
  return `
┌─────────┐
│         │
│    ${card.unicode}    │
│         │
└─────────┘
`;
}