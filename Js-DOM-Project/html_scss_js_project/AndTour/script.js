'use strict';
console.log('working...');

// point : nav bar

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', () => {
	navLinks.classList.toggle('active');
	navbar.classList.toggle('active');
});

// point : partner slider section

const partnerSlider = document.querySelector('.partner-slider-container');

function createDuplicateSlides() {
	const slides = document.querySelectorAll('.partner-slide');
	slides.forEach((slide) => {
		const cloneSlide = slide.cloneNode(true);
		partnerSlider.appendChild(cloneSlide);
	});
}

createDuplicateSlides();
