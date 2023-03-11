// for development purposes
const history = [];

const getData = (api, cb) => {
	fetch(api)
		.then((res) => res.json())
		.then((data) => cb(data.meals))
		.catch((err) => console.log(err));
};

const displayData = (data) => {
	const foodSection = document.querySelector('.card_section');
	foodSection.innerHTML = '';

	if (!data || data.length === 0) {
		foodSection.innerHTML =
			'<h2>No meals available - please search for a valid food item</h2>';
	} else {
		data.forEach((food) => {
			const div = document.createElement('div');
			div.classList = 'card';

			const item = `
        <img src=${food.strMealThumb} alt="food Images" id="card_img">
        <h4 id="card_id">${food.idMeal}</h4>
        <h3 id="food_name">${food.strMeal}</h3>
      `;

			div.innerHTML = item;
			foodSection.appendChild(div);
		});
	}
};

const formInput = document.getElementById('search_box');

formInput.addEventListener('submit', (e) => {
	e.preventDefault();

	const inputData = document.getElementById('input_data');
	if (!inputData.value.trim()) {
		return;
	}
	handleHistory(inputData.value.trim());
	getData(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData.value.trim()}`,
		displayData,
	);

	console.log(inputData);
	inputData.value = '';
});

const displayHistory = () => {
	const historyID = document.getElementById('show_history');
	historyID.innerHTML = '';
	history.forEach((item) => {
		const p = document.createElement('li');
		p.innerText = `${item.keyword} - ${item.numberOfTime} `;
		historyID.appendChild(p);
	});
};

const handleHistory = (data) => {
	const foundFoodHistory = history.find((item) => item.keyword === data);

	if (!foundFoodHistory) {
		history.push({
			id: Date.now(),
			keyword: data,
			numberOfTime: 1,
		});
	} else {
		foundFoodHistory.numberOfTime += 1;
	}

	displayHistory();
};

getData(
	'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian',
	displayData,
);
