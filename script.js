'use strict';

function updateInnerHTML(selectorName, text) {
  document.querySelector(selectorName).innerHTML = text;
}

function randomizeGuess() {
  toBeGuessed = Math.floor(Math.random() * 20) + 1;
}

function updateHS(currScore) {
  if (window.localStorage.getItem('guess-high-score') === null) {
    if (currScore) window.localStorage.setItem('guess-high-score', currScore);
    else window.localStorage.setItem('guess-high-score', 0);
  }

  let score = window.localStorage.getItem('guess-high-score');
  if (currScore && currScore > score)
    window.localStorage.setItem('guess-high-score', currScore);
  score = window.localStorage.getItem('guess-high-score');
  updateInnerHTML(
    '.label-highscore',
    `🥇 Highscore: <span class="highscore">${score}</span>`
  );
}

function resetGame() {
  randomizeGuess();
  document.querySelector('.left').classList.remove('hide');
  updateInnerHTML('.message', 'Start guessing...');
  updateInnerHTML('.number', '?');
  didWin = false;
  currentScore = 20;
  updateInnerHTML(
    '.label-score',
    `💯 Score: <span class="score">${currentScore}</span>`
  );
  document.querySelector('.guess').value = null;
  document.querySelector('body').style.backgroundColor = '#222';
}

function checkGuess() {
  const currVal = document.querySelector('.guess').value;

  if (!Boolean(currVal) || didWin) return;
  if (currVal != toBeGuessed) {
    currentScore -= 1;
    updateInnerHTML(
      '.label-score',
      `💯 Score: <span class="score">${currentScore}</span>`
    );
    const diff = Math.abs(toBeGuessed - currVal);
    if (currVal < toBeGuessed) {
      updateInnerHTML('.message', `❌ Wrong! ${diff > 3 ? 'too ' : ''} low.`);
    } else {
      updateInnerHTML('.message', `❌ Wrong! ${diff > 3 ? 'too ' : ''} high.`);
    }
  } else {
    //winning logic
    document.querySelector('body').style.backgroundColor = '#60b347';
    updateInnerHTML('.message', '🎉 Correct! You got it.');
    updateInnerHTML('.number', toBeGuessed);
    document.querySelector('.left').classList.add('hide');

    didWin = true;
    updateHS(currentScore);
  }
  document.querySelector('.guess').value = null;
}

// updateInnerHTML('.message', 'Wrong! Guess Again.');
let toBeGuessed = 0;
let currentScore = 20;
let didWin = false;
resetGame();
updateHS();
