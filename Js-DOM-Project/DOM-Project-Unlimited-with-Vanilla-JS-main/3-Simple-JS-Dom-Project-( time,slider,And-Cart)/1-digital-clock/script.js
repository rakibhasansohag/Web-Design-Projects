'use strict';

let digitalClock = function () {
	let date = new Date();

	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let dateDetails;
	let timeFormat = document.querySelector('small');
	let timer = document.getElementById('timer');
	// if they are less than 0 we use this
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	//  for hours multiplication
	if (hours >= 12) {
		dateDetails = 'PM';
		timeFormat.style.color = 'yellow';
		timeFormat.style.padding = '0 0 0 10px';
		timeFormat.style.fontSize = '38px';
	} else {
		dateDetails = 'AM';
		timeFormat.style.color = 'green';
		timeFormat.style.padding = '0 0 0 10px';
		timeFormat.style.fontSize = '41px';
	}
	let finalDate = hours + ' : ' + minutes + ' : ' + seconds + ' ';

	if (hours === 0) {
		hours = 12;
	} else {
		hours = hours - 12;
	}

	timer.innerText = finalDate;
	// timer.style.color = 'red';

	timeFormat.innerText = dateDetails;

	console.log(finalDate);

	let clockBox = document.querySelector('#clock');

	if (minutes % 1 === 0) {
		// this code is not working
		clockBox.style.backgroundColor = getRandomColor();
	}

	let backgroundColor = document.querySelector('body');
	if (seconds % 1 === 0) {
		// for every seconds
		backgroundColor.style.backgroundColor = getRandomColor();
	}
};
// for random colors
function getRandomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
setInterval(digitalClock, 1000);
