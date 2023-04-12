import React from 'react';
import './task.scss';
import Button from '../Shared/UI/Button/Button.jsx';
const FilterHeader = ({ handleFilter }) => {
	const buttonData = ['All', 'Unit-Test', 'Front-End', 'Back-End'];

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
		</div>
	);
};

export default FilterHeader;
