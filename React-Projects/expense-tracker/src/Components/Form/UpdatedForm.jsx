import React, { useState } from 'react';
import { ExpenseButton } from '../Button/Button';
import './form.scss';

const initialValue = {
	name: '',
	amount: '',
	type: '',
	date: '',
};

const UpdatedForm = ({ addInputHandler }) => {
	const [data, setData] = useState(initialValue);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newState = { ...data };

		if (type === 'checkbox') {
			newState['type'] = checked ? name : '';
		} else {
			newState[name] = value;
		}
		newState['date'] = new Date().toLocaleDateString();
		setData(newState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if any field is empty
		if (!data.name || !data.amount || !data.type) {
			alert('Please provide name, amount and type');
			return;
		}

		addInputHandler(data);

		setData(initialValue);
	};

	return (
		<div className='form'>
			<h2>Add Income or Expense</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Name: </label>
					<input
						value={data.name}
						name='name'
						type='text'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>Amount: </label>
					<input
						value={data.amount}
						name='amount'
						type='number'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>Income: </label>
					<input
						defaultChecked={data.type === 'income'}
						onChange={handleChange}
						name='income'
						type='checkbox'
					/>
				</div>
				<div>
					<label htmlFor=''>Expense: </label>
					<input
						defaultChecked={data.type === 'expense'}
						onChange={handleChange}
						name='expense'
						type='checkbox'
					/>
				</div>

				<div className='button_box'>
					<ExpenseButton expense={data.type} />
				</div>
			</form>
		</div>
	);
};

export default UpdatedForm;
