import React, { useEffect, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ShoppingCartIcon } from '@heroicons/react/outline';

import { useSelector, useDispatch } from 'react-redux';
import { updateTotal } from '../state/productsSlice';

import Product from './Product';
import Upsells from './Upsells';

const Cart = () => {
	const { products } = useSelector((state) => state);
	const dispatch = useDispatch();
	const cartRef = useRef(null);
	const cartButtonRef = useRef(null);

	const total = products.total;

	useEffect(() => {
		dispatch(updateTotal());
	}, [products, dispatch, total]);

	const toggleCart = () => {
		cartRef.current.classList.toggle('translate-x-full');
		cartButtonRef.current.classList.toggle('translate-x-full');
	};

	return (
		<div
			ref={cartRef}
			className='min-h-screen absolute top-0 right-0 bg-white w-screen max-w-screen-sm translate transition duration-200 ease-in-out border shadow translate-x-full'
		>
			<div className='relative h-screen w-full flex flex-col'>
				{/* CART ICON */}
				<div
					ref={cartButtonRef}
					className='absolute top-3 -left-12 h-12 w-12 bg-white rounded-l-lg shadow-md grid place-items-center cursor-pointer transition'
					onClick={toggleCart}
				>
					<ShoppingCartIcon className='h-6 w-6' />
				</div>
				{/* HEADER */}
				<div className='bg-white sticky top-0 left-0 flex justify-between items-center p-3 border-b shadow-sm z-10'>
					<h1 className='text-2xl'>Cart ({products.items.length})</h1>
					<XIcon className='h-12 cursor-pointer' onClick={toggleCart} />
				</div>
				{/* CONTENT */}
				<div className='overflow-y-scroll flex-1 flex flex-col divide-y'>
					{products.items.map((item) => (
						<Product key={item.id} item={item} currency={products.currency} />
					))}
					<Upsells />
				</div>
				{/* SUMAMRY */}
				<div className='sticky bottom-0 border-t p-3 space-y-3'>
					{/* SHIPPING */}
					<div className='text-xl font-light flex justify-between'>
						<span>Shipping:</span>
						<span>
							{products.currency}
							{parseFloat(products.shipping).toFixed(2)}
						</span>
					</div>
					{/* TOTAL */}
					<div className='text-2xl flex justify-between'>
						<span>Order total:</span>
						<span>
							{products.currency}
							{parseFloat(total).toFixed(2)}
						</span>
					</div>
					{/* CHECKOUT BUTTON */}
					<button
						className={`text-2xl ${
							products.items.length === 0 ? 'bg-gray-400' : 'bg-violet'
						} text-white p-3 text-center rounded-md cursor-pointer w-full`}
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
