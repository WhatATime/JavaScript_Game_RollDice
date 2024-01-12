'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Declaring necessary variables
let scores, currentScore, activePlayer, playing;

// Set initial conditions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

// Define switchPlayer function
const switchPlayer = function () {
  // Display current score as 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Update current score to 0
  currentScore = 0;
  // Update current player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Change DOM style dependent on active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // Check for rolled 1
    if (dice !== 1) {
      // Add to current score if dice is not 1
      // Update current score
      currentScore += dice;
      // Display current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player if dice is 1
      switchPlayer();
    }
  }
});

// Holding current score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    // Display player's score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish and win the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Continue and switch players
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
