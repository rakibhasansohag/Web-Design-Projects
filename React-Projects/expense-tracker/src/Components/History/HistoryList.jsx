import React from 'react';

const HistoryList = ({ name, date, type, amount }) => {
	return (
		<li className={type}>
			{name} : {date} - ${amount}
		</li>
	);
};

export default HistoryList;
