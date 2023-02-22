'use strict'; // for strict mode

const formSubmit = document.querySelector('#product_form');
const allProduct = [];

const displayProduct = function () {
	let tableBody = document.querySelector('#table_body');
	tableBody.innerText = '';
	for (let i = 0; i < allProduct.length; i++) {
		let newProductRow = document.createElement('tr');

		let product_1 = document.createElement('td');
		let product_2 = document.createElement('td');
		let product_3 = document.createElement('td');

		product_1.innerText = i + 1;
		product_2.innerText = allProduct[i].name;
		product_3.innerText = allProduct[i].price;

		newProductRow.append(product_1, product_2, product_3);
		tableBody.append(newProductRow);
	}
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
			price: productPrice.value,
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
});
