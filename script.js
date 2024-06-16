'use strict';

function updateHS() {
  if (window.localStorage.getItem('guess-high-score') === null) {
    window.localStorage.setItem('guess-high-score', 0);
  }

  let score = window.localStorage.getItem('guess-high-score');

  document.querySelector(
    '.label-highscore'
  ).innerHTML = `🥇 Highscore: <span class="highscore">${score}</span>`;
}

updateHS();
