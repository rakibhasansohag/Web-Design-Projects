import React from 'react';
import './task.scss';
import Button from '../Shared/UI/Button/Button.jsx';
const FilterHeader = ({ handleFilter, members, tasks }) => {
	const buttonData = ['All', 'Unit-Test', 'Front-End', 'Back-End'];

	const pendingCount = tasks.filter((task) => task.status === 'Pending').length;
	const completedCount = tasks.filter(
		(task) => task.status === 'Completed',
	).length;
	return (
		<div>
			{buttonData.map((item, i) => (
				<Button
					key={i}
					onClick={() => {
						handleFilter(item);
					}}
					label={item}
				/>
			))}

			<div className='totalCount'>
				<small>
					Total Pending Task : <span>{pendingCount}</span>{' '}
				</small>
				<small>
					Total Completed Task : <span>{completedCount}</span>{' '}
				</small>
				<small>
					Total Members : <span>{members}</span>{' '}
				</small>
			</div>
		</div>
	);
};

export default FilterHeader;
