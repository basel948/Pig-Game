'use strict';

// Selecting Elements
let score0EL = document.getElementById('score--0');
let score1EL = document.getElementById('score--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let scores, currentTotal, activePlayer;
const init = function () {
  // Variables
  scores = [0, 0];
  currentTotal = 0;
  activePlayer = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  diceEL.classList.add('hidden');
};
init();

btnNew.addEventListener('click', init);

const switchPlayers = function () {
  currentTotal = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
btnHold.addEventListener('click', function () {
  console.log('Hold key clicked');

  if (currentTotal > 0) {
    scores[activePlayer] += currentTotal;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //FIXME
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      btnHold.disabled = true;
      btnRoll.disabled = true;
      diceEL.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

btnRoll.addEventListener('click', function () {
  // Generate a random number
  const rndNumber = Math.trunc(Math.random() * 6) + 1;

  // display image according to random number
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${rndNumber}.png`;

  // check if random number is equal to 1
  if (rndNumber !== 1) {
    currentTotal += rndNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentTotal;
  } else {
    switchPlayers();
  }
});
