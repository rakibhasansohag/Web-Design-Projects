import React from 'react';
import './button.scss';
const ExpenseButton = ({ expense }) => {
	return (
		<div className='expenseButton'>
			<button>{expense} Button</button>
		</div>
	);
};

const IncomeButton = ({ income }) => {
	return (
		<div className='incomeButton'>
			<button> {income} Button</button>
		</div>
	);
};

export { IncomeButton, ExpenseButton };
