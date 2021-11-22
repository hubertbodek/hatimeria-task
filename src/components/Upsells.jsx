import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Upsells = () => {
	const [upsells, setUpsells] = useState([]);
	const { currency } = useSelector((state) => state.products);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://fakestoreapi.com/products?limit=2');
			const data = response.json();
			return data;
		};

		fetchData()
			.then((data) => {
				setUpsells(data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			{upsells.length ? (
				<div className='bg-violet-light p-5'>
					<h2 className='text-gray-600 font-medium text-lg mb-3'>
						Recommended Products
					</h2>
					{/* UPSELLS CONTAINER */}
					<div className='flex sm:flex-row sm:space-y-0 sm:space-x-6 flex-col space-y-3'>
						{upsells.map((upsell) => (
							<div
								key={upsell.id}
								className='w-full flex sm:flex-col bg-white p-5 space-x-3'
							>
								<img
									src={upsell.image}
									className='image  sm:w-full sm:h-auto sm:mb-3 max-h-52'
									alt={upsell.title}
								/>
								<div className='flex-1'>
									<h3>{upsell.title}</h3>
									<div className='flex justify-between mt-3'>
										<span>
											{currency}
											{parseFloat(upsell.price).toFixed(2)}
										</span>
										<button className='bg-violet py-1 px-6 rounded text-white'>
											Add
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p className='p-3 text-center'>Loading upsells...</p>
			)}
		</>
	);
};

export default Upsells;
