console.log('hello world!');
const myImages = [
	'./img/slider-01.jpg',
	'./img/slider-02.jpg',
	'./img/slider-03.jpg',
];

const sliders = document.querySelector('.sliders img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

next.addEventListener('click', function () {
	const current = sliders.getAttribute('src');
	const currentIndex = myImages.indexOf(current);
	console.log(currentIndex);

	if (currentIndex == myImages.length - 1) {
		sliders.src = myImages[0];
	} else {
		sliders.src = myImages[currentIndex + 1];
	}
});

prev.addEventListener('click', function () {
	const current = sliders.getAttribute('src');

	const currentIndex = myImages.indexOf(current);

	if (currentIndex === 0) {
		sliders.src = myImages[myImages.length - 1];
	} else {
		sliders.src = myImages[currentIndex - 1];
	}

	console.log(currentIndex);
});
