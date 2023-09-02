'use strict';

// Point : variables globally declared
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnDeleteAll = document.querySelector('.btn-delete');

// /////////////////////////////////////////////////////////////////////////////

// Point : Class Workout
class Workout {
	// Point : Private properties
	date = new Date();
	id = (Date.now() + '').slice(-10); // Point : Unique id for each workout
	clicks = 0;
	// Point : Public properties
	description;
	distance;
	duration;
	coords; // [lat, lng]

	constructor(coords, distance, duration) {
		this.coords = coords; // [lat, lng]
		this.distance = distance; // in km
		this.duration = duration; // in min
	}

	_setDescription() {
		// prettier-ignore
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
		'September', 'October', 'November', 'December'];

		this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
			months[this.date.getMonth()]
		} ${this.date.getDate()}`;
	}

	click() {
		this.clicks++;
	}
}

// Point : Class Running
class Running extends Workout {
	type = 'running';
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace();
		this._setDescription();
	}

	// Point : Method for calculating pace
	calcPace() {
		// min/km
		this.pace = this.duration / this.distance;
		return this.pace;
	}

	// Point : Method for displaying workout

	_displayWorkout() {
		console.log(this);
	}
}

// Point : Class Cycling
class Cycling extends Workout {
	type = 'cycling';

	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;
		this.calcSpeed();
		this._setDescription();
	}
	// Point : Method for calculating speed
	calcSpeed() {
		// km/hr
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
}

// Point : Object of class Running and Cycling
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 5.2, 24, 178);

// console.log(run1, cycling1);

/////////////////////////////////////////////////////////
// Point : Class App for all the functionality (App Controller) )
class App {
	// Point : Private properties
	#map;
	#mapEvent;
	#workouts = [];
	#mapZoomLevel = 15;
	marker;
	#workoutMarkers = {};
	#editWorkout;

	constructor() {
		this._getPosition();
		this.workoutMarkers = {};

		// Point :  Event handler for form Submit
		form.addEventListener('submit', this._newWorkout.bind(this));

		// Point : change Event on clicking on select (running or cycling)
		inputType.addEventListener('change', this._toggleElevationField);

		containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

		// Point : Get data from local storage
		this._getLocalStorage();

		// Point Delete all button visibility
		this.updateDeleteAllButtonVisibility();

		// Point : Event handler for Edit and Delete Buttons
		containerWorkouts.addEventListener(
			'click',
			function (e) {
				if (e.target.classList.contains('workout__edit')) {
					this._editWorkout(e);
				}
				if (e.target.classList.contains('workout__delete')) {
					this._deleteWorkout(e);
				}
			}.bind(this),
		);

		// Point : Event handler for delete all workouts
		btnDeleteAll.addEventListener('click', this._deleteAllWorkouts.bind(this));
	}

	// Point : For getting current location
	_getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				this._loadMap.bind(this), // Point : bind is used to set this keyword to the current object
				function () {
					alert(`
			আরে মিয়া তুমি লোকেশন পারমিশন দেও
			Could not get your position`);
				},
			);
		}
	}
	// 	Point : For loading map
	_loadMap(position) {
		const { latitude } = position.coords;
		const { longitude } = position.coords;

		console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

		const coords = [latitude, longitude];

		this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
		// console.log(map);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
		}).addTo(this.#map);

		L.marker(coords)
			.addTo(this.#map)
			.bindPopup('are ai ta  amar basa nah.')
			.openPopup();

		// Handling clicks on map
		this.#map.on('click', this._showForm.bind(this));

		this.#workouts.forEach((work) => {
			this._renderWorkoutMarker(work);
		});
	}

	_showForm(mapE) {
		this.#mapEvent = mapE;
		form.classList.remove('hidden');
		inputDistance.focus();
	}

	_hideForm() {
		// empty inputs
		inputDistance.value =
			inputDuration.value =
			inputCadence.value =
			inputElevation.value =
				'';
		// form.style.display = 'none';
		form.classList.add('hidden');
		// setTimeout(() => (form.style.display = 'grid'), 1000);
	}

	_toggleElevationField() {
		/// closet method is used to select the parent element
		inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); //
		inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
	}
	// Point : Method for adding workout and editing workout and updating it==>

	_newWorkout(e) {
		const validInputs = (...inputs) =>
			inputs.every((inp) => Number.isFinite(inp));

		const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

		e.preventDefault();

		// Point : Get data from form
		const type = inputType.value;
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const { lat, lng } = this.#mapEvent.latlng;
		let workout;

		// Point : If workout running, create running object

		if (type === 'running') {
			const cadence = +inputCadence.value;
			// Point : Check if data is valid
			if (
				// point: guard clause
				!validInputs(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			)
				return alert('Are You Dumb 🤔 enter a positive number');

			workout = new Running([lat, lng], distance, duration, cadence);
		}

		// Point : If workout cycling, create cycling object
		if (type === 'cycling') {
			const elevation = +inputElevation.value;

			if (
				!validInputs(distance, duration, elevation) ||
				!allPositive(distance, duration)
			)
				return alert('Are You Dumb 🤔 enter a positive number');

			workout = new Cycling([lat, lng], distance, duration, elevation);
		}

		if (this.#editWorkout) {
			this._updateWorkout();
		} else {
			// Point : Add new object to workout array

			this.#workouts.push(workout);

			// Point : Render workout on map as marker
			this._renderWorkoutMarker(workout);

			// Point : Render workout on list
			this._renderWorkout(workout);

			// Point : Hide form + clear input fields
			this._hideForm();

			// Point : Set local storage to all workouts
			this._setLocalStorage();

			// Point Delete all button visibility
			this.updateDeleteAllButtonVisibility();
		}

		// Point : Display marker
	}

	_renderWorkoutMarker(workout) {
		const marker = L.marker(workout.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${workout.type}-popup`,
				}),
			)
			.setPopupContent(
				`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`,
			)
			.openPopup();

		// Store the marker with the workout ID as the key
		this.workoutMarkers[workout.id] = marker;
	}

	_renderWorkout(workout) {
		let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${
							workout.description
						}  <button class="workout__edit">Edit</button>
            <button class="workout__delete">Delete</button></h2> 
            <div class="workout__details">
                <span class="workout__icon">${
									workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
								}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
    `;

		if (workout.type === 'running') {
			if (typeof workout.pace !== 'undefined') {
				html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(
											1,
										)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            `;
			}
		}

		if (workout.type === 'cycling') {
			if (typeof workout.speed !== 'undefined') {
				html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(
											1,
										)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            `;
			}
		}

		html += `</li>`;

		form.insertAdjacentHTML('afterend', html);
	}

	_moveToPopup(e) {
		const workoutEl = e.target.closest('.workout');

		if (!workoutEl) return; // Guard clause

		const workout = this.#workouts.find(
			(work) => work.id === workoutEl.dataset.id,
		);

		this.#map.setView(workout.coords, this.#mapZoomLevel, {
			animation: true,
			pan: {
				duration: 1,
			},
		});

		//  Point : Using the public interface

		// workout.click();
	}

	_setLocalStorage() {
		localStorage.setItem('workouts', JSON.stringify(this.#workouts));
	}
	_getLocalStorage() {
		const data = localStorage.getItem('workouts');

		if (!data) return; // Guard clause

		const parseData = JSON.parse(data);

		this.#workouts = parseData;

		this.#workouts.forEach((work) => {
			this._renderWorkout(work);
		});
	}

	// reset local storage
	reset() {
		localStorage.removeItem('workouts');
		location.reload();
	}

	// Point : Edit workout

	_editWorkout(e) {
		e.preventDefault();

		const workoutEl = e.target.closest('.workout');

		if (!workoutEl) return; // Guard clause

		const workoutId = workoutEl.dataset.id;
		const workoutIndex = this.#workouts.findIndex(
			(work) => work.id === workoutId,
		);

		if (workoutIndex === -1) return; // Guard clause

		const workout = this.#workouts[workoutIndex];

		// Populate form fields with workout data for editing
		inputType.value = workout.type;
		inputDistance.value = workout.distance;
		inputDuration.value = workout.duration;

		if (workout.type === 'running') {
			inputElevation.value = '';
			inputCadence.value = workout.cadence;
		} else if (workout.type === 'cycling') {
			inputElevation.value = workout.elevationGain;
			inputCadence.value = '';
		}

		// Set the edited workout as the current edit workout
		this.#editWorkout = workout;

		// Show the form
		form.classList.remove('hidden');
		inputDistance.focus();
	}

	_updateWorkout() {
		if (!this.#editWorkout) {
			console.error('No workout to update.');
			return;
		}

		if (!this.#mapEvent || !this.#mapEvent.latlng) {
			console.error('Map event or latlng is undefined');
			return;
		}

		const workoutId = this.#editWorkout.id;
		const workoutIndex = this.#workouts.findIndex(
			(work) => work.id === workoutId,
		);

		if (workoutIndex === -1) {
			console.error('Workout not found.');
			return;
		}

		const type = inputType.value;
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const coords = this.#mapEvent.latlng;

		this.#workouts[workoutIndex].type = type;
		this.#workouts[workoutIndex].distance = distance;
		this.#workouts[workoutIndex].duration = duration;
		this.#workouts[workoutIndex].coords = coords;

		if (type === 'running') {
			const cadence = +inputCadence.value;
			this.#workouts[workoutIndex].cadence = cadence;
		} else if (type === 'cycling') {
			const elevation = +inputElevation.value;
			this.#workouts[workoutIndex].elevationGain = elevation;
		}

		// Update the workout in the list
		this._removeWorkoutMarker(workoutId);
		this._renderWorkoutMarker(this.#workouts[workoutIndex]);

		const workoutElement = document.querySelector(`[data-id="${workoutId}"]`);
		if (workoutElement) {
			workoutElement.remove();
		}

		this._renderWorkout(this.#workouts[workoutIndex]);

		// Hide the form
		this._hideForm();

		// Update local storage with the updated workouts
		this._setLocalStorage();

		// Clear the edit workout flag
		this.#editWorkout = null;

		console.log('Workout updated successfully.');
	}

	// Point : Delete workout

	_removeWorkoutMarker(id) {
		const marker = this.workoutMarkers[id];
		if (marker) {
			marker.remove();
			delete this.workoutMarkers[id];
		}
	}

	_deleteWorkout(e) {
		e.preventDefault();

		const workoutEl = e.target.closest('.workout');
		if (!workoutEl) return; // Guard clause

		const workoutId = workoutEl.dataset.id;
		const workoutIndex = this.#workouts.findIndex(
			(work) => work.id === workoutId,
		);

		if (workoutIndex === -1) return; // Workout not found

		// Remove workout from array
		this.#workouts.splice(workoutIndex, 1);

		// Remove workout from UI
		workoutEl.remove();

		// Remove workout marker from the map
		this._removeWorkoutMarker(workoutId);

		// Set local storage to all workouts
		this._setLocalStorage();

		// Point Delete all button visibility
		this.updateDeleteAllButtonVisibility();
	}

	// Point : Delete all workouts
	_deleteAllWorkouts() {
		if (confirm('Are you sure you want to delete all workouts?')) {
			// Clear the workouts array
			this.#workouts = [];

			// Remove all workout markers from the map
			for (const id in this.workoutMarkers) {
				this._removeWorkoutMarker(id);
			}

			// Clear the local storage
			this._setLocalStorage();

			// Remove all workout elements from the UI
			const workoutElements = document.querySelectorAll('.workout');
			workoutElements.forEach((element) => element.remove());

			// Point Delete all button visibility
			this.updateDeleteAllButtonVisibility();
		} else {
			console.log('Delete all workouts cancelled.');
		}
	}
	// Point : Showing Delete All button only when there are more than 2 workouts
	updateDeleteAllButtonVisibility() {
		if (this.#workouts.length >= 2) {
			btnDeleteAll.style.display = 'block'; // Show the button
		} else {
			btnDeleteAll.style.display = 'none'; // Hide the button
		}
	}
}

// Point : Object of class App
const app = new App();
// app._getPosition();
// app.reset()

// Creating and inserting elements
const message = document.createElement('div');
const body = document.querySelector('body');
message.classList.add('cookie-message');

message.innerHTML =
	'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

message.style.backgroundColor = '#2D3439';
message.style.width = '120%';
body.append(message);

// Delete elements

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
	message.remove();
});
