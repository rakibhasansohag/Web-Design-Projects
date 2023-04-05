import React from 'react';
import './teams.scss';
const DisplayTeams = ({ members }) => {
	return (
		<div>
			{members.length === 0 && <h1 className='teamCard'>Add Members</h1>}

			{members?.map((member, i) => {
				return (
					<div key={i} className='teamCard'>
						<h1>{member}</h1>
					</div>
				);
			})}
		</div>
	);
};

export default DisplayTeams;
