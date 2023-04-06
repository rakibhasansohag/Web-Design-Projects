import React from 'react';
import Button from '../Shared/UI/Button/Button';
import './task.scss';
const TaskCard = ({ task }) => {
	console.log(task);
	const { taskName, category, teamMember, status, deadLine } = task;
	console.log(taskName, category, teamMember, status);
	return (
		<div className='taskCard'>
			{/* <p>this is unit test </p>
			<h4>Category</h4>
			<h4>Rakib Hasan</h4>
			<h4>DeadLine : 5-3-3</h4>
			<Button label='Edit' />
			<Button label='Complete' /> */}

			<p>{taskName} </p>
			<h4>Category : {category} </h4>
			<h4> {teamMember} </h4>
			<h4>DeadLine : {deadLine}</h4>
			<Button label='Edit' />
			<Button label='Completed' />
		</div>
	);
};

export default TaskCard;
