import React from 'react';
import { useState } from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './addTask.scss';

const AddTask = () => {
	const init = {
		taskName: 'add Task',
		category: '', /// unit test
		teamMember: '', /// Rakib Hasan
		deadLine: '2023-04-03', /// 2023-04-03
	};

	const [data, setDate] = useState(init);

	return (
		<div className='addTaskMain'>
			<h1>Add Task</h1>
			<form className='taskForm'>
				<InputBox placeholder='Task Name' value={data.taskName} />

				<select defaultValue={data.category}>
					<option disabled value=''>
						Select Category
					</option>
					<option value=''>Unit Test</option>
				</select>

				<select defaultValue={data.teamMember}>
					<option disabled value=''>
						Select Team
					</option>
					<option value=''>Rakib Hasan</option>
				</select>

				<InputBox type='date' value={data.deadLine} />

				<Button label='Add Task' type='submit' />
			</form>
		</div>
	);
};

export default AddTask;
