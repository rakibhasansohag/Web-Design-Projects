import React from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './addTask.scss';
const AddTask = () => {
	return (
		<div className='addTaskMain'>
			<h1>Add Task</h1>
			<form className='taskForm'>
				<InputBox placeholder='Task Name' />

				<select>
					<option value=''>Select Category</option>
					<option value=''>Unit Test</option>
				</select>

				<select>
					<option value=''>Select Team</option>
					<option value=''>Rakib Hasan</option>
				</select>

				<Button label='Add Task' type='submit' />
			</form>
		</div>
	);
};

export default AddTask;
