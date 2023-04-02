import React from 'react';
import './inputButton.scss';
const InputBox = ({ type = 'text', placeholder, value }) => {
	return (
		<input
			className='inputBox'
			type={type}
			placeholder={placeholder}
			value={value}
		/>
	);
};

export default InputBox;
