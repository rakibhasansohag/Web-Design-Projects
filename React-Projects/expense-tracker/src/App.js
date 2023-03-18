import './App.css';
import UpdatedForm from './Components/Form/UpdatedForm';
import Header from './Components/Header//Header.jsx';
import History from './Components/History/History';
import MoneySection from './Components/Money/MoneySection';
function App() {
	return (
		<div className='App'>
			<Header />
			<MoneySection />
			<UpdatedForm />
			<History />
		</div>
	);
}

export default App;
