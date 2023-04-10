import React from 'react';
import './task.scss';
import TaskCard from './TaskCard';
const AllCompletedTask = ({ tasks, editEnable }) => {
	return (
		<div className='taskBoxes'>
			<h3>All Completed Task : </h3>
			<div className='taskContainer'>
				{tasks.length === 0 ? (
					<h1 className='taskIsEmpty'>there is 0 completed task</h1>
				) : (
					tasks
						.filter((task) => task.status === 'Completed')
						.map((task) => (
							<TaskCard editEnable={editEnable} key={task.id} task={task} />
						))
				)}
			</div>
		</div>
	);
};

export default AllCompletedTask;
