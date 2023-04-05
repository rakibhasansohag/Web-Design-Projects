import React from 'react';
import { useState } from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './teams.scss';
const AddTeams = ({ handleSetMembers }) => {
	const [member, setMember] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		handleSetMembers(member);
		console.log(member);

		setMember('');
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
