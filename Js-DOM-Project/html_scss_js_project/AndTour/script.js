'use strict';
console.log('working...');

// point : nav bar

const menuButton = document.querySelector('.menu_button');
const navLinks = document.querySelector('.nav_links');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', () => {
	navLinks.classList.toggle('active');
	navbar.classList.toggle('active');
});

// point : partner slider section

const partnerSlider = document.querySelector('.partner_slider_container');

function createDuplicateSlides() {
	const slides = document.querySelectorAll('.partner_slide');
	slides.forEach((slide) => {
		const cloneSlide = slide.cloneNode(true);
		partnerSlider.appendChild(cloneSlide);
	});
}

createDuplicateSlides();

// point : Copyright Date section
const copyright = document.getElementById('copyright');
const date = new Date().getFullYear();
copyright.textContent = date;
