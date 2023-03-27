'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
};
//  code block  for right guessing
const handleCorrectGuess = () => {
	displayMessage('congratulations you got the right number!');
	document.querySelector('.number').textContent = secretNumber;
	document.querySelector('body').style.backgroundColor = '#60b347';
	document.querySelector('.number').style.width = '30rem';

	if (score > highScore) {
		highScore = score;
		document.querySelector('.highScore').textContent = highScore;
	}

	// Restore the initial game state after 3 seconds
	setTimeout(() => {
		score = 20;
		secretNumber = Math.trunc(Math.random() * 20) + 1;
		displayMessage('Start guessing...');
		document.querySelector('.score').textContent = score;
		document.querySelector('.number').textContent = '?';
		document.querySelector('.guess').value = '';
		document.querySelector('body').style.backgroundColor = '#222';
		document.querySelector('.number').style.width = '15rem';
	}, 3000);
};

const check = document.querySelector('.check');
check.addEventListener('click', () => {
	const guess = Number(document.querySelector('.guess').value);

	// when there is no number in the input field

	if (!guess) {
		displayMessage('please enter a number');
	} else if (guess === secretNumber) {
		handleCorrectGuess();

		if (score > highScore) {
			highScore = score;
			document.querySelector('.highScore').textContent = highScore;
		}
		// when the guess number is wrong
	} else if (guess !== secretNumber) {
		if (score > 1) {
			displayMessage(guess > secretNumber ? 'too high' : 'too low');
			score--;
			document.querySelector('.score').textContent = score;

			// apply shake class to body element
			document.querySelector('body').classList.add('shake');
			setTimeout(() => {
				document.querySelector('body').classList.remove('shake');
			}, 500);
		} else {
			displayMessage('you lost the game !! LOOSER ha ha ha');
			document.querySelector('.score').textContent = 0;
		}
	}
});

const again = document.querySelector('.again');
again.addEventListener('click', () => {
	score = 20;
	secretNumber = Math.trunc(Math.random() * 20) + 1;

	displayMessage('Start Guessing...');
	document.querySelector('.score').textContent = score;
	document.querySelector('.number').textContent = '?';
	document.querySelector('.guess').value = '';
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
});

// some change
