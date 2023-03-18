import React from 'react';
import './money.scss';
import MoneyCard from './MoneyCard';
const Money = () => {
	return (
		<div className='money_section'>
			<div className='current_balance'>
				<h2>Balance</h2>
				<h2>$3000</h2>
			</div>
			<div className='income_expanse'>
				{/* <div className='income_box'>
					<p>Income</p>
					<p>$5000</p>
				</div> */}
				<MoneyCard transaction={'Income'} money={500} />
				<MoneyCard transaction={'expense'} money={500} />
			</div>
		</div>
	);
};

export default Money;
