// i am not using this code for performance

import React, { useState } from 'react';
import { ExpenseButton, IncomeButton } from '../Button/Button';
import './form.scss';

const initialValue = {
	name: '',
	amount: '',
	type: '',
};

const Form = () => {
	const [data, setData] = useState(initialValue);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		const oldState = { ...data };

		if (type === 'checkbox') {
			oldState['type'] = name;
		} else {
			oldState[name] = value;
		}
		setData(oldState);
		console.log(data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setData(initialValue);

		console.log(data);
	};

	return (
		<div className='form'>
			<h2>Add Income or Expanse</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Name : </label>
					<input
						value={data.name}
						name='name'
						type='text'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>Amount : </label>
					<input
						value={data.amount}
						onChange={handleChange}
						name='amount'
						type='number'
					/>
				</div>
				<div>
					<label htmlFor=''>Income : </label>
					<input
						defaultChecked={(data.type = 'income' ? true : false)}
						onClick={handleChange}
						name='income'
						type='checkbox'
					/>
				</div>
				<div>
					<label htmlFor=''>expense : </label>
					<input
						defaultChecked={(data.type = 'expense' ? true : false)}
						onClick={handleChange}
						name='expense'
						type='checkbox'
					/>
				</div>

				<div className='button_box'>
					<ExpenseButton expense='expense' />
					<IncomeButton income='Income' />
				</div>
			</form>
		</div>
	);
};

export default Form;
