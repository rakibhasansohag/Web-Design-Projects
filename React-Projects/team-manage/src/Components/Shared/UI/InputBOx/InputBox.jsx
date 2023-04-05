import React from 'react';
import './inputButton.scss';
const InputBox = ({ type = 'text', value, ...rest }) => {
	return <input className='inputBox' type={type} value={value} {...rest} />;
};

export default InputBox;
