import { createSlice } from '@reduxjs/toolkit';
import products from '../products.json';

const getTotal = () => {
	let sum = 0;
	products.items.forEach((item) => {
		sum += item.price.current_price;
	});

	return sum + products.shipping;
};

const initialState = {
	...products,
	total: getTotal(),
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		updateTotal: (state) => {
			let sum = 0;
			state.items.forEach((item) => {
				sum += item.price.current_price * item.qty;
			});
			state.total = sum;
		},
		deleteItem: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		updateQty: (state, action) => {
			console.log(action.payload);

			const itemIdx = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			state.items[itemIdx].qty = action.payload.currentQty;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateTotal, deleteItem, updateQty } = productsSlice.actions;

export default productsSlice.reducer;
