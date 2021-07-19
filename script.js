'use strict';
// The two below work exactly the same, use getelementbyID when working with many ID's

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting Conditions
// saved in a function to prevent duplicate code (init for initialization)
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Score total is = 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // current score - 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Hide Dice
  diceEl.classList.add('hidden');
  // remove winning animation
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //Remove active classes on both players
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
console.log(init);

//Function created cause the code was duplicated. this prevents duplicate code
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    // first use math.random times 6 makes it 0-5 and the + 1 makes it 1-6
    // Math .trunc is then added to remove the decimals
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true,
    if (dice !== 1) {
      // Add dice to current score
      //currentScore = currentScore + dice;  same as the below
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next Player  this also adds the css " Highlight active player" attributes
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
