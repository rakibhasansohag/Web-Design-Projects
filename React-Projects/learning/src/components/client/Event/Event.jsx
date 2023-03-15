import React from 'react';
import './event.scss';
function Event() {
	const handleChange = (e) => {
		// console.log(e.target.name, e.target.value);

		const { name, value } = e.target;
		console.log(name, value);
	};

	return (
		<div>
			<h1>it is from Event Page</h1>
			<form>
				{' '}
				<label> name</label>
				<input
					type='text'
					name='rakib'
					id='inputValue'
					placeholder='Name'
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}

export default Event;
