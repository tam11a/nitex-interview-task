import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [null],
	},
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
		removeProduct: (state, action) => {
			state.products.splice(action.payload.index, 1);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
