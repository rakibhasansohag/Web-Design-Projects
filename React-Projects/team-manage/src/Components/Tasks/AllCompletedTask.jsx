import React from 'react';
import './task.scss';
import TaskCard from './TaskCard';
const AllCompletedTask = () => {
	return (
		<div className='taskBoxes'>
			<h3>All Completed Task : </h3>
			<div className='taskContainer'>
				{/* <TaskCard />
				<TaskCard />
				<TaskCard /> */}
			</div>
		</div>
	);
};

export default AllCompletedTask;
