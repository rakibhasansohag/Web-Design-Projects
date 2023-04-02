import './App.scss';
import AddTask from './Components/AddTask/AddTask';
import Header from './Components/Header/Header';
import Teams from './Components/Teams/Teams';

function App() {
	return (
		<div className='App'>
			<Header />

			<main className='layout'>
				<div className='sideBar'>
					<AddTask />
					<Teams />
				</div>
			</main>
		</div>
	);
}

export default App;
