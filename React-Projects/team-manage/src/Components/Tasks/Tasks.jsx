import React from 'react';
import AllCompletedTask from './AllCompletedTask';
import AllPendingTask from './AllPendingTask';
import FilterHeader from './FilterHeader';
import './task.scss';
const Task = ({ tasks }) => {
	return (
		<div>
			<FilterHeader />
			<AllPendingTask tasks={tasks} />
			<AllCompletedTask />
		</div>
	);
};

export default Task;
