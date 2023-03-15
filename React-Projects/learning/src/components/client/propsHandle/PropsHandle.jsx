import React from 'react';

export function MainHero(props) {
	return <span>hello this is main {props.hero}</span>;
}

export function PropsHandle({ children }, props) {
	const { name, hero = noName } = props;

	return (
		<div className='propsHandle'>
			<h3>
				hello i am {name}. i am {props.age} years old
			</h3>
			<br />

			<h1>this is second hero section</h1>
			<h3>hello i am sohag. i am 19 years old</h3>
			<h1>
				<MainHero hero={hero} />
			</h1>
			<p>{children?.props.children[1]}</p>
		</div>
	);
}

const noName = 'hello default props working';
