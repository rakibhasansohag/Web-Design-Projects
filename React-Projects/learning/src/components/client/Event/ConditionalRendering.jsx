import React from 'react';

export default function ConditionalRendering({ result }) {
	return <div>{result > 4 ? 'i am gpa 5' : 'i am failed'}</div>;
}
