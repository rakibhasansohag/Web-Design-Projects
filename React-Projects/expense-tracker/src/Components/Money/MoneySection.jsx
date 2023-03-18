import React from 'react';
import './money.scss';
import MoneyCard from './MoneyCard';
const Money = ({ account }) => {
	console.log(account);
	return (
		<div className='money_section'>
			<div className='current_balance'>
				<h2>Balance</h2>
				<h2 className={account.balance < 0 ? 'negative' : 'positive'}>
					{' '}
					${account.balance}
				</h2>
			</div>
			<div className='income_expanse'>
				{/* <div className='income_box'>
					<p>Income</p>
					<p>$5000</p>
				</div> */}
				<MoneyCard transaction={'Income'} money={account.income} />
				<MoneyCard transaction={'expense'} money={account.expense} />
			</div>
		</div>
	);
};

export default Money;
