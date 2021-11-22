import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deleteItem, updateQty } from '../state/productsSlice';

const Product = ({ item, currency }) => {
	const { id, image, price, product_name, product_options, qty } = item;

	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const [currentQty, setCurrentQty] = useState(qty);
	const [isMin, setIsMin] = useState(false);
	const [isMax, setIsMax] = useState(false);

	useEffect(() => {
		currentQty <= 1 ? setIsMin(true) : setIsMin(false);
		currentQty >= 10 ? setIsMax(true) : setIsMax(false);
		// console.log(currentQty);
		dispatch(updateQty({ currentQty, id }));
	}, [currentQty, dispatch, id]);

	return (
		<div className='w-full p-3 space-y-4 relative'>
			<XIcon
				className='h-6 absolute top-3 right-3 cursor-pointer'
				onClick={() => {
					dispatch(deleteItem(id));
				}}
			/>
			{/* INFO */}
			<div className='flex space-x-6'>
				<img src={image} alt={`${product_name}`} className='image' />
				<div className='flex-1 flex flex-col'>
					<h4 className='text-xl font-light'>{product_name}</h4>
					{product_options.map((option) => (
						<p key={option.id} className='text-sm'>
							<span className='font-bold'>{option.name}: </span>
							<span className='font-light text-violet'>{option.value}</span>
						</p>
					))}
				</div>
			</div>

			{/* QTY AND PRICE */}
			<div className='flex justify-between'>
				{/* QTY */}
				<div className='flex space-x-2'>
					<span className='font-medium text-md'>Qty:</span>
					{/* NUM INPUT */}
					<div className='relative overflow-hidden border rounded'>
						<button
							className={`add-substract-button left-0 
              ${isMin ? 'bg-gray-300' : 'bg-violet'}`}
							disabled={isMin}
							onClick={() => {
								setCurrentQty(currentQty - 1);
							}}
						>
							-
						</button>
						<input
							ref={inputRef}
							type='number'
							min='1'
							max='10'
							onBlur={(e) => {
								if (Number(e.target.value) > 10) setCurrentQty(10);
								if (Number(e.target.value) < 1) setCurrentQty(1);
							}}
							className='w-28 text-center focus:outline-none'
							value={currentQty}
							onChange={(e) => setCurrentQty(Number(e.target.value))}
						/>
						<button
							className={`add-substract-button right-0
              ${isMax ? 'bg-gray-300' : 'bg-violet'}`}
							disabled={isMax}
							onClick={() => {
								setCurrentQty(currentQty + 1);
							}}
						>
							+
						</button>
					</div>
				</div>
				{/* PRICE */}
				<div className='space-x-3 text-xl'>
					{price.old_price && (
						<span className='line-through text-violet-light'>
							{currency}
							{(parseFloat(price.old_price) * currentQty).toFixed(2)}
						</span>
					)}
					<span>
						{currency}
						{(parseFloat(price.current_price) * currentQty).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Product;
