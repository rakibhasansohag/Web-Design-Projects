import React, { useState } from 'react';
import { ExpenseButton, IncomeButton } from '../Button/Button';
import './form.scss';

const initialValue = {
	name: '',
	amount: '',
	type: '',
};

const UpdatedForm = () => {
	const [data, setData] = useState(initialValue);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newState = { ...data };

		if (type === 'checkbox') {
			newState['type'] = checked ? name : '';
		} else {
			newState[name] = value;
		}

		setData(newState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setData(initialValue);
		console.log(data);
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
					<IncomeButton income={data.type} />
				</div>
			</form>
		</div>
	);
};

export default UpdatedForm;
