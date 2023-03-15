import React from 'react';
import './Button.scss';
export function MainButton(props) {
	return <div id='mainButton'>{props.button}</div>;
}

export function CommonButton(props) {
	return <div id='CommonButton'>{props.button}</div>;
}
