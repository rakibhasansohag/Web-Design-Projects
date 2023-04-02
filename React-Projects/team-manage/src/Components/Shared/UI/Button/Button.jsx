import React from 'react';
import './button.scss';
const Button = ({ type = 'button', label, children }) => {
	return (
		<button type={type} className='submit-btn'>
			{label || children}
		</button>
	);
};

export default Button;
