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
