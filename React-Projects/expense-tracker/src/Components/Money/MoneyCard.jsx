import React from 'react';

const MoneyCard = ({ transaction, money }) => {
	return (
		<div className='expanse_box'>
			<p>{transaction}</p>
			<p>${money}</p>
		</div>
	);
};

export default MoneyCard;
