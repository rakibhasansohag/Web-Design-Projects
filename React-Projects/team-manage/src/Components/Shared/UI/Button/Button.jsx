import React from 'react';
import './button.scss';
const Button = ({ type = 'button', label, children, ...rest }) => {
	return (
		<button type={type} {...rest} className='submit-btn'>
			{label || children}
		</button>
	);
};

export default Button;
