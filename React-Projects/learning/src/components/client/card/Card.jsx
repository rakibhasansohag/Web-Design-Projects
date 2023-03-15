import React from 'react';
import { CommonButton, MainButton } from '../button/Button';
import './card.scss';
function Card() {
	return (
		<>
			<div className='card_section'>
				<h4>this is just a card</h4>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, hic.
				</p>
				<MainButton button='main Button' />
				<CommonButton button='Common Button' />
			</div>
		</>
	);
}

export default Card;
