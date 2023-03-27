// todo: Have to make this code more readable and have add an checkout page where my product summery will be shown and and when i given the money it will complete the payment process and if i give more than product cart need it will return me that money

// Product data
const products = [
	{ id: 1, name: 'Apple', price: 10, image: './images/apple.avif' },
	{ id: 2, name: 'Orange', price: 20, image: './images/orange.jpg' },
	{ id: 3, name: 'Banana', price: 30, image: './images/banana.jpg' },
	{ id: 4, name: 'grapes', price: 10, image: './images/grapes.jpg' },
	{ id: 5, name: 'pear', price: 20, image: './images/pear.jpg' },
	{ id: 6, name: 'watermelon', price: 30, image: './images/watermelon.jpg' },
];

// Cart data
let cart = [];

// Get cart and products elements
const cartTable = document.querySelector('.cart table tbody');
const cartTotal = document.querySelector('#total');
const productsContainer = document.querySelector('.products');

// Display products
products.forEach((product) => {
	const productElement = document.createElement('div');
	productElement.classList.add('product');
	productElement.innerHTML = `
    <img src="${product.image}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button class="add-btn" data-id="${product.id}">Add to cart</button>
  `;
	productsContainer.appendChild(productElement);
});

// Add event listener to add buttons
const addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		const productId = parseInt(event.target.dataset.id);
		const product = products.find((product) => product.id === productId);
		addToCart(product);
	});
});

// Add item to cart
function addToCart(product) {
	console.log(product);
	const cartItem = cart.find((item) => item.id === product.id);

	if (cartItem) {
		cartItem.quantity++;
	} else {
		cart.push({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
		});
	}
	updateCart();
}

let cartItems = document.querySelector('#cart-items');
let discountPriceElement = document.querySelector('#discount');
// Update cart Function
function updateCart() {
	// Clear cart table

	cartItems.innerHTML = '';
	// Add cart items to table
	cart.forEach((item) => {
		const cartItem = document.createElement('tr');
		cartItem.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="decrease-qty-btn" data-id="${item.id}">-</button>
        ${item.quantity}
        <button class="increase-qty-btn" data-id="${item.id}">+</button>
      </td>
      <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
    `;
		cartItems.appendChild(cartItem);
	});

	// Calculate total items and update total items element
	let totalItemsElement = document.querySelector('#total-items');
	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
	totalItemsElement.textContent = totalItems;

	// Calculate net price and update net price element

	let netPriceElement = document.querySelector('#net-price');

	const netPrice = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	netPriceElement.textContent = `$${netPrice.toFixed(2)}`;

	// Check if discount code is valid and apply discount if applicable
	let discountCodeInput = document.querySelector('#discount-code');
	const discountCode = discountCodeInput.value;
	let discountPrice = 0;
	let discountCodes = discountCodeInput.value.trim();
	if (discountCode && discountCodes.hasOwnProperty(discountCode)) {
		const discountPercentage = discountCodes[discountCode];
		discountPrice = (netPrice * discountPercentage) / 100;
		netPriceElement.textContent = `$${(netPrice - discountPrice).toFixed(2)}`;
	}

	discountPriceElement.textContent = `$${discountPrice.toFixed(2)}`;

	// Calculate total price and update total price element
	const totalPrice = netPrice - discountPrice;
	let totalPriceElement = document.querySelector('#total');
	totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

	// Add event listeners to quantity buttons and remove buttons
	const decreaseQtyButtons = document.querySelectorAll('.decrease-qty-btn');
	decreaseQtyButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id);
			const cartItem = cart.find((item) => item.id === productId);
			if (cartItem.quantity > 1) {
				cartItem.quantity--;
				updateCart();
			}
		});
	});

	const increaseQtyButtons = document.querySelectorAll('.increase-qty-btn');
	increaseQtyButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id);
			const cartItem = cart.find((item) => item.id === productId);
			cartItem.quantity++;
			updateCart();
		});
	});

	const removeButtons = document.querySelectorAll('.remove-btn');
	removeButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id);
			const index = cart.findIndex((item) => item.id === productId);
			cart.splice(index, 1);
			updateCart();
		});
	});
}

// Apply discount code
const applyButton = document.querySelector('#apply-btn');
applyButton.addEventListener('click', (event) => {
	event.preventDefault();
	const discountInput = document.querySelector('#discount-code');
	const discountCode = discountInput.value.trim();
	if (discountCode === 'dev10') {
		const total = parseFloat(cartTotal.innerText.replace('$', ''));
		const discountedTotal = total * 0.9;
		cartTotal.innerText = `$${discountedTotal.toFixed(2)}`;
		discountPriceElement.innerText = `$${(total - discountedTotal).toFixed(2)}`;
	} else {
		alert('Please provide a valid discount promo code ( dev10 ) ');
	}
	discountInput.value = '';
});

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
	cart = [];
	updateCart();
	alert('everything is clear');
});

const checkoutButton = document.querySelector('.checkout-btn');
// Add event listener to checkout button
checkoutButton.addEventListener('click', () => {
	if (cart.length === 0) {
		alert(
			'Your cart is empty. Please add items to your cart before checking out.',
		);
	} else {
		alert('Thank you for your purchase!');
		cart = [];
		updateCart();
	}
});

// turn off mouse right click option when clicking

document.addEventListener('contextmenu', (e) => e.preventDefault());
