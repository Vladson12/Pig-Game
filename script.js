'use strict';

const switchPlayers = () => {
  document
    .querySelectorAll('.player')
    .forEach(e => e.classList.toggle('player--active'));
  return document.querySelector('.player--active');
};
const generateDiceValue = () => Math.floor(Math.random() * 6) + 1;
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let img = document.querySelector('.dice');

let activePlayer = document.querySelector('.player--active');

let diceValue;
let currentScore;
let score;

document.querySelector('.dice').classList.add('hidden');

rollDiceBtn.addEventListener('click', () => {
  diceValue = generateDiceValue();

  // reset current dice's img
  img.src = `dice-${diceValue}.png`;
  document.querySelector('.dice').classList.remove('hidden');

  // if diceValue = 1
  if (diceValue === 1) {
    // reset activePlayer's current score
    activePlayer.querySelector('.current-score').textContent = '0';
    // switch players
    activePlayer = switchPlayers();
  } else {
    currentScore =
      diceValue +
      Number(activePlayer.querySelector('.current-score').textContent);
    activePlayer.querySelector('.current-score').textContent =
      currentScore.toString();
  }
});

holdBtn.addEventListener('click', () => {
  score =
    Number(activePlayer.querySelector('.score').textContent) + currentScore;
  activePlayer.querySelector('.score').textContent = score.toString();
  if (score >= 20) {
    console.log(activePlayer.querySelector('.name').textContent, ' wins!');
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
    activePlayer.classList.add('player--winner');
    activePlayer.classList.remove('player--active');
    document.querySelector('.dice').classList.add('hidden');
  } else {
    activePlayer.querySelector('.current-score').textContent = '0';
    activePlayer = switchPlayers();
  }
});

newGameBtn.addEventListener('click', () => {
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  document.querySelector('.dice').classList.add('hidden');

  document.querySelectorAll('.score').forEach(e => (e.textContent = '0'));
  document
    .querySelectorAll('.current-score')
    .forEach(e => (e.textContent = '0'));
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  activePlayer.classList.remove('player--winner');
  activePlayer = document.querySelector('.player--active');
});
