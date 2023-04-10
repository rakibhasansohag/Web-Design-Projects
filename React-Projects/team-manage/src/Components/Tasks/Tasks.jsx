import React from 'react';
import AllCompletedTask from './AllCompletedTask';
import AllPendingTask from './AllPendingTask';
import FilterHeader from './FilterHeader';
import './task.scss';
const Task = ({ tasks, editEnable }) => {
	// let completedTask = tasks.filter((task) => task.status === 'Completed'); for learning purposes

	return (
		<div>
			<FilterHeader />
			<AllPendingTask editEnable={editEnable} tasks={tasks} />
			<AllCompletedTask editEnable={editEnable} tasks={tasks} />
		</div>
	);
};

export default Task;
