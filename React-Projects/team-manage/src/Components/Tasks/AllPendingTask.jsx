import React from 'react';
import './task.scss';
import TaskCard from './TaskCard';
const AllPendingTask = () => {
	return (
		<div className='taskBoxes'>
			<h3>All pending Task : </h3>
			<div className='taskContainer'>
				<TaskCard />
				<TaskCard />
				<TaskCard />
			</div>
		</div>
	);
};

export default AllPendingTask;
