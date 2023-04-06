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
	status: 'Pending', /// it depends on status ( Completed ,Pending)
};

const AddTask = ({ members, handleSetTasks }) => {
	const [data, setData] = useState(init);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let oldData = { ...data };

		oldData[name] = value;
		setData(oldData);
		// console.log(data); /// showing the onchange event
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSetTasks(data);
		console.log(data);
		setData(init);
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
					<option value='Front-End'>Front-End</option>
					<option value='Back-End'>Back-End</option>
				</select>

				<select
					name='teamMember'
					onChange={handleChange}
					value={data.teamMember}
				>
					<option value='none'>Select Team</option>

					{members.map((member, i) => (
						<option key={i} value={member}>
							{member}
						</option>
					))}
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
