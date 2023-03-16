import React, { useState } from 'react';
import './propsHandle.scss';
const Counter = () => {
	const [count, setCount] = useState(0);
	const handleIncrement = (value) => {
		setCount((prev) => prev + value);
	};
	const handleDecrement = (value) => {
		setCount((prev) => prev - value);
	};
	return (
		<div>
			<h1>counter App</h1>
			<hr />

			<h2>Counter : : {count}</h2>

			<br />
			<button
				onClick={() => {
					handleIncrement(1);
				}}
			>
				Increment by 1
			</button>
			<button
				onClick={() => {
					handleDecrement(1);
				}}
			>
				Decrement by 1
			</button>
			<hr />
			<button
				onClick={() => {
					handleIncrement(5);
				}}
			>
				Increment by 3
			</button>
			<button
				onClick={() => {
					handleDecrement(5);
				}}
			>
				Decrement by 3
			</button>
		</div>
	);
};

export default Counter;
