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

// point : scroll to top button

const goToTopButton = document.getElementById('goToTopButton');

window.addEventListener('scroll', () => {
	if (window.pageYOffset > 100) {
		goToTopButton.style.opacity = '1';
		goToTopButton.style.visibility = 'visible';
		goToTopButton.style.animation = 'fadeIn 0.5s forwards';
	} else {
		goToTopButton.style.opacity = '0';
		goToTopButton.style.visibility = 'hidden';
		goToTopButton.style.animation = 'none';
	}
});

goToTopButton.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
	goToTopButton.style.animation = 'bounce 0.5s ease-in-out';
	setTimeout(() => {
		goToTopButton.style.animation = 'none';
	}, 500);
});

// point : for dynamic date on journey
// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date for date format ( and )DOMContentLoaded = https://stackoverflow.com/questions/799981/document-addeventlistenerdomcontentloaded
document.addEventListener('DOMContentLoaded', function () {
	const dateInput = document.getElementById('journeyDate');
	const dayOfWeekSpan = document.getElementById('dayOfWeek');

	function updateDayOfWeek() {
		const date = new Date(dateInput.value);
		const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
		dayOfWeekSpan.textContent = dayOfWeek;
	}

	function setTodayDate() {
		const today = new Date();
		const todayDate = today.toISOString().slice(0, 10);
		dateInput.value = todayDate;
	}

	setTodayDate();

	updateDayOfWeek();
	dateInput.addEventListener('change', updateDayOfWeek);
});
// for sticky navbar
$(document).ready(function () {
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();

		if (scroll > 100) {
			$('.main_header_area').addClass('sticky');
		} else {
			$('.main_header_area').removeClass('sticky');
		}
	});
});
