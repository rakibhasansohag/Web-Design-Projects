'use strict'; // for strict mode

const formSubmit = document.querySelector('#product_form');
const allProduct = [];
const productSummery = {
	discount: 0,
	netPrice: 0,
	totalItems: 0,
	totalPrice: 0,
};
const displayProduct = function () {
	let tableBody = document.querySelector('#table_body');
	tableBody.innerText = '';
	for (let i = 0; i < allProduct.length; i++) {
		let newProductRow = document.createElement('tr');

		let product_1 = document.createElement('td');
		let product_2 = document.createElement('td');
		let product_3 = document.createElement('td');
		let product_4 = document.createElement('td');
		// let product_5 = document.createElement('td'); not working well
		product_1.innerText = i + 1;
		product_2.innerText = allProduct[i].name;
		product_3.innerText = allProduct[i].price;
		product_4.innerHTML = '<button class="delete-btn">Delete</button>';
		// product_5.innerHTML = `<button class="edit-button" onclick="editProduct(${i})">Edit</button>`; not working properly
		newProductRow.append(product_1, product_2, product_3, product_4); //product_5);
		tableBody.append(newProductRow);

		//  for delete a product
		let deleteBtn = product_4.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', () => {
			allProduct.splice(i, 1);
			displayProduct();
			displayProductSummery();
		});
	}
};

const displayProductSummery = function () {
	const netPriceBox = document.querySelector('#net_price');
	const totalItems = document.querySelector('#total_items');
	productSummery.netPrice = 0;

	for (let i = 0; i < allProduct.length; i++) {
		productSummery.netPrice = productSummery.netPrice + allProduct[i].price;
		// productSummery.netPrice += allProduct[i].price; // good for performance
	}
	netPriceBox.innerText = productSummery.netPrice;
	totalItems.innerText = allProduct.length;
};

formSubmit.addEventListener('submit', function (e) {
	e.preventDefault();

	const productName = document.querySelector('#product_name');
	const productPrice = document.querySelector('#product_price');
	// const productName1 = document.querySelector('#product_name').value; // bad way to get product name
	// const productPrice1 = document.querySelector('#product_price').value; // bad way to get product price

	if (
		productName.value === undefined ||
		productName.value.trim() === '' ||
		productPrice.value === undefined ||
		productPrice.value.trim() === ''
	) {
		alert('please provide a product name and a price');
	} else {
		allProduct[allProduct.length] = {
			name: productName.value,
			price: parseInt(productPrice.value),
		};
	}

	// {
	// 	const products = {
	// 		name: productName.value, // good example
	// 		price: productPrice.value, // good example
	// 	};
	// }

	// allProduct[allProduct.length] = products;

	productName.value = '';
	productPrice.value = '';
	console.log(allProduct);
	displayProduct();
	displayProductSummery();
});

const DiscountForm = document.querySelector('#discount_form');

DiscountForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let discountPercentage = document.querySelector('#product_discount');
	const discountPrice = document.querySelector('#discount');
	const totalPriceBox = document.querySelector('#total_price');

	// check if the input value is not empty and is a valid number
	if (
		discountPercentage.value.trim() !== '' &&
		!isNaN(parseInt(discountPercentage.value))
	) {
		discountPercentage = parseInt(discountPercentage.value);
		productSummery.discount =
			productSummery.netPrice * (discountPercentage / 100);
		productSummery.totalPrice =
			productSummery.netPrice - productSummery.discount;
		discountPrice.innerText = productSummery.discount; // for discount
		totalPriceBox.innerText = productSummery.totalPrice; // for total price
	} else {
		alert('Please provide a valid discount percentage');
	}
});

//  for edit button adds on every table row  **** edit function is not working properly ***

// const editProduct = function (productID) {
// 	let tableBody = document.querySelector('#table_body');

// 	const productName = document.querySelector('#product_name');
// 	const productPrice = document.querySelector('#product_price');

// 	if (
// 		productName.value === undefined ||
// 		productName.value.trim() === '' ||
// 		productPrice.value === undefined ||
// 		productPrice.value.trim() === ''
// 	) {
// 		alert('Please select a product name and price you want to updated it ');
// 	} else {
// 		allProduct[productID] = {
// 			name: productName.value,
// 			price: parseInt(productPrice.value),
// 		};
// 	}

// 	productName.value = '';
// 	productPrice.value = '';
// 	displayProduct();
// 	displayProductSummery();
// 	for (let i = 0; i < allProduct.length; i++) {
// 		let newProductRow = document.createElement('tr');
// 		let editButton = document.createElement('button');

// 		editButton.innerText = 'Edit  + ';
// 		editButton.addEventListener('click', () => {
// 			editProduct(i);
// 		});

// 		let product_1 = document.createElement('td');
// 		let product_2 = document.createElement('td');
// 		let product_3 = document.createElement('td');

// 		product_1.innerText = i + 1;

// 		product_2.innerText = allProduct[i].name;
// 		product_3.innerText = allProduct[i].price;

// 		newProductRow.append(product_1, product_2, product_3);
// 		tableBody.append(newProductRow);
// 	}
// };
