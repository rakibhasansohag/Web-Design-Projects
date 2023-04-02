import React from 'react';
import AllCompletedTask from './AllCompletedTask';
import AllPendingTask from './AllPendingTask';
import FilterHeader from './FilterHeader';
import './task.scss';
const Task = () => {
	return (
		<div>
			<FilterHeader />
			<AllPendingTask />
			<AllCompletedTask />
		</div>
	);
};

export default Task;
