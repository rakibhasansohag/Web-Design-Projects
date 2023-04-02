import React from 'react';
import Button from '../Shared/UI/Button/Button';
import './task.scss';
const TaskCard = () => {
	return (
		<div className='taskCard'>
			<p>this is unit test task</p>
			<h4>Category</h4>
			<h4>Rakib Hasan</h4>
			<h4>DeadLine : 5-3-3</h4>
			<Button label='Edit' />
			<Button label='Complete' />
		</div>
	);
};

export default TaskCard;
