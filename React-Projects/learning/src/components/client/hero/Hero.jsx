import React from 'react';
import { PropsHandle } from '../propsHandle/PropsHandle';
import './hero.scss';

export function Hero() {
	return (
		<div className='hero_section'>
			<h1>this is hero section</h1>
			<PropsHandle name='rakib' age='18'>
				<ul>
					<li>hello this is props Children</li>
					<li>hello this is props children 2</li>
				</ul>
			</PropsHandle>
			<PropsHandle name='sohag' age='19' hero='hero' />
		</div>
	);
}
