// BANKIST APP

// / All the Data we need for the app
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
	locale: 'bn-BD',
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
	locale: 'en-US',
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
	locale: 'en-US',
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
	locale: 'en-US',
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
	currency: 'JPY',
	locale: 'zh-CN',
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

// /global variable
let currentAccount;
// todo : Format movement date
const formatMovementDate = function (date, locale) {
	const calcDaysPassed = (date1, date2) =>
		Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

	const daysPassed = calcDaysPassed(new Date(), date);

	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	return new Intl.DateTimeFormat(locale).format(date);
};

// Format currency
const formatCurrency = function (value, locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(value);
};

// Display movements
const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = '';

	const sortingMovements = sort
		? movements.slice().sort((a, b) => a - b)
		: movements;

	sortingMovements.forEach(function (mov, index) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const date = new Date(currentAccount.movementsDates[index]);

		const displayDate = formatMovementDate(date, currentAccount.locale);

		const formattedDate = formatCurrency(
			mov,
			currentAccount.locale,
			currentAccount.currency,
		);

		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
			index + 1
		} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedDate}</div>
      </div>
    `;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

// todo : Calculate and display balance
const calcDisplayBalance = function (acc) {
	const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	acc.balance = balance;
	labelBalance.textContent = formatCurrency(
		acc.balance,
		acc.locale,
		acc.currency,
	);
};

// todo : Calculate and display summary
const calcDisplaySummary = function (acc) {
	const incomes = acc.movements
		.filter((mov) => mov > 0)
		.reduce((acc, cur) => acc + cur, 0);

	labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

	const outcomes = acc.movements
		.filter((mov) => mov < 0)
		.reduce((acc, cur) => Math.trunc(acc + cur), 0);

	labelSumOut.textContent = formatCurrency(outcomes, acc.locale, acc.currency);

	const interestRate = acc.movements
		.filter((mov) => mov > 0)
		.map((deposit) => (deposit * acc.interestRate) / 100)
		.filter((int, i, arr) => int >= 1)
		.reduce((acc, int) => acc + int, 0);

	labelSumInterest.textContent = formatCurrency(
		interestRate,
		acc.locale,
		acc.currency,
	);
};

// todo :  Create user names
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
	displayMovements(acc.movements);

	const movementRow = document.querySelectorAll('.movements__row');

	movementRow.forEach((row, index) => {
		setTimeout(() => {
			row.classList.add('slide-in');
		}, index * 1000);
	});

	calcDisplayBalance(acc);
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

// todo : Login event handler ( login )

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

// Transfer money event handler
btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiveAcc = accounts.find(
		(acc) => acc.username === inputTransferTo.value,
	);

	if (
		amount > 0 &&
		receiveAcc &&
		currentAccount.balance >= amount &&
		receiveAcc.username !== currentAccount.username
	) {
		currentAccount.movements.push(-amount);
		receiveAcc.movements.push(amount);
		updateUI(currentAccount);
		inputTransferAmount.value = inputTransferTo.value = '';
		inputTransferAmount.blur();
	}
});

// Request loan event handler
btnLoan.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(inputLoanAmount.value);

	if (
		amount > 0 &&
		currentAccount.movements.some((mov) => mov >= amount * 0.1)
	) {
		currentAccount.movements.push(amount);
		updateUI(currentAccount);
	} else {
		alert('You cannot request a loan! :(');
	}

	inputLoanAmount.value = '';
	inputLoanAmount.blur();
});

// Close account event handler
btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		Number(inputClosePin.value) === currentAccount.pin &&
		inputCloseUsername.value === currentAccount.username
	) {
		const index = accounts.findIndex(
			(acc) => acc.username === currentAccount.username,
		);
		accounts.splice(index, 1);
		containerApp.style.opacity = 0;
		inputClosePin.value = inputCloseUsername.value = '';
		inputClosePin.blur();
		labelWelcome.textContent = 'Log in to get started';
		updateUI(currentAccount);
		alert('Account deleted');
		inputClosePin.value = inputCloseUsername.value = '';
		inputClosePin.blur();
	} else {
		alert('Wrong credentials');
	}
});

// Sort movements event handler
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
			alert('You are a hacker!');
		} else if (sortButtonClickCount === 9) {
			alert('You clicked the sort button multiple times!');
		}
	},
	1000,
);

// Show account details in placeholders
const showAccountDetailsInPlaceholders = (account) => {
	alert(
		`First Account Details:\nUsername: ${account.username}\nPIN: ${account.pin}`,
	);
	inputLoginUsername.placeholder = account.username;
	inputLoginUsername.removeAttribute('disabled');
	inputLoginPin.placeholder = account.pin;
	inputLoginPin.removeAttribute('disabled');
};

if (!localStorage.getItem('visited')) {
	localStorage.setItem('visited', true);
	showAccountDetailsInPlaceholders(accounts[0]);
} else {
	inputLoginUsername.removeAttribute('disabled');
	inputLoginPin.removeAttribute('disabled');
}

// Debounce function
function debounce(func, delay) {
	let timeoutId;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
}

// Currency converter
const convertCurrency = function (balance, targetCurrency) {
	const conversionRate = conversionRates[targetCurrency];
	if (conversionRate) {
		const convertedBalance = balance * conversionRate;
		return convertedBalance.toFixed(2);
	} else {
		return 'Unsupported currency';
	}
};
