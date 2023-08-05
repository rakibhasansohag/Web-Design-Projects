// BANKIST APP

// All the Data we need for the app
const account1 = {
	owner: 'Rakib Hasan Sohag',
	movements: [400, 650, -1200, 300, -450, -80, 100, 800],
	interestRate: 1.2,
	pin: 1111,
	movementsDates: [
		'2023-08-08T10:51:36.790Z',
		'2023-08-07T10:51:36.790Z',
		'2023-08-06T10:51:36.790Z',
		'2023-08-03T10:51:36.790Z',
		'2023-08-02T10:51:36.790Z',
		'2023-08-01T10:51:36.790Z',
		'2023-07-29T10:51:36.790Z',
		'2023-07-28T10:51:36.790Z',
	],
	currency: 'BDT',
	local: 'bn-BD',
};

const account2 = {
	owner: 'Rakib Hasan',
	movements: [1000, -2000, 300, -50, -300, -1000, 500, -10],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		'2023-08-08T10:51:36.790Z',
		'2023-08-07T10:51:36.790Z',
		'2023-08-06T10:51:36.790Z',
		'2023-08-03T10:51:36.790Z',
		'2023-08-02T10:51:36.790Z',
		'2023-08-01T10:51:36.790Z',
		'2023-07-29T10:51:36.790Z',
		'2023-07-28T10:51:36.790Z',
	],
	currency: 'EUR',
	local: 'en-US',
};

const account3 = {
	owner: 'Shakil Hasan',
	movements: [200, -100, 450, -100, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		'2023-08-08T10:51:36.790Z',
		'2023-08-07T10:51:36.790Z',
		'2023-08-06T10:51:36.790Z',
		'2023-08-03T10:51:36.790Z',
		'2023-08-02T10:51:36.790Z',
		'2023-08-01T10:51:36.790Z',
		'2023-07-29T10:51:36.790Z',
		'2023-07-28T10:51:36.790Z',
	],
	currency: 'USD',
	local: 'en-US',
};

const account4 = {
	owner: 'Billal Hossain',
	movements: [100, 500, 200, 50, 90],
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		'2023-08-08T10:51:36.790Z',
		'2023-08-07T10:51:36.790Z',
		'2023-08-06T10:51:36.790Z',
		'2023-08-03T10:51:36.790Z',
		'2023-08-02T10:51:36.790Z',
	],
	currency: 'IRE',
	local: 'en-US',
};

const account5 = {
	owner: 'Sohan Hasan Rahul',
	movements: [200, 1000, -300, 70, 120],
	interestRate: 1.4,
	pin: 5555,
	movementsDates: [
		'2023-08-08T10:51:36.790Z',
		'2023-08-07T10:51:36.790Z',
		'2023-08-06T10:51:36.790Z',
		'2023-08-03T10:51:36.790Z',
		'2023-08-02T10:51:36.790Z',
	],
	currency: 'yuan',
	local: 'zh-CN',
};
const accounts = [account1, account2, account3, account4, account5];

// todo : currency format
const conversionRates = {
	EUR: 1, // Base currency (Euro)
	USD: 1.12, // Conversion rate from Euro to USD
	bdt: 0.012, // Conversion rate from Euro to BDT
	ire: 0.8, // Conversion rate from Euro to IRE
};

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////// point : bankist app all functions //
/////////////////////////////////////////////////

/// display movements
const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = '';

	// todo : sort movements

	const sortingMovements = sort
		? movements.slice().sort((a, b) => a - b)
		: movements;

	sortingMovements.forEach(function (movement, index) {
		const type = movement > 0 ? 'deposit' : 'withdrawal';

		const html = `

		<div class="movements__row">
			<div class="movements__type movements__type--${type}" > ${type} ${
			index + 1
		}</div>

			<div class="movements__value ">   ${movement} €</div>

		</div>

		`;

		containerMovements.insertAdjacentHTML('afterbegin', html); // afterbegin : insert html at the beginning of the container
	});
};

