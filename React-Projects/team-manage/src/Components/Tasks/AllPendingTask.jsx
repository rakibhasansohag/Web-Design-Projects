import React from 'react';
import './task.scss';
import TaskCard from './TaskCard';
const AllPendingTask = ({ tasks, editEnable, handleSetTasks }) => {
	let filterData = 'All';

	const handleFilter = (task) => {
		return task.status === 'Pending';
	};
	const handleSorting = (task) => {
		if (task.category === filterData) {
			return task;
		} else if (filterData === 'All') {
			return task;
		}
	};
	return (
		<div className='taskBoxes'>
			<h3>All pending Task : </h3>
			<div className='taskContainer'>
				{/* {tasks.length === 0 && <h1 className='taskIsEmpty'>task is empty</h1>}

				{tasks?.map((task, i) => {
					return <TaskCard key={i} task={task} />;
				})} */}
				{/* // good for error ignoring */}

				{tasks.length === 0 ? (
					<h1 className='taskIsEmpty'>task is empty</h1>
				) : (
					tasks
						.filter(handleFilter)
						.filter(handleSorting)
						.map((task) => (
							<TaskCard
								editEnable={editEnable}
								key={task.id}
								task={task}
								handleSetTasks={handleSetTasks}
							/>
						))
				)}
			</div>
		</div>
	);
};

export default AllPendingTask;
