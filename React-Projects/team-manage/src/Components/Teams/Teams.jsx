import React from 'react';
import AddTeams from './AddTeams';
import DisplayTeams from './DisplayTeams';
import './teams.scss';
const Teams = () => {
	return (
		<div className='teamMain'>
			<h3>Team Members</h3>
			<DisplayTeams />
			<AddTeams />
		</div>
	);
};

export default Teams;