/// display balance
const calcDisplayBalance = function (acc) {
	const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	acc.balance = balance;
	labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = function (acc) {
	const incomes = acc.movements
		.filter((mov) => mov > 0)
		.reduce((acc, cur) => acc + cur, 0);

	labelSumIn.textContent = `${incomes} €`;
	const outcomes = acc.movements
		.filter((mov) => mov < 0)
		.reduce((acc, cur) => Math.trunc(acc + cur), 0);
	labelSumOut.textContent = `${Math.abs(outcomes)} €`;

	const interestRate = acc.movements
		.filter((mov) => mov > 0)
		.map((deposit) => (deposit * acc.interestRate) / 100)
		.filter((int, i, arr) => {
			// console.log(arr);

			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interestRate} €`;
};

// calcDisplaySummary(account1.movements);

/// display summary
const createUserNames = function (accounts) {
	accounts.forEach((account) => {
		account.username = account.owner
			.toLowerCase()
			.split(' ')
			.map((name) => name[0])
			.join('');
	});
};

createUserNames(accounts);

// todo : Update UI

function updateUI(acc) {
	// display movements
	displayMovements(acc.movements);

	const movementRow = document.querySelectorAll('.movements__row');

	movementRow.forEach((row, index) => {
		setTimeout(() => {
			row.classList.add('slide-in');
		}, index * 10000);
	});

	// display balance
	calcDisplayBalance(acc);

	// display summary
	calcDisplaySummary(acc);

	// todo : new features

	const balanceValue = document.querySelector('.balance__value');
	balanceValue.classList.add('animate-scale');

	const summaryLabels = document.querySelectorAll('.summary__label');
	const summaryValues = document.querySelectorAll('.summary__value');

	summaryLabels.forEach((label) => {
		label.classList.add('animate-slide');
	});

	summaryValues.forEach((value) => {
		value.classList.add('animate-slide');
	});
}

// todo : Event handler ( login )
let currentAccount;

btnLogin.addEventListener('click', function (e) {
	e.preventDefault();

	currentAccount = accounts.find((acc) => {
		return acc.username === inputLoginUsername.value;
	});

	// console.log(currentAccount);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		// display UI and message
		labelWelcome.textContent = `Welcome back, ${
			currentAccount.owner.split(' ')[0]
		}`;

		containerApp.style.opacity = 100;

		// clear input fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();

		// update UI
		updateUI(currentAccount);

		alert('please check the console for the username and PIN :');

		accounts.map((acc) => {
			console.log(`UserName : ${acc.username} , PIN : ${acc.pin}  `);
		});
		console.log('please save those credentials');
	} else {
		const jumpScareSound = new Audio('jump_scare_sound.mp3');
		jumpScareSound.play();

		const loginError = document.querySelector('.login');
		loginError.classList.add('--error');

		setTimeout(() => {
			alert('Wrong username or PIN! Beware of what lurks in the darkness...');
		}, jumpScareSound.duration * 3000);
	}
});

// todo : transfer money

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiveAcc = accounts.find(
		(acc) => acc.username === inputTransferTo.value,
	).username
		? accounts.find((acc) => acc.username === inputTransferTo.value)
		: undefined;

	console.log(amount, receiveAcc);

	if (
		amount > 0 &&
		receiveAcc &&
		currentAccount.balance >= amount &&
		receiveAcc?.username !== currentAccount.username
	) {
		console.log('transfer valid');
		// doing the transfer
		currentAccount.movements.push(-amount);
		receiveAcc.movements.push(amount);

		// update UI

		updateUI(currentAccount);

		inputTransferAmount.value = inputTransferTo.value = '';
		inputTransferAmount.blur();
	}
});

// todo : request loan

btnLoan.addEventListener('click', function (e) {
	e.preventDefault();

	const amount = Number(inputLoanAmount.value);

	if (
		amount > 0 &&
		currentAccount.movements.some((mov) => mov >= amount * 0.1)
	) {
		// add movement
		currentAccount.movements.push(amount);

		// update UI
		updateUI(currentAccount);
	} else {
		alert('You cannot request a loan ! :(');
	}

	inputLoanAmount.value = '';
	inputLoanAmount.blur();
});

// todo : close account

btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		Number(inputClosePin.value) === currentAccount.pin &&
		inputCloseUsername.value === currentAccount.username
	) {
		// delete account

		const index = accounts.findIndex(
			(acc) => acc.username === currentAccount.username,
		);

		accounts.splice(index, 1);

		// hide UI
		containerApp.style.opacity = 0;

		inputClosePin.value = inputCloseUsername.value = '';
		inputClosePin.blur();

		labelWelcome.textContent = 'Log in to get started';

		// console.log(accounts);

		// update UI

		updateUI(currentAccount);

		// display message

		alert('Account deleted');

		// clear input fields

		inputClosePin.value = inputCloseUsername.value = '';

		inputClosePin.blur();
	} else {
		alert('Wrong credentials');
	}
});

// todo : sort movements (BTN ASCENDING )
let sorted = false;
let sortButtonClickCount = 0;
btnSort.addEventListener(
	'click',
	function (e) {
		e.preventDefault();
		sortButtonClickCount++;
		displayMovements(currentAccount.movements, !sorted);
		sorted = !sorted;

		if (sortButtonClickCount === 4) {
			alert('You are a hacker !');
		} else if (sortButtonClickCount === 9) {
			alert('You clicked the sort button multiple times!');
		}
	},
	1000,
);

// todo : Function to show account details in placeholder

const showAccountDetailsInPlaceholders = (account) => {
	alert(
		`First Account Details:\nUsername: ${account.username}\nPIN: ${account.pin}`,
	);

	inputLoginUsername.placeholder = account.username;
	inputLoginUsername.removeAttribute('disabled');

	inputLoginPin.placeholder = account.pin;
	inputLoginPin.removeAttribute('disabled');
};

// Check if localStorage has the 'visited' key
if (!localStorage.getItem('visited')) {
	// Show alert with the details of the first account
	// alert(
	// 	`First Account Details:\nUsername: ${accounts[0].username}\nPIN: ${accounts[0].pin}`,
	// );

	// Set 'visited' key in localStorage
	localStorage.setItem('visited', true);

	// Show account details in placeholders
	showAccountDetailsInPlaceholders(accounts[0]);
} else {
	// Make placeholders editable
	inputLoginUsername.removeAttribute('disabled');
	inputLoginPin.removeAttribute('disabled');
}

// todo: Debounce function to limit the frequency of function calls
function debounce(func, delay) {
	let timeoutId;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
}

// todo : currency converter

const convertCurrency = function (balance, targetCurrency) {
	const conversionRate = conversionRates[targetCurrency];
	if (conversionRate) {
		const convertedBalance = balance * conversionRate;
		return convertedBalance.toFixed(2); // Adjust the decimal places as needed
	} else {
		return 'Unsupported currency';
	}
};
