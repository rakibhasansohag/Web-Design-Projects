import { useState } from 'react';
import './App.scss';
import AddTask from './Components/AddTask/AddTask';
import Header from './Components/Header/Header';
import Task from './Components/Tasks/Tasks';
import Teams from './Components/Teams/Teams';

function App() {
	const [members, setMembers] = useState([]);
	const [tasks, setTasks] = useState([]);
	const handleSetMembers = (data) => {
		// error const words = data.split(' ');
		// error setMembers([...members, ...words]);

		setMembers((prev) => [...prev, data]); ///:)

		// let oldData = [...members];
		// oldData.push(data);
		// setMembers(oldData);
	};

	const handleSetTasks = (task) => {
		setTasks((prev) => [...prev, task]);
	};

	console.log(members);
	console.log(tasks);
	return (
		<div className='App'>
			<Header />

			<main className='layout'>
				<div className='sideBar'>
					<AddTask members={members} handleSetTasks={handleSetTasks} />
					<Teams handleSetMembers={handleSetMembers} members={members} />
				</div>
				<div className='mainContent'>
					<Task />
				</div>
			</main>
		</div>
	);
}

export default App;
