import './App.scss';
import AddTask from './Components/AddTask/AddTask';
import Header from './Components/Header/Header';
import Task from './Components/Tasks/Tasks';
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
				<div className='mainContent'>
					<Task />
				</div>
			</main>
		</div>
	);
}

export default App;
