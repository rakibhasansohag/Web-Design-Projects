import React from 'react';
import './button.scss';
const Button = ({ type = 'button', label }) => {
	return (
		<button type={type} className='submit-btn'>
			{label}
		</button>
	);
};

export default Button;
