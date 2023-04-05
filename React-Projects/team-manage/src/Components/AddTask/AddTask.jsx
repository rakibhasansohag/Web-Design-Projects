import React from 'react';
import { useState } from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './addTask.scss';

const init = {
	taskName: '',
	category: '', /// unit test
	teamMember: '', /// Rakib Hasan
	deadLine: '', /// 2023-04-03
};

const AddTask = () => {
	const [data, setData] = useState(init);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let oldData = { ...data };

		oldData[name] = value;
		setData(oldData);
		console.log(data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);
	};

	return (
		<div className='addTaskMain'>
			<h1>Add Task</h1>
			<form onSubmit={handleSubmit} className='taskForm'>
				<InputBox
					name='taskName'
					placeholder='Task Name'
					value={data.taskName}
					onChange={handleChange}
				/>

				<select
					name='category'
					onChange={handleChange}
					defaultValue={data.category}
				>
					<option value='none'>Select Category</option>
					<option value='unit Test'>Unit Test</option>
				</select>

				<select
					name='teamMember'
					onChange={handleChange}
					value={data.teamMember}
				>
					<option value='none'>Select Team</option>
					<option value='Rakib Hasan'>Rakib Hasan</option>
				</select>

				<InputBox
					name='deadLine'
					onChange={handleChange}
					type='date'
					value={data.deadLine}
				/>

				<Button label='Add Task' type='submit' />
			</form>
		</div>
	);
};

export default AddTask;
