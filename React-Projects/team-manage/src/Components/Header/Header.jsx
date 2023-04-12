import React from 'react';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './header.scss';
const Header = ({ handleSearchChange }) => {
	return (
		<header className='header'>
			<h1>Task Manager</h1>
			{/*  Search Form */}
			<form action=''>
				<InputBox
					onChange={handleSearchChange}
					type='text'
					placeholder='Search...'
				/>
			</form>
		</header>
	);
};

export default Header;
