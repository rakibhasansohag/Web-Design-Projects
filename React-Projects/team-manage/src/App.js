import { useState } from 'react';
import './App.scss';
import AddTask from './Components/AddTask/AddTask';
import Header from './Components/Header/Header';
import Task from './Components/Tasks/Tasks';
import Teams from './Components/Teams/Teams';

const initialValue = [
	{
		taskName: '	make an todo app',
		category: 'Front-End',
		teamMember: 'rakib Hasan Sohag',
		deadLine: '2023-04-10',
		status: 'Pending',
	},
	{
		taskName: '	make an copy paste app',
		category: 'Back-End',
		teamMember: ' Sohag hasan',
		deadLine: '2023-04-10',
		status: 'Completed',
	},
	{
		taskName: '	make an an back-end server',
		category: 'Unit Test',
		teamMember: 'rakib Hasan ',
		deadLine: '2023-04-10',
		status: 'Pending',
	},
];

function App() {
	const [members, setMembers] = useState([]);
	const [tasks, setTasks] = useState([...initialValue]);
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
	console.log('task', tasks);
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
					<Task tasks={tasks} />
				</div>
			</main>
		</div>
	);
}

export default App;
