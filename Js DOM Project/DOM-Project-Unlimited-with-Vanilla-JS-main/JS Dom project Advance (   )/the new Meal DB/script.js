/** for practice purposes
 * 1. show some food using mealDB api
 * 2. search food using the given api
 * 3. find users history
 */

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
		foodSection.innerHTML = '<h2>No Meal available ==> search valid food </h2>';
	} else {
		data.map((food) => {
			const div = document.createElement('div');
			div.classList = 'card';

			let item = `<img src=${food.strMealThumb} alt="food Images" id="card_img">
        <h4 id="card_id">${food.idMeal}</h4>
        <h3 id="food_name">${food.strMeal}</h3>`;

			div.innerHTML = item;
			foodSection.appendChild(div);
		});
	}
};

const formInput = document.getElementById('search_box');

formInput.addEventListener('submit', (e) => {
	e.preventDefault();

	let inputData = document.getElementById('input_data');
	handleHistory(inputData.value);
	getData(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData.value}`,
		displayData,
	);

	console.log(inputData.value);
	inputData.value = '';
});

const displayHistory = () => {
	const historyID = document.getElementById('show_history');
	historyID.innerHTML = null;
	history.map((item) => {
		const p = document.createElement('li');
		p.innerText = `${item.keyword} - ${item.numberOfTime} `;
		historyID.appendChild(p);
	});
};

const handleHistory = (data) => {
	const foundFoodHistory = history.filter((item) => {
		return item.keyword === data;
	});

	if (foundFoodHistory == false) {
		history.push({
			id: Date.now(),
			keyword: data,
			numberOfTime: 1,
		});
	} else if (foundFoodHistory) {
		history.map((item) => {
			if (foundFoodHistory[0].id == item.id) {
				item.numberOfTime = item.numberOfTime + 1;
			}
		});
	}
	displayHistory();

	console.log(foundFoodHistory);
	console.log(history);
};

getData(
	'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian',
	displayData,
);
