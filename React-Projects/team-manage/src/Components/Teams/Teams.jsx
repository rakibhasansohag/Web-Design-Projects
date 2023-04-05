import React from 'react';
import AddTeams from './AddTeams';
import DisplayTeams from './DisplayTeams';
import './teams.scss';
const Teams = ({ handleSetMembers, members }) => {
	return (
		<div className='teamMain'>
			<h3>Team Members</h3>
			<DisplayTeams members={members} />
			<AddTeams handleSetMembers={handleSetMembers} />
		</div>
	);
};

export default Teams;
