import { useState } from 'react';
import './App.css';
import UpdatedForm from './Components/Form/UpdatedForm';
import Header from './Components/Header//Header.jsx';
import History from './Components/History/History';
import MoneySection from './Components/Money/MoneySection';
function App() {
	const [account, setAccount] = useState({ balance: 0, income: 0, expense: 0 });

	const [transaction, setTransaction] = useState([]);
	// todo: old version
	// const addInputHandler = (data) => {
	// 	setTransaction([...transaction, data]);
	// 	if (data.type === 'income') {
	// 		setAccount((prev) => {
	// 			return {
	// 				...prev,
	// 				income: prev.income + data.amount,
	// 				balance: prev.balance + data.amount,
	// 			};
	// 		});
	// 	}

	// 	if (data.type == 'expense') {
	// 		setAccount((prev) => {
	// 			prev.expense = prev.expense + data.amount;
	// 			prev.balance = prev.balance - data.amount;
	// 			return prev;
	// 		});
	// 	}
	// };
	// *** new version ***

	const addInputHandler = (data) => {
		setTransaction([...transaction, data]);
		let taka = parseInt(data.amount);
		if (data.type === 'income') {
			setAccount((prev) => ({
				...prev,
				income: prev.income + taka,
				balance: prev.balance + taka,
			}));
		}

		if (data.type === 'expense') {
			setAccount((prev) => ({
				...prev,
				expense: prev.expense + taka,
				balance: prev.balance - taka,
			}));
		}
	};

	console.log(transaction);
	return (
		<div className='App'>
			<Header />
			<MoneySection account={account} />
			<UpdatedForm
				addInputHandler={addInputHandler}
				transaction={transaction}
			/>
			<History transaction={transaction} />
		</div>
	);
}

export default App;
