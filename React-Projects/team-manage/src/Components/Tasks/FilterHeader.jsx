import React from 'react';
import './task.scss';
import Button from '../Shared/UI/Button/Button.jsx';
const FilterHeader = () => {
	return (
		<div>
			<Button>All</Button>
			<Button>Unit Test</Button>
		</div>
	);
};

export default FilterHeader;
