import React from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './teams.scss';
const AddTeams = () => {
	return (
		<form>
			<InputBox placeholder='Add Member Name...' />
			<Button type='submit' label='Add Team' />
		</form>
	);
};

export default AddTeams;
