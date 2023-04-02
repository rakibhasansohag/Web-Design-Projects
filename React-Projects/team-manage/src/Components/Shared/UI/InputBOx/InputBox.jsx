import React from 'react';
import './inputButton.scss';
const InputBox = ({ type = 'text', placeholder }) => {
	return <input className='inputBox' type={type} placeholder={placeholder} />;
};

export default InputBox;
