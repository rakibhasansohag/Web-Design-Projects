import React, { useState } from 'react';
import AllCompletedTask from './AllCompletedTask';
import AllPendingTask from './AllPendingTask';
import FilterHeader from './FilterHeader';
import './task.scss';
const Task = ({ members, tasks, editEnable, handleSetTasks, search }) => {
	// point let completedTask = tasks.filter((task) => task.status === 'Completed'); for learning purposes

	const [sortFilterData, setSortFilterData] = useState('All');

	const handleFilter = (task) => {
		setSortFilterData(task);
	};

	return (
		<div>
			<FilterHeader
				tasks={tasks}
				members={members.length}
				handleFilter={handleFilter}
			/>
			<AllPendingTask
				search={search}
				handleSetTasks={handleSetTasks}
				editEnable={editEnable}
				tasks={tasks}
				sortFilterData={sortFilterData}
			/>
			<AllCompletedTask editEnable={editEnable} tasks={tasks} />
		</div>
	);
};

export default Task;
