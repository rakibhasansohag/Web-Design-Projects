'use strict';

//  all the elements in the document
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, playingGame, scores, activePlayer;

// task : for initialization the whole game loop
const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playingGame = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEl.classList.add('hidden');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
};
init();

// task: for switching players
const switchPlayers = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;

	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// task rolling the dice functionality
btnRoll.addEventListener('click', function () {
	if (playingGame) {
		// point 1 : Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;

		// point 2: Display the dice
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		// point 3: checked for rolled 1;
		if (dice !== 1) {
			// task: add dice to current score

			currentScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent =
				currentScore;
		} else {
			// switching the next player
			switchPlayers();
		}
	}
});

// task: button for holding the functionality of the game
btnHold.addEventListener('click', function () {
	if (playingGame) {
		// point 1 : Add current Score to active player's score

		scores[activePlayer] += currentScore;

		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];

		// point 2: Check if the current score is higher than >= 100
		if (scores[activePlayer] >= 100) {
			// point 2.1 : finish the game
			playingGame = false;
			diceEl.classList.add('hidden');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else {
			// point 3 switch to the next player
			switchPlayers();
		}
	}
});

// task : for resetting the game state
btnNew.addEventListener('click', init);
