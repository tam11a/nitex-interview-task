import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import authReducer from "./auth";

export default configureStore({
	reducer: {
		cart: cartReducer,
		auth: authReducer,
	},
});
