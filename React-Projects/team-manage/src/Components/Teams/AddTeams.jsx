import React from 'react';
import { useState } from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './teams.scss';
const AddTeams = () => {
	const [member, setMember] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(member);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputBox
				value={member}
				onChange={(e) => setMember(e.target.value)}
				placeholder='Add Member Name...'
			/>
			<Button type='submit' label='Add Team' />
		</form>
	);
};

export default AddTeams;
