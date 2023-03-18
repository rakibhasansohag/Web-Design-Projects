import React from 'react';
import './history.scss';
import HistoryList from './HistoryList';
const History = () => {
	return (
		<div className='history'>
			<h2>transaction History</h2>

			<ul className='historyList'>
				{/* <li className='income'>transaction - 5/03/2023 - $5000</li> */}
				<HistoryList
					type={'income'}
					name={'salary'}
					amount={5000}
					date={new Date().toDateString()}
				/>
				<HistoryList
					type={'expense'}
					name={'electricity bill'}
					amount={500}
					date={new Date().toDateString()}
				/>
				<HistoryList
					type={'income'}
					name={'by begging'}
					amount={5000}
					date={new Date().toDateString()}
				/>
			</ul>
		</div>
	);
};

export default History;
